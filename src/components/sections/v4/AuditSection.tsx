import { Check } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { AUDIT } from "@/data/landing";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BookingCard } from "./BookingCard";

/**
 * AuditSection - the terminal conversion moment: the named productised
 * first call, booked natively through the BookingCard (CRM-backed via
 * our API routes) so the page keeps its own design language.
 */
export function AuditSection() {
  return (
    <section
      id="audit"
      className="section-pad"
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
            <p className="mt-6 font-mono text-[0.72rem] tracking-[0.08em] text-[color:var(--color-ink-muted)]">
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
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--color-ink-muted)]">
                Ask an AI about us
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {AUDIT.aiChips.map((chip) => (
                  <a
                    key={chip.label}
                    href={chip.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-4 py-2 font-mono text-[0.72rem] tracking-[0.08em] text-[color:var(--color-ink-soft)]"
                    style={{ border: "1px solid var(--hairline-2)", transition: "border-color 0.15s var(--ease-luxury)" }}
                  >
                    {chip.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* native booking */}
        <Reveal delay={0.1}>
          <BookingCard />
        </Reveal>
      </div>
    </section>
  );
}
