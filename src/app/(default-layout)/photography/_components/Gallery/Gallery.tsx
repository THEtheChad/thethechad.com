"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/data/photos";
import { Lightbox } from "./components/Lightbox/Lightbox";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Masonry of full-color photos with numbered mono captions (mock `.photos`).
 * Numbering runs down each column, matching DOM and tab order. Each card is
 * one button that opens the Lightbox; its name is the alt text plus caption.
 */
export function Gallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="columns-1 gap-4 min-[600px]:columns-2 min-[900px]:columns-3">
        {photos.map((photo, i) => (
          <li key={photo.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setOpen(i)}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-ctl border border-rim bg-ink text-left transition-colors duration-150 hover:border-rim-strong"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 900px) 272px, (min-width: 600px) 50vw, 100vw"
                // The first photo is the likely LCP element on this page.
                preload={i === 0}
                className="block h-auto w-full"
              />
              <span className="flex items-baseline justify-between gap-3 px-3 py-2.5 font-mono text-xs tracking-[0.06em] text-muted">
                <span className="min-w-0">
                  {/* Named from content (alt + caption), so the accessible name
                      always contains the visible caption (WCAG 2.5.3). */}
                  <span className="sr-only">. Photo </span>
                  <span className="text-pink-ink">{pad(i + 1)}</span>
                  <span className="sr-only"> of {photos.length},</span>
                  {photo.title && <>&nbsp; {photo.title}</>}
                  {photo.location && <> · {photo.location}</>}
                </span>
                <span className="shrink-0 tabular-nums">{photo.year}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        photos={photos}
        index={open}
        onIndexChange={setOpen}
        onClose={() => setOpen(null)}
      />
    </>
  );
}
