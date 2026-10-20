"use client";

import { useEffect, useRef } from "react";
import film from "./film-manifest.json";
import { DAY_BEATS } from "./dayBeats";

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
const STEPS: [number, number][] = DAY_BEATS.map((d) => d.at);
const XFADE = 0.014;
/**
 * Phones: the frame always covers the screen edge to edge (never a gap), at
 * the smallest scale that covers, top-aligned so the whole vehicle shows
 * with its nose below the header. On the pad the rocket sits as far right
 * as the frame's own width allows (aiming for 65% of the screen), by
 * choosing which part of the frame is shown, never by moving the frame off
 * an edge; it eases to centre as it climbs. The poster's CSS matches.
 */
const PHONE_PAD = { x: 0.5 };
/** Phones: each step's words hold here; they arrive from below and leave upward with the scroll. */
const PHONE_STEPS = STEPS;
/** Crossfade to the next frame while scrolling (phones). Off: it cost a second full draw per frame change. */
const BLEND = false as boolean;

/**
 * Phones: where the frame goes for a shift of `t` (1 on the pad, 0 from the
 * Ascent on). Same maths in public/flight/film-worker.js.
 */
function placePhone(c: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, bmp: CanvasImageSource, w: number, h: number, cw: number, ch: number, shift: number, focusX: number) {
  const t = shift * shift * (3 - 2 * shift);
  const s = Math.max(cw / w, ch / h);
  const dw = w * s, dh = h * s;
  const clampX = (x: number) => Math.min(0, Math.max(cw - dw, x));
  const dxC = clampX(cw / 2 - focusX * dw), dxP = clampX(PHONE_PAD.x * cw - 0.5 * dw);
  c.drawImage(bmp, Math.round(dxC + (dxP - dxC) * t), 0, Math.round(dw), Math.round(dh));
}

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



/**
 * Frames decode in a worker (off the main thread, so a decode never lands
 * in the middle of a scroll frame); the ImageBitmap is transferred back.
 * Falls back to decodeFrame on the main thread where workers cannot decode.
 */
