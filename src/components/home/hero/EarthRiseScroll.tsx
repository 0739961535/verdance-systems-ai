"use client";

import { useEffect, useRef } from "react";

/**
 * Writes the EarthRise scene's progress (--p, 0 to 1) from the scroll: one
 * passive listener, one animation frame per scroll, only while the scene is
 * near the screen. Eased toward the target so it glides. Reduced motion:
 * nothing runs and the settled frame (--p: 1, the CSS default) shows.
 */
export function EarthRiseScroll() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current?.closest<HTMLElement>(".er");
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let shown = 0;
    let goal = 0;
    let raf = 0;
    let on = false;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      // start as the scene's top enters the bottom of the screen
      const t = (window.innerHeight - r.top) / (travel + window.innerHeight);
      goal = Math.min(1, Math.max(0, t * 1.15));
    };
    const tick = () => {
      raf = 0;
      const d = goal - shown;
      shown = Math.abs(d) < 0.001 ? goal : shown + d * 0.16;
      el.style.setProperty("--p", shown.toFixed(4));
      if (shown !== goal) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    measure();
    shown = goal;
    el.style.setProperty("--p", shown.toFixed(4));
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !on) {
          on = true;
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll, { passive: true });
          onScroll();
        } else if (!e.isIntersecting && on) {
          on = false;
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      },
      { rootMargin: "50% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <span ref={ref} hidden aria-hidden />;
}
