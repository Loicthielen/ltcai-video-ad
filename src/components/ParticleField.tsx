import React, { useEffect, useRef } from "react";
import { useCurrentFrame, random } from "remotion";

type Props = {
  count?: number;
  colors?: string[];
  width: number;
  height: number;
  speed?: number;
  size?: [number, number];
  seed?: string;
  opacity?: number;
};

// Sober ambient particle drift. Monochrome, slow, ≤30% opacity.
// All other modes (explode/rain/trailing) removed for v2 sobriety.
export const ParticleField: React.FC<Props> = ({
  count = 22,
  colors = ["#3B82F6"],
  width,
  height,
  speed = 0.35,
  size = [2, 4],
  seed = "p",
  opacity = 0.3,
}) => {
  const frame = useCurrentFrame();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < count; i++) {
      const r1 = random(`${seed}-${i}-a`);
      const r2 = random(`${seed}-${i}-b`);
      const r3 = random(`${seed}-${i}-c`);
      const r4 = random(`${seed}-${i}-d`);
      const r5 = random(`${seed}-${i}-e`);

      const color = colors[Math.floor(r5 * colors.length)];
      const sz = size[0] + r3 * (size[1] - size[0]);

      const baseX = r1 * width;
      const baseY = r2 * height;
      const x =
        baseX + Math.sin((frame + i * 9) * 0.008) * 16 * speed;
      const y =
        baseY +
        Math.cos((frame + i * 11) * 0.009) * 14 * speed;

      const a = (0.45 + r4 * 0.55) * opacity;

      ctx.globalAlpha = a;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, sz, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [frame, count, colors, width, height, speed, size, seed, opacity]);

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
