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
  // view: null = closed, 'pl' = playlist, 'al' = album picker
  const [view, setView] = useState<"pl" | "al" | null>(null);
  const [minimized, setMinimized] = useState(false);

  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const canvasRef   = useRef<HTMLCanvasElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animRef     = useRef<number | null>(null);
  const sourceSetRef = useRef(false);
  const playingRef  = useRef(false);
  const albumsRef   = useRef<AlbumMeta[]>([]);
  const albumIdxRef = useRef(0);

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
    audio.addEventListener("timeupdate", () =>
      setCurrentTime(audio.currentTime),
    );
    audio.addEventListener("durationchange", () =>
      setDuration(audio.duration),
    );
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
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Spectrum draw loop ────────────────────────────────────────────────────────
  useEffect(() => {
    const BAR_COUNT = 18;
    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) { animRef.current = requestAnimationFrame(draw); return; }
      const ctx = canvas.getContext("2d")!;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const barW = Math.floor((width - BAR_COUNT + 1) / BAR_COUNT);
      if (analyserRef.current) {
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(data);
        for (let i = 0; i < BAR_COUNT; i++) {
          const v = data[i] / 255;
          const bh = Math.max(2, Math.round(v * height));
          const x = i * (barW + 1);
          ctx.shadowColor = "#00cfff";
          ctx.shadowBlur = v > 0.3 ? 6 : 0;
          const g = ctx.createLinearGradient(0, height - bh, 0, height);
          g.addColorStop(0, `rgba(180,240,255,${0.6 + v * 0.4})`);
          g.addColorStop(1, `rgba(0,207,255,${0.5 + v * 0.5})`);
          ctx.fillStyle = g;
          ctx.fillRect(x, height - bh, barW, bh);
        }
      } else {
        ctx.shadowBlur = 0;
        for (let i = 0; i < BAR_COUNT; i++) {
          ctx.fillStyle = "rgba(0,207,255,0.08)";
          ctx.fillRect(i * (barW + 1), height - 2, barW, 2);
        }
      }
      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

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

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed bottom-4 right-4 z-50 w-[280px] border border-line bg-card"
      style={{ boxShadow: "0 0 24px rgba(0,95,255,0.35), 0 0 2px #005FFF" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-2 py-1"
        style={{ background: "linear-gradient(90deg, #005FFF 0%, #00CFFF 60%, #005FFF 100%)" }}
      >
        <span className="font-pixel text-[8px] text-page tracking-widest">RETROAMP v2.0</span>
        <div className="flex gap-0.5">
          <button type="button" onClick={() => setMinimized((v) => !v)}
            className="px-1.5 font-pixel text-[8px] text-page hover:bg-white/20">
            {minimized ? "□" : "_"}
          </button>
          <button type="button" onClick={() => setView((v) => v === "al" ? null : "al")}
            className={`px-1.5 font-pixel text-[8px] text-page hover:bg-white/20 ${view === "al" ? "bg-white/20" : ""}`}>
            AL
          </button>
          <button type="button" onClick={() => setView((v) => v === "pl" ? null : "pl")}
            className={`px-1.5 font-pixel text-[8px] text-page hover:bg-white/20 ${view === "pl" ? "bg-white/20" : ""}`}>
            PL
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Main display */}
          <div className="relative bg-[#08081A] p-2">
            <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-40" />

            <div className="relative flex gap-2">
              {/* Album art — links to attribution URL */}
              {album?.coverUrl && album?.attributionUrl ? (
                <a
                  href={album.attributionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${album.name} — ${album.artist}`}
                  className="corner-frame group h-[52px] w-[52px] shrink-0 overflow-hidden border border-line bg-badge transition-colors hover:border-accent-soft"
                >
                  <Image src={album.coverUrl} alt="Album art" width={52} height={52}
                    className="h-full w-full object-cover transition-opacity group-hover:opacity-75" unoptimized />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="font-pixel text-[8px] text-accent-soft" style={{ textShadow: "0 0 6px #00CFFF" }}>↗</span>
                  </span>
                </a>
              ) : album?.coverUrl ? (
                <div className="corner-frame h-[52px] w-[52px] shrink-0 overflow-hidden border border-line bg-badge">
                  <Image src={album.coverUrl} alt="Album art" width={52} height={52}
                    className="h-full w-full object-cover" unoptimized />
                </div>
              ) : (
                <div className="corner-frame flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-line bg-badge font-pixel text-[14px] text-line">♪</div>
              )}

              {/* Track info */}
              <div className="min-w-0 flex-1">
                <div className="mb-1 overflow-hidden border border-line/40 bg-[#04040E] px-1">
                  <p key={track?.url ?? "none"}
                    className="marquee-text font-retro text-xl leading-5 text-accent-soft"
                    style={{ textShadow: "0 0 6px #00CFFF" }}>
                    {track
                      ? `${track.artist.toUpperCase()} — ${track.displayName.toUpperCase()}`
                      : "NO TRACK LOADED"}
                  </p>
                </div>
                <div className="flex items-baseline justify-between px-0.5">
                  <span className="font-retro text-2xl leading-none text-accent-soft"
                    style={{ textShadow: "0 0 8px #00CFFF" }}>
                    {fmt(currentTime)}
                  </span>
                  <span className="font-retro text-base leading-none text-soft">{fmt(duration)}</span>
                </div>
              </div>
            </div>

            <canvas ref={canvasRef} width={264} height={36}
              className="mt-2 w-full" style={{ imageRendering: "pixelated" }} />

            <input type="range" min={0} max={isFinite(duration) ? duration : 100}
              step={0.1} value={currentTime} onChange={seek}
              className="winamp-range mt-1.5 w-full" />

            <div className="mt-2 flex items-center gap-2">
              <span className="font-pixel text-[7px] text-soft">VOL</span>
              <input type="range" min={0} max={1} step={0.01} value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="winamp-range flex-1" />
              <span className="w-6 text-right font-pixel text-[7px] text-soft">
                {Math.round(volume * 100)}
              </span>
            </div>
          </div>

          {/* Playback controls */}
          <div className="flex items-center justify-between border-t border-line bg-badge px-2 py-1.5">
            <button type="button" onClick={prevTrack}
              className="px-2 py-1 font-pixel text-[9px] text-soft transition-colors hover:text-accent-soft">|◄◄</button>
            <button type="button" onClick={playing ? pause : play}
              className="border border-accent/60 px-3 py-1 font-pixel text-[9px] text-accent-soft transition-colors hover:border-accent-soft hover:bg-accent/10"
              style={playing ? { boxShadow: "0 0 8px rgba(0,207,255,0.4)" } : {}}>
              {playing ? "❚❚" : "▶"}
            </button>
            <button type="button" onClick={stop}
              className="px-2 py-1 font-pixel text-[9px] text-soft transition-colors hover:text-body">■</button>
            <button type="button" onClick={nextTrack}
              className="px-2 py-1 font-pixel text-[9px] text-soft transition-colors hover:text-accent-soft">▶▶|</button>
          </div>

          {/* Album picker */}
          {view === "al" && (
            <div className="border-t border-line bg-[#08081A] p-2">
              {albums.length === 0 && (
                <p className="px-2 py-2 font-pixel text-[8px] text-soft">NO ALBUMS FOUND</p>
              )}
              <div className="grid grid-cols-3 gap-2">
                {albums.map((a, i) => (
                  <button key={a.name} type="button" onClick={() => selectAlbum(i)}
                    className={`flex flex-col items-center gap-1 p-1 transition-colors ${
                      i === albumIdx ? "border border-accent-soft/60" : "border border-transparent hover:border-line"
                    }`}>
                    {a.coverUrl ? (
                      <Image src={a.coverUrl} alt={a.name} width={64} height={64}
                        className="h-14 w-14 object-cover" unoptimized />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center bg-badge font-pixel text-xl text-line">♪</div>
                    )}
                    <p className="w-full truncate text-center font-pixel text-[7px] text-soft leading-tight">{a.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Playlist */}
          {view === "pl" && (
            <div className="max-h-36 overflow-y-auto border-t border-line bg-[#08081A]">
              {!album?.tracks.length && (
                <p className="px-3 py-2 font-pixel text-[8px] text-soft">NO TRACKS</p>
              )}
              {album?.tracks.map((t, i) => (
                <button key={t.url} type="button"
                  onClick={() => { setTrackIdx(i); if (playing) play(); }}
                  className={`w-full px-3 py-1.5 text-left font-pixel text-[8px] transition-colors hover:bg-badge hover:text-accent-soft ${
                    i === trackIdx ? "bg-badge text-accent-soft" : "text-soft"
                  }`}>
                  <span className="mr-2 text-line">{String(i + 1).padStart(2, "0")}.</span>
                  {t.artist} — {t.displayName}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
