import { CalendarCheck, Check, ClipboardList, Hammer, Map as MapIcon, Phone, type LucideIcon } from "lucide-react";
import { Reveal, SplitWords } from "@/components/primitives/Reveal";
import { WorkVisualsStyle } from "@/components/home/inbox/WorkVisuals";
import { HOW_VISUALS_CSS, HowVisual, type HowVisualKey } from "./HowVisuals";

/**
 * The five steps, large. A page-specific version of the home timeline:
 * a glowing engine-blue rail runs down the left, and each step's node and
 * rail segment light as that step scrolls into view (CSS only, driven by
 * the shared RevealObserver's data-revealed). A slow pulse travels the lit
 * rail. Two steps carry a visual: the Map a sample chart, the Build the page's one slow demo.
 *
 * Without JS, and under reduced motion, every node is lit and every
 * segment drawn, so it always reads complete.
 */

type Step = {
  n: string;
  key: HowVisualKey;
  word: string;
  timing: string;
  title: string;
  body: string;
  bring: string;
  decision?: string;
  /** Only two steps carry a visual, so the page keeps calm space. */
  vis?: boolean;
};

const ICONS: Record<HowVisualKey, LucideIcon> = {
  call: Phone,
  map: MapIcon,
  plan: ClipboardList,
  build: Hammer,
  review: CalendarCheck,
};

const STEPS: Step[] = [
  {
    n: "01",
    key: "call",
    word: "Call",
    timing: "30 minutes",
    title: "We listen first.",
    body: "You tell us how enquiries reach you today: WhatsApp, phone, email, the website. We find where they wait and where they get lost.",
    bring: "Roughly how many enquiries you get in a week.",
  },
  {
    n: "02",
    key: "map",
    word: "Map",
    timing: "Free",
    title: "Where time and money leak.",
    body: "We put each gap in rand and hours, in order of what pays back fastest. The map is yours to keep, whatever you decide.",
    bring: "Nothing. We do the sums.",
    vis: true,
  },
  {
    n: "03",
    key: "plan",
    word: "Plan",
    timing: "You decide",
    title: "A written plan. Your decision.",
    body: "What we build first, what it should bring back and when it goes live. If the numbers don't work, we say so.",
    bring: "A yes or a no. No is a fine answer.",
    decision: "Decision 1 of 2",
  },
  {
    n: "04",
    key: "build",
    word: "Build",
    timing: "10 working days",
    title: "Built in your accounts, in your voice.",
    body: "We teach it your services, hours and answers, then test it on real enquiries. Once live, every enquiry is answered within 60 seconds, day, night and weekends.",
    bring: "An hour to try it and tell us what sounds wrong.",
    vis: true,
  },
  {
    n: "05",
    key: "review",
    word: "Review",
    timing: "Day 90",
    title: "We look at your numbers together.",
    body: "Enquiries answered, how fast, what got booked. Then you choose the next phase, or stay as you are.",
    bring: "Half an hour on a call.",
    decision: "Decision 2 of 2",
  },
];

