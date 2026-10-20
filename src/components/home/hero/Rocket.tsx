"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's "we ship it" rocket: the ship from the locked Verdance rocket
 * design (white nose, the V, the azure line, the fins), small, with a soft
 * blue engine glow and, in the light theme, a faint contact shadow.
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
          {/* the ship (the upper stage of the locked design), sized for its
              display box: 1x to 3x, AVIF then WebP, PNG fallback */}
          <picture className="rk-pic">
            <source type="image/avif" srcSet="/hero/ship@1x.avif 1x, /hero/ship@2x.avif 2x, /hero/ship@3x.avif 3x" />
            <source type="image/webp" srcSet="/hero/ship@1x.webp 1x, /hero/ship@2x.webp 2x, /hero/ship@3x.webp 3x" />
            <img src="/hero/ship@2x.png" alt="" width={45} height={92} decoding="async" draggable={false} />
          </picture>
          {/* engine light under the base: the outer group grows with scroll,
              the inner one flickers on load */}
          <svg className="rk-flame-svg" viewBox="0 0 30 40" fill="none" overflow="visible">
            <defs>
              <linearGradient id="rk-flame-outer" x1="15" y1="0" x2="15" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#86ABFF" />
                <stop offset="0.5" stopColor="#5B8FFF" stopOpacity="0.55" />
                <stop offset="1" stopColor="#5B8FFF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="rk-flame-core" x1="15" y1="0" x2="15" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset="0.6" stopColor="#D6E3FF" stopOpacity="0.8" />
                <stop offset="1" stopColor="#D6E3FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g ref={flameRef} className="rk-flame-js">
              <g className="rk-flame">
                <path d="M7.5 0 C7 14 11.5 28 15 40 C18.5 28 23 14 22.5 0 Z" fill="url(#rk-flame-outer)" />
                <path d="M11 0 C11 9 13.3 17 15 24 C16.7 17 19 9 19 0 Z" fill="url(#rk-flame-core)" />
              </g>
            </g>
          </svg>
          <span className="rk-glow" />
        </span>
        <span className="rk-contact" />
      </div>
    </div>
  );
}
