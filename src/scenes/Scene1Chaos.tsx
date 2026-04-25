import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand, safeZone, VIDEO } from "../theme/brand";
import { KineticText } from "../components/KineticText";
import { Float } from "../components/Float";

// Scene 1 — chaos in a PME: stacking emails, spinning clock, falling folders,
// pop notifications, diagonal "time passing" lines, dolly-zoom in.
export const Scene1Chaos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame; // scene starts at frame 0
  const sceneEnd = 120;

  // Dolly-in: scale 1.0 -> 1.15 over 120 frames + subtle vibration near end
  const dolly = interpolate(local, [0, sceneEnd], [1.0, 1.15], {
    extrapolateRight: "clamp",
  });
  const vibrate =
    local > 105
      ? Math.sin(local * 6) * (local - 105) * 0.6
      : 0;

  // Background slow-shifting gradient
  const gradAngle = 135 + Math.sin(local / 40) * 10;
  const gradPos = (local / 6) % 100;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradAngle}deg, ${brand.navyDeep} 0%, ${brand.navy} ${gradPos}%, #1a2a4a 100%)`,
        overflow: "hidden",
        transform: `scale(${dolly}) translate(${vibrate}px, ${vibrate * 0.7}px)`,
        transformOrigin: "50% 50%",
      }}
    >
      {/* Layer 1: parallax grid */}
      <ParallaxGrid frame={local} />

      {/* Layer 2: pain points */}
      <EmailFlood frame={local} />
      <SpinningClock frame={local} />
      <FallingFolders frame={local} />
      <Notifications frame={local} />

      {/* Diagonal "time" lines */}
      <DiagonalTimeLines frame={local} />

      {/* Layer 3: foreground kinetic text */}
      <ForegroundText frame={local} fps={fps} />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

const ParallaxGrid: React.FC<{ frame: number }> = ({ frame }) => {
  const offset = (frame * 0.6) % 80;
  return (
    <svg
      style={{ position: "absolute", inset: 0, opacity: 0.18 }}
      viewBox="0 0 1080 1920"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="grid1"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
          x={offset}
          y={offset}
        >
          <path
            d="M 80 0 L 0 0 0 80"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="1080" height="1920" fill="url(#grid1)" />
    </svg>
  );
};

