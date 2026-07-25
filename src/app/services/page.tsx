import type { Metadata } from "next";
import Link from "next/link";
import { GradientMesh } from "@/components/primitives/GradientMesh";
import { Reveal } from "@/components/primitives/Reveal";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { AnimatedDivider } from "@/components/primitives/AnimatedDivider";
import { FinalCTA } from "@/components/sections/v3/FinalCTA";
import { SERVICE_CATEGORIES } from "@/data/services";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  openGraph: {
    title: "AI Services for Local Businesses | Verdance Systems AI",
    description: "Twelve categories. One mandate: turn every lead into a booked customer. From the flagship Missed-Revenue Recovery to voice AI, websites, CRM, payments, and more.",
    url: "https://verdancesystemsai.com/services",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Services for Local Businesses | Verdance Systems AI",
    description: "Twelve categories. One mandate: turn every lead into a booked customer. From the flagship Missed-Revenue Recovery to voice AI, websites, CRM, payments, and more.",
  },
  title: "AI Services for Local Businesses | Verdance Systems AI",
  description:
    "Twelve categories. One mandate: turn every lead into a booked customer. From the flagship Missed-Revenue Recovery to voice AI, websites, CRM, payments, and more.",
};

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 -z-10">
          <GradientMesh intensity="soft" />
        </div>
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">Services</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 headline-hero max-w-[20ch]">
              One outcome -{" "}
              <span className="italic-accent">more booked customers.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              Twelve categories. Every system you need to capture, convert, and retain
              customers - built, run, and optimised by Verdance.
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

      {/* FLAGSHIP - Missed Revenue Recovery */}
      <section id="missed-revenue" className="relative section-pad bg-canvas">
        <div className="container-wide">
          <div className="relative overflow-hidden surface p-10 md:p-14 lg:p-16">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-full"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 80% 0%, rgba(var(--accent-rgb),0.12), transparent 60%)",
              }}
            />
            <div
              className="pointer-events-none absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.6), transparent)",
              }}
            />
            <div className="relative">
              <Reveal>
                <span
                  className="inline-flex items-center gap-2 rounded-full text-[10px] uppercase tracking-[0.3em] font-mono font-medium px-3 py-1.5"
                  style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
                >
                  Flagship
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-7 font-display font-medium leading-[1.04] text-4xl md:text-6xl tracking-tight max-w-[18ch] text-[color:var(--color-ink)]">
                  Missed-Revenue <span className="italic-accent">Recovery.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-7 max-w-2xl text-lg md:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
                  Capture the leads you&apos;re losing and turn them into booked
                  appointments - automatically.
                </p>
              </Reveal>
              <div className="mt-10 grid gap-4 md:grid-cols-4">
                {[
                  { k: "Promise", v: "Stop the leak - book what's already coming in." },
                  { k: "What it is", v: "An always-on AI system that answers, follows up, and books." },
                  { k: "How it works", v: "Connects to your phone, calendar, website, and lead sources." },
                  { k: "Who it's for", v: "Local service businesses losing 20–40% of enquiries." },
                ].map((p) => (
                  <div
                    key={p.k}
                    className="rounded-xl p-5 border surface-2"
                    style={{ borderColor: "var(--color-hairline)" }}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                      {p.k}
                    </div>
                    <div className="mt-2 text-[color:var(--color-ink)] font-medium">{p.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <MagneticButton href="/contact" variant="accent">
                  Book a free consult
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide">
        <AnimatedDivider variant="accent" />
      </div>

      {/* TWELVE CATEGORIES GRID */}
      <section className="relative section-pad bg-canvas-2">
        <div className="container-wide">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">The full capability map · 12 categories</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 headline-section">
                Every system -{" "}
                <span className="italic-accent">one operator.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                Pick one or stack them. Each category is a dedicated motion graphic +
                walkthrough - tap in to see exactly what runs.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.04}>
                <Link
                  href={`/services/${c.slug}`}
                  className="group block relative overflow-hidden surface surface-card-hover h-full"
                >
                  <div className="p-7 md:p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                        {c.number} · Category
                      </span>
                      <ArrowCircle />
                    </div>
                    <h3 className="mt-6 font-display text-xl md:text-2xl font-medium leading-tight text-[color:var(--color-ink)]">
                      {c.name}
                    </h3>
                    <p className="mt-3 text-[color:var(--color-ink-soft)] text-[14px] leading-relaxed">
                      {c.promise}
                    </p>
                    <ul className="mt-5 space-y-1.5 text-[13px] text-[color:var(--color-ink-muted)]">
                      {c.bullets.slice(0, 5).map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span
                            className="inline-block h-1 w-1 mt-2 rounded-full flex-shrink-0"
                            style={{ background: "var(--color-accent)" }}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                      {c.bullets.length > 5 && (
                        <li className="text-[color:var(--color-ink-faint)] pl-3">
                          + {c.bullets.length - 5} more
                        </li>
                      )}
                    </ul>
                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)] group-hover:gap-3 group-hover:text-[color:var(--color-accent)] transition-all">
                      Explore {c.name.split("&")[0].trim().toLowerCase()}
                      <Arrow />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative section-pad-sm bg-canvas">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="font-display text-2xl md:text-3xl font-medium max-w-2xl mx-auto text-[color:var(--color-ink)]">
              All built, managed, and optimised by{" "}
              <span className="italic-accent">Verdance Systems AI.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ArrowCircle() {
  return (
    <span
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-[color:var(--color-ink)] transition-all group-hover:border-[color:var(--color-accent)] group-hover:text-[color:var(--color-accent)] group-hover:rotate-[-45deg]"
      style={{ borderColor: "var(--color-hairline-2)" }}
    >
      <Arrow />
    </span>
  );
}
