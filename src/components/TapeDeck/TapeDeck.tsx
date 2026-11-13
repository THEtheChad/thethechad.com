"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { DeckIcon } from "./components/DeckIcon/DeckIcon";
import { EqBars } from "./components/EqBars/EqBars";
import { TrackSheet } from "./components/TrackSheet/TrackSheet";
import { deckButton, Transport } from "./components/Transport/Transport";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import type { Album } from "./types";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "Side C": the slim player docked at the foot of every page (mock
 * `.deck-bar`). Lives in the default layout, so playback survives client
 * navigation. Albums arrive as props from the build-time listing; no audio is
 * requested until the visitor presses play (see useAudioPlayer).
 *
 * The dock is 56px (+1px rim) — `--dock-h` in globals.css reserves it so it
 * never covers content. The sheet opens above it and is the only place that
 * grows; it's a non-modal disclosure owned by the track-list toggle.
 */
export function TapeDeck({ albums }: { albums: Album[] }) {
  const player = useAudioPlayer(albums);
  const { album, track, trackIdx, playing, currentTime, duration } = player;
  const [sheetOpen, setSheetOpen] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetId = useId();

  // Close the sheet on a press anywhere outside the deck (e.g. a page link).
  useEffect(() => {
    if (!sheetOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (!asideRef.current?.contains(e.target as Node)) setSheetOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [sheetOpen]);

  // Escape closes the sheet and hands focus back to its toggle.
  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "Escape" && sheetOpen) {
      e.stopPropagation();
      setSheetOpen(false);
      toggleRef.current?.focus();
    }
  }

  if (!album || !track) return null;

  const progress = duration ? Math.min(currentTime / duration, 1) : 0;

  return (
    <aside
      ref={asideRef}
      id="music-player"
      tabIndex={-1}
      aria-label="Music player"
      onKeyDown={onKeyDown}
      className="js-only fixed inset-x-0 bottom-0 z-30 flex flex-col-reverse border-t border-rim bg-ink/92 backdrop-blur-md"
    >
      <audio {...player.audioProps} />

      {/* The dock (first in DOM so the toggle precedes the sheet in tab order;
          flex-col-reverse puts the sheet visually above it). */}
      <div className="relative">
        {/* Progress hairline; the labelled seek lives in the sheet. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -top-px h-0.5 origin-left bg-linear-to-r from-pink to-cyan"
          style={{ transform: `scaleX(${progress})` }}
        />
        <div className="site-column flex h-14 items-center gap-3">
          <Transport
            playing={playing}
            onToggle={player.toggle}
            onPrev={player.prev}
            onNext={player.next}
            skipClassName="hidden min-[560px]:inline-flex"
            className="gap-1.5"
          />

          <p className="flex min-w-0 flex-1 items-baseline gap-3 whitespace-nowrap">
            <span className="label hidden shrink-0 text-cyan min-[720px]:inline">
              Side C
            </span>
            <span className="max-w-full shrink-0 truncate text-sm text-text">
              {track.title}
            </span>
            <span className="hidden min-w-0 truncate font-mono text-xs tracking-[0.04em] text-muted min-[720px]:inline">
              {track.artist} <span aria-hidden="true">·</span> {album.name}
            </span>
          </p>

          <EqBars playing={playing} />

          <span className="hidden shrink-0 font-mono text-xs text-muted tabular-nums min-[720px]:inline">
            <span className="sr-only">Track </span>
            {pad(trackIdx + 1)} <span aria-hidden="true">/</span>
            <span className="sr-only">of</span> {pad(album.tracks.length)}
          </span>

          <button
            ref={toggleRef}
            type="button"
            aria-label="Track list"
            aria-expanded={sheetOpen}
            aria-controls={sheetId}
            onClick={() => setSheetOpen((o) => !o)}
            className={`${deckButton} ${sheetOpen ? "bg-raise" : ""}`}
          >
            <DeckIcon name="list" />
          </button>
        </div>

        {/* Announces track changes and play/pause to screen readers. */}
        <p aria-live="polite" className="sr-only">
          {playing ? "Playing" : "Selected"}: {track.title} by {track.artist}
        </p>
      </div>

      <TrackSheet
        id={sheetId}
        open={sheetOpen}
        albums={albums}
        player={player}
      />
    </aside>
  );
}
