// Desktop crispness: Chromium at 1440 (DPR 2) and 2560 (DPR 1), the pad at
// rest (HD frame), cropped on the rocket's nose, next to the source frame.
// Usage: node scripts/crisp-desktop.mjs <baseUrl> <outDir> <source.mp4>
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import sharp from "sharp";
const [base, out, src] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", src, "-frames:v", "1", `${out}/source-f0.png`]);
const b = await chromium.launch();
for (const [w, h, dpr] of [[1440, 900, 2], [2560, 1440, 1]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  await p.goto(base + "/", { waitUntil: "load" });
  await p.waitForTimeout(6000);
  await p.evaluate(() => scrollTo(0, 2));
  await p.waitForTimeout(4000);
  const file = `${out}/desktop-${w}.png`;
  await p.screenshot({ path: file });
  const m = await sharp(file).metadata();
  await sharp(file).extract({ left: Math.round(m.width * 0.54), top: 0, width: Math.round(m.width * 0.16), height: Math.round(m.height * 0.42) }).toFile(`${out}/desktop-${w}-nose.png`);
  console.log(w, await p.evaluate(() => { const c = document.querySelector(".flm-canvas"); return `${c.width}x${c.height}`; }));
  await p.close();
}
await b.close();
const s = await sharp(`${out}/source-f0.png`).metadata();
await sharp(`${out}/source-f0.png`).extract({ left: Math.round(s.width * 0.55), top: 0, width: Math.round(s.width * 0.17), height: Math.round(s.height * 0.42) }).toFile(`${out}/source-nose.png`);
console.log("ok");
