/**
 * Four warm EQ bars (mock `.eq`). A static silhouette at rest; the CSS loop in
 * globals.css (`.eq-bars`) runs only while `playing` and never under reduced
 * motion. Pure CSS: no analyser, no requestAnimationFrame.
 */
export function EqBars({ playing }: { playing: boolean }) {
  return (
    <span
      aria-hidden="true"
      data-playing={playing ? "" : undefined}
      className="eq-bars inline-flex h-3.5 shrink-0 items-end gap-0.5"
    >
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
