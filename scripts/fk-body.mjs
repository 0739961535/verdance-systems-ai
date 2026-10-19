// Flesch-Kincaid on body sentences only (lines of 6+ words) from a measure-home prose dump.
import fs from "node:fs";
const syl = (w) => { w = w.toLowerCase().replace(/[^a-z]/g, ""); if (!w) return 0; if (w.length <= 3) return 1; w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, ""); const m = w.match(/[aeiouy]{1,2}/g); return Math.max(1, m ? m.length : 1); };
for (const f of process.argv.slice(2)) {
  const lines = fs.readFileSync(f, "utf8").split("\n").filter((l) => (l.match(/[A-Za-z]+/g) || []).length >= 6);
  const text = lines.join(" ");
  const sents = text.split(/[.!?]+(?:\s|$)/).filter((s) => /[a-z]/i.test(s));
  const words = text.match(/[A-Za-z][A-Za-z'’-]*/g) || [];
  const sy = words.reduce((a, w) => a + syl(w), 0);
  console.log(f.split("/").pop(), { lines: lines.length, words: words.length, wordsPerSentence: +(words.length / sents.length).toFixed(1), grade: +(0.39 * words.length / sents.length + 11.8 * sy / words.length - 15.59).toFixed(1) });
}
