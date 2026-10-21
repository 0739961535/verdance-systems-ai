// After `next build`: fail the build if the compiled CSS is missing rules from
// the end of src/app/globals.css. A production deploy once shipped new pages
// with stale CSS (the tail of globals.css missing), and nothing caught it.
// Each marker is a rule near the end of globals.css; add new ones as the file grows.
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const MARKERS = [
  [/--st-attn:\s*#8a5000/i, "the Operations Team attn colour (contrast fix)"],
  [/\.wa-bubble\[data-dir=["']?out["']?\]\s*\.wa-time/i, "the sent-message time contrast fix"],
  [/:where\(\.ix-card/i, "the premium card hover block"],
  [/pointer:\s*coarse/i, "the 44px touch areas"],
];

const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".css")) files.push(p);
  }
};
walk(".next/static");
const css = files.map((f) => readFileSync(f, "utf8")).join("\n");
const missing = MARKERS.filter(([re]) => !re.test(css));
if (!files.length || missing.length) {
  console.error(`check-built-css: ${files.length} CSS files; missing:\n- ${missing.map(([, n]) => n).join("\n- ") || "no CSS found"}`);
  process.exit(1);
}
console.log(`check-built-css: ok (${MARKERS.length} markers in ${files.length} files)`);
