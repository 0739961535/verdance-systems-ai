import type { ReactNode } from "react";
import { StickyStory, type StoryStep } from "@/components/device/StickyStory";
import { CallView, ChatView, PanelView } from "@/components/device/screens";
import type { Beat } from "@/data/conversations";
import type { Niche } from "@/data/niches";

/**
 * NicheLeak - the same moment twice, on the customer's phone: once with
 * nobody replying (they go elsewhere), once with the system (a reply in
 * seconds, then a booking). Adapted per niche: venues an unanswered
 * enquiry, trades a missed call, clinics an after-hours message, estate
 * agents a portal lead, lodges a weekend enquiry.
 *
 * Seen from the customer's side, so the customer's own messages are "out"
 * (right) and the business's replies are "in" (left). All names invented.
 */

type Copy = { time: string; title: ReactNode; body: string; tone?: "after" };

interface LeakScript {
  heading: ReactNode;
  steps: { copy: Copy; clock: string; screen: ReactNode }[];
}

function Step({ time, title, body, tone }: Copy) {
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

const chat = (name: string, initials: string, beats: Beat[]) => (
  <ChatView business={{ name, initials }} beats={beats} />
);

function script(niche: Niche): LeakScript {
  switch (niche.icon) {
    case "trades": {
      const biz = ["Rietvlei Plumbing", "RP"] as const;
      const reply: Beat = { kind: "in", time: "10:22", text: "Hi, it's Rietvlei Plumbing. Sorry we missed your call, we're on a job. What do you need, and what's the address?" };
      return {
        heading: <>10:22. You are on a job. <span className="italic-accent">The phone rings.</span></>,
        steps: [
          { clock: "10:22", copy: { time: "10:22", title: "A customer calls. Your hands are full.", body: "You are under a sink or up a ladder. Nobody can answer every call, and nobody should have to." }, screen: <CallView name={biz[0]} sub="calling…" state="ringing" /> },
          { clock: "10:23", copy: { time: "10:23", title: "It rings out. They call the next number.", body: "Most people do not leave a voicemail. Whoever answers first usually gets the job." }, screen: <CallView name="The next company" sub="00:52" state="connected" /> },
          { clock: "10:22", copy: { time: "10:22 · with Verdance", tone: "after", title: <>Same call. A text lands <span className="italic-accent">in seconds.</span></>, body: "Your phone still rings out, but the caller gets a message from your business straight away asking what they need." }, screen: chat(biz[0], biz[1], [reply]) },
          { clock: "10:26", copy: { time: "10:26", tone: "after", title: "Quote visit booked. You never put the spanner down.", body: "It takes the details, asks for photos and books a time from your diary. You see it at your next break." }, screen: chat(biz[0], biz[1], [reply, { kind: "out", time: "10:25", text: "Geyser leaking through the ceiling. 14 Vygie Street" }, { kind: "in", time: "10:25", text: "Thanks. Can we come Wednesday 08:00 to quote? Photos help if you have them." }, { kind: "out", time: "10:26", text: "Wednesday is fine" }, { kind: "card", dir: "in", time: "10:26", title: "Quote visit, Wed 08:00", lines: ["Reminder the day before"] }]) },
        ],
      };
    }
    case "clinic": {
      const biz = ["Parkside Practice", "PP"] as const;
      const ask: Beat = { kind: "out", time: "20:04", text: "Hi, I'd like to book a consultation. Do you have anything next week?" };
      return {
        heading: <>20:04. A patient messages. <span className="italic-accent">Reception has gone home.</span></>,
        steps: [
          { clock: "20:04", copy: { time: "20:04", title: "Someone is ready to book. Tonight.", body: "Most people look for a practice in the evening, when they finally have a minute. Your front desk closed at five." }, screen: chat(biz[0], biz[1], [ask]) },
          { clock: "20:31", copy: { time: "20:31", title: "No reply. So they message another practice.", body: "The first practice to answer usually gets the consult. By morning, they have booked somewhere else." }, screen: chat("Another practice", "AP", [{ kind: "out", time: "20:30", text: "Hi, do you have a consultation next week?" }, { kind: "in", time: "20:31", text: "Yes, Tuesday 10:00 or Wednesday 14:00. Shall I book one?" }]) },
          { clock: "20:04", copy: { time: "20:04 · with Verdance", tone: "after", title: <>Same message. A reply <span className="italic-accent">in seconds.</span></>, body: "It answers in your practice's wording, offers times from your diary and never gives clinical advice." }, screen: chat(biz[0], biz[1], [ask, { kind: "in", time: "20:04", text: "Thank you for contacting the practice. We have Tuesday 09:30 or Thursday 15:00. Which suits you?" }]) },
          { clock: "20:06", copy: { time: "20:06", tone: "after", title: "Consult booked before the evening is out.", body: "The booking lands in your practice diary with a reminder. Anything clinical goes to your team in the morning." }, screen: chat(biz[0], biz[1], [ask, { kind: "in", time: "20:04", text: "Thank you for contacting the practice. We have Tuesday 09:30 or Thursday 15:00. Which suits you?" }, { kind: "out", time: "20:06", text: "Thursday 15:00 please" }, { kind: "card", dir: "in", time: "20:06", title: "Consultation, Thu 15:00", lines: ["In the practice diary"] }]) },
        ],
      };
    }
    case "estate": {
      const biz = ["Harbour Properties", "HP"] as const;
      return {
        heading: <>21:14. A buyer enquires on a portal. <span className="italic-accent">Nobody sees it until morning.</span></>,
        steps: [
          { clock: "21:14", copy: { time: "21:14", title: "A serious buyer, on your listing.", body: "Portal leads come in at night and over weekends, when your agents are with family or at show days." }, screen: <PanelView kicker="Property portal" title="Enquiry sent" rows={[{ label: "Listing", value: "3-bed, Main Rd" }, { label: "Sent", value: "21:14" }, { label: "Agent reply", value: "waiting…", tone: "bad" }]} footer="Sample. They usually enquire on three or four listings at once." /> },
          { clock: "21:20", copy: { time: "21:20", title: "Another agent answers first.", body: "They book a viewing on a similar house that evening. Your listing is now their second choice." }, screen: chat("Another agency", "AA", [{ kind: "in", time: "21:19", text: "Hi, thanks for your enquiry. It is available. Can you view Saturday at 10:00?" }, { kind: "out", time: "21:20", text: "Yes, see you then" }]) },
          { clock: "21:14", copy: { time: "21:14 · with Verdance", tone: "after", title: <>Same lead. A WhatsApp <span className="italic-accent">in seconds.</span></>, body: "It confirms the property is available and asks the two questions your agents always ask." }, screen: chat(biz[0], biz[1], [{ kind: "in", time: "21:14", text: "Hi, thanks for asking about the 3-bed on Main Road. It's available. Are you buying with a bond, and do you have a home to sell?" }]) },
          { clock: "21:16", copy: { time: "21:16", tone: "after", title: "Viewing booked in the agent's diary.", body: "The buyer is qualified and booked before anyone else has replied. Your agent gets the details in the CRM." }, screen: chat(biz[0], biz[1], [{ kind: "in", time: "21:14", text: "Hi, thanks for asking about the 3-bed on Main Road. It's available. Are you buying with a bond, and do you have a home to sell?" }, { kind: "out", time: "21:15", text: "Bond pre-approved, nothing to sell" }, { kind: "in", time: "21:15", text: "Great. Saturday 09:00 or 11:30?" }, { kind: "out", time: "21:16", text: "11:30" }, { kind: "card", dir: "in", time: "21:16", title: "Viewing, Sat 11:30", lines: ["With the listing agent"] }]) },
        ],
      };
    }
    case "lodge": {
      const biz = ["Kloofhuis Lodge", "KL"] as const;
      const ask: Beat = { kind: "out", time: "18:52", text: "Hi, looking for a 2-night offsite for 24 people in May. Rooms and a venue?" };
      return {
        heading: <>Saturday, 18:52. A group enquiry arrives. <span className="italic-accent">The office opens Monday.</span></>,
        steps: [
          { clock: "18:52", copy: { time: "Sat 18:52", title: "A booking worth a whole weekend.", body: "Group and event enquiries often come in on weekends, when the people who can answer them are off or running the floor." }, screen: chat(biz[0], biz[1], [ask]) },
          { clock: "09:05", copy: { time: "Mon 09:05", title: "By Monday, they have booked elsewhere.", body: "They sent the same enquiry to several places. The one that answered on Saturday got the site visit." }, screen: chat(biz[0], biz[1], [ask, { kind: "out", time: "Mon 09:05", text: "Thanks, we've booked another venue for this one." }]) },
          { clock: "18:52", copy: { time: "Sat 18:52 · with Verdance", tone: "after", title: <>Same enquiry. A reply <span className="italic-accent">in seconds.</span></>, body: "It checks availability across rooms and venues and offers a site visit with your events manager." }, screen: chat(biz[0], biz[1], [ask, { kind: "in", time: "18:52", text: "We can host that. May has two open weekends for 24, with the conference room and rooms on site. Shall I set up a site visit?" }]) },
          { clock: "18:55", copy: { time: "Sat 18:55", tone: "after", title: "Site visit booked before Monday.", body: "Your events manager starts the week with a booked visit and the full brief, not a cold enquiry." }, screen: chat(biz[0], biz[1], [ask, { kind: "in", time: "18:52", text: "We can host that. May has two open weekends for 24, with the conference room and rooms on site. Shall I set up a site visit?" }, { kind: "out", time: "18:55", text: "Yes please, Thursday morning?" }, { kind: "card", dir: "in", time: "18:55", title: "Site visit, Thu 11:00", lines: ["With the events manager"] }]) },
        ],
      };
    }
    case "venue":
    default: {
      const biz = ["Oakridge Venue", "OV"] as const;
      const ask: Beat = { kind: "out", time: "21:40", text: "Hi, is 14 March 2027 still open? About 110 guests." };
      return {
        heading: <>21:40. A couple enquires. <span className="italic-accent">Nobody replies.</span></>,
        steps: [
          { clock: "21:40", copy: { time: "21:40", title: "They are planning tonight, together.", body: "Couples enquire in the evening and on weekends, often with several venues at once." }, screen: chat(biz[0], biz[1], [ask]) },
          { clock: "21:46", copy: { time: "21:46", title: "Another venue replies first.", body: "The first venue to answer gets the viewing. Your reply tomorrow morning arrives after the decision." }, screen: chat("Another venue", "AV", [{ kind: "out", time: "21:41", text: "Hi, is 14 March 2027 open? About 110 guests." }, { kind: "in", time: "21:45", text: "It is. Would you like to see the venue on Saturday?" }, { kind: "out", time: "21:46", text: "Yes please" }]) },
          { clock: "21:40", copy: { time: "21:40 · with Verdance", tone: "after", title: <>Same enquiry. A reply <span className="italic-accent">in seconds.</span></>, body: "It checks the date, answers the usual questions and offers viewing times from your diary." }, screen: chat(biz[0], biz[1], [ask, { kind: "in", time: "21:40", text: "It is open. 110 guests suits the Barn and Lawn package. Would you like to see the venue? Saturday 10:00 or Sunday 14:00." }]) },
          { clock: "21:42", copy: { time: "21:42", tone: "after", title: "Viewing booked while they are still excited.", body: "It lands in your diary with a reminder, and you show the venue." }, screen: chat(biz[0], biz[1], [ask, { kind: "in", time: "21:40", text: "It is open. 110 guests suits the Barn and Lawn package. Would you like to see the venue? Saturday 10:00 or Sunday 14:00." }, { kind: "out", time: "21:42", text: "Saturday 10:00 works for us" }, { kind: "card", dir: "in", time: "21:42", title: "Viewing, Sat 10:00", lines: ["Reminder the day before"] }]) },
        ],
      };
    }
  }
}

export function NicheLeak({ niche }: { niche: Niche }) {
  const s = script(niche);
  const steps: StoryStep[] = s.steps.map((st, i) => ({
    id: `${niche.slug}-${i}`,
    clock: st.clock,
    content: <Step {...st.copy} />,
    screen: st.screen,
  }));
  return (
    <section className="section-pad bg-canvas" aria-labelledby="leak-title" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-wide">
        <div className="mx-auto max-w-[1120px]">
          <p className="eyebrow">The leak</p>
          <h2 id="leak-title" className="h2 mt-5 max-w-[22ch]">
            {s.heading}
          </h2>
        </div>
        <div className="mt-10 lg:mt-4">
          <StickyStory steps={steps} caption="Sample, on the customer's phone" />
        </div>
      </div>
    </section>
  );
}
