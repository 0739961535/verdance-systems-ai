import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HERO } from "@/data/landing";
import { SITE } from "@/data/site";
import { LiveOpsDashboard } from "./LiveOpsDashboard";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * HeroControlRoom - conviction statement + the system visibly working.
 * Server component; all entrances are the CSS .enter-* classes so the
 * LCP element (the h1) is never JS-gated. Background layers are static.
 */
export function HeroControlRoom() {
  return (
    <section className="relative isolate overflow-hidden bg-canvas">
      {/* static grain */}
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
      {/* static architectural grid, masked */}
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
      {/* one static azure wash */}
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
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* text column */}
          <div>
            <div className="enter-fade-up flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--signal)" }} />
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--color-ink-muted)]">
                {HERO.eyebrow}
              </span>
            </div>

            <h1
              className="enter-fade-up font-display text-[color:var(--color-ink)] mt-6 max-w-[15ch]"
              style={{
                fontSize: "clamp(2.5rem, 4.8vw + 1.6rem, 5.25rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                animationDelay: "0.08s",
              }}
            >
              We don&apos;t talk about AI.
              <br />
              We <span className="italic-accent">ship</span> it.
            </h1>

            <p
              className="enter-fade-up mt-6 max-w-xl text-[color:var(--color-ink-soft)]"
              style={{
                fontSize: "clamp(1.0625rem, 0.5vw + 0.95rem, 1.25rem)",
                lineHeight: 1.55,
                animationDelay: "0.16s",
              }}
            >
              {HERO.lead}
            </p>

            <div className="enter-fade-up mt-8 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "0.24s" }}>
              <Link href="#audit" className="btn btn-accent justify-center min-h-12">
                {HERO.ctaPrimary}
                <ArrowUpRight size={15} aria-hidden />
              </Link>
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost justify-center min-h-12"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {HERO.ctaWhatsApp}
              </a>
            </div>

            <p
              className="enter-fade-up mt-4 font-mono text-[0.72rem] tracking-[0.08em] text-[color:var(--color-ink-muted)]"
              style={{ animationDelay: "0.32s" }}
            >
              {HERO.microcopy}
            </p>
          </div>

          {/* dashboard column */}
          <div className="enter-fade-up" style={{ animationDelay: "0.3s" }}>
            <LiveOpsDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
