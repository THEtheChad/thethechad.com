import fs from "node:fs";
import path from "node:path";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import Gallery, { type Photo } from "./_components/Gallery";

export const metadata = {
  title: "Photography | Chad",
  description: "A collection of photographs by Chad.",
};

const PHOTOS_DIR = path.join(process.cwd(), "public", "photography");
const IMAGE_RE = /\.(jpg|jpeg|png|webp|avif)$/i;

interface MetadataMap {
  [filename: string]: { title?: string; location?: string };
}

function loadPhotos(): Photo[] {
  if (!fs.existsSync(PHOTOS_DIR)) return [];

  let meta: MetadataMap = {};
  const metaPath = path.join(PHOTOS_DIR, "metadata.json");
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    } catch {}
  }

  return fs
    .readdirSync(PHOTOS_DIR)
    .filter((f) => IMAGE_RE.test(f))
    .sort()
    .map((filename) => ({
      src: `/photography/${filename}`,
      alt: filename.replace(IMAGE_RE, "").replace(/[-_]/g, " "),
      ...(meta[filename] ?? {}),
    }));
}

export default function PhotographyPage() {
  const photos = loadPhotos();

  return (
    <>
      <SectionHeader as="h1" index="04" title="photos" />
      {photos.length > 0 ? (
        <Gallery photos={photos} />
      ) : (
        <div className="rounded-plate border-2 border-rim px-8 py-16 text-center font-mono text-[13px]">
          <p className="text-pink-ink">No images found</p>
          <p className="mt-3 text-muted">
            Drop photos into public/photography/
          </p>
          <p className="mt-2 text-subtle">
            Optional: add public/photography/metadata.json for titles
          </p>
        </div>
      )}
    </>
  );
}
