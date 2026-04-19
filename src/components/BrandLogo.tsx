import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../config/brand';

type Props = {
  /** Délai avant apparition (frames) */
  delay?: number;
  size?: number;
  variant?: 'onLight' | 'onDark';
  animated?: boolean;
  style?: React.CSSProperties;
};

/**
 * Logo LTC AI — wordmark minimaliste, aux couleurs strictement LTC.
 * Bloc "LTC" gras + petite marque "AI" en accent chaleureux.
 */
export const BrandLogo: React.FC<Props> = ({
  delay = 0,
  size = 72,
  variant = 'onLight',
  animated = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - delay;

  const s = animated
    ? spring({
        frame: local,
        fps,
        config: {damping: 20, mass: 0.8, stiffness: 80},
      })
    : 1;

  const opacity = animated
    ? interpolate(local, [0, 14], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  const scale = animated ? interpolate(s, [0, 1], [0.92, 1]) : 1;

  const textColor = variant === 'onDark' ? brand.colors.cream : brand.colors.navy;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: size * 0.18,
        fontFamily: brand.fonts.family,
        fontWeight: brand.fonts.weights.heavy,
        fontSize: size,
        letterSpacing: -1,
        color: textColor,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        ...style,
      }}
    >
      <span>LTC</span>
      <span
        style={{
          color: brand.colors.accent,
          fontSize: size * 0.6,
          fontWeight: brand.fonts.weights.bold,
          letterSpacing: 0,
          padding: `${size * 0.06}px ${size * 0.18}px`,
          borderRadius: size * 0.18,
          backgroundColor:
            variant === 'onDark'
              ? 'rgba(232, 169, 78, 0.14)'
              : 'rgba(232, 169, 78, 0.16)',
          lineHeight: 1,
        }}
      >
        AI
      </span>
    </div>
  );
};
