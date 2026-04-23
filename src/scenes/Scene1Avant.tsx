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
 * [0-4s] AVANT — chaos silencieux
 * Fond neutre légèrement désaturé.
 * Texte en haut de la safe zone, silhouette dirigeant au centre,
 * icônes du chaos (horloges, mails, dossiers, cloches) en ceinture
 * autour de la silhouette, apparaissant en staggered.
 */

type ItemProps = {
  x: number;
  y: number;
  appear: number;
  float: number;
  children: React.ReactNode;
};

const ChaosItem: React.FC<ItemProps> = ({x, y, appear, float, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - appear;

  const s = spring({
    frame: local,
    fps,
    config: {damping: 14, mass: 0.9, stiffness: 85},
    durationInFrames: 22,
  });
  const opacity = interpolate(local, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(s, [0, 1], [0.6, 1]);
  const floatOffset =
    Math.sin((frame / fps) * 2 * Math.PI * 0.6 + float * Math.PI * 2) * 3;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + floatOffset,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
      }}
    >
      {children}
    </div>
  );
};

const ClockIcon: React.FC<{size?: number; color: string}> = ({size = 100, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rot = ((frame / fps) * 360 * 1.6) % 360;
  const rot2 = ((frame / fps) * 360 * 0.35) % 360;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={42} fill="none" stroke={color} strokeWidth={5} />
      <circle cx={50} cy={50} r={4} fill={color} />
      <line
        x1={50}
        y1={50}
        x2={50}
        y2={22}
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        transform={`rotate(${rot} 50 50)`}
      />
      <line
        x1={50}
        y1={50}
        x2={50}
        y2={32}
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        transform={`rotate(${rot2} 50 50)`}
      />
    </svg>
  );
};

const MailIcon: React.FC<{size?: number; color: string}> = ({size = 100, color}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x={12} y={24} width={76} height={52} rx={8} fill="none" stroke={color} strokeWidth={5} />
    <path
      d="M 14 28 L 50 56 L 86 28"
      fill="none"
      stroke={color}
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FolderIcon: React.FC<{size?: number; color: string}> = ({size = 100, color}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M 10 32 L 10 80 Q 10 86 16 86 L 84 86 Q 90 86 90 80 L 90 36 Q 90 30 84 30 L 48 30 L 40 22 L 16 22 Q 10 22 10 28 Z"
      fill="none"
      stroke={color}
      strokeWidth={5}
      strokeLinejoin="round"
    />
  </svg>
);

const BellIcon: React.FC<{size?: number; color: string}> = ({size = 96, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wobble = Math.sin((frame / fps) * 2 * Math.PI * 2.2) * 6;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{transform: `rotate(${wobble}deg)`, transformOrigin: '50px 18px'}}
    >
      <path
        d="M 50 18 Q 30 18 28 44 Q 26 66 20 72 L 80 72 Q 74 66 72 44 Q 70 18 50 18 Z"
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path
        d="M 44 78 Q 50 86 56 78"
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <circle cx={78} cy={24} r={8} fill={color} />
    </svg>
  );
};

const PersonIcon: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <circle cx={100} cy={72} r={32} fill="none" stroke={color} strokeWidth={8} />
    <path
      d="M 40 180 Q 40 120 100 120 Q 160 120 160 180"
      fill="none"
      stroke={color}
      strokeWidth={8}
      strokeLinecap="round"
    />
  </svg>
);

export const Scene1Avant: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const sceneOpacity = interpolate(frame, [108, 120], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const personSpring = spring({
    frame: frame - 10,
    fps,
    config: {damping: 18, mass: 0.8, stiffness: 95},
    durationInFrames: 24,
  });
  const personOpacity = interpolate(frame - 10, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const personScale = interpolate(personSpring, [0, 1], [0.86, 1]);
  const personFloat = Math.sin((frame / fps) * 2 * Math.PI * 0.4) * 2;

  const iconColor = brand.colors.neutral;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F2F2F5',
        opacity: sceneOpacity,
      }}
    >
      {/* Texte d'accroche — haut de la safe zone */}
      <div
        style={{
          position: 'absolute',
          top: 290,
          left: 0,
          width: '100%',
          padding: '0 70px',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 3,
        }}
      >
        <WordByWord
          text="Trop de tâches qui vous prennent du temps ?"
          delay={2}
          stagger={4}
          size={98}
          weight="heavy"
          color={brand.colors.navy}
          align="center"
          maxWidth={940}
        />
      </div>

      {/* Silhouette dirigeant — centre vertical sous le texte */}
      <div
        style={{
          position: 'absolute',
          top: 880,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: personOpacity,
            transform: `translateY(${personFloat}px) scale(${personScale})`,
          }}
        >
          <PersonIcon size={230} color={brand.colors.navy} />
        </div>
      </div>

      {/* Icônes du chaos — en ceinture autour de la silhouette, hors du cœur texte */}
      <ChaosItem x={90} y={940} appear={28} float={0.2}>
        <ClockIcon color={iconColor} size={128} />
      </ChaosItem>
      <ChaosItem x={860} y={920} appear={34} float={0.5}>
        <MailIcon color={iconColor} size={124} />
      </ChaosItem>
      <ChaosItem x={70} y={1220} appear={40} float={0.8}>
        <FolderIcon color={iconColor} size={116} />
      </ChaosItem>
      <ChaosItem x={870} y={1240} appear={46} float={0.1}>
        <BellIcon color={iconColor} size={120} />
      </ChaosItem>
      <ChaosItem x={470} y={1340} appear={52} float={0.6}>
        <MailIcon color={iconColor} size={92} />
      </ChaosItem>
    </AbsoluteFill>
  );
};
