import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Mail, BarChart3, Sparkles } from "lucide-react";
import { brand } from "../theme/brand";
import { ParticleField } from "../components/ParticleField";
import { SoftCounter } from "../components/SoftCounter";
import { KineticText } from "../components/KineticText";
import { Float } from "../components/Float";

// Scene 3 — Libération. Sober counter, ≤25 monochrome particles,
// growth curve, kinetic typography. No gold. No slot-machine.
export const Scene3Liberation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame;

  // Very subtle dolly-out
  const dolly = interpolate(local, [0, 150], [1.05, 1.0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(165deg, ${brand.navy} 0%, #0c3a78 55%, ${brand.navyDeep} 100%)`,
        overflow: "hidden",
        transform: `scale(${dolly})`,
        transformOrigin: "50% 50%",
      }}
    >
      <GrowthCurve frame={local} />

      {/* Sober ambient particles, blue monochrome, max 25 */}
      <ParticleField
        count={22}
        colors={[brand.blueLight, brand.blueGlow, brand.cyanSoft]}
        width={1080}
        height={1920}
        speed={0.4}
        size={[2, 4]}
        seed="liberation"
        opacity={0.28}
      />

      {/* +15h counter */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <Float seed="counter" amplitude={2} period={90}>
          <SoftCounter
            from={0}
            to={15}
            startFrame={10}
            durationInFrames={45}
            prefix="+"
            suffix="h"
            fontSize={340}
            color={brand.white}
            glow={brand.blueGlow}
          />
        </Float>
      </div>

      {/* Subtitle */}
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
          fontSize={56}
          weight={600}
          color={brand.whiteSoft}
          letterSpacing={-1}
        />
      </div>

      {/* Benefits row */}
      <BenefitIcons local={local} />

      {/* Bottom message */}
      <div
        style={{
          position: "absolute",
          top: 1240,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <KineticText
          text="Sans complexité."
          startFrame={80}
          fontSize={86}
          weight={800}
          color={brand.white}
          exit={{ startFrame: 116, mode: "rise" }}
        />
        <div style={{ height: 18 }} />
        <KineticText
          text="Sans jargon."
          startFrame={120}
          fontSize={86}
          weight={800}
          color={brand.cyanLight}
        />
      </div>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, transparent 50%, ${brand.navyDeep}55 100%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

const GrowthCurve: React.FC<{ frame: number }> = ({ frame }) => {
  const start = 40;
  const t = interpolate(frame, [start, start + 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dashTotal = 2400;
  return (
    <svg
      style={{ position: "absolute", inset: 0, opacity: 0.32 }}
      viewBox="0 0 1080 1920"
    >
      <path
        d="M 60 1500 Q 300 1480 480 1300 T 900 700 L 1020 500"
        fill="none"
        stroke={brand.blueGlow}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={dashTotal}
        strokeDashoffset={dashTotal * (1 - t)}
      />
      {t > 0.95 && (
        <circle cx="1020" cy="500" r={11} fill={brand.cyanLight} />
      )}
    </svg>
  );
};

const BenefitIcons: React.FC<{ local: number }> = ({ local }) => {
  const icons: { startFrame: number; label: string; Icon: React.FC<any> }[] = [
    { startFrame: 60, label: "Emails", Icon: Mail },
    { startFrame: 75, label: "Rapports", Icon: BarChart3 },
    { startFrame: 90, label: "Analyse", Icon: Sparkles },
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
        padding: "0 60px",
        gap: 28,
      }}
    >
      {icons.map((ic, i) => {
        const t = local - ic.startFrame;
        if (t < 0) return null;
        let scale: number;
        if (t < 14) scale = 0.94 + (t / 14) * 0.06;
        else scale = 1.0;
        const op = Math.min(1, t / 8);
        const Icon = ic.Icon;
        return (
          <Float
            key={i}
            seed={`icon-${i}`}
            amplitude={2.5}
            period={90}
            style={{
              transform: `scale(${scale})`,
              opacity: op,
            }}
          >
            <div
              style={{
                width: 220,
                padding: "20px 16px",
                background: `${brand.navySoft}CC`,
                border: `1.5px solid ${brand.blueLight}99`,
                borderRadius: 16,
                textAlign: "center",
                backdropFilter: "blur(4px)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Icon size={56} strokeWidth={1.5} color={brand.cyanLight} />
              </div>
              <div
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontWeight: 700,
                  color: brand.white,
                  fontSize: 26,
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
