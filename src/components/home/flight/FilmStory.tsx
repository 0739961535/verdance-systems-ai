import { ArrowUpRight } from "lucide-react";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY, SITE } from "@/data/site";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { FilmController } from "./FilmController";
import film from "./film-manifest.json";
import { DAY_BEATS } from "./dayBeats";

/**
 * The home page opens on the film (rocket v7, design review Oct 2026):
 * the launch pad at night, full screen, with the tagline and one button.
 * The first scroll lifts off and the flight tells how we work in three
 * steps: launch, ascent, orbit. Always dark, whatever the site theme.
 *
 * A tall section with a sticky, full-screen stage (the pin, in CSS, so it
 * works before any script and never shifts layout). FilmController draws the
 * frame for the scroll position onto a canvas: frames come from
 * public/flight/film (npm run flight:frames -- dark), phones get their own
 * tall portrait set. The first frame is a plain <img> under the canvas, so
 * the opening is never blank before the canvas is ready.
 *
 * Reduced motion and no-JS: the opening over the first still, then the
 * day's beats over the day and night stills, as a plain list.
 * Rollback: FLIGHT_FILM=0 brings back the old hero and illustrated flight.
 */

const BOOK_CALL_URL = GENERIC_BOOK_URL;
const src = (name: string, ext: string) => `/flight/film/${name}.${ext}?v=${film.v}`;
/** CSS backgrounds for the reduced-motion stills (phone and desktop crops). */
const stillVars = (name: string) => ({
  [`--${name}-m` as string]: `image-set(url("${src(`${name}-m`, "avif")}") type("image/avif"), url("${src(`${name}-m`, "webp")}") type("image/webp"))`,
  [`--${name}-d` as string]: `image-set(url("${src(`${name}-d`, "avif")}") type("image/avif"), url("${src(`${name}-d`, "webp")}") type("image/webp"))`,
});

function Actions({ where }: { where: "hero" | "orbit" }) {
  return (
    <div className="flm-actions" data-cta-location={where === "hero" ? "hero" : "flight_orbit"}>
      <a href={BOOK_CALL_URL} className="btn btn-accent min-h-[52px] justify-center px-7 text-[1.02rem]">
        {CTA_PRIMARY}
        <ArrowUpRight size={17} aria-hidden />
      </a>
      <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flm-wa">
        <WhatsAppIcon className="h-4 w-4" />
        WhatsApp us
      </a>
    </div>
  );
}

export function FilmStory() {
  return (
    <section
      className="fl flm"
      aria-labelledby="hero-title"
      data-stage="-1"
      style={{ ["--flm-sky" as string]: film.posterSky, ...stillVars("poster"), ...stillVars("mid"), ...stillVars("still") }}
    >
      {/* open at the top, never mid-flight (see FilmController) */}
      <script
        dangerouslySetInnerHTML={{
          __html: "if(!location.hash&&'scrollRestoration'in history)history.scrollRestoration='manual'",
        }}
      />
      <FilmController />
      <div className="fl-stage">
        <div className="flm-scene" aria-hidden>
          <div className="flm-cam">
            {/* frame 1: the largest paint, so it loads first */}
            <picture className="flm-poster">
              <source type="image/avif" media="(max-width: 767px)" srcSet={src("poster-m", "avif")} />
              <source type="image/webp" media="(max-width: 767px)" srcSet={src("poster-m", "webp")} />
              <source type="image/avif" srcSet={src("poster-d", "avif")} />
              <img
                src={src("poster-d", "webp")}
                alt=""
                width={film.desktop.width}
                height={film.desktop.height}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                draggable={false}
                style={{ ["--fx" as string]: `${film.desktop.focusX * 100}%` }}
              />
            </picture>
            <canvas className="flm-canvas" />
            <canvas className="flm-canvas flm-canvas-b" />
            {/* ignition: pad lights come on left to right, the engines glow */}
          </div>
        </div>
        <div className="flm-bot" aria-hidden />
        {/* cinematic letterbox: in as the rocket lifts off, out at orbit */}
        <span className="flm-bar flm-bar-top" aria-hidden />
        <span className="flm-bar flm-bar-bottom" aria-hidden />

        {/* ---------- the opening ---------- */}
        <div className="flm-hero">
          <h1 id="hero-title" className="flm-h1">
            We don&apos;t talk about AI. <span className="italic-accent">We ship it.</span>
          </h1>
          <p className="flm-sub">Find out what AI can really do for your business.</p>
          <Actions where="hero" />
          <p className="flm-cue" aria-hidden>
            <span className="flm-cue-tick" />
            Scroll through a day
          </p>
        </div>

        {/* ---------- progress through the day ---------- */}
        <div className="fl-hud" aria-hidden>
          {DAY_BEATS.filter((b) => !b.end).map((b) => (
            <span key={b.time} className="fl-seg">
              <span className="fl-seg-track">
                <span className="fl-seg-fill" />
              </span>
              <span className="fl-seg-label">
                <span className="fl-seg-n">{b.time}</span>
              </span>
            </span>
          ))}
        </div>

        {/* ---------- the words ---------- */}
        <div className="fl-copy">
          <h2 className="sr-only">A day in your business, with Verdance</h2>
          <ol className="fl-steps">
            {DAY_BEATS.map((b, i) => (
              <li key={b.title} className="fl-step" data-still={i === 2 ? "mid" : i === 4 ? "still" : undefined}>
                {b.time ? (
                  <p className="fl-eyebrow">
                    <span>
                      <span className="chap-n">{b.time}</span>
                    </span>
                  </p>
                ) : null}
                <h3 className="fl-title" aria-label={b.time ? `${b.time}. ${b.title}` : b.title}>
                  {b.title.split(" ").map((w, k, all) => (
                    <span key={k} aria-hidden>
                      <span className="fw">
                        <span className="fw-i">{w}</span>
                      </span>
                      {k < all.length - 1 ? " " : null}
                    </span>
                  ))}
                </h3>
                <p className="fl-body">{b.body}</p>
                {b.end && <Actions where="orbit" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
