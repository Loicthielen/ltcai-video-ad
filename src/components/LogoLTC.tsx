import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../config/brand";

type Props = {
  delay?: number;
  size?: number;
  color?: string;
};

/**
 * Logo textuel "LTC AI" animé sobrement (pas d'asset externe à embarquer).
 * Un point coloré chaleureux à gauche évoque une présence humaine.
 */
export const LogoLTC: React.FC<Props> = ({
  delay = 0,
  size = 56,
  color = COLORS.deepBlue,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 200, mass: 0.7, stiffness: 80 },
    durationInFrames: 40,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dotScale = interpolate(localFrame, [8, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.35,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          width: size * 0.35,
          height: size * 0.35,
          borderRadius: "50%",
          backgroundColor: COLORS.warmAccent,
          transform: `scale(${dotScale})`,
        }}
      />
      <div
        style={{
          fontFamily: FONTS.family,
          fontSize: size,
          fontWeight: FONTS.weightBold,
          color,
          letterSpacing: -1.5,
          lineHeight: 1,
        }}
      >
        LTC <span style={{ color: COLORS.warmAccentDeep }}>AI</span>
      </div>
    </div>
  );
};
