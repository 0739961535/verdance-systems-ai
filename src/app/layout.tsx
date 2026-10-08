import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MEGA_MENUS, NICHE_LINKS } from "@/components/layout/navMenus";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/primitives/SmoothScroll";
import { GHLChatWidget } from "@/components/primitives/GHLChatWidget";
import { BrandStudio } from "@/components/primitives/BrandStudio";
import { NoPullToRefresh } from "@/components/primitives/NoPullToRefresh";
import { RevealObserver } from "@/components/primitives/RevealObserver";
import { Interactions } from "@/components/primitives/Interactions";

// Satoshi (Indian Type Foundry, ITF Free Font License): headlines and body.
// The woff2 is fetched at build time by scripts/fetch-fonts.mjs because the
// licence forbids publishing the file in this public repository.
const satoshi = localFont({
  src: "../fonts/satoshi/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  style: "normal",
  display: "swap",
  fallback: ["system-ui", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

// The accent word ("ship"). Instrument Serif only ships one weight.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
});

// Labels, times and numbers.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://verdancesystemsai.com"),
  title: "Verdance Systems AI | We don't talk about AI. We ship it.",
  description:
    "We build the thing that answers your phone, replies to your messages and books people into your calendar, day or night. You own all of it. Start with a free 30 minute audit call.",
  applicationName: "Verdance Systems AI",
  keywords: [
    "AI systems agency",
    "AI automation agency",
    "AI agents for business",
    "conversation AI",
    "voice AI agent",
    "WhatsApp AI",
    "CRM automation",
    "AI receptionist",
    "lead follow-up automation",
    "MCP integrations",
  ],
  authors: [{ name: "Daniel Bouwer", url: "https://www.linkedin.com/in/daniel-bouwer/" }],
  creator: "Verdance Systems AI",
  publisher: "Verdance Systems AI",
  openGraph: {
    title: "Verdance Systems AI - We don't talk about AI. We ship it.",
    description:
      "Every call and message answered in seconds, at any hour, and booked straight into your calendar. Built for you, owned by you. Free audit call first.",
    url: "https://verdancesystemsai.com",
    type: "website",
    locale: "en_GB",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verdance Systems AI - We don't talk about AI. We ship it.",
    description:
      "Every call and message answered in seconds, any hour, and booked in. Free audit call first.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
    { media: "(prefers-color-scheme: light)", color: "#F5F3EE" },
  ],
};

// Runs before paint: applies the saved/OS theme to <html> so there is no
// flash of the wrong theme on load.
// Also marks <html> with `js` so progressive-enhancement styles (reveals)
// only ever apply when JavaScript is actually running.
const NO_FLASH = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}d.setAttribute('data-theme',t);}catch(e){d.setAttribute('data-theme','dark');}})();`;

const SITE_URL = "https://verdancesystemsai.com";
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Verdance Systems AI",
      url: SITE_URL,
      email: "daniel@verdancesystemsai.com",
      logo: `${SITE_URL}/logo.png`,
      description:
        "An AI systems agency that designs, builds and runs marketing, sales, operations and automation systems - conversation AI, voice agents, CRM, custom AI agents and integrations.",
      founder: { "@type": "Person", name: "Daniel Bouwer" },
      areaServed: [
        { "@type": "Country", name: "South Africa" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "AdministrativeArea", name: "Gauteng" },
        { "@type": "AdministrativeArea", name: "Western Cape" },
        { "@type": "AdministrativeArea", name: "KwaZulu-Natal" },
        { "@type": "AdministrativeArea", name: "Greater London" },
        { "@type": "AdministrativeArea", name: "Greater Manchester" },
        { "@type": "AdministrativeArea", name: "West Midlands" },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+27739961535",
          contactType: "sales",
          areaServed: "ZA",
          availableLanguage: ["English", "Afrikaans"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+447432351517",
          contactType: "sales",
          areaServed: "GB",
          availableLanguage: ["English"],
        },
      ],
      // Every profile listed here is one more place an AI engine can confirm
      // this company exists and does what it says. One link is close to no
      // signal. Add each URL here the day the profile goes live.
      sameAs: [
        "https://www.linkedin.com/in/daniel-bouwer/",
        // TODO add as they go live, in roughly this order of value:
        //   company LinkedIn page
        //   Google Business Profile (the maps URL)
        //   Clutch profile
        //   Crunchbase
        //   YouTube channel
      ],
      knowsAbout: [
        "AI automation",
        "conversation AI",
        "voice AI agents",
        "AI receptionists",
        "CRM automation",
        "lead generation systems",
        "Google review automation",
        "MCP server integrations",
        "custom AI agents",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI systems",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Marketing systems",
              description:
                "Lead generation, database reactivation, landing pages and funnels, Google review automation, websites and custom apps, and social content systems.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Sales systems",
              description:
                "Conversation AI across WhatsApp, SMS and social DMs, inbound and outbound voice AI agents, AI receptionists, smart scheduling and automated follow-up.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Internal operations systems",
              description:
                "Customised CRM and pipelines, lead scoring, payments and invoicing automation, tracking dashboards and reporting.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Automation systems",
              description:
                "Custom AI agents, MCP server integrations, client intake automation and workflow automation between business tools.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Verdance Systems AI",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${satoshi.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-[color:var(--color-ink)] antialiased">
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <NoPullToRefresh />
        <SmoothScroll>
          <Navbar menus={MEGA_MENUS} niches={NICHE_LINKS} />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <RevealObserver />
        <Interactions />
        <div aria-hidden className="site-grain" />
        <GHLChatWidget />
        {process.env.NEXT_PUBLIC_BRAND_STUDIO === "1" && <BrandStudio />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
