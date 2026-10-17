import { Check, Gift, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PROOF, type Niche } from "@/data/niches";


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

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {niche.steps.map((s, i) => (
            <li key={s.title} className="h-full">
              <Reveal delay={i * 0.06} className="card-x h-full px-6 py-8 md:px-8 md:py-10">
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
                  <div className="card-x h-full px-6 py-6">
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
/* Proof strip: one real, unnamed client. No invented numbers.         */
/* ------------------------------------------------------------------ */
export function NicheProof({ niche }: { niche: Niche }) {
  return (
    <section className="section-pad-sm bg-canvas" aria-label="Who builds it">
      <div className="container-narrow">
        <Reveal>
          <div className="card-x grid gap-6 px-6 py-7 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:px-9">
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
