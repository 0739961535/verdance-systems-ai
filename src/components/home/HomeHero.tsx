import { ArrowUpRight } from "lucide-react";
import { HERO } from "@/data/landing";
import { SITE } from "@/data/site";
import { GENERIC_BOOK_URL } from "@/data/niches";
import { HOME_ROTATION } from "@/data/conversations";
import { ChatPhone } from "@/components/device/ChatPhone";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";

/**
 * HomeHero - the claim, and the thing itself doing the work.
 *
 * Server component. The h1 is the LCP element: it is in the first HTML, uses
 * a short CSS entrance, and nothing it depends on waits for JavaScript. The
 * phone is a fixed-size box (no layout shift) that only starts playing after
 * the page has loaded. Mobile first: the phone sits under the copy.
 */
export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-canvas" aria-labelledby="hero-title">
      {/* one quiet light source behind the phone */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 left-1/2 top-[52%] h-[640px] w-[640px] -translate-x-1/2 rounded-full lg:left-[74%] lg:top-[50%] lg:-translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-glow-rgb),0.16), transparent 62%)",
          filter: "blur(40px)",
        }}
      />
      {/* hairline horizon */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ background: "var(--hairline)" }} />

      <div className="container-wide relative pt-28 pb-16 sm:pt-32 md:pt-40 lg:pb-24 lg:min-h-[100svh] lg:flex lg:items-center">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <div className="min-w-0">
            <p className="enter-fade-up eyebrow">AI systems · South Africa</p>

            <h1
              id="hero-title"
              className="enter-rise font-display mt-7 text-[color:var(--color-ink)]"
              style={{
                fontSize: "clamp(3.1rem, 5.6vw + 1rem, 6.4rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                animationDuration: "0.7s",
              }}
            >
              <span className="block">We don&apos;t talk</span>{" "}
              <span className="block">about AI.</span>{" "}
              <span className="block">
                We <span className="italic-accent">ship</span> it.
              </span>
            </h1>

            <p
              className="enter-rise mt-7 max-w-[34rem] text-[color:var(--color-ink-soft)]"
              style={{ fontSize: "clamp(1.0625rem, 0.45vw + 0.98rem, 1.3rem)", lineHeight: 1.6, animationDelay: "0.1s" }}
            >
              {HERO.lead}
            </p>

            <div className="enter-fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.18s" }}>
              <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-12 justify-center px-6">
                Book your free pre-audit
                <ArrowUpRight size={16} aria-hidden />
              </a>
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost min-h-12 justify-center px-6"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp us
              </a>
            </div>

            <ul
              className="enter-fade-up mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]"
              style={{ animationDelay: "0.26s" }}
            >
              <li>Replies within 5 minutes</li>
              <li>Day or night</li>
              <li>You own it</li>
            </ul>
          </div>

          <div className="enter-fade min-w-0 flex justify-center lg:justify-end" style={{ animationDelay: "0.35s" }}>
            <ChatPhone rotation={HOME_ROTATION} />
          </div>
        </div>
      </div>
    </section>
  );
}
