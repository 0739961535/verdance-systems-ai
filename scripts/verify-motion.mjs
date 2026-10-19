// Checks the home page motion: rocket lift-off (one-shot), button-hover nudge,
// the enquiry demo counter ticking in its own section, the charts, and that
// reduced motion leaves everything still and error-free.
import { chromium } from "playwright";
const base = process.argv[2] || "http://localhost:3123";
const b = await chromium.launch();
const out = {};
for (const mode of ["no-preference", "reduce"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: mode });
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error" && !/_vercel\/|404 \(Not Found\)/.test(m.text())) errs.push(m.text()); });
  p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(base + "/", { waitUntil: "networkidle" });
  const r = {};
  r.rocketEarly = await p.evaluate(() => { const s = getComputedStyle(document.querySelector(".rk-ship")); return { anim: s.animationName, transform: s.transform }; });
  await p.waitForTimeout(2600);
  r.rocketLate = await p.evaluate(() => { const s = getComputedStyle(document.querySelector(".rk-ship")); return { transform: s.transform, opacity: s.opacity, trailOpacity: getComputedStyle(document.querySelector(".rk-trail")).opacity }; });
  await p.hover(".btn-launch"); await p.waitForTimeout(700);
  r.rocketHoverTranslate = await p.evaluate(() => getComputedStyle(document.querySelector(".rk-ship")).translate);
  await p.mouse.move(5, 5);
  await p.locator("#watch-title").scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  await p.evaluate(() => document.querySelector(".hs-stage").scrollIntoView({ block: "center" }));
  const c1 = await p.evaluate(() => document.querySelector("[data-hero-count]")?.textContent);
  await p.waitForTimeout(9000);
  const c2 = await p.evaluate(() => document.querySelector("[data-hero-count]")?.textContent);
  r.counter = { c1, c2, overlay: await p.evaluate(() => !!document.querySelector(".hs-overlay")), chips: await p.evaluate(() => document.querySelectorAll(".hs-chip").length) };
  await p.evaluate(() => document.querySelector("#charts").scrollIntoView({ block: "start" }));
  await p.waitForTimeout(3500);
  r.charts = await p.evaluate(() => ({ svgs: document.querySelectorAll("#charts svg").length, bars: document.querySelectorAll("#charts [class*=bar], #charts rect").length }));
  r.errors = errs;
  out[mode] = r;
  await ctx.close();
}
await b.close();
console.log(JSON.stringify(out, null, 2));
