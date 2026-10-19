"use client";

import { useEffect } from "react";

/**
 * Smooth scroll (Lenis, MIT) - desktop only, loaded on demand.
 *
 * Lenis is skipped entirely (not even downloaded) under reduced motion, on
 * touch devices and below 1024px: native momentum scrolling is already
 * smooth there, and Lenis intercepting touch can strand iOS Safari users.
 * The home film scrubs with GSAP ScrollTrigger, so Lenis runs on GSAP's
 * ticker and updates ScrollTrigger on every scroll.
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
    let destroy = () => {};

    // Lenis driven by GSAP's ticker and feeding ScrollTrigger, per the
    // official integration, so the scrubbed film and smooth scroll share one
    // clock (no double rAF, no drift).
    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
        });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        destroy = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      },
    );

    return () => {
      cancelled = true;
      destroy();
    };
  }, []);

  return <>{children}</>;
}
