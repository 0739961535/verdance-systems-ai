"use client";

import { useEffect, useRef } from "react";

/**
 * FlowDot: one small light that travels along an SVG path, so a flow
 * diagram reads as "work moves this way". Render it inside the <svg>.
 *
 * It waits until the diagram is on screen (and, inside a <DrawOnView>, until
 * the lines have drawn), then runs along the path with an ease-in-out, fades
 * out at the end, rests, and goes again. Only transform and opacity change
 * (rAF + getPointAtLength, so it works the same in WebKit and Chromium).
 * It pauses off screen. Reduced motion or no JS: nothing is drawn at all.
 */

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function FlowDot({
  d,
  duration = 2600,
  rest = 2200,
  startDelay = 1900,
}: {
  /** The route, in the parent SVG's user units. */
  d: string;
  duration?: number;
  rest?: number;
  /** Wait after the diagram comes into view (lets the lines draw first). */
  startDelay?: number;
}) {
  const gRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const g = gRef.current;
    const path = pathRef.current;
    if (!g || !path) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const svg = g.ownerSVGElement;
    if (!svg) return;

    const len = path.getTotalLength();
    let raf = 0;
    let visible = false;
    let started = false;
    let t0 = 0;
    const cycle = duration + rest;

    const place = (p: number, o: number) => {
      const pt = path.getPointAtLength(len * p);
      g.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      g.style.opacity = o.toFixed(3);
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      if (now < t0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const e = (now - t0) % cycle;
      if (e < duration) {
        const u = e / duration;
        // Fade in over the first 8%, out over the last 12%.
        const o = u < 0.08 ? u / 0.08 : u > 0.88 ? (1 - u) / 0.12 : 1;
        place(ease(u), o);
      } else {
        g.style.opacity = "0";
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((en) => en.isIntersecting);
        if (visible && !started) {
          started = true;
          t0 = performance.now() + startDelay;
        }
        if (visible && !raf) raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    io.observe(svg);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [duration, rest, startDelay]);

  return (
    <>
      <path ref={pathRef} d={d} fill="none" stroke="none" aria-hidden="true" />
      <g ref={gRef} className="fd" aria-hidden="true" style={{ opacity: 0 }}>
        <circle r={11} fill="rgba(77, 124, 255, 0.28)" />
        <circle r={4.5} fill="#EAF0FF" />
      </g>
    </>
  );
}
