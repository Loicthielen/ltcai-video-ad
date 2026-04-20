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
 * Logo LTC AI — monogramme officiel (deux traits croisés + point),
 * couleur stricte LTC. Inline SVG pour pouvoir réagir à `variant`
 * via `currentColor`. Pour remplacer par l'asset final, éditer les
 * chemins ci-dessous ou pointer sur `public/logo-ltc-ai.svg`.
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

  const color = variant === 'onDark' ? brand.colors.cream : brand.colors.navy;

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
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-label="LTC AI"
      >
        <rect
          x="20"
          y="18"
          width="20"
          height="72"
          rx="10"
          transform="rotate(-10 30 54)"
        />
        <rect
          x="56"
          y="28"
          width="18"
          height="62"
          rx="9"
          transform="rotate(14 65 59)"
        />
        <circle cx="80" cy="14" r="8" />
      </svg>
    </div>
  );
};
