"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { TOOL_SPRITE } from "../toolSprite";
import { CHIPS, type Chip } from "./connectData";
import { grow, rng, rootSystem, type Limb, type Pt } from "./tree/gen";
import { Bloom, Branches, Roots, Trunk } from "./tree/parts";

/**
 * How it connects, as a tree. Your tools are the roots, the Verdance core is
 * the trunk, the branches and leaves are the work it does, and the command
 * centre sits in one peony-blue bloom at the crown.
 *
 * The tree is procedural from a fixed seed (tree/gen.ts), so it is the same on
 * every load, and drawn as SVG paths.
 *
 * Growth is tied to scroll: one rAF scroll handler sets --p (0 to 1) on the
 * wrapper. Roots draw out from the base to each tool, the trunk rises, limbs
 * grow thick to fine, leaves pop in from the inside out, then the bloom
 * opens and the card fades in. Scrolling back plays it in reverse. Phones
 * use a shorter scroll distance.
 *
 * Interaction: pointing at or tapping a tool sends a light up its root,
 * through the trunk, into the bloom (about 0.4s), and the canopy leans very
 * slightly toward the cursor. The leaves sway gently while on screen. A plain
 * line under the tree says what each tool does. Reduced motion: the fully
 * grown, still tree.
 */

type Node = Pt & { s: number; chip: Chip; i: number };
type Geo = {
  id: "wide" | "tall";
  w: number;
  h: number;
  base: Pt;
  top: Pt;
  bloom: Pt & { r: number };
  card: { w: number; h: number };
  nodes: Node[];
  trunk: { w0: number; w1: number; sway: number };
  limbs: { y: number; abs: number; len: number; w: number }[];
  maxDepth: number;
  leaf: number;
  norm: number;
  font: number;
  scale: number;
};

const WIDE: Geo = {
  id: "wide",
  w: 1120,
  h: 850,
  base: { x: 560, y: 632 },
  top: { x: 560, y: 400 },
  bloom: { x: 560, y: 248, r: 146 },
  card: { w: 236, h: 148 },
  nodes: CHIPS.map((chip, i) => ({ x: 92 + i * 104, y: 772 - (i % 2) * 20, s: 54, chip, i })),
  trunk: { w0: 38, w1: 14, sway: 10 },
  limbs: [
    { y: 552, abs: -166, len: 112, w: 13 },
    { y: 540, abs: -14, len: 116, w: 13 },
    { y: 492, abs: -150, len: 108, w: 11.5 },
    { y: 482, abs: -30, len: 112, w: 11.5 },
    { y: 440, abs: -130, len: 96, w: 10 },
    { y: 430, abs: -50, len: 98, w: 10 },
  ],
  maxDepth: 4,
  leaf: 16,
  norm: 400,
  font: 13,
  scale: 1,
};

const TALL: Geo = {
  id: "tall",
  w: 360,
  h: 830,
  base: { x: 180, y: 566 },
  top: { x: 180, y: 404 },
  bloom: { x: 180, y: 248, r: 112 },
  card: { w: 200, h: 126 },
  nodes: CHIPS.map((chip, i) => ({ x: [38, 109, 180, 251, 322][i % 5], y: i < 5 ? 680 : 774, s: 50, chip, i })),
  trunk: { w0: 22, w1: 9, sway: 6 },
  limbs: [
    { y: 512, abs: -152, len: 48, w: 7.5 },
    { y: 504, abs: -34, len: 46, w: 7.5 },
    { y: 472, abs: -138, len: 46, w: 7 },
    { y: 464, abs: -42, len: 48, w: 7 },
    { y: 436, abs: -120, len: 42, w: 6 },
    { y: 428, abs: -60, len: 43, w: 6 },
  ],
  maxDepth: 4,
  leaf: 10,
  norm: 230,
  font: 13,
  scale: 0.5,
};

/** x of the trunk's centre line at height y (the same gentle S the trunk draws). */
function trunkX(g: Geo, y: number) {
  const t = (g.base.y - y) / (g.base.y - g.top.y);
  return g.base.x + Math.sin(t * Math.PI) * g.trunk.sway * 0.35;
}

