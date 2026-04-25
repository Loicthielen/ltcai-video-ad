import React, { useEffect, useRef } from "react";
import { useCurrentFrame, random } from "remotion";

type Props = {
  count?: number;
  colors?: string[];
  width: number;
  height: number;
  speed?: number;
  size?: [number, number];
  mode?: "drift" | "explode" | "rain";
  seed?: string;
  origin?: { x: number; y: number };
  emitStart?: number;
  emitEnd?: number;
  trailing?: boolean;
  opacity?: number;
};

// Canvas 2D particle field. Deterministic via seeded random.
export const ParticleField: React.FC<Props> = ({
  count = 60,
  colors = ["#3B82F6", "#06B6D4", "#FCD34D"],
  width,
  height,
  speed = 1,
  size = [2, 6],
  mode = "drift",
  seed = "p",
  origin = { x: width / 2, y: height / 2 },
  emitStart = 0,
  emitEnd,
  trailing = false,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (trailing) {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    for (let i = 0; i < count; i++) {
      const r1 = random(`${seed}-${i}-a`);
      const r2 = random(`${seed}-${i}-b`);
      const r3 = random(`${seed}-${i}-c`);
      const r4 = random(`${seed}-${i}-d`);
      const r5 = random(`${seed}-${i}-e`);

      const color = colors[Math.floor(r5 * colors.length)];
      const sz = size[0] + r3 * (size[1] - size[0]);
      const t = frame - emitStart - i * 0.4;
      if (t < 0) continue;
      if (emitEnd !== undefined && frame > emitEnd + 60) continue;

      let x = 0,
        y = 0,
        a = 1;

      if (mode === "drift") {
        // slow ambient drift
        const baseX = r1 * width;
        const baseY = r2 * height;
        x = baseX + Math.sin((frame + i * 9) * 0.012) * 30 * speed;
        y =
          baseY +
          Math.cos((frame + i * 11) * 0.014) * 24 * speed -
          (frame * speed * 0.3 * (0.4 + r4 * 0.6)) % height;
        a = 0.4 + r4 * 0.6;
      } else if (mode === "explode") {
        const angle = r1 * Math.PI * 2;
        const v = (8 + r2 * 22) * speed;
        const decel = 0.94;
        // Numerically integrate-ish: distance ≈ v*(1-decel^t)/(1-decel)
        const dist = v * (1 - Math.pow(decel, t)) / (1 - decel);
        x = origin.x + Math.cos(angle) * dist;
        y = origin.y + Math.sin(angle) * dist + 0.4 * t * t * 0.4;
        a = Math.max(0, 1 - t / 60);
      } else {
        // rain: confetti-style fall
        const baseX = r1 * width;
        const speedY = (3 + r2 * 5) * speed;
        const sway = Math.sin((frame + i * 13) * 0.04) * 28;
        x = baseX + sway;
        y = ((r3 * height + frame * speedY) % (height + 80)) - 40;
        a = 0.5 + r4 * 0.5;
      }

      ctx.globalAlpha = a * opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, sz, 0, Math.PI * 2);
      ctx.fill();

      // glow halo
      ctx.globalAlpha = a * opacity * 0.25;
      ctx.beginPath();
      ctx.arc(x, y, sz * 2.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [
    frame,
    count,
    colors,
    width,
    height,
    speed,
    size,
    mode,
    seed,
    origin.x,
    origin.y,
    emitStart,
    emitEnd,
    trailing,
    opacity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};
