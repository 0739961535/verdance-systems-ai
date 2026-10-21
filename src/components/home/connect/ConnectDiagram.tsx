"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { TOOL_SPRITE } from "../toolSprite";
import { APP_ROWS, CHIPS, type Chip } from "./connectData";

/**
 * How it connects, drawn as a living plant: your tools are the roots, the
 * Verdance core is the stem, and your command centre is the bloom at the top,
 * in the same peony blue as the hero flower.
 *
 * Motion is driven by the visitor, not by a slow loop:
 * - Mouse: moving near a tool lights its root, and the light runs up the stem
 *   to the core and into the bloom in about 0.5s. The plant leans a little
 *   toward the cursor. One pointermove listener, throttled to one rAF.
 * - Touch or keyboard: tap or focus a tool to send its pulse.
 * - Idle (on screen, nobody interacting): one quick pulse every few seconds.
 * - A plain line under the diagram says what the chosen tool sends up.
 * - Reduced motion: a still plant, the line still works.
 *
 * Pulses are Web Animations on stroke-dashoffset and opacity (pathLength 100),
 * the lean is a CSS transform. Two fixed geometries (wide, tall) keep text
 * legible; CSS shows one. viewBox fixes the aspect ratio (CLS 0).
 */

type Pt = { x: number; y: number };
type Node = Pt & { s: number; chip: Chip; i: number };
type Geo = {
  w: number;
  h: number;
  nodes: Node[];
  roots: string[];
  stem: string;
  stemFill: string;
  base: Pt;
  core: Pt & { w: number; h: number };
  bloom: Pt & { r: number };
  card: { w: number; h: number };
  leaves: { x: number; y: number; a: number; s: number }[];
  font: number;
  reach: number;
};

/** A root: from the top of a tool node, curling into the base of the stem. */
const root = (n: Node, base: Pt, k: number) => {
  const top = n.y - n.s / 2;
  const dx = n.x - base.x;
  const lift = (top - base.y) * 0.55;
  return `M${n.x} ${top} C${n.x - dx * 0.08} ${top - lift * 0.9} ${base.x + dx * k} ${base.y + lift * 0.5} ${base.x + dx * 0.04} ${base.y}`;
};

/** The stem: a gentle S from the base up to the bloom, plus a tapered fill around it. */
const stem = (base: Pt, top: Pt, sway: number) =>
  `M${base.x} ${base.y} C${base.x + sway} ${base.y - (base.y - top.y) * 0.35} ${top.x - sway} ${top.y + (base.y - top.y) * 0.4} ${top.x} ${top.y}`;
const stemFill = (base: Pt, top: Pt, sway: number, wb: number, wt: number) => {
  const h = base.y - top.y;
  return [
    `M${base.x - wb} ${base.y}`,
    `C${base.x - wb + sway} ${base.y - h * 0.35} ${top.x - wt - sway} ${top.y + h * 0.4} ${top.x - wt} ${top.y}`,
    `L${top.x + wt} ${top.y}`,
    `C${top.x + wt - sway} ${top.y + h * 0.4} ${base.x + wb + sway} ${base.y - h * 0.35} ${base.x + wb} ${base.y}`,
    "Z",
  ].join(" ");
};

const WIDE: Geo = (() => {
  const s = 54;
  const nodes: Node[] = CHIPS.map((chip, i) => ({ x: 92 + i * 104, y: 618 - (i % 2) * 22, s, chip, i }));
  const base = { x: 560, y: 520 };
  const bloom = { x: 560, y: 196, r: 182 };
  const top = { x: 560, y: 300 };
  return {
    w: 1120,
    h: 690,
    nodes,
    roots: nodes.map((n) => root(n, base, 0.28)),
    stem: stem(base, top, 14),
    stemFill: stemFill(base, top, 14, 13, 6),
    base,
    core: { x: 560, y: 428, w: 214, h: 62 },
    bloom,
    card: { w: 236, h: 150 },
    leaves: [
      { x: 566, y: 352, a: 38, s: 1 },
      { x: 553, y: 486, a: -142, s: 0.85 },
    ],
    font: 13,
    reach: 70,
  };
})();

