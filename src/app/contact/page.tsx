import type { Metadata } from "next";
import { GradientMesh } from "@/components/primitives/GradientMesh";
import { Reveal } from "@/components/primitives/Reveal";
import { VSLApplyForm, BookingPanel } from "@/components/forms/VSLApplyForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book a Free Consult | Verdance Systems AI",
    description: "Answer a few quick questions and we'll map out exactly what we'd build for your business and what it's worth. Free consult, no obligation.",
    url: "https://verdancesystemsai.com/contact",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Consult | Verdance Systems AI",
    description: "Answer a few quick questions and we'll map out exactly what we'd build for your business and what it's worth. Free consult, no obligation.",
  },
  title: "Book a Free Consult | Verdance Systems AI",
  description:
    "Answer a few quick questions and we'll map out exactly what we'd build for your business and what it's worth. Free consult, no obligation.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="absolute inset-0 -z-10">
          <GradientMesh intensity="soft" />
        </div>
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">Contact</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 headline-hero max-w-[22ch]">
              Book your free{" "}
              <span className="italic-accent">consult.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              Pick a time below - takes seconds. Answer a few quick questions
              after so we walk in already knowing your business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Booking calendar - the primary action, front and centre */}
      <section className="relative section-pad-sm bg-canvas">
        <div className="container-wide">
          <Reveal>
            <BookingPanel bookingUrl={SITE.ghlBooking} />
          </Reveal>
        </div>
      </section>

      {/* What happens next - remove the friction before the form */}
      <section className="relative section-pad-sm bg-canvas">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">What happens next</span>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Pick a time",
                d: "Grab a slot on the calendar above - just your email to confirm. Takes seconds.",
              },
              {
                n: "02",
                t: "Tell us about your business",
                d: "A few optional questions so we walk into the call already knowing your setup.",
              },
              {
                n: "03",
                t: "We map out what we'd build",
                d: "On the call, you get a clear plan - exactly what we'd build for you, how it works, and what it's worth. No obligation.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={0.08 + i * 0.08}>
                <div className="relative h-full surface surface-card-hover p-7">
                  <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
                    {s.n}
                  </div>
                  <h3 className="mt-4 font-display text-lg md:text-xl font-medium tracking-tight text-[color:var(--color-ink)]">
                    {s.t}
                  </h3>
                  <p className="mt-2.5 text-[15px] text-[color:var(--color-ink-soft)] leading-relaxed">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking calendar + qualifying form - the main conversion */}
      <section className="relative section-pad-sm bg-canvas">
        <div className="container-wide">
          <Reveal>
            <VSLApplyForm bookingUrl={SITE.ghlBooking} hideBooking />
          </Reveal>

          {/* Prefer to reach us directly */}
          <Reveal delay={0.1}>
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
                {SITE.phone}
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

      {/* Proof - a real operator, right where they decide */}
      <section className="relative section-pad bg-canvas overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(var(--accent-rgb),0.06), transparent 65%)",
          }}
        />
        <div className="container-wide">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span
                aria-hidden
                className="font-serif italic leading-none block"
                style={{
                  fontSize: 64,
                  color: "var(--color-accent)",
                  opacity: 0.8,
                  textShadow: "0 0 28px rgba(var(--accent-rgb),0.35)",
                }}
              >
                &ldquo;
              </span>
              <p className="-mt-3 font-display text-2xl md:text-[28px] font-normal leading-[1.5] tracking-[-0.01em] text-[color:var(--color-ink)]">
                They mapped out exactly what they&apos;d build before we committed
                to anything. By week two of going live we were booking 30% more
                cleanings - and I haven&apos;t touched the phone in months.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <span
                  className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.15em]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(var(--accent-rgb),0.18), rgba(var(--accent-deep-rgb),0.18))",
                    border: "1px solid rgba(var(--accent-rgb),0.35)",
                    color: "var(--color-accent)",
                  }}
                >
                  LV
                </span>
                <div className="text-left">
                  <div className="font-display text-[15px] font-medium text-[color:var(--color-ink)]">
                    Dr. Lisa van der Merwe
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                    Principal Dentist · Bryant Dental · London
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
