import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  fromPath: string;
  toPath: string;
  startFrame: number;
  duration?: number;
  size?: number;
  color?: string;
  x?: number;
  y?: number;
};

// Lerp two SVG paths that share the same command sequence + count.
// We don't do general path morphing — we keep paths same-shape and just
// interpolate numeric tokens. Both inputs MUST have matching command order.
const lerpPaths = (a: string, b: string, t: number): string => {
  const re = /-?\d+(?:\.\d+)?/g;
  const aNums = a.match(re) ?? [];
  const bNums = b.match(re) ?? [];
  let i = 0;
  return a.replace(re, () => {
    const x = parseFloat(aNums[i] ?? "0");
    const y = parseFloat(bNums[i] ?? aNums[i] ?? "0");
    i++;
    return String(x + (y - x) * t);
  });
};

export const MorphingIcon: React.FC<Props> = ({
  fromPath,
  toPath,
  startFrame,
  duration = 24,
  size = 120,
  color = "#22D3EE",
  x = 0,
  y = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const eased = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 130 },
    durationInFrames: duration,
  });
  const path = lerpPaths(fromPath, toPath, eased);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        left: x,
        top: y,
        overflow: "visible",
        filter: `drop-shadow(0 0 12px ${color})`,
      }}
    >
      <path d={path} fill={color} />
    </svg>
  );
};
