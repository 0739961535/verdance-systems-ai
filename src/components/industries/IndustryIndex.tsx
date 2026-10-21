import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { Petal } from "./Petal";

/**
 * IndustryIndex - every industry page on one grid, in buyer order: the five
 * we know best first (e-commerce, venues, lodges, builders, clinics), then
 * the rest under "Not on the list?". One plain sentence per card (the
 * problem, then what we do), and a tinted petal on each card.
 */

type Entry = { slug: string; name: string; line: string; tint: string };

const TINTS = ["#2554D4", "#3E8E7E", "#B9772E", "#7A5CC9", "#4D7CFF"];

const TOP: Entry[] = [
  { slug: "ecommerce-product-businesses", name: "E-commerce and product brands", line: "Customers ask where their order is all day. We answer from your store in 60 seconds." },
  { slug: "wedding-venues", name: "Wedding and event venues", line: "Couples enquire late at night. We reply first and book the viewing." },
  { slug: "lodges-and-venue-groups", name: "Lodges and venue groups", line: "Group and event enquiries arrive on weekends. We answer and pass each one to the right person." },
  { slug: "home-services-contractors", name: "Builders and design-build", line: "Quotes go out and nobody chases them. We follow each one up until they decide." },
  { slug: "private-clinics", name: "Self-pay clinics", line: "Reception can't answer every message. We reply, book the consult and send a reminder." },
].map((e, i) => ({ ...e, tint: TINTS[i % TINTS.length] }));

const REST: Entry[] = [
  { slug: "estate-agents", name: "Estate agencies", line: "Buyers ask on Sunday night. We reply and book the viewing." },
  { slug: "trades", name: "Trades and home services", line: "You miss the call on a job. We text back and book the visit." },
  { slug: "automotive", name: "Car dealers", line: "Leads come in on Saturday night. We reply before they go cold." },
  { slug: "real-estate-property", name: "Property and rentals", line: "Fifty people ask about one flat. We answer each one and book viewings." },
  { slug: "legal-professional-services", name: "Law and professional firms", line: "New clients email after hours. We reply and book the first meeting." },
  { slug: "medical-wellness", name: "Medical and wellness", line: "The phones never stop. We answer, book and remind patients." },
  { slug: "beauty-aesthetics", name: "Beauty and aesthetics", line: "Messages pile up while you're with a client. We reply and book them in." },
  { slug: "fitness-gyms", name: "Fitness and gyms", line: "People ask about joining, then never come in. We answer and book a first visit." },
  { slug: "restaurants-hospitality", name: "Restaurants", line: "Booking requests sit in the inbox during service. We reply and confirm the table." },
  { slug: "education-coaching", name: "Education and coaching", line: "Parents ask the same questions every week. We answer and book the open day." },
].map((e, i) => ({ ...e, tint: TINTS[(i + 2) % TINTS.length] }));

function Card({ e, big = false, row = false }: { e: Entry; big?: boolean; row?: boolean }) {
  return (
    <Link href={`/industries/${e.slug}`} className={`card-x ix-card ii-card group ${big ? "is-big" : ""} ${row ? "is-row" : ""}`}>
      <Petal tint={e.tint} size={big ? 52 : 40} />
      <div className="ii-body">
        <h3 className="ii-name">{e.name}</h3>
        <p className="ii-line">{e.line}</p>
      </div>
      <ArrowRight size={16} aria-hidden className="ii-arrow" />
      <span className="ii-go">
        See how
        <ArrowRight size={15} aria-hidden className="nudge" />
      </span>
    </Link>
  );
}

export function IndustryIndex() {
  return (
    <section className="section-pad bg-canvas-2" aria-labelledby="ii-title" style={{ borderTop: "1px solid var(--hairline)" }}>
      <style>{CSS}</style>
      <div className="container-wide">
        <Reveal className="ii-head">
          <p className="eyebrow">Where we start</p>
          <h2 id="ii-title" className="h2 mt-5">
            The businesses <span className="italic-accent">we know best.</span>
          </h2>
        </Reveal>

        <ul className="ii-top">
          {TOP.map((e, i) => (
            <li key={e.slug} className={i === 0 ? "ii-first" : undefined}>
              <Reveal delay={Math.min(i * 0.05, 0.2)} className="h-full">
                <Card e={e} big={i === 0} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="ii-more">
          <Reveal>
            <h2 id="more-title" className="ii-h3">
              Not on the list? <span className="italic-accent">We still build it.</span>
            </h2>
            <p className="ii-intro">The same system works for most businesses that run on enquiries.</p>
          </Reveal>
          <ul className="ii-rest">
            {REST.map((e, i) => (
              <li key={e.slug}>
                <Reveal delay={Math.min(i * 0.04, 0.24)} className="h-full">
                  <Card e={e} row />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.ii-head { max-width: 44rem; }
.ii-top { margin-top: 40px; display: grid; gap: 16px; }
.ii-rest { margin-top: 28px; display: grid; gap: 12px; }
@media (min-width: 640px) { .ii-top, .ii-rest { grid-template-columns: repeat(2, minmax(0, 1fr)); } .ii-first { grid-column: span 2; } }
@media (min-width: 1024px) {
  .ii-top { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 56px; }
  .ii-first { grid-column: span 2; }
  .ii-rest { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (min-width: 1280px) { .ii-rest { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
.ii-card { display: flex; height: 100%; flex-direction: column; padding: 24px; }
.ii-card.is-big { padding: 28px 28px 24px; }
.ii-name { margin-top: 18px; font-family: var(--font-display); font-weight: 500; font-size: 1.2rem; line-height: 1.2; letter-spacing: -0.02em; color: var(--color-ink); }
.is-big .ii-name { font-size: clamp(1.5rem, 1vw + 1.2rem, 2rem); }
.ii-body { display: flex; flex: 1; flex-direction: column; }
.ii-arrow { display: none; }
.ii-line { display: block; margin-top: 8px; flex: 1; font-size: 0.975rem; line-height: 1.55; color: var(--color-ink-soft); }
.is-big .ii-line { font-size: 1.0625rem; max-width: 32rem; }
.ii-go { margin-top: 16px; display: inline-flex; min-height: 44px; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 500; color: var(--color-ink); transition: color 0.2s; }
.ii-card:hover .ii-go, .ii-card:focus-visible .ii-go { color: var(--color-accent); }
.ii-rest .ii-card { padding: 20px; }
.ii-rest .ii-name { font-size: 1.05rem; margin-top: 14px; }
.ii-rest .ii-line { font-size: 0.925rem; }
.ii-more { margin-top: 72px; }
.ii-h3 { font-family: var(--font-display); font-weight: 500; font-size: clamp(1.75rem, 1.6vw + 1.2rem, 2.6rem); line-height: 1.08; letter-spacing: -0.035em; color: var(--color-ink); }
.ii-intro { margin-top: 12px; max-width: 34rem; font-size: 1.0625rem; line-height: 1.6; color: var(--color-ink-soft); }
@media (max-width: 639px) {
  .ii-rest .is-row { flex-direction: row; align-items: center; gap: 14px; padding: 14px 16px; }
  .ii-rest .is-row .ii-name { margin-top: 0; }
  .ii-rest .is-row .ii-line { margin-top: 4px; }
  .ii-rest .is-row .ii-go { display: none; }
  .ii-rest .is-row .ii-arrow { display: block; flex: none; color: var(--color-ink-muted); }
  .ii-rest { gap: 10px; }
}
`;
