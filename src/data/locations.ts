/**
 * Location pages.
 *
 * These exist so that someone searching "AI agency Cape Town" finds us. They
 * are the one place on the site where geography is named, deliberately.
 *
 * READ THIS BEFORE ADDING A CITY.
 *
 * Google penalises doorway pages: near identical pages that differ only by a
 * swapped city name. That penalty is worse than not having the page at all,
 * and it can drag the rest of the domain down with it.
 *
 * So every field below is written per city and none of it is generated. If you
 * cannot write a true, specific `angle` and `localContext` for a city, do not
 * add the city. Eight real pages beat forty templated ones, and forty
 * templated ones are an active liability.
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
  /** One sentence that is true of this city and not of the others. */
  angle: string;
  /** Two or three sentences of genuinely local detail. Never generated. */
  localContext: string;
  /** The industries we actually see enquiries from here, most first. */
  industries: string[];
  /** The specific loss this city's businesses have in common. */
  commonLoss: string;
}

export const LOCATIONS: Location[] = [
  {
    slug: "johannesburg",
    name: "Johannesburg",
    region: "Gauteng",
    country: "ZA",
    addressRegion: "Gauteng",
    angle: "The highest volume of after-hours enquiries we see anywhere, because the working day starts and ends late.",
    localContext:
      "Traffic shapes the enquiry pattern here more than anywhere else we work. A large share of calls land between 17:00 and 20:00, from people phoning on the commute home, and those are exactly the calls a closed office misses. The businesses that fix this first tend to be the ones with a single receptionist covering several sites.",
    industries: ["Legal and financial services", "Automotive dealerships", "Medical and dental practices", "Property"],
    commonLoss: "Enquiries that arrive after the office closes and nobody picks up until the next morning.",
  },
  {
    slug: "cape-town",
    name: "Cape Town",
    region: "Western Cape",
    country: "ZA",
    addressRegion: "Western Cape",
    angle: "Heavy seasonality, so the cost of a missed enquiry swings wildly depending on the month.",
    localContext:
      "Hospitality, tourism and aesthetics businesses here carry a season that can be three or four times their quiet period. A booking system that copes in June quietly fails in December, and the failure shows up as unanswered messages rather than as an error anybody sees. The businesses that feel this most are the ones who staff to the average rather than the peak.",
    industries: ["Hospitality and tourism", "Beauty and aesthetics", "Property", "Professional services"],
    commonLoss: "Peak season enquiries arriving faster than a human team can answer them.",
  },
  {
    slug: "pretoria",
    name: "Pretoria",
    region: "Gauteng",
    country: "ZA",
    addressRegion: "Gauteng",
    angle: "Where this business started, and still where we see the most established owner-run practices.",
    localContext:
      "A lot of the practices here have been running for fifteen or twenty years on systems that work fine when the owner is in the building. The gap shows up as soon as they try to take on more volume without adding staff. Long-standing reputations also mean review volume matters more here than paid advertising.",
    industries: ["Medical and dental practices", "Legal services", "Home services", "Education"],
    commonLoss: "Growth capped by how many calls one person can physically answer.",
  },
  {
    slug: "durban",
    name: "Durban",
    region: "KwaZulu-Natal",
    country: "ZA",
    addressRegion: "KwaZulu-Natal",
    angle: "WhatsApp-first customers, far more than voice, which changes what needs building.",
    localContext:
      "Customers here will message before they call, and they expect an answer at the speed of a normal chat rather than the speed of an email. A business running on a phone line and an enquiry form is invisible to a large share of the people trying to reach it. Response time on messaging is the whole game.",
    industries: ["Logistics and freight", "Hospitality", "Home services", "Retail"],
    commonLoss: "WhatsApp messages sitting unanswered for hours while the phone line stays quiet.",
  },
  {
    slug: "sandton",
    name: "Sandton",
    region: "Gauteng",
    country: "ZA",
    addressRegion: "Gauteng",
    angle: "Higher value per enquiry than anywhere else we work, so a single missed call costs more.",
    localContext:
      "The arithmetic is different here. When an average engagement runs into six figures, one enquiry lost to a voicemail is not a rounding error, it is the month. Businesses in this market also tend to be judged on response speed as a proxy for competence, which makes a slow first reply expensive twice over.",
    industries: ["Financial and professional services", "Legal services", "Property", "Corporate consulting"],
    commonLoss: "High-value enquiries lost to a slow first response.",
  },
  {
    slug: "london",
    name: "London",
    region: "Greater London",
    country: "GB",
    addressRegion: "Greater London",
    angle: "The most competitive search results we work in, so speed of reply is often the only differentiator left.",
    localContext:
      "Buyers here routinely contact three or four suppliers at once and go with whoever answers first. That makes reply time worth more than almost any other improvement, because the second-fastest response frequently gets nothing at all. It also means follow-up has to stop cleanly the moment someone replies, or it reads as spam in a market that is already saturated.",
    industries: ["Professional services", "Property and lettings", "Private healthcare", "Trades and home services"],
    commonLoss: "Losing to whichever competitor replied first.",
  },
  {
    slug: "manchester",
    name: "Manchester",
    region: "Greater Manchester",
    country: "GB",
    addressRegion: "Greater Manchester",
    angle: "Strong trades and home services market where nearly all enquiries arrive by phone while the owner is on a job.",
    localContext:
      "The person who answers the phone is usually the person holding the tools, which means calls go unanswered at exactly the times the business is busiest and most profitable. Missed call recovery tends to pay for itself here faster than anything else we build, because the caller is often still deciding when the message reaches them.",
    industries: ["Trades and home services", "Property maintenance", "Private healthcare", "Hospitality"],
    commonLoss: "Calls ringing out because the owner is up a ladder.",
  },
  {
    slug: "birmingham",
    name: "Birmingham",
    region: "West Midlands",
    country: "GB",
    addressRegion: "West Midlands",
    angle: "Multi-site operators are common, so the problem is usually consistency between branches rather than volume.",
    localContext:
      "A single strong branch and a weak one is the pattern we see most here. The enquiries are arriving, but how fast they are answered depends entirely on which site picked up, and nobody has a view across all of them. The fix is usually one shared system and one shared number rather than more staff.",
    industries: ["Multi-site healthcare", "Automotive", "Trades and home services", "Professional services"],
    commonLoss: "One branch answering in minutes while another takes two days, and no way to see it.",
  },
];

export const LOCATIONS_BY_COUNTRY = {
  ZA: LOCATIONS.filter((l) => l.country === "ZA"),
  GB: LOCATIONS.filter((l) => l.country === "GB"),
};

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
