import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChartColumn, ClipboardCheck, KeyRound, MessageCircle, Repeat, ShieldCheck, UserRound } from "lucide-react";
import { Reveal, SplitWords } from "@/components/primitives/Reveal";
import { CTA_PRIMARY, CTA_PRIMARY_MICRO, SITE } from "@/data/site";
import { GENERIC_BOOK_URL } from "@/data/niches";
import { AI_TEAM_PATH } from "@/data/aiTeam";
import { HOME_ROTATION } from "@/data/conversations";
import { LaptopInbox } from "@/components/device/LaptopInbox";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { HeroCounterCard } from "./hero/HeroCounterCard";
import { LazyHeroSignal } from "./hero/LazyHeroSignal";
import { Rocket } from "./hero/Rocket";

/**
 * The simple home page (Oct 2026 simplicity review, docs/simplicity-review.md).
 * Seven sections, one idea each, one main button with the same words everywhere.
 */

/* ------------------------------------------------------------------ */
/* 1. Hero: the tagline, the promise, one line of how, one button      */
/* ------------------------------------------------------------------ */
export function SimpleHero() {
  return (
    <section className="hero-launch relative isolate overflow-hidden bg-canvas" aria-labelledby="hero-title" data-cta-location="hero">
      <div aria-hidden className="aurora" />
      <div className="container-narrow relative pt-24 pb-20 text-center sm:pt-32 md:pt-40 md:pb-28">
        <Rocket />

        <h1
          id="hero-title"
          className="enter-rise relative z-[1] font-display mx-auto mt-5 text-[color:var(--color-ink)] md:mt-7"
          style={{ fontSize: "clamp(2.6rem, 5.2vw + 1rem, 6.25rem)", lineHeight: 0.98, letterSpacing: "-0.045em", animationDuration: "0.7s" }}
        >
          We don&apos;t talk about AI. <span className="italic-accent block whitespace-nowrap">We ship it.</span>
        </h1>

        <p
          className="enter-rise relative z-[1] mx-auto mt-6 max-w-[22ch] font-display text-[color:var(--color-ink)] md:mt-8 md:max-w-none"
          style={{ fontSize: "clamp(1.3rem, 1.1vw + 1rem, 1.9rem)", lineHeight: 1.25, letterSpacing: "-0.025em", animationDelay: "0.08s" }}
        >
          Find out what AI can really do for your business.
        </p>

        <p
          className="relative z-[1] mx-auto mt-4 max-w-[36rem] text-[color:var(--color-ink-soft)]"
          style={{ fontSize: "clamp(1.02rem, 0.3vw + 0.95rem, 1.15rem)", lineHeight: 1.6 }}
        >
          We look at how your business runs. Then we set up AI that does the work for you: answering customers, following up, admin and reports. You stay in control.
        </p>

        <div className="enter-fade-up relative z-[1] mt-8 flex flex-col items-center gap-4 md:mt-10" style={{ animationDelay: "0.2s" }}>
          <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent btn-launch min-h-[52px] w-full justify-center px-7 text-[1.02rem] sm:w-auto">
            {CTA_PRIMARY}
            <ArrowUpRight size={17} aria-hidden />
          </a>
          <p className="text-[0.9rem] text-[color:var(--color-ink-muted)]">
            {CTA_PRIMARY_MICRO}{" "}
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 whitespace-nowrap underline decoration-[color:var(--hairline-2)] underline-offset-4 hover:text-[color:var(--color-ink)]">
              <WhatsAppIcon className="h-3.5 w-3.5" />
              Or WhatsApp us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Watch it work: the enquiry demo, one strong example              */
/* ------------------------------------------------------------------ */
export function WatchItWork() {
  return (
    <section className="section-pad bg-canvas-2" aria-labelledby="watch-title">
      <div className="container-wide">
        <Reveal variant="wipe" className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Example: answering customers</p>
          <h2 id="watch-title" className="h2 mt-5">
            <SplitWords text="Watch it work. Every message answered" />{" "}
            <span className="italic-accent">
              <SplitWords text="in seconds." start={6} />
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            Slow replies lose customers. People who wait too long ask someone else. So every message gets a reply in under a minute, day or night.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-5xl md:mt-16 lg:mt-28">
          <div data-parallax="-0.03" className="hs-stage">
            <HeroCounterCard />
            <LaptopInbox rotation={HOME_ROTATION} />
            <LazyHeroSignal />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. How it works: three steps                                        */
/* ------------------------------------------------------------------ */
const STEPS = [
  { n: "1", title: "We look", body: "A free 30-minute call. We see how your business runs and where time gets lost." },
  { n: "2", title: "We set it up", body: "We set up AI on the tools you already use, like WhatsApp, email and your diary. Live in 10 working days." },
  { n: "3", title: "It does the work", body: "It answers, follows up and does the admin. You check anything important first." },
];

export function ThreeSteps() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="how-title">
      <div className="container-wide">
        <Reveal variant="wipe" className="max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h2 id="how-title" className="h2 mt-5">
            <SplitWords text="Three simple" />{" "}
            <span className="italic-accent">
              <SplitWords text="steps." start={2} />
            </span>
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-10">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.08}>
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full font-display text-[1.25rem] text-[color:var(--color-accent)]"
                  style={{ background: "rgba(var(--accent-rgb), 0.08)", border: "1px solid var(--hairline-glow)" }}
                  aria-hidden
                >
                  {s.n}
                </span>
                <h3 className="mt-6 font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.6rem, 1.2vw + 1.2rem, 2.1rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[22rem] text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. What you get: four plain cards                                   */
/* ------------------------------------------------------------------ */
const GETS = [
  { icon: MessageCircle, title: "Answers every customer fast", body: "Every message gets a reply in under a minute. Day or night." },
  { icon: Repeat, title: "Follows up so no one slips away", body: "It checks in with people who went quiet, so they don't forget you." },
  { icon: ClipboardCheck, title: "Does the admin", body: "Bookings, notes and forms get filled in for you. No more typing things twice." },
  { icon: ChartColumn, title: "Tells you what's working", body: "A short report each month, in plain words and real numbers." },
];

export function WhatYouGet() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="get-title">
      <div className="container-wide">
        <Reveal variant="wipe" className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">What you get</p>
            <h2 id="get-title" className="h2 mt-5">
              <SplitWords text="AI that does" />{" "}
              <span className="italic-accent">
                <SplitWords text="real work." start={3} />
              </span>
            </h2>
          </div>
          <Link
            href={AI_TEAM_PATH}
            className="group inline-flex min-h-11 items-center gap-2 font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)]"
          >
            See the full AI team
            <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {GETS.map(({ icon: Icon, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.06}>
                <Icon size={28} strokeWidth={1.6} aria-hidden className="text-[color:var(--color-accent)]" />
                <h3 className="mt-5 font-display text-[1.4rem] text-[color:var(--color-ink)]" style={{ lineHeight: 1.15, letterSpacing: "-0.025em" }}>
                  {title}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. You stay in control                                              */
/* ------------------------------------------------------------------ */
const CONTROL = [
  { icon: ShieldCheck, text: "You check anything important before it goes out." },
  { icon: UserRound, text: "A real person takes over when it matters." },
  { icon: KeyRound, text: "Everything is set up in your name. You own it." },
];

export function InControl() {
  return (
    <section className="section-pad bg-canvas-2" aria-labelledby="control-title">
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal variant="wipe">
          <p className="eyebrow">Your business, your rules</p>
          <h2 id="control-title" className="h2 mt-5">
            <SplitWords text="You stay" />{" "}
            <span className="italic-accent">
              <SplitWords text="in control." start={2} />
            </span>
          </h2>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            It already runs every day at a South African luxury home design and build studio.
          </p>
        </Reveal>
        <ul className="grid gap-8 self-center">
          {CONTROL.map(({ icon: Icon, text }, i) => (
            <li key={text}>
              <Reveal delay={i * 0.06} className="flex items-start gap-5">
                <Icon size={26} strokeWidth={1.6} aria-hidden className="mt-0.5 shrink-0 text-[color:var(--color-accent)]" />
                <p className="font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.25rem, 0.8vw + 1rem, 1.6rem)", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                  {text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Final call to action. id="audit" so StickyMobileCTA steps aside. */
/* ------------------------------------------------------------------ */
export function SimpleFinalCTA() {
  return (
    <section id="audit" className="relative isolate overflow-hidden section-pad bg-canvas" aria-labelledby="final-title" style={{ scrollMarginTop: "5rem" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full -z-10 h-[520px] w-[900px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(var(--accent-glow-rgb),0.18), transparent)" }}
      />
      <div className="container-narrow text-center">
        <Reveal>
          <h2
            id="final-title"
            className="mx-auto max-w-[14ch] font-display text-[color:var(--color-ink)]"
            style={{ fontSize: "clamp(2.6rem, 5vw + 1rem, 5.5rem)", lineHeight: 0.98, letterSpacing: "-0.045em" }}
          >
            <SplitWords text="See what AI can do" />{" "}
            <span className="italic-accent">
              <SplitWords text="for you." start={5} />
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            A free 30-minute call. We look at how your business runs and show you where AI can save you time.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent min-h-[52px] w-full justify-center px-7 text-[1.02rem] sm:w-auto">
              {CTA_PRIMARY}
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-[0.95rem] text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)]">
              <WhatsAppIcon className="h-4 w-4" />
              Or WhatsApp us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
