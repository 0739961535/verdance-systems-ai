import Link from "next/link";
import { SplitWords } from "@/components/primitives/Reveal";
import { ProcessTimeline, type ProcessStep } from "./ProcessTimeline";

/**
 * Chapter 11, Process: how a build happens, from the first call to the day
 * 90 review. An orbit-navy band that opens on the orbit frame from the film,
 * then a five-step timeline whose line draws as the section scrolls past.
 * Art directed: it renders the same in the light and dark site themes, so
 * the theme tokens it relies on are pinned to their dark values on the band.
 */


const STEPS: ProcessStep[] = [
  { n: "01", word: "Call", icon: "call", timing: "30 minutes", sentence: "We trace how enquiries reach you today and where they stall before a reply." },
  { n: "02", word: "Map", icon: "map", timing: "Free", sentence: "A time and capacity audit: where hours and revenue leak, measured." },
  {
    n: "03",
    word: "Plan",
    icon: "plan",
    timing: "You decide",
    sentence: "A written implementation plan: what we build first, the timeline to go-live and the expected return. If the numbers don't work, we say so.",
  },
  {
    n: "04",
    word: "Build",
    icon: "build",
    timing: "10 working days",
    sentence: "We configure it in your accounts, train it on your voice and test it on real enquiries before go-live.",
  },
  { n: "05", word: "Review", icon: "review", timing: "Day 90", sentence: "We review response times and outcomes against the baseline and agree the next phase." },
];

const CSS = `
.pc {
  --ink: #F2EFE9; --ink-soft: #C9C5BD; --ink-muted: #8F8B84; --ink-rgb: 242, 239, 233;
  --accent: #5B8FFF; --highlight: #6E9CFF; --hairline: rgba(242, 239, 233, 0.07);
  position: relative; overflow: hidden; background: #0E1A3A; color: #F2EFE9;
  padding-bottom: 96px;
}
@media (min-width: 1024px) { .pc { padding-bottom: 160px; } }

/* a short soft turn from the light Portfolio above into the night band */
.pc-plate { height: clamp(72px, 10vh, 128px); margin-bottom: 24px; pointer-events: none;
  background: linear-gradient(#F4F1EA 0%, color-mix(in oklab, #F4F1EA 40%, #4D7CFF) 35%, #1D3F8F 70%, #0E1A3A 100%); }
.pc-body { position: relative; z-index: 1; }

.pc-h2 { margin-top: 16px; font-size: clamp(2.5rem, 1.9rem + 2.6vw, 4rem); line-height: 1.05; letter-spacing: -0.035em; color: #F2EFE9; }
.pc-intro { margin-top: 24px; max-width: 34ch; font-size: 1.125rem; line-height: 1.5; letter-spacing: -0.005em; color: #C9C5BD; }
@media (min-width: 1024px) {
  .pc-h2 { margin-top: 24px; }
  .pc-intro { margin-top: 32px; max-width: 48ch; font-size: 1.375rem; }
}

/* The timeline styles live in ProcessTimeline.tsx */

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

      <div className="pc-plate" aria-hidden />

      <div className="pc-body container-wide">
        <div data-reveal="">
          <p className="eyebrow">
            Process
          </p>
          <h2 id="process-title" className="h2 pc-h2">
            <SplitWords text="From first call to" />{" "}
            <span>
              <SplitWords text="live" start={4} />
            </span>
            ,{" "}
            <SplitWords text="step by step." start={5} />
          </h2>
          <p className="pc-intro">Five steps. You make two decisions: whether to go ahead, and what comes next. We do the rest.</p>
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
