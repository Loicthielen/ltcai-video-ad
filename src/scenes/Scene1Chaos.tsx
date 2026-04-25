import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
} from "remotion";
import { Mail, Clock, Folder, Bell } from "lucide-react";
import { brand, safeZone } from "../theme/brand";
import { KineticText } from "../components/KineticText";
import { Float } from "../components/Float";

// Scene 1 — sober chaos. Monochrome blue palette only.
// Pictograms (lucide-react), no emojis, no red.
// Aimed at the same calm intensity as the first 12 frames.
export const Scene1Chaos: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame;
  const sceneEnd = 132;

  // Very subtle dolly-in (1.0 -> 1.05 over 4s) — was 1.15.
  const dolly = interpolate(local, [0, sceneEnd], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  // Fade-out toward bascule transition: stagger handled inside elements.
  const exitT = interpolate(local, [110, 132], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${brand.navyDeep} 0%, ${brand.navy} 60%, ${brand.navySoft} 100%)`,
        overflow: "hidden",
        transform: `scale(${dolly})`,
        transformOrigin: "50% 50%",
      }}
    >
      {/* Layer 1: parallax grid */}
      <ParallaxGrid frame={local} exitT={exitT} />

      {/* Layer 2: pain points (sober) */}
      <EmailStream frame={local} exitT={exitT} />
      <FocusClock frame={local} exitT={exitT} />
      <FolderStack frame={local} exitT={exitT} />
      <NotificationCards frame={local} exitT={exitT} />

      {/* Layer 3: foreground kinetic text */}
      <ForegroundText />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, transparent 50%, ${brand.navyDeep}99 100%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

const ParallaxGrid: React.FC<{ frame: number; exitT: number }> = ({
  frame,
  exitT,
}) => {
  const offset = (frame * 0.4) % 80;
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.12 * (1 - exitT),
      }}
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
            stroke={brand.blueLight}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="1080" height="1920" fill="url(#grid1)" />
    </svg>
  );
};

// Stream of mail pills — sober blue, lucide Mail icon, slow drift.
const EmailStream: React.FC<{ frame: number; exitT: number }> = ({
  frame,
  exitT,
}) => {
  const items = 28;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {Array.from({ length: items }).map((_, i) => {
        const r1 = random(`em-${i}-a`);
        const r2 = random(`em-${i}-b`);
        const r3 = random(`em-${i}-c`);
        const stagger = i * 2.6;
        const t = frame - stagger;
        if (t < 0) return null;
        const startX = 1180 + r1 * 200;
        const startY = -120 + r2 * 1100;
        const speed = 2.2 + r3 * 1.6;
        const x = startX - t * speed;
        const y = startY + t * speed * 0.45;
        if (x < -300) return null;

        // Stagger fade-out per item
        const itemExitDelay = (i % 8) * 2;
        const itemExit = Math.max(0, exitT - itemExitDelay / 22);
        const op = interpolate(t, [0, 10, 100], [0, 0.55, 0.45], {
          extrapolateRight: "clamp",
        }) * (1 - Math.min(1, itemExit * 22));

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `rotate(${-8 + r3 * 16}deg)`,
              opacity: op,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 8,
              background: `${brand.navyMid}cc`,
              border: `1px solid ${brand.blue}66`,
              fontFamily: "Inter,sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: brand.whiteMute,
              backdropFilter: "blur(2px)",
            }}
          >
            <Mail size={16} strokeWidth={1.5} color={brand.blueGlow} />
            {Math.floor(r2 * 99)} non lus
          </div>
        );
      })}
    </div>
  );
};

const FocusClock: React.FC<{ frame: number; exitT: number }> = ({
  frame,
  exitT,
}) => {
  // 1 turn / second (12°/frame) -> still fast enough to suggest "time pressure",
  // without flashing red.
  const angle = frame * 12;
  return (
    <Float seed="clock" amplitude={3} period={90}>
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 380,
          width: 220,
          height: 220,
          borderRadius: 999,
          border: `4px solid ${brand.blueLight}`,
          background: `${brand.navyDeep}AA`,
          opacity: 0.78 * (1 - exitT * 1.3),
          boxShadow: `0 0 30px ${brand.blue}44`,
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 3,
              height: 12,
              background: brand.whiteSoft,
              transformOrigin: "50% 96px",
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-94px)`,
              opacity: 0.55,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 5,
            height: 64,
            background: brand.whiteSoft,
            transformOrigin: "50% 100%",
            transform: `translate(-50%, -100%) rotate(${angle * 0.083}deg)`,
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 3,
            height: 88,
            background: brand.cyanLight,
            transformOrigin: "50% 100%",
            transform: `translate(-50%, -100%) rotate(${angle}deg)`,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 12,
            height: 12,
            borderRadius: 999,
            background: brand.cyanLight,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </Float>
  );
};

