import { BOOK_BASE } from "@/data/booking";
import { Accent } from "./Accent";
import { FilmController } from "./FilmController";
import film from "./film-manifest.json";
import { STAGES } from "./flightData";

/**
 * The flight as a film (Oct 2026, rocket v6): a real rocket launch, rendered
 * as video and scrubbed by scroll like an Apple product page.
 * docs: growth-lab/ROCKET_NEXT_LEVEL_COUNCIL.md
 *
 * A tall section with a sticky, full-screen stage (the pin, in CSS, so it
 * works before any script and never shifts layout). FilmController draws the
 * frame for the scroll position onto a canvas: frames come from
 * public/flight/film (npm run flight:frames -- <shotsDir>), phones get their
 * own 9:16 set. The first frame is a plain <img> under the canvas, so the
 * section is never blank before the canvas is ready.
 *
 * Reduced motion and no-JS: an orbit still behind the three steps as a list.
 * Rollback: FLIGHT_FILM=0 brings back the illustrated FlightStory.
 */

const BOOK_CALL_URL = `${BOOK_BASE}/book/audit`;
const src = (name: string, ext: string) => `/flight/film/${name}.${ext}?v=${film.v}`;

/**
 * A responsive still. The poster (frame 1) loads eagerly at low priority so
 * the start of the flight is never blank, and stays under the canvas until
 * the first frame is drawn; the reduced-motion still is lazy.
 */
function Still({ name, className, focusX, poster }: { name: "poster" | "still"; className: string; focusX: number; poster?: boolean }) {
  return (
    <picture className={className}>
      <source type="image/avif" media="(max-width: 767px)" srcSet={src(`${name}-m`, "avif")} />
      <source type="image/webp" media="(max-width: 767px)" srcSet={src(`${name}-m`, "webp")} />
      <source type="image/avif" srcSet={src(`${name}-d`, "avif")} />
      <img
        src={src(`${name}-d`, "webp")}
        alt=""
        width={film.desktop.width}
        height={film.desktop.height}
        loading={poster ? "eager" : "lazy"}
        fetchPriority={poster ? "low" : undefined}
        decoding="async"
        draggable={false}
        style={{ ["--fx" as string]: `${focusX * 100}%` }}
      />
    </picture>
  );
}

export function FilmStory() {
  return (
    <section className="fl flm" aria-labelledby="flight-title" data-stage="0" style={{ ["--flm-sky" as string]: film.posterSky }}>
      <FilmController />
      <div className="fl-stage">
        <div className="flm-scene" aria-hidden>
          <div className="flm-cam">
            <Still name="poster" className="flm-poster" focusX={film.desktop.focusX} poster />
            <canvas className="flm-canvas" />
          </div>
          <Still name="still" className="flm-still" focusX={film.desktop.focusX} />
          {/* ground to space: the light-mode wash over the pad (see FilmController) */}
          <div className="flm-veil" />
          <div className="flm-top" />
        </div>
        {/* light scrim for dark ink (light mode, on the ground), and the exit feather */}
        <div className="flm-lscrim" aria-hidden />
        <div className="flm-bot" aria-hidden />

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
                {i === STAGES.length - 1 && (
                  <a href={BOOK_CALL_URL} className="btn btn-accent flm-cta min-h-[52px] justify-center px-7 text-[1.02rem]">
                    Book a call
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
