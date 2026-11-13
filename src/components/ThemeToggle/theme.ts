export const THEMES = ["system", "light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint: applies a stored explicit theme as
 * `data-theme` on <html>. "system" (or nothing stored) leaves the attribute
 * off so the `prefers-color-scheme` media query in globals.css decides.
 * Kept tiny and dependency-free; it is inlined as a string.
 */
export const themeInitScript = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

/**
 * CSP source for the inline script above, for a future
 * `script-src 'self' <hash>` (no CSP is set today). `pnpm lint` fails if it
 * no longer matches the script (scripts/checkCspHash.mjs).
 */
export const THEME_INIT_SCRIPT_CSP_HASH =
  "'sha256-opRjTqQ1E5eUpc4SE9v3YoU5wuVpgtqT7zsobCj245Q='";

export function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme);
}
