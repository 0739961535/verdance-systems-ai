import type { Metadata } from "next";
import { PageHero } from "@/components/kit/PageHero";
import { CalendarMock } from "@/components/visuals/hero/CalendarMock";
import { Reveal } from "@/components/primitives/Reveal";
import { GHLBookingEmbed } from "@/components/primitives/GHLBookingEmbed";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Book a Meeting | Verdance Systems AI",
  description:
    "Pick a time and book a meeting with Verdance Systems AI. Thirty minutes, no obligation. A calendar invite lands in your inbox straight away.",
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
      <PageHero
        eyebrow="Book a meeting"
        title={
          <>
            Pick a time <span className="italic-accent">that works.</span>
          </>
        }
        lead="Thirty minutes on a video call, no obligation. Pick a slot below and a calendar invite lands in your inbox straight away."
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        visual={<CalendarMock />}
        primary={{ href: "#book", label: "Pick a time below" }}
        note="30 minutes · video call · free"
      />
      {/* The booking calendar - the only thing on this page */}
      <section id="book" className="relative bg-canvas-2 py-16 md:py-24" style={{ borderTop: "1px solid var(--hairline)", scrollMarginTop: "5rem" }}>
        <div className="container-narrow">
          <Reveal>
            <div className="card-x p-2 sm:p-4" style={{ ["--gb-bg" as string]: "var(--bg-3)" }}>
              <GHLBookingEmbed />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <span className="text-[color:var(--color-ink-muted)]">
                Prefer to reach us directly?
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex min-h-11 items-center font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors"
              >
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors"
              >
                <span className="text-[color:var(--color-ink-muted)]">SA</span>{" "}
                {SITE.phone}
              </a>
              <a
                href={`tel:${SITE.phoneUK.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors"
              >
                <span className="text-[color:var(--color-ink-muted)]">UK</span>{" "}
                {SITE.phoneUK}
              </a>
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors"
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
