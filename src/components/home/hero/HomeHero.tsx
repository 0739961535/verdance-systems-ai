import { ArrowUpRight } from "lucide-react";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY, SITE } from "@/data/site";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { SlowChatDemo, type Demo } from "@/components/demos/SlowChatDemo";

/**
 * The home hero: calm and still, in the site's own language (navy, one blue
 * glow, the display type), about one screen tall. Words on the left, one
 * live product card on the right (below on phones): an enquiry arriving
 * after hours and answered within seconds, told slowly.
 * No video and no images: the text is the first paint.
 * (The scroll film is kept behind HERO_FILM=1 in app/page.tsx.)
 */

const DEMO: Demo = {
  business: "Oakridge Venue",
  channel: "WhatsApp · 21:41 · after hours",
  messages: [
    { from: "them", text: "Hi, is Saturday 13 March free for about 120 guests?", time: "21:41" },
    { from: "us", text: "Hi Lerato, it is. The Garden or the Barn both seat 120. Would you like to see them on Thursday?", time: "21:41" },
    { from: "them", text: "Thursday at 10 please", time: "21:43" },
    { from: "card", title: "Viewing booked, Thu 10:00", lines: ["Added to the venue diary", "Reminder the day before"] },
  ],
};

const CSS = `
.hh { position: relative; isolation: isolate; overflow: hidden; background: #060B1A; color: #F2F5FC; }
.hh::before { content: ""; position: absolute; inset: -20% -10% auto auto; width: min(90vw, 1100px); aspect-ratio: 1; z-index: -1; pointer-events: none;
  background: radial-gradient(closest-side, rgba(77,124,255,0.28), rgba(77,124,255,0.08) 55%, rgba(77,124,255,0) 100%); }
.hh::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 40%; z-index: -1; pointer-events: none;
  background: linear-gradient(rgba(6,11,26,0), #060B1A); }
.hh-grid { display: grid; gap: 48px; align-items: center; min-height: min(100svh, 980px); padding-top: 120px; padding-bottom: 72px; }
@media (min-width: 1024px) { .hh-grid { grid-template-columns: 1.05fr 0.95fr; gap: 72px; padding-top: 136px; padding-bottom: 96px; } }
.hh-h1 { font-family: var(--font-display); font-weight: 600; font-size: clamp(3rem, 4.6vw + 1rem, 6rem); line-height: 0.98; letter-spacing: -0.045em; max-width: 11ch; text-wrap: balance; margin: 0; }
.hh-h1 .italic-accent { display: block; color: #8FB0FF; }
.hh-sub { margin: 24px 0 0; font-family: var(--font-display); font-size: clamp(1.25rem, 0.8vw + 1rem, 1.6rem); line-height: 1.3; letter-spacing: -0.02em; color: #F2F5FC; max-width: 24ch; }
.hh-line { margin: 16px 0 0; font-size: 1.0625rem; line-height: 1.6; color: rgba(234,240,255,0.76); max-width: 38ch; }
.hh-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 32px; }
.hh-actions .btn { flex: 1 1 auto; }
@media (min-width: 640px) { .hh-actions .btn { flex: 0 0 auto; } }
.hh-wa { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 52px; padding: 0 22px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.18); color: #F2F5FC; font-weight: 500; flex: 1 1 auto; }
@media (min-width: 640px) { .hh-wa { flex: 0 0 auto; } }
.hh-wa:hover { border-color: rgba(255,255,255,0.36); }
.hh-card { position: relative; width: 100%; max-width: 30rem; justify-self: center; }
.hh-card::before { content: ""; position: absolute; inset: -12%; z-index: -1; border-radius: 40px; pointer-events: none;
  background: radial-gradient(closest-side, rgba(77,124,255,0.22), rgba(77,124,255,0)); }
.hh-badge { display: inline-flex; align-items: center; gap: 8px; margin-top: 14px; font-size: 0.8125rem; color: rgba(234,240,255,0.7); }
.hh-dot { width: 8px; height: 8px; border-radius: 99px; background: #7FD1A8; box-shadow: 0 0 0 4px rgba(127,209,168,0.15); }
`;

export function HomeHero() {
  return (
    <section className="hh" aria-labelledby="hero-title" data-cta-location="hero">
      <style>{CSS}</style>
      <div className="container-wide hh-grid">
        <div>
          <h1 id="hero-title" className="hh-h1">
            We don&apos;t talk about AI. <span className="italic-accent">We ship it.</span>
          </h1>
          <p className="hh-sub">Find out what AI can really do for your business.</p>
          <p className="hh-line">
            Verdance answers your customers, follows up and does the admin. Every enquiry answered within 60 seconds.
          </p>
          <div className="hh-actions">
            <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-[52px] justify-center px-7 text-[1.02rem]">
              {CTA_PRIMARY}
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="hh-wa">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
        </div>
        <div className="hh-card">
          <SlowChatDemo demo={DEMO} />
          <p className="hh-badge">
            <span className="hh-dot" aria-hidden />
            A sample enquiry, answered after hours
          </p>
        </div>
      </div>
    </section>
  );
}
