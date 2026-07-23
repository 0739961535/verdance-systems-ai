import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/v3/HomeHero";
import { TheProblem } from "@/components/sections/v3/TheProblem";
import { SolutionSection } from "@/components/sections/v3/SolutionSection";
import { WhatYouGet } from "@/components/sections/v3/WhatYouGet";
import { HomePipelineSection } from "@/components/sections/v3/HomePipelineSection";
import { ServicesOverview } from "@/components/sections/v3/ServicesOverview";
import { TestimonialsSection } from "@/components/sections/v3/TestimonialsSection";
import { TheOffer } from "@/components/sections/v3/TheOffer";
import { FAQSection } from "@/components/sections/v3/FAQSection";
import { FinalCTA } from "@/components/sections/v3/FinalCTA";
import { FAQS } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Receptionist for Local Businesses | Verdance Systems AI",
    description:
      "A done-for-you AI receptionist that answers every call, text and DM 24/7, follows up with every lead, and books appointments straight into your calendar.",
    url: "https://verdancesystemsai.com/",
    type: "website",
  },
};

// FAQPage structured data — server-rendered so it's in the initial HTML
// (FAQSection is a client component, so we emit the JSON-LD here).
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/**
 * Home — tightened conversion spine.
 * Hook → see it work (live demos, up front) → what we do → the money pipeline →
 * what you get → proof → the offer → objections → close.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <HomeHero />
      <TheProblem />
      <SolutionSection />
      <HomePipelineSection />
      <WhatYouGet />
      <ServicesOverview />
      <TestimonialsSection />
      <TheOffer />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
