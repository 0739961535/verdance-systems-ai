import type { Metadata } from "next";
import { Reveal } from "@/components/primitives/Reveal";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { industries } from "@/data/industries";
import { NicheGrid } from "@/components/niche/NicheGrid";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { CardFan } from "@/components/visuals/hero/CardFan";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
export const metadata: Metadata = {
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries | Verdance Systems AI",
    description: "Five current offers, each built around how one kind of South African business gets its enquiries, and systems for many more industries. Fixed quote after a free pre-audit.",
    url: "https://verdancesystemsai.com/industries",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries | Verdance Systems AI",
    description: "Five current offers, each built around how one kind of South African business gets its enquiries, and systems for many more industries. Fixed quote after a free pre-audit.",
  },
  title: "Industries | Verdance Systems AI",
  description:
    "Five current offers, each built around how one kind of South African business gets its enquiries, and systems for many more industries. Fixed quote after a free pre-audit.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Built around how <span className="italic-accent">your enquiries arrive.</span>
          </>
        }
        lead="A wedding venue, a clinic and a plumber get very different messages. Each offer is built around one kind of business, its channels and its busy hours."
        crumbs={[{ href: "/", label: "Home" }, { label: "Industries" }]}
        visual={<CardFan />}
        note="Five current offers · every one replies within 5 minutes"
      />

      <NicheGrid tone="canvas-2" />

      <section className="section-pad bg-canvas" aria-labelledby="more-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="more-title"
            eyebrow="More industries"
            title={
              <>
                Not on the list? <span className="italic-accent">We still build it.</span>
              </>
            }
            intro="The same system adapts to most businesses that run on enquiries. See how it works in yours."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {industries.map((industry, i) => (
              <li key={industry.slug}>
                <Reveal delay={Math.min(i * 0.05, 0.3)} className="h-full">
                  <IndustryCard industry={industry} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free pre-audit" />
    </>
  );
}