const TALL: Geo = (() => {
  const s = 50;
  const cols = [38, 109, 180, 251, 322];
  const nodes: Node[] = CHIPS.map((chip, i) => ({ x: cols[i % 5], y: i < 5 ? 568 : 662, s, chip, i }));
  const base = { x: 180, y: 478 };
  const bloom = { x: 180, y: 150, r: 138 };
  const top = { x: 180, y: 252 };
  return {
    w: 360,
    h: 712,
    nodes,
    roots: nodes.map((n) => root(n, base, n.i < 5 ? 0.3 : 0.18)),
    stem: stem(base, top, 9),
    stemFill: stemFill(base, top, 9, 10, 5),
    base,
    core: { x: 180, y: 384, w: 204, h: 58 },
    bloom,
    card: { w: 200, h: 128 },
    leaves: [
      { x: 184, y: 300, a: 40, s: 0.8 },
      { x: 175, y: 446, a: -140, s: 0.7 },
    ],
    font: 13,
    reach: 46,
  };
})();

const PETAL = (len: number, wid: number) =>
  `M0 0 C${wid} ${-len * 0.18} ${wid * 1.08} ${-len * 0.78} ${wid * 0.22} ${-len} Q0 ${-len * 1.04} ${-wid * 0.22} ${-len} C${-wid * 1.08} ${-len * 0.78} ${-wid} ${-len * 0.18} 0 0Z`;

const LEAF = "M0 0 C10 -6 26 -8 36 -2 C26 6 10 6 0 0Z";

function Bloom({ g, v }: { g: Geo; v: string }) {
  const { x, y, r } = g.bloom;
  const rings = [
    { n: 14, len: r, wid: r * 0.36, rot: 0, fill: `url(#ct-p1-${v})`, op: 0.82 },
    { n: 11, len: r * 0.8, wid: r * 0.34, rot: 12, fill: `url(#ct-p2-${v})`, op: 0.95 },
    { n: 9, len: r * 0.6, wid: r * 0.32, rot: 6, fill: `url(#ct-p3-${v})`, op: 1 },
  ];
  const c = g.card;
  const small = v === "tall";
  const rowH = small ? 26 : 30;
  return (
    <g className="ct-bloom" style={{ transformOrigin: `${x}px ${y}px` }}>
      <circle cx={x} cy={y} r={r * 1.35} fill={`url(#ct-halo-${v})`} className="ct-halo" data-bloom-glow="" />
      {rings.map((ring, k) => (
        <g key={k} opacity={ring.op}>
          {Array.from({ length: ring.n }, (_, i) => (
            <path
              key={i}
              d={PETAL(ring.len, ring.wid)}
              transform={`translate(${x} ${y}) rotate(${((i * 360) / ring.n + ring.rot).toFixed(2)})`}
              fill={ring.fill}
              className="ct-petal"
            />
          ))}
        </g>
      ))}
      {/* the command centre at the heart of the bloom */}
      <g transform={`translate(${x - c.w / 2} ${y - c.h / 2})`}>
        <rect width={c.w} height={c.h} rx={16} className="ct-card" />
        <text x={16} y={small ? 24 : 28} className="ct-card-k">
          COMMAND CENTRE
        </text>
        {APP_ROWS.map((row, i) => {
          const ry = (small ? 48 : 56) + i * rowH;
          const pw = row.status.length * 7 + 18;
          return (
            <g key={row.label}>
              <circle cx={20} cy={ry} r={3} className={row.hot ? "ct-led ct-led-hot" : "ct-led"} />
              <text x={30} y={ry} dy="0.35em" className="ct-row" fontSize={g.font}>
                {row.label}
              </text>
              <rect x={c.w - 14 - pw} y={ry - 10} width={pw} height={20} rx={10} className={row.hot ? "ct-pill ct-pill-hot" : "ct-pill"} />
              <text x={c.w - 14 - pw / 2} y={ry} dy="0.35em" textAnchor="middle" className={row.hot ? "ct-pill-t ct-pill-t-hot" : "ct-pill-t"}>
                {row.status}
              </text>
            </g>
          );
        })}
      </g>
    </g>
  );
}

