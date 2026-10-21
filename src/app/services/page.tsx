import { SERVICE_BY_SLUG } from "@/data/services";
import type { Metadata } from "next";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { AskYourBusiness } from "@/components/ask/AskYourBusiness";
import { ToolsMarquee } from "@/components/home/ToolsMarquee";
import { SimpleFinalCTA } from "@/components/home/SimpleFinalCTA";
import { WebsitesChapter } from "@/components/home/WebsitesChapter";
import { ServicesOpsFeature } from "@/components/services/ServicesOpsFeature";
import { ServicesSystem } from "@/components/services/ServicesSystem";
import { ServicesTabs } from "@/components/services/ServicesTabs";
import { ServiceGlyphStyle } from "@/components/services/ServiceGlyph";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { CTA_PRIMARY, SITE_URL } from "@/data/site";

const TITLE = "Services: Your AI Operations Team | Verdance";
const DESCRIPTION =
  "An Operations Team for your business: AI that answers every enquiry within 60 seconds, follows up and does the admin, in the tools you use.";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  openGraph: {
    images: ["/opengraph-image"],
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

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
  ],
};

/**
 * /services, in reading order: the Operations Team hero, the system
 * diagram ("One system, five helpers", the page's one bloom), the twelve
 * services as three tabs of four, websites, the tools wall, Ask your
 * business, and the close. The page's one Earth moment is the header art.
 *
 * Plain section titles only: the shared chapters below carry their home
 * page numbers (04, 06), which are hidden here. Muted text on this page is
 * raised to at least 4.5:1 on night.
 */
const CSS = `
.svp .chap-n { display: none; }
.svp .tm-cell { opacity: 1; --tm-c: #B4BCCB; }
.svp .tm-cell:hover { --tm-c: var(--brand); }
.svp .tm-sub { color: #9AA3B5; }
.svp .band-night, .svp .band-orbit { --color-ink-muted: #9AA3B5; }
.svp .ask-num { color: #9AA3B5; }
.svp .ask-q[aria-pressed="true"] { background: #2554D4; border-color: #2554D4; }
.sv-custom-in { display: grid; gap: 16px; }
@media (min-width: 1024px) { .sv-custom-in { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: end; gap: 48px; } }
`;

const SERVICE_NAMES: Record<string, string> = Object.fromEntries(Object.entries(SERVICE_BY_SLUG).map(([slug, c]) => [slug, c.name]));

export default function ServicesPage() {
  return (
    <div className="svp">
      <style>{CSS}</style>
      <ServiceGlyphStyle />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <ServicesOpsFeature />
      <ServicesSystem />

      <section id="all-services" className="band-orbit chapter-pad" aria-labelledby="custom-title" style={{ scrollMarginTop: "6rem" }}>
        <div className="container-wide">
          <div className="sv-custom-in" data-reveal="">
            <h2 className="h2" id="custom-title">
              Every build is custom.
            </h2>
            <p className="lead">Twelve parts we use most. We put them together around how you run.</p>
          </div>
          <ServicesTabs names={SERVICE_NAMES} />
        </div>
      </section>

      <WebsitesChapter />
      <ToolsMarquee still className="band-night" />
      <AskYourBusiness />
      <SimpleFinalCTA title={["Not sure where to start? We'll help you", "pick.", ""]} />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label={CTA_PRIMARY} />
    </div>
  );
}
