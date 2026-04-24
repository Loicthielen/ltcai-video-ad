import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {brand} from '../config/brand';
import {SlotCounter} from '../components/SlotCounter';
import {ParticleField} from '../components/ParticleField';
import {KineticText} from '../components/KineticText';

/**
 * [6-11s] LIBÉRATION (150 frames)
 * - Caméra : dolly-out 1.15 → 1.0 (inverse de scène 1)
 * - Fond : bleu LTC saturé + rayons de lumière diagonaux qui balayent
 * - SlotCounter 0→15 avec glow intense au pic
 * - 60+ particules ambiantes (field lent)
 * - Courbe SVG stroke-dasharray qui se trace
 * - 3 icônes de bénéfices en staggered avec typing effect
 * - Deux blocs de texte qui se succèdent avec morph/wipe
 * - Halo pulsant autour du texte principal
 */

type TypingTextProps = {
  text: string;
  delay: number;
  speed?: number;
  size?: number;
  color?: string;
};

const TypingText: React.FC<TypingTextProps> = ({text, delay, speed = 1.2, size = 34, color}) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const chars = Math.max(0, Math.floor(local / speed));
  const visible = text.slice(0, chars);

  return (
    <span
      style={{
        fontFamily: brand.fonts.family,
        fontSize: size,
        fontWeight: brand.fonts.weights.semibold,
        color: color ?? brand.colors.cream,
        letterSpacing: 0.5,
      }}
    >
      {visible}
      {chars < text.length && local >= 0 ? <span style={{opacity: 0.6}}>|</span> : null}
    </span>
  );
};

type BenefitProps = {
  x: number;
  y: number;
  appear: number;
  label: string;
  icon: React.ReactNode;
};

const Benefit: React.FC<BenefitProps> = ({x, y, appear, label, icon}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - appear;

  const s = spring({
    frame: local,
    fps,
    config: {damping: 12, mass: 0.7, stiffness: 110},
    durationInFrames: 20,
  });
  const opacity = interpolate(local, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(s, [0, 1], [0.5, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 24,
          backgroundColor: brand.colors.cream,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 12px 28px rgba(0,0,0,0.25)`,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{minWidth: 480}}>
        <TypingText
          text={label}
          delay={appear + 8}
          speed={1.1}
          size={42}
          color={brand.colors.cream}
        />
      </div>
    </div>
  );
};

// Icônes de bénéfices
const MailAutoIcon: React.FC = () => (
  <svg width={54} height={54} viewBox="0 0 24 24">
    <rect x={3} y={6} width={18} height={12} rx={2} fill="none" stroke={brand.colors.navy} strokeWidth={2} />
    <path d="M 3 8 L 12 14 L 21 8" fill="none" stroke={brand.colors.navy} strokeWidth={2} strokeLinejoin="round" />
    <circle cx={18} cy={16} r={3} fill={brand.colors.navy} />
    <path d="M 17 16 L 17.8 16.8 L 19.2 15.2" fill="none" stroke={brand.colors.cream} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AnalysisIcon: React.FC = () => (
  <svg width={54} height={54} viewBox="0 0 24 24">
    <path d="M 4 19 L 4 5 L 20 5 L 20 19 Z" fill="none" stroke={brand.colors.navy} strokeWidth={2} strokeLinejoin="round" />
    <path d="M 7 15 L 10 11 L 13 13 L 17 8" fill="none" stroke={brand.colors.navy} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReportIcon: React.FC = () => (
  <svg width={54} height={54} viewBox="0 0 24 24">
    <rect x={4} y={3} width={16} height={18} rx={2} fill="none" stroke={brand.colors.navy} strokeWidth={2} />
    <line x1={8} y1={8} x2={16} y2={8} stroke={brand.colors.navy} strokeWidth={2} strokeLinecap="round" />
    <line x1={8} y1={12} x2={16} y2={12} stroke={brand.colors.navy} strokeWidth={2} strokeLinecap="round" />
    <line x1={8} y1={16} x2={13} y2={16} stroke={brand.colors.navy} strokeWidth={2} strokeLinecap="round" />
  </svg>
);

// Rayons de lumière diagonaux qui balayent
const LightRays: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden'}}>
      {[0, 1, 2, 3].map((i) => {
        const x = -800 + ((t * (120 + i * 40)) % 2400);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: -400,
              left: x,
              width: 280,
              height: 3000,
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)`,
              transform: 'rotate(-20deg)',
            }}
          />
        );
      })}
    </div>
  );
};

