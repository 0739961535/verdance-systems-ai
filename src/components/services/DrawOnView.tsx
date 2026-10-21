"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Plays a line drawing once, when it scrolls into view. Children mark
 * their parts with:
 *   .dv-line  an SVG path/line with pathLength={1}: drawn in with stroke-dashoffset
 *   .dv-fade  anything: faded in with opacity
 * and an optional --d (seconds) delay in their style. Only opacity and
 * stroke-dashoffset animate (0.7s). Before hydration, without JS, and
 * under reduced motion everything is simply drawn: the hidden start state
 * is only applied once this component has mounted.
 */

const CSS = `
.dov[data-armed] .dv-line { stroke-dasharray: 1; stroke-dashoffset: 1; }
.dov[data-armed] .dv-fade { opacity: 0; }
/* Transitions only on the way in, so arming hides everything at once. */
.dov[data-armed][data-in] .dv-line { stroke-dashoffset: 0; transition: stroke-dashoffset 0.7s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: var(--d, 0s); }
.dov[data-armed][data-in] .dv-fade { opacity: 1; transition: opacity 0.6s ease; transition-delay: var(--d, 0s); }
`;

export function DrawOnView({ children, className = "", threshold = 0.3 }: { children: ReactNode; className?: string; threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const r = el.getBoundingClientRect();
    // Already on screen at load: leave it drawn rather than flash it out.
    if (r.top < window.innerHeight * 0.85 && r.bottom > 0) return;
    el.setAttribute("data-armed", "");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return (
    <div ref={ref} className={`dov ${className}`}>
      <style>{CSS}</style>
      {children}
    </div>
  );
}
