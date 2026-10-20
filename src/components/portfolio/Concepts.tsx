import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_CSS } from "./styles";
import { AskScreen, LodgeFlow, VenueChat } from "./conceptVisuals";

/**
 * The concepts strip at the foot of /portfolio: ideas we built to show what
 * is possible, each clearly labelled Concept. Made-up businesses and data.
 */

const CONCEPTS = [
  {
    id: "concept-ask",
    name: "Ask your business",
    outcome: "The owner of a made-up activewear brand asks a question and gets the answer from their own tools.",
    tag: "System",
    href: "/services/custom-builds",
    visual: <AskScreen />,
    warm: false,
  },
  {
    id: "concept-venue",
    name: "Venue enquiry assistant",
    outcome: "A wedding enquiry at 21:42 becomes a booked viewing before bedtime.",
    tag: "Assistant",
    href: "/services/conversation-ai",
    visual: <VenueChat />,
    warm: false,
  },
  {
    id: "concept-lodge",
    name: "Safari lodge enquiries",
    outcome: "Overnight enquiries from abroad answered, followed up and handed to reservations.",
    tag: "Automation",
    href: "/services/follow-up-nurture",
    visual: <LodgeFlow />,
    warm: true,
  },
];

const EXTRA = `
@media (min-width: 1024px) { .pf-grid.is-three { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.pf-grid.is-three .pf-vis { aspect-ratio: 1 / 1; }
@media (min-width: 768px) { .pf-grid.is-three .pf-vis { aspect-ratio: 5 / 4; } }
.band-orbit .pf-tile { background: #101C3D; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08); }
.band-orbit .pf-tile:hover { box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16), 0 30px 60px -34px rgba(0,0,0,0.6); }
.band-orbit .pf-tag { color: #B9CCFF; background: rgba(77,124,255,0.14); box-shadow: inset 0 0 0 1px rgba(143,176,255,0.3); }
.band-orbit .pf-go { color: #8FB0FF; }
.band-orbit .pf-tile:has(.pf-go:focus-visible) { box-shadow: 0 0 0 2px #8FB0FF; }
.band-orbit .pf-vis { background: radial-gradient(120% 90% at 85% 0%, rgba(77,124,255,0.22), rgba(77,124,255,0) 60%), #0A1226; }
.band-orbit .pf-vis.is-warm { background: radial-gradient(120% 90% at 85% 0%, rgba(214,170,98,0.24), rgba(214,170,98,0) 60%), #0A1226; }
`;

export function Concepts() {
  return (
    <section className="band-orbit chapter-pad" aria-labelledby="concepts-title">
      <style>{PORTFOLIO_CSS + EXTRA}</style>
      <div className="container-wide">
        <div className="max-w-3xl" data-reveal="">
          <p className="eyebrow">
            <span className="chap-n">Concepts</span>
          </p>
          <h2 id="concepts-title" className="h2 mt-4">
            Ideas we built to show what is possible.
          </h2>
          <p className="lead mt-6">Made-up businesses and sample data. Each one could run for you.</p>
        </div>
        <ul className="pf-grid is-three mt-10 lg:mt-14" data-reveal="" aria-label="Concepts">
          {CONCEPTS.map((c) => (
            <li key={c.id}>
              <article className="pf-tile" aria-labelledby={`${c.id}-name`}>
                <div className={`pf-vis ${c.warm ? "is-warm" : ""}`}>{c.visual}</div>
                <div className="pf-text">
                  <p className="pf-meta">
                    <span className="pf-tag">{c.tag}</span>
                    <span className="pf-label">Concept</span>
                  </p>
                  <h3 id={`${c.id}-name`} className="pf-name">
                    {c.name}
                  </h3>
                  <p className="pf-out">{c.outcome}</p>
                  <Link href={c.href} className="pf-go" aria-label={`How it works: ${c.name}`}>
                    How it works
                    <ArrowRight size={16} className="pf-go-arrow" aria-hidden />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
