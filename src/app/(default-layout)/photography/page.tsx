import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { photos } from "@/data/photos";
import { Gallery } from "./_components/Gallery/Gallery";

export const metadata = {
  title: "Photography | Chad",
  description: "A collection of photographs by Chad.",
};

export default function PhotographyPage() {
  return (
    <>
      <SectionHeader as="h1" index="04" title="photos" />
      <Gallery photos={photos} />
    </>
  );
}
