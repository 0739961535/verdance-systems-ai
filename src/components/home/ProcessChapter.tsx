import Link from "next/link";
import { SplitWords } from "@/components/primitives/Reveal";
import film from "@/components/home/flight/film-manifest.json";
import { ProcessTimeline, type ProcessStep } from "./ProcessTimeline";

/**
 * Chapter 11, Process: how a build happens, from the first call to the day
 * 90 review. An orbit-navy band that opens on the orbit frame from the film,
 * then a five-step timeline whose line draws as the section scrolls past.
 * Art directed: it renders the same in the light and dark site themes, so
 * the theme tokens it relies on are pinned to their dark values on the band.
 */

const STILL = (n: string, ext: string) => `/flight/film/${n}.${ext}?v=${film.v}`;

const STEPS: ProcessStep[] = [
  { n: "01", word: "Call", timing: "30 minutes", sentence: "We hear how enquiries reach you today and where they get stuck." },
  { n: "02", word: "Map", timing: "Free", sentence: "We show you where time and money leak, in rand and hours." },
  {
    n: "03",
    word: "Plan",
    timing: "You decide",
    sentence: "A written plan: what we build first and what it should bring back. If the numbers don't work, we say so.",
  },
  {
    n: "04",
    word: "Build",
    timing: "10 working days",
    sentence: "We set it up in your accounts, in your voice, and test it on real enquiries.",
  },
  { n: "05", word: "Review", timing: "Day 90", sentence: "We sit down with your numbers and decide the next phase together." },
];

