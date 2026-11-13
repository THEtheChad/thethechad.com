"use client";

import { useRef, useState } from "react";
import type { Album } from "../types";

const INITIAL_VOLUME = 0.65;

/**
 * Playback state for the TapeDeck, driven by one `<audio preload="none">`.
 *
 * No audio bytes before the visitor presses play: the element starts with no
 * `src`, there is no `load()` on mount and no AudioContext. A track's URL is
 * assigned only inside `play()`, which every user action that should start
 * sound goes through, so the request is always tied to a press.
 */
export function useAudioPlayer(albums: Album[]) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [albumIdx, setAlbumIdx] = useState(0);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(INITIAL_VOLUME);

  const album = albums[albumIdx];
  const track = album?.tracks[trackIdx];

  /** Start (or resume) a track. Assigns `src` only if it changed. */
  function play(a = albumIdx, t = trackIdx) {
    const audio = audioRef.current;
    const url = albums[a]?.tracks[t]?.url;
    if (!audio || !url) return;
    if (audio.dataset.url !== url) {
      audio.dataset.url = url;
      audio.src = url;
      audio.volume = volume;
      setCurrentTime(0);
      setDuration(0);
    }
    setAlbumIdx(a);
    setTrackIdx(t);
    // A rejected play() (autoplay policy, or superseded by a newer src) leaves
    // the element's own paused flag as the truth.
    audio.play().catch(() => setPlaying(!audio.paused));
  }

  function pause() {
    audioRef.current?.pause();
  }

  function toggle() {
    if (playing) pause();
    else play();
  }

  /**
   * Cue a track: plays it if the deck is playing, otherwise just selects it
   * (no request until the visitor presses play).
   */
  function cue(a: number, t: number) {
    if (playing) {
      play(a, t);
      return;
    }
    setAlbumIdx(a);
    setTrackIdx(t);
    if (audioRef.current?.dataset.url !== albums[a]?.tracks[t]?.url) {
      setCurrentTime(0);
      setDuration(0);
    }
  }

  function step(delta: number) {
    const count = album?.tracks.length ?? 0;
    if (count === 0) return;
    cue(albumIdx, (trackIdx + delta + count) % count);
  }

  function selectAlbum(a: number) {
    if (a !== albumIdx) cue(a, 0);
  }

  function seek(t: number) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = t;
    setCurrentTime(t);
  }

  function setVolume(v: number) {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }

  /** Props for the `<audio>` element; state follows the element's events. */
  const audioProps = {
    ref: audioRef,
    preload: "none",
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onTimeUpdate: (e: { currentTarget: HTMLAudioElement }) =>
      setCurrentTime(e.currentTarget.currentTime),
    onDurationChange: (e: { currentTarget: HTMLAudioElement }) => {
      const d = e.currentTarget.duration;
      setDuration(Number.isFinite(d) ? d : 0);
    },
    // Auto-advance within the album, wrapping to its first track.
    onEnded: () => {
      const count = album?.tracks.length ?? 0;
      if (count > 0) play(albumIdx, (trackIdx + 1) % count);
    },
  } as const;

  return {
    album,
    track,
    albumIdx,
    trackIdx,
    playing,
    currentTime,
    duration,
    volume,
    audioProps,
    toggle,
    play,
    cue,
    next: () => step(1),
    prev: () => step(-1),
    selectAlbum,
    seek,
    setVolume,
  };
}

export type AudioPlayer = ReturnType<typeof useAudioPlayer>;
