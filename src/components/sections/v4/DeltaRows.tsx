import type { ReactNode } from "react";
import { Reveal } from "@/components/primitives/Reveal";
import { DELTAS, DELTAS_FOOTNOTE } from "@/data/landing";

/**
 * DeltaRows - before/after telemetry, the testimonial replacement.
 * Before-values are muted strikethrough (calm, not alarmist red);
 * after-values are large mono with the signal accent.
 */
interface DeltaRowsProps {
  eyebrow?: string;
  title?: ReactNode;
  intro?: string;
  deltas?: { label: string; before: string; after: string }[];
  footnote?: string;
}

export function DeltaRows({
  eyebrow = "The result",
  title,
  intro = "Before and after, in the numbers that decide whether a lead becomes a customer.",
  deltas = DELTAS,
  footnote = DELTAS_FOOTNOTE,
}: DeltaRowsProps = {}) {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="deltas-title">
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="deltas-title"
            className="h2 mt-5 max-w-[22ch]"
          >
            {title ?? (
              <>
                What changes when your systems <span className="italic-accent">go live</span>.
              </>
            )}
          </h2>
          <p className="mt-5 max-w-xl text-[color:var(--color-ink-soft)]" style={{ lineHeight: 1.6 }}>
            {intro}
          </p>
        </Reveal>

        <div className="mt-10 md:mt-14">
          {deltas.map((d, i) => (
            <Reveal key={d.label} delay={i * 0.06}>
              <div
                className="grid gap-1 py-5 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6"
                style={{ borderBottom: "1px solid var(--hairline)", borderTop: i === 0 ? "1px solid var(--hairline)" : undefined }}
              >
                <span className="text-[color:var(--color-ink-soft)]">{d.label}</span>
                <span className="flex items-baseline gap-3 md:justify-end">
                  <span
                    className="font-mono text-[0.9rem] text-[color:var(--color-ink-muted)] line-through"
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
          <p className="mt-5 font-mono text-[0.72rem] tracking-[0.08em] text-[color:var(--color-ink-faint)]">
            {footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