function ToolNode({ n, g, onFire }: { n: Node; g: Geo; onFire: (i: number, how: "tap" | "focus") => void }) {
  const { x, y, s, chip } = n;
  const icon = s * 0.48 * (chip.scale ?? 1);
  const onKey = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFire(n.i, "tap");
    }
  };
  return (
    <g
      className="ct-node"
      role="button"
      tabIndex={0}
      aria-label={`${chip.label}: ${chip.does}`}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") onFire(n.i, "tap");
      }}
      onClick={(e) => {
        if (e.detail > 0) onFire(n.i, "tap");
      }}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) onFire(n.i, "focus");
      }}
      onKeyDown={onKey}
    >
      <circle cx={x} cy={y} r={s * 0.62} className="ct-node-glow" data-node-glow={n.i} />
      <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={s * 0.3} className="ct-node-b" />
      {chip.mark ? (
        <use href={`${TOOL_SPRITE}#${chip.mark}`} x={x - icon / 2} y={y - icon / 2} width={icon} height={icon} fill={chip.color} />
      ) : (
        <path d={chip.path} fill={chip.color} transform={`translate(${x - icon / 2} ${y - icon / 2}) scale(${icon / 24})`} />
      )}
      <text x={x} y={y + s / 2 + 18} textAnchor="middle" className="ct-node-t" fontSize={g.font}>
        {chip.short}
      </text>
    </g>
  );
}

