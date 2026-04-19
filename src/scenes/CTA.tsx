import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { LogoLTC } from "../components/LogoLTC";
import { BRAND_URL, COLORS, FONTS } from "../config/brand";

type Props = {
  buttonText: string;
  secondaryText: string;
  url?: string;
};

/**
 * [11-15s] CTA CLAIR — Bouton animé avec léger pulse, URL discrète.
 */
export const CTA: React.FC<Props> = ({
  buttonText,
  secondaryText,
  url = BRAND_URL,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buttonProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200, mass: 0.7, stiffness: 80 },
    durationInFrames: 30,
  });
  const buttonOpacity = interpolate(buttonProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const buttonLift = interpolate(buttonProgress, [0, 1], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse léger, continu mais subtil
  const pulse = 1 + Math.sin((frame - 40) / 12) * 0.018;

  const urlOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.offWhiteBright} 0%, ${COLORS.offWhite} 100%)`,
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
          gap: 56,
          textAlign: "center",
        }}
      >
        <LogoLTC delay={0} size={72} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            opacity: buttonOpacity,
            transform: `translateY(${buttonLift}px)`,
          }}
        >
          <div
            style={{
              transform: `scale(${pulse})`,
              padding: "32px 56px",
              borderRadius: 100,
              background: COLORS.deepBlue,
              boxShadow: `0 18px 48px rgba(14,27,58,0.22), 0 0 0 0 ${COLORS.warmAccent}`,
              fontFamily: FONTS.family,
              fontWeight: FONTS.weightSemibold,
              fontSize: 42,
              color: COLORS.offWhiteBright,
              letterSpacing: -0.5,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            {buttonText}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: COLORS.warmAccent,
                color: COLORS.deepBlue,
                fontSize: 28,
                fontWeight: FONTS.weightBold,
              }}
            >
              →
            </span>
          </div>

          <AnimatedText
            text={secondaryText}
            mode="fadeUp"
            delay={34}
            durationInFrames={24}
            fontSize={32}
            fontWeight={FONTS.weightMedium}
            color={COLORS.muted}
            letterSpacing={0}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: urlOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: 28,
            fontWeight: FONTS.weightMedium,
            color: COLORS.deepBlueSoft,
            letterSpacing: 2,
          }}
        >
          {url}
        </div>
      </div>
    </AbsoluteFill>
  );
};
