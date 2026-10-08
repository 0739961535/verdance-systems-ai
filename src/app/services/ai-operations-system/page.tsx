import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { CommandCentre } from "@/components/aiteam/CommandCentre";
import { FlowDiagram } from "@/components/aiteam/FlowDiagram";
import { PowerOfAI } from "@/components/aiteam/PowerOfAI";
import { FAQControl } from "@/components/sections/v4/FAQControl";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { AI_TEAM, AI_TEAM_FAQS, AI_TEAM_PATH, CAPABILITIES, DEPARTMENTS, SAFETY } from "@/data/aiTeam";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SITE } from "@/data/site";

const URL = `https://verdancesystemsai.com${AI_TEAM_PATH}`;

export const metadata: Metadata = {
  title: AI_TEAM.meta.title,
  description: AI_TEAM.meta.description,
  alternates: { canonical: AI_TEAM_PATH },
  openGraph: { title: AI_TEAM.meta.title, description: AI_TEAM.meta.description, url: URL, type: "website" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: AI_TEAM.name,
      serviceType: "AI operations team",
      description: AI_TEAM.meta.description,
      url: URL,
      areaServed: { "@type": "Country", name: "South Africa" },
      provider: { "@type": "Organization", name: "Verdance Systems AI", url: "https://verdancesystemsai.com" },
    },
    {
      "@type": "FAQPage",
      mainEntity: AI_TEAM_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

function SectionHead({ eyebrow, title, intro, id }: { eyebrow: string; title: React.ReactNode; intro?: string; id: string }) {
  return (
    <Reveal variant="wipe" className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="h2 mt-5">
          {title}
        </h2>
      </div>
      {intro && <p className="max-w-sm text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{intro}</p>}
    </Reveal>
  );
}

export default function AiOperationsTeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-canvas" aria-labelledby="ai-hero-title">
        <div aria-hidden className="aurora" />
        <div aria-hidden className="hero-grid" />
        <div className="container-wide relative pt-28 pb-16 sm:pt-32 md:pt-40 lg:pb-24">
          <p className="enter-fade-up eyebrow">{AI_TEAM.eyebrow}</p>
          <h1
            id="ai-hero-title"
            className="enter-rise mt-7 max-w-[17ch] font-display text-[color:var(--color-ink)]"
            style={{ fontSize: "clamp(2.7rem, 5vw + 1rem, 6rem)", lineHeight: 0.98, letterSpacing: "-0.045em" }}
          >
            Ashford&apos;s Staff. <span className="italic-accent">An AI team that runs the business alongside you.</span>
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="enter-rise max-w-[36rem] text-[color:var(--color-ink-soft)]" style={{ fontSize: "clamp(1.0625rem, 0.45vw + 0.98rem, 1.3rem)", lineHeight: 1.6 }}>
              {AI_TEAM.lead}
            </p>
            <div className="enter-fade-up flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.18s" }}>
              <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent min-h-12 justify-center px-6">
                Book your free audit
                <ArrowUpRight size={16} aria-hidden />
              </a>
              <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-12 justify-center px-6">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp us
              </a>
            </div>
          </div>

          <Reveal variant="scale" className="mt-14 md:mt-20">
            <div data-parallax="0.03">
              <CommandCentre />
            </div>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
              Sample command centre, for illustration
            </p>
          </Reveal>
        </div>
      </section>

      <PowerOfAI variant="full" />

      {/* HOW IT IS ORGANISED */}
      <section className="section-pad bg-canvas-2" aria-labelledby="org-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="org-title"
            eyebrow="How it is organised"
            title={
              <>
                Departments, a reviewer, an operator. <span className="italic-accent">And you.</span>
              </>
            }
            intro="Each department has a head and workers. A reviewer checks every piece of work. An operator turns it into a short plan. You approve anything that goes out."
          />
          <Reveal className="mt-12 md:mt-16">
            <FlowDiagram />
          </Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((d, i) => (
              <li key={d.name}>
                <Reveal delay={i * 0.04} className="h-full">
                  <div className="sheen g-border h-full rounded-[20px] p-5" data-tilt="4" style={{ ["--gb-bg" as string]: "var(--bg-3)" }}>
                    <p className="font-display text-[1.15rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.02em" }}>{d.name}</p>
                    <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--color-accent)]">{d.head}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {d.workers.map((w) => (
                        <li key={w} className="rounded-full px-2.5 py-1 text-[0.78rem] text-[color:var(--color-ink-soft)]" style={{ border: "1px solid var(--hairline-2)" }}>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="section-pad bg-canvas" aria-labelledby="does-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="does-title"
            eyebrow="What it actually does"
            title={
              <>
                The work that eats your week, <span className="italic-accent">handled.</span>
              </>
            }
          />
          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {CAPABILITIES.map((c, i) => (
              <li key={c.title} className="pt-5" style={{ borderTop: "1px solid var(--hairline-2)" }}>
                <Reveal delay={Math.min(i * 0.03, 0.2)}>
                  <p className="font-mono text-[0.7rem] text-[color:var(--color-accent)] tabular">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-[1.2rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.02em" }}>{c.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{c.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SAFETY */}
      <section className="section-pad bg-canvas-2" aria-labelledby="safety-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="safety-title"
            eyebrow="In your control"
            title={
              <>
                It drafts. It prepares. <span className="italic-accent">You decide.</span>
              </>
            }
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[22px] sm:grid-cols-2 lg:grid-cols-4 md:mt-16" style={{ background: "var(--hairline)" }}>
            {SAFETY.map((s, i) => (
              <li key={s.title} style={{ background: "var(--bg-2)" }}>
                <Reveal delay={i * 0.05} className="h-full p-6 md:p-7">
                  <Check size={18} strokeWidth={2.2} aria-hidden className="text-[color:var(--color-accent)]" />
                  <h3 className="mt-4 font-display text-[1.15rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.02em" }}>{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQControl faqs={AI_TEAM_FAQS} />

      {/* CTA */}
      <section id="audit" className="relative isolate overflow-hidden section-pad bg-canvas" aria-labelledby="ai-cta-title" style={{ borderTop: "1px solid var(--hairline)", scrollMarginTop: "5rem" }}>
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-full -z-10 h-[520px] w-[900px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(var(--accent-glow-rgb),0.18), transparent)" }} />
        <div className="container-narrow md:text-center">
          <Reveal>
            <p className="eyebrow">Free audit · fixed quote</p>
            <h2 id="ai-cta-title" className="mt-6 font-display text-[color:var(--color-ink)] md:mx-auto md:max-w-[16ch]" style={{ fontSize: "clamp(2.4rem, 4.6vw + 1rem, 5rem)", lineHeight: 0.98, letterSpacing: "-0.045em" }}>
              See what your team <span className="italic-accent">would take off you.</span>
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)] md:mx-auto md:max-w-xl">
              A free audit of where your week goes. You leave with a plan for the team, and a fixed quote if you want us to build it.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row md:justify-center">
              <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent min-h-12 justify-center px-7">
                Book your free audit
                <ArrowUpRight size={16} aria-hidden />
              </a>
              <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-12 justify-center px-7">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free audit" />
    </>
  );
}
