import React from "react";
import { useCurrentFrame, random } from "remotion";

// Cheap procedural grain via radial noise. ~3-4% intensity, animated.
export const GrainOverlay: React.FC<{ intensity?: number }> = ({
  intensity = 0.05,
}) => {
  const frame = useCurrentFrame();
  // Use a CSS noise via SVG turbulence — reliable cross-browser.
  // Re-seed every 2 frames to animate grain.
  const seed = Math.floor(frame / 2);
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "overlay",
        opacity: intensity * 4,
      }}
    >
      <filter id={`grain-${seed}`}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          seed={seed}
        />
        <feColorMatrix
          values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.5 0"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
    </svg>
  );
};
