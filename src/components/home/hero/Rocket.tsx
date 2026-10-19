"use client";

import { useEffect, useRef } from "react";
import { BoosterPlume, BOOSTER_OFFSET, rocketSet, STACK_H } from "../../rocket/RocketArt";

/**
 * The hero's "we ship it" rocket.
 *
 * On load: one CSS lift-off with a soft trail, then it holds still.
 * On scroll: it ignites and flies away. As the visitor scrolls out of the
 * hero the rocket accelerates up and slightly right, tilts into the arc, its
 * flame grows, a jet trail stretches behind it and a few exhaust puffs bloom
 * on the pad. Driven by scroll position, so it reverses
 * exactly when scrolling back up.
 *
 * Performance: fixed-size picture (no layout shift, never the LCP), a plain
 * passive scroll listener (no animation library), and each scroll frame
 * writes transform and opacity only. The rocket only ever
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

      // at rest the engine idles low so the plume stays clear of the headline
      flame.style.transform = `scale(${(0.9 + d * 0.35).toFixed(3)}, ${(0.45 + d * 2.75).toFixed(3)})`;

      PUFFS.forEach((p, i) => {
        const el = puffRefs.current[i];
        if (!el) return;
        const t = clamp01((d - p.delay) / 0.5);
        el.style.opacity = (Math.sin(Math.PI * t) * 0.75).toFixed(3);
        el.style.transform = `translate3d(${(p.dx * t).toFixed(1)}px, ${(6 * t).toFixed(1)}px, 0) scale(${(0.3 + t * 2.4).toFixed(3)})`;
      });
    };

    // A plain passive scroll listener with one rAF per frame: no animation
    // library to download, so nothing extra lands near the first paint.
    const start = () => {
      if (cancelled) return;
      measure();
      render(window.scrollY);
      let frame = 0;
      const onScroll = () => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          render(window.scrollY);
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      stop = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
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
          <svg className="rk-plume" viewBox={`0 0 80 ${STACK_H}`} width="100%" height="100%" fill="none" overflow="visible">
            <g transform={`translate(0 ${BOOSTER_OFFSET})`}>
              {/* flame: the outer group is scaled by scroll, the inner one flickers on load */}
              <BoosterPlume id="rk" flameRef={flameRef} flameClass="rk-flame-js" flickerClass="rk-flame" outerClass="rk-flame-b" />
            </g>
          </svg>
          {/* photoreal render (see RocketArt.tsx), AVIF with WebP fallback */}
          <picture>
            <source type="image/avif" srcSet={rocketSet("stack", "avif")} sizes="(min-width: 768px) 50px, 38px" />
            { }
            <img
              className="rk-hull"
              src="/rocket/stack-120.webp"
              srcSet={rocketSet("stack", "webp")}
              sizes="(min-width: 768px) 50px, 38px"
              alt=""
              width={80}
              height={348}
              decoding="async"
              fetchPriority="low"
              draggable={false}
            />
          </picture>
        </span>
      </div>
    </div>
  );
}
