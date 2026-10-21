/**
 * A procedural tree from a fixed seed, so it is the same on every load.
 *
 * Branches grow recursively: each one is a tapered, slightly bent limb in its
 * own local frame (base at 0,0, pointing along +x), with two or three
 * children at its tip. Children thin and shorten, lean a little back toward
 * the light (gravitropism) and one of them carries on close to the parent's
 * line (apical dominance), which is what makes it read as a tree rather than
 * a fractal. Leaves sit on the outer limbs in small, varied shapes. The root
 * system mirrors the canopy below ground: one main root runs to each tool,
 * with finer rootlets off it and a few short feeder roots from the base.
 *
 * Every element carries a growth window [a, b] on one scroll progress from 0
 * to 1: roots, then trunk, then limbs thick to fine, then leaves inside out,
 * then the bloom.
 */

export type Leaf = { x: number; y: number; rot: number; s: number; shape: number; fill: string; op: number; a: number; b: number };
export type Limb = {
  len: number;
  w0: number;
  w1: number;
  bend: number;
  rot: number;
  depth: number;
  fill: string;
  a: number;
  b: number;
  kids: Limb[];
  leaves: Leaf[];
  sway: number;
};
export type Root = { d: string; w: number; op: number; a: number; b: number };
export type Pt = { x: number; y: number };

/** mulberry32: a tiny seeded random number generator. */
export function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deep navy at the trunk, through slate, to peony blue at the twigs. */
const LIMB = ["#13224A", "#182B5C", "#20386F", "#2A4888", "#3559A2", "#4569B8"];
const LEAF = ["#1D3F8F", "#2554D4", "#2F5FE0", "#3D6FEF", "#5B86F5", "#7FA2FF", "#244B9E"];

export type GrowOpts = {
  maxDepth: number;
  leaf: number;
  /** where limb growth starts on the scroll timeline, and the step per depth */
  t0: number;
  dt: number;
  /** where leaves start and finish appearing */
  leafA: number;
  leafB: number;
  /** distance from the trunk at which a leaf counts as "outermost" */
  norm: number;
};

/**
 * Grow one limb and everything above it. `abs` is the limb's absolute angle
 * in degrees (0 = right, -90 = straight up).
 */
export function grow(r: () => number, o: GrowOpts, depth: number, abs: number, len: number, w: number, rot: number, reach: number): Limb {
  const w1 = Math.max(0.6, w * (0.58 + r() * 0.1));
  const a = o.t0 + depth * o.dt;
  const limb: Limb = {
    len,
    w0: w,
    w1,
    bend: (r() - 0.5) * len * 0.16,
    rot,
    depth,
    fill: LIMB[Math.min(depth, LIMB.length - 1)],
    a,
    b: a + o.dt * 1.7,
    kids: [],
    leaves: [],
    sway: 4.5 + r() * 3,
  };
  if (depth < o.maxDepth) {
    const n = depth >= 1 && r() < 0.28 ? 3 : 2;
    const lead = r() < 0.5 ? -1 : 1;
    for (let k = 0; k < n; k++) {
      // the first child carries on near the parent's line, the others fork off
      const side = k === 0 ? lead : k === 1 ? -lead : lead;
      const spread = k === 0 ? 6 + r() * 12 : 24 + r() * 20 + depth * 2;
      let cr = side * spread;
      let ca = abs + cr;
      // lean back toward the light, never droop below the horizon
      cr += (-90 - ca) * (0.1 + r() * 0.08);
      ca = abs + cr;
      if (ca > -8) cr -= ca + 8;
      if (ca < -172) cr += -172 - ca;
      const cl = len * (k === 0 ? 0.74 + r() * 0.1 : 0.62 + r() * 0.12);
      limb.kids.push(grow(r, o, depth + 1, abs + cr, cl, w1 * (k === 0 ? 1 : 0.86), cr, reach + len));
    }
  }
  if (depth >= o.maxDepth - 1) {
    const count = depth === o.maxDepth ? 4 + Math.floor(r() * 3) : 2 + Math.floor(r() * 2);
    for (let i = 0; i < count; i++) {
      const t = depth === o.maxDepth ? 0.3 + (i / count) * 0.75 : 0.45 + r() * 0.5;
      const side = i % 2 ? 1 : -1;
      // order the pop by distance from the trunk: inside out
      const near = Math.min(1, (reach + len * t) / o.norm);
      const la = o.leafA + near * (o.leafB - o.leafA) * 0.85 + r() * 0.03;
      limb.leaves.push({
        x: len * Math.min(1, t),
        y: limb.bend * 4 * t * (1 - t) * 0.5,
        rot: side * (34 + r() * 30) + (r() - 0.5) * 14,
        s: o.leaf * (0.65 + r() * 0.6),
        shape: Math.floor(r() * 3),
        fill: LEAF[Math.floor(r() * LEAF.length)],
        op: 0.72 + r() * 0.28,
        a: la,
        b: la + 0.07,
      });
    }
    // a tip leaf, pointing on
    const near = Math.min(1, (reach + len) / o.norm);
    const la = o.leafA + near * (o.leafB - o.leafA) * 0.85;
    limb.leaves.push({ x: len, y: 0, rot: (r() - 0.5) * 20, s: o.leaf * (0.8 + r() * 0.4), shape: 0, fill: LEAF[3 + Math.floor(r() * 3)], op: 0.95, a: la, b: la + 0.07 });
  }
  return limb;
}

