"use client";

import { useEffect, useRef } from "react";

/**
 * Drives the bloom: --p (0 to 1) and data-word on the .bl section from the
 * scroll, eased with one animation frame per change. When there is a frame
 * sequence (count > 0) it loads the frames after the page has loaded
 * (every 4th first, then the rest), and draws the nearest one to the canvas.
 * Reduced motion: nothing runs; the open flower and the last line show.
 */
export function BloomScroll({ count, v }: { count: number; v: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current?.closest<HTMLElement>(".bl");
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = 5;
    const canvas = el.querySelector<HTMLCanvasElement>(".bl-canvas");
    const ctx = canvas?.getContext("2d") ?? null;
    const frames: (ImageBitmap | HTMLImageElement | null)[] = Array(count).fill(null);
    let drawn = -1;
    let shown = 0;
    let goal = 0;
    let raf = 0;
    let disposed = false;

    const nearest = (i: number) => {
      for (let d = 0; d < count; d++) {
        if (frames[i - d]) return i - d;
        if (frames[i + d]) return i + d;
      }
      return -1;
    };
    const draw = () => {
      if (!ctx || !canvas || !count) return;
      const at = nearest(Math.round(shown * (count - 1)));
      if (at < 0 || at === drawn) return;
      const f = frames[at]!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(f, 0, 0, canvas.width, canvas.height);
      drawn = at;
      el.setAttribute("data-live", "");
    };
    const measure = () => {
      const r = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      goal = Math.min(1, Math.max(0, -r.top / travel));
    };
    const tick = () => {
      raf = 0;
      const d = goal - shown;
      shown = Math.abs(d) < 0.001 ? goal : shown + d * 0.18;
      el.style.setProperty("--p", shown.toFixed(4));
      el.dataset.word = String(Math.min(words - 1, Math.floor(shown * words * 0.999)));
      draw();
      if (shown !== goal) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    measure();
    shown = goal;
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const load = async () => {
      const order: number[] = [];
      const seen = new Set<number>();
      for (const step of [4, 2, 1])
        for (let i = 0; i < count; i += step)
          if (!seen.has(i)) {
            seen.add(i);
            order.push(i);
          }
      for (const i of order) {
        if (disposed) return;
        try {
          const res = await fetch(`/bloom/f-${String(i).padStart(3, "0")}.webp?v=${v}`, { priority: "low" } as RequestInit);
          if (!res.ok) continue;
          frames[i] = await createImageBitmap(await res.blob());
          if (Math.abs(i - Math.round(shown * (count - 1))) < 3) draw();
        } catch {
          return;
        }
      }
    };
    if (count) {
      if (document.readyState === "complete") void load();
      else window.addEventListener("load", () => void load(), { once: true });
    }

    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count, v]);

  return <span ref={ref} hidden aria-hidden />;
}
