// Full home page on a phone in WebKit (the iOS Safari engine): top to
// footer, recorded, dark and light; screenshots every screen; and an overlap
// check inside the flight (sticky bar / chat bubble vs the words and button).
// Usage: node scripts/fullpage-webkit.mjs <baseUrl> <outDir> [dark,light] [390]
// (build with LOCAL_HTTP=1 for http://localhost)
import { webkit, devices } from "playwright";
import fs from "node:fs";

const [base = "http://localhost:3100", out = "/tmp/fullpage-webkit", schemes = "dark,light", w = "390"] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const width = Number(w);
const vp = { width, height: Math.round(width * 2.164) };
const b = await webkit.launch();
const report = {};
for (const scheme of schemes.split(",")) {
  const ctx = await b.newContext({ ...devices["iPhone 15 Pro Max"], viewport: vp, screen: vp, colorScheme: scheme, recordVideo: { dir: out, size: vp } });
  await ctx.route(/_vercel\//, (r) => r.abort());
  const p = await ctx.newPage();
  const logs = [];
  p.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource|_vercel/.test(m.text())) logs.push(m.text().slice(0, 160)); });
  p.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));
  await p.goto(base + "/", { waitUntil: "load" });
  await p.waitForTimeout(2500);
  const geo = await p.evaluate(() => { const el = document.querySelector(".flm"); return { top: el.getBoundingClientRect().top + scrollY, travel: el.offsetHeight - innerHeight, end: document.documentElement.scrollHeight - innerHeight }; });
  const checks = [];
  const checkAt = [0.2, 0.5, 0.85, 0.98].map((s) => Math.round(geo.top + s * geo.travel));
  let shot = 0;
  for (let y = 0; y <= geo.end; y += 16) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(16);
    if (checkAt.length && y >= checkAt[0]) {
      checkAt.shift();
      await p.waitForTimeout(700);
      checks.push(await p.evaluate(() => {
        const vis = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return cs.visibility !== "hidden" && +cs.opacity > 0.05 && r.top < innerHeight && r.bottom > 0 ? r : null; };
        const bar = vis(document.querySelector('nav[data-cta-location="sticky_mobile"]'));
        const chat = vis(document.querySelector("chat-widget"));
        const words = [...document.querySelectorAll(".flm .fl-step")].map(vis).filter(Boolean);
        const hit = (a, c) => a && c && a.left < c.right && a.right > c.left && a.top < c.bottom && a.bottom > c.top;
        return { barShown: !!bar, chatShown: !!chat, barCoversWords: words.some((r) => hit(bar, r)), chatCoversWords: words.some((r) => hit(chat, r)) };
      }));
    }
    if (y >= shot * vp.height) {
      await p.waitForTimeout(300);
      await p.screenshot({ path: `${out}/full-page-${width}-${scheme}-${String(shot).padStart(2, "0")}.png` });
      shot++;
    }
  }
  await p.waitForTimeout(800);
  const video = p.video();
  await ctx.close();
  fs.renameSync(await video.path(), `${out}/full-page-${width}-${scheme}.webm`);
  report[`${width}-${scheme}`] = { pageHeight: geo.end + vp.height, screens: shot, flightChecks: checks, errors: logs };
}
await b.close();
console.log(JSON.stringify(report, null, 1));
