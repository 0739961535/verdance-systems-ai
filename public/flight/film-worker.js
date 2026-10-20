/*
 * The film's canvas, off the main thread (FilmController transfers it here
 * with transferControlToOffscreen where the browser supports it).
 *
 * This worker fetches the frames (coarse to fine), decodes them, keeps a
 * window of ImageBitmaps around the playhead, draws the frame for the
 * scroll position, and at rest swaps in the HD frame. The page only posts
 * the playhead; nothing heavy runs in its scroll frames.
 *
 * Messages in:
 *   { type: "init", canvas, set, v }      set: { prefix, count, focusX, phone, pad }
 *   { type: "size", w, h }                canvas backing size in device pixels
 *   { type: "pos", target, zoom, shift, settled }
 * Messages out:
 *   { type: "drawn" }                     after the first frame is on the canvas
 */
let canvas = null;
let ctx = null;
let set = null;
let v = "";
let cw = 0;
let ch = 0;
let target = 0;
let zoom = 1.06;
let shift = 1;
let settled = false;
let firstDrawn = false;
let drawnKey = "";
const blobs = new Map();
const bitmaps = new Map();
const decoding = new Set();
const hi = new Map();
const hiPending = new Set();
let radius = 12;
let abort = new AbortController();

const pad = (i) => String(i).padStart(3, "0");
const url = (i) => `/flight/film/${set.prefix}-${pad(i)}.webp?v=${v}`;
const hiUrl = (i) => `/flight/film/${set.prefix}h-${pad(i)}.avif?v=${v}`;

