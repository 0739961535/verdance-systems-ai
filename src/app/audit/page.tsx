import type { Metadata } from "next";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { AuditReport } from "@/components/visuals/hero/AuditReport";
import { FAQControl } from "@/components/sections/v4/FAQControl";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";

const TITLE = "The Free Pre-Audit | 30 minutes, fixed quote after | Verdance Systems AI";
const DESCRIPTION =
  "A free 30-minute pre-audit: how fast you reply today on each channel, what slow replies are likely costing you, and what to fix first. A fixed quote if you want us to build it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/audit" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://verdancesystemsai.com/audit", type: "website" },
};

const GET = [
  { t: "Your reply times, channel by channel", b: "Website forms, WhatsApp, social messages and missed calls, timed and written down." },
  { t: "What it is likely costing you", b: "Worked out from your own enquiries and what a customer is worth to you, in your own currency." },
  { t: "What to fix first, second and third", b: "A short list in order. It is yours to keep whether or not we work together." },
  { t: "A fixed quote, if you want us to build", b: "Agreed in writing before any work starts. The price on the quote is the price you pay." },
];

const STEPS = [
  { n: "01", t: "Book a time", b: "Pick a slot that suits you. It takes a minute." },
  { n: "02", t: "Thirty minutes on a call", b: "We walk through how enquiries reach you and what happens to them." },
  { n: "03", t: "You get the plan", b: "Your numbers, what to fix first, and a fixed quote if you want one." },
];

const FAQS = [
  { q: "Is it really free?", a: "Yes. There is nothing to sign and no obligation. The plan is yours to keep either way." },
  { q: "Do I need to prepare anything?", a: "No. It helps to know roughly how many enquiries you get a week and what a customer is worth to you, but we can work it out together." },
  { q: "What happens after the call?", a: "You get the plan in writing. If you want us to build it, you get a fixed quote and a fixed launch date. If not, that is the end of it." },
];

export default function AuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Free pre-audit · 30 minutes"
        title={
          <>
            Find out how fast you <span className="italic-accent">really reply.</span>
          </>
        }
        lead="Thirty minutes on a video call. You leave knowing your reply times on every channel, what slow replies are likely costing you, and what to fix first."
        crumbs={[{ href: "/", label: "Home" }, { label: "Free pre-audit" }]}
        visual={<AuditReport />}
        note="Free · nothing to sign · fixed quote after"
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
                  <div className={`card-x h-full p-6 md:p-8 ${i === 3 ? "is-accent" : ""}`}>
                    <span className="font-mono text-[0.72rem] text-[color:var(--color-accent)] tabular">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 font-display text-[1.35rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                      {g.t}
                    </h3>
                    <p className="mt-2 text-[0.98rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{g.b}</p>
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
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative pt-8" style={{ borderTop: "1px solid var(--hairline-2)" }}>
                <span aria-hidden className="absolute -top-px left-0 h-px w-16" style={{ background: "var(--accent)" }} />
                <Reveal delay={i * 0.06}>
                  <span className="font-mono text-[0.8rem] text-[color:var(--color-accent)] tabular">{s.n}</span>
                  <h3 className="mt-4 font-display text-[1.6rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.03em" }}>
                    {s.t}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{s.b}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQControl faqs={FAQS} />
      <CTABand />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free pre-audit" />
    </>
  );
}
