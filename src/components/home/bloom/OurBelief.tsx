import { BarChart3, Sprout, Users, Wrench, type LucideIcon } from "lucide-react";

/**
 * Our belief (used on /how-it-works): one large quote on the light ground,
 * then the four principles as a compact icon row. Static, server-rendered;
 * the shared reveal fades each part in.
 */

const PRINCIPLES: { t: string; b: string; Icon: LucideIcon }[] = [
  { t: "Built around your business", b: "Shaped to how you sell and serve.", Icon: Sprout },
  { t: "A team of AI helpers", b: "Each job gets its own helper.", Icon: Users },
  { t: "Built and run by us", b: "Designed, built and looked after by Verdance.", Icon: Wrench },
  { t: "Measured in results", b: "Every build reports what it brought back.", Icon: BarChart3 },
];

export function OurBelief() {
  return (
    <section id="belief" className="ob" aria-labelledby="ob-title" style={{ scrollMarginTop: "5rem" }}>
      <style>{CSS}</style>
      <div className="container-wide">
        <p className="eyebrow" data-reveal="">
          Our belief
        </p>
        <figure className="ob-fig" data-reveal="" style={{ ["--reveal-delay" as string]: "0.06s" }}>
          <blockquote>
            <h2 id="ob-title" className="ob-q">
              AI is a tool. It has never run a business or earned a customer&apos;s trust. So we never switch it on and walk away.{" "}
              <span className="ob-q-soft">
                We build it around how you work, test it on your real enquiries and keep a{" "}
                <span className="italic-accent">person in charge.</span>
              </span>
            </h2>
          </blockquote>
        </figure>
        <ul className="ob-row">
          {PRINCIPLES.map(({ t, b, Icon }, i) => (
            <li key={t} data-reveal="" style={{ ["--reveal-delay" as string]: `${0.05 * i}s` }}>
              <span className="ob-ic" aria-hidden>
                <Icon strokeWidth={1.5} />
              </span>
              <span>
                <span className="ob-t">{t}</span>
                <span className="ob-b">{b}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const CSS = `
.ob { background: var(--bg); color: var(--color-ink); padding: clamp(88px, 13vh, 160px) 0 clamp(88px, 13vh, 160px); }
.ob-fig { margin: 20px 0 0; }
.ob-fig blockquote { margin: 0; }
.ob-q {
  margin: 0; max-width: 24ch; font-family: var(--font-display); font-weight: 600;
  font-size: clamp(1.9rem, 2.6vw + 1rem, 3.6rem); line-height: 1.08; letter-spacing: -0.03em; text-wrap: pretty;
}
@media (min-width: 1024px) { .ob-q { max-width: 26ch; } }
.ob-q-soft { color: var(--color-ink-soft); }
.ob-row { list-style: none; margin: 56px 0 0; padding: 24px 0 0; display: grid; gap: 20px; border-top: 1px solid var(--hairline-2); }
@media (min-width: 640px) { .ob-row { grid-template-columns: 1fr 1fr; gap: 24px 32px; } }
@media (min-width: 1024px) { .ob-row { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 80px; padding-top: 32px; } }
.ob-row li { display: flex; gap: 14px; align-items: flex-start; }
.ob-ic {
  flex: none; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px;
  color: var(--color-accent); background: rgba(var(--accent-rgb), 0.08); box-shadow: inset 0 0 0 1px rgba(var(--accent-rgb), 0.22);
}
.ob-ic svg { width: 20px; height: 20px; }
.ob-t { display: block; font-weight: 600; font-size: 1rem; line-height: 1.3; letter-spacing: -0.01em; }
.ob-b { display: block; margin-top: 4px; font-size: 0.9375rem; line-height: 1.45; color: var(--color-ink-soft); }
`;
