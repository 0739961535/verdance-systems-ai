import { chromium } from 'playwright';
const browser = await chromium.launch({
  headless: true,
  args: ['--disable-gpu', '--no-sandbox'],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
const warns = [];
page.on('pageerror', (e) => errors.push(`PAGEERR ${e.message}\n${e.stack || ''}`));
page.on('console', (m) => {
  const t = m.type();
  const txt = m.text();
  if (t === 'error') errors.push(`CONSOLE.ERR ${txt}`);
  if (t === 'warning') warns.push(`CONSOLE.WARN ${txt}`);
});
await page.goto('http://localhost:5173/apply', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4500);
console.log('--- ERRORS ---');
errors.forEach((e) => console.log(e));
console.log('--- WARNINGS ---');
warns.forEach((w) => console.log(w));
await browser.close();
