// Builds the flight's web images from the masters (not committed):
//   rocket: PNG cut-outs from key-rocket.mjs (stack, upper, booster)
//   planet: NASA ISS photo iss072e340644 (public domain, docs/image-credits.md)
// Writes AVIF + WebP at fixed widths into public/rocket and public/flight.
// Usage: node scripts/assets/build-images.mjs <rocketPngDir> <iss072e340644_orig.jpg>
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const [rocketDir, planetSrc] = process.argv.slice(2);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const out = (...p) => path.join(root, "public", ...p);
fs.mkdirSync(out("rocket"), { recursive: true });
fs.mkdirSync(out("flight"), { recursive: true });

async function emit(input, dir, name, widths, { avif = 52, webp = 74, alpha = false } = {}) {
  for (const w of widths) {
    const base = sharp(input).resize({ width: w, withoutEnlargement: true });
    const a = await base.clone().avif({ quality: avif, effort: 6, chromaSubsampling: alpha ? "4:4:4" : "4:2:0" }).toBuffer();
    const b = await base.clone().webp({ quality: webp, alphaQuality: 90, effort: 6 }).toBuffer();
    fs.writeFileSync(out(dir, `${name}-${w}.avif`), a);
    fs.writeFileSync(out(dir, `${name}-${w}.webp`), b);
    console.log(`${dir}/${name}-${w}`, "avif", (a.length / 1024).toFixed(1) + "K", "webp", (b.length / 1024).toFixed(1) + "K");
  }
}

// rocket stages (grid width = image width)
for (const n of ["upper", "booster"]) await emit(path.join(rocketDir, `${n}.png`), "rocket", n, [360, 720], { alpha: true, avif: 60 });
await emit(path.join(rocketDir, "stack.png"), "rocket", "stack", [120, 240], { alpha: true, avif: 60 });

// planet: the night side with the atmosphere's glowing limb.
// Wide crop for landscape screens, a taller centre-right crop for phones.
const meta = await sharp(planetSrc).metadata();
const wide = await sharp(planetSrc).extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.width / 2.4) }).toBuffer();
await emit(wide, "flight", "planet", [1280, 1920, 3840], { avif: 48, webp: 70 });
const tallW = Math.round(meta.width * 0.46);
const tall = await sharp(planetSrc).extract({ left: Math.round(meta.width * 0.36), top: 0, width: tallW, height: Math.round(tallW * 1.1) }).toBuffer();
await emit(tall, "flight", "planet-m", [828, 1080], { avif: 48, webp: 70 });
