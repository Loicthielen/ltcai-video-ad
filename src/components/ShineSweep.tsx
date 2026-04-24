import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

type Props = {
  /** Frame de déclenchement. */
  delay?: number;
  /** Durée du sweep (frames). */
  duration?: number;
  /** Couleur du reflet. */
  color?: string;
  /** Épaisseur du reflet (% de la largeur). */
  thickness?: number;
  /** Angle du sweep (deg). */
  angle?: number;
  /** Border-radius à suivre (pour s'adapter au bouton). */
  borderRadius?: number | string;
};

/**
 * Reflet "shine" qui traverse un élément de gauche à droite.
 * À placer en position absolue au-dessus du bouton, en mix-blend-mode screen.
 */
export const ShineSweep: React.FC<Props> = ({
  delay = 0,
  duration = 28,
  color = 'rgba(255,255,255,0.75)',
  thickness = 18,
  angle = 18,
  borderRadius = 999,
}) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const progress = interpolate(local, [0, duration], [-30, 130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: `${progress}%`,
          width: `${thickness}%`,
          height: '200%',
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          transform: `rotate(${angle}deg)`,
          mixBlendMode: 'screen',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
};
