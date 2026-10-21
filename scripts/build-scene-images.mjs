// Industry and concept scenes in public/site/ (council rule, 21 Oct 2026:
// empty spaces only, no people, no readable text or logos).
//   node scripts/build-scene-images.mjs "<website-preview/site-images folder>"
// Every scene gets the same grade (a little less saturation, a little more
// contrast) and two sets:
//   <name>-720 / -1344   full frame, for bands and the portfolio panel
//   <name>-t400 / -t800  16:9 thumbnails for the /industries cards (under 30KB)
// 200% checks (21 Oct): home-services keeps only the right half (the spanners
// on the left are melted); automotive has four invented badges patched out
// with neighbouring bonnet and grille pixels; the framed picture in lodge is
// blurred because it read as a figure. ecommerce-dispatch was not in the set,
// so e-commerce uses warehouse.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(root, "public", "site");
fs.mkdirSync(out, { recursive: true });
const sizes = {};

/** Copy a box from dx pixels to the side over itself, feathered. */
async function patch(buf, [x, y, w, h, dx]) {
  const pad = 4, W = w + pad * 2, H = h + pad * 2;
  const piece = await sharp(buf).extract({ left: x - pad + dx, top: y - pad, width: W, height: H }).ensureAlpha().raw().toBuffer();
  const mask = await sharp(Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#000"/><rect x="${pad}" y="${pad}" width="${w}" height="${h}" rx="3" fill="#fff"/></svg>`))
    .blur(2).extractChannel(0).raw().toBuffer();
  for (let i = 0; i < W * H; i++) piece[i * 4 + 3] = mask[i];
  return sharp(buf).composite([{ input: piece, raw: { width: W, height: H, channels: 4 }, left: x - pad, top: y - pad }]).png().toBuffer();
}

/** Blur a box in place. */
async function soften(buf, { left, top, width, height }, sigma = 7) {
  const piece = await sharp(buf).extract({ left, top, width, height }).blur(sigma).toBuffer();
  return sharp(buf).composite([{ input: piece, left, top }]).png().toBuffer();
}

const SCENES = {
  venue: {}, warehouse: {}, clinic: {}, lodge: {}, "builder-site": {}, "real-estate": {}, legal: {},
  aesthetics: {}, fitness: {}, restaurant: {}, education: {},
  "home-services": { extract: { left: 600, top: 0, width: 744, height: 752 } },
  automotive: { patches: [[577, 412, 24, 13, -32], [580, 443, 42, 21, -48], [974, 371, 17, 11, -22], [980, 393, 24, 11, -30]] },
};
SCENES.lodge.soften = { left: 168, top: 232, width: 82, height: 82 };

for (const [name, o] of Object.entries(SCENES)) {
  let buf = await sharp(path.join(src, `${name}.png`)).png().toBuffer();
  for (const p of o.patches ?? []) buf = await patch(buf, p);
  if (o.soften) buf = await soften(buf, o.soften);
  if (o.extract) buf = await sharp(buf).extract(o.extract).png().toBuffer();
  buf = await sharp(buf).modulate({ saturation: 0.9 }).linear(1.05, -5).png().toBuffer();
  const { width, height } = await sharp(buf).metadata();
  const sets = [[720, null], [1344, null]];
  // 16:9 thumbnail from the centre
  const th = Math.min(height, Math.floor((width * 9) / 16)), tw = Math.min(width, Math.floor((th * 16) / 9));
  const thumb = { left: Math.round((width - tw) / 2), top: Math.round((height - th) / 2), width: tw, height: th };
  for (const [w, ext] of [...sets, [400, thumb], [800, thumb]]) {
    let img = sharp(buf);
    if (ext) img = img.extract(ext);
    img = img.resize({ width: w });
    const tag = ext ? `t${w}` : `${w}`;
    const aq = ext ? 44 : 50;
    const a = await img.clone().avif({ quality: aq, effort: 6 }).toBuffer();
    const b = await img.clone().webp({ quality: ext ? 66 : 72, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(out, `${name}-${tag}.avif`), a);
    fs.writeFileSync(path.join(out, `${name}-${tag}.webp`), b);
    sizes[`${name}-${tag}`] = `${Math.round(a.length / 1024)}/${Math.round(b.length / 1024)}KB`;
  }
}
console.log(JSON.stringify(sizes));
