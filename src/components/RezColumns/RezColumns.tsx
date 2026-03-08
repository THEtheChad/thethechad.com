"use client";

import { useEffect, useRef } from "react";
import { useSharedAnalyserRef } from "@/contexts/AudioAnalyserContext";

const COL_W = 200;
const SNOW_COUNT = 44;
const BAND_COUNT = 16;
const PAGE_BG = "6,6,15"; // #06060F

// ── Colour ────────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function bandColor(norm: number, amp: number): string {
  const g = lerp(95, 207, norm);
  if (amp > 0.65) {
    const t = Math.min((amp - 0.65) / 0.35, 1);
    return `${Math.round(lerp(0, 255, t))},${Math.round(lerp(g, 0, t))},${Math.round(lerp(255, 128, t))}`;
  }
  return `0,${Math.round(g)},255`;
}

// ── Snow particle ─────────────────────────────────────────────────────────────

type ShapeKind = 0 | 1 | 2 | 3; // dot · diamond ◇ · square □ · cross +

interface Snow {
  x: number;
  y: number;
  vy: number;
  phase: number; // sinusoidal drift phase
  size: number;
  kind: ShapeKind;
  baseAlpha: number;
  band: number; // 0 – BAND_COUNT-1
}

function mkSnow(h: number, scatter = false): Snow {
  return {
    x: Math.random() * COL_W,
    y: scatter ? Math.random() * h : -6,
    vy: 0.3 + Math.random() * 0.9,
    phase: Math.random() * Math.PI * 2,
    size: 0.7 + Math.random() * 2.6,
    kind: Math.floor(Math.random() * 4) as ShapeKind,
    baseAlpha: 0.12 + Math.random() * 0.35,
    band: Math.floor(Math.random() * BAND_COUNT),
  };
}

function drawSnow(
  ctx: CanvasRenderingContext2D,
  p: Snow,
  color: string,
  alpha: number,
) {
  const s = p.size;
  ctx.fillStyle = `rgba(${color},${alpha})`;
  ctx.strokeStyle = `rgba(${color},${alpha})`;
  switch (p.kind) {
    case 0:
      ctx.beginPath();
      ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 1:
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - s);
      ctx.lineTo(p.x + s, p.y);
      ctx.lineTo(p.x, p.y + s);
      ctx.lineTo(p.x - s, p.y);
      ctx.closePath();
      ctx.fill();
      break;
    case 2:
      ctx.fillRect(p.x - s, p.y - s, s * 2, s * 2);
      break;
    case 3:
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(p.x - s, p.y);
      ctx.lineTo(p.x + s, p.y);
      ctx.moveTo(p.x, p.y - s);
      ctx.lineTo(p.x, p.y + s);
      ctx.stroke();
      break;
  }
}

// ── Column ────────────────────────────────────────────────────────────────────

function RezColumn({ side }: { side: "left" | "right" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sharedRef = useSharedAnalyserRef();
  const rafRef = useRef(0);
  const frameRef = useRef(0);
  const snowRef = useRef<Snow[]>([]);
  const bandsRef = useRef(new Float32Array(BAND_COUNT));
  const beatRef = useRef(0);
  const prevBassRef = useRef(0);

  // Sync canvas height + seed particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const sync = () => {
      canvas.height = canvas.offsetHeight || window.innerHeight;
      if (snowRef.current.length === 0) {
        snowRef.current = Array.from({ length: SNOW_COUNT }, () =>
          mkSnow(canvas.height, true),
        );
      }
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function draw() {
      rafRef.current = requestAnimationFrame(draw);
      frameRef.current++;

      const analyser = sharedRef?.current;
      const w = canvas!.width;
      const h = canvas!.height;
      const f = frameRef.current;
      const bands = bandsRef.current;

      // ── Frequency analysis ────────────────────────────────────────────────
      if (analyser) {
        const raw = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(raw);
        const binPerBand = Math.max(
          1,
          Math.floor((raw.length * 0.82) / BAND_COUNT),
        );
        for (let i = 0; i < BAND_COUNT; i++) {
          let max = 0;
          const lo = i * binPerBand;
          const hi = Math.min(lo + binPerBand, raw.length);
          for (let b = lo; b < hi; b++) max = Math.max(max, raw[b] / 255);
          bands[i] = bands[i] * 0.55 + max * 0.45; // smooth
        }
        const bass = (bands[0] + bands[1]) * 0.5;
        if (bass - prevBassRef.current > 0.18 && bass > 0.38) {
          beatRef.current = 1;
          for (
            let i = 0;
            i < 5 && snowRef.current.length < SNOW_COUNT + 14;
            i++
          ) {
            snowRef.current.push(mkSnow(h, false));
          }
        }
        prevBassRef.current = bass;
      } else {
        for (let i = 0; i < BAND_COUNT; i++) {
          bands[i] = 0.016 + 0.012 * Math.sin(f * 0.011 + i * 0.45);
        }
      }
      beatRef.current = Math.max(0, beatRef.current - 0.028);

      ctx.clearRect(0, 0, w, h);

      // ── Snow ──────────────────────────────────────────────────────────────
      const snow = snowRef.current;
      const beat = beatRef.current;

      for (let i = snow.length - 1; i >= 0; i--) {
        const p = snow[i];
        const amp = bands[p.band];

        // Horizontal drift amplitude scales directly with music amplitude.
        // At silence: gentle ±0.22 px/frame → ~14 px peak swing.
        // At full volume: ±1.1 px/frame → ~70 px peak swing (sweeps column).
        p.phase += 0.015 + p.vy * 0.006;
        const wobble = Math.sin(p.phase) * (0.22 + amp * 0.88);
        p.x += wobble;
        p.y += p.vy + beat * 0.65;

        // Soft edge — allow particles to just barely leave the column
        p.x = Math.max(-p.size, Math.min(w + p.size, p.x));

        if (p.y > h + 8) {
          if (snow.length > SNOW_COUNT) {
            snow.splice(i, 1);
          } else {
            snow[i] = mkSnow(h, false);
          }
          continue;
        }

        const color = bandColor(p.band / (BAND_COUNT - 1), amp);
        const alpha = Math.min(1, p.baseAlpha * (1 + amp * 1.5));
        const glowing = amp > 0.22;

        ctx.save();
        if (glowing) {
          ctx.shadowColor = `rgb(${color})`;
          ctx.shadowBlur = 3 + amp * 11;
        }
        drawSnow(ctx, p, color, alpha);
        ctx.restore();
      }

      // ── Edge fade ─────────────────────────────────────────────────────────
      const fade = ctx.createLinearGradient(0, 0, 0, h);
      fade.addColorStop(0, `rgba(${PAGE_BG},0.92)`);
      fade.addColorStop(0.08, `rgba(${PAGE_BG},0)`);
      fade.addColorStop(0.92, `rgba(${PAGE_BG},0)`);
      fade.addColorStop(1, `rgba(${PAGE_BG},0.92)`);
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [sharedRef]);

  return (
    <canvas
      ref={canvasRef}
      width={COL_W}
      className={`pointer-events-none absolute top-0 z-40 h-full hidden md:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

export function RezColumns() {
  return (
    <>
      <RezColumn side="left" />
      <RezColumn side="right" />
    </>
  );
}
