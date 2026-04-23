import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {brand} from '../config/brand';

type Props = {
  from?: number;
  to: number;
  /** Frame de début (offset local dans la Sequence) */
  delay?: number;
  /** Durée du compteur en frames */
  duration?: number;
  suffix?: string;
  prefix?: string;
  size?: number;
  weight?: keyof typeof brand.fonts.weights;
  color?: string;
  style?: React.CSSProperties;
};

export const Counter: React.FC<Props> = ({
  from = 0,
  to,
  delay = 0,
  duration = 30,
  suffix = '',
  prefix = '',
  size = 220,
  weight = 'heavy',
  color = brand.colors.navy,
  style,
}) => {
  const frame = useCurrentFrame();
  const local = frame - delay;

  const value = interpolate(local, [0, duration], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const display = Math.round(value);

  return (
    <div
      style={{
        fontFamily: brand.fonts.family,
        fontWeight: brand.fonts.weights[weight],
        fontSize: size,
        color,
        letterSpacing: -3,
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
        ...style,
      }}
    >
      {prefix}
      {display}
      {suffix}
    </div>
  );
};
