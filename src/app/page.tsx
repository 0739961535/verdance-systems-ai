import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { LeakSection } from "@/components/home/LeakSection";
import { NicheGrid } from "@/components/niche/NicheGrid";
import { HowItWorksStory } from "@/components/home/HowItWorksStory";
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
 * the claim (a phone doing the work) -> the leak (the same 19:00 call, without
 * and with us, and what it costs you) -> current offers -> how it works ->
 * what you see as a client -> proof -> guarantee -> questions -> book.
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      <HomeHero />
      <LeakSection />
      <NicheGrid tone="canvas-2" />
      <HowItWorksStory />
      <ClientViewSection />
      <ProofSection />
      <GuaranteeBlock ctaHref={GENERIC_BOOK_URL} ctaLabel="Book your free pre-audit" />
      <FAQControl />
      <FinalCTASection />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free pre-audit" />
    </>
  );
}
