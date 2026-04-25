import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand, safeZone } from "../theme/brand";
import { ParticleField } from "../components/ParticleField";
import { GlowWrapper } from "../components/GlowWrapper";
import { KineticText } from "../components/KineticText";
import { Float } from "../components/Float";

// Scene 4 — CTA (frames 330-450 = local 0-120)
// Logo intro, "Diagnostic gratuit", "30 minutes offertes", CTA button + shine,
// confetti particles, final fade.
export const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame;

  // Logo entry: scale 0 -> 1.15 -> 1.0
  const logoSpring = spring({
    frame: local,
    fps,
    config: { damping: 9, stiffness: 130 },
  });
  const logoOvershoot =
    local < 16 ? 0 : Math.exp(-(local - 16) / 14) * Math.sin((local - 16) / 6) * 0.1;
  const logoScale = logoSpring * 1.0 + logoOvershoot;

  // Background pulsing gradient
  const breathe = 1 + Math.sin(local / 18) * 0.012;

  // Final fade: opacity 1 -> 0.85 last 10 frames + slight zoom
  const outroT = interpolate(local, [110, 119], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outroOpacity = 1 - outroT * 0.15;
  const outroZoom = 1 + outroT * 0.02;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, #1d4f9a 0%, ${brand.navy} 50%, ${brand.navyDeep} 100%)`,
        overflow: "hidden",
        transform: `scale(${breathe * outroZoom})`,
        opacity: outroOpacity,
      }}
    >
      {/* Diagonal subtle rays */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.25,
          mixBlendMode: "screen",
        }}
        viewBox="0 0 1080 1920"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ctaRay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={brand.gold} stopOpacity="0" />
            <stop offset="50%" stopColor={brand.gold} stopOpacity="0.45" />
            <stop offset="100%" stopColor={brand.gold} stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 6 }).map((_, i) => {
          const shift = ((local * 0.4) % 200) + i * 220 - 200;
          return (
            <polygon
              key={i}
              points={`${shift},0 ${shift + 70},0 ${shift + 280},1920 ${shift + 210},1920`}
              fill="url(#ctaRay)"
            />
          );
        })}
      </svg>

      {/* Confetti particles */}
      <ParticleField
        count={50}
        colors={[brand.blueLight, brand.cyan, brand.gold, brand.goldLight, brand.white]}
        width={1080}
        height={1920}
        mode="rain"
        speed={0.6}
        size={[3, 7]}
        seed="cta-confetti"
        emitStart={6}
        opacity={0.7}
      />

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, logoSpring * 1.6),
        }}
      >
        <Float seed="logo" amplitude={3} period={90}>
          <GlowWrapper
            color={brand.cyan}
            intensity={1.0}
            pulse
            pulseAmplitude={0.25}
            pulsePeriod={48}
          >
            <div
              style={{
                transform: `scale(${logoScale})`,
                transformOrigin: "50% 50%",
              }}
            >
              <Img
                src={staticFile("ltcai-logo.svg")}
                style={{
                  width: 720,
                  height: "auto",
                  display: "block",
                  filter: `drop-shadow(0 0 24px ${brand.cyan})`,
                }}
              />
            </div>
          </GlowWrapper>
        </Float>
      </div>

      {/* "Diagnostic gratuit" */}
      <div
        style={{
          position: "absolute",
          top: 800,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        <KineticText
          text="Diagnostic gratuit"
          startFrame={28}
          staggerPerWord={6}
          fontSize={96}
          weight={900}
          color={brand.white}
          glow={brand.cyan}
        />
      </div>

      {/* "30 minutes offertes" reveal wipe */}
      <RevealWipe
        local={local}
        startFrame={48}
        duration={20}
        text="30 minutes offertes"
        top={930}
      />

      {/* Button */}
      <CTAButton local={local} />

      {/* Tagline whisper */}
      <div
        style={{
          position: "absolute",
          bottom: 470,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Inter,sans-serif",
          fontWeight: 600,
          fontSize: 36,
          color: brand.cyanLight,
          opacity: interpolate(local, [50, 70], [0, 0.85], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        L'IA, simplement.
      </div>
    </AbsoluteFill>
  );
};

const RevealWipe: React.FC<{
  local: number;
  startFrame: number;
  duration: number;
  text: string;
  top: number;
}> = ({ local, startFrame, duration, text, top }) => {
  const t = interpolate(local, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        textAlign: "center",
        clipPath: `inset(0 ${(1 - t) * 100}% 0 0)`,
        opacity: Math.min(1, t * 3),
      }}
    >
      <div
        style={{
          fontFamily: "Inter,sans-serif",
          fontWeight: 700,
          fontSize: 70,
          color: brand.goldLight,
          letterSpacing: -1,
          textShadow: `0 0 20px ${brand.gold}`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const CTAButton: React.FC<{ local: number }> = ({ local }) => {
  const enter = spring({
    frame: local - 60,
    fps: 30,
    config: { damping: 10, stiffness: 130 },
  });
  // Pulse 1.0 <-> 1.05 sinusoidal, period 36 frames (~1.2s)
  const pulse = 1 + Math.sin(((local - 70) / 36) * Math.PI * 2) * 0.04;
  const scale = enter * pulse;
  const opacity = Math.min(1, enter * 1.2);

  // Shine sweep at local 80 (relative)
  const shineT = interpolate(local, [78, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showShine = shineT > 0 && shineT < 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 1080,
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
          position: "relative",
        }}
      >
        <div
          style={{
            position: "relative",
            padding: "32px 80px",
            borderRadius: 80,
            background: `linear-gradient(135deg, ${brand.gold} 0%, ${brand.goldLight} 50%, ${brand.gold} 100%)`,
            boxShadow: `0 14px 50px ${brand.gold}99, 0 0 90px ${brand.gold}66, inset 0 0 30px rgba(255,255,255,0.25)`,
            fontFamily: "Inter,sans-serif",
            fontWeight: 900,
            fontSize: 78,
            color: brand.navyDeep,
            letterSpacing: -1,
            overflow: "hidden",
            border: `4px solid ${brand.white}`,
          }}
        >
          ltcai.be
          {/* Shine sweep */}
          {showShine && (
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: 180,
                left: `${shineT * 110 - 30}%`,
                background:
                  "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
                transform: "skewX(-22deg)",
                pointerEvents: "none",
                mixBlendMode: "screen",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
