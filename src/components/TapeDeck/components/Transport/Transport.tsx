import { twMerge } from "tailwind-merge";
import { DeckIcon } from "../DeckIcon/DeckIcon";

export const deckButton =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-rim-strong text-text transition-colors duration-150 hover:bg-raise";

export const playButton =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-pink bg-pink text-on-accent transition-colors duration-150 hover:border-pink-ink hover:bg-pink-ink";

export interface TransportProps {
  playing: boolean;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  /** Extra classes for the prev/next buttons (e.g. responsive display). */
  skipClassName?: string;
  className?: string;
}

/** Previous · play/pause · next, each a 44px round button. */
export function Transport({
  playing,
  onToggle,
  onPrev,
  onNext,
  skipClassName,
  className,
}: TransportProps) {
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous track"
        className={twMerge(deckButton, skipClassName)}
      >
        <DeckIcon name="prev" />
      </button>
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? "Pause" : "Play"}
        className={playButton}
      >
        <DeckIcon name={playing ? "pause" : "play"} />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        className={twMerge(deckButton, skipClassName)}
      >
        <DeckIcon name="next" />
      </button>
    </div>
  );
}
