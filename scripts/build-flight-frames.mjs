// Builds the scroll-scrubbed rocket film's frames.
//
//   npm run flight:frames -- dark          (a preset in scripts/flight-film.presets.json)
//
// Swapping footage is this one command, then commit public/flight/film and
// src/components/home/flight/film-manifest.json. Masters are never committed.
//
// Two films can feed it:
// - `shots`: the 16:9 film (s1-s3.mp4, or one finished master .mp4) for desktop.
// - `phoneShots` (optional): a native 9:16 film for phones, telling the same
//   story. Without it, phones get a tall strip cropped from the 16:9 film
//   that follows the rocket (`cx` keyframes, `phoneAspect`).
// Each film: s1-s3 joined in order (the shared boundary frame dropped),
// trimmed at the same point of the story (`end`, a desktop source frame),
// frames picked evenly with a dense run through the climax (`dense`), so
// scroll stays linear in film time (the manifest maps each file to its
// source frame).
//
// Quality (crisp pass, Oct 2026): every set gets a light unsharp mask and a
// fine temporal dither baked into the pixels (no banding in the dark sky,
// no CSS grain needed). Two sets per device, loaded progressively by
// FilmController:
// - low (scrubbing): desktop 1600w WebP, phone 540w WebP
// - HD (where the visitor stops): desktop at the source's full width,
//   phone 1080 wide (vertical film) or the strip at native size; 10-bit AVIF.
// Stills (poster = first frame, reduced-motion stills) come from the HD
// frames, or from approved keyframe images when given (desktop only).
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const arg = process.argv[2];
if (!arg) {
  console.error("usage: npm run flight:frames -- <preset | shotsDir>");
  process.exit(1);
}
const presets = JSON.parse(fs.readFileSync(path.join(root, "scripts", "flight-film.presets.json"), "utf8"));
const home = os.homedir();
const expand = (p) => (p ? p.replace(/^~(?=\/)/, home) : p);
const cfg = { desktop: 168, phone: 72, cx: [[0, 0.63]], dense: null, stillAt: 0.9, still: null, ...(presets[arg] ?? { shots: arg }) };

const Q = { low: 72, hi: 60, still: 55, stillWebp: 76 };
const CRISP = "unsharp=5:5:0.6:5:5:0,noise=alls=2:allf=t+u";
// the filmic look, baked into every frame (no live blur on the page):
// slightly deeper blacks and a touch more colour, then a gentle bloom on
// the brightest light (the engines): the highlights alone, blurred and
// screened back over the frame
const LOOK = cfg.look === false ? "" :
  "eq=saturation=1.06,format=gbrp,curves=all='0/0 0.07/0.04 0.5/0.5 1/1',split[lk1][lk2];[lk2]curves=all='0/0 0.74/0 1/1',gblur=sigma=16[lkg];[lk1][lkg]blend=all_mode=screen:all_opacity=0.3,format=yuv444p,";
const outDir = path.join(root, "public", "flight", "film");
const manifestPath = path.join(root, "src", "components", "home", "flight", "film-manifest.json");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "flight-frames-"));
const mb = (n) => (n / 1048576).toFixed(2) + " MB";
const pad = (i) => String(i).padStart(3, "0");

