"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's "we ship it" rocket.
 *
 * On load: one CSS lift-off with a soft trail, then it holds still.
 * On scroll: it ignites and flies away. As the visitor scrolls out of the
 * hero the rocket accelerates up and slightly right, tilts into the arc, its
 * flame grows, a jet trail stretches behind it and a few exhaust puffs bloom
 * on the pad. Driven by scroll position (Motion's `scroll`), so it reverses
 * exactly when scrolling back up.
 *
 * Performance: the SVG is server-rendered at a fixed size (no layout shift,
 * never the LCP). Motion is imported only after the page has loaded, and
 * each scroll frame writes transform and opacity only. The rocket only ever
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

    const start = async () => {
      const { scroll } = await import("motion");
      if (cancelled) return;
      measure();
      render(window.scrollY);
      stop = scroll((_: number, info: { y: { current: number } }) => render(info.y.current));
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
              <linearGradient id="rk-body" x1="23" y1="0" x2="57" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset="0.42" stopColor="#F3F5FA" />
                <stop offset="0.78" stopColor="#D9DFEA" />
                <stop offset="1" stopColor="#B9C3D6" />
              </linearGradient>
              <linearGradient id="rk-accent" x1="0" y1="6" x2="0" y2="110" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#6E9CFF" />
                <stop offset="1" stopColor="#1F45B8" />
              </linearGradient>
              <linearGradient id="rk-fin-l" x1="12" y1="0" x2="27" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#5B8FFF" />
                <stop offset="1" stopColor="#2554D4" />
              </linearGradient>
              <linearGradient id="rk-fin-r" x1="53" y1="0" x2="68" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2554D4" />
                <stop offset="1" stopColor="#173A9E" />
              </linearGradient>
              <linearGradient id="rk-nozzle" x1="30" y1="0" x2="50" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#3A4560" />
                <stop offset="0.5" stopColor="#1B2233" />
                <stop offset="1" stopColor="#0D111B" />
              </linearGradient>
              <radialGradient id="rk-glass" cx="37" cy="47" r="10" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#9DBBFF" />
                <stop offset="0.55" stopColor="#2F5FE0" />
                <stop offset="1" stopColor="#0F1E4D" />
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

            {/* fins behind the body */}
            <path d="M26.6 70 C17.5 78 12.6 90 12 107 C15.6 102.5 20.6 99.5 27 98.2 Z" fill="url(#rk-fin-l)" />
            <path d="M53.4 70 C62.5 78 67.4 90 68 107 C64.4 102.5 59.4 99.5 53 98.2 Z" fill="url(#rk-fin-r)" />

            {/* nozzle */}
            <path d="M30.5 98 H49.5 L47 107 H33 Z" fill="url(#rk-nozzle)" />
            <path d="M33 107 H47" stroke="#0A0D15" strokeWidth="1" strokeLinecap="round" />

            {/* body */}
            <path
              d="M40 6 C52.5 18 58.2 38 57.2 62 C56.7 76 55.2 88 53 98.5 H27 C24.8 88 23.3 76 22.8 62 C21.8 38 27.5 18 40 6 Z"
              fill="url(#rk-body)"
              stroke="#1B2A4F"
              strokeOpacity="0.28"
              strokeWidth="1"
            />
            {/* nose cap */}
            <path d="M40 6 C46.6 12.4 50.9 20.4 53.4 29.2 C45.2 26.6 34.8 26.6 26.6 29.2 C29.1 20.4 33.4 12.4 40 6 Z" fill="url(#rk-accent)" />
            {/* specular highlight */}
            <path d="M29.4 34 C27.4 46 27.2 62 28.6 84" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
            {/* panel seams */}
            <path d="M24.4 81.5 C34.5 83.6 45.5 83.6 55.6 81.5" stroke="#1B2A4F" strokeOpacity="0.18" strokeWidth="0.9" />
            <path d="M25.9 93 C35 94.6 45 94.6 54.1 93" stroke="#1B2A4F" strokeOpacity="0.14" strokeWidth="0.9" />

            {/* window */}
            <circle cx="40" cy="50" r="9.4" fill="#E6EBF4" stroke="#9AA6BE" strokeWidth="1.2" />
            <circle cx="40" cy="50" r="6.6" fill="url(#rk-glass)" />
            <ellipse cx="37.6" cy="47.4" rx="2.3" ry="1.5" fill="#FFFFFF" fillOpacity="0.85" transform="rotate(-35 37.6 47.4)" />

            {/* centre fin, seen edge on */}
            <rect x="38.6" y="86" width="2.8" height="21" rx="1.4" fill="url(#rk-accent)" />
          </svg>
        </span>
      </div>
    </div>
  );
}