const EmailFlood: React.FC<{ frame: number }> = ({ frame }) => {
  // 50+ email pills streaming top-right to bottom-left in a band
  const items = 56;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {Array.from({ length: items }).map((_, i) => {
        const r1 = random(`em-${i}-a`);
        const r2 = random(`em-${i}-b`);
        const r3 = random(`em-${i}-c`);
        const stagger = i * 1.6;
        const t = frame - stagger;
        if (t < 0) return null;
        const startX = 1100 + r1 * 200;
        const startY = -120 + r2 * 1100;
        const speed = 4 + r3 * 4;
        const x = startX - t * speed;
        const y = startY + t * speed * 0.55;
        if (x < -300) return null;
        const op = interpolate(t, [0, 8, 100], [0, 0.85, 0.7], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `rotate(${-12 + r3 * 24}deg)`,
              opacity: op,
            }}
          >
            <div
              style={{
                width: 110,
                height: 32,
                background: `rgba(239, 68, 68, ${0.55 + r1 * 0.35})`,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                paddingLeft: 8,
                color: "#fff",
                fontSize: 14,
                fontFamily: "Inter,sans-serif",
                fontWeight: 700,
                boxShadow: "0 4px 14px rgba(239,68,68,0.4)",
              }}
            >
              ✉ {Math.floor(r2 * 99)} non lus
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SpinningClock: React.FC<{ frame: number }> = ({ frame }) => {
  // 1 turn / second = 12°/frame at 30fps
  const angle = frame * 12;
  return (
    <Float seed="clock" amplitude={6} period={70}>
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 380,
          width: 220,
          height: 220,
          borderRadius: 999,
          background:
            "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)",
          border: "6px solid #EF4444",
          boxShadow: "0 0 40px rgba(239,68,68,0.55)",
          opacity: 0.9,
        }}
      >
        {/* Tick marks */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 4,
              height: 14,
              background: "#F8FAFC",
              transformOrigin: "50% 96px",
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-96px)`,
              opacity: 0.75,
            }}
          />
        ))}
        {/* Hour hand */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 6,
            height: 70,
            background: "#F8FAFC",
            transformOrigin: "50% 100%",
            transform: `translate(-50%, -100%) rotate(${angle * 0.083}deg)`,
            borderRadius: 3,
          }}
        />
        {/* Minute hand */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 4,
            height: 96,
            background: "#FCD34D",
            transformOrigin: "50% 100%",
            transform: `translate(-50%, -100%) rotate(${angle}deg)`,
            borderRadius: 2,
            boxShadow: "0 0 14px #FCD34D",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 14,
            height: 14,
            borderRadius: 999,
            background: "#FCD34D",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </Float>
  );
};

const FallingFolders: React.FC<{ frame: number }> = ({ frame }) => {
  // 6 folders falling with bounce
  const items = 6;
  return (
    <>
      {Array.from({ length: items }).map((_, i) => {
        const r = random(`fold-${i}`);
        const stagger = i * 8 + 10;
        const t = frame - stagger;
        if (t < 0) return null;
        const baseX = 720 + r * 220;
        const targetY = 1300 + i * 18;
        const startY = -200;
        // Gravity-like fall with bounce
        const fallT = t / 30;
        let y = startY + 0.5 * 1900 * fallT * fallT;
        let bounce = 0;
        if (y > targetY) {
          const over = (y - targetY) / 180;
          bounce = Math.exp(-over * 2.5) * Math.sin(over * 12) * -40;
          y = targetY + bounce;
        }
        const rot = (r - 0.5) * 30 + (t > 35 ? 0 : (t - 35) * 1.5);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: baseX,
              top: y,
              width: 180,
              height: 130,
              transform: `rotate(${rot}deg)`,
              filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.45))",
            }}
          >
            <svg viewBox="0 0 180 130" width="180" height="130">
              <path
                d="M0 28 L70 28 L88 12 L180 12 L180 130 L0 130 Z"
                fill="#1E40AF"
                stroke="#3B82F6"
                strokeWidth="2"
              />
              <rect x="0" y="38" width="180" height="92" fill="#2563EB" />
              <rect
                x="20"
                y="58"
                width={120 - i * 8}
                height="6"
                fill="#93C5FD"
                opacity="0.5"
              />
              <rect
                x="20"
                y="74"
                width={90 - i * 6}
                height="6"
                fill="#93C5FD"
                opacity="0.4"
              />
            </svg>
          </div>
        );
      })}
    </>
  );
};

const Notifications: React.FC<{ frame: number }> = ({ frame }) => {
  const messages = [
    { t: 18, label: "Rappel : facture" },
    { t: 36, label: "Mail urgent" },
    { t: 58, label: "Réunion 14h" },
    { t: 80, label: "Slack: 7 msgs" },
    { t: 98, label: "Devis à envoyer" },
  ];
  return (
    <>
      {messages.map((m, i) => {
        const t = frame - m.t;
        if (t < 0) return null;
        // Spring-like overshoot scale: 0 -> 1.15 -> 1.0
        let scale: number;
        if (t < 8) scale = (t / 8) * 1.18;
        else if (t < 14) scale = 1.18 - ((t - 8) / 6) * 0.18;
        else scale = 1.0;
        const op = Math.min(1, t / 5) * (t > 70 ? Math.max(0, 1 - (t - 70) / 25) : 1);
        const x = 70 + (i % 2) * 540;
        const y = 700 + i * 90 + (i % 2) * 30;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `scale(${scale})`,
              opacity: op,
              background: "rgba(15, 23, 42, 0.92)",
              border: "2px solid #EF4444",
              borderLeft: "8px solid #EF4444",
              borderRadius: 14,
              padding: "12px 18px",
              fontFamily: "Inter,sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: "#FEE2E2",
              boxShadow: "0 8px 28px rgba(239,68,68,0.5)",
              backdropFilter: "blur(6px)",
            }}
          >
            🔔 {m.label}
          </div>
        );
      })}
    </>
  );
};

const DiagonalTimeLines: React.FC<{ frame: number }> = ({ frame }) => {
  const lines = 14;
  return (
    <svg
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      viewBox="0 0 1080 1920"
    >
      {Array.from({ length: lines }).map((_, i) => {
        const r = random(`tl-${i}`);
        const phase = (frame * (3 + r * 4) + i * 220) % 2400;
        const x = -300 + phase;
        const y = -200 + ((i * 140 + frame * 0.4) % 2300);
        return (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x + 280}
            y2={y + 200}
            stroke="#60A5FA"
            strokeWidth={1.6}
            opacity={0.18 + r * 0.18}
          />
        );
      })}
    </svg>
  );
};

const ForegroundText: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: safeZone.centerY - 220,
        left: 0,
        right: 0,
        padding: "0 60px",
        textAlign: "center",
        zIndex: 5,
      }}
    >
      <KineticText
        text="Trop"
        startFrame={10}
        staggerPerWord={0}
        fontSize={150}
        color={brand.white}
        glow="rgba(96,165,250,0.55)"
      />
      <div style={{ height: 12 }} />
      <KineticText
        text="de tâches"
        startFrame={25}
        fontSize={130}
        color={brand.white}
        glow="rgba(96,165,250,0.45)"
      />
      <div style={{ height: 12 }} />
      <KineticText
        text="qui vous prennent"
        startFrame={40}
        fontSize={92}
        weight={700}
        color={brand.whiteSoft}
      />
      <div style={{ height: 8 }} />
      <KineticText
        text={"votre temps ?"}
        startFrame={70}
        fontSize={140}
        color={brand.gold}
        emphasis
        glow={brand.gold}
        weight={900}
      />
    </div>
  );
};
