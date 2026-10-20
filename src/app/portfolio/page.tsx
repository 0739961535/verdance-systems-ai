import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { CaseStudy, CASE_CSS } from "@/components/portfolio/CaseStudy";
import { Concepts } from "@/components/portfolio/Concepts";
import { SimpleFinalCTA } from "@/components/home/SimpleHome";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { PORTFOLIO_CASES } from "@/data/portfolio";
import { CTA_PRIMARY, SITE_URL } from "@/data/site";

const TITLE = "Portfolio | Verdance Systems AI";
const DESCRIPTION =
  "Websites, assistants and automations we have built for owner-led South African businesses: what we built, how it works and what it does for them. Client names stay private.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
  openGraph: { images: ["/opengraph-image"], title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/portfolio`, type: "website", siteName: "Verdance Systems AI" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const HERO_CSS = `
.po-hero { position: relative; isolation: isolate; overflow: hidden; padding: 120px 0 64px; }
@media (min-width: 1024px) { .po-hero { padding: 184px 0 104px; } }
.po-glow { position: absolute; z-index: -1; inset: -30% -30% auto auto; width: 110vw; height: 110vw; max-width: 1000px; max-height: 1000px; border-radius: 999px; pointer-events: none;
  background: radial-gradient(closest-side, rgba(77,124,255,0.26), rgba(77,124,255,0.07) 55%, transparent 72%); }
.po-h1 { margin-top: 16px; max-width: 14ch; font-family: var(--font-display); font-weight: 600; font-size: clamp(2.75rem, 5vw + 1rem, 5.75rem); line-height: 0.98; letter-spacing: -0.045em; color: #F2F5FC; }
.po-jump { list-style: none; margin: 44px 0 0; padding: 0; display: grid; border-top: 1px solid var(--hairline-2); }
@media (min-width: 768px) { .po-jump { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.po-jump a { display: flex; align-items: baseline; gap: 12px; min-height: 56px; padding: 16px 16px 16px 0; border-bottom: 1px solid var(--hairline-2); color: var(--color-ink); font-weight: 500; }
.po-jump a:hover { color: #8FB0FF; }
.po-jump a:focus-visible { outline: 2px solid #8FB0FF; outline-offset: 2px; }
.po-jump b { font-family: var(--font-mono); font-weight: 500; font-size: 12px; color: #8FB0FF; font-variant-numeric: tabular-nums; }
.po-jump small { display: block; margin-top: 2px; font-size: 0.8125rem; color: var(--color-ink-muted); }
`;

/**
 * /portfolio: three real builds (names private until written OK, see
 * src/data/portfolio.ts), then a strip of concepts, then the closing scene.
 */
export default function PortfolioPage() {
  return (
    <>
      <section className="band-night po-hero" aria-labelledby="portfolio-h1">
        <style>{HERO_CSS + CASE_CSS}</style>
        <span className="po-glow" aria-hidden />
        <div className="container-wide">
          <p className="eyebrow">
            <span className="chap-n">Portfolio</span>
          </p>
          <h1 id="portfolio-h1" className="po-h1">
            Built and running for real businesses.
          </h1>
          <p className="lead mt-6">What we built, how it works and what it does for them. Client names stay private.</p>
          <ul className="po-jump" aria-label="The builds on this page">
            {PORTFOLIO_CASES.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span>
                    {c.name ?? c.label}
                    <small>
                      {c.status}, {c.tags.join(", ").toLowerCase()}
                    </small>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {PORTFOLIO_CASES.map((c, i) => (
        <section key={c.id} className="band-paper chapter-pad" aria-label={c.name ?? c.label}>
          <div className="container-wide">
            <CaseStudy c={c} index={i} />
            {i === PORTFOLIO_CASES.length - 1 ? (
              <div className="mt-14 lg:mt-20">
                <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-[52px] w-full justify-center px-7 text-[1.02rem] sm:w-auto">
                  {CTA_PRIMARY}
                  <ArrowUpRight size={17} aria-hidden />
                </a>
              </div>
            ) : null}
          </div>
        </section>
      ))}

      <div className="cv-below">
        <Concepts />
      </div>
      <SimpleFinalCTA title={["Your business could be", "next.", ""]} />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label={CTA_PRIMARY} />
    </>
  );
}
