import { StatementFill } from "./StatementFill";
import { ProofRow } from "./ProofRow";

/**
 * 04 Promise: the outcome, once, very big, under the earth from orbit (the
 * film's last scene without the rocket, darker so it is not a second hero).
 * Words fill with ink as the section scrolls into view (StatementFill sets --p).
 */
const WORDS = "Every enquiry answered. Every follow-up done. Your team's hours".split(" ");

const CSS = `
.st-w { opacity: clamp(0.22, calc((var(--p, 1) - var(--k)) * 9 + 0.22), 1); }
@media (prefers-reduced-motion: reduce) { .st-w { opacity: 1; } }
`;

export function StatementChapter() {
  const n = WORDS.length + 1;
  return (
    <section className="st relative bg-[#060B1A] pb-24 text-[#F2F5FC] lg:pb-40" aria-labelledby="promise-title">
      <style>{CSS}</style>
      {/* the Earth is the scene just above (EarthRise) */}
      <div className="container-wide relative pt-8 lg:pt-16">
        <p className="eyebrow" style={{ color: "rgba(234,240,255,0.62)" }}>
          <span className="chap-n" style={{ color: "#8FB0FF" }}>01</span> Promise
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
