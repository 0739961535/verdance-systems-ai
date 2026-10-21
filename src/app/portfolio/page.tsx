import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Bud } from "@/components/how/Bud";
import { CaseStudy, CASE_CSS } from "@/components/portfolio/CaseStudy";
import { ConceptDemos } from "@/components/portfolio/concepts/ConceptDemos";
import { PossibleStatement } from "@/components/portfolio/concepts/PossibleStatement";
import { SimpleFinalCTA } from "@/components/home/SimpleFinalCTA";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { PORTFOLIO_CASES } from "@/data/portfolio";
import { CTA_PRIMARY, SITE_URL } from "@/data/site";

const TITLE = "AI Systems Built for Real Businesses | Verdance";
const DESCRIPTION =
  "Websites, assistants and automations we built for owner-led businesses: what we built, how it works and what it does. Client names stay private.";

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
@media (min-width: 768px) { .po-jump { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 24px; } }
@media (min-width: 1200px) { .po-jump { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
.po-jump a { display: flex; align-items: baseline; gap: 12px; min-height: 56px; padding: 16px 16px 16px 0; border-bottom: 1px solid var(--hairline-2); color: var(--color-ink); font-weight: 500; }
.po-jump a:hover { color: #8FB0FF; }
.po-jump a:focus-visible { outline: 2px solid #8FB0FF; outline-offset: 2px; }
.po-jump a { align-items: center; }
.po-bud { flex: none; width: 32px; height: 32px; --u: 1.75; }
.po-bud .bud-line path { stroke-dasharray: 1; stroke-dashoffset: 0; }
/* The index is on screen at load: the marks draw once on first paint (no JS), in turn. */
@keyframes po-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes po-fill { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: no-preference) {
  .po-bud .bud-line path { animation: po-draw 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 0.3s) both; }
  .po-bud .bud-fill { animation: po-fill 0.6s ease-out calc(var(--d, 0.3s) + 0.3s) both; }
}
.po-key { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 6px 20px; font-size: 0.8125rem; color: var(--color-ink-muted); }
.po-key span { display: inline-flex; align-items: center; gap: 6px; }
.po-key .bud { --u: 2.8; }
.po-see { display: inline-flex; align-items: center; gap: 6px; margin-top: 6px; font-size: 0.875rem; font-weight: 600; color: #8FB0FF; }
.po-see i { width: 7px; height: 7px; border-radius: 99px; background: #6EE7A8; box-shadow: 0 0 0 0 rgba(110,231,168,0.6); }
@media (prefers-reduced-motion: no-preference) { .po-see i { animation: po-live 2s ease-out infinite; } }
@keyframes po-live { 0% { box-shadow: 0 0 0 0 rgba(110,231,168,0.55); } 100% { box-shadow: 0 0 0 7px rgba(110,231,168,0); } }
.po-jump a .po-arr { transition: transform .3s cubic-bezier(0.22, 1, 0.36, 1); }
.po-jump a:hover .po-arr { transform: translate3d(3px, 0, 0); }
.po-jump a.is-hot { color: #F2F5FC; }
.po-jump small { display: block; margin-top: 2px; font-size: 0.8125rem; color: var(--color-ink-muted); }
`;

/**
 * /portfolio: three real builds (names private until written OK, see
 * src/data/portfolio.ts), then "Anything is possible." turning paper into
 * night, then four interactive concept demos, then the closing scene.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: `${SITE_URL}/portfolio` },
  ],
};

export default function PortfolioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
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
            <li>
              <a href="#concepts">
                {/* Gold bloom = concept demos you can try. */}
                <span className="po-bud" style={{ ["--d" as string]: "0.15s" }} aria-hidden>
                  <Bud stage={4} size={32} gold />
                </span>
                <span>
                  Anything is possible
                  <small>See what we can build</small>
                </span>
              </a>
            </li>
            {PORTFOLIO_CASES.map((c, i) => (
              <li key={c.id}>
                <a href={c.id === "ecom" ? "#ecom-demo" : `#${c.id}`} className={c.id === "ecom" ? "is-hot" : undefined}>
                  {/* Bud = starting or in build, bloom = live. */}
                  <span className="po-bud" style={{ ["--d" as string]: `${0.3 + i * 0.15}s` }} aria-hidden>
                    <Bud stage={c.status === "Live" ? 4 : 1} size={32} />
                  </span>
                  <span>
                    {c.name ?? c.label}
                    <small>
                      {c.status}, {c.tags.join(", ").toLowerCase()}
                    </small>
                    {c.id === "ecom" ? (
                      <span className="po-see">
                        <i aria-hidden />
                        See it working
                        <ArrowRight size={15} className="po-arr" aria-hidden />
                      </span>
                    ) : null}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="po-key" aria-hidden>
            <span>
              <Bud stage={1} size={20} /> Starting or in build
            </span>
            <span>
              <Bud stage={4} size={20} /> Live
            </span>
            <span>
              <Bud stage={4} size={20} gold /> Concept demos to try
            </span>
          </p>
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

      <PossibleStatement />
      <ConceptDemos />
      <SimpleFinalCTA title={["Your business could be", "next.", ""]} />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label={CTA_PRIMARY} />
    </>
  );
}
