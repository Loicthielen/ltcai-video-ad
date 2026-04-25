import React from "react";
import { useCurrentFrame } from "remotion";

type Props = {
  color: string;
  intensity?: number;
  pulse?: boolean;
  pulseAmplitude?: number;
  pulsePeriod?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

// CSS filter-based bloom/glow with optional sinusoidal pulsing.
export const GlowWrapper: React.FC<Props> = ({
  color,
  intensity = 1,
  pulse = false,
  pulseAmplitude = 0.4,
  pulsePeriod = 36,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = pulse
    ? 1 + Math.sin((frame / pulsePeriod) * Math.PI * 2) * pulseAmplitude
    : 1;
  const i = intensity * p;
  return (
    <div
      style={{
        ...style,
        filter: `drop-shadow(0 0 ${20 * i}px ${color}) drop-shadow(0 0 ${
          50 * i
        }px ${color})`,
      }}
    >
      {children}
    </div>
  );
};
