import type { Metadata } from "next";
import { GradientMesh } from "@/components/primitives/GradientMesh";
import { Reveal } from "@/components/primitives/Reveal";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { AnimatedDivider } from "@/components/primitives/AnimatedDivider";
import { FinalCTA } from "@/components/sections/v3/FinalCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/results" },
  openGraph: {
    title: "Results & Case Studies | Verdance Systems AI",
    description: "Real systems built for real businesses. Featured: Sky Dounny - CRM, WhatsApp automation, invoice generator, and a complete custom website.",
    url: "https://verdancesystemsai.com/results",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Results & Case Studies | Verdance Systems AI",
    description: "Real systems built for real businesses. Featured: Sky Dounny - CRM, WhatsApp automation, invoice generator, and a complete custom website.",
  },
  title: "Results & Case Studies | Verdance Systems AI",
  description:
    "Real systems built for real businesses. Featured: Sky Dounny - CRM, WhatsApp automation, invoice generator, and a complete custom website.",
};

const GALLERY = [
  {
    tag: "Coming soon",
    title: "Your business",
    blurb: "We're building case studies as we ship. Yours could be next.",
  },
  {
    tag: "Coming soon",
    title: "Your business",
    blurb: "Remote-first. We work with businesses anywhere in the world.",
  },
  {
    tag: "Coming soon",
    title: "Your business",
    blurb: "We build on your real data so the ROI is provable.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 -z-10">
          <GradientMesh intensity="soft" />
        </div>
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">Results</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 headline-hero max-w-[20ch]">
              What we&apos;ve built.{" "}
              <span className="italic-accent">Honestly.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              Real systems, real businesses. We&apos;re early - these case studies are
              growing as we ship. The featured one below is live.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative section-pad bg-canvas">
        <div className="container-wide">
          <Reveal>
            <div className="relative overflow-hidden surface">
              {/* glow accents */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.6), transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full opacity-25 blur-3xl"
                style={{ background: "var(--color-accent)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full opacity-20 blur-3xl"
                style={{ background: "var(--color-accent-deep)" }}
              />
              <div className="relative grid gap-12 md:grid-cols-[1.1fr_1fr] p-10 md:p-14 lg:p-16 items-start">
                <div>
                  <span
                    className="inline-flex items-center gap-2 rounded-full text-[10px] uppercase tracking-[0.3em] font-mono font-medium px-3 py-1.5"
                    style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
                  >
                    Featured case · 001
                  </span>
                  <h2 className="mt-7 font-display font-medium leading-[1.04] text-4xl md:text-6xl tracking-tight text-[color:var(--color-ink)]">
                    Sky Dounny
                  </h2>
                  <p className="mt-6 max-w-xl text-lg md:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
                    A complete operating system: CRM, WhatsApp automation, custom
                    invoice generator, and a new website - built to handle every
                    inbound enquiry without missing one.
                  </p>

                  <div className="mt-9 grid gap-3 sm:grid-cols-2">
                    <Highlight label="Problem">
                      Manual lead handling - enquiries falling through.
                    </Highlight>
                    <Highlight label="What we built">
                      CRM + WhatsApp automation + invoices + website.
                    </Highlight>
                    <Highlight label="Outcome">
                      Every lead captured. Bookings on autopilot.
                    </Highlight>
                    <Highlight label="Build time">
                      Days. Iterated weekly.
                    </Highlight>
                  </div>

                  <div className="mt-9">
                    <MagneticButton href="/contact" variant="accent">
                      Want one like this for your business?
                    </MagneticButton>
                  </div>
                </div>

                <div className="relative">
                  {[
                    { rot: -3, top: 0, z: 1, label: "WhatsApp flow" },
                    { rot: 2, top: 80, z: 2, label: "CRM" },
                    { rot: -2, top: 160, z: 3, label: "Invoice generator" },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="absolute right-0 w-full max-w-md surface p-5"
                      style={{
                        top: card.top,
                        transform: `rotate(${card.rot}deg)`,
                        zIndex: card.z,
                      }}
                    >
                      <div
                        className="aspect-[4/3] rounded-xl relative overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(var(--accent-rgb),0.16), rgba(var(--accent-deep-rgb),0.06))",
                          border: "1px solid rgba(var(--accent-rgb),0.18)",
                        }}
                      >
                        {/* grid texture */}
                        <div
                          className="absolute inset-0 opacity-40"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, rgba(var(--hairline-rgb),0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--hairline-rgb),0.04) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                          }}
                        />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                            Mockup
                          </span>
                          <span className="font-display text-sm font-medium text-[color:var(--color-ink)]">
                            {card.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ height: 380 }} aria-hidden />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-wide">
        <AnimatedDivider variant="accent" />
      </div>

      <section className="relative section-pad bg-canvas-2">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">Gallery</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 headline-section max-w-[20ch]">
              More builds, <span className="italic-accent">shipping.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-[color:var(--color-ink-soft)]">
              We&apos;re early. We&apos;d rather show fewer real wins than fake big
              numbers. Your build could be the next case study.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="relative overflow-hidden surface surface-card-hover p-8 h-full">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                    {g.tag}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-medium text-[color:var(--color-ink)]">
                    {g.title}
                  </h3>
                  <p className="mt-3 text-[color:var(--color-ink-soft)] leading-relaxed">
                    {g.blurb}
                  </p>
                  <div
                    className="mt-6 aspect-[4/3] rounded-xl overflow-hidden relative"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(var(--accent-rgb),0.06), rgba(var(--accent-deep-rgb),0.02))",
                      border: "1px solid var(--color-hairline)",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(var(--hairline-rgb),0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--hairline-rgb),0.03) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="absolute inset-0 grid place-items-center text-[color:var(--color-ink-muted)] font-mono text-xs uppercase tracking-[0.3em]">
                      Reserved
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

function Highlight({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: "var(--color-hairline)",
        background: "rgba(var(--hairline-rgb),0.02)",
      }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
        {label}
      </div>
      <div className="mt-2 text-[color:var(--color-ink)] text-sm leading-relaxed">{children}</div>
    </div>
  );
}
