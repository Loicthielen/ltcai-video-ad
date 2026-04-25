import React from "react";
import { random, useCurrentFrame } from "remotion";

type Props = {
  seed: string;
  amplitude?: number;
  period?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

// Continuous micro-float for "static" elements. Phase-decorrelated by seed.
export const Float: React.FC<Props> = ({
  seed,
  amplitude = 4,
  period = 80,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const phase = random(`float-${seed}`) * Math.PI * 2;
  const phase2 = random(`float-${seed}-x`) * Math.PI * 2;
  const x = Math.cos((frame / period) * Math.PI * 2 + phase2) * amplitude * 0.6;
  const y = Math.sin((frame / period) * Math.PI * 2 + phase) * amplitude;
  return (
    <div
      style={{ ...style, transform: `translate(${x}px, ${y}px)` }}
    >
      {children}
    </div>
  );
};
