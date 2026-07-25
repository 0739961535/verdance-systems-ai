"use client";

/**
 * WhatYouGet - the concrete "here's exactly what you're buying" bento.
 * A 2×2 feature tile (the core AI receptionist) + eight capability/add-on
 * tiles. Dense, varied, and plain-spoken - the antidote to the vague
 * metaphor sections. Crisp white cards on the warm ground, cognac accents.
 */

import { Reveal } from "@/components/primitives/Reveal";
import {
  PhoneCall,
  CalendarCheck,
  Zap,
  PhoneMissed,
  RotateCcw,
  Star,
  Sparkles,
  Wrench,
  Moon,
} from "lucide-react";

const CHANNELS = ["Call", "SMS", "WhatsApp", "Instagram"];

const TILES: { icon: typeof Zap; title: string; body: string; tag?: string }[] = [
  { icon: CalendarCheck, title: "Books into your calendar", body: "Offers real openings and locks the job in - synced to your calendar." },
  { icon: Zap, title: "Follows up with every lead", body: "Chases quotes and enquiries until they book or say no." },
  { icon: PhoneMissed, title: "Missed-call text-back", body: "Texts back a missed call in seconds - before they ring a rival.", tag: "Add-on" },
  { icon: RotateCcw, title: "Reactivates old leads", body: "Wakes up your dead database with a friendly nudge that rebooks.", tag: "Add-on" },
  { icon: Star, title: "Collects 5-star reviews", body: "Invites happy customers to leave a Google review, on autopilot.", tag: "Add-on" },
  { icon: Sparkles, title: "Sounds like your brand", body: "Trained on your business, your tone, your services and prices." },
  { icon: Moon, title: "Never off", body: "No lunch breaks, no sick days, no 3am voicemail. It just answers." },
  { icon: Wrench, title: "Built & run for you", body: "We build it, run it, and keep improving it. Nothing to learn." },
];

export function WhatYouGet() {
  return (
    <section className="relative section-pad bg-canvas-2">
      <div className="container-wide">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">What you get</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 headline-section">
              One system. <span className="italic-accent">Everything handled.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              The core AI receptionist, plus the add-ons that turn missed enquiries
              into booked jobs - all built, run and maintained by us.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* FEATURE - the core, 2×2 */}
          <Reveal className="col-span-2 lg:row-span-2">
            <div
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-7 md:p-9"
              style={{
                background: "linear-gradient(160deg, var(--color-accent), var(--color-accent-deep))",
                color: "var(--color-on-accent)",
                boxShadow: "0 24px 60px -24px rgba(var(--accent-rgb),0.55)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)" }}
              />
              <div className="relative">
                <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: "rgba(255,255,255,0.16)" }}>
                  <PhoneCall size={22} strokeWidth={1.9} />
                </span>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ opacity: 0.8 }}>
                  The core
                </div>
                <h3 className="mt-3 font-display text-2xl md:text-[28px] font-medium leading-[1.12] tracking-tight max-w-[16ch]">
                  One AI receptionist for every channel.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed max-w-[38ch]" style={{ opacity: 0.9 }}>
                  It picks up every call, text, WhatsApp and Instagram DM the moment
                  it lands - day or night - and replies like your best front-desk person.
                </p>
              </div>
              <div className="relative mt-7 flex flex-wrap gap-2">
                {CHANNELS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full px-3 py-1.5 text-[12px] font-medium"
                    style={{ background: "rgba(255,255,255,0.14)" }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* CAPABILITY / ADD-ON TILES */}
          {TILES.map((t, i) => (
            <Reveal key={t.title} delay={0.04 * (i + 1)}>
              <div
                className="group relative h-full rounded-2xl border p-6 transition-all duration-300"
                style={{ background: "var(--color-bg-3)", borderColor: "var(--color-hairline)" }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl transition-colors"
                    style={{ background: "rgba(var(--accent-rgb),0.10)", color: "var(--color-accent)" }}
                  >
                    <t.icon size={19} strokeWidth={1.9} />
                  </span>
                  {t.tag && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] rounded-full border px-2 py-1 text-[color:var(--color-accent)]"
                      style={{ borderColor: "rgba(var(--accent-rgb),0.3)" }}>
                      {t.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-[17px] font-medium tracking-tight text-[color:var(--color-ink)]">
                  {t.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[color:var(--color-ink-muted)]">
                  {t.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
