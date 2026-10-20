import { Reveal, SplitWords } from "@/components/primitives/Reveal";

/**
 * "What you do": the short list of what is asked of the owner, on a night
 * band with hairline rows in the home page's rhythm. Server component.
 */

const ROWS: [string, string, string][] = [
  ["01", "You don't need to be technical", "You never touch the system. It answers, books and tells you what it did."],
  ["02", "You don't change how you work", "It fits around your diary, your channels and your team."],
  ["03", "You decide on anything unusual", "Custom requests, complaints and pricing go straight to a person."],
  ["04", "You own all of it", "Everything is set up in your name, in your accounts, from day one."],
];

const CSS = `
.hy-list { list-style: none; margin: 48px 0 0; padding: 0; border-top: 1px solid var(--hairline-2); }
.hy-row { display: grid; grid-template-columns: 40px 1fr; gap: 4px 12px; padding: 24px 0; border-bottom: 1px solid var(--hairline-2); }
.hy-n { grid-row: span 2; padding-top: 4px; font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.06em; color: #8FB0FF; font-variant-numeric: tabular-nums; }
.hy-t { font-family: var(--font-display); font-size: 1.375rem; font-weight: 600; line-height: 1.2; letter-spacing: -0.025em; color: var(--ink); }
.hy-b { font-size: 1.0625rem; line-height: 1.55; color: var(--ink-soft); max-width: 46ch; }
@media (min-width: 1024px) {
  .hy-wrap { display: grid; grid-template-columns: 5fr 7fr; column-gap: 64px; align-items: start; }
  .hy-list { margin-top: 0; }
  .hy-row { grid-template-columns: 56px 1fr; padding: 32px 0; }
  .hy-t { font-size: 1.75rem; }
}
`;

export function HowYouDo() {
  return (
    <section className="band-night chapter-pad" aria-labelledby="you-title">
      <style>{CSS}</style>
      <div className="container-wide hy-wrap">
        <Reveal variant="wipe">
          <p className="eyebrow">
            <span className="chap-n">02</span> What you do
          </p>
          <h2 id="you-title" className="h2 mt-4">
            <SplitWords text="Answer a few questions." />{" "}
            <span>
              <SplitWords text="Then get on with your day." start={4} />
            </span>
          </h2>
        </Reveal>
        <ul className="hy-list">
          {ROWS.map(([n, t, b], i) => (
            <Reveal as="li" key={n} className="hy-row" delay={i * 0.06}>
              <span className="hy-n">{n}</span>
              <span className="hy-t">{t}</span>
              <span className="hy-b">{b}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
