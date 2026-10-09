import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { SITE } from "@/data/site";
import { GENERIC_BOOK_URL } from "@/data/niches";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { ClientDashboard } from "./ClientDashboard";
import { BEST_MONTH, bestMonthTiles } from "@/data/bestMonth";

/* ------------------------------------------------------------------ */
/* What you see as a client                                           */
/* ------------------------------------------------------------------ */
export function ClientViewSection() {
  return (
    <section className="section-pad bg-canvas-2" aria-labelledby="client-title" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-wide">
        <Reveal variant="wipe" className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">What you see as a client</p>
            <h2 id="client-title" className="h2 mt-5">
              Every conversation, <span className="italic-accent">in one place.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            What came in, how fast it was answered and what got booked. Open it on your phone whenever you like, or just read the monthly report.
          </p>
        </Reveal>
        <Reveal variant="scale" delay={0.05} className="mt-10 md:mt-14">
          <div data-parallax="0.04">
            <ClientDashboard />
          </div>
          <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
            {bestMonthTiles() ? `Real figures from ${BEST_MONTH.client}. Activity rows are illustrative.` : "Sample layout, for illustration"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Proof: one live, unnamed client. No invented numbers.               */
/* ------------------------------------------------------------------ */
const BUILT = [
  { title: "Website", body: "Quick to load and built to turn visitors into enquiries." },
  { title: "WhatsApp AI concierge", body: "Answers enquiries and takes the details, day or night." },
  { title: "CRM pipeline", body: "Every enquiry and project filed against the right client, automatically." },
  { title: "Quote generator", body: "Turns the details a client gives into a quote, without retyping." },
];

export function ProofSection() {
  return (
    <section id="proof" className="section-pad bg-canvas" aria-labelledby="proof-title" style={{ borderTop: "1px solid var(--hairline)", scrollMarginTop: "5rem" }}>
      <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Proof</p>
          <h2 id="proof-title" className="h2 mt-5">
            Running today at a South African <span className="italic-accent">luxury home design and build studio.</span>
          </h2>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            Not a demo and not a mock-up. A live studio uses it every day to answer enquiries, keep track of every client and project, and send quotes. We keep the client&apos;s name private.
          </p>
        </Reveal>
        <ul className="grid gap-px self-start overflow-hidden rounded-[22px] sm:grid-cols-2" style={{ background: "var(--hairline)" }}>
          {BUILT.map((b, i) => (
            <li key={b.title} className="sheen" style={{ background: "var(--bg-2)" }} data-tilt="3">
              <Reveal delay={i * 0.05} className="h-full p-6 md:p-8">
                <span className="font-mono text-[0.75rem] text-[color:var(--color-accent)] tabular">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[1.25rem] font-medium text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.02em" }}>
                  {b.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{b.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA. id="audit" so StickyMobileCTA steps aside here.          */
/* ------------------------------------------------------------------ */
export function FinalCTASection() {
  return (
    <section
      id="audit"
      className="relative isolate overflow-hidden section-pad bg-canvas"
      aria-labelledby="final-title"
      style={{ borderTop: "1px solid var(--hairline)", scrollMarginTop: "5rem" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full -z-10 h-[520px] w-[900px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(var(--accent-glow-rgb),0.18), transparent)" }}
      />
      <div className="container-narrow text-left md:text-center">
        <Reveal>
          <p className="eyebrow">Free pre-audit · 30 minutes</p>
          <h2
            id="final-title"
            className="mt-6 font-display text-[color:var(--color-ink)] md:mx-auto md:max-w-[16ch]"
            style={{ fontSize: "clamp(2.6rem, 5vw + 1rem, 5.5rem)", lineHeight: 0.98, letterSpacing: "-0.045em" }}
          >
            Find out what your silence <span className="italic-accent">costs.</span>
          </h2>
          <ul className="mt-8 grid gap-3 text-left md:mx-auto md:max-w-md">
            {[
              "How fast you reply today, channel by channel",
              "What slow replies are likely costing you, in real money",
              "A fixed quote, if you want us to build it",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[1rem] leading-[1.55] text-[color:var(--color-ink-soft)]">
                <Check size={17} strokeWidth={2.4} aria-hidden className="mt-1 shrink-0 text-[color:var(--color-accent)]" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row md:justify-center">
            <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent min-h-12 justify-center px-7">
              Get your free Operations Map
              <ArrowUpRight size={16} aria-hidden />
            </a>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-12 justify-center px-7">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
          <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
            Free · nothing to sign · a person answers WhatsApp
          </p>
        </Reveal>
      </div>
    </section>
  );
}
