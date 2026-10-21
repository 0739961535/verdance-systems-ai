import { SampleTag } from "@/components/kit/SampleTag";
/**
 * "In your control": the Earth's edge at night, with SA and the UK lit, and a
 * 24-hour arc above it running through the night (18:00 to 06:00). The arc
 * draws up to 22:15, where a piece of work is done and waits for the owner.
 * Point in 5 seconds: it works while you sleep, and still waits for you.
 *
 * Two drawings, one for phones and one for wider screens, so labels stay at
 * least 13px. Labels are HTML placed on the same geometry. Only
 * stroke-dashoffset and opacity animate, once, via the shared [data-reveal]
 * observer. Reduced motion or no JS: the finished drawing. Sample.
 */

type Geo = { W: number; H: number; R: number; top: number; gap: number; span: number; cities: { k: string; x: number }[] };

const DESK: Geo = { W: 1200, H: 330, R: 2200, top: 222, gap: 120, span: 400, cities: [{ k: "UK", x: 470 }, { k: "SA", x: 720 }] };
const PHONE: Geo = { W: 400, H: 300, R: 520, top: 232, gap: 92, span: 170, cities: [{ k: "UK", x: 140 }, { k: "SA", x: 262 }] };

const START = 18; // the arc runs 18:00 to 06:00
const DONE = 22.25; // 22:15

function build(g: Geo) {
  const cx = g.W / 2;
  const cy = g.top + g.R;
  const ra = g.R + g.gap;
  const a = Math.asin(g.span / ra);
  const at = (t: number) => {
    const phi = -a + 2 * a * t;
    return { x: cx + ra * Math.sin(phi), y: cy - ra * Math.cos(phi) };
  };
  const p0 = at(0);
  const p1 = at(1);
  const tDone = (DONE - START) / 12;
  const pd = at(tDone);
  const f = (n: number) => n.toFixed(1);
  const arc = `M${f(p0.x)},${f(p0.y)} A${ra},${ra} 0 0 1 ${f(p1.x)},${f(p1.y)}`;
  const done = `M${f(p0.x)},${f(p0.y)} A${ra},${ra} 0 0 1 ${f(pd.x)},${f(pd.y)}`;
  const ticks = Array.from({ length: 13 }, (_, i) => {
    const phi = -a + (2 * a * i) / 12;
    const big = i % 6 === 0;
    const r0 = ra - (big ? 7 : 4);
    const r1 = ra + (big ? 7 : 4);
    return { x1: cx + r0 * Math.sin(phi), y1: cy - r0 * Math.cos(phi), x2: cx + r1 * Math.sin(phi), y2: cy - r1 * Math.cos(phi), big };
  });
  const surfaceY = (x: number) => cy - Math.sqrt(g.R * g.R - (x - cx) * (x - cx));
  // A small, fixed scatter of lights per country (deterministic, no random).
  const scatter = [
    [0, 10, 2.2],
    [-9, 16, 1.4],
    [8, 18, 1.6],
    [-3, 25, 1.2],
    [13, 11, 1.1],
    [-15, 9, 1.0],
    [4, 32, 1.0],
  ];
  const cities = g.cities.map((c) => ({
    k: c.k,
    x: c.x,
    y: surfaceY(c.x),
    dots: scatter.map(([dx, dy, r]) => ({ x: c.x + dx, y: surfaceY(c.x + dx) + dy, r })),
  }));
  return { cx, cy, arc, done, ticks, p0, p1, top: at(0.5), pd, cities };
}

