import type { Metadata } from "next";
import { ApplyVSLSection } from "@/components/sections/v3/ApplyVSLSection";
import { ApplyFormSection } from "@/components/sections/v3/ApplyFormSection";
import { ApplyTrustStrip } from "@/components/sections/v3/ApplyTrustStrip";

export const metadata: Metadata = {
  alternates: { canonical: "/apply" },
  openGraph: {
    title: "Apply for a Free Build | Verdance Systems AI",
    description: "Watch the 6-minute walkthrough, then apply. We build the AI booking system on your business — free — before you commit.",
    url: "https://verdancesystemsai.com/apply",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for a Free Build | Verdance Systems AI",
    description: "Watch the 6-minute walkthrough, then apply. We build the AI booking system on your business — free — before you commit.",
  },
  title: "Apply for a Free Build | Verdance Systems AI",
  description:
    "Watch the 6-minute walkthrough, then apply. We build the AI booking system on your business — free — before you commit.",
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
