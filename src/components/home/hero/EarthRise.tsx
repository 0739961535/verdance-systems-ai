import { EarthRiseScroll } from "./EarthRiseScroll";

/**
 * The step from the light hero into the dark Promise chapter, as one scroll
 * moment. A real photograph of the Earth's limb (NASA, from the space
 * station) rises into view from below and turns down a little as you
 * scroll, while the cream of the hero fades into the black of space. Then
 * the line settles above the horizon.
 *
 * One image (AVIF/WebP, lazy, fixed size), two transforms and two opacities
 * per frame, written as one CSS variable by EarthRiseScroll. Without JS, or
 * with reduced motion, it shows the settled frame.
 */
export function EarthRise() {
  return (
    <section className="er" aria-labelledby="er-title">
      <style>{CSS}</style>
      <EarthRiseScroll />
      <div className="er-stage">
        <div className="er-space" aria-hidden />
        <div className="er-earth" aria-hidden>
          <picture>
            <source type="image/avif" srcSet="/flight/earthrise-960.avif 960w, /flight/earthrise-1920.avif 1920w" sizes="(min-width: 768px) 130vw, 220vw" />
            <img
              src="/flight/earthrise-1920.webp"
              srcSet="/flight/earthrise-960.webp 960w, /flight/earthrise-1920.webp 1920w"
              sizes="(min-width: 768px) 130vw, 220vw"
              alt=""
              width={1920}
              height={1126}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
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
.er { --p: 1; position: relative; height: 220svh; background: #060B1A; }
.er-stage { position: sticky; top: 0; height: 100svh; overflow: hidden; isolation: isolate; }
.er-space { position: absolute; inset: 0; background: radial-gradient(120% 70% at 50% 100%, #0B1736 0%, #060B1A 60%, #03060F 100%); }
.er-earth { --end: 0%; position: absolute; left: 50%; bottom: 0; width: 220vw; max-width: none; transform-origin: 50% 100%;
  transform: translate3d(-50%, calc(var(--end) + (1 - var(--p)) * 46%), 0) rotate(calc((1 - var(--p)) * -6deg)) scale(calc(1 + var(--p) * 0.04)); will-change: transform; }
@media (min-width: 768px) { .er-earth { --end: 30%; width: 108vw; } }
.er-earth img { display: block; width: 100%; height: auto; -webkit-mask-image: linear-gradient(transparent 0%, #000 22%); mask-image: linear-gradient(transparent 0%, #000 22%); }
.er-earth::after { content: ""; position: absolute; inset: 0; background: linear-gradient(rgba(6,11,26,0) 55%, #060B1A 100%); }
/* the cream of the hero lifts away like a sky: a sheet with a long soft
   lower edge (cream, a breath of blue, then clear) sliding up */
.er-cream { position: absolute; left: 0; right: 0; top: 0; height: 190%; pointer-events: none; will-change: transform;
  background: linear-gradient(var(--bg) 0%, var(--bg) 46%, color-mix(in oklab, var(--bg) 80%, #8FB0FF) 58%, color-mix(in oklab, var(--bg) 35%, #4D7CFF) 68%, rgba(29, 63, 143, 0.35) 80%, rgba(6, 11, 26, 0) 100%);
  transform: translate3d(0, calc(clamp(0, var(--p) / 0.6, 1) * -100%), 0); }
.er-copy { position: absolute; left: 0; right: 0; top: 20svh; text-align: center; color: #F2F5FC;
  opacity: clamp(0, calc((var(--p) - 0.55) / 0.25), 1); transform: translate3d(0, calc(clamp(0, (0.8 - var(--p)) / 0.25, 1) * 24px), 0); }
.er-h { margin: 0 auto; max-width: 16ch; font-family: var(--font-display); font-weight: 600; font-size: clamp(2.2rem, 3.6vw + 1rem, 4.75rem); line-height: 1; letter-spacing: -0.04em; text-wrap: balance; }
.er-h .italic-accent { color: #8FB0FF; }
.er-line { margin: 20px auto 0; max-width: 34ch; font-size: clamp(1.05rem, 0.5vw + 0.95rem, 1.3rem); line-height: 1.45; color: rgba(234, 240, 255, 0.78); }
@media (prefers-reduced-motion: reduce) {
  .er { height: auto; }
  .er-stage { position: relative; }
}
`;
