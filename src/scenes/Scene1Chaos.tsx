import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {brand} from '../config/brand';
import {KineticText} from '../components/KineticText';
import {ParticleField} from '../components/ParticleField';

/**
 * [0-4s] CHAOS (120 frames)
 * - Caméra : dolly-zoom scale 1.0 → 1.15 sur toute la scène
 * - 3 couches parallaxe (grille de fond / mid icônes / foreground texte)
 * - 60+ particules (traînées d'emails qui défilent en diagonale)
 * - Icônes pain points staggered avec physics (dossiers qui tombent, cloches qui vibrent)
 * - Kinetic text mot-par-mot avec emphasis sur le dernier mot
 * - Fin : vibration subtile des éléments (préparation pivot)
 */

// ————————————————————————————————————————————————————————————————
// Icônes vectorielles simples (noir/gris pour la palette "avant")
// ————————————————————————————————————————————————————————————————
const ClockSpinning: React.FC<{size: number; color: string}> = ({size, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rot = ((frame / fps) * 360 * 1.8) % 360;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={42} fill="none" stroke={color} strokeWidth={5} />
      <line
        x1={50}
        y1={50}
        x2={50}
        y2={20}
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        transform={`rotate(${rot} 50 50)`}
      />
      <line
        x1={50}
        y1={50}
        x2={50}
        y2={30}
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        transform={`rotate(${rot * 0.25} 50 50)`}
      />
      <circle cx={50} cy={50} r={4} fill={color} />
    </svg>
  );
};

const FallingFolder: React.FC<{x: number; appear: number; settleY: number; color: string}> = ({
  x,
  appear,
  settleY,
  color,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - appear;

  // physics : chute + rebond amorti
  const s = spring({
    frame: local,
    fps,
    config: {damping: 9, mass: 0.8, stiffness: 140},
    durationInFrames: 30,
  });
  const y = interpolate(s, [0, 1], [-220, settleY]);
  const opacity = interpolate(local, [0, 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rot = interpolate(s, [0, 1], [-14, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `rotate(${rot}deg)`,
      }}
    >
      <svg width={110} height={110} viewBox="0 0 100 100">
        <path
          d="M 10 32 L 10 80 Q 10 86 16 86 L 84 86 Q 90 86 90 80 L 90 36 Q 90 30 84 30 L 48 30 L 40 22 L 16 22 Q 10 22 10 28 Z"
          fill={color}
          fillOpacity={0.12}
          stroke={color}
          strokeWidth={5}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

const ShakingBell: React.FC<{x: number; y: number; appear: number; color: string}> = ({
  x,
  y,
  appear,
  color,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - appear;

  const appearSpring = spring({
    frame: local,
    fps,
    config: {damping: 12, mass: 0.7, stiffness: 120},
    durationInFrames: 18,
  });
  const opacity = interpolate(local, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scaleIn = interpolate(appearSpring, [0, 1], [0.5, 1]);
  const wobble = Math.sin((frame / fps) * 2 * Math.PI * 2.6) * 8;
  const dot = Math.sin((frame / fps) * 2 * Math.PI * 1.8) > 0 ? 1 : 0.4;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `scale(${scaleIn}) rotate(${wobble}deg)`,
        transformOrigin: '50% 20%',
      }}
    >
      <svg width={110} height={110} viewBox="0 0 100 100">
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
        <circle cx={78} cy={24} r={9} fill={brand.colors.neutralDark} opacity={dot} />
      </svg>
    </div>
  );
};

// Lignes diagonales "temps qui s'écoule"
const TimeStreaks: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const streakCount = 18;
  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.28}}>
      {Array.from({length: streakCount}, (_, i) => {
        const rx = random(`streak-x-${i}`);
        const ry = random(`streak-y-${i}`);
        const rl = random(`streak-l-${i}`);
        const rs = random(`streak-s-${i}`);
        const baseY = ry * 2000 - 400;
        const speed = 320 + rs * 480;
        const y = baseY + ((frame / fps) * speed) - Math.floor(((frame / fps) * speed + baseY) / 2000) * 2000;
        const x = rx * 1400 - 150 + ((frame / fps) * speed * 0.4);
        const length = 80 + rl * 160;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x % 1400,
              top: y,
              width: length,
              height: 2,
              background: `linear-gradient(90deg, transparent 0%, ${brand.colors.neutral} 60%, transparent 100%)`,
              transform: 'rotate(-28deg)',
              opacity: 0.9,
            }}
          />
        );
      })}
    </div>
  );
};

