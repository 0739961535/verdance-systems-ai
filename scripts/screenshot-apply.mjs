import { chromium } from 'playwright';
import fs from 'node:fs';

const out = '/tmp/verdance-apply-shots';
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
page.setDefaultTimeout(60000);

const errors = [];
page.on('pageerror', (e) => errors.push(`PAGEERR ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`CONSOLE.ERR ${m.text()}`);
});

const BASE = 'http://localhost:5173';
const client = await page.context().newCDPSession(page);

async function snap(name) {
  const { data } = await client.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
  });
  fs.writeFileSync(`${out}/${name}.png`, Buffer.from(data, 'base64'));
  console.log(`OK ${name}.png`);
}

console.log(`Loading ${BASE}/apply ...`);
await page.goto(`${BASE}/apply`, { waitUntil: 'commit', timeout: 25000 }).catch(() => {});
await page.waitForLoadState('domcontentloaded', { timeout: 20000 }).catch(() => {});
await page.evaluate(() => window.scrollTo(0, 1));
await page.waitForTimeout(400);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(3500);

// 1 — VSL hero at top
await snap('01-apply-vsl-hero');

// 2 — scroll to form
await page.evaluate(() => {
  const el = document.getElementById('apply-form');
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
});
await page.waitForTimeout(1500);
await snap('02-apply-form-step1');

// 3 — fill name + advance via Enter
await page.locator('input[autocomplete="given-name"]').fill('Daniel');
await page.waitForTimeout(300);
await page.keyboard.press('Enter');
await page.waitForTimeout(900);
await snap('03-apply-form-step2-business');

// 4 — business name + advance
await page.locator('input[autocomplete="organization"]').fill('Verdance Sandbox Co');
await page.waitForTimeout(300);
await page.keyboard.press('Enter');
await page.waitForTimeout(900);
await snap('04-apply-form-step3-industry');

// 5 — pick an industry radio (auto-advance)
await page.locator('[data-radio-option="3"]').click(); // Beauty / aesthetics
await page.waitForTimeout(900);
await snap('05-apply-form-step4-volume');

// 6 — leadVolume
await page.locator('[data-radio-option="1"]').click(); // 50–150
await page.waitForTimeout(900);
await snap('06-apply-form-step5-pains');

// 7 — multi-select pains, pick 2
await page.locator('[data-multi-option="0"]').click(); // Missed calls
await page.waitForTimeout(150);
await page.locator('[data-multi-option="1"]').click(); // Slow follow-up
await page.waitForTimeout(400);
await snap('07-apply-form-step5-pains-selected');

// click Continue
await page.locator('button:has-text("Continue")').click();
await page.waitForTimeout(900);
await snap('08-apply-form-step6-urgency');

// 8 — urgency radio
await page.locator('[data-radio-option="1"]').click(); // Within the next month
await page.waitForTimeout(900);
await snap('09-apply-form-step7-email');

// 9 — email
await page
  .locator('input[autocomplete="email"]')
  .fill(`vsl-screenshot+${Date.now()}@verdance.test`);
await page.waitForTimeout(250);
await page.keyboard.press('Enter');
await page.waitForTimeout(900);
await snap('10-apply-form-step8-phone');

// 10 — phone
await page.locator('input[autocomplete="tel"]').fill('+27 73 000 0099');
await page.waitForTimeout(250);
await page.keyboard.press('Enter');
await page.waitForTimeout(900);
await snap('11-apply-form-step9-notes');

// 11 — Submit final step (notes optional)
await page.locator('button:has-text("Send my application")').click();

// Wait for either success or error state
await page
  .waitForSelector('text=/Now pick a time|Couldn|tripped/i', { timeout: 25000 })
  .catch(() => {});
await page.waitForTimeout(1500);
await snap('12-apply-success-state');

// Scroll a bit to capture booking widget area
await page.evaluate(() => window.scrollBy(0, 400));
await page.waitForTimeout(800);
await snap('13-apply-success-booking');

// Trust strip + FAQ
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(900);
await snap('14-apply-trust-faq');

if (errors.length) {
  console.log('--- BROWSER ERRORS ---');
  for (const e of errors) console.log(e);
} else {
  console.log('No browser console errors.');
}

await browser.close();
console.log('DONE');
