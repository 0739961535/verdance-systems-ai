// Builds the scroll-scrubbed rocket film's frames from the three shots.
//
//   npm run flight:frames -- dark          (a preset in scripts/flight-film.presets.json)
//   npm run flight:frames -- white
//   npm run flight:frames -- "<shotsDir>"  (defaults for everything else)
//
// Swapping footage is this one command, then commit public/flight/film and
// src/components/home/flight/film-manifest.json. Masters are never committed.
//
// What it does:
// 1. Joins s1-s3 from the shots dir in order. Each shot after the first starts
//    on the previous shot's last frame (they share a keyframe still), so that
//    duplicate first frame is dropped.
// 2. Picks frames across the whole film: `desktop`/`phone` frames in total,
//    with every frame (desktop) or every 2nd frame (phone) inside the `dense`
//    source range, so the climax scrubs smoothly. The rest are spread evenly.
//    The manifest records which source frame each file is, so scroll stays
//    linear in film time.
//    desktop: 1600w WebP. phone: a 9:16 strip, 540x960 WebP, whose centre
//    follows the rocket: `cx` is a list of [sourceFrame, fractionFromLeft]
//    keyframes, linear in between.
// 3. Poster (first frame) and reduced-motion still: from `poster`/`still`
//    image files if given (approved keyframe stills), else from the film
//    (`stillAt` = fraction of the film). AVIF + WebP, desktop and phone.
// `end` (optional): last source frame of the joined film to use; the page
//    holds that frame for the last part of the scroll.
// 4. Writes src/components/home/flight/film-manifest.json.
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const arg = process.argv[2];
if (!arg) {
  console.error('usage: npm run flight:frames -- <preset | shotsDir>');
  process.exit(1);
}
const presets = JSON.parse(fs.readFileSync(path.join(root, "scripts", "flight-film.presets.json"), "utf8"));
const home = os.homedir();
const expand = (p) => (p ? p.replace(/^~(?=\/)/, home) : p);
const cfg = {
  desktop: 168,
  phone: 72,
  cx: [[0, 0.63]],
  dense: null,
  stillAt: 0.9,
  poster: null,
  still: null,
  ...(presets[arg] ?? { shots: arg }),
};
const shotsDir = expand(cfg.shots);
const DW = 1600;
const PW = 540, PH = 960;
const Q = { webpDesktop: 66, webpPhone: 70, avif: 52, webpPoster: 74 };

const outDir = path.join(root, "public", "flight", "film");
const manifestPath = path.join(root, "src", "components", "home", "flight", "film-manifest.json");
const shots = ["s1.mp4", "s2.mp4", "s3.mp4"].map((f) => path.join(shotsDir, f));
for (const s of shots) if (!fs.existsSync(s)) throw new Error(`missing ${s}`);

const probe = (file) => {
  const out = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-count_frames",
    "-show_entries", "stream=width,height,nb_read_frames", "-of", "json", file]).toString();
  const s = JSON.parse(out).streams[0];
  return { w: s.width, h: s.height, n: Number(s.nb_read_frames) };
};
const info = shots.map(probe);
const { w: W, h: H } = info[0];
const joined = info.reduce((t, s, i) => t + s.n - (i > 0 ? 1 : 0), 0);
// `end`: the last source frame used (trims an ending that does not work)
const total = cfg.end != null ? Math.min(joined, cfg.end + 1) : joined;
console.log(`source ${W}x${H}, ${info.map((s) => s.n).join(" + ")} frames, ${joined} after dropping shared boundary frames${total < joined ? `, ending at frame ${total - 1}` : ""}`);

/** `count` source frame indices: `step` apart inside `dense`, the rest evenly spread. */
function pick(count, step) {
  const set = new Set([0, total - 1]);
  if (cfg.dense) for (let n = cfg.dense[0]; n <= cfg.dense[1]; n += step) set.add(n);
  const left = count - set.size;
  if (left < 0) throw new Error("dense range needs more frames than the total");
  // spread the remaining frames over the film outside the dense range
  const outside = [];
  for (let n = 0; n < total; n++) if (!cfg.dense || n < cfg.dense[0] || n > cfg.dense[1]) outside.push(n);
  for (let k = 1; k <= left; k++) set.add(outside[Math.round((k * (outside.length - 1)) / (left + 1))]);
  // collisions (rare) are filled from the nearest unused frames
  for (let n = 0; set.size < count && n < total; n++) set.add(n);
  return [...set].sort((a, b) => a - b);
}

