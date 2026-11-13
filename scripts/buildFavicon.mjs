// Simplified small-size icon: the red Ultra "the" outline on a night tile.
// Usage: node scripts/buildFavicon.mjs <repo root> <out dir>  (e.g. `. src/app`)
// Uses the sharp that Next already depends on (no new dependency), resolved
// from next's own install so pnpm's isolated layout finds it.
import fs from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(
  fs.realpathSync(resolve(process.argv[2], "node_modules/next/package.json")),
);
const sharp = require("sharp");
const src = fs.readFileSync(
  `${process.argv[2]}/src/components/Wordmark/ultraThe.ts`,
  "utf8",
);
const path = src.match(/ULTRA_THE_PATH\s*=\s*\n?\s*"([^"]+)"/)[1];
const [vx, vy, vw, vh] = src
  .match(/ULTRA_THE_VIEWBOX\s*=\s*"([^"]+)"/)[1]
  .split(/\s+/)
  .map(Number);
// Fit the glyphs into a 32-unit tile with ~3 units of padding each side.
const s = 26 / vw,
  tx = 3 - vx * s,
  ty = 16 - (vy + vh / 2) * s;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <title>THE the Chad</title>
  <rect width="32" height="32" rx="6" fill="#0d0b14"/>
  <path transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${s.toFixed(5)})" fill="#ff4433" d="${path}"/>
</svg>
`;
fs.writeFileSync(`${process.argv[3]}/icon.svg`, svg);
const pngs = await Promise.all(
  [16, 32].map((n) =>
    sharp(Buffer.from(svg), { density: 72 * (n / 32) * 8 })
      .resize(n, n)
      .png()
      .toBuffer(),
  ),
);
// ICO with embedded PNG entries.
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const n = [16, 32][i];
  const e = 6 + 16 * i;
  header.writeUInt8(n, e);
  header.writeUInt8(n, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(png.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += png.length;
});
fs.writeFileSync(
  `${process.argv[3]}/favicon.ico`,
  Buffer.concat([header, ...pngs]),
);
if (process.env.PREVIEW)
  for (const n of [16, 32, 64])
    await sharp(Buffer.from(svg), { density: 72 * 8 })
      .resize(n, n)
      .png()
      .toFile(`${process.argv[3]}/preview-${n}.png`);
console.log("viewBox", vx, vy, vw, vh, "scale", s.toFixed(4));
