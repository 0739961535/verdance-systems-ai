"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { RotatingHeadline } from "@/components/primitives/RotatingHeadline";
import { WhatsAppDemo } from "@/components/demos/WhatsAppDemo";

// The hero says what Verdance does, over and over, in different words.
const HERO_PHRASES = [
  "every missed call.",
  "the leads you lose.",
  "nights & weekends.",
  "3am enquiries.",
  "your days off.",
  "a full calendar.",
];

const TICKER_ITEMS = [
  "Answering calls while you're on the tools",
  "Following up with every new lead",
  "Booking jobs straight into your calendar",
  "Texting back missed calls in seconds",
  "Handling enquiries at 3am",
  "Waking quiet quotes back up",
  "Collecting 5-star reviews on autopilot",
];

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-canvas min-h-[100svh]">
      {/* Ambient: fine grain over the obsidian ground - quiet, premium, no flow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-40"
        style={{
          opacity: 0.5,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* LAYER 2 - Architectural grid with radial mask */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(var(--hairline-rgb),0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--hairline-rgb),0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 30% 50%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 45%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 30% 50%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 45%, transparent 80%)",
        }}
      />

      {/* LAYER 3 - one soft, static claret wash for depth (no drift) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-20"
        style={{
          top: "6%", right: "-6%", width: 560, height: 560, borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb),0.10), transparent 68%)",
          filter: "blur(70px)",
        }}
      />

      {/* LAYER 5 - Central darkening vignette keeps the headline crisp */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 28% 48%, rgba(var(--bg-rgb),0.85) 0%, rgba(var(--bg-rgb),0.55) 35%, transparent 75%)",
        }}
      />

      {/* LAYER 7 - Top + bottom edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(var(--bg-rgb),0.95), rgba(var(--bg-rgb),0.4) 60%, transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 -z-10"
        style={{
          background:
            "linear-gradient(0deg, rgba(var(--bg-rgb),0.95), rgba(var(--bg-rgb),0.4) 60%, transparent)",
        }}
      />

      {/* CORNER REGISTRATION MARKS - architectural luxury cue */}
      <CornerMarks />

      <div className="container-wide relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32">
       <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8">
        {/* LEFT - the pitch */}
        <div className="relative z-10">
        {/* Hero headline - fixed lead-in + a phrase that keeps saying what we do */}
        <h1
          className="mt-9 md:mt-11 headline-hero max-w-[15ch] relative z-10"
          aria-label="AI for your business - a 24/7 AI receptionist that answers every call and books the job."
        >
          <span className="enter-line block overflow-hidden" style={{ animationDelay: "0.15s" }}>
            AI for
          </span>
          <span className="block overflow-hidden">
            <RotatingHeadline
              phrases={HERO_PHRASES}
              className="enter-line italic-accent"
              // slight glow to match the rest of the accent treatment
            />
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="enter-fade-up mt-8 max-w-xl text-lg md:text-xl text-[color:var(--color-ink-soft)] leading-relaxed relative z-10"
          style={{ animationDelay: "0.62s" }}
        >
          Verdance builds and runs a 24/7 AI receptionist - it answers every call,
          text and DM the moment it lands, follows up with every lead, and books
          the job straight into your calendar. Done for you.
        </p>

        {/* CTAs */}
        <div
          className="enter-fade-up mt-9 flex flex-wrap items-center gap-4 relative z-10"
          style={{ animationDelay: "0.74s" }}
        >
          <MagneticButton href="/contact" variant="accent">
            Book a free consult
            <Arrow />
          </MagneticButton>
          <MagneticButton href="/how-it-works" variant="ghost">
            See how it works
          </MagneticButton>
        </div>

        {/* Trust line */}
        <div
          className="enter-fade-up mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[color:var(--color-ink-muted)] relative z-10"
          style={{ animationDelay: "0.86s" }}
        >
          <span className="inline-flex items-center gap-2.5">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--color-accent)",
                boxShadow: "0 0 8px rgba(var(--accent-rgb),0.6)",
              }}
            />
            Free consult · a clear plan · then we build it.
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
            Live in days
          </span>
        </div>
        </div>
        {/* end LEFT */}

        {/* RIGHT - the product, working */}
        <div
          className="enter-fade-up relative flex justify-center lg:justify-end lg:pr-12 xl:pr-20 mt-2 lg:mt-0"
          style={{ animationDelay: "0.5s" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 66% 56% at 55% 42%, rgba(var(--accent-rgb),0.16), transparent 70%)",
              filter: "blur(18px)",
            }}
          />
          <WhatsAppDemo businessName="Kerridge Plumbing" />
        </div>
       </div>
       {/* end grid */}
      </div>

      {/* AMBIENT BOTTOM TICKER - scrolling hairline of live activity */}
      <BottomTicker items={TICKER_ITEMS} />
    </section>
  );
}

