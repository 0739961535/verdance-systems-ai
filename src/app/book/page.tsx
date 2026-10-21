import type { Metadata } from "next";
import { BookingSection } from "@/components/booking/BookingSection";
import { SITE_URL } from "@/data/site";

const TITLE = "Book a free 30-minute call | Verdance Systems AI";
const DESCRIPTION =
  "Pick a time for a free 30-minute video call. We look at how your business runs and show you what we would build first. Nothing to sign.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/book" },
  openGraph: {
  images: ["/opengraph-image"], title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/book`, type: "website", siteName: "Verdance Systems AI" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/** /book: Verdance's own booking page. Calendar first, three questions, then an optional prepare step. */
export default function BookPage() {
  return <BookingSection as="page" />;
}
