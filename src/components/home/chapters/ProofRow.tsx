"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Promise proof row: three facts, each with a small live element.
 * (a) a reply timer that eases up to 0:38, lands with a soft pulse, then the
 *     "Replied" chip slides in
 * (b) a 24 hour dial: the sun travels the arc and becomes the moon, the sky
 *     shifts from day to night, the ticks light as it passes
 * (c) a 10 day track: segments fill with a moving highlight, then "Live"
 *
 * Plays once, the first time the row is on screen. The server HTML is the
 * finished state, so no JS and reduced motion both get a calm, static row.
 * After hydration (motion allowed) each fact is set to data-stage="ready"
 * (start state, still below the fold), then "play" when that fact scrolls in.
 * Only transform, opacity and an SVG stroke offset animate; the two numbers
 * are text swaps driven by one requestAnimationFrame loop.
 */

const FACTS = [
  { title: "Answered within 60 seconds.", body: "First-response time on WhatsApp, email, website chat and calls." },
  { title: "Day, night and weekends.", body: "After-hours and weekend enquiries handled to the same service level." },
  { title: "Live in 10 working days.", body: "From signed plan to go-live: set up in your accounts, trained on your voice." },
] as const;

/* ---------------- timing (seconds) ---------------- */
const TARGET = 38;
const T_COUNT_START = 0.3;
const T_COUNT_DUR = 1.5;
const T_LAND = T_COUNT_START + T_COUNT_DUR;

const DIAL_START = 0.25;
const DIAL_DUR = 3.2;
const A0 = 12; // degrees above the left horizon at the start
const A1 = 168; // and at the end
const DIAL_EASE: [number, number, number, number] = [0.45, 0, 0.55, 1];
const TICKS = [15, 40, 65, 90, 115, 140, 165];

const SEG_START = 0.2;
const SEG_STEP = 0.11;
const SEG_DUR = 0.34;
const T_LIVE = SEG_START + 9 * SEG_STEP + SEG_DUR + 0.05;

/** Time fraction at which a cubic-bezier easing reaches progress y. */
function easeTimeAt(y: number, [x1, y1, x2, y2]: [number, number, number, number]) {
  const b = (s: number, p1: number, p2: number) => 3 * (1 - s) * (1 - s) * s * p1 + 3 * (1 - s) * s * s * p2 + s * s * s;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (b(mid, y1, y2) < y) lo = mid;
    else hi = mid;
  }
  return b((lo + hi) / 2, x1, x2);
}

const tickDelay = (deg: number) => DIAL_START + DIAL_DUR * easeTimeAt((deg - A0) / (A1 - A0), DIAL_EASE);

