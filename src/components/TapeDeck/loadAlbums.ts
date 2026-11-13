import fs from "node:fs";
import path from "node:path";
import type { Album, Track } from "./types";

/*
 * Build-time album listing for the TapeDeck. Called from the (static) default
 * layout, so it runs during `next build` and ships as props: no client fetch,
 * and the tracks themselves stay plain static files in public/music (Range,
 * Content-Length and caching handled by Next/the CDN).
 *
 * Layout: public/music/<label>/<album>/{*.mp3, cover.(jpg|png|webp),
 * attribution.json}. Files are named "Artist - Album - NN Title.mp3".
 */

const MUSIC_DIR = path.join(process.cwd(), "public", "music");
const AUDIO_RE = /\.(mp3|ogg|wav|flac|aac|m4a)$/i;
const COVER_RE = /^cover\.(jpg|jpeg|png|webp)$/i;
const NUMBERED_RE = /^(\d+)\s+/;

interface Attribution {
  album?: string;
  artist?: string;
  url?: string;
}

function toUrl(file: string): string {
  return `/music/${path
    .relative(MUSIC_DIR, file)
    .split(path.sep)
    .map(encodeURIComponent)
    .join("/")}`;
}

/** "Artist - Album - 01 Title - Part" → artist, title, track number. */
function parseFilename(name: string) {
  const parts = name.replace(AUDIO_RE, "").split(" - ");
  const at = parts.findIndex((p, i) => i > 0 && NUMBERED_RE.test(p));
  if (at === -1) {
    return parts.length >= 2
      ? { artist: parts[0], title: parts.at(-1) ?? name, number: 0 }
      : { artist: null, title: parts[0], number: 0 };
  }
  const title = parts.slice(at).join(" - ");
  return {
    artist: parts[0],
    title: title.replace(NUMBERED_RE, ""),
    number: Number(title.match(NUMBERED_RE)?.[1] ?? 0),
  };
}

function readAttribution(dir: string): Attribution {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(dir, "attribution.json"), "utf-8"),
    );
  } catch {
    return {};
  }
}

function scan(dir: string, albums: Album[]): Album[] {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));
  const files = entries.filter((e) => e.isFile()).map((e) => e.name);
  const attr = readAttribution(dir);

  const tracks: Track[] = files
    .filter((f) => AUDIO_RE.test(f))
    .map((f) => ({ ...parseFilename(f), url: toUrl(path.join(dir, f)) }))
    .sort((a, b) => a.number - b.number)
    // Per-track artist from the filename (compilations credit each track);
    // attribution.json's artist is the album's.
    .map(({ artist, title, url }) => ({
      title,
      artist: artist?.trim() || attr.artist || "Unknown",
      url,
    }));

  if (tracks.length > 0) {
    const cover = files.find((f) => COVER_RE.test(f));
    albums.push({
      name: attr.album ?? path.basename(dir),
      artist: attr.artist ?? tracks[0].artist,
      coverUrl: cover ? toUrl(path.join(dir, cover)) : null,
      attributionUrl: attr.url ?? null,
      tracks,
    });
  }

  for (const entry of entries) {
    if (entry.isDirectory()) scan(path.join(dir, entry.name), albums);
  }
  return albums;
}

export function loadAlbums(): Album[] {
  try {
    return fs.existsSync(MUSIC_DIR) ? scan(MUSIC_DIR, []) : [];
  } catch {
    return [];
  }
}
