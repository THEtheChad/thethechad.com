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
  album: string;
  url: string;
  coverUrl: string | null;
}

function encodePathSegments(segments: string[]): string {
  return segments.map(encodeURIComponent).join("/");
}

function parseFilename(name: string): { artist: string; title: string } {
  const noExt = name.replace(AUDIO_RE, "");
  const parts = noExt.split(" - ");
  if (parts.length >= 2) {
    const artist = parts[0].trim();
    const rawTitle = parts[parts.length - 1].trim();
    // Strip leading track number (e.g. "06 Night Lights" → "Night Lights")
    const title = rawTitle.replace(/^\d+\s+/, "");
    return { artist, title };
  }
  return { artist: "Unknown", title: noExt };
}

function scan(
  dir: string,
  tracks: TrackMeta[] = [],
): TrackMeta[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const attrPath = path.join(dir, "attribution.json");
  let attr: Attribution = {};
  if (fs.existsSync(attrPath)) {
    try {
      attr = JSON.parse(fs.readFileSync(attrPath, "utf-8"));
    } catch {}
  }

  const coverEntry = entries.find((e) => e.isFile() && COVER_RE.test(e.name));
  const coverUrl = coverEntry
    ? `/api/music/${encodePathSegments(path.relative(MUSIC_DIR, path.join(dir, coverEntry.name)).split(path.sep))}`
    : null;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scan(fullPath, tracks);
    } else if (AUDIO_RE.test(entry.name)) {
      const rel = path.relative(MUSIC_DIR, fullPath).split(path.sep);
      const { artist, title } = parseFilename(entry.name);
      tracks.push({
        displayName: title,
        artist: attr.artist ?? artist,
        album: attr.album ?? "",
        url: `/api/music/${encodePathSegments(rel)}`,
        coverUrl,
      });
    }
  }

  return tracks;
}

export function GET() {
  try {
    if (!fs.existsSync(MUSIC_DIR)) return NextResponse.json([]);
    return NextResponse.json(scan(MUSIC_DIR));
  } catch {
    return NextResponse.json([]);
  }
}
