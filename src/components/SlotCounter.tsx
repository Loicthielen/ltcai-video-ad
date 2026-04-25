import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

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

// Slot-machine number counter: each digit rolls vertically.
export const SlotCounter: React.FC<Props> = ({
  from,
  to,
  startFrame,
  durationInFrames,
  prefix = "+",
  suffix = "h",
  fontSize = 380,
  color = "#FCD34D",
  glow = "#F59E0B",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  const value = interpolate(local, [0, durationInFrames], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  const settle = spring({
    frame: local - durationInFrames,
    fps,
    config: { damping: 9, stiffness: 200, mass: 0.6 },
  });

  const displayInt = Math.floor(value + 0.0001);
  const digits = String(displayInt).padStart(String(to).length, " ").split("");

  // Effective progress to show partial roll on the rightmost digit
  const fractional = value - displayInt;

  const digitH = fontSize * 1.05;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
        fontFamily: "'Inter',sans-serif",
        fontWeight: 900,
        fontSize,
        color,
        letterSpacing: -8,
        textShadow: `0 0 40px ${glow}, 0 0 90px ${glow}`,
        transform: `scale(${1 + settle * 0.04})`,
      }}
    >
      <span style={{ marginRight: 4 }}>{prefix}</span>
      {digits.map((d, idx) => {
        const isLast = idx === digits.length - 1;
        const offset = isLast ? fractional * digitH : 0;
        const n = d === " " ? 0 : Number(d);
        const visible = d !== " ";
        return (
          <div
            key={idx}
            style={{
              height: digitH,
              overflow: "hidden",
              display: "inline-block",
              width: fontSize * 0.55,
              textAlign: "center",
              opacity: visible ? 1 : 0,
            }}
          >
            <div
              style={{
                transform: `translateY(${-n * digitH - offset}px)`,
                transition: "none",
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => (
                <div key={k} style={{ height: digitH, lineHeight: 1 }}>
                  {k}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <span style={{ marginLeft: 6 }}>{suffix}</span>
    </div>
  );
};
