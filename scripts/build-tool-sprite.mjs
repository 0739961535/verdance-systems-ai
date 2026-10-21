// Writes public/tools.svg: one <symbol> per tool mark from src/components/home/toolIcons.ts,
// so pages reference the marks (<use href="/tools.svg#tm-name">) instead of inlining every
// path in the HTML and again in the page's RSC payload. Run after build-tool-icons.mjs.
import { readFileSync, writeFileSync } from "fs";
const src = readFileSync("src/components/home/toolIcons.ts", "utf8");
const json = src.slice(src.indexOf("= [") + 2, src.lastIndexOf("]") + 1);
const icons = JSON.parse(json);
const id = (n) => `tm-${n.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
const body = icons.filter((t) => t.path).map((t) => `<symbol id="${id(t.name)}" viewBox="0 0 24 24"><path d="${t.path}"/></symbol>`).join("");
writeFileSync("public/tools.svg", `<svg xmlns="http://www.w3.org/2000/svg">${body}</svg>\n`);
console.log("public/tools.svg", icons.length, "icons");
