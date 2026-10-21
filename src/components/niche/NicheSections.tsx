import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PROOF, type Niche } from "@/data/niches";


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
                Built and run by Daniel Bouwer, for businesses in SA and the UK.
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
