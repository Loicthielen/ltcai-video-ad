import React from 'react';
import {brand} from '../config/brand';

type IconName =
  | 'loupe'
  | 'bulb'
  | 'gear'
  | 'growth'
  | 'mail'
  | 'doc'
  | 'bell'
  | 'database'
  | 'chat'
  | 'chart';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  stroke?: number;
};

/**
 * Icônes SVG minimalistes, lignes douces, palette LTC uniquement.
 */
export const Icon: React.FC<Props> = ({
  name,
  size = 64,
  color = brand.colors.navy,
  stroke = 2.2,
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'loupe':
      return (
        <svg {...common}>
          <circle cx="27" cy="27" r="14" />
          <path d="M38 38 L50 50" />
        </svg>
      );
    case 'bulb':
      return (
        <svg {...common}>
          <path d="M22 26a10 10 0 0 1 20 0c0 5-4 7-5 11H27c-1-4-5-6-5-11z" />
          <path d="M27 42h10" />
          <path d="M29 48h6" />
        </svg>
      );
    case 'gear':
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="7" />
          <path d="M32 10v6M32 48v6M10 32h6M48 32h6M16 16l4 4M44 44l4 4M48 16l-4 4M20 44l-4 4" />
        </svg>
      );
    case 'growth':
      return (
        <svg {...common}>
          <path d="M10 46 L24 32 L34 40 L54 18" />
          <path d="M44 18 H54 V28" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <rect x="10" y="16" width="44" height="32" rx="4" />
          <path d="M10 20 L32 36 L54 20" />
        </svg>
      );
    case 'doc':
      return (
        <svg {...common}>
          <path d="M18 8 H38 L50 20 V56 H18 Z" />
          <path d="M38 8 V20 H50" />
          <path d="M24 30 H44 M24 38 H44 M24 46 H36" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...common}>
          <path d="M16 44 C20 40 20 32 20 28 a12 12 0 0 1 24 0 c0 4 0 12 4 16 Z" />
          <path d="M28 50 a4 4 0 0 0 8 0" />
        </svg>
      );
    case 'database':
      return (
        <svg {...common}>
          <ellipse cx="32" cy="14" rx="18" ry="6" />
          <path d="M14 14 V32 a18 6 0 0 0 36 0 V14" />
          <path d="M14 32 V50 a18 6 0 0 0 36 0 V32" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...common}>
          <path d="M10 14 H46 a4 4 0 0 1 4 4 V38 a4 4 0 0 1 -4 4 H24 L14 52 V42 H10 Z" />
          <circle cx="22" cy="28" r="1.5" fill={color} />
          <circle cx="30" cy="28" r="1.5" fill={color} />
          <circle cx="38" cy="28" r="1.5" fill={color} />
        </svg>
      );
    case 'chart':
      return (
        <svg {...common}>
          <path d="M10 52 H54" />
          <rect x="14" y="34" width="8" height="14" />
          <rect x="28" y="24" width="8" height="24" />
          <rect x="42" y="14" width="8" height="34" />
        </svg>
      );
  }
};
