import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { NICHES } from "@/data/niches";
import { NicheIcon } from "./NicheIcon";

/**
 * NicheGrid - cards linking to the five niche offer pages. Used on the
 * homepage and at the top of /industries.
 */
export function NicheGrid({
  eyebrow = "Built for your business",
  title,
  intro,
  tone = "canvas",
}: {
  eyebrow?: string;
  title?: ReactNode;
  intro?: string;
  tone?: "canvas" | "canvas-2";
}) {
  return (
    <section
      className={`section-pad ${tone === "canvas" ? "bg-canvas" : "bg-canvas-2"}`}
      aria-labelledby="niches-title"
    >
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2
            id="niches-title"
            className="font-display text-[color:var(--color-ink)] mt-4 max-w-[22ch]"
            style={{ fontSize: "clamp(1.9rem, 3.2vw + 1.2rem, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
          >
            {title ?? (
              <>
                Made for how <span className="italic-accent">your enquiries</span> arrive.
              </>
            )}
          </h2>
          <p className="mt-5 max-w-xl text-[color:var(--color-ink-soft)]" style={{ lineHeight: 1.6 }}>
            {intro ??
              "Five offers, each built around one kind of business. Every enquiry gets a reply within 5 minutes, day or night."}
          </p>
        </Reveal>

        <ul className="mt-10 md:mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {NICHES.map((n, i) => (
            <li key={n.slug}>
              <Reveal delay={i * 0.05} className="h-full">
                <Link
                  href={`/industries/${n.slug}`}
                  className="group surface surface-card-hover flex h-full flex-col px-6 py-6"
                  style={{ borderRadius: 20 }}
                >
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "rgba(var(--accent-rgb),0.10)", border: "1px solid rgba(var(--accent-rgb),0.22)" }}
                  >
                    <NicheIcon icon={n.icon} size={18} className="text-[color:var(--color-accent)]" />
                  </span>
                  <h3 className="mt-5 font-display font-medium text-[color:var(--color-ink)]" style={{ fontSize: "1.1rem", lineHeight: 1.25 }}>
                    {n.name}
                  </h3>
                  <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[color:var(--color-ink-muted)]">
                    {n.offerName}
                  </p>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-[1.55] text-[color:var(--color-ink-soft)]">{n.card.line}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-accent)]">
                    See the offer
                    <ArrowUpRight size={14} aria-hidden />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
