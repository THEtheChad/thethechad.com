// Fails when THEME_INIT_SCRIPT_CSP_HASH no longer matches the inline
// pre-paint theme script, so a future CSP can trust the hash. Run by
// `pnpm lint` (Node strips the types from theme.ts).

import { createHash } from "node:crypto";
import {
  THEME_INIT_SCRIPT_CSP_HASH,
  themeInitScript,
} from "../src/components/ThemeToggle/theme.ts";

const actual = `'sha256-${createHash("sha256").update(themeInitScript).digest("base64")}'`;

if (actual !== THEME_INIT_SCRIPT_CSP_HASH) {
  console.error(
    `theme.ts: THEME_INIT_SCRIPT_CSP_HASH is stale. Set it to:\n  ${actual}`,
  );
  process.exit(1);
}
