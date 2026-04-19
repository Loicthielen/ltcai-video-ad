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
 * [33-39s] ÉTAPE 4 — SUIVI + PROMESSE
 * Courbe ascendante douce + logo LTC AI centré + tagline.
 */
export const FollowUpScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = interpolate(frame, [0, durationInFrames - 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.navy,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 80px 380px 80px',
        gap: 40,
        overflow: 'hidden',
      }}
    >
      {/* Courbe ascendante en fond */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1080 900"
        preserveAspectRatio="none"
        style={{position: 'absolute', top: 0, left: 0, opacity: 0.35}}
      >
        <path
          d="M 0 700 Q 300 600 500 480 T 900 200 T 1200 50"
          stroke={brand.colors.accent}
          strokeWidth={6}
          fill="none"
          strokeDasharray={1600}
          strokeDashoffset={1600 - progress * 1600}
          strokeLinecap="round"
        />
        {/* points de contrôle */}
        {[
          [200, 640],
          [440, 510],
          [700, 320],
          [900, 200],
        ].map(([x, y], i) => {
          const t = (i + 1) / 5;
          const show = progress > t;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={10}
              fill={brand.colors.accent}
              opacity={show ? 1 : 0}
            />
          );
        })}
      </svg>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
          zIndex: 1,
        }}
      >
        <BrandLogo size={120} variant="onDark" delay={4} />

        <AnimatedText
          delay={24}
          duration={20}
          size={44}
          weight="medium"
          color={brand.colors.cream}
          align="center"
          lineHeight={1.3}
        >
          Une équipe qui reste
          <br />à vos côtés.
        </AnimatedText>

        <AnimatedText
          delay={116}
          duration={20}
          size={62}
          weight="heavy"
          color={brand.colors.accent}
          align="center"
          letterSpacing={-0.5}
        >
          {brand.tagline}
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};
