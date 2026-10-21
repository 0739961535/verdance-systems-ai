import { DrawOnView } from "@/components/services/DrawOnView";
import { petalPath } from "@/components/services/ServiceGlyph";

/**
 * /services: "One system, five helpers". The bloom flow diagram.
 * Messages come in on the left (WhatsApp, email, website, phone), pass
 * through the five petals (the helpers), into your own tools, through you
 * at the approval gate, and out as the monthly report.
 *
 * Inline SVG, 1.5px strokes, site blues on night. Two drawings: across on
 * desktop, down on a phone (labels at 15px). Draws in once on view
 * (stroke-dashoffset and opacity only), static under reduced motion.
 */

const CHANNELS = ["WhatsApp", "Email", "Website", "Phone"];
const TOOLS = ["CRM", "Diary", "Store", "Accounts"];

type Pt = [number, number];
const rad = (a: number) => (a * Math.PI) / 180;
const at = (c: Pt, r: number, a: number): Pt => [c[0] + r * Math.cos(rad(a)), c[1] + r * Math.sin(rad(a))];
const f = (n: number) => Math.round(n * 10) / 10;
const d = (s: number) => ({ ["--d" as string]: `${s}s` });

function Bloom({
  c,
  L,
  W,
  r0,
  petals,
  labelGap,
}: {
  c: Pt;
  L: number;
  W: number;
  r0: number;
  petals: { name: string; a: number }[];
  labelGap: number;
}) {
  return (
    <g>
      <circle className="ss-ring dv-fade" style={d(0.35)} cx={c[0]} cy={c[1]} r={r0 + L + 10} />
      {petals.map((p, i) => {
        const [lx, ly] = at(c, r0 + L + labelGap, p.a);
        const cos = Math.cos(rad(p.a));
        const anchor = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
        const sin = Math.sin(rad(p.a));
        const dy = sin > 0.3 ? 12 : sin < -0.9 ? -2 : 5;
        return (
          <g key={p.name}>
            <path
              className="ss-petal dv-line"
              pathLength={1}
              style={d(0.55 + i * 0.07)}
              transform={`translate(${c[0]} ${c[1]}) rotate(${p.a + 90})`}
              d={petalPath(L, W, r0)}
            />
            <text className="ss-label dv-fade" style={d(0.8 + i * 0.07)} x={f(lx)} y={f(ly + dy)} textAnchor={anchor}>
              {p.name}
            </text>
          </g>
        );
      })}
      <circle className="ss-core-ring dv-fade" style={d(0.45)} cx={c[0]} cy={c[1]} r={r0 - 3} />
      <circle className="ss-core dv-fade" style={d(0.45)} cx={c[0]} cy={c[1]} r={r0 - 9} />
    </g>
  );
}

function Gate({ c, r }: { c: Pt; r: number }) {
  return (
    <g className="dv-fade" style={d(1.6)}>
      <circle className="ss-gate" cx={c[0]} cy={c[1]} r={r} />
      <path className="ss-check" d={`M${c[0] - r * 0.36} ${c[1] + 1} l${r * 0.24} ${r * 0.24} l${r * 0.46} ${-r * 0.5}`} />
    </g>
  );
}

