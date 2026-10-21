/**
 * EarthStrip: "Where we are" on /about as the Earth's limb at night, with
 * South Africa and the UK lit and one line joining them. Drawn in SVG, the
 * labels are HTML so they stay at least 13px on a phone. This is the page's
 * one Earth moment.
 *
 * Motion: the link line draws (stroke-dashoffset) and the two lit places
 * fade up (opacity), once on view, via the shared reveal attributes.
 * Static under reduced motion and without JS.
 */

const W = 600;
const H = 220;
const R = 760;
const CX = 300;
const TOP = 132;
const CY = TOP + R;
const yAt = (x: number) => CY - Math.sqrt(R * R - (x - CX) * (x - CX));
const ARC = `M 0 ${yAt(0).toFixed(1)} A ${R} ${R} 0 0 1 ${W} ${yAt(W).toFixed(1)}`;

const UK = { x: 196, y: yAt(196) + 22 };
const SA = { x: 412, y: yAt(412) + 30 };
const LINK = `M ${UK.x} ${UK.y.toFixed(1)} Q ${(UK.x + SA.x) / 2} ${TOP - 70} ${SA.x} ${SA.y.toFixed(1)}`;

/** Faint city lights scattered along the night side (decorative, fixed). */
const LIGHTS: [number, number, number][] = [
  [40, 24, 1], [72, 34, 0.8], [118, 20, 1.1], [150, 44, 0.8], [178, 30, 1], [232, 40, 0.9], [262, 26, 1.1],
  [300, 48, 0.8], [338, 22, 1], [366, 40, 0.9], [452, 26, 1], [486, 44, 0.8], [520, 24, 1.1], [560, 36, 0.9],
  [96, 58, 0.7], [210, 64, 0.7], [330, 70, 0.7], [440, 62, 0.7], [540, 60, 0.7],
];

const CSS = `
.es { position: relative; border-radius: 18px; overflow: hidden; background: #060B1A; aspect-ratio: ${W} / ${H}; min-height: 168px; }
.es svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.es-tag { position: absolute; display: grid; gap: 1px; font-size: 0.8125rem; line-height: 1.25; color: #F2F5FC; white-space: nowrap; }
.es-tag small { font-size: 0.8125rem; color: #9AA3B5; }
.es-tag.is-uk { left: 6%; top: 10%; }
.es-tag.is-sa { right: 6%; top: 10%; text-align: right; }
@media (prefers-reduced-motion: no-preference) {
  .es-link { stroke-dasharray: 1 1; stroke-dashoffset: 0; transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s; }
  .es-lit, .es-tag { transition: opacity 0.6s ease-out 0.5s; }
  .es[data-armed]:not([data-revealed]) .es-link { stroke-dashoffset: 1; }
  .es[data-armed]:not([data-revealed]) .es-lit,
  .es[data-armed]:not([data-revealed]) .es-tag { opacity: 0; }
}
`;

function Lit({ x, y }: { x: number; y: number }) {
  return (
    <g className="es-lit">
      <circle cx={x} cy={y} r="26" fill="url(#es-glow)" />
      <circle cx={x} cy={y} r="3.2" fill="#FFE3B0" />
      <circle cx={x - 7} cy={y + 4} r="1.4" fill="#FFD58A" />
      <circle cx={x + 6} cy={y + 6} r="1.2" fill="#FFD58A" />
      <circle cx={x + 2} cy={y - 6} r="1.1" fill="#FFD58A" />
    </g>
  );
}

export function EarthStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`es ${className}`} data-reveal="" role="img" aria-label="South Africa and the UK, lit on the night side of the Earth and joined by one line: we work remotely across both.">
      <style>{CSS}</style>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
        <defs>
          <linearGradient id="es-planet" x1="0" x2="0" y1={TOP} y2={H} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#13203F" />
            <stop offset="1" stopColor="#060B1A" />
          </linearGradient>
          <radialGradient id="es-glow">
            <stop offset="0" stopColor="#FFD58A" stopOpacity="0.55" />
            <stop offset="1" stopColor="#FFD58A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="es-air" x1="0" x2={W} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2554D4" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#8FB0FF" />
            <stop offset="1" stopColor="#2554D4" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <circle cx={CX} cy={CY} r={R} fill="url(#es-planet)" />
        <path d={ARC} fill="none" stroke="#4D7CFF" strokeOpacity="0.22" strokeWidth="8" />
        <path d={ARC} fill="none" stroke="url(#es-air)" strokeWidth="1.5" />
        {LIGHTS.map(([x, dy, r]) => (
          <circle key={`${x}-${dy}`} cx={x} cy={yAt(x) + dy} r={r} fill="#FFD58A" fillOpacity="0.45" />
        ))}
        <path className="es-link" d={LINK} fill="none" stroke="#8FB0FF" strokeWidth="1.5" strokeLinecap="round" pathLength={1} />
        <Lit x={UK.x} y={UK.y} />
        <Lit x={SA.x} y={SA.y} />
      </svg>
      <span className="es-tag is-uk" aria-hidden>
        United Kingdom
        <small>Remote</small>
      </span>
      <span className="es-tag is-sa" aria-hidden>
        South Africa
        <small>Home base</small>
      </span>
    </div>
  );
}