function build(g: Geo, seed: number) {
  const r = rng(seed);
  const opts = { maxDepth: g.maxDepth, leaf: g.leaf, t0: 0.32, dt: 0.07, leafA: 0.56, leafB: 0.9, norm: g.norm };
  const front = g.limbs.map((m) => {
    const at = { x: trunkX(g, m.y), y: m.y };
    return { at, limb: grow(r, opts, 0, m.abs, m.len, m.w, m.abs, (g.base.y - m.y) * 0.3) };
  });
  // the leader: from the top of the trunk up into the bloom
  const leaderLen = g.top.y - g.bloom.y;
  const leader: Limb = {
    ...grow(r, { ...opts, maxDepth: 1 }, 1, -90, leaderLen, g.trunk.w1, -90, 0),
    kids: [],
    leaves: [],
    bend: 0,
    a: 0.36,
    b: 0.5,
  };
  front.push({ at: g.top, limb: leader });
  // a dimmer, thinner layer behind for depth
  const rb = rng(seed * 7 + 3);
  const backOpts = { ...opts, leaf: g.leaf * 0.85, t0: 0.34 };
  const back = g.limbs.map((m, i) => {
    const at = { x: trunkX(g, m.y - 14), y: m.y - 14 };
    const abs = m.abs + (i % 2 ? 12 : -12);
    return { at, limb: grow(rb, backOpts, 1, abs, m.len * 0.82, m.w * 0.7, abs, (g.base.y - m.y) * 0.3) };
  });
  const roots = rootSystem(rng(seed + 11), g.base, g.nodes, g.scale);
  // the light's route from the base, up the trunk, into the bloom
  const sap = `M${g.base.x} ${g.base.y} C${g.base.x + g.trunk.sway * 0.4} ${g.base.y - (g.base.y - g.top.y) * 0.45} ${g.top.x - g.trunk.sway * 0.4} ${g.top.y + (g.base.y - g.top.y) * 0.35} ${g.top.x} ${g.top.y} L${g.bloom.x} ${g.bloom.y}`;
  return { front, back, roots, sap };
}

function ToolNode({ n, g, onFire }: { n: Node; g: Geo; onFire: (i: number) => void }) {
  const { x, y, s, chip } = n;
  const icon = s * 0.48 * (chip.scale ?? 1);
  const onKey = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFire(n.i);
    }
  };
  return (
    <g
      className="tr-node"
      role="button"
      tabIndex={0}
      aria-label={`${chip.label}: ${chip.does}`}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") onFire(n.i);
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onFire(n.i);
      }}
      onClick={(e) => {
        if (e.detail > 0) onFire(n.i);
      }}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) onFire(n.i);
      }}
      onKeyDown={onKey}
    >
      <circle cx={x} cy={y} r={s * 0.64} className="tr-node-glow" data-node-glow={n.i} />
      <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={s * 0.3} className="tr-node-b" />
      {chip.mark ? (
        <use href={`${TOOL_SPRITE}#${chip.mark}`} x={x - icon / 2} y={y - icon / 2} width={icon} height={icon} fill={chip.color} />
      ) : (
        <path d={chip.path} fill={chip.color} transform={`translate(${x - icon / 2} ${y - icon / 2}) scale(${icon / 24})`} />
      )}
      <text x={x} y={y + s / 2 + 18} textAnchor="middle" className="tr-node-t" fontSize={g.font}>
        {chip.short}
      </text>
    </g>
  );
}

