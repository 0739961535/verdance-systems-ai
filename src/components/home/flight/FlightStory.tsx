import { CLOUDS, STAR_SPEEDS } from "./flightData";
import { FlightController } from "./FlightController";

/**
 * The flight: how we work, told as one rocket climb (docs/rocket-scroll-research.md).
 *
 * A tall section with a sticky, full-screen stage. Native scroll drives it
 * (no scroll-jacking): 1 Launch, 2 Ascent, 3 Orbit. The sky goes from dusk
 * to space, three star layers move at their own speeds, clouds rush past,
 * the horizon falls away and curves into the Earth's rim, the first stage
 * drops off and the engine cuts at orbit.
 *
 * Performance: one passive scroll listener, one rAF per scroll frame, and
 * that frame only writes transform and opacity to about 20 elements whose
 * layers were promoted once. Geometry is measured on resize, never inside
 * the frame. Nothing runs while the section is off screen.
 * Reduced motion and no-JS: the CSS shows a still orbit scene behind the
 * three stages stacked as a normal list (see .fl in globals.css).
 */

const STAGES = [
  {
    n: "01",
    name: "Launch",
    title: "We look at how your business runs.",
    accent: "how your business runs.",
    body: "A free 30-minute call. We find where your time goes and where customers slip away.",
  },
  {
    n: "02",
    name: "Ascent",
    title: "AI starts doing the work.",
    accent: "doing the work.",
    body: "It answers customers, follows up and does the admin, on the tools you already use. Live in 10 working days.",
  },
  {
    n: "03",
    name: "Orbit",
    title: "It runs day and night.",
    accent: "day and night.",
    body: "Every message gets a reply in under a minute, even at 2am. You check anything important first.",
  },
];

const ORBIT_TAGS = ["Answering", "Following up", "Admin done"];

/* Deterministic star field (same on server and client, so no hydration diff). */
function stars(seed: number, count: number, maxR: number) {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: count }, () => ({
    x: +(rnd() * 400).toFixed(1),
    y: +(rnd() * 900).toFixed(1),
    r: +(0.35 + rnd() * maxR).toFixed(2),
    o: +(0.35 + rnd() * 0.65).toFixed(2),
  }));
}
const STAR_LAYERS = [stars(7, 70, 0.55), stars(31, 40, 0.85), stars(97, 16, 1.25)].map((s, i) => ({ stars: s, speed: STAR_SPEEDS[i] }));

function Accent({ title, accent }: { title: string; accent: string }) {
  const i = title.indexOf(accent);
  if (i < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, i)}
      <span className="italic-accent">{accent}</span>
    </>
  );
}

