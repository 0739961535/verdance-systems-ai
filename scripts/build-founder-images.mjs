// Daniel's real photos (his pick, 21 Oct 2026) into public/people/.
//   node scripts/build-founder-images.mjs "<growth-lab/founder-photos folder>"
// - portrait (4:5) at 400 and 800: the one founder portrait used sitewide
// - face (1:1, cropped from the same portrait) at 96 and 192: the booking card face
// - booking (16:9, Daniel with his crew at golden hour) at 800 and 1600,
//   cropped so Daniel sits large near the centre and the crew stays whole
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(root, "public", "people");
fs.mkdirSync(out, { recursive: true });
const sizes = {};
async function emit(file, name, widths, extract) {
  for (const w of widths) {
    let img = sharp(path.join(src, file)).rotate();
    if (extract) img = img.extract(extract);
    img = img.resize({ width: w });
    const a = await img.clone().avif({ quality: 55, effort: 6 }).toBuffer();
    const b = await img.clone().webp({ quality: 76, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(out, `${name}-${w}.avif`), a);
    fs.writeFileSync(path.join(out, `${name}-${w}.webp`), b);
    sizes[`${name}-${w}`] = `${Math.round(a.length / 1024)}KB avif, ${Math.round(b.length / 1024)}KB webp`;
  }
}
await emit("1-founder-visionary_4x5.jpg", "daniel-portrait", [400, 800]);
await emit("1-founder-visionary_4x5.jpg", "daniel-face", [96, 192], { left: 300, top: 100, width: 1100, height: 1100 });
await emit("booking-wide_16x9.jpg", "daniel-booking", [800, 1600], { left: 160, top: 0, width: 3680, height: 2070 });
console.log(JSON.stringify(sizes, null, 1));
