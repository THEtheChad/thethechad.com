// Guards the duplicated light palette in src/app/globals.css: the explicit
// `:root[data-theme="light"]` block and the OS-following
// `@media (prefers-color-scheme: light) { :root:not([data-theme]) }` block
// must declare exactly the same tokens. Run by `pnpm lint`.

import { readFileSync } from "node:fs";

const file = new URL("../src/app/globals.css", import.meta.url);
const css = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

/** The declarations of the first `{…}` block after `selector`, normalized. */
function block(selector, from = 0) {
  const at = css.indexOf(selector, from);
  if (at === -1) throw new Error(`selector not found: ${selector}`);
  const open = css.indexOf("{", at + selector.length);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}" && --depth === 0) {
      return css
        .slice(open + 1, i)
        .split(";")
        .map((d) => d.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .sort();
    }
  }
  throw new Error(`unclosed block: ${selector}`);
}

const explicit = block(':root[data-theme="light"]');
const media = css.indexOf("@media (prefers-color-scheme: light)");
if (media === -1)
  throw new Error("prefers-color-scheme: light block not found");
const followsOs = block(":root:not([data-theme])", media);

const onlyIn = (a, b) => a.filter((d) => !b.includes(d));
const missing = [
  ...onlyIn(explicit, followsOs).map(
    (d) => `  only in [data-theme="light"]: ${d}`,
  ),
  ...onlyIn(followsOs, explicit).map(
    (d) => `  only in prefers-color-scheme: ${d}`,
  ),
];

if (missing.length > 0) {
  console.error(
    `globals.css: the two light-theme token blocks diverge:\n${missing.join("\n")}`,
  );
  process.exit(1);
}
