// Renders the flight's three star layers (src/components/home/flight/flightData.ts)
// to public/flight/stars-{0,1,2}.svg, so the 126 stars stay out of the HTML.
//   npm run flight:stars
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "stars-"));
const code = ts.transpileModule(fs.readFileSync(path.join(root, "src/components/home/flight/flightData.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
fs.writeFileSync(path.join(tmp, "flightData.mjs"), code);
const fd = await import(pathToFileURL(path.join(tmp, "flightData.mjs")).href);
const starDir = path.join(root, "public/flight");
fs.mkdirSync(starDir, { recursive: true });
fd.STAR_LAYERS.forEach((l, i) => {
  const dots = fd.stars(l.seed, l.count, l.maxR)
    .map((s) => `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill-opacity="${s.o}"/>`)
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 900" width="400" height="900" fill="#E8EEFF">${dots}</svg>\n`;
  fs.writeFileSync(path.join(starDir, `stars-${i}.svg`), svg);
  console.log(`stars-${i}.svg`, svg.length, "bytes");
});
fs.rmSync(tmp, { recursive: true, force: true });
