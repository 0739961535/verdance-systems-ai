import type { Metadata } from "next";
import { InControl, SimpleFinalCTA, SimpleHero, WatchItWork, WhatYouGet } from "@/components/home/SimpleHome";
import { FlightStory } from "@/components/home/flight/FlightStory";
import { ExampleChartsSection } from "@/components/home/charts/ExampleCharts";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/niches";
import { CTA_PRIMARY, SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "We don't talk about AI. We ship it. | Verdance Systems AI",
    description:
      "Find out what AI can really do for your business. We set up AI that answers customers, follows up, does the admin and reports back. You stay in control.",
    url: `${SITE_URL}/`,
    type: "website",
  },
};

/**
 * Home, kept simple on purpose (docs/simplicity-review.md): seven sections,
 * one idea each, one main button.
 * 1 hero (tagline + rocket) -> 2 the flight (how it works as a rocket
 * climb: launch, ascent, orbit; docs/rocket-scroll-research.md) ->
 * 3 watch it work (the enquiry demo, "in orbit") -> 4 example charts ->
 * 5 what you get -> 6 you stay in control -> 7 final call to action.
 */
export default function HomePage() {
  return (
    <>
      <SimpleHero />
      <FlightStory />
      {/* below the fold: skipped by layout and paint until they near the
          screen (content-visibility), so the first paint is only the hero */}
      <div className="cv-below">
        <WatchItWork />
      </div>
      <div className="cv-below">
        <ExampleChartsSection />
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
