/**
 * The site's canonical origin. Every canonical tag, the sitemap, robots.txt
 * and all JSON-LD read this one value, so switching between the apex and www
 * is a one-line change. It must match the primary domain set in Vercel
 * (Daniel is making the apex primary, with www redirecting to it).
 */
export const SITE_URL = "https://verdancesystemsai.com";

export const SITE = {
  name: "Verdance Systems AI",
  shortName: "Verdance",
  // CIPC registration (COR14.3). Shown on the site because the ECT Act s43 asks
  // a seller online to publish its full name, registration number and address.
  regNumber: "2025/788107/07",
  email: "daniel@verdancesystemsai.com",
  phone: "+27 73 996 1535", // South Africa
  phoneUK: "+44 7432 351517", // United Kingdom
  location: "Worldwide · Remote-first",
  whatsapp: {
    href: "https://wa.me/27739961535?text=Hi%20Daniel%2C%20I%27d%20like%20to%20know%20more%20about%20Verdance%20Systems%20AI.",
    display: "+27 73 996 1535",
  },
  linkedin: "https://www.linkedin.com/in/daniel-bouwer/",
  ghlBooking: "https://api.leadconnectorhq.com/widget/booking/yLGPT8nNF78G32doGmoW",
  tagline: "We don't talk about AI. We ship it.",
};

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

/** The one main button on every page. Always goes to the free Operations Map. */
export const CTA_PRIMARY = "Book a free 30-minute call";
export const CTA_PRIMARY_MICRO = "Nothing to sign.";
