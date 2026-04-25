import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand, safeZone } from "../theme/brand";
import { ParticleField } from "../components/ParticleField";
import { SlotCounter } from "../components/SlotCounter";
import { KineticText } from "../components/KineticText";
import { Float } from "../components/Float";
import { GlowWrapper } from "../components/GlowWrapper";

// Scene 3 - Libération (frames 180-330 = local 0-150)
// Dolly-out 1.15 -> 1.0, +15h slot counter, growth curve, 3 benefit icons,
// morphing text blocks.
export const Scene3Liberation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame;

  const dolly = interpolate(local, [0, 150], [1.18, 1.0], {
    extrapolateRight: "clamp",
  });

  // Slow rotating diagonal light rays
  const rayShift = (local * 0.6) % 100;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${brand.navy} 0%, #102447 40%, #0c3a78 70%, ${brand.navyDeep} 100%)`,
        overflow: "hidden",
        transform: `scale(${dolly})`,
        transformOrigin: "50% 50%",
      }}
    >
      {/* Diagonal light rays */}
      <DiagonalRays frame={local} shift={rayShift} />

      {/* Growth curve in mid-ground */}
      <GrowthCurve frame={local} />

      {/* Ambient particles */}
      <ParticleField
        count={70}
        colors={[brand.blueLight, brand.cyanLight, brand.goldLight, "#93C5FD"]}
        width={1080}
        height={1920}
        mode="drift"
        speed={0.5}
        size={[2, 5]}
        seed="liberation"
        opacity={0.85}
      />

      {/* Slot counter +15h */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <Float seed="counter" amplitude={3} period={70}>
          <GlowWrapper
            color={brand.gold}
            intensity={1.3}
            pulse
            pulseAmplitude={0.18}
            pulsePeriod={42}
          >
            <SlotCounter
              from={0}
              to={15}
              startFrame={10}
              durationInFrames={50}
              prefix="+"
              suffix="h"
              fontSize={360}
              color={brand.goldLight}
              glow={brand.gold}
            />
          </GlowWrapper>
        </Float>
      </div>

      {/* Text blocks */}
      <TextBlocks local={local} />

      {/* Benefits icons */}
      <BenefitIcons local={local} />

      {/* Subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

const DiagonalRays: React.FC<{ frame: number; shift: number }> = ({
  frame,
  shift,
}) => {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.35,
        mixBlendMode: "screen",
      }}
      viewBox="0 0 1080 1920"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCD34D" stopOpacity="0" />
          <stop offset="50%" stopColor="#FCD34D" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 8 }).map((_, i) => {
        const x = (i * 200 + shift * 4) - 400;
        return (
          <polygon
            key={i}
            points={`${x},0 ${x + 60},0 ${x + 320},1920 ${x + 260},1920`}
            fill="url(#ray)"
            opacity={0.6}
          />
        );
      })}
    </svg>
  );
};

const GrowthCurve: React.FC<{ frame: number }> = ({ frame }) => {
  // Trace from local 40 to 130
  const start = 40;
  const t = interpolate(frame, [start, start + 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dashTotal = 2400;
  return (
    <svg
      style={{ position: "absolute", inset: 0, opacity: 0.4 }}
      viewBox="0 0 1080 1920"
    >
      <path
        d="M 60 1500 Q 300 1480 480 1300 T 900 700 L 1020 500"
        fill="none"
        stroke={brand.cyanLight}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={dashTotal}
        strokeDashoffset={dashTotal * (1 - t)}
        style={{ filter: `drop-shadow(0 0 14px ${brand.cyan})` }}
      />
      {/* Endpoint dot */}
      {t > 0.95 && (
        <circle
          cx="1020"
          cy="500"
          r={14}
          fill={brand.gold}
          style={{ filter: `drop-shadow(0 0 20px ${brand.gold})` }}
        />
      )}
    </svg>
  );
};

const TextBlocks: React.FC<{ local: number }> = ({ local }) => {
  // Block A: "+15h par semaine économisées" 15-90 (relative)
  // Block B: "Sans complexité." then "Sans jargon." 80-150
  return (
    <>
      {/* "par semaine économisées" subtext below counter */}
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <KineticText
          text="par semaine économisées"
          startFrame={48}
          fontSize={58}
          weight={700}
          color={brand.whiteSoft}
          letterSpacing={-1}
        />
      </div>

      {/* Block B - bottom text */}
      <div
        style={{
          position: "absolute",
          top: 1200,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <KineticText
          text="Sans complexité."
          startFrame={80}
          fontSize={88}
          weight={800}
          color={brand.white}
          glow={brand.cyan}
          exit={{ startFrame: 116, mode: "rise" }}
        />
        <div style={{ height: 22 }} />
        <KineticText
          text="Sans jargon."
          startFrame={120}
          fontSize={88}
          weight={800}
          color={brand.goldLight}
          glow={brand.gold}
        />
      </div>
    </>
  );
};

const BenefitIcons: React.FC<{ local: number }> = ({ local }) => {
  const icons = [
    { startFrame: 60, label: "Emails", emoji: "✉" },
    { startFrame: 75, label: "Rapports", emoji: "📊" },
    { startFrame: 90, label: "Analyse", emoji: "✨" },
  ];
  return (
    <div
      style={{
        position: "absolute",
        top: 900,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        padding: "0 50px",
        gap: 30,
      }}
    >
      {icons.map((ic, i) => {
        const t = local - ic.startFrame;
        if (t < 0) return null;
        // Spring-like overshoot
        let scale: number;
        if (t < 10) scale = (t / 10) * 1.18;
        else if (t < 16) scale = 1.18 - ((t - 10) / 6) * 0.18;
        else scale = 1.0;
        const op = Math.min(1, t / 5);
        return (
          <Float
            key={i}
            seed={`icon-${i}`}
            amplitude={5}
            period={70}
            style={{
              transform: `scale(${scale})`,
              opacity: op,
            }}
          >
            <div
              style={{
                width: 220,
                padding: "20px 16px",
                background: "rgba(13, 38, 76, 0.78)",
                border: `2px solid ${brand.cyan}`,
                borderRadius: 18,
                boxShadow: `0 0 40px ${brand.cyan}55`,
                backdropFilter: "blur(8px)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 70, lineHeight: 1 }}>{ic.emoji}</div>
              <div
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontWeight: 800,
                  color: brand.white,
                  fontSize: 28,
                  marginTop: 10,
                  letterSpacing: -0.5,
                }}
              >
                {ic.label}
              </div>
            </div>
          </Float>
        );
      })}
    </div>
  );
};
