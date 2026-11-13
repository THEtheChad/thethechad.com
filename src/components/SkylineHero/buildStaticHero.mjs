// Builds hero-static.svg, the still frame behind the hero's pause control,
// from the vendored hero.svg (which is never edited; see ./README.md).
//
// The generator (THEtheChad/tools/build_assets.py) ends every asset's <style>
// with its REDUCED_MOTION rule:
//   @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
// and guarantees the art is complete at rest. The still frame is that rule
// applied unconditionally: the media wrapper is dropped and its body kept, so
// every drone sits in its final formation and nothing loops.
//
//   node src/components/SkylineHero/buildStaticHero.mjs          # write
//   node src/components/SkylineHero/buildStaticHero.mjs --check  # verify (lint)
//
// No dependencies: it is a string transform that fails loudly if the vendored
// file stops matching the shape it expects.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const source = fileURLToPath(new URL("./hero.svg", import.meta.url));
const target = fileURLToPath(new URL("./hero-static.svg", import.meta.url));

const REDUCED_MOTION =
  /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{\s*(\*\s*\{\s*animation\s*:\s*none\s*!important\s*;?\s*\})\s*\}/g;

const BANNER =
  "<!-- GENERATED from hero.svg by buildStaticHero.mjs (its reduced-motion rule, applied unconditionally). Do not edit; re-run the script. -->\n";

const svg = readFileSync(source, "utf8");
const matches = svg.match(REDUCED_MOTION) ?? [];
if (matches.length !== 1) {
  console.error(
    `buildStaticHero: expected exactly one reduced-motion rule in hero.svg, found ${matches.length}. ` +
      "The generator's output changed; update this script.",
  );
  process.exit(1);
}
if (/<(animate|animateTransform|animateMotion|set)\b/.test(svg)) {
  console.error(
    "buildStaticHero: hero.svg now has SMIL animation, which the CSS rule does not stop. Update this script.",
  );
  process.exit(1);
}

const output = BANNER + svg.replace(REDUCED_MOTION, "$1");

if (process.argv.includes("--check")) {
  let current = "";
  try {
    current = readFileSync(target, "utf8");
  } catch {}
  if (current !== output) {
    console.error(
      "buildStaticHero: hero-static.svg is stale. Run `pnpm hero:static` and commit the result.",
    );
    process.exit(1);
  }
} else {
  writeFileSync(target, output);
}
