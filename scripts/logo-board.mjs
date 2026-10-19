// Renders the rocket logo concepts into PNG preview boards: each mark at
// 512, 64 and 16 px, brand colour and one colour, on light and dark.
// Usage: node scripts/logo-board.mjs <conceptDir>
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2];
const font = fs.readFileSync(path.resolve("src/fonts/satoshi/Satoshi-Variable.woff2")).toString("base64");
const concepts = [
  ["1-launch-v", "Launch V", "Our V, with the centre line turned into a rocket leaving the pad."],
  ["2-ascent", "Ascent", "The V is the flight path: down to the problem, then up and away."],
  ["3-v-tail-rocket", "V-tail rocket", "One solid rocket with the V cut into its tail."],
];
const read = (f) => fs.readFileSync(path.join(dir, f), "utf8");
const sized = (svg, s, color) => svg.replace(/width="48" height="48"/, `width="${s}" height="${s}" style="color:${color}"`).replace(/id="g"/g, `id="g${s}${color.replace(/\W/g, "")}"`).replace(/url\(#g\)/g, `url(#g${s}${color.replace(/\W/g, "")})`);

function panel(name, theme) {
  const dark = theme === "dark";
  const bg = dark ? "#0A0A0B" : "#F5F3EE";
  const ink = dark ? "#F2EFE9" : "#0E0E10";
  const brand = read(`${name}.svg`);
  const mono = read(`${name}-mono.svg`);
  return `<div class="panel" style="background:${bg};color:${ink}">
    <div class="big">${sized(brand, 512, ink)}</div>
    <div class="col">
      <div class="row">${sized(brand, 64, ink)}${sized(mono, 64, ink)}</div>
      <div class="row small">${sized(brand, 16, ink)}${sized(mono, 16, ink)}<span>16 px</span></div>
      <div class="lock">${sized(brand, 40, ink)}<b>Verdance</b><i>Systems AI</i></div>
    </div>
  </div>`;
}

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1800, height: 800 }, deviceScaleFactor: 1 });
const css = `@font-face{font-family:Satoshi;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:300 900}
body{margin:0;font-family:Satoshi,system-ui;background:#1a1a1c;color:#ddd}
h2{margin:0;padding:28px 32px 6px;font-weight:600;font-size:26px;letter-spacing:-.02em}
p{margin:0;padding:0 32px 18px;color:#aaa;font-size:17px}
.wrap{display:grid;grid-template-columns:1fr 1fr;gap:0}
.panel{display:flex;gap:40px;align-items:center;padding:28px 32px}
.col{display:flex;flex-direction:column;gap:28px}
.row{display:flex;gap:22px;align-items:center}.row.small span{font-size:12px;opacity:.5}
.lock{display:flex;align-items:center;gap:10px;font-size:24px}.lock b{font-weight:600;letter-spacing:-.035em}.lock i{opacity:.6;font-style:italic;font-family:Georgia,serif}
.big svg{width:340px;height:340px}`;
let all = "";
for (const [name, title, idea] of concepts) {
  const section = `<section><h2>${title}</h2><p>${idea}</p><div class="wrap">${panel(name, "light")}${panel(name, "dark")}</div></section>`;
  all += section;
  await p.setContent(`<style>${css}</style>${section}`);
  await p.waitForTimeout(200);
  await p.screenshot({ path: path.join(dir, `board-${name}.png`), fullPage: true });
}
await p.setContent(`<style>${css}</style>${all}`);
await p.waitForTimeout(200);
await p.screenshot({ path: path.join(dir, `board-all.png`), fullPage: true });
// a true 512 px render of each mark, light and dark, for reference
for (const [name] of concepts) {
  for (const [theme, bg, ink] of [["light", "#F5F3EE", "#0E0E10"], ["dark", "#0A0A0B", "#F2EFE9"]]) {
    await p.setViewportSize({ width: 512, height: 512 });
    await p.setContent(`<body style="margin:0;background:${bg}">${sized(read(`${name}.svg`), 512, ink)}</body>`);
    await p.screenshot({ path: path.join(dir, `${name}-512-${theme}.png`) });
  }
}
await b.close();
console.log("boards written");
