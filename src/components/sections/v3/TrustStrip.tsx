"use client";

import { Marquee } from "@/components/primitives/Marquee";
import { Reveal } from "@/components/primitives/Reveal";
import { INDUSTRIES } from "@/data/site";

export function TrustStrip() {
  return (
    <section className="relative py-14 bg-canvas border-y border-[color:var(--color-hairline)]">
      <div className="container-wide">
        <Reveal className="text-center text-sm md:text-base text-[color:var(--color-ink-muted)]">
          <p>
            <span className="font-medium text-[color:var(--color-ink)]">
              Built for local service businesses
            </span>
            <Sep />
            Set up for you in days
            <Sep />
            Cancel anytime
          </p>
        </Reveal>
      </div>
      <div className="mt-10">
        <Marquee
          items={INDUSTRIES}
          speedSec={60}
          itemClassName="font-display text-lg md:text-2xl font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] transition-colors"
        />
      </div>
    </section>
  );
}

function Sep() {
  return (
    <span
      className="mx-3 inline-block h-1 w-1 rounded-full align-middle"
      style={{ background: "var(--color-accent)" }}
    />
  );
}
