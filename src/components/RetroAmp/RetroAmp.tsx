"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { AlbumMeta } from "@/app/api/music/route";
import { useSharedAnalyserRef } from "@/contexts/AudioAnalyserContext";

const INITIAL_VOLUME = 0.65;

function fmt(s: number): string {
  if (!isFinite(s)) return "0:00";
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

  const audioRef     = useRef<HTMLAudioElement | null>(null);
  const analyserRef  = useRef<AnalyserNode | null>(null);
  const audioCtxRef  = useRef<AudioContext | null>(null);
  const sourceSetRef = useRef(false);
  const playingRef   = useRef(false);
  const albumsRef    = useRef<AlbumMeta[]>([]);
  const albumIdxRef  = useRef(0);

  playingRef.current  = playing;
  albumsRef.current   = albums;
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
    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
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
    if (!audio.src) { audio.src = track.url; audio.load(); }
    setupAnalyser();
    if (audioCtxRef.current?.state === "suspended") await audioCtxRef.current.resume();
    await audio.play();
    setPlaying(true);
  }

  function pause() { audioRef.current?.pause(); setPlaying(false); }

  function stop() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause(); audio.currentTime = 0;
    setPlaying(false); setCurrentTime(0);
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
  const gradient = "linear-gradient(90deg, #005FFF 0%, #00CFFF 60%, #005FFF 100%)";

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 border-t border-line bg-card"
      style={{ boxShadow: "0 -4px 24px rgba(0,95,255,0.25), 0 0 2px #005FFF" }}
    >
      {/* AL panel — expands upward */}
      {view === "al" && (
        <div className="border-b border-line bg-[#08081A] p-3">
          {albums.length === 0 && (
            <p className="px-2 py-1 font-pixel text-[8px] text-soft">NO ALBUMS FOUND</p>
          )}
          <div className="flex gap-3">
            {albums.map((a, i) => (
              <button
                key={a.name}
                type="button"
                onClick={() => selectAlbum(i)}
                className={`flex flex-col items-center gap-1 p-1 transition-colors ${
                  i === albumIdx ? "border border-accent-soft/60" : "border border-transparent hover:border-line"
                }`}
              >
                {a.coverUrl ? (
                  <Image src={a.coverUrl} alt={a.name} width={56} height={56}
                    className="h-14 w-14 object-cover" unoptimized />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center bg-badge font-pixel text-xl text-line">♪</div>
                )}
                <p className="w-14 truncate text-center font-pixel text-[7px] text-soft leading-tight">{a.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PL panel — expands upward */}
      {view === "pl" && (
        <div className="max-h-48 overflow-y-auto border-b border-line bg-[#08081A]">
          {!album?.tracks.length && (
            <p className="px-3 py-2 font-pixel text-[8px] text-soft">NO TRACKS</p>
          )}
          {album?.tracks.map((t, i) => (
            <button
              key={t.url}
              type="button"
              onClick={() => { setTrackIdx(i); if (playing) play(); }}
              className={`w-full px-3 py-1.5 text-left font-pixel text-[8px] transition-colors hover:bg-badge hover:text-accent-soft ${
                i === trackIdx ? "bg-badge text-accent-soft" : "text-soft"
              }`}
            >
              <span className="mr-2 text-line">{String(i + 1).padStart(2, "0")}.</span>
              {t.artist} — {t.displayName}
            </button>
          ))}
        </div>
      )}

      {/* Title bar */}
      <div
        className="flex items-center justify-between px-3 py-0.5"
        style={{ background: gradient }}
      >
        <span className="font-pixel text-[8px] text-page tracking-widest">RETROAMP v2.0</span>
        <div className="flex gap-0.5">
          <button
            type="button"
            onClick={() => setView((v) => (v === "al" ? null : "al"))}
            className={`px-1.5 font-pixel text-[8px] text-page hover:bg-white/20 ${view === "al" ? "bg-white/20" : ""}`}
          >
            AL
          </button>
          <button
            type="button"
            onClick={() => setView((v) => (v === "pl" ? null : "pl"))}
            className={`px-1.5 font-pixel text-[8px] text-page hover:bg-white/20 ${view === "pl" ? "bg-white/20" : ""}`}
          >
            PL
          </button>
        </div>
      </div>

      {/* Player row */}
      <div className="flex items-center gap-4 bg-[#08081A] px-4 py-2">
        {/* Cover art */}
        {album?.coverUrl && album?.attributionUrl ? (
          <a
            href={album.attributionUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`${album.name} — ${album.artist}`}
            className="corner-frame group relative h-10 w-10 shrink-0 overflow-hidden border border-line bg-badge transition-colors hover:border-accent-soft"
          >
            <Image src={album.coverUrl} alt="Album art" width={40} height={40}
              className="h-full w-full object-cover transition-opacity group-hover:opacity-75" unoptimized />
          </a>
        ) : album?.coverUrl ? (
          <div className="corner-frame h-10 w-10 shrink-0 overflow-hidden border border-line bg-badge">
            <Image src={album.coverUrl} alt="Album art" width={40} height={40}
              className="h-full w-full object-cover" unoptimized />
          </div>
        ) : (
          <div className="corner-frame flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-badge font-pixel text-xs text-line">♪</div>
        )}

        {/* Track info + seek */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 overflow-hidden border border-line/40 bg-[#04040E] px-1">
            <p
              key={track?.url ?? "none"}
              className="marquee-text font-retro text-lg leading-5 text-accent-soft"
              style={{ textShadow: "0 0 6px #00CFFF" }}
            >
              {track
                ? `${track.artist.toUpperCase()} — ${track.displayName.toUpperCase()}`
                : "NO TRACK LOADED"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-9 shrink-0 font-retro text-base leading-none text-accent-soft"
              style={{ textShadow: "0 0 8px #00CFFF" }}
            >
              {fmt(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={isFinite(duration) ? duration : 100}
              step={0.1}
              value={currentTime}
              onChange={seek}
              className="winamp-range flex-1"
            />
            <span className="w-9 shrink-0 text-right font-retro text-sm leading-none text-soft">
              {fmt(duration)}
            </span>
          </div>
        </div>

        {/* Transport controls */}
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={prevTrack}
            className="px-2 py-1 font-pixel text-[9px] text-soft transition-colors hover:text-accent-soft">
            |◄◄
          </button>
          <button
            type="button"
            onClick={playing ? pause : play}
            className="border border-accent/60 px-3 py-1 font-pixel text-[9px] text-accent-soft transition-colors hover:border-accent-soft hover:bg-accent/10"
            style={playing ? { boxShadow: "0 0 8px rgba(0,207,255,0.4)" } : {}}
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <button type="button" onClick={stop}
            className="px-2 py-1 font-pixel text-[9px] text-soft transition-colors hover:text-body">
            ■
          </button>
          <button type="button" onClick={nextTrack}
            className="px-2 py-1 font-pixel text-[9px] text-soft transition-colors hover:text-accent-soft">
            ▶▶|
          </button>
        </div>

        {/* Volume */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-pixel text-[7px] text-soft">VOL</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="winamp-range w-20"
          />
          <span className="w-6 text-right font-pixel text-[7px] text-soft">
            {Math.round(volume * 100)}
          </span>
        </div>
      </div>
    </div>
  );
}
