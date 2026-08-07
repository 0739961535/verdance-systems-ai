import type { Metadata } from "next";
import Link from "next/link";
import { GradientMesh } from "@/components/primitives/GradientMesh";
import { Reveal } from "@/components/primitives/Reveal";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { FinalCTA } from "@/components/sections/v3/FinalCTA";
import { SERVICE_PILLARS, PILLAR_CATEGORIES } from "@/data/services";

const TITLE = "AI Systems & Services | Marketing, Sales, Operations, Automations | Verdance Systems AI";
const DESCRIPTION =
  "Every system Verdance builds, organised under four pillars: Marketing, Sales, Internal Operations and Automations. Conversation AI, voice agents, CRM, review automation, custom AI agents and more.";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://verdancesystemsai.com/services",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  title: TITLE,
  description: DESCRIPTION,
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
              Four pillars. <span className="italic-accent">Every system.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              Everything we design, build and run lives under Marketing, Sales,
              Internal Operations or Automations - and the pillars are built to
              work together as one connected system.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href="/contact" variant="accent">
                Book your AI Systems Audit
              </MagneticButton>
              <MagneticButton href="/how-it-works" variant="ghost">
                How it works
              </MagneticButton>
            </div>
          </Reveal>

          {/* pillar quick-nav */}
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap gap-2">
              {SERVICE_PILLARS.map((p) => (
                <a
                  key={p.slug}
                  href={`#${p.slug}`}
                  className="inline-flex items-baseline gap-2 rounded-full px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-accent)]"
                  style={{ border: "1px solid var(--hairline-2)" }}
                >
                  <span className="text-[color:var(--color-ink-faint)]">{p.index}</span>
                  {p.title}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLAR SECTIONS */}
      {SERVICE_PILLARS.map((pillar, pi) => {
        const categories = PILLAR_CATEGORIES(pillar);
        return (
          <section
            key={pillar.slug}
            id={pillar.slug}
            className={`relative section-pad ${pi % 2 === 0 ? "bg-canvas-2" : "bg-canvas"}`}
            style={{ borderTop: "1px solid var(--hairline)", scrollMarginTop: "5rem" }}
          >
            <div className="container-wide">
              <div className="max-w-3xl">
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-mono text-[color:var(--color-ink-faint)]"
                      style={{ fontSize: "clamp(1.75rem, 2.4vw + 1.2rem, 2.75rem)", fontVariantNumeric: "tabular-nums" }}
                    >
                      {pillar.index}
                    </span>
                    <h2 className="headline-section">{pillar.title}</h2>
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <p className="mt-4 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                    {pillar.promise}
                  </p>
                </Reveal>
              </div>

              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((c, i) => (
                  <Reveal key={c.slug} delay={i * 0.05}>
                    <Link
                      href={`/services/${c.slug}`}
                      className="group block relative overflow-hidden surface surface-card-hover h-full"
                    >
                      <div className="p-7 md:p-8 flex flex-col h-full">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                            {pillar.title} · {c.number}
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
        );
      })}

      <section className="relative section-pad-sm bg-canvas">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="font-display text-2xl md:text-3xl font-medium max-w-2xl mx-auto text-[color:var(--color-ink)]">
              All designed, built and run by{" "}
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
