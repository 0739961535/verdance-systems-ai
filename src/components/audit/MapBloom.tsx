/**
 * MapBloom: the free Operations Map drawn as a bloom, for the /audit hero.
 * One petal per channel (WhatsApp, email, calls, website), coloured from red
 * (slow) to blue (answered within 60 seconds), with sample hours and money
 * on each. Every number is made up and the card says "Sample".
 *
 * Motion: petals draw on (stroke-dashoffset) and their fill fades up
 * (opacity), once on load, about 0.7s, staggered. Static under reduced
 * motion. Server component, no JS.
 */

type Petal = {
  channel: string;
  wait: string;
  hours: string;
  money: string;
  colour: string;
  /** Darker tone of the colour for text (4.5:1 on white). */
  text: string;
  /** Corner the petal points to. */
  at: "tl" | "tr" | "bl" | "br";
};

const PETALS: Petal[] = [
  { channel: "WhatsApp", wait: "Waits 52 min", hours: "4 h a week", money: "R7,500 a month", colour: "#C98A1B", text: "#7A5200", at: "tl" },
  { channel: "Email", wait: "Waits 6 h", hours: "5 h a week", money: "R12,000 a month", colour: "#D9622B", text: "#A63F12", at: "tr" },
  { channel: "Website", wait: "Waits 1 min", hours: "1 h a week", money: "R1,500 a month", colour: "#2554D4", text: "#2554D4", at: "bl" },
  { channel: "Calls", wait: "Missed, no call back", hours: "6 h a week", money: "R16,500 a month", colour: "#C93A3A", text: "#A82828", at: "br" },
];

const ANGLE = { tl: -45, tr: 45, br: 135, bl: 225 } as const;
const PATH = "M0 -8 C 40 -34, 46 -100, 0 -128 C -46 -100, -40 -34, 0 -8 Z";

const CSS = `
.mb { padding: 18px; border-radius: 24px; background: #FBF8F1; border: 1px solid rgba(14, 14, 16, 0.08); box-shadow: 0 30px 80px -40px rgba(37, 84, 212, 0.35); color: #0E0E10; }
@media (min-width: 768px) { .mb { padding: 24px; } }
.mb-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.mb-app { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: #4A4843; }
.mb-sample { border-radius: 99px; padding: 3px 10px; font-size: 0.8125rem; color: #4A4843; border: 1px solid rgba(14, 14, 16, 0.18); }
.mb-h { margin-top: 8px; font-family: var(--font-display); font-weight: 600; font-size: 1.375rem; letter-spacing: -0.02em; }
.mb-grid { margin-top: 14px; display: grid; grid-template-columns: 1fr 1fr; grid-template-areas: "tl tr" "fl fl" "bl br"; gap: 6px 10px; }
.mb-card { padding: 10px 12px; border-radius: 14px; background: #fff; border: 1px solid rgba(14, 14, 16, 0.07); }
.mb-card[data-at="tl"] { grid-area: tl; } .mb-card[data-at="tr"] { grid-area: tr; text-align: right; }
.mb-card[data-at="bl"] { grid-area: bl; } .mb-card[data-at="br"] { grid-area: br; text-align: right; }
.mb-ch { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.9375rem; }
.mb-card[data-at="tr"] .mb-ch, .mb-card[data-at="br"] .mb-ch { flex-direction: row-reverse; }
.mb-dot { width: 10px; height: 10px; border-radius: 99px; background: var(--c); }
.mb-wait { display: block; margin-top: 2px; font-size: 0.8125rem; color: var(--tc); font-weight: 600; }
.mb-sub { display: block; margin-top: 2px; font-size: 0.8125rem; line-height: 1.35; color: #4A4843; font-variant-numeric: tabular-nums; }
.mb-flower { grid-area: fl; position: relative; width: min(100%, 260px); margin: 0 auto; aspect-ratio: 1; }
.mb-flower svg { display: block; width: 100%; height: 100%; }
.mb-heart { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; pointer-events: none; }
.mb-heart span { display: grid; place-items: center; width: 88px; height: 88px; border-radius: 99px; background: #FBF8F1; box-shadow: inset 0 0 0 1.5px rgba(37, 84, 212, 0.35); font-size: 0.8125rem; line-height: 1.25; color: #4A4843; }
.mb-heart b { display: block; font-family: var(--font-display); font-size: 1.375rem; letter-spacing: -0.02em; color: #0E0E10; }
.mb-scale { margin-top: 14px; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 10px; font-size: 0.8125rem; color: #4A4843; }
.mb-scale i { display: block; height: 6px; border-radius: 99px; background: linear-gradient(90deg, #C93A3A, #D9622B 35%, #C98A1B 60%, #2554D4); }
.mb-fix { margin-top: 14px; padding: 12px 14px; border-radius: 14px; background: rgba(37, 84, 212, 0.07); border: 1px solid rgba(37, 84, 212, 0.2); font-size: 0.9375rem; line-height: 1.45; }
.mb-fix b { display: block; font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: #2554D4; font-weight: 500; }
@media (prefers-reduced-motion: no-preference) {
  .mb-line { stroke-dasharray: 1 1; animation: mb-draw 0.75s cubic-bezier(0.4, 0, 0.2, 1) var(--d) both; }
  .mb-fill, .mb-card { animation: mb-fade 0.6s ease-out calc(var(--d) + 0.3s) both; }
}
@keyframes mb-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes mb-fade { from { opacity: 0; } to { opacity: 1; } }
`;

