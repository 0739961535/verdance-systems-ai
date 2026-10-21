import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { AI_TEAM_PATH } from "@/data/aiTeam";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY } from "@/data/site";

/**
 * /services hero: the Operations Team as the main attraction. A dark,
 * premium block with the headline, one line, both CTAs and a sample
 * command centre showing the five agents at work.
 *
 * Truth rule: every number and task in the panel is sample data and is
 * labelled "Sample" on screen. No prices, no client names.
 */

const AGENTS = [
  { name: "Answers", job: "Replies to every enquiry", task: "Replied to a WhatsApp about delivery", n: "38" },
  { name: "Follow-ups", job: "Chases quotes and quiet leads", task: "Day 3 check-in on a kitchen quote", n: "14" },
  { name: "Admin", job: "Bookings, records, invoices", task: "Filed a booking in the diary", n: "22" },
  { name: "Reports", job: "Morning brief, weekly report", task: "Built this morning's brief", n: "3" },
  { name: "Research", job: "Looks things up for you", task: "Found three past customers to rebook", n: "6" },
] as const;

const BRIEF = [
  { n: "12", t: "answered overnight" },
  { n: "3", t: "follow-ups due today" },
  { n: "2", t: "waiting for you" },
] as const;

const CSS = `
.sof { position: relative; overflow: hidden; background: #060B1A; color: #F2F5FC; }
.sof::before { content: ""; position: absolute; inset: -20% -10% auto auto; width: 900px; height: 900px; border-radius: 50%; pointer-events: none;
  background: radial-gradient(closest-side, rgba(77, 124, 255, 0.22), rgba(37, 84, 212, 0.08) 55%, transparent); }
.sof::after { content: ""; position: absolute; inset: auto 0 0 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(143, 176, 255, 0.35), transparent); }
.sof-in { position: relative; z-index: 1; display: grid; gap: 48px; padding-top: 128px; padding-bottom: 80px; }
@media (min-width: 1024px) { .sof-in { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); align-items: center; gap: 64px; padding-top: 168px; padding-bottom: 128px; } }
.sof-h1 { font-size: clamp(2.75rem, 3.6vw + 1.3rem, 5rem); line-height: 1; letter-spacing: -0.04em; font-weight: 600; max-width: 15ch; }
.sof-line { margin-top: 24px; font-size: clamp(1.125rem, 0.4vw + 1rem, 1.3rem); line-height: 1.55; color: rgba(234, 240, 255, 0.78); max-width: 40ch; }
.sof-ctas { margin-top: 32px; display: flex; flex-wrap: wrap; gap: 12px; }
.sof-ctas .btn { min-height: 52px; padding-inline: 26px; font-size: 1.02rem; justify-content: center; }
@media (max-width: 479px) { .sof-ctas .btn { width: 100%; } }
.sof-ticks { margin-top: 28px; display: grid; gap: 10px; font-size: 0.95rem; color: rgba(234, 240, 255, 0.7); }
.sof-ticks li { display: flex; gap: 10px; align-items: flex-start; }
.sof-ticks svg { flex: none; margin-top: 3px; color: #8FB0FF; }

/* Command centre panel */
.sof-panel { position: relative; border-radius: 22px; background: linear-gradient(180deg, #0E1A3A, #0A1226 60%); border: 1px solid rgba(143, 176, 255, 0.16);
  box-shadow: 0 40px 120px -40px rgba(37, 84, 212, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.06); padding: 14px; min-width: 0; }
@media (min-width: 768px) { .sof-panel { padding: 20px; } }
.sof-bar { display: flex; align-items: center; gap: 10px; padding: 2px 4px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); }
.sof-dots { display: flex; gap: 6px; }
.sof-dots i { width: 9px; height: 9px; border-radius: 50%; background: rgba(255, 255, 255, 0.14); }
.sof-title { font-size: 0.85rem; font-weight: 600; color: #EAF0FF; letter-spacing: -0.01em; }
.sof-tag { margin-left: auto; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #8FB0FF; border: 1px solid rgba(143, 176, 255, 0.35); border-radius: 999px; padding: 3px 9px; }
.sof-live { display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; color: rgba(234, 240, 255, 0.6); }
.sof-live b { width: 7px; height: 7px; border-radius: 50%; background: #5BD69A; box-shadow: 0 0 0 0 rgba(91, 214, 154, 0.6); animation: sof-pulse 2.4s ease-out infinite; }
@keyframes sof-pulse { 0% { box-shadow: 0 0 0 0 rgba(91, 214, 154, 0.55); } 70%, 100% { box-shadow: 0 0 0 8px rgba(91, 214, 154, 0); } }
.sof-brief { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 14px; }
.sof-brief div { border-radius: 12px; background: rgba(255, 255, 255, 0.035); border: 1px solid rgba(255, 255, 255, 0.06); padding: 10px 10px 12px; }
.sof-brief strong { display: block; font-family: var(--font-display); font-size: 1.6rem; line-height: 1; letter-spacing: -0.03em; color: #F2F5FC; }
.sof-brief span { display: block; margin-top: 6px; font-size: 0.75rem; line-height: 1.3; color: rgba(234, 240, 255, 0.62); }
@media (min-width: 768px) { .sof-brief strong { font-size: 2rem; } .sof-brief span { font-size: 0.8rem; } }
.sof-grid { display: grid; gap: 10px; margin-top: 12px; }
@media (min-width: 768px) { .sof-grid { grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); } }
.sof-agents { border-radius: 14px; background: rgba(6, 11, 26, 0.55); border: 1px solid rgba(255, 255, 255, 0.06); padding: 6px; }
.sof-agents h3, .sof-appr h3 { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(234, 240, 255, 0.5); padding: 8px 8px 6px; }
.sof-agent { display: grid; grid-template-columns: 30px minmax(0, 1fr) auto; gap: 10px; align-items: center; padding: 9px 8px; border-radius: 10px; min-height: 56px; }
.sof-agent + .sof-agent { border-top: 1px solid rgba(255, 255, 255, 0.05); }
.sof-av { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; font-size: 0.8rem; font-weight: 700; color: #F2F5FC;
  background: linear-gradient(135deg, #4D7CFF, #2554D4); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25); }
.sof-name { display: block;  font-size: 0.9rem; font-weight: 600; color: #F2F5FC; line-height: 1.2; }
.sof-name small { font-weight: 400; color: rgba(234, 240, 255, 0.5); font-size: 0.78rem; margin-left: 6px; }
.sof-agent .sof-task { display: block; margin-top: 3px; font-size: 0.8rem; color: rgba(234, 240, 255, 0.66); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sof-n { font-family: var(--font-display); font-size: 1.05rem; color: #8FB0FF; letter-spacing: -0.02em; }
@media (max-width: 479px) { .sof-name small { display: none; } }
.sof-appr { border-radius: 14px; background: rgba(6, 11, 26, 0.55); border: 1px solid rgba(255, 255, 255, 0.06); padding: 6px; display: flex; flex-direction: column; }
.sof-card { margin: 4px 6px 6px; border-radius: 12px; background: #13203F; border: 1px solid rgba(143, 176, 255, 0.14); padding: 12px; }
.sof-card .sof-app { font-size: 0.72rem; color: rgba(234, 240, 255, 0.55); }
.sof-card .sof-ct { margin-top: 2px; font-size: 0.88rem; font-weight: 600; color: #F2F5FC; }
.sof-card .sof-draft { margin-top: 8px; font-size: 0.82rem; line-height: 1.45; color: rgba(234, 240, 255, 0.78); }
.sof-btns { margin-top: 10px; display: flex; gap: 6px; }
.sof-btns span { flex: 1; text-align: center; font-size: 0.75rem; font-weight: 600; border-radius: 8px; padding: 7px 0; }
.sof-btns span:first-child { background: #4D7CFF; color: #fff; }
.sof-btns span:last-child { background: rgba(255, 255, 255, 0.06); color: rgba(234, 240, 255, 0.8); }
.sof-note { margin-top: 12px; text-align: right; }
.sof-panel-wrap { min-width: 0; }
@media (prefers-reduced-motion: reduce) { .sof-live b { animation: none; } }
`;

