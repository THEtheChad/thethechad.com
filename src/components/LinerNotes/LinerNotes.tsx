import { Plate } from "@/components/Plate/Plate";
import { Side } from "./components/Side/Side";
import { linerNotes } from "./linerNotes";

/**
 * The profile's liner-notes.svg as real HTML: Side A and Side B track lists on
 * an always-dark plate, side by side from 720px with a hairline between them.
 */
export function LinerNotes() {
  const starts = linerNotes.map((_, i) =>
    linerNotes.slice(0, i).reduce((n, side) => n + side.tracks.length, 1),
  );

  return (
    <Plate caption="Recorded in Kansas City">
      <div className="relative grid gap-7 min-[720px]:grid-cols-2 min-[720px]:gap-x-[clamp(24px,6vw,72px)] min-[720px]:before:absolute min-[720px]:before:inset-y-0 min-[720px]:before:left-1/2 min-[720px]:before:w-px min-[720px]:before:bg-rim">
        {linerNotes.map((side, i) => (
          <Side key={side.side} {...side} start={starts[i]} />
        ))}
      </div>
    </Plate>
  );
}
