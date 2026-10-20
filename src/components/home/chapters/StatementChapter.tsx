import film from "../flight/film-manifest.json";
import { StatementFill } from "./StatementFill";

/**
 * 04 Promise: the outcome, once, very big, under the earth from orbit (the
 * film's last scene without the rocket, darker so it is not a second hero).
 * Words fill with ink as the section scrolls into view (StatementFill sets --p).
 */
const v = film.v;
const WORDS = "Every enquiry answered. Every follow-up done. Your team's hours".split(" ");

const FACTS = [
  { title: "Answered in under a minute.", body: "On WhatsApp, email, website chat and calls." },
  { title: "Day, night and weekends.", body: "The enquiries you lose after hours stop getting lost." },
  { title: "Live in 10 working days.", body: "Set up in your accounts, in your voice." },
];

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
          <span className="chap-n" style={{ color: "#8FB0FF" }}>04</span> Promise
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
        <ul className="mt-12 grid gap-0 lg:mt-24 lg:grid-cols-3 lg:gap-6">
          {FACTS.map((f) => (
            <li key={f.title} className="border-t border-white/[0.1] py-5 lg:pt-6">
              <p className="text-[1.375rem] font-semibold tracking-[-0.02em] lg:text-[1.75rem]">{f.title}</p>
              <p className="mt-1.5 text-[1.0625rem] leading-[1.55] text-[rgba(234,240,255,0.76)] lg:text-[1.125rem]">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
