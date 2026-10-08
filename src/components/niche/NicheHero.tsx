import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";
import { bookUrl, type Niche } from "@/data/niches";
import { NICHE_CONVERSATIONS, HOME_CONVERSATION } from "@/data/conversations";
import { ChatPhone } from "@/components/device/ChatPhone";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { NicheIcon } from "./NicheIcon";

/**
 * NicheHero - the homepage hero pattern in the niche's own words, with the
 * phone playing a niche-specific sample conversation.
 * Server component; the h1 (LCP) never waits on JavaScript and the phone
 * starts after load. Mobile first: the phone sits under the copy.
 */
export function NicheHero({ niche }: { niche: Niche }) {
  const conversation = NICHE_CONVERSATIONS[niche.slug] ?? HOME_CONVERSATION;
  return (
    <section className="relative isolate overflow-hidden bg-canvas" aria-labelledby="niche-hero-title">
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 left-1/2 top-[55%] h-[620px] w-[620px] -translate-x-1/2 rounded-full lg:left-[74%] lg:top-[50%] lg:-translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(var(--accent-glow-rgb),0.15), transparent 62%)", filter: "blur(40px)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ background: "var(--hairline)" }} />

      <div className="container-wide relative pt-28 pb-16 sm:pt-32 md:pt-36 lg:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="enter-fade-up font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]"
        >
          <Link href="/industries" className="inline-flex min-h-11 items-center hover:text-[color:var(--color-accent)] transition-colors">
            Industries
          </Link>
          <span className="mx-2 text-[color:var(--color-ink-faint)]">/</span>
          <span className="text-[color:var(--color-ink-soft)]">{niche.shortName}</span>
        </nav>

        <div className="mt-6 grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <div className="min-w-0">
            <p className="enter-fade-up flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
              <NicheIcon icon={niche.icon} size={14} className="text-[color:var(--color-accent)]" />
              {niche.hero.eyebrow}
            </p>

            <h1
              id="niche-hero-title"
              className="enter-fade-up font-display mt-6 text-[color:var(--color-ink)]"
              style={{
                fontSize: "clamp(2.5rem, 4.2vw + 1rem, 5rem)",
                lineHeight: 1,
                letterSpacing: "-0.045em",
                animationDuration: "0.7s",
              }}
            >
              {niche.hero.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <span className="mt-1 block italic-accent">{niche.hero.accent}</span>
            </h1>

            <p
              className="enter-fade-up mt-7 max-w-[34rem] text-[color:var(--color-ink-soft)]"
              style={{ fontSize: "clamp(1.0625rem, 0.4vw + 0.98rem, 1.25rem)", lineHeight: 1.6, animationDelay: "0.1s" }}
            >
              {niche.hero.lead}
            </p>

            <div className="enter-fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.18s" }}>
              <a href={bookUrl(niche.bookSlug)} className="btn btn-accent min-h-12 justify-center px-6">
                Book your free pre-audit
                <ArrowUpRight size={16} aria-hidden />
              </a>
              <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-12 justify-center px-6">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp Daniel
              </a>
            </div>

            <p
              className="enter-fade-up mt-7 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]"
              style={{ animationDelay: "0.26s" }}
            >
              {niche.offerName} · fixed quote after your free pre-audit
            </p>
          </div>

          <div className="enter-fade flex min-w-0 justify-center lg:justify-end" style={{ animationDelay: "0.35s" }}>
            <ChatPhone conversation={conversation} />
          </div>
        </div>
      </div>
    </section>
  );
}
