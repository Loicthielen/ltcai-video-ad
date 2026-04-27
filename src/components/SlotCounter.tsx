import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {brand} from '../config/brand';

type Props = {
  /** Valeur finale. */
  to: number;
  /** Valeur initiale (pour l'effet visuel, ex. 0). */
  from?: number;
  /** Frame d'apparition. */
  delay?: number;
  /** Durée de l'animation (frames). */
  duration?: number;
  /** Nombre de chiffres (padding). */
  digits?: number;
  size?: number;
  color?: string;
  weight?: keyof typeof brand.fonts.weights;
  style?: React.CSSProperties;
};

/**
 * Compteur "slot-machine" : chaque position affiche une colonne de chiffres
 * qui défile verticalement. Pas un simple tween numérique — on voit les chiffres
 * rouler.
 */
export const SlotCounter: React.FC<Props> = ({
  to,
  from = 0,
  delay = 0,
  duration = 60,
  digits = 2,
  size = 240,
  color = brand.colors.navy,
  weight = 'heavy',
  style,
}) => {
  const frame = useCurrentFrame();
  const local = frame - delay;

  const value = interpolate(local, [0, duration], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Unités : défilement continu (fractionnel). Positions supérieures : on ne roule
  // que lorsque le chiffre au-dessous passe de 9 à 0 (roulement partiel).
  const positions: number[] = [];
  for (let i = digits - 1; i >= 0; i--) {
    const divisor = Math.pow(10, i);
    if (i === 0) {
      positions.push((value / divisor) % 10);
    } else {
      const base = Math.floor(value / divisor) % 10;
      const below = (value / (divisor / 10)) % 10;
      // Fraction de roulement sur cette position uniquement quand l'ordre
      // inférieur franchit 9→0 (entre 9.0 et 10.0).
      const frac = below >= 9 ? below - 9 : 0;
      positions.push(base + frac);
    }
  }

  const digitHeight = size * 0.95; // hauteur visible d'un chiffre
  const digitWidth = size * 0.58;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        gap: size * 0.02,
        height: digitHeight,
        overflow: 'hidden',
        ...style,
      }}
    >
      {positions.map((pos, idx) => {
        // fractional offset, clamped to interpolate the digit wheel
        const translate = -pos * digitHeight;
        return (
          <div
            key={idx}
            style={{
              width: digitWidth,
              height: digitHeight,
              overflow: 'hidden',
              position: 'relative',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${translate}px)`,
                willChange: 'transform',
                fontFamily: brand.fonts.family,
                fontWeight: brand.fonts.weights[weight],
                fontSize: size,
                color,
                lineHeight: `${digitHeight}px`,
                textAlign: 'center',
                letterSpacing: -4,
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <div
                  key={n}
                  style={{
                    height: digitHeight,
                    lineHeight: `${digitHeight}px`,
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
