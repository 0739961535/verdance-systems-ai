import { APP_ROWS, CHIPS, type Chip } from "./connectData";

/**
 * The flow diagram as inline SVG, in the spirit of an integrations map: real
 * tool marks in rounded nodes, curved data lines into a glowing Verdance
 * core, and lines out to the command-centre mockup. Light pulses travel the
 * lines (stroke-dashoffset on a pathLength of 100). Two fixed geometries,
 * wide and tall, so text stays legible; CSS picks one. Each group lights up
 * once the active step reaches it (data-on). viewBox fixes the aspect ratio
 * up front (CLS 0).
 */

type Pt = { x: number; y: number };
type Node = { cx: number; cy: number; s: number; chip: Chip };
type Box = { x: number; y: number; w: number; h: number };
type Geo = {
  w: number;
  h: number;
  nodes: Node[];
  wires: string[];
  core: Box;
  outs: string[];
  app: Box;
  phone: boolean;
  panel?: Box;
};

const curveH = (a: Pt, b: Pt, k = 0.5) => {
  const dx = (b.x - a.x) * k;
  return `M${a.x} ${a.y} C${a.x + dx} ${a.y} ${b.x - dx} ${b.y} ${b.x} ${b.y}`;
};
const curveV = (a: Pt, b: Pt, k = 0.55) => {
  const dy = (b.y - a.y) * k;
  return `M${a.x} ${a.y} C${a.x} ${a.y + dy} ${b.x} ${b.y - dy} ${b.x} ${b.y}`;
};

const WIDE: Geo = (() => {
  const S = 58;
  const mid = 307;
  const arc = (y: number) => 30 * (1 - ((y - mid) / 250) ** 2);
  const nodes: Node[] = CHIPS.map((chip, i) => {
    const colB = i % 2 === 1;
    const k = Math.floor(i / 2);
    const cy = colB ? 118 + k * 108 : 64 + k * 108;
    const cx = (colB ? 214 : 70) + arc(cy);
    return { cx, cy, s: S, chip };
  });
  const core = { x: 480, y: 222, w: 210, h: 176 };
  const ccy = core.y + core.h / 2;
  const order = nodes.map((n, i) => ({ i, y: n.cy })).sort((a, b) => a.y - b.y);
  const entry: number[] = [];
  order.forEach((o, r) => (entry[o.i] = ccy + (r - 4.5) * 13));
  const wires = nodes.map((n, i) => curveH({ x: n.cx + S / 2, y: n.cy }, { x: core.x, y: entry[i] }, 0.55));
  const app = { x: 800, y: 112, w: 280, h: 388 };
  const outs = [
    curveH({ x: core.x + core.w, y: ccy - 22 }, { x: app.x, y: app.y + 104 }, 0.5),
    curveH({ x: core.x + core.w, y: ccy + 22 }, { x: app.x, y: app.y + 260 }, 0.5),
  ];
  return { w: 1120, h: 620, nodes, wires, core, outs, app, phone: true };
})();

const TALL: Geo = (() => {
  const S = 44;
  const panel = { x: 6, y: 6, w: 348, h: 214 };
  const pitch = panel.w / 5;
  const nodes: Node[] = CHIPS.map((chip, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    return { cx: panel.x + pitch / 2 + col * pitch, cy: 72 + row * 84, s: S, chip };
  });
  const core = { x: 60, y: 294, w: 240, h: 112 };
  const wires = [0, 1, 2, 3, 4].map((c) =>
    curveV({ x: nodes[c].cx, y: panel.y + panel.h }, { x: 150 + c * 15, y: core.y }, 0.6),
  );
  const app = { x: 20, y: 464, w: 320, h: 216 };
  const outs = [
    curveV({ x: 165, y: core.y + core.h }, { x: 165, y: app.y }),
    curveV({ x: 195, y: core.y + core.h }, { x: 195, y: app.y }),
  ];
  return { w: 360, h: 684, nodes, wires, core, outs, app, phone: false, panel };
})();

