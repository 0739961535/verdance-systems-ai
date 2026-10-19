// Flight proof: frames through the pinned story at 390 and 1440, a contact
// sheet per width, a full-page scroll recording, a frame-timing test with
// the CPU slowed 4x, console/CSP errors, and the reduced-motion still.
// Usage: node scripts/flight-frames.mjs <baseUrl> <outDir> [quick]
import { chromium } from "playwright";
import fs from "node:fs";

const [base = "http://localhost:3123", out = "/tmp/flight", quick] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const STEPS = [0, 0.08, 0.16, 0.24, 0.3, 0.34, 0.4, 0.46, 0.55, 0.62, 0.7, 0.8, 0.9, 0.97, 1];
const b = await chromium.launch();
const report = {};

for (const scheme of (process.env.SCHEMES || "dark").split(","))
for (const width of (process.env.WIDTHS || "390,1440").split(",").map(Number)) {
  const tag = `${width}-${scheme}`;
  const mobile = width < 768;
  const vp = { width, height: mobile ? 844 : 900 };
  const ctx = await b.newContext({
    colorScheme: scheme, viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile,
    ...(quick ? {} : { recordVideo: { dir: out, size: vp } }),
  });
  if (process.env.BLOCK_WIDGET) await ctx.route(/leadconnectorhq|msgsndr/, (r) => r.abort());
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error" && !/_vercel\/|404 \(Not Found\)/.test(m.text())) errs.push(m.text()); });
  p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);

  const geo = await p.evaluate(() => {
    const el = document.querySelector(".fl");
    const r = el.getBoundingClientRect();
    return { top: r.top + scrollY, travel: el.offsetHeight - innerHeight };
  });
  const frames = [];
  for (const s of STEPS) {
    await p.evaluate((y) => window.scrollTo(0, y), Math.round(geo.top + s * geo.travel));
    await p.waitForTimeout(Number(process.env.SETTLE || 1000)); // scrubbed film eases into place
    const f = `${out}/flight-${tag}-${String(Math.round(s * 100)).padStart(3, "0")}.png`;
    await p.screenshot({ path: f });
    frames.push({ s, f });
  }

  // layout shift over the whole visit
  const cls = await p.evaluate(() => new Promise((res) => {
    let v = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) v += e.value; }).observe({ type: "layout-shift", buffered: true });
    setTimeout(() => res(+v.toFixed(4)), 300);
  }));

  if (!quick) {
    // recording: from the top, steady scroll through the hero and the flight, into "watch it work"
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(800);
    const end = geo.top + geo.travel + vp.height * 0.9;
    const stepPx = mobile ? 14 : 18;
    for (let y = 0; y < end; y += stepPx) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(16); }
    await p.waitForTimeout(800);
  }

  // frame timing with 4x CPU slowdown, scrolling through the flight, in a
  // fresh context with no video capture (recording itself costs frames).
  const video = quick ? null : p.video();
  await ctx.close();
  if (video) fs.renameSync(await video.path(), `${out}/scroll-${tag}.webm`);
  const tctx = await b.newContext({ colorScheme: scheme, viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  const tp = await tctx.newPage();
  await tp.goto(base + "/", { waitUntil: "networkidle" });
  await tp.waitForTimeout(1500);
  const cdp = await tctx.newCDPSession(tp);
  await tp.evaluate((y) => window.scrollTo(0, y), geo.top);
  await tp.waitForTimeout(600);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await tp.evaluate(() => {
    window.__ft = [];
    let last = performance.now();
    const loop = (t) => { window.__ft.push(t - last); last = t; if (window.__ft.length < 240) requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  });
  for (let i = 0; i < 120; i++) { await tp.evaluate((yy) => window.scrollBy(0, yy), Math.round(geo.travel / 120)); await tp.waitForTimeout(16); }
  await tp.waitForTimeout(600);
  const ft = await tp.evaluate(() => window.__ft.slice(1));
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  const sorted = [...ft].sort((a, c) => a - c);
  report[tag] = {
    frames: ft.length,
    medianMs: +sorted[Math.floor(sorted.length / 2)].toFixed(1),
    p95Ms: +sorted[Math.floor(sorted.length * 0.95)].toFixed(1),
    over33ms: ft.filter((v) => v > 33.4).length,
    over50ms: ft.filter((v) => v > 50).length,
    maxMs: +sorted[sorted.length - 1].toFixed(1),
    cls,
    errors: errs,
  };
  await tctx.close();

  // contact sheet
  const sheet = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  const imgs = frames.map(({ s, f }) => `<figure><img src="data:image/png;base64,${fs.readFileSync(f).toString("base64")}"><figcaption>flight ${Math.round(s * 100)}%</figcaption></figure>`).join("");
  await sheet.setContent(`<style>body{margin:0;padding:20px;background:#111;font:13px system-ui;color:#bbb}main{display:grid;grid-template-columns:repeat(${mobile ? 7 : 4},1fr);gap:12px}img{width:100%;display:block;border-radius:6px}figure{margin:0}figcaption{padding:4px 0}</style><main>${imgs}</main>`);
  await sheet.waitForTimeout(300);
  await sheet.screenshot({ path: `${out}/sheet-${tag}.png`, fullPage: true });
  await sheet.close();

  // reduced motion still
  const rctx = await b.newContext({ colorScheme: scheme, viewport: vp, deviceScaleFactor: mobile ? 2 : 1, reducedMotion: "reduce" });
  const rp = await rctx.newPage();
  const rerr = [];
  rp.on("pageerror", (e) => rerr.push(e.message));
  await rp.goto(base + "/", { waitUntil: "networkidle" });
  await rp.evaluate(() => document.querySelector(".fl").scrollIntoView());
  await rp.waitForTimeout(400);
  await rp.screenshot({ path: `${out}/reduced-${tag}.png`, fullPage: false });
  const h = await rp.evaluate(() => document.querySelector(".fl").offsetHeight);
  await rp.screenshot({ path: `${out}/reduced-${tag}-full.png`, clip: { x: 0, y: await rp.evaluate(() => document.querySelector(".fl").getBoundingClientRect().top + scrollY), width, height: h } , fullPage: true });
  report[tag].reduced = { height: h, errors: rerr };
  await rctx.close();
}
await b.close();
fs.writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