/** Across: desktop. */
function Across() {
  const c: Pt = [560, 320];
  const L = 118;
  const W = 56;
  const r0 = 18;
  const R = r0 + L + 10;
  const jIn = at(c, R, 162);
  const jOut = at(c, R, 18);
  const ys = [220, 300, 380, 460];
  const gate: Pt = [1065, 340];
  const petals = [
    { name: "Answers", a: -90 },
    { name: "Follow-ups", a: -18 },
    { name: "Admin", a: 54 },
    { name: "Reports", a: 126 },
    { name: "Research", a: 198 },
  ];
  return (
    <svg className="ss-svg ss-across" viewBox="0 140 1200 400" role="img" aria-labelledby="ss-across-t">
      <title id="ss-across-t">
        Messages from WhatsApp, email, your website and the phone flow into five helpers: Answers, Follow-ups, Admin, Reports and
        Research. Their work goes into your CRM, diary, store and accounts, past you for approval, and comes out as a monthly report.
      </title>
      <text className="ss-cap dv-fade" x={40} y={186}>
        Comes in
      </text>
      <text className="ss-cap dv-fade" x={850} y={186} style={d(1.2)}>
        Your tools
      </text>
      <text className="ss-cap dv-fade" x={1104} y={296} style={d(1.75)}>
        Each month
      </text>
      <text className="ss-cap dv-fade" x={c[0]} y={520} textAnchor="middle" style={d(1)}>
        Your Operations Team
      </text>

      {ys.map((y, i) => (
        <g key={CHANNELS[i]}>
          <path
            className="ss-line dv-line"
            pathLength={1}
            style={d(0.15 + i * 0.05)}
            d={`M190 ${y} C 300 ${y} 330 ${f(jIn[1])} ${f(jIn[0])} ${f(jIn[1])}`}
          />
          <g className="dv-fade" style={d(i * 0.05)}>
            <rect className="ss-node" x={40} y={y - 23} width={150} height={46} rx={23} />
            <text className="ss-label" x={115} y={y + 5} textAnchor="middle">
              {CHANNELS[i]}
            </text>
          </g>
        </g>
      ))}
      <path className="ss-line dv-line" pathLength={1} style={d(0.5)} d={`M${f(jIn[0])} ${f(jIn[1])} L${c[0]} ${c[1]}`} />
      <path className="ss-line dv-line" pathLength={1} style={d(1)} d={`M${c[0]} ${c[1]} L${f(jOut[0])} ${f(jOut[1])}`} />

      <Bloom c={c} L={L} W={W} r0={r0} petals={petals} labelGap={20} />

      {ys.map((y, i) => (
        <g key={TOOLS[i]}>
          <path
            className="ss-line dv-line"
            pathLength={1}
            style={d(1.1 + i * 0.04)}
            d={`M${f(jOut[0])} ${f(jOut[1])} L 770 ${f(jOut[1])} C 815 ${f(jOut[1])} 805 ${y} 850 ${y}`}
          />
          <path
            className="ss-line dv-line"
            pathLength={1}
            style={d(1.4 + i * 0.04)}
            d={`M970 ${y} C 1010 ${y} 1005 ${gate[1]} ${gate[0] - 26} ${gate[1]}`}
          />
          <g className="dv-fade" style={d(1.2 + i * 0.05)}>
            <rect className="ss-node" x={850} y={y - 23} width={120} height={46} rx={12} />
            <text className="ss-label" x={910} y={y + 5} textAnchor="middle">
              {TOOLS[i]}
            </text>
          </g>
        </g>
      ))}

      <Gate c={gate} r={26} />
      <text className="ss-label ss-strong dv-fade" style={d(1.6)} x={gate[0]} y={gate[1] + 54} textAnchor="middle">
        You approve
      </text>
      <path className="ss-line dv-line" pathLength={1} style={d(1.7)} d={`M${gate[0] + 26} ${gate[1]} L1104 ${gate[1]}`} />
      <g className="dv-fade" style={d(1.85)}>
        <rect className="ss-out" x={1104} y={gate[1] - 30} width={92} height={60} rx={14} />
        <text className="ss-label ss-strong" x={1150} y={gate[1] - 4} textAnchor="middle">
          Monthly
        </text>
        <text className="ss-label ss-strong" x={1150} y={gate[1] + 17} textAnchor="middle">
          report
        </text>
      </g>
    </svg>
  );
}

/** Down: phone. */
function Down() {
  const c: Pt = [180, 330];
  const L = 78;
  const W = 40;
  const r0 = 14;
  const R = r0 + L + 10;
  const jIn = at(c, R, 252);
  const jOut = at(c, R, 108);
  const ys = [44, 96, 148, 200];
  const petals = [
    { name: "Answers", a: 288 },
    { name: "Admin", a: 0 },
    { name: "Reports", a: 72 },
    { name: "Research", a: 144 },
    { name: "Follow-ups", a: 216 },
  ];
  return (
    <svg className="ss-svg ss-down" viewBox="0 0 360 760" role="img" aria-labelledby="ss-down-t">
      <title id="ss-down-t">
        Messages from WhatsApp, email, your website and the phone flow into five helpers: Answers, Follow-ups, Admin, Reports and
        Research. Their work goes into your CRM, diary, store and accounts, past you for approval, and comes out as a monthly report.
      </title>
      <text className="ss-cap dv-fade" x={14} y={14}>
        Comes in
      </text>
      {ys.map((y, i) => (
        <g key={CHANNELS[i]}>
          <path
            className="ss-line dv-line"
            pathLength={1}
            style={d(0.15 + i * 0.05)}
            d={i === 0 ? `M134 ${y} L158 ${y} Q170 ${y} 170 ${y + 12} L170 200 C 170 215 ${f(jIn[0])} ${f(jIn[1] - 22)} ${f(jIn[0])} ${f(jIn[1])}` : `M134 ${y} L158 ${y} Q170 ${y} 170 ${y + 12}`}
          />
          <g className="dv-fade" style={d(i * 0.05)}>
            <rect className="ss-node" x={14} y={y - 20} width={120} height={40} rx={20} />
            <text className="ss-label" x={74} y={y + 5} textAnchor="middle">
              {CHANNELS[i]}
            </text>
          </g>
        </g>
      ))}
      <path className="ss-line dv-line" pathLength={1} style={d(0.5)} d={`M${f(jIn[0])} ${f(jIn[1])} L${c[0]} ${c[1]}`} />
      <path className="ss-line dv-line" pathLength={1} style={d(1)} d={`M${c[0]} ${c[1]} L${f(jOut[0])} ${f(jOut[1])}`} />

      <Bloom c={c} L={L} W={W} r0={r0} petals={petals} labelGap={14} />

      <path
        className="ss-line dv-line"
        pathLength={1}
        style={d(1.1)}
        d={`M${f(jOut[0])} ${f(jOut[1])} C ${f(jOut[0])} 470 180 460 180 490`}
      />
      <g className="dv-fade" style={d(1.2)}>
        <rect className="ss-node" x={40} y={490} width={280} height={100} rx={16} />
        <text className="ss-cap" x={180} y={516} textAnchor="middle">
          Your tools
        </text>
        {TOOLS.map((t, i) => (
          <text key={t} className="ss-label" x={i % 2 === 0 ? 110 : 250} y={i < 2 ? 546 : 574} textAnchor="middle">
            {t}
          </text>
        ))}
      </g>
      <path className="ss-line dv-line" pathLength={1} style={d(1.4)} d="M180 590 L180 622" />
      <Gate c={[180, 646]} r={24} />
      <text className="ss-label ss-strong dv-fade" style={d(1.6)} x={214} y={651}>
        You approve
      </text>
      <path className="ss-line dv-line" pathLength={1} style={d(1.7)} d="M180 670 L180 700" />
      <g className="dv-fade" style={d(1.85)}>
        <rect className="ss-out" x={90} y={700} width={180} height={50} rx={14} />
        <text className="ss-label ss-strong" x={180} y={730} textAnchor="middle">
          Monthly report
        </text>
      </g>
    </svg>
  );
}

