import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";

/**
 * The home hero: the opening that is live on verdancesystemsai.com (the warm
 * light ground, soft blue glows, the small rocket, the centred tagline and
 * one big pill), with the same layout, type and spacing, plus:
 * - a slow, living glow: two soft blue lights drifting (transform only);
 * - the headline rising into place word by word on load (always visible);
 * - a gentle float on the rocket (its own lift-off and scroll flight stay);
 * - a calmer, richer button hover;
 * - one screen tall, with a scroll cue; then the EarthRise scroll scene
 *   (a real Earth photograph rising out of the cream) leads into 01 Promise.
 * Works in both themes (the ground follows the site's --bg). Reduced motion:
 * everything still, nothing hidden.
 */

const LINE_1 = ["We", "don't", "talk", "about", "AI."];
const LINE_2 = ["We", "ship", "it."];

const CSS = `
.lh { position: relative; isolation: isolate; overflow: hidden; z-index: 2; }
/* it rises over the flower's last screen: a soft top edge, no hard line */
@media (prefers-reduced-motion: no-preference) {
  .lh { -webkit-mask-image: linear-gradient(to bottom, transparent, #000 140px); mask-image: linear-gradient(to bottom, transparent, #000 140px); }
}
/* the glow layer runs the full first screen and fades out */
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
/* below the flower, the statement waits for its own frame: its words rise and
   its lines fade in when it scrolls into view, not at page load */
.lh-in[data-armed]:not([data-revealed]) .lh-w > span, .lh-in[data-armed]:not([data-revealed]) .lh-fade { animation: none; }
.lh-in[data-armed]:not([data-revealed]) .lh-fade { opacity: 0; }
/* the button: a slow lift, a deeper glow and the arrow easing out */
.lh .btn-launch { transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s; }
.lh .btn-launch:hover, .lh .btn-launch:focus-visible { transform: translate3d(0, -2px, 0); box-shadow: 0 18px 44px -12px rgba(var(--accent-rgb), 0.55), 0 0 0 6px rgba(var(--accent-rgb), 0.1); }
.lh .btn-launch svg { transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
.lh .btn-launch:hover svg, .lh .btn-launch:focus-visible svg { transform: translate3d(2px, -2px, 0); }
.lh-eyebrow { text-wrap: balance; max-width: 30ch; font-size: 0.75rem; }
@media (min-width: 640px) { .lh-eyebrow { max-width: none; } }
.lh-eyebrow { font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-ink-muted); }
.lh-bal { text-wrap: balance; }
.lh-pre { margin: 0 0 -4px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-ink-muted); }
/* the first screen: one screen tall, the words centred in the light, a
   scroll cue at the bottom. The Earth rises in the next scene (EarthRise). */
.lh { --arc: 0px; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; }
.lh-in { padding-top: 96px; padding-bottom: 88px; }
@media (min-width: 768px) { .lh-in { padding-top: 112px; padding-bottom: 112px; } }
.lh-h1 { font-size: clamp(2.9rem, 5.6vw + 0.9rem, 7rem); line-height: 0.95; letter-spacing: -0.05em; }
/* depth in the light: a soft vignette and a faint haze toward the bottom */
.lh-depth { position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: radial-gradient(120% 80% at 50% 38%, transparent 55%, rgba(var(--hairline-rgb), 0.05) 100%), linear-gradient(transparent 60%, rgba(var(--accent-rgb), 0.07) 100%); }
/* a long soft fade from the light ground into the navy of 01 Promise */
.lh-into-dark { height: clamp(88px, 12vh, 160px); margin-bottom: -1px;
  background: linear-gradient(var(--bg) 0%, color-mix(in oklab, var(--bg) 70%, #8FB0FF) 30%, color-mix(in oklab, var(--bg) 25%, #1D3F8F) 62%, #060B1A 100%); }
.lh-why { position: relative; display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font-size: 0.9375rem; color: var(--color-ink-soft); }
.lh-why::after { content: ""; position: absolute; left: 0; right: 18px; bottom: 10px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
.lh-why:hover, .lh-why:focus-visible { color: var(--color-ink); }
.lh-why:hover::after, .lh-why:focus-visible::after { transform: scaleX(1); }
.lh-why span { transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
.lh-why:hover span, .lh-why:focus-visible span { transform: translateX(3px); }
/* the scroll cue: a word and a fine line with a light running down it */
.lh-cue { position: absolute; z-index: 2; left: 50%; bottom: calc(var(--arc) + 22px); transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 10px;
  font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--color-ink-muted); }
.lh-cue i { position: relative; width: 1px; height: 36px; overflow: hidden; background: rgba(var(--hairline-rgb), 0.18); }
.lh-cue i::after { content: ""; position: absolute; left: 0; top: -40%; width: 1px; height: 40%; background: var(--color-accent); animation: lh-cue 2.2s cubic-bezier(0.65, 0, 0.35, 1) 1.4s infinite; }
@keyframes lh-cue { to { top: 100%; } }
@media (prefers-reduced-motion: reduce) {
  .lh-glow, .lh-float, .lh-cue i::after { animation: none; }
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
        <span aria-hidden className="lh-depth" />
        <div className="lh-in container-narrow relative text-center" data-reveal="">

          <p className="lh-eyebrow lh-fade relative z-[1] mx-auto" style={{ ["--d" as string]: "0.05s" }}>
            Verdance Systems AI
          </p>

          <h1
            id="hero-title"
            className="lh-h1 relative z-[1] font-display mx-auto mt-4 text-[color:var(--color-ink)] md:mt-5"
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
            className="lh-fade lh-bal relative z-[1] mx-auto mt-7 max-w-[34ch] text-[color:var(--color-ink-soft)] md:mt-9 md:max-w-[46ch]"
            style={{ fontSize: "clamp(1.1rem, 0.6vw + 0.98rem, 1.4rem)", lineHeight: 1.5, letterSpacing: "-0.01em", ["--d" as string]: "0.42s" }}
          >
            We build AI that answers your customers, follows up every lead and does the admin, inside your CRM and the tools you
            already use.
          </p>

          <div className="lh-fade relative z-[1] mt-8 flex flex-col items-center gap-4 md:mt-10" style={{ ["--d" as string]: "0.6s" }}>
            <p className="lh-pre">See what Verdance can do for you</p>
            <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent btn-launch min-h-[52px] w-full justify-center px-7 text-[1.02rem] sm:w-auto">
              Book a free 30-minute call
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <p className="text-[0.9rem] text-[color:var(--color-ink-muted)]">
              A free 30-minute call. Nothing&nbsp;to&nbsp;sign.{" "}
              <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap underline decoration-[color:var(--hairline-2)] underline-offset-4 hover:text-[color:var(--color-ink)]">
                <WhatsAppIcon className="h-3.5 w-3.5" />
                Or WhatsApp us
              </a>
            </p>
            <Link href="/how-it-works#belief" className="lh-why">
              Why we build this way <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        <span aria-hidden className="lh-cue">
          Scroll
          <i />
        </span>
      </section>
      {/* the light page dissolves into the dark of 01 Promise */}
      <div aria-hidden className="lh-into-dark" />
    </>
  );
}
