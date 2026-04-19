import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../config/brand';

type Props = {
  children: React.ReactNode;
  /** Délai d'apparition (en frames) relatif au début de la Sequence parente */
  delay?: number;
  /** Durée du fade-in */
  duration?: number;
  /** Taille en px */
  size?: number;
  /** Poids de la typo */
  weight?: keyof typeof brand.fonts.weights;
  color?: string;
  align?: 'left' | 'center' | 'right';
  /** Distance (px) du slide vers le haut — défaut doux */
  slideDistance?: number;
  letterSpacing?: number;
  lineHeight?: number;
  style?: React.CSSProperties;
};

export const AnimatedText: React.FC<Props> = ({
  children,
  delay = 0,
  duration = 18,
  size = brand.sizes.body,
  weight = 'medium',
  color = brand.colors.navy,
  align = 'center',
  slideDistance = 22,
  letterSpacing = 0,
  lineHeight = 1.2,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - delay;

  const opacity = interpolate(local, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const s = spring({
    frame: local,
    fps,
    config: {damping: 22, mass: 0.8, stiffness: 90},
    durationInFrames: duration + 6,
  });

  const translateY = interpolate(s, [0, 1], [slideDistance, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: brand.fonts.family,
        fontWeight: brand.fonts.weights[weight],
        fontSize: size,
        color,
        textAlign: align,
        letterSpacing,
        lineHeight,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