function TrustPill() {
  return (
    <div
      className="enter-fade-up inline-flex items-center gap-3 rounded-full border border-[color:var(--color-hairline-2)] bg-[color:var(--color-bg-glass)] backdrop-blur-md pl-2 pr-4 py-1.5"
      style={{ animationDelay: "0.9s" }}
    >
      <div className="flex -space-x-2">
        {["#4F8DFF", "#4F8DFF", "#1E4FD6", "#7DABFF"].map((c, i) => (
          <span
            key={i}
            className="inline-block h-6 w-6 rounded-full border-2"
            style={{
              background: `linear-gradient(135deg, ${c}, rgba(var(--accent-deep-rgb),1))`,
              borderColor: "var(--color-bg-2)",
            }}
          />
        ))}
      </div>
      <span className="text-[12px] text-[color:var(--color-ink-soft)]">
        <span className="font-medium text-[color:var(--color-ink)]">14+ businesses</span> live
      </span>
    </div>
  );
}

function BottomTicker({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const repeated = [...items, ...items, ...items];
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-10 border-t pointer-events-none"
      style={{
        borderColor: "var(--color-hairline)",
        background:
          "linear-gradient(180deg, transparent, rgba(var(--bg-rgb),0.7) 40%, rgba(var(--bg-rgb),0.95))",
      }}
    >
      <div className="relative overflow-hidden py-3">
        <motion.div
          className="flex gap-12 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-ink-muted)]"
          animate={reduce ? undefined : { x: ["0%", "-33.333%"] }}
          transition={
            reduce
              ? undefined
              : { duration: 48, ease: "linear", repeat: Infinity }
          }
          style={{ willChange: "transform" }}
        >
          {repeated.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              <span
                className="inline-block h-1 w-1 rounded-full"
                style={{
                  background: "var(--color-accent)",
                  boxShadow: "0 0 8px rgba(var(--accent-rgb),0.7)",
                }}
              />
              <span>{item}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function CornerMarks() {
  const common = "absolute pointer-events-none z-[1]";
  const size = 22;
  const inset = 24;
  return (
    <>
      {/* TL */}
      <div className={common} style={{ top: inset, left: inset, width: size, height: size }}>
        <Mark dir="tl" />
      </div>
      {/* TR */}
      <div className={common} style={{ top: inset, right: inset, width: size, height: size }}>
        <Mark dir="tr" />
      </div>
      {/* BL */}
      <div
        className={common}
        style={{ bottom: inset + 40, left: inset, width: size, height: size }}
      >
        <Mark dir="bl" />
      </div>
      {/* BR */}
      <div
        className={common}
        style={{ bottom: inset + 40, right: inset, width: size, height: size }}
      >
        <Mark dir="br" />
      </div>
    </>
  );
}

function Mark({ dir }: { dir: "tl" | "tr" | "bl" | "br" }) {
  const color = "rgba(var(--accent-rgb),0.5)";
  const sw = 1.25;
  return (
    <svg viewBox="0 0 22 22" width="100%" height="100%" aria-hidden>
      {dir === "tl" && (
        <>
          <path d="M1 1 L1 12" stroke={color} strokeWidth={sw} strokeLinecap="round" />
          <path d="M1 1 L12 1" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        </>
      )}
      {dir === "tr" && (
        <>
          <path d="M21 1 L21 12" stroke={color} strokeWidth={sw} strokeLinecap="round" />
          <path d="M21 1 L10 1" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        </>
      )}
      {dir === "bl" && (
        <>
          <path d="M1 21 L1 10" stroke={color} strokeWidth={sw} strokeLinecap="round" />
          <path d="M1 21 L12 21" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        </>
      )}
      {dir === "br" && (
        <>
          <path d="M21 21 L21 10" stroke={color} strokeWidth={sw} strokeLinecap="round" />
          <path d="M21 21 L10 21" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
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
