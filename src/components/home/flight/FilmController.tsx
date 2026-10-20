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
/**
 * A device's frames: a low set for scrubbing (WebP) and an HD set (10-bit
 * AVIF) loaded only where the visitor stops. frames[i] = the source frame
 * file i shows; `last` = that film's last source frame.
 */
type FrameSet = { prefix: "d" | "m"; count: number; focusX: number; frames: number[]; last: number; hi: { width: number; height: number } };
const DESKTOP: FrameSet = { prefix: "d", ...film.desktop };
const PHONE: FrameSet = { prefix: "m", ...film.phone };
/** The film plays over this much of the scroll; the last frame then holds while "Book a call" shows. */
const FILM_END = 0.86;
const HERO_OUT = [0.015, 0.06];
/** Each step's span of the scroll [fully in, starts leaving], and the hand-over length. */
const STEPS: [number, number][] = [
  [0.1, 0.31],
  [0.38, 0.6],
  // the last step (with its buttons) leaves before the next section starts
  // to slide over the film (from about 0.94 of the scroll)
  [0.67, 0.95],
];
const XFADE = 0.025;
/** Crossfade to the next frame while scrolling (phones). Off: it cost a second full draw per frame change. */
const BLEND = false as boolean;

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
    // (from the moment the next section, which slides up over the film,
    // reaches the header)
    const headerWatch = () => html.toggleAttribute("data-off-film", root.getBoundingClientRect().bottom < window.innerHeight + 96);
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
    const copies = qa<HTMLElement>(".fl-step");
    // each step's headline words rise out of a mask with the film
    const titleWords = copies.map((c) => Array.from(c.querySelectorAll<HTMLElement>(".fw-i")));
    const bodies = copies.map((c) => c.querySelector<HTMLElement>(".fl-body"));
    const fills = qa<HTMLElement>(".fl-seg-fill");
    const segs = qa<HTMLElement>(".fl-seg");
    const hero = q<HTMLElement>(".flm-hero");
    const ignite = q<HTMLElement>(".flm-ignite");
    const hud = q<HTMLElement>(".fl-hud");
    const botWash = q<HTMLElement>(".flm-bot");
    const ctx = canvas.getContext("2d", { alpha: false });
    // the blend layer: the next frame, faded in with CSS opacity (compositor
    // only, no extra canvas work per scroll frame)
    const canvasB = q<HTMLCanvasElement>(".flm-canvas-b");
    const ctxB = canvasB.getContext("2d", { alpha: false });
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
    const hiUrl = (i: number) => `/flight/film/${set.prefix}h-${pad(i)}.avif?v=${film.v}`;

    // ---------- drawing ----------
    let cw = 0, ch = 0, dpr = 1;
    const offset = 0;
    let drawnOff = -1;
    const sizeCanvas = () => {
      // the device's full pixel density: up to 3x on phones (capped at an
      // iPhone Pro Max screen, 1290x2796), up to 2x on desktop (capped at 4K)
      const cwCss = Math.max(1, canvas.clientWidth), chCss = Math.max(1, canvas.clientHeight);
      const maxW = set === PHONE ? 1290 : 3840, maxH = set === PHONE ? 2796 : 2400;
      dpr = Math.min(window.devicePixelRatio || 1, set === PHONE ? 3 : 2, maxW / cwCss, maxH / chCss);
      const w = Math.round(cwCss * dpr);
      const h = Math.round(chCss * dpr);
      if (w && h && (w !== cw || h !== ch)) {
        cw = canvas.width = canvasB.width = w;
        ch = canvas.height = canvasB.height = h;
        for (const c of [ctx, ctxB]) if (c) c.imageSmoothingEnabled = true;
        drawn = -1;
        drawnB = -1;
        drawnHi = -1;
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
    // frame blending: the file just before the film position, and the next
    // one laid over it with alpha by how far between them we are, so
    // scrubbing reads as continuous video even with few phone frames
    let blend = 0;
    let drawnB = -1;
    // the camera pull-back (1.06 to 1.0 across the climb) is drawn into the
    // canvas, never a CSS scale on it: scaling a canvas element blurs it
    let zoom = 1.06;
    let drawnZoom = 0;
    const place = (c: CanvasRenderingContext2D, bmp: Frame) => {
      const { w, h } = frameSize(bmp);
      // cover-fit, held on the rocket horizontally
      const s = Math.max(cw / w, ch / h);
      const dw0 = w * s, dh0 = h * s;
      const dx0 = Math.min(0, Math.max(cw - dw0, cw / 2 - set.focusX * dw0));
      const dy0 = (ch - dh0) / 2 + offset * dpr;
      // zoom about a point on the rocket, then snap to whole pixels
      const ox = cw * (set === PHONE ? 0.5 : 0.63), oy = ch * (set === PHONE ? 0.4 : 0.55);
      const dx = Math.round(ox - (ox - dx0) * zoom), dy = Math.round(oy - (oy - dy0) * zoom);
      c.drawImage(bmp, dx, dy, Math.round(dw0 * zoom), Math.round(dh0 * zoom));
    };
    // HD: where the scroll comes to rest, the HD frame replaces the low one
    let settled = false;
    let settleTimer = 0;
    let drawnHi = -1;
    const hiBitmaps = new Map<number, Frame>();
    const hiPending = new Set<number>();
    const wantHi = () => set === PHONE || cw > film.desktop.width * 1.05;
    const loadHi = (i: number) => {
      if (i < 0 || i >= set.count || hiBitmaps.has(i) || hiPending.has(i) || !wantHi()) return;
      const gen = generation;
      hiPending.add(i);
      fetch(hiUrl(i), { signal: abort.signal })
        .then((r) => (r.ok && (r.headers.get("content-type") || "").startsWith("image/") ? r.blob() : Promise.reject(new Error(`HD ${i}: ${r.status}`))))
        .then(decodeFrame)
        .then((bmp) => {
          if (disposed || gen !== generation) return release(bmp);
          hiBitmaps.set(i, bmp);
          // keep a few: the current one and its neighbours
          for (const [k, b] of hiBitmaps) if (Math.abs(k - target) > 2) { release(b); hiBitmaps.delete(k); }
          if (settled && i === target) draw();
        })
        .catch(() => {})
        .finally(() => hiPending.delete(i));
    };
    const settle = () => {
      settleTimer = 0;
      // snap to the nearer single frame: no blend left on screen
      if (blend > 0.5 && target + 1 < set.count && bitmaps.has(target + 1)) target++;
      blend = 0;
      settled = true;
      if (drawnZoom !== zoom) drawn = -1;
      draw();
      loadHi(target);
      loadHi(target + 1);
      loadHi(target - 1);
    };
    const draw = () => {
      const hit = nearestBitmap(target);
      if (!hit || !cw) return;
      const hd = settled && hit.at === target ? hiBitmaps.get(target) : undefined;
      // redraw only when the frame (or its HD version) changes: the zoom
      // rides along with frame changes, so no full-canvas paint per scroll
      // frame; settling redraws at the exact zoom
      if (!(hit.at === drawn && drawnGen === generation && drawnOff === offset && drawnHi === (hd ? target : -1))) {
        // "high" resampling is costly per draw: only for the frame at rest
        ctx.imageSmoothingQuality = settled ? "high" : "low";
        place(ctx, hd ?? hit.bmp);
        drawnOff = offset;
        drawn = hit.at;
        drawnGen = generation;
        drawnZoom = zoom;
        drawnHi = hd ? target : -1;
        drawnB = -1;
        if (!root.hasAttribute("data-film")) root.setAttribute("data-film", "");
      }
      // the next frame on the blend layer, drawn once per frame change
      // phones only: desktop has frames enough, and full-width draws cost more
      const next = BLEND && set === PHONE && hit.at === target ? bitmaps.get(target + 1) : undefined;
      if (next && ctxB && drawnB !== target + 1) {
        ctxB.imageSmoothingQuality = "low";
        place(ctxB, next);
        drawnB = target + 1;
      }
      canvasB.style.opacity = !settled && next && drawnB === target + 1 ? blend.toFixed(3) : "0";
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
      hiBitmaps.forEach(release);
      hiBitmaps.clear();
      drawnB = -1;
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
    // The section's last screen is where the next section slides up over the
    // film (CSS: negative margin). The story runs over the scroll before
    // that point, so nothing is covered while it is still being read.
    let storyEnd = 0.75;
    const measureStory = () => {
      const travel = Math.max(1, root.offsetHeight - window.innerHeight);
      // the overlap is the section's negative bottom margin (CSS)
      const overlap = Math.max(0, -parseFloat(getComputedStyle(root).marginBottom) || 0);
      storyEnd = clamp01(1 - (overlap || window.innerHeight) / travel) || 0.75;
    };
    measureStory();
    const update = (raw: number) => {
      const p = clamp01(raw / storyEnd);
      // scroll is linear in film time; the file is the nearest one to it.
      // The film ends at FILM_END and its last frame holds after that.
      const pos = clamp01(p / FILM_END) * set.last;
      // the file at or just before the position, and how far to the next
      let f = fileFor(set, pos);
      if (set.frames[f] > pos && f > 0) f--;
      const nextSrc = set.frames[f + 1];
      blend = nextSrc !== undefined ? clamp01((pos - set.frames[f]) / (nextSrc - set.frames[f])) : 0;
      // a gentle camera pull-back across the whole climb (1.06 to 1.0,
      // eased in and out): the rocket feels smaller the higher it goes
      const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
      zoom = Math.round((1.06 - 0.06 * e) * 2000) / 2000;
      if (f !== target) {
        target = f;
        pump();
      }
      // moving: low frames (and the blend layer); at rest: snap and go HD
      settled = false;
      if (settleTimer) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 160);
      draw();
      // the opening holds on the pad, then gives way as the rocket lifts
      const h = 1 - ramp(HERO_OUT[0], HERO_OUT[1], p);
      fade(hero, h);
      hero.style.transform = `translate3d(0, ${((1 - h) * -24).toFixed(1)}px, 0)`;
      fade(hud, ramp(HERO_OUT[1] - 0.01, STEPS[0][0], p));
      // the ignition glow and pad lights give way as the rocket lifts
      fade(ignite, 1 - ramp(0.02, 0.14, p));
      // words: one step at a time and fully legible for most of it; the
      // hand-overs are short and never overlap, so nothing sits half-faded
      copies.forEach((el, i) => {
        const [a, b] = STEPS[i];
        const o = ramp(a - XFADE, a, p) * (1 - ramp(b, b + XFADE, p));
        fade(el, o);
        // words: in from below as the step arrives, staggered; out upward
        const enter = ramp(a - XFADE * 2.2, a, p);
        const leave = ramp(b, b + XFADE, p);
        const ws = titleWords[i];
        ws.forEach((w, j) => {
          const t = clamp01(enter * (1 + ws.length * 0.18) - j * 0.18);
          const e = 1 - (1 - t) ** 3;
          const y = leave > 0 ? -leave * 105 : (1 - e) * 105;
          w.style.transform = `translate3d(0, ${y.toFixed(1)}%, 0)`;
        });
        const body = bodies[i];
        if (body) body.style.opacity = (ramp(a - XFADE * 0.6, a + XFADE * 0.4, p) * (1 - leave)).toFixed(3);
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
      // the first scroll "presses the button": the engines flare
      if (raw > 0.001 && !root.hasAttribute("data-launched")) root.setAttribute("data-launched", "");
      // the exit dissolve follows the scrollbar exactly (no scrub lag), so
      // the words are gone before the stage starts to scroll away
      // while the next section slides over, the held frame dims under it
      fade(botWash, 0.6 * ramp(storyEnd, 1, raw));
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
      measureStory();
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
