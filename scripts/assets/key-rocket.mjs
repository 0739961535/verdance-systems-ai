// Keys the black studio background out of a rocket render (black matte:
// background flood-filled from the edges, edge alpha from brightness, colour
// un-premultiplied), trims it, centres it on the RocketArt grid and splits it
// into stages at the interstage. Writes PNG masters for build-images.mjs.
// Usage: node scripts/assets/key-rocket.mjs <render.png> <outDir> <splitY>
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const [src, outDir, splitArg] = process.argv.slice(2);
const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const mx = (i) => Math.max(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]);
// 1. background = near-black pixels connected to the border
const T = 30;
const bg = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
while (stack.length) {
  const i = stack.pop();
  if (bg[i] || mx(i) > T) continue;
  bg[i] = 1;
  const x = i % W, y = (i / W) | 0;
  if (x > 0) stack.push(i - 1);
  if (x < W - 1) stack.push(i + 1);
  if (y > 0) stack.push(i - W);
  if (y < H - 1) stack.push(i + W);
}
// 2. RGBA: foreground opaque; background alpha from brightness (soft edges)
const out = Buffer.alloc(W * H * 4);
let x0 = W, x1 = 0, y0 = H, y1 = 0;
for (let i = 0; i < W * H; i++) {
  const m = mx(i);
  let a = bg[i] ? Math.max(0, Math.min(1, (m - 6) / (T - 6))) : 1;
  const k = a > 0 ? 1 / Math.max(a, m / 255) : 0;
  for (let c = 0; c < 3; c++) out[i * 4 + c] = bg[i] && a > 0 ? Math.min(255, Math.round(data[i * 3 + c] * Math.min(k, 1 / a))) : data[i * 3 + c];
  out[i * 4 + 3] = Math.round(a * 255);
  if (a > 0.02) {
    const x = i % W, y = (i / W) | 0;
    if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
}
// 3. find the body width (median opaque run around the middle rows) and axis
const runs = [];
for (let y = Math.round(H * 0.35); y < Math.round(H * 0.45); y++) {
  let a = -1, b = -1;
  for (let x = 0; x < W; x++) if (out[(y * W + x) * 4 + 3] > 200) { if (a < 0) a = x; b = x; }
  if (a >= 0) runs.push([a, b]);
}
runs.sort((p, q) => (p[1] - p[0]) - (q[1] - q[0]));
const [ba, bb] = runs[runs.length >> 1];
const body = bb - ba + 1, axis = (ba + bb) / 2;
// grid: body is 22 of 80 units wide, centred
const canvasW = Math.round((body / 22) * 80);
const left = Math.round(axis - canvasW / 2);
const top = y0, bottom = y1 + 1;
const split = Number(splitArg);
fs.mkdirSync(outDir, { recursive: true });
const full = sharp(out, { raw: { width: W, height: H, channels: 4 } });
async function cut(name, ya, yb) {
  const ext = { left: Math.max(0, left), top: ya, width: Math.min(canvasW, W - Math.max(0, left)), height: yb - ya };
  const padL = Math.max(0, -left);
  const img = await sharp(await full.clone().extract(ext).png().toBuffer())
    .extend({ left: padL, right: canvasW - ext.width - padL, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toBuffer();
  fs.writeFileSync(path.join(outDir, `${name}.png`), img);
  const units = ((yb - ya) / canvasW) * 80;
  console.log(name, `${canvasW}x${yb - ya}`, "grid units 80 x", units.toFixed(2));
}
console.log("body px", body, "axis", axis, "canvas", canvasW, "rocket y", top, bottom);
await cut("stack", top, bottom);
await cut("upper", top, split);
await cut("booster", split, bottom);
