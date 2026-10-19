import Link from "next/link";
import { ArrowRight, ArrowUpRight, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import film from "./flight/film-manifest.json";
import { Reveal, SplitWords } from "@/components/primitives/Reveal";
import { CTA_PRIMARY, CTA_PRIMARY_MICRO, SITE } from "@/data/site";
import { GENERIC_BOOK_URL } from "@/data/niches";
import { AI_TEAM_PATH } from "@/data/aiTeam";
import { HOME_ROTATION } from "@/data/conversations";
import { LaptopInbox } from "@/components/device/LaptopInbox";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
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
        <Reveal variant="wipe" className="max-w-3xl md:mx-auto md:text-center">
          <p className="eyebrow md:justify-center">Example: answering customers</p>
          <h2 id="watch-title" className="h2 mt-5">
            <SplitWords text="Watch it work. Every message answered in seconds." />
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)] md:mx-auto">
            Slow replies lose customers. People who wait too long ask someone else. So every message gets a reply in under a minute, day or night.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-5xl md:mt-16">
          <LaptopInbox rotation={HOME_ROTATION} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What you get: four big scenes, one word each (design review fix 8)  */
/* ------------------------------------------------------------------ */
const GETS = [
  { word: "Answer", title: "Every customer, fast", body: "Every message gets a reply in under a minute. Day or night." },
  { word: "Follow up", title: "No one slips away", body: "It checks in with people who went quiet, so they don't forget you." },
  { word: "Admin", title: "Done for you", body: "Bookings, notes and forms get filled in. No more typing things twice." },
  { word: "Report", title: "What's working", body: "A short report each month, in plain words and real numbers." },
];

export function WhatYouGet() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="get-title">
      <div className="container-wide">
        <Reveal variant="wipe" className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">What you get</p>
            <h2 id="get-title" className="h2 mt-5">
              <SplitWords text="AI that does real work." />
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
        <ul className="mt-10 grid md:mt-14 md:grid-cols-2" style={{ borderTop: "1px solid var(--hairline-2)" }}>
          {GETS.map(({ word, title, body }, i) => (
            <li key={word} className="get-row">
              <Reveal delay={i * 0.05}>
                <p className="font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(2.75rem, 4vw + 1.2rem, 4.75rem)", lineHeight: 0.95, letterSpacing: "-0.045em" }}>
                  {word}
                </p>
                <h3 className="mt-4 text-[1.0625rem] font-semibold text-[color:var(--color-ink)]">{title}</h3>
                <p className="mt-1.5 max-w-[34ch] text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{body}</p>
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
            <SplitWords text="You stay in control." />
          </h2>
          <p className="mt-6 max-w-md font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.25rem, 0.6vw + 1.05rem, 1.5rem)", lineHeight: 1.3, letterSpacing: "-0.015em" }}>
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
/* The closing scene: one line, one button, WhatsApp beside it, over   */
/* the film's orbit frame (design review fix 9). id="audit" so the     */
/* sticky bar steps aside; the footer drops its own button on home.    */
/* ------------------------------------------------------------------ */
const STILL = (n: string, ext: string) => `/flight/film/${n}.${ext}?v=${film.v}`;

export function SimpleFinalCTA() {
  return (
    <section id="audit" className="close-scene relative isolate overflow-hidden" aria-labelledby="final-title" style={{ scrollMarginTop: "5rem" }}>
      <picture className="close-scene-bg">
        <source type="image/avif" media="(max-width: 767px)" srcSet={STILL("still-m", "avif")} />
        <source type="image/webp" media="(max-width: 767px)" srcSet={STILL("still-m", "webp")} />
        <source type="image/avif" srcSet={STILL("still-d", "avif")} />
        <img src={STILL("still-d", "webp")} alt="" width={film.desktop.width} height={film.desktop.height} loading="lazy" decoding="async" />
      </picture>
      <div className="container-wide relative">
        <Reveal>
          <h2
            id="final-title"
            className="max-w-[12ch] font-display text-[#F2F5FC]"
            style={{ fontSize: "clamp(2.75rem, 5vw + 1rem, 5.75rem)", lineHeight: 0.96, letterSpacing: "-0.045em" }}
          >
            <SplitWords text="Find out where your hours go." />
          </h2>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.6] text-[rgba(234,240,255,0.84)]">
            A free 30-minute call. We look at how your business runs and show you where the time and money go. {CTA_PRIMARY_MICRO}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-[52px] flex-1 justify-center px-7 text-[1.02rem] sm:flex-none">
              {CTA_PRIMARY}
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flm-wa">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
