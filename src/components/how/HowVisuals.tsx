import type { CSSProperties } from "react";
import { Bud } from "./Bud";

/**
 * One visual per step on /how-it-works, in the bloom and Earth language:
 *   Call   - a video-call card with a 30-minute ring timer.
 *   Map    - the Operations Map as a bloom on a small map of the business,
 *            leak points glowing, money at risk as low / medium / high.
 *   Plan   - a written plan that unfolds, items ticked, and the
 *            "what it should bring back" line.
 *   Build  - the 10-day stem growing, helpers coming online one by one.
 *   Review - the day 90 sunrise over the Earth's limb, before and after.
 * Every figure is made up and each card says "Sample".
 *
 * Server components, inline SVG and CSS only: no JS, no images. Each card is
 * its own [data-reveal] target, so it animates once when the card itself
 * scrolls into view (on phones the visual sits below the text). Motion is
 * transform, opacity and stroke-dashoffset only. Without JS, and under
 * reduced motion (never armed), every card renders finished.
 *
 * Plan and Map are also used small on /audit (`compact`).
 */

export type HowVisualKey = "call" | "map" | "plan" | "build" | "review";

const dl = (s: number): CSSProperties => ({ ["--d" as string]: `${s}s` });

export const HOW_VISUALS_CSS = `
.sv { position: relative; border-radius: 22px; padding: 16px; color: #F2F5FC;
  border: 1px solid rgba(143, 176, 255, 0.18);
  background: linear-gradient(180deg, rgba(14, 24, 52, 0.96), rgba(6, 11, 26, 0.98));
  box-shadow: 0 40px 90px -50px rgba(77, 124, 255, 0.55); }
@media (min-width: 768px) { .sv { padding: 20px; max-width: 34rem; } }
.sv-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.sv-app { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: #B7C0D4; }
.sv-sample { flex: none; border-radius: 99px; padding: 2px 10px; font-size: 0.75rem; color: #C9D1E3; border: 1px solid rgba(255, 255, 255, 0.18); }
.sv-h { margin-top: 6px; font-family: var(--font-display); font-weight: 600; font-size: 1.1875rem; letter-spacing: -0.02em; }
.sv svg { display: block; overflow: visible; }

/* ---------- Call ---------- */
.sv-tiles { margin-top: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.sv-tile { position: relative; aspect-ratio: 4 / 3; border-radius: 14px; overflow: hidden; background: radial-gradient(120% 90% at 50% 0%, #1B2A55, #0A1226); border: 1px solid rgba(143, 176, 255, 0.14); }
.sv-tile svg { position: absolute; left: 50%; bottom: 0; width: 58%; transform: translateX(-50%); }
.sv-tile b { position: absolute; left: 8px; bottom: 8px; font-size: 0.75rem; font-weight: 500; padding: 2px 8px; border-radius: 99px; background: rgba(6, 11, 26, 0.8); color: #F2F5FC; }
.sv-tile.is-talk { box-shadow: inset 0 0 0 2px #4D7CFF; }
.sv-callrow { margin-top: 14px; display: grid; grid-template-columns: auto 1fr; gap: 16px; align-items: center; }
.sv-ring { position: relative; width: 92px; height: 92px; }
.sv-ring span { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; line-height: 1; }
.sv-ring strong { font-family: var(--font-display); font-size: 1.625rem; letter-spacing: -0.03em; }
.sv-ring em { font-style: normal; margin-top: 4px; font-size: 0.75rem; color: #B7C0D4; }
.sv-notes { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.sv-notes li { display: flex; align-items: flex-start; gap: 8px; font-size: 0.875rem; line-height: 1.35; color: #DCE3F2; }
.sv-notes svg { flex: none; margin-top: 2px; }
.sv-bar { margin-top: 14px; display: flex; justify-content: center; gap: 10px; }
.sv-bar i { width: 34px; height: 34px; border-radius: 99px; display: grid; place-items: center; background: rgba(255, 255, 255, 0.08); }
.sv-bar i.end { background: #C93A3A; }

/* ---------- Map ---------- */
.sv-map { position: relative; margin-top: 12px; }
.sv-map svg { width: 100%; height: auto; }
.sv-pin { position: absolute; width: 40%; font-size: 0.75rem; line-height: 1.3; margin: 0; }
.sv-pin b { display: block; font-weight: 600; color: #F2F5FC; }
.sv-pin span { color: #B7C0D4; }
.sv-pin i { font-style: normal; font-weight: 600; }
@media (min-width: 480px) { .sv-pin { font-size: 0.8125rem; } }
.sv-pin.tl { left: 0; top: 0; }
.sv-pin.tr { right: 0; top: 0; text-align: right; }
.sv-pin.bl { left: 0; bottom: 0; }
.sv-pin.br { right: 0; bottom: 0; text-align: right; }
.sv-key { margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 0.8125rem; color: #B7C0D4; }
.sv-key span { display: inline-flex; align-items: center; gap: 6px; }
.sv-key span::before { content: ""; width: 9px; height: 9px; border-radius: 99px; background: var(--c); box-shadow: 0 0 8px var(--c); }
.r-low { color: #8FB0FF; } .r-med { color: #F2C46D; } .r-high { color: #FF8A7A; }

/* ---------- Plan ---------- */
.sv-plan { perspective: 1200px; }
.sv-doc { margin-top: 14px; color: #0E0E10; }
.sv-fold { background: #FBF8F1; padding: 14px 16px; transform-origin: 50% 0; }
.sv-fold:first-child { border-radius: 14px 14px 0 0; padding-top: 16px; }
.sv-fold:last-child { border-radius: 0 0 14px 14px; padding-bottom: 16px; }
.sv-fold + .sv-fold { border-top: 1px dashed rgba(14, 14, 16, 0.16); }
.sv-doc-app { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: #4A4843; }
.sv-doc-h { margin-top: 4px; font-family: var(--font-display); font-weight: 600; font-size: 1.1875rem; letter-spacing: -0.02em; }
.sv-checks { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.sv-checks li { display: flex; gap: 10px; align-items: flex-start; font-size: 0.9375rem; line-height: 1.4; color: #1F1E1B; }
.sv-checks svg { flex: none; margin-top: 2px; }
.sv-back { margin: 0; border-left: 3px solid #C98A1B; padding: 2px 0 2px 12px; }
.sv-back dt { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: #7A5200; }
.sv-back dd { margin: 4px 0 0; font-size: 0.9375rem; line-height: 1.45; color: #1F1E1B; }
.sv-yn { margin-top: 12px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 0.8125rem; color: #4A4843; }
.sv-yn b { font-weight: 600; padding: 3px 12px; border-radius: 99px; border: 1px solid #C98A1B; color: #7A5200; }

/* ---------- Build ---------- */
.sv-stem { margin-top: 14px; position: relative; }
.sv-stem svg { width: 100%; height: auto; }
.sv-days { display: grid; grid-template-columns: repeat(10, 1fr); margin-top: 2px; font-family: var(--font-mono); font-size: 0.6875rem; color: #B7C0D4; text-align: center; }
.sv-agents { list-style: none; margin: 14px 0 0; padding: 0; display: grid; gap: 6px; }
.sv-agents li { display: grid; grid-template-columns: 3.4rem 1fr auto; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 12px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.06); }
@media (max-width: 479px) {
  .sv-agents li { grid-template-columns: 1fr auto; grid-template-areas: "day st" "nm st"; row-gap: 2px; }
  .sv-agents .day { grid-area: day; } .sv-agents .nm { grid-area: nm; } .sv-agents .sv-st { grid-area: st; }
}
.sv-agents .day { font-family: var(--font-mono); font-size: 0.75rem; color: #B7C0D4; }
.sv-agents .nm { font-size: 0.9375rem; font-weight: 600; line-height: 1.25; }
.sv-agents .nm small { display: block; font-size: 0.8125rem; font-weight: 400; color: #B7C0D4; }
.sv-st { position: relative; display: inline-grid; justify-items: end; font-size: 0.75rem; font-weight: 500; }
.sv-st > * { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; border-radius: 99px; white-space: nowrap; }
.sv-st .on { color: #C9D7FF; background: rgba(77, 124, 255, 0.2); }
.sv-st .on::before { content: ""; width: 7px; height: 7px; border-radius: 99px; background: #6E96FF; box-shadow: 0 0 8px #6E96FF; }
.sv-st .wait { color: #B7C0D4; background: rgba(255, 255, 255, 0.06); opacity: 0; }
.sv-agents li.live { border-color: rgba(242, 196, 109, 0.4); background: rgba(242, 196, 109, 0.07); }
.sv-agents li.live .on { color: #F7D899; background: rgba(242, 196, 109, 0.16); }
.sv-agents li.live .on::before { background: #F2C46D; box-shadow: 0 0 8px #F2C46D; }

/* ---------- Review ---------- */
.sv-rise { position: relative; margin: 12px -16px 0; height: 120px; overflow: hidden; }
@media (min-width: 768px) { .sv-rise { margin: 12px -20px 0; height: 140px; } }
.sv-rise svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.sv-rise p { position: absolute; left: 16px; top: 8px; margin: 0; font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: #F2C46D; }
@media (min-width: 768px) { .sv-rise p { left: 20px; } }
.sv-ba { list-style: none; margin: 4px 0 0; padding: 0; }
.sv-ba li { display: grid; gap: 4px; padding: 10px 0; border-top: 1px solid rgba(255, 255, 255, 0.08); }
@media (min-width: 480px) { .sv-ba li { grid-template-columns: 1fr auto; align-items: baseline; gap: 12px; } }
.sv-ba .m { font-size: 0.875rem; line-height: 1.35; color: #DCE3F2; }
.sv-ba .v { display: inline-flex; align-items: baseline; gap: 10px; white-space: nowrap; }
.sv-ba .bf { font-size: 0.875rem; color: #B7C0D4; text-decoration: line-through; text-decoration-color: rgba(183, 192, 212, 0.5); }
.sv-ba .af { display: inline-block; font-size: 1rem; font-weight: 600; color: #F2F5FC; }
.sv-ba .af::before { content: "→ "; color: #F2C46D; font-weight: 400; }
.sv-next { margin-top: 10px; font-size: 0.875rem; color: #F2C46D; }

/* ---------- Compact (used small on /audit) ---------- */
.sv.is-compact { max-width: 26rem; }

/* ---------- Motion: once, on view ---------- */
@media (prefers-reduced-motion: no-preference) {
  .sv .sv-ln { stroke-dasharray: 1 1; stroke-dashoffset: 0; transition: stroke-dashoffset var(--t, 0.8s) cubic-bezier(0.4, 0, 0.2, 1) var(--d, 0.2s); }
  .sv .sv-fd { transition: opacity 0.5s ease-out var(--d, 0.2s), transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) var(--d, 0.2s); }
  .sv[data-armed]:not([data-revealed]) .sv-ln { stroke-dashoffset: 1; }
  .sv[data-armed]:not([data-revealed]) .sv-fd { opacity: 0; transform: translate3d(0, 6px, 0); }

  /* Call: the timer ring sweeps round once. */
  .sv-call .sv-ln.ring { --t: 2.4s; }

  /* Map: leak points pop in, then glow out twice. */
  .sv .sv-pop { transform-box: fill-box; transform-origin: 50% 50%; transition: opacity 0.4s ease-out var(--d, 0.6s), transform 0.5s cubic-bezier(0.3, 1.5, 0.5, 1) var(--d, 0.6s); }
  .sv[data-armed]:not([data-revealed]) .sv-pop { opacity: 0; transform: scale(0.2); }
  .sv .sv-glow { transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; }
  .sv[data-revealed] .sv-glow { animation: sv-glow 1.6s ease-out calc(var(--d, 0.6s) + 0.3s) 2 both; }

  /* Plan: the folds open one after another, then the ticks draw. */
  .sv .sv-fold.f2, .sv .sv-fold.f3 { transition: transform 0.6s cubic-bezier(0.3, 0.9, 0.3, 1) var(--d), opacity 0.3s ease-out var(--d); }
  .sv[data-armed]:not([data-revealed]) .sv-fold.f2,
  .sv[data-armed]:not([data-revealed]) .sv-fold.f3 { transform: rotateX(-88deg); opacity: 0; }

  /* Build: the stem grows, then each helper's status flips to Online. */
  .sv .sv-st .on, .sv .sv-st .wait { transition: opacity 0.35s ease-out var(--d); }
  .sv[data-armed]:not([data-revealed]) .sv-st .on { opacity: 0; }
  .sv[data-armed]:not([data-revealed]) .sv-st .wait { opacity: 1; transition: none; }

  /* Review: the sun rises over the limb. */
  .sv .sv-sun { transition: transform 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s, opacity 1s ease-out 0.3s; }
  .sv[data-armed]:not([data-revealed]) .sv-sun { transform: translate3d(0, 46px, 0); opacity: 0; }
}
@keyframes sv-glow { 0% { opacity: 0.85; transform: scale(0.6); } 100% { opacity: 0; transform: scale(2.4); } }
`;

