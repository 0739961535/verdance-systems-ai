"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { AUDIT } from "@/data/landing";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * AuditSection - the terminal conversion moment: the named productised
 * first call with the booking calendar embedded directly. The iframe
 * container reserves a fixed min-height so the embed never shifts layout.
 */
export function AuditSection() {
  // The embed's resize helper only injects once per full page load via
  // next/script, so inject it manually on every mount (same fix as the
  // contact page) so the calendar always sizes itself after SPA navs.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      id="audit"
      className="section-pad"
      style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--hairline-glow)",
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

        {/* calendar */}
        <Reveal delay={0.1}>
          <div
            className="surface relative overflow-hidden px-2 pt-2 pb-4 md:px-4"
            style={{ borderRadius: 20, border: "1px solid var(--hairline-2)", background: "var(--bg-3)" }}
          >
            {["top-2 left-2", "top-2 right-2"].map((pos) => (
              <span key={pos} aria-hidden className={`pointer-events-none absolute ${pos} font-mono text-[10px] text-[color:var(--color-ink-faint)] z-10`}>+</span>
            ))}
            <iframe
              id="verdance-audit-calendar"
              src={SITE.ghlBooking}
              title="Book your AI Systems Audit"
              scrolling="no"
              style={{ width: "100%", border: "none", minHeight: 700, overflow: "hidden" }}
            />
            <p className="px-3 pt-2 font-mono text-[0.62rem] tracking-[0.08em] text-[color:var(--color-ink-faint)]">
              pick a slot, the invite arrives instantly
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