function Tree({ g, v, onFire }: { g: Geo; v: "wide" | "tall"; onFire: (i: number, how: "tap" | "focus") => void }) {
  const { core, base } = g;
  return (
    <svg
      className={`ct-svg ct-svg-${v}`}
      viewBox={`0 0 ${g.w} ${g.h}`}
      role="group"
      aria-label="Your tools are the roots. They feed the Verdance core, which runs one command centre for you and your team."
      data-geo={v}
    >
      <defs>
        <radialGradient id={`ct-halo-${v}`}>
          <stop offset="0" stopColor="#4D7CFF" stopOpacity="0.42" />
          <stop offset="0.5" stopColor="#2554D4" stopOpacity="0.14" />
          <stop offset="1" stopColor="#2554D4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`ct-coreglow-${v}`}>
          <stop offset="0" stopColor="#8FB0FF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#4D7CFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`ct-p1-${v}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#173C9E" />
          <stop offset="1" stopColor="#3D6FEF" />
        </linearGradient>
        <linearGradient id={`ct-p2-${v}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2554D4" />
          <stop offset="1" stopColor="#6F96FF" />
        </linearGradient>
        <linearGradient id={`ct-p3-${v}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#3D6FEF" />
          <stop offset="1" stopColor="#B4CAFF" />
        </linearGradient>
        <linearGradient id={`ct-stem-${v}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1D3F8F" />
          <stop offset="0.6" stopColor="#2F5FE0" />
          <stop offset="1" stopColor="#8FB0FF" />
        </linearGradient>
      </defs>

      <g className="ct-plant" style={{ transformOrigin: `${base.x}px ${base.y}px` }}>
        {/* roots: a soft wide stroke for depth, a fine line, and a pulse each */}
        {g.roots.map((d, i) => (
          <g key={i}>
            <path d={d} className="ct-root-soft" />
            <path d={d} className="ct-root" data-root-line={i} />
            <path d={d} className="ct-pulse" pathLength={100} data-root={i} />
          </g>
        ))}

        {/* stem, leaves and the pulse that climbs it */}
        <path d={g.stemFill} fill={`url(#ct-stem-${v})`} className="ct-stem" />
        <path d={g.stem} className="ct-stem-hi" />
        {g.leaves.map((l, i) => (
          <path key={i} d={LEAF} transform={`translate(${l.x} ${l.y}) rotate(${l.a}) scale(${l.s})`} className="ct-leaf" />
        ))}
        <path d={g.stem} className="ct-pulse ct-pulse-stem" pathLength={100} data-stem="" />

        {/* the core: a living glow wrapped round the stem */}
        <circle cx={core.x} cy={core.y} r={core.w * 0.62} fill={`url(#ct-coreglow-${v})`} className="ct-core-glow" data-core-glow="" />
        <rect x={core.x - core.w / 2} y={core.y - core.h / 2} width={core.w} height={core.h} rx={core.h / 2} className="ct-core" />
        <text x={core.x} y={core.y - 6} textAnchor="middle" className="ct-core-t" fontSize={v === "tall" ? 16 : 18}>
          Verdance core
        </text>
        <text x={core.x} y={core.y + 15} textAnchor="middle" className="ct-core-s" fontSize={g.font}>
          Learns your business
        </text>

        <Bloom g={g} v={v} />
      </g>

      <text x={v === "tall" ? 6 : 24} y={g.nodes[0].y - g.nodes[0].s / 2 - (v === "tall" ? 30 : 46)} className="ct-k">
        YOUR TOOLS
      </text>
      {g.nodes.map((n) => (
        <ToolNode key={n.chip.label} n={n} g={g} onFire={onFire} />
      ))}
    </svg>
  );
}

const IDLE_MS = 3200;

export function ConnectDiagram() {
  const wrap = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [touch, setTouch] = useState(false);
  const state = useRef({ last: -1, lastAt: 0, interactAt: 0, live: false, reduce: false, raf: 0, px: 0, py: 0 });

  /** Send one pulse up from tool i: root, stem, core, bloom. About 0.5s end to end. */
  const fire = useCallback((i: number) => {
    const el = wrap.current;
    const st = state.current;
    if (!el || st.reduce) return;
    st.lastAt = performance.now();
    const ease = "cubic-bezier(.45,0,.4,1)";
    const run = (sel: string, kf: Keyframe[], o: KeyframeAnimationOptions) =>
      el.querySelectorAll<SVGElement>(sel).forEach((n) => n.animate(kf, { fill: "none", ...o }));
    run(`[data-root="${i}"]`, [{ strokeDashoffset: 16, opacity: 1 }, { strokeDashoffset: -100, opacity: 1 }], { duration: 300, easing: ease });
    run(`[data-root-line="${i}"]`, [{ stroke: "rgba(191,210,255,0.85)" }, { stroke: "rgba(143,176,255,0.3)" }], { duration: 700, easing: "ease-out" });
    run(`[data-node-glow="${i}"]`, [{ opacity: 0.9 }, { opacity: 0 }], { duration: 650, easing: "ease-out" });
    run("[data-stem]", [{ strokeDashoffset: 28, opacity: 1 }, { strokeDashoffset: -100, opacity: 1 }], { duration: 220, delay: 260, easing: ease });
    run("[data-core-glow]", [{ opacity: 0.55 }, { opacity: 1 }, { opacity: 0.55 }], { duration: 520, delay: 330, easing: "ease-out" });
    run("[data-bloom-glow]", [{ opacity: 0.7 }, { opacity: 1 }, { opacity: 0.7 }], { duration: 640, delay: 440, easing: "ease-out" });
    run(".ct-bloom", [{ transform: "scale(1)" }, { transform: "scale(1.025)" }, { transform: "scale(1)" }], { duration: 640, delay: 440, easing: "ease-out" });
  }, []);

  const choose = useCallback(
    (i: number, how: "tap" | "focus" | "near") => {
      const st = state.current;
      st.interactAt = performance.now();
      setHover(i);
      if (how !== "near" || i !== st.last || performance.now() - st.lastAt > 900) fire(i);
      st.last = i;
    },
    [fire],
  );

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const st = state.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      st.reduce = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    const hv = window.matchMedia("(hover: none)");
    const syncTouch = () => setTouch(hv.matches);
    syncTouch();
    hv.addEventListener("change", syncTouch);
    const io = new IntersectionObserver(
      ([e]) => {
        st.live = e.isIntersecting;
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    const t = window.setInterval(() => {
      if (!st.live || st.reduce || document.hidden) return;
      if (performance.now() - st.interactAt < 4000) return;
      fire(Math.floor(Math.random() * CHIPS.length));
    }, IDLE_MS);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", sync);
      hv.removeEventListener("change", syncTouch);
      window.clearInterval(t);
      cancelAnimationFrame(st.raf);
    };
  }, [fire]);

  /** One rAF per frame at most: find the nearest tool in the visible tree and lean toward the cursor. */
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const st = state.current;
    st.px = e.clientX;
    st.py = e.clientY;
    if (st.raf) return;
    st.raf = requestAnimationFrame(() => {
      st.raf = 0;
      const el = wrap.current;
      const svg = el && Array.from(el.querySelectorAll<SVGSVGElement>("svg[data-geo]")).find((s) => s.getBoundingClientRect().width > 0);
      if (!el || !svg) return;
      const g = svg.dataset.geo === "tall" ? TALL : WIDE;
      const r = svg.getBoundingClientRect();
      const x = ((st.px - r.left) / r.width) * g.w;
      const y = ((st.py - r.top) / r.height) * g.h;
      if (!st.reduce) {
        el.style.setProperty("--ct-lx", Math.max(-1, Math.min(1, (x / g.w - 0.5) * 2)).toFixed(3));
        el.style.setProperty("--ct-ly", Math.max(-1, Math.min(1, (y / g.h - 0.5) * 2)).toFixed(3));
      }
      let best = -1;
      let bd = g.reach;
      for (const n of g.nodes) {
        const d = Math.hypot(n.x - x, n.y - y);
        if (d < bd) {
          bd = d;
          best = n.i;
        }
      }
      if (best >= 0 && best !== st.last) choose(best, "near");
    });
  };
  const onLeave = () => {
    const el = wrap.current;
    if (!el) return;
    el.style.setProperty("--ct-lx", "0");
    el.style.setProperty("--ct-ly", "0");
    state.current.last = -1;
  };

  const onFire = (i: number, how: "tap" | "focus") => choose(i, how);
  const line =
    hover === null
      ? touch
        ? "Tap a tool to see what it sends up."
        : "Point at a tool to see what it sends up."
      : `${CHIPS[hover].label}: ${CHIPS[hover].does}`;

  return (
    <div ref={wrap} className="ct" onPointerMove={onMove} onPointerLeave={onLeave}>
      <style>{CSS}</style>
      <Tree g={WIDE} v="wide" onFire={onFire} />
      <Tree g={TALL} v="tall" onFire={onFire} />
      <p className="ct-line" aria-live="polite">
        {line}
      </p>
    </div>
  );
}

const CSS = `
.ct { position: relative; --ct-lx: 0; --ct-ly: 0; }
.ct-svg { display: block; width: 100%; height: auto; overflow: visible; }
.ct-svg-wide { display: none; }
.ct-svg-tall { max-width: 460px; margin: 0 auto; }
@media (min-width: 1024px) { .ct-svg-wide { display: block; } .ct-svg-tall { display: none; } }
.ct-svg text { font-family: var(--font-sans, inherit); }

.ct-k { font-family: var(--font-mono) !important; font-size: 11px; letter-spacing: 0.16em; fill: #8FB0FF; }
.ct-root-soft { fill: none; stroke: rgba(77,124,255,0.1); stroke-width: 7; stroke-linecap: round; }
.ct-root { fill: none; stroke: rgba(143,176,255,0.3); stroke-width: 1.5; stroke-linecap: round; }
.ct-pulse { fill: none; stroke: #E4ECFF; stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 16 200; stroke-dashoffset: 16; opacity: 0; filter: drop-shadow(0 0 4px #8FB0FF); }
.ct-pulse-stem { stroke-width: 5; stroke-dasharray: 28 200; stroke-dashoffset: 28; stroke: #F4F7FF; filter: drop-shadow(0 0 6px #BFD2FF); }
.ct-stem { opacity: 0.95; }
.ct-stem-hi { fill: none; stroke: rgba(201,216,255,0.45); stroke-width: 1.2; }
.ct-leaf { fill: rgba(61,111,239,0.55); stroke: rgba(160,190,255,0.55); stroke-width: 1; }

.ct-core { fill: #0D1838; stroke: rgba(143,176,255,0.6); stroke-width: 1.2; }
.ct-core-glow { opacity: 0.55; }
.ct-core-t { fill: #F2F5FC; font-weight: 600; letter-spacing: -0.02em; }
.ct-core-s { fill: #B7C6EA; }

.ct-halo { opacity: 0.7; }
.ct-petal { stroke: rgba(190,210,255,0.28); stroke-width: 0.8; }
.ct-card { fill: rgba(8,14,32,0.94); stroke: rgba(143,176,255,0.4); stroke-width: 1; }
.ct-card-k { font-family: var(--font-mono) !important; font-size: 10.5px; letter-spacing: 0.16em; fill: #8FB0FF; }
.ct-row { fill: #E6ECFA; }
.ct-led { fill: rgba(143,176,255,0.55); }
.ct-led-hot { fill: #F2C46D; }
.ct-pill { fill: rgba(255,255,255,0.05); stroke: rgba(255,255,255,0.14); stroke-width: 1; }
.ct-pill-hot { fill: rgba(242,196,109,0.14); stroke: rgba(242,196,109,0.55); }
.ct-pill-t { font-family: var(--font-mono) !important; font-size: 10.5px; fill: #C9D2E6; }
.ct-pill-t-hot { fill: #F7D899; }

.ct-node { cursor: pointer; outline: none; }
.ct-node-b { fill: #0E1730; stroke: rgba(143,176,255,0.28); stroke-width: 1; transition: stroke .25s ease, fill .25s ease; }
.ct-node-glow { fill: #4D7CFF; opacity: 0; filter: blur(6px); }
.ct-node-t { fill: #DCE3F2; font-weight: 500; }
.ct-node:hover .ct-node-b, .ct-node:focus-visible .ct-node-b { stroke: #BFD2FF; fill: #13214A; }
.ct-node:focus-visible .ct-node-b { stroke-width: 2; }

.ct-line { margin: 14px auto 0; max-width: 40rem; min-height: 1.5em; text-align: center; font-size: 1rem; line-height: 1.5; color: var(--color-ink); }

@media (prefers-reduced-motion: no-preference) {
  .ct-plant { transform-box: view-box; transform: rotate(calc(var(--ct-lx) * 1.6deg)); transition: transform .7s cubic-bezier(.2,.8,.2,1); }
  .ct-bloom { transform-box: view-box; translate: calc(var(--ct-lx) * 6px) calc(var(--ct-ly) * 3px); transition: translate .7s cubic-bezier(.2,.8,.2,1); }
  .ct-core-glow { animation: ct-breathe 4.5s ease-in-out infinite; }
}
@keyframes ct-breathe { 0%, 100% { opacity: 0.45; } 50% { opacity: 0.75; } }
`;
