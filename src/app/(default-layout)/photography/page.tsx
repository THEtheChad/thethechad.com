import fs from "node:fs";
import path from "node:path";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { photos } from "@/data/photos";
import { Gallery } from "./_components/Gallery/Gallery";

export const metadata = {
  title: "Photography | Chad",
  description: "A collection of photographs by Chad.",
};

// photos.ts is hand-maintained; fail the (static) build if it points at a
// file that isn't in public/ instead of shipping a broken image.
for (const { src } of photos) {
  if (!fs.existsSync(path.join(process.cwd(), "public", src))) {
    throw new Error(`src/data/photos.ts: ${src} is not in public/`);
  }
}

export default function PhotographyPage() {
  return (
    <>
      <SectionHeader as="h1" index="04" title="photos" />
      <Gallery photos={photos} />
    </>
  );
}
