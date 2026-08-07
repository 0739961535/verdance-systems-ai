import { Reveal } from "@/components/primitives/Reveal";
import { DELTAS, DELTAS_FOOTNOTE } from "@/data/landing";

/**
 * DeltaRows - before/after telemetry, the testimonial replacement.
 * Before-values are muted strikethrough (calm, not alarmist red);
 * after-values are large mono with the signal accent.
 */
export function DeltaRows() {
  return (
    <section className="section-pad" style={{ background: "var(--bg-2)" }} aria-labelledby="deltas-title">
      <div className="container-narrow">
        <Reveal>
          <span className="eyebrow">What changes</span>
          <h2
            id="deltas-title"
            className="font-display text-[color:var(--color-ink)] mt-4 max-w-[20ch]"
            style={{ fontSize: "clamp(1.9rem, 3.2vw + 1.2rem, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
          >
            The same business, <span className="italic-accent">running</span> differently.
          </h2>
        </Reveal>

        <div className="mt-10 md:mt-14">
          {DELTAS.map((d, i) => (
            <Reveal key={d.label} delay={i * 0.06}>
              <div
                className="grid gap-1 py-5 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6"
                style={{ borderBottom: "1px solid var(--hairline)", borderTop: i === 0 ? "1px solid var(--hairline)" : undefined }}
              >
                <span className="text-[color:var(--color-ink-soft)]">{d.label}</span>
                <span className="flex items-baseline gap-3 md:justify-end">
                  <span
                    className="font-mono text-[0.85rem] text-[color:var(--color-ink-muted)] line-through"
                    style={{ textDecorationColor: "var(--hairline-3)" }}
                  >
                    {d.before}
                  </span>
                  <span aria-hidden className="text-[color:var(--color-accent)]">→</span>
                  <span
                    className="font-mono text-[color:var(--color-ink)]"
                    style={{
                      fontSize: "clamp(1.1rem, 1.2vw + 0.9rem, 1.6rem)",
                      fontVariantNumeric: "tabular-nums",
                      textShadow: "0 0 24px var(--signal-dim)",
                    }}
                  >
                    {d.after}
                  </span>
                  <span className="sr-only">{`improved from ${d.before} to ${d.after}`}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-5 font-mono text-[0.62rem] tracking-[0.08em] text-[color:var(--color-ink-faint)]">
            {DELTAS_FOOTNOTE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