function Top({ app }: { app: string }) {
  return (
    <div className="sv-top">
      <span className="sv-app">{app}</span>
      <span className="sv-sample">Sample</span>
    </div>
  );
}

function Tick({ d, c = "#8FB0FF" }: { d: number; c?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="7" fill="none" stroke={c} strokeOpacity="0.45" />
      <path className="sv-ln" d="M4.6 8.3l2.2 2.2 4.6-4.8" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{ ...dl(d), ["--t" as string]: "0.4s" }} />
    </svg>
  );
}

function Person({ tone }: { tone: string }) {
  return (
    <svg viewBox="0 0 60 50" aria-hidden>
      <circle cx="30" cy="17" r="11" fill={tone} />
      <path d="M6 50c2-14 12-21 24-21s22 7 24 21z" fill={tone} />
    </svg>
  );
}

/* ---------------- Call ---------------- */
function CallVisual() {
  return (
    <div className="sv sv-call" data-reveal="" role="img" aria-label="Sample video call card: a 30-minute call where we note how enquiries reach you, where they wait and where they get lost.">
      <Top app="Video call · free" />
      <div className="sv-tiles">
        <div className="sv-tile is-talk">
          <Person tone="#3A4C7E" />
          <b>You</b>
        </div>
        <div className="sv-tile">
          <Person tone="#2B3B66" />
          <b>Verdance</b>
        </div>
      </div>
      <div className="sv-callrow">
        <div className="sv-ring">
          <svg viewBox="0 0 92 92" width="92" height="92" aria-hidden>
            <circle cx="46" cy="46" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            <circle className="sv-ln ring" cx="46" cy="46" r="40" fill="none" stroke="#4D7CFF" strokeWidth="6" strokeLinecap="round" pathLength={1} transform="rotate(-90 46 46)" style={dl(0.3)} />
          </svg>
          <span>
            <strong>30</strong>
            <em>minutes</em>
          </span>
        </div>
        <ul className="sv-notes">
          <li className="sv-fd" style={dl(0.7)}>
            <Tick d={0.9} />
            How enquiries reach you
          </li>
          <li className="sv-fd" style={dl(1.2)}>
            <Tick d={1.4} />
            Where they wait
          </li>
          <li className="sv-fd" style={dl(1.7)}>
            <Tick d={1.9} />
            Where they get lost
          </li>
        </ul>
      </div>
      <div className="sv-bar">
        <i>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><rect x="4.5" y="1" width="5" height="8" rx="2.5" fill="#DCE3F2" /><path d="M2.5 7a4.5 4.5 0 0 0 9 0M7 11.5V13" stroke="#DCE3F2" strokeWidth="1.3" fill="none" strokeLinecap="round" /></svg>
        </i>
        <i>
          <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden><rect x="1" y="3" width="10" height="8" rx="2" fill="#DCE3F2" /><path d="M11 6l4-2v6l-4-2z" fill="#DCE3F2" /></svg>
        </i>
        <i className="end">
          <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden><path d="M1 6c4-4 10-4 14 0l-2 2-2.5-1.5V4.6a9 9 0 0 0-5 0v1.9L3 8z" fill="#fff" /></svg>
        </i>
      </div>
    </div>
  );
}

