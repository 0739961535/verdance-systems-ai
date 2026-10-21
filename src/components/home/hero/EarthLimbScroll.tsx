"use client";

import { useEffect, useRef } from "react";

/** Writes --y (0 to 1) on .el as it crosses the screen: one passive listener, one frame per scroll, only near the screen. */
export function EarthLimbScroll() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current?.closest<HTMLElement>(".el");
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const t = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      el.style.setProperty("--y", Math.min(1, Math.max(0, t)).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else window.removeEventListener("scroll", onScroll);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <span ref={ref} hidden aria-hidden />;
}
