import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * /services: the four jobs as the usual first phase, not the whole offer,
 * then the line that introduces the service index below it.
 */

const JOBS = [
  { n: "01", word: "Answer", body: "Every enquiry answered within 60 seconds, in your voice, day or night.", href: "/services/conversation-ai" },
  { n: "02", word: "Follow up", body: "Quiet quotes and enquiries get a timed check-in that stops when they reply.", href: "/services/follow-up-nurture" },
  { n: "03", word: "Admin", body: "Bookings, notes and reminders done, so nobody types the same details twice.", href: "/services/booking-calendar" },
  { n: "04", word: "Report", body: "A short brief in plain words: what came in, how fast, and what to fix next.", href: "/services/analytics-compliance" },
] as const;

const CSS = `
.ssp-grid { display: grid; gap: 12px; margin-top: 48px; }
@media (min-width: 640px) { .ssp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .ssp-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 64px; } }
.ssp-card { display: flex; flex-direction: column; height: 100%; border-radius: 18px; padding: 24px; background: #0A1226; border: 1px solid rgba(255, 255, 255, 0.08); }
.ssp-card:focus-visible { outline: 2px solid #8FB0FF; outline-offset: 3px; }
.ssp-card:active { transform: scale(0.99); }
.ssp-n { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.8rem; color: #8FB0FF; }
.ssp-word { margin-top: 18px; font-family: var(--font-display); font-size: clamp(1.9rem, 1vw + 1.5rem, 2.4rem); line-height: 1; letter-spacing: -0.035em; color: #F2F5FC; }
.ssp-body { margin-top: 12px; font-size: 1rem; line-height: 1.55; color: rgba(234, 240, 255, 0.72); flex: 1; }
.ssp-link { margin-top: 18px; display: inline-flex; min-height: 44px; align-items: center; gap: 6px; font-weight: 500; color: #8FB0FF; }
.ssp-link svg { transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.ssp-card:hover .ssp-link svg { transform: translate3d(4px, 0, 0); }
.ssp-custom { margin-top: 96px; padding-top: 48px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: grid; gap: 16px; }
@media (min-width: 1024px) { .ssp-custom { margin-top: 128px; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: end; gap: 48px; } }
`;

export function ServicesStartingPoint() {
  return (
    <section className="band-orbit chapter-pad" aria-labelledby="start-title">
      <style>{CSS}</style>
      <div className="container-wide">
        <div className="max-w-3xl" data-reveal="">
          <p className="eyebrow">Where most businesses start</p>
          <h2 id="start-title" className="h2 mt-4">
            Four jobs first. <span className="italic-accent">Then we grow it.</span>
          </h2>
          <p className="lead mt-6">
            Most teams hand over these four first. Each next phase starts once the last one has shown its worth in your own numbers.
          </p>
        </div>
        <ul className="ssp-grid">
          {JOBS.map((j) => (
            <li key={j.word}>
              <Link href={j.href} className="ssp-card ix-card" aria-label={`${j.word}: how it works`}>
                <span className="ssp-n" aria-hidden>
                  {j.n}
                </span>
                <span className="ssp-word">{j.word}</span>
                <span className="ssp-body">{j.body}</span>
                <span className="ssp-link">
                  How it works
                  <ArrowRight size={16} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="ssp-custom" data-reveal="">
          <h2 className="h2" id="custom-title">
            Every build is custom.
          </h2>
          <p className="lead">These are the parts we use most: twelve services in four groups, put together around how your business runs.</p>
        </div>
      </div>
    </section>
  );
}