const CSS = `
.hs { position: relative; overflow: hidden; }
.hs-list { list-style: none; margin: 56px 0 0; padding: 0; }
@media (min-width: 1024px) { .hs-list { margin-top: 96px; } }

.hs-row { position: relative; padding: 0 0 72px 60px; --node: 44px; }
.hs-row:last-child { padding-bottom: 0; }
@media (min-width: 1024px) {
  .hs-row { padding: 0 0 128px 104px; --node: 56px; }
  .hs-in[data-split] { display: grid; grid-template-columns: 5fr 6fr; column-gap: 64px; align-items: start; }
}

/* Rail: track from this node's centre to the next node's centre */
.hs-track {
  position: absolute; left: calc(var(--node) / 2 - 1px); top: calc(var(--node) / 2); bottom: calc(var(--node) / -2);
  width: 2px; border-radius: 2px; background: rgba(242, 239, 233, 0.08); overflow: hidden;
}
.hs-row:last-child .hs-track { display: none; }
.hs-fill {
  position: absolute; inset: 0; transform-origin: 50% 0; border-radius: inherit;
  background: linear-gradient(to bottom, #8FB0FF, #4D7CFF 40%, rgba(77, 124, 255, 0.5));
  box-shadow: 0 0 6px rgba(77, 124, 255, 0.85), 0 0 18px rgba(77, 124, 255, 0.45);
}
.hs-pulse {
  position: absolute; left: -3px; top: 0; width: 8px; height: 56px; border-radius: 99px; opacity: 0;
  background: linear-gradient(to bottom, transparent, #EAF0FF, transparent);
  filter: blur(1px);
}

/* Node */
.hs-node {
  position: absolute; left: 0; top: 0; width: var(--node); height: var(--node); border-radius: 999px; z-index: 1;
  display: grid; place-items: center; color: #DCE6FF; background: #13203F;
  box-shadow: inset 0 0 0 1.5px #8FB0FF, 0 0 0 6px rgba(77, 124, 255, 0.16), 0 0 28px rgba(77, 124, 255, 0.6);
}
.hs-node svg { width: 20px; height: 20px; }
@media (min-width: 1024px) { .hs-node svg { width: 24px; height: 24px; } }
.hs-check {
  position: absolute; right: -3px; bottom: -3px; width: 18px; height: 18px; border-radius: 999px;
  display: grid; place-items: center; background: #4D7CFF; color: #fff; box-shadow: 0 0 0 2px #0E1A3A;
}
.hs-check svg { width: 11px; height: 11px; }

/* Copy */
.hs-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; min-height: var(--node); font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; font-variant-numeric: tabular-nums; }
.hs-num { color: var(--ink-muted); }
.hs-timing { color: #DCE6FF; }
.hs-decision { display: inline-flex; align-items: center; min-height: 24px; padding: 0 10px; border-radius: 99px; color: #F2C46D; background: rgba(242, 196, 109, 0.08); border: 1px solid rgba(242, 196, 109, 0.3); letter-spacing: 0.04em; }
.hs-word { margin-top: 12px; font-family: var(--font-display); font-weight: 600; font-size: clamp(3rem, 4.5vw + 1.4rem, 5.5rem); line-height: 0.92; letter-spacing: -0.045em; color: #F2F5FC; }
.hs-title { margin-top: 20px; font-size: 1.1875rem; font-weight: 600; letter-spacing: -0.01em; color: #F2F5FC; }
.hs-body { margin-top: 8px; max-width: 40ch; font-size: 1.0625rem; line-height: 1.6; color: var(--ink-soft); }
.hs-bring { margin-top: 20px; display: grid; gap: 4px; max-width: 40ch; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--hairline-2); background: rgba(255, 255, 255, 0.02); }
.hs-bring dt { font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); }
.hs-bring dd { margin: 0; font-size: 0.9375rem; line-height: 1.5; color: var(--ink); }
.hs-vis { margin-top: 32px; }
@media (min-width: 1024px) {
  .hs-meta { font-size: 0.8125rem; }
  .hs-title { font-size: 1.375rem; margin-top: 28px; }
  .hs-body { font-size: 1.125rem; }
  .hs-vis { margin-top: 0; padding-top: 8px; }
}

/* Motion: armed rows start dim and undrawn, light on reveal */
@media (prefers-reduced-motion: no-preference) {
  [data-reveal][data-armed] .hs-node { transition: color 0.4s cubic-bezier(.16,1,.3,1) 0.15s, background-color 0.4s cubic-bezier(.16,1,.3,1) 0.15s, box-shadow 0.5s cubic-bezier(.16,1,.3,1) 0.15s; }
  [data-reveal][data-armed]:not([data-revealed]) .hs-node { color: #8F8B84; background: #0E1A3A; box-shadow: inset 0 0 0 1px rgba(242, 239, 233, 0.16); }
  [data-reveal][data-armed] .hs-check { transition: transform 0.35s cubic-bezier(.34,1.56,.64,1) 0.45s; }
  [data-reveal][data-armed]:not([data-revealed]) .hs-check { transform: scale(0); }
  [data-reveal][data-armed] .hs-fill { transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s; }
  [data-reveal][data-armed]:not([data-revealed]) .hs-fill { transform: scaleY(0); }
  .hs-pulse { animation: hs-pulse 3.6s cubic-bezier(0.4, 0, 0.6, 1) 2s infinite; }
  [data-reveal][data-armed]:not([data-revealed]) .hs-pulse { animation: none; }
}
@keyframes hs-pulse {
  0% { opacity: 0; transform: translate3d(0, -56px, 0); }
  15% { opacity: 0.9; }
  85% { opacity: 0.9; }
  100% { opacity: 0; transform: translate3d(0, 900px, 0); }
}
`;

export function HowSteps() {
  return (
    <section className="hs band-orbit chapter-pad" aria-labelledby="steps-title">
      <WorkVisualsStyle />
      <style>{CSS + HOW_VISUALS_CSS}</style>
      <div className="container-wide">
        <Reveal variant="wipe" className="max-w-3xl">
          <p className="eyebrow">
            <span className="chap-n">01</span> The five steps
          </p>
          <h2 id="steps-title" className="h2 mt-4">
            <SplitWords text="What happens," /> <span><SplitWords text="and when." start={2} /></span>
          </h2>
          <p className="lead mt-6">Each step names what you get. Two of them are yours to decide.</p>
        </Reveal>

        <ol className="hs-list">
          {STEPS.map((s) => {
            const Icon = ICONS[s.key];
            return (
              <Reveal as="li" key={s.n} className="hs-row" y={24}>
                <span className="hs-track" aria-hidden>
                  <span className="hs-fill" />
                  <span className="hs-pulse" />
                </span>
                <span className="hs-node" aria-hidden>
                  <Icon strokeWidth={1.75} />
                  <span className="hs-check">
                    <Check strokeWidth={3} />
                  </span>
                </span>
                <div className="hs-in" data-split={s.vis ? "" : undefined}>
                  <div>
                    <p className="hs-meta">
                      <span className="hs-num">{s.n}</span>
                      <span className="hs-timing">{s.timing}</span>
                      {s.decision ? <span className="hs-decision">{s.decision}</span> : null}
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
            );
          })}
        </ol>
      </div>
    </section>
  );
}
