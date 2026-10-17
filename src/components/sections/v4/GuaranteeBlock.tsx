import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { GUARANTEES } from "@/data/offer";
import { GuaranteeSeal } from "@/components/offer/GuaranteeSeal";

/**
 * GuaranteeBlock - the commitment band.
 *
 * Default: the two guarantees as certificates (exact IF and THEN), with the
 * ownership terms underneath. Niche pages can pass their own `columns`; those
 * render as numbered clauses in the same certificate style.
 */
type GuaranteeColumn = { n: string; label: string; text: string };

interface GuaranteeBlockProps {
  eyebrow?: string;
  title?: ReactNode;
  columns?: GuaranteeColumn[];
  note?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

const TERMS = ["Fixed quote, in writing", "Fixed launch date", "Every account in your name"];

export function GuaranteeBlock({
  eyebrow = "The guarantees",
  title,
  columns,
  note,
  ctaHref = "/contact",
  ctaLabel = "Get your free Operations Map",
}: GuaranteeBlockProps = {}) {
  const external = ctaHref.startsWith("http");
  const cta = external ? (
    <a href={ctaHref} className="btn btn-ghost min-h-12 justify-center px-6">
      {ctaLabel}
      <ArrowUpRight size={15} aria-hidden />
    </a>
  ) : (
    <Link href={ctaHref} className="btn btn-ghost min-h-12 justify-center px-6">
      {ctaLabel}
      <ArrowUpRight size={15} aria-hidden />
    </Link>
  );

  return (
    <section className="section-pad" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--hairline)" }} aria-labelledby="guarantee-title">
      <div className="container-narrow">
        <Reveal variant="wipe" className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="guarantee-title" className="h2 mt-5 max-w-[22ch]">
            {title ?? (
              <>
                We carry the risk. <span className="italic-accent">In writing.</span>
              </>
            )}
          </h2>
        </Reveal>

        {columns ? (
          <ol className={`mt-12 grid gap-4 md:mt-16 ${columns.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {columns.map((c, i) => (
              <li key={c.label}>
                <Reveal delay={i * 0.06} className="h-full">
                  <article className="seal-card relative h-full rounded-[22px] p-6 md:p-8" style={{ background: "var(--bg-3)", border: "1px solid var(--hairline-2)" }}>
                    <span aria-hidden className="seal-corner tl" />
                    <span aria-hidden className="seal-corner tr" />
                    <span aria-hidden className="seal-corner bl" />
                    <span aria-hidden className="seal-corner br" />
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--color-accent)]">Clause {c.n}</p>
                    <h3 className="mt-4 font-display text-[1.25rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em", lineHeight: 1.15 }}>{c.label}</h3>
                    <p className="mt-3 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{c.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        ) : (
          <>
            <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
              {GUARANTEES.map((g, i) => (
                <Reveal key={g.key} delay={i * 0.06} className="h-full">
                  <GuaranteeSeal g={g} />
                </Reveal>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">
              {TERMS.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                  {t}
                </li>
              ))}
            </ul>
          </>
        )}

        <Reveal delay={0.1} className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-[0.98rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            {note ?? "Both guarantees are measured against the numbers from your Operations Map, agreed by both sides before we start."}
          </p>
          {cta}
        </Reveal>
      </div>
    </section>
  );
}