/* ---------------- Map ---------------- */
type Leak = { at: "tl" | "tr" | "bl" | "br"; x: number; y: number; ch: string; hrs: string; risk: "low" | "medium" | "high"; c: string };
const LEAKS: Leak[] = [
  { at: "tl", x: 84, y: 96, ch: "WhatsApp", hrs: "4 h a week", risk: "medium", c: "#F2C46D" },
  { at: "tr", x: 276, y: 96, ch: "Email", hrs: "5 h a week", risk: "high", c: "#FF8A7A" },
  { at: "bl", x: 84, y: 204, ch: "Website", hrs: "1 h a week", risk: "low", c: "#8FB0FF" },
  { at: "br", x: 276, y: 204, ch: "Missed calls", hrs: "6 h a week", risk: "high", c: "#FF8A7A" },
];
const RISK_CLASS = { low: "r-low", medium: "r-med", high: "r-high" } as const;

function MapVisual({ compact = false }: { compact?: boolean }) {
  const cx = 180;
  const cy = 150;
  return (
    <div
      className={`sv sv-mapcard${compact ? " is-compact" : ""}`}
      data-reveal=""
      role="img"
      aria-label="Sample Operations Map: your business at the centre, with four leak points. WhatsApp, 4 hours a week, money at risk medium. Email, 5 hours, high. Website, 1 hour, low. Missed calls, 6 hours, high."
    >
      <Top app="Operations Map" />
      <p className="sv-h">Where time and money leak</p>
      <div className="sv-map">
        <svg viewBox="0 0 360 300" aria-hidden>
          {/* streets: a faint grid, like a town plan */}
          <g className="sv-fd" style={dl(0.1)} stroke="rgba(143,176,255,0.12)" strokeWidth="1">
            {[60, 120, 180, 240].map((y) => (
              <line key={`h${y}`} x1="20" x2="340" y1={y + 0.5} y2={y + 0.5} />
            ))}
            {[60, 120, 180, 240, 300].map((x) => (
              <line key={`v${x}`} y1="50" y2="250" x1={x + 0.5} x2={x + 0.5} />
            ))}
            <path d="M20 250 C 110 210, 150 270, 340 190" stroke="rgba(143,176,255,0.18)" strokeWidth="6" fill="none" strokeLinecap="round" />
          </g>
          {/* the bloom: one petal from the business to each leak */}
          {LEAKS.map((l, i) => {
            const dx = l.x - cx;
            const dy = l.y - cy;
            const len = Math.hypot(dx, dy) - 8;
            const ang = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
            const w = len * 0.34;
            const d = `M0 0 C ${w.toFixed(1)} ${(-len * 0.3).toFixed(1)}, ${(w * 0.8).toFixed(1)} ${(-len * 0.8).toFixed(1)}, 0 ${(-len).toFixed(1)} C ${(-w * 0.8).toFixed(1)} ${(-len * 0.8).toFixed(1)}, ${(-w).toFixed(1)} ${(-len * 0.3).toFixed(1)}, 0 0 Z`;
            return (
              <g key={l.ch} transform={`translate(${cx} ${cy}) rotate(${ang.toFixed(1)})`}>
                <path className="sv-fd" d={d} fill={l.c} fillOpacity="0.12" style={dl(0.4 + i * 0.12)} />
                <path className="sv-ln" d={d} fill="none" stroke={l.c} strokeOpacity="0.7" strokeWidth="1.5" pathLength={1} style={dl(0.2 + i * 0.12)} />
              </g>
            );
          })}
          {/* the business: a small shopfront in a circle */}
          <g className="sv-pop" style={dl(0.15)}>
            <circle cx={cx} cy={cy} r="28" fill="#0B1530" stroke="#4D7CFF" strokeWidth="1.5" />
            <path d={`M${cx - 13} ${cy - 3}h26v14h-26z`} fill="none" stroke="#DCE6FF" strokeWidth="1.4" />
            <path d={`M${cx - 15} ${cy - 3}l3-9h24l3 9z`} fill="rgba(77,124,255,0.35)" stroke="#DCE6FF" strokeWidth="1.4" strokeLinejoin="round" />
            <path d={`M${cx - 3} ${cy + 11}v-8h6v8`} fill="none" stroke="#DCE6FF" strokeWidth="1.4" />
          </g>
          {/* leak points */}
          {LEAKS.map((l, i) => (
            <g key={`p${l.ch}`}>
              <circle className="sv-glow" cx={l.x} cy={l.y} r="12" fill="none" stroke={l.c} strokeWidth="2" style={dl(0.8 + i * 0.15)} />
              <circle className="sv-pop" cx={l.x} cy={l.y} r="7" fill={l.c} style={{ ...dl(0.8 + i * 0.15), filter: `drop-shadow(0 0 6px ${l.c})` }} />
            </g>
          ))}
        </svg>
        {LEAKS.map((l, i) => (
          <p key={`t${l.ch}`} className={`sv-pin ${l.at} sv-fd`} style={dl(1 + i * 0.15)}>
            <b>{l.ch}</b>
            <span>{l.hrs}</span>
            <br />
            <i className={RISK_CLASS[l.risk]}>{l.risk[0].toUpperCase() + l.risk.slice(1)}</i>
          </p>
        ))}
      </div>
      <p className="sv-key">
        Money at risk:
        <span style={{ ["--c" as string]: "#8FB0FF" }}>Low</span>
        <span style={{ ["--c" as string]: "#F2C46D" }}>Medium</span>
        <span style={{ ["--c" as string]: "#FF8A7A" }}>High</span>
      </p>
    </div>
  );
}

