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
const HERO_OUT = [0.015, 0.06];
/** Each step's span of the scroll [fully in, starts leaving], and the hand-over length. */
const STEPS: [number, number][] = [
  [0.1, 0.33],
  [0.4, 0.63],
  [0.7, 1],
];
const XFADE = 0.025;

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

/** A decoded frame: an ImageBitmap, or a decoded <img> where ImageBitmap fails (some Safari versions). */
type Frame = ImageBitmap | HTMLImageElement;
const frameSize = (f: Frame) =>
  f instanceof HTMLImageElement ? { w: f.naturalWidth, h: f.naturalHeight } : { w: f.width, h: f.height };
const release = (f: Frame) => {
  if (f instanceof HTMLImageElement) f.removeAttribute("src");
  else f.close();
};
let bitmapOk = typeof createImageBitmap === "function";
/** Decodes off the main thread where the browser can; falls back to img.decode() for good on the first failure. */
async function decodeFrame(blob: Blob): Promise<Frame> {
  if (bitmapOk) {
    try {
      return await createImageBitmap(blob);
    } catch {
      bitmapOk = false;
    }
  }
  const src = URL.createObjectURL(blob);
  const img = new Image();
  img.src = src;
  try {
    await img.decode();
  } finally {
    URL.revokeObjectURL(src);
  }
  return img;
}



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
    const html = document.documentElement;
    // the site header sits over the film (transparent, light ink) until the
    // film has scrolled away from under it; see html[data-off-film] in CSS
    // (from the moment it starts to scroll away, so the words never slide
    // under a see-through header)
    const headerWatch = () => html.toggleAttribute("data-off-film", root.getBoundingClientRect().bottom < window.innerHeight + 2);
    headerWatch();
    window.addEventListener("scroll", headerWatch, { passive: true });
    const underHeader = { disconnect: () => window.removeEventListener("scroll", headerWatch) };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      return () => {
        underHeader.disconnect();
        html.removeAttribute("data-off-film");
      };
    }

    const q = <T extends Element>(sel: string) => root.querySelector<T>(sel)!;
    const qa = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
    const canvas = q<HTMLCanvasElement>(".flm-canvas");
    const cam = q<HTMLElement>(".flm-cam");
    const copies = qa<HTMLElement>(".fl-step");
    const fills = qa<HTMLElement>(".fl-seg-fill");
    const segs = qa<HTMLElement>(".fl-seg");
    const hero = q<HTMLElement>(".flm-hero");
    const hud = q<HTMLElement>(".fl-hud");
    const botWash = q<HTMLElement>(".flm-bot");
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const phoneMq = window.matchMedia("(max-width: 767px)");
    let set = phoneMq.matches ? PHONE : DESKTOP;
    // decoded window either side of the current frame
    let radius = set === PHONE ? 12 : 8;
    let blobs = new Map<number, Blob>();
    let bitmaps = new Map<number, Frame>();
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
    let cw = 0, ch = 0, dpr = 1;
    const offset = 0;
    let drawnOff = -1;
    const sizeCanvas = () => {
      // at most 2x and about 1700px tall: iOS caps canvas memory
      dpr = Math.min(window.devicePixelRatio || 1, 2, 1700 / Math.max(1, canvas.clientHeight));
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
      if (!hit || (hit.at === drawn && drawnGen === generation && drawnOff === offset) || !cw) return;
      const { bmp } = hit;
      const { w, h } = frameSize(bmp);
      // cover-fit, held on the rocket horizontally
      const s = Math.max(cw / w, ch / h);
      const dw = w * s, dh = h * s;
      const dx = Math.min(0, Math.max(cw - dw, cw / 2 - set.focusX * dw));
      // phones: on the pad the film sits a little lower so the nose clears
      // the header; the band above is the sky's own colour (its top-left
      // corner, stretched)
      const off = offset * dpr;
      const dy = (ch - dh) / 2 + off;
      if (dy > 0) ctx.drawImage(bmp, 0, 0, Math.max(1, Math.round(w * 0.05)), 2, 0, 0, cw, Math.ceil(dy) + 1);
      ctx.drawImage(bmp, dx, dy, dw, dh);
      drawnOff = offset;
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
          release(bmp);
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
          decodeFrame(blob)
            .then((bmp) => {
              if (disposed || gen !== generation) return release(bmp);
              bitmaps.set(i, bmp);
              draw();
            })
            .catch((err) => console.warn("[film] frame", i, "did not decode", err))
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
            const res = await fetch(url(i), { signal, priority: "low" } as RequestInit);
            // anything but an image (an auth or error page) is skipped, loudly
            if (!res.ok || !(res.headers.get("content-type") || "").startsWith("image/")) {
              console.warn("[film] frame", i, "not an image:", res.status, res.headers.get("content-type"));
              continue;
            }
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
      bitmaps.forEach(release);
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
      // scroll is linear in film time; the file is the nearest one to it.
      // The film ends at FILM_END and its last frame holds after that.
      const f = fileFor(set, clamp01(p / FILM_END) * LAST);
      if (f !== target) {
        target = f;
        pump();
      }
      draw();
      // a gentle camera pull-back across the whole climb (1.06 to 1.0,
      // eased in and out): with the footage, the rocket feels smaller the
      // higher it goes
      const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
      cam.style.transform = `scale(${(1.06 - 0.06 * e).toFixed(4)})`;
      // the opening holds on the pad, then gives way as the rocket lifts
      const h = 1 - ramp(HERO_OUT[0], HERO_OUT[1], p);
      fade(hero, h);
      hero.style.transform = `translate3d(0, ${((1 - h) * -24).toFixed(1)}px, 0)`;
      fade(hud, ramp(HERO_OUT[1] - 0.01, STEPS[0][0], p));
      // words: one step at a time and fully legible for most of it; the
      // hand-overs are short and never overlap, so nothing sits half-faded
      copies.forEach((el, i) => {
        const [a, b] = STEPS[i];
        const o = ramp(a - XFADE, a, p) * (i < STEPS.length - 1 ? 1 - ramp(b, b + XFADE, p) : 1);
        fade(el, o);
        el.style.transform = `translate3d(0, ${((1 - o) * (p > b ? -14 : 14)).toFixed(1)}px, 0)`;
      });
      fills.forEach((el, i) => {
        const [a, b] = STEPS[i];
        el.style.transform = `scaleX(${clamp01((p - a + XFADE) / (b - a + XFADE)).toFixed(3)})`;
      });
      setStage(p < STEPS[0][0] - XFADE ? -1 : p < STEPS[1][0] - XFADE ? 0 : p < STEPS[2][0] - XFADE ? 1 : 2);
    };
    // before GSAP has loaded, follow the scroll directly
    let gsapLive = false;
    const direct = () => {
      const r = root.getBoundingClientRect();
      const raw = clamp01(-r.top / Math.max(1, root.offsetHeight - window.innerHeight));
      // the exit dissolve follows the scrollbar exactly (no scrub lag), so
      // the words are gone before the stage starts to scroll away
      fade(botWash, ramp(0.93, 0.985, raw));
      if (!gsapLive) update(raw);
    };
    window.addEventListener("scroll", direct, { passive: true });

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
      gsapLive = true;
      killGsap = () => gctx.revert();
    };

    root.setAttribute("data-live", "");
    update(0);
    // Frames and GSAP load about two seconds after the page has loaded (or on
    // the first scroll, if sooner), and only when the section is within
    // about a screen and a half. The poster <img> is already showing.
    let ready = false;
    let near = false;
    let idleId = 0;
    const maybeStart = () => {
      if (ready && near) void start();
    };
    const goReady = () => {
      if (ready) return;
      ready = true;
      window.removeEventListener("scroll", goReady);
      maybeStart();
    };
    const whenIdle = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      // a moment after load, so the frames never compete with the first
      // paint (the poster already shows the pad); a scroll starts it sooner
      idleId = window.setTimeout(() => (ric ? ric(goReady, { timeout: 1000 }) : goReady()), 2000);
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
    window.addEventListener("scroll", goReady, { passive: true });
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
    // while the flight fills the screen, the chat bubble steps aside (CSS)
    const inFlight = new IntersectionObserver(([e]) => html.toggleAttribute("data-in-flight", e.isIntersecting), {
      rootMargin: "-30% 0px -30% 0px",
    });
    inFlight.observe(root);
    if (window.scrollY > 0) goReady();
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
      inFlight.disconnect();
      html.removeAttribute("data-in-flight");
      window.removeEventListener("scroll", goReady);
      window.removeEventListener("load", whenIdle);
      window.clearTimeout(idleId);
      ro.disconnect();
      underHeader.disconnect();
      html.removeAttribute("data-off-film");
      window.removeEventListener("scroll", direct);
      phoneMq.removeEventListener("change", switchSet);
      killGsap();
      bitmaps.forEach(release);
      bitmaps.clear();
      blobs.clear();
    };
  }, []);

  return <span ref={markRef} hidden />;
}
