import type { Metadata } from "next";
import { GradientMesh } from "@/components/primitives/GradientMesh";
import { Reveal } from "@/components/primitives/Reveal";
import { GHLBookingEmbed } from "@/components/primitives/GHLBookingEmbed";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Book a Meeting | Verdance Systems AI",
  description:
    "Pick a time and book a meeting with Verdance Systems AI. Thirty minutes, no obligation - grab a slot and you'll get a calendar invite straight away.",
  openGraph: {
    title: "Book a Meeting | Verdance Systems AI",
    description:
      "Pick a time and book a meeting with Verdance Systems AI. Thirty minutes, no obligation.",
    url: "https://verdancesystemsai.com/contact",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Meeting | Verdance Systems AI",
    description:
      "Pick a time and book a meeting with Verdance Systems AI. Thirty minutes, no obligation.",
  },
};

/**
 * Contact - deliberately just the booking calendar. No qualifying form, no
 * multi-step flow: a visitor who clicked "Book a Meeting" wants a time, so we
 * give them the calendar immediately, with a direct-contact line underneath.
 */
export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-10 md:pt-44 md:pb-12">
        <div className="absolute inset-0 -z-10">
          <GradientMesh intensity="soft" />
        </div>
        <div className="container-narrow text-center">
          <Reveal>
            <span className="eyebrow">Book a meeting</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 headline-hero max-w-[16ch] mx-auto">
              Pick a time that{" "}
              <span className="italic-accent">works.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl mx-auto text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              Thirty minutes, no obligation. Grab a slot below and a calendar
              invite lands in your inbox straight away.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The booking calendar - the only thing on this page */}
      <section className="relative pb-24 md:pb-32 bg-canvas">
        <div className="container-narrow">
          <Reveal>
            <GHLBookingEmbed />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <span className="text-[color:var(--color-ink-muted)]">
                Prefer to reach us directly?
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors"
              >
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors"
              >
                <span className="text-[color:var(--color-ink-muted)]">SA</span>{" "}
                {SITE.phone}
              </a>
              <a
                href={`tel:${SITE.phoneUK.replace(/\s/g, "")}`}
                className="font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors"
              >
                <span className="text-[color:var(--color-ink-muted)]">UK</span>{" "}
                {SITE.phoneUK}
              </a>
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
