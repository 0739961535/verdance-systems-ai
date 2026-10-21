import type { Metadata } from "next";
import { CalendarClock, ClipboardCheck, Video } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { MapBloom } from "@/components/audit/MapBloom";
import { FAQControl } from "@/components/sections/v4/FAQControl";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY, SITE_URL } from "@/data/site";

const TITLE = "Free Operations Map: where time and money leak | Verdance";
const DESCRIPTION =
  "A free 30-minute call. We show you where your team's hours go, how long customers wait and what to fix first, with a written plan to keep.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/audit" },
  openGraph: {
    images: ["/opengraph-image"],
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/audit`,
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Operations Map", item: `${SITE_URL}/audit` },
  ],
};

const GET = [
  { t: "Where your team's hours go", b: "The jobs that take the most hours each week, and which ones we can take off your team." },
  { t: "How long customers wait", b: "How long each enquiry waits for a reply, and how long it takes to quote and deliver." },
  { t: "What to fix first", b: "A short list, biggest leak first. Yours to keep, even if we never work together." },
  { t: "A written plan", b: "What we would build first, when it goes live and what it should bring back." },
];

const STEPS = [
  { Icon: CalendarClock, t: "Book a time", b: "Pick a slot that suits you. It takes a minute." },
  { Icon: Video, t: "A 30-minute call", b: "We look at how your business runs and how customers reach you." },
  { Icon: ClipboardCheck, t: "You get the map", b: "Your numbers, what to fix first, and what it should bring back." },
];

const FAQS = [
  { q: "Is it really free?", a: "Yes. There is nothing to sign and no obligation. The map is yours to keep either way." },
  { q: "Do I need to prepare anything?", a: "No. It helps to know roughly how many messages you get a week and what a customer is worth to you. We can work it out together." },
  { q: "What happens after the call?", a: "You get the map and plan in writing. It shows what we would build first and what it should bring back. If you want us to build it, we agree the first phase and a start date. If not, that is the end of it." },
];

export default function AuditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageHero
        eyebrow="The Operations Map · free · 30 minutes"
        title={
          <>
            Your free Operations Map: <span className="italic-accent">where your time and money leak.</span>
          </>
        }
        lead="A free 30-minute video call. We look at how your business runs, then show you where the hours and money go and what to fix first."
        crumbs={[{ href: "/", label: "Home" }, { label: "Operations Map" }]}
        visual={<MapBloom />}
        note="Free · 30 minutes · nothing to sign"
      />

      <section className="section-pad bg-canvas-2" aria-labelledby="get-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="get-title"
            eyebrow="What you leave with"
            title={
              <>
                Four things, <span className="italic-accent">in writing.</span>
              </>
            }
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16">
            {GET.map((g, i) => (
              <li key={g.t}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className={`card-x ix-card h-full p-6 md:p-8 ${i === 3 ? "is-accent" : ""}`}>
                    <h3 className="font-display text-[1.35rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                      {g.t}
                    </h3>
                    <p className="mt-2 text-[1rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{g.b}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-canvas" aria-labelledby="how-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="how-title"
            eyebrow="How it works"
            title={
              <>
                Three steps. <span className="italic-accent">One call.</span>
              </>
            }
          />
          <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
            {STEPS.map(({ Icon, t, b }, i) => (
              <li key={t} className="relative pt-8" style={{ borderTop: "1px solid var(--hairline-2)" }}>
                <span aria-hidden className="absolute -top-px left-0 h-px w-16" style={{ background: "var(--accent)" }} />
                <Reveal delay={i * 0.06}>
                  <Icon size={22} strokeWidth={1.5} aria-hidden className="text-[color:var(--color-accent)]" />
                  <h3 className="mt-4 font-display text-[1.6rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.03em" }}>
                    {t}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{b}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQControl faqs={FAQS} />
      <CTABand
        points={["Where your team's hours go", "How long customers wait", "A written plan: what we build first, and what it should bring back"]}
      />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label={CTA_PRIMARY} />
    </>
  );
}
