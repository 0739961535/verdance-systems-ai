import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { LocationMap } from "@/components/visuals/hero/LocationMap";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { LOCATIONS_BY_COUNTRY } from "@/data/locations";

const SITE_URL = "https://verdancesystemsai.com";

export const metadata: Metadata = {
  title: "Where We Work | AI Agency in South Africa and the UK | Verdance Systems AI",
  description:
    "We build the thing that answers your phone, replies to your messages and books customers into your calendar. Remote first across South Africa and the United Kingdom. Free 30-minute pre-audit.",
  alternates: { canonical: "/ai-agency" },
  openGraph: {
    title: "Where We Work | Verdance Systems AI",
    description:
      "AI answering, booking and follow-up for businesses across South Africa and the United Kingdom.",
    url: `${SITE_URL}/ai-agency`,
    type: "website",
    siteName: "Verdance Systems AI",
  },
};

const COUNTRIES = [
  { code: "ZA" as const, label: "South Africa", locations: LOCATIONS_BY_COUNTRY.ZA },
  { code: "GB" as const, label: "United Kingdom", locations: LOCATIONS_BY_COUNTRY.GB },
];

export default function LocationsIndexPage() {
  // This page exists as much for crawlers as for people. Pages reachable only
  // from a sitemap get crawled badly, so every location page is linked here.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Where Verdance Systems AI works",
    url: `${SITE_URL}/ai-agency`,
    hasPart: [...LOCATIONS_BY_COUNTRY.ZA, ...LOCATIONS_BY_COUNTRY.GB].map((l) => ({
      "@type": "WebPage",
      name: `AI agency in ${l.name}`,
      url: `${SITE_URL}/ai-agency/${l.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow="Where we work"
        title={
          <>
            Remote first, <span className="italic-accent">close enough to know your market.</span>
          </>
        }
        lead="Nothing gets installed and nobody has to visit you. Everything is set up on a video call and runs on your own accounts. Pick the closest city to see what businesses there tend to lose, or just book the pre-audit."
        crumbs={[{ href: "/", label: "Home" }, { label: "Where we work" }]}
        visual={<LocationMap />}
        note="South Africa and the United Kingdom"
      />

      {COUNTRIES.map((country, ci) => (
        <section
          key={country.code}
          className={`section-pad ${ci % 2 === 0 ? "bg-canvas-2" : "bg-canvas"}`}
          aria-labelledby={`country-${country.code}`}
          style={{ borderTop: "1px solid var(--hairline)" }}
        >
          <div className="container-wide">
            <SectionHead
              id={`country-${country.code}`}
              eyebrow={`${country.locations.length} cities`}
              title={country.code === "ZA" ? <>South <span className="italic-accent">Africa.</span></> : <>United <span className="italic-accent">Kingdom.</span></>}
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {country.locations.map((loc, i) => (
                <li key={loc.slug}>
                  <Reveal delay={Math.min(i * 0.05, 0.3)} className="h-full">
                    <Link href={`/ai-agency/${loc.slug}`} className="card-x group flex h-full flex-col p-6">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">{loc.region}</span>
                        <ArrowUpRight size={16} aria-hidden className="nudge text-[color:var(--color-ink-muted)] group-hover:text-[color:var(--color-accent)]" />
                      </div>
                      <h3 className="mt-4 font-display text-[1.35rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                        {loc.name}
                      </h3>
                      <p className="mt-2 text-[0.93rem] leading-[1.55] text-[color:var(--color-ink-soft)]">{loc.commonLoss}</p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CTABand
        title={
          <>
            Not on the list? <span className="italic-accent">It makes no difference.</span>
          </>
        }
      />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Get your free Operations Map" />
    </>
  );
}