export function FlightStory() {

  return (
    <section className="fl" aria-labelledby="flight-title" data-stage="0">
      <FlightController />
      <div className="fl-stage">
        {/* ---------- the scene (decorative) ---------- */}
        <div className="fl-scene" aria-hidden>
          <div className="fl-dusk" />
          {STAR_LAYERS.map((layer, i) => (
            <div key={i} className="fl-stars" data-layer={i}>
              <svg viewBox="0 0 400 900" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
                {layer.stars.map((s, k) => (
                  <circle key={k} cx={s.x} cy={s.y} r={s.r} fill="#E8EEFF" fillOpacity={s.o} />
                ))}
              </svg>
            </div>
          ))}
          <div className="fl-glow" />
          <div className="fl-earth">
            <span className="fl-earth-body" />
          </div>
          <div className="fl-pad">
            <svg viewBox="0 0 120 160" width="100%" height="100%" fill="none">
              <path d="M30 160 V18 M44 160 V18 M30 30 L44 44 M44 30 L30 44 M30 58 L44 72 M44 58 L30 72 M30 86 L44 100 M44 86 L30 100 M30 114 L44 128 M44 114 L30 128 M30 142 L44 156 M44 142 L30 156" stroke="#0B1022" strokeWidth="3" />
              <path d="M44 52 H70 M44 96 H66" stroke="#0B1022" strokeWidth="3" />
              <path d="M24 18 H50" stroke="#0B1022" strokeWidth="4" />
              <circle cx="37" cy="12" r="2.5" fill="#FF6A5A" />
              <path d="M0 158 H120" stroke="#0B1022" strokeWidth="6" />
            </svg>
          </div>
          {CLOUDS.map((c, i) => (
            <span key={i} className="fl-cloud" style={{ left: c.x, width: c.w }} />
          ))}

          <div className="fl-orbit">
            <svg viewBox="0 0 400 140" width="100%" height="100%" fill="none" overflow="visible">
              <ellipse cx="200" cy="70" rx="196" ry="66" stroke="rgba(134,171,255,0.35)" strokeWidth="1" strokeDasharray="2 6" />
            </svg>
            <span className="fl-sat" />
            <span className="fl-sat fl-sat-2" />
            <span className="fl-sat fl-sat-3" />
          </div>

          <div className="fl-ship-wrap">
            <div className="fl-ship">
              <span className="fl-jet" />
              <div className="fl-booster">
                <svg viewBox="0 0 80 90" width="100%" height="100%" fill="none" overflow="visible">
                  <defs>
                    <linearGradient id="fl-b-body" x1="27" y1="0" x2="53" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#FFFFFF" />
                      <stop offset="0.5" stopColor="#E7EBF3" />
                      <stop offset="1" stopColor="#AEB9CE" />
                    </linearGradient>
                    <linearGradient id="fl-b-flame" x1="40" y1="70" x2="40" y2="128" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#FFFFFF" />
                      <stop offset="0.25" stopColor="#B9CEFF" />
                      <stop offset="0.6" stopColor="#5B8FFF" stopOpacity="0.5" />
                      <stop offset="1" stopColor="#5B8FFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g className="fl-bflame">
                    <g className="fl-flicker">
                      <path d="M31 70 C30 90 35.5 110 40 128 C44.5 110 50 90 49 70 Z" fill="url(#fl-b-flame)" />
                      <path d="M35.5 70 C35.5 80 38 89 40 96 C42 89 44.5 80 44.5 70 Z" fill="#FFFFFF" fillOpacity="0.9" />
                    </g>
                  </g>
                  <path d="M27 38 C19 44 15 54 14 70 L27 62 Z" fill="#2554D4" />
                  <path d="M53 38 C61 44 65 54 66 70 L53 62 Z" fill="#173A9E" />
                  <path d="M31 62 H49 L47 71 H33 Z" fill="#1B2233" />
                  <rect x="27" y="2" width="26" height="61" rx="2" fill="url(#fl-b-body)" stroke="#1B2A4F" strokeOpacity="0.25" />
                  <rect x="27" y="2" width="26" height="5" fill="#1B2233" fillOpacity="0.8" />
                  <path d="M30.5 12 V56" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M27 30 H53" stroke="#1B2A4F" strokeOpacity="0.16" />
                </svg>
              </div>
              <div className="fl-upper">
                <svg viewBox="0 0 80 112" width="100%" height="100%" fill="none" overflow="visible">
                  <defs>
                    <linearGradient id="fl-u-body" x1="23" y1="0" x2="57" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#FFFFFF" />
                      <stop offset="0.42" stopColor="#F3F5FA" />
                      <stop offset="0.78" stopColor="#D9DFEA" />
                      <stop offset="1" stopColor="#B9C3D6" />
                    </linearGradient>
                    <linearGradient id="fl-u-accent" x1="0" y1="6" x2="0" y2="110" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#6E9CFF" />
                      <stop offset="1" stopColor="#1F45B8" />
                    </linearGradient>
                    <radialGradient id="fl-u-glass" cx="37" cy="47" r="10" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#9DBBFF" />
                      <stop offset="0.55" stopColor="#2F5FE0" />
                      <stop offset="1" stopColor="#0F1E4D" />
                    </radialGradient>
                  </defs>
                  <g className="fl-uflame">
                    <path d="M34 104 C34 113 37.5 121 40 128 C42.5 121 46 113 46 104 Z" fill="#B9CEFF" fillOpacity="0.85" />
                  </g>
                  <path d="M26.6 70 C17.5 78 12.6 90 12 107 C15.6 102.5 20.6 99.5 27 98.2 Z" fill="#2554D4" />
                  <path d="M53.4 70 C62.5 78 67.4 90 68 107 C64.4 102.5 59.4 99.5 53 98.2 Z" fill="#173A9E" />
                  <path d="M31.5 97 H48.5 L46.5 105 H33.5 Z" fill="#1B2233" />
                  <path
                    d="M40 6 C52.5 18 58.2 38 57.2 62 C56.7 76 55.2 88 53 98.5 H27 C24.8 88 23.3 76 22.8 62 C21.8 38 27.5 18 40 6 Z"
                    fill="url(#fl-u-body)"
                    stroke="#1B2A4F"
                    strokeOpacity="0.28"
                  />
                  <path d="M40 6 C46.6 12.4 50.9 20.4 53.4 29.2 C45.2 26.6 34.8 26.6 26.6 29.2 C29.1 20.4 33.4 12.4 40 6 Z" fill="url(#fl-u-accent)" />
                  <path d="M29.4 34 C27.4 46 27.2 62 28.6 84" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
                  <path d="M24.4 81.5 C34.5 83.6 45.5 83.6 55.6 81.5" stroke="#1B2A4F" strokeOpacity="0.18" strokeWidth="0.9" />
                  <circle cx="40" cy="50" r="9.4" fill="#E6EBF4" stroke="#9AA6BE" strokeWidth="1.2" />
                  <circle cx="40" cy="50" r="6.6" fill="url(#fl-u-glass)" />
                  <ellipse cx="37.6" cy="47.4" rx="2.3" ry="1.5" fill="#FFFFFF" fillOpacity="0.85" transform="rotate(-35 37.6 47.4)" />
                  <rect x="38.6" y="86" width="2.8" height="19" rx="1.4" fill="url(#fl-u-accent)" />
                </svg>
              </div>
            </div>
          </div>

          <ul className="fl-tags">
            {ORBIT_TAGS.map((t) => (
              <li key={t} className="fl-tag">
                <span className="fl-tag-dot" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- mission bar ---------- */}
        <div className="fl-hud" aria-hidden>
          {STAGES.map((s, i) => (
            <span key={s.n} className="fl-seg" data-on={i === 0 ? "" : undefined}>
              <span className="fl-seg-track">
                <span className="fl-seg-fill" />
              </span>
              <span className="fl-seg-label">
                <span className="fl-seg-n">{s.n}</span> {s.name}
              </span>
            </span>
          ))}
        </div>

        {/* ---------- the words ---------- */}
        <div className="fl-copy">
          <h2 id="flight-title" className="sr-only">
            How it works, in three steps
          </h2>
          <ol className="fl-steps">
            {STAGES.map((s, i) => (
              <li key={s.n} className="fl-step">
                <p className="fl-eyebrow">
                  <span className="fl-eyebrow-rule" />
                  <span>Step {i + 1} of 3</span>
                </p>
                <h3 className="fl-title">
                  <Accent title={s.title} accent={s.accent} />
                </h3>
                <p className="fl-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
