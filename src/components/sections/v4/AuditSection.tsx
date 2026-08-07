import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { AUDIT } from "@/data/landing";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * AuditSection - the terminal conversion moment. The booking calendar lives on
 * the dedicated /contact page, so this section pitches the call and sends the
 * visitor straight there with one click (no on-page form or calendar iframe).
 */
export function AuditSection() {
  return (
    <section
      id="audit"
      className="section-pad band-texture"
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--hairline-glow)",
        scrollMarginTop: "5rem",
      }}
      aria-labelledby="audit-title"
    >
      <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* pitch */}
        <div>
          <Reveal>
            <span className="eyebrow">{AUDIT.eyebrow}</span>
            <h2
              id="audit-title"
              className="font-display text-[color:var(--color-ink)] mt-4"
              style={{ fontSize: "clamp(1.9rem, 3.2vw + 1.2rem, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
            >
              The AI Systems <span className="italic-accent">Audit</span>.
            </h2>
            <p className="mt-5 max-w-lg text-[color:var(--color-ink-soft)]" style={{ lineHeight: 1.6 }}>
              Thirty minutes on your business, not ours. You leave with:
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-6 space-y-3">
              {AUDIT.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={16} strokeWidth={2.5} aria-hidden className="mt-1 shrink-0 text-[color:var(--color-accent)]" />
                  <span className="text-[0.95rem] leading-[1.55] text-[color:var(--color-ink-soft)]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[0.8rem] tracking-[0.08em] text-[color:var(--color-ink-muted)]">
              {AUDIT.microcopy}
            </p>

            <p className="mt-8 text-[0.95rem] text-[color:var(--color-ink-soft)]">
              Prefer chat?{" "}
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[color:var(--color-accent)]"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                WhatsApp us
              </a>
              , a human answers.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10">
              <div className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-ink-muted)]">
                Ask an AI about us
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {AUDIT.aiChips.map((chip) => (
                  <a
                    key={chip.label}
                    href={chip.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-4 py-2 font-mono text-[0.8rem] tracking-[0.08em] text-[color:var(--color-ink-soft)]"
                    style={{ border: "1px solid var(--hairline-2)", transition: "border-color 0.15s var(--ease-luxury)" }}
                  >
                    {chip.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* book CTA - the calendar lives on /contact so every "Book a Meeting"
            lands straight on the booking tool */}
        <Reveal delay={0.1}>
          <div
            className="surface relative overflow-hidden"
            style={{ borderRadius: 20, border: "1px solid var(--hairline-2)", background: "var(--bg-3)" }}
          >
            <div className="px-6 py-9 md:px-9 md:py-11">
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                30 min · video call
              </span>
              <h3
                className="mt-4 font-display font-medium text-[color:var(--color-ink)]"
                style={{ fontSize: "clamp(1.6rem, 2.4vw + 1rem, 2.4rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
              >
                Grab a slot on <span className="italic-accent">the calendar.</span>
              </h3>
              <p className="mt-4 max-w-md text-[0.95rem] leading-[1.55] text-[color:var(--color-ink-soft)]">
                Pick a time that works and a calendar invite lands in your inbox
                straight away. No forms, no back-and-forth.
              </p>
              <Link href="/contact" className="btn btn-accent mt-7 min-h-12">
                Book a Meeting
                <ArrowUpRight size={15} aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
