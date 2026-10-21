import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY, SITE } from "@/data/site";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { EarthArt } from "@/components/visuals/EarthArt";

/**
 * The /how-it-works hero: a film-blue night band with a slow blue glow,
 * the headline (LCP, painted on the first frame with a transform-only
 * rise), one button, WhatsApp beside it, and a row of four facts in
 * tabular numerals. Server component, no JS.
 */

const FACTS: [string, string][] = [
  ["30 min", "first call, on video"],
  ["Free", "map of where time and money leak"],
  ["10", "working days to live"],
  ["Day 90", "review together"],
];

const STATUS: [string, string, "done" | "now" | "next"][] = [
  ["Call", "Done", "done"],
  ["Map", "Done", "done"],
  ["Plan", "Agreed", "done"],
  ["Build", "Day 6 of 10", "now"],
  ["Review", "Day 90", "next"],
];

const CSS = `
.hh { position: relative; isolation: isolate; overflow: hidden; padding: 112px 0 72px; }
@media (min-width: 1024px) { .hh { padding: 176px 0 120px; } }
.hh-glow {
  position: absolute; z-index: -1; inset: -20% -30% auto auto; width: 120vw; height: 120vw; max-width: 1100px; max-height: 1100px;
  border-radius: 999px; pointer-events: none;
  background: radial-gradient(closest-side, rgba(77, 124, 255, 0.28), rgba(77, 124, 255, 0.08) 55%, transparent 72%);
}
.hh-grid {
  position: absolute; z-index: -1; inset: 0; pointer-events: none; opacity: 0.5;
  background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse at 70% 20%, #000, transparent 70%);
          mask-image: radial-gradient(ellipse at 70% 20%, #000, transparent 70%);
}
.hh-crumbs { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-muted); }
.hh-crumbs a { display: inline-flex; align-items: center; min-height: 44px; color: var(--ink-muted); }
.hh-crumbs a:hover { color: #8FB0FF; }
.hh-h1 { margin-top: 16px; max-width: 13ch; font-family: var(--font-display); font-size: clamp(2.9rem, 5.2vw + 1rem, 6.25rem); line-height: 0.96; letter-spacing: -0.045em; color: #F2F5FC; }
.hh-lead { margin-top: 24px; }
.hh-ctas { margin-top: 40px; display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
@media (min-width: 640px) { .hh-ctas { flex-direction: row; align-items: center; } }
.hh-facts {
  margin: 56px 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--hairline-2);
}
.hh-fact { padding: 18px 12px 0 0; }
.hh-fact:nth-child(n+3) { padding-top: 20px; }
.hh-fact b { display: block; font-family: var(--font-display); font-weight: 600; font-size: 1.75rem; line-height: 1; letter-spacing: -0.03em; color: #F2F5FC; font-variant-numeric: tabular-nums; }
.hh-fact span { display: block; margin-top: 6px; font-size: 0.875rem; line-height: 1.4; color: var(--ink-muted); }
/* Desktop: a small "your build" status card beside the headline */
.hh-top { display: block; }
.hh-card { display: none; }
@media (min-width: 1024px) {
  .hh-top { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); column-gap: 64px; align-items: center; }
  .hh-card {
    display: grid; gap: 4px; padding: 18px; border-radius: 22px; color: #E9EDF7; font-variant-numeric: tabular-nums;
    background: linear-gradient(180deg, #0F1A38, #0A1226 60%); border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 40px 120px -40px rgba(77, 124, 255, 0.45);
  }
}
.hh-card-top { display: flex; align-items: center; justify-content: space-between; padding: 2px 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.07); margin-bottom: 6px; }
.hh-card-app { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #8B93A3; }
.hh-card-sample { border: 1px solid rgba(255,255,255,0.14); border-radius: 999px; padding: 2px 9px; font-size: 12px; color: rgba(255,255,255,0.62); }
.hh-st { display: grid; grid-template-columns: 28px 1fr auto; align-items: center; gap: 12px; padding: 10px 4px; }
.hh-dot { width: 28px; height: 28px; border-radius: 99px; display: grid; place-items: center; color: #fff; background: #4D7CFF; box-shadow: 0 0 14px rgba(77,124,255,0.6); }
.hh-dot svg { width: 14px; height: 14px; }
.hh-st[data-s="now"] .hh-dot { background: #13203F; box-shadow: inset 0 0 0 1.5px #8FB0FF, 0 0 0 5px rgba(77,124,255,0.16), 0 0 22px rgba(77,124,255,0.55); }
.hh-st[data-s="next"] .hh-dot { background: transparent; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18); }
.hh-st b { font-weight: 600; font-size: 15px; color: #F2F5FC; }
.hh-st[data-s="next"] b { color: rgba(242,245,252,0.55); }
.hh-st small { font-size: 13px; color: #8B93A3; }
.hh-st[data-s="now"] small { color: #A9C2FF; }
.hh-prog { grid-column: 2 / -1; height: 6px; margin-top: -2px; border-radius: 99px; background: rgba(255,255,255,0.06); overflow: hidden; }
.hh-prog i { display: block; height: 100%; width: 60%; border-radius: inherit; background: linear-gradient(90deg, #4D7CFF, #8FB0FF); box-shadow: 0 0 10px rgba(77,124,255,0.6); }
@media (min-width: 1024px) {
  .hh-facts { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 96px; }
  .hh-fact, .hh-fact:nth-child(n+3) { padding: 24px 24px 0 0; }
  .hh-fact + .hh-fact { padding-left: 24px; border-left: 1px solid var(--hairline); }
  .hh-fact b { font-size: 2.5rem; }
}
`;

export function HowHero() {
  return (
    <section
      className="hh band-night"
      aria-labelledby="how-title"
      data-cta-location="hero"
    >
      <style>{CSS}</style>
      <EarthArt />
      <div aria-hidden className="hh-glow" />
      <div aria-hidden className="hh-grid" />
      <div className="container-wide">
        <nav aria-label="Breadcrumb" className="hh-crumbs enter-fade-up">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <span style={{ color: "var(--ink-soft)" }}>How it works</span>
        </nav>
        <div className="hh-top">
          <div>
            <p className="eyebrow enter-fade-up">How it works</p>
            <h1 id="how-title" className="hh-h1 enter-rise">
              From first call to <span className="italic-accent">live</span>,
              step by step.
            </h1>
            <p className="lead hh-lead enter-rise">
              Five steps. You make two decisions: whether to go ahead, and what comes next. We do the rest.
            </p>
            <div
              className="hh-ctas enter-fade-up"
              style={{ animationDelay: "0.12s" }}
            >
              <a
                href={GENERIC_BOOK_URL}
                className="btn btn-accent min-h-[52px] justify-center px-6 text-[1.02rem]"
              >
                {CTA_PRIMARY}
                <ArrowUpRight size={17} aria-hidden />
              </a>
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flm-wa justify-center"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp us
              </a>
            </div>
          </div>
          <div
            aria-hidden
            className="hh-card enter-fade"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="hh-card-top">
              <span className="hh-card-app">Your build</span>
              <span className="hh-card-sample">Sample</span>
            </div>
            {STATUS.map(([w, t, st]) => (
              <div key={w} className="hh-st" data-s={st}>
                <span className="hh-dot">
                  {st === "done" ? <Check strokeWidth={3} /> : null}
                </span>
                <b>{w}</b>
                <small>{t}</small>
                {st === "now" ? (
                  <span className="hh-prog">
                    <i />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <ul
          className="hh-facts enter-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {FACTS.map(([b, s]) => (
            <li key={b} className="hh-fact">
              <b>{b}</b>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
