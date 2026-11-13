const paths = {
  play: <path d="M4 2.5v11l9.5-5.5z" />,
  pause: <path d="M3 2h3.5v12H3zM9.5 2H13v12H9.5z" />,
  prev: <path d="M2 2h2v12H2zM14 2v12L5 8z" />,
  next: <path d="M12 2h2v12h-2zM2 2v12l9-6z" />,
  list: <path d="M2 3h12v1.5H2zM2 7.25h12v1.5H2zM2 11.5h8v1.5H2z" />,
} as const;

export type DeckIconName = keyof typeof paths;

/** 16×16 transport glyphs in currentColor; decorative (buttons carry labels). */
export function DeckIcon({ name }: { name: DeckIconName }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
