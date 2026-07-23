"use client";

import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedDivider } from "@/components/primitives/AnimatedDivider";
import { SERVICES_OVERVIEW } from "@/data/site";

/**
 * Map the curated home-page service cards to their canonical sub-page slugs
 * in the new /services/[slug] taxonomy. The Missed-Revenue flagship stays
 * pointing at the dedicated section on /services itself.
 */
const HOME_OVERVIEW_HREF: Record<string, string> = {
  "Missed-Revenue Recovery": "/services#missed-revenue",
  "AI Voice Receptionist": "/services/voice-ai",
  "Website & Chat Assistant": "/services/conversation-ai",
  "Reputation & Reviews Engine": "/services/reputation-reviews",
  "Custom AI Builds": "/services/custom-builds",
};

export function ServicesOverview() {
  return (
    <section className="relative section-pad bg-canvas">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">Services</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 headline-section max-w-[18ch]">
            One outcome.{" "}
            <span className="italic-accent">Several systems to get you there.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES_OVERVIEW.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.06}
              className={s.flagship ? "lg:col-span-2" : ""}
            >
              <Link
                href={HOME_OVERVIEW_HREF[s.title] ?? s.href}
                className="group block relative overflow-hidden surface surface-card-hover h-full"
              >
                <div className="p-8 md:p-9 flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    {s.flagship ? (
                      <span
                        className="inline-flex items-center gap-2 rounded-full text-[10px] uppercase tracking-[0.3em] font-mono font-medium px-2.5 py-1"
                        style={{
                          background: "var(--color-accent)",
                          color: "var(--color-on-accent)",
                        }}
                      >
                        Flagship
                      </span>
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                        Service · 0{i}
                      </span>
                    )}
                    <ArrowCircle />
                  </div>
                  <h3
                    className={`mt-7 font-display font-medium leading-tight text-[color:var(--color-ink)] ${
                      s.flagship ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[color:var(--color-ink-soft)] text-base md:text-lg leading-relaxed flex-1">
                    {s.blurb}
                  </p>
                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)] group-hover:gap-3 group-hover:text-[color:var(--color-accent)] transition-all">
                    Learn more
                    <Arrow />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <AnimatedDivider variant="accent" />
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ArrowCircle() {
  return (
    <span
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-[color:var(--color-ink)] transition-all group-hover:border-[color:var(--color-accent)] group-hover:text-[color:var(--color-accent)] group-hover:rotate-[-45deg]"
      style={{ borderColor: "var(--color-hairline-2)" }}
    >
      <Arrow />
    </span>
  );
}
