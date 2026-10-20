import { ArrowUpRight } from "lucide-react";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { Rocket } from "./Rocket";

/**
 * The home hero: the opening that is live on verdancesystemsai.com (the warm
 * light ground, soft blue glows, the small rocket, the centred tagline and
 * one big pill), with the same layout, type and spacing, plus:
 * - a slow, living glow: two soft blue lights drifting (transform only);
 * - the headline rising into place word by word on load (always visible);
 * - a gentle float on the rocket (its own lift-off and scroll flight stay);
 * - a calmer, richer button hover;
 * - a long gradient dissolve from this light ground into the dark Promise
 *   chapter below, so there is no hard edge.
 * Works in both themes (the ground follows the site's --bg). Reduced motion:
 * everything still, nothing hidden.
 */

const PILLARS = [
  { n: "01", title: "Answers", body: "Every WhatsApp, email and website message, answered in your voice. Day, night and weekends." },
  { n: "02", title: "Follows up", body: "Quotes chased, bookings confirmed, reminders sent. Nothing slips." },
  { n: "03", title: "Runs the admin", body: "Notes, invoices and reports done. You see every number." },
];

const LINE_1 = ["We", "don't", "talk", "about", "AI."];
const LINE_2 = ["We", "ship", "it."];

const CSS = `
.lh { position: relative; isolation: isolate; overflow: hidden; }
/* the hero is taller now (the pillars): the glow layer runs its full height and fades out */
.lh .aurora { height: auto; bottom: 0; -webkit-mask-image: linear-gradient(#000 70%, transparent); mask-image: linear-gradient(#000 70%, transparent); }
.lh-glow { position: absolute; z-index: 0; pointer-events: none; border-radius: 999px; }
.lh-glow-a { width: min(70vw, 820px); aspect-ratio: 1; left: -18%; top: -22%;
  background: radial-gradient(closest-side, rgba(var(--accent-rgb), 0.16), rgba(var(--accent-rgb), 0)); animation: lh-drift-a 26s ease-in-out infinite alternate; }
.lh-glow-b { width: min(60vw, 700px); aspect-ratio: 1; right: -16%; top: 18%;
  background: radial-gradient(closest-side, rgba(var(--accent-rgb), 0.12), rgba(var(--accent-rgb), 0)); animation: lh-drift-b 32s ease-in-out infinite alternate; }
@keyframes lh-drift-a { from { transform: translate3d(0, 0, 0) scale(1); } to { transform: translate3d(9%, 7%, 0) scale(1.12); } }
@keyframes lh-drift-b { from { transform: translate3d(0, 0, 0) scale(1.05); } to { transform: translate3d(-10%, -6%, 0) scale(0.94); } }
.lh-float { animation: lh-float 6.5s ease-in-out infinite; }
@keyframes lh-float { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -6px, 0); } }
/* the headline: each word rises into place, in turn. Visible from the
   first frame (transform only), so it is painted at once and never waits */
.lh-w { display: inline-block; }
.lh-w > span { display: inline-block; transform: translate3d(0, 0.32em, 0); animation: lh-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(0.04s + var(--i) * 0.05s); }
@keyframes lh-rise { to { transform: none; } }
.lh-fade { opacity: 0; animation: lh-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: var(--d, 0.4s); }
@keyframes lh-in { from { opacity: 0; transform: translate3d(0, 10px, 0); } to { opacity: 1; transform: none; } }
/* the button: a slow lift, a deeper glow and the arrow easing out */
.lh .btn-launch { transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s; }
.lh .btn-launch:hover, .lh .btn-launch:focus-visible { transform: translate3d(0, -2px, 0); box-shadow: 0 18px 44px -12px rgba(var(--accent-rgb), 0.55), 0 0 0 6px rgba(var(--accent-rgb), 0.1); }
.lh .btn-launch svg { transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
.lh .btn-launch:hover svg, .lh .btn-launch:focus-visible svg { transform: translate3d(2px, -2px, 0); }
.lh-eyebrow { text-wrap: balance; max-width: 30ch; font-size: 0.75rem; }
@media (min-width: 640px) { .lh-eyebrow { max-width: none; } }
.lh-eyebrow { font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-ink-muted); }
.lh-bal { text-wrap: balance; }
.lh-pillars { list-style: none; margin: 72px auto 0; padding: 0; display: grid; text-align: left; max-width: 64rem; border-top: 1px solid var(--hairline-2); }
@media (min-width: 768px) { .lh-pillars { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 96px; } }
.lh-pillar { padding: 24px 0; border-bottom: 1px solid var(--hairline-2); }
@media (min-width: 768px) { .lh-pillar { padding: 28px 32px 8px; border-bottom: 0; } .lh-pillar + .lh-pillar { border-left: 1px solid var(--hairline-2); } .lh-pillar:first-child { padding-left: 0; } .lh-pillar:last-child { padding-right: 0; } }
.lh-pn { font-family: var(--font-mono); font-size: 0.8125rem; color: var(--color-accent); }
.lh-pt { margin: 10px 0 0; font-family: var(--font-display); font-weight: 600; font-size: 1.375rem; letter-spacing: -0.02em; color: var(--color-ink); }
.lh-pb { text-wrap: pretty; margin: 8px 0 0; font-size: 1rem; line-height: 1.55; color: var(--color-ink-soft); max-width: 30ch; }
.lh-trust { text-wrap: balance; margin: 32px auto 0; max-width: 46rem; font-size: 0.9rem; line-height: 1.55; color: var(--color-ink-muted); }
/* the dissolve into the dark Promise chapter */
.lh-dissolve { position: relative; height: clamp(220px, 36vh, 420px); margin-bottom: -1px; pointer-events: none;
  background: linear-gradient(var(--bg) 0%, color-mix(in oklab, var(--bg) 78%, #4D7CFF) 22%, color-mix(in oklab, var(--bg) 30%, #1D3F8F) 48%, #0B1736 74%, #060B1A 100%); }
.lh-dissolve::after { content: ""; position: absolute; left: 50%; top: 55%; width: min(80vw, 900px); height: 60%; transform: translate(-50%, -50%);
  background: radial-gradient(closest-side, rgba(77, 124, 255, 0.14), rgba(77, 124, 255, 0)); }
@media (prefers-reduced-motion: reduce) {
  .lh-glow, .lh-float { animation: none; }
  .lh-w > span, .lh-fade { animation: none; transform: none; opacity: 1; }
}
`;

