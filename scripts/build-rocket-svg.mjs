// Renders the static rocket hull (src/components/rocket/RocketHull.tsx) to
// public/rocket/{upper,booster,stack}.svg. Run after editing the hull:
//   npm run rocket:svg
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const src = path.join(root, "src/components/rocket");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "rocket-"));
for (const f of ["RocketArt.tsx", "RocketHull.tsx"]) {
  const out = ts.transpileModule(fs.readFileSync(path.join(src, f), "utf8"), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText.replace(/from "\.\/(\w+)"/g, 'from "./$1.mjs"');
  fs.writeFileSync(path.join(tmp, f.replace(".tsx", ".mjs")), out);
}
// resolve react from the project, not the temp dir
fs.symlinkSync(path.join(root, "node_modules"), path.join(tmp, "node_modules"));
const { createElement } = await import(pathToFileURL(path.join(root, "node_modules/react/index.js")).href);
const { renderToStaticMarkup } = await import(pathToFileURL(path.join(root, "node_modules/react-dom/server.node.js")).href);
const hull = await import(pathToFileURL(path.join(tmp, "RocketHull.mjs")).href);

const outDir = path.join(root, "public/rocket");
fs.mkdirSync(outDir, { recursive: true });
const files = [
  ["upper.svg", hull.UpperBody, "0 0 80 142"],
  ["booster.svg", hull.BoosterBody, "0 0 80 168"],
  ["stack.svg", hull.StackBody, "0 0 80 286"],
];
for (const [name, C, vb] of files) {
  const [, , w, h] = vb.split(" ");
  const svg = renderToStaticMarkup(
    createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: vb, width: w, height: h, fill: "none" }, createElement(C, { id: "r" })),
  ) + "\n";
  fs.writeFileSync(path.join(outDir, name), svg);
  console.log(name, svg.length, "bytes");
}
fs.rmSync(tmp, { recursive: true, force: true });
