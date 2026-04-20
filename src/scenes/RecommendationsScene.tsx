import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {brand} from '../config/brand';
import {AnimatedText} from '../components/AnimatedText';
import {MockupFrame} from '../components/MockupFrame';
import {Icon} from '../components/Icon';

/**
 * [16-22s] RECOMMANDATIONS + IMPLÉMENTATION
 * Rapport qui se génère + outils connectés par des flèches animées.
 */
export const RecommendationsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = interpolate(frame, [10, durationInFrames - 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.cream,
        padding: '90px 60px 380px 60px',
        alignItems: 'center',
        gap: 28,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '14px 24px',
          borderRadius: 999,
          backgroundColor: brand.colors.navy,
        }}
      >
        <Icon name="bulb" size={32} color={brand.colors.cream} stroke={2.6} />
        <div
          style={{
            fontFamily: brand.fonts.family,
            fontWeight: brand.fonts.weights.bold,
            fontSize: 22,
            color: brand.colors.cream,
            letterSpacing: 1.8,
          }}
        >
          ÉTAPES 2 &amp; 3
        </div>
        <Icon name="gear" size={32} color={brand.colors.cream} stroke={2.6} />
      </div>

      <AnimatedText
        delay={8}
        duration={16}
        size={50}
        weight="bold"
        color={brand.colors.navy}
        align="center"
        lineHeight={1.2}
      >
        Un plan clair,
        <br />
        des outils qui se parlent.
      </AnimatedText>

      {/* Rapport */}
      <MockupFrame width={720} height={240} title="Rapport personnalisé">
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <div
            style={{
              width: '55%',
              height: 14,
              backgroundColor: brand.colors.navy,
              borderRadius: 4,
            }}
          />
          {[0.85, 0.7, 0.9, 0.6].map((w, i) => {
            const p = Math.max(
              0,
              Math.min(1, (progress - i * 0.12) * 3),
            );
            return (
              <div
                key={i}
                style={{
                  width: `${w * 100 * p}%`,
                  height: 8,
                  backgroundColor: brand.colors.neutralLight,
                  borderRadius: 4,
                  transition: 'width 0.2s ease-in-out',
                }}
              />
            );
          })}
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              gap: 10,
              opacity: progress > 0.5 ? 1 : 0,
            }}
          >
            {['Quick win', 'Priorité 1', 'Priorité 2'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  backgroundColor: brand.colors.accent,
                  color: brand.colors.cream,
                  fontFamily: brand.fonts.family,
                  fontWeight: brand.fonts.weights.bold,
                  fontSize: 14,
                  letterSpacing: 0.5,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </MockupFrame>

      {/* Outils connectés */}
      <div
        style={{
          width: 720,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '20px 0',
        }}
      >
        {/* flèches SVG */}
        <svg
          width={720}
          height={60}
          style={{position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)'}}
        >
          {[0, 1, 2].map((i) => {
            const x1 = 120 + i * 170;
            const x2 = x1 + 90;
            const dash = 100;
            const p = Math.max(0, Math.min(1, (progress - 0.3 - i * 0.15) * 3));
            return (
              <line
                key={i}
                x1={x1}
                y1={30}
                x2={x2}
                y2={30}
                stroke={brand.colors.accent}
                strokeWidth={3}
                strokeDasharray={dash}
                strokeDashoffset={dash - p * dash}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {(['mail', 'database', 'chart', 'bell'] as const).map((icon, i) => {
          const p = Math.max(
            0,
            Math.min(1, (progress - i * 0.15) * 4),
          );
          return (
            <div
              key={icon}
              style={{
                width: 90,
                height: 90,
                borderRadius: 22,
                backgroundColor: brand.colors.navy,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: p,
                transform: `scale(${0.8 + p * 0.2})`,
                boxShadow: '0 10px 24px rgba(0, 0, 0, 0.18)',
                zIndex: 1,
              }}
            >
              <Icon name={icon} size={44} color={brand.colors.cream} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
