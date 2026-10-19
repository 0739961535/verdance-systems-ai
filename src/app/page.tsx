import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { CapabilityMarquee } from "@/components/home/CapabilityMarquee";
import { CostSection, HowItWorksSection, WhatWeDoSection } from "@/components/home/HomeStory";
import { NicheGrid } from "@/components/niche/NicheGrid";
import { PowerOfAI } from "@/components/aiteam/PowerOfAI";
import { ExampleChartsSection } from "@/components/home/charts/ExampleCharts";
import { ClientViewSection, FinalCTASection, ProofSection } from "@/components/home/HomeSections";
import { CommitmentBlock } from "@/components/sections/v4/CommitmentBlock";
import { OfferSection } from "@/components/offer/OfferSection";
import { FAQControl } from "@/components/sections/v4/FAQControl";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { LANDING_FAQS } from "@/data/landing";
import { GENERIC_BOOK_URL } from "@/data/niches";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Every enquiry answered in 60 seconds | Verdance Systems AI",
    description:
      "Every call and message answered within 60 seconds, day or night, and booked into your calendar. Built for you, owned by you. Free Operations Map first.",
    url: `${SITE_URL}/`,
    type: "website",
  },
};

// FAQPage structured data - server-rendered so it's in the initial HTML.
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: LANDING_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/**
 * Home - one story:
 * the claim (one phone, cycling through real kinds of enquiry) -> what we do
 * for any business that runs on enquiries -> Ashford's Staff (the AI team) ->
 * example charts (reply time, after-hours cover, pipeline) ->
 * the offer -> how it works -> what you see as a client -> what slow replies cost you ->
 * proof -> current offers ->
 * clear terms -> questions -> book. The hero phone is the only phone here.
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      <HomeHero />
      <CapabilityMarquee />
      <WhatWeDoSection />
      <PowerOfAI variant="short" />
      <ExampleChartsSection />
      <OfferSection />
      <CommitmentBlock ctaHref={GENERIC_BOOK_URL} ctaLabel="Get your free Operations Map" />
      <HowItWorksSection />
      <ClientViewSection />
      <CostSection />
      <ProofSection />
      <NicheGrid tone="canvas-2" />
      <FAQControl faqs={LANDING_FAQS} />
      <FinalCTASection />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Get your free Operations Map" />
    </>
  );
}
