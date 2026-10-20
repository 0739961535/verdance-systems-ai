import { Bot, CalendarCheck, Check, Clock, Inbox, Mail, Send, Sparkles, UserRound } from "lucide-react";
import { ASK_BUSINESS, ASK_ITEMS } from "@/components/ask/askData";
import { HOME_CONVERSATION } from "@/data/conversations";

/**
 * Drawn, static screens for the portfolio tiles. Server components, no JS.
 * Every name, order and message here is made up, and each screen says so.
 * Client screens never show the client's name, logo, staff or real numbers.
 */

/** Luxury home studio website: an anonymised still of the live site (logo, name and about section left out). */
export function StudioShot() {
  return (
    <>
      <div className="pf-chrome" aria-hidden>
        <i />
        <i />
        <i />
        <b />
      </div>
      <picture className="pf-shot">
        <source type="image/avif" srcSet="/work/portfolio/studio-768.avif 768w, /work/portfolio/studio-1280.avif 1280w" sizes="(min-width: 1024px) 60vw, (min-width: 768px) 92vw, 84vw" />
        <img
          src="/work/portfolio/studio-768.webp"
          srcSet="/work/portfolio/studio-768.webp 768w, /work/portfolio/studio-1280.webp 1280w"
          sizes="(min-width: 1024px) 60vw, (min-width: 768px) 92vw, 84vw"
          width={1280}
          height={800}
          loading="lazy"
          decoding="async"
          alt="A project page from a luxury home design and build studio's website, built by Verdance, with the name hidden"
        />
      </picture>
    </>
  );
}

/** E-commerce order assistant: an after-hours order question answered. */
export function EcomChat() {
  const steps = ["Packed", "Shipped", "On the way", "Delivered"];
  return (
    <div className="pf-stage">
      <div className="pf-mock" role="img" aria-label="Illustration: a customer asks where their order is at 22:14 and gets the courier status and delivery day straight away">
        <div className="pf-mhead">
          <span className="pf-av" aria-hidden>
            <Bot size={13} />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold leading-tight">Order help</span>
            <span className="pf-muted block text-[11px] leading-tight">WhatsApp, after hours</span>
          </span>
          <span className="pf-muted pf-num ml-auto text-[11px]">22:14</span>
        </div>
        <div className="pf-mbody">
          <span className="pf-b pf-b-in">Hi, has my order shipped yet?</span>
          <span className="pf-b pf-b-out">Yes, it left on Friday. The courier has it and it is due on Tuesday.</span>
          <div className="pf-inner self-end p-2.5" style={{ width: "86%" }}>
            <span className="pf-num block font-semibold">Order #10482</span>
            <span className="mt-2 grid grid-cols-4 gap-1">
              {steps.map((s, i) => (
                <span key={s} className="min-w-0">
                  <span className="block h-[3px] rounded-full" style={{ background: i < 2 ? "#4D7CFF" : i === 2 ? "#8FB0FF" : "rgba(255,255,255,0.1)" }} />
                  <span className={`mt-1 block truncate text-[10px] ${i <= 2 ? "text-[#C9D6FF]" : "pf-muted"}`}>{s}</span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
      <span className="pf-note">Illustration, details changed</span>
    </div>
  );
}

/** Ashford: our own command centre, drawn with sample rows only. */
export function AshfordScreen() {
  const rows = [
    { icon: Inbox, who: "Inbox agent", what: "Drafted a reply to a new enquiry", act: "Approve", tone: "#8FB0FF" },
    { icon: Clock, who: "Follow-up agent", what: "Two quotes to chase today", act: "Review", tone: "#C9D6FF" },
    { icon: Sparkles, who: "Report agent", what: "Weekly report is ready", act: "Open", tone: "#7FD1A8" },
  ];
  return (
    <div className="pf-stage">
      <div className="pf-mock" role="img" aria-label="Sample screen of our command centre: three AI agents report what they did and wait for approval">
        <div className="pf-mhead">
          <span className="flex gap-1" aria-hidden>
            <span className="pf-dot bg-[#4D7CFF]" />
            <span className="pf-dot bg-white/15" />
            <span className="pf-dot bg-white/15" />
          </span>
          <span className="ml-1 font-semibold">Command centre</span>
          <span className="pf-chip ml-auto">Today</span>
        </div>
        <div className="pf-mbody">
          <div className="grid grid-cols-3 gap-1.5">
            {["Replies drafted", "Follow-ups due", "Waiting for you"].map((t) => (
              <div key={t} className="pf-inner px-2 py-2">
                <span className="pf-muted block truncate text-[10px]">{t}</span>
                <span className="pf-skel mt-1.5 w-2/3" aria-hidden />
              </div>
            ))}
          </div>
          {rows.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.who} className="pf-inner flex items-center gap-2 px-2 py-1.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[7px] bg-[#13254F]" style={{ color: r.tone }} aria-hidden>
                  <Icon size={12} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-semibold">{r.who}</span>
                  <span className="pf-muted block truncate text-[10.5px]">{r.what}</span>
                </span>
                <span className="shrink-0 text-[10.5px] font-semibold text-[#8FB0FF]">{r.act}</span>
              </div>
            );
          })}
        </div>
      </div>
      <span className="pf-note">Sample screen, no client data</span>
    </div>
  );
}

