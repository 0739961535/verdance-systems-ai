/**
 * Chapter 13, Who we are: who is behind Verdance and what happens on the
 * free call, right before the booking flow. A paper band, portrait free
 * (an initials monogram), no prices.
 */

const CSS = `
.who { padding: 96px 0; }
@media (min-width: 1024px) { .who { padding: 160px 0; } }
.who-grid { display: grid; gap: 48px; }
@media (min-width: 1024px) {
  .who-grid { grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 24px; align-items: start; }
  .who-side { grid-column: 1 / span 5; }
  .who-main { grid-column: 7 / span 6; }
}
.who-h2 { margin-top: 16px; }
.who-card {
  display: flex; align-items: center; gap: 16px; margin-top: 32px; padding: 16px; max-width: 26rem;
  border-radius: 18px; border: 1px solid var(--hairline-2); background: rgba(255,255,255,0.5);
}
.who-mono {
  flex: none; display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 999px;
  background: #0A1226; color: #F2F5FC; font-family: var(--font-serif); font-style: italic; font-size: 1.5rem; letter-spacing: -0.02em;
  box-shadow: inset 0 0 0 1px rgba(143,176,255,0.35);
}
.who-name { font-weight: 600; font-size: 1.0625rem; color: var(--color-ink); }
.who-role { margin-top: 2px; font-size: 0.9375rem; color: var(--color-ink-muted); }
.who-p { margin: 0; font-size: 1.125rem; line-height: 1.6; color: var(--color-ink-soft); max-width: 52ch; }
.who-p + .who-p { margin-top: 16px; }
.who-sub { margin: 40px 0 0; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); }
.who-list { list-style: none; margin: 16px 0 0; padding: 0; border-top: 1px solid var(--hairline-2); }
.who-list li { display: grid; grid-template-columns: 40px 1fr; gap: 8px; padding: 18px 0; border-bottom: 1px solid var(--hairline-2); font-size: 1.0625rem; line-height: 1.5; color: var(--color-ink); }
.who-list span { font-size: 0.8125rem; font-weight: 600; color: var(--color-accent); font-variant-numeric: tabular-nums; padding-top: 3px; }
.who-note { margin-top: 20px; }
@media (min-width: 1024px) { .who-p { font-size: 1.25rem; } }
`;

const CALL = [
  "Thirty minutes on a video call, at a time that suits you.",
  "We map how enquiries, follow-ups and admin run today, including response and onboarding times.",
  "We show where time and revenue leak, in hours and rand.",
  "If we are not the right fit, we say so plainly. You keep what we found either way.",
];

export function WhoWeAre() {
  return (
    <section className="who band-paper" aria-labelledby="who-title">
      <style>{CSS}</style>
      <div className="container-wide">
        <div className="who-grid">
          <div className="who-side" data-reveal="">
            <p className="eyebrow">
              <span className="chap-n">10</span> Who we are
            </p>
            <h2 id="who-title" className="h2 who-h2">
              Who we are, and <span>how</span> we work.
            </h2>
            <div className="who-card">
              <span className="who-mono" aria-hidden>
                DB
              </span>
              <div>
                <div className="who-name">Daniel Bouwer, 20</div>
                <div className="who-role">Founder, Verdance Systems AI</div>
              </div>
            </div>
          </div>

          <div className="who-main" data-reveal="" style={{ ["--reveal-delay" as string]: "0.12s" }}>
            <p className="who-p">
              Verdance builds AI systems for owner-led businesses. They answer your customers, follow up and run
              the admin, connected to the CRM (customer records), inbox and calendar you already use.
            </p>
            <p className="who-p">
              We keep it small on purpose. You deal with the people who build your system, and you stay in control of
              everything it sends.
            </p>

            <p className="who-sub">What happens on the call</p>
            <ol className="who-list">
              {CALL.map((line, i) => (
                <li key={line}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {line}
                </li>
              ))}
            </ol>
            <p className="museum who-note">The call is free, and there is nothing to sign.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