export const Scene1Chaos: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Dolly-zoom : scale 1.0 → 1.15
  const cameraScale = interpolate(frame, [0, 110], [1.0, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Vibration subtile en fin de scène (frames 106-120)
  const vibeIntensity = interpolate(frame, [106, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const vibeX = Math.sin(frame * 1.9) * 3 * vibeIntensity;
  const vibeY = Math.cos(frame * 2.1) * 3 * vibeIntensity;

  // Fade-out fin (fondu vers la scène 2)
  const sceneOpacity = interpolate(frame, [110, 120], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const neutralIcon = brand.colors.neutral;

  // Fond parallaxe : grille lente
  const gridY = -((frame / fps) * 12);

  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity,
        transform: `scale(${cameraScale}) translate(${vibeX}px, ${vibeY}px)`,
        transformOrigin: 'center center',
      }}
    >
      {/* Fond dégradé gris-bleu */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, #EEEEF2 0%, #E0E2EA 60%, #D4D8E4 100%)',
        }}
      />

      {/* Couche 1 : grille subtile qui défile (parallaxe lente) */}
      <div
        style={{
          position: 'absolute',
          inset: -100,
          backgroundImage: `
            linear-gradient(to right, rgba(26,26,26,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(26,26,26,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translateY(${gridY}px)`,
          opacity: 0.6,
        }}
      />

      {/* Couche 2 : traînées diagonales "temps qui file" */}
      <TimeStreaks />

      {/* Couche 3 : particules d'emails / points du chaos (60+) */}
      <ParticleField
        count={65}
        seed="chaos"
        color={brand.colors.neutral}
        minSize={4}
        maxSize={9}
        driftY={-60}
        driftX={40}
        wobble={24}
        maxOpacity={0.6}
        glow={4}
        delay={0}
        fadeIn={12}
      />

      {/* Horloge qui tourne vite (mid layer) */}
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 950,
          opacity: interpolate(frame, [18, 32], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <ClockSpinning size={170} color={neutralIcon} />
      </div>
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 1200,
          opacity: interpolate(frame, [32, 46], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <ClockSpinning size={130} color={neutralIcon} />
      </div>

      {/* Dossiers qui tombent avec physics */}
      <FallingFolder x={120} settleY={1340} appear={28} color={neutralIcon} />
      <FallingFolder x={860} settleY={920} appear={40} color={neutralIcon} />

      {/* Cloches qui vibrent */}
      <ShakingBell x={780} y={1280} appear={48} color={neutralIcon} />
      <ShakingBell x={220} y={1280} appear={62} color={neutralIcon} />

      {/* Petit spam d'emails (10 icônes envelope qui pop en traînée) */}
      {Array.from({length: 10}, (_, i) => {
        const appear = 30 + i * 3;
        const local = frame - appear;
        const op = interpolate(local, [0, 8, 60, 80], [0, 0.8, 0.8, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const rs = random(`mail-${i}`);
        const x = 350 + rs * 400;
        const y = 760 + (i % 3) * 70 + Math.sin(frame * 0.1 + i) * 6;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              opacity: op,
            }}
          >
            <svg width={54} height={54} viewBox="0 0 100 100">
              <rect x={10} y={22} width={80} height={56} rx={6} fill="none" stroke={neutralIcon} strokeWidth={5} />
              <path d="M 12 26 L 50 56 L 88 26" fill="none" stroke={neutralIcon} strokeWidth={5} strokeLinejoin="round" />
            </svg>
          </div>
        );
      })}

      {/* Couche foreground : texte kinétique */}
      <div
        style={{
          position: 'absolute',
          top: 340,
          left: 0,
          width: '100%',
          padding: '0 70px',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 5,
        }}
      >
        <KineticText
          text="Trop de tâches qui vous prennent du temps ?"
          delay={8}
          wordStagger={10}
          letterStagger={1.4}
          size={108}
          weight="heavy"
          color={brand.colors.navy}
          align="center"
          maxWidth={920}
          slideDistance={40}
          startScale={0.8}
          startRotation={-4}
          emphasizeLast
        />
      </div>
    </AbsoluteFill>
  );
};
