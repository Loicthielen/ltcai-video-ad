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
 * [10-16s] ZOOM ÉTAPE 1 : AUDIT
 * Mockup checklist qui se remplit + mini-graphique.
 */
export const AuditScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = interpolate(frame, [10, durationInFrames - 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.cream,
        padding: '90px 60px 380px 60px',
        alignItems: 'center',
        gap: 32,
      }}
    >
      {/* Badge étape */}
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
        <Icon name="loupe" size={32} color={brand.colors.cream} stroke={2.6} />
        <div
          style={{
            fontFamily: brand.fonts.family,
            fontWeight: brand.fonts.weights.bold,
            fontSize: 26,
            color: brand.colors.cream,
            letterSpacing: 2,
          }}
        >
          ÉTAPE 1 · AUDIT
        </div>
      </div>

      <AnimatedText
        delay={8}
        duration={16}
        size={52}
        weight="bold"
        color={brand.colors.navy}
        align="center"
        lineHeight={1.2}
      >
        On cartographie
        <br />
        votre organisation.
      </AnimatedText>

      <MockupFrame width={840} height={420} title="Audit LTC AI">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap: 20,
            height: '100%',
          }}
        >
          {/* Checklist */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            {[
              'Cartographier les processus',
              'Identifier les répétitions',
              'Évaluer les données',
              'Prioriser les quick-wins',
              'Chiffrer le ROI',
            ].map((label, i) => {
              const t = (i + 1) / 5;
              const done = progress > t - 0.1;
              return (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 14px',
                    borderRadius: 10,
                    backgroundColor: done
                      ? brand.colors.accentSoft
                      : brand.colors.creamSoft,
                    border: `1.5px solid ${
                      done ? brand.colors.accent : brand.colors.neutralLight
                    }`,
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 7,
                      backgroundColor: done
                        ? brand.colors.navy
                        : 'transparent',
                      border: `2px solid ${brand.colors.navy}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {done ? (
                      <svg width={14} height={14} viewBox="0 0 14 14">
                        <path
                          d="M2 7 L6 11 L12 3"
                          stroke={brand.colors.cream}
                          strokeWidth={2.5}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </div>
                  <div
                    style={{
                      fontFamily: brand.fonts.family,
                      fontWeight: brand.fonts.weights.semibold,
                      fontSize: 20,
                      color: done ? brand.colors.cream : brand.colors.navy,
                    }}
                  >
                    {label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mini-graphique */}
          <div
            style={{
              backgroundColor: brand.colors.navy,
              borderRadius: 12,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: brand.fonts.family,
                color: brand.colors.cream,
                opacity: 0.7,
                fontSize: 14,
                letterSpacing: 1.5,
              }}
            >
              GAIN ESTIMÉ
            </div>
            <div
              style={{
                fontFamily: brand.fonts.family,
                fontWeight: brand.fonts.weights.heavy,
                fontSize: 44,
                color: brand.colors.cream,
              }}
            >
              {Math.round(progress * 14)}h / sem
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'flex-end',
                gap: 6,
                paddingTop: 10,
              }}
            >
              {[0.3, 0.5, 0.65, 0.78, 0.88, 1].map((h, i) => {
                const p = Math.max(
                  0,
                  Math.min(1, (progress - (i + 1) / 8) * 3),
                );
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h * 100 * p}%`,
                      backgroundColor:
                        i === 5
                          ? brand.colors.cream
                          : 'rgba(255, 255, 255, 0.35)',
                      borderRadius: 4,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </MockupFrame>
    </AbsoluteFill>
  );
};
