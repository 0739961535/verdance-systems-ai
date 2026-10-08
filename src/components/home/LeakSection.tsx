import type { ReactNode } from "react";
import { StickyStory, type StoryStep } from "@/components/device/StickyStory";
import { CallView, ChatView } from "@/components/device/screens";
import { LeakCalculator } from "./LeakCalculator";

/**
 * LeakSection - "19:00. The phone rings. Nobody answers."
 * The same moment twice, on the customer's phone: once without a system
 * (they call the next business), once with one (a message in seconds, then
 * a booking). Ends on the visitor's own rand figure.
 */

const BIZ = { name: "Rietvlei Plumbing", initials: "RP" };

function Step({ time, title, body, tone = "plain" }: { time: string; title: ReactNode; body: string; tone?: "plain" | "after" }) {
  return (
    <div className="max-w-[30rem]">
      <p
        className="font-mono text-[0.8rem] tracking-[0.14em] tabular"
        style={{ color: tone === "after" ? "var(--accent)" : "var(--ink-muted)" }}
      >
        {time}
      </p>
      <h3
        className="mt-3 font-display text-[color:var(--color-ink)]"
        style={{ fontSize: "clamp(1.75rem, 2vw + 1.1rem, 2.75rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
      >
        {title}
      </h3>
      <p className="mt-4 text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{body}</p>
    </div>
  );
}

const STEPS: StoryStep[] = [
  {
    id: "ring",
    clock: "19:00",
    content: (
      <Step
        time="19:00"
        title="Someone needs you, right now."
        body="You are with a customer, on a job, or at home with your family. Nobody can pick up every call."
      />
    ),
    screen: <CallView name={BIZ.name} sub="calling…" state="ringing" />,
  },
  {
    id: "rings-out",
    clock: "19:01",
    content: (
      <Step
        time="19:01"
        title="It rings out."
        body="Most people do not leave a voicemail. They hang up and go back to the search results."
      />
    ),
    screen: <CallView name={BIZ.name} sub="No answer" state="noanswer" />,
  },
  {
    id: "elsewhere",
    clock: "19:03",
    content: (
      <Step
        time="19:03"
        title="They call the next business on the list."
        body="Whoever answers first usually gets the work. When you call back in the morning, they have already booked."
      />
    ),
    screen: <CallView name="The next business" sub="00:48" state="connected" />,
  },
  {
    id: "with",
    clock: "19:00",
    content: (
      <Step
        tone="after"
        time="19:00 · with Verdance"
        title={
          <>
            Same call. This time a message lands <span className="italic-accent">in seconds.</span>
          </>
        }
        body="Your phone still rings out. But the caller gets a WhatsApp from your business straight away, asking what they need."
      />
    ),
    screen: (
      <ChatView
        business={BIZ}
        beats={[
          {
            kind: "in",
            time: "19:00",
            text: "Hi, it's Rietvlei Plumbing. Sorry we missed your call, we're on a job. What do you need, and when suits you?",
          },
        ]}
      />
    ),
  },
  {
    id: "booked",
    clock: "19:02",
    content: (
      <Step
        tone="after"
        time="19:02"
        title="Booked, before they think of calling anyone else."
        body="It answers their questions, offers times from your diary and books the job. You see it when you next look at your phone."
      />
    ),
    screen: (
      <ChatView
        business={BIZ}
        beats={[
          {
            kind: "in",
            time: "19:00",
            text: "Hi, it's Rietvlei Plumbing. Sorry we missed your call, we're on a job. What do you need, and when suits you?",
          },
          { kind: "out", time: "19:01", text: "Burst pipe under the kitchen sink. Tomorrow morning?" },
          { kind: "in", time: "19:01", text: "Tomorrow 08:00 is open. Shall I book it?" },
          { kind: "out", time: "19:02", text: "Yes please" },
          { kind: "card", dir: "in", time: "19:02", title: "Booked, Tue 08:00", lines: ["Reminder the evening before"] },
        ]}
      />
    ),
  },
];

export function LeakSection() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="leak-title" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="eyebrow">The leak</p>
          <h2 id="leak-title" className="h2 mt-5">
            19:00. The phone rings. <span className="italic-accent">Nobody answers.</span>
          </h2>
        </div>

        <div className="mt-10 lg:mt-4">
          <StickyStory steps={STEPS} caption="Sample, on the customer's phone" />
        </div>

        <div className="mt-16 md:mt-24" id="calculator" style={{ scrollMarginTop: "6rem" }}>
          <h3
            className="font-display text-[color:var(--color-ink)] max-w-2xl"
            style={{ fontSize: "clamp(1.75rem, 2vw + 1.1rem, 2.75rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
          >
            What the silence costs <span className="italic-accent">you.</span>
          </h3>
          <div className="mt-8">
            <LeakCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}