function Words({ words, start = 0 }: { words: string[]; start?: number }) {
  return (
    <>
      {words.map((w, k) => (
        <span key={k}>
          <span className="lh-w">
            <span style={{ ["--i" as string]: start + k }}>{w}</span>
          </span>
          {k < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function LaunchHero() {
  return (
    <>
      <section className="lh hero-launch relative isolate overflow-hidden bg-canvas" aria-labelledby="hero-title" data-cta-location="hero">
        <style>{CSS}</style>
        <div aria-hidden className="aurora" />
        <span aria-hidden className="lh-glow lh-glow-a" />
        <span aria-hidden className="lh-glow lh-glow-b" />
        <div className="container-narrow relative pt-24 pb-20 text-center sm:pt-32 md:pt-40 md:pb-28">
          <div className="lh-float">
            <Rocket />
          </div>

          <p className="lh-eyebrow lh-fade relative z-[1] mx-auto mt-5 md:mt-7" style={{ ["--d" as string]: "0.05s" }}>
            Verdance Systems AI · South Africa and the&nbsp;UK
          </p>

          <h1
            id="hero-title"
            className="relative z-[1] font-display mx-auto mt-4 text-[color:var(--color-ink)] md:mt-5"
            style={{ fontSize: "clamp(2.6rem, 5.2vw + 1rem, 6.25rem)", lineHeight: 0.98, letterSpacing: "-0.045em" }}
            aria-label="We don't talk about AI. We ship it."
          >
            <span aria-hidden>
              <Words words={LINE_1} />{" "}
              <span className="italic-accent block whitespace-nowrap">
                <Words words={LINE_2} start={LINE_1.length} />
              </span>
            </span>
          </h1>

          <p
            className="lh-fade lh-bal relative z-[1] mx-auto mt-6 max-w-[24ch] font-display text-[color:var(--color-ink)] md:mt-8 md:max-w-[32ch]"
            style={{ fontSize: "clamp(1.3rem, 1.1vw + 1rem, 1.9rem)", lineHeight: 1.25, letterSpacing: "-0.025em", ["--d" as string]: "0.42s" }}
          >
            An operations team that never clocks off, built into your business in 10&nbsp;working&nbsp;days.
          </p>

          <p
            className="lh-fade lh-bal relative z-[1] mx-auto mt-4 max-w-[36rem] text-[color:var(--color-ink-soft)]"
            style={{ fontSize: "clamp(1.02rem, 0.3vw + 0.95rem, 1.15rem)", lineHeight: 1.6, ["--d" as string]: "0.5s" }}
          >
            Every enquiry answered within 60&nbsp;seconds. Every quote followed&nbsp;up. The admin done before your team logs&nbsp;on.
          </p>

          <div className="lh-fade relative z-[1] mt-8 flex flex-col items-center gap-4 md:mt-10" style={{ ["--d" as string]: "0.6s" }}>
            <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent btn-launch min-h-[52px] w-full justify-center px-7 text-[1.02rem] sm:w-auto">
              See what Verdance can do for you
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <p className="text-[0.9rem] text-[color:var(--color-ink-muted)]">
              A free 30-minute call. Nothing&nbsp;to&nbsp;sign.{" "}
              <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 whitespace-nowrap underline decoration-[color:var(--hairline-2)] underline-offset-4 hover:text-[color:var(--color-ink)]">
                <WhatsAppIcon className="h-3.5 w-3.5" />
                Or WhatsApp us
              </a>
            </p>
          </div>

          <ol className="lh-pillars lh-fade relative z-[1]" style={{ ["--d" as string]: "0.75s" }}>
            {PILLARS.map((p) => (
              <li key={p.n} className="lh-pillar">
                <span className="lh-pn">{p.n}</span>
                <h2 className="lh-pt">{p.title}</h2>
                <p className="lh-pb">{p.body}</p>
              </li>
            ))}
          </ol>
          <p className="lh-trust lh-fade relative z-[1]" style={{ ["--d" as string]: "0.85s" }}>
            Running today for a South African e-commerce brand and a luxury home design studio. You choose what goes out on its own.
          </p>
        </div>
      </section>
      <div aria-hidden className="lh-dissolve" />
    </>
  );
}
