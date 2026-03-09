"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PixelGlitch } from "@/components/PixelGlitch/PixelGlitch";

export interface Photo {
  src: string;
  alt: string;
  title?: string;
  location?: string;
}

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i !== null ? (i - 1 + photos.length) % photos.length : null,
        );
      if (e.key === "ArrowRight")
        setLightbox((i) => (i !== null ? (i + 1) % photos.length : null));
      if (e.key === "Escape") setLightbox(null);
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
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setLightbox(i)}
            className="group relative mb-3 block w-full break-inside-avoid cursor-zoom-in"
          >
            <div className="corner-frame relative overflow-hidden border border-line transition-colors hover:border-accent/60">
              {/* Thumbnail */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                />
                {/* CRT scan lines */}
                <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-25" />
                <div className="transition-opacity duration-300 group-hover:opacity-0">
                  <PixelGlitch src={photo.src} slow />
                </div>
              </div>

              {/* Caption bar */}
              {(photo.title || photo.location) && (
                <div className="bg-card px-3 py-2 text-left">
                  {photo.title && (
                    <p className="font-pixel text-[9px] text-body">
                      {photo.title}
                    </p>
                  )}
                  {photo.location && (
                    <p className="mt-0.5 font-pixel text-[8px] text-soft">
                      {photo.location}
                    </p>
                  )}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox — rendered via portal outside the CRT overlay */}
      {active && lightbox !== null && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-page/96 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          {/* Pagination — top center, static */}
          <p className="absolute top-4 left-1/2 -translate-x-1/2 font-pixel text-[8px] text-soft tabular-nums">
            {lightbox + 1}&nbsp;/&nbsp;{photos.length}
          </p>

          {/* Image container */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <div className="corner-frame border border-line/60">
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
                  <p className="font-pixel text-[9px] text-body">{active.title}</p>
                )}
                {active.location && (
                  <p className="mt-0.5 font-pixel text-[8px] text-soft">{active.location}</p>
                )}
              </div>
            )}
          </div>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) =>
                i !== null ? (i - 1 + photos.length) % photos.length : null,
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 border border-line bg-card/80 px-4 py-3 font-pixel text-[10px] text-soft backdrop-blur-sm transition-colors hover:border-accent-soft hover:text-accent-soft"
          >
            ◄
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i !== null ? (i + 1) % photos.length : null));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 border border-line bg-card/80 px-4 py-3 font-pixel text-[10px] text-soft backdrop-blur-sm transition-colors hover:border-accent-soft hover:text-accent-soft"
          >
            ►
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 border border-line bg-card/80 px-3 py-2 font-pixel text-[10px] text-soft backdrop-blur-sm transition-colors hover:border-accent-soft hover:text-accent-soft"
          >
            ✕
          </button>
        </div>,
        document.body,
      )}
    </>
  );
}
