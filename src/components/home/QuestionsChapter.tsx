import { SplitWords } from "@/components/primitives/Reveal";
import { SITE } from "@/data/site";
import { QuestionsAccordion, type QA } from "./QuestionsAccordion";

/**
 * Chapter 12, Questions: the real objections owners raise, answered in their
 * words, with "you stay in control" folded into the first answers. A night
 * band, art directed to render the same in the light and dark site themes.
 * On desktop the left column (marker, heading, one line, WhatsApp link) stays
 * put while the questions scroll. Ships FAQPage structured data for the same
 * six questions.
 */

const QUESTIONS: QA[] = [
  {
    q: "Won't it sound like a robot to our customers?",
    a: "It writes in your voice, from your own answers. It doesn't guess: when it isn't sure, it hands over to a person on your team with the whole chat attached.",
  },
  {
    q: "Who checks what it sends?",
    a: "You do, and you choose how. Approve every reply, or let routine ones go out within 60 seconds. Anything important always waits for you.",
  },
  {
    q: "Is it worth the money for a business our size?",
    a: "The call and the Operations Map are free. We only propose a build if your own numbers show at least twice the monthly cost coming back.",
  },
  {
    q: "How much of my time does it take?",
    a: "About two hours: the 30-minute call, an hour to test it before it goes live, and half an hour at the review.",
  },
  {
    q: "You're a young company. Why trust you?",
    a: "Judge us on the work. You test it yourself before a real customer sees it, and the launch date goes in your contract.",
  },
  {
    q: "Do we have to change our software? What about POPIA?",
    a: "No new software: we connect what you already use. Consent records, opt-outs and an operator agreement are part of every build.",
  },
];

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QUESTIONS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const CSS = `
.qc {
  --ink: #F2EFE9; --ink-soft: #C9C5BD; --ink-muted: #8F8B84; --ink-rgb: 242, 239, 233;
  --accent: #5B8FFF; --highlight: #6E9CFF; --hairline: rgba(242, 239, 233, 0.07);
  position: relative; background: #060B1A; color: #F2EFE9; padding: 96px 0;
}
@media (min-width: 1024px) { .qc { padding: 160px 0; } }
.qc-wrap { position: relative; z-index: 1; }
.qc-grid { display: grid; gap: 48px; }
@media (min-width: 1024px) {
  .qc-grid { grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 24px; align-items: start; }
  .qc-side { grid-column: 1 / span 4; position: sticky; top: 128px; }
  .qc-main { grid-column: 6 / span 7; }
}
.qc-h2 { margin-top: 16px; font-size: clamp(2.5rem, 1.9rem + 2.6vw, 4rem); line-height: 1.05; letter-spacing: -0.035em; color: #F2EFE9; }
.qc-line { display: none; }
.qc-wa { display: none; }
@media (min-width: 1024px) {
  .qc-h2 { margin-top: 24px; }
  .qc-line { display: block; margin-top: 32px; max-width: 34ch; font-size: 1.375rem; line-height: 1.5; letter-spacing: -0.005em; color: #C9C5BD; }
  .qc-wa {
    display: inline-flex; align-items: center; gap: 8px; min-height: 44px; margin-top: 24px;
    font-size: 1.125rem; font-weight: 600; color: #DCE6FF; text-decoration: none; cursor: pointer;
    background-image: linear-gradient(currentColor, currentColor); background-repeat: no-repeat;
    background-size: 0% 1px; background-position: 0 calc(100% - 10px);
    transition: background-size 200ms cubic-bezier(.16,1,.3,1), color 200ms;
  }
  .qc-wa:hover { background-size: 100% 1px; color: #FFFFFF; }
  .qc-wa svg { transition: transform 200ms cubic-bezier(.16,1,.3,1); }
  .qc-wa:hover svg { transform: translateX(3px); }
}
.qc-wa:focus-visible { outline: 2px solid #4D7CFF; outline-offset: 2px; border-radius: 4px; }

/* Accordion */
.qc-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(242, 239, 233, 0.1); }
.qc-item { border-bottom: 1px solid rgba(242, 239, 233, 0.1); }
.qc-h { margin: 0; font: inherit; }
.qc-btn {
  display: flex; width: 100%; min-height: 64px; align-items: center; justify-content: space-between; gap: 24px;
  padding: 16px 0; background: none; border: 0; color: #F2EFE9; text-align: left; cursor: pointer;
  transition: color 200ms;
}
.qc-btn:hover { color: #DCE6FF; }
.qc-btn:focus-visible { outline: 2px solid #4D7CFF; outline-offset: 2px; border-radius: 4px; }
.qc-q { font-family: var(--font-display); font-weight: 600; font-size: 1.125rem; line-height: 1.3; letter-spacing: -0.015em; }
.qc-glyph { position: relative; flex: none; width: 16px; height: 16px; }
.qc-glyph::before, .qc-glyph::after {
  content: ""; position: absolute; left: 0; top: 50%; width: 16px; height: 1.5px; margin-top: -0.75px;
  background: currentColor; border-radius: 1px;
}
.qc-glyph::after { transform: rotate(90deg); transition: transform 300ms cubic-bezier(.16,1,.3,1); }
.qc-item[data-open] .qc-glyph::after { transform: rotate(0deg); }
.qc-item[data-open] .qc-btn { color: #F2EFE9; }
.qc-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 300ms cubic-bezier(.16,1,.3,1); }
.qc-item[data-open] .qc-panel { grid-template-rows: 1fr; }
.qc-panel-in { min-height: 0; overflow: hidden; }
.qc-a { margin: 0; padding: 0 40px 24px 0; max-width: 64ch; font-size: 1.0625rem; line-height: 1.55; color: #C9C5BD; }
@media (min-width: 1024px) {
  .qc-btn { min-height: 72px; padding: 20px 0; }
  .qc-q { font-size: 1.375rem; }
  .qc-a { font-size: 1.125rem; }
}
@media (prefers-reduced-motion: reduce) {
  .qc-panel, .qc-glyph::after, .qc-btn, .qc-wa, .qc-wa svg { transition: none; }
}
`;

export function QuestionsChapter() {
  return (
    <section className="qc grain-dark" aria-labelledby="questions-title">
      <style>{CSS}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD).replace(/</g, "\\u003c") }}
      />

      <div className="qc-wrap container-wide">
        <div className="qc-grid">
          <div className="qc-side">
            <div data-reveal="">
              <p className="eyebrow">
                Questions
              </p>
              <h2 id="questions-title" className="h2 qc-h2">
                <SplitWords text="What owners ask us" />{" "}
                <span>
                  <SplitWords text="first" start={4} />
                </span>
                .
              </h2>
              <p className="qc-line">Straight answers. If yours isn&apos;t here, ask us.</p>
              <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="qc-wa">
                Ask us on WhatsApp instead
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="qc-main" data-reveal="" style={{ ["--reveal-delay" as string]: "0.12s" }}>
            <QuestionsAccordion items={QUESTIONS} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuestionsChapter;