const d = (s: number) => ({ ["--d" as string]: `${s}s` });

export function MapBloom() {
  return (
    <div className="mb" role="img" aria-label="Sample Operations Map drawn as a flower: one petal per channel, red where customers wait longest and blue where they get a reply within 60 seconds, with sample hours and money on each.">
      <style>{CSS}</style>
      <div className="mb-top" aria-hidden>
        <span className="mb-app">Operations Map</span>
        <span className="mb-sample">Sample</span>
      </div>
      <p className="mb-h" aria-hidden>
        Where time and money leak
      </p>
      <div className="mb-grid" aria-hidden>
        {PETALS.map((p, i) => (
          <div key={p.channel} className="mb-card" data-at={p.at} style={{ ["--c" as string]: p.colour, ["--tc" as string]: p.text, ...d(0.3 + i * 0.12) }}>
            <span className="mb-ch">
              <span className="mb-dot" />
              {p.channel}
            </span>
            <span className="mb-wait">{p.wait}</span>
            <span className="mb-sub">
              {p.hours}
              <br />
              {p.money}
            </span>
          </div>
        ))}
        <div className="mb-flower">
          <svg viewBox="-140 -140 280 280" focusable="false">
            {PETALS.map((p, i) => (
              <g key={p.channel} transform={`rotate(${ANGLE[p.at]})`} style={d(0.15 + i * 0.12)}>
                <path className="mb-fill" d={PATH} fill={p.colour} fillOpacity={0.14} />
                <path className="mb-line" d={PATH} fill="none" stroke={p.colour} strokeWidth={1.5} strokeLinejoin="round" pathLength={1} />
                <line className="mb-line" x1="0" y1="-30" x2="0" y2="-104" stroke={p.colour} strokeOpacity={0.45} strokeWidth={1.5} strokeLinecap="round" pathLength={1} />
              </g>
            ))}
          </svg>
          <div className="mb-heart">
            <span>
              <span>
                <b>16 h</b>a week
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="mb-scale" aria-hidden>
        <span>Slow</span>
        <i />
        <span>60 seconds</span>
      </div>
      <p className="mb-fix" aria-hidden>
        <b>Fix first</b>
        Text back every missed call within 60 seconds, day or night.
      </p>
    </div>
  );
}
