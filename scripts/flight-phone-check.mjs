// Phone flight check in WebKit: poster vs first canvas frame, then stills
// across the flight. Usage: node scripts/flight-phone-check.mjs <base> <out> [height]
import { webkit, devices } from "playwright";
const [base = "http://localhost:3100", out = "/tmp/fpc", hs = "664"] = process.argv.slice(2);
const vp = { width: 390, height: Number(hs) };
const b = await webkit.launch();
const ctx = await b.newContext({ ...devices["iPhone 13"], viewport: vp, screen: vp, colorScheme: "dark" });
await ctx.route(/_vercel\//, (r) => r.abort());
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
await p.goto(base + "/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(400);
await p.screenshot({ path: `${out}/${hs}-a-poster.png` });
await p.waitForFunction(() => document.querySelector(".flm")?.hasAttribute("data-film"), null, { timeout: 15000 });
await p.waitForTimeout(800);
await p.screenshot({ path: `${out}/${hs}-b-canvas.png` });
const g = await p.evaluate(() => { const el = document.querySelector(".flm"); return { top: el.getBoundingClientRect().top + scrollY, travel: el.offsetHeight - innerHeight }; });
for (const f of [0.03, 0.08, 0.12, 0.2, 0.3, 0.36, 0.45, 0.6, 0.7, 0.8]) {
  await p.evaluate((y) => scrollTo(0, y), Math.round(g.top + f * g.travel));
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/${hs}-c-${String(Math.round(f * 100)).padStart(2, "0")}.png` });
}
console.log(JSON.stringify({ errs }));
await b.close();
