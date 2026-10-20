import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TOOL_ICONS } from "./toolIcons";

/**
 * What we build: the home page's one "what is it" section. Verdance builds
 * AI, any of it: the Operations Team as the lead product, then custom
 * builds, agents, websites, automations and "works with anything", and
 * what every build includes (the depth that justifies the price, without a
 * price). The detail lives on /services and the service pages.
 * Copy rules: no prices, no client names, no invented numbers.
 */

// Tools we connect to (integration capability, not partners). The CRM is
// white-labelled, so its brand never shows.
const TOOLS = TOOL_ICONS.map((t) => t.name).filter((n) => n !== "GoHighLevel");

const BUILDS = [
  {
    k: "Custom builds",
    t: "Your process, built as software.",
    b: "Intake, quoting, ordering, job tracking and the internal tools your team wishes it had.",
    href: "/services/custom-builds",
  },
  {
    k: "AI agents",
    t: "Agents that take a job from start to finish.",
    b: "They answer the phone and WhatsApp, qualify the lead, chase the quote and prepare the brief.",
    href: "/services/conversation-ai",
  },
  {
    k: "Websites",
    t: "Websites that bring in enquiries. Then answer them.",
    b: "Premium, fast on a phone, and connected to everything behind them from day one.",
    href: "/services/websites-build",
  },
  {
    k: "Automations",
    t: "The work between your tools, done.",
    b: "Bookings, notes, invoices and reminders move on their own. Nothing typed twice.",
    href: "/services#automations",
  },
] as const;

const INCLUDES = [
  ["Your numbers first", "A map of where time and money leak, in hours and money, before anything is built."],
  ["A plan in writing", "What we build first, and what it should bring back."],
  ["Your voice", "Trained on your own answers and the way your team already talks."],
  ["You try it first", "You try it yourself before a real customer sees it."],
] as const;

const TODAY = [
  ["21:41", "New enquiry answered", "Within 60 seconds"],
  ["09:02", "Friday's quote followed up", "In your voice"],
  ["11:15", "Booking added to the diary", "Done"],
  ["16:30", "Refund request", "Waiting for you"],
] as const;

const CSS = `
.wb { padding: 96px 0; }
@media (min-width: 1024px) { .wb { padding: 160px 0; } }
.wb-head { display: grid; gap: 24px; }
@media (min-width: 1024px) { .wb-head { grid-template-columns: minmax(0, 1fr) auto; align-items: end; } }
.wb-h2 { margin-top: 16px; max-width: 16ch; }
.wb-lead { margin-top: 24px; }
.wb-all { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; font-weight: 600; color: #DCE6FF; }
.wb-all:hover { color: #FFFFFF; }
.wb-grid { display: grid; gap: 16px; margin-top: 56px; }
@media (min-width: 768px) { .wb-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .wb-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 72px; } }
.wb-card {
  position: relative; display: flex; flex-direction: column; gap: 10px; min-width: 0; padding: 28px; border-radius: 22px;
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.09); color: #F2F5FC; text-decoration: none;
  transition: border-color 200ms, background-color 200ms;
}
a.wb-card:hover { border-color: rgba(143,176,255,0.45); background: rgba(77,124,255,0.05); }
.wb-k { font-size: 0.8125rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #8FB0FF; }
.wb-t { margin: 0; font-family: var(--font-display); font-weight: 600; font-size: 1.375rem; line-height: 1.2; letter-spacing: -0.02em; }
.wb-b { margin: 0; font-size: 1rem; line-height: 1.55; color: rgba(234,240,255,0.78); }
.wb-go { margin-top: auto; padding-top: 12px; display: inline-flex; align-items: center; gap: 6px; font-size: 0.95rem; font-weight: 600; color: #DCE6FF; }
.wb-go svg { transition: transform 200ms cubic-bezier(.16,1,.3,1); }
a.wb-card:hover .wb-go svg { transform: translate(2px, -2px); }

/* the lead product */
.wb-lead-card { gap: 0; padding: 0; overflow: hidden; background: linear-gradient(180deg, rgba(77,124,255,0.12), rgba(77,124,255,0.03)); border-color: rgba(143,176,255,0.28); }
@media (min-width: 768px) { .wb-lead-card { grid-column: 1 / -1; } }
.wb-lead-in { display: grid; gap: 28px; padding: 28px; }
@media (min-width: 1024px) { .wb-lead-in { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 56px; padding: 48px; align-items: center; } }
.wb-lead-t { margin: 10px 0 0; font-family: var(--font-display); font-weight: 600; font-size: clamp(1.9rem, 1.4rem + 1.6vw, 2.75rem); line-height: 1.08; letter-spacing: -0.03em; }
.wb-lead-b { margin: 16px 0 0; font-size: 1.0625rem; line-height: 1.6; color: rgba(234,240,255,0.82); max-width: 46ch; }
.wb-panel { min-width: 0; border-radius: 18px; background: #0A1226; border: 1px solid rgba(255,255,255,0.08); padding: 8px 18px; }
.wb-panel-h { display: flex; justify-content: space-between; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 0.875rem; color: rgba(234,240,255,0.7); }
.wb-row { display: grid; grid-template-columns: 52px minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 0.98rem; }
.wb-row:last-child { border-bottom: 0; }
.wb-row time { font-variant-numeric: tabular-nums; color: rgba(234,240,255,0.66); font-size: 0.875rem; }
.wb-row span { min-width: 0; }
.wb-chip { white-space: nowrap; border-radius: 999px; padding: 4px 10px; font-size: 0.8125rem; color: #9FE3BD; border: 1px solid rgba(61,214,140,0.35); }
.wb-chip.is-wait { color: #F2C46D; border-color: rgba(242,196,109,0.4); }
.wb-cap { margin: 10px 0 0; font-size: 0.8125rem; color: rgba(234,240,255,0.6); }
@media (max-width: 420px) { .wb-row { grid-template-columns: 44px minmax(0, 1fr); } .wb-chip { grid-column: 2; justify-self: start; } }

/* works with anything */
.wb-tools { grid-column: 1 / -1; }
@media (min-width: 1024px) { .wb-tools { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); gap: 48px; align-items: center; } }
.wb-tool-list { list-style: none; margin: 16px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
@media (min-width: 1024px) { .wb-tool-list { margin: 0; } }
@media (max-width: 639px) { .wb-tool-list li:nth-child(n+13):not(:last-child) { display: none; } }
.wb-tool-list li { padding: 7px 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.1); font-size: 0.875rem; color: rgba(234,240,255,0.8); }

/* every build includes */
.wb-inc { margin-top: 96px; }
@media (min-width: 1024px) { .wb-inc { margin-top: 128px; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 24px; } }
.wb-inc-h { margin: 0; font-family: var(--font-display); font-weight: 600; font-size: clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem); line-height: 1.1; letter-spacing: -0.03em; color: #F2F5FC; }
@media (min-width: 1024px) { .wb-inc-head { grid-column: 1 / span 4; } .wb-inc-list { grid-column: 6 / span 7; } }
.wb-inc-p { margin: 16px 0 0; font-size: 1.0625rem; line-height: 1.6; color: rgba(234,240,255,0.75); max-width: 36ch; }
.wb-inc-list { list-style: none; margin: 32px 0 0; padding: 0; display: grid; border-top: 1px solid rgba(255,255,255,0.1); }
@media (min-width: 640px) { .wb-inc-list { grid-template-columns: 1fr 1fr; column-gap: 32px; } }
@media (min-width: 1024px) { .wb-inc-list { margin-top: 0; } }
.wb-inc-list li { padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
.wb-inc-list b { display: block; font-size: 1.0625rem; font-weight: 600; color: #F2F5FC; }
.wb-inc-list p { margin: 6px 0 0; font-size: 0.98rem; line-height: 1.55; color: rgba(234,240,255,0.75); }
@media (prefers-reduced-motion: reduce) { .wb-card, .wb-go svg { transition: none; } }
`;