function coarseToFine(count) {
  const seen = new Set();
  const order = [];
  const add = (i) => {
    if (!seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };
  for (const step of [8, 4, 2, 1]) {
    for (let i = 0; i < count; i += step) add(i);
    add(count - 1);
  }
  return order;
}

// Phones: same maths as placePhone() in FilmController.tsx (keep in step).
function placePhone(bmp, w, h) {
  const P = set.pad;
  const t = shift * shift * (3 - 2 * shift);
  const sCover = Math.max(cw / w, ch / h);
  const sPad = (P.rocket * ch) / P.span / h;
  const s = sCover + (sPad - sCover) * t;
  const dw = w * s;
  const dh = h * s;
  const dxC = Math.min(0, Math.max(cw - dw, cw / 2 - set.focusX * dw));
  const dyC = 0.08 * ch;
  const dxP = P.x * cw - 0.5 * dw;
  const dyP = P.nose * ch - P.top * dh;
  const dx = Math.round(dxC + (dxP - dxC) * t);
  const dy = Math.round(dyC + (dyP - dyC) * t);
  const W = Math.round(dw);
  const H = Math.round(dh);
  const open = dx > 0 || dy > 0 || dx + W < cw || dy + H < ch;
  if (open) {
    ctx.fillStyle = P.bg;
    if (dy > 0) ctx.fillRect(0, 0, cw, dy);
    if (dy + H < ch) ctx.fillRect(0, dy + H, cw, ch - dy - H);
    if (dx > 0) ctx.fillRect(0, 0, dx, ch);
    if (dx + W < cw) ctx.fillRect(dx + W, 0, cw - dx - W, ch);
  }
  ctx.drawImage(bmp, dx, dy, W, H);
  if (!open) return;
  const fx = Math.round(W * P.featherX * t);
  const fy = Math.round(H * P.featherY * t);
  const edge = (x0, y0, x1, y1, rx, ry, rw, rh) => {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, P.bg);
    g.addColorStop(1, "rgba(1, 5, 15, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(rx, ry, rw, rh);
  };
  if (fx > 0 && dx > 0) edge(dx, 0, dx + fx, 0, dx, dy, fx, H);
  if (fx > 0 && dx + W < cw) edge(dx + W, 0, dx + W - fx, 0, dx + W - fx, dy, fx, H);
  const fyTop = Math.max(fy, Math.round(H * 0.05));
  if (dy > 0) edge(0, dy, 0, dy + fyTop, dx, dy, W, fyTop);
  if (fy > 0 && dy + H < ch) edge(0, dy + H, 0, dy + H - fy, dx, dy + H - fy, W, fy);
}

function place(bmp) {
  const w = bmp.width;
  const h = bmp.height;
  const s = Math.max(cw / w, ch / h);
  const dw0 = w * s;
  const dh0 = h * s;
  const dx0 = Math.min(0, Math.max(cw - dw0, cw / 2 - set.focusX * dw0));
  const dy0 = (ch - dh0) / 2;
  if (set.phone) {
    placePhone(bmp, w, h);
    return;
  }
  const ox = cw * 0.63;
  const oy = ch * 0.55;
  const dx = Math.round(ox - (ox - dx0) * zoom);
  const dy = Math.round(oy - (oy - dy0) * zoom);
  ctx.drawImage(bmp, dx, dy, Math.round(dw0 * zoom), Math.round(dh0 * zoom));
}

function nearest(i) {
  for (let d = 0; d < set.count; d++) {
    if (bitmaps.has(i - d)) return i - d;
    if (bitmaps.has(i + d)) return i + d;
  }
  return -1;
}

function draw() {
  if (!ctx || !cw) return;
  const at = nearest(target);
  if (at < 0) return;
  const hd = settled && at === target ? hi.get(target) : undefined;
  // the zoom only matters when the frame changes, or at rest
  const key = `${at}|${hd ? 1 : 0}|${cw}x${ch}|${settled ? zoom + shift : set.phone ? shift : ""}`;
  if (key === drawnKey) return;
  drawnKey = key;
  ctx.imageSmoothingQuality = settled ? "high" : "low";
  place(hd || bitmaps.get(at));
  if (!firstDrawn) {
    firstDrawn = true;
    self.postMessage({ type: "drawn" });
  }
}

function pump() {
  for (const [i, b] of bitmaps) {
    if (Math.abs(i - target) > radius + 2) {
      b.close();
      bitmaps.delete(i);
    }
  }
  for (let d = 0; d <= radius && decoding.size < 3; d++) {
    for (const i of d ? [target + d, target - d] : [target]) {
      if (decoding.size >= 3) break;
      const blob = blobs.get(i);
      if (!blob || bitmaps.has(i) || decoding.has(i)) continue;
      decoding.add(i);
      createImageBitmap(blob)
        .then((bmp) => {
          bitmaps.set(i, bmp);
          draw();
        })
        .catch(() => {})
        .finally(() => {
          decoding.delete(i);
          pump();
        });
    }
  }
}

function load() {
  const order = coarseToFine(set.count);
  const signal = abort.signal;
  let next = 0;
  const run = async () => {
    while (next < order.length) {
      const i = order[next++];
      try {
        const r = await fetch(url(i), { signal, priority: "low" });
        if (!r.ok || !(r.headers.get("content-type") || "").startsWith("image/")) continue;
        blobs.set(i, await r.blob());
        if (Math.abs(i - target) <= radius) pump();
      } catch {
        return;
      }
    }
  };
  for (let k = 0; k < 4; k++) run();
}

function loadHi(i) {
  if (i < 0 || i >= set.count || hi.has(i) || hiPending.has(i) || !set.wantHi) return;
  hiPending.add(i);
  fetch(hiUrl(i), { signal: abort.signal })
    .then((r) => (r.ok && (r.headers.get("content-type") || "").startsWith("image/") ? r.blob() : Promise.reject()))
    .then((b) => createImageBitmap(b))
    .then((bmp) => {
      hi.set(i, bmp);
      for (const [k, b] of hi) {
        if (Math.abs(k - target) > 2) {
          b.close();
          hi.delete(k);
        }
      }
      if (settled && i === target) draw();
    })
    .catch(() => {})
    .finally(() => hiPending.delete(i));
}

self.onmessage = (e) => {
  const m = e.data;
  if (m.type === "init") {
    canvas = m.canvas;
    ctx = canvas.getContext("2d", { alpha: false });
    set = m.set;
    v = m.v;
    radius = set.phone ? 14 : 10;
    load();
  } else if (m.type === "size") {
    cw = canvas.width = m.w;
    ch = canvas.height = m.h;
    if (ctx) ctx.imageSmoothingEnabled = true;
    set.wantHi = m.wantHi;
    drawnKey = "";
    draw();
  } else if (m.type === "pos") {
    const moved = m.target !== target;
    target = m.target;
    zoom = m.zoom;
    shift = m.shift;
    settled = m.settled;
    if (moved) pump();
    draw();
    if (settled) {
      loadHi(target);
      loadHi(target + 1);
      loadHi(target - 1);
    }
  } else if (m.type === "set") {
    abort.abort();
    abort = new AbortController();
    bitmaps.forEach((b) => b.close());
    hi.forEach((b) => b.close());
    bitmaps.clear();
    hi.clear();
    blobs.clear();
    set = m.set;
    radius = set.phone ? 14 : 10;
    drawnKey = "";
    load();
  } else if (m.type === "stop") {
    abort.abort();
    abort = new AbortController();
    bitmaps.forEach((b) => b.close());
    hi.forEach((b) => b.close());
    bitmaps.clear();
    hi.clear();
    blobs.clear();
  }
};
