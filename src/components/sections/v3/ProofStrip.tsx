"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { Marquee } from "@/components/primitives/Marquee";
import { StatCounter } from "@/components/primitives/StatCounter";

type Stat = {
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { to: 3420, suffix: "+", label: "Conversations handled by Verdance agents" },
  { to: 847, label: "Appointments booked while owners slept" },
  { to: 412, prefix: "£", suffix: "k", label: "Recovered revenue traced to reactivation" },
  { to: 14, label: "Businesses operating Verdance systems today" },
];

const BUSINESSES = [
  "BRYANT DENTAL",
  "DANIELS PROPERTY",
  "ATELIER SKIN",
  "OAKBARN HOME SERVICES",
  "MOSSON LEGAL",
  "VERIDIAN HEALTH",
  "CAPRI WELLNESS",
  "NORTH ATELIER",
  "SKY DOUNNY",
  "ACACIA AESTHETICS",
  "MERIDIAN AUTO",
  "ALGAR DENTAL",
];

export function ProofStrip() {
  return (
    <section className="relative section-pad bg-canvas-2 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.4), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(var(--accent-rgb),0.05), transparent 70%)",
        }}
      />

      <div className="container-wide">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">— Built into real operations</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 headline-section max-w-[20ch]">
              Already running across the businesses{" "}
              <span className="italic-accent">you serve.</span>
            </h2>
          </Reveal>
        </div>

        <div
          className="mt-14 grid gap-px md:grid-cols-4 border rounded-2xl overflow-hidden"
          style={{
            borderColor: "var(--color-hairline)",
            background: "var(--color-hairline)",
          }}
        >
          {STATS.map((s, i) => (
            <Reveal key={i} delay={0.08 + i * 0.06}>
              <StatTile stat={s} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <Marquee
            items={BUSINESSES}
            speedSec={70}
            separator={
              <span
                className="mx-8 inline-block h-1 w-1 rounded-full"
                style={{ background: "rgba(var(--accent-rgb),0.45)" }}
              />
            }
            itemClassName="font-mono text-[12px] uppercase tracking-[0.32em] text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-accent)] transition-colors px-5 py-2 border border-transparent hover:border-[rgba(var(--accent-rgb),0.25)] rounded-md"
          />
        </div>
      </div>
    </section>
  );
}

function StatTile({ stat }: { stat: Stat }) {
  return (
    <div
      className="relative h-full p-7 md:p-8 flex flex-col justify-between min-h-[180px] group"
      style={{ background: "var(--color-bg-2)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(var(--accent-rgb),0.08), transparent 70%)",
        }}
      />

      <div className="relative font-display font-medium leading-none tracking-[-0.035em] text-[color:var(--color-ink)] text-[clamp(2.25rem,4.5vw,3.5rem)]">
        <StatCounter
          to={stat.to}
          prefix={stat.prefix}
          suffix={stat.suffix}
          duration={1.8}
        />
      </div>

      <div className="relative mt-6 flex items-start gap-2.5">
        <span
          className="mt-1.5 inline-block h-1 w-1 rounded-full shrink-0"
          style={{ background: "var(--color-accent)" }}
        />
        <p className="text-[13px] leading-[1.5] text-[color:var(--color-ink-soft)] max-w-[22ch]">
          {stat.label}
        </p>
      </div>
    </div>
  );
}
