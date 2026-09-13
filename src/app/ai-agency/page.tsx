import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { LOCATIONS_BY_COUNTRY } from "@/data/locations";

const SITE_URL = "https://verdancesystemsai.com";

export const metadata: Metadata = {
  title: "Where We Work | AI Agency in South Africa and the UK | Verdance Systems AI",
  description:
    "We build the thing that answers your phone, replies to your messages and books customers into your calendar. Remote-first across South Africa and the United Kingdom. Free 30 minute audit call.",
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
    <main className="bg-canvas min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section-padding pt-32 pb-16">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
              Where we work
            </span>
            <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-[color:var(--color-ink)] mt-5 mb-6">
              Remote-first, and close enough to know your market.
            </h1>
            <p className="text-[color:var(--color-ink-soft)] text-lg leading-relaxed">
              Nothing gets installed and nobody has to visit you. Everything is set up on a
              video call and runs on your own accounts. Pick the closest city for what we
              tend to see there, or just book the call.
            </p>
            <Link href="/contact" className="btn btn-accent justify-center min-h-12 mt-8 inline-flex">
              Book a free audit call
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {COUNTRIES.map((country) => (
        <section
          key={country.code}
          className="section-padding py-14 border-t"
          style={{ borderColor: "var(--hairline)" }}
        >
          <div className="container-wide">
            <Reveal>
              <h2 className="font-display font-bold text-[clamp(1.4rem,2.6vw,2rem)] tracking-tight text-[color:var(--color-ink)]">
                {country.label}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {country.locations.map((loc, i) => (
                <Reveal key={loc.slug} delay={0.03 * i}>
                  <Link
                    href={`/ai-agency/${loc.slug}`}
                    className="group block h-full rounded-2xl p-5 border transition-colors"
                    style={{ borderColor: "var(--hairline)" }}
                  >
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">
                      {loc.region}
                    </span>
                    <h3 className="font-display font-semibold text-lg text-[color:var(--color-ink)] mt-1.5 flex items-center gap-1.5">
                      {loc.name}
                      <ArrowUpRight
                        size={14}
                        aria-hidden
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </h3>
                    <p className="mt-2.5 text-sm text-[color:var(--color-ink-muted)] leading-relaxed">
                      {loc.commonLoss}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-padding py-20 border-t" style={{ borderColor: "var(--hairline)" }}>
        <div className="container-wide max-w-3xl">
          <Reveal>
            <h2 className="font-display font-bold text-[clamp(1.6rem,3vw,2.4rem)] tracking-tight text-[color:var(--color-ink)] max-w-[24ch]">
              Not on the list?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-[color:var(--color-ink-soft)] leading-relaxed">
              It makes no difference. The work happens on a video call and the systems run
              on your own accounts, so where you are only matters for knowing your market,
              not for building anything. Book the call and we will go through yours.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <Link href="/contact" className="btn btn-accent justify-center min-h-12 mt-8 inline-flex">
              Book a free audit call
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
