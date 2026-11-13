export interface Track {
  title: string;
  artist: string;
  /** Static file under /music, URL-encoded. */
  url: string;
}

export interface Album {
  name: string;
  artist: string;
  /** Static cover under /music; shown through next/image, never raw. */
  coverUrl: string | null;
  /** Where the album is published (the licence/attribution link). */
  attributionUrl: string | null;
  tracks: Track[];
}
