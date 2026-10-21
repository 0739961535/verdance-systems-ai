import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Bud } from "@/components/how/Bud";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY } from "@/data/site";

export const metadata: Metadata = {
  title: "Page Not Found | Verdance",
  description: "This page has moved or never existed. Here is the way back.",
  robots: { index: false, follow: true },
};

/** The 404: on brand, one plain line, and the three ways back. */
export default function NotFound() {
  return (
    <section className="band-night relative isolate overflow-hidden" aria-labelledby="nf-title" style={{ minHeight: "78svh", display: "grid", alignItems: "center", padding: "140px 0 96px" }}>
      <div className="container-wide">
        <span aria-hidden style={{ display: "block", width: 56, height: 56 }}>
          <Bud stage={1} size={56} />
        </span>
        <p className="eyebrow mt-6">Page not found</p>
        <h1 id="nf-title" className="h2 mt-4" style={{ maxWidth: "16ch" }}>
          This page isn&apos;t here. <span className="italic-accent">The rest of the site is.</span>
        </h1>
        <p className="lead mt-6" style={{ maxWidth: "36rem" }}>
          It may have moved, or the link had a typo. Try one of these.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-[52px] justify-center px-6">
            {CTA_PRIMARY}
            <ArrowUpRight size={17} aria-hidden />
          </a>
          <Link href="/" className="btn btn-ghost min-h-[52px] justify-center px-6">
            Home
            <ArrowRight size={17} aria-hidden />
          </Link>
          <Link href="/services" className="btn btn-ghost min-h-[52px] justify-center px-6">
            Services
            <ArrowRight size={17} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
