import { chromium } from 'playwright';
import fs from 'node:fs';
const out = '/tmp/verdance-shots';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--disable-gpu', '--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.setDefaultTimeout(60000);
const client = await page.context().newCDPSession(page);

async function snap(name) {
  const { data } = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
  fs.writeFileSync(`${out}/${name}.png`, Buffer.from(data, 'base64'));
  console.log(`OK ${name}.png`);
}

// Home pipeline section (right under hero)
await page.goto('http://localhost:5173/', { waitUntil: 'commit' });
await page.waitForLoadState('domcontentloaded');
await page.waitForTimeout(3500);
const homeH = await page.evaluate(() => document.body.scrollHeight);
// pipeline lives just after hero ~ 12% in
await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }));
await page.waitForTimeout(1500);
await snap('VERIFY-home-pipeline');
// dashboard between WhyVerdance & CapabilitySuite ~ 60% in
await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(homeH * 0.55));
await page.waitForTimeout(1500);
await snap('VERIFY-home-dashboard');
// solution section ~ 22%
await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(homeH * 0.22));
await page.waitForTimeout(1500);
await snap('VERIFY-home-solution');

// Services demo gallery — they all live in one big section
await page.goto('http://localhost:5173/services', { waitUntil: 'commit' });
await page.waitForLoadState('domcontentloaded');
await page.waitForTimeout(3500);
const svcH = await page.evaluate(() => document.body.scrollHeight);
for (let i = 1; i <= 6; i++) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(svcH * i / 7));
  await page.waitForTimeout(1500);
  await snap(`VERIFY-services-${i}`);
}

// How-it-works — five steps
await page.goto('http://localhost:5173/how-it-works', { waitUntil: 'commit' });
await page.waitForLoadState('domcontentloaded');
await page.waitForTimeout(3500);
const howH = await page.evaluate(() => document.body.scrollHeight);
for (let i = 1; i <= 5; i++) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(howH * (0.30 + i * 0.12)));
  await page.waitForTimeout(1500);
  await snap(`VERIFY-how-${i}`);
}

await browser.close();
console.log('DONE');
