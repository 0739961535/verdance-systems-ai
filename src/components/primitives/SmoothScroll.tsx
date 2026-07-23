"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll (Lenis) wired into GSAP ScrollTrigger.
 *
 * The critical detail: Lenis drives a *virtual* scroll position, so any
 * GSAP ScrollTrigger (pins, scrubs) must be told to update from Lenis and
 * both must share one clock — otherwise pinned sections desync, jump, and
 * blank out. We drive Lenis from gsap.ticker and call ScrollTrigger.update
 * on every Lenis scroll.
 *
 * DESKTOP ONLY. Lenis is disabled under reduced-motion AND on any touch
 * device. On real iOS Safari, Lenis intercepts touch and strands the user
 * on the first screen — and native mobile scrolling is already smooth, so
 * there is nothing to gain. On touch/narrow viewports we bail out and let
 * the browser scroll natively; framer-motion whileInView reveals fire off
 * the native scroll position exactly as they do on desktop.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const noHover = !window.matchMedia("(hover: hover)").matches;
    const isTouchDevice = coarsePointer || noHover || "ontouchstart" in window;
    const isNarrow = window.innerWidth < 1024;
    // Native scroll on mobile/touch/narrow — never run Lenis there.
    if (reduce || isTouchDevice || isNarrow) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    // Temporary rAF loop so scrolling is smooth immediately, before GSAP
    // finishes loading. Handed off to gsap.ticker once ready.
    let rafId = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    let removeGsap = () => {};

    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        gsap.registerPlugin(ScrollTrigger);

        // Hand off the clock: cancel the temp rAF, let gsap.ticker drive Lenis.
        cancelAnimationFrame(rafId);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        // Keep ScrollTrigger in lock-step with Lenis' virtual position.
        lenis.on("scroll", ScrollTrigger.update);

        // Recompute trigger geometry after layout/fonts settle.
        ScrollTrigger.refresh();
        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);

        removeGsap = () => {
          gsap.ticker.remove(tick);
          window.removeEventListener("resize", onResize);
        };
      } catch {
        // If GSAP fails to load, the temp rAF keeps Lenis running on its own.
      }
    })();

    return () => {
      cancelAnimationFrame(rafId);
      removeGsap();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
