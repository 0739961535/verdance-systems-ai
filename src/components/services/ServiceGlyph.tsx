/**
 * The petal glyph family: one small line-drawn bloom per service, used as
 * the hero mark on each service page and beside each service in the
 * /services tabs. Same stroke, same size, same blue, so the twelve read as
 * one family. One petal is filled: the part of the business that service
 * looks after. Decorative (aria-hidden). Server component; the hero mark
 * draws in once with CSS (stroke-dashoffset), static under reduced motion.
 */

/** A petal pointing up from the centre, starting r0 out. */
export function petalPath(L: number, W: number, r0 = 0) {
  const a = r0;
  const b = r0 + L * 0.28;
  const c = r0 + L * 0.82;
  const t = r0 + L;
  const h = W / 2;
  return `M0 ${-a} C ${h} ${-b} ${h} ${-c} 0 ${-t} C ${-h} ${-c} ${-h} ${-b} 0 ${-a} Z`;
}

type Spec = { n: number; L: number; W: number; alt?: number; core: "dot" | "ring" | "double"; rot?: number };

const GLYPHS: Record<string, Spec> = {
  "lead-generation": { n: 3, L: 34, W: 26, core: "dot", rot: 0 },
  "conversation-ai": { n: 5, L: 34, W: 22, core: "dot" },
  "voice-ai": { n: 6, L: 34, W: 14, core: "ring" },
  "crm-pipeline": { n: 8, L: 32, W: 12, core: "double" },
  "booking-calendar": { n: 4, L: 34, W: 24, core: "dot", rot: 45 },
  "follow-up-nurture": { n: 5, L: 34, W: 14, core: "ring", rot: 36 },
  "payments-invoicing": { n: 4, L: 34, W: 14, core: "ring" },
  "reputation-reviews": { n: 5, L: 36, W: 18, alt: 0.62, core: "dot" },
  "websites-build": { n: 6, L: 32, W: 22, core: "double" },
  "marketing-social": { n: 7, L: 34, W: 13, core: "dot" },
  "custom-builds": { n: 6, L: 36, W: 16, alt: 0.6, core: "ring", rot: 30 },
  "analytics-compliance": { n: 8, L: 36, W: 12, alt: 0.55, core: "dot" },
};

const CSS = `
.sg { display: block; overflow: visible; }
.sg path, .sg circle { fill: none; stroke: #8FB0FF; stroke-width: 2.4; stroke-linejoin: round; }
.sg .sg-on { fill: rgba(77, 124, 255, 0.38); stroke: #BFD3FF; }
.sg .sg-core { fill: #4D7CFF; stroke: none; }
.sg[data-draw] path, .sg[data-draw] circle:not(.sg-core) { stroke-dasharray: 1; stroke-dashoffset: 1; animation: sg-draw 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--i, 0) * 0.06s + 0.15s); }
.sg[data-draw] .sg-on { fill-opacity: 0; animation: sg-draw 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards, sg-fill 0.6s ease 0.7s forwards; }
@keyframes sg-draw { to { stroke-dashoffset: 0; } }
@keyframes sg-fill { to { fill-opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .sg[data-draw] path, .sg[data-draw] circle:not(.sg-core) { animation: none; stroke-dashoffset: 0; }
  .sg[data-draw] .sg-on { animation: none; fill-opacity: 1; }
}
`;

export function ServiceGlyphStyle() {
  return <style>{CSS}</style>;
}

export function ServiceGlyph({ slug, size = 72, draw = false, className = "" }: { slug: string; size?: number; draw?: boolean; className?: string }) {
  const g = GLYPHS[slug] ?? GLYPHS["conversation-ai"];
  const step = 360 / g.n;
  return (
    <svg
      aria-hidden
      className={`sg ${className}`}
      data-draw={draw ? "" : undefined}
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
    >
      {Array.from({ length: g.n }, (_, i) => {
        const L = g.alt && i % 2 === 1 ? g.L * g.alt : g.L;
        return (
          <path
            key={i}
            pathLength={1}
            className={i === 0 ? "sg-on" : undefined}
            style={{ ["--i" as string]: i }}
            transform={`rotate(${(g.rot ?? 0) + i * step})`}
            d={petalPath(L, g.W, 7)}
          />
        );
      })}
      {g.core !== "dot" ? <circle pathLength={1} r={g.core === "double" ? 5.5 : 4.5} /> : null}
      <circle className="sg-core" r={g.core === "double" ? 2.4 : 3} />
    </svg>
  );
}
