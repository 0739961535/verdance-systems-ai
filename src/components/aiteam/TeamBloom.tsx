import { DEPARTMENTS, STAGES } from "@/data/aiTeam";
import { StatusChip } from "./StatusChip";

/**
 * "How it is organised" as one bloom: you at the centre, an inner ring with
 * the Checker and the Planner, and the six departments as petals. On view the
 * petals draw in turn, then the check, then the plan, then you: the order
 * every piece of work travels. Only stroke-dashoffset and opacity animate,
 * once, through the shared [data-reveal] observer. Reduced motion, no JS or
 * a missed observer: the finished drawing, nothing hidden.
 *
 * Labels are 16 units in a 428-unit viewBox, so at least 13px on a 390 phone.
 */

const R_LABEL = 148;
const PETAL = "M0,-92 C84,-112 66,-166 0,-206 C-66,-166 -84,-112 0,-92 Z";

function polar(deg: number, r: number) {
  const a = (deg * Math.PI) / 180;
  return { x: +(Math.sin(a) * r).toFixed(1), y: +(-Math.cos(a) * r).toFixed(1) };
}

export function TeamBloom() {
  return (
    <div className="tb" data-reveal="">
      <style>{CSS}</style>
      <figure className="tb-fig">
        <svg viewBox="-214 -214 428 428" className="tb-svg" role="img" aria-labelledby="tb-title tb-desc">
          <title id="tb-title">How your Operations Team is organised</title>
          <desc id="tb-desc">
            You sit at the centre. Around you, a Checker and a Planner. Around them, six departments: Sales, Operations, Client care,
            Finance, Marketing and Compliance. Work starts in a department, is checked, is planned, then comes to you.
          </desc>
          {DEPARTMENTS.map((d, i) => {
            const deg = i * 60;
            const tick0 = polar(deg, 72);
            const tick1 = polar(deg, 90);
            const l = polar(deg, R_LABEL);
            return (
              <g key={d.name} style={{ ["--d" as string]: `${i * 0.1}s` }}>
                <path className="tb-petal" d={PETAL} transform={`rotate(${deg})`} pathLength={1} />
                <line className="tb-tick" x1={tick0.x} y1={tick0.y} x2={tick1.x} y2={tick1.y} pathLength={1} />
                <text className="tb-label" x={l.x} y={l.y} textAnchor="middle" dominantBaseline="central">
                  {d.name}
                </text>
              </g>
            );
          })}
          <g style={{ ["--d" as string]: "0.75s" }}>
            <path className="tb-ring" d="M-65,-11 A66,66 0 0 1 65,-11" pathLength={1} />
            <text className="tb-ring-label" x={0} y={-42} textAnchor="middle" dominantBaseline="central">
              Checker
            </text>
          </g>
          <g style={{ ["--d" as string]: "1.25s" }}>
            <path className="tb-ring" d="M65,11 A66,66 0 0 1 -65,11" pathLength={1} />
            <text className="tb-ring-label" x={0} y={44} textAnchor="middle" dominantBaseline="central">
              Planner
            </text>
          </g>
          <g className="tb-you" style={{ ["--d" as string]: "1.75s" }}>
            <circle r={26} />
            <text x={0} y={1} textAnchor="middle" dominantBaseline="central">
              You
            </text>
          </g>
        </svg>
      </figure>

      <div className="tb-side">
        <ol className="tb-steps" aria-label="How work moves">
          {STAGES.map((st) => (
            <li key={st.role} className="tb-step">
              <StatusChip role={st.role}>{st.role === "attn" ? "You" : st.label}</StatusChip>
              <p className="tb-step-b">{st.role === "attn" ? "You approve it, change it or say no." : st.body}</p>
            </li>
          ))}
        </ol>
        <p className="tb-point">Nothing reaches a customer without a check and you.</p>
      </div>
    </div>
  );
}

const CSS = `
.tb { display: grid; gap: 40px; align-items: center; }
@media (min-width: 1024px) { .tb { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 72px; } }
.tb-fig { margin: 0; justify-self: center; width: 100%; max-width: 560px; }
.tb-svg { display: block; width: 100%; height: auto; overflow: visible; }
.tb-petal { fill: var(--accent); fill-opacity: 0.07; stroke: var(--accent); stroke-width: 1.4;
  stroke-dasharray: 1; stroke-dashoffset: 0; stroke-linejoin: round;
  transition: stroke-dashoffset .7s cubic-bezier(.2,.7,.2,1) var(--d), fill-opacity .7s ease calc(var(--d) + .3s); }
.tb-tick, .tb-ring { fill: none; stroke: var(--accent); stroke-width: 1.4; stroke-linecap: round;
  stroke-dasharray: 1; stroke-dashoffset: 0; transition: stroke-dashoffset .7s cubic-bezier(.2,.7,.2,1) var(--d); }
.tb-tick { stroke-opacity: 0.55; }
.tb-label, .tb-ring-label { font-family: var(--font-display); font-size: 16px; font-weight: 500; letter-spacing: -0.01em; fill: var(--color-ink);
  transition: opacity .6s ease calc(var(--d) + .25s); }
.tb-ring-label { font-family: var(--font-mono); font-size: 15.5px; font-weight: 500; letter-spacing: 0; fill: var(--color-ink-soft); }
.tb-you circle { fill: var(--accent); transition: opacity .6s ease var(--d); }
.tb-you text { font-family: var(--font-display); font-size: 16px; font-weight: 600; fill: #fff; transition: opacity .6s ease var(--d); }

.tb[data-armed]:not([data-revealed]) .tb-petal { stroke-dashoffset: 1; fill-opacity: 0; }
.tb[data-armed]:not([data-revealed]) :is(.tb-tick, .tb-ring) { stroke-dashoffset: 1; }
.tb[data-armed]:not([data-revealed]) :is(.tb-label, .tb-ring-label, .tb-you circle, .tb-you text) { opacity: 0; }

.tb-steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 0; }
.tb-step { display: grid; grid-template-columns: 7.5rem minmax(0, 1fr); gap: 16px; align-items: baseline; padding: 16px 0;
  border-top: 1px solid var(--hairline-2); }
.tb-step:last-child { border-bottom: 1px solid var(--hairline-2); }
.tb .tb-step > span { justify-self: start; font-size: 13px; }
.tb-step-b { margin: 0; font-size: 1rem; line-height: 1.5; color: var(--color-ink-soft); }
.tb-point { margin: 24px 0 0; font-family: var(--font-display); font-size: 1.25rem; line-height: 1.35; letter-spacing: -0.02em; color: var(--color-ink); max-width: 28ch; }
@media (max-width: 479px) { .tb-step { grid-template-columns: minmax(0, 1fr); gap: 8px; } }
@media (prefers-reduced-motion: reduce) {
  .tb-petal, .tb-tick, .tb-ring, .tb-label, .tb-ring-label, .tb-you circle, .tb-you text { transition: none; }
}
`;
