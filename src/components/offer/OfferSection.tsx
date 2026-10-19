import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { OPERATIONS_MAP, REVENUE_TEAM } from "@/data/offer";

/**
 * OfferSection - the whole offer on one screen, read like a spec sheet:
 * the free Operations Map (the door), The Revenue Team (the build, framed by
 * outcome, likelihood, time and effort). No prices,
 * by rule. One CTA. See docs/design-system-v2.md section 2.
 */
export function OfferSection({ id = "offer", href = GENERIC_BOOK_URL }: { id?: string; href?: string }) {
  return (
    <section id={id} className="section-pad bg-canvas-2" aria-labelledby={`${id}-title`} data-cta-location="offer" style={{ borderTop: "1px solid var(--hairline)", scrollMarginTop: "5rem" }}>
      <div className="container-narrow">
        <Reveal variant="wipe" className="max-w-3xl">
          <p className="eyebrow">The offer</p>
          <h2 id={`${id}-title`} className="h2 mt-5">
            Two steps. <span className="italic-accent">No guesswork.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            Start with a free map of where your business leaks time and money. If the numbers say it pays back, we build the team that fixes it. If they do not, we tell you.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Step one: the free door */}
          <Reveal className="h-full">
            <article className="flex h-full flex-col rounded-[24px] p-6 md:p-8" style={{ background: "var(--bg-3)", border: "1px solid var(--hairline-2)" }}>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--color-accent)]">{OPERATIONS_MAP.eyebrow}</p>
              <h3 className="mt-4 font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.6rem, 1.2vw + 1.2rem, 2.2rem)", letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                {OPERATIONS_MAP.name}
              </h3>
              <p className="mt-3 text-[1.02rem] leading-[1.5] text-[color:var(--color-ink)]">{OPERATIONS_MAP.line}</p>
              <p className="mt-4 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{OPERATIONS_MAP.body}</p>
              <ul className="mt-6 grid gap-2.5">
                {OPERATIONS_MAP.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.95rem] leading-[1.5] text-[color:var(--color-ink-soft)]">
                    <Check size={16} strokeWidth={2.2} aria-hidden className="mt-[3px] shrink-0 text-[color:var(--color-accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
              <figure className="mt-7 overflow-hidden rounded-[16px]" style={{ background: "var(--bg-2)", border: "1px solid var(--hairline)" }}>
                <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">Where it leaks</span>
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">Today</span>
                </div>
                <ul>
                  {OPERATIONS_MAP.sample.map((r) => (
                    <li key={r.where} className="flex items-baseline justify-between gap-4 px-4 py-2.5 text-[0.88rem]" style={{ borderTop: "1px solid var(--hairline)" }}>
                      <span className="text-[color:var(--color-ink)]">{r.where}</span>
                      <span className="text-right text-[color:var(--color-ink-muted)]">{r.today}</span>
                    </li>
                  ))}
                </ul>
                <figcaption className="px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]" style={{ borderTop: "1px solid var(--hairline)" }}>
                  Sample map, for illustration
                </figcaption>
              </figure>
              <div className="mt-auto pt-8">
                <a href={href} className="btn btn-accent min-h-12 w-full justify-center sm:w-auto">
                  See what AI can do for you
                  <ArrowUpRight size={16} aria-hidden />
                </a>
                <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">Free · 30 minutes · yours to keep</p>
              </div>
            </article>
          </Reveal>

          {/* Step two: the build, as a spec sheet */}
          <Reveal delay={0.06} className="h-full">
            <article className="offer-sheet h-full rounded-[24px]" style={{ background: "var(--bg-3)", border: "1px solid rgba(var(--accent-rgb),0.32)" }}>
              <header className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6 md:px-8 md:pt-8">
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--color-accent)]">{REVENUE_TEAM.eyebrow}</p>
                  <h3 className="mt-3 font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.6rem, 1.2vw + 1.2rem, 2.2rem)", letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                    {REVENUE_TEAM.name}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-soft)]" style={{ border: "1px solid var(--hairline-3)" }}>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--signal)" }} />
                  {REVENUE_TEAM.chip}
                </span>
              </header>

              <dl className="mt-6">
                {REVENUE_TEAM.rows.map((r) => (
                  <div key={r.lever} className="grid gap-1.5 px-6 py-5 md:grid-cols-[8.5rem_1fr_auto] md:items-baseline md:gap-6 md:px-8" style={{ borderTop: "1px solid var(--hairline)" }}>
                    <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">{r.lever}</dt>
                    <dd className="text-[1.02rem] leading-[1.5] text-[color:var(--color-ink)]">
                      {r.accent ? (
                        <>
                          {r.statement.replace(r.accent, "")}
                          <span className="italic-accent">{r.accent}</span>
                        </>
                      ) : (
                        r.statement
                      )}
                    </dd>
                    <dd className="font-mono text-[0.8rem] text-[color:var(--color-ink-soft)] tabular md:text-right">{r.proof}</dd>
                  </div>
                ))}
              </dl>

              <div className="px-6 pb-6 pt-5 md:px-8 md:pb-8" style={{ borderTop: "1px solid var(--hairline)" }}>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">What it does for you</p>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {REVENUE_TEAM.included.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[0.95rem] leading-[1.45] text-[color:var(--color-ink-soft)]">
                      <Check size={16} strokeWidth={2.2} aria-hidden className="mt-[2px] shrink-0 text-[color:var(--color-accent)]" />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.88rem] leading-[1.55] text-[color:var(--color-ink-muted)]">
                  No price list. Every team is scoped to your business, so the quote comes after your Operations Map. It is fixed and in writing.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
