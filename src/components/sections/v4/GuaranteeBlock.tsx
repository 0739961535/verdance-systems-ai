import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { GUARANTEE } from "@/data/landing";

/**
 * GuaranteeBlock - the commitment band. Three numbered terms presented
 * like contract clauses: mono index, strong label, one plain sentence.
 * Sits on the tinted band with an azure top rule marking it as one of
 * the page's two conversion moments.
 */
export function GuaranteeBlock() {
  return (
    <section
      className="section-pad"
      style={{ background: "var(--bg-2)", borderTop: "1px solid var(--hairline-glow)" }}
      aria-labelledby="guarantee-title"
    >
      <div className="container-narrow">
        <Reveal>
          <span className="eyebrow">{GUARANTEE.eyebrow}</span>
          <h2
            id="guarantee-title"
            className="font-display text-[color:var(--color-ink)] mt-4 max-w-[22ch]"
            style={{ fontSize: "clamp(1.9rem, 3.2vw + 1.2rem, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
          >
            Fixed price. Fixed launch date.
            <br />
            <span className="italic-accent">Full ownership.</span>
          </h2>
        </Reveal>

        <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-px rounded-[20px] overflow-hidden" style={{ background: "var(--hairline)" }}>
          {GUARANTEE.columns.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <div className="h-full px-6 py-7 md:px-8 md:py-9" style={{ background: "var(--bg-3)" }}>
                <div
                  className="font-mono"
                  style={{
                    fontSize: "clamp(1.4rem, 1.4vw + 1rem, 2rem)",
                    color: "rgba(var(--accent-rgb), 0.4)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {c.n}
                </div>
                <div className="mt-3 font-display font-medium text-[color:var(--color-ink)]" style={{ fontSize: "1.1rem" }}>
                  {c.label}
                </div>
                <p className="mt-2 text-[0.92rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-xl text-[color:var(--color-ink-soft)]" style={{ lineHeight: 1.6 }}>
            These three terms are written into every contract we sign.
          </p>
          <Link href="#audit" className="btn btn-accent mt-6 min-h-12">
            Book your AI Systems Audit
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
