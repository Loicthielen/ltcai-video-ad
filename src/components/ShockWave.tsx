import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props = {
  startFrame: number;
  duration?: number;
  color?: string;
  origin?: { x: number; y: number };
  maxRadius?: number;
  rings?: number;
};

// Concentric expanding rings — radial onde de choc.
export const ShockWave: React.FC<Props> = ({
  startFrame,
  duration = 30,
  color = "#22D3EE",
  origin = { x: 540, y: 960 },
  maxRadius = 1400,
  rings = 4,
}) => {
  const frame = useCurrentFrame();
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      viewBox="0 0 1080 1920"
    >
      {Array.from({ length: rings }).map((_, i) => {
        const local = frame - startFrame - i * 4;
        if (local < 0) return null;
        const t = Math.min(1, local / duration);
        const r = interpolate(t, [0, 1], [0, maxRadius]);
        const op = interpolate(t, [0, 0.2, 1], [0, 0.85, 0]);
        const sw = interpolate(t, [0, 1], [22, 2]);
        return (
          <circle
            key={i}
            cx={origin.x}
            cy={origin.y}
            r={r}
            stroke={color}
            strokeWidth={sw}
            fill="none"
            opacity={op}
            style={{
              filter: `drop-shadow(0 0 18px ${color})`,
            }}
          />
        );
      })}
    </svg>
  );
};
