"use client";

import Image from "next/image";
import { type PointerEvent, useEffect, useRef } from "react";
import type { Photo } from "@/data/photos";

const pad = (n: number) => String(n).padStart(2, "0");

const SWIPE_PX = 48;

const navButton =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-rim-strong bg-ink/80 font-mono text-text transition-colors duration-150 hover:bg-raise";

export interface LightboxProps {
  photos: Photo[];
  /** Index of the open photo; `null` when closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/**
 * Full-screen photo viewer on a native modal <dialog>: traps focus, makes the
 * page inert, renders in the top layer (above the header and the deck),
 * closes on Escape, and the browser returns focus to the thumbnail that
 * opened it. Focus starts on Close. Arrow keys and touch swipes step through
 * the photos (wrapping); a tap on the empty stage closes.
 */
export function Lightbox({
  photos,
  index,
  onIndexChange,
  onClose,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const isOpen = index !== null;
  const count = photos.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function step(delta: number) {
    if (index !== null) onIndexChange((index + delta + count) % count);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  }

  // Swipe: touch/pen only, horizontal-dominant, past a small threshold.
  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse") return;
    swipeStart.current = { x: e.clientX, y: e.clientY };
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
      // The browser still fires a click after the swipe; don't let it close.
      swiped.current = true;
      step(dx < 0 ? 1 : -1);
    }
  }

  const active = index !== null ? photos[index] : null;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Photo viewer"
      onClose={onClose}
      onKeyDown={onKeyDown}
      className="theme-dark fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none flex-col border-0 bg-night/97 p-0 text-text backdrop-blur-sm open:flex backdrop:bg-transparent"
    >
      {active && index !== null && (
        <>
          <div className="site-column flex h-14 shrink-0 items-center justify-between">
            <p className="font-mono text-[13px] tracking-[0.08em] text-muted tabular-nums">
              <span className="sr-only">Photo </span>
              <span className="text-pink-ink">{pad(index + 1)}</span>{" "}
              <span aria-hidden="true">/</span>
              <span className="sr-only">of</span> {pad(count)}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="label inline-flex h-11 items-center rounded-ctl border border-rim-strong px-3.5 text-text transition-colors duration-150 hover:bg-raise"
            >
              Close<span className="sr-only"> photo viewer</span>
            </button>
          </div>

          {/* Stage: tap outside the photo to close; swipe to step. */}
          {/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: pointer-only conveniences; Close, Escape and the arrow buttons cover keyboard use. */}
          <div
            onClick={(e) => {
              if (swiped.current) {
                swiped.current = false;
                return;
              }
              if (e.target === e.currentTarget) onClose();
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              swipeStart.current = null;
            }}
            // A size container, so the photo can be fitted to the stage itself
            // rather than to whichever srcset candidate happened to load.
            className="flex min-h-0 flex-1 touch-pan-y items-center justify-center px-(--gutter) [container-type:size]"
          >
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="100vw"
              loading="eager"
              // Contain-fit by aspect ratio: as wide as the stage allows, or as
              // tall as it allows, whichever is smaller. The box hugs the photo,
              // so taps beside it still reach the stage (and close).
              style={{
                width: `min(100cqw, ${(active.width / active.height) * 100}cqh)`,
              }}
              className="h-auto max-w-none rounded-ctl"
            />
          </div>

          <div className="site-column flex shrink-0 items-center justify-between gap-4 py-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className={navButton}
            >
              <span aria-hidden="true">←</span>
            </button>
            <p
              aria-live="polite"
              className="min-w-0 text-center font-mono text-[13px] tracking-[0.06em] text-muted"
            >
              <span className="text-pink-ink">{pad(index + 1)}</span>
              &nbsp; <span className="text-text">{active.title}</span>
              {active.location && <> · {active.location}</>} · {active.year}
              <span className="sr-only">. {active.alt}</span>
            </p>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className={navButton}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