/** A tapered limb along +x from 0 to len, with a gentle bend. */
export function limbPath(l: Limb) {
  const { len, w0, w1, bend } = l;
  const mid = (w0 + w1) / 4;
  return `M0 ${(-w0 / 2).toFixed(2)} Q${(len / 2).toFixed(1)} ${(bend - mid).toFixed(2)} ${len.toFixed(1)} ${(-w1 / 2).toFixed(2)} L${len.toFixed(1)} ${(w1 / 2).toFixed(2)} Q${(len / 2).toFixed(1)} ${(bend + mid).toFixed(2)} 0 ${(w0 / 2).toFixed(2)}Z`;
}

/** Three leaf shapes, base at the origin, pointing along +x, about 1 unit long. */
export const LEAF_SHAPES = [
  "M0 0 C0.22 -0.2 0.62 -0.26 1 0 C0.62 0.26 0.22 0.2 0 0Z", // lance
  "M0 0 C0.1 -0.34 0.62 -0.42 0.9 -0.08 Q1 0 0.9 0.08 C0.62 0.42 0.1 0.34 0 0Z", // oval
  "M0 0 C0.3 -0.16 0.5 -0.36 0.78 -0.26 C0.98 -0.18 1 0.06 0.82 0.16 C0.56 0.3 0.28 0.18 0 0Z", // a little lopsided
];

/** The root system: main roots to each tool, rootlets off them, feeder roots from the base. */
export function rootSystem(r: () => number, base: Pt, tools: (Pt & { s: number })[], scale: number): { main: string[]; up: string[]; fine: Root[] } {
  const main: string[] = [];
  const up: string[] = [];
  const fine: Root[] = [];
  tools.forEach((t, i) => {
    const top = t.y - t.s / 2;
    const dx = t.x - base.x;
    const drop = top - base.y;
    const c1 = { x: base.x + dx * (0.08 + r() * 0.06), y: base.y + drop * (0.35 + r() * 0.1) };
    const c2 = { x: t.x - dx * (0.12 + r() * 0.08), y: top - drop * (0.45 + r() * 0.1) };
    main.push(`M${base.x + dx * 0.03} ${base.y} C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${t.x} ${top}`);
    // the same root drawn tool to trunk, for the light that runs up it
    up.push(`M${t.x} ${top} C${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${base.x + dx * 0.03} ${base.y}`);
    // two rootlets off each main root, curling outward and down
    for (const tt of [0.32 + r() * 0.1, 0.58 + r() * 0.12]) {
      const p = bez(base, c1, c2, { x: t.x, y: top }, tt);
      const out = Math.sign(dx || (i % 2 ? 1 : -1));
      const L = (22 + r() * 26) * scale;
      const end = { x: p.x + out * L * (0.7 + r() * 0.3), y: p.y + L * (0.5 + r() * 0.4) };
      const cp = { x: p.x + out * L * 0.5, y: p.y + L * 0.05 };
      fine.push({ d: `M${p.x.toFixed(1)} ${p.y.toFixed(1)} Q${cp.x.toFixed(1)} ${cp.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`, w: 1, op: 0.5, a: 0.08 + tt * 0.2, b: 0.2 + tt * 0.2 });
    }
  });
  // feeder roots: short, forking, mirroring the canopy
  const feed = (x: number, y: number, abs: number, len: number, w: number, depth: number) => {
    const rad = (abs * Math.PI) / 180;
    const bend = (r() - 0.5) * len * 0.4;
    const ex = x + Math.cos(rad) * len;
    const ey = y + Math.sin(rad) * len;
    const mx = (x + ex) / 2 - Math.sin(rad) * bend;
    const my = (y + ey) / 2 + Math.cos(rad) * bend;
    fine.push({ d: `M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`, w, op: 0.55 - depth * 0.12, a: 0.02 + depth * 0.06, b: 0.14 + depth * 0.06 });
    if (depth < 2) {
      feed(ex, ey, abs - 18 - r() * 16, len * 0.62, w * 0.6, depth + 1);
      feed(ex, ey, abs + 18 + r() * 16, len * 0.55, w * 0.6, depth + 1);
    }
  };
  for (const abs of [38, 62, 90, 118, 142]) feed(base.x + (abs - 90) * 0.12 * scale, base.y, abs + (r() - 0.5) * 10, (40 + r() * 30) * scale, 2.2, 0);
  return { main, up, fine };
}

function bez(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}
