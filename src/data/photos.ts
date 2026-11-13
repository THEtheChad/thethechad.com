/*
 * Photos on /photography, in display order. Files live in public/photography;
 * width/height are the files' pixel sizes (used for layout, never to request
 * the original). Years are from each file's EXIF capture date.
 *
 * OWNER REVIEW: no `title` or `location` is set yet (captions show just the
 * number and year until they are); both await the owner. `alt` describes only what is visible in the
 * frame (written from the images, 2026-11-12); please confirm or correct.
 */

export interface Photo {
  src: string;
  width: number;
  height: number;
  /** Describes what is visible, for screen readers and failed loads. */
  alt: string;
  /** Caption title, once the owner names the photo. */
  title?: string;
  location?: string;
  year: string;
}

export const photos: Photo[] = [
  {
    src: "/photography/20170728__DSC4270.jpg",
    width: 2048,
    height: 1365,
    alt: "Looking straight up at a white Ferris wheel against a clear blue sky.",
    year: "2017",
  },
  {
    src: "/photography/20170730__DSC4533.jpg",
    width: 1365,
    height: 2048,
    alt: "A red-lit storeroom with ladders and beer kegs under a neon script R sign.",
    year: "2017",
  },
  {
    src: "/photography/20171020__DSC3119.jpg",
    width: 2048,
    height: 1365,
    alt: "A red bicycle against brown double doors, surrounded by potted flowers.",
    year: "2017",
  },
  {
    src: "/photography/20190709_DSC00836.jpg",
    width: 2048,
    height: 1365,
    alt: "A red dirt trail and rail fence below a red sandstone outcrop and green hills.",
    year: "2019",
  },
  {
    src: "/photography/20190919_DSC01626.jpg",
    width: 1536,
    height: 2048,
    alt: "A carved figure in a blue niche in a volcanic-stone wall lined with seashells.",
    year: "2019",
  },
  {
    src: "/photography/_DSC1514.jpg",
    width: 2048,
    height: 1152,
    alt: "Five vintage propeller planes flying in formation, trailing white smoke.",
    year: "2017",
  },
];
