import { Reveal } from "@/components/primitives/Reveal";
import { DeltaRows } from "@/components/sections/v4/DeltaRows";
import { GuaranteeBlock } from "@/components/sections/v4/GuaranteeBlock";
import { FAQControl } from "@/components/sections/v4/FAQControl";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { bookUrl, type Niche } from "@/data/niches";
import { NicheHero } from "./NicheHero";
import { NicheLeak } from "./NicheLeak";
import { NicheCalculator } from "./NicheCalculator";
import { NicheIncluded, NichePricing, NicheProof, NicheSteps } from "./NicheSections";
import { CTABand } from "@/components/kit/CTABand";

const SITE_URL = "https://verdancesystemsai.com";

/**
 * NicheOfferPage - one offer, one kind of business, one action.
 * hero (their pain, a live-looking reply) -> what changes -> how it works ->
 * what is included -> their own numbers -> price -> guarantee -> proof ->
 * questions -> book. Every book button goes to the niche's pre-audit flow.
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
        areaServed: { "@type": "Country", name: "South Africa" },
        audience: { "@type": "BusinessAudience", name: niche.name },
        provider: { "@type": "Organization", name: "Verdance Systems AI", url: SITE_URL },
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

      <DeltaRows
        eyebrow="What changes"
        title={
          <>
            The same enquiries. <span className="italic-accent">Answered first.</span>
          </>
        }
        intro="Where enquiries slip today, and what happens instead once the system is live."
        deltas={niche.deltas}
        footnote="Every enquiry gets a reply within 5 minutes, day or night. The rest is measured against your own baseline."
      />

      <NicheSteps niche={niche} />
      <NicheIncluded niche={niche} />

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

      <NichePricing niche={niche} />

      <GuaranteeBlock
        eyebrow="The guarantee"
        title={
          <>
            {niche.guarantee.title}
            <br />
            <span className="italic-accent">{niche.guarantee.accent}</span>
          </>
        }
        columns={niche.guarantee.columns}
        note={niche.guarantee.note}
        ctaHref={href}
        ctaLabel="Get your free Operations Map"
      />

      <NicheProof niche={niche} />
      <FAQControl faqs={niche.faqs} />
      <CTABand
        eyebrow="Pre-audit · 30 minutes · no cost"
        title={
          <>
            {niche.cta.title} <span className="italic-accent">{niche.cta.accent}</span>
          </>
        }
        points={[
          "Your reply times, channel by channel",
          "What slow replies are likely costing you, in real money",
          "Whether the offer fits, and a fixed quote if it does",
        ]}
        href={href}
      />
      <StickyMobileCTA href={href} label="Get your free Operations Map" />
    </>
  );
}
