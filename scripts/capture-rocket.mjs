// Captures the hero rocket and the flight stages at 390 and 1440, plus a scroll video.
// Usage: node scripts/capture-rocket.mjs <baseUrl> <outDir> <prefix>
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [base = "http://localhost:3100", out = "/tmp/rocket", prefix = "after"] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const STAGES = [
  ["1-launch", 0.03],
  ["2-clouds", 0.2],
  ["3-ascent", 0.4],
  ["4-pierce", 0.481],
  ["5-separation", 0.7],
  ["6-burst", 0.872],
  ["7-orbit", 0.97],
];
const errors = [];
const browser = await chromium.launch();
for (const [w, h, mobile] of [[390, 844, true], [1440, 900, false]]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 2,
    isMobile: mobile,
    hasTouch: mobile,
    recordVideo: { dir: out, size: { width: mobile ? 390 : 1440, height: mobile ? 844 : 900 } },
  });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${w} ${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => errors.push(`${w} pageerror: ${e.message}`));
  await page.goto(base + "/", { waitUntil: "load" });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: path.join(out, `${prefix}-hero-${w}.png`) });
  const rk = await page.locator(".rk").boundingBox();
  if (rk) {
    await page.screenshot({ path: path.join(out, `${prefix}-hero-rocket-zoom-${w}.png`), clip: { x: rk.x - 60, y: Math.max(0, rk.y - 30), width: rk.width + 120, height: rk.height + 90 } });
  }
  const geo = await page.evaluate(() => {
    const el = document.querySelector(".fl");
    const r = el.getBoundingClientRect();
    return { top: r.top + scrollY, travel: el.offsetHeight - innerHeight };
  });
  for (const [name, p] of STAGES) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(geo.top + geo.travel * p));
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(out, `${prefix}-flight-${name}-${w}.png`) });
    const ship = await page.locator(".fl-ship-wrap").boundingBox();
    if (ship) {
      const cx = ship.x + ship.width / 2, cy = ship.y + ship.width * 1.6;
      const s = mobile ? 260 : 340;
      await page.screenshot({ path: path.join(out, `${prefix}-flight-${name}-zoom-${w}.png`), clip: { x: Math.max(0, cx - s / 2), y: Math.max(0, cy - s * 0.6), width: s, height: s * 1.2 } });
    }
  }
  // scroll video: top of page through the whole flight
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  const end = geo.top + geo.travel + 200;
  for (let y = 0; y <= end; y += mobile ? 16 : 22) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(16);
  }
  await page.waitForTimeout(1200);
  const v = page.video();
  await ctx.close();
  fs.renameSync(await v.path(), path.join(out, `${prefix}-scroll-${w}.webm`));
}
// reduced motion still
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
const page = await ctx.newPage();
await page.goto(base + "/", { waitUntil: "load" });
await page.locator(".fl").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(out, `${prefix}-reduced-390.png`) });
await browser.close();
fs.writeFileSync(path.join(out, `${prefix}-console.txt`), errors.join("\n") || "no console errors or warnings");
console.log(errors.length ? errors.join("\n") : "no console errors or warnings");
