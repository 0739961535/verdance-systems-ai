import type { Metadata, Viewport } from "next";
import { Inter, Geist, JetBrains_Mono, Instrument_Serif, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/primitives/SmoothScroll";
import { ChatbotWidget } from "@/components/primitives/ChatbotWidget";
import { BrandStudio } from "@/components/primitives/BrandStudio";

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

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
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
  title: "AI Receptionist for Local Businesses | Verdance Systems AI",
  description:
    "A done-for-you AI receptionist that answers every call, text and DM 24/7, follows up with every lead, and books appointments straight into your calendar. Free consult.",
  applicationName: "Verdance Systems AI",
  keywords: [
    "AI receptionist",
    "missed call text back",
    "lead follow-up automation",
    "AI appointment booking",
    "AI automation agency",
    "AI for local businesses worldwide",
    "WhatsApp AI",
    "voice AI agent",
  ],
  authors: [{ name: "Daniel Bouwer", url: "https://www.linkedin.com/in/daniel-bouwer/" }],
  creator: "Verdance Systems AI",
  publisher: "Verdance Systems AI",
  openGraph: {
    title: "Verdance Systems AI",
    description:
      "We install an AI system that answers every call, follows up with every lead, and books straight into your calendar. Start with a free consult.",
    url: "https://verdancesystemsai.com",
    type: "website",
    locale: "en_GB",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verdance Systems AI",
    description: "AI that books more customers for local businesses. Free consult first.",
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
        "A done-for-you AI automation agency that answers every call, follows up with every lead, and books appointments 24/7 for local businesses worldwide.",
      founder: { "@type": "Person", name: "Daniel Bouwer" },
      areaServed: "Worldwide",
      sameAs: ["https://www.linkedin.com/in/daniel-bouwer/"],
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
      className={`${inter.variable} ${geist.variable} ${jetbrains.variable} ${instrument.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-[color:var(--color-ink)] antialiased">
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <ChatbotWidget />
        {process.env.NEXT_PUBLIC_BRAND_STUDIO === "1" && <BrandStudio />}
      </body>
    </html>
  );
}
