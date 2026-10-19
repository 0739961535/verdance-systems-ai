import { Accent } from "./Accent";
import { CLOUDS, STAGES, STAR_LAYERS, starSrc } from "./flightData";
import { FlightController } from "./FlightController";
import { BoosterPlume, BOOSTER_VIEWBOX, rocketSet, UpperPlume, UPPER_VIEWBOX } from "../../rocket/RocketArt";

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

const ORBIT_TAGS = ["Answering", "Following up", "Admin done"];


/**
 * A responsive picture whose sources are only attached when the flight's
 * loader runs (first scroll), so it never competes with the first paint.
 * AVIF first, WebP fallback; fixed width/height so nothing shifts.
 */
function LazyPicture({ avif, webp, fallback, sizes, width, height, className, mobile }: {
  avif: string; webp: string; fallback: string; sizes: string; width: number; height: number; className?: string;
  mobile?: { avif: string; webp: string; sizes: string };
}) {
  return (
    <picture className={className}>
      {mobile && <source type="image/avif" media="(max-width: 767px)" data-srcset={mobile.avif} sizes={mobile.sizes} />}
      {mobile && <source type="image/webp" media="(max-width: 767px)" data-srcset={mobile.webp} sizes={mobile.sizes} />}
      <source type="image/avif" data-srcset={avif} sizes={sizes} />
      { }
      <img data-srcset={webp} data-src={fallback} sizes={sizes} alt="" width={width} height={height} decoding="async" draggable={false} />
    </picture>
  );
}

const ROCKET_SIZES = "(min-width: 1024px) 160px, 120px";
const planetSet = (name: string, ws: number[], ext: string) => ws.map((w) => `/flight/${name}-${w}.${ext} ${w}w`).join(", ");

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
          {/* the real Earth from orbit (NASA, ISS, public domain): rises into
              view after the break-through. docs/image-credits.md */}
          <div className="fl-planet">
            <LazyPicture
              className="fl-planet-pic"
              avif={planetSet("planet", [1280, 1920, 3840], "avif")}
              webp={planetSet("planet", [1280, 1920, 3840], "webp")}
              fallback="/flight/planet-1920.webp"
              sizes="100vw"
              width={3840}
              height={1600}
              mobile={{ avif: planetSet("planet-m", [828, 1080], "avif"), webp: planetSet("planet-m", [828, 1080], "webp"), sizes: "100vw" }}
            />
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
                <LazyPicture className="fl-hull" avif={rocketSet("upper", "avif")} webp={rocketSet("upper", "webp")} fallback="/rocket/upper-360.webp" sizes={ROCKET_SIZES} width={80} height={169} />
              </div>
              <div className="fl-booster">
                <svg className="fl-plume" viewBox={BOOSTER_VIEWBOX} width="100%" height="100%" fill="none" overflow="visible">
                  <BoosterPlume id="fl" flameClass="fl-bflame" flickerClass="fl-flicker" outerClass="fl-flicker-b" />
                </svg>
                <LazyPicture className="fl-hull" avif={rocketSet("booster", "avif")} webp={rocketSet("booster", "webp")} fallback="/rocket/booster-360.webp" sizes={ROCKET_SIZES} width={80} height={179} />
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
