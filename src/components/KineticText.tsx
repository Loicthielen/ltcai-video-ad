import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  text: string;
  startFrame: number;
  staggerPerWord?: number;
  fontSize?: number;
  color?: string;
  weight?: number | string;
  letterSpacing?: number;
  emphasis?: boolean; // overshoot pulse
  exit?: { startFrame: number; mode?: "fade" | "rise" };
  align?: "left" | "center" | "right";
  glow?: string | null;
  outline?: string | null;
};

// Kinetic typography: words appear staggered with spring overshoot,
// translateY+scale combined. Optional emphasis pulse mid-life.
export const KineticText: React.FC<Props> = ({
  text,
  startFrame,
  staggerPerWord = 5,
  fontSize = 110,
  color = "#F8FAFC",
  weight = 800,
  letterSpacing = -2,
  emphasis = false,
  exit,
  align = "center",
  glow = null,
  outline = null,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  const exitProgress = exit
    ? spring({
        frame: frame - exit.startFrame,
        fps,
        config: { damping: 18, stiffness: 120 },
        durationInFrames: 18,
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
          config: { damping: 11, stiffness: 140, mass: 0.6 },
        });
        // Emphasis pulse: scale 1.0 → 1.18 → 1.0 around frame +18
        let pulse = 0;
        if (emphasis) {
          const pf = t - 18;
          if (pf > 0 && pf < 18) {
            pulse = Math.sin((pf / 18) * Math.PI) * 0.22;
          }
        }
        const scale = 0.82 + enter * 0.18 + pulse;
        const ty = (1 - enter) * 50;
        const opacity = Math.min(1, Math.max(0, enter)) * (1 - exitProgress);
        const exitTy = exit?.mode === "rise" ? -exitProgress * 60 : 0;

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
                ? `0 0 24px ${glow}, 0 0 60px ${glow}`
                : undefined,
              WebkitTextStroke: outline ? `2px ${outline}` : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
