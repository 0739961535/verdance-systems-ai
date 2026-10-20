// Builds the bloom hero's scroll-scrubbed frames from the 4K flower film.
//   node scripts/build-bloom-frames.mjs "<path to bloom-4k.mp4>"
// A 2000x2000 crop centred on the flower (the stem runs off the bottom).
// Sets: d (desktop, 150 frames, 960px WebP), m (phone, 120 frames, 640px
// WebP), dh / mh (HD at rest, 1600 / 1080px AVIF), and a small first frame
// (poster) for the LCP. Writes src/components/home/bloom/bloom-manifest.json.
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(root, "public", "bloom");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bloom-"));
const CROP = "crop=2000:2000:902:152";
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", src, "-vf", `${CROP},scale=1600:1600:flags=lanczos`, "-q:v", "1", path.join(tmp, "%04d.jpg")]);
const all = fs.readdirSync(tmp).filter((f) => f.endsWith(".jpg")).sort();
const total = all.length;
const pick = (n) => Array.from({ length: n }, (_, k) => Math.round((k * (total - 1)) / (n - 1)));
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
const hash = crypto.createHash("sha1");
const pad = (i) => String(i).padStart(3, "0");
async function set(prefix, n, low, hi) {
  const idx = pick(n);
  let bytes = 0;
  for (let k = 0; k < idx.length; k += 4) {
    await Promise.all(idx.slice(k, k + 4).map(async (fi, j) => {
      const f = path.join(tmp, all[fi]);
      const a = await sharp(f).resize(low).webp({ quality: 74, effort: 5 }).toBuffer();
      const b = await sharp(f).resize(hi).avif({ quality: 56, effort: 4 }).toBuffer();
      fs.writeFileSync(path.join(out, `${prefix}-${pad(k + j)}.webp`), a);
      fs.writeFileSync(path.join(out, `${prefix}h-${pad(k + j)}.avif`), b);
      hash.update(a);
      bytes += a.length + b.length;
    }));
  }
  console.log(prefix, n, (bytes / 1048576).toFixed(1) + " MB");
}
await set("d", 150, 960, 1600);
await set("m", 120, 640, 1080);
// the first frame, small and fast (the LCP image)
const first = path.join(tmp, all[0]);
for (const [w, name] of [[640, "first-640"], [960, "first-960"]]) {
  fs.writeFileSync(path.join(out, `${name}.avif`), await sharp(first).resize(w).avif({ quality: 50 }).toBuffer());
  fs.writeFileSync(path.join(out, `${name}.webp`), await sharp(first).resize(w).webp({ quality: 72 }).toBuffer());
}
const manifest = { v: hash.digest("hex").slice(0, 10), size: 1, desktop: { count: 150, low: 960, hi: 1600 }, phone: { count: 120, low: 640, hi: 1080 } };
fs.writeFileSync(path.join(root, "src/components/home/bloom/bloom-manifest.json"), JSON.stringify(manifest) + "\n");
fs.rmSync(tmp, { recursive: true, force: true });
console.log(manifest);