/* ---------------- dial geometry ---------------- */
const CX = 70;
const CY = 64;
const R = 46; // body orbit
const pt = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [CX - r * Math.cos(a), CY - r * Math.sin(a)] as const;
};
const ARC = (() => {
  const [sx, sy] = pt(A0, R);
  const [ex, ey] = pt(A1, R);
  return `M${sx.toFixed(2)} ${sy.toFixed(2)} A${R} ${R} 0 0 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
})();
const TRACK = `M${CX - R} ${CY} A${R} ${R} 0 0 1 ${CX + R} ${CY}`;
const SKY = `M${CX - 60} ${CY} A60 60 0 0 1 ${CX + 60} ${CY} Z`;

const s = (n: number) => `${n.toFixed(3)}s`;

const CSS = `
.pr-vis { height: 76px; display: flex; align-items: flex-end; }
@media (min-width: 1024px) { .pr-vis { height: 92px; } }
.pr-num { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }
.pr-chip { position: relative; display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; border-radius: 999px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.01em; }
.pr-replied { background: rgba(77,124,255,0.16); color: #B9CCFF; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.35); }
.pr-bar { height: 2px; border-radius: 2px; background: rgba(255,255,255,0.08); overflow: hidden; }
.pr-bar > i { display: block; height: 100%; width: 100%; background: linear-gradient(90deg, #4D7CFF, #8FB0FF); transform-origin: left; transform: scaleX(${(TARGET / 60).toFixed(4)}); }
.pr-count { display: inline-block; transform-origin: 0 100%; }
.pr-ring { position: absolute; inset: -1px; border-radius: inherit; box-shadow: 0 0 0 1px rgba(143,176,255,0.7), 0 0 18px rgba(77,124,255,0.55); opacity: 0; pointer-events: none; }

/* 24 hour dial */
.pr-dial { display: block; width: 140px; height: 72px; overflow: visible; }
.pr-orbit, .pr-moon-face { transform-box: view-box; }
.pr-orbit { transform-origin: ${CX}px ${CY}px; transform: rotate(${A1}deg); }
.pr-moon-face { transform-box: fill-box; transform-origin: center; transform: rotate(-${A1}deg); }
.pr-sun { opacity: 0; }
.pr-day { opacity: 0; }
.pr-tick-on { opacity: 1; }
.pr-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; width: 132px; }
.pr-days span { position: relative; height: 3px; border-radius: 2px; background: rgba(143,176,255,0.18); overflow: hidden; }
.pr-days span > i { position: absolute; inset: 0; background: #8FB0FF; }

/* 10 day track */
.pr-track { display: grid; grid-template-columns: repeat(10, 1fr); gap: 5px; }
.pr-seg { height: 8px; border-radius: 3px; background: rgba(255,255,255,0.08); position: relative; overflow: hidden; }
.pr-seg > i { position: absolute; inset: 0; background: #4D7CFF; transform-origin: left; }
.pr-seg:last-child > i { background: #8FB0FF; }
.pr-seg > b { position: absolute; top: 0; bottom: 0; left: 0; width: 70%; background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.55), rgba(255,255,255,0)); opacity: 0; transform: translateX(-100%); }
.pr-live { background: rgba(143,176,255,0.16); color: #DCE6FF; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.4); }
.pr-dot { position: relative; width: 6px; height: 6px; border-radius: 50%; background: #8FB0FF; }
.pr-dot::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: #8FB0FF; opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  /* ready: the start of every sequence (set by JS, below the fold) */
  .pr-it[data-stage="ready"] .pr-bar > i { transform: scaleX(0); }
  .pr-it[data-stage="ready"] .pr-replied { opacity: 0; transform: translateX(-8px); }
  .pr-it[data-stage="ready"] .pr-orbit { transform: rotate(${A0}deg); }
  .pr-it[data-stage="ready"] .pr-moon-face { transform: rotate(-${A0}deg); }
  .pr-it[data-stage="ready"] .pr-sun, .pr-it[data-stage="ready"] .pr-day { opacity: 1; }
  .pr-it[data-stage="ready"] .pr-moon { opacity: 0; }
  .pr-it[data-stage="ready"] .pr-arc { stroke-dashoffset: 1; }
  .pr-it[data-stage="ready"] .pr-tick-on { opacity: 0; }
  .pr-it[data-stage="ready"] .pr-days i { transform: scaleX(0); }
  .pr-it[data-stage="ready"] .pr-seg > i { transform: scaleX(0); }
  .pr-it[data-stage="ready"] .pr-live { opacity: 0; transform: translateX(-8px); }

  /* play */
  .pr-it[data-stage="play"] .pr-bar > i { animation: pr-bar ${s(T_COUNT_DUR)} cubic-bezier(.33,1,.68,1) ${s(T_COUNT_START)} both; }
  .pr-it[data-stage="play"] .pr-count { animation: pr-land .6s cubic-bezier(.2,.8,.2,1) ${s(T_LAND - 0.05)} both; }
  .pr-it[data-stage="play"] .pr-replied { animation: pr-slide .5s cubic-bezier(.2,.8,.2,1) ${s(T_LAND + 0.05)} both; }
  .pr-it[data-stage="play"] .pr-replied .pr-ring { animation: pr-ring .9s ease-out ${s(T_LAND + 0.2)} both; }

  .pr-it[data-stage="play"] .pr-orbit { animation: pr-orbit ${s(DIAL_DUR)} cubic-bezier(${DIAL_EASE.join(",")}) ${s(DIAL_START)} both; }
  .pr-it[data-stage="play"] .pr-moon-face { animation: pr-counter ${s(DIAL_DUR)} cubic-bezier(${DIAL_EASE.join(",")}) ${s(DIAL_START)} both; }
  .pr-it[data-stage="play"] .pr-arc { animation: pr-draw ${s(DIAL_DUR)} cubic-bezier(${DIAL_EASE.join(",")}) ${s(DIAL_START)} both; }
  .pr-it[data-stage="play"] .pr-sun { animation: pr-sun ${s(DIAL_DUR)} ease-in-out ${s(DIAL_START)} both; }
  .pr-it[data-stage="play"] .pr-moon { animation: pr-moon ${s(DIAL_DUR)} ease-in-out ${s(DIAL_START)} both; }
  .pr-it[data-stage="play"] .pr-day { animation: pr-dusk ${s(DIAL_DUR)} ease-in-out ${s(DIAL_START)} both; }
  .pr-it[data-stage="play"] .pr-tick-on { animation: pr-tick .5s ease-out var(--td) both; }
  .pr-it[data-stage="play"] .pr-days i { animation: pr-fill .35s cubic-bezier(.2,.8,.2,1) var(--td) both; }

  .pr-it[data-stage="play"] .pr-seg > i { animation: pr-fill ${s(SEG_DUR)} cubic-bezier(.2,.8,.2,1) var(--sd) both; }
  .pr-it[data-stage="play"] .pr-seg > b { animation: pr-sheen .55s ease-out calc(var(--sd) + 0.08s) both; }
  .pr-it[data-stage="play"] .pr-live { animation: pr-slide .5s cubic-bezier(.2,.8,.2,1) ${s(T_LIVE)} both; }
  .pr-it[data-stage="play"] .pr-dot::after { animation: pr-ping 1.2s ease-out ${s(T_LIVE + 0.25)} 2; }
}
@keyframes pr-bar { from { transform: scaleX(0); } to { transform: scaleX(${(TARGET / 60).toFixed(4)}); } }
@keyframes pr-land { 0% { transform: none; } 35% { transform: scale(1.045); } 100% { transform: none; } }
@keyframes pr-slide { from { opacity: 0; transform: translateX(-8px) scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes pr-ring { 0% { opacity: 0.9; transform: scale(1); } 100% { opacity: 0; transform: scale(1.35, 1.6); } }
@keyframes pr-orbit { from { transform: rotate(${A0}deg); } to { transform: rotate(${A1}deg); } }
@keyframes pr-counter { from { transform: rotate(-${A0}deg); } to { transform: rotate(-${A1}deg); } }
@keyframes pr-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes pr-sun { 0%, 42% { opacity: 1; } 62%, 100% { opacity: 0; } }
@keyframes pr-moon { 0%, 48% { opacity: 0; } 70%, 100% { opacity: 1; } }
@keyframes pr-dusk { 0%, 25% { opacity: 1; } 80%, 100% { opacity: 0; } }
@keyframes pr-tick { from { opacity: 0; } to { opacity: 1; } }
@keyframes pr-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes pr-sheen { 0% { opacity: 0; transform: translateX(-100%); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateX(150%); } }
@keyframes pr-ping { 0% { opacity: 0.7; transform: scale(1); } 100% { opacity: 0; transform: scale(3); } }
`;

function ReplyTimer({ numRef }: { numRef: RefObject<HTMLSpanElement | null> }) {
  return (
    <div className="w-full">
      <div className="flex items-end gap-3">
        <span
          className="pr-num font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] text-[#F2F5FC] lg:text-[3.75rem]"
          aria-hidden
        >
          <span ref={numRef} className="pr-count">{`0:${TARGET}`}</span>
        </span>
        <span className="pr-chip pr-replied mb-1.5" aria-hidden>
          <span className="pr-ring" />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Replied
        </span>
      </div>
      <div className="pr-bar mt-3 w-[132px]" aria-hidden>
        <i />
      </div>
    </div>
  );
}

function DayNight() {
  const [bx, by] = [CX - R, CY];
  return (
    <div aria-hidden>
      <div className="flex items-end gap-3">
        <svg className="pr-dial" viewBox="0 0 140 72" fill="none">
          <defs>
            <linearGradient id="pr-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4D7CFF" stopOpacity="0.16" />
              <stop offset="1" stopColor="#4D7CFF" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="pr-daysky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8FB0FF" stopOpacity="0.30" />
              <stop offset="1" stopColor="#FFD27A" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          {/* sky: night underneath, day on top fading out as the sun sets */}
          <path d={SKY} fill="url(#pr-night)" />
          <path className="pr-day" d={SKY} fill="url(#pr-daysky)" />
          <path d={SKY} stroke="rgba(143,176,255,0.22)" strokeWidth="1" fill="none" />
          {/* ticks: dim base, bright copy lights as the body passes */}
          {TICKS.map((deg) => {
            const [x1, y1] = pt(deg, 52);
            const [x2, y2] = pt(deg, 57);
            return (
              <g key={deg}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(143,176,255,0.22)" strokeWidth="1.5" strokeLinecap="round" />
                <line
                  className="pr-tick-on"
                  style={{ ["--td" as string]: s(tickDelay(deg)) }}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#B9CCFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
          <path d={TRACK} stroke="rgba(143,176,255,0.16)" strokeDasharray="2 4" />
          <path className="pr-arc" d={ARC} pathLength={1} strokeDasharray="1" stroke="rgba(143,176,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={CX - 64} x2={CX + 64} y1={CY} y2={CY} stroke="rgba(143,176,255,0.28)" strokeWidth="1" />
          {/* the body: sun crossfades into the moon as the orbit turns */}
          <g className="pr-orbit">
            <g className="pr-sun">
              <circle cx={bx} cy={by} r="11" fill="#FFD27A" opacity="0.18" />
              <circle cx={bx} cy={by} r="6.5" fill="#FFD27A" />
            </g>
            <g className="pr-moon">
              <g className="pr-moon-face">
                <circle cx={bx} cy={by} r="10" fill="#DCE6FF" opacity="0.12" />
                <circle cx={bx} cy={by} r="6.5" fill="#DCE6FF" />
                <circle cx={bx + 3} cy={by - 2} r="5.5" fill="#0D1730" />
              </g>
            </g>
          </g>
        </svg>
        <span className="pr-num mb-0.5 text-[0.8125rem] font-medium text-[rgba(234,240,255,0.7)]">24 hours</span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <div className="pr-days">
          {TICKS.map((deg) => (
            <span key={deg}>
              <i style={{ ["--td" as string]: s(tickDelay(deg)), transformOrigin: "left" }} />
            </span>
          ))}
        </div>
        <span className="text-[0.8125rem] font-medium text-[rgba(234,240,255,0.7)]">Mon to Sun</span>
      </div>
    </div>
  );
}

function TenDays({ dayRef }: { dayRef: RefObject<HTMLSpanElement | null> }) {
  return (
    <div className="w-full max-w-[300px]" aria-hidden>
      <div className="flex items-end justify-between">
        <span ref={dayRef} className="pr-num font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] lg:text-[3.75rem]">
          10
        </span>
        <span className="pr-chip pr-live mb-1.5">
          <span className="pr-dot" />
          Live
        </span>
      </div>
      <div className="pr-track mt-3">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="pr-seg" style={{ ["--sd" as string]: s(SEG_START + i * SEG_STEP) }}>
            <i />
            <b />
          </span>
        ))}
      </div>
      <div className="pr-num mt-2 flex justify-between text-[0.75rem] font-medium text-[rgba(234,240,255,0.6)]">
        <span>Day 1</span>
        <span>Day 10</span>
      </div>
    </div>
  );
}

const setText = (el: HTMLElement | null, text: string) => {
  const node = el?.firstChild;
  if (node && node.nodeType === Node.TEXT_NODE) {
    if (node.nodeValue !== text) node.nodeValue = text;
  } else if (el) {
    el.textContent = text;
  }
};

export function ProofRow() {
  const ref = useRef<HTMLUListElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const dayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const items = Array.from(list.querySelectorAll<HTMLLIElement>(".pr-it"));

    const rafs = new Set<number>();
    const loop = (until: number, draw: (t: number) => void) => {
      const t0 = performance.now();
      const frame = (now: number) => {
        const t = (now - t0) / 1000;
        draw(Math.min(t, until));
        if (t < until) rafs.add(requestAnimationFrame(frame));
      };
      rafs.add(requestAnimationFrame(frame));
    };
    const play = (li: HTMLLIElement) => {
      li.dataset.stage = "play";
      const i = items.indexOf(li);
      if (i === 0) {
        // reply counter: ease-out cubic, the same curve as the bar under it
        loop(T_COUNT_START + T_COUNT_DUR, (t) => {
          const p = Math.min(1, Math.max(0, (t - T_COUNT_START) / T_COUNT_DUR));
          const v = Math.round((1 - Math.pow(1 - p, 3)) * TARGET);
          setText(numRef.current, `0:${String(v).padStart(2, "0")}`);
        });
      } else if (i === 2) {
        // day counter: follows the segments as each one is half filled
        loop(T_LIVE, (t) => {
          const n = Math.floor((t - SEG_START - SEG_DUR * 0.5) / SEG_STEP) + 1;
          setText(dayRef.current, String(Math.min(10, Math.max(1, n))));
        });
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            io.unobserve(e.target);
            play(e.target as HTMLLIElement);
          }
        }
      },
      { threshold: 0.6 },
    );
    // Start state only once we know we can play it.
    for (const li of items) {
      li.dataset.stage = "ready";
      io.observe(li);
    }
    setText(numRef.current, "0:00");
    setText(dayRef.current, "1");
    return () => {
      io.disconnect();
      rafs.forEach((r) => cancelAnimationFrame(r));
    };
  }, []);

  const visuals = [<ReplyTimer key="a" numRef={numRef} />, <DayNight key="b" />, <TenDays key="c" dayRef={dayRef} />];
  return (
    <>
      <style>{CSS}</style>
      <ul ref={ref} className="mt-12 grid gap-0 lg:mt-24 lg:grid-cols-3 lg:gap-6">
        {FACTS.map((f, i) => (
          <li key={f.title} className="pr-it border-t border-white/[0.1] py-6 lg:pt-8">
            <div className="pr-vis">{visuals[i]}</div>
            <p className="mt-5 text-[1.375rem] font-semibold tracking-[-0.02em] lg:mt-6 lg:text-[1.75rem]">{f.title}</p>
            <p className="mt-1.5 text-[1.0625rem] leading-[1.55] text-[rgba(234,240,255,0.76)] lg:text-[1.125rem]">{f.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