const WORKER_SRC = `self.onmessage = async (e) => {
  const { id, blob } = e.data;
  try { const bmp = await createImageBitmap(blob); self.postMessage({ id, bmp }, [bmp]); }
  catch (err) { self.postMessage({ id, error: String(err) }); }
};`;
function makeDecoder() {
  let worker: Worker | null = null;
  try {
    if (typeof Worker === "function" && typeof createImageBitmap === "function") {
      worker = new Worker(URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" })));
    }
  } catch {
    worker = null;
  }
  let seq = 0;
  const pending = new Map<number, { ok: (f: Frame) => void; fail: (e: unknown) => void; blob: Blob }>();
  if (worker) {
    worker.onmessage = (e: MessageEvent<{ id: number; bmp?: ImageBitmap; error?: string }>) => {
      const job = pending.get(e.data.id);
      if (!job) return;
      pending.delete(e.data.id);
      if (e.data.bmp) job.ok(e.data.bmp);
      else decodeFrame(job.blob).then(job.ok, job.fail); // this format: decode here instead
    };
  }
  return {
    decode(blob: Blob): Promise<Frame> {
      if (!worker) return decodeFrame(blob);
      const id = ++seq;
      return new Promise((ok, fail) => {
        pending.set(id, { ok, fail, blob });
        worker!.postMessage({ id, blob });
      });
    },
    stop() {
      worker?.terminate();
      pending.clear();
    },
  };
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

  // The home page always opens at the top, on the pad: the browser's own
  // scroll restoration would otherwise drop a returning visitor mid-flight.
  // (An inline script in FilmStory sets this before the page loads, too.)
  useEffect(() => {
    if (location.hash || !("scrollRestoration" in history)) return;
    history.scrollRestoration = "manual";
    if (window.scrollY > 0) window.scrollTo(0, 0);
    return () => {
      history.scrollRestoration = "auto";
    };
  }, []);

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
    const bars = qa<HTMLElement>(".flm-bar");
    const decoder = makeDecoder();
    const hud = q<HTMLElement>(".fl-hud");
    const botWash = q<HTMLElement>(".flm-bot");
    // Where the browser can, the canvas is handed to a worker that fetches,
    // decodes and draws the frames (public/flight/film-worker.js): the page
    // only posts the playhead, so scrolling never waits on the film.
    const filmWorker: Worker | null =
      "transferControlToOffscreen" in canvas && typeof Worker === "function" ? new Worker(`/flight/film-worker.js?v=${film.v}`) : null;
    let workerReady = false;
    const ctx = filmWorker ? null : canvas.getContext("2d", { alpha: false });
    // the blend layer: the next frame, faded in with CSS opacity (compositor
    // only, no extra canvas work per scroll frame)
    const canvasB = q<HTMLCanvasElement>(".flm-canvas-b");
    const ctxB = canvasB.getContext("2d", { alpha: false });
    if (!ctx && !filmWorker) return;

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
      if (filmWorker) {
        if (workerReady && w && h && (w !== cw || h !== ch)) {
          cw = w;
          ch = h;
          filmWorker.postMessage({ type: "size", w, h, wantHi: set === PHONE || w > film.desktop.width * 1.05 });
        }
        return;
      }
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
    let shiftT = 1;
    let drawnZoom = 0;
    // phones: the pad-to-full-screen move changes the framing between frames
    let drawnShift = -1;
    const place = (c: CanvasRenderingContext2D, bmp: Frame) => {
      const { w, h } = frameSize(bmp);
      // cover-fit, held on the rocket horizontally
      const s = Math.max(cw / w, ch / h);
      const dw0 = w * s, dh0 = h * s;
      const dx0 = Math.min(0, Math.max(cw - dw0, cw / 2 - set.focusX * dw0));
      const dy0 = (ch - dh0) / 2 + offset * dpr;
      if (set === PHONE) {
        placePhone(c, bmp, w, h, cw, ch, shiftT, set.focusX);
        return;
      }
      // zoom about a point on the rocket, then snap to whole pixels
      const ox = cw * 0.63, oy = ch * 0.55;
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
        .then((b) => decoder.decode(b))
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
      if (filmWorker) {
        settled = true;
        draw();
        return;
      }
      // snap to the nearer single frame: no blend left on screen
      if (blend > 0.5 && target + 1 < set.count && bitmaps.has(target + 1)) target++;
      blend = 0;
      settled = true;
      if (drawnZoom !== zoom + shiftT) drawn = -1;
      draw();
      loadHi(target);
      loadHi(target + 1);
      loadHi(target - 1);
    };
    const draw = () => {
      if (filmWorker) {
        if (workerReady) filmWorker.postMessage({ type: "pos", target, zoom, shift: shiftT, settled });
        return;
      }
      if (!ctx) return;
      const hit = nearestBitmap(target);
      if (!hit || !cw) return;
      const hd = settled && hit.at === target ? hiBitmaps.get(target) : undefined;
      // redraw only when the frame (or its HD version) changes: the zoom
      // rides along with frame changes, so no full-canvas paint per scroll
      // frame; settling redraws at the exact zoom
      if (!(hit.at === drawn && drawnGen === generation && drawnOff === offset && drawnHi === (hd ? target : -1) && (set !== PHONE || drawnShift === shiftT))) {
        // "high" resampling is costly per draw: only for the frame at rest
        ctx.imageSmoothingQuality = settled ? "high" : "low";
        place(ctx, hd ?? hit.bmp);
        drawnOff = offset;
        drawn = hit.at;
        drawnGen = generation;
        drawnZoom = zoom + shiftT;
        drawnShift = shiftT;
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
      if (disposed || filmWorker) return;
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
          decoder.decode(blob)
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
      if (filmWorker) return;
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
      if (filmWorker) {
        if (workerReady) {
          filmWorker.postMessage({ type: "set", set: workerSet() });
          cw = ch = 0;
          sizeCanvas();
          draw();
        }
        return;
      }
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
      shiftT = Math.round((1 - ramp(0.1, 0.36, p)) * 200) / 200;
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
      fade(hud, ramp(HERO_OUT[1] - 0.01, (set === PHONE ? PHONE_STEPS : STEPS)[0][0], p));
      // the ignition glow and pad lights give way as the rocket lifts
      // ignition: a tiny camera shake on the first frames of the lift-off
      // only (whole pixels, so the film stays sharp)

      // cinematic letterbox: the bars come in as the rocket lifts off and
      // open again at orbit
      const lb = ramp(0.05, 0.13, p) * (1 - ramp(0.6, 0.7, p));
      bars.forEach((b) => (b.style.transform = `scaleY(${lb.toFixed(3)})`));
      // words: one step at a time and fully legible for most of it; the
      // hand-overs are short and never overlap, so nothing sits half-faded.
      // Phones: each step travels with the scroll, in from below, a short
      // hold beside the rocket, then out upward (a soft scrim behind the
      // words only). Desktop: the steps hold in place and cross over.
      const phone = set === PHONE;
      const ST = phone ? PHONE_STEPS : STEPS;
      copies.forEach((el, i) => {
        const [a, b] = ST[i];
        const inLen = phone ? 0.018 : XFADE * 1.2;
        const outLen = phone ? 0.015 : XFADE;
        const enter = ramp(a - inLen, a, p);
        const leave = ramp(b, b + outLen, p);
        if (phone) {
          fade(el, ramp(a - inLen, a - inLen * 0.4, p) * (1 - ramp(b + outLen * 0.35, b + outLen, p)));
          const y = (1 - enter) * 0.12 * vh - leave * 0.1 * vh;
          el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
        } else {
          fade(el, ramp(a - XFADE, a, p) * (1 - leave));
          if (el.style.transform) el.style.transform = "";
        }
        // words: in from below as the step arrives, staggered; out upward
        const ws = titleWords[i];
        ws.forEach((w, j) => {
          const t = clamp01(enter * (1 + ws.length * 0.18) - j * 0.18);
          const e = 1 - (1 - t) ** 3;
          const y = leave > 0 ? -leave * 105 : (1 - e) * 105;
          w.style.transform = `translate3d(0, ${y.toFixed(1)}%, 0)`;
        });
        const body = bodies[i];
        if (body) body.style.opacity = (ramp(a - inLen * 0.3, a + XFADE * 0.4, p) * (1 - leave)).toFixed(3);
      });
      fills.forEach((el, i) => {
        const [a, b] = ST[i];
        el.style.transform = `scaleX(${clamp01((p - a + XFADE) / (b - a + XFADE)).toFixed(3)})`;
      });
      let stage = -1;
      ST.forEach(([a], i) => {
        if (p >= a - XFADE) stage = i;
      });
      setStage(stage);
    };
    // The scroll drives the film through one requestAnimationFrame loop: the
    // shown progress eases toward the scroll position (0.18 of the way each
    // frame, like a camera on a rig), and the canvas only repaints when the
    // frame changes. No React and no library in the scroll path.
    let rootTop = 0, travel = 1, vh = window.innerHeight;
    const measureScroll = () => {
      rootTop = root.getBoundingClientRect().top + window.scrollY;
      travel = Math.max(1, root.offsetHeight - window.innerHeight);
      vh = window.innerHeight;
    };
    measureScroll();
    let goal = 0, shown = 0, loop = 0;
    const tick = () => {
      loop = 0;
      const d = goal - shown;
      shown = Math.abs(d) < 0.0003 ? goal : shown + d * 0.18;
      update(shown);
      if (shown !== goal) loop = requestAnimationFrame(tick);
    };
    const direct = () => {
      const raw = clamp01((window.scrollY - rootTop) / travel);
      goal = raw;
      // the first scroll "presses the button": the engines flare
      if (raw > 0.001 && !root.hasAttribute("data-launched")) root.setAttribute("data-launched", "");
      // while the next section slides over, the held frame dims under it
      fade(botWash, 0.6 * ramp(storyEnd, 1, raw));
      if (!loop) loop = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", direct, { passive: true });

    const workerSet = () => ({ prefix: set.prefix, count: set.count, focusX: set.focusX, phone: set === PHONE, pad: PHONE_PAD });
    const start = () => {
      if (started) return;
      started = true;
      if (filmWorker) {
        const off = canvas.transferControlToOffscreen();
        filmWorker.onmessage = (e: MessageEvent<{ type: string }>) => {
          if (e.data.type === "drawn") root.setAttribute("data-film", "");
        };
        filmWorker.postMessage({ type: "init", canvas: off, set: workerSet(), v: film.v }, [off]);
        workerReady = true;
        sizeCanvas();
        draw();
        return;
      }
      sizeCanvas();
      load();
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
    if (window.scrollY > 0) {
      goReady();
      // opened mid-section (restored scroll or a link): start in place
      goal = shown = clamp01((window.scrollY - rootTop) / travel);
      update(shown);
    }
    const ro = new ResizeObserver(() => {
      measureStory();
      measureScroll();
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
      cancelAnimationFrame(loop);
      decoder.stop();
      filmWorker?.terminate();
      bitmaps.forEach(release);
      bitmaps.clear();
      blobs.clear();
    };
  }, []);

  return <span ref={markRef} hidden />;
}
