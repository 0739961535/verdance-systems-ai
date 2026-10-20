"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's "we ship it" rocket: a small, blacked-out stainless stack
 * (hand-drawn vector), with a white ring and nose tip and a faint blue
 * engine glow.
 *
 * On load: one CSS lift-off with a soft trail, then it holds still.
 * On scroll: it ignites and flies away. As the visitor scrolls out of the
 * hero the rocket accelerates up and slightly right, tilts into the arc, its
 * flame grows, a jet trail stretches behind it and a few exhaust puffs bloom
 * on the pad. Driven by scroll position (one passive listener), so it reverses
 * exactly when scrolling back up.
 *
 * Performance: the SVG is server-rendered at a fixed size (no layout shift,
 * never the LCP). It starts after the page has loaded, and each scroll
 * frame writes transform and opacity only. The rocket only ever
 * moves up and away from the headline and button, never over them.
 * Reduced motion: a still rocket, no flight.
 */

const PUFFS = [
  { dx: -26, delay: 0 },
  { dx: 22, delay: 0.05 },
  { dx: -10, delay: 0.1 },
  { dx: 12, delay: 0.16 },
  { dx: 0, delay: 0.22 },
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function Rocket() {
  const rootRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const jetRef = useRef<HTMLSpanElement>(null);
  const flameRef = useRef<SVGGElement>(null);
  const puffRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    const fly = flyRef.current;
    const jet = jetRef.current;
    const flame = flameRef.current;
    if (!root || !fly || !jet || !flame) return;

    let stop: (() => void) | undefined;
    let cancelled = false;
    // Geometry, measured once and on resize (never inside the scroll frame).
    let span = 320; // px of scroll over which the flight happens
    let lift = 400; // px the rocket climbs on top of the page scroll
    let drift = 60; // px of sideways arc

    const measure = () => {
      const mobile = window.innerWidth < 768;
      const top = root.getBoundingClientRect().top + window.scrollY;
      span = mobile ? 170 : 260;
      // enough climb that it has left the top of the screen when the flight ends
      lift = Math.max(120, top + root.offsetHeight + (mobile ? 120 : 160) - span);
      drift = mobile ? 80 : 240;
    };

    const render = (y: number) => {
      const d = clamp01(y / span);
      const e = d * d; // ease in: slow ignition, then it accelerates away
      const x = e * drift;
      const ty = -e * lift;
      const rot = d * 24;
      fly.style.transform = `translate3d(${x.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      fly.style.opacity = d >= 1 ? "0" : "1";

      const jetIn = clamp01(d * 5);
      const jetOut = 1 - clamp01((d - 0.7) / 0.3);
      jet.style.opacity = (jetIn * jetOut).toFixed(3);
      jet.style.transform = `scaleY(${(0.1 + d * 1.9).toFixed(3)})`;

      flame.style.transform = `scale(${(1 + d * 0.25).toFixed(3)}, ${(1 + d * 2.2).toFixed(3)})`;

      PUFFS.forEach((p, i) => {
        const el = puffRefs.current[i];
        if (!el) return;
        const t = clamp01((d - p.delay) / 0.5);
        el.style.opacity = (Math.sin(Math.PI * t) * 0.75).toFixed(3);
        el.style.transform = `translate3d(${(p.dx * t).toFixed(1)}px, ${(6 * t).toFixed(1)}px, 0) scale(${(0.3 + t * 2.4).toFixed(3)})`;
      });
    };

    // one passive listener and one animation frame per scroll (no library)
    const start = async () => {
      if (cancelled) return;
      measure();
      render(window.scrollY);
      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          render(window.scrollY);
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      stop = () => {
        window.removeEventListener("scroll", onScroll);
        if (raf) cancelAnimationFrame(raf);
      };
    };

    const onResize = () => {
      measure();
      render(window.scrollY);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      stop?.();
      window.removeEventListener("load", start);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="rk" ref={rootRef} aria-hidden>
      {/* load-time trail and puffs (CSS, one shot) */}
      <span className="rk-trail" />
      <span className="rk-puff rk-puff-1" />
      <span className="rk-puff rk-puff-2" />
      <span className="rk-puff rk-puff-3" />

      {/* scroll-time exhaust on the pad */}
      <span className="rk-pad">
        {PUFFS.map((p, i) => (
          <span
            key={i}
            className="rk-smoke"
            ref={(el) => {
              if (el) puffRefs.current[i] = el;
            }}
          />
        ))}
      </span>

      <div className="rk-fly" ref={flyRef}>
        <span className="rk-jet" ref={jetRef} />
        <span className="rk-ship">
          <svg viewBox="0 0 80 140" width="100%" height="100%" fill="none" overflow="visible">
            <defs>
              {/* graphite body: lit from the left, falling to near black */}
              <linearGradient id="rk-body" x1="27" y1="0" x2="53" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#3A3F49" />
                <stop offset="0.28" stopColor="#23272F" />
                <stop offset="0.7" stopColor="#14171C" />
                <stop offset="1" stopColor="#0A0B0E" />
              </linearGradient>
              <linearGradient id="rk-fin" x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2A2E36" />
                <stop offset="1" stopColor="#0C0D10" />
              </linearGradient>
              <pattern id="rk-hex" width="4.6" height="4" patternUnits="userSpaceOnUse">
                <path d="M0 2 L1.15 0 H3.45 L4.6 2 L3.45 4 H1.15 Z" fill="none" stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="0.35" />
              </pattern>
              <radialGradient id="rk-glow" cx="40" cy="108" r="14" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#8FB0FF" stopOpacity="0.55" />
                <stop offset="1" stopColor="#4D7CFF" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="rk-flame-outer" x1="40" y1="106" x2="40" y2="142" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#86ABFF" />
                <stop offset="0.5" stopColor="#5B8FFF" stopOpacity="0.55" />
                <stop offset="1" stopColor="#5B8FFF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="rk-flame-core" x1="40" y1="106" x2="40" y2="128" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset="0.6" stopColor="#D6E3FF" stopOpacity="0.8" />
                <stop offset="1" stopColor="#D6E3FF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* flame: the outer group is scaled by scroll, the inner one flickers on load */}
            <g ref={flameRef} className="rk-flame-js">
              <g className="rk-flame">
                <path d="M32.5 106 C32 119 36.5 131 40 142 C43.5 131 48 119 47.5 106 Z" fill="url(#rk-flame-outer)" />
                <path d="M36 106 C36 114 38.3 121.5 40 128 C41.7 121.5 44 114 44 106 Z" fill="url(#rk-flame-core)" />
              </g>
            </g>

            {/* faint engine glow under the base */}
            <ellipse cx="40" cy="108" rx="14" ry="6" fill="url(#rk-glow)" />

            {/* small aft flaps, behind the body */}
            <path d="M28.5 82 L22 92 L22.5 101 L28.5 99 Z" fill="url(#rk-fin)" />
            <path d="M51.5 82 L58 92 L57.5 101 L51.5 99 Z" fill="url(#rk-fin)" />
            {/* forward flaps */}
            <path d="M30.2 26 L26.4 33 L26.8 40 L30.6 38.5 Z" fill="url(#rk-fin)" />
            <path d="M49.8 26 L53.6 33 L53.2 40 L49.4 38.5 Z" fill="url(#rk-fin)" />

            {/* engines */}
            <path d="M33 103 H47 L45.6 107.5 H34.4 Z" fill="#0A0B0E" />

            {/* body: one slim stainless stack, blacked out */}
            <path
              className="rk-hull-path"
              d="M40 4 C46.4 9.5 50 17 50.6 26 L51.6 103.5 H28.4 L29.4 26 C30 17 33.6 9.5 40 4 Z"
              fill="url(#rk-body)"
            />
            {/* heat-tile hint on the shadow side */}
            <path d="M40 4 C46.4 9.5 50 17 50.6 26 L51.6 103.5 H40 Z" fill="url(#rk-hex)" />
            {/* rim light along the lit edge (stronger in dark mode, CSS) */}
            <path className="rk-rim rk-rim-a" d="M31.2 24 C32.6 15.5 35.6 9.5 40 5" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="0.8" strokeLinecap="round" />
            <path className="rk-rim rk-rim-b" d="M29.6 30 L28.9 101" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="0.8" strokeLinecap="round" />
            {/* the white ring at the stage join, and a white nose tip */}
            <path d="M29.15 58.5 C35.5 59.7 44.5 59.7 50.85 58.5 L50.9 61.2 C44.5 62.4 35.5 62.4 29.1 61.2 Z" fill="#E9EDF4" fillOpacity="0.9" />
            <path d="M40 4 C42.1 5.8 43.8 7.8 45 10 C41.8 9.3 38.2 9.3 35 10 C36.2 7.8 37.9 5.8 40 4 Z" fill="#E9EDF4" />
          </svg>
        </span>
      </div>
    </div>
  );
}
