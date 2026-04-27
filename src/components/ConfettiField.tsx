import React from 'react';
import {interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';

type Props = {
  count?: number;
  seed?: string;
  width?: number;
  height?: number;
  /** Palette (tourne cycliquement). */
  colors?: string[];
  /** Frame de démarrage du jet. */
  delay?: number;
  /** Durée avant que tout soit retombé. */
  duration?: number;
  /** Intensité de la "gravité" (px/s²). */
  gravity?: number;
};

/**
 * Confettis / particules qui tombent depuis le haut avec rotation,
 * trajectoire parabolique et opacity qui s'éteint.
 */
export const ConfettiField: React.FC<Props> = ({
  count = 50,
  seed = 'confetti',
  width = 1080,
  height = 1920,
  colors = ['#2020CC', '#1515AA', '#FFFFFF'],
  delay = 0,
  duration = 120,
  gravity = 220,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = Math.max(0, (frame - delay) / fps);

  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden'}}>
      {Array.from({length: count}, (_, i) => {
        const rx = random(`${seed}-x-${i}`);
        const rd = random(`${seed}-d-${i}`); // delay individuel
        const rv = random(`${seed}-v-${i}`); // velocity
        const rs = random(`${seed}-s-${i}`); // size
        const rc = random(`${seed}-c-${i}`); // color
        const rr = random(`${seed}-r-${i}`); // rotation speed

        const individualDelay = rd * 0.6; // 0 à 0.6 s
        const tt = t - individualDelay;
        if (tt < 0) return null;

        const startX = rx * width;
        const startY = -80 + rv * -80;
        const vx = (rx - 0.5) * 80;
        const vy = 80 + rv * 160;
        const x = startX + vx * tt;
        const y = startY + vy * tt + 0.5 * gravity * tt * tt;
        const size = 8 + rs * 18;
        const color = colors[Math.floor(rc * colors.length)];
        const rot = tt * 360 * (rr * 1.6 - 0.8);
        const opacity = interpolate(
          frame - delay,
          [0, 8, duration - 20, duration],
          [0, 1, 1, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );

        if (y > height + 40) return null;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size * 0.4,
              backgroundColor: color,
              opacity,
              transform: `rotate(${rot}deg)`,
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
};
