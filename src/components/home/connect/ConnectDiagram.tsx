import { APP_ROWS, CHIPS, type Chip } from "./connectData";

/**
 * The flow diagram as inline SVG: tool chips, wires into the Verdance core,
 * one wire out to a small command-centre mockup. Two fixed geometries (wide
 * and tall) so text stays legible; CSS picks one. Each group is lit once the
 * active step reaches it (data-on), and pulses travel the wires with
 * stroke-dashoffset. viewBox gives the SVG its aspect ratio up front (CLS 0).
 */

type Pt = { x: number; y: number };
type Geo = {
  w: number;
  h: number;
  chips: { x: number; y: number; w: number; h: number; anchor: Pt }[];
  wire: (a: Pt) => string;
  core: { x: number; y: number; w: number; h: number };
  out: string;
  app: { x: number; y: number; w: number; h: number };
  phone: boolean;
};

const CHIP_H = 38;

const WIDE: Geo = (() => {
  const chips = CHIPS.map((_, i) => {
    const y = 25 + i * 48;
    return { x: 8, y, w: 214, h: CHIP_H, anchor: { x: 222, y: y + CHIP_H / 2 } };
  });
  return {
    w: 1120,
    h: 570,
    chips,
    wire: (a) => `M${a.x} ${a.y} C${a.x + 140} ${a.y} ${330} 260 470 260`,
    core: { x: 470, y: 185, w: 190, h: 150 },
    out: "M660 260 L800 260",
    app: { x: 800, y: 70, w: 290, h: 380 },
    phone: true,
  };
})();

const TALL: Geo = (() => {
  const cw = 174;
  const ch = 36;
  const chips = CHIPS.map((_, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 4 + col * (cw + 4);
    const y = 4 + row * (ch + 8);
    return { x, y, w: cw, h: ch, anchor: { x: 22 + i * 35.1, y: 228 } };
  });
  return {
    w: 360,
    h: 668,
    chips,
    wire: (a) => `M${a.x} ${a.y} C${a.x} ${270} 180 ${262} 180 304`,
    core: { x: 70, y: 304, w: 220, h: 92 },
    out: "M180 396 L180 444",
    app: { x: 26, y: 444, w: 308, h: 220 },
    phone: false,
  };
})();

function ChipShape({ c, chip, small }: { c: Geo["chips"][number]; chip: Chip; small: boolean }) {
  const icon = 15;
  const pad = 14;
  const ty = c.y + c.h / 2;
  return (
    <g className="hic-chip">
      <rect x={c.x + 0.5} y={c.y + 0.5} width={c.w - 1} height={c.h - 1} rx={c.h / 2} />
      {chip.path ? (
        <path
          className="hic-ico"
          d={chip.path}
          transform={`translate(${c.x + pad} ${ty - icon / 2}) scale(${icon / 24})`}
        />
      ) : null}
      <text
        x={chip.path ? c.x + pad + icon + 9 : c.x + c.w / 2}
        y={ty}
        dy="0.35em"
        textAnchor={chip.path ? "start" : "middle"}
        className={chip.path ? "hic-chip-t" : "hic-chip-t hic-chip-more"}
        fontSize={small ? 12.5 : 14}
      >
        {chip.label}
      </text>
    </g>
  );
}

function Pulse({ d, i }: { d: string; i: number }) {
  return (
    <path
      className="hic-pulse"
      d={d}
      pathLength={100}
      style={{ animationDelay: `${-((i * 0.37) % 2.4).toFixed(2)}s` }}
    />
  );
}

