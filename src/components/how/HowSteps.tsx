import { Reveal, SplitWords } from "@/components/primitives/Reveal";
import { Bud, type BudStage } from "./Bud";
import { HOW_VISUALS_CSS, HowVisual, type HowVisualKey } from "./HowVisuals";

/**
 * The five steps as a growing stem. At the top, one glance: five buds on a
 * stem that open from a closed bud (Call) to a full bloom (Review), the two
 * decisions drawn in gold, and a ring of ten ticks round the Build bud for
 * its ten working days. Below, the same stem runs down the page: each
 * segment draws as its step scrolls into view and the bud on it opens.
 *
 * Motion: stroke-dashoffset and opacity only, once, about 0.7s, keyed off
 * the shared RevealObserver (data-armed / data-revealed). Without JS and
 * under reduced motion everything renders finished.
 */

type Step = {
  key: HowVisualKey;
  stage: BudStage;
  word: string;
  timing: string;
  /** The short line under the bud in the one-glance diagram. */
  glance: string;
  title: string;
  body: string;
  bring: string;
  decision?: boolean;
  /** Only the Build step carries a visual, so the page keeps calm space. */
  vis?: boolean;
};

const STEPS: Step[] = [
  {
    key: "call",
    stage: 0,
    word: "Call",
    timing: "30 minutes",
    glance: "30 min",
    title: "We listen first.",
    body: "You tell us how enquiries reach you today. We find where they wait and where they get lost.",
    bring: "Roughly how many enquiries you get in a week.",
  },
  {
    key: "map",
    stage: 1,
    word: "Map",
    timing: "Free",
    glance: "Free",
    title: "Where time and money leak.",
    body: "We show each gap in hours and money, biggest first. The map is yours to keep, whatever you decide.",
    bring: "Nothing. We do the sums.",
  },
  {
    key: "plan",
    stage: 2,
    word: "Plan",
    timing: "In writing",
    glance: "In writing",
    title: "A written plan. Your call.",
    body: "What we build first, what it should bring back and when it goes live. If the numbers don't work, we say so.",
    bring: "A yes or a no. No is a fine answer.",
    decision: true,
  },
  {
    key: "build",
    stage: 3,
    word: "Build",
    timing: "10 working days",
    glance: "10 days",
    title: "Built in your accounts, in your voice.",
    body: "We teach it your services and answers, then test it on real enquiries. Once live, every enquiry is answered within 60 seconds.",
    bring: "An hour to try it and tell us what sounds wrong.",
    vis: true,
  },
  {
    key: "review",
    stage: 4,
    word: "Review",
    timing: "Day 90",
    glance: "Day 90",
    title: "We look at your numbers together.",
    body: "Enquiries answered, how fast, what got booked. Then you choose the next step, or stay as you are.",
    bring: "Half an hour on a call.",
    decision: true,
  },
];

