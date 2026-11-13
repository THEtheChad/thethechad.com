/*
 * Photos on /photography, in display order. Files live in public/photography;
 * width/height are the files' pixel sizes (used for layout, never to request
 * the original). Years are from each file's EXIF capture date.
 *
 * OWNER REVIEW: every `title` is a placeholder ("Untitled") and no `location`
 * is set; both await the owner. `alt` describes only what is visible in the
 * frame (written from the images, 2026-11-12); please confirm or correct.
 */

export interface Photo {
  src: string;
  width: number;
  height: number;
  /** Describes what is visible, for screen readers and failed loads. */
  alt: string;
  /** Caption title. PLACEHOLDER until the owner names each photo. */
  title: string;
  location?: string;
  year: string;
}

export const photos: Photo[] = [
  {
    src: "/photography/20170728__DSC4270.jpg",
    width: 2048,
    height: 1365,
    alt: "Looking straight up at a white Ferris wheel against a clear blue sky, its lattice spokes and enclosed gondolas filling the frame.",
    title: "Untitled",
    year: "2017",
  },
  {
    src: "/photography/20170730__DSC4533.jpg",
    width: 1365,
    height: 2048,
    alt: "A back storeroom bathed in red light: two stepladders lean against the wall beside stacked steel beer kegs, under a glowing neon sign of a script letter R.",
    title: "Untitled",
    year: "2017",
  },
  {
    src: "/photography/20171020__DSC3119.jpg",
    width: 2048,
    height: 1365,
    alt: "A red bicycle with a front basket parked against weathered brown double doors, flanked by potted flowers, hanging ivy and a wooden trellis of yellow leaves.",
    title: "Untitled",
    year: "2017",
  },
  {
    src: "/photography/20190709_DSC00836.jpg",
    width: 2048,
    height: 1365,
    alt: "A red dirt trail with a wooden rail fence winds through sagebrush and tall grass toward green hills, beneath a large red sandstone outcrop and a blue sky with white clouds.",
    title: "Untitled",
    year: "2019",
  },
  {
    src: "/photography/20190919_DSC01626.jpg",
    width: 1536,
    height: 2048,
    alt: "A small carved stone figure on a red pedestal inside a bright blue niche, set into a wall of dark volcanic stone with white seashells mounted around it.",
    title: "Untitled",
    year: "2019",
  },
  {
    src: "/photography/_DSC1514.jpg",
    width: 2048,
    height: 1152,
    alt: "Five vintage propeller planes in red, white and navy paint fly in formation, trailing white smoke across a pale blue sky.",
    title: "Untitled",
    year: "2017",
  },
];
