import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MUSIC_DIR = path.join(process.cwd(), "src", "music");
const AUDIO_RE = /\.(mp3|ogg|wav|flac|aac|m4a)$/i;
const COVER_RE = /^cover\.(jpg|jpeg|png|webp)$/i;

interface Attribution {
  album?: string;
  artist?: string;
  url?: string;
}

export interface TrackMeta {
  displayName: string;
  artist: string;
  url: string;
}

export interface AlbumMeta {
  name: string;
  artist: string;
  coverUrl: string | null;
  attributionUrl: string | null;
  tracks: TrackMeta[];
}

function encodeSegments(segments: string[]): string {
  return segments.map(encodeURIComponent).join("/");
}

function parseFilename(name: string): { artist: string; title: string } {
  const noExt = name.replace(AUDIO_RE, "");
  const parts = noExt.split(" - ");
  if (parts.length >= 2) {
    const artist = parts[0].trim();
    const rawTitle = parts[parts.length - 1].trim();
    const title = rawTitle.replace(/^\d+\s+/, "");
    return { artist, title };
  }
  return { artist: "Unknown", title: noExt };
}

function scan(dir: string, albums: AlbumMeta[] = []): AlbumMeta[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // Load attribution.json if present in this directory
  let attr: Attribution = {};
  const attrPath = path.join(dir, "attribution.json");
  if (fs.existsSync(attrPath)) {
    try {
      attr = JSON.parse(fs.readFileSync(attrPath, "utf-8"));
    } catch {}
  }

  // Find cover image in this directory
  const coverEntry = entries.find((e) => e.isFile() && COVER_RE.test(e.name));
  const coverUrl = coverEntry
    ? `/api/music/${encodeSegments(
        path
          .relative(MUSIC_DIR, path.join(dir, coverEntry.name))
          .split(path.sep),
      )}`
    : null;

  // Collect audio tracks in this directory
  const tracks: TrackMeta[] = entries
    .filter((e) => e.isFile() && AUDIO_RE.test(e.name))
    .map((e) => {
      const { artist, title } = parseFilename(e.name);
      const rel = path
        .relative(MUSIC_DIR, path.join(dir, e.name))
        .split(path.sep);
      return {
        displayName: title,
        artist: attr.artist ?? artist,
        url: `/api/music/${encodeSegments(rel)}`,
      };
    });

  // If this directory has tracks, register it as an album
  if (tracks.length > 0) {
    albums.push({
      name: attr.album ?? path.basename(dir),
      artist: attr.artist ?? tracks[0].artist,
      coverUrl,
      attributionUrl: attr.url ?? null,
      tracks,
    });
  }

  // Recurse into subdirectories
  for (const entry of entries) {
    if (entry.isDirectory()) {
      scan(path.join(dir, entry.name), albums);
    }
  }

  return albums;
}

export function GET() {
  try {
    if (!fs.existsSync(MUSIC_DIR)) return NextResponse.json([]);
    return NextResponse.json(scan(MUSIC_DIR));
  } catch {
    return NextResponse.json([]);
  }
}
