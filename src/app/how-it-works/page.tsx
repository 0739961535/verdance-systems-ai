import type { Metadata } from "next";
import { HowHero } from "@/components/how/HowHero";
import { OurBelief } from "@/components/home/bloom/OurBelief";
import { HowSteps } from "@/components/how/HowSteps";
import { HowYouDo } from "@/components/how/HowYouDo";
import { HowSunrise } from "@/components/how/HowSunrise";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SITE_URL } from "@/data/site";

const TITLE = "How Verdance Works | From First Call to Live";
const DESCRIPTION =
  "Five steps: a free call, a free map of where time and money leak, a plan you decide on, live in 10 working days, then a review at day 90.";

export const metadata: Metadata = {
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    images: ["/opengraph-image"],
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/how-it-works`,
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  title: TITLE,
  description: DESCRIPTION,
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "How it works", item: `${SITE_URL}/how-it-works` },
  ],
};

/**
 * /how-it-works: a night hero, our belief as one quote, the five steps as a
 * growing stem (bud to bloom), what is asked of the owner, then the day 90
 * sunrise on the Earth's limb with the call to action.
 * The older /how-it-works/[step] detail pages still resolve for links and
 * search, they are just no longer listed here.
 */
export default function HowItWorksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <HowHero />
      <OurBelief />
      <div className="cv-below">
        <HowSteps />
      </div>
      <div className="cv-below">
        <HowYouDo />
      </div>
      <HowSunrise />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free 30-minute call" />
    </>
  );
}
