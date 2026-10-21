"use client";

import { useEffect, useRef } from "react";

/**
 * "Anything is possible." The turn from the real builds (paper) into the
 * concepts (night). The section is taller than the screen with a sticky
 * stage; as it scrolls past, a night layer fades in over the paper and the
 * words grow to fill the width. Only opacity and transform change, driven by
 * one CSS variable (--p, 0 to 1) set from a small rAF loop that runs only
 * while the section is on screen. Reduced motion: the end state, no scroll link.
 */

const CSS = `
.ps-wrap { position: relative; height: 190vh; background: #F4F1EA; }
@media (max-width: 767.98px) { .ps-wrap { height: 160vh; } }
.ps-stick { position: sticky; top: 0; height: 100vh; height: 100svh; overflow: hidden; display: grid; place-items: center; --p: 0; }
.ps-night { position: absolute; inset: 0; background: #060B1A; opacity: clamp(0, calc((var(--p) - 0.14) * 3), 1); }
.ps-glow { position: absolute; left: 50%; top: 50%; width: 120vmax; height: 120vmax; margin: -60vmax 0 0 -60vmax; border-radius: 999px; pointer-events: none;
  background: radial-gradient(closest-side, rgba(77,124,255,0.32), rgba(77,124,255,0.08) 50%, transparent 70%);
  opacity: clamp(0, calc((var(--p) - 0.35) * 2.4), 1); transform: scale(calc(0.6 + var(--p) * 0.5)); }
.ps-words { position: relative; width: 100%; padding: 0 16px; text-align: center;
  transform: scale(calc(0.62 + min(var(--p) * 1.6, 1) * 0.38)); transform-origin: 50% 50%; }
.ps-h { position: relative; margin: 0; font-family: var(--font-display); font-weight: 650; line-height: 0.86; letter-spacing: -0.065em;
  font-size: clamp(3.5rem, 18.6vw, 22rem); }
@media (min-width: 768px) { .ps-h { font-size: clamp(6rem, 18.4vw, 22rem); } }
.ps-h span { display: block; white-space: nowrap; }
.ps-h .ps-l { position: absolute; inset: 0; color: #F2F5FC; opacity: clamp(0, calc((var(--p) - 0.16) * 3), 1); }
.ps-h .ps-l em { font-style: normal; color: #8FB0FF; }
.ps-h .ps-d { color: #0E0E10; opacity: calc(1 - clamp(0, calc((var(--p) - 0.16) * 3), 1)); }
.ps-h .ps-d em { font-style: normal; color: #2554D4; }
.ps-cap { position: absolute; left: 0; right: 0; bottom: 8vh; text-align: center; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
  color: #8FB0FF; opacity: clamp(0, calc((var(--p) - 0.6) * 3), 1); }
@media (max-width: 767.98px) { .ps-cap { bottom: 22vh; } }
@media (prefers-reduced-motion: reduce) {
  .ps-wrap { height: auto; background: #060B1A; }
  .ps-stick { position: relative; height: auto; padding: 120px 0; --p: 1 !important; }
  .ps-cap { position: static; margin-top: 40px; }
}
`;

export function PossibleStatement() {
  const wrap = useRef<HTMLDivElement>(null);
  const stick = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const s = stick.current;
    if (!w || !s) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let on = false;
    let last = -1;
    const tick = () => {
      const r = w.getBoundingClientRect();
      const vh = window.innerHeight;
      const run = Math.max(1, r.height - vh);
      // start a little before the stage pins, so the turn begins as it arrives
      const p = Math.min(1, Math.max(0, (vh * 0.35 - r.top) / (run + vh * 0.35)));
      if (Math.abs(p - last) > 0.001) {
        s.style.setProperty("--p", p.toFixed(4));
        last = p;
      }
      if (on) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        on = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (on) raf = requestAnimationFrame(tick);
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(w);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={wrap} className="ps-wrap" aria-label="Anything is possible">
      <style>{CSS}</style>
      <div ref={stick} className="ps-stick">
        <span className="ps-night" aria-hidden />
        <span className="ps-glow" aria-hidden />
        <div className="ps-words">
          <h2 className="ps-h">
            <span className="ps-d">
              <span>Anything</span>
              <span>
                is <em>possible.</em>
              </span>
            </span>
            <span className="ps-l" aria-hidden>
              <span>Anything</span>
              <span>
                is <em>possible.</em>
              </span>
            </span>
          </h2>
        </div>
        <p className="ps-cap" aria-hidden>
          Ideas we built to show it
        </p>
      </div>
    </section>
  );
}