/* ---------------- Plan ---------------- */
function PlanVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`sv sv-plan${compact ? " is-compact" : ""}`}
      data-reveal=""
      role="img"
      aria-label="Sample written plan. Build first: every enquiry answered within 60 seconds, in your voice. Then every quote followed up. Live in 10 working days from your yes. What it should bring back: hours back each week and more enquiries booked, measured in your own numbers. Then you decide: yes or not now."
    >
      <Top app="Your plan · in writing" />
      <div className="sv-doc">
        <div className="sv-fold f1">
          <p className="sv-doc-app">Build first</p>
          <p className="sv-doc-h">Answer every enquiry</p>
          <ul className="sv-checks" style={{ marginTop: 10 }}>
            <li>
              <Tick d={1.5} c="#2554D4" />
              Every enquiry answered within 60 seconds, in your voice.
            </li>
          </ul>
        </div>
        <div className="sv-fold f2" style={dl(0.3)}>
          <ul className="sv-checks">
            <li>
              <Tick d={1.7} c="#2554D4" />
              Then: every quote followed up until it gets a yes or a no.
            </li>
            <li>
              <Tick d={1.9} c="#2554D4" />
              Live in 10 working days from your yes.
            </li>
          </ul>
        </div>
        <div className="sv-fold f3" style={dl(0.75)}>
          <dl className="sv-back">
            <dt>What it should bring back</dt>
            <dd>Hours back each week and more enquiries booked, measured in your own numbers.</dd>
          </dl>
          <p className="sv-yn">
            Your decision:
            <b>Yes</b>
            <b>Not now</b>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Build ---------------- */
