import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONTS } from "../config/brand";

type Mode = "fade" | "fadeUp" | "letters" | "words";

type Props = {
  text: string;
  mode?: Mode;
  delay?: number;
  durationInFrames?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  lineHeight?: number;
  letterSpacing?: number;
  maxWidth?: number | string;
  textAlign?: "left" | "center" | "right";
  style?: React.CSSProperties;
};

/**
 * Texte animé réutilisable — ton posé, pas de rebond agressif.
 * - fade / fadeUp : apparition douce du bloc entier
 * - letters / words : apparition séquentielle, rythme calme
 */
export const AnimatedText: React.FC<Props> = ({
  text,
  mode = "fadeUp",
  delay = 0,
  durationInFrames = 30,
  fontSize = 64,
  fontWeight = FONTS.weightSemibold,
  color = "#0E1B3A",
  lineHeight = 1.2,
  letterSpacing = -0.5,
  maxWidth = "90%",
  textAlign = "center",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const baseStyle: React.CSSProperties = {
    fontFamily: FONTS.family,
    fontSize,
    fontWeight,
    color,
    lineHeight,
    letterSpacing,
    maxWidth,
    textAlign,
    margin: 0,
    ...style,
  };

  if (mode === "fade" || mode === "fadeUp") {
    const progress = spring({
      frame: localFrame,
      fps,
      config: { damping: 200, mass: 0.6, stiffness: 90 },
      durationInFrames,
    });
    const opacity = interpolate(progress, [0, 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const translateY =
      mode === "fadeUp"
        ? interpolate(progress, [0, 1], [18, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : 0;

    return (
      <div
        style={{
          ...baseStyle,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        {text}
      </div>
    );
  }

  const tokens = mode === "letters" ? Array.from(text) : text.split(" ");
  const stagger = mode === "letters" ? 1.2 : 5;

  return (
    <div style={baseStyle}>
      {tokens.map((token, i) => {
        const tokenFrame = localFrame - i * stagger;
        const opacity = interpolate(tokenFrame, [0, 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const translateY = interpolate(tokenFrame, [0, 12], [10, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <span
            key={`${token}-${i}`}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${translateY}px)`,
              whiteSpace: "pre",
            }}
          >
            {token}
            {mode === "words" && i < tokens.length - 1 ? " " : ""}
          </span>
        );
      })}
    </div>
  );
};
