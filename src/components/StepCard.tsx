import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../config/brand';
import {Icon} from './Icon';

type StepIcon = 'loupe' | 'bulb' | 'gear' | 'growth';

type Props = {
  index: number;
  icon: StepIcon;
  title: string;
  description: string;
  delay?: number;
  /** Si vrai, met en surbrillance la carte (accent) */
  highlight?: boolean;
};

/**
 * Carte d'étape du processus LTC (horizontale, compacte).
 */
export const StepCard: React.FC<Props> = ({
  index,
  icon,
  title,
  description,
  delay = 0,
  highlight = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - delay;

  const s = spring({
    frame: local,
    fps,
    config: {damping: 22, mass: 0.8, stiffness: 90},
  });

  const opacity = interpolate(local, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateX = interpolate(s, [0, 1], [-40, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '20px 28px',
        backgroundColor: brand.colors.creamSoft,
        border: `2px solid ${
          highlight ? brand.colors.accent : brand.colors.neutralLight
        }`,
        borderRadius: 18,
        boxShadow: highlight
          ? '0 10px 30px rgba(21, 21, 170, 0.28)'
          : '0 6px 18px rgba(0, 0, 0, 0.10)',
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 14,
          backgroundColor: highlight
            ? brand.colors.accent
            : brand.colors.navy,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon
          name={icon}
          size={44}
          color={brand.colors.cream}
          stroke={2.4}
        />
      </div>

      <div style={{flex: 1}}>
        <div
          style={{
            fontFamily: brand.fonts.family,
            fontSize: 22,
            fontWeight: brand.fonts.weights.bold,
            color: brand.colors.accent,
            letterSpacing: 1.5,
          }}
        >
          ÉTAPE {index}
        </div>
        <div
          style={{
            fontFamily: brand.fonts.family,
            fontSize: 34,
            fontWeight: brand.fonts.weights.bold,
            color: brand.colors.navy,
            marginTop: 2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: brand.fonts.family,
            fontSize: 24,
            fontWeight: brand.fonts.weights.regular,
            color: brand.colors.neutralDark,
            marginTop: 4,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};
