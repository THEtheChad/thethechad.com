import { TrackList } from "@/components/TrackList/TrackList";
import type { LinerNotesSide } from "../../linerNotes";

export interface SideProps extends LinerNotesSide {
  /** Number of this side's first track (numbering runs across sides). */
  start: number;
}

/** One side of the record: a mono cyan label over its track list. */
export function Side({ side, title, tracks, start }: SideProps) {
  return (
    <div>
      <h3 className="label mb-3.5 border-b border-rim pb-2.5 font-normal text-cyan">
        {side} <span aria-hidden="true">·</span>
        <span className="sr-only">:</span> {title}
      </h3>
      <TrackList tracks={tracks} start={start} />
    </div>
  );
}
