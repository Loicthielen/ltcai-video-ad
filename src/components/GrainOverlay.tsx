import React from 'react';
import {useCurrentFrame} from 'remotion';

type Props = {
  opacity?: number;
};

/**
 * Texture de grain via SVG feTurbulence. L'animation de baseFrequency
 * donne un grain qui "bouge" chaque frame (anti-static feel).
 */
export const GrainOverlay: React.FC<Props> = ({opacity = 0.055}) => {
  const frame = useCurrentFrame();
  // Variation subtile du seed pour animer le grain
  const seed = (frame % 60) + 1;

  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        mixBlendMode: 'overlay',
      }}
    >
      <filter id={`grain-${frame}`}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves={2}
          seed={seed}
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#grain-${frame})`} />
    </svg>
  );
};
