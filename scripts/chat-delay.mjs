// GHL chat widget delay check at 390: screenshot at 2 s (no widget) and 25 s
// (widget loaded), plus whether the greeting covers the hero button.
import { chromium } from "playwright";
const [base = "http://localhost:3123", out = "/tmp", path = "/"] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
const errs = []; const ghl = [];
p.on("console", (m) => { if ((m.type() === "error" || /Content Security Policy/i.test(m.text())) && !/_vercel\/|404 \(Not Found\)/.test(m.text())) errs.push(m.text().slice(0, 200)); });
p.on("request", (r) => { if (/leadconnectorhq|msgsndr/.test(r.url())) ghl.push([Date.now(), r.url().slice(0, 80)]); });
const t0 = Date.now();
await p.goto(base + path, { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2000);
const at2 = await p.evaluate(() => !!document.querySelector("chat-widget"));
await p.screenshot({ path: `${out}/chat-390-2s.png` });
await p.waitForTimeout(23000);
const at25 = await p.evaluate(() => !!document.querySelector("chat-widget"));
await p.screenshot({ path: `${out}/chat-390-25s.png` });
// then wait for the bubble itself to mount (the widget boots for a few seconds after its loader)
let shownAt = null;
for (let i = 0; i < 40 && !shownAt; i++) {
  const ok = await p.evaluate(() => { const r = document.querySelector("chat-widget")?.shadowRoot; return !!r && !!r.querySelector(".lc_text-widget, .lc_text-widget--bubble, button"); });
  if (ok) shownAt = ((Date.now() - t0) / 1000).toFixed(1) + "s"; else await p.waitForTimeout(500);
}
await p.waitForTimeout(2500);
await p.screenshot({ path: `${out}/chat-390-bubble.png` });
const firstGhl = ghl.length ? ((ghl[0][0] - t0) / 1000).toFixed(1) + "s" : "none";
console.log(JSON.stringify({ path, widgetAt2s: at2, widgetAt25s: at25, firstGhlRequest: firstGhl, bubbleShownAt: shownAt, errors: errs }));
await b.close();