export function ServicesOpsFeature() {
  return (
    <section className="band-night sof" aria-labelledby="sv-title" data-cta-location="services-hero">
      <style>{CSS}</style>
      <div className="container-wide sof-in">
        <div>
          <p className="eyebrow">Services: the Operations Team</p>
          <h1 id="sv-title" className="sof-h1 mt-4 font-display">
            An Operations Team for <span className="italic-accent">your business.</span>
          </h1>
          <p className="sof-line">
            Five AI agents that answer, follow up, do the admin, report and research, built around how your business already works.
          </p>
          <div className="sof-ctas">
            <a href={GENERIC_BOOK_URL} className="btn btn-accent">
              {CTA_PRIMARY}
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <Link href={AI_TEAM_PATH} className="btn btn-ghost">
              See the Operations Team
              <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
          <ul className="sof-ticks">
            <li>
              <Check size={16} aria-hidden />
              You choose what goes out on its own. Anything important waits for you.
            </li>
            <li>
              <Check size={16} aria-hidden />
              Connected to the tools you already use, set up in your name.
            </li>
          </ul>
        </div>

        <div className="sof-panel-wrap">
          <div className="sof-panel" role="img" aria-label="Sample command centre: five agents, Answers, Follow-ups, Admin, Reports and Research, each showing its latest task, with a morning brief and a reply waiting for approval.">
            <div className="sof-bar" aria-hidden>
              <span className="sof-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="sof-title">Command centre</span>
              <span className="sof-live">
                <b />
                Working
              </span>
              <span className="sof-tag">Sample</span>
            </div>
            <div className="sof-brief" aria-hidden>
              {BRIEF.map((b) => (
                <div key={b.t}>
                  <strong>{b.n}</strong>
                  <span>{b.t}</span>
                </div>
              ))}
            </div>
            <div className="sof-grid" aria-hidden>
              <div className="sof-agents">
                <h3>Your five agents</h3>
                {AGENTS.map((a) => (
                  <div key={a.name} className="sof-agent">
                    <span className="sof-av">{a.name[0]}</span>
                    <span className="min-w-0">
                      <span className="sof-name">
                        {a.name}
                        <small>{a.job}</small>
                      </span>
                      <span className="sof-task">{a.task}</span>
                    </span>
                    <span className="sof-n">{a.n}</span>
                  </div>
                ))}
              </div>
              <div className="sof-appr">
                <h3>Waiting for you</h3>
                <div className="sof-card">
                  <p className="sof-app">WhatsApp</p>
                  <p className="sof-ct">New wedding enquiry</p>
                  <p className="sof-draft">The 14th is open. Shall I hold it while you come to see the venue?</p>
                  <div className="sof-btns">
                    <span>Approve</span>
                    <span>Edit</span>
                  </div>
                </div>
                <div className="sof-card">
                  <p className="sof-app">Email</p>
                  <p className="sof-ct">Supplier price change</p>
                  <p className="sof-draft">Thanks for letting us know. Can we keep last year&apos;s rate until June?</p>
                </div>
              </div>
            </div>
          </div>
          <p className="museum sof-note">Sample command centre. The numbers and tasks are made up.</p>
        </div>
      </div>
    </section>
  );
}
