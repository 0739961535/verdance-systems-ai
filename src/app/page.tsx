import type { Metadata } from "next";
import { InControl, SimpleFinalCTA, SimpleHero, WatchItWork, WhatYouGet } from "@/components/home/SimpleHome";
import { ProcessChapter } from "@/components/home/ProcessChapter";
import { QuestionsChapter } from "@/components/home/QuestionsChapter";
import { FilmStory } from "@/components/home/flight/FilmStory";
import { FlightStory } from "@/components/home/flight/FlightStory";

/** The flight as a scroll-scrubbed film (rocket v6). Roll back to the
 * illustrated flight with FLIGHT_FILM=0 at build time. */
const FLIGHT_FILM = process.env.FLIGHT_FILM !== "0";
import { RecentWork } from "@/components/home/RecentWork";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { BookingSection } from "@/components/booking/BookingSection";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/niches";
import { CTA_PRIMARY, SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "We don't talk about AI. We ship it. | Verdance Systems AI",
    description:
      "Find out what AI can really do for your business. Verdance answers your customers, follows up, does the admin and reports back. You stay in control.",
    url: `${SITE_URL}/`,
    type: "website",
  },
};

/**
 * Home (rocket v7, design review Oct 2026: growth-lab/WEBSITE_NEXT_LEVEL_REVIEW.md).
 * Film, one demo, two proofs, the tools, four services, our own system,
 * one promise, one ending:
 * 1 the film (opens on the launch pad with the tagline, then how we work in
 * three steps) -> 2 watch it work -> 3 recent work, then the work slider
 * -> 4 works with your tools -> 5 what you get -> 6 built for our own business -> 7 you stay in
 * control -> 8 the closing scene.
 *
 * TODO(Daniel): real numbers for the proof. The example charts were removed
 * (they read as "no results"); add the e-commerce brand's figures to
 * RecentWork once Peter gives written OK.
 */
export default function HomePage() {
  if (!FLIGHT_FILM) {
    return (
      <>
        <SimpleHero />
        <FlightStory />
        <div className="cv-below">
          <WatchItWork />
        </div>
        <div className="cv-below">
          <WhatYouGet />
        </div>
        <div className="cv-below">
          <InControl />
        </div>
        <div className="cv-below">
          <SimpleFinalCTA />
        </div>
        <StickyMobileCTA href={GENERIC_BOOK_URL} label={CTA_PRIMARY} />
      </>
    );
  }
  return (
    <>
      <FilmStory />
      {/* Seven sections (V20 brief): film, demo, what we build, proof,
          process, questions, book. Each below-the-film section is skipped
          by layout and paint until it nears the screen. Detail that used to
          live here moved: the four jobs and the websites chapter to
          /services, "built for our own business" to /about, the promise
          statement to /how-it-works. */}
      <div className="cv-below">
        <WatchItWork />
      </div>
      <div className="cv-below">
        <WhatWeBuild />
      </div>
      <div className="cv-below">
        <RecentWork />
      </div>
      <div className="cv-below">
        <ProcessChapter />
      </div>
      <div className="cv-below">
        <QuestionsChapter />
      </div>
      {/* id="book": the page's booking links scroll here. Not in .cv-below:
          the flow measures itself. */}
      <BookingSection />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label={CTA_PRIMARY} />
    </>
  );
}
