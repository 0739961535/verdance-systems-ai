import type { Metadata } from "next";
import { ArrowUpRight, CalendarCheck, CreditCard, MessageSquareText, PhoneCall, Route, Users } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { WhyNowDuet } from "@/components/kit/WhyNowDuet";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY, SITE_URL } from "@/data/site";

const TITLE = "AI for Coaches: Every Lead Answered in 60 Seconds | Verdance";
const DESCRIPTION =
  "For coaches: every lead called or texted in under 60 seconds, every call reminded, every payment followed up, from a low-ticket offer to your programme.";
const DEMO = "/demos/coaching";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services/ai-for-coaches" },
  openGraph: { images: ["/opengraph-image"], title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/services/ai-for-coaches`, type: "website", siteName: "Verdance Systems AI" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: "AI for coaches", item: `${SITE_URL}/services/ai-for-coaches` },
      ],
    },
    {
      "@type": "Service",
      name: "AI for coaches",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: ["ZA", "GB"],
      description: DESCRIPTION,
    },
  ],
};

/** What it does for a coaching business. Plain claims about the build, no results. */
const JOBS = [
  {
    icon: PhoneCall,
    t: "Every lead, in under 60 seconds",
    b: "A new lead from an ad, a form or a DM gets a call or a text within a minute, day or night. It asks your questions and books the call.",
  },
  {
    icon: Route,
    t: "From low-ticket to high-ticket",
    b: "Someone buys your small offer. They get the right next message at the right time, until they are ready to talk about your programme.",
  },
  {
    icon: CalendarCheck,
    t: "People turn up",
    b: "Every booked call gets reminders by text and email, with an easy way to move the time. Missed calls get a friendly rebook.",
  },
  {
    icon: CreditCard,
    t: "Payments followed up",
    b: "A failed or late payment gets a polite reminder and a fresh link. Anything sensitive comes to you first.",
  },
  {
    icon: Users,
    t: "New members settled in",
    b: "A new client gets welcomed, added to your community and pointed to where to start, so day one feels looked after.",
  },
  {
    icon: MessageSquareText,
    t: "Content from your calls",
    b: "Ideas for posts drafted from your own calls and questions people ask. You choose what goes out.",
  },
];

export default function CoachesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageHero
        eyebrow="For coaches"
        title={
          <>
            AI for <span className="italic-accent">coaches.</span>
          </>
        }
        lead="From your first low-ticket sale to your high-ticket programme: every lead answered, called or texted in under 60 seconds, every call reminded, every payment followed up."
        crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: "AI for coaches" }]}
        primary={{ href: DEMO, label: "Try the live demo" }}
        secondary={{ href: GENERIC_BOOK_URL, label: CTA_PRIMARY }}
        note="A made-up coaching business. Nothing to sign up for."
      />

      <section className="section-pad bg-canvas-2" aria-labelledby="coach-jobs" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="coach-jobs"
            eyebrow="What it does"
            title={
              <>
                The jobs that eat a coach&apos;s week, <span className="italic-accent">done for you.</span>
              </>
            }
            intro="It runs inside the tools you already use, and you choose what goes out on its own."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {JOBS.map(({ icon: Icon, t, b }, i) => (
              <li key={t}>
                <Reveal delay={Math.min(i * 0.05, 0.25)} className="h-full">
                  <div className="card-x ix-card h-full p-6 md:p-8">
                    <Icon size={22} strokeWidth={1.5} aria-hidden className="text-[color:var(--color-accent)]" />
                    <h3 className="mt-4 font-display text-[1.3rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                      {t}
                    </h3>
                    <p className="mt-2 text-[1rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{b}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-canvas-2 pb-16 md:pb-24" aria-label="Why now">
        <div className="container-wide">
          <WhyNowDuet tone="page" />
        </div>
      </section>

      <section className="section-pad bg-canvas" aria-labelledby="coach-demo" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-narrow md:text-center">
          <p className="eyebrow">Live demo</p>
          <h2 id="coach-demo" className="h2 mt-5">
            See a lead handled <span className="italic-accent">from the first message.</span>
          </h2>
          <p className="lead mx-auto mt-6 max-w-[40rem]">
            A working demo for a made-up coaching business. Play the lead and watch it get answered, booked and reminded.
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center md:justify-center">
            <a href={DEMO} target="_blank" rel="noopener" className="btn btn-accent min-h-[52px] justify-center px-6">
              Try the live demo
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <a href={GENERIC_BOOK_URL} className="btn btn-ghost min-h-[52px] justify-center px-6">
              {CTA_PRIMARY}
            </a>
          </div>
        </div>
      </section>

      <CTABand
        points={["Where your leads go cold today", "How fast each lead hears back", "A written plan: what we build first, and what it should bring back"]}
      />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label={CTA_PRIMARY} />
    </>
  );
}
