import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {brand} from '../config/brand';
import {WordByWord} from '../components/WordByWord';

/**
 * [4-6s] TRANSITION — onde IA
 * Une onde lumineuse (bleu LTC) balaie l'écran de bas en haut.
 * Fond qui passe de gris clair à cream. Texte "L'IA change tout. Simplement."
 */
export const Scene2Transition: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Progression de l'onde sur 60 frames (2s)
  const waveProgress = spring({
    frame,
    fps,
    config: {damping: 20, mass: 1, stiffness: 55},
    durationInFrames: 55,
  });

  // L'onde remonte de y=2100 (hors écran bas) à y=-300 (hors écran haut)
  const waveY = interpolate(waveProgress, [0, 1], [2100, -300]);

  // Fond : gris clair → cream
  const bgProgress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade-out fin de scène
  const sceneOpacity = interpolate(frame, [48, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{opacity: sceneOpacity}}>
      {/* Fond transitionnel */}
      <AbsoluteFill
        style={{
          backgroundColor: '#F5F5F7',
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: brand.colors.cream,
          opacity: bgProgress,
        }}
      />

      {/* Onde lumineuse (un gradient radial déplacé verticalement) */}
      <div
        style={{
          position: 'absolute',
          left: -200,
          top: waveY,
          width: 1480,
          height: 1000,
          background: `radial-gradient(ellipse at 50% 50%, ${brand.colors.navy}66 0%, ${brand.colors.navy}22 40%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />

      {/* Ligne d'onde nette au bord haut du halo */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: waveY + 480,
          width: 1080,
          height: 4,
          background: brand.colors.navy,
          opacity: 0.55,
          boxShadow: `0 0 40px ${brand.colors.navy}`,
        }}
      />

      {/* Particules / nœuds IA qui pulsent en staggered */}
      {[
        {x: 220, y: 520, d: 8},
        {x: 480, y: 700, d: 14},
        {x: 820, y: 560, d: 20},
        {x: 340, y: 900, d: 26},
        {x: 720, y: 960, d: 32},
        {x: 540, y: 1100, d: 38},
      ].map((p, i) => {
        const local = frame - p.d;
        const op = interpolate(local, [0, 12, 45], [0, 1, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const pulse = 1 + Math.sin((frame / fps) * 2 * Math.PI * 1.8 + i) * 0.18;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: 22,
              height: 22,
              borderRadius: '50%',
              backgroundColor: brand.colors.navy,
              opacity: op,
              transform: `scale(${pulse})`,
              boxShadow: `0 0 32px ${brand.colors.navy}`,
            }}
          />
        );
      })}

      {/* Texte central — safe zone */}
      <div
        style={{
          position: 'absolute',
          top: 780,
          left: 0,
          width: '100%',
          padding: '0 70px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <WordByWord
          text="L'IA change tout. Simplement."
          delay={14}
          stagger={5}
          size={130}
          weight="heavy"
          color={brand.colors.navy}
          align="center"
          maxWidth={920}
        />
      </div>
    </AbsoluteFill>
  );
};
