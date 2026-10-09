import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";

/**
 * PageHero - the shared hero for every inner page: breadcrumb, eyebrow,
 * headline with the serif accent, lead, the pre-audit CTA and a visual of
 * its own (device, diagram or live-feeling UI).
 *
 * Server component. The headline enters with a transform-only rise (it is
 * the LCP element, so it is painted on the first frame). The visual sits
 * to the right on desktop and below the CTAs on phones.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  visual,
  primary = { href: GENERIC_BOOK_URL, label: "Get your free Operations Map" },
  secondary = { href: SITE.whatsapp.href, label: "WhatsApp us", whatsapp: true },
  note,
  wideVisual = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  crumbs?: { href?: string; label: string }[];
  visual?: ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string; whatsapp?: boolean } | null;
  note?: string;
  /** Put the visual full width under the copy instead of beside it. */
  wideVisual?: boolean;
}) {
  const external = (h: string) => h.startsWith("http");
  const split = visual && !wideVisual;
  return (
    <section className="relative isolate overflow-hidden bg-canvas" aria-labelledby="page-hero-title">
      <div aria-hidden className="aurora" />
      <div aria-hidden className="hero-grid" />
      <div className="container-wide relative pt-28 pb-16 sm:pt-32 md:pt-36 lg:pb-24">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="enter-fade-up mb-8 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            {crumbs.map((c, i) => (
              <span key={c.label}>
                {i > 0 && <span className="mx-2 text-[color:var(--color-ink-faint)]">/</span>}
                {c.href ? (
                  <Link href={c.href} className="inline-flex min-h-11 items-center transition-colors hover:text-[color:var(--color-accent)]">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-[color:var(--color-ink-soft)]">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className={split ? "grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-12" : ""}>
          <div className="min-w-0">
            <p className="enter-fade-up eyebrow">{eyebrow}</p>
            <h1
              id="page-hero-title"
              className={`enter-rise mt-6 font-display text-[color:var(--color-ink)] ${split ? "max-w-[15ch]" : "max-w-[18ch]"}`}
              style={{ fontSize: split ? "clamp(2.6rem, 3.6vw + 1rem, 5rem)" : "clamp(2.7rem, 5vw + 1rem, 6rem)", lineHeight: 0.98, letterSpacing: "-0.045em" }}
            >
              {title}
            </h1>
            <p className="enter-rise mt-7 max-w-[36rem] text-[color:var(--color-ink-soft)]" style={{ fontSize: "clamp(1.0625rem, 0.4vw + 0.98rem, 1.25rem)", lineHeight: 1.6 }}>
              {lead}
            </p>
            <div className="enter-fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.12s" }}>
              {external(primary.href) ? (
                <a href={primary.href} data-magnetic className="btn btn-accent min-h-12 justify-center px-6">
                  {primary.label}
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              ) : (
                <Link href={primary.href} data-magnetic className="btn btn-accent min-h-12 justify-center px-6">
                  {primary.label}
                  <ArrowUpRight size={16} aria-hidden />
                </Link>
              )}
              {secondary &&
                (external(secondary.href) ? (
                  <a href={secondary.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-12 justify-center px-6">
                    {secondary.whatsapp && <WhatsAppIcon className="h-4 w-4" />}
                    {secondary.label}
                  </a>
                ) : (
                  <Link href={secondary.href} className="btn btn-ghost min-h-12 justify-center px-6">
                    {secondary.label}
                  </Link>
                ))}
            </div>
            {note && (
              <p className="enter-fade-up mt-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]" style={{ animationDelay: "0.2s" }}>
                {note}
              </p>
            )}
          </div>
          {visual && (
            <div className={`enter-fade min-w-0 ${wideVisual ? "mt-14 md:mt-20" : ""}`} style={{ animationDelay: "0.3s" }}>
              <div data-parallax="-0.04">{visual}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
