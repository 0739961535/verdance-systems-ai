// Measures the home page: Flesch-Kincaid grade on rendered visible text,
// words per section, console/CSP errors, and full-page screenshots at 390 and 1440.
// Usage: node scripts/measure-home.mjs <baseUrl> <label> <outDir> [path]
import { chromium } from "playwright";
import fs from "node:fs";

const [base = "http://localhost:3123", label = "run", outDir = "/tmp/simplify", path = "/"] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });

function syllables(word) {
  let w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const m = w.match(/[aeiouy]{1,2}/g);
  return Math.max(1, m ? m.length : 1);
}
function fk(text) {
  const sentences = text.split(/[.!?]+(?:\s|$)|\n+/).map((s) => s.trim()).filter((s) => /[a-zA-Z]/.test(s));
  const words = text.match(/[A-Za-z][A-Za-z'’-]*/g) || [];
  const syl = words.reduce((a, w) => a + syllables(w), 0);
  const W = words.length, S = Math.max(1, sentences.length);
  return {
    words: W,
    sentences: S,
    grade: +(0.39 * (W / S) + 11.8 * (syl / Math.max(1, W)) - 15.59).toFixed(1),
    ease: +(206.835 - 1.015 * (W / S) - 84.6 * (syl / Math.max(1, W))).toFixed(1),
  };
}

const browser = await chromium.launch({ headless: true });
const errors = [];
const report = { label, path, viewports: {} };

for (const width of [360, 390, 430, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? (width === 360 ? 780 : width === 430 ? 932 : 844) : 900 }, deviceScaleFactor: width < 768 ? 2 : 1 });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (/_vercel\/|404 \(Not Found\)/.test(m.text())) return; if (m.type() === "error" || /Content Security Policy|CSP/i.test(m.text())) errors.push(`[${width}] ${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => errors.push(`[${width}] pageerror: ${e.message}`));
  await page.goto(base + path, { waitUntil: "networkidle" });
  // scroll through to trigger reveals and lazy islands
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120); }
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2500);

  if (width === 1440) {
    const data = await page.evaluate(() => {
      const main = document.querySelector("main") || document.body;
      const secs = [...main.querySelectorAll(":scope > section, :scope > div > section, :scope section[aria-labelledby], :scope section[aria-label]")]
        .filter((s, i, arr) => !arr.some((o) => o !== s && o.contains(s)));
      const vis = (el) => el.innerText || "";
      const prose = [...main.querySelectorAll("h1,h2,h3,p,li")]
        .filter((el) => !el.closest("[aria-hidden='true']") && !el.querySelector("p,li") && el.offsetParent !== null)
        .map((el) => { const t = (el.innerText || "").replace(/\s+/g, " ").trim(); return /[.!?]$/.test(t) ? t : t + "."; })
        .filter((t) => t.length > 1);
      return {
        all: vis(main),
        prose: prose.join("\n"),
        sections: secs.map((s) => ({ id: s.id || s.getAttribute("aria-labelledby") || s.getAttribute("aria-label") || s.className.slice(0, 30), text: vis(s) })),
      };
    });
    report.overall = fk(data.all);
    report.prose = fk(data.prose.replace(/\n/g, " "));
    fs.writeFileSync(`${outDir}/${label}-prose.txt`, data.prose);
    report.sectionCount = data.sections.length;
    report.sections = data.sections.map((s) => ({ id: s.id, words: (s.text.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length, grade: fk(s.text).grade }));
    fs.writeFileSync(`${outDir}/${label}-text.txt`, data.all);
  }
  await page.screenshot({ path: `${outDir}/${label}-${width}-top.png` });
  if (width === 390 || width === 1440) await page.screenshot({ path: `${outDir}/${label}-${width}-full.png`, fullPage: true });
  report.viewports[width] = { height: await page.evaluate(() => document.body.scrollHeight) };
  await ctx.close();
}
report.errors = errors;
await browser.close();
fs.writeFileSync(`${outDir}/${label}-report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
