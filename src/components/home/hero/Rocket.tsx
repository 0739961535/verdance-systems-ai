/**
 * The hero's "we ship it" moment: a small line-drawn rocket that lifts off
 * once on load, leaving a soft trail, then holds still. It nudges up again
 * while the main button is hovered (CSS :has, see .hero-launch in globals).
 *
 * Server-rendered SVG and CSS only: no JavaScript, no layout shift (fixed
 * box), never the LCP element. Reduced motion: drawn in its final place.
 */
export function Rocket() {
  return (
    <div className="rk" aria-hidden>
      <span className="rk-trail" />
      <span className="rk-puff rk-puff-1" />
      <span className="rk-puff rk-puff-2" />
      <span className="rk-puff rk-puff-3" />
      <span className="rk-ship">
        <svg viewBox="0 0 64 100" width="100%" height="100%" fill="none">
          <defs>
            <linearGradient id="rk-flame" x1="32" y1="72" x2="32" y2="98" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="var(--accent-bright)" />
              <stop offset="1" stopColor="var(--accent-bright)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rk-body" x1="20" y1="6" x2="44" y2="66" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="var(--bg-2)" />
              <stop offset="1" stopColor="var(--bg)" />
            </linearGradient>
          </defs>
          <path className="rk-flame" d="M26.5 72 Q32 100 37.5 72 Z" fill="url(#rk-flame)" />
          <path d="M21 47 L11 61 L11.5 71 L22.5 64 Z" fill="var(--accent)" fillOpacity="0.14" stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M43 47 L53 61 L52.5 71 L41.5 64 Z" fill="var(--accent)" fillOpacity="0.14" stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M32 5 C42.5 15 46 31 44 50 L42 66 H22 L20 50 C18 31 21.5 15 32 5 Z" fill="url(#rk-body)" stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M26.5 66 H37.5 L36 72 H28 Z" fill="var(--ink)" />
          <circle cx="32" cy="31" r="5.5" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.6" />
          <path d="M32 59 V66" stroke="var(--ink)" strokeWidth="1.2" strokeOpacity="0.35" />
        </svg>
      </span>
    </div>
  );
}
