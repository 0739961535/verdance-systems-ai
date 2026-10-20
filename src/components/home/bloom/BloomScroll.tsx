"use client";

import { useEffect, useRef } from "react";

/**
 * Drives the bloom: --p (0 to 1) and data-word on the .bl section from the
 * scroll, eased with one animation frame per change, and draws the flower
 * frame for the scroll to the canvas. Frames load on the first scroll or a
 * few seconds after load (coarse to fine): low WebP while moving, the HD AVIF of the frame where
 * the scroll comes to rest. Phones use their own lighter set.
 * Reduced motion: nothing runs; the first frame and the last line show.
 */
export function BloomScroll({ v, desktop, phone }: { v: string; desktop: number; phone: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current?.closest<HTMLElement>(".bl");
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = 5;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const prefix = small ? "m" : "d";
    const count = small ? phone : desktop;
    const canvas = el.querySelector<HTMLCanvasElement>(".bl-canvas");
    const ctx = canvas?.getContext("2d") ?? null;
    const frames: (ImageBitmap | null)[] = Array(count).fill(null);
    const hd = new Map<number, ImageBitmap>();
    let drawn = "";
    let shown = 0;
    let goal = 0;
    let raf = 0;
    let rest = 0;
    let settled = false;
    let disposed = false;
    const pad = (i: number) => String(i).padStart(3, "0");

    const sizeCanvas = () => {
      if (!canvas) return;
      const px = Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2));
      if (px && canvas.width !== px) {
        canvas.width = canvas.height = px;
        drawn = "";
      }
    };
    const target = () => Math.round(shown * (count - 1));
    const nearest = (i: number) => {
      for (let d = 0; d < count; d++) {
        if (frames[i - d]) return i - d;
        if (frames[i + d]) return i + d;
      }
      return -1;
    };
    const draw = () => {
      if (!ctx || !canvas || !count) return;
      const t = target();
      const big = settled ? hd.get(t) : undefined;
      const at = big ? t : nearest(t);
      if (at < 0) return;
      const key = `${at}|${big ? 1 : 0}|${canvas.width}`;
      if (key === drawn) return;
      ctx.imageSmoothingQuality = big ? "high" : "low";
      ctx.drawImage(big ?? frames[at]!, 0, 0, canvas.width, canvas.height);
      drawn = key;
      el.setAttribute("data-live", "");
    };
    const loadHd = (i: number) => {
      if (hd.has(i) || disposed) return;
      fetch(`/bloom/${prefix}h-${pad(i)}.avif?v=${v}`)
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error("hd"))))
        .then((b) => createImageBitmap(b))
        .then((bmp) => {
          hd.set(i, bmp);
          for (const [k, b] of hd) {
            if (Math.abs(k - target()) > 2) {
              b.close();
              hd.delete(k);
            }
          }
          if (settled && i === target()) draw();
        })
        .catch(() => {});
    };
    const measure = () => {
      const r = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      goal = Math.min(1, Math.max(0, -r.top / travel));
    };
    const tick = () => {
      raf = 0;
      const d = goal - shown;
      shown = Math.abs(d) < 0.0008 ? goal : shown + d * 0.18;
      el.style.setProperty("--p", shown.toFixed(4));
      el.dataset.word = String(Math.min(words - 1, Math.floor(shown * words * 0.999)));
      draw();
      if (shown !== goal) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      measure();
      settled = false;
      window.clearTimeout(rest);
      rest = window.setTimeout(() => {
        settled = true;
        loadHd(target());
        draw();
      }, 180);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      sizeCanvas();
      onScroll();
    };

    sizeCanvas();
    measure();
    shown = goal;
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    const load = async () => {
      const order: number[] = [];
      const seen = new Set<number>();
      for (const step of [8, 4, 2, 1]) {
        for (let i = 0; i < count; i += step) {
          if (!seen.has(i)) {
            seen.add(i);
            order.push(i);
          }
        }
      }
      let next = 0;
      const worker = async () => {
        while (next < order.length && !disposed) {
          const i = order[next++];
          try {
            const res = await fetch(`/bloom/${prefix}-${pad(i)}.webp?v=${v}`, { priority: "low" } as RequestInit);
            if (!res.ok) continue;
            frames[i] = await createImageBitmap(await res.blob());
            if (Math.abs(i - target()) < 4) draw();
          } catch {
            return;
          }
        }
      };
      await Promise.all([worker(), worker(), worker()]);
    };
    // Frames wait for the first scroll, or for a quiet moment a few seconds
    // after load, so they never compete with the first paint.
    let startTimer = 0;
    let begun = false;
    const begin = () => {
      if (begun) return;
      begun = true;
      window.removeEventListener("scroll", begin);
      void load();
    };
    const start = () => {
      startTimer = window.setTimeout(() => {
        const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
        if (ric) ric(begin, { timeout: 1500 });
        else begin();
      }, 3000);
    };
    if (count) {
      window.addEventListener("scroll", begin, { passive: true, once: true });
      if (document.readyState === "complete") start();
      else window.addEventListener("load", start, { once: true });
    }

    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", start);
      window.removeEventListener("scroll", begin);
      window.clearTimeout(rest);
      window.clearTimeout(startTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [v, desktop, phone]);

  return <span ref={ref} hidden aria-hidden />;
}
