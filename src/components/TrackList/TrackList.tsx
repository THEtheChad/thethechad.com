import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface Track {
  title: ReactNode;
  /** Right-aligned mono note, e.g. a year or duration. */
  meta?: string;
}

export interface TrackListProps {
  tracks: readonly Track[];
  /** Number of the first track; Side B of the liner notes starts at 06. */
  start?: number;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Numbered mono rows from liner-notes.svg: pink-ink track numbers, text
 * titles, optional subtle meta. A real ordered list; the zero-padded
 * numerals are decoration, so assistive tech hears the list position once.
 */
export function TrackList({ tracks, start = 1, className }: TrackListProps) {
  return (
    <ol
      start={start}
      className={twMerge("font-mono text-[15px] leading-normal", className)}
    >
      {tracks.map(({ title, meta }, i) => (
        <li
          // biome-ignore lint/suspicious/noArrayIndexKey: static, ordered track list
          key={i}
          className="grid grid-cols-[36px_1fr_auto] items-baseline py-[5px] text-text"
        >
          <span aria-hidden="true" className="text-[13px] text-pink-ink">
            {pad(start + i)}
          </span>
          <span>{title}</span>
          {meta && <span className="pl-3 text-[13px] text-subtle">{meta}</span>}
        </li>
      ))}
    </ol>
  );
}
