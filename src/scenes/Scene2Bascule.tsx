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

// Scene 2 — silent transition. The chaos doesn't explode; a soft circle
// breathes outward and the next palette emerges. No flash, no shockwave,
// no chromatic aberration, no particle explosion.
export const Scene2Bascule: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame;

  // Background slowly migrates from chaos navy to liberation navy/blue.
  const bgT = Math.min(1, local / 60);
  const a = mix(brand.navyDeep, brand.navy, bgT);
  const b = mix(brand.navy, brand.navySoft, bgT);
  const c = mix(brand.navySoft, "#0c3a78", bgT);

  // Soft expanding circle "breath" — 0 -> ~1100px radius across 60 frames
  const breath = spring({
    frame: local,
    fps,
    config: { damping: 22, stiffness: 60 },
    durationInFrames: 60,
  });
  const circleR = breath * 1100;
  const circleOpacity = interpolate(local, [0, 30, 60], [0, 0.4, 0.18], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${a} 0%, ${b} 50%, ${c} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Soft geometric breath */}
      <svg
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        viewBox="0 0 1080 1920"
      >
        <defs>
          <radialGradient id="breathGrad">
            <stop offset="0%" stopColor={brand.cyanLight} stopOpacity="0.55" />
            <stop offset="50%" stopColor={brand.blueLight} stopOpacity="0.25" />
            <stop offset="100%" stopColor={brand.blue} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx={540}
          cy={960}
          r={circleR}
          fill="url(#breathGrad)"
          opacity={circleOpacity}
        />
        <circle
          cx={540}
          cy={960}
          r={circleR * 0.75}
          fill="none"
          stroke={brand.cyanLight}
          strokeWidth={1.5}
          opacity={circleOpacity * 0.5}
        />
      </svg>

      {/* Kinetic text "L'IA change tout." — sober, mot par mot */}
      <div
        style={{
          position: "absolute",
          top: 880,
          left: 0,
          right: 0,
          padding: "0 60px",
          textAlign: "center",
        }}
      >
        <KineticText
          text="L'IA change tout."
          startFrame={20}
          staggerPerWord={8}
          fontSize={130}
          weight={900}
          color={brand.white}
          letterSpacing={-3}
        />
      </div>
    </AbsoluteFill>
  );
};

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
