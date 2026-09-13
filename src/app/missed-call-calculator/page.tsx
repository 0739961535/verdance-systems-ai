import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { MissedCallCalculator } from "@/components/tools/MissedCallCalculator";

const SITE_URL = "https://verdancesystemsai.com";

export const metadata: Metadata = {
  title: "Missed Call Calculator | What Unanswered Calls Cost You | Verdance Systems AI",
  description:
    "Work out what missed calls and unanswered messages are costing your business a year. Three numbers, no sign-up. Then see what it takes to stop it.",
  alternates: { canonical: "/missed-call-calculator" },
  openGraph: {
    title: "What are missed calls costing you?",
    description:
      "Three numbers and you have the answer. Most owners are surprised by the yearly figure.",
    url: `${SITE_URL}/missed-call-calculator`,
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "What are missed calls costing you?",
    description: "Three numbers and you have the answer.",
  },
};

// Two schema blocks, both chosen for how generative engines quote. A tool they
// can describe, and questions with complete answers in the first two sentences.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/missed-call-calculator/#app`,
      name: "Missed Call Calculator",
      url: `${SITE_URL}/missed-call-calculator`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      description:
        "Calculates the annual revenue a business loses to unanswered calls and messages, from missed contacts per week, average customer value, and close rate.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do you calculate the cost of a missed call?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Multiply the calls and messages you miss in a week by what one customer is worth to you, then by the share of enquiries you would normally win. That gives the weekly loss. Multiply by 52 for the year. A business missing 15 contacts a week, worth R4 000 each, winning 30 percent of them, is losing about R936 000 a year.",
          },
        },
        {
          "@type": "Question",
          name: "How many calls does a small business actually miss?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most owners guess low, because a missed call leaves no record anyone looks at. The calls that go missing cluster outside office hours and during the busiest periods, which are also the times the business is most profitable. Your phone provider's call log is the honest source.",
          },
        },
        {
          "@type": "Question",
          name: "Do people leave a voicemail if nobody answers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Usually not. Someone who is comparing suppliers, or who is in pain, or who is phoning on a commute, will call the next number rather than leave a message and wait. That is why a missed call is closer to a lost customer than to a delayed one.",
          },
        },
        {
          "@type": "Question",
          name: "What stops calls being missed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Something that answers every call and message the moment it arrives, at any hour, takes the details and books the appointment straight into the calendar. It runs on your own accounts and your team keeps handling anything that needs a person.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Missed call calculator",
          item: `${SITE_URL}/missed-call-calculator`,
        },
      ],
    },
  ],
};

const FAQS = [
  {
    q: "How many calls do we actually miss?",
    a: "Most owners guess low, because a missed call leaves no record anyone looks at. Your phone provider's call log will tell you honestly, and it is usually worse than the guess. The ones that go missing cluster outside office hours and during your busiest periods, which are also your most profitable.",
  },
  {
    q: "Do people not just leave a voicemail?",
    a: "Usually not. Someone comparing suppliers, or in pain, or phoning on the drive home, calls the next number instead. That is why a missed call is closer to a lost customer than a delayed one.",
  },
  {
    q: "Is this number not a bit convenient for you?",
    a: "It is your three numbers, not ours, and you can move any of them. Put your close rate at ten percent and see what is left. The point is not the exact figure, it is that the figure is never zero and almost nobody has ever worked it out.",
  },
  {
    q: "So what actually fixes it?",
    a: "Something that answers every call and message the second it arrives, at any hour, takes the details and books the job into your calendar. It runs on your accounts, you own it, and your team still handles anything that needs a person. That is what we build.",
  },
];

export default function MissedCallCalculatorPage() {
  return (
    <main className="bg-canvas min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section-padding pt-32 pb-12">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
              Free tool, no sign-up
            </span>
            <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-[color:var(--color-ink)] mt-5 mb-5">
              What are missed calls costing you?
            </h1>
            <p className="text-[color:var(--color-ink-soft)] text-lg leading-relaxed">
              Three numbers and you have the answer. Nothing is sent anywhere and there is
              nothing to fill in afterwards.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding pb-20">
        <div className="container-wide">
          <MissedCallCalculator />
        </div>
      </section>

      <section className="section-padding py-16 border-t" style={{ borderColor: "var(--hairline)" }}>
        <div className="container-wide">
          <Reveal>
            <h2 className="font-display font-bold text-[clamp(1.6rem,3vw,2.4rem)] tracking-tight text-[color:var(--color-ink)] max-w-[22ch]">
              The questions people ask next
            </h2>
          </Reveal>
          <div className="mt-10 max-w-3xl">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={0.05 * (i + 1)}>
                <div className="py-6 border-b" style={{ borderColor: "var(--hairline)" }}>
                  <h3 className="font-display font-semibold text-lg text-[color:var(--color-ink)]">
                    {f.q}
                  </h3>
                  <p className="mt-2.5 text-[color:var(--color-ink-soft)] leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding py-20 border-t" style={{ borderColor: "var(--hairline)" }}>
        <div className="container-wide max-w-3xl">
          <Reveal>
            <h2 className="font-display font-bold text-[clamp(1.6rem,3vw,2.4rem)] tracking-tight text-[color:var(--color-ink)] max-w-[22ch]">
              Bring that number to the call.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-[color:var(--color-ink-soft)] leading-relaxed">
              Thirty minutes. We go through where your enquiries are actually going, what
              is falling through, and what to fix first. Free, nothing to sign, and the
              plan is yours whether or not you work with us.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <Link href="/contact" className="btn btn-accent justify-center min-h-12 mt-8 inline-flex">
              Book a free audit call
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
