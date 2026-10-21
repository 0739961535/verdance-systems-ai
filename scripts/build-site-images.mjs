// Builds the site art in public/site/ from the generated stills (council rule,
// 21 Oct 2026: brand art and empty concept scenes only, never people).
//   node scripts/build-site-images.mjs "<folder with the PNGs>" [baseUrl]
// - earth-horizon: header art for /services, /how-it-works and /about. A wide
//   set (960, 1344) and a phone crop around the sunrise (412, 824).
// - the industry and concept scenes are built by scripts/build-scene-images.mjs.
// - workspace: the real Operations Team command centre (CommandMock, read off
//   the running site at baseUrl) warped onto the blank laptop screen with a
//   CSS matrix3d from the four measured screen corners, then rendered at 2x
//   (1344 and 2688 wide). Needs the dev server running.
// AVIF and WebP for each; prints the sizes.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { chromium } from "playwright";

const src = process.argv[2];
const base = process.argv[3] ?? "http://localhost:3300";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(root, "public", "site");
fs.mkdirSync(out, { recursive: true });
const sizes = {};

async function emit(input, name, widths, { aq = 52, wq = 72, extract } = {}) {
  for (const w of widths) {
    let img = sharp(input);
    if (extract) img = img.extract(extract);
    img = img.resize({ width: w, withoutEnlargement: false });
    const a = await img.clone().avif({ quality: aq, effort: 6 }).toBuffer();
    const b = await img.clone().webp({ quality: wq, effort: 6 }).toBuffer();
    fs.writeFileSync(path.join(out, `${name}-${w}.avif`), a);
    fs.writeFileSync(path.join(out, `${name}-${w}.webp`), b);
    sizes[`${name}-${w}`] = `${Math.round(a.length / 1024)}KB avif, ${Math.round(b.length / 1024)}KB webp`;
  }
}

const png = (n) => path.join(src, `${n}.png`);

// Earth: wide, and a phone crop (824x502) that keeps the sunrise and the lit coast.
await emit(png("earth-horizon"), "earth", [960, 1344], { aq: 50 });
await emit(png("earth-horizon"), "earth-m", [412, 824], { aq: 50, extract: { left: 520, top: 250, width: 824, height: 502 } });

// Workspace: composite the command centre onto the laptop screen.
// Screen corners measured on the 1344x752 still at 200% zoom (TL, TR, BR, BL).
const Q = [[265, 187], [662, 163], [723, 431], [306, 473]];
const SW = 1000, SH = 625; // the 16:10 screen the mock is laid out in

// Homography from the SWxSH rectangle to the quad, as a CSS matrix3d.
function matrix3d(w, h, q) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
  const sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (sx * dy2 - dx2 * sy) / den, hh = (dx1 * sy - sx * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + hh * x3, c = x0;
  const d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3, f = y0;
  // unit square -> quad, then scale the input by 1/w, 1/h
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, hh / h, 0, 0, 1, 0, c, f, 0, 1];
  return `matrix3d(${m.map((v) => +v.toFixed(10)).join(",")})`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce", colorScheme: "dark" });
await page.route(/_vercel\//, (r) => r.abort());
await page.goto(base + "/", { waitUntil: "load" });
// the command centre is in a lazy section: scroll until it exists
for (let y = 0; y < 30000; y += 700) {
  if (await page.$(".ocm[data-variant='screen']")) break;
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(250);
}
await page.waitForSelector(".ocm[data-variant='screen']");
await page.waitForTimeout(1500);
const photo = "data:image/png;base64," + fs.readFileSync(png("workspace")).toString("base64");
await page.evaluate(({ photo, SW, SH, m }) => {
  const mock = document.querySelector(".ocm[data-variant='screen']").cloneNode(true);
  mock.querySelectorAll("[data-on]").forEach((el) => el.removeAttribute("data-on"));
  const stage = document.createElement("div");
  stage.id = "ws-stage";
  stage.style.cssText = "position:fixed;left:0;top:0;width:1344px;height:752px;z-index:2147483647;overflow:hidden;background:#000";
  stage.innerHTML = `<img src="${photo}" style="position:absolute;inset:0;width:1344px;height:752px">`;
  const scr = document.createElement("div");
  scr.style.cssText = `position:absolute;left:0;top:0;width:${SW}px;height:${SH}px;transform-origin:0 0;transform:${m};container-type:inline-size;overflow:hidden;border-radius:7px;background:#060B1A`;
  scr.appendChild(mock);
  // the window light falls from the right: a soft sheen and a slight dim at the far edge
  const sheen = document.createElement("div");
  sheen.style.cssText = "position:absolute;inset:0;z-index:9;pointer-events:none;background:linear-gradient(112deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 30%, transparent 46%, rgba(0,0,0,0.12) 100%)";
  scr.appendChild(sheen);
  stage.appendChild(scr);
  document.body.appendChild(stage);
  window.scrollTo(0, 0);
}, { photo, SW, SH, m: matrix3d(SW, SH, Q) });
await page.waitForTimeout(800);
const shot = await page.locator("#ws-stage").screenshot({ type: "png" });
await browser.close();
if (process.env.COMPOSITE_OUT) fs.writeFileSync(process.env.COMPOSITE_OUT, shot);
await emit(shot, "workspace", [1344, 2688], { aq: 46, wq: 70 });

console.log(JSON.stringify(sizes, null, 1));
