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

export function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme);
}
