"use client";

import { useEffect } from "react";

/**
 * Smooth scroll (Lenis, MIT) - desktop only, loaded on demand.
 *
 * Lenis is skipped entirely (not even downloaded) under reduced motion, on
 * touch devices and below 1024px: native momentum scrolling is already
 * smooth there, and Lenis intercepting touch can strand iOS Safari users.
 * Nothing on the site pins or scrubs with GSAP any more (the stories use
 * CSS sticky + IntersectionObserver), so Lenis runs on its own rAF loop.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const noHover = !window.matchMedia("(hover: hover)").matches;
    const isTouchDevice = coarsePointer || noHover || "ontouchstart" in window;
    const isNarrow = window.innerWidth < 1024;
    if (reduce || isTouchDevice || isNarrow) return;

    let cancelled = false;
    let rafId = 0;
    let destroy = () => {};

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      const loop = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
      destroy = () => lenis.destroy();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      destroy();
    };
  }, []);

  return <>{children}</>;
}