export function WhatWeBuild() {
  return (
    <section className="wb band-orbit" aria-labelledby="build-title">
      <style>{CSS}</style>
      <div className="container-wide">
        <div className="wb-head" data-reveal="">
          <div>
            <p className="eyebrow">What we build</p>
            <h2 id="build-title" className="h2 wb-h2">
              We build the AI. Any of it.
            </h2>
            <p className="lead wb-lead">
              From the first reply to the back office. Designed around how your business runs, built in your accounts, and looked after
              once it is live.
            </p>
          </div>
          <Link href="/services" className="wb-all">
            See all 12 services <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <div className="wb-grid">
          <Link href="/services/ai-operations-system" className="wb-card wb-lead-card" data-reveal="">
            <div className="wb-lead-in">
              <div>
                <span className="wb-k">The Operations Team</span>
                <p className="wb-lead-t">Every enquiry answered. Every follow-up done. Your team&apos;s hours back.</p>
                <p className="wb-lead-b">
                  Verdance answers every enquiry within 60 seconds, follows up, does the admin and reports back. You choose what goes out on
                  its own and what waits for you. Live in 10 working days.
                </p>
                <span className="wb-go">
                  See the Operations Team <ArrowUpRight size={16} aria-hidden />
                </span>
              </div>
              <div aria-hidden>
                <div className="wb-panel">
                  <div className="wb-panel-h">
                    <span>Today</span>
                    <span>4 jobs</span>
                  </div>
                  {TODAY.map(([t, job, s]) => (
                    <div key={job} className="wb-row">
                      <time>{t}</time>
                      <span>{job}</span>
                      <span className={`wb-chip ${s === "Waiting for you" ? "is-wait" : ""}`}>{s}</span>
                    </div>
                  ))}
                </div>
                <p className="wb-cap">Illustration. Sample jobs, not a real client.</p>
              </div>
            </div>
          </Link>

          {BUILDS.map((b, i) => (
            <Link key={b.k} href={b.href} className="wb-card" data-reveal="" style={{ ["--reveal-delay" as string]: `${Math.min(i * 0.05, 0.2)}s` }}>
              <span className="wb-k">{b.k}</span>
              <h3 className="wb-t">{b.t}</h3>
              <p className="wb-b">{b.b}</p>
              <span className="wb-go">
                More <ArrowUpRight size={15} aria-hidden />
              </span>
            </Link>
          ))}

          <div className="wb-card wb-tools" data-reveal="">
            <div>
              <span className="wb-k">Works with anything</span>
              <h3 className="wb-t" style={{ marginTop: 10 }}>
                On the tools you already use.
              </h3>
              <p className="wb-b" style={{ marginTop: 10 }}>
                If it has a way in, we connect to it. If it doesn&apos;t, we tell you before we start.
              </p>
            </div>
            <ul className="wb-tool-list" aria-label="Some of the tools we connect to">
              {TOOLS.map((t) => (
                <li key={t}>{t}</li>
              ))}
              <li>and more</li>
            </ul>
          </div>
        </div>

        <div className="wb-inc" data-reveal="">
          <div className="wb-inc-head">
            <h3 className="wb-inc-h">What every build includes.</h3>
            <p className="wb-inc-p">The same standard on a small first phase as on a full system.</p>
          </div>
          <ul className="wb-inc-list">
            {INCLUDES.map(([t, b]) => (
              <li key={t}>
                <b>{t}</b>
                <p>{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default WhatWeBuild;
