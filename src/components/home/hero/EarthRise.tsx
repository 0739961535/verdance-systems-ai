import { EarthRiseScroll } from "./EarthRiseScroll";

/**
 * The step from the light hero into the dark Promise chapter, as one scroll
 * moment: the cream of the hero lifts away into a deep navy with a soft
 * atmosphere line low in the frame, then the line settles. Temporary, until
 * the real-time globe. No images: a few transforms and opacities per frame,
 * written as one CSS variable by EarthRiseScroll. Without JS, or with
 * reduced motion, it shows the settled frame.
 */
export function EarthRise() {
  return (
    <section className="er" aria-labelledby="er-title">
      <style>{CSS}</style>
      <EarthRiseScroll />
      <div className="er-stage">
        <div className="er-space" aria-hidden />
        <div className="er-glow" aria-hidden />
        <div className="er-cream" aria-hidden />
        <div className="er-copy container-narrow">
          <h2 id="er-title" className="er-h">
            Every enquiry answered within 60&nbsp;seconds. <span className="italic-accent">Day or night.</span>
          </h2>
          <p className="er-line">In your tone, and with your business understood.</p>
        </div>
      </div>
    </section>
  );
}

/*
 * --p runs 0 to 1 across the scene (EarthRiseScroll). The Earth starts low
 * and tilted, rises and turns level; the cream fades out between 0.1 and
 * 0.55; the words come in from 0.55.
 */
const CSS = `
.er { --p: 1; position: relative; height: 180svh; background: #060B1A; }
.er-stage { position: sticky; top: 0; height: 100svh; overflow: hidden; isolation: isolate; }
.er-space { position: absolute; inset: 0; background: radial-gradient(120% 70% at 50% 100%, #0B1736 0%, #060B1A 60%, #03060F 100%); }
/* a soft atmosphere line low in the frame, rising a little as you scroll
   (temporary, until the real-time globe) */
.er-glow { position: absolute; left: 50%; bottom: 0; width: 240vw; aspect-ratio: 1; border-radius: 50%; pointer-events: none;
  transform: translate3d(-50%, calc(88% + (1 - var(--p)) * 6%), 0);
  background: radial-gradient(closest-side, #060B1A 97.6%, rgba(77, 124, 255, 0.0) 100%);
  box-shadow: 0 0 0 1px rgba(170, 200, 255, 0.35), 0 -18px 60px rgba(77, 124, 255, 0.28), 0 -60px 180px rgba(77, 124, 255, 0.18); }
@media (min-width: 768px) { .er-glow { width: 180vw; } }
/* the cream of the hero lifts away like a sky: a sheet with a long soft
   lower edge (cream, a breath of blue, then clear) sliding up */
.er-cream { position: absolute; left: 0; right: 0; top: 0; height: 190%; pointer-events: none; will-change: transform;
  background: linear-gradient(var(--bg) 0%, var(--bg) 46%, color-mix(in oklab, var(--bg) 80%, #8FB0FF) 58%, color-mix(in oklab, var(--bg) 35%, #4D7CFF) 68%, rgba(29, 63, 143, 0.35) 80%, rgba(6, 11, 26, 0) 100%);
  transform: translate3d(0, calc(clamp(0, var(--p) / 0.6, 1) * -100%), 0); }
.er-copy { position: absolute; left: 0; right: 0; top: 30svh; text-align: center; color: #F2F5FC;
  opacity: clamp(0, calc((var(--p) - 0.55) / 0.25), 1); transform: translate3d(0, calc(clamp(0, (0.8 - var(--p)) / 0.25, 1) * 24px), 0); }
.er-h { margin: 0 auto; max-width: 16ch; font-family: var(--font-display); font-weight: 600; font-size: clamp(2.2rem, 3.6vw + 1rem, 4.75rem); line-height: 1; letter-spacing: -0.04em; text-wrap: balance; }
.er-h .italic-accent { color: #8FB0FF; }
.er-line { margin: 20px auto 0; max-width: 34ch; font-size: clamp(1.05rem, 0.5vw + 0.95rem, 1.3rem); line-height: 1.45; color: rgba(234, 240, 255, 0.78); }
@media (prefers-reduced-motion: reduce) {
  .er { height: auto; }
  .er-stage { position: relative; }
}
`;
