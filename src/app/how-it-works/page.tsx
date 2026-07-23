import type { Metadata } from "next";
import { GradientMesh } from "@/components/primitives/GradientMesh";
import { Reveal } from "@/components/primitives/Reveal";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { AnimatedDivider } from "@/components/primitives/AnimatedDivider";
import { SystemDiagram } from "@/components/sections/v3/SystemDiagram";
import { HowItWorksDemos } from "@/components/sections/v3/HowItWorksDemos";
import { FinalCTA } from "@/components/sections/v3/FinalCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Verdance Works | Done-for-You AI Booking",
    description: "Discovery, onboarding, go-live, 24/7 booking, ongoing optimisation. We build it, you get the bookings — usually live within days.",
    url: "https://verdancesystemsai.com/how-it-works",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Verdance Works | Done-for-You AI Booking",
    description: "Discovery, onboarding, go-live, 24/7 booking, ongoing optimisation. We build it, you get the bookings — usually live within days.",
  },
  title: "How Verdance Works | Done-for-You AI Booking",
  description:
    "Discovery, onboarding, go-live, 24/7 booking, ongoing optimisation. We build it, you get the bookings — usually live within days.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 -z-10">
          <GradientMesh intensity="soft" />
        </div>
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">How it works</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 headline-hero max-w-[20ch]">
              Simple to start.{" "}
              <span className="italic-accent">Built to run forever.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              From your first call to a system that books customers for you around
              the clock — usually live within days. You keep working exactly the way
              you always have; the building is on us.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href="/contact" variant="accent">
                Book a free consult
              </MagneticButton>
              <MagneticButton href="/services" variant="ghost">
                See services
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <SystemDiagram />

      <HowItWorksDemos />

      <section className="relative section-pad-sm bg-canvas">
        <div className="container-wide">
          <AnimatedDivider variant="accent" />

          <Reveal>
            <div className="mt-14 max-w-3xl">
              <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-[color:var(--color-ink)]">
                You don&apos;t need to be technical.
              </p>
              <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                You don&apos;t change how you work. We do the building — you get the
                bookings.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
