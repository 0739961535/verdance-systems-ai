/**
 * Bud: one line-drawn flower glyph in five stages, from a closed bud (stage 0)
 * to a full bloom (stage 4). Used by the growing stem on /how-it-works.
 *
 * Two layers: a soft fill that fades in, and a 1.5px outline that draws on
 * (stroke-dashoffset, pathLength 1). The motion itself lives in the parent's
 * CSS (.bud-line / .bud-fill), keyed off the shared reveal attributes, so a
 * Bud with no motion CSS around it simply renders finished.
 */

export type BudStage = 0 | 1 | 2 | 3 | 4;

/** One petal, base at the origin, pointing up, 22 units long. */
const PETAL = "M0 0 C 7 -5, 7 -16, 0 -22 C -7 -16, -7 -5, 0 0 Z";
/** A sepal: a small open leaf curve at the base of a bud. */
const SEPAL = "M0 0 C 4 -2, 8 -6, 9 -12";

const SPREAD: Record<BudStage, number[]> = {
  0: [0],
  1: [-13, 13],
  2: [-26, 0, 26],
  3: [-46, -23, 0, 23, 46],
  4: [0, 72, 144, 216, 288],
};

/** Ten short ticks in a ring (not used on the site now: the build has no fixed day count). */
const TICKS = Array.from({ length: 10 }, (_, i) => (i * 36 - 90) * (Math.PI / 180));

export function Bud({
  stage,
  size = 56,
  className = "",
  gold = false,
  days = false,
}: {
  stage: BudStage;
  size?: number;
  className?: string;
  gold?: boolean;
  /** Draw the ring of ten day ticks around the bud. */
  days?: boolean;
}) {
  const bloom = stage === 4;
  const angles = SPREAD[stage];
  // Buds stand on their base; the bloom is centred.
  const k = days ? 0.7 : 1;
  const sc = (bloom ? 1.12 : 1.3) * k;
  const base = bloom
    ? `scale(${sc})`
    : `translate(0 ${17 * k}) scale(${stage === 0 ? `${1.0 * k} ${sc}` : sc})`;
  // Keep the outline at 1.5px on screen: undo the group scale, and let the
  // parent set --u (56 / rendered size) when it draws the glyph larger.
  const sw = (s: number) => ({ strokeWidth: `calc(${(1.5 / s).toFixed(3)}px * var(--u, 1))` });
  const stroke = gold ? "#F2C46D" : "#8FB0FF";
  return (
    <svg viewBox="-28 -28 56 56" width={size} height={size} aria-hidden className={`bud ${className}`} focusable="false">
      {days ? (
        <g className="bud-days" stroke="#8FB0FF" strokeLinecap="round" style={sw(1)}>
          {TICKS.map((a, i) => (
            <line
              key={i}
              x1={(Math.cos(a) * 23.5).toFixed(2)}
              y1={(Math.sin(a) * 23.5).toFixed(2)}
              x2={(Math.cos(a) * 27).toFixed(2)}
              y2={(Math.sin(a) * 27).toFixed(2)}
              style={{ ["--t" as string]: `${0.3 + i * 0.05}s` }}
            />
          ))}
        </g>
      ) : null}
      <g transform={base}>
        <g className="bud-fill">
          {angles.map((a) => (
            <path key={`f${a}`} d={PETAL} transform={`rotate(${a})`} fill={bloom ? "rgba(77,124,255,0.34)" : "rgba(77,124,255,0.2)"} />
          ))}
        </g>
        <g className="bud-line" fill="none" stroke={stroke} strokeLinejoin="round" strokeLinecap="round" style={sw(sc)}>
          {!bloom ? (
            <>
              <path d={SEPAL} pathLength={1} />
              <path d={SEPAL} pathLength={1} transform="scale(-1 1)" />
            </>
          ) : null}
          {angles.map((a) => (
            <path key={`l${a}`} d={PETAL} transform={`rotate(${a})`} pathLength={1} />
          ))}
        </g>
        {bloom ? <circle r={3.4} className="bud-fill" fill="#F2F5FC" /> : null}
      </g>
    </svg>
  );
}