function Tree({ g, onFire }: { g: Geo; onFire: (i: number) => void }) {
  const t = useMemo(() => build(g, g.id === "wide" ? 20261021 : 20261022), [g]);
  const id = g.id;
  return (
    <svg
      className={`tr-svg tr-svg-${id}`}
      viewBox={`0 -24 ${g.w} ${g.h + 24}`}
      role="group"
      aria-label="A tree: your tools are the roots, the Verdance core is the trunk, and your command centre is the bloom at the top."
      data-geo={id}
    >
      <defs>
        <linearGradient id={`tr-bark-${id}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#0E1A3C" />
          <stop offset="0.55" stopColor="#1A2D63" />
          <stop offset="1" stopColor="#2A4A92" />
        </linearGradient>
        <radialGradient id={`tr-halo-${id}`}>
          <stop offset="0" stopColor="#4D7CFF" stopOpacity="0.4" />
          <stop offset="0.55" stopColor="#2554D4" stopOpacity="0.12" />
          <stop offset="1" stopColor="#2554D4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`tr-ground-${id}`}>
          <stop offset="0" stopColor="#4D7CFF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#4D7CFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`tr-p1-${id}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#173C9E" />
          <stop offset="1" stopColor="#3D6FEF" />
        </linearGradient>
        <linearGradient id={`tr-p2-${id}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2554D4" />
          <stop offset="1" stopColor="#6F96FF" />
        </linearGradient>
        <linearGradient id={`tr-p3-${id}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#3D6FEF" />
          <stop offset="1" stopColor="#B4CAFF" />
        </linearGradient>
      </defs>

      {/* the ground: a soft glow and a faint horizon at the base */}
      <ellipse cx={g.base.x} cy={g.base.y + 4} rx={g.w * 0.34} ry={g.w * (id === "wide" ? 0.05 : 0.09)} fill={`url(#tr-ground-${id})`} />
      <line x1={g.base.x - g.w * 0.3} x2={g.base.x + g.w * 0.3} y1={g.base.y + 3} y2={g.base.y + 3} className="tr-horizon" />

      <Roots main={t.roots.main} up={t.roots.up} fine={t.roots.fine} />

      <g className="tr-lean" style={{ transformOrigin: `${g.base.x}px ${g.base.y}px` }}>
        <Branches limbs={t.back} className="tr-back" />
        <Trunk base={g.base} top={g.top} w0={g.trunk.w0} w1={g.trunk.w1} sway={g.trunk.sway} id={id} />
        <Branches limbs={t.front} />
        <path d={t.sap} className="tr-pulse tr-pulse-sap" pathLength={100} data-sap="" />
        <Bloom at={g.bloom} r={g.bloom.r} card={g.card} font={g.font} id={id} />
      </g>

      <text x={id === "tall" ? 6 : 24} y={g.nodes[0].y - g.nodes[0].s / 2 - (id === "tall" ? 34 : 50)} className="tr-k">
        YOUR TOOLS
      </text>
      {g.nodes.map((n) => (
        <ToolNode key={n.chip.label} n={n} g={g} onFire={onFire} />
      ))}
    </svg>
  );
}

const IDLE_MS = 3600;

export function ConnectDiagram() {
  const wrap = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [touch, setTouch] = useState(false);
  const st = useRef({ interactAt: 0, live: false, reduce: false, raf: 0, sraf: 0, px: 0, p: 1 });

  /** One light from tool i: up its root, through the trunk, into the bloom. About 0.4s. */
  const fire = useCallback((i: number) => {
    const el = wrap.current;
    const s = st.current;
    if (!el || s.reduce || s.p < 0.95) return;
    const ease = "cubic-bezier(.45,0,.4,1)";
    const run = (sel: string, kf: Keyframe[], o: KeyframeAnimationOptions) =>
      el.querySelectorAll<SVGElement>(sel).forEach((n) => n.animate(kf, { fill: "none", ...o }));
    run(`[data-root="${i}"]`, [{ strokeDashoffset: 16, opacity: 1 }, { strokeDashoffset: -100, opacity: 1 }], { duration: 220, easing: ease });
    run(`[data-root-line="${i}"]`, [{ stroke: "rgba(191,210,255,0.9)" }, { stroke: "rgba(110,145,230,0.42)" }], { duration: 650, easing: "ease-out" });
    run(`[data-node-glow="${i}"]`, [{ opacity: 0.85 }, { opacity: 0 }], { duration: 600, easing: "ease-out" });
    run("[data-sap]", [{ strokeDashoffset: 28, opacity: 1 }, { strokeDashoffset: -100, opacity: 1 }], { duration: 200, delay: 190, easing: ease });
    run(".tr-bloom", [{ transform: "scale(1)", filter: "brightness(1)" }, { transform: "scale(1.02)", filter: "brightness(1.25)" }, { transform: "scale(1)", filter: "brightness(1)" }], {
      duration: 520,
      delay: 330,
      easing: "ease-out",
    });
  }, []);

  const choose = useCallback(
    (i: number) => {
      st.current.interactAt = performance.now();
      setHover(i);
      fire(i);
    },
    [fire],
  );

  /** Scroll progress: 0 as the tree enters, 1 once it is mostly in view. */
  const measure = useCallback(() => {
    const el = wrap.current;
    const s = st.current;
    if (!el) return;
    if (s.reduce) {
      s.p = 1;
      el.style.setProperty("--p", "1");
      return;
    }
    const svg = Array.from(el.querySelectorAll<SVGSVGElement>("svg[data-geo]")).find((x) => x.getBoundingClientRect().width > 0);
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const vh = window.innerHeight;
    const phone = window.innerWidth < 768;
    const start = vh * 0.92;
    const dist = Math.min(r.height, vh) * (phone ? 0.5 : 0.72);
    const p = Math.max(0, Math.min(1, (start - r.top) / dist));
    if (Math.abs(p - s.p) > 0.0005) {
      s.p = p;
      el.style.setProperty("--p", p.toFixed(4));
    }
  }, []);

  useLayoutEffect(() => {
    st.current.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    measure();
  }, [measure]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const s = st.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      s.reduce = mq.matches;
      measure();
    };
    mq.addEventListener("change", sync);
    const hv = window.matchMedia("(hover: none)");
    const syncTouch = () => setTouch(hv.matches);
    syncTouch();
    hv.addEventListener("change", syncTouch);
    const onScroll = () => {
      if (s.sraf || !s.live) return;
      s.sraf = requestAnimationFrame(() => {
        s.sraf = 0;
        measure();
      });
    };
    const io = new IntersectionObserver(
      ([e]) => {
        s.live = e.isIntersecting;
        el.toggleAttribute("data-live", e.isIntersecting);
        if (e.isIntersecting) measure();
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const t = window.setInterval(() => {
      if (!s.live || s.reduce || document.hidden) return;
      if (performance.now() - s.interactAt < 4000) return;
      fire(Math.floor(Math.random() * CHIPS.length));
    }, IDLE_MS);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", sync);
      hv.removeEventListener("change", syncTouch);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearInterval(t);
      cancelAnimationFrame(s.raf);
      cancelAnimationFrame(s.sraf);
    };
  }, [fire, measure]);

  /** Lean toward the cursor, throttled to one rAF. */
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const s = st.current;
    s.px = e.clientX;
    if (s.raf || s.reduce) return;
    s.raf = requestAnimationFrame(() => {
      s.raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--lx", Math.max(-1, Math.min(1, ((s.px - r.left) / r.width - 0.5) * 2)).toFixed(3));
    });
  };
  const onLeave = () => wrap.current?.style.setProperty("--lx", "0");

  const line =
    hover === null
      ? touch
        ? "Tap a tool to see what it sends up."
        : "Point at a tool to see what it sends up."
      : `${CHIPS[hover].label}: ${CHIPS[hover].does}`;

  return (
    <div ref={wrap} className="tr" onPointerMove={onMove} onPointerLeave={onLeave}>
      <style>{CSS}</style>
      <Tree g={WIDE} onFire={choose} />
      <Tree g={TALL} onFire={choose} />
      <p className="tr-line" aria-live="polite">
        {line}
      </p>
    </div>
  );
}

