/**
 * Verdance mark concepts, drawn on a 48 x 48 grid.
 *
 *   flow   (chosen) Three streams, every channel, converging on one node:
 *          the single inbox. The outer two make the V; the shorter inner
 *          stream is what makes it ours. Same beams and hub as the orbit.
 *   signal A V whose right arm carries on as a short signal pulse: the
 *          reply going back out.
 *   orbit  A V inside an open orbit ring with one node riding it.
 *
 * Shared by the React mark, the favicon, the app icon and the OG image, so
 * every surface draws exactly the same shape.
 */
export type MarkConcept = "flow" | "signal" | "orbit";

export const MARK_DEFAULT: MarkConcept = "flow";

export const MARKS: Record<MarkConcept, { strokes: string[]; node: { cx: number; cy: number; r: number }; extra?: string[]; inner?: string }> = {
  flow: {
    strokes: ["M8.5 8.5C11 21 16.5 30.5 22.6 36.4", "M39.5 8.5C37 21 31.5 30.5 25.4 36.4"],
    node: { cx: 24, cy: 38.6, r: 3.8 },
    inner: "M24 13.5V29.5",
  },
  signal: {
    strokes: ["M8 10L22.6 37", "M25.4 37L31.5 25.5L34.5 31L38 19.5L40.5 24"],
    node: { cx: 24, cy: 38.6, r: 3.4 },
  },
  orbit: {
    strokes: ["M15 15.5L24 33L33 15.5", "M38.9 30.2A16 16 0 1 1 33.5 10.6"],
    node: { cx: 24, cy: 33.5, r: 3.1 },
    extra: ["M38.9 30.2h.01"],
  },
};

export const BRAND = {
  azure: "#4F8DFF",
  azureBright: "#86ABFF",
  azureDeep: "#2F6BEA",
  ink: "#F2EFE9",
  inkDark: "#0E0E10",
  canvas: "#0A0A0B",
};

/** The mark as a standalone SVG string (for icons, OG image, static files). */
export function markSvg(concept: MarkConcept, opts: { tone?: "dark" | "light"; tile?: boolean; size?: number } = {}) {
  const { tone = "dark", tile = false, size = 48 } = opts;
  const m = MARKS[concept];
  const top = tone === "dark" ? BRAND.azureBright : BRAND.azureDeep;
  const bottom = tone === "dark" ? BRAND.azure : "#1D44AE";
  const nodeFill = tone === "dark" ? BRAND.azure : BRAND.azureDeep;
  const bg = tile
    ? `<rect width="48" height="48" rx="11" fill="${tone === "dark" ? BRAND.canvas : "#F5F3EE"}"/><rect x="0.5" y="0.5" width="47" height="47" rx="10.5" fill="none" stroke="${tone === "dark" ? "rgba(255,255,255,0.12)" : "rgba(14,14,16,0.12)"}"/>`
    : "";
  const id = `g-${concept}-${tone}-${size}-${tile ? 1 : 0}`;
  const stroke = (d: string, w = 4.4, op = 1) =>
    `<path d="${d}" fill="none" stroke="url(#${id})" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`;
  const inner = m.inner ? stroke(m.inner, 3.2, 0.7) : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48"><defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="6" x2="0" y2="42"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>${bg}${m.strokes.map((d) => stroke(d)).join("")}${(m.extra ?? []).map((d) => stroke(d)).join("")}${inner}<circle cx="${m.node.cx}" cy="${m.node.cy}" r="${m.node.r}" fill="${nodeFill}"/></svg>`;
}
