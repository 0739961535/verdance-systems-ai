import type { Metadata } from "next";
import { GradientMesh } from "@/components/primitives/GradientMesh";
import { Reveal } from "@/components/primitives/Reveal";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { AnimatedDivider } from "@/components/primitives/AnimatedDivider";
import { FinalCTA } from "@/components/sections/v3/FinalCTA";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries | Verdance Systems AI",
    description: "Automation systems built for your specific industry - legal, real estate, medical, automotive, fitness, and more.",
    url: "https://verdancesystemsai.com/industries",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries | Verdance Systems AI",
    description: "Automation systems built for your specific industry - legal, real estate, medical, automotive, fitness, and more.",
  },
  title: "Industries | Verdance Systems AI",
  description:
    "Automation systems built for your specific industry - legal, real estate, medical, automotive, fitness, and more.",
};

export default function IndustriesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 -z-10">
          <GradientMesh intensity="soft" />
        </div>
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">Industries</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 headline-hero max-w-[20ch]">
              Built for{" "}
              <span className="italic-accent">your industry.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              Every industry has different workflows, different lead types, and
              different bottlenecks. We build automation systems that understand
              those specifics.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href="/contact" variant="accent">
                Book a free consult
              </MagneticButton>
              <MagneticButton href="/how-it-works" variant="ghost">
                How it works
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-wide">
        <AnimatedDivider variant="accent" />
      </div>

      {/* INDUSTRIES GRID */}
      <section className="relative section-pad bg-canvas-2">
        <div className="container-wide">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">{industries.length} industries we build for</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 headline-section">
                Built around{" "}
                <span className="italic-accent">how you actually work.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                Tap into your industry to see the exact problems, systems, and
                outcomes we build for businesses like yours.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={i * 0.04}>
                <IndustryCard industry={industry} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative section-pad-sm bg-canvas">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="font-display text-2xl md:text-3xl font-medium max-w-2xl mx-auto text-[color:var(--color-ink)]">
              Don&apos;t see your industry?{" "}
              <span className="italic-accent">We&apos;ll still build it.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
