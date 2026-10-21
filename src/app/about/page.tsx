import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { EarthPageHero } from "@/components/about/EarthPageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { LOCATIONS } from "@/data/locations";
import { SITE, SITE_URL } from "@/data/site";
import { ORG_ID, PERSON_ID, PERSON_LD } from "@/data/entity";
import { BuiltForUs } from "@/components/home/BuiltForUs";
import { FounderPortrait } from "@/components/brand/FounderPortrait";
import { EarthStrip } from "@/components/about/EarthStrip";

/**
 * TODO(Daniel): drop a real photo of Daniel in public/people/ and set the
 * path here, e.g. "/people/daniel-about.webp" (4:5 crop, at least 800 x 1000,
 * under about 80KB). Until then the About hero shows the clean "DB" monogram.
 * Never put a placeholder, stock or AI face here.
 */
const ABOUT_PHOTO: string | null = null;

const TITLE = "About Daniel Bouwer and Verdance Systems AI";
const DESCRIPTION =
  "Daniel Bouwer, 20, runs Verdance Systems AI. He builds AI systems that answer every enquiry within 60 seconds for owner-led businesses in SA and the UK.";

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
  { k: "Works in", v: "South Africa and the UK, remote first" },
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

      <EarthPageHero
        eyebrow="About Verdance"
        title={
          <>
            Daniel Bouwer, <span className="italic-accent">founder.</span>
          </>
        }
        lead="I'm 20 and I build AI systems for owner-led businesses in South Africa and the UK. With Verdance, every enquiry is answered within 60 seconds and every follow-up gets done."
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
                I&apos;m 20. I have no old habits to protect. Judge me on how your first ten working days feel. I&apos;ve set
                out to make them the best onboarding you&apos;ll get from any supplier.
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
                  <div className={`card-x ix-card h-full p-6 md:p-8 ${i === 2 ? "is-accent" : ""}`}>
                    <h3 className="font-display text-[1.35rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
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
                South Africa and the UK, <span className="italic-accent">remote first.</span>
              </>
            }
          />
          <Reveal delay={0.08}>
            <div className="card-x p-7 md:p-9">
              <p className="text-[1.02rem] leading-[1.65] text-[color:var(--color-ink)]">
                Nothing gets installed and nobody has to visit you. Everything is set up on a video call and runs on
                your own accounts.
              </p>
              <EarthStrip className="mt-6" />
              <p className="mt-4 text-[0.9rem] text-[color:var(--color-ink-muted)]">
                South African city pages:{" "}
                {LOCATIONS.map((l, i) => (
                  <span key={l.slug}>
                    {i > 0 ? ", " : null}
                    <Link
                      href={`/ai-agency/${l.slug}`}
                      className="relative inline-block text-[color:var(--color-ink-soft)] underline-offset-4 hover:text-[color:var(--color-ink)] hover:underline before:absolute before:-inset-x-1 before:-inset-y-3 before:content-['']"
                    >
                      {l.name}
                    </Link>
                  </span>
                ))}
              </p>
              <dl className="mt-6 grid gap-0 text-[0.95rem]">
                <div className="flex flex-wrap items-center gap-x-3">
                  <dt className="text-[color:var(--color-ink-muted)]">Email</dt>
                  <dd>
                    <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center text-[color:var(--color-ink)] underline-offset-4 hover:underline">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap items-center gap-x-3">
                  <dt className="text-[color:var(--color-ink-muted)]">WhatsApp</dt>
                  <dd>
                    <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[color:var(--color-ink)] underline-offset-4 hover:underline">
                      {SITE.whatsapp.display}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap items-center gap-x-3">
                  <dt className="text-[color:var(--color-ink-muted)]">LinkedIn</dt>
                  <dd>
                    <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[color:var(--color-ink)] underline-offset-4 hover:underline">
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
        points={["Where your team's hours go", "How long customers wait", "A written plan: what we build first, and what it should bring back"]}
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

/** A small line-drawn bloom: Daniel's signature mark beside the portrait. */
function BloomSignature() {
  return (
    <svg viewBox="-20 -20 40 40" width="36" height="36" aria-hidden focusable="false" className="absolute right-5 top-5 md:right-7 md:top-7">
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={a}
          transform={`rotate(${a})`}
          d="M0 -2 C 5 -5, 6 -12, 0 -16 C -6 -12, -5 -5, 0 -2 Z"
          fill="rgba(77,124,255,0.14)"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      ))}
      <circle r="2.2" fill="var(--color-accent)" />
    </svg>
  );
}

/**
 * The hero visual: Daniel's portrait (ABOUT_PHOTO, or the clean monogram
 * until a real photo exists), the bloom signature, then the facts.
 */
function FactSheet() {
  return (
    <div className="browser-frame g-border relative p-6 md:p-8">
      <BloomSignature />
      {ABOUT_PHOTO ? (
        <figure className="mb-6 max-w-[22rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ABOUT_PHOTO}
            alt="Daniel Bouwer, founder of Verdance Systems AI"
            width={800}
            height={1000}
            decoding="async"
            className="block aspect-[4/5] w-full rounded-[20px] object-cover"
          />
        </figure>
      ) : (
        <FounderPortrait className="mb-6" />
      )}
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
