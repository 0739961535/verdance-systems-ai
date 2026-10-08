"use client";

import { useEffect, useRef, useState } from "react";

/**
 * NumberTicker - counts up to a real number once, when it scrolls into
 * view. Renders the final value on the server and without JS; reduced
 * motion shows the final value. Only for true counts (steps, services),
 * never for invented performance figures.
 */
export function NumberTicker({ value, pad = 0, className }: { value: number; pad?: number; className?: string }) {
  const [n, setN] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen: leave it
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1100);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  const shown = n ?? value;
  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {String(shown).padStart(pad, "0")}
    </span>
  );
}
