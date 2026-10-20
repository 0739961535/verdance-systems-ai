import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SplitWords } from "@/components/primitives/Reveal";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { AskYourBusiness } from "@/components/ask/AskYourBusiness";
import { ToolsMarquee } from "@/components/home/ToolsMarquee";
import { ProcessChapter } from "@/components/home/ProcessChapter";
import { SimpleFinalCTA } from "@/components/home/SimpleHome";
import film from "@/components/home/flight/film-manifest.json";
import { WorkVisualsStyle } from "@/components/home/inbox/WorkVisuals";
import { PillarVisual, PILLAR_VISUAL_SLUGS, SERVICE_VISUALS_CSS } from "@/components/services/ServiceVisuals";
import { SERVICE_PILLARS, PILLAR_CATEGORIES } from "@/data/services";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY, SITE_URL } from "@/data/site";

const TITLE = "Services: WhatsApp Replies, Phone Answering, Online Booking and More | Verdance Systems AI";
const DESCRIPTION =
  "Twelve services for South African businesses: instant WhatsApp and message replies, phone answering, online booking, missed call text back, Google reviews, websites and more. Fixed quote after a free Operations Map.";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/services`,
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  title: TITLE,
  description: DESCRIPTION,
};

/**
 * /services (spec 2026-10-20): a dark hero on the film's cloud frame, a
 * sticky chapter nav, the four pillars as a typographic index of rows,
 * then Ask your business, the tools, how it happens and the closing scene.
 */
const CSS = `
.sv-hero { position: relative; min-height: 560px; display: flex; align-items: flex-end; overflow: hidden; }
@media (min-width: 1024px) { .sv-hero { min-height: 70vh; } }
.sv-hero picture, .sv-hero img { position: absolute; inset: 0; width: 100%; height: 100%; }
.sv-hero img { object-fit: cover; filter: brightness(0.6); }
.sv-hero::after { content: ""; position: absolute; inset: 0; background: linear-gradient(rgba(6, 11, 26, 0) 30%, #060B1A); }
.sv-nav { position: sticky; top: 64px; z-index: 20; background: #060B1A; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
.sv-nav-in { display: flex; gap: 28px; overflow-x: auto; scrollbar-width: none; -webkit-mask-image: linear-gradient(90deg, #000 88%, transparent); mask-image: linear-gradient(90deg, #000 88%, transparent); }
@media (min-width: 1024px) { .sv-nav-in { -webkit-mask-image: none; mask-image: none; } }
.sv-nav-in::-webkit-scrollbar { display: none; }
.sv-nav a { flex: none; display: inline-flex; align-items: center; min-height: 56px; font-size: 0.9375rem; color: rgba(234, 240, 255, 0.72); border-bottom: 2px solid transparent; }
.sv-nav a:hover, .sv-nav a:focus-visible { color: #F2F5FC; border-bottom-color: #4D7CFF; }
.sv-row { display: grid; gap: 6px; padding: 32px 0; border-bottom: 1px solid var(--hairline-2); }
.sv-row:first-child { border-top: 1px solid var(--hairline-2); }
.sv-row .sv-arrow { transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
.sv-row:hover .sv-arrow { transform: translate(3px, -3px); }
.sv-row:hover .sv-name { color: #8FB0FF; }
${SERVICE_VISUALS_CSS}
`;

export default function ServicesPage() {
  return (
    <>
      <style>{CSS}</style>
      <section className="band-night sv-hero" aria-labelledby="sv-title">
        <picture>
          <source media="(max-width: 767px)" srcSet={`/flight/film/mid-m.webp?v=${film.v}`} />
          <img src={`/flight/film/mid-d.webp?v=${film.v}`} alt="" width={1920} height={1085} fetchPriority="high" />
        </picture>
        <div className="container-wide relative z-[1] pb-14 pt-40 lg:pb-24">
          <p className="eyebrow">
            <span className="chap-n">00</span> Services
          </p>
          <h1 id="sv-title" className="mt-4 max-w-[14ch] font-display" style={{ fontSize: "clamp(3.5rem, 5vw + 1.2rem, 5.5rem)", lineHeight: 1, letterSpacing: "-0.04em", fontWeight: 600 }}>
            Everything your team does twice, done <span className="italic-accent">once.</span>
          </h1>
          <p className="lead mt-6">Twelve services in four groups. Start with the one that costs you the most.</p>
          <a href={GENERIC_BOOK_URL} className="btn btn-accent mt-8 min-h-[52px] justify-center px-7 text-[1.02rem]">
            {CTA_PRIMARY}
            <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>
      </section>

      <nav aria-label="Service groups" className="sv-nav band-night">
        <div className="container-wide sv-nav-in">
          {SERVICE_PILLARS.map((p) => (
            <a key={p.slug} href={`#${p.slug}`}>
              {p.title}
            </a>
          ))}
        </div>
      </nav>

      <WorkVisualsStyle />
      {SERVICE_PILLARS.map((pillar, pi) => {
        const categories = PILLAR_CATEGORIES(pillar);
        return (
          <section
            key={pillar.slug}
            id={pillar.slug}
            className={`${pi % 2 === 0 ? "band-night" : "band-orbit"} chapter-pad`}
            style={{ scrollMarginTop: "8rem" }}
            aria-labelledby={`pillar-${pillar.slug}`}
          >
            <div className="container-wide grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-[8%]">
              <div className="lg:sticky lg:top-40 lg:self-start" data-reveal="">
                <p className="font-display text-[#8FB0FF]" style={{ fontSize: "clamp(3.5rem, 4vw + 1.5rem, 5.5rem)", lineHeight: 0.9, letterSpacing: "-0.04em", fontWeight: 600 }}>
                  {pillar.index}
                </p>
                <h2 id={`pillar-${pillar.slug}`} className="h2 mt-4">
                  <SplitWords text={pillar.title} />
                </h2>
                <p className="lead mt-4">{pillar.promise}</p>
                {PILLAR_VISUAL_SLUGS.includes(pillar.slug) ? (
                  <div className="sv-vis" data-reveal="">
                    <PillarVisual slug={pillar.slug} />
                  </div>
                ) : null}
              </div>
              <ul>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/services/${c.slug}`} className="sv-row group">
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="sv-name font-display text-[1.375rem] text-[color:var(--color-ink)] transition-colors lg:text-[1.75rem]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                          {c.name}
                        </span>
                        <ArrowUpRight size={20} aria-hidden className="sv-arrow shrink-0 text-[color:var(--color-ink-muted)]" />
                      </span>
                      <span className="text-[1.0625rem] leading-[1.5] text-[color:var(--color-ink-soft)] lg:text-[1.125rem]">{c.promise}</span>
                      <span className="text-[0.875rem] text-[color:var(--color-ink-muted)]">{c.subProducts.map((sp) => sp.name).join(", ")}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <AskYourBusiness />
      <ToolsMarquee still className="band-night" />
      <ProcessChapter />
      <SimpleFinalCTA title={["Not sure where to start? We'll help you", "pick.", ""]} />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label={CTA_PRIMARY} />
    </>
  );
}
