import type { ReactNode } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";

/**
 * CTABand - the closing call to action on every page. id="audit" so the
 * sticky mobile CTA steps aside here.
 */
export function CTABand({
  eyebrow = "Free pre-audit · 30 minutes",
  title = (
    <>
      Find out what slow replies <span className="italic-accent">cost you.</span>
    </>
  ),
  points = [
    "How fast you reply today, channel by channel",
    "What slow replies are likely costing you, in rand",
    "A fixed quote, if you want us to build it",
  ],
  href = GENERIC_BOOK_URL,
  label = "Book your free pre-audit",
}: {
  eyebrow?: string;
  title?: ReactNode;
  points?: string[];
  href?: string;
  label?: string;
}) {
  return (
    <section
      id="audit"
      className="relative isolate overflow-hidden section-pad bg-canvas"
      aria-labelledby="cta-band-title"
      style={{ borderTop: "1px solid var(--hairline)", scrollMarginTop: "5rem" }}
    >
      <div aria-hidden className="cta-glow" />
      <div className="container-narrow md:text-center">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="cta-band-title"
            className="mt-6 font-display text-[color:var(--color-ink)] md:mx-auto md:max-w-[16ch]"
            style={{ fontSize: "clamp(2.5rem, 4.8vw + 1rem, 5.4rem)", lineHeight: 0.98, letterSpacing: "-0.045em" }}
          >
            {title}
          </h2>
          <ul className="mt-8 grid gap-3 text-left md:mx-auto md:max-w-md">
            {points.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[1rem] leading-[1.55] text-[color:var(--color-ink-soft)]">
                <Check size={17} strokeWidth={2.4} aria-hidden className="mt-1 shrink-0 text-[color:var(--color-accent)]" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row md:justify-center">
            <a href={href} data-magnetic className="btn btn-accent min-h-12 justify-center px-7">
              {label}
              <ArrowUpRight size={16} aria-hidden />
            </a>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-12 justify-center px-7">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
          <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
            Free · nothing to sign · fixed quote after
          </p>
        </Reveal>
      </div>
    </section>
  );
}
