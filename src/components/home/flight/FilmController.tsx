"use client";

import { useEffect, useRef } from "react";
import film from "./film-manifest.json";

/**
 * Drives FilmStory: scroll progress (GSAP ScrollTrigger, scrubbed) picks a
 * frame of the film and draws it onto the canvas.
 *
 * Memory: the compressed frames (about 20 to 40 KB each) are kept as blobs,
 * but only a small window of frames around the current one is decoded into
 * ImageBitmaps (a decoded 1600w frame is about 6 MB). Frames that leave the
 * window are closed. This keeps iOS Safari well under its canvas memory cap.
 *
 * Loading: nothing is fetched until the section is about a screen and a half
 * away. Then every 8th frame, every 4th, every 2nd, then the rest, so a fast
 * scroller always has a nearby frame to show. GSAP is imported at that
 * moment too, never with the first paint.
 */

/** frames[i] = the film's source frame that file i shows (denser at the climax). */
type FrameSet = { prefix: "d" | "m"; count: number; focusX: number; frames: number[] };
const DESKTOP: FrameSet = { prefix: "d", ...film.desktop };
const PHONE: FrameSet = { prefix: "m", ...film.phone };
const LAST = film.source.frames - 1;
/** The film plays over this much of the scroll; the last frame then holds while "Book a call" shows. */
const FILM_END = 0.86;
/** Light mode: dark ink on a light scrim while still on the ground, until this point (step 1 has faded by then). */
const LIGHT_INK_UNTIL = 0.318;

/** The file nearest to source frame `src` (binary search). */
function fileFor(set: FrameSet, src: number) {
  const f = set.frames;
  let lo = 0, hi = f.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (f[mid] < src) lo = mid + 1;
    else hi = mid;
  }
  return lo > 0 && src - f[lo - 1] < f[lo] - src ? lo - 1 : lo;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ramp = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const fade = (el: HTMLElement, o: number) => {
  el.style.opacity = o.toFixed(3);
  el.style.visibility = o < 0.005 ? "hidden" : "visible";
};
const pad = (i: number) => String(i).padStart(3, "0");

/** Every 8th frame, then every 4th, every 2nd, then the rest. */
function coarseToFine(count: number) {
  const seen = new Set<number>();
  const order: number[] = [];
  const add = (i: number) => {
    if (seen.has(i)) return;
    seen.add(i);
    order.push(i);
  };
  for (const step of [8, 4, 2, 1]) {
    for (let i = 0; i < count; i += step) add(i);
    add(count - 1);
  }
  return order;
}

