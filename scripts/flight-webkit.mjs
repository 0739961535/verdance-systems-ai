// Flight proof in WebKit (the iOS Safari engine): iPhone emulation (touch,
// DPR 3), from the top of the page, a steady scroll through the flight,
// recorded. Logs console errors/warnings, non-image film responses, when the
// first film frame is drawn, and rAF frame times while scrolling.
// Usage: node scripts/flight-webkit.mjs <baseUrl> <outDir> [dark,light] [390]
// (build with LOCAL_HTTP=1: WebKit upgrades http://localhost to https otherwise)
import { webkit, devices } from "playwright";
import fs from "node:fs";

const [base = "http://localhost:3100", out = "/tmp/flight-webkit", schemes = "dark,light", w = "390"] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const width = Number(w);
const vp = { width, height: Math.round(width * 2.164) };
const b = await webkit.launch();
const report = {};
for (const scheme of schemes.split(",")) {
  const ctx = await b.newContext({
    ...devices["iPhone 15 Pro Max"], viewport: vp, screen: vp, colorScheme: scheme,
    recordVideo: { dir: out, size: vp },
  });
  await ctx.route(/leadconnectorhq|msgsndr|_vercel\//, (r) => r.abort());
  const p = await ctx.newPage();
  const logs = [];
  const film = { requested: 0, notImage: [] };
  p.on("console", (m) => { if (["error", "warning"].includes(m.type()) && !/Failed to load resource/.test(m.text())) logs.push(`${m.type()}: ${m.text()}`); });
  p.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));
  p.on("response", (r) => {
    if (!/\/flight\/film\//.test(r.url())) return;
    film.requested++;
    const t = r.headers()["content-type"] || "";
    if (r.status() !== 200 || !t.startsWith("image/")) film.notImage.push(`${r.status()} ${t} ${r.url()}`);
  });
  const t0 = Date.now();
  await p.goto(base + "/", { waitUntil: "load" });
  // no interaction: the film must get ready on its own
  const drawnAt = await p.waitForFunction(() => document.querySelector(".flm")?.hasAttribute("data-film"), null, { timeout: 15000 })
    .then(() => Date.now() - t0).catch(() => null);
  const posterOk = await p.evaluate(() => { const i = document.querySelector(".flm-poster img"); return !!(i.complete && i.naturalWidth); });
  await p.screenshot({ path: `${out}/webkit-${width}-${scheme}-load.png` });
  const geo = await p.evaluate(() => { const el = document.querySelector(".flm"); return { top: el.getBoundingClientRect().top + scrollY, travel: el.offsetHeight - innerHeight }; });
  await p.evaluate(() => { window.__ft = []; let last = performance.now(); const loop = (t) => { window.__ft.push(t - last); last = t; requestAnimationFrame(loop); }; requestAnimationFrame(loop); });
  const end = geo.top + geo.travel + vp.height * 0.6;
  const shots = [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1].map((s) => Math.round(geo.top + s * geo.travel));
  for (let y = 0; y < end; y += 14) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(16);
    if (shots.length && y >= shots[0]) {
      const at = shots.shift();
      await p.waitForTimeout(700);
      await p.screenshot({ path: `${out}/webkit-${width}-${scheme}-${String(Math.round(((at - geo.top) / geo.travel) * 100)).padStart(3, "0")}.png` });
    }
  }
  await p.waitForTimeout(800);
  // frame timing: a second pass through the flight with no screenshots
  await p.evaluate((y) => window.scrollTo(0, y), geo.top);
  await p.waitForTimeout(800);
  await p.evaluate(() => (window.__ft = []));
  for (let y = geo.top; y < geo.top + geo.travel; y += 14) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(16); }
  const ft = (await p.evaluate(() => window.__ft)).slice(1).sort((a, c) => a - c);
  const video = p.video();
  await ctx.close();
  fs.renameSync(await video.path(), `${out}/webkit-scroll-${width}-${scheme}.webm`);
  report[`${width}-${scheme}`] = {
    firstFrameDrawnMs: drawnAt, posterLoaded: posterOk, filmRequests: film.requested, notImage: film.notImage,
    frames: ft.length, maxMs: +ft[ft.length - 1].toFixed(1), medianMs: +ft[Math.floor(ft.length / 2)].toFixed(1), p95Ms: +ft[Math.floor(ft.length * 0.95)].toFixed(1), over50ms: ft.filter((v) => v > 50).length,
    logs,
  };
}
await b.close();
fs.writeFileSync(`${out}/webkit-report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