function NodeShape({ n, small }: { n: Node; small: boolean }) {
  const { cx, cy, s, chip } = n;
  const icon = (small ? 20 : 26) * (chip.scale ?? 1);
  const r = small ? 13 : 16;
  return (
    <g className="hic-node">
      <title>{chip.label}</title>
      <rect className="hic-node-b" x={cx - s / 2} y={cy - s / 2} width={s} height={s} rx={r} />
      <rect className="hic-node-hi" x={cx - s / 2 + 1} y={cy - s / 2 + 1} width={s - 2} height={s / 2} rx={r - 1} />
      {chip.path ? (
        <path
          className="hic-ico"
          d={chip.path}
          fill={chip.color}
          transform={`translate(${cx - icon / 2} ${cy - icon / 2}) scale(${icon / 24})`}
        />
      ) : null}
      <text className="hic-node-t" x={cx} y={cy + s / 2 + (small ? 14 : 19)} textAnchor="middle" fontSize={small ? 9.5 : 12}>
        {chip.short}
      </text>
    </g>
  );
}

function Pulse({ d, i, out = false }: { d: string; i: number; out?: boolean }) {
  return (
    <path
      className={out ? "hic-pulse hic-pulse-out" : "hic-pulse"}
      d={d}
      pathLength={100}
      style={{ animationDelay: `${-((i * 0.53) % 3).toFixed(2)}s` }}
    />
  );
}

function AppMock({ a, phone, small }: { a: Box; phone: boolean; small: boolean }) {
  const rowH = small ? 30 : 54;
  const top = a.y + (small ? 62 : 80);
  return (
    <g className="hic-app">
      <rect className="hic-win" x={a.x + 0.5} y={a.y + 0.5} width={a.w - 1} height={a.h - 1} rx={18} />
      <line className="hic-rule" x1={a.x} x2={a.x + a.w} y1={a.y + 34} y2={a.y + 34} />
      {[0, 1, 2].map((d) => (
        <circle key={d} className="hic-dot" cx={a.x + 20 + d * 12} cy={a.y + 17} r={3.5} />
      ))}
      <text className="hic-app-k" x={a.x + a.w - 18} y={a.y + 17} dy="0.35em" textAnchor="end">
        OPERATIONS TEAM
      </text>
      <text className="hic-app-h" x={a.x + 20} y={a.y + (small ? 52 : 60)} dy="0.35em" fontSize={small ? 13 : 15}>
        Command centre
      </text>
      {APP_ROWS.map((r, i) => {
        const y = top + i * rowH;
        const pillW = r.status.length * 6.4 + 18;
        const mid = y + (small ? 15 : 20);
        return (
          <g key={r.label}>
            {i > 0 ? <line className="hic-rule" x1={a.x + 16} x2={a.x + a.w - 16} y1={y} y2={y} /> : null}
            <circle className={i === 2 ? "hic-led hic-led-hot" : "hic-led"} cx={a.x + 24} cy={mid} r={3} />
            <text className="hic-row-t" x={a.x + 36} y={mid} dy="0.35em" fontSize={small ? 12 : 13.5}>
              {r.label}
            </text>
            {small ? null : (
              <rect className="hic-skel" x={a.x + 36} y={y + 34} width={64 + ((i * 37) % 60)} height={5} rx={2.5} />
            )}
            <rect
              className={i === 2 ? "hic-pill hic-pill-hot" : "hic-pill"}
              x={a.x + a.w - 18 - pillW}
              y={mid - 9}
              width={pillW}
              height={18}
              rx={9}
            />
            <text
              className={i === 2 ? "hic-pill-t hic-pill-t-hot" : "hic-pill-t"}
              x={a.x + a.w - 18 - pillW / 2}
              y={mid}
              dy="0.35em"
              textAnchor="middle"
            >
              {r.status}
            </text>
          </g>
        );
      })}
      {phone ? (
        <g className="hic-phone" transform={`translate(${a.x + a.w - 58} ${a.y + a.h - 46})`}>
          <rect className="hic-win hic-phone-b" x={0} y={0} width={84} height={150} rx={16} />
          <rect className="hic-notch" x={30} y={8} width={24} height={5} rx={2.5} />
          <rect className="hic-skel" x={12} y={26} width={46} height={5} rx={2.5} />
          <rect className="hic-skel" x={12} y={40} width={34} height={5} rx={2.5} />
          <rect className="hic-skel" x={12} y={64} width={56} height={5} rx={2.5} />
          <rect className="hic-skel" x={12} y={78} width={40} height={5} rx={2.5} />
          <rect className="hic-pill hic-pill-hot" x={12} y={110} width={60} height={20} rx={10} />
          <text className="hic-pill-t hic-pill-t-hot" x={42} y={120} dy="0.35em" textAnchor="middle">
            Approve
          </text>
        </g>
      ) : null}
    </g>
  );
}