export function FilmController() {
  const markRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = markRef.current?.closest<HTMLElement>(".flm");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const q = <T extends Element>(sel: string) => root.querySelector<T>(sel)!;
    const qa = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
    const canvas = q<HTMLCanvasElement>(".flm-canvas");
    const cam = q<HTMLElement>(".flm-cam");
    const copies = qa<HTMLElement>(".fl-step");
    const fills = qa<HTMLElement>(".fl-seg-fill");
    const segs = qa<HTMLElement>(".fl-seg");
    const veil = q<HTMLElement>(".flm-veil");
    const topWash = q<HTMLElement>(".flm-top");
    const botWash = q<HTMLElement>(".flm-bot");
    const html = document.documentElement;
    const isLight = () =>
      html.dataset.theme ? html.dataset.theme === "light" : window.matchMedia("(prefers-color-scheme: light)").matches;
    let light = isLight();
    let lastP = 0;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const phoneMq = window.matchMedia("(max-width: 767px)");
    let set = phoneMq.matches ? PHONE : DESKTOP;
    // decoded window either side of the current frame
    let radius = set === PHONE ? 12 : 8;
    let blobs = new Map<number, Blob>();
    let bitmaps = new Map<number, ImageBitmap>();
    const decoding = new Set<number>();
    let generation = 0;
    let abort = new AbortController();
    let target = 0;
    let drawn = -1;
    let drawnGen = -1;
    let activeStage = -1;
    let disposed = false;
    let started = false;
    let killGsap = () => {};

    const url = (i: number) => `/flight/film/${set.prefix}-${pad(i)}.webp?v=${film.v}`;

    // ---------- drawing ----------
    let cw = 0, ch = 0;
    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w && h && (w !== cw || h !== ch)) {
        cw = canvas.width = w;
        ch = canvas.height = h;
        drawn = -1;
      }
    };
    const nearestBitmap = (i: number) => {
      for (let d = 0; d < set.count; d++) {
        const a = bitmaps.get(i - d);
        if (a) return { bmp: a, at: i - d };
        const b = bitmaps.get(i + d);
        if (b) return { bmp: b, at: i + d };
      }
      return null;
    };
    const draw = () => {
      const hit = nearestBitmap(target);
      if (!hit || (hit.at === drawn && drawnGen === generation) || !cw) return;
      const { bmp } = hit;
      // cover-fit, held on the rocket horizontally
      const s = Math.max(cw / bmp.width, ch / bmp.height);
      const dw = bmp.width * s, dh = bmp.height * s;
      const dx = Math.min(0, Math.max(cw - dw, cw / 2 - set.focusX * dw));
      ctx.drawImage(bmp, dx, (ch - dh) / 2, dw, dh);
      drawn = hit.at;
      drawnGen = generation;
      if (!root.hasAttribute("data-film")) root.setAttribute("data-film", "");
    };

    // ---------- decode window ----------
    const pump = () => {
      if (disposed) return;
      const gen = generation;
      // evict what has left the window
      for (const [i, bmp] of bitmaps) {
        if (Math.abs(i - target) > radius + 2 && i !== drawn) {
          bmp.close();
          bitmaps.delete(i);
        }
      }
      // decode the nearest missing frames first, at most 3 at a time
      for (let d = 0; d <= radius && decoding.size < 3; d++) {
        for (const i of d ? [target + d, target - d] : [target]) {
          if (decoding.size >= 3) break;
          const blob = blobs.get(i);
          if (!blob || bitmaps.has(i) || decoding.has(i)) continue;
          decoding.add(i);
          createImageBitmap(blob)
            .then((bmp) => {
              if (disposed || gen !== generation) return bmp.close();
              bitmaps.set(i, bmp);
              draw();
            })
            .catch(() => {})
            .finally(() => {
              decoding.delete(i);
              if (gen === generation) pump();
            });
        }
      }
    };

    // ---------- loading ----------
    const load = () => {
      const gen = generation;
      const order = coarseToFine(set.count);
      const signal = abort.signal;
      let next = 0;
      const worker = async () => {
        while (next < order.length && gen === generation && !disposed) {
          const i = order[next++];
          try {
            const res = await fetch(url(i), { signal });
            if (!res.ok) continue;
            const blob = await res.blob();
            if (gen !== generation) return;
            blobs.set(i, blob);
            if (Math.abs(i - target) <= radius) pump();
          } catch {
            return; // aborted
          }
        }
      };
      for (let k = 0; k < 4; k++) void worker();
    };

    const switchSet = () => {
      const next = phoneMq.matches ? PHONE : DESKTOP;
      if (next === set) return;
      set = next;
      radius = set === PHONE ? 12 : 8;
      generation++;
      abort.abort();
      abort = new AbortController();
      bitmaps.forEach((b) => b.close());
      bitmaps = new Map();
      blobs = new Map();
      root.removeAttribute("data-film");
      drawn = -1;
      if (started) load();
    };

    // ---------- the scroll story ----------
    const setStage = (i: number) => {
      if (i === activeStage) return;
      activeStage = i;
      root.dataset.stage = String(i);
      segs.forEach((s, k) => s.toggleAttribute("data-on", k === i));
    };
    const update = (p: number) => {
      lastP = p;
      // scroll is linear in film time; the file is the nearest one to it.
      // The film ends at FILM_END and its last frame holds after that.
      const f = fileFor(set, clamp01(p / FILM_END) * LAST);
      if (f !== target) {
        target = f;
        draw();
        pump();
      }
      // a gentle camera pull-back across the whole climb (1.06 to 1.0,
      // eased in and out): with the footage, the rocket feels smaller the
      // higher it goes
      const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
      cam.style.transform = `scale(${(1.06 - 0.06 * e).toFixed(4)})`;
      // words: one step at a time, entering from below, leaving upward
      const o = [1 - ramp(0.26, 0.32, p), ramp(0.34, 0.4, p) * (1 - ramp(0.6, 0.66, p)), ramp(0.68, 0.74, p)];
      copies.forEach((el, i) => {
        const leaving = (i === 0 && p > 0.2) || (i === 1 && p > 0.5);
        fade(el, o[i]);
        el.style.transform = `translate3d(0, ${((1 - o[i]) * (leaving ? -18 : 18)).toFixed(1)}px, 0)`;
      });
      fills.forEach((el, i) => {
        el.style.transform = `scaleX(${clamp01((p - i / 3) * 3).toFixed(3)})`;
      });
      setStage(p < 0.33 ? 0 : p < 0.67 ? 1 : 2);

      // ground to space. Light mode: the pad starts washed into the light
      // page and the wash lifts as the rocket climbs into dark space. Both
      // modes: the bottom edge eases into the page as the section unpins
      // (the section's own ::before/::after feather its entry and exit).
      fade(veil, light ? 0.5 * (1 - ramp(0.04, 0.3, p)) : 0);
      fade(topWash, light ? 1 - ramp(0.2, 0.33, p) : 0);
      fade(botWash, ramp(0.94, 1, p));
      root.toggleAttribute("data-ink-dark", light && p < LIGHT_INK_UNTIL);
    };
    // follow the site's theme toggle
    const themeWatch = new MutationObserver(() => {
      const next = isLight();
      if (next !== light) {
        light = next;
        update(lastP);
      }
    });
    themeWatch.observe(html, { attributes: true, attributeFilter: ["data-theme"] });

    const start = async () => {
      if (started) return;
      started = true;
      sizeCanvas();
      load();
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const gctx = gsap.context(() => {
        const state = { p: 0 };
        const tween = gsap.to(state, {
          p: 1,
          ease: "none",
          onUpdate: () => update(state.p),
          scrollTrigger: {
            id: "flight-film",
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            // numeric scrub: the film eases into place, like a camera on a rig
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        // opened mid-section (restored scroll or a link): start in place
        const st = tween.scrollTrigger;
        if (st) {
          state.p = st.progress;
          tween.progress(st.progress);
          update(st.progress);
        }
      }, root);
      killGsap = () => gctx.revert();
    };

    root.setAttribute("data-live", "");
    update(0);
    // Nothing loads with the first paint. On the first scroll, touch or key
    // the poster is attached; the frames and GSAP follow once the section
    // is also within about a screen and a half. Opened already scrolled
    // (restored position, a link): at once.
    let woke = false;
    let near = false;
    const wakeEvents = ["scroll", "touchstart", "pointerdown", "keydown"] as const;
    const maybeStart = () => {
      if (woke && near) void start();
    };
    const wake = () => {
      if (woke) return;
      woke = true;
      wakeEvents.forEach((e) => window.removeEventListener(e, wake));
      qa<HTMLSourceElement>(".flm-poster source[data-srcset]").forEach((s) => (s.srcset = s.dataset.srcset!));
      const img = q<HTMLImageElement>(".flm-poster img");
      if (img.dataset.src && !img.getAttribute("src")) img.src = img.dataset.src;
      maybeStart();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          near = true;
          maybeStart();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(root);
    if (window.scrollY > 0) wake();
    else wakeEvents.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    const ro = new ResizeObserver(() => {
      sizeCanvas();
      draw();
    });
    ro.observe(canvas);
    phoneMq.addEventListener("change", switchSet);

    return () => {
      disposed = true;
      generation++;
      abort.abort();
      io.disconnect();
      wakeEvents.forEach((e) => window.removeEventListener(e, wake));
      ro.disconnect();
      themeWatch.disconnect();
      phoneMq.removeEventListener("change", switchSet);
      killGsap();
      bitmaps.forEach((b) => b.close());
      bitmaps.clear();
      blobs.clear();
    };
  }, []);

  return <span ref={markRef} hidden />;
}
