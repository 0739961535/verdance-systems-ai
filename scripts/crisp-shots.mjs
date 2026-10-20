// Crispness proof: WebKit, iPhone 15 Pro Max emulation at DPR 3. Full
// screenshots at the pad, mid-flight and orbit, plus 1:1 crops of the
// rocket's nose (V mark, fins) and the sky/edges.
// Usage: node scripts/crisp-shots.mjs <baseUrl> <outDir> <tag>
import { webkit, devices } from "playwright";
import fs from "node:fs";
import sharp from "sharp";
const [base, out, tag] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await webkit.launch();
const ctx = await b.newContext({ ...devices["iPhone 15 Pro Max"], viewport: { width: 430, height: 932 }, deviceScaleFactor: 3 });
const p = await ctx.newPage();
await p.goto(base + "/", { waitUntil: "load" });
await p.waitForTimeout(5000);
const g = await p.evaluate(() => { const el = document.querySelector(".flm"); return { top: el.getBoundingClientRect().top + scrollY, travel: el.offsetHeight - innerHeight }; });
for (const s of [0, 0.004, 0.25, 0.55]) {
  await p.evaluate((y) => scrollTo(0, y), Math.round(g.top + s * g.travel));
  await p.waitForTimeout(3500);
  const file = `${out}/${tag}-p${String(Math.round(s * 1000)).padStart(3, "0")}.png`;
  await p.screenshot({ path: file });
  const m = await sharp(file).metadata();
  // 1:1 crop of the upper middle (nose and V on the pad), and the top-left sky
  await sharp(file).extract({ left: Math.round(m.width * 0.25), top: Math.round(m.height * 0.02), width: Math.round(m.width * 0.5), height: Math.round(m.height * 0.3) }).toFile(file.replace(".png", "-nose.png"));
  await sharp(file).extract({ left: 0, top: Math.round(m.height * 0.1), width: Math.round(m.width * 0.4), height: Math.round(m.height * 0.25) }).toFile(file.replace(".png", "-sky.png"));
}
await b.close();
console.log("ok");
