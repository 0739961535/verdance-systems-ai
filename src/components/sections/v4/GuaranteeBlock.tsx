import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { GUARANTEE } from "@/data/landing";

/**
 * GuaranteeBlock - the risk-reversal band. One full-width statement
 * (not three timid boxes); this and the hero are the only two
 * azure-bordered surfaces on the page.
 */
export function GuaranteeBlock() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="guarantee-title">
      <div className="container-narrow">
        <Reveal>
          <div
            className="surface relative px-6 py-10 md:px-12 md:py-14"
            style={{ borderRadius: 20, border: "1px solid var(--hairline-glow)" }}
          >
            {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos) => (
              <span key={pos} aria-hidden className={`pointer-events-none absolute ${pos} font-mono text-[10px] text-[color:var(--color-ink-faint)]`}>+</span>
            ))}

            <span className="eyebrow">{GUARANTEE.eyebrow}</span>
            <h2
              id="guarantee-title"
              className="font-display text-[color:var(--color-ink)] mt-4 max-w-[18ch]"
              style={{ fontSize: "clamp(1.9rem, 3.2vw + 1.2rem, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
            >
              Fixed price. Fixed timeline. You <span className="italic-accent">own</span> the system.
            </h2>

            <div className="mt-8 grid md:grid-cols-3">
              {GUARANTEE.columns.map((c, i) => (
                <div
                  key={c.label}
                  className="py-4 md:py-0 md:px-6 first:pl-0 last:pr-0"
                  style={{
                    borderTop: i > 0 ? "1px solid var(--hairline)" : undefined,
                  }}
                >
                  <div className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
                    {c.label}
                  </div>
                  <p className="mt-2 text-[0.9rem] leading-[1.55] text-[color:var(--color-ink-soft)]">{c.text}</p>
                </div>
              ))}
            </div>

            <Link href="#audit" className="btn btn-accent mt-9 min-h-12">
              Book your AI Systems Audit
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