export const Scene3Liberation: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Dolly-out : scale 1.15 → 1.0 sur toute la scène
  const cameraScale = interpolate(frame, [0, 140], [1.15, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade-out fin
  const sceneOpacity = interpolate(frame, [138, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Bloc A (+15h) : frames 0-80
  // Bloc B (Sans complexité / Sans jargon) : frames 80-150
  const blocAOpacity = interpolate(frame, [0, 8, 76, 86], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const blocBOpacity = interpolate(frame, [82, 92], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Morph Bloc B : "Sans complexité." → "Sans jargon." à frame ~125
  const phaseB2 = frame >= 122;

  // Glow pulsant autour du compteur
  const pulseT = (frame / fps) * 2 * Math.PI * 1.4;
  const counterGlowBlur = 40 + Math.sin(pulseT) * 20;

  // Courbe de croissance SVG stroke-dasharray
  const pathLen = 1800;
  const curveProgress = interpolate(frame, [10, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dashOffset = pathLen - curveProgress * pathLen;

  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity,
        transform: `scale(${cameraScale})`,
        transformOrigin: 'center center',
      }}
    >
      {/* Fond bleu LTC saturé et lumineux */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${brand.colors.navy} 0%, ${brand.colors.navyDeep} 55%, ${brand.colors.neutralDark} 100%)`,
        }}
      />

      {/* Rayons de lumière diagonaux */}
      <LightRays />

      {/* Particules ambiantes — champ dense mais lent */}
      <ParticleField
        count={70}
        seed="libe"
        color={brand.colors.cream}
        minSize={2}
        maxSize={7}
        driftY={-30}
        driftX={10}
        wobble={20}
        maxOpacity={0.7}
        glow={6}
        delay={0}
        fadeIn={14}
      />

      {/* Courbe de croissance en fond */}
      <svg
        width={1080}
        height={1920}
        viewBox="0 0 1080 1920"
        style={{position: 'absolute', inset: 0, opacity: 0.22}}
      >
        <path
          d="M 20 1540 Q 280 1460 500 1260 T 880 820 T 1060 460"
          stroke={brand.colors.cream}
          strokeWidth={9}
          fill="none"
          strokeDasharray={pathLen}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
        {/* Points de contrôle qui s'allument */}
        {[
          {x: 280, y: 1460, t: 0.25},
          {x: 500, y: 1260, t: 0.5},
          {x: 780, y: 920, t: 0.75},
          {x: 1020, y: 520, t: 0.95},
        ].map((p, i) => {
          const show = curveProgress > p.t;
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={show ? 14 : 0}
              fill={brand.colors.cream}
              opacity={show ? 1 : 0}
            />
          );
        })}
      </svg>

      {/* BLOC A : Compteur +15h */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: blocAOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '360px 70px 500px',
        }}
      >
        {/* Halo derrière le compteur */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 680,
            width: 900,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${brand.colors.navy}aa 0%, transparent 60%)`,
            filter: `blur(${counterGlowBlur}px)`,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 4,
            zIndex: 2,
            filter: `drop-shadow(0 0 30px ${brand.colors.cream}66)`,
          }}
        >
          <div
            style={{
              fontFamily: brand.fonts.family,
              fontWeight: brand.fonts.weights.heavy,
              fontSize: 220,
              color: brand.colors.cream,
              lineHeight: 1,
              letterSpacing: -6,
            }}
          >
            +
          </div>
          <SlotCounter
            to={15}
            from={0}
            delay={4}
            duration={60}
            digits={2}
            size={260}
            color={brand.colors.cream}
          />
          <div
            style={{
              fontFamily: brand.fonts.family,
              fontWeight: brand.fonts.weights.heavy,
              fontSize: 200,
              color: brand.colors.cream,
              lineHeight: 1,
              marginLeft: 8,
            }}
          >
            h
          </div>
        </div>

        <div style={{marginTop: 24, zIndex: 2}}>
          <KineticText
            text="par semaine, économisées."
            delay={32}
            wordStagger={7}
            letterStagger={1.3}
            size={70}
            weight="semibold"
            color={brand.colors.cream}
            align="center"
            maxWidth={940}
            slideDistance={18}
            startScale={0.88}
          />
        </div>

        {/* 3 bénéfices staggered */}
        <div style={{position: 'absolute', left: 0, top: 1300, width: '100%'}}>
          <Benefit
            x={90}
            y={0}
            appear={36}
            label="Emails automatisés"
            icon={<MailAutoIcon />}
          />
          <Benefit
            x={90}
            y={130}
            appear={46}
            label="Analyses instantanées"
            icon={<AnalysisIcon />}
          />
          <Benefit
            x={90}
            y={260}
            appear={56}
            label="Reporting automatique"
            icon={<ReportIcon />}
          />
        </div>
      </div>

      {/* BLOC B : "Sans complexité." → "Sans jargon." */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: blocBOpacity,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '360px 70px 500px',
        }}
      >
        {/* Halo pulsant derrière le texte */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 800,
            height: 400,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${brand.colors.cream}33 0%, transparent 60%)`,
            filter: `blur(${counterGlowBlur}px)`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />

        {!phaseB2 ? (
          <KineticText
            text="Sans complexité."
            delay={86}
            wordStagger={8}
            letterStagger={1.6}
            size={136}
            weight="heavy"
            color={brand.colors.cream}
            align="center"
            maxWidth={940}
            slideDistance={28}
            startScale={0.7}
            startRotation={-3}
          />
        ) : (
          <KineticText
            text="Sans jargon."
            delay={124}
            wordStagger={8}
            letterStagger={1.6}
            size={150}
            weight="heavy"
            color={brand.colors.cream}
            align="center"
            maxWidth={940}
            slideDistance={28}
            startScale={0.7}
            startRotation={4}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
