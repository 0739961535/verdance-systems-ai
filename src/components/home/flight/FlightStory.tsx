import { CLOUDS, STAR_LAYERS, starSrc } from "./flightData";
import { FlightController } from "./FlightController";
import { BoosterPlume, BOOSTER_VIEWBOX, ROCKET_SRC, UpperPlume, UPPER_VIEWBOX } from "../../rocket/RocketArt";

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
          {STAR_LAYERS.map((_, i) => (
            <div key={i} className="fl-stars" data-layer={i}>
              {/* static file, loaded as the section nears (see FlightController) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-src={starSrc(i)} alt="" width={400} height={900} decoding="async" draggable={false} />
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
            <span key={i} className={c.front ? "fl-cloud fl-cloud-near" : "fl-cloud"} style={{ left: c.x, width: c.w }} />
          ))}
          {/* the edge of the sky the rocket breaks through, and its ripple */}
          <div className="fl-veil" />
          <span className="fl-ripple" />

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
              <div className="fl-upper">
                <span className="fl-collar" />
                <span className="fl-collar" />
                <span className="fl-trail" />
                <span className="fl-flash" />
                <span className="fl-shock" />
                <span className="fl-shock" />
                <svg className="fl-plume" viewBox={UPPER_VIEWBOX} width="100%" height="100%" fill="none" overflow="visible">
                  <UpperPlume id="fl" flameClass="fl-uflame" flickerClass="fl-flicker" machClass="fl-umach" />
                </svg>
                {/* static hull as a cached file, kept out of the HTML (see RocketArt.tsx);
                    src is set by FlightController as the section nears */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="fl-hull" data-src={ROCKET_SRC.upper} alt="" width={80} height={142} decoding="async" draggable={false} />
              </div>
              <div className="fl-booster">
                <svg className="fl-plume" viewBox={BOOSTER_VIEWBOX} width="100%" height="100%" fill="none" overflow="visible">
                  <BoosterPlume id="fl" flameClass="fl-bflame" flickerClass="fl-flicker" outerClass="fl-flicker-b" />
                </svg>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="fl-hull" data-src={ROCKET_SRC.booster} alt="" width={80} height={168} decoding="async" draggable={false} />
              </div>
            </div>
          </div>

          {/* the burst's shockwave, and light passing over the whole scene */}
          <span className="fl-blast" />
          <div className="fl-wash" />

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
