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
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { SITE_URL } from "@/data/site";
import { ORGANIZATION_LD, ORG_ID, PERSON_LD } from "@/data/entity";

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
  metadataBase: new URL(SITE_URL),
  title: "Verdance Systems AI | Every enquiry answered in 60 seconds",
  description:
    "Every enquiry answered within 60 seconds, every follow-up done, and your team's hours back. Live in 10 working days. Start with a free Operations Map.",
  applicationName: "Verdance Systems AI",
  keywords: [
    "AI receptionist South Africa",
    "WhatsApp automation for business",
    "AI automation agency South Africa",
    "speed to lead",
    "lead response time",
    "missed call text back",
    "after hours call answering",
    "AI agents for business",
  ],
  authors: [{ name: "Daniel Bouwer", url: `${SITE_URL}/about` }],
  creator: "Verdance Systems AI",
  publisher: "Verdance Systems AI",
  openGraph: {
    title: "Verdance Systems AI | Every enquiry answered in 60 seconds",
    description:
      "Every enquiry answered within 60 seconds, every follow-up done, and your team's hours back. Live in 10 working days. Start with a free Operations Map.",
    url: SITE_URL,
    type: "website",
    locale: "en_GB",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verdance Systems AI | Every enquiry answered in 60 seconds",
    description:
      "Every enquiry answered within 60 seconds, every follow-up done. Live in 10 working days. Start with a free Operations Map.",
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

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    ORGANIZATION_LD,
    PERSON_LD,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Verdance Systems AI",
      publisher: { "@id": ORG_ID },
      inLanguage: "en-ZA",
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
        <SiteAnalytics />
      </body>
    </html>
  );
}
