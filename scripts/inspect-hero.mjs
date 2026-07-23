import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Home — wider hero
await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3500);
await page.screenshot({ path: '/tmp/verdance-shots/hero-1440.png', fullPage: false });
console.log('hero-1440.png OK');

// Scroll to problem section
await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/verdance-shots/problem-stats.png', fullPage: false });
console.log('problem-stats.png OK');

// solution section
await page.evaluate(() => window.scrollTo({ top: 2200, behavior: 'instant' }));
await page.waitForTimeout(1500);
await page.screenshot({ path: '/tmp/verdance-shots/solution.png', fullPage: false });
console.log('solution.png OK');

await browser.close();
