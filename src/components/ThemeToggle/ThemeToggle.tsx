"use client";

import { useState, useSyncExternalStore } from "react";
import { twMerge } from "tailwind-merge";
import { isTheme, THEME_STORAGE_KEY, THEMES, type Theme } from "./theme";

const LABELS: Record<Theme, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

const listeners = new Set<() => void>();

function readStoredTheme(): Theme {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : "system";
  } catch {
    return "system";
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") delete root.dataset.theme;
  else root.dataset.theme = theme;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Another tab changed the theme: follow it.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    applyTheme(readStoredTheme());
    onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function setTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked: still switch for this page view.
  }
  applyTheme(theme);
  for (const listener of listeners) listener();
}

export interface ThemeToggleProps {
  /** Show the current mode as visible text next to the icon. */
  showLabel?: boolean;
  className?: string;
}

/**
 * Cycles System → Light → Dark. The stored choice is applied before first
 * paint by `themeInitScript`; this control only changes it.
 */
export function ThemeToggle({
  showLabel = false,
  className,
}: ThemeToggleProps) {
  const theme = useSyncExternalStore(
    subscribe,
    readStoredTheme,
    () => "system" as const,
  );
  const [announcement, setAnnouncement] = useState("");
  const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setTheme(next);
          setAnnouncement(`${LABELS[next]} theme`);
        }}
        aria-label={`Theme: ${LABELS[theme]}`}
        title={`Theme: ${LABELS[theme]} (switch to ${LABELS[next]})`}
        className={twMerge(
          "js-only inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-ctl border border-rim-strong px-2.5 text-muted transition-colors duration-150 hover:bg-raise hover:text-text",
          className,
        )}
      >
        <ThemeIcon theme={theme} />
        {showLabel && (
          <span aria-hidden="true" className="label text-text">
            {LABELS[theme]}
          </span>
        )}
      </button>
      <span role="status" className="sr-only">
        {announcement}
      </span>
    </>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {theme === "system" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
        </>
      )}
      {theme === "light" && (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      )}
      {theme === "dark" && (
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      )}
    </svg>
  );
}
