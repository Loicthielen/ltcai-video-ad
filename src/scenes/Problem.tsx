import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { COLORS, FONTS } from "../config/brand";

type Props = {
  text: string;
};

/**
 * [3-7s] AMPLIFICATION — Pictos minimalistes animés doucement.
 * Boîte mail qui déborde, horloge, pile de documents.
 */
export const Problem: React.FC<Props> = ({ text }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.offWhite} 0%, ${COLORS.problemBg} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 80,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 72,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MailIcon delay={6} />
          <ClockIcon delay={18} />
          <DocsIcon delay={30} />
        </div>

        <AnimatedText
          text={text}
          mode="fadeUp"
          delay={42}
          durationInFrames={28}
          fontSize={62}
          fontWeight={FONTS.weightMedium}
          color={COLORS.deepBlue}
          lineHeight={1.25}
          letterSpacing={-0.5}
          maxWidth={820}
        />
      </div>
    </AbsoluteFill>
  );
};

// ---- Pictos SVG minimalistes ----

const useReveal = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.7, stiffness: 85 },
    durationInFrames: 30,
  });
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, translateY };
};

const IconWrap: React.FC<{
  children: React.ReactNode;
  label: string;
  delay: number;
}> = ({ children, label, delay }) => {
  const { opacity, translateY } = useReveal(delay);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          width: 160,
          height: 160,
          borderRadius: 28,
          background: COLORS.offWhiteBright,
          boxShadow: "0 10px 40px rgba(14,27,58,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
      <div
        style={{
          fontFamily: FONTS.family,
          fontSize: 22,
          color: COLORS.muted,
          fontWeight: FONTS.weightMedium,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const MailIcon: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  // Petit "débordement" : chiffre compteur qui monte
  const count = Math.min(
    999,
    Math.round(interpolate(frame - delay, [10, 60], [12, 247], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  );
  return (
    <IconWrap label="Boîte mail" delay={delay}>
      <div style={{ position: "relative" }}>
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <rect
            x="8"
            y="20"
            width="74"
            height="52"
            rx="6"
            stroke={COLORS.deepBlue}
            strokeWidth="3.5"
            fill="none"
          />
          <path
            d="M8 26 L45 52 L82 26"
            stroke={COLORS.deepBlue}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: -8,
            right: -14,
            minWidth: 42,
            height: 42,
            padding: "0 10px",
            borderRadius: 21,
            background: COLORS.warmAccentDeep,
            color: "#fff",
            fontFamily: FONTS.family,
            fontWeight: FONTS.weightBold,
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {count}
        </div>
      </div>
    </IconWrap>
  );
};

const ClockIcon: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame - delay, [0, 120], [0, 540], {
    extrapolateLeft: "clamp",
  });
  return (
    <IconWrap label="Votre temps" delay={delay}>
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <circle
          cx="50"
          cy="50"
          r="38"
          stroke={COLORS.deepBlue}
          strokeWidth="3.5"
          fill="none"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="22"
          stroke={COLORS.deepBlue}
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{
            transformOrigin: "50px 50px",
            transform: `rotate(${rotation}deg)`,
          }}
        />
        <line
          x1="50"
          y1="50"
          x2="68"
          y2="50"
          stroke={COLORS.warmAccentDeep}
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{
            transformOrigin: "50px 50px",
            transform: `rotate(${rotation * 12}deg)`,
          }}
        />
        <circle cx="50" cy="50" r="3" fill={COLORS.deepBlue} />
      </svg>
    </IconWrap>
  );
};

const DocsIcon: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const stack1 = interpolate(local, [0, 20], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stack2 = interpolate(local, [10, 30], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stack3 = interpolate(local, [20, 40], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <IconWrap label="À traiter" delay={delay}>
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <g style={{ transform: `translateY(${stack3}px)` }}>
          <rect x="22" y="22" width="56" height="14" rx="3" fill={COLORS.deepBlueSoft} opacity="0.35" />
        </g>
        <g style={{ transform: `translateY(${stack2}px)` }}>
          <rect x="22" y="42" width="56" height="14" rx="3" fill={COLORS.deepBlueSoft} opacity="0.55" />
        </g>
        <g style={{ transform: `translateY(${stack1}px)` }}>
          <rect x="22" y="62" width="56" height="14" rx="3" fill={COLORS.deepBlue} />
        </g>
      </svg>
    </IconWrap>
  );
};
