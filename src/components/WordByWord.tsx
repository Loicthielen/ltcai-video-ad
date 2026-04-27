import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../config/brand';

type Props = {
  text: string;
  /** Frame de début (offset local dans la Sequence) */
  delay?: number;
  /** Décalage entre chaque mot (frames) */
  stagger?: number;
  size?: number;
  weight?: keyof typeof brand.fonts.weights;
  color?: string;
  align?: 'left' | 'center' | 'right';
  lineHeight?: number;
  letterSpacing?: number;
  maxWidth?: number;
  style?: React.CSSProperties;
};

/**
 * Révélation mot-par-mot avec spring easing.
 * Chaque mot fade + slide-up de 18px.
 */
export const WordByWord: React.FC<Props> = ({
  text,
  delay = 0,
  stagger = 4,
  size = 130,
  weight = 'heavy',
  color = brand.colors.navy,
  align = 'center',
  lineHeight = 1.12,
  letterSpacing = -1,
  maxWidth,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');

  return (
    <div
      style={{
        fontFamily: brand.fonts.family,
        fontWeight: brand.fonts.weights[weight],
        fontSize: size,
        color,
        textAlign: align,
        lineHeight,
        letterSpacing,
        maxWidth,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:
          align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        gap: '0.28em',
        ...style,
      }}
    >
      {words.map((word, i) => {
        const local = frame - delay - i * stagger;
        const s = spring({
          frame: local,
          fps,
          config: {damping: 18, mass: 0.7, stiffness: 95},
          durationInFrames: 20,
        });
        const opacity = interpolate(local, [0, 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const translateY = interpolate(s, [0, 1], [22, 0]);
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: 'inline-block',
              opacity,
              transform: `translateY(${translateY}px)`,
              whiteSpace: 'pre',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
