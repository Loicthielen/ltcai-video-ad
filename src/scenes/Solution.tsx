import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { LogoLTC } from "../components/LogoLTC";
import { COLORS, FONTS, TAGLINE } from "../config/brand";

type Props = {
  mainText: string;
  subText: string;
};

/**
 * [7-11s] SOLUTION — Transition apaisante vers ambiance aérée.
 * Logo LTC AI apparaît, puis messages rassurants.
 */
export const Solution: React.FC<Props> = ({ mainText, subText }) => {
  const frame = useCurrentFrame();

  // Transition douce : le fond s'éclaircit sur les 20 premières frames
  const ease = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 100% at 50% 35%, ${COLORS.offWhiteBright} 0%, ${COLORS.solutionBg} 70%, ${COLORS.offWhite} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        opacity: 0.2 + ease * 0.8,
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
        <LogoLTC delay={4} size={88} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <AnimatedText
            text={mainText}
            mode="fadeUp"
            delay={28}
            durationInFrames={32}
            fontSize={68}
            fontWeight={FONTS.weightSemibold}
            color={COLORS.deepBlue}
            lineHeight={1.2}
            letterSpacing={-1}
            maxWidth={880}
          />

          <AnimatedText
            text={subText}
            mode="fadeUp"
            delay={58}
            durationInFrames={26}
            fontSize={36}
            fontWeight={FONTS.weightRegular}
            color={COLORS.muted}
            lineHeight={1.4}
            letterSpacing={-0.2}
            maxWidth={700}
          />
        </div>

        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: 26,
            fontWeight: FONTS.weightMedium,
            color: COLORS.warmAccentDeep,
            letterSpacing: 1,
            opacity: taglineOpacity,
            fontStyle: "italic",
          }}
        >
          {TAGLINE}
        </div>
      </div>
    </AbsoluteFill>
  );
};
