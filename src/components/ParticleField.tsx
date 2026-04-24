import React from 'react';
import {random, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';

type Props = {
  count?: number;
  /** Seed pour la génération (reproductible). */
  seed?: string;
  /** Largeur du canvas virtuel. */
  width?: number;
  height?: number;
  color?: string;
  /** Taille min/max des particules (px). */
  minSize?: number;
  maxSize?: number;
  /** Vitesse verticale (px/s). Positive = vers le bas. */
  driftY?: number;
  /** Vitesse horizontale (px/s). */
  driftX?: number;
  /** Amplitude du flottement sinusoïdal (px). */
  wobble?: number;
  /** Opacité max. */
  maxOpacity?: number;
  /** Glow (box-shadow blur, 0 = off). */
  glow?: number;
  /** Frame d'apparition. */
  delay?: number;
  /** Durée du fade-in (frames). */
  fadeIn?: number;
};

/**
 * Champ de particules flottantes, seedé par index.
 * Chaque particule a une position, taille, vitesse et phase propres.
 */
export const ParticleField: React.FC<Props> = ({
  count = 60,
  seed = 'ltc',
  width = 1080,
  height = 1920,
  color = '#2020CC',
  minSize = 3,
  maxSize = 10,
  driftY = -40,
  driftX = 0,
  wobble = 18,
  maxOpacity = 0.9,
  glow = 8,
  delay = 0,
  fadeIn = 20,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = (frame - delay) / fps;

  const globalOpacity = interpolate(frame - delay, [0, fadeIn], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: globalOpacity,
      }}
    >
      {Array.from({length: count}, (_, i) => {
        const r1 = random(`${seed}-x-${i}`);
        const r2 = random(`${seed}-y-${i}`);
        const r3 = random(`${seed}-s-${i}`);
        const r4 = random(`${seed}-p-${i}`);
        const r5 = random(`${seed}-o-${i}`);
        const r6 = random(`${seed}-wx-${i}`);
        const r7 = random(`${seed}-wf-${i}`);

        const startX = r1 * width;
        const startY = r2 * height;
        const size = minSize + r3 * (maxSize - minSize);
        const phase = r4 * Math.PI * 2;
        const opacity = (0.35 + r5 * 0.65) * maxOpacity;
        const wobbleF = 0.3 + r7 * 0.7; // fréquence différente par particule

        // drift linéaire + flottement sinusoïdal
        let x = startX + driftX * t + Math.cos(t * 2 * Math.PI * wobbleF + phase) * wobble;
        let y = startY + driftY * t + Math.sin(t * 2 * Math.PI * wobbleF + phase) * wobble * 0.6;

        // wrap (modulo) pour reste dans le canvas visible
        x = ((x % (width + 100)) + (width + 100)) % (width + 100) - 50;
        y = ((y % (height + 100)) + (height + 100)) % (height + 100) - 50;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: color,
              opacity,
              boxShadow: glow > 0 ? `0 0 ${glow}px ${color}` : undefined,
              transform: `translateX(${r6 * 2 - 1}px)`,
              willChange: 'transform',
            }}
          />
        );
      })}
    </div>
  );
};