// phone crop: centre x (fraction of width) per source frame, linear between keyframes
const cropW = Math.round((H * 9) / 16) & ~1;
const cxAt = (n) => {
  const k = cfg.cx;
  if (n <= k[0][0]) return k[0][1];
  for (let i = 1; i < k.length; i++) {
    if (n <= k[i][0]) {
      const t = (n - k[i - 1][0]) / (k[i][0] - k[i - 1][0]);
      return k[i - 1][1] + (k[i][1] - k[i - 1][1]) * t;
    }
  }
  return k[k.length - 1][1];
};
// the same curve as an ffmpeg expression in n (the joined film's frame number)
const cropXExpr = (() => {
  const k = cfg.cx;
  const x = (c) => `max(0\\,min(${W - cropW}\\,${W}*(${c})-${cropW / 2}))`;
  let e = x(k[k.length - 1][1]);
  for (let i = k.length - 1; i >= 1; i--) {
    const [n0, c0] = k[i - 1], [n1, c1] = k[i];
    e = `if(lte(n\\,${n1})\\,${x(`${c0}+(${c1 - c0})*(n-${n0})/${n1 - n0}`)}\\,${e})`;
  }
  return `if(lte(n\\,${k[0][0]})\\,${x(k[0][1])}\\,${e})`;
})();

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "flight-frames-"));
const join = `[0:v]setpts=PTS-STARTPTS[a];[1:v]trim=start_frame=1,setpts=PTS-STARTPTS[b];[2:v]trim=start_frame=1,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0,trim=end_frame=${total}[f]`;
/** Every frame of the joined film through `vf`, as near-lossless JPEG (frame n is file n+1). */
function decodeAll(name, vf) {
  const dir = path.join(tmp, name);
  fs.mkdirSync(dir);
  execFileSync("ffmpeg", ["-v", "error", "-y", ...shots.flatMap((s) => ["-i", s]),
    "-filter_complex", `${join};[f]${vf}[o]`, "-map", "[o]", "-fps_mode", "passthrough", "-q:v", "1",
    path.join(dir, "%04d.jpg")], { stdio: "inherit" });
  const n = fs.readdirSync(dir).length;
  if (n !== total) throw new Error(`${name}: decoded ${n} frames, expected ${total}`);
  return (i) => path.join(dir, `${String(i + 1).padStart(4, "0")}.jpg`);
}
const desktopFrame = decodeAll("d", `scale=${DW}:-2:flags=lanczos`);
const phoneFrame = decodeAll("m", `crop=${cropW}:${H}:'${cropXExpr}':0,scale=${PW}:${PH}:flags=lanczos`);
const DH = (await sharp(desktopFrame(0)).metadata()).height;

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
const hash = crypto.createHash("sha1");
const write = (file, buf) => {
  fs.writeFileSync(path.join(outDir, file), buf);
  hash.update(buf);
  return buf.length;
};
const pad = (i) => String(i).padStart(3, "0");
async function encodeSet(frames, prefix, q, srcOf) {
  let sum = 0;
  for (let i = 0; i < frames.length; i += 6) {
    const bufs = await Promise.all(frames.slice(i, i + 6).map((n) => sharp(srcOf(n)).webp({ quality: q, effort: 6 }).toBuffer()));
    bufs.forEach((b, k) => (sum += write(`${prefix}-${pad(i + k)}.webp`, b)));
  }
  return sum;
}
const desktopIdx = pick(cfg.desktop, 1);
const phoneIdx = pick(cfg.phone, 2);
const bytesD = await encodeSet(desktopIdx, "d", Q.webpDesktop, desktopFrame);
const bytesM = await encodeSet(phoneIdx, "m", Q.webpPhone, phoneFrame);

/** A still: an approved keyframe image (cropped like the film at source frame n) or a film frame. */
async function still(name, image, n) {
  let d, m;
  if (image) {
    const src = sharp(expand(image));
    const { width: iw, height: ih } = await src.metadata();
    const cw = Math.round((ih * 9) / 16);
    const left = Math.max(0, Math.min(iw - cw, Math.round(iw * cxAt(n) - cw / 2)));
    d = src.clone().resize({ width: DW, height: DH, fit: "cover" });
    m = src.clone().extract({ left, top: 0, width: cw, height: ih }).resize({ width: PW, height: PH, fit: "cover" });
  } else {
    d = sharp(desktopFrame(n));
    m = sharp(phoneFrame(n));
  }
  for (const [img, suffix] of [[d, "d"], [m, "m"]]) {
    const a = await img.clone().avif({ quality: Q.avif, effort: 6 }).toBuffer();
    const b = await img.clone().webp({ quality: Q.webpPoster, effort: 6 }).toBuffer();
    write(`${name}-${suffix}.avif`, a);
    write(`${name}-${suffix}.webp`, b);
    console.log(`${name}-${suffix}: avif ${(a.length / 1024).toFixed(0)}K, webp ${(b.length / 1024).toFixed(0)}K${image ? " (from " + path.basename(image) + ")" : ""}`);
  }
}
// the sky colour at the very top of the phone poster: fills the band above
// the film on phones while the rocket is on the pad (see FilmController)
async function topColour(file) {
  const img = sharp(file);
  const { width, height } = await img.metadata();
  const { channels } = await img.extract({ left: 0, top: 0, width: Math.round(width * 0.05) || 1, height: Math.max(1, Math.round(height * 0.004)) }).stats();
  return "#" + channels.slice(0, 3).map((c) => Math.round(c.mean).toString(16).padStart(2, "0")).join("");
}
const stillN = cfg.stillFrame ?? Math.round((total - 1) * cfg.stillAt);
await still("poster", cfg.poster, 0);
await still("still", cfg.still, stillN);

const posterSky = await topColour(path.join(outDir, "poster-m.webp"));
const manifest = {
  v: hash.digest("hex").slice(0, 10),
  posterSky,
  source: { width: W, height: H, frames: total, dense: cfg.dense },
  desktop: { count: desktopIdx.length, width: DW, height: DH, focusX: cfg.focusX ?? 0.63, frames: desktopIdx },
  phone: { count: phoneIdx.length, width: PW, height: PH, focusX: 0.5, frames: phoneIdx },
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest) + "\n");
fs.rmSync(tmp, { recursive: true, force: true });
const mb = (n) => (n / 1048576).toFixed(2) + " MB";
console.log(`desktop: ${desktopIdx.length} frames, ${mb(bytesD)} (${(bytesD / desktopIdx.length / 1024).toFixed(0)}K avg)`);
console.log(`phone:   ${phoneIdx.length} frames, ${mb(bytesM)} (${(bytesM / phoneIdx.length / 1024).toFixed(0)}K avg)`);
console.log(`manifest v=${manifest.v} -> ${path.relative(root, manifestPath)}`);
