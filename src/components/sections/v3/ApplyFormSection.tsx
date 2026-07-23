"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { VSLApplyForm } from "@/components/forms/VSLApplyForm";

const FALLBACK_BOOKING =
  "https://api.leadconnectorhq.com/widget/booking/yLGPT8nNF78G32doGmoW";

export function ApplyFormSection() {
  const bookingUrl =
    process.env.NEXT_PUBLIC_GHL_BOOKING_URL || FALLBACK_BOOKING;

  return (
    <section
      id="apply-form"
      className="relative isolate overflow-hidden bg-canvas section-pad-sm"
    >
      {/* Top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.4), transparent)",
        }}
      />

      <div className="container-narrow">
        <Reveal>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.3em] backdrop-blur"
            style={{
              borderColor: "rgba(var(--accent-rgb),0.3)",
              background: "rgba(var(--accent-rgb),0.04)",
              color: "var(--color-accent)",
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            Apply · Built for local operators doing £4k+/month
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mt-6 font-display text-[color:var(--color-ink)] leading-[1.04]"
            style={{ fontSize: "clamp(2.25rem, 4.8vw, 3.75rem)", letterSpacing: "-0.035em" }}
          >
            Tell us about your <span className="italic-accent">business.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
            Eight short questions. About 90 seconds. Then we&apos;ll show you
            exactly what we&apos;d build.
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-12">
          <VSLApplyForm bookingUrl={bookingUrl} />
        </Reveal>
      </div>
    </section>
  );
}
