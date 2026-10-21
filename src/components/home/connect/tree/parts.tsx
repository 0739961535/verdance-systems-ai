import { APP_ROWS } from "../connectData";
import { LEAF_SHAPES, limbPath, type Leaf, type Limb, type Pt, type Root } from "./gen";

/**
 * The tree's parts, each its own component: Roots, Trunk, Branches (limbs
 * with their Leaves), Bloom. Every growing element carries its window on the
 * scroll timeline as data-a and data-b; ConnectDiagram's scroll handler
 * turns the progress into each one's own 0..1 and scales, draws or fades it.
 * Nothing is written without JS or under reduced motion, so the tree then
 * shows fully grown.
 */

/** The element's growth window, read once by TreeDiagram's scroll handler. */
const win = (a: number, b: number) => ({ "data-a": a.toFixed(3), "data-b": b.toFixed(3) });

export function Roots({ main, fine, up }: { main: string[]; fine: Root[]; up: string[] }) {
  return (
    <g className="tr-roots">
      {fine.map((f, i) => (
        <path key={`f${i}`} d={f.d} className="tr-draw tr-rootlet" pathLength={1} strokeWidth={f.w} opacity={f.op} {...win(f.a, f.b)} />
      ))}
      {main.map((d, i) => (
        <g key={i}>
          <path d={d} className="tr-draw tr-root-soft" pathLength={1} {...win(0.01 + i * 0.006, 0.2 + i * 0.006)} />
          <path d={d} className="tr-draw tr-root" pathLength={1} data-root-line={i} {...win(0.01 + i * 0.006, 0.2 + i * 0.006)} />
          <path d={up[i]} className="tr-pulse" pathLength={100} data-root={i} />
        </g>
      ))}
    </g>
  );
}

