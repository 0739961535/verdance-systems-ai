import type { Metadata } from "next";
import { HowHero } from "@/components/how/HowHero";
import { OurBelief } from "@/components/home/bloom/OurBelief";
import { HowSteps } from "@/components/how/HowSteps";
import { HowYouDo } from "@/components/how/HowYouDo";
import { StatementChapter } from "@/components/home/chapters/StatementChapter";
import { SimpleFinalCTA } from "@/components/home/SimpleHome";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SITE_URL } from "@/data/site";

const TITLE = "How Verdance Works | From First Call to Live";
const DESCRIPTION =
  "Five steps: a free 30-minute call, a free map of where time and money leak, a written plan you decide on, a build that is live in 10 working days, and a review at day 90.";

export const metadata: Metadata = {
  alternates: { canonical: "/how-it-works" },
  openGraph: {
  images: ["/opengraph-image"], title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/how-it-works`, type: "website", siteName: "Verdance Systems AI" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  title: TITLE,
  description: DESCRIPTION,
};

/**
 * /how-it-works in the home page's design system: a night hero, the five
 * steps on an orbit band with a glowing rail and one sample screen per
 * step, what is asked of the owner, then the closing scene.
 * The older six /how-it-works/[step] detail pages still resolve for links
 * and search, they are just no longer listed here.
 */
export default function HowItWorksPage() {
  return (
    <>
      <HowHero />
      <OurBelief />
      <div className="cv-below">
        <HowSteps />
      </div>
      <div className="cv-below">
        <HowYouDo />
      </div>
      <div className="cv-below">
        <StatementChapter />
      </div>
      <SimpleFinalCTA title={["Start with a", "free", "call."]} />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free 30-minute call" />
    </>
  );
}
