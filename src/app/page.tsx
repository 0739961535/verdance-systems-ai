import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { CapabilityMarquee } from "@/components/home/CapabilityMarquee";
import { CostSection, HowItWorksSection, WhatWeDoSection } from "@/components/home/HomeStory";
import { NicheGrid } from "@/components/niche/NicheGrid";
import { PowerOfAI } from "@/components/aiteam/PowerOfAI";
import { ClientViewSection, FinalCTASection, ProofSection } from "@/components/home/HomeSections";
import { GuaranteeBlock } from "@/components/sections/v4/GuaranteeBlock";
import { FAQControl } from "@/components/sections/v4/FAQControl";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { LANDING_FAQS } from "@/data/landing";
import { GENERIC_BOOK_URL } from "@/data/niches";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "We don't talk about AI. We ship it. | Verdance Systems AI",
    description:
      "Every call and message answered within 5 minutes, day or night, and booked into your calendar. Built for you, owned by you. Free pre-audit first.",
    url: "https://verdancesystemsai.com/",
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
 * how it works -> what you see as a client -> what slow replies cost you ->
 * proof -> current offers ->
 * guarantee -> questions -> book. The hero phone is the only phone here.
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      <HomeHero />
      <CapabilityMarquee />
      <WhatWeDoSection />
      <PowerOfAI variant="short" />
      <HowItWorksSection />
      <ClientViewSection />
      <CostSection />
      <ProofSection />
      <NicheGrid tone="canvas-2" />
      <GuaranteeBlock ctaHref={GENERIC_BOOK_URL} ctaLabel="Get your free Operations Map" />
      <FAQControl faqs={LANDING_FAQS} />
      <FinalCTASection />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Get your free Operations Map" />
    </>
  );
}
