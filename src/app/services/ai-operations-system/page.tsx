import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { CommandCentre } from "@/components/aiteam/CommandCentre";
import { FlowDiagram } from "@/components/aiteam/FlowDiagram";
import { OrgChart } from "@/components/aiteam/OrgChart";
import { PowerOfAI } from "@/components/aiteam/PowerOfAI";
import { FAQControl } from "@/components/sections/v4/FAQControl";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { AI_TEAM, AI_TEAM_FAQS, AI_TEAM_PATH, CAPABILITIES, CTA_LABEL, CTA_MICRO, SAFETY } from "@/data/aiTeam";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SITE, SITE_URL } from "@/data/site";

const URL = `${SITE_URL}${AI_TEAM_PATH}`;

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
      serviceType: "Business operations team",
      description: AI_TEAM.meta.description,
      url: URL,
      areaServed: [
        { "@type": "Country", name: "South Africa" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      provider: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: AI_TEAM_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const BAND = { borderTop: "1px solid var(--hairline)" } as const;

/** Section anatomy: eyebrow, h2 (one accent word), lead of two lines at most. */
function SectionHead({ eyebrow, title, lead, id }: { eyebrow: string; title: React.ReactNode; lead?: string; id: string }) {
  return (
    <Reveal variant="wipe" className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="h2 mt-5 max-w-[20ch]">
          {title}
        </h2>
      </div>
      {lead && <p className="max-w-[26rem] text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{lead}</p>}
    </Reveal>
  );
}

export default function AiOperationsTeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* HERO: what it is, one action, then the living sample right underneath */}
      <section className="relative isolate overflow-hidden bg-canvas" aria-labelledby="ai-hero-title">
        <div aria-hidden className="hero-grid" />
        <div className="container-wide relative pt-28 pb-[var(--space-section)] sm:pt-32 md:pt-40">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="enter-fade-up eyebrow">Operations Team</p>
              <h1
                id="ai-hero-title"
                className="enter-rise mt-6 max-w-[18ch] font-display text-[color:var(--color-ink)]"
                style={{ fontSize: "clamp(2.4rem, 3.9vw + 1rem, 5.25rem)", lineHeight: 1, letterSpacing: "-0.045em" }}
              >
                Your own <span className="italic-accent">operations team.</span> It does the work. You make the calls.
              </h1>
            </div>
            <div className="enter-fade-up" style={{ animationDelay: "0.12s" }}>
              <p className="max-w-[52ch] text-[color:var(--color-ink-soft)]" style={{ fontSize: "clamp(1.0625rem, 0.4vw + 0.98rem, 1.25rem)", lineHeight: 1.55 }}>
                {AI_TEAM.lead}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent min-h-[52px] justify-center px-6">
                  {CTA_LABEL}
                  <ArrowUpRight size={16} aria-hidden />
                </a>
                <a
                  href={SITE.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-[0.95rem] text-[color:var(--color-ink-soft)] underline-offset-4 hover:text-[color:var(--color-ink)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent)]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Or WhatsApp us
                </a>
              </div>
              <p className="mt-3 font-mono text-[0.75rem] text-[color:var(--color-ink-muted)]">{CTA_MICRO}</p>
            </div>
          </div>

          <div className="enter-fade-up mt-12 md:mt-16" style={{ animationDelay: "0.2s" }}>
            <CommandCentre />
          </div>
        </div>
      </section>

      <PowerOfAI variant="full" />

      {/* HOW IT IS ORGANISED */}
      <section className="section-pad bg-canvas" aria-labelledby="org-title" style={BAND}>
        <div className="container-wide">
          <SectionHead
            id="org-title"
            eyebrow="How it is organised"
            title={
              <>
                Built like a real team. <span className="italic-accent">You</span> are the boss.
              </>
            }
            lead="Every job goes through the same four steps you saw above. Nothing skips a step."
          />
          <Reveal className="mt-[var(--space-head)]">
            <FlowDiagram />
          </Reveal>
          <Reveal className="mt-[var(--space-section)]">
            <p className="mb-[var(--space-block)] font-mono text-[0.75rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">Who does what</p>
            <OrgChart />
          </Reveal>
          <p className="mt-[var(--space-block)] max-w-[62ch] text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink)]">
            We run our own company on the same system.
          </p>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="section-pad bg-canvas-2" aria-labelledby="does-title" style={BAND}>
        <div className="container-wide">
          <SectionHead
            id="does-title"
            eyebrow="What it does"
            title={
              <>
                The jobs that eat your week, <span className="italic-accent">done.</span>
              </>
            }
            lead="The same jobs, done the same way every day. Your people keep the work that needs a person."
          />
          <ul className="mt-[var(--space-head)] grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <li key={c.title} className="pt-5" style={{ borderTop: "1px solid var(--hairline-2)" }}>
                <Reveal delay={Math.min(i * 0.06, 0.3)}>
                  <p className="font-mono text-[0.75rem] text-[color:var(--color-ink-muted)] tabular">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-[1.2rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.02em" }}>
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{c.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SAFETY */}
      <section className="section-pad bg-canvas" aria-labelledby="safety-title" style={BAND}>
        <div className="container-wide">
          <SectionHead
            id="safety-title"
            eyebrow="In your control"
            title={
              <>
                It drafts. It prepares. <span className="italic-accent">You decide.</span>
              </>
            }
            lead="You choose what goes out on its own. Anything important always waits for you."
          />
          <ul
            className="mt-[var(--space-head)] grid gap-px overflow-hidden rounded-[22px] sm:grid-cols-2 lg:grid-cols-4"
            style={{ background: "var(--hairline-2)", border: "1px solid var(--hairline-2)" }}
          >
            {SAFETY.map((x, i) => (
              <li key={x.title} style={{ background: "var(--bg-3)" }}>
                <Reveal delay={i * 0.06} className="h-full p-6 md:p-7">
                  <Check size={18} strokeWidth={1.5} aria-hidden className="text-[color:var(--color-accent)]" />
                  <h3 className="mt-4 font-display text-[1.15rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.02em" }}>
                    {x.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{x.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div style={BAND}>
        <FAQControl faqs={AI_TEAM_FAQS} />
      </div>

      {/* CTA (StickyMobileCTA hides while #audit is on screen) */}
      <section id="audit" className="section-pad bg-canvas-2" aria-labelledby="ai-cta-title" style={{ ...BAND, scrollMarginTop: "5rem" }}>
        <div className="container-narrow md:text-center">
          <Reveal>
            <p className="eyebrow">Free Operations Map · 30 minutes</p>
            <h2
              id="ai-cta-title"
              className="mt-6 font-display text-[color:var(--color-ink)] md:mx-auto md:max-w-[18ch]"
              style={{ fontSize: "clamp(2.25rem, 4vw + 1rem, 4.5rem)", lineHeight: 1, letterSpacing: "-0.045em" }}
            >
              See what Verdance can do <span className="italic-accent">for you.</span>
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)] md:mx-auto md:max-w-[52ch]">
              A free 30-minute call. We look at how your business runs and show you which jobs Verdance could take off you.
            </p>
            <div className="mt-[var(--space-cta)] flex flex-col gap-3 md:items-center">
              <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent min-h-[52px] w-full justify-center px-7 sm:w-auto">
                {CTA_LABEL}
                <ArrowUpRight size={16} aria-hidden />
              </a>
              <p className="font-mono text-[0.75rem] text-[color:var(--color-ink-muted)]">{CTA_MICRO}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <StickyMobileCTA href={GENERIC_BOOK_URL} label={CTA_LABEL} />
    </>
  );
}
