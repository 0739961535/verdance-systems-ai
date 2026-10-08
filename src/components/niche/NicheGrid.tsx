import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { NICHES } from "@/data/niches";
import { NicheIcon } from "./NicheIcon";

/**
 * NicheGrid - "Current offers": five cards linking to the niche offer pages.
 * Used on the homepage and at the top of /industries.
 */
export function NicheGrid({
  eyebrow = "Current offers",
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
      style={{ borderTop: "1px solid var(--hairline)" }}
    >
      <div className="container-wide">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="niches-title" className="h2 mt-5">
              {title ?? (
                <>
                  Current <span className="italic-accent">offers.</span>
                </>
              )}
            </h2>
          </div>
          <p className="max-w-sm text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            {intro ??
              "Five offers, each built around how one kind of business gets its enquiries. Every one replies within 5 minutes, day or night."}
          </p>
        </Reveal>

        <ul
          className="mt-10 grid gap-px overflow-hidden rounded-[22px] sm:grid-cols-2 lg:grid-cols-5 md:mt-14"
          style={{ background: "var(--hairline)", border: "1px solid var(--hairline)" }}
        >
          {NICHES.map((n, i) => (
            <li key={n.slug} className={i === NICHES.length - 1 ? "sm:col-span-2 lg:col-span-1" : undefined}>
              <Link
                href={`/industries/${n.slug}`}
                className="offer-card group flex h-full min-h-[15rem] flex-col p-6 md:p-7"
                style={{ background: tone === "canvas" ? "var(--bg)" : "var(--bg-2)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.72rem] text-[color:var(--color-ink-muted)] tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <NicheIcon
                    icon={n.icon}
                    size={18}
                    className="text-[color:var(--color-ink-muted)] transition-colors group-hover:text-[color:var(--color-accent)]"
                  />
                </div>
                <h3
                  className="mt-10 font-display font-medium text-[color:var(--color-ink)]"
                  style={{ fontSize: "1.3rem", lineHeight: 1.15, letterSpacing: "-0.025em" }}
                >
                  {n.name}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-[1.55] text-[color:var(--color-ink-soft)]">{n.card.line}</p>
                <span className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-[0.92rem] font-medium text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-accent)]">
                  See the offer
                  <ArrowUpRight
                    size={15}
                    aria-hidden
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
