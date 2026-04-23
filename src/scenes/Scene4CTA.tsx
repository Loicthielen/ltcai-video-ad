import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {brand} from '../config/brand';
import {Logo} from '../Logo';
import {WordByWord} from '../components/WordByWord';

/**
 * [11-15s] CTA — 4 secondes (120 frames).
 * Disposition verticale claire dans la safe zone (y 250 → 1470) :
 *   - Logo : y ≈ 300, centré, 260px
 *   - "Diagnostic gratuit" : y ≈ 720
 *   - "30 minutes" : y ≈ 920
 *   - Bouton "Réserver →" : y ≈ 1140
 *   - URL ltcai.be : y ≈ 1370
 */
export const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const pulse = 1 + Math.sin((frame / fps) * 2 * Math.PI * 0.9) * 0.035;

  const buttonOpacity = interpolate(frame, [46, 64], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const urlOpacity = interpolate(frame, [62, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${brand.colors.cream} 0%, ${brand.colors.cream} 55%, #E8E8F4 100%)`,
      }}
    >
      {/* Logo LTC AI — centré en haut de safe zone */}
      <div
        style={{
          position: 'absolute',
          top: 300,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Logo size={260} animate delay={0} />
      </div>

      {/* Ligne principale : "Diagnostic gratuit" (2 lignes maîtrisées) */}
      <div
        style={{
          position: 'absolute',
          top: 680,
          left: 0,
          width: '100%',
          padding: '0 70px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <WordByWord
          text="Diagnostic gratuit"
          delay={14}
          stagger={6}
          size={118}
          weight="heavy"
          color={brand.colors.navy}
          align="center"
          maxWidth={700}
        />
      </div>

      {/* Sous-ligne : "30 minutes" */}
      <div
        style={{
          position: 'absolute',
          top: 1000,
          left: 0,
          width: '100%',
          padding: '0 70px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <WordByWord
          text="30 minutes"
          delay={32}
          stagger={5}
          size={78}
          weight="semibold"
          color={brand.colors.neutral}
          align="center"
          maxWidth={940}
        />
      </div>

      {/* Bouton "Réserver →" */}
      <div
        style={{
          position: 'absolute',
          top: 1180,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            opacity: buttonOpacity,
            transform: `scale(${pulse})`,
            padding: '28px 70px',
            backgroundColor: brand.colors.navyDeep,
            borderRadius: 999,
            fontFamily: brand.fonts.family,
            fontWeight: brand.fonts.weights.heavy,
            fontSize: 54,
            color: brand.colors.cream,
            letterSpacing: 0.3,
            boxShadow: `0 22px 46px ${brand.colors.navyDeep}60`,
          }}
        >
          Réserver →
        </div>
      </div>

      {/* URL ltcai.be */}
      <div
        style={{
          position: 'absolute',
          top: 1370,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          opacity: urlOpacity,
        }}
      >
        <div
          style={{
            fontFamily: brand.fonts.family,
            fontWeight: brand.fonts.weights.bold,
            fontSize: 58,
            color: brand.colors.navy,
            letterSpacing: 1.5,
          }}
        >
          {brand.website}
        </div>
      </div>
    </AbsoluteFill>
  );
};
