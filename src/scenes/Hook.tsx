import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { COLORS, FONTS } from "../config/brand";

type Props = {
  text: string;
};

/**
 * [0-3s] HOOK — Problème nommé
 * Fond blanc cassé doux. Texte qui apparaît mot par mot, posément.
 */
export const Hook: React.FC<Props> = ({ text }) => {
  const frame = useCurrentFrame();

  // Léger dégradé vivant qui respire
  const breathe = interpolate(frame, [0, 90], [0, 1], {
    extrapolateRight: "clamp",
  });
  const gradientShift = interpolate(breathe, [0, 1], [0, 8]);

  const labelOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 100% at 50% ${40 + gradientShift}%, ${COLORS.offWhiteBright} 0%, ${COLORS.offWhite} 65%, ${COLORS.problemBg} 100%)`,
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
          gap: 40,
          textAlign: "center",
        }}
      >
        {/* Petit label discret pour situer le sujet */}
        <div
          style={{
            fontFamily: FONTS.family,
            fontSize: 28,
            fontWeight: FONTS.weightMedium,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: COLORS.muted,
            opacity: labelOpacity,
          }}
        >
          Dirigeant de PME
        </div>

        <AnimatedText
          text={text}
          mode="words"
          delay={10}
          fontSize={78}
          fontWeight={FONTS.weightSemibold}
          color={COLORS.deepBlue}
          lineHeight={1.18}
          letterSpacing={-1}
          maxWidth={900}
        />
      </div>
    </AbsoluteFill>
  );
};
