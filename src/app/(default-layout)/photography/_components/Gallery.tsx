"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface Photo {
  src: string;
  alt: string;
  title?: string;
  location?: string;
}

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = lightbox !== null;

  // Native modal dialog: traps focus, makes the page inert, renders in the
  // top layer (above the sticky header and player), closes on Escape, and restores focus to
  // the thumbnail that opened it.
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

  // Arrow-key navigation (Escape is handled natively by the dialog)
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i !== null ? (i - 1 + photos.length) % photos.length : null,
        );
      if (e.key === "ArrowRight")
        setLightbox((i) => (i !== null ? (i + 1) % photos.length : null));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, photos.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const active = lightbox !== null ? photos[lightbox] : null;

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setLightbox(i)}
            className="group mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-[10px] border border-rim bg-ink text-left transition-colors duration-150 hover:border-rim-strong"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                className="object-cover"
              />
            </div>

            {(photo.title || photo.location) && (
              <div className="px-3 py-2.5 font-mono text-xs tracking-[0.06em]">
                {photo.title && <p className="text-text">{photo.title}</p>}
                {photo.location && (
                  <p className="mt-0.5 text-muted">{photo.location}</p>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={() => setLightbox(null)}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none items-center justify-center border-0 bg-night/95 p-0 text-text backdrop-blur-sm open:flex backdrop:bg-transparent"
      >
        {active && lightbox !== null && (
          <>
            {/* Backdrop — click outside the image to close */}
            <button
              type="button"
              tabIndex={-1}
              aria-label="Close photo viewer"
              onClick={() => setLightbox(null)}
              className="absolute inset-0 cursor-default"
            />

            {/* Pagination — top center, static */}
            <p className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 font-mono text-xs text-muted tabular-nums">
              {lightbox + 1}&nbsp;/&nbsp;{photos.length}
            </p>

            {/* Image container */}
            <div className="relative">
              <div className="overflow-hidden rounded-ctl border border-rim">
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={1600}
                  height={1200}
                  className="max-h-[80vh] max-w-[82vw] w-auto h-auto object-contain"
                  priority
                />
              </div>

              {/* Caption */}
              {(active.title || active.location) && (
                <div className="mt-2 px-1">
                  {active.title && (
                    <p className="font-mono text-xs text-text">
                      {active.title}
                    </p>
                  )}
                  {active.location && (
                    <p className="mt-0.5 font-mono text-xs text-muted">
                      {active.location}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Prev */}
            <button
              type="button"
              onClick={() =>
                setLightbox((i) =>
                  i !== null ? (i - 1 + photos.length) % photos.length : null,
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex size-11 items-center justify-center rounded-ctl border border-rim-strong bg-ink/80 font-mono text-base text-text backdrop-blur-sm transition-colors duration-150 hover:bg-raise"
            >
              <span aria-hidden="true">◄</span>
              <span className="sr-only">Previous photo</span>
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={() =>
                setLightbox((i) =>
                  i !== null ? (i + 1) % photos.length : null,
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex size-11 items-center justify-center rounded-ctl border border-rim-strong bg-ink/80 font-mono text-base text-text backdrop-blur-sm transition-colors duration-150 hover:bg-raise"
            >
              <span aria-hidden="true">►</span>
              <span className="sr-only">Next photo</span>
            </button>

            {/* Close */}
            <button
              ref={closeRef}
              type="button"
              aria-label="Close photo viewer"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-ctl border border-rim-strong bg-ink/80 font-mono text-base text-text backdrop-blur-sm transition-colors duration-150 hover:bg-raise"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
