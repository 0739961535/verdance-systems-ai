/**
 * Our belief: straight after "We don't talk about AI. We ship it." A calm,
 * editorial page on the light ground: one statement, one paragraph and four
 * principles, each marked with a small blue bloom glyph of our own.
 */

const PRINCIPLES = [
  {
    t: "Built around your idea",
    b: "We start from your business, not a template. Every system is shaped around how you sell, serve and deliver.",
  },
  {
    t: "A team of specialist agents",
    b: "Each job gets its own agent: one answers, one follows up, one does the admin, one reports. They work together, and a person stays in charge.",
  },
  {
    t: "Built and run in-house",
    b: "Assistants, automations, websites, reports and custom agents, designed, built and looked after by Verdance.",
  },
  {
    t: "Measured in results",
    b: "Faster first responses, more booked work, fewer hours lost. Every build reports what it returned.",
  },
];

/** Five soft petals around a bright heart, drawn small. */
function BloomMark() {
  return (
    <svg viewBox="-20 -20 40 40" width="28" height="28" aria-hidden className="ob-mark">
      <defs>
        <radialGradient id="ob-petal" cx="0" cy="-6" r="14" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#DCE6FF" />
          <stop offset="0.55" stopColor="#7FA3FF" />
          <stop offset="1" stopColor="#2554D4" />
        </radialGradient>
      </defs>
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0 0 C 6 -4, 6 -13, 0 -17 C -6 -13, -6 -4, 0 0 Z" fill="url(#ob-petal)" />
      ))}
      <circle r="3" fill="#F2F5FC" />
    </svg>
  );
}

export function OurBelief() {
  return (
    <section id="belief" className="ob" aria-labelledby="ob-title" style={{ scrollMarginTop: "5rem" }}>
      <style>{CSS}</style>
      <div className="container-wide ob-grid">
        <div className="ob-head" data-reveal="">
          <p className="eyebrow">Our belief</p>
          <h2 id="ob-title" className="ob-h">
            AI is a tool. What matters is <span className="italic-accent">whose hands</span> it&apos;s in.
          </h2>
        </div>
        <p className="ob-body" data-reveal="" style={{ ["--reveal-delay" as string]: "0.08s" }}>
          AI has no judgement of its own. It can&apos;t tell a good reply from a costly one. It has never run a business, earned a
          customer&apos;s trust or carried the risk of a bad month. So we never hand your business to a model and walk away. We build
          around how you work, test it on your real enquiries, and keep a person in charge of what matters. In the right hands, AI
          stops being a tool. It starts running part of your business.
        </p>
        <ul className="ob-list">
          {PRINCIPLES.map((p, i) => (
            <li key={p.t} data-reveal="" style={{ ["--reveal-delay" as string]: `${0.06 * i}s` }}>
              <BloomMark />
              <h3 className="ob-t">{p.t}</h3>
              <p className="ob-b">{p.b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const CSS = `
.ob { background: var(--bg); color: var(--color-ink); padding: clamp(96px, 14vh, 168px) 0 clamp(112px, 16vh, 200px); }
.ob-grid { display: grid; gap: 40px; }
@media (min-width: 1024px) { .ob-grid { grid-template-columns: 5fr 6fr; column-gap: 96px; row-gap: 72px; align-items: start; } }
.ob-h { margin: 16px 0 0; font-family: var(--font-display); font-weight: 600; font-size: clamp(2.1rem, 2.8vw + 1rem, 4rem); line-height: 1.02; letter-spacing: -0.035em; text-wrap: balance; max-width: 16ch; }
.ob-body { margin: 0; font-size: clamp(1.05rem, 0.4vw + 0.95rem, 1.25rem); line-height: 1.65; color: var(--color-ink-soft); max-width: 46ch; text-wrap: pretty; }
@media (min-width: 1024px) { .ob-body { padding-top: 44px; } }
.ob-list { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 0; border-top: 1px solid var(--hairline-2); }
@media (min-width: 768px) { .ob-list { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .ob-list { grid-column: 1 / -1; margin-top: 24px; } }
.ob-list li { padding: 32px 0; border-bottom: 1px solid var(--hairline-2); }
@media (min-width: 768px) { .ob-list li { padding: 40px 40px 40px 0; } .ob-list li:nth-child(even) { padding: 40px 0 40px 40px; border-left: 1px solid var(--hairline-2); } }
.ob-mark { display: block; filter: drop-shadow(0 4px 10px rgba(77, 124, 255, 0.25)); }
.ob-t { margin: 16px 0 0; font-family: var(--font-display); font-weight: 600; font-size: 1.375rem; letter-spacing: -0.02em; }
.ob-b { margin: 8px 0 0; font-size: 1.0625rem; line-height: 1.6; color: var(--color-ink-soft); max-width: 40ch; }
`;
