import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../theme/brand";

type Props = {
  from: number;
  to: number;
  startFrame: number;
  durationInFrames: number;
  prefix?: string;
  suffix?: string;
  fontSize?: number;
  color?: string;
  glow?: string;
};

// Sober animated number. Single typography, value just changes.
// Halo only fades in when the counter has settled at `to`.
export const SoftCounter: React.FC<Props> = ({
  from,
  to,
  startFrame,
  durationInFrames,
  prefix = "+",
  suffix = "h",
  fontSize = 360,
  color = brand.white,
  glow = brand.blueGlow,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  // Spring-eased progress
  const progress = spring({
    frame: local,
    fps,
    config: { damping: 22, stiffness: 80, mass: 1 },
    durationInFrames,
  });
  const value = Math.round(from + (to - from) * progress);

  // Settle halo: ramps up after counter reaches `to`
  const settled = spring({
    frame: local - durationInFrames,
    fps,
    config: { damping: 26, stiffness: 70 },
    durationInFrames: 24,
  });
  const haloOpacity = settled * 0.55;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily: "'Inter',sans-serif",
        fontWeight: 900,
        fontSize,
        color,
        letterSpacing: -8,
        lineHeight: 1,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -fontSize * 0.4,
          background: `radial-gradient(circle at 50% 50%, ${glow}, transparent 65%)`,
          opacity: haloOpacity,
          pointerEvents: "none",
          filter: "blur(20px)",
        }}
      />
      <span style={{ position: "relative" }}>
        {prefix}
        {value}
        {suffix}
      </span>
    </div>
  );
};
