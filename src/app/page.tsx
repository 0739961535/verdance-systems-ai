import type { Metadata } from "next";
import { HeroControlRoom } from "@/components/sections/v4/HeroControlRoom";
import { CapabilityTicker } from "@/components/sections/v4/CapabilityTicker";
import { DeltaRows } from "@/components/sections/v4/DeltaRows";
import { PillarGrid } from "@/components/sections/v4/PillarGrid";
import { DeliveryMethod } from "@/components/sections/v4/DeliveryMethod";
import { GuaranteeBlock } from "@/components/sections/v4/GuaranteeBlock";
import { AuditSection } from "@/components/sections/v4/AuditSection";
import { FAQControl } from "@/components/sections/v4/FAQControl";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { LANDING_FAQS } from "@/data/landing";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Systems Agency | Verdance Systems AI",
    description:
      "AI systems for marketing, sales, operations and automation - designed, built and run for you. You own everything we build. Start with a free AI Systems Audit.",
    url: "https://verdancesystemsai.com/",
    type: "website",
  },
};

// FAQPage structured data - server-rendered so it's in the initial HTML
// (FAQControl is a client component, so we emit the JSON-LD here).
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
 * Home - the Control Room. Single narrative:
 * claim (hero + live dashboard) → proof (deltas) → catalogue (pillars) →
 * method (01-06) → deal (guarantee) → close (audit + FAQ).
 * CTA moments at hero, guarantee and audit only; the middle of the page
 * reads as evidence, not selling.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <HeroControlRoom />
      <CapabilityTicker />
      <DeltaRows />
      <PillarGrid />
      <DeliveryMethod />
      <GuaranteeBlock />
      <AuditSection />
      <FAQControl />
      <StickyMobileCTA />
    </>
  );
}
