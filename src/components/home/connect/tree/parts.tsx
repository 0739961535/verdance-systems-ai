import { APP_ROWS } from "../connectData";
import { LEAF_SHAPES, limbPath, rng, type Leaf, type Limb, type Pt, type Root } from "./gen";

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

/**
 * One peony petal, base at the origin, pointing up (-y): narrow at the base,
 * broad and cupped in the middle, with a ruffled, scalloped top edge. Every
 * petal is drawn from the seeded random source, so no two are stamps.
 */
function petal(r: () => number, len: number, wid: number) {
  const L = len * (0.9 + r() * 0.2);
  const W = wid * (0.85 + r() * 0.3);
  const skew = (r() - 0.5) * W * 0.25;
  const lw = W * (0.9 + r() * 0.2);
  const rw = W * (0.9 + r() * 0.2);
  const shoulder = 0.84 + r() * 0.08;
  const left = { x: -lw * 0.78 + skew, y: -L * shoulder };
  const right = { x: rw * 0.78 + skew, y: -L * (shoulder - 0.03 + r() * 0.06) };
  let d = `M${(-W * 0.06).toFixed(1)} 0 C${(-lw * 0.55).toFixed(1)} ${(-L * 0.14).toFixed(1)} ${(-lw * 1.08).toFixed(1)} ${(-L * 0.5).toFixed(1)} ${left.x.toFixed(1)} ${left.y.toFixed(1)}`;
  // the ruffled edge: 3 to 5 scallops across the top, highest in the middle
  const n = 3 + Math.floor(r() * 3);
  let px = left.x;
  let py = left.y;
  for (let k = 1; k <= n; k++) {
    const t = k / n;
    const x = left.x + (right.x - left.x) * t;
    const y = left.y + (right.y - left.y) * t - Math.sin(t * Math.PI) * L * 0.1;
    const mx = (px + x) / 2;
    const my = (py + y) / 2 - L * (0.05 + r() * 0.06);
    d += ` Q${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    px = x;
    py = y;
  }
  d += ` C${(rw * 1.08).toFixed(1)} ${(-L * 0.5).toFixed(1)} ${(rw * 0.55).toFixed(1)} ${(-L * 0.14).toFixed(1)} ${(W * 0.06).toFixed(1)} 0Z`;
  // a faint vein from the base toward the tip
  const vein = `M0 ${(-L * 0.06).toFixed(1)} Q${(skew * 0.6).toFixed(1)} ${(-L * 0.45).toFixed(1)} ${(skew * 0.9).toFixed(1)} ${(-L * 0.72).toFixed(1)}`;
  return { d, vein };
}

type Ring = { n: number; len: number; wid: number; jitter: number; off: number; grad: string; op: number; a: number; b: number; turn: number };

/**
 * The one peony bloom at the crown: five rings of ruffled petals, broad and
 * translucent outside, tighter and denser toward a crumpled heart. Base
 * deeper peony blue, tips paler, thin edge highlights, a soft shadow under
 * each inner ring for depth. The petals unfurl ring by ring, inside out, at
 * the end of the growth. The command centre card sits in front of the lower
 * half, so the flower frames it on every side and its heart stays visible.
 */
export function Bloom({ at, r, card, font, id, seed }: { at: Pt; r: number; card: { w: number; h: number }; font: number; id: string; seed: number }) {
  const rand = rng(seed);
  const rings: Ring[] = [
    { n: 12, len: r, wid: r * 0.5, jitter: 6, off: 0, grad: "pa", op: 0.84, a: 0.86, b: 0.97, turn: -26 },
    { n: 11, len: r * 0.84, wid: r * 0.46, jitter: 8, off: 0, grad: "pb", op: 0.92, a: 0.83, b: 0.94, turn: 24 },
    { n: 10, len: r * 0.67, wid: r * 0.42, jitter: 10, off: 0.02, grad: "pc", op: 0.96, a: 0.8, b: 0.91, turn: -22 },
    { n: 10, len: r * 0.5, wid: r * 0.38, jitter: 14, off: 0.05, grad: "pd", op: 1, a: 0.77, b: 0.88, turn: 20 },
    { n: 13, len: r * 0.32, wid: r * 0.3, jitter: 40, off: 0.08, grad: "pe", op: 1, a: 0.74, b: 0.85, turn: -18 },
  ];
  const small = id === "tall";
  const rowH = small ? 26 : 30;
  const cardY = at.y + r * 0.52 - card.h / 2;
  return (
    <g className="tr-bloom" style={{ transformOrigin: `${at.x}px ${at.y}px` }}>
      <defs>
        {[
          ["pa", "#102C80", "#1E47B8", "#3466E2", "#86A9FA"],
          ["pb", "#12308A", "#2250C8", "#3B6FEA", "#97B6FD"],
          ["pc", "#143494", "#2656D0", "#4479EE", "#A6C1FF"],
          ["pd", "#12308C", "#2A5BD6", "#4E82F1", "#B4CBFF"],
          ["pe", "#0F2878", "#2552CE", "#5587F2", "#C6D8FF"],
        ].map(([k, c0, c1, c2, c3]) => (
          <linearGradient key={k} id={`tr-${k}-${id}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={c0} />
            <stop offset="0.45" stopColor={c1} />
            <stop offset="0.8" stopColor={c2} />
            <stop offset="1" stopColor={c3} />
          </linearGradient>
        ))}
        <radialGradient id={`tr-cup-${id}`}>
          <stop offset="0" stopColor="#050B22" stopOpacity="0.62" />
          <stop offset="0.7" stopColor="#050B22" stopOpacity="0.12" />
          <stop offset="1" stopColor="#050B22" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`tr-heart-${id}`}>
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#CFE0FF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#8FB0FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={at.x} cy={at.y} r={r * 1.55} fill={`url(#tr-halo-${id})`} className="tr-fade" {...win(0.8, 0.98)} data-bloom-glow="" />
      {rings.map((ring, k) => (
        <g key={k} opacity={ring.op}>
          {/* a soft shadow where this ring sits in the cup of the one outside it */}
          {k > 0 ? <circle cx={at.x} cy={at.y} r={ring.len * 1.02} fill={`url(#tr-cup-${id})`} className="tr-fade" {...win(ring.a, ring.b)} /> : null}
          {Array.from({ length: ring.n }, (_, i) => {
            const rot = (i * 360) / ring.n + k * 13 + (rand() - 0.5) * ring.jitter;
            const p = petal(rand, ring.len, ring.wid);
            const ox = (rand() - 0.5) * r * ring.off;
            const oy = (rand() - 0.5) * r * ring.off;
            const stag = (i / ring.n) * 0.02;
            return (
              <g key={i} transform={`translate(${(at.x + ox).toFixed(1)} ${(at.y + oy).toFixed(1)}) rotate(${rot.toFixed(1)})`}>
                <g className="tr-unfurl" data-turn={ring.turn} {...win(ring.a + stag, ring.b + stag)}>
                  <path d={p.d} fill={`url(#tr-${ring.grad}-${id})`} className="tr-petal" />
                  <path d={p.vein} className="tr-vein" />
                </g>
              </g>
            );
          })}
        </g>
      ))}
      <circle cx={at.x} cy={at.y} r={r * 0.2} fill={`url(#tr-heart-${id})`} className="tr-heart" data-heart="" />
      {/* the card's soft shadow, then the card */}
      <g className="tr-fade" {...win(0.92, 1)}>
        {[16, 10, 5].map((g, i) => (
          <rect key={g} x={at.x - card.w / 2 - g + 4} y={cardY + 10 - g / 2} width={card.w + g * 2 - 8} height={card.h + g * 1.4} rx={18 + g} className="tr-card-shadow" opacity={0.16 + i * 0.1} />
        ))}
      </g>
      <g transform={`translate(${at.x - card.w / 2} ${cardY})`} className="tr-fade" {...win(0.92, 1)}>
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
