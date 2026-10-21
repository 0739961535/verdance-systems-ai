import { preload } from "react-dom";
import manifest from "./bloom-manifest.json";
import { BloomScroll } from "./BloomScroll";

/**
 * The opening: a sticky scroll scene on the warm light ground. A blue flower
 * opens from bud to full bloom as you scroll (a frame sequence when
 * public/bloom/ has one, otherwise a drawn placeholder), with "WE MAKE AI"
 * fixed on the left and the words on the right changing with the scroll.
 * Phones: "WE MAKE AI" above the flower, the changing words below.
 *
 * BloomScroll writes --p (0 to 1) and data-word, and draws the frame for
 * the scroll (public/bloom, built by scripts/build-bloom-frames.mjs from
 * the 4K film): low WebP frames while moving, an HD AVIF at rest. The ground
 * is the film's own paper colour and the frame's edges are feathered, so no
 * rectangle shows.
 * Reduced motion or no JS: the open flower and the last line, still.
 */

export const BLOOM_WORDS = ["That answers", "That follows up", "That runs the admin", "That sounds like you", "To run your business"];

const hasFrames = manifest.desktop.count > 0;

export function BloomHero() {
  // the first frame is the LCP: start fetching it from the document head
  if (hasFrames) {
    preload(`/bloom/first-640.avif?v=${manifest.v}`, { as: "image", type: "image/avif", fetchPriority: "high", media: "(max-width: 767px)" });
    preload(`/bloom/first-960.avif?v=${manifest.v}`, { as: "image", type: "image/avif", fetchPriority: "high", media: "(min-width: 768px)" });
  }
  return (
    <section className="bl" aria-label="We make AI that answers, follows up, runs the admin, sounds like you, to run your business" data-word={BLOOM_WORDS.length - 1}>
      <style>{CSS}</style>
      <BloomScroll v={manifest.v} desktop={manifest.desktop.count} phone={manifest.phone.count} />
      <div className="bl-stage">
        <span aria-hidden className="bl-glow" />
        <p className="bl-left" aria-hidden>
          We make AI
        </p>
        <div className="bl-flower" aria-hidden>
          {hasFrames ? (
            <>
              {/* the first frame paints at once (small), the canvas takes over */}
              <picture>
                <source type="image/avif" media="(max-width: 767px)" srcSet={`/bloom/first-640.avif?v=${manifest.v}`} />
                <source type="image/avif" srcSet={`/bloom/first-960.avif?v=${manifest.v}`} />
                <source media="(max-width: 767px)" srcSet={`/bloom/first-640.webp?v=${manifest.v}`} />
                <img className="bl-first" src={`/bloom/first-960.webp?v=${manifest.v}`} alt="" width={960} height={960} fetchPriority="high" />
              </picture>
              <canvas className="bl-canvas" width={960} height={960} />
            </>
          ) : (
            <Placeholder />
          )}
        </div>
        <div className="bl-right" aria-hidden>
          {BLOOM_WORDS.map((w, i) => (
            <span key={w} className="bl-word" data-i={i}>
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A drawn blue flower (placeholder until the footage lands): petals open with --p. */
function Placeholder() {
  const outer = Array.from({ length: 8 }, (_, i) => i * 45);
  const inner = Array.from({ length: 6 }, (_, i) => i * 60 + 30);
  return (
    <svg viewBox="-100 -100 200 200" className="bl-svg">
      <defs>
        <radialGradient id="bl-petal" cx="0" cy="-30" r="70" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#DCE6FF" />
          <stop offset="0.45" stopColor="#7FA3FF" />
          <stop offset="1" stopColor="#1D3F8F" />
        </radialGradient>
        <radialGradient id="bl-heart" cx="0" cy="0" r="16" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F2F5FC" />
          <stop offset="1" stopColor="#4D7CFF" />
        </radialGradient>
      </defs>
      {outer.map((a, i) => (
        <g key={`o${a}`} transform={`rotate(${a})`}>
          <path className="bl-petal bl-petal-o" style={{ ["--k" as string]: i }} d="M0 0 C 26 -18, 22 -62, 0 -76 C -22 -62, -26 -18, 0 0 Z" fill="url(#bl-petal)" />
        </g>
      ))}
      {inner.map((a, i) => (
        <g key={`i${a}`} transform={`rotate(${a})`}>
          <path className="bl-petal bl-petal-i" style={{ ["--k" as string]: i }} d="M0 0 C 18 -12, 15 -42, 0 -52 C -15 -42, -18 -12, 0 0 Z" fill="url(#bl-petal)" />
        </g>
      ))}
      <circle r="12" fill="url(#bl-heart)" className="bl-heart" />
    </svg>
  );
}

const CSS = `
.bl { --p: 1; position: relative; height: 250svh; background: linear-gradient(#F9F4E8 0%, #F9F4E8 82%, var(--bg) 100%); color: #0E0E10; }
.bl .bl-left { color: #0E0E10; }
.bl-stage { position: sticky; top: 0; height: 100svh; overflow: hidden; display: grid; place-items: center; isolation: isolate; }
.bl-glow { display: none; position: absolute; left: 50%; top: 50%; width: min(80vw, 760px); aspect-ratio: 1; transform: translate(-50%, -50%) scale(calc(0.7 + var(--p) * 0.5)); border-radius: 50%; z-index: -1;
  background: radial-gradient(closest-side, rgba(var(--accent-rgb), 0.18), rgba(var(--accent-rgb), 0)); opacity: calc(0.4 + var(--p) * 0.6); }
.bl-flower { position: relative; width: min(92vw, 78svh); aspect-ratio: 1; }
/* the frame's edges melt into the ground: a static vignette in the ground's
   colour on top (cheaper than masking the canvas on every draw) */
.bl-flower::after { content: ""; position: absolute; inset: -1px; pointer-events: none; background: radial-gradient(closest-side, rgba(249, 244, 232, 0) 70%, #F9F4E8 100%); }
.bl-first, .bl-canvas { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
.bl-canvas { opacity: 0; }
.bl[data-live] .bl-canvas { opacity: 1; }
.bl[data-live] .bl-first { visibility: hidden; }
.bl-svg { width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 18px 40px rgba(29, 63, 143, 0.25)); }
/* petals open from a closed bud: each scales up and leans out a little later than the last */
.bl-petal { transform-box: view-box; transform-origin: 0 0;
  transform: rotate(calc((1 - var(--o)) * 0deg)) scale(calc(0.18 + var(--o) * 0.82), calc(0.42 + var(--o) * 0.58)); }
.bl-petal-o { --o: clamp(0, calc((var(--p) - var(--k) * 0.035) / 0.7), 1); opacity: calc(0.6 + var(--o) * 0.4); }
.bl-petal-i { --o: clamp(0, calc((var(--p) - 0.12 - var(--k) * 0.03) / 0.6), 1); }
.bl-heart { transform-box: fill-box; transform-origin: center; transform: scale(calc(0.6 + var(--p) * 0.4)); }
/* the words: a confident display size with tight tracking. "We make AI"
   holds beside the flower; the line opposite slides up out of a mask, word
   by word, and the last line lands larger, in the brand blue, and holds */
.bl-left, .bl-right { position: absolute; top: 50%; margin: 0; font-family: var(--font-display); font-weight: 600; text-transform: uppercase;
  font-size: clamp(1.5rem, 1.5vw + 1rem, 2.75rem); line-height: 1; letter-spacing: -0.02em; }
.bl-left { color: #0E0E10; right: calc(50% + min(46vw, 39svh) * 0.8); transform: translateY(-50%); text-align: right; white-space: nowrap; z-index: 2; }
.bl-right { z-index: 2; left: calc(50% + min(46vw, 39svh) * 0.8); right: 24px; transform: translateY(-50%); display: grid; overflow: hidden; padding: 0.12em 0; }
.bl-word { grid-area: 1 / 1; max-width: 11ch; color: #2554D4; transform: translate3d(0, 110%, 0); opacity: 0;
  transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease; }
.bl-word[data-i="4"] { font-size: 1.18em; letter-spacing: -0.03em; color: #1D3F8F; background: linear-gradient(90deg, #1D3F8F, #4D7CFF); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.bl[data-word="0"] .bl-word[data-i="0"], .bl[data-word="1"] .bl-word[data-i="1"], .bl[data-word="2"] .bl-word[data-i="2"],
.bl[data-word="3"] .bl-word[data-i="3"], .bl[data-word="4"] .bl-word[data-i="4"] { opacity: 1; transform: none; }
/* the word that just left slides on up and out */
.bl[data-word="1"] .bl-word[data-i="0"], .bl[data-word="2"] .bl-word[data-i="1"], .bl[data-word="3"] .bl-word[data-i="2"], .bl[data-word="4"] .bl-word[data-i="3"] { transform: translate3d(0, -110%, 0); }
@media (max-width: 767px) {
  .bl-left, .bl-right { left: 20px; right: 20px; transform: none; text-align: center; font-size: clamp(1.6rem, 7.4vw, 2.2rem); }
  .bl-left { top: calc(50% - min(46vw, 39svh) - 3.2em); }
  .bl-right { top: calc(50% + min(46vw, 39svh) + 0.6em); justify-items: center; }
  .bl-word { max-width: none; }
}
@media (prefers-reduced-motion: reduce) {
  .bl { height: 100svh; }
  .bl-word { transition: none; }
}
`;
