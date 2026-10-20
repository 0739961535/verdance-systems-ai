// WebKit 390 recording from the top of the home page to the end of the
// Websites chapter, at a finger's pace ("real": flicks of ~1,400px/s with
// short pauses) or slowly (~350px/s). Usage:
// node scripts/phone-run-webkit.mjs <base> <outDir> <real|slow> [height]
import { webkit, devices } from "playwright";
import fs from "node:fs";
const [base = "http://localhost:3100", out = "/tmp/run", pace = "real", hs = "664"] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const vp = { width: 390, height: Number(hs) };
const b = await webkit.launch();
const ctx = await b.newContext({ ...devices["iPhone 13"], viewport: vp, screen: vp, colorScheme: "dark", recordVideo: { dir: out, size: vp } });
await ctx.route(/_vercel\//, (r) => r.abort());
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
await p.goto(base + "/", { waitUntil: "load" });
await p.waitForTimeout(3000);
const end = await p.evaluate(() => { const el = document.getElementById("websites"); return el.getBoundingClientRect().bottom + scrollY - innerHeight + 40; });
const t0 = Date.now();
// timed stills while the page scrolls itself (headless WebKit's video
// capture stalls behind the worker-drawn canvas, so the stills are the
// truthful record; the video is kept for feel only)
const shots = [];
const fdir = `${out}/frames-${pace}`;
fs.rmSync(fdir, { recursive: true, force: true });
fs.mkdirSync(fdir, { recursive: true });
let running = true;
// frame 0: the very top of the page (the opening), before any scroll
await p.screenshot({ path: `${fdir}/${pace}-000.png` });
shots.push(`${fdir}/${pace}-000.png`);
const run = p.evaluate(async ({ end, pace }) => {
  const frame = () => new Promise((r) => requestAnimationFrame(r));
  let y = 0;
  if (pace === "slow") {
    let last = performance.now();
    while (y < end) { await frame(); const now = performance.now(); y = Math.min(end, y + 0.35 * (now - last)); last = now; scrollTo(0, y); }
    return;
  }
  // flicks: a quick push that decays (like iOS momentum), then a short pause
  while (y < end) {
    let v = 2.2; // px per ms at the start of the flick
    let last = performance.now();
    while (v > 0.08 && y < end) { await frame(); const now = performance.now(); const dt = now - last; last = now; y = Math.min(end, y + v * dt); v *= Math.pow(0.9965, dt); scrollTo(0, y); }
    const hold = performance.now(); while (performance.now() - hold < 350) await frame();
  }
}, { end, pace }).then(() => (running = false));
let k = 1;
while (running) {
  await p.waitForTimeout(pace === "slow" ? 450 : 300);
  const f = `${fdir}/${pace}-${String(k++).padStart(3, "0")}.png`;
  await p.screenshot({ path: f });
  shots.push(f);
}
await run;
const secs = (Date.now() - t0) / 1000;
await p.waitForTimeout(800);
const v = p.video();
await ctx.close();
const file = `${out}/phone-${pace}-390x${hs}.webm`;
fs.renameSync(await v.path(), file);
await b.close();
console.log(JSON.stringify({ file, end: Math.round(end), secs, stills: shots.length, errs }));
