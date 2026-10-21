import type { Metadata } from "next";
import { IndustryDemoSwitch } from "@/components/industries/IndustryDemoSwitch";
import { IndustryIndex } from "@/components/industries/IndustryIndex";
import { NightEarth } from "@/components/industries/NightEarth";
import { PageHero } from "@/components/kit/PageHero";
import { CTABand } from "@/components/kit/CTABand";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SITE_URL } from "@/data/site";

const TITLE = "AI for Your Industry: Enquiries Answered | Verdance";
const DESCRIPTION =
  "E-commerce, venues, lodges, builders, clinics and more. Every enquiry answered within 60 seconds, in SA and the UK. Start with a free Operations Map.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/industries" },
  openGraph: {
    images: ["/opengraph-image"],
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/industries`,
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
  ],
};

export default function IndustriesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Built around how <span className="italic-accent">your enquiries arrive.</span>
          </>
        }
        lead="An online shop, a venue and a clinic get very different messages. We build around yours: your channels and your busy hours."
        crumbs={[{ href: "/", label: "Home" }, { label: "Industries" }]}
        visual={<NightEarth />}
        note="SA and UK · every enquiry answered within 60 seconds"
      />

      <IndustryIndex />

      {/* the one demo on the page: pick a business, watch it reply */}
      <IndustryDemoSwitch />

      <CTABand
        points={["Where your team's hours go", "How long your customers wait", "A written plan: what to fix first"]}
      />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free 30-minute call" />
    </>
  );
}
