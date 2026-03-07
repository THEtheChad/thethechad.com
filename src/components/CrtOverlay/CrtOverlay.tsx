"use client";

import { useEffect, useRef } from "react";

const NOISE_W = 256;
const NOISE_H = 192;
const TARGET_FPS = 14; // lower = more authentic analog flicker
const FRAME_MS = 1000 / TARGET_FPS;
const COVERAGE = 0.28; // fraction of pixels that get noise each frame

function drawNoise(ctx: CanvasRenderingContext2D) {
  const img = ctx.createImageData(NOISE_W, NOISE_H);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (Math.random() > COVERAGE) continue;
    const v = (Math.random() * 255) | 0;
    d[i] = v;
    d[i + 1] = v;
    d[i + 2] = v;
    d[i + 3] = (Math.random() * 25) | 0;
  }
  ctx.putImageData(img, 0, 0);
}

function StaticNoise() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let last = 0;

    function tick(now: number) {
      raf = requestAnimationFrame(tick);
      if (now - last < FRAME_MS) return;
      last = now;
      drawNoise(ctx);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      width={NOISE_W}
      height={NOISE_H}
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ opacity: 0.45, mixBlendMode: "screen" }}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

export function CrtOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      {/* TV static noise */}
      <StaticNoise />
      {/* Horizontal scan lines */}
      <div className="crt-scanlines absolute inset-0" />
      {/* Dark vignette at screen edges */}
      <div className="crt-vignette absolute inset-0" />
      {/* Phosphor flicker */}
      <div className="crt-flicker absolute inset-0" />
    </div>
  );
}
