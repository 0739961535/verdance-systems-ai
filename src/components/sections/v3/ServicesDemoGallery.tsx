"use client";

/**
 * ServicesDemoGallery - live demo cards for every capability.
 *
 * Caller: src/app/services/page.tsx
 */

import { Reveal } from "@/components/primitives/Reveal";
import { DemoFrame } from "@/components/demos/DemoFrame";
import { WhatsAppDemo } from "@/components/demos/WhatsAppDemo";
import { CalendarDemo } from "@/components/demos/CalendarDemo";
import { VoiceAgentDemo } from "@/components/demos/VoiceAgentDemo";
import { MissedCallTextbackDemo } from "@/components/demos/MissedCallTextbackDemo";
import { LeadReactivationDemo } from "@/components/demos/LeadReactivationDemo";
import { ReviewEngineDemo } from "@/components/demos/ReviewEngineDemo";
import { AgentDashboardDemo } from "@/components/demos/AgentDashboardDemo";
import { WebsiteWidgetDemo } from "@/components/demos/WebsiteWidgetDemo";

type Card = {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  el: React.ReactNode;
  span?: "wide" | "narrow";
};

const CARDS: Card[] = [
  {
    id: "website-widget",
    title: "Website Widget",
    subtitle: "Embedded chat",
    blurb: "Intelligent chat on your site, qualifying and booking in real time.",
    el: <WebsiteWidgetDemo />,
    span: "wide",
  },
  {
    id: "voice-agent",
    title: "Voice Receptionist",
    subtitle: "Live calls",
    blurb: "Answers every call 24/7. Natural voice, books in under 90 seconds.",
    el: <VoiceAgentDemo />,
    span: "wide",
  },
  {
    id: "smart-scheduler",
    title: "Smart Scheduler",
    subtitle: "Auto-booking week view",
    blurb: "Books straight into your Google Calendar - no human input.",
    el: <CalendarDemo />,
    span: "wide",
  },
  {
    id: "missed-call",
    title: "Missed-Call Text-Back",
    subtitle: "Instant recovery",
    blurb: "Recaptures missed calls with a friendly SMS in 5 seconds.",
    el: <MissedCallTextbackDemo />,
    span: "wide",
  },
  {
    id: "reactivation",
    title: "Lead Reactivation",
    subtitle: "Waking up dormant leads",
    blurb: "Re-engages old, gone-quiet leads with a friendly message.",
    el: <LeadReactivationDemo />,
    span: "wide",
  },
  {
    id: "reviews",
    title: "Reputation & Reviews Engine",
    subtitle: "5-star pipeline",
    blurb: "Auto-invites for Google reviews; flags negative feedback privately.",
    el: <ReviewEngineDemo />,
    span: "narrow",
  },
  {
    id: "dashboard",
    title: "Agent Dashboard",
    subtitle: "Live operations",
    blurb: "Every conversation, booking, and reactivation - in one view.",
    el: <AgentDashboardDemo />,
    span: "narrow",
  },
  {
    id: "post-call",
    title: "Post-Call Messenger",
    subtitle: "WhatsApp follow-ups",
    blurb: "Smart follow-ups via SMS and WhatsApp that nurture into bookings.",
    el: (
      <div className="p-7 md:p-8">
        <WhatsAppDemo businessName="Verdance · Post-call" />
      </div>
    ),
    span: "narrow",
  },
];

export function ServicesDemoGallery() {
  return (
    <section id="capabilities-live" className="relative section-pad bg-canvas-2 overflow-hidden">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">Capabilities · Live</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 headline-section max-w-[20ch]">
            See every agent <span className="italic-accent">actually work.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-[color:var(--color-ink-soft)]">
            Not screenshots. Not mockups. Live, looping demonstrations of every
            agent in the Verdance suite.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-6 auto-rows-min">
          {CARDS.map((c, i) => (
            <Reveal
              key={c.id}
              delay={(i % 4) * 0.04}
              className={c.span === "narrow" ? "md:col-span-3" : "md:col-span-6 lg:col-span-3"}
            >
              <article id={c.id} className="flex flex-col gap-3 h-full">
                <DemoFrame>{c.el}</DemoFrame>
                <div className="pl-1 pt-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                    {c.subtitle}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-medium leading-tight text-[color:var(--color-ink)]">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] text-[color:var(--color-ink-soft)] leading-relaxed">
                    {c.blurb}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
