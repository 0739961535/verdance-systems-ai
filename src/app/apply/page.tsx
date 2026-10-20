import type { Metadata } from "next";
import { ApplyVSLSection } from "@/components/sections/v3/ApplyVSLSection";
import { ApplyFormSection } from "@/components/sections/v3/ApplyFormSection";
import { ApplyTrustStrip } from "@/components/sections/v3/ApplyTrustStrip";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/apply" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Book your free Operations Map | Verdance Systems AI",
    description: "Watch the 6-minute walkthrough, then book your free Operations Map: where your enquiries, follow-ups and admin leak time and money.",
    url: `${SITE_URL}/apply`,
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book your free Operations Map | Verdance Systems AI",
    description: "Watch the 6-minute walkthrough, then book your free Operations Map: where your enquiries, follow-ups and admin leak time and money.",
  },
  title: "Book your free Operations Map | Verdance Systems AI",
  description:
    "Watch the 6-minute walkthrough, then book your free Operations Map: where your enquiries, follow-ups and admin leak time and money.",
  robots: { index: true, follow: true },
};

export default function ApplyPage() {
  return (
    <>
      <ApplyVSLSection />
      <ApplyFormSection />
      <ApplyTrustStrip />
    </>
  );
}
