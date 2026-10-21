/**
 * NightEarth - the Earth limb at night with the UK and South Africa lit,
 * joined by one thin line. The "always on" moment for /industries.
 * Server component, inline SVG, no JavaScript. The line draws once and the
 * city lights fade in (stroke-dashoffset and opacity only, 0.7s); under
 * reduced motion everything is shown at once.
 */

// Small deterministic random, so the server and client render the same dots.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const CX = 300;
const CY = 820;
const R = 600;
const inside = (x: number, y: number, pad = 6) => Math.hypot(x - CX, y - CY) < R - pad;

function cluster(seed: number, x: number, y: number, spread: number, n: number) {
  const r = rng(seed);
  const pts: { x: number; y: number; o: number; s: number }[] = [];
  for (let i = 0; i < n * 3 && pts.length < n; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.pow(r(), 1.6) * spread;
    const px = x + Math.cos(a) * d * 1.4;
    const py = y + Math.sin(a) * d * 0.8;
    if (!inside(px, py)) continue;
    pts.push({ x: px, y: py, o: 0.45 + r() * 0.55, s: 0.8 + r() * 1.4 });
  }
  return pts;
}

const UK = { x: 214, y: 262 };
const SA = { x: 392, y: 380 };
const UK_DOTS = cluster(7, UK.x, UK.y, 26, 34);
const SA_DOTS = cluster(11, SA.x, SA.y, 30, 30);
const FAINT = (() => {
  const r = rng(23);
  const pts: { x: number; y: number; o: number }[] = [];
  while (pts.length < 70) {
    const x = r() * 600;
    const y = 230 + r() * 210;
    if (inside(x, y, 14)) pts.push({ x, y, o: 0.12 + r() * 0.25 });
  }
  return pts;
})();
const STARS = (() => {
  const r = rng(5);
  const pts: { x: number; y: number; o: number }[] = [];
  while (pts.length < 26) {
    const x = r() * 600;
    const y = r() * 220;
    if (!inside(x, y, -30)) pts.push({ x, y, o: 0.2 + r() * 0.5 });
  }
  return pts;
})();

export function NightEarth({ caption = "Enquiries arrive at all hours. We answer them." }: { caption?: string }) {
  return (
    <figure className="ne">
      <style>{CSS}</style>
      <svg viewBox="0 0 600 440" role="img" aria-label="The Earth at night from space, with the UK and South Africa lit and joined by a line" className="ne-svg">
        <defs>
          <radialGradient id="ne-ground" cx="0.42" cy="0.08" r="0.7">
            <stop offset="0" stopColor="#13203F" />
            <stop offset="0.6" stopColor="#0A1226" />
            <stop offset="1" stopColor="#060B1A" />
          </radialGradient>
          <radialGradient id="ne-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFD58A" stopOpacity="0.55" />
            <stop offset="1" stopColor="#FFD58A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {STARS.map((s, i) => (
          <circle key={`s${i}`} cx={s.x} cy={s.y} r="0.9" fill="#C9D8FF" opacity={s.o} />
        ))}

        {/* atmosphere: two soft rings, then the planet */}
        <circle cx={CX} cy={CY} r={R + 10} fill="none" stroke="#4D7CFF" strokeOpacity="0.08" strokeWidth="18" />
        <circle cx={CX} cy={CY} r={R + 3} fill="none" stroke="#8FB0FF" strokeOpacity="0.22" strokeWidth="5" />
        <circle cx={CX} cy={CY} r={R} fill="url(#ne-ground)" stroke="#4D7CFF" strokeOpacity="0.7" strokeWidth="1.5" />

        <g className="ne-lights">
          {FAINT.map((p, i) => (
            <circle key={`f${i}`} cx={p.x} cy={p.y} r="0.9" fill="#FFE2A8" opacity={p.o} />
          ))}
          <circle cx={UK.x} cy={UK.y} r="34" fill="url(#ne-glow)" />
          <circle cx={SA.x} cy={SA.y} r="38" fill="url(#ne-glow)" />
          {[...UK_DOTS, ...SA_DOTS].map((p, i) => (
            <circle key={`c${i}`} cx={p.x} cy={p.y} r={p.s} fill="#FFE7B8" opacity={p.o} />
          ))}
        </g>

        {/* the line between the two markets */}
        <path
          className="ne-link"
          d={`M${UK.x} ${UK.y} Q ${UK.x + 150} ${UK.y - 40} ${SA.x} ${SA.y}`}
          fill="none"
          stroke="#8FB0FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength={1}
        />
        <circle cx={UK.x} cy={UK.y} r="4" fill="#F2F5FC" />
        <circle cx={SA.x} cy={SA.y} r="4" fill="#F2F5FC" />

        <g className="ne-labels" fontFamily="var(--font-sans), Inter, sans-serif" fontSize="22" fill="#F2F5FC">
          <text x={UK.x - 18} y={UK.y - 22} textAnchor="end">UK</text>
          <text x={SA.x + 22} y={SA.y + 8}>South Africa</text>
        </g>
      </svg>
      <figcaption className="ne-cap">{caption}</figcaption>
    </figure>
  );
}

const CSS = `
.ne { margin: 0; border-radius: 24px; overflow: hidden; background: #060B1A; border: 1px solid rgba(143,176,255,0.16); box-shadow: 0 40px 100px -50px rgba(37,84,212,0.55); }
.ne-svg { display: block; width: 100%; height: auto; aspect-ratio: 600 / 440; }
.ne-cap { padding: 14px 20px 18px; font-size: 0.9375rem; line-height: 1.45; color: #C9D3E6; border-top: 1px solid rgba(143,176,255,0.12); }
.ne-link { stroke-dasharray: 1; stroke-dashoffset: 0; }
@media (prefers-reduced-motion: no-preference) {
  .ne-link { stroke-dashoffset: 1; animation: ne-draw 0.8s 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }
  .ne-lights { opacity: 0; animation: ne-fade 0.7s 0.2s ease-out forwards; }
  .ne-labels { opacity: 0; animation: ne-fade 0.6s 0.9s ease-out forwards; }
}
@keyframes ne-draw { to { stroke-dashoffset: 0; } }
@keyframes ne-fade { to { opacity: 1; } }
`;
