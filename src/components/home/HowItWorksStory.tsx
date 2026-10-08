import { ArrowUpRight } from "lucide-react";
import { StickyStory, type StoryStep } from "@/components/device/StickyStory";
import { ChatView, PanelView } from "@/components/device/screens";
import { GENERIC_BOOK_URL } from "@/data/niches";

/**
 * HowItWorksStory - Audit, Build, Run. One phone, three screens.
 */

function Step({ n, title, body, meta }: { n: string; title: string; body: string; meta: string }) {
  return (
    <div className="max-w-[30rem]">
      <p className="font-mono text-[0.8rem] tracking-[0.14em] text-[color:var(--color-accent)] tabular">{n}</p>
      <h3
        className="mt-3 font-display text-[color:var(--color-ink)]"
        style={{ fontSize: "clamp(1.9rem, 2.2vw + 1.1rem, 3rem)", lineHeight: 1.04, letterSpacing: "-0.04em" }}
      >
        {title}
      </h3>
      <p className="mt-4 text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{body}</p>
      <p className="mt-5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">{meta}</p>
    </div>
  );
}

const STEPS: StoryStep[] = [
  {
    id: "audit",
    clock: "09:12",
    content: (
      <Step
        n="01 · Audit"
        title="We measure how fast you reply today."
        body="A free 30-minute pre-audit, then we time real replies on each of your channels and count what came in. You get the numbers, and a fixed quote if you want us to build."
        meta="Free · 30 minutes · yours to keep"
      />
    ),
    screen: (
      <PanelView
        kicker="Pre-audit · sample"
        title="How fast you reply today"
        rows={[
          { label: "Website form", value: "6 h 10 min", tone: "bad" },
          { label: "WhatsApp", value: "52 min", tone: "bad" },
          { label: "Instagram DMs", value: "next day", tone: "bad" },
          { label: "Missed calls", value: "7 this week", tone: "bad" },
        ]}
        footer="Sample report. Yours is built from your own enquiries."
      />
    ),
  },
  {
    id: "build",
    clock: "14:30",
    content: (
      <Step
        n="02 · Build"
        title="We build it on the channels you already use."
        body="Trained on your dates, services and answers to the usual questions. It books into your diary and hands anything unusual to a person. Accounts are in your name from day one."
        meta="Fixed launch date · progress every week"
      />
    ),
    screen: (
      <PanelView
        kicker="Build · week 2"
        title="Trained on your business"
        rows={[
          { label: "Your diary", value: "connected", tone: "good", done: true },
          { label: "Services and packages", value: "done", tone: "good", done: true },
          { label: "Usual questions", value: "done", tone: "good", done: true },
          { label: "WhatsApp, web, Instagram", value: "connected", tone: "good", done: true },
          { label: "Handover to your team", value: "testing", done: false },
        ]}
        footer="Sample build checklist."
      />
    ),
  },
  {
    id: "run",
    clock: "21:42",
    content: (
      <Step
        n="03 · Run"
        title="It replies, books and reports. Day or night."
        body="Every enquiry gets a reply within 5 minutes, usually seconds. You get the bookings, and a short monthly report in plain words and rand."
        meta="Replies within 5 minutes · you own all of it"
      />
    ),
    screen: (
      <ChatView
        business={{ name: "Your business", initials: "YB" }}
        beats={[
          { kind: "in", time: "21:42", text: "Hi, are you open on Saturday? I'd like to come in." },
          { kind: "out", time: "21:42", meta: "Replied in 3 sec", text: "We are, 08:00 to 13:00. I have 09:30 or 11:00 free. Which suits you?" },
          { kind: "in", time: "21:43", text: "11:00 please" },
          { kind: "card", time: "21:43", title: "Booked, Sat 11:00", lines: ["In your diary"] },
        ]}
      />
    ),
  },
];

export function HowItWorksStory() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="how-title" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-wide">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">How it works</p>
            <h2 id="how-title" className="h2 mt-5">
              Audit. Build. <span className="italic-accent">Run.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            No published price list, because no two businesses are the same.{" "}
            <span className="text-[color:var(--color-ink)]">Fixed quote after your free pre-audit.</span>
          </p>
        </div>

        <div className="mt-10 lg:mt-4">
          <StickyStory steps={STEPS} side="left" caption="Sample screens" />
        </div>

        <div className="mt-6 flex justify-start lg:justify-end">
          <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-12 justify-center">
            Start with the free pre-audit
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
