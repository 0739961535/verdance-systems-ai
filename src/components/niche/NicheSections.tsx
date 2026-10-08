import { ArrowUpRight, Check, Gift, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { SITE } from "@/data/site";
import { PROOF, bookUrl, type Niche } from "@/data/niches";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";


/* ------------------------------------------------------------------ */
/* How it works: three numbered steps on one hairline rule.            */
/* ------------------------------------------------------------------ */
export function NicheSteps({ niche }: { niche: Niche }) {
  return (
    <section className="section-pad band-texture" style={{ background: "var(--bg-2)" }} aria-labelledby="steps-title">
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 id="steps-title" className="h2 mt-5 max-w-[20ch]">
            Three steps. <span className="italic-accent">You show up.</span>
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[20px] md:grid-cols-3" style={{ background: "var(--hairline)" }}>
          {niche.steps.map((s, i) => (
            <li key={s.title} className="h-full" style={{ background: "var(--bg-3)" }}>
              <Reveal delay={i * 0.06} className="h-full px-6 py-8 md:px-8 md:py-10">
                <span
                  className="font-mono"
                  style={{ fontSize: "clamp(1.5rem, 1.6vw + 1.1rem, 2.25rem)", color: "rgba(var(--accent-rgb), 0.4)", fontVariantNumeric: "tabular-nums" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display font-medium text-[color:var(--color-ink)]" style={{ fontSize: "1.2rem" }}>
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What is included, plus the bonuses.                                 */
/* ------------------------------------------------------------------ */
export function NicheIncluded({ niche }: { niche: Niche }) {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="included-title">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">What is included</p>
          <h2 id="included-title" className="h2 mt-5 max-w-[22ch]">
            The {niche.offerName}, <span className="italic-accent">in full.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <ul className="grid gap-4 sm:grid-cols-2">
            {niche.included.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={Math.min(i * 0.04, 0.2)} className="h-full">
                  <div className="surface surface-card-hover h-full px-6 py-6" style={{ borderRadius: 16 }}>
                    <Check size={16} strokeWidth={2.5} aria-hidden className="text-[color:var(--color-accent)]" />
                    <h3 className="mt-3 font-display font-medium text-[color:var(--color-ink)]" style={{ fontSize: "1.05rem" }}>
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-[1.55] text-[color:var(--color-ink-soft)]">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <aside
              className="rounded-[20px] px-6 py-7 lg:sticky lg:top-28"
              style={{ background: "rgba(var(--accent-rgb),0.06)", border: "1px solid rgba(var(--accent-rgb),0.22)" }}
              aria-labelledby="bonuses-title"
            >
              <div className="flex items-center gap-2">
                <Gift size={16} aria-hidden className="text-[color:var(--color-accent)]" />
                <h3 id="bonuses-title" className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                  Also included
                </h3>
              </div>
              <ul className="mt-5 space-y-4">
                {niche.bonuses.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-accent)" }} />
                    <span className="text-[0.95rem] leading-[1.5] text-[color:var(--color-ink)]">{b}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing: "from" figures only where they exist.                     */
/* ------------------------------------------------------------------ */
export function NichePricing({ niche }: { niche: Niche }) {
  const { pricing } = niche;
  const href = bookUrl(niche.bookSlug);
  return (
    <section className="section-pad bg-canvas" aria-labelledby="pricing-title" id="pricing" style={{ scrollMarginTop: "5rem" }}>
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">{pricing.eyebrow}</p>
          <h2 id="pricing-title" className="h2 mt-5 max-w-[20ch]">
            {pricing.title}
          </h2>
          <p className="mt-5 max-w-xl text-[color:var(--color-ink-soft)]" style={{ lineHeight: 1.6 }}>{pricing.intro}</p>
        </Reveal>

        <div className={`mt-12 grid gap-5 ${pricing.cards.length > 1 ? "md:grid-cols-2" : "max-w-2xl"}`}>
          {pricing.cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06} className="h-full">
              <div
                className="surface relative flex h-full flex-col overflow-hidden px-6 py-8 md:px-8 md:py-9"
                style={{
                  borderRadius: 20,
                  background: "var(--bg-3)",
                  border: `1px solid ${c.featured ? "rgba(var(--accent-rgb),0.45)" : "var(--hairline-2)"}`,
                  boxShadow: c.featured ? "0 0 0 1px rgba(var(--accent-rgb),0.08), 0 24px 60px -30px rgba(var(--accent-rgb),0.45)" : undefined,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display font-medium text-[color:var(--color-ink)]" style={{ fontSize: "1.25rem", lineHeight: 1.2 }}>
                    {c.name}
                  </h3>
                  {c.tag && (
                    <span
                      className="shrink-0 rounded-full px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[color:var(--color-accent)]"
                      style={{ border: "1px solid rgba(var(--accent-rgb),0.4)" }}
                    >
                      {c.tag}
                    </span>
                  )}
                </div>

                <dl className="mt-6">
                  {c.lines.map((l, j) => (
                    <div
                      key={l.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                      style={{ borderTop: j === 0 ? "1px solid var(--hairline)" : undefined, borderBottom: "1px solid var(--hairline)" }}
                    >
                      <dt className="text-[0.92rem] text-[color:var(--color-ink-soft)]">{l.label}</dt>
                      <dd
                        className="font-mono text-[color:var(--color-ink)]"
                        style={{ fontSize: l.value.length > 14 ? "0.95rem" : "clamp(1.15rem, 1vw + 0.9rem, 1.5rem)", fontVariantNumeric: "tabular-nums" }}
                      >
                        {l.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 flex-1 text-[0.9rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{c.note}</p>

                <a href={href} className={`btn ${c.featured ? "btn-accent" : "btn-ghost"} mt-7 min-h-12 justify-center`}>
                  Book your pre-audit
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 font-mono text-[0.75rem] tracking-[0.06em] text-[color:var(--color-ink-muted)]">{pricing.footnote}</p>
          {niche.urgency && (
            <p className="mt-3 max-w-xl text-[0.92rem] text-[color:var(--color-ink-soft)]">{niche.urgency}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Proof strip: one real, unnamed client. No invented numbers.         */
/* ------------------------------------------------------------------ */
export function NicheProof({ niche }: { niche: Niche }) {
  return (
    <section className="section-pad-sm bg-canvas" aria-label="Who builds it">
      <div className="container-narrow">
        <Reveal>
          <div
            className="grid gap-6 rounded-[20px] px-6 py-7 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:px-9"
            style={{ border: "1px solid var(--hairline-2)", background: "rgba(var(--hairline-rgb),0.02)" }}
          >
            <ShieldCheck size={28} strokeWidth={1.4} aria-hidden className="text-[color:var(--color-accent)]" />
            <div>
              <p className="font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.1rem, 0.8vw + 0.95rem, 1.35rem)", lineHeight: 1.4 }}>
                Built and run by Daniel Bouwer, in South Africa.
              </p>
              <p className="mt-2 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{PROOF}</p>
              {niche.compliance && (
                <p className="mt-3 font-mono text-[0.75rem] tracking-[0.06em] text-[color:var(--color-ink-muted)]">{niche.compliance}</p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA. id="audit" so StickyMobileCTA steps aside here.          */
/* ------------------------------------------------------------------ */
export function NicheCTA({ niche }: { niche: Niche }) {
  const href = bookUrl(niche.bookSlug);
  return (
    <section
      id="audit"
      className="section-pad band-texture"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--hairline-glow)", scrollMarginTop: "5rem" }}
      aria-labelledby="cta-title"
    >
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <Reveal>
          <p className="eyebrow">Pre-audit · 30 minutes · no cost</p>
          <h2 id="cta-title" className="h2 mt-5 max-w-[18ch]">
            {niche.cta.title} <span className="italic-accent">{niche.cta.accent}</span>
          </h2>
          <p className="mt-5 max-w-lg text-[color:var(--color-ink-soft)]" style={{ lineHeight: 1.6 }}>{niche.cta.body}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="surface relative overflow-hidden" style={{ borderRadius: 20, border: "1px solid var(--hairline-2)", background: "var(--bg-3)" }}>
            <div className="px-6 py-9 md:px-9 md:py-11">
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                {niche.offerName}
              </span>
              <ul className="mt-5 space-y-3">
                {[
                  "Your reply times, channel by channel",
                  "What slow replies are likely costing you, in rand",
                  "Whether the offer fits, and the exact price if it does",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check size={16} strokeWidth={2.5} aria-hidden className="mt-1 shrink-0 text-[color:var(--color-accent)]" />
                    <span className="text-[0.95rem] leading-[1.55] text-[color:var(--color-ink-soft)]">{t}</span>
                  </li>
                ))}
              </ul>
              <a href={href} className="btn btn-accent mt-8 w-full min-h-12 justify-center">
                Book your pre-audit
                <ArrowUpRight size={15} aria-hidden />
              </a>
              <p className="mt-5 text-[0.92rem] text-[color:var(--color-ink-soft)]">
                Prefer chat?{" "}
                <a
                  href={SITE.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 font-medium text-[color:var(--color-accent)]"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  WhatsApp Daniel
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
