import Link from "next/link";
import { ArrowRight, ArrowUpRight, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import film from "./flight/film-manifest.json";
import { Reveal, SplitWords } from "@/components/primitives/Reveal";
import { CTA_PRIMARY, CTA_PRIMARY_MICRO, SITE } from "@/data/site";
import { GENERIC_BOOK_URL } from "@/data/niches";
import { HOME_ROTATION } from "@/data/conversations";
import { LaptopInbox } from "@/components/device/LaptopInbox";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { GetVisual, WorkVisualsStyle } from "./inbox/WorkVisuals";

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
          We look at how your business runs. Then Verdance does the work: it answers customers, follows up, does the admin and reports back. You stay in control.
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
    <section className="band-night chapter-pad" aria-labelledby="watch-title">
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.55fr] lg:items-center lg:gap-16">
        <Reveal variant="wipe" className="max-w-xl">
          <p className="eyebrow">Demo</p>
          <h2 id="watch-title" className="h2 mt-4">
            <SplitWords text="Watch it work." />
          </h2>
          <p className="lead mt-6">A customer messages at 21:41. This is what they get back.</p>
        </Reveal>

        <div className="inbox-stage min-w-0">
          <LaptopInbox rotation={HOME_ROTATION} />
          <p className="museum mt-4">Sample conversations. The businesses and customers are made up.</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What you get: four big scenes, one word each (design review fix 8)  */
/* ------------------------------------------------------------------ */
/* Small app screens per row live in ./inbox/WorkVisuals (decorative,
   sample content). MINI stays for the approval card in "In control". */
const MINI = "mt-6 max-w-[22rem] rounded-[14px] border border-white/[0.08] bg-[#0A1226] p-3.5 text-[0.875rem] leading-[1.45] text-[#E9EDEF] md:mt-8 md:max-w-[28rem] md:p-5 md:text-[1rem] md:min-h-[9.5rem] md:content-center";

const GETS = [
  {
    word: "Answer",
    title: "Every customer, fast",
    body: "Every enquiry gets a reply within 60 seconds, in your voice, day or night. Someone asks at 22:15 if you deliver to Durban and has an answer before they put the phone down. You see every conversation and can take over at any point.",
    href: "/services/conversation-ai",
  },
  {
    word: "Follow up",
    title: "No one slips away",
    body: "When someone goes quiet after a quote, a friendly check-in is drafted for you. You approve it with one tap and it goes out at a sensible hour, like 09:00 the next morning. Nobody is forgotten because the week got busy.",
    href: "/services/follow-up-nurture",
  },
  {
    word: "Admin",
    title: "Done for you",
    body: "Bookings land in your calendar with the address, notes and photos already attached. A customer picks Tuesday at 07:30 and gets a reminder the night before. Nobody types the same details twice.",
    href: "/services/booking-calendar",
  },
  {
    word: "Report",
    title: "What's working",
    body: "On the 1st of each month you get a short report in plain words. It shows how many enquiries came in, how fast they were answered and which ones became work. You see what to keep and what to fix next.",
    href: "/services/analytics-compliance",
  },
];

export function WhatYouGet({ showAll = true }: { showAll?: boolean } = {}) {
  return (
    <section className="band-orbit chapter-pad" aria-labelledby="get-title">
      <WorkVisualsStyle />
      <div className="container-wide">
        <Reveal variant="wipe" className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Work done</p>
            <h2 id="get-title" className="h2 mt-4">
              <SplitWords text="Four jobs, done for you." />
            </h2>
            <p className="lead mt-6">Answering, following up, admin and reports. Your team keeps the work that needs a person.</p>
          </div>
          {showAll && (
          <Link
            href="/services"
            className="group inline-flex min-h-11 items-center gap-2 font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)]"
          >
            See all 12 services
            <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
          )}
        </Reveal>
        <ul className="get-list mt-12 md:mt-16">
          {GETS.map(({ word, title, body, href }, i) => (
            <li key={word} className="get-row">
              <Reveal delay={i * 0.05} className="get-row-in">
                <p className="font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(2.75rem, 4vw + 1.2rem, 4.75rem)", lineHeight: 0.95, letterSpacing: "-0.045em" }}>
                  {word}
                </p>
                <h3 className="mt-4 text-[1.0625rem] font-semibold text-[color:var(--color-ink)]">{title}</h3>
                <p className="mt-1.5 max-w-[40ch] text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{body}</p>
                <Link
                  href={href}
                  aria-label={`How it works: ${word}`}
                  className="group mt-2 inline-flex min-h-11 items-center gap-1.5 text-[1rem] font-medium text-[color:var(--color-accent)] hover:text-[color:var(--color-ink)]"
                >
                  How it works
                  <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="get-vis" style={{ gridRow: "1 / span 4" }}>
                  <GetVisual word={word} />
                </div>
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
          <p className="eyebrow">Control</p>
          <h2 id="control-title" className="h2 mt-5">
            <SplitWords text="You stay in control." />
          </h2>
          <p className="mt-6 max-w-md font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.25rem, 0.6vw + 1.05rem, 1.5rem)", lineHeight: 1.3, letterSpacing: "-0.015em" }}>
            It already runs every day at a South African luxury home design and build studio.
          </p>
        </Reveal>
        <ul className="grid gap-8 self-center">
          {CONTROL.map(({ text }, i) => (
            <li key={text}>
              <Reveal delay={i * 0.06} className="flex items-start gap-5">
                <span aria-hidden className="mt-1 w-7 shrink-0 font-mono text-[0.875rem] text-[color:var(--color-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.25rem, 0.8vw + 1rem, 1.6rem)", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                    {text}
                  </p>
                  {i === 0 && (
                    <div aria-hidden className={`${MINI} mt-4 flex items-center justify-between gap-3`}>
                      <span>Reply to a new enquiry</span>
                      <span className="shrink-0 rounded-full border border-[rgba(242,196,109,0.4)] px-2.5 py-1 text-[0.8125rem] text-[#F2C46D]">
                        Waiting for your approval
                      </span>
                    </div>
                  )}
                </div>
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

export function SimpleFinalCTA({ title = ["Find out where your", "hours", "go."] }: { title?: [string, string, string] }) {
  return (
    <section id="audit" className="close-scene relative isolate overflow-hidden" aria-labelledby="final-title" style={{ scrollMarginTop: "5rem" }}>
      <picture className="close-scene-bg">
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
            <SplitWords text={title[0]} /> <span className="italic-accent">{title[1]}</span> <SplitWords text={title[2]} />
          </h2>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.6] text-[rgba(234,240,255,0.84)]">
            A free 30-minute call. We look at how enquiries reach you today and show you what we would build first.
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-[52px] w-full justify-center px-6 text-[1.02rem] sm:w-auto">
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
