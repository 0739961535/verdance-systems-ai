import { SplitWords } from "@/components/primitives/Reveal";
import { AskPanel } from "./AskPanel";

/**
 * "Ask your business": AI plugged into the tools a business already runs
 * on, answering the owner's questions in plain English, and acting on them
 * for approval. Full version on /services, compact on the home page.
 * Sample data only (see askData.ts).
 */

const POINTS = [
  { title: "Answers from your own systems.", body: "Your accounts, your store and your inbox. Not guesses." },
  { title: "It acts, not just answers.", body: "It drafts the follow-up and chases the invoice, and waits for your yes." },
  { title: "Private to your team.", body: "Set up in your accounts, for the people you choose." },
];

const CSS = `
.ask-chips { display: flex; flex-wrap: wrap; gap: 6px; }
@media (max-width: 639px) {
  .ask-chips { flex-wrap: nowrap; overflow-x: auto; width: calc(100% + 40px); margin: 0 -20px; padding: 2px 20px 6px; scroll-padding-inline: 20px; scroll-snap-type: x proximity; scrollbar-width: none; -webkit-mask-image: linear-gradient(90deg, #000 82%, transparent); mask-image: linear-gradient(90deg, #000 82%, transparent); }
  .ask-chips::-webkit-scrollbar { display: none; }
  .ask-chips > * { flex: none; scroll-snap-align: start; }
}
.ask-caret { display: inline-block; width: 0.5em; height: 1em; margin-left: 2px; vertical-align: -0.12em; background: #8FB0FF; opacity: 0.8; }
.ask-more { opacity: 0; transform: translate3d(0, 6px, 0); transition: opacity 0.35s ease-out, transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1); }
.ask-more.is-on { opacity: 1; transform: none; }
.ask-bar { transform-origin: 0 50%; }
.ask-more.is-on .ask-bar { animation: ask-grow 0.6s cubic-bezier(0.2, 0.7, 0.2, 1); }
@keyframes ask-grow { from { transform: scaleX(0); } }
@media (prefers-reduced-motion: reduce) { .ask-more { transition: none; } .ask-more.is-on .ask-bar { animation: none; } .ask-caret { display: none; } }
`;

export function AskYourBusiness({ compact = false }: { compact?: boolean }) {
  return (
    <section className="band-night chapter-pad" aria-labelledby="ask-title">
      <style>{CSS}</style>
      <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div data-reveal="">
          <p className="eyebrow">
            <span className="chap-n">09</span> Ask
          </p>
          <h2 id="ask-title" className="h2 mt-4">
            <SplitWords text="Ask your business" /> <span className="italic-accent">anything.</span>
          </h2>
          <p className="lead mt-6">Ask in plain words. Get the answer from your own store, inbox and diary.</p>
          {!compact && (
            <ul className="mt-8 grid gap-4">
              {POINTS.map((p) => (
                <li key={p.title} className="text-[1.0625rem] leading-[1.55] text-[color:var(--color-ink-soft)]">
                  <span className="font-semibold text-[color:var(--color-ink)]">{p.title}</span> {p.body}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <AskPanel compact={compact} />
          <p className="museum mt-3">Sample questions and answers.</p>
        </div>
      </div>
    </section>
  );
}
