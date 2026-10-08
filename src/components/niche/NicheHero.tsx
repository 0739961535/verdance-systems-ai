import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";
import { bookUrl, type Niche } from "@/data/niches";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { EnquiryThread } from "./EnquiryThread";
import { NicheIcon } from "./NicheIcon";

/**
 * NicheHero - the HeroControlRoom pattern, written in the niche's own words.
 * Server component. The h1 uses CSS entrances only, so the LCP element is
 * never gated on JavaScript. Background layers are static.
 */
export function NicheHero({ niche }: { niche: Niche }) {
  return (
    <section className="relative isolate overflow-hidden bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-40"
        style={{
          opacity: 0.4,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(var(--hairline-rgb),0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--hairline-rgb),0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 60% at 35% 45%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 65% 60% at 35% 45%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -z-20"
        style={{
          top: "4%", right: "-8%", width: 560, height: 560, borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb),0.10), transparent 68%)",
          filter: "blur(70px)",
        }}
      />

      <div className="container-wide relative z-10 pt-28 pb-14 md:pt-40 md:pb-20">
        <nav
          aria-label="Breadcrumb"
          className="enter-fade-up font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[color:var(--color-ink-muted)]"
        >
          <Link href="/industries" className="hover:text-[color:var(--color-accent)] transition-colors">
            Industries
          </Link>
          <span className="mx-2 text-[color:var(--color-ink-faint)]">/</span>
          <span className="text-[color:var(--color-accent)]">{niche.shortName}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="min-w-0">
            <div className="enter-fade-up flex items-center gap-3">
              <NicheIcon icon={niche.icon} size={14} className="text-[color:var(--color-accent)]" />
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-[color:var(--color-ink-muted)]">
                {niche.hero.eyebrow}
              </span>
            </div>

            <h1
              className="enter-fade-up font-display text-[color:var(--color-ink)] mt-6 max-w-[22ch]"
              style={{
                fontSize: "clamp(2.1rem, 3.8vw + 1.3rem, 4.25rem)",
                lineHeight: 1.03,
                letterSpacing: "-0.04em",
                animationDelay: "0.08s",
              }}
            >
              {niche.hero.lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
              <span className="block italic-accent">{niche.hero.accent}</span>
            </h1>

            <p
              className="enter-fade-up mt-6 max-w-xl text-[color:var(--color-ink-soft)]"
              style={{ fontSize: "clamp(1.0625rem, 0.5vw + 0.95rem, 1.2rem)", lineHeight: 1.6, animationDelay: "0.16s" }}
            >
              {niche.hero.lead}
            </p>

            <div className="enter-fade-up mt-8 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "0.24s" }}>
              <a href={bookUrl(niche.bookSlug)} className="btn btn-accent justify-center min-h-12">
                Book your pre-audit
                <ArrowUpRight size={15} aria-hidden />
              </a>
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost justify-center min-h-12"
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp Daniel
              </a>
            </div>

            <p
              className="enter-fade-up mt-5 font-mono text-[0.75rem] tracking-[0.08em] text-[color:var(--color-ink-muted)]"
              style={{ animationDelay: "0.3s" }}
            >
              {niche.offerName} · 30-minute call · no cost
            </p>
          </div>

          <div className="enter-fade-up min-w-0" style={{ animationDelay: "0.3s" }}>
            <EnquiryThread thread={niche.thread} />
          </div>
        </div>
      </div>
    </section>
  );
}
