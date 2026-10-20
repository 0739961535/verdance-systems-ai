import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * CommitmentBlock - the terms band. Three short, true clauses that are part
 * of every build. No promises beyond the offer itself.
 */
type Clause = { n: string; label: string; text: string };

const CLAUSES: Clause[] = [
  { n: "01", label: "Fixed quote", text: "Agreed in writing before any work starts. The price on the quote is the price you pay." },
  { n: "02", label: "Live in 10 working days", text: "On your WhatsApp, phone, website and inbox, with visible progress every week." },
  { n: "03", label: "Your team approves what goes out", text: "You approve what matters from one screen, and a person takes over the moment it counts." },
];

interface CommitmentBlockProps {
  eyebrow?: string;
  title?: ReactNode;
  columns?: Clause[];
  note?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export function CommitmentBlock({
  eyebrow = "How we work",
  title,
  columns = CLAUSES,
  note,
  ctaHref = "/book",
  ctaLabel = "Book a free 30-minute call",
}: CommitmentBlockProps = {}) {
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
    <section className="section-pad" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--hairline)" }} aria-labelledby="commitment-title" data-cta-location="commitment">
      <div className="container-narrow">
        <Reveal variant="wipe" className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="commitment-title" className="h2 mt-5 max-w-[22ch]">
            {title ?? (
              <>
                Clear terms. <span className="italic-accent">In writing.</span>
              </>
            )}
          </h2>
        </Reveal>

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

        <Reveal delay={0.1} className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-[0.98rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            {note ?? "The quote comes after your free Operations Map, and only if your own numbers show it pays back."}
          </p>
          {cta}
        </Reveal>
      </div>
    </section>
  );
}
