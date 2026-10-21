import type { CSSProperties } from "react";

/**
 * Empty scenes for the concept demos and the industry pages (council rule,
 * 21 Oct 2026: no people, no readable text or logos). Built by
 * scripts/build-scene-images.mjs with one grade for all.
 *
 * One treatment everywhere: a fixed box per context (CLS 0), lazy AVIF with
 * WebP fallback, a fine grain, a dark fade at the bottom under the caption.
 * Captions: "Concept demo" on /portfolio, "Illustrative scene" on industry
 * pages. Contexts: the portfolio panel (fixed height, the same for every
 * demo), the industry band (4:3 on phones, 21:9 from 768px) and the
 * /industries card thumbnail (16:9).
 */

export type SceneId =
  | "venue" | "warehouse" | "clinic" | "lodge" | "builder-site" | "real-estate" | "legal"
  | "aesthetics" | "fitness" | "restaurant" | "education" | "home-services" | "automotive";

export const SCENES: Record<SceneId, { alt: string; pos: string }> = {
  venue: { alt: "An empty wine estate venue at dusk, long tables set with candles and glasses, vineyards through the windows.", pos: "50% 62%" },
  warehouse: { alt: "An empty warehouse aisle in soft light, pallets of boxes on blue racking.", pos: "50% 55%" },
  clinic: { alt: "An empty clinic reception in daylight: a curved oak desk, armchairs and plants.", pos: "55% 50%" },
  lodge: { alt: "An empty safari lodge suite at sunset, the bed made and the deck open to a waterhole.", pos: "60% 55%" },
  "builder-site": { alt: "A new house under construction at sunset, scaffolding up, plans and a hard hat on a trestle table.", pos: "40% 60%" },
  "real-estate": { alt: "An empty modern home at dusk: a double-height living room open to a lit pool.", pos: "50% 55%" },
  legal: { alt: "An empty boardroom at dusk, folders and water glasses set out, city lights through the windows.", pos: "40% 60%" },
  aesthetics: { alt: "An empty treatment room in soft daylight, the bed made with a navy throw.", pos: "45% 60%" },
  fitness: { alt: "An empty gym at dusk: racks of kettlebells and a row of rowing machines by the windows.", pos: "50% 55%" },
  restaurant: { alt: "An empty restaurant before service, tables laid and the open kitchen lit behind.", pos: "60% 55%" },
  education: { alt: "An empty training room in daylight, laptops closed on long desks and a blank whiteboard.", pos: "60% 55%" },
  "home-services": { alt: "A trade van open at the kerb at sunset, its shelves stocked with pipes and fittings.", pos: "50% 45%" },
  automotive: { alt: "An empty car showroom at dusk, two saloons on a polished floor.", pos: "45% 55%" },
};

/** Demo id or industry page slug to its scene. */
export const SCENE_FOR: Record<string, SceneId> = {
  // portfolio concept demos
  venue: "venue",
  wholesale: "warehouse",
  builder: "builder-site",
  clinic: "clinic",
  // industry pages
  "ecommerce-product-businesses": "warehouse",
  "wedding-venues": "venue",
  "lodges-and-venue-groups": "lodge",
  "home-services-contractors": "builder-site",
  "private-clinics": "clinic",
  "estate-agents": "real-estate",
  trades: "home-services",
  automotive: "automotive",
  "real-estate-property": "real-estate",
  "legal-professional-services": "legal",
  "medical-wellness": "clinic",
  "beauty-aesthetics": "aesthetics",
  "fitness-gyms": "fitness",
  "restaurants-hospitality": "restaurant",
  "education-coaching": "education",
};

const CSS = `
:where(.csc) { margin: 0; }
.csc { position: relative; overflow: hidden; border-radius: 18px; background: #0B1328; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08); isolation: isolate; }
.csc picture, .csc img { display: block; width: 100%; height: 100%; }
.csc img { object-fit: cover; }
.csc::before { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.08; background-image: var(--grain); background-size: 160px 160px; }
.csc::after { content: ""; position: absolute; inset: auto 0 0 0; height: 56px; z-index: 1; pointer-events: none; background: linear-gradient(180deg, transparent, rgba(6,11,26,0.75)); }
.csb { padding: 0 0 56px; }
@media (min-width: 1024px) { .csb { padding-bottom: 88px; } }
.csb .csc { aspect-ratio: 4 / 3; }
@media (min-width: 768px) { .csb .csc { aspect-ratio: 21 / 9; border-radius: 24px; } }
.csc figcaption { position: absolute; z-index: 2; left: 12px; bottom: 10px; display: inline-flex; align-items: center; min-height: 24px; padding: 0 10px; border-radius: 999px;
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: #E9EDF7; background: rgba(6,11,26,0.72); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16); }
.cst { position: relative; display: block; overflow: hidden; aspect-ratio: 16 / 9; border-radius: 12px; background: #0B1328; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08); isolation: isolate; }
.cst picture, .cst img { display: block; width: 100%; height: 100%; }
.cst img { object-fit: cover; transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.cst::after { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.08; background-image: var(--grain); background-size: 160px 160px; }
@media (hover: hover) and (prefers-reduced-motion: no-preference) { .group:hover .cst img { transform: scale(1.04); } }
`;

export function ConceptScene({
  id,
  className = "",
  style,
  sizes = "(min-width: 1024px) 1200px, 100vw",
}: {
  id: SceneId;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
}) {
  const s = SCENES[id];
  return (
    <figure className={`csc ${className}`} style={style}>
      <style>{CSS}</style>
      <picture>
        <source type="image/avif" srcSet={`/site/${id}-720.avif 720w, /site/${id}-1344.avif 1344w`} sizes={sizes} />
        <source type="image/webp" srcSet={`/site/${id}-720.webp 720w, /site/${id}-1344.webp 1344w`} sizes={sizes} />
        <img src={`/site/${id}-1344.webp`} alt={s.alt} width={1344} height={752} loading="lazy" decoding="async" style={{ objectPosition: s.pos }} />
      </picture>
    </figure>
  );
}

/** A 16:9 thumbnail for an /industries card (decorative: the card names the industry). */
export function SceneThumb({ slug, className = "" }: { slug: string; className?: string }) {
  const id = SCENE_FOR[slug];
  if (!id) return null;
  const sizes = "(min-width: 1280px) 220px, (min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw";
  return (
    <span className={`cst ${className}`} aria-hidden>
      <style>{CSS}</style>
      <picture>
        <source type="image/avif" srcSet={`/site/${id}-t400.avif 400w, /site/${id}-t800.avif 800w`} sizes={sizes} />
        <img src={`/site/${id}-t400.webp`} srcSet={`/site/${id}-t400.webp 400w, /site/${id}-t800.webp 800w`} sizes={sizes} alt="" width={800} height={450} loading="lazy" decoding="async" />
      </picture>
    </span>
  );
}

/** A full-width scene band for an industry page, placed after the page's demo. */
export function SceneBand({ slug, bg = "bg-canvas" }: { slug: string; bg?: string }) {
  const id = SCENE_FOR[slug];
  if (!id) return null;
  return (
    <div className={`csb ${bg}`}>
      <div className="container-wide">
        <ConceptScene id={id} sizes="(min-width: 1280px) 1200px, 92vw" />
      </div>
    </div>
  );
}
