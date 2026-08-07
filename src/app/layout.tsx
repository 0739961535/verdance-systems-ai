import type { Metadata, Viewport } from "next";
import { Inter, Geist, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/primitives/SmoothScroll";
import { GHLChatWidget } from "@/components/primitives/GHLChatWidget";
import { BrandStudio } from "@/components/primitives/BrandStudio";
import { NoPullToRefresh } from "@/components/primitives/NoPullToRefresh";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Accent word ("recovered.", "free." etc.) - Fraunces italic reads far clearer
// than the hairline Instrument Serif, with more weight and character.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://verdancesystemsai.com"),
  title: "AI Systems Agency | Marketing, Sales & Automation | Verdance Systems AI",
  description:
    "Verdance designs, builds and runs AI systems across marketing, sales, operations and automation - conversation AI, voice agents, CRM, custom agents and integrations. Book a free AI Systems Audit and leave with a roadmap.",
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
      "AI systems for marketing, sales, operations and automation - designed, built and run for you. You own everything we build. Start with a free AI Systems Audit.",
    url: "https://verdancesystemsai.com",
    type: "website",
    locale: "en_GB",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verdance Systems AI - We don't talk about AI. We ship it.",
    description:
      "AI systems for marketing, sales, operations and automation. Free AI Systems Audit first.",
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
    { media: "(prefers-color-scheme: dark)", color: "#050709" },
    { media: "(prefers-color-scheme: light)", color: "#F4F7FC" },
  ],
};

// Runs before paint: applies the saved/OS theme to <html> so there is no
// flash of the wrong theme on load.
const NO_FLASH = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

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
      areaServed: "Worldwide",
      sameAs: ["https://www.linkedin.com/in/daniel-bouwer/"],
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
      className={`${inter.variable} ${geist.variable} ${jetbrains.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-[color:var(--color-ink)] antialiased">
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <NoPullToRefresh />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <GHLChatWidget />
        {process.env.NEXT_PUBLIC_BRAND_STUDIO === "1" && <BrandStudio />}
      </body>
    </html>
  );
}