const FolderStack: React.FC<{ frame: number; exitT: number }> = ({
  frame,
  exitT,
}) => {
  const items = 5;
  return (
    <>
      {Array.from({ length: items }).map((_, i) => {
        const r = random(`fold-${i}`);
        const stagger = i * 8 + 14;
        const t = frame - stagger;
        if (t < 0) return null;
        const baseX = 720 + r * 200;
        const targetY = 1320 + i * 16;
        const startY = -200;
        const fallT = t / 30;
        let y = startY + 0.5 * 1900 * fallT * fallT;
        let bounce = 0;
        if (y > targetY) {
          const over = (y - targetY) / 180;
          bounce = Math.exp(-over * 2.5) * Math.sin(over * 12) * -28;
          y = targetY + bounce;
        }
        const rot = (r - 0.5) * 22 + (t > 35 ? 0 : (t - 35) * 1);
        const itemExit = Math.max(0, exitT - (items - i) * 0.04);
        const op = (1 - Math.min(1, itemExit * 5)) * 0.92;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: baseX,
              top: y,
              transform: `rotate(${rot}deg)`,
              opacity: op,
              filter: `drop-shadow(0 10px 18px ${brand.navyDeep}99)`,
              color: brand.blueGlow,
            }}
          >
            <Folder size={150} strokeWidth={1.4} fill={brand.navyMid} />
          </div>
        );
      })}
    </>
  );
};

const NotificationCards: React.FC<{ frame: number; exitT: number }> = ({
  frame,
  exitT,
}) => {
  const messages = [
    { t: 22, label: "Rappel : facture" },
    { t: 42, label: "Mail urgent" },
    { t: 64, label: "Réunion 14h" },
    { t: 88, label: "Devis à envoyer" },
  ];
  return (
    <>
      {messages.map((m, i) => {
        const t = frame - m.t;
        if (t < 0) return null;
        let scale: number;
        if (t < 10) scale = 0.92 + (t / 10) * 0.08;
        else scale = 1.0;
        const baseOp = Math.min(1, t / 6);
        const itemExit = Math.max(0, exitT - i * 0.05);
        const op = baseOp * (1 - Math.min(1, itemExit * 5));
        const x = 70 + (i % 2) * 540;
        const y = 700 + i * 100 + (i % 2) * 30;
        return (
          <Float
            key={i}
            seed={`notif-${i}`}
            amplitude={2}
            period={90}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `scale(${scale})`,
              opacity: op,
            }}
          >
            <div
              style={{
                background: `${brand.navySoft}D9`,
                border: `1.5px solid ${brand.blueLight}80`,
                borderLeft: `4px solid ${brand.cyanLight}`,
                borderRadius: 12,
                padding: "10px 16px",
                fontFamily: "Inter,sans-serif",
                fontWeight: 600,
                fontSize: 22,
                color: brand.whiteSoft,
                display: "flex",
                alignItems: "center",
                gap: 10,
                backdropFilter: "blur(4px)",
              }}
            >
              <Bell size={20} strokeWidth={1.5} color={brand.cyanLight} />
              {m.label}
            </div>
          </Float>
        );
      })}
    </>
  );
};

const ForegroundText: React.FC = () => {
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
      />
      <div style={{ height: 12 }} />
      <KineticText
        text="de tâches"
        startFrame={25}
        fontSize={130}
        color={brand.white}
      />
      <div style={{ height: 12 }} />
      <KineticText
        text="qui vous prennent"
        startFrame={42}
        fontSize={88}
        weight={600}
        color={brand.whiteMute}
      />
      <div style={{ height: 8 }} />
      <KineticText
        text="votre temps ?"
        startFrame={70}
        fontSize={130}
        color={brand.cyanLight}
        weight={900}
      />
    </div>
  );
};
