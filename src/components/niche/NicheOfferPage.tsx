import { Reveal } from "@/components/primitives/Reveal";
import { DeltaRows } from "@/components/sections/v4/DeltaRows";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { bookUrl, type Niche } from "@/data/niches";
import { NicheHero } from "./NicheHero";
import { NicheLeak } from "./NicheLeak";
import { NicheCalculator } from "./NicheCalculator";
import { NicheProof } from "./NicheSections";
import { NicheTabs } from "./NicheTabs";
import { CTABand } from "@/components/kit/CTABand";
import { SceneBand } from "@/components/visuals/ConceptScene";
import { SITE_URL } from "@/data/site";

/**
 * NicheOfferPage - one offer, one kind of business, one action.
 * hero (their pain, a live-looking reply) -> what changes -> the offer in
 * tabs (included, how we work with the terms, questions) -> their own
 * numbers -> proof ->
 * book. Every book button goes to the niche's Operations Map flow.
 */
export function NicheOfferPage({ niche }: { niche: Niche }) {
  const href = bookUrl(niche.bookSlug);
  const url = `${SITE_URL}/industries/${niche.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: niche.offerName,
        serviceType: "Enquiry response and booking system",
        description: niche.meta.description,
        url,
        areaServed: [
        { "@type": "Country", name: "South Africa" },
        { "@type": "Country", name: "United Kingdom" },
      ],
        audience: { "@type": "BusinessAudience", name: niche.name },
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: niche.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
          { "@type": "ListItem", position: 3, name: niche.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <NicheHero niche={niche} />
      <NicheLeak niche={niche} />
      <SceneBand slug={niche.slug} />

      <DeltaRows
        eyebrow="What changes"
        title={
          <>
            The same enquiries. <span className="italic-accent">Answered first.</span>
          </>
        }
        intro="Where enquiries slip today, and what happens instead once the system is live."
        deltas={niche.deltas}
        footnote="Every enquiry gets a reply within 60 seconds, day or night. The rest is measured against your own baseline."
      />

      <NicheTabs niche={niche} />

      <section
        id="calculator"
        className="section-pad band-texture"
        style={{ background: "var(--bg-2)", scrollMarginTop: "5rem" }}
        aria-labelledby="calc-title"
      >
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">Your numbers</p>
            <h2
              id="calc-title"
              className="h2 mt-5 max-w-[22ch]"
            >
              {niche.calculator.title}
            </h2>
            <p className="mt-5 max-w-xl text-[color:var(--color-ink-soft)]" style={{ lineHeight: 1.6 }}>
              {niche.calculator.intro}
            </p>
          </Reveal>
          <div className="mt-12">
            <NicheCalculator calc={niche.calculator} bookHref={href} />
          </div>
        </div>
      </section>


      <NicheProof niche={niche} />
      <CTABand
        eyebrow="Free Operations Map · 30 minutes"
        title={
          <>
            {niche.cta.title} <span className="italic-accent">{niche.cta.accent}</span>
          </>
        }
        points={[
          "Your reply times, channel by channel",
          "What slow replies cost you, in hours and money",
          "Whether it fits, and a fixed quote if it does",
        ]}
        href={href}
      />
      <StickyMobileCTA href={href} label="Book a free 30-minute call" />
    </>
  );
}
