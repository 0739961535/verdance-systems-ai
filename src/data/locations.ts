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
 *    city. Fifteen real pages beat forty templated ones, and forty templated
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
  // ---------------------------------------------------------------- Gauteng
  {
    slug: "johannesburg",
    name: "Johannesburg",
    region: "Gauteng",
    country: "ZA",
    addressRegion: "Gauteng",
    angle: "A commuter city, so a large share of enquiries arrive in the window after most offices have closed.",
    localContext:
      "Traffic shapes when people phone. A great many calls land between 17:00 and 20:00, from customers ringing on the drive home, which is exactly the window a closed office misses. Businesses running several branches off one switchboard feel it worst, because the calls stack up somewhere nobody is watching.",
    industries: ["Legal and financial services", "Automotive dealerships", "Medical and dental practices", "Property"],
    commonLoss: "Enquiries that arrive after the office closes and sit until the next morning.",
  },
  {
    slug: "pretoria",
    name: "Pretoria",
    region: "Gauteng",
    country: "ZA",
    addressRegion: "Gauteng",
    angle: "Where this business started, and a city of long-established owner-run practices.",
    localContext:
      "Many practices here have been running fifteen or twenty years on systems that work perfectly while the owner is in the building. The gap appears the moment they try to grow without adding staff. Long reputations also mean word of mouth and reviews carry more weight here than paid advertising does.",
    industries: ["Medical and dental practices", "Legal services", "Home services", "Education"],
    commonLoss: "Growth capped by how many calls one person can physically answer.",
  },
  {
    slug: "sandton",
    name: "Sandton",
    region: "Gauteng",
    country: "ZA",
    addressRegion: "Gauteng",
    angle: "The highest value per enquiry in the country, which changes the arithmetic of a missed call entirely.",
    localContext:
      "When a single engagement runs into six figures, one enquiry lost to voicemail is not a rounding error, it is the month. This market also reads response speed as a proxy for competence, so a slow first reply costs the deal and the impression at the same time.",
    industries: ["Financial and professional services", "Legal services", "Property", "Corporate consulting"],
    commonLoss: "High-value enquiries lost to a slow first response.",
  },
  {
    slug: "centurion",
    name: "Centurion",
    region: "Gauteng",
    country: "ZA",
    addressRegion: "Gauteng",
    angle: "Office-park country, so most businesses here sell to other businesses rather than to walk-in customers.",
    localContext:
      "A B2B enquiry behaves nothing like a consumer one. It arrives by email or form rather than by phone, it comes from someone comparing three suppliers, and it needs qualifying before it is worth a meeting. The bottleneck is rarely volume, it is the days lost between an enquiry landing and somebody working out whether it is serious.",
    industries: ["B2B technology and software", "Engineering and consulting", "Corporate services", "Training providers"],
    commonLoss: "Days lost qualifying enquiries by hand while a competitor books the meeting.",
  },
  {
    slug: "midrand",
    name: "Midrand",
    region: "Gauteng",
    country: "ZA",
    addressRegion: "Gauteng",
    angle: "The logistics corridor between the two big cities, where the customer asking is usually asking about timing.",
    localContext:
      "Warehousing, distribution and freight businesses field the same handful of questions all day: where is it, when does it arrive, can you collect. Those are answerable without a person, and answering them automatically frees the people who should be handling exceptions. The cost here is not lost sales so much as staff time spent on questions a system can answer.",
    industries: ["Logistics and freight", "Warehousing and distribution", "Manufacturing", "Wholesale"],
    commonLoss: "Staff spending their day answering the same three questions about timing.",
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
    angle: "Wine tourism and a university town in one, which means two customer types with nothing in common.",
    localContext:
      "An estate fields international booking enquiries in several time zones while also serving a local market that turns over completely every few years as students arrive and leave. One is asking at 03:00 from another continent, the other wants an answer on a phone in the next ten minutes. Very few businesses here are set up to do both well.",
    industries: ["Wine estates and tourism", "Restaurants and events", "Student accommodation", "Technology startups"],
    commonLoss: "International enquiries arriving overnight, answered a full day later.",
  },
  {
    slug: "george",
    name: "George",
    region: "Western Cape",
    country: "ZA",
    addressRegion: "Western Cape",
    angle: "A Garden Route retirement market, where customers still strongly prefer to phone rather than fill in a form.",
    localContext:
      "The customer base here skews older than almost anywhere else in the country, and an older customer who reaches a voicemail usually does not leave a message and does not try again later. They phone the next number instead. A web form is not a substitute for answering, and businesses that moved their enquiries online without keeping the phone covered tend to have quietly lost volume without ever seeing it.",
    industries: ["Healthcare and frail care", "Home services and maintenance", "Property", "Hospitality"],
    commonLoss: "Older customers who hit voicemail once and simply do not call back.",
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
  {
    slug: "pietermaritzburg",
    name: "Pietermaritzburg",
    region: "KwaZulu-Natal",
    country: "ZA",
    addressRegion: "KwaZulu-Natal",
    angle: "A provincial capital, so a lot of the work here runs on appointments and paperwork rather than on sales.",
    localContext:
      "Government, education and legal work all run on scheduled appointments and forms that have to be filled in before anything can start. The delay is almost never in the work itself, it is in the back and forth to book a slot and collect documents. That is the part that can happen without anyone being involved.",
    industries: ["Legal services", "Education", "Healthcare", "Professional services"],
    commonLoss: "Weeks lost to booking back and forth and chasing missing paperwork.",
  },

  // ---------------------------------------------------------- Eastern Cape
  {
    slug: "gqeberha",
    name: "Gqeberha",
    region: "Eastern Cape",
    country: "ZA",
    addressRegion: "Eastern Cape",
    angle: "A manufacturing city built around vehicle assembly and the supplier network underneath it.",
    localContext:
      "A supplier here lives or dies on responsiveness to a handful of very large customers, and enquiries arrive as specifications and requests for quotation rather than as sales calls. Missing one is not a lost lead, it is a lost place on a tender list that may not reopen for a year. Acknowledging fast matters almost as much as quoting well.",
    industries: ["Automotive manufacturing and suppliers", "Engineering", "Logistics", "Industrial services"],
    commonLoss: "Requests for quotation that sit unacknowledged past the point of being competitive.",
  },

  // ------------------------------------------------------------ Free State
  {
    slug: "bloemfontein",
    name: "Bloemfontein",
    region: "Free State",
    country: "ZA",
    addressRegion: "Free State",
    angle: "The judicial capital, sitting in the middle of a large agricultural region, serving both at once.",
    localContext:
      "Legal and professional practices here take enquiries from across the province, not just from the city, which means a lot of first contact happens by phone from somewhere an hour or more away. Those callers will not drive in to ask a question. Whatever can be answered and booked over the phone is the difference between winning that client and never hearing from them again.",
    industries: ["Legal services", "Agriculture and agri-services", "Education", "Healthcare"],
    commonLoss: "Callers from out of town who cannot get an answer and do not try twice.",
  },

  // --------------------------------------------------------------- Limpopo
  {
    slug: "polokwane",
    name: "Polokwane",
    region: "Limpopo",
    country: "ZA",
    addressRegion: "Limpopo",
    angle: "A regional hub serving a catchment far larger than the city, most of it a long drive away.",
    localContext:
      "A business here is often the nearest option for customers spread across hundreds of kilometres. That makes the phone the branch: if a customer cannot get a question answered and an appointment confirmed remotely, the trip does not happen and neither does the sale. Distance turns a missed call into a lost customer more reliably here than in any metro.",
    industries: ["Mining services", "Agriculture", "Healthcare", "Home and trade services"],
    commonLoss: "Customers too far away to call in person, lost the moment nobody answers.",
  },

  // ------------------------------------------------------------ Mpumalanga
  {
    slug: "mbombela",
    name: "Mbombela",
    region: "Mpumalanga",
    country: "ZA",
    addressRegion: "Mpumalanga",
    angle: "The gateway to the Kruger, so a large share of enquiries come from other time zones entirely.",
    localContext:
      "Lodges, tour operators and the businesses around them take booking enquiries from Europe and North America that arrive overnight in local time. By the time anyone reads them the traveller has usually booked elsewhere, because they were comparing several options in one sitting. Overnight cover is not a nice-to-have in this market, it is most of the opportunity.",
    industries: ["Lodges and tourism", "Tour operators", "Agriculture", "Hospitality"],
    commonLoss: "Overseas booking enquiries arriving overnight and answered too late to win.",
  },

  // ------------------------------------------------------------ North West
  {
    slug: "rustenburg",
    name: "Rustenburg",
    region: "North West",
    country: "ZA",
    addressRegion: "North West",
    angle: "A mining services economy running on shifts, so the working day never really stops.",
    localContext:
      "Contractors and suppliers here deal with clients operating around the clock, which means urgent requests arrive at hours no office covers. The businesses that win the repeat contracts are usually the ones that answered at 22:00, not the ones with the best price. Availability is the differentiator in a market where the technical offering is broadly similar.",
    industries: ["Mining services and contracting", "Industrial supply", "Engineering", "Fleet and logistics"],
    commonLoss: "Urgent out-of-hours requests going to whoever picked up instead.",
  },

  // ------------------------------------------------------- United Kingdom
  {
    slug: "london",
    name: "London",
    region: "Greater London",
    country: "GB",
    addressRegion: "Greater London",
    angle: "The most crowded market on this list, so speed of reply is often the only differentiator left.",
    localContext:
      "Buyers here routinely contact three or four suppliers at once and go with whoever answers first, which makes reply time worth more than almost any other improvement. The second-fastest response frequently gets nothing at all. It also means follow-up has to stop cleanly the moment someone replies, or it reads as spam in a market already saturated with it.",
    industries: ["Professional services", "Property and lettings", "Private healthcare", "Trades and home services"],
    commonLoss: "Losing to whichever competitor replied first.",
  },
  {
    slug: "manchester",
    name: "Manchester",
    region: "Greater Manchester",
    country: "GB",
    addressRegion: "Greater Manchester",
    angle: "A strong trades and home services market, where the person who answers the phone is holding the tools.",
    localContext:
      "Calls go unanswered at exactly the times the business is busiest and most profitable, because the owner is on a job. Missed call recovery tends to pay for itself faster here than anything else, since the caller is usually still deciding when the message reaches them.",
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
      "One strong branch and one weak one is the common pattern. The enquiries are arriving, but how fast they are answered depends entirely on which site picked up, and nobody has a view across all of them. The fix is usually one shared system and one shared number rather than more staff.",
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
