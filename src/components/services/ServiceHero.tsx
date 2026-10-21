import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ServiceGlyph, ServiceGlyphStyle } from "@/components/services/ServiceGlyph";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY, SITE } from "@/data/site";

/**
 * The hero for all twelve service pages: breadcrumb, the service's petal
 * glyph as its mark, the headline, a 20 to 25 word line, and "Show me how"
 * for the full paragraph (a native details element: no JS, keyboard and
 * screen reader friendly). The visual sits beside it from lg up.
 */

const CSS = `
.sh { position: relative; isolation: isolate; overflow: hidden; }
.sh-in { position: relative; padding-top: 112px; padding-bottom: 64px; display: grid; gap: 48px; }
@media (min-width: 640px) { .sh-in { padding-top: 128px; } }
@media (min-width: 1024px) { .sh-in { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; gap: 48px; padding-top: 144px; padding-bottom: 96px; } }
.sh-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0 8px; margin-bottom: 20px; font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-ink-muted); }
.sh-crumbs a { display: inline-flex; min-height: 44px; align-items: center; color: var(--color-ink-soft); }
.sh-crumbs a:hover { color: var(--color-accent); }
.sh-mark { display: flex; align-items: center; gap: 14px; }
.sh-h1 { margin-top: 20px; font-family: var(--font-display); font-size: clamp(2.6rem, 3.6vw + 1rem, 4.75rem); line-height: 0.98; letter-spacing: -0.045em; font-weight: 600; color: var(--color-ink); max-width: 15ch; }
.sh-lead { margin-top: 24px; max-width: 34rem; font-size: clamp(1.0625rem, 0.4vw + 0.98rem, 1.25rem); line-height: 1.55; color: var(--color-ink); }
.sh-more { margin-top: 12px; max-width: 34rem; }
.sh-more summary { display: inline-flex; min-height: 44px; align-items: center; gap: 6px; cursor: pointer; list-style: none; font-weight: 500; color: var(--color-accent); }
.sh-more summary::-webkit-details-marker { display: none; }
.sh-more summary:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; border-radius: 6px; }
.sh-more summary svg { transition: transform .25s cubic-bezier(0.16, 1, 0.3, 1); }
.sh-more[open] summary svg { transform: rotate(180deg); }
.sh-more p { margin-top: 4px; font-size: 1.0625rem; line-height: 1.6; color: var(--color-ink-soft); animation: sh-in .35s ease both; }
@keyframes sh-in { from { opacity: 0; } to { opacity: 1; } }
.sh-ctas { margin-top: 28px; display: flex; flex-direction: column; gap: 10px; }
@media (min-width: 640px) { .sh-ctas { flex-direction: row; align-items: center; } }
.sh-ctas .btn { min-height: 52px; justify-content: center; padding-inline: 24px; }
.sh-wa { display: inline-flex; min-height: 48px; align-items: center; justify-content: center; gap: 8px; padding: 0 16px; color: var(--color-ink-soft); }
.sh-wa:hover { color: var(--color-ink); }
.sh-note { margin-top: 18px; font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-ink-muted); }
.sh .sg path, .sh .sg circle { stroke: #2554D4; }
.sh .sg .sg-on { fill: rgba(37, 84, 212, 0.22); stroke: #1D3F8F; }
.sh .sg .sg-core { fill: #2554D4; }
@media (prefers-reduced-motion: reduce) { .sh-more p { animation: none; } .sh-more summary svg { transition: none; } }
`;

export function ServiceHero({
  slug,
  name,
  title,
  short,
  more,
  visual,
}: {
  slug: string;
  name: string;
  title: ReactNode;
  short: string;
  more: string;
  visual?: ReactNode;
}) {
  return (
    <section className="sh bg-canvas" aria-labelledby="page-hero-title" data-cta-location="hero">
      <style>{CSS}</style>
      <ServiceGlyphStyle />
      <div aria-hidden className="aurora" />
      <div className="container-wide sh-in">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="sh-crumbs">
            <Link href="/services">Services</Link>
            <span aria-hidden>/</span>
            <span>{name}</span>
          </nav>
          <div className="sh-mark">
            <ServiceGlyph slug={slug} size={64} draw />
            <p className="eyebrow">{name}</p>
          </div>
          <h1 id="page-hero-title" className="sh-h1">
            {title}
          </h1>
          <p className="sh-lead">{short}</p>
          <details className="sh-more">
            <summary>
              Show me how
              <ChevronDown size={16} aria-hidden />
            </summary>
            <p>{more}</p>
          </details>
          <div className="sh-ctas">
            <a href={GENERIC_BOOK_URL} className="btn btn-accent">
              {CTA_PRIMARY}
              <ArrowUpRight size={16} aria-hidden />
            </a>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="sh-wa">
              <WhatsAppIcon className="h-4 w-4" />
              Or WhatsApp us
            </a>
          </div>
          <p className="sh-note">Free 30-minute call · nothing to sign</p>
        </div>
        {visual ? <div className="min-w-0">{visual}</div> : null}
      </div>
    </section>
  );
}
