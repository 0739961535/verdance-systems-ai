import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { NumberTicker } from "@/components/kit/NumberTicker";
import { SystemStack } from "@/components/visuals/hero/SystemStack";
import { PowerOfAI } from "@/components/aiteam/PowerOfAI";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { SERVICE_PILLARS, PILLAR_CATEGORIES, SERVICE_CATEGORIES } from "@/data/services";
import { GENERIC_BOOK_URL } from "@/data/booking";

const TITLE = "Services: WhatsApp Replies, Phone Answering, Online Booking and More | Verdance Systems AI";
const DESCRIPTION =
  "Twelve services for South African businesses: instant WhatsApp and message replies, phone answering, online booking, missed call text back, Google reviews, websites and more. Fixed quote after a free pre-audit.";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://verdancesystemsai.com/services",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  title: TITLE,
  description: DESCRIPTION,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Four pillars. <span className="italic-accent">One system.</span>
          </>
        }
        lead="Getting found, answering and booking, running the business, and the custom work only you have. Every part talks to the others. Start with the one that is costing you most."
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
        visual={<SystemStack />}
        note={`${SERVICE_CATEGORIES.length} services · fixed quote after your free pre-audit`}
      />

      {/* pillar quick-nav */}
      <nav aria-label="Pillars" className="bg-canvas" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide flex flex-wrap gap-2 py-6">
          {SERVICE_PILLARS.map((p) => (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-accent)]"
              style={{ border: "1px solid var(--hairline-2)" }}
            >
              <span className="text-[color:var(--color-accent)]">{p.index}</span>
              {p.title}
            </a>
          ))}
        </div>
      </nav>

      {SERVICE_PILLARS.map((pillar, pi) => {
        const categories = PILLAR_CATEGORIES(pillar);
        return (
          <section
            key={pillar.slug}
            id={pillar.slug}
            className={`section-pad ${pi % 2 === 0 ? "bg-canvas-2" : "bg-canvas"}`}
            style={{ borderTop: "1px solid var(--hairline)", scrollMarginTop: "5rem" }}
            aria-labelledby={`pillar-${pillar.slug}`}
          >
            <div className="container-wide">
              <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <Reveal variant="wipe">
                    <p
                      className="font-display text-[color:var(--color-accent)]"
                      style={{ fontSize: "clamp(3.5rem, 6vw, 6rem)", lineHeight: 0.9, letterSpacing: "-0.05em" }}
                    >
                      <NumberTicker value={Number(pillar.index)} pad={2} />
                    </p>
                    <h2 id={`pillar-${pillar.slug}`} className="h2 mt-4">
                      {pillar.title}
                    </h2>
                    <p className="mt-4 max-w-sm text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{pillar.promise}</p>
                  </Reveal>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {categories.map((c, i) => (
                    <li key={c.slug}>
                      <Reveal delay={i * 0.06} className="h-full">
                        <Link href={`/services/${c.slug}`} className="card-x group flex h-full flex-col p-6 md:p-7">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                              {pillar.title} · {c.number}
                            </span>
                            <ArrowUpRight size={17} aria-hidden className="nudge text-[color:var(--color-ink-muted)] group-hover:text-[color:var(--color-accent)]" />
                          </div>
                          <h3 className="mt-8 font-display text-[1.45rem] leading-tight text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                            {c.name}
                          </h3>
                          <p className="mt-3 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{c.promise}</p>
                          <ul className="mt-6 flex flex-wrap gap-1.5">
                            {c.subProducts.slice(0, 4).map((sp) => (
                              <li
                                key={sp.name}
                                className="rounded-full px-2.5 py-1 text-[0.75rem] text-[color:var(--color-ink-muted)]"
                                style={{ border: "1px solid var(--hairline-2)" }}
                              >
                                {sp.name}
                              </li>
                            ))}
                          </ul>
                        </Link>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      <PowerOfAI variant="short" />

      <section className="section-pad bg-canvas" aria-labelledby="start-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="start-title"
            eyebrow="Where to start"
            title={
              <>
                Not sure which? <span className="italic-accent">That is what the pre-audit is for.</span>
              </>
            }
            intro={
              <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent min-h-12 justify-center">
                Book your free pre-audit
                <ArrowUpRight size={16} aria-hidden />
              </a>
            }
          />
        </div>
      </section>

      <CTABand />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free pre-audit" />
    </>
  );
}
