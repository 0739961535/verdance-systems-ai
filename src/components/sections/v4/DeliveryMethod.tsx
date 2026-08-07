import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { PROCESS } from "@/data/landing";

/**
 * DeliveryMethod - the numbered 01-06 process as product. Vertical
 * hairline spine with steps hanging off it; every step names its
 * artifact and timing (the specificity is the proof).
 */
export function DeliveryMethod() {
  return (
    <section className="section-pad band-texture" style={{ background: "var(--bg-2)" }} aria-labelledby="process-title">
      <div className="container-narrow grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 self-start">
          <Reveal>
            <span className="eyebrow">How we deliver</span>
            <h2
              id="process-title"
              className="font-display text-[color:var(--color-ink)] mt-4 max-w-[16ch]"
              style={{ fontSize: "clamp(1.9rem, 3.2vw + 1.2rem, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
            >
              A method, not a <span className="italic-accent">maybe</span>.
            </h2>
            <p className="mt-5 max-w-md text-[color:var(--color-ink-soft)]" style={{ lineHeight: 1.6 }}>
              Six steps, each with a named deliverable and a date. You always know what exists, what&apos;s next and what it costs.
            </p>
          </Reveal>
        </div>

        <ol className="relative" style={{ borderLeft: "1px solid var(--hairline-2)" }}>
          {PROCESS.map((step, i) => (
            <li key={step.n} className="relative pl-7 md:pl-10 pb-10 last:pb-0">
              <Reveal delay={i * 0.05}>
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full"
                  style={{ background: "var(--bg-2)", border: "1px solid rgba(var(--accent-rgb), 0.6)" }}
                />
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "clamp(1.5rem, 1.6vw + 1.1rem, 2.25rem)",
                      color: "rgba(var(--accent-rgb), 0.35)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {step.n}
                  </span>
                  <h3 className="font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.2rem, 1vw + 1rem, 1.6rem)" }}>
                    {step.name}
                  </h3>
                </div>
                <p className="mt-2 max-w-md text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
                  {step.desc}
                </p>
                <p className="mt-2 font-mono text-[0.75rem] tracking-[0.1em] text-[color:var(--color-ink-muted)]">
                  {step.meta}
                </p>
                {i === 0 && (
                  <Link
                    href="#audit"
                    className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-[color:var(--color-accent)]"
                    style={{ border: "1px solid rgba(var(--accent-rgb), 0.4)" }}
                  >
                    Start here, book the audit →
                  </Link>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