const CSS = `
.tr { position: relative; --p: 1; --lx: 0; }
.tr-svg { display: block; width: 100%; height: auto; overflow: visible; }
.tr-svg-wide { display: none; }
.tr-svg-tall { max-width: 460px; margin: 0 auto; }
@media (min-width: 1024px) { .tr-svg-wide { display: block; } .tr-svg-tall { display: none; } }
.tr-svg text { font-family: var(--font-sans, inherit); }

/* growth: each element maps the shared --p into its own window [--a, --b] */
.tr-x, .tr-y, .tr-pop, .tr-draw, .tr-fade { --k: clamp(0, calc((var(--p) - var(--a)) / (var(--b) - var(--a))), 1); }
.tr-x { transform: scaleX(var(--k)); }
.tr-y { transform: scaleY(var(--k)); transform-box: view-box; }
.tr-pop { transform: scale(var(--k)); }
.tr-draw { stroke-dasharray: 1 1; stroke-dashoffset: calc(1 - var(--k)); }
.tr-fade { opacity: var(--k); }

.tr-k { font-family: var(--font-mono) !important; font-size: 11px; letter-spacing: 0.16em; fill: #8FB0FF; }
.tr-horizon { stroke: rgba(143,176,255,0.16); stroke-width: 1; }
.tr-root { fill: none; stroke: rgba(110,145,230,0.42); stroke-width: 2; stroke-linecap: round; }
.tr-root-soft { fill: none; stroke: rgba(46,80,170,0.22); stroke-width: 7; stroke-linecap: round; }
.tr-rootlet { fill: none; stroke: rgba(110,145,230,0.7); stroke-linecap: round; }
.tr-back { opacity: 0.34; }
.tr-pulse { fill: none; stroke: #E4ECFF; stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 16 200; stroke-dashoffset: 16; opacity: 0; filter: drop-shadow(0 0 4px #8FB0FF); }
.tr-pulse-sap { stroke-width: 4; stroke-dasharray: 28 200; stroke-dashoffset: 28; stroke: #F4F7FF; filter: drop-shadow(0 0 6px #BFD2FF); }
.tr-petal { stroke: rgba(190,210,255,0.28); stroke-width: 0.8; }

.tr-card { fill: rgba(8,14,32,0.94); stroke: rgba(143,176,255,0.4); stroke-width: 1; }
.tr-card-k { font-family: var(--font-mono) !important; font-size: 10.5px; letter-spacing: 0.16em; fill: #8FB0FF; }
.tr-row { fill: #E6ECFA; }
.tr-led { fill: rgba(143,176,255,0.55); }
.tr-led-hot { fill: #F2C46D; }
.tr-pill { fill: rgba(255,255,255,0.05); stroke: rgba(255,255,255,0.14); stroke-width: 1; }
.tr-pill-hot { fill: rgba(242,196,109,0.14); stroke: rgba(242,196,109,0.55); }
.tr-pill-t { font-family: var(--font-mono) !important; font-size: 10.5px; fill: #C9D2E6; }
.tr-pill-t-hot { fill: #F7D899; }

.tr-node { cursor: pointer; outline: none; }
.tr-node-b { fill: #0E1730; stroke: rgba(143,176,255,0.28); stroke-width: 1; transition: stroke .25s ease, fill .25s ease; }
.tr-node-glow { fill: #4D7CFF; opacity: 0; filter: blur(6px); }
.tr-node-t { fill: #DCE3F2; font-weight: 500; }
.tr-node:hover .tr-node-b, .tr-node:focus-visible .tr-node-b { stroke: #BFD2FF; fill: #13214A; }
.tr-node:focus-visible .tr-node-b { stroke-width: 2; }

.tr-line { margin: 14px auto 0; max-width: 40rem; min-height: 1.5em; text-align: center; font-size: 1rem; line-height: 1.5; color: var(--color-ink); }

@media (prefers-reduced-motion: no-preference) {
  .tr-lean { transform-box: view-box; transform: rotate(calc(var(--lx) * 1.2deg)); transition: transform .8s cubic-bezier(.2,.8,.2,1); }
  .tr[data-live] .tr-sway { animation: tr-sway 6s ease-in-out infinite alternate; }
}
@media (prefers-reduced-motion: reduce) {
  .tr { --p: 1 !important; }
}
@keyframes tr-sway { from { transform: rotate(-0.9deg); } to { transform: rotate(0.9deg); } }
`;
