// Post-build guard: next/font's generated Arial fallbacks must not ship.
// The site sets `adjustFontFallback: false` and supplies metric-matched faces
// in src/app/font-fallbacks.css. Turbopack (Next 16.4) ignores that option and
// emits "Geist Fallback" / "Geist Mono Fallback" (src: local(Arial)) ahead of
// ours, which is why `dev`/`build` use webpack. Fails if they reappear.
import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), ".next", "static");
const offenders = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (
      file.endsWith(".css") &&
      /Geist (Mono )?Fallback/.test(fs.readFileSync(file, "utf8"))
    ) {
      offenders.push(path.relative(process.cwd(), file));
    }
  }
};
if (!fs.existsSync(root)) {
  console.error(
    "checkFontFallbacks: run after `next build` (.next/static missing)",
  );
  process.exit(1);
}
walk(root);
if (offenders.length > 0) {
  console.error(
    `checkFontFallbacks: next/font fallback faces found in ${offenders.join(", ")}.\n` +
      "They override src/app/font-fallbacks.css; build with webpack (see package.json).",
  );
  process.exit(1);
}
console.log("checkFontFallbacks: ok");
