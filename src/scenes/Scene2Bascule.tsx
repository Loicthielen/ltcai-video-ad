import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { brand } from "../theme/brand";
import { ShockWave } from "../components/ShockWave";
import { ParticleField } from "../components/ParticleField";
import { GlowWrapper } from "../components/GlowWrapper";

// Scene 2 — Bascule (frames 120-180 = local 0-60).
// Flash, shockwave, chromatic aberration spike, brief logo reveal,
// path-drawn text "L'IA change tout."
export const Scene2Bascule: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame; // sequence-local

  // Flash 0-8 frames
  const flash = interpolate(local, [0, 4, 12], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chromatic aberration peak around frame 10
  const ca = interpolate(local, [4, 10, 18], [0, 14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background gradient transitions from navy chaos to bright LTC blue
  const bgT = Math.min(1, local / 30);
  const bg = `radial-gradient(circle at 50% 50%, ${mix(
    brand.navyDeep,
    brand.blue,
    bgT,
  )} 0%, ${mix("#0a1628", "#0c4a8c", bgT)} 70%, #050B16 100%)`;

  // Logo reveal at local 30-50
  const logoEnter = spring({
    frame: local - 28,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const logoExit = interpolate(local, [44, 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoOpacity = logoEnter * (1 - logoExit);
  const logoScale = 0.6 + logoEnter * 0.5;

  return (
    <AbsoluteFill
      style={{
        background: bg,
        overflow: "hidden",
      }}
    >
      {/* Chromatic aberration via 3 RGB-shifted radial gradients */}
      {ca > 0.5 && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle, rgba(239,68,68,0.18), transparent 70%)",
              transform: `translateX(${-ca}px)`,
              mixBlendMode: "screen",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)",
              transform: `translateX(${ca}px)`,
              mixBlendMode: "screen",
            }}
          />
        </>
      )}

      {/* Shockwave */}
      <ShockWave
        startFrame={6}
        duration={40}
        color={brand.cyanLight}
        rings={5}
        maxRadius={1500}
      />
      <ShockWave
        startFrame={10}
        duration={36}
        color={brand.gold}
        rings={3}
        maxRadius={1200}
      />

      {/* Particle explosion from center */}
      <ParticleField
        count={120}
        colors={[brand.blueLight, brand.cyan, brand.gold, brand.white]}
        width={1080}
        height={1920}
        mode="explode"
        speed={1.4}
        size={[3, 9]}
        seed="bascule"
        origin={{ x: 540, y: 960 }}
        emitStart={4}
      />

      {/* Logo flash reveal */}
      {logoOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: logoOpacity,
          }}
        >
          <GlowWrapper color={brand.cyan} intensity={1.6}>
            <div
              style={{
                transform: `scale(${logoScale})`,
                fontFamily: "Inter,sans-serif",
                fontWeight: 900,
                fontSize: 240,
                letterSpacing: -8,
                color: brand.white,
                textShadow: `0 0 60px ${brand.cyan}, 0 0 120px ${brand.blueLight}`,
              }}
            >
              LTC <span style={{ color: brand.gold }}>AI</span>
            </div>
          </GlowWrapper>
        </div>
      )}

      {/* "L'IA change tout." text - path drawn via stroke-dasharray */}
      <PathDrawnText local={local} />

      {/* White flash overlay */}
      {flash > 0.01 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            opacity: flash,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};

const PathDrawnText: React.FC<{ local: number }> = ({ local }) => {
  // Appears local 36-58
  const start = 36;
  const drawT = interpolate(local, [start, start + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fillT = interpolate(local, [start + 14, start + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const op = interpolate(local, [start, start + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dashTotal = 4000;
  return (
    <div
      style={{
        position: "absolute",
        top: 1100,
        left: 0,
        right: 0,
        textAlign: "center",
        opacity: op,
      }}
    >
      <svg
        width="1080"
        height="260"
        viewBox="0 0 1080 260"
        style={{ overflow: "visible" }}
      >
        <text
          x="540"
          y="170"
          textAnchor="middle"
          fontFamily="Inter,sans-serif"
          fontWeight="900"
          fontSize="160"
          letterSpacing="-4"
          fill={brand.white}
          fillOpacity={fillT}
          stroke={brand.cyanLight}
          strokeWidth={3}
          strokeDasharray={dashTotal}
          strokeDashoffset={dashTotal * (1 - drawT)}
          style={{
            filter: `drop-shadow(0 0 20px ${brand.cyan}) drop-shadow(0 0 50px ${brand.blueLight})`,
          }}
        >
          L'IA change tout.
        </text>
      </svg>
    </div>
  );
};

// Hex color blender helper
function mix(a: string, b: string, t: number) {
  const pa = parseHex(a);
  const pb = parseHex(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r},${g},${bl})`;
}
function parseHex(h: string): [number, number, number] {
  const x = h.replace("#", "");
  return [
    parseInt(x.slice(0, 2), 16),
    parseInt(x.slice(2, 4), 16),
    parseInt(x.slice(4, 6), 16),
  ];
}
