"use client";

/**
 * TheProblem — the dark, dramatic full-bleed beat right after the bright hero.
 * Its job is contrast (bright → dark → bright) + pain agitation before the
 * solution. Colours are hard-set to the espresso/caramel dark world so it's
 * always a dramatic dark band regardless of the page theme.
 */

import { Reveal } from "@/components/primitives/Reveal";
import { PhoneMissed, Timer, Moon } from "lucide-react";

const PAINS = [
  {
    icon: PhoneMissed,
    title: "Missed calls",
    body: "A missed call rarely leaves a voicemail. They just dial the next name on the list.",
  },
  {
    icon: Timer,
    title: "Slow follow-up",
    body: "Reply an hour later and the lead's gone cold. Speed is the whole game — and no one's fast enough all day.",
  },
  {
    icon: Moon,
    title: "After-hours enquiries",
    body: "Evenings, weekends, mid-job — that's when enquiries land, and there's no one free to answer.",
  },
];

export function TheProblem() {
  return (
    <section
      className="relative isolate overflow-hidden section-pad"
      style={{ background: "linear-gradient(168deg, #0A0D10 0%, #070A0D 60%, #050709 100%)" }}
    >
      {/* warm glow + grain for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 78% 12%, rgba(79, 141, 255,0.16), transparent 62%), radial-gradient(ellipse 50% 45% at 8% 92%, rgba(79, 141, 255,0.10), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(79, 141, 255,0.5) 45%, rgba(79, 141, 255,0.5) 55%, transparent)" }}
      />

      <div className="container-wide">
        <div className="max-w-3xl">
          <Reveal>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.3em]"
              style={{ color: "#7DABFF" }}
            >
              The problem
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-5 font-display font-medium leading-[1.06] tracking-tight text-[2rem] md:text-5xl lg:text-[3.4rem]"
              style={{ color: "#FFFFFF", textWrap: "balance" }}
            >
              You&apos;re not losing jobs to better tradespeople.{" "}
              <span
                style={{
                  fontFamily:
                    "var(--font-fraunces), 'Fraunces', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "#7DABFF",
                }}
              >
                You&apos;re losing them to whoever answered first.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed max-w-xl" style={{ color: "#C5CDD3" }}>
              For most local businesses, the leak isn&apos;t marketing — it&apos;s
              the enquiries that come in and never get answered in time. Here&apos;s
              where the jobs slip away:
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {PAINS.map((p, i) => (
            <Reveal key={p.title} delay={0.12 + i * 0.08}>
              <div
                className="group relative h-full rounded-2xl border p-7 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  borderColor: "rgba(255, 255, 255,0.10)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: "rgba(79, 141, 255,0.14)", color: "#7DABFF" }}
                >
                  <p.icon size={20} strokeWidth={1.9} />
                </span>
                <h3
                  className="mt-5 font-display text-xl font-medium tracking-tight"
                  style={{ color: "#FFFFFF" }}
                >
                  {p.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: "#8A97A3" }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p
            className="mt-11 text-lg md:text-xl font-medium"
            style={{ color: "#FFFFFF" }}
          >
            Verdance answers all of it —{" "}
            <span style={{ color: "#7DABFF" }}>instantly, every time.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
