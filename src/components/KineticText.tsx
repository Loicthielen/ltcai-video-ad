import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../theme/brand";

type Props = {
  text: string;
  startFrame: number;
  staggerPerWord?: number;
  fontSize?: number;
  color?: string;
  weight?: number | string;
  letterSpacing?: number;
  exit?: { startFrame: number; mode?: "fade" | "rise" };
  align?: "left" | "center" | "right";
  glow?: string | null;
};

// Kinetic typography: words appear staggered with sober spring,
// translateY+scale combined. No emphasis pulse — kept calm.
export const KineticText: React.FC<Props> = ({
  text,
  startFrame,
  staggerPerWord = 5,
  fontSize = 110,
  color = brand.white,
  weight = 800,
  letterSpacing = -2,
  exit,
  align = "center",
  glow = null,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  const exitProgress = exit
    ? spring({
        frame: frame - exit.startFrame,
        fps,
        config: { damping: 22, stiffness: 110 },
        durationInFrames: 22,
      })
    : 0;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: `${Math.max(fontSize * 0.22, 12)}px`,
        rowGap: `${Math.max(fontSize * 0.05, 4)}px`,
        justifyContent:
          align === "center"
            ? "center"
            : align === "right"
              ? "flex-end"
              : "flex-start",
        width: "100%",
      }}
    >
      {words.map((word, i) => {
        const wordStart = startFrame + i * staggerPerWord;
        const t = frame - wordStart;
        const enter = spring({
          frame: t,
          fps,
          config: { damping: 14, stiffness: 110, mass: 0.6 },
        });
        const scale = 0.92 + enter * 0.08;
        const ty = (1 - enter) * 32;
        const opacity = Math.min(1, Math.max(0, enter)) * (1 - exitProgress);
        const exitTy = exit?.mode === "rise" ? -exitProgress * 40 : 0;

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontFamily:
                "'Inter','SF Pro Display',-apple-system,system-ui,sans-serif",
              fontSize,
              fontWeight: weight,
              letterSpacing,
              color,
              transform: `translateY(${ty + exitTy}px) scale(${scale})`,
              opacity,
              lineHeight: 1.05,
              textShadow: glow
                ? `0 0 24px ${glow}`
                : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
