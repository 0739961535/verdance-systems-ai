import { chromium } from 'playwright';
import fs from 'node:fs';

const out = '/tmp/verdance-shots';
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
});
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
page.setDefaultTimeout(60000);

const BASE = 'http://localhost:5173';
const client = await page.context().newCDPSession(page);

async function snap(name) {
  const { data } = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
  fs.writeFileSync(`${out}/${name}.png`, Buffer.from(data, 'base64'));
  console.log(`OK ${name}.png`);
}

async function pageShots(path, prefix) {
  console.log(`Loading ${BASE}${path}...`);
  try {
    await page.goto(`${BASE}${path}`, { waitUntil: 'commit', timeout: 20000 });
  } catch (e) {
    console.log(`  (goto warn: ${e.message.split('\n')[0]})`);
  }
  await page.waitForLoadState('domcontentloaded', { timeout: 20000 }).catch(() => {});
  // nudge scroll to trigger framer-motion whileInView reveals, then return to top
  await page.evaluate(() => window.scrollTo(0, 1));
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(5500);
  await snap(`${prefix}-top`);
  const h = await page.evaluate(() => document.body.scrollHeight);
  const stops = [Math.round(h * 0.25), Math.round(h * 0.5), Math.round(h * 0.75), h];
  for (let i = 0; i < stops.length; i++) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), stops[i]);
    await page.waitForTimeout(900);
    await snap(`${prefix}-${i + 1}`);
  }
}

await pageShots('/', '01-home');
await pageShots('/services', '02-services');
await pageShots('/how-it-works', '03-how');
await pageShots('/results', '04-results');
await pageShots('/about', '05-about');
await pageShots('/contact', '06-contact');

await browser.close();
console.log('DONE');
