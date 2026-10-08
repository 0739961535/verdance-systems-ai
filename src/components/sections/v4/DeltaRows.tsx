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

        <Reveal variant="scale" className="mt-10 md:mt-14">
          <div className="card-x overflow-hidden">
            <div className="hidden grid-cols-[1.2fr_1fr_1fr] gap-6 px-7 py-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)] md:grid" style={{ borderBottom: "1px solid var(--hairline)" }}>
              <span>Moment</span>
              <span>Today</span>
              <span className="text-[color:var(--color-accent)]">With Verdance</span>
            </div>
            {deltas.map((d, i) => (
              <div
                key={d.label}
                className="grid gap-2 px-6 py-5 md:grid-cols-[1.2fr_1fr_1fr] md:items-center md:gap-6 md:px-7"
                style={{ borderTop: i ? "1px solid var(--hairline)" : undefined }}
              >
                <span className="text-[0.98rem] text-[color:var(--color-ink)]">{d.label}</span>
                <span className="font-mono text-[0.9rem] text-[color:var(--color-ink-muted)] line-through" style={{ textDecorationColor: "var(--hairline-3)" }}>
                  {d.before}
                </span>
                <span className="flex items-center gap-2 font-mono text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1rem, 0.8vw + 0.85rem, 1.25rem)" }}>
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--signal)" }} />
                  {d.after}
                </span>
                <span className="sr-only">{`improved from ${d.before} to ${d.after}`}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 font-mono text-[0.72rem] tracking-[0.08em] text-[color:var(--color-ink-muted)]">
            {footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
