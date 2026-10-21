import { ArrowUpRight } from "lucide-react";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY, SITE } from "@/data/site";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";

/**
 * The closing scene on /how-it-works: the day 90 review as a sunrise on the
 * Earth's limb ("a new day for the business"), then the one call to action.
 * This is the page's single Earth moment, drawn in SVG (no photo to load).
 *
 * Motion: the atmosphere line draws across (stroke-dashoffset) and the sun
 * fades up (opacity), once, when the scene scrolls into view. Under reduced
 * motion and without JS it renders finished. id="audit" lets the sticky
 * mobile CTA step aside here.
 */

const CSS = `
.hz { position: relative; isolation: isolate; overflow: hidden; background: #060B1A; color: #F2F5FC; padding: clamp(96px, 14vh, 160px) 0 0; scroll-margin-top: 5rem; }
.hz-copy { position: relative; z-index: 2; }
.hz-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 0.8125rem; letter-spacing: 0.14em; text-transform: uppercase; color: #F2C46D; }
.hz-h { margin-top: 18px; max-width: 14ch; font-family: var(--font-display); font-weight: 600; font-size: clamp(2.6rem, 5vw + 1rem, 5.5rem); line-height: 0.98; letter-spacing: -0.045em; }
.hz-lead { margin-top: 22px; max-width: 34rem; font-size: 1.0625rem; line-height: 1.6; color: rgba(234, 240, 255, 0.84); }
.hz-cta { margin-top: 48px; padding-top: 28px; border-top: 1px solid rgba(255, 255, 255, 0.1); max-width: 40rem; }
.hz-cta-t { font-size: 1.25rem; font-weight: 600; letter-spacing: -0.015em; }
.hz-btns { margin-top: 20px; display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
@media (min-width: 640px) { .hz-btns { flex-direction: row; align-items: center; } }
.hz-scene { position: relative; z-index: 1; margin-top: -24px; height: clamp(220px, 30vw, 420px); pointer-events: none; }
.hz-scene svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
@media (prefers-reduced-motion: no-preference) {
  .hz-arc { stroke-dasharray: 1 1; stroke-dashoffset: 0; transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s; }
  .hz-sun, .hz-glow { transition: opacity 0.8s ease-out 0.35s; }
  .hz-scene[data-armed]:not([data-revealed]) .hz-arc { stroke-dashoffset: 1; }
  .hz-scene[data-armed]:not([data-revealed]) .hz-sun,
  .hz-scene[data-armed]:not([data-revealed]) .hz-glow { opacity: 0; }
}
`;

/** The planet: a huge circle whose top edge is the horizon. */
const R = 2600;
const CX = 720;
const TOP = 250;
const CY = TOP + R;
/** The visible stretch of the limb, left to right, as one arc. */
const x0 = -40;
const x1 = 1480;
const yAt = (x: number) => CY - Math.sqrt(R * R - (x - CX) * (x - CX));
const ARC = `M ${x0} ${yAt(x0).toFixed(1)} A ${R} ${R} 0 0 1 ${x1} ${yAt(x1).toFixed(1)}`;

export function HowSunrise() {
  return (
    <section id="audit" className="hz" aria-labelledby="hz-title" data-cta-location="final">
      <style>{CSS}</style>
      <div className="container-wide hz-copy" data-reveal="">
        <p className="hz-eyebrow">Day 90</p>
        <h2 id="hz-title" className="hz-h">
          A new day for the <span className="italic-accent" style={{ color: "#8FB0FF" }}>business.</span>
        </h2>
        <p className="hz-lead">
          We look at your numbers together: enquiries answered, how fast, what got booked. Then you choose what comes next.
        </p>
        <div className="hz-cta">
          <p className="hz-cta-t">It starts with a free 30-minute call.</p>
          <div className="hz-btns">
            <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-[52px] justify-center px-6 text-[1.02rem]">
              {CTA_PRIMARY}
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flm-wa justify-center">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
      <div className="hz-scene" data-reveal="" aria-hidden>
        <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" focusable="false">
          <defs>
            <radialGradient id="hz-sky" cx={CX} cy={TOP} r="760" gradientUnits="userSpaceOnUse" gradientTransform={`translate(${CX} ${TOP}) scale(1 0.3) translate(${-CX} ${-TOP})`}>
              <stop offset="0" stopColor="#FFE3B0" stopOpacity="0.55" />
              <stop offset="0.18" stopColor="#F2C46D" stopOpacity="0.22" />
              <stop offset="0.5" stopColor="#4D7CFF" stopOpacity="0.12" />
              <stop offset="1" stopColor="#060B1A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hz-sunc" cx={CX} cy={TOP} r="90" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FFF6E4" />
              <stop offset="0.35" stopColor="#FFE3B0" stopOpacity="0.9" />
              <stop offset="1" stopColor="#F2C46D" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hz-planet" x1="0" x2="0" y1={TOP} y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#13203F" />
              <stop offset="0.5" stopColor="#0A1226" />
              <stop offset="1" stopColor="#060B1A" />
            </linearGradient>
            <linearGradient id="hz-line" x1="0" x2="1440" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#2554D4" stopOpacity="0.2" />
              <stop offset="0.38" stopColor="#8FB0FF" />
              <stop offset="0.5" stopColor="#FFE3B0" />
              <stop offset="0.62" stopColor="#8FB0FF" />
              <stop offset="1" stopColor="#2554D4" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect className="hz-glow" x="0" y="0" width="1440" height="420" fill="url(#hz-sky)" />
          <circle className="hz-sun" cx={CX} cy={TOP} r="90" fill="url(#hz-sunc)" />
          <circle cx={CX} cy={CY} r={R} fill="url(#hz-planet)" />
          {/* a soft band of atmosphere just above the edge */}
          <path className="hz-glow" d={ARC} fill="none" stroke="#4D7CFF" strokeOpacity="0.25" strokeWidth="10" />
          <path className="hz-arc" d={ARC} fill="none" stroke="url(#hz-line)" strokeWidth="1.5" pathLength={1} />
        </svg>
      </div>
    </section>
  );
}
