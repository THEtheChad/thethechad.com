import fs from "node:fs";
import path from "node:path";
import Gallery, { type Photo } from "./_components/Gallery";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

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
      <SectionHeader title="Photography" />

      {photos.length > 0 ? (
        <Gallery photos={photos} />
      ) : (
        <div className="corner-frame border border-line bg-card px-8 py-16 text-center">
          <p className="mb-3 font-pixel text-[9px] text-pink">
            {/** biome-ignore lint/suspicious/noCommentText: intentional retro aesthetic */}
            // NO IMAGES FOUND
          </p>
          <p className="font-pixel text-[9px] text-soft">
            DROP PHOTOS INTO public/photography/
          </p>
          <p className="mt-2 font-pixel text-[8px] text-line">
            OPTIONAL: ADD public/photography/metadata.json FOR TITLES
          </p>
        </div>
      )}
    </>
  );
}
