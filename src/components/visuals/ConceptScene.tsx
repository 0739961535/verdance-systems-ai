import type { CSSProperties } from "react";

/**
 * An empty concept scene for a concept demo (council rule, 21 Oct 2026:
 * no people, no readable text, always captioned "Concept demo").
 * The box has a fixed aspect ratio or height from its parent (CLS 0); the
 * image is lazy (AVIF, WebP fallback) under a fine grain.
 */

export type SceneId = "venue" | "warehouse" | "clinic";

export const SCENES: Record<SceneId, { alt: string; pos: string }> = {
  venue: { alt: "An empty wine estate venue at dusk, long tables set with candles and glasses, vineyards through the windows.", pos: "50% 62%" },
  warehouse: { alt: "An empty warehouse aisle in soft light, pallets of boxes on blue racking.", pos: "50% 55%" },
  clinic: { alt: "An empty clinic reception in daylight: a curved oak desk, armchairs and plants.", pos: "55% 50%" },
};

/** Demo or page id to its scene. */
export const SCENE_FOR: Record<string, SceneId> = {
  venue: "venue",
  wholesale: "warehouse",
  clinic: "clinic",
  "wedding-venues": "venue",
  "lodges-and-venue-groups": "venue",
  "private-clinics": "clinic",
  "ecommerce-product-businesses": "warehouse",
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
`;

export function ConceptScene({ id, className = "", style, sizes = "(min-width: 1024px) 1200px, 100vw" }: { id: SceneId; className?: string; style?: CSSProperties; sizes?: string }) {
  const s = SCENES[id];
  return (
    <figure className={`csc ${className}`} style={style}>
      <style>{CSS}</style>
      <picture>
        <source type="image/avif" srcSet={`/site/${id}-720.avif 720w, /site/${id}-1344.avif 1344w`} sizes={sizes} />
        <source type="image/webp" srcSet={`/site/${id}-720.webp 720w, /site/${id}-1344.webp 1344w`} sizes={sizes} />
        <img src={`/site/${id}-1344.webp`} alt={s.alt} width={1344} height={752} loading="lazy" decoding="async" style={{ objectPosition: s.pos }} />
      </picture>
      <figcaption>Concept demo</figcaption>
    </figure>
  );
}

/** A full-width scene band for an industry page; renders nothing when the page has no scene. */
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