/** Ask your business: the first sample question from the Northvale Active demo. */
export function AskScreen() {
  const item = ASK_ITEMS[0];
  const bars = item.visual.kind === "bars" ? item.visual.items : [];
  const max = Math.max(1, ...bars.map((b) => b.value));
  return (
    <div className="pf-stage">
      <div className="pf-mock" role="img" aria-label={`Sample: the owner of ${ASK_BUSINESS}, a made-up brand, asks how the month went and gets the answer with a chart from the store`}>
        <div className="pf-mhead">
          <span className="pf-av" aria-hidden>NA</span>
          <span className="font-semibold">{ASK_BUSINESS}</span>
          <span className="pf-muted ml-auto text-[11px]">Ask</span>
        </div>
        <div className="pf-mbody">
          <span className="pf-b pf-b-out">{item.q}</span>
          <span className="pf-b pf-b-in pf-clamp2">{item.a}</span>
          <div className="pf-inner flex h-[64px] items-end gap-2 px-3 pb-2 pt-3" aria-hidden>
            {bars.map((b) => (
              <span key={b.label} className="flex flex-1 flex-col items-center gap-1">
                <span className="block w-full rounded-t-[4px]" style={{ height: `${Math.round((b.value / max) * 34)}px`, background: b.now ? "#4D7CFF" : "rgba(143,176,255,0.3)" }} />
                <span className="pf-muted text-[10px]">{b.label}</span>
              </span>
            ))}
          </div>
          <span className="pf-chip self-start">From {item.sources[0]}</span>
        </div>
      </div>
      <span className="pf-note">Made-up business and numbers</span>
    </div>
  );
}

/** Oakridge Venue: the late-night wedding enquiry from the Watch it work demo. */
export function VenueChat() {
  const c = HOME_CONVERSATION;
  const first = c.beats.find((b) => b.kind === "in");
  const reply = c.beats.find((b) => b.kind === "out");
  const card = c.beats.find((b) => b.kind === "card");
  return (
    <div className="pf-stage">
      <div className="pf-mock" role="img" aria-label={c.summary}>
        <div className="pf-mhead">
          <span className="pf-av" aria-hidden>{c.business.initials}</span>
          <span className="font-semibold">{c.business.name}</span>
          <span className="pf-muted pf-num ml-auto text-[11px]">{c.clock}</span>
        </div>
        <div className="pf-mbody">
          {first && "text" in first ? <span className="pf-b pf-b-in">{first.text}</span> : null}
          {reply && "text" in reply ? <span className="pf-b pf-b-out pf-clamp2">{reply.text}</span> : null}
          {card && "title" in card ? (
            <span className="pf-inner flex items-center gap-2 self-end px-2.5 py-2" style={{ width: "86%" }}>
              <CalendarCheck size={14} className="shrink-0 text-[#7FD1A8]" aria-hidden />
              <span className="min-w-0">
                <span className="block truncate font-semibold">{card.title}</span>
                <span className="pf-muted block truncate text-[10.5px]">Added to the venue diary</span>
              </span>
            </span>
          ) : null}
        </div>
      </div>
      <span className="pf-note">Sample conversation</span>
    </div>
  );
}

/** Safari lodge: an overnight enquiry answered, followed up and handed over. */
export function LodgeFlow() {
  const steps = [
    { icon: Check, t: "Dates and rooms checked" },
    { icon: Send, t: "Reply sent with two suite options" },
    { icon: Clock, t: "Follow-up set for Thursday" },
    { icon: UserRound, t: "Handed to reservations" },
  ];
  return (
    <div className="pf-stage">
      <div className="pf-mock" role="img" aria-label="Concept: a family's email enquiry at 02:10 is answered, followed up and handed to the reservations team">
        <div className="pf-mhead">
          <span className="pf-av" style={{ background: "#5A4520", color: "#F3E3C2" }} aria-hidden>
            <Mail size={12} />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold leading-tight">New enquiry</span>
            <span className="pf-muted block text-[11px] leading-tight">Email, overseas</span>
          </span>
          <span className="pf-muted pf-num ml-auto text-[11px]">02:10</span>
        </div>
        <div className="pf-mbody">
          <span className="pf-b pf-b-in">Family of four, 4 nights in July. Do you have a family suite?</span>
          <ol className="grid gap-1">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.t} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-[#2A2414] text-[#E6C88E]" aria-hidden>
                    <Icon size={11} />
                  </span>
                  <span className="truncate text-[11px]">{s.t}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <span className="pf-note">Concept, no real lodge</span>
    </div>
  );
}
