import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../config/brand';

type Props = {
  text: string;
  /** Frame locale d'apparition du premier mot. */
  delay?: number;
  /** Décalage entre mots (frames). */
  wordStagger?: number;
  /** Décalage entre lettres dans un mot (frames). */
  letterStagger?: number;
  size?: number;
  weight?: keyof typeof brand.fonts.weights;
  color?: string;
  align?: 'left' | 'center' | 'right';
  lineHeight?: number;
  letterSpacing?: number;
  maxWidth?: number;
  /** Amplitude du slide-up initial (px). */
  slideDistance?: number;
  /** Scale de départ (overshoot défini par le spring). */
  startScale?: number;
  /** Rotation de départ (deg). */
  startRotation?: number;
  /** Emphasis sur le dernier mot (scale 1.2 puis retour). */
  emphasizeLast?: boolean;
  style?: React.CSSProperties;
};

/**
 * Kinetic typography : reveal lettre-par-lettre dans chaque mot,
 * avec stagger entre mots, spring overshoot, slide-up + optional rotation.
 * Le dernier mot peut être mis en emphasis (pulse de scale).
 */
export const KineticText: React.FC<Props> = ({
  text,
  delay = 0,
  wordStagger = 8,
  letterStagger = 1.5,
  size = 130,
  weight = 'heavy',
  color = brand.colors.navy,
  align = 'center',
  lineHeight = 1.1,
  letterSpacing = -1,
  maxWidth,
  slideDistance = 30,
  startScale = 0.75,
  startRotation = 0,
  emphasizeLast = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');

  return (
    <div
      style={{
        fontFamily: brand.fonts.family,
        fontWeight: brand.fonts.weights[weight],
        fontSize: size,
        color,
        textAlign: align,
        lineHeight,
        letterSpacing,
        maxWidth,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:
          align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        columnGap: '0.28em',
        rowGap: '0.08em',
        ...style,
      }}
    >
      {words.map((word, wi) => {
        const isLast = wi === words.length - 1;
        const wordBase = delay + wi * wordStagger;
        return (
          <span
            key={`${word}-${wi}`}
            style={{display: 'inline-flex', whiteSpace: 'pre'}}
          >
            {[...word].map((ch, li) => {
              const local = frame - (wordBase + li * letterStagger);
              const s = spring({
                frame: local,
                fps,
                config: {damping: 11, mass: 0.7, stiffness: 130},
                durationInFrames: 22,
              });
              const opacity = interpolate(local, [0, 6], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              const translateY = interpolate(s, [0, 1], [slideDistance, 0]);
              const scale = interpolate(s, [0, 1], [startScale, 1]);
              const rot = interpolate(s, [0, 1], [startRotation, 0]);

              // Pulse d'emphasis sur le dernier mot : scale 1→1.2→1 après son apparition
              let emphasisScale = 1;
              if (emphasizeLast && isLast) {
                const emphasisLocal = frame - (wordBase + word.length * letterStagger + 6);
                const e = interpolate(
                  emphasisLocal,
                  [0, 6, 14, 22],
                  [1, 1.18, 1.18, 1],
                  {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
                );
                emphasisScale = e;
              }

              return (
                <span
                  key={`${ch}-${li}`}
                  style={{
                    display: 'inline-block',
                    opacity,
                    transform: `translateY(${translateY}px) scale(${
                      scale * emphasisScale
                    }) rotate(${rot}deg)`,
                    transformOrigin: 'center bottom',
                    willChange: 'transform, opacity',
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};
