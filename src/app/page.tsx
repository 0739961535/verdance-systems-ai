import type { Metadata } from "next";
import { InControl, SimpleFinalCTA, SimpleHero, WatchItWork, WhatYouGet } from "@/components/home/SimpleHome";
import { ProcessChapter } from "@/components/home/ProcessChapter";
import { QuestionsChapter } from "@/components/home/QuestionsChapter";
import { FilmStory } from "@/components/home/flight/FilmStory";
import { FlightStory } from "@/components/home/flight/FlightStory";
import { LaunchHero } from "@/components/home/hero/LaunchHero";
import { BloomHero } from "@/components/home/bloom/BloomHero";
import { EarthLimb } from "@/components/home/hero/EarthLimb";
import { LazySections } from "@/components/home/hero/LazySections";
import { AssistantLive } from "@/components/home/AssistantLive";
import { WatchArrives } from "@/components/home/bloom/WatchArrives";

/** The illustrated flight is the old fallback (FLIGHT_FILM=0). The scroll
 * film (real footage) is off for now: HERO_FILM=1 at build time brings it
 * back; otherwise the still hero ships and the film's frames never load. */
const FLIGHT_FILM = process.env.FLIGHT_FILM !== "0";
const HERO_FILM = process.env.HERO_FILM === "1";
import { HomePortfolio } from "@/components/home/portfolio/HomePortfolio";
import { BookingSection } from "@/components/booking/BookingSection";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/niches";
import { CTA_PRIMARY, SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    images: ["/opengraph-image"],
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
      {HERO_FILM ? (
        <FilmStory />
      ) : (
        <>
          <BloomHero />
          <LaunchHero />
        </>
      )}
      {/* the live work first, then the Operations Team it all runs on
          (V31 order); sections skip layout and paint until near the screen */}
      <div className="cv-below">
        <WatchArrives />
      </div>
      <div className="cv-below">
        <WhatYouGet />
      </div>
      <EarthLimb />
      <LazySections />
      <div className="cv-below">
        <HomePortfolio />
      </div>
      <div className="cv-below">
        <ProcessChapter />
      </div>
      <div className="cv-below">
        <QuestionsChapter />
      </div>
      {/* the booking flow (id="book"); not in .cv-below: it measures itself */}
      <BookingSection />
      <AssistantLive />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label={CTA_PRIMARY} />
    </>
  );
}
