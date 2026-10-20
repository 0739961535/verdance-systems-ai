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


export function AskYourBusiness({ compact = false }: { compact?: boolean }) {
  return (
    <section className="band-night chapter-pad" aria-labelledby="ask-title">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div className="min-w-0" data-reveal="">
          <p className="eyebrow">
            <span className="chap-n">09</span> Ask
          </p>
          <h2 id="ask-title" className="h2 mt-4">
            <SplitWords text="Ask your business" /> <span>anything.</span>
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
        <div className="min-w-0">
          <AskPanel compact={compact} />
          <p className="museum mt-3">Sample questions and answers.</p>
        </div>
      </div>
    </section>
  );
}
