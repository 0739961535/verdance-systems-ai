import type { ReactNode } from "react";
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
type GuaranteeColumn = { n: string; label: string; text: string };

interface GuaranteeBlockProps {
  eyebrow?: string;
  /** Headline. Defaults to the homepage commitment line. */
  title?: ReactNode;
  columns?: GuaranteeColumn[];
  note?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export function GuaranteeBlock({
  eyebrow = GUARANTEE.eyebrow,
  title,
  columns = GUARANTEE.columns,
  note = "These three terms are written into every contract we sign.",
  ctaHref = "/contact",
  ctaLabel = "Book a Meeting",
}: GuaranteeBlockProps = {}) {
  const external = ctaHref.startsWith("http");
  return (
    <section
      className="section-pad band-texture"
      style={{ background: "var(--bg-2)", borderTop: "1px solid var(--hairline-glow)" }}
      aria-labelledby="guarantee-title"
    >
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="guarantee-title"
            className="h2 mt-5 max-w-[22ch]"
          >
            {title ?? (
              <>
                Fixed quote. Fixed launch date.
                <br />
                <span className="italic-accent">Full ownership.</span>
              </>
            )}
          </h2>
        </Reveal>

        <div className="mt-10 md:mt-14 grid gap-4 md:grid-cols-3">
          {columns.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06} className="h-full">
              <div className="card-x h-full px-6 py-7 md:px-8 md:py-9">
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
            {note}
          </p>
          {external ? (
            <a href={ctaHref} data-magnetic className="btn btn-accent mt-6 min-h-12">
              {ctaLabel}
              <ArrowUpRight size={15} aria-hidden />
            </a>
          ) : (
            <Link href={ctaHref} className="btn btn-accent mt-6 min-h-12">
              {ctaLabel}
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
