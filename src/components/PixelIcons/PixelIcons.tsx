/**
 * 8-bit pixel-art social icons.
 * Each icon is a 12×12 grid rendered as 2×2px rects in a 24×24 SVG viewBox.
 * Uses `currentColor` so they inherit text color from their parent.
 */

type Grid = (0 | 1)[][];

function PixelIcon({ grid, size = 20 }: { grid: Grid; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ imageRendering: "pixelated" }}
      aria-hidden="true"
    >
      {grid.flatMap((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect
              key={`${x}-${y}`}
              x={x * 2}
              y={y * 2}
              width={2}
              height={2}
              fill="currentColor"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

// ── GitHub ────────────────────────────────────────────────────────────────────
// Simplified octocat silhouette: round head + cat ears + tentacles at bottom
const GITHUB: Grid = [
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1], // eye sockets
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0], // tentacle roots
  [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0], // tentacles splaying
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
];

// ── LinkedIn ──────────────────────────────────────────────────────────────────
// Solid square border with pixel-art "in" inside
const LINKEDIN: Grid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], // i-dot row
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // i-gap row
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1], // i-body + n-top
  [1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1], // n-elbow
  [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1], // n-sides
  [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // bottom padding
];

export function GithubIcon({ size = 20 }: { size?: number }) {
  return <PixelIcon grid={GITHUB} size={size} />;
}

export function LinkedinIcon({ size = 20 }: { size?: number }) {
  return <PixelIcon grid={LINKEDIN} size={size} />;
}
