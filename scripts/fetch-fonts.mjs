#!/usr/bin/env node
/**
 * Fetches the Satoshi variable webfont from Fontshare into src/fonts/satoshi/
 * before `next dev` and `next build`.
 *
 * Why not commit the file: this repository is public, and the ITF Free Font
 * License (src/fonts/satoshi/LICENSE-FFL.txt) allows self-hosting on our own
 * site but forbids making the font files available through a public
 * repository or download service. So the woff2 is gitignored and pulled at
 * build time; next/font/local then self-hosts it with the site.
 *
 * Idempotent: skips the download when a valid file is already present.
 */
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "src/fonts/satoshi/Satoshi-Variable.woff2");
const CSS_URL = "https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap";

async function isValidWoff2(path) {
  try {
    const s = await stat(path);
    if (s.size < 10_000) return false;
    const buf = await readFile(path);
    return buf.subarray(0, 4).toString("latin1") === "wOF2";
  } catch {
    return false;
  }
}

async function fetchWithRetry(url, tries = 4) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
      return res;
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
  throw lastErr;
}

async function main() {
  if (await isValidWoff2(OUT)) {
    console.log("[fonts] Satoshi already present");
    return;
  }
  const css = await (await fetchWithRetry(CSS_URL)).text();
  const match = css.match(/url\('([^']+?\.woff2)'\)/);
  if (!match) throw new Error("[fonts] could not find a woff2 URL in the Fontshare CSS");
  const fontUrl = match[1].startsWith("//") ? `https:${match[1]}` : match[1];
  const buf = Buffer.from(await (await fetchWithRetry(fontUrl)).arrayBuffer());
  if (buf.subarray(0, 4).toString("latin1") !== "wOF2") {
    throw new Error("[fonts] downloaded file is not a woff2");
  }
  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, buf);
  console.log(`[fonts] Satoshi fetched (${Math.round(buf.length / 1024)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
