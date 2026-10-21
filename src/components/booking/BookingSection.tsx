import { SITE } from "@/data/site";
import { FounderPortrait } from "@/components/brand/FounderPortrait";
import { BookingFlow } from "./BookingFlow";

/**
 * Book: who you will speak to and what happens on the call, beside the
 * booking card (calendar first). id="book" is where every "Book a free
 * 30-minute call" link lands on the page (see BookingFlow).
 * Used as the last section of the home page and as the /book page (as="page"
 * renders the heading as the page's h1 and loads the calendar at once).
 * The portrait is a placeholder until Daniel's real photo is set in
 * src/data/founder.ts.
 */

const CSS = `
.bks { padding: 96px 0; }
.bks.is-page { padding: 120px 0 96px; }
@media (min-width: 1024px) { .bks { padding: 160px 0; } .bks.is-page { padding: 160px 0 128px; } }
/* Phone: heading, then the calendar, then who and what. Desktop: heading
   and who on the left, the card on the right. */
.bks-grid { display: grid; gap: 32px; grid-template-areas: "head" "main" "side"; }
.bks-grid > * { min-width: 0; }
.bks-head { grid-area: head; }
.bks-main { grid-area: main; }
.bks-side { grid-area: side; margin-top: 16px; }
@media (min-width: 1024px) {
  .bks-grid { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); column-gap: 64px; row-gap: 0; grid-template-areas: "head main" "side main"; align-items: start; }
  .bks-side { margin-top: 0; }
  .bks-main { position: sticky; top: 96px; }
}
.bks-h { margin-top: 16px; }
.bks-lead { margin-top: 20px; }
.bks-who { display: grid; gap: 20px; margin-top: 40px; }
.bks-side .bks-who:first-child { margin-top: 0; }
@media (min-width: 1024px) { .bks-side .bks-who:first-child { margin-top: 40px; } }
@media (min-width: 640px) { .bks-who { grid-template-columns: 9.5rem 1fr; gap: 24px; align-items: start; } }
.bks-who .fp-portrait { max-width: 9.5rem; }
.bks-who .fp-portrait figcaption { display: none; }
.bks-who-n { font-weight: 600; font-size: 1.0625rem; color: var(--color-ink); }
.bks-who-r { margin-top: 2px; font-size: 0.9375rem; color: var(--color-ink-muted); }
.bks-who-p { margin: 12px 0 0; font-size: 1.0625rem; line-height: 1.6; color: var(--color-ink-soft); max-width: 46ch; }
.bks-sub { margin: 40px 0 0; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #8FB0FF; }
.bks-list { list-style: none; margin: 14px 0 0; padding: 0; border-top: 1px solid var(--hairline-2); }
.bks-list li { display: grid; grid-template-columns: 36px 1fr; gap: 8px; padding: 16px 0; border-bottom: 1px solid var(--hairline-2); font-size: 1.0625rem; line-height: 1.5; color: var(--color-ink); }
.bks-list span { font-size: 0.8125rem; font-weight: 600; color: #8FB0FF; font-variant-numeric: tabular-nums; padding-top: 3px; }
.bks-wa { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; margin-top: 24px; font-size: 1rem; font-weight: 600; color: #DCE6FF; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: rgba(143,176,255,0.4); }
.bks-wa:hover { color: #FFFFFF; }
.bks-direct { margin-top: 8px; font-size: 0.9375rem; color: var(--color-ink-muted); }
.bks-direct a { color: var(--color-ink-soft); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--hairline-3); }
`;

const CALL = [
  "We look at how enquiries, follow-ups and admin run in your business today.",
  "We show you where time and money leak, in hours and money.",
  "We tell you what we would build first, and what it should bring back.",
  "If we are not the right fit, we say so plainly. You keep what we found either way.",
];

export function BookingSection({ as = "section" }: { as?: "section" | "page" }) {
  const Title = as === "page" ? "h1" : "h2";
  return (
    <section id="book" className={`bks band-night ${as === "page" ? "is-page" : ""}`} aria-labelledby="book-title" style={{ scrollMarginTop: "4.5rem" }}>
      <style>{CSS}</style>
      <div className="container-wide">
        <div className="bks-grid">
          <div className="bks-head" data-reveal="">
            <p className="eyebrow">{as === "section" ? <></> : null}Book a call</p>
            <Title id="book-title" className="h2 bks-h">
              Thirty minutes on your business.
            </Title>
            <p className="lead bks-lead">A working session on your numbers, not a pitch deck. Free, and nothing to sign.</p>
          </div>
          <div className="bks-side" data-reveal="">

            <div className="bks-who">
              <FounderPortrait size="portrait" />
              <div>
                <div className="bks-who-n">You speak with Daniel Bouwer</div>
                <div className="bks-who-r">Founder, Verdance Systems AI</div>
                <p className="bks-who-p">
                  Verdance builds AI systems for owner-led businesses. They answer your customers, follow up and do the
                  admin, on the tools you already use. The person on the call is the person who designs your build.
                </p>
              </div>
            </div>

            <p className="bks-sub">What happens on the call</p>
            <ol className="bks-list">
              {CALL.map((line, i) => (
                <li key={line}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {line}
                </li>
              ))}
            </ol>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="bks-wa">
              Rather talk first? WhatsApp us
            </a>
            <p className="bks-direct">
              Or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
          <div className="bks-main">
            <BookingFlow page={as === "page" ? "book" : "home"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingSection;
