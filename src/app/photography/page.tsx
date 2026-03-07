import fs from "fs";
import path from "path";
import Nav from "@/components/nav";
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

  // Optional metadata file: public/photography/metadata.json
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
    <div className="min-h-screen bg-page text-body">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Section header */}
        <div className="mb-10 flex items-center gap-4">
          <span className="font-pixel text-[9px] text-pink">//</span>
          <h1 className="font-retro text-4xl text-body">PHOTOGRAPHY</h1>
          <div
            className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent"
            style={{ boxShadow: "0 0 6px rgba(0,207,255,0.2)" }}
          />
        </div>

        {photos.length > 0 ? (
          <Gallery photos={photos} />
        ) : (
          <div className="corner-frame border border-line bg-card px-8 py-16 text-center">
            <p className="mb-3 font-pixel text-[9px] text-pink">
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
      </main>

      <footer className="mx-auto max-w-6xl border-t border-line px-6 py-8 text-center">
        <span className="font-pixel text-[9px] text-soft">
          CHAD · PHOTOGRAPHY
        </span>
      </footer>
    </div>
  );
}
