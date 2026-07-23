import { chromium } from 'playwright';
import fs from 'node:fs';

const out = '/tmp/sodium-shots';
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
});
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  bypassCSP: true,
  hasTouch: false,
});
const page = await ctx.newPage();
page.setDefaultTimeout(120000);

console.log('Loading Sodium...');
await page.goto('https://joyful-84thiv6s.peachworlds.com/', { waitUntil: 'domcontentloaded', timeout: 120000 });
console.log('DOM ready, waiting 18s for three.js + GLB models...');
await page.waitForTimeout(18000);

// Use CDP screenshot — bypasses Playwright's frame-wait
const client = await page.context().newCDPSession(page);

async function snap(name) {
  const { data } = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
  fs.writeFileSync(`${out}/${name}.png`, Buffer.from(data, 'base64'));
  console.log(`✓ ${name}.png`);
}

await snap('01-hero');

const heights = [800, 1600, 2400, 3200, 4200, 5200, 6200];
for (let i = 0; i < heights.length; i++) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), heights[i]);
  await page.waitForTimeout(2500);
  try {
    await snap(`0${i + 2}-scroll-${heights[i]}`);
  } catch (e) {
    console.log(`✗ ${heights[i]}: ${e.message}`);
  }
}

await browser.close();
console.log('DONE');