const CSS = `
.pc {
  --ink: #F2EFE9; --ink-soft: #C9C5BD; --ink-muted: #8F8B84; --ink-rgb: 242, 239, 233;
  --accent: #5B8FFF; --highlight: #6E9CFF; --hairline: rgba(242, 239, 233, 0.07);
  position: relative; overflow: hidden; background: #0E1A3A; color: #F2EFE9;
  padding-bottom: 96px;
}
@media (min-width: 1024px) { .pc { padding-bottom: 160px; } }

/* Orbit plate: the Earth curve from the film, fading into the band */
.pc-plate { position: relative; z-index: 1; height: 240px; margin-bottom: -48px; pointer-events: none; }
.pc-plate img {
  display: block; width: 100%; height: 100%; object-fit: cover; object-position: 50% 88%;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 22%, #000 52%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 22%, #000 52%, transparent 100%);
}
@media (min-width: 1024px) {
  .pc-plate { height: 400px; margin-bottom: -96px; }
  .pc-plate img { object-position: 50% 72%; }
}
.pc-body { position: relative; z-index: 1; }

.pc-h2 { margin-top: 16px; font-size: clamp(2.5rem, 1.9rem + 2.6vw, 4rem); line-height: 1.05; letter-spacing: -0.035em; color: #F2EFE9; }
.pc-intro { margin-top: 24px; max-width: 34ch; font-size: 1.125rem; line-height: 1.5; letter-spacing: -0.005em; color: #C9C5BD; }
@media (min-width: 1024px) {
  .pc-h2 { margin-top: 24px; }
  .pc-intro { margin-top: 32px; max-width: 48ch; font-size: 1.375rem; }
}

/* Timeline: vertical on phones */
.pt-tl { position: relative; margin-top: 48px; }
.pt-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 48px; }
.pt-step { position: relative; padding-left: 40px; }
.pt-track { position: absolute; display: block; overflow: hidden; background: rgba(242, 239, 233, 0.1); }
.pt-track-v { left: 5.5px; top: 9px; bottom: 0; width: 1px; }
.pt-track-h { display: none; }
.pt-fill { position: absolute; inset: 0; display: block; background: #4D7CFF; will-change: transform; }
.pt-fill-v { transform-origin: 50% 0; }
.pt-fill-h { transform-origin: 0 50%; }
.pt-node {
  position: absolute; left: 0; top: 3px; width: 12px; height: 12px; border-radius: 999px;
  background: #0E1A3A; box-shadow: inset 0 0 0 1px rgba(242, 239, 233, 0.28);
  transition: background-color 300ms cubic-bezier(.16,1,.3,1), box-shadow 300ms cubic-bezier(.16,1,.3,1);
}
.pt-node[data-lit] { background: #4D7CFF; box-shadow: inset 0 0 0 1px #4D7CFF, 0 0 0 4px rgba(77, 124, 255, 0.18), 0 0 16px rgba(77, 124, 255, 0.55); }
.pt-meta { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 16px; margin: 0; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; line-height: 1.5; }
.pt-num { color: #8F8B84; }
.pt-timing { color: #DCE6FF; }
.pt-word { margin-top: 8px; font-family: var(--font-display); font-weight: 600; font-size: 2.5rem; line-height: 1; letter-spacing: -0.04em; color: #F2EFE9; }
.pt-sentence { margin-top: 16px; max-width: 64ch; font-size: 1.0625rem; line-height: 1.55; color: #C9C5BD; }

/* Timeline: horizontal from 1024px */
@media (min-width: 1024px) {
  .pt-tl { margin-top: 64px; }
  .pt-list { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 24px; }
  .pt-step { padding-left: 0; padding-top: 0; }
  .pt-track-v { display: none; }
  .pt-track-h { display: block; left: 0; right: 0; top: 51.5px; height: 1px; }
  .pt-meta { min-height: 40px; align-content: flex-start; flex-direction: column; gap: 4px; }
  .pt-node { top: 46px; }
  /* Vertical grid lines at 4% white, from the hairline to the end of the band */
  .pt-step::before {
    content: ""; position: absolute; left: 5.5px; top: 52px; bottom: -160px; width: 1px;
    background: rgba(255, 255, 255, 0.04); pointer-events: none;
  }
  .pt-word { margin-top: 40px; font-size: 3rem; }
  .pt-sentence { font-size: 1.125rem; max-width: 26ch; }
}

/* JS armed: nodes start unlit and the scroll position decides */
.pt-tl[data-armed] .pt-node:not([data-lit]) { background: #0E1A3A; }
@media (prefers-reduced-motion: reduce) {
  .pt-fill { transform: none !important; }
  .pt-node { transition: none; }
}

.pc-link {
  display: inline-flex; align-items: center; gap: 8px; min-height: 44px; margin-top: 48px;
  font-size: 1.0625rem; font-weight: 600; color: #DCE6FF; text-decoration: none; cursor: pointer;
  background-image: linear-gradient(currentColor, currentColor); background-repeat: no-repeat;
  background-size: 0% 1px; background-position: 0 calc(100% - 10px);
  transition: background-size 200ms cubic-bezier(.16,1,.3,1), color 200ms;
}
.pc-link:hover { background-size: 100% 1px; color: #FFFFFF; }
.pc-link svg { transition: transform 200ms cubic-bezier(.16,1,.3,1); }
.pc-link:hover svg { transform: translateX(3px); }
.pc-link:focus-visible { outline: 2px solid #4D7CFF; outline-offset: 2px; border-radius: 4px; }
@media (min-width: 1024px) { .pc-link { margin-top: 64px; font-size: 1.125rem; } }
@media (prefers-reduced-motion: reduce) { .pc-link, .pc-link svg { transition: none; } }
`;

export function ProcessChapter() {
  return (
    <section className="pc grain-dark" aria-labelledby="process-title">
      <style>{CSS}</style>

      <div className="pc-plate" aria-hidden>
        <picture>
          <source media="(min-width: 768px)" type="image/avif" srcSet={STILL("still-d", "avif")} />
          <source media="(min-width: 768px)" type="image/webp" srcSet={STILL("still-d", "webp")} />
          <source type="image/avif" srcSet={STILL("still-m", "avif")} />
          <img src={STILL("still-m", "webp")} alt="" width={750} height={1327} loading="lazy" decoding="async" />
        </picture>
      </div>

      <div className="pc-body container-wide">
        <div data-reveal="">
          <p className="eyebrow">
            <span className="chap-n">11</span> Process
          </p>
          <h2 id="process-title" className="h2 pc-h2">
            <SplitWords text="From first call to" />{" "}
            <span className="italic-accent">
              <SplitWords text="live" start={4} />
            </span>
            ,{" "}
            <SplitWords text="step by step." start={5} />
          </h2>
          <p className="pc-intro">Five steps. You make two decisions. We do the rest.</p>
        </div>

        <div data-reveal="" style={{ ["--reveal-delay" as string]: "0.12s" }}>
          <ProcessTimeline steps={STEPS} />
        </div>

        <Link href="/audit" className="pc-link">
          See what the free map covers
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default ProcessChapter;