/* ---------- a film: probe, join, trim ---------- */
function film(dir, endFrac) {
  // a folder of s1-s3.mp4, or one finished master film (.mp4)
  const single = /\.mp4$/i.test(dir);
  const shots = single ? [expand(dir)] : ["s1.mp4", "s2.mp4", "s3.mp4"].map((f) => path.join(expand(dir), f));
  for (const s of shots) if (!fs.existsSync(s)) throw new Error(`missing ${s}`);
  const info = shots.map((file) => {
    const out = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-count_frames",
      "-show_entries", "stream=width,height,nb_read_frames", "-of", "json", file]).toString();
    const s = JSON.parse(out).streams[0];
    return { w: s.width, h: s.height, n: Number(s.nb_read_frames) };
  });
  const joined = info.reduce((t, s, i) => t + s.n - (i > 0 ? 1 : 0), 0);
  const total = endFrac != null ? Math.min(joined, Math.round(endFrac * (joined - 1)) + 1) : joined;
  console.log(`${path.basename(expand(dir))}: ${info[0].w}x${info[0].h}, ${joined} frames joined, using ${total}`);
  const join = single
    ? `[0:v]setpts=PTS-STARTPTS,trim=end_frame=${total}[f]`
    : `[0:v]setpts=PTS-STARTPTS[a];[1:v]trim=start_frame=1,setpts=PTS-STARTPTS[b];[2:v]trim=start_frame=1,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0,trim=end_frame=${total}[f]`;
  return { shots, W: info[0].w, H: info[0].h, joined, total, join };
}
/** `count` frame indices: every `step` inside the dense run (story fractions), the rest evenly spread. */
function pick(total, count, step, denseFrac) {
  const dense = denseFrac ? denseFrac.map((f) => Math.round(f * (total - 1))) : null;
  const set = new Set([0, total - 1]);
  if (dense) for (let n = dense[0]; n <= dense[1]; n += step) set.add(n);
  const left = count - set.size;
  if (left < 0) throw new Error("dense range needs more frames than the total");
  const outside = [];
  for (let n = 0; n < total; n++) if (!dense || n < dense[0] || n > dense[1]) outside.push(n);
  for (let k = 1; k <= left; k++) set.add(outside[Math.round((k * (outside.length - 1)) / (left + 1))]);
  for (let n = 0; set.size < count && n < total; n++) set.add(n);
  return [...set].sort((a, b) => a - b);
}
/** Every frame of a film through `vf`, as near-lossless JPEG (frame n is file n+1). */
function decodeAll(f, name, vf) {
  const dir = path.join(tmp, name);
  fs.mkdirSync(dir);
  execFileSync("ffmpeg", ["-v", "error", "-y", ...f.shots.flatMap((s) => ["-i", s]),
    "-filter_complex", `${f.join};[f]${LOOK}${vf}[o]`, "-map", "[o]", "-fps_mode", "passthrough", "-q:v", "1",
    path.join(dir, "%04d.jpg")], { stdio: "inherit" });
  const n = fs.readdirSync(dir).length;
  if (n !== f.total) throw new Error(`${name}: decoded ${n} frames, expected ${f.total}`);
  return (i) => path.join(dir, `${String(i + 1).padStart(4, "0")}.jpg`);
}

/* ---------- desktop: the 16:9 film ---------- */
const probeD = film(cfg.shots);
const endFrac = cfg.end != null ? cfg.end / (probeD.joined - 1) : undefined;
const D = film(cfg.shots, endFrac);
const denseFrac = cfg.dense ? cfg.dense.map((n) => n / (D.total - 1)) : null;
const DW = 1600;
const dLow = decodeAll(D, "d", `scale=${DW}:-2:flags=lanczos,${CRISP}`);
const dHi = decodeAll(D, "dh", CRISP); // the source's full width
const DH = (await sharp(dLow(0)).metadata()).height;
const dHiMeta = await sharp(dHi(0)).metadata();

/* ---------- phones: the vertical film, or a strip of the 16:9 one ---------- */
let P, pLow, pHi, PH;
const PW = 540;
if (cfg.phoneShots) {
  // `phoneEnd` (a source frame of the vertical film) when its clean ending
  // falls elsewhere than the desktop film's
  const probeP = film(cfg.phoneShots);
  P = film(cfg.phoneShots, cfg.phoneEnd != null ? cfg.phoneEnd / (probeP.joined - 1) : endFrac);
  PH = Math.round((PW * P.H) / P.W / 2) * 2;
  pLow = decodeAll(P, "m", `scale=${PW}:${PH}:flags=lanczos,${CRISP}`);
  // HD width: phones draw the pad frames enlarged (rocket right of centre),
  // so the HD set is wider than 1080 to stay sharp at 3x
  pHi = decodeAll(P, "mh", `scale=${Math.min(cfg.phoneHiWidth ?? 1080, P.W)}:-2:flags=lanczos,${CRISP}`);
} else {
  P = D;
  const aspect = cfg.phoneAspect ?? 9 / 16;
  PH = Math.round(PW / aspect / 2) * 2;
  const cropW = Math.round(D.H * aspect) & ~1;
  const k = cfg.cx;
  const x = (c) => `max(0\\,min(${D.W - cropW}\\,${D.W}*(${c})-${cropW / 2}))`;
  let e = x(k[k.length - 1][1]);
  for (let i = k.length - 1; i >= 1; i--) {
    const [n0, c0] = k[i - 1], [n1, c1] = k[i];
    e = `if(lte(n\\,${n1})\\,${x(`${c0}+(${c1 - c0})*(n-${n0})/${n1 - n0}`)}\\,${e})`;
  }
  const cropX = `if(lte(n\\,${k[0][0]})\\,${x(k[0][1])}\\,${e})`;
  pLow = decodeAll(D, "m", `crop=${cropW}:${D.H}:'${cropX}':0,scale=${PW}:${PH}:flags=lanczos,${CRISP}`);
  pHi = decodeAll(D, "mh", `crop=${cropW}:${D.H}:'${cropX}':0,${CRISP}`);
}
const pHiMeta = await sharp(pHi(0)).metadata();