const AGENTS = [
  { day: 3, name: "Enquiry helper", what: "Answers in your voice" },
  { day: 5, name: "Follow-up helper", what: "Chases every quote" },
  { day: 7, name: "Booking helper", what: "Fills your diary" },
  { day: 9, name: "Daily report", what: "What happened today" },
];

function BuildVisual() {
  // Ten days across the stem: day n sits at x = 16 + (n - 0.5) * 32.
  const X = (n: number) => 16 + (n - 0.5) * 32;
  const grow = 1.4; // seconds for the stem to reach day 10
  const at = (n: number) => 0.2 + (grow * n) / 10;
  return (
    <div className="sv sv-build" data-reveal="" role="img" aria-label="Sample build over 10 working days: the enquiry helper comes online on day 3, follow-up on day 5, booking on day 7, the daily report on day 9, and on day 10 it goes live.">
      <Top app="Build · 10 working days" />
      <div className="sv-stem">
        <div style={{ position: "relative" }}>
        <svg viewBox="0 0 352 92" aria-hidden>
          <line x1={X(1)} x2={X(10)} y1="70" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <line className="sv-ln" x1={X(1)} x2={X(10)} y1="70" y2="70" stroke="#4D7CFF" strokeWidth="2" strokeLinecap="round" pathLength={1} style={{ ...dl(0.2), ["--t" as string]: `${grow}s` }} />
          {Array.from({ length: 10 }, (_, i) => (
            <circle key={i} className="sv-pop" cx={X(i + 1)} cy="70" r="3" fill="#8FB0FF" style={dl(at(i + 1))} />
          ))}
          {AGENTS.map((a, i) => {
            const x = X(a.day);
            const f = i % 2 ? -1 : 1;
            const leaf = `M${x} 70 C ${x + 4 * f} 58, ${x + 16 * f} 52, ${x + 20 * f} 40 C ${x + 8 * f} 42, ${x + 1 * f} 52, ${x} 70 Z`;
            return (
              <g key={a.day}>
                <path className="sv-fd" d={leaf} fill="rgba(77,124,255,0.25)" style={dl(at(a.day) + 0.1)} />
                <path className="sv-ln" d={leaf} fill="none" stroke="#8FB0FF" strokeWidth="1.4" strokeLinejoin="round" pathLength={1} style={{ ...dl(at(a.day)), ["--t" as string]: "0.5s" }} />
              </g>
            );
          })}
          <path className="sv-ln" d={`M${X(10)} 70 C ${X(10)} 54, ${X(10) - 6} 40, ${X(10)} 26`} fill="none" stroke="#F2C46D" strokeWidth="1.6" strokeLinecap="round" pathLength={1} style={{ ...dl(at(10)), ["--t" as string]: "0.4s" }} />
        </svg>
        <span style={{ position: "absolute", left: `${(X(10) / 352) * 100}%`, top: `${(22 / 92) * 100}%`, transform: "translate(-50%, -50%)" }}>
          <span className="sv-pop" style={{ display: "block", ...dl(at(10) + 0.35) }}>
            <Bud stage={4} size={44} gold />
          </span>
        </span>
        </div>
        <div className="sv-days" style={{ paddingInline: `${(16 / 352) * 100}%` }}>
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
      </div>
      <ul className="sv-agents">
        {AGENTS.map((a) => (
          <li key={a.name}>
            <span className="day">Day {a.day}</span>
            <span className="nm">
              {a.name}
              <small>{a.what}</small>
            </span>
            <span className="sv-st" style={dl(at(a.day) + 0.2)}>
              <span className="wait">Setting up</span>
              <span className="on">Online</span>
            </span>
          </li>
        ))}
        <li className="live">
          <span className="day">Day 10</span>
          <span className="nm">
            Live
            <small>Every enquiry answered within 60 seconds</small>
          </span>
          <span className="sv-st" style={dl(at(10) + 0.3)}>
            <span className="wait">Testing</span>
            <span className="on">Live</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

/* ---------------- Review ---------------- */
const BA = [
  { m: "First reply to an enquiry", b: "3 h 40 min", a: "Under 60 s" },
  { m: "After-hours enquiries answered", b: "2 in 10", a: "10 in 10" },
  { m: "Quotes followed up", b: "1 in 3", a: "Every one" },
];

function ReviewVisual() {
  const R = 900;
  const cx = 200;
  const top = 96;
  const yAt = (x: number) => top + R - Math.sqrt(R * R - (x - cx) * (x - cx));
  const arc = `M -20 ${yAt(-20).toFixed(1)} A ${R} ${R} 0 0 1 420 ${yAt(420).toFixed(1)}`;
  return (
    <div
      className="sv sv-review"
      data-reveal=""
      role="img"
      aria-label="Sample day 90 review, a sunrise over the Earth. First reply to an enquiry: 3 hours 40 minutes before, under 60 seconds after. After-hours enquiries answered: 2 in 10 before, 10 in 10 after. Quotes followed up: 1 in 3 before, every one after. Then you choose the next step, or stay as you are."
    >
      <Top app="Review · before and after" />
      <div className="sv-rise">
        <svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice" aria-hidden>
          <defs>
            <radialGradient id="sv-sky" cx={cx} cy={top} r="230" gradientUnits="userSpaceOnUse" gradientTransform={`translate(${cx} ${top}) scale(1 0.42) translate(${-cx} ${-top})`}>
              <stop offset="0" stopColor="#FFE3B0" stopOpacity="0.6" />
              <stop offset="0.3" stopColor="#F2C46D" stopOpacity="0.2" />
              <stop offset="1" stopColor="#0A1226" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sv-sunc" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#FFF6E4" />
              <stop offset="0.4" stopColor="#FFE3B0" stopOpacity="0.9" />
              <stop offset="1" stopColor="#F2C46D" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sv-line" x1="0" x2="400" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#2554D4" stopOpacity="0.2" />
              <stop offset="0.42" stopColor="#8FB0FF" />
              <stop offset="0.5" stopColor="#FFE3B0" />
              <stop offset="0.58" stopColor="#8FB0FF" />
              <stop offset="1" stopColor="#2554D4" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <g className="sv-sun">
            <rect x="0" y="0" width="400" height="140" fill="url(#sv-sky)" />
            <circle cx={cx} cy={top} r="34" fill="url(#sv-sunc)" />
          </g>
          <circle cx={cx} cy={top + R} r={R} fill="#0A1226" />
          <path className="sv-ln" d={arc} fill="none" stroke="url(#sv-line)" strokeWidth="1.5" pathLength={1} style={{ ...dl(0.2), ["--t" as string]: "1s" }} />
        </svg>
        <p>Day 90</p>
      </div>
      <ul className="sv-ba">
        {BA.map((r, i) => (
          <li key={r.m}>
            <span className="m">{r.m}</span>
            <span className="v">
              <span className="bf">{r.b}</span>
              <span className="af sv-fd" style={dl(1 + i * 0.25)}>
                {r.a}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="sv-next sv-fd" style={dl(1.9)}>
        Then you choose: the next step, or stay as you are.
      </p>
    </div>
  );
}

export function HowVisual({ k, compact = false }: { k: HowVisualKey; compact?: boolean }) {
  switch (k) {
    case "call":
      return <CallVisual />;
    case "map":
      return <MapVisual compact={compact} />;
    case "plan":
      return <PlanVisual compact={compact} />;
    case "build":
      return <BuildVisual />;
    case "review":
      return <ReviewVisual />;
  }
}
