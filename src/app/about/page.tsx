import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { LOCATIONS } from "@/data/locations";
import { SITE, SITE_URL } from "@/data/site";
import { ORG_ID, PERSON_ID, PERSON_LD } from "@/data/entity";
import { BuiltForUs } from "@/components/home/BuiltForUs";
import { FounderPortrait } from "@/components/brand/FounderPortrait";

const TITLE = "About Daniel Bouwer and Verdance Systems AI";
const DESCRIPTION =
  "Verdance Systems AI is run by Daniel Bouwer, 20, in South Africa. He builds AI systems that answer every enquiry within 60 seconds for owner-led businesses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
  images: ["/opengraph-image"], title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/about`, type: "profile", siteName: "Verdance Systems AI" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FACTS = [
  { k: "Founder", v: "Daniel Bouwer" },
  { k: "Based in", v: "South Africa, remote first" },
  { k: "Works with", v: "Owner-led businesses" },
  { k: "Builds", v: "AI systems and the Operations Team" },
  { k: "Promise", v: "Every enquiry answered within 60 seconds" },
  { k: "Live in", v: "10 working days" },
  { k: "Starts with", v: "A free Operations Map" },
];

const HOW = [
  {
    t: "Your numbers first",
    b: "Every build starts with a free Operations Map of your own enquiries, reply times and admin. We only propose a build if your numbers show at least twice the monthly cost back. If they don't, we say so.",
  },
  {
    t: "Live in 10 working days",
    b: "From the day the plan is signed off. The launch date goes in your contract, and you test it yourself before a real customer touches it.",
  },
  {
    t: "A person when it matters",
    b: "Verdance writes in your voice and hands over to your team the moment a conversation needs a person. You choose what goes out on its own and approve what matters from one screen.",
  },
  {
    t: "POPIA built in",
    b: "Consent records, opt-outs and an operator agreement come as standard. Every account and every piece of data is set up in your name.",
  },
];

const NOT = [
  "Every quote is fixed and in writing, and it comes after the Operations Map. No hourly rates.",
  "No invented results and no made-up reviews. When we show numbers, they will be real ones, shared with permission.",
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#page`,
        url: `${SITE_URL}/about`,
        name: TITLE,
        description: DESCRIPTION,
        about: { "@id": ORG_ID },
        mainEntity: { "@id": PERSON_ID },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en-ZA",
      },
      PERSON_LD,
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Verdance Systems AI",
        url: SITE_URL,
        founder: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow="About Verdance"
        title={
          <>
            Daniel Bouwer, <span className="italic-accent">founder.</span>
          </>
        }
        lead="I'm 20, I live in South Africa, and I build AI systems for owner-led businesses: the kind where people spend the day answering customers, chasing quotes and doing admin. Verdance makes sure every enquiry is answered within 60 seconds and every follow-up gets done."
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
        visual={<FactSheet />}
        note="Free Operations Map · 30 minutes with Daniel"
      />

      <section className="section-pad bg-canvas-2" aria-labelledby="why-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHead
            id="why-title"
            eyebrow="Why Verdance exists"
            title={
              <>
                Customers leave in the gap.
              </>
            }
          />
          <Reveal delay={0.08}>
            <div className="card-x space-y-5 p-7 text-[1.05rem] leading-[1.65] text-[color:var(--color-ink)] md:p-9">
              <p>
                Good businesses rarely lose customers because they are bad at the work. They lose them in the gap between
                a message arriving and someone having time to answer it. After hours. On a Saturday. In the middle of a
                busy day.
              </p>
              <p>
                Verdance closes that gap. Every enquiry on WhatsApp, phone, website, email and social gets a useful reply
                within 60 seconds, in your voice. Every quote is followed up until the customer answers. Your team gets
                its hours back.
              </p>
              <p className="text-[color:var(--color-ink-soft)]">
                Being 20 is part of the point. I have no old habits to protect, and I would rather you judge me on how
                your first ten working days feel than on my age. So I set out to make them the best onboarding you have
                had from any supplier.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-canvas" aria-labelledby="how-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="how-title"
            eyebrow="How we work"
            title={
              <>
                Four things you can hold us to.
              </>
            }
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16">
            {HOW.map((h, i) => (
              <li key={h.t}>
                <Reveal delay={Math.min(i * 0.06, 0.3)} className="h-full">
                  <div className={`card-x h-full p-6 md:p-8 ${i === 2 ? "is-accent" : ""}`}>
                    <span className="font-mono text-[0.72rem] text-[color:var(--color-accent)] tabular">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 font-display text-[1.35rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                      {h.t}
                    </h3>
                    <p className="mt-2 text-[0.98rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{h.b}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BuiltForUs />

      <section className="section-pad bg-canvas-2" aria-labelledby="not-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHead
            id="not-title"
            eyebrow="What we won't do"
            title={
              <>
                Plain dealing, every time.
              </>
            }
          />
          <Reveal delay={0.08}>
            <ul className="card-x space-y-4 p-7 md:p-9">
              {NOT.map((n) => (
                <li key={n} className="flex gap-3 text-[1rem] leading-[1.6] text-[color:var(--color-ink)]">
                  <Check size={18} aria-hidden className="mt-1 shrink-0 text-[color:var(--color-accent)]" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-canvas" aria-labelledby="where-title" style={{ borderTop: "1px solid var(--hairline)" }} data-cta-location="about_contact">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHead
            id="where-title"
            eyebrow="Where we are"
            title={
              <>
                South Africa, remote first.
              </>
            }
          />
          <Reveal delay={0.08}>
            <div className="card-x p-7 md:p-9">
              <p className="text-[1.02rem] leading-[1.65] text-[color:var(--color-ink)]">
                Nothing gets installed and nobody has to visit you. Everything is set up on a video call and runs on
                your own accounts.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {LOCATIONS.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/ai-agency/${l.slug}`}
                      className="inline-flex min-h-11 items-center gap-1 rounded-full px-3.5 text-[0.85rem] text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-ink)]"
                      style={{ border: "1px solid var(--hairline-2)" }}
                    >
                      {l.name}
                      <ArrowUpRight size={13} aria-hidden className="opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
              <dl className="mt-7 grid gap-3 text-[0.95rem]">
                <div className="flex flex-wrap gap-x-3">
                  <dt className="text-[color:var(--color-ink-muted)]">Email</dt>
                  <dd>
                    <a href={`mailto:${SITE.email}`} className="text-[color:var(--color-ink)] underline-offset-4 hover:underline">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-3">
                  <dt className="text-[color:var(--color-ink-muted)]">WhatsApp</dt>
                  <dd>
                    <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-ink)] underline-offset-4 hover:underline">
                      {SITE.whatsapp.display}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-3">
                  <dt className="text-[color:var(--color-ink-muted)]">LinkedIn</dt>
                  <dd>
                    <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-ink)] underline-offset-4 hover:underline">
                      Daniel Bouwer
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title={
          <>
            Thirty minutes with me, <span className="italic-accent">and the map is yours.</span>
          </>
        }
      />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free 30-minute call" />
    </>
  );
}

/**
 * The hero visual: Daniel's portrait (a clean placeholder until the real
 * photo is set in src/data/founder.ts), then the facts as a small card.
 */
function FactSheet() {
  return (
    <div className="browser-frame g-border p-6 md:p-8">
      <FounderPortrait className="mb-6" />
      <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">Verdance Systems AI</p>
      <dl className="mt-5 divide-y" style={{ borderColor: "var(--hairline)" }}>
        {FACTS.map((f) => (
          <div key={f.k} className="flex items-baseline justify-between gap-4 py-3" style={{ borderColor: "var(--hairline)" }}>
            <dt className="text-[0.85rem] text-[color:var(--color-ink-muted)]">{f.k}</dt>
            <dd className="text-right text-[0.98rem] text-[color:var(--color-ink)]">{f.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
