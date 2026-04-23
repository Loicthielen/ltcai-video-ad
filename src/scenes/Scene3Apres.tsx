import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {brand} from '../config/brand';
import {Counter} from '../components/Counter';
import {WordByWord} from '../components/WordByWord';

/**
 * [6-11s] APRÈS — 5 secondes (150 frames)
 * Bloc 1 (0-75f / 0-2.5s) : compteur +15h animé, texte "+15h par semaine économisées"
 * Bloc 2 (75-150f / 2.5-5s) : texte "Sans complexité. Sans jargon."
 * Fond cream, palette LTC saturée, icônes positives en staggered, courbe qui monte.
 */

type IconBadgeProps = {
  x: number;
  y: number;
  delay: number;
  children: React.ReactNode;
};

const IconBadge: React.FC<IconBadgeProps> = ({x, y, delay, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - delay;

  const s = spring({
    frame: local,
    fps,
    config: {damping: 16, mass: 0.8, stiffness: 95},
    durationInFrames: 22,
  });
  const opacity = interpolate(local, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(s, [0, 1], [0.5, 1]);
  const float =
    Math.sin((frame / fps) * 2 * Math.PI * 0.7 + delay * 0.1) * 3;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + float,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        width: 120,
        height: 120,
        borderRadius: 30,
        backgroundColor: brand.colors.navy,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 14px 38px ${brand.colors.navyDeep}40`,
      }}
    >
      {children}
    </div>
  );
};

const CheckIcon: React.FC = () => (
  <svg width={64} height={64} viewBox="0 0 24 24">
    <path
      d="M 4 13 L 10 19 L 20 6"
      fill="none"
      stroke={brand.colors.cream}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChartIcon: React.FC = () => (
  <svg width={64} height={64} viewBox="0 0 24 24">
    <path
      d="M 4 19 L 4 5 L 20 5 L 20 19 Z"
      fill="none"
      stroke={brand.colors.cream}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <path
      d="M 7 15 L 10 11 L 13 13 L 17 8"
      fill="none"
      stroke={brand.colors.cream}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SparkleIcon: React.FC = () => (
  <svg width={64} height={64} viewBox="0 0 24 24">
    <path
      d="M 12 2 L 13.5 9 L 21 10.5 L 13.5 12 L 12 20 L 10.5 12 L 3 10.5 L 10.5 9 Z"
      fill={brand.colors.cream}
    />
  </svg>
);

export const Scene3Apres: React.FC = () => {
  const frame = useCurrentFrame();

  // Bloc 1 vs Bloc 2 — transition à ~75f (2.5s)
  const bloc1Opacity = interpolate(frame, [0, 10, 70, 82], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bloc2Opacity = interpolate(frame, [78, 92], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade-out fin de scène
  const sceneOpacity = interpolate(frame, [138, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Courbe ascendante SVG (0 → 1 sur 90 frames)
  const curveProgress = interpolate(frame, [8, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pathLen = 1200;
  const dashOffset = pathLen - curveProgress * pathLen;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.cream,
        opacity: sceneOpacity,
      }}
    >
      {/* Courbe de croissance en fond (subtile) */}
      <svg
        width={1080}
        height={1920}
        viewBox="0 0 1080 1920"
        style={{position: 'absolute', inset: 0, opacity: 0.18}}
      >
        <path
          d="M 40 1520 Q 320 1420 520 1240 T 900 820 T 1060 520"
          stroke={brand.colors.navy}
          strokeWidth={8}
          fill="none"
          strokeDasharray={pathLen}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Badges d'icônes positives - staggered */}
      <IconBadge x={150} y={1250} delay={14}>
        <CheckIcon />
      </IconBadge>
      <IconBadge x={480} y={1300} delay={20}>
        <ChartIcon />
      </IconBadge>
      <IconBadge x={810} y={1250} delay={26}>
        <SparkleIcon />
      </IconBadge>

      {/* BLOC 1 — Compteur + libellé */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: bloc1Opacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '320px 70px 520px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <div
            style={{
              fontFamily: brand.fonts.family,
              fontWeight: brand.fonts.weights.heavy,
              fontSize: 220,
              color: brand.colors.navy,
              lineHeight: 1,
              letterSpacing: -6,
            }}
          >
            +
          </div>
          <Counter
            from={0}
            to={15}
            delay={6}
            duration={56}
            size={260}
            color={brand.colors.navy}
          />
          <div
            style={{
              fontFamily: brand.fonts.family,
              fontWeight: brand.fonts.weights.heavy,
              fontSize: 200,
              color: brand.colors.navy,
              lineHeight: 1,
              marginLeft: 8,
            }}
          >
            h
          </div>
        </div>

        <div style={{marginTop: 30}}>
          <WordByWord
            text="par semaine, économisées."
            delay={34}
            stagger={4}
            size={78}
            weight="semibold"
            color={brand.colors.neutral}
            align="center"
            maxWidth={900}
          />
        </div>
      </div>

      {/* BLOC 2 — "Sans complexité. Sans jargon." */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: bloc2Opacity,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '320px 70px 520px',
        }}
      >
        <WordByWord
          text="Sans complexité. Sans jargon."
          delay={82}
          stagger={5}
          size={130}
          weight="heavy"
          color={brand.colors.navy}
          align="center"
          maxWidth={940}
        />
      </div>
    </AbsoluteFill>
  );
};
