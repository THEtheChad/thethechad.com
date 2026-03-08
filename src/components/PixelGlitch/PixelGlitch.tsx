"use client";

import { useEffect, useRef } from "react";

/**
 * Simulates digital satellite signal interference — full-width horizontal
 * macroblock bands that flicker and shift during burst periods.
 */
export function PixelGlitch({
  src,
  slow = false,
}: {
  src: string;
  slow?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.src = src;

    let rafId: number;
    let frame = 0;

    // Timing config — slow mode stretches flicker and rest intervals
    const refreshMin = slow ? 40 : 10;
    const refreshMax = slow ? 20 : 15; // added to refreshMin
    const burstMin = slow ? 12 : 9;
    const burstRange = slow ? 20 : 36;
    const restMin = slow ? 300 : 60;
    const restRange = slow ? 600 : 120;
    const firstBurst = slow ? 300 : 30;
    const firstRange = slow ? 400 : 60;

    // Burst state
    let burstActive = false;
    let burstEndFrame = 0;
    let nextBurstFrame = 0;

    // Current strip layout — regenerated every few frames during a burst
    let strips: Array<{
      ry: number;
      rh: number;
      blockW: number;
      blockH: number;
      shift: number;
    }> = [];
    let stripRefreshFrame = 0;

    function buildStrips() {
      const count = 2 + Math.floor(Math.random() * 5);
      strips = [];
      for (let i = 0; i < count; i++) {
        const blockH = 8 + Math.floor(Math.random() * 10);
        const rows = 1 + Math.floor(Math.random() * 3);
        const rh = blockH * rows;
        const ry = Math.floor(Math.random() * Math.max(1, canvas!.height - rh));
        strips.push({
          ry,
          rh,
          blockW: 8 + Math.floor(Math.random() * 12),
          blockH,
          // occasional horizontal shift for displaced-block look
          shift:
            Math.random() < 0.35 ? Math.round((Math.random() - 0.5) * 30) : 0,
        });
      }
    }

    function drawFrame() {
      const canvas = canvasRef.current;
      if (!canvas || !img.complete || img.naturalWidth === 0) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const scaleX = img.naturalWidth / canvas.width;
      const scaleY = img.naturalHeight / canvas.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of strips) {
        const pixW = Math.max(1, Math.ceil(canvas.width / s.blockW));
        const pixH = Math.max(1, Math.ceil(s.rh / s.blockH));

        const off = document.createElement("canvas");
        off.width = pixW;
        off.height = pixH;
        const oc = off.getContext("2d")!;

        // Sample the source image for this strip
        oc.drawImage(
          img,
          0,
          s.ry * scaleY,
          canvas.width * scaleX,
          s.rh * scaleY,
          0,
          0,
          pixW,
          pixH,
        );

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(off, s.shift, s.ry, canvas.width, s.rh);

        // Occasionally tint a strip with a faint color cast
        if (Math.random() < 0.25) {
          ctx.fillStyle =
            Math.random() < 0.5
              ? `rgba(0,207,255,0.15)`
              : `rgba(255,40,120,0.12)`;
          ctx.fillRect(s.shift, s.ry, canvas.width, s.rh);
        }
      }
    }

    function tick() {
      frame++;

      if (burstActive) {
        if (frame >= burstEndFrame) {
          // End burst — clear canvas
          burstActive = false;
          strips = [];
          canvasRef.current
            ?.getContext("2d")
            ?.clearRect(0, 0, canvas!.width, canvas!.height);

          nextBurstFrame =
            frame + restMin + Math.floor(Math.random() * restRange);
        } else {
          if (frame >= stripRefreshFrame) {
            buildStrips();
            stripRefreshFrame =
              frame + refreshMin + Math.floor(Math.random() * refreshMax);
            drawFrame();
          }
        }
      } else if (frame >= nextBurstFrame) {
        burstActive = true;
        burstEndFrame =
          frame + burstMin + Math.floor(Math.random() * burstRange);
        buildStrips();
        stripRefreshFrame = frame;
        drawFrame();
      }

      rafId = requestAnimationFrame(tick);
    }

    function start() {
      nextBurstFrame = firstBurst + Math.floor(Math.random() * firstRange);
      rafId = requestAnimationFrame(tick);
    }

    if (img.complete && img.naturalWidth > 0) {
      start();
    } else {
      img.onload = start;
    }

    return () => cancelAnimationFrame(rafId);
  }, [src, slow]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
