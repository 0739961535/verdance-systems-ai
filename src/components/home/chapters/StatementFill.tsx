"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets --p (0 to 1) on its wrapper as it scrolls from 80% to 30% of the
 * viewport; the statement's words read it to fill with ink. One custom
 * property per frame, only while on screen; reduced motion: fully inked.
 */
export function StatementFill({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let on = false;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      const p = Math.min(1, Math.max(0, (h * 0.8 - r.top) / (h * 0.5)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (on && !raf) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      if (on) onScroll();
    });
    el.style.setProperty("--p", "0");
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return <div ref={ref}>{children}</div>;
}