const CSS = `
.hs { position: relative; overflow: hidden; }

/* ---------- One glance ---------- */
.hs-glance { position: relative; margin-top: 48px; padding: 28px 8px 20px; border-radius: 22px; border: 1px solid var(--hairline-2); background: rgba(6, 11, 26, 0.35); }
@media (min-width: 768px) { .hs-glance { margin-top: 64px; padding: 44px 32px 28px; } }
.hs-g-row { position: relative; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); }
.hs-g-stem { position: absolute; left: 10%; width: 80%; top: 27px; height: 2px; display: block; overflow: visible; }
@media (min-width: 768px) { .hs-g-stem { top: 43px; } }
.hs-g-node { position: relative; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; }
.hs-g-node .bud { width: 56px; height: 56px; border-radius: 99px; background: #0B1530; margin-bottom: 4px; }
@media (min-width: 768px) { .hs-g-node .bud { width: 88px; height: 88px; margin-bottom: 8px; --u: 0.64; } }
.hs-g-word { font-family: var(--font-display); font-weight: 600; font-size: 0.9375rem; letter-spacing: -0.01em; color: #F2F5FC; }
.hs-g-sub { font-size: 0.8125rem; line-height: 1.3; color: #B7C0D4; }
.hs-g-gold { font-size: 0.8125rem; line-height: 1.3; color: #F2C46D; }
@media (min-width: 768px) { .hs-g-word { font-size: 1.25rem; } .hs-g-sub, .hs-g-gold { font-size: 0.9375rem; } }
.hs-g-key { margin: 24px 6px 0; padding-top: 16px; border-top: 1px solid var(--hairline); display: flex; flex-wrap: wrap; gap: 8px 24px; font-size: 0.875rem; color: #B7C0D4; }
.hs-g-key span { display: inline-flex; align-items: center; gap: 8px; }
.hs-g-key svg { flex: none; }

/* ---------- The stem, step by step ---------- */
.hs-list { list-style: none; margin: 72px 0 0; padding: 0; }
@media (min-width: 1024px) { .hs-list { margin-top: 112px; } }
.hs-row { position: relative; padding: 0 0 72px 72px; --node: 56px; }
.hs-row:last-child { padding-bottom: 0; }
@media (min-width: 1024px) {
  .hs-row { padding: 0 0 112px 120px; --node: 80px; }
  .hs-in[data-split] { display: grid; grid-template-columns: 5fr 6fr; column-gap: 64px; align-items: start; }
}
.hs-node { position: absolute; left: 0; top: 0; width: var(--node); height: var(--node); z-index: 1; }
.hs-node .bud { width: var(--node); height: var(--node); }
@media (min-width: 1024px) { .hs-node .bud { --u: 0.7; } }
.hs-seg { position: absolute; left: calc(var(--node) / 2 - 1px); top: calc(var(--node) + 4px); bottom: 4px; width: 2px; display: block; }
.hs-seg svg { display: block; width: 2px; height: 100%; overflow: visible; }
.hs-row:last-child .hs-seg { display: none; }
.hs-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; min-height: var(--node); font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }
.hs-timing { color: #DCE6FF; }
.hs-decision { display: inline-flex; align-items: center; min-height: 26px; padding: 0 10px; border-radius: 99px; color: #F2C46D; border: 1px solid rgba(242, 196, 109, 0.4); letter-spacing: 0.02em; }
.hs-word { margin-top: 8px; font-family: var(--font-display); font-weight: 600; font-size: clamp(2.75rem, 4vw + 1.4rem, 5rem); line-height: 0.92; letter-spacing: -0.045em; color: #F2F5FC; }
.hs-title { margin-top: 18px; font-size: 1.1875rem; font-weight: 600; letter-spacing: -0.01em; color: #F2F5FC; }
.hs-body { margin-top: 8px; max-width: 40ch; font-size: 1.0625rem; line-height: 1.6; color: var(--ink-soft); }
.hs-bring { margin-top: 18px; display: grid; gap: 4px; max-width: 40ch; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--hairline-2); background: rgba(255, 255, 255, 0.02); }
.hs-bring dt { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: #B7C0D4; }
.hs-bring dd { margin: 0; font-size: 0.9375rem; line-height: 1.5; color: var(--ink); }
.hs-vis { margin-top: 32px; }
@media (min-width: 1024px) {
  .hs-title { font-size: 1.375rem; margin-top: 24px; }
  .hs-body { font-size: 1.125rem; }
  .hs-vis { margin-top: 0; padding-top: 8px; }
}

/* ---------- Motion: draw once on view ---------- */
@media (prefers-reduced-motion: no-preference) {
  .hs-draw .hs-ln, .hs-draw .bud-line path {
    stroke-dasharray: 1 1; stroke-dashoffset: 0;
    transition: stroke-dashoffset 0.75s cubic-bezier(0.4, 0, 0.2, 1) var(--d, 0s);
  }
  .hs-draw .bud-fill, .hs-draw .hs-fade { transition: opacity 0.6s ease-out calc(var(--d, 0s) + 0.3s); }
  .hs-draw .bud-days line { transition: opacity 0.3s ease-out calc(var(--d, 0s) + var(--t, 0.3s)); }
  .hs-draw[data-armed]:not([data-revealed]) .hs-ln,
  .hs-draw[data-armed]:not([data-revealed]) .bud-line path { stroke-dashoffset: 1; }
  .hs-draw[data-armed]:not([data-revealed]) .bud-fill,
  .hs-draw[data-armed]:not([data-revealed]) .bud-days line,
  .hs-draw[data-armed]:not([data-revealed]) .hs-fade { opacity: 0; }
}
`;

