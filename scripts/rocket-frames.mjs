// Rocket flight proof: frame sequences at 390 and 1440 (scroll positions),
// a contact sheet per width, a scroll recording (down then back up), and a
// frame-timing test with the CPU slowed 4x to stand in for a mid-range phone.
// Usage: node scripts/rocket-frames.mjs <baseUrl> <outDir>
import { chromium } from "playwright";
import fs from "node:fs";

const [base = "http://localhost:3123", out = "/tmp/rocket"] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const STEPS = [0, 15, 30, 45, 60, 75, 90, 110, 130, 160, 200, 260];
const b = await chromium.launch();
const report = {};

for (const width of [390, 1440]) {
  const mobile = width < 768;
  const vp = { width, height: mobile ? 844 : 900 };
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, recordVideo: { dir: out, size: vp } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error" && !/_vercel\/|404 \(Not Found\)/.test(m.text())) errs.push(m.text()); });
  p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(2600); // let the load lift-off finish

  // overlap check: the rocket's box must never intersect the h1 or the button
  const frames = [];
  let overlap = false;
  for (const y of STEPS) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(140);
    const hit = await p.evaluate(() => {
      const r = document.querySelector(".rk-ship").getBoundingClientRect();
      const hits = (el) => { const q = el.getBoundingClientRect(); return !(r.bottom <= q.top || r.top >= q.bottom || r.right <= q.left || r.left >= q.right); };
      return hits(document.querySelector("#hero-title")) || hits(document.querySelector(".btn-launch"));
    });
    overlap ||= hit;
    const f = `${out}/frame-${width}-${String(y).padStart(3, "0")}.png`;
    await p.screenshot({ path: f, clip: { x: 0, y: 0, width, height: mobile ? 560 : 640 } });
    frames.push({ y, f });
  }

  // recording: smooth wheel scroll down, then back up
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(600);
  for (let i = 0; i < 30; i++) { await p.mouse.wheel(0, 16); await p.waitForTimeout(33); }
  await p.waitForTimeout(500);
  for (let i = 0; i < 30; i++) { await p.mouse.wheel(0, -16); await p.waitForTimeout(33); }
  await p.waitForTimeout(800);

  // frame timing with 4x CPU slowdown
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await p.evaluate(() => {
    window.__ft = [];
    let last = performance.now();
    const loop = (t) => { window.__ft.push(t - last); last = t; if (window.__ft.length < 150) requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  });
  for (let i = 0; i < 45; i++) { await p.mouse.wheel(0, 10); await p.waitForTimeout(16); }
  await p.waitForTimeout(800);
  const ft = await p.evaluate(() => window.__ft.slice(1));
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  const sorted = [...ft].sort((a, c) => a - c);
  report[width] = {
    overlapWithHeadlineOrButton: overlap,
    frames: ft.length,
    medianMs: +sorted[Math.floor(sorted.length / 2)].toFixed(1),
    p95Ms: +sorted[Math.floor(sorted.length * 0.95)].toFixed(1),
    over33ms: ft.filter((v) => v > 33.4).length,
    errors: errs,
  };
  const video = p.video();
  await ctx.close();
  const vpath = await video.path();
  fs.renameSync(vpath, `${out}/scroll-${width}.webm`);

  // contact sheet
  const sheet = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  const imgs = frames.map(({ y, f }) => `<figure><img src="data:image/png;base64,${fs.readFileSync(f).toString("base64")}"><figcaption>scroll ${y}px</figcaption></figure>`).join("");
  await sheet.setContent(`<style>body{margin:0;padding:20px;background:#111;font:13px system-ui;color:#bbb}main{display:grid;grid-template-columns:repeat(${mobile ? 6 : 4},1fr);gap:12px}img{width:100%;display:block;border-radius:6px}figure{margin:0}figcaption{padding:4px 0}</style><main>${imgs}</main>`);
  await sheet.waitForTimeout(300);
  await sheet.screenshot({ path: `${out}/sheet-${width}.png`, fullPage: true });
  await sheet.close();
}
await b.close();
fs.writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