function Core({ c, small, variant }: { c: Box; small: boolean; variant: string }) {
  const cx = c.x + c.w / 2;
  const cy = c.y + c.h / 2;
  const r = small ? 24 : 30;
  return (
    <>
      <circle className="hic-halo" cx={cx} cy={cy} r={small ? 160 : 260} fill={`url(#hic-glow-${variant})`} />
      <circle className="hic-orbit" cx={cx} cy={cy} r={small ? 140 : 140} />
      {small ? null : <circle className="hic-orbit hic-orbit-2" cx={cx} cy={cy} r={186} />}
      <rect className="hic-ring" x={c.x - 6} y={c.y - 6} width={c.w + 12} height={c.h + 12} rx={r + 6} />
      <rect className="hic-core-b" x={c.x} y={c.y} width={c.w} height={c.h} rx={r} fill={`url(#hic-coref-${variant})`} />
      <rect className="hic-core-in" x={c.x + 1.5} y={c.y + 1.5} width={c.w - 3} height={c.h / 2} rx={r - 1.5} />
      <circle className="hic-core-dot" cx={cx} cy={cy - (small ? 34 : 50)} r={small ? 3 : 4} />
      <text className="hic-core-k" x={cx} y={cy - (small ? 16 : 22)} textAnchor="middle">
        INTELLIGENCE LAYER
      </text>
      <text className="hic-core-t" x={cx} y={cy + (small ? 8 : 9)} textAnchor="middle" fontSize={small ? 19 : 23}>
        Verdance core
      </text>
      <text className="hic-core-s" x={cx} y={cy + (small ? 30 : 37)} textAnchor="middle">
        Agents, rules, approvals
      </text>
    </>
  );
}

function Diagram({ g, step, variant }: { g: Geo; step: number; variant: "wide" | "tall" }) {
  const small = variant === "tall";
  const on = (n: number) => (step >= n ? "" : undefined);
  return (
    <svg
      className={`hic-svg hic-svg-${variant}`}
      viewBox={`0 0 ${g.w} ${g.h}`}
      role="img"
      aria-label="Your tools, such as WhatsApp, email, calendar, your store and accounting, connect into the Verdance core, which runs one command centre for you and your team."
    >
      <defs>
        <radialGradient id={`hic-glow-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4D7CFF" stopOpacity="0.4" />
          <stop offset="45%" stopColor="#2554D4" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#2554D4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`hic-coref-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1C2E5C" />
          <stop offset="100%" stopColor="#0E1A3A" />
        </linearGradient>
        <filter id={`hic-soft-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hic-g hic-core" data-on={on(2)}>
        <Core c={g.core} small={small} variant={variant} />
      </g>

      <g className="hic-g hic-in" data-on={on(1)}>
        {g.wires.map((d, i) => (
          <path key={i} className="hic-wire" d={d} />
        ))}
        <g filter={`url(#hic-soft-${variant})`}>
          {g.wires.map((d, i) => (
            <Pulse key={i} d={d} i={i} />
          ))}
        </g>
      </g>

      <g className="hic-g hic-out" data-on={on(3)}>
        {g.outs.map((d, i) => (
          <path key={i} className="hic-wire" d={d} />
        ))}
        <g filter={`url(#hic-soft-${variant})`}>
          {g.outs.map((d, i) => (
            <Pulse key={i} d={d} i={i * 3 + 1} out />
          ))}
        </g>
        <AppMock a={g.app} phone={g.phone} small={small} />
      </g>

      <g className="hic-g hic-chips" data-on={on(0)}>
        {g.panel ? (
          <>
            <rect className="hic-panel" x={g.panel.x} y={g.panel.y} width={g.panel.w} height={g.panel.h} rx={20} />
            <text className="hic-panel-k" x={g.panel.x + 18} y={g.panel.y + 22}>
              YOUR TOOLS
            </text>
          </>
        ) : null}
        {g.nodes.map((n) => (
          <NodeShape key={n.chip.label} n={n} small={small} />
        ))}
      </g>
    </svg>
  );
}

export function ConnectDiagram({ step }: { step: number }) {
  return (
    <div className="hic-dia">
      <Diagram g={WIDE} step={step} variant="wide" />
      <Diagram g={TALL} step={step} variant="tall" />
    </div>
  );
}