function AppMock({ a, phone, small }: { a: Geo["app"]; phone: boolean; small: boolean }) {
  const rowH = small ? 30 : 52;
  const top = a.y + (small ? 52 : 70);
  return (
    <g className="hic-app">
      <rect className="hic-win" x={a.x + 0.5} y={a.y + 0.5} width={a.w - 1} height={a.h - 1} rx={18} />
      {[0, 1, 2].map((d) => (
        <circle key={d} className="hic-dot" cx={a.x + 20 + d * 12} cy={a.y + 20} r={3.5} />
      ))}
      <text className="hic-app-h" x={a.x + 20} y={a.y + (small ? 40 : 50)} fontSize={small ? 13 : 15}>
        Command centre
      </text>
      {APP_ROWS.map((r, i) => {
        const y = top + i * rowH;
        const pillW = r.status.length * 6.4 + 18;
        return (
          <g key={r.label}>
            <line className="hic-rule" x1={a.x + 16} x2={a.x + a.w - 16} y1={y} y2={y} />
            <text className="hic-row-t" x={a.x + 20} y={y + (small ? 19 : 22)} fontSize={small ? 12 : 13.5}>
              {r.label}
            </text>
            {small ? null : (
              <rect className="hic-skel" x={a.x + 20} y={y + 33} width={70 + ((i * 37) % 60)} height={5} rx={2.5} />
            )}
            <rect
              className={i === 2 ? "hic-pill hic-pill-hot" : "hic-pill"}
              x={a.x + a.w - 20 - pillW}
              y={y + (small ? 7 : 12)}
              width={pillW}
              height={18}
              rx={9}
            />
            <text
              className={i === 2 ? "hic-pill-t hic-pill-t-hot" : "hic-pill-t"}
              x={a.x + a.w - 20 - pillW / 2}
              y={y + (small ? 16 : 21)}
              dy="0.35em"
              textAnchor="middle"
            >
              {r.status}
            </text>
          </g>
        );
      })}
      {phone ? (
        <g className="hic-phone" transform={`translate(${a.x + a.w - 62} ${a.y + a.h - 44})`}>
          <rect className="hic-win hic-phone-b" x={0} y={0} width={84} height={156} rx={16} />
          <rect className="hic-skel" x={12} y={22} width={46} height={5} rx={2.5} />
          <rect className="hic-skel" x={12} y={36} width={34} height={5} rx={2.5} />
          <rect className="hic-skel" x={12} y={62} width={56} height={5} rx={2.5} />
          <rect className="hic-skel" x={12} y={76} width={40} height={5} rx={2.5} />
          <rect className="hic-pill hic-pill-hot" x={12} y={112} width={60} height={20} rx={10} />
          <text className="hic-pill-t hic-pill-t-hot" x={42} y={122} dy="0.35em" textAnchor="middle">
            Approve
          </text>
        </g>
      ) : null}
    </g>
  );
}

function Diagram({ g, step, variant }: { g: Geo; step: number; variant: "wide" | "tall" }) {
  const small = variant === "tall";
  const on = (n: number) => (step >= n ? "" : undefined);
  const cx = g.core.x + g.core.w / 2;
  const cy = g.core.y + g.core.h / 2;
  return (
    <svg
      className={`hic-svg hic-svg-${variant}`}
      viewBox={`0 0 ${g.w} ${g.h}`}
      role="img"
      aria-label="Your tools, such as WhatsApp, email, calendar, your store and accounting, connect into the Verdance core, which runs one command centre for you and your team."
    >
      <defs>
        <radialGradient id={`hic-glow-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4D7CFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#4D7CFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="hic-g hic-in" data-on={on(1)}>
        {small ? <line className="hic-bus" x1={18} x2={342} y1={228} y2={228} /> : null}
        {g.chips.map((c, i) => (
          <path key={i} className="hic-wire" d={g.wire(c.anchor)} />
        ))}
        {g.chips.map((c, i) => (
          <Pulse key={i} d={g.wire(c.anchor)} i={i} />
        ))}
      </g>

      <g className="hic-g hic-chips" data-on={on(0)}>
        {g.chips.map((c, i) => (
          <ChipShape key={CHIPS[i].label} c={c} chip={CHIPS[i]} small={small} />
        ))}
      </g>

      <g className="hic-g hic-out" data-on={on(3)}>
        <path className="hic-wire" d={g.out} />
        <Pulse d={g.out} i={1} />
        <Pulse d={g.out} i={4} />
        <AppMock a={g.app} phone={g.phone} small={small} />
      </g>

      <g className="hic-g hic-core" data-on={on(2)}>
        <circle className="hic-halo" cx={cx} cy={cy} r={small ? 100 : 150} fill={`url(#hic-glow-${variant})`} />
        <rect className="hic-core-b" x={g.core.x} y={g.core.y} width={g.core.w} height={g.core.h} rx={24} />
        <rect
          className="hic-ring"
          x={g.core.x - 6}
          y={g.core.y - 6}
          width={g.core.w + 12}
          height={g.core.h + 12}
          rx={30}
        />
        <text className="hic-core-k" x={cx} y={cy - (small ? 14 : 22)} textAnchor="middle">
          INTELLIGENCE LAYER
        </text>
        <text className="hic-core-t" x={cx} y={cy + (small ? 8 : 6)} textAnchor="middle" fontSize={small ? 19 : 22}>
          Verdance core
        </text>
        <text className="hic-core-s" x={cx} y={cy + (small ? 30 : 32)} textAnchor="middle">
          Agents, rules, approvals
        </text>
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
