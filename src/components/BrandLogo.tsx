import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../config/brand';

type Props = {
  /** Délai avant apparition (frames) */
  delay?: number;
  /** Hauteur du logo en pixels */
  size?: number;
  variant?: 'onLight' | 'onDark';
  animated?: boolean;
  style?: React.CSSProperties;
};

/**
 * Logo LTC AI — monogramme officiel (hook + diagonale + point),
 * inline SVG pour que `currentColor` réagisse au `variant`.
 * Copie éditable : public/logo-ltc-ai.svg.
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

  const color = variant === 'onDark' ? brand.colors.cream : brand.colors.navyDeep;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="currentColor"
        aria-label="LTC AI"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth={62}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 100 355 L 100 155 Q 100 90 165 90 Q 230 90 230 155 L 230 290" />
          <path d="M 255 130 L 345 355" />
        </g>
        <circle cx="328" cy="72" r="36" />
      </svg>
    </div>
  );
};
