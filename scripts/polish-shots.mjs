// Before/after shots of the polish spots at 390 (WebKit, light theme).
// node scripts/polish-shots.mjs <outDir>
import { webkit, devices } from "playwright";
import fs from "node:fs";
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const b = await webkit.launch();
const c = await b.newContext({ ...devices["iPhone 13"], viewport: { width: 390, height: 664 }, colorScheme: "light" });
await c.route(/_vercel\//, (r) => r.abort());
const p = await c.newPage();
const go = async (url) => { await p.goto("http://localhost:3100" + url, { waitUntil: "networkidle" }); await p.waitForTimeout(600); };
const at = async (sel, name, off = -80, wait = 1500) => {
  await p.evaluate(([s, o]) => { const el = document.querySelector(s); if (el) scrollTo(0, el.getBoundingClientRect().top + scrollY + o); }, [sel, off]);
  await p.waitForTimeout(wait);
  await p.screenshot({ path: `${out}/${name}.png` });
};
await go("/services");
await at("#ask-title", "01-services-navy-header", -300);
await go("/how-it-works");
await p.evaluate(() => scrollTo(0, 900)); await p.waitForTimeout(1200); await p.screenshot({ path: `${out}/02-how-navy-header.png` });
await go("/industries");
await p.screenshot({ path: `${out}/03-industries-fan.png` });
await at("#ds-title", "04-industries-demo-start", 260, 700);
await go("/");
await at("#watch-title", "05-home-watch-mockup", -60, 2500);
await at("#work-title", "06-home-proof-mockup", 380, 2000);
await at("#get-title", "07-home-work-done", 900, 2000);
await at("#ask-title", "08-home-ask", 200, 2000);
await b.close();
console.log("ok");