/* ---------- encode ---------- */
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
const hash = crypto.createHash("sha1");
const write = (file, buf) => {
  fs.writeFileSync(path.join(outDir, file), buf);
  hash.update(buf);
  return buf.length;
};
async function encode(frames, prefix, srcOf, kind) {
  let sum = 0;
  for (let i = 0; i < frames.length; i += 4) {
    const bufs = await Promise.all(
      frames.slice(i, i + 4).map((n) =>
        kind === "low"
          ? sharp(srcOf(n)).webp({ quality: Q.low, effort: 6 }).toBuffer()
          : sharp(srcOf(n)).avif({ quality: Q.hi, effort: 4, bitdepth: 10 }).toBuffer(),
      ),
    );
    bufs.forEach((b, k) => (sum += write(`${prefix}-${pad(i + k)}.${kind === "low" ? "webp" : "avif"}`, b)));
  }
  return sum;
}
const dIdx = pick(D.total, cfg.desktop, 1, denseFrac);
const pDense = cfg.phoneShots && cfg.phoneDense ? cfg.phoneDense.map((n) => n / (P.total - 1)) : denseFrac;
const pIdx = pick(P.total, cfg.phone, 2, pDense);
const bytes = {
  d: await encode(dIdx, "d", dLow, "low"),
  dh: await encode(dIdx, "dh", dHi, "hi"),
  m: await encode(pIdx, "m", pLow, "low"),
  mh: await encode(pIdx, "mh", pHi, "hi"),
};

/** A still for desktop (-d) and phone (-m): the HD film frame at a story fraction, or a keyframe image (desktop). */
async function still(name, image, frac) {
  const dn = Math.round(frac * (D.total - 1));
  const pn = Math.round(frac * (P.total - 1));
  const d = image ? sharp(expand(image)).resize({ width: 1920 }) : sharp(dHi(dn)).resize({ width: 1920 });
  const m = sharp(pHi(pn)).resize({ width: 750 });
  for (const [img, suffix] of [[d, "d"], [m, "m"]]) {
    const a = await img.clone().avif({ quality: Q.still, effort: 6, bitdepth: 10 }).toBuffer();
    const b = await img.clone().webp({ quality: Q.stillWebp, effort: 6 }).toBuffer();
    write(`${name}-${suffix}.avif`, a);
    write(`${name}-${suffix}.webp`, b);
    console.log(`${name}-${suffix}: avif ${(a.length / 1024).toFixed(0)}K, webp ${(b.length / 1024).toFixed(0)}K`);
  }
}
const frac = (n) => n / (D.total - 1);
await still("poster", null, 0);
await still("still", cfg.still, frac(cfg.stillFrame ?? Math.round((D.total - 1) * cfg.stillAt)));
if (cfg.mid || cfg.midFrame != null) await still("mid", cfg.mid, frac(cfg.midFrame ?? Math.round((D.total - 1) * 0.45)));

// the sky colour at the top of the phone poster (fills the scene behind it)
const top = await sharp(path.join(outDir, "poster-m.webp")).extract({ left: 0, top: 0, width: 36, height: 4 }).stats();
const posterSky = "#" + top.channels.slice(0, 3).map((c) => Math.round(c.mean).toString(16).padStart(2, "0")).join("");

const manifest = {
  v: hash.digest("hex").slice(0, 10),
  posterSky,
  source: { width: D.W, height: D.H, frames: D.total },
  desktop: { count: dIdx.length, width: DW, height: DH, focusX: cfg.focusX ?? 0.63, frames: dIdx, last: D.total - 1, hi: { width: dHiMeta.width, height: dHiMeta.height } },
  phone: { count: pIdx.length, width: PW, height: PH, focusX: 0.5, frames: pIdx, last: P.total - 1, vertical: !!cfg.phoneShots, hi: { width: pHiMeta.width, height: pHiMeta.height } },
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest) + "\n");
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`desktop: ${dIdx.length} frames, low ${mb(bytes.d)}, HD ${dHiMeta.width}w ${mb(bytes.dh)} (${(bytes.dh / dIdx.length / 1024).toFixed(0)}K avg)`);
console.log(`phone:   ${pIdx.length} frames, low ${mb(bytes.m)}, HD ${pHiMeta.width}x${pHiMeta.height} ${mb(bytes.mh)} (${(bytes.mh / pIdx.length / 1024).toFixed(0)}K avg)`);
console.log(`manifest v=${manifest.v}`);
