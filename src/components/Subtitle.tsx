import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {brand} from '../config/brand';
import {getActiveSubtitle, Language} from '../config/subtitles';

type Props = {
  language?: Language;
  /** Frame absolue de la timeline (par défaut useCurrentFrame()) */
  frameOverride?: number;
  /** Thème d'affichage : sur fond clair (navy bloc) ou fond navy (cream bloc) */
  variant?: 'auto' | 'onLight' | 'onDark';
};

/**
 * Sous-titres permanents en bas d'écran (~15% du bas), centrés, lisibles mobile.
 * Animation : fade-in + léger slide up à l'entrée, fade-out à la sortie.
 */
export const Subtitle: React.FC<Props> = ({
  language = 'fr',
  frameOverride,
  variant = 'auto',
}) => {
  const current = useCurrentFrame();
  const frame = frameOverride ?? current;
  const active = getActiveSubtitle(frame, language);

  if (!active) return null;

  // Animation : fade-in + slide up (0.3s = 9 frames)
  const enterDur = 9;
  const exitDur = 9;
  const local = frame - active.startFrame;
  const remaining = active.endFrame - frame;

  const opacityIn = interpolate(local, [0, enterDur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacityOut = interpolate(remaining, [0, exitDur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(opacityIn, opacityOut);

  const translateY = interpolate(local, [0, enterDur], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Auto-détection selon la scène active
  const darkScenes = new Set(['followup']);
  const resolvedVariant =
    variant === 'auto'
      ? darkScenes.has(active.scene)
        ? 'onDark'
        : 'onLight'
      : variant;
  const isOnDark = resolvedVariant === 'onDark';
  const blockBg = isOnDark
    ? 'rgba(255, 255, 255, 0.96)' // blanc translucide sur fond bleu
    : 'rgba(32, 32, 204, 0.94)'; // bleu principal translucide sur blanc
  const textColor = isOnDark ? brand.colors.navy : brand.colors.cream;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '15%',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          maxWidth: '86%',
          backgroundColor: blockBg,
          color: textColor,
          padding: '22px 36px',
          borderRadius: 18,
          fontFamily: brand.fonts.family,
          fontWeight: brand.fonts.weights.semibold,
          fontSize: brand.sizes.subtitle,
          lineHeight: 1.25,
          textAlign: 'center',
          letterSpacing: 0.2,
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.22)',
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};