const d = (s: number) => ({ ["--d" as string]: `${s}s` });

/** The one-glance diagram: five buds on one stem. */
function Glance() {
  return (
    <Reveal className="hs-glance hs-draw" y={16}>
      <div className="hs-g-row" role="img" aria-label="Five steps on one stem: Call, 30 minutes. Map, free. Plan, in writing, you decide. Build, 10 working days. Review at day 90, you decide.">
        <svg className="hs-g-stem" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden>
          <line className="hs-ln" x1="0" y1="1" x2="75" y2="1" stroke="#4D7CFF" strokeWidth={1.5} pathLength={1} />
          {/* Build to Review: a lighter, dotted stretch (the weeks before day 90) */}
          <line className="hs-fade" x1="75" y1="1" x2="100" y2="1" stroke="rgba(143,176,255,0.55)" strokeWidth={1.5} strokeDasharray="0.6 1.4" style={d(0.6)} />
        </svg>
        {STEPS.map((s, i) => (
          <div key={s.key} className="hs-g-node" style={d(0.12 * i)} aria-hidden>
            <Bud stage={s.stage} gold={s.decision} days={s.key === "build"} />
            <span className="hs-g-word">{s.word}</span>
            <span className="hs-g-sub">{s.glance}</span>
            {s.decision ? <span className="hs-g-gold">You decide</span> : null}
          </div>
        ))}
      </div>
      <p className="hs-g-key">
        <span>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <circle cx="7" cy="7" r="5.5" fill="none" stroke="#F2C46D" strokeWidth="1.5" />
          </svg>
          Gold: your two decisions
        </span>
        <span>
          <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden>
            <path d="M2 3v8M8 3v8M14 3v8" stroke="#8FB0FF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Each tick: one working day
        </span>
      </p>
    </Reveal>
  );
}

export function HowSteps() {
  return (
    <section className="hs band-orbit chapter-pad" aria-labelledby="steps-title">
      <style>{CSS + HOW_VISUALS_CSS}</style>
      <div className="container-wide">
        <Reveal variant="wipe" className="max-w-3xl">
          <p className="eyebrow">The five steps</p>
          <h2 id="steps-title" className="h2 mt-4">
            <SplitWords text="Five steps." /> <span><SplitWords text="Two decisions are yours." start={2} /></span>
          </h2>
          <p className="lead mt-6">Live in 10 working days from your yes. Then we look at the numbers together at day 90.</p>
        </Reveal>

        <Glance />

        <ol className="hs-list">
          {STEPS.map((s) => (
            <Reveal as="li" key={s.key} className="hs-row hs-draw" y={24}>
              <span className="hs-node" aria-hidden>
                <Bud stage={s.stage} gold={s.decision} days={s.key === "build"} />
              </span>
              <span className="hs-seg" aria-hidden>
                <svg viewBox="0 0 2 100" preserveAspectRatio="none">
                  <line className="hs-ln" x1="1" y1="0" x2="1" y2="100" stroke="#4D7CFF" strokeWidth={1.5} pathLength={1} style={d(0.25)} />
                </svg>
              </span>
              <div className="hs-in" data-split={s.vis ? "" : undefined}>
                <div>
                  <p className="hs-meta">
                    <span className="hs-timing">{s.timing}</span>
                    {s.decision ? <span className="hs-decision">Your decision</span> : null}
                  </p>
                  <h3 className="hs-word">{s.word}</h3>
                  <p className="hs-title">{s.title}</p>
                  <p className="hs-body">{s.body}</p>
                  <dl className="hs-bring">
                    <dt>From you</dt>
                    <dd>{s.bring}</dd>
                  </dl>
                </div>
                {s.vis ? (
                  <div className="hs-vis">
                    <HowVisual k={s.key} />
                  </div>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