function Drawing({ g, id, cls }: { g: Geo; id: string; cls: string }) {
  const d = build(g);
  const pct = (x: number, y: number) => ({ left: `${(x / g.W) * 100}%`, top: `${(y / g.H) * 100}%` });
  return (
    <div className={`nl-draw ${cls}`} style={{ aspectRatio: `${g.W} / ${g.H}` }}>
      <svg viewBox={`0 0 ${g.W} ${g.H}`} aria-hidden>
        <defs>
          <radialGradient id={`${id}-earth`} cx="50%" cy="0%" r="60%">
            <stop offset="0" stopColor="#13234A" />
            <stop offset="0.5" stopColor="#0A1430" />
            <stop offset="1" stopColor="#060B1A" />
          </radialGradient>
          <filter id={`${id}-glow`} x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id={`${id}-city`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>
        <circle cx={d.cx} cy={d.cy} r={g.R + 4} fill="none" stroke="#4D7CFF" strokeOpacity="0.45" strokeWidth="10" filter={`url(#${id}-glow)`} />
        <circle cx={d.cx} cy={d.cy} r={g.R} fill={`url(#${id}-earth)`} stroke="#8FB0FF" strokeOpacity="0.55" strokeWidth="1.5" />
        {d.cities.map((c) => (
          <g key={c.k}>
            {c.dots.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={p.r * 2.6} fill="#FFC76B" opacity="0.28" filter={`url(#${id}-city)`} />
            ))}
            {c.dots.map((p, i) => (
              <circle key={`d${i}`} cx={p.x} cy={p.y} r={p.r} fill="#FFE2A8" />
            ))}
          </g>
        ))}
        <path d={d.arc} fill="none" stroke="rgba(234,240,255,0.22)" strokeWidth="1.5" />
        {d.ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="rgba(234,240,255,0.4)" strokeWidth={t.big ? 1.5 : 1} />
        ))}
        <path className="nl-done" d={d.done} fill="none" stroke="#8FB0FF" strokeWidth="2.5" strokeLinecap="round" pathLength={1} />
        <g className="nl-mark">
          <circle cx={d.pd.x} cy={d.pd.y} r="11" fill="#4D7CFF" opacity="0.25" />
          <circle cx={d.pd.x} cy={d.pd.y} r="5" fill="#8FB0FF" />
        </g>
      </svg>
      <span className="nl-hour" style={pct(d.p0.x, d.p0.y + 14)}>
        18:00
      </span>
      <span className="nl-hour nl-mid" style={pct(d.top.x, d.top.y + 14)}>
        00:00
      </span>
      <span className="nl-hour" style={pct(d.p1.x, d.p1.y + 14)}>
        06:00
      </span>
      {d.cities.map((c) => (
        <span key={c.k} className="nl-city" style={pct(c.x, c.y + 50)}>
          {c.k}
        </span>
      ))}
      <span className="nl-card" style={pct(d.pd.x, d.pd.y)}>
        <span className="nl-card-t tabular">22:15</span>
        <span className="nl-card-b">Quote follow-up drafted. It waits for you.</span>
      </span>
    </div>
  );
}

export function NightLimb() {
  return (
    <figure className="nl" data-reveal="">
      <style>{CSS}</style>
      <SampleTag place="tr">Sample night</SampleTag>
      <Drawing g={PHONE} id="nlp" cls="nl-phone" />
      <Drawing g={DESK} id="nld" cls="nl-desk" />
    </figure>
  );
}

const CSS = `
.nl { position: relative; margin: 0; }
.nl-draw { position: relative; width: 100%; }
.nl-draw svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: hidden; }
.nl-desk { display: none; }
@media (min-width: 768px) { .nl-phone { display: none; } .nl-desk { display: block; } }
.nl-hour, .nl-city { position: absolute; transform: translate(-50%, 0); font-family: var(--font-mono); font-size: 13px; line-height: 1;
  color: #B8C2D8; white-space: nowrap; }
.nl-city { color: #FFE2A8; letter-spacing: 0.08em; }
.nl-phone .nl-mid { display: none; }
.nl-card { position: absolute; transform: translate(-50%, calc(-100% - 18px)); display: grid; gap: 2px; width: max-content; max-width: 220px;
  padding: 10px 14px; border-radius: 14px; background: rgba(19,32,63,0.92); border: 1px solid rgba(143,176,255,0.35);
  box-shadow: 0 10px 30px -12px rgba(77,124,255,0.6); transition: opacity .6s ease 1s; }
.nl-card-t { font-family: var(--font-mono); font-size: 13px; color: #8FB0FF; }
.nl-card-b { font-size: 14px; line-height: 1.35; color: #F2F5FC; }
@media (min-width: 768px) { .nl-card { max-width: 260px; } .nl-card-b { font-size: 15px; } }
.nl-done { stroke-dasharray: 1; stroke-dashoffset: 0; transition: stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1) .3s; }
.nl-mark { transition: opacity .5s ease 1s; }
.nl[data-armed]:not([data-revealed]) .nl-done { stroke-dashoffset: 1; }
.nl[data-armed]:not([data-revealed]) :is(.nl-mark, .nl-card) { opacity: 0; }
.nl-cap { margin: 0 auto 24px; max-width: 56ch; padding: 0 16px; text-align: center; font-family: var(--font-serif); font-style: italic;
  font-size: 0.9375rem; line-height: 1.5; color: #B8C2D8; }
@media (prefers-reduced-motion: reduce) { .nl-done, .nl-mark, .nl-card { transition: none; } }
`;
