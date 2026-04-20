import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {brand} from '../config/brand';
import {AnimatedText} from '../components/AnimatedText';
import {BrandLogo} from '../components/BrandLogo';

/**
 * [39-45s] CTA FINAL
 * Fond cream. Bouton pulse accent + URL + mention secondaire.
 */
export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Pulse doux sur le bouton (période ~1.2s)
  const pulse = 1 + Math.sin((frame / fps) * 2 * Math.PI * 0.85) * 0.025;

  const buttonOpacity = interpolate(frame, [14, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.cream,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        gap: 40,
      }}
    >
      <BrandLogo size={84} delay={0} />

      <AnimatedText
        delay={6}
        duration={18}
        size={60}
        weight="heavy"
        color={brand.colors.navy}
        align="center"
        lineHeight={1.15}
      >
        Réservez votre
        <br />
        audit gratuit
      </AnimatedText>

      {/* Bouton CTA */}
      <div
        style={{
          opacity: buttonOpacity,
          transform: `scale(${pulse})`,
          padding: '28px 60px',
          backgroundColor: brand.colors.accent,
          borderRadius: 999,
          boxShadow: '0 18px 40px rgba(21, 21, 170, 0.45)',
          fontFamily: brand.fonts.family,
          fontWeight: brand.fonts.weights.heavy,
          fontSize: 42,
          color: brand.colors.cream,
          letterSpacing: 0.3,
        }}
      >
        Réserver mon audit →
      </div>

      <AnimatedText
        delay={36}
        duration={16}
        size={32}
        weight="medium"
        color={brand.colors.neutralDark}
        align="center"
      >
        30 minutes. Sans engagement.
      </AnimatedText>

      <AnimatedText
        delay={54}
        duration={16}
        size={44}
        weight="bold"
        color={brand.colors.navy}
        align="center"
        letterSpacing={1}
      >
        {brand.website}
      </AnimatedText>
    </AbsoluteFill>
  );
};
