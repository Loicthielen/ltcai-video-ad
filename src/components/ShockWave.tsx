import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type Props = {
  /** Centre x (px) dans le canvas. */
  cx: number;
  /** Centre y (px). */
  cy: number;
  /** Frame de déclenchement. */
  delay?: number;
  /** Rayon final (px). */
  maxRadius?: number;
  /** Durée de l'expansion (frames). */
  duration?: number;
  color?: string;
  /** Épaisseur de l'onde. */
  strokeWidth?: number;
  /** Nombre d'ondes concentriques (chacune décalée). */
  rings?: number;
};

/**
 * Onde de choc radiale : un ou plusieurs cercles qui expandent depuis (cx, cy)
 * avec opacity qui décroît. Utilisé pour le moment "bascule".
 */
export const ShockWave: React.FC<Props> = ({
  cx,
  cy,
  delay = 0,
  maxRadius = 1400,
  duration = 40,
  color = '#2020CC',
  strokeWidth = 10,
  rings = 3,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <>
      {Array.from({length: rings}, (_, i) => {
        const ringDelay = delay + i * 6;
        const local = frame - ringDelay;
        const s = spring({
          frame: local,
          fps,
          config: {damping: 200, mass: 1, stiffness: 42},
          durationInFrames: duration,
        });
        const radius = interpolate(s, [0, 1], [0, maxRadius]);
        const opacity = interpolate(local, [0, 4, duration - 6, duration], [0, 0.9, 0.15, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: cx,
              top: cy,
              width: 0,
              height: 0,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -radius,
                top: -radius,
                width: radius * 2,
                height: radius * 2,
                borderRadius: '50%',
                border: `${strokeWidth}px solid ${color}`,
                opacity,
                boxShadow: `0 0 40px ${color}`,
              }}
            />
          </div>
        );
      })}
    </>
  );
};
