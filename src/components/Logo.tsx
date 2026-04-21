import React from "react";
import {
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

type LogoProps = {
  size?: number;
  opacity?: number;
  style?: React.CSSProperties;
};

/**
 * Logo LTC AI officiel (public/ltc-logo.png).
 * Composant brut, sans animation — à composer avec un wrapper animé.
 */
export const Logo: React.FC<LogoProps> = ({
  size = 120,
  opacity = 1,
  style,
}) => {
  return (
    <Img
      src={staticFile("ltc-logo.png")}
      style={{
        width: size,
        height: "auto",
        display: "block",
        opacity,
        ...style,
      }}
    />
  );
};

type WatermarkProps = {
  size?: number;
  top?: number;
  right?: number;
  maxOpacity?: number;
  fadeInFrames?: number;
};

/**
 * Watermark permanent — coin supérieur droit, fade-in discret au frame 0.
 * À placer dans un <AbsoluteFill pointerEvents="none"> au niveau de la composition
 * pour rester visible sur toutes les scènes.
 */
export const LogoWatermark: React.FC<WatermarkProps> = ({
  size = 120,
  top = 56,
  right = 56,
  maxOpacity = 0.85,
  fadeInFrames = 15,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeInFrames], [0, maxOpacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        right,
        opacity,
      }}
    >
      <Logo size={size} />
    </div>
  );
};
