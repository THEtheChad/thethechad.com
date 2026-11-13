/**
 * Button looks shared by links and buttons: 44px tall, mono caps, 8px radius.
 * Primary is dark text on pink in the dark theme (white on that pink fails);
 * `on-accent` flips to white on the deeper light-theme pink, where it passes.
 */
const base =
  "inline-flex h-11 items-center gap-2 rounded-ctl border px-5 font-mono text-[13px] tracking-[0.12em] uppercase transition-colors duration-150";

export const buttonPrimary = `${base} border-pink bg-pink font-medium text-on-accent hover:border-pink-ink hover:bg-pink-ink hover:underline hover:underline-offset-4`;

export const buttonSecondary = `${base} border-rim-strong text-text hover:bg-raise`;
