/**
 * Who we are, as structured data. One set of facts (SEO plan, section 5),
 * shared by the root layout and /about so schema, page copy and llms.txt
 * never disagree. No prices, no invented numbers, no client names.
 */
import { SITE, SITE_URL } from "@/data/site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/about#daniel-bouwer`;

export const ORG_DESCRIPTION =
  "Verdance Systems AI builds The Revenue Team for owner-led South African businesses: every enquiry answered within 60 seconds, every follow-up done, and the team's hours back. Live in 10 working days, backed by the 60-Second Guarantee and the Break-Even Exit at day 90. It starts with a free Operations Map.";

export const PERSON_LD = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Daniel Bouwer",
  jobTitle: "Founder",
  description:
    "Founder of Verdance Systems AI. Builds AI systems that answer enquiries and follow up for owner-led businesses in South Africa.",
  url: `${SITE_URL}/about`,
  worksFor: { "@id": ORG_ID },
  nationality: { "@type": "Country", name: "South Africa" },
  knowsAbout: ["Lead response time", "WhatsApp automation", "AI receptionists", "AI agents for business", "POPIA"],
  // Add Instagram, YouTube and other profiles here the day they are public.
  sameAs: [SITE.linkedin],
};

export const ORGANIZATION_LD = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Verdance Systems AI",
  url: SITE_URL,
  email: SITE.email,
  logo: `${SITE_URL}/logo.png`,
  description: ORG_DESCRIPTION,
  founder: { "@id": PERSON_ID },
  areaServed: [
    { "@type": "Country", name: "South Africa" },
    { "@type": "AdministrativeArea", name: "Gauteng" },
    { "@type": "AdministrativeArea", name: "Western Cape" },
    { "@type": "AdministrativeArea", name: "KwaZulu-Natal" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+27739961535",
      contactType: "sales",
      areaServed: "ZA",
      availableLanguage: ["English", "Afrikaans"],
    },
  ],
  // Every profile listed here is one more place an AI engine can confirm
  // this company exists and does what it says. Add each URL the day the
  // profile goes live: company LinkedIn page, Google Business Profile,
  // Clutch, Crunchbase, YouTube.
  sameAs: [SITE.linkedin],
  knowsAbout: [
    "Lead response time",
    "WhatsApp automation",
    "AI receptionists",
    "After-hours call answering",
    "Missed call text back",
    "Quote follow-up",
    "AI agents for business",
    "POPIA-compliant customer messaging",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "How we work",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "The Operations Map",
          description:
            "A free 30-minute call that shows where time and money leak in your enquiries, follow-up and admin, in rand and hours, and what to fix first.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "The Revenue Team",
          description:
            "Every enquiry on WhatsApp, phone, website, email and social answered within 60 seconds, every follow-up done, and a person brought in the moment it matters. Live in 10 working days. 60-Second Guarantee: if fewer than 99% of enquiries are answered within 60 seconds in a month, that month is credited. Break-Even Exit: if it has not paid for itself by day 90, you can leave at the day-90 review.",
        },
      },
    ],
  },
};
