import { SITE } from "@/data/site";
import { BookingFlow } from "./BookingFlow";

/**
 * Chapter 14, Book: the booking flow on the page, beside one calm line on
 * what it asks and why. id="book" is where every "Book a free 30-minute
 * call" link on the home page lands (see BookingFlow).
 */

const CSS = `
.bks { padding: 96px 0; }
@media (min-width: 1024px) { .bks { padding: 160px 0; } }
.bks-grid { display: grid; gap: 40px; }
.bks-grid > * { min-width: 0; }
@media (min-width: 1024px) {
  .bks-grid { grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 24px; align-items: start; }
  .bks-side { grid-column: 1 / span 5; position: sticky; top: 128px; }
  .bks-main { grid-column: 7 / span 6; }
}
.bks-h2 { margin-top: 16px; }
.bks-lead { margin-top: 20px; }
.bks-facts { list-style: none; margin: 28px 0 0; padding: 0; border-top: 1px solid var(--hairline-2); max-width: 26rem; }
.bks-facts li { display: flex; justify-content: space-between; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--hairline-2); font-size: 1rem; color: var(--color-ink-soft); }
.bks-facts b { font-weight: 600; color: var(--color-ink); font-variant-numeric: tabular-nums; text-align: right; }
.bks-wa { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; margin-top: 20px; font-size: 1rem; font-weight: 600; color: #DCE6FF; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: rgba(143,176,255,0.4); }
.bks-wa:hover { color: #FFFFFF; }
`;

export function BookingSection() {
  return (
    <section id="book" className="bks band-orbit" aria-labelledby="book-title" style={{ scrollMarginTop: "4.5rem" }}>
      <style>{CSS}</style>
      <div className="container-wide">
        <div className="bks-grid">
          <div className="bks-side" data-reveal="">
            <p className="eyebrow">
              <span className="chap-n">14</span> Book
            </p>
            <h2 id="book-title" className="h2 bks-h2">
              Book your <span>call</span>.
            </h2>
            <p className="lead bks-lead">
              Seven quick taps about your business, your details, then a time. About two minutes, and the call starts on
              your numbers, not on forms.
            </p>
            <ul className="bks-facts">
              <li>
                Length <b>30 minutes</b>
              </li>
              <li>
                Where <b>Video call</b>
              </li>
              <li>
                Cost <b>Free, nothing to sign</b>
              </li>
              <li>
                Times <b>South African time</b>
              </li>
            </ul>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="bks-wa">
              Rather talk first? WhatsApp us
            </a>
          </div>
          <div className="bks-main">
            <BookingFlow />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingSection;
