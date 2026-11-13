"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { AlbumMeta } from "@/app/(api)/api/music/route";
import { useSharedAnalyserRef } from "@/contexts/AudioAnalyserContext";

const INITIAL_VOLUME = 0.65;

// ── Transport icons — all 16×16, filled with currentColor ─────────────────────
function IconPrev() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="0" y="2" width="2" height="12" />
      <polygon points="8,2 8,14 2,8" />
      <polygon points="14,2 14,14 8,8" />
    </svg>
  );
}
function IconNext() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="2,2 2,14 8,8" />
      <polygon points="8,2 8,14 14,8" />
      <rect x="14" y="2" width="2" height="12" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="2,2 2,14 14,8" />
    </svg>
  );
}
function IconPause() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="4" height="12" />
      <rect x="10" y="2" width="4" height="12" />
    </svg>
  );
}
function IconStop() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="12" height="12" />
    </svg>
  );
}

function fmt(s: number): string {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function RetroAmp() {
  const [albums, setAlbums] = useState<AlbumMeta[]>([]);
  const [albumIdx, setAlbumIdx] = useState(0);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(INITIAL_VOLUME);
  const [view, setView] = useState<"pl" | "al" | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceSetRef = useRef(false);
  const playingRef = useRef(false);
  const albumsRef = useRef<AlbumMeta[]>([]);
  const albumIdxRef = useRef(0);

  playingRef.current = playing;
  albumsRef.current = albums;
  albumIdxRef.current = albumIdx;

  const sharedAnalyserRef = useSharedAnalyserRef();

  // ── Fetch albums ──────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/music")
      .then((r) => r.json())
      .then((data: AlbumMeta[]) => setAlbums(data));
  }, []);

  // ── Create audio element ──────────────────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio();
    audio.volume = INITIAL_VOLUME;
    audio.addEventListener("timeupdate", () =>
      setCurrentTime(audio.currentTime),
    );
    audio.addEventListener("durationchange", () => setDuration(audio.duration));
    audio.addEventListener("ended", () => {
      const album = albumsRef.current[albumIdxRef.current];
      const count = album?.tracks.length ?? 1;
      setTrackIdx((i) => (i + 1) % count);
    });
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioCtxRef.current?.close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Load track when album/track index changes ─────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    const track = albums[albumIdx]?.tracks[trackIdx];
    if (!audio || !track) return;
    audio.src = track.url;
    audio.load();
    if (playingRef.current) audio.play().catch(() => {});
    setCurrentTime(0);
  }, [albumIdx, trackIdx, albums]);

  // ── Volume sync ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // ── Controls ──────────────────────────────────────────────────────────────────
  function setupAnalyser() {
    if (sourceSetRef.current || !audioRef.current) return;
    const ctx = new AudioContext();
    const src = ctx.createMediaElementSource(audioRef.current);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    src.connect(analyser);
    analyser.connect(ctx.destination);
    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    if (sharedAnalyserRef) sharedAnalyserRef.current = analyser;
    sourceSetRef.current = true;
  }

  async function play() {
    const audio = audioRef.current;
    const track = albums[albumIdx]?.tracks[trackIdx];
    if (!audio || !track) return;
    if (!audio.src) {
      audio.src = track.url;
      audio.load();
    }
    setupAnalyser();
    if (audioCtxRef.current?.state === "suspended")
      await audioCtxRef.current.resume();
    await audio.play();
    setPlaying(true);
  }

  function pause() {
    audioRef.current?.pause();
    setPlaying(false);
  }

  function stop() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
    setCurrentTime(0);
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const t = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  }

  function prevTrack() {
    const count = albums[albumIdx]?.tracks.length ?? 1;
    setTrackIdx((i) => (i - 1 + count) % count);
  }

  function nextTrack() {
    const count = albums[albumIdx]?.tracks.length ?? 1;
    setTrackIdx((i) => (i + 1) % count);
  }

  function selectAlbum(i: number) {
    setAlbumIdx(i);
    setTrackIdx(0);
    setView("pl");
  }

  const album = albums[albumIdx];
  const track = album?.tracks[trackIdx];

  // ── Render ────────────────────────────────────────────────────────────────────
  // Re-tokened only; the "Side C" TapeDeck redesign lands in M4.
  // Display is set per button so responsive `hidden` variants don't conflict.
  const transportBtn =
    "size-11 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-raise hover:text-text";
  const panelBtn = (active: boolean) =>
    `label inline-flex h-11 items-center rounded-sm px-2 transition-colors duration-150 hover:text-text ${
      active ? "bg-raise text-text" : "text-muted"
    }`;

  return (
    <aside
      id="music-player"
      tabIndex={-1}
      aria-label="Music player"
      className="js-only fixed inset-x-0 bottom-0 z-30 border-t border-rim bg-ink/92 backdrop-blur-md"
    >
      {/* AL panel — expands upward */}
      {view === "al" && (
        <div className="border-b border-rim p-3">
          {albums.length === 0 && (
            <p className="px-2 py-1 font-mono text-xs text-muted">
              No albums found
            </p>
          )}
          <div className="flex gap-3 overflow-x-auto">
            {albums.map((a, i) => (
              <button
                key={a.name}
                type="button"
                onClick={() => selectAlbum(i)}
                aria-pressed={i === albumIdx}
                className={`flex flex-col items-center gap-1 rounded-ctl border p-1 transition-colors focus-visible:-outline-offset-2 duration-150 ${
                  i === albumIdx
                    ? "border-pink"
                    : "border-transparent hover:border-rim-strong"
                }`}
              >
                {a.coverUrl ? (
                  <Image
                    src={a.coverUrl}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-sm object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-raise text-xl text-subtle">
                    ♪
                  </div>
                )}
                <p className="w-14 truncate text-center font-mono text-xs leading-tight text-muted">
                  {a.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PL panel — expands upward */}
      {view === "pl" && (
        <div className="max-h-48 overflow-y-auto border-b border-rim">
          {!album?.tracks.length && (
            <p className="px-3 py-2 font-mono text-xs text-muted">No tracks</p>
          )}
          {album?.tracks.map((t, i) => (
            <button
              key={t.url}
              type="button"
              onClick={() => {
                setTrackIdx(i);
                if (playing) play();
              }}
              aria-current={i === trackIdx ? "true" : undefined}
              className={`w-full px-3 py-2 text-left font-mono text-[13px] transition-colors focus-visible:-outline-offset-2 duration-150 hover:bg-raise hover:text-text ${
                i === trackIdx ? "bg-raise text-text" : "text-muted"
              }`}
            >
              <span className="mr-2 text-pink-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              {t.artist} — {t.displayName}
            </button>
          ))}
        </div>
      )}

      {/* Title strip */}
      <div className="flex items-center justify-between border-b border-rim/60 px-3">
        <span className="label text-muted">Side C</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setView((v) => (v === "al" ? null : "al"))}
            aria-expanded={view === "al"}
            className={panelBtn(view === "al")}
          >
            Albums
          </button>
          <button
            type="button"
            onClick={() => setView((v) => (v === "pl" ? null : "pl"))}
            aria-expanded={view === "pl"}
            className={panelBtn(view === "pl")}
          >
            Tracks
          </button>
        </div>
      </div>

      {/* Player row */}
      <div className="flex items-center gap-3 px-3 py-1.5 min-[720px]:gap-4 min-[720px]:px-4">
        {/* Cover art */}
        {album?.coverUrl && album?.attributionUrl ? (
          <a
            href={album.attributionUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`${album.name} — ${album.artist}`}
            className="group relative hidden h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-rim min-[480px]:block"
          >
            <Image
              src={album.coverUrl}
              alt={`${album.name} — ${album.artist}`}
              width={40}
              height={40}
              className="h-full w-full object-cover transition-opacity duration-150 group-hover:opacity-75"
              unoptimized
            />
          </a>
        ) : album?.coverUrl ? (
          <div className="hidden h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-rim min-[480px]:block">
            <Image
              src={album.coverUrl}
              alt="Album art"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-rim bg-raise text-subtle min-[480px]:flex">
            ♪
          </div>
        )}

        {/* Track info + seek */}
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 overflow-hidden">
            <p className="truncate font-mono text-[13px] leading-5 text-text">
              {track
                ? `${track.artist} — ${track.displayName}`
                : "No track loaded"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-9 shrink-0 font-mono text-xs text-muted tabular-nums">
              {fmt(currentTime)}
            </span>
            <input
              type="range"
              aria-label="Seek"
              min={0}
              max={Number.isFinite(duration) ? duration : 100}
              step={0.1}
              value={currentTime}
              onChange={seek}
              className="retroamp-range -my-3 min-w-0 flex-1"
            />
            <span className="w-9 shrink-0 text-right font-mono text-xs text-muted tabular-nums">
              {fmt(duration)}
            </span>
          </div>
        </div>

        {/* Transport controls */}
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={prevTrack}
            className={`${transportBtn} inline-flex`}
            aria-label="Previous track"
          >
            <IconPrev />
          </button>
          <button
            type="button"
            onClick={playing ? pause : play}
            className="inline-flex size-11 items-center justify-center rounded-full bg-pink text-on-accent transition-opacity duration-150 hover:opacity-90"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <IconPause /> : <IconPlay />}
          </button>
          <button
            type="button"
            onClick={stop}
            className={`${transportBtn} hidden min-[480px]:inline-flex`}
            aria-label="Stop"
          >
            <IconStop />
          </button>
          <button
            type="button"
            onClick={nextTrack}
            className={`${transportBtn} inline-flex`}
            aria-label="Next track"
          >
            <IconNext />
          </button>
        </div>

        {/* Volume */}
        <div className="hidden shrink-0 items-center gap-2 min-[720px]:flex">
          <span aria-hidden="true" className="font-mono text-xs text-muted">
            Vol
          </span>
          <input
            type="range"
            aria-label="Volume"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="retroamp-range -my-3 w-20"
          />
          <span className="w-7 text-right font-mono text-xs text-muted tabular-nums">
            {Math.round(volume * 100)}
          </span>
        </div>
      </div>
    </aside>
  );
}
