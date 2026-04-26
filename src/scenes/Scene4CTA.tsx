import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand } from "../theme/brand";
import { KineticText } from "../components/KineticText";

// Scene 4 — CTA. Headline + button only. The brand mark lives in the
// permanent watermark (composition-level), so no central logo here.
export const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame;

  // Outro fade
  const outroT = interpolate(local, [110, 119], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outroOpacity = 1 - outroT * 0.15;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, #1d4f9a 0%, ${brand.navy} 55%, ${brand.navyDeep} 100%)`,
        overflow: "hidden",
        opacity: outroOpacity,
      }}
    >
      <SubtleField frame={local} />

      {/* "Diagnostic gratuit" — moved up to the visual sweet spot */}
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 50px",
        }}
      >
        <KineticText
          text="Diagnostic gratuit"
          startFrame={10}
          staggerPerWord={8}
          fontSize={104}
          weight={900}
          color={brand.white}
          letterSpacing={-2}
        />
      </div>

      <CTAButton local={local} fps={fps} />
    </AbsoluteFill>
  );
};

const SubtleField: React.FC<{ frame: number }> = ({ frame }) => {
  const items = 14;
  return (
    <svg
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      viewBox="0 0 1080 1920"
    >
      {Array.from({ length: items }).map((_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r1 = (seed % 1000) / 1000;
        const r2 = ((seed * 7) % 1000) / 1000;
        const r3 = ((seed * 13) % 1000) / 1000;
        const x = r1 * 1080 + Math.sin((frame + i * 13) * 0.008) * 10;
        const y = r2 * 1920 + Math.cos((frame + i * 17) * 0.009) * 10;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={2 + r3 * 2}
            fill={brand.blueGlow}
            opacity={0.22}
          />
        );
      })}
    </svg>
  );
};

const CTAButton: React.FC<{ local: number; fps: number }> = ({ local, fps }) => {
  const enter = spring({
    frame: local - 36,
    fps,
    config: { damping: 22, stiffness: 100 },
  });
  const pulse = 1 + Math.sin(((local - 50) / 36) * Math.PI * 2) * 0.018;
  const scale = enter * pulse;
  const opacity = Math.min(1, enter * 1.2);

  return (
    <div
      style={{
        position: "absolute",
        top: 980,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "50% 50%",
          padding: "32px 96px",
          borderRadius: 90,
          background: brand.white,
          boxShadow: `0 14px 42px ${brand.navyDeep}aa, 0 0 70px ${brand.blueGlow}55`,
          fontFamily: "Inter,sans-serif",
          fontWeight: 900,
          fontSize: 96,
          color: brand.navy,
          letterSpacing: -2,
          border: `2px solid ${brand.blueLight}`,
        }}
      >
        ltcai.be
      </div>
    </div>
  );
};
