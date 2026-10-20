import film from "../flight/film-manifest.json";
import { StatementFill } from "./StatementFill";
import { ProofRow } from "./ProofRow";

/**
 * 04 Promise: the outcome, once, very big, under the earth from orbit (the
 * film's last scene without the rocket, darker so it is not a second hero).
 * Words fill with ink as the section scrolls into view (StatementFill sets --p).
 */
const v = film.v;
const WORDS = "Every enquiry answered. Every follow-up done. Your team's hours".split(" ");

const CSS = `
.st-plate { position: relative; height: 320px; overflow: hidden; }
.st-plate img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7); -webkit-mask-image: linear-gradient(#000 50%, transparent); mask-image: linear-gradient(#000 50%, transparent); }
@media (min-width: 1024px) { .st-plate { height: 480px; } }
.st-w { opacity: clamp(0.22, calc((var(--p, 1) - var(--k)) * 9 + 0.22), 1); }
@media (prefers-reduced-motion: reduce) { .st-w { opacity: 1; } }
`;

export function StatementChapter() {
  const n = WORDS.length + 1;
  return (
    <section className="st relative bg-[#060B1A] pb-24 text-[#F2F5FC] lg:pb-40" aria-labelledby="promise-title">
      <style>{CSS}</style>
      <div className="st-plate" aria-hidden>
        {/* the earth from orbit, with no rocket in it: the film's last frame
            already shows the rocket, so a second one here read as a glitch */}
        <picture>
          <source type="image/avif" srcSet={`/flight/plate-earth.avif?v=${v}`} />
          <img src={`/flight/plate-earth.webp?v=${v}`} alt="" width={1600} height={330} loading="lazy" decoding="async" />
        </picture>
      </div>
      <div className="container-wide relative -mt-16 lg:-mt-24">
        <p className="eyebrow" style={{ color: "rgba(234,240,255,0.62)" }}>
          Promise
        </p>
        <StatementFill>
          <h2
            id="promise-title"
            className="mt-4 max-w-[16ch] font-display lg:mt-6"
            style={{ fontSize: "clamp(3rem, 6.5vw + 0.6rem, 7.5rem)", lineHeight: 1, letterSpacing: "-0.04em", fontWeight: 600 }}
          >
            {WORDS.map((w, i) => (
              <span key={i} className="st-w" style={{ ["--k" as string]: (i / n).toFixed(3) }}>
                {w}{" "}
              </span>
            ))}
            <span className="st-w italic-accent" style={{ ["--k" as string]: ((n - 1) / n).toFixed(3), color: "#8FB0FF" }}>
              back.
            </span>
          </h2>
        </StatementFill>
        <ProofRow />
      </div>
    </section>
  );
}
