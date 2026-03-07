"use client";

import { useEffect, useRef, useState } from "react";

export default function SynthwavePlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(
      "/music/Meizong%20-%20Free%20the%20music%20-%20Vol.%201%20-%20Synthwave%20-%2006%20Night%20Lights.mp3",
    );
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 border border-line bg-page/80 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-soft backdrop-blur-sm transition-colors hover:border-accent-soft hover:text-accent-soft"
      aria-label={playing ? "Pause soundtrack" : "Play soundtrack"}
    >
      {playing ? (
        <>
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inset-0 animate-ping bg-accent-soft opacity-75" />
            <span className="relative h-1.5 w-1.5 bg-accent-soft" />
          </span>
          PLAYING
        </>
      ) : (
        <>
          <span className="h-1.5 w-1.5 shrink-0 border border-soft" />
          SOUNDTRACK
        </>
      )}
    </button>
  );
}