/** The trunk: a tapered, slightly swaying column, with a flare where it meets the ground. */
export function Trunk({ base, top, w0, w1, sway, id }: { base: Pt; top: Pt; w0: number; w1: number; sway: number; id: string }) {
  const h = base.y - top.y;
  const d = [
    `M${base.x - w0 * 1.6} ${base.y + 2}`,
    `C${base.x - w0 * 0.7} ${base.y - 2} ${base.x - w0 * 0.55} ${base.y - h * 0.06} ${base.x - w0 / 2} ${base.y - h * 0.12}`,
    `C${base.x - w0 / 2 + sway} ${base.y - h * 0.45} ${top.x - w1 / 2 - sway} ${top.y + h * 0.35} ${top.x - w1 / 2} ${top.y}`,
    `L${top.x + w1 / 2} ${top.y}`,
    `C${top.x + w1 / 2 - sway} ${top.y + h * 0.35} ${base.x + w0 / 2 + sway} ${base.y - h * 0.45} ${base.x + w0 / 2} ${base.y - h * 0.12}`,
    `C${base.x + w0 * 0.55} ${base.y - h * 0.06} ${base.x + w0 * 0.7} ${base.y - 2} ${base.x + w0 * 1.6} ${base.y + 2}`,
    "Z",
  ].join(" ");
  // a thin highlight down one side of the bark
  const hi = `M${base.x - w0 * 0.18} ${base.y - h * 0.1} C${base.x - w0 * 0.18 + sway} ${base.y - h * 0.45} ${top.x - w1 * 0.15 - sway} ${top.y + h * 0.35} ${top.x - w1 * 0.15} ${top.y + 4}`;
  return (
    <g className="tr-y" {...win(0.14, 0.36)} style={{ transformOrigin: `${base.x}px ${base.y}px` }}>
      <path d={d} fill={`url(#tr-bark-${id})`} />
      <path d={hi} fill="none" stroke="rgba(160,190,255,0.28)" strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

function LeafG({ f }: { f: Leaf }) {
  return (
    <g transform={`translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) rotate(${f.rot.toFixed(1)}) scale(${f.s.toFixed(2)})`}>
      <path d={LEAF_SHAPES[f.shape]} fill={f.fill} opacity={f.op} className="tr-pop" {...win(f.a, f.b)} />
    </g>
  );
}

/** One limb in its own frame, its leaves, and the limbs that grow from its tip. */
function LimbG({ l }: { l: Limb }) {
  return (
    <g transform={`rotate(${l.rot.toFixed(2)})`}>
      <path d={limbPath(l)} fill={l.fill} className="tr-x" {...win(l.a, l.b)} />
      {l.kids.map((k, i) => (
        <g key={i} transform={`translate(${l.len.toFixed(1)} 0)`}>
          <LimbG l={k} />
        </g>
      ))}
      {l.leaves.length ? (
        <g className="tr-sway" style={{ animationDuration: `${l.sway.toFixed(2)}s`, animationDelay: `${(-l.sway * 0.37).toFixed(2)}s` }}>
          {l.leaves.map((f, i) => (
            <LeafG key={i} f={f} />
          ))}
        </g>
      ) : null}
    </g>
  );
}

export function Branches({ limbs, className = "" }: { limbs: { at: Pt; limb: Limb }[]; className?: string }) {
  return (
    <g className={className}>
      {limbs.map(({ at, limb }, i) => (
        <g key={i} transform={`translate(${at.x.toFixed(1)} ${at.y.toFixed(1)})`}>
          <LimbG l={limb} />
        </g>
      ))}
    </g>
  );
}

const PETAL = (len: number, wid: number) =>
  `M0 0 C${wid} ${-len * 0.18} ${wid * 1.08} ${-len * 0.78} ${wid * 0.22} ${-len} Q0 ${-len * 1.04} ${-wid * 0.22} ${-len} C${-wid * 1.08} ${-len * 0.78} ${-wid} ${-len * 0.18} 0 0Z`;

/** The one peony-blue bloom at the crown, holding the command centre card. */
export function Bloom({ at, r, card, font, id }: { at: Pt; r: number; card: { w: number; h: number }; font: number; id: string }) {
  const rings = [
    { n: 13, len: r, wid: r * 0.37, rot: 0, fill: `url(#tr-p1-${id})`, op: 0.86, a: 0.8, b: 0.9 },
    { n: 11, len: r * 0.8, wid: r * 0.35, rot: 14, fill: `url(#tr-p2-${id})`, op: 0.94, a: 0.84, b: 0.93 },
    { n: 9, len: r * 0.6, wid: r * 0.33, rot: 7, fill: `url(#tr-p3-${id})`, op: 1, a: 0.87, b: 0.96 },
  ];
  const small = id === "tall";
  const rowH = small ? 26 : 30;
  return (
    <g className="tr-bloom" style={{ transformOrigin: `${at.x}px ${at.y}px` }}>
      <circle cx={at.x} cy={at.y} r={r * 1.5} fill={`url(#tr-halo-${id})`} className="tr-fade" {...win(0.8, 0.98)} data-bloom-glow="" />
      {rings.map((ring, k) => (
        <g key={k} opacity={ring.op}>
          {Array.from({ length: ring.n }, (_, i) => (
            <g key={i} transform={`translate(${at.x} ${at.y}) rotate(${((i * 360) / ring.n + ring.rot).toFixed(2)})`}>
              <path d={PETAL(ring.len, ring.wid)} fill={ring.fill} className="tr-pop tr-petal" {...win(ring.a + (i / ring.n) * 0.03, ring.b + (i / ring.n) * 0.03)} />
            </g>
          ))}
        </g>
      ))}
      <g transform={`translate(${at.x - card.w / 2} ${at.y - card.h / 2})`} className="tr-fade" {...win(0.92, 1)}>
        <rect width={card.w} height={card.h} rx={16} className="tr-card" />
        <text x={16} y={small ? 24 : 28} className="tr-card-k">
          COMMAND CENTRE
        </text>
        {APP_ROWS.map((row, i) => {
          const ry = (small ? 48 : 56) + i * rowH;
          const pw = row.status.length * 7 + 18;
          return (
            <g key={row.label}>
              <circle cx={20} cy={ry} r={3} className={row.hot ? "tr-led tr-led-hot" : "tr-led"} />
              <text x={30} y={ry} dy="0.35em" className="tr-row" fontSize={font}>
                {row.label}
              </text>
              <rect x={card.w - 14 - pw} y={ry - 10} width={pw} height={20} rx={10} className={row.hot ? "tr-pill tr-pill-hot" : "tr-pill"} />
              <text x={card.w - 14 - pw / 2} y={ry} dy="0.35em" textAnchor="middle" className={row.hot ? "tr-pill-t tr-pill-t-hot" : "tr-pill-t"}>
                {row.status}
              </text>
            </g>
          );
        })}
      </g>
    </g>
  );
}
