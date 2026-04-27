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
import {ShockWave} from '../components/ShockWave';
import {Logo} from '../Logo';
import {KineticText} from '../components/KineticText';

/**
 * [4-6s] BASCULE (60 frames)
 * - Flash blanc vers frame 8-12
 * - Onde de choc radiale depuis le centre
 * - 100 particules qui explosent depuis le centre avec trails
 * - Logo LTC AI apparaît brièvement (frames 30-48) avec glow intense
 * - Chromatic aberration au pic de l'impact (frame 10-14)
 * - Texte "L'IA change tout." en kinetic text lettre-par-lettre
 */

const CENTER_X = 540;
const CENTER_Y = 960;

const ExplosionParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const count = 100;

  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      {Array.from({length: count}, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + random(`exp-a-${i}`) * 0.4;
        const velocity = 600 + random(`exp-v-${i}`) * 900;
        const startFrame = 8 + random(`exp-t-${i}`) * 6;
        const life = 38 + random(`exp-l-${i}`) * 16;
        const size = 4 + random(`exp-s-${i}`) * 10;
        const color =
          random(`exp-c-${i}`) > 0.7 ? brand.colors.cream : brand.colors.navy;

        const local = frame - startFrame;
        if (local < 0 || local > life) return null;

        const t = local / fps;
        const progress = local / life;

        const dist = velocity * t * (1 - 0.35 * progress); // easing out
        const x = CENTER_X + Math.cos(angle) * dist;
        const y = CENTER_Y + Math.sin(angle) * dist;

        const opacity = interpolate(progress, [0, 0.12, 0.7, 1], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const scale = interpolate(progress, [0, 0.1, 1], [0.2, 1, 0.4]);

        // trail: 3 echoes à l'arrière de la particule
        return (
          <React.Fragment key={i}>
            {[0, 1, 2].map((k) => {
              const tailDist = dist - k * 22;
              if (tailDist < 0) return null;
              const tx = CENTER_X + Math.cos(angle) * tailDist;
              const ty = CENTER_Y + Math.sin(angle) * tailDist;
              return (
                <div
                  key={k}
                  style={{
                    position: 'absolute',
                    left: tx,
                    top: ty,
                    width: size * (1 - k * 0.25),
                    height: size * (1 - k * 0.25),
                    borderRadius: '50%',
                    backgroundColor: color,
                    opacity: opacity * (1 - k * 0.3),
                    transform: `scale(${scale})`,
                    boxShadow: `0 0 ${14 - k * 3}px ${color}`,
                  }}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Icônes du chaos qui se contractent en points lumineux
const CollapsingIcons: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const icons = [
    {startX: 130, startY: 960, appear: 0},
    {startX: 920, startY: 940, appear: 2},
    {startX: 180, startY: 1280, appear: 4},
    {startX: 880, startY: 1290, appear: 6},
    {startX: 540, startY: 640, appear: 1},
    {startX: 540, startY: 1360, appear: 3},
  ];

  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      {icons.map((ic, i) => {
        const local = frame - ic.appear;
        const s = spring({
          frame: local,
          fps,
          config: {damping: 20, mass: 1, stiffness: 80},
          durationInFrames: 18,
        });
        const t = interpolate(s, [0, 1], [0, 1]);
        const x = interpolate(t, [0, 1], [ic.startX, CENTER_X]);
        const y = interpolate(t, [0, 1], [ic.startY, CENTER_Y]);
        const size = interpolate(t, [0, 1], [40, 2]);
        const opacity = interpolate(local, [0, 4, 14, 20], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - size / 2,
              top: y - size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: brand.colors.navy,
              opacity,
              boxShadow: `0 0 32px ${brand.colors.navy}`,
            }}
          />
        );
      })}
    </div>
  );
};

export const Scene2Bascule: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Flash blanc : rampe vers blanc frames 0-8, retour 8-22
  const flashOpacity = interpolate(frame, [0, 8, 22], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fond : gris clair (continuité avec scène 1) → cream
  const bgMix = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Logo LTC AI : apparaît frames 28-48 au centre avec grand glow
  const logoSpring = spring({
    frame: frame - 28,
    fps,
    config: {damping: 10, mass: 0.8, stiffness: 110},
    durationInFrames: 22,
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.3, 1]);
  const logoOpacity = interpolate(frame, [26, 34, 52, 60], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const logoBlur = interpolate(frame, [28, 42], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Chromatic aberration pic : offset max frames 8-12
  const chromaOffset = interpolate(frame, [4, 10, 14, 20], [0, 14, 8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Fond continu scène 1 → scène 3 */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, #EEEEF2 0%, #D4D8E4 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: brand.colors.cream,
          opacity: bgMix,
        }}
      />

      {/* Icônes qui se contractent en points lumineux vers le centre */}
      <CollapsingIcons />

      {/* Ondes de choc radiales */}
      <ShockWave
        cx={CENTER_X}
        cy={CENTER_Y}
        delay={6}
        maxRadius={1600}
        duration={42}
        color={brand.colors.navy}
        strokeWidth={8}
        rings={3}
      />

      {/* Halo lumineux gigantesque centré */}
      <div
        style={{
          position: 'absolute',
          left: CENTER_X - 700,
          top: CENTER_Y - 700,
          width: 1400,
          height: 1400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${brand.colors.navy}55 0%, ${brand.colors.navy}22 35%, transparent 65%)`,
          filter: 'blur(30px)',
          opacity: interpolate(frame, [4, 14, 46, 60], [0, 0.9, 0.6, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />

      {/* Particules d'explosion avec trails */}
      <ExplosionParticles />

      {/* Logo LTC AI flash central avec glow/bloom */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: logoOpacity,
        }}
      >
        <div
          style={{
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 60px ${brand.colors.navy}) drop-shadow(0 0 20px ${brand.colors.navy}) blur(${logoBlur}px)`,
          }}
        >
          <Logo size={420} />
        </div>
      </div>

      {/* Chromatic aberration : 3 copies offset sur les éléments clés */}
      {chromaOffset > 0.3 ? (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              mixBlendMode: 'screen',
              transform: `translateX(-${chromaOffset}px)`,
              opacity: 0.55,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: CENTER_X - 300,
                top: CENTER_Y - 2,
                width: 600,
                height: 4,
                background: '#FF1030',
                filter: 'blur(2px)',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              mixBlendMode: 'screen',
              transform: `translateX(${chromaOffset}px)`,
              opacity: 0.55,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: CENTER_X - 300,
                top: CENTER_Y - 2,
                width: 600,
                height: 4,
                background: '#1030FF',
                filter: 'blur(2px)',
              }}
            />
          </div>
        </>
      ) : null}

      {/* Flash blanc global au moment du pic */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FFFFFF',
          opacity: flashOpacity,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />

      {/* Texte kinétique — apparaît après le flash */}
      <div
        style={{
          position: 'absolute',
          top: 1280,
          left: 0,
          width: '100%',
          padding: '0 70px',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 6,
        }}
      >
        <KineticText
          text="L'IA change tout."
          delay={18}
          wordStagger={7}
          letterStagger={2}
          size={124}
          weight="heavy"
          color={brand.colors.navy}
          align="center"
          maxWidth={900}
          slideDistance={30}
          startScale={0.65}
          startRotation={-6}
        />
      </div>
    </AbsoluteFill>
  );
};
