/**
 * Location pages.
 *
 * These exist so that someone searching "AI agency Cape Town" finds us. They
 * are the one place on the site where geography is named, deliberately.
 *
 * ---------------------------------------------------------------------------
 * TWO RULES. BOTH MATTER MORE THAN HAVING MORE PAGES.
 * ---------------------------------------------------------------------------
 *
 * 1. NO DOORWAY PAGES.
 *    Google penalises near-identical pages that differ only by a swapped city
 *    name, and the penalty can drag the whole domain down. Every field below
 *    is written per city and none of it is generated. If you cannot write a
 *    true, specific `angle` and `localContext` for a city, do not add the
 *    city. Four real pages beat forty templated ones, and forty templated
 *    ones are an active liability.
 *
 * 2. NO CLAIMS ABOUT OUR OWN DATA.
 *    Everything here describes the local economy, which is checkable, rather
 *    than our enquiry volume, which is not. Write "businesses here tend to",
 *    never "we see the most enquiries from". The moment a page says we have
 *    twelve Polokwane clients, someone asks to speak to one of them.
 *    `industries` means "who this is built for here", not "who has hired us".
 *
 * The rule that pitch decks never name a location still stands. That rule
 * exists so a prospect never thinks "they are not local to me". This is the
 * opposite surface with the opposite job: here we are trying to be found by
 * people who are searching with a place name in the query.
 */

export interface Location {
  slug: string;
  /** How people say it in a search query. */
  name: string;
  /** Formal region, for schema and for the page subtitle. */
  region: string;
  country: "ZA" | "GB";
  /** schema.org addressRegion value. */
  addressRegion: string;
  /** One sentence about this local market that is not true of the others. */
  angle: string;
  /** Two or three sentences of genuinely local detail. Never generated. */
  localContext: string;
  /** Who this is built for here. Not a claim about who has hired us. */
  industries: string[];
  /** The loss businesses in this market tend to share. */
  commonLoss: string;
}

export const LOCATIONS: Location[] = [
  // Four cities, each with genuinely local content (SEO plan, fix 6, 17 Oct
  // 2026). The other fourteen were near-duplicates and now 301 to the closest
  // of these or to /ai-agency (LOCATION_REDIRECTS below, used by next.config).

  // ---------------------------------------------------------------- Gauteng
  {
    slug: "johannesburg",
    name: "Johannesburg",
    region: "Gauteng",
    country: "ZA",
    addressRegion: "Gauteng",
    angle: "A commuter city with Sandton at its centre, so enquiries land after hours and the biggest ones come from people who judge you on reply speed.",
    localContext:
      "Traffic shapes when people get in touch. A great many calls and messages land between 17:00 and 20:00, from customers on the drive home, which is exactly the window a closed office misses. In Sandton, where one engagement can run into six figures, a slow first reply costs the deal and the impression at the same time. Businesses running several Gauteng branches off one number feel it worst, because the enquiries stack up somewhere nobody is watching.",
    industries: ["Design-build and high-end property", "Automotive dealerships", "Professional services", "Multi-branch clinics"],
    commonLoss: "Enquiries that arrive after the office closes and sit until the next morning.",
  },

  // ----------------------------------------------------------- Western Cape
  {
    slug: "cape-town",
    name: "Cape Town",
    region: "Western Cape",
    country: "ZA",
    addressRegion: "Western Cape",
    angle: "Heavy seasonality, so the cost of a missed enquiry swings wildly depending on the month.",
    localContext:
      "Hospitality, tourism and aesthetics businesses here carry a season that can run three or four times their quiet period. A booking process that copes in June quietly fails in December, and it fails as unanswered messages rather than as an error anyone sees. The businesses that feel it worst are those staffed to the average instead of the peak.",
    industries: ["Hospitality and tourism", "Beauty and aesthetics", "Property", "Professional services"],
    commonLoss: "Peak season enquiries arriving faster than a human team can answer them.",
  },
  {
    slug: "stellenbosch",
    name: "Stellenbosch",
    region: "Western Cape",
    country: "ZA",
    addressRegion: "Western Cape",
    angle: "Wine estates here sell tastings, functions, weddings and stays, and all of it arrives in the same inbox.",
    localContext:
      "An estate fields wedding and function enquiries next to tasting bookings and overnight stays, often from overseas guests writing in the middle of our night. Harvest and the summer wedding season land at the same time, exactly when the coordinator has the least time to reply. Couples and planners often ask several venues at once, so the first useful reply tends to win the viewing.",
    industries: ["Wine estates with venues and stays", "Wedding and function venues", "Restaurants and tasting rooms", "Boutique hotels and guest houses"],
    commonLoss: "Wedding and function enquiries arriving overnight, answered a full day later.",
  },

  // ------------------------------------------------------------------- KZN
  {
    slug: "durban",
    name: "Durban",
    region: "KwaZulu-Natal",
    country: "ZA",
    addressRegion: "KwaZulu-Natal",
    angle: "A messaging-first market, far more than a calling one, which changes what needs building.",
    localContext:
      "Customers here will message before they phone, and they expect a reply at the speed of a normal chat rather than the speed of an email. A business running on a phone line and a contact form is close to invisible to a large share of the people trying to reach it. Reply time on messaging is the whole game.",
    industries: ["Logistics and freight", "Hospitality", "Home services", "Retail"],
    commonLoss: "Messages sitting unanswered for hours while the phone line stays quiet.",
  },
];

/**
 * Retired city pages and where they now point. Closest kept city in the same
 * province where there is one, otherwise the /ai-agency index.
 */
export const LOCATION_REDIRECTS: Record<string, string> = {
  sandton: "/ai-agency/johannesburg",
  pretoria: "/ai-agency/johannesburg",
  centurion: "/ai-agency/johannesburg",
  midrand: "/ai-agency/johannesburg",
  george: "/ai-agency/cape-town",
  pietermaritzburg: "/ai-agency/durban",
  gqeberha: "/ai-agency",
  bloemfontein: "/ai-agency",
  polokwane: "/ai-agency",
  mbombela: "/ai-agency",
  rustenburg: "/ai-agency",
  london: "/ai-agency",
  manchester: "/ai-agency",
  birmingham: "/ai-agency",
};

export const LOCATIONS_BY_COUNTRY = {
  ZA: LOCATIONS.filter((l) => l.country === "ZA"),
  GB: LOCATIONS.filter((l) => l.country === "GB"),
};

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
