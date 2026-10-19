import { chromium } from "playwright";
const [base, out, width = "1440", path = "/"] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +width, height: 900 }, deviceScaleFactor: 1 });
await p.goto(base + path, { waitUntil: "networkidle" });
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 400) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(150); }
await p.waitForTimeout(1500);
const n = await p.evaluate(() => document.querySelectorAll("main section").length || document.querySelectorAll("section").length);
const secs = await p.$$("main > section, main section");
let i = 0;
for (const s of secs) {
  const box = await s.boundingBox(); if (!box || box.height < 50) continue;
  await s.scrollIntoViewIfNeeded(); await p.waitForTimeout(900);
  await s.screenshot({ path: `${out}-${String(i++).padStart(2, "0")}.png` });
}
console.log("shots", i, "of", n);
await b.close();