const CSS = `
.ss-fig { margin: 48px 0 0; }
@media (min-width: 1024px) { .ss-fig { margin-top: 64px; } }
.ss-svg { display: block; width: 100%; height: auto; overflow: visible; }
.ss-across { display: none; }
@media (min-width: 900px) { .ss-across { display: block; } .ss-down { display: none; } }
.ss-down { max-width: 400px; margin: 0 auto; }
.ss-line { fill: none; stroke: #4D7CFF; stroke-opacity: 0.75; stroke-width: 1.5; stroke-linecap: round; }
.ss-petal { fill: rgba(37, 84, 212, 0.26); stroke: #8FB0FF; stroke-width: 1.5; stroke-linejoin: round; }
.ss-ring { fill: none; stroke: rgba(143, 176, 255, 0.16); stroke-width: 1.5; stroke-dasharray: 2 6; }
.ss-core { fill: #4D7CFF; }
.ss-core-ring { fill: #060B1A; stroke: #8FB0FF; stroke-width: 1.5; }
.ss-node { fill: #0E1A3A; stroke: rgba(143, 176, 255, 0.38); stroke-width: 1.5; }
.ss-out { fill: rgba(77, 124, 255, 0.16); stroke: #8FB0FF; stroke-width: 1.5; }
.ss-gate { fill: #13203F; stroke: #8FB0FF; stroke-width: 1.5; }
.ss-check { fill: none; stroke: #DCE6FF; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.ss-label { font-family: var(--font-sans, Inter, system-ui, sans-serif); font-size: 16px; font-weight: 500; fill: #EAF0FF; letter-spacing: -0.005em; }
.ss-down .ss-label { font-size: 15px; }
.ss-strong { font-weight: 600; fill: #F2F5FC; }
.ss-cap { font-family: var(--font-mono, ui-monospace, monospace); font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; fill: #9AA3B5; }
.ss-key { margin-top: 28px; display: grid; gap: 10px; font-size: 1rem; line-height: 1.5; color: #C9D1E3; }
@media (min-width: 768px) { .ss-key { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; } }
.ss-key b { display: block; color: #F2F5FC; font-weight: 600; }
`;

export function ServicesSystem() {
  return (
    <section className="band-night chapter-pad" aria-labelledby="ss-title">
      <style>{CSS}</style>
      <div className="container-wide">
        <div className="max-w-3xl" data-reveal="">
          <p className="eyebrow">How it fits together</p>
          <h2 id="ss-title" className="h2 mt-4">
            One system, <span className="italic-accent">five helpers.</span>
          </h2>
          <p className="lead mt-6">Messages come in. Work gets done in your tools. You approve what matters, and get a report each month.</p>
        </div>
        <DrawOnView className="ss-fig">
          <Across />
          <Down />
        </DrawOnView>
        <ul className="ss-key">
          <li>
            <b>Answers and Follow-ups</b>
            Every message gets a reply. Quiet leads get a polite nudge.
          </li>
          <li>
            <b>Admin and Research</b>
            Bookings, records and look-ups, done in the tools you already use.
          </li>
          <li>
            <b>Reports</b>
            What came in, how fast it was answered and what to fix next.
          </li>
        </ul>
      </div>
    </section>
  );
}
