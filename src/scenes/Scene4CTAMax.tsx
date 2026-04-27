import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {brand} from '../config/brand';
import {Logo} from '../Logo';
import {KineticText} from '../components/KineticText';
import {ConfettiField} from '../components/ConfettiField';
import {ShineSweep} from '../components/ShineSweep';
import {ParticleField} from '../components/ParticleField';

/**
 * [11-15s] CTA MAX (120 frames)
 * - Fond : navy LTC avec gradient animé + rayons de lumière
 * - Logo : entrée scale 0 → 1.15 → 1.0 + bloom intense + halo pulsant continu
 * - Confettis (50 particules) + micro-particules de fond (40)
 * - "Diagnostic gratuit" en KineticText construit lettre-par-lettre
 * - "30 minutes offertes" en reveal wipe
 * - Bouton ltcai.be avec pulse continu + shine sweep à frame 80
 * - Outro : léger zoom-in + fade sur les 10 dernières frames
 */

export const Scene4CTAMax: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Outro : zoom subtil + fade sur les 10 dernières frames (110-120)
  const outroScale = interpolate(frame, [110, 120], [1, 1.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const outroOpacity = interpolate(frame, [110, 120], [1, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Logo : entrée spring overshoot puis halo pulsant continu
  const logoSpring = spring({
    frame,
    fps,
    config: {damping: 9, mass: 0.8, stiffness: 120},
    durationInFrames: 28,
  });
  const logoOvershoot = interpolate(frame, [0, 14, 22, 30], [0, 1.18, 1.02, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const logoScale = logoSpring * logoOvershoot;
  const haloBlur = 50 + Math.sin((frame / fps) * 2 * Math.PI * 1.2) * 18;
  const haloOpacity = 0.55 + Math.sin((frame / fps) * 2 * Math.PI * 1.2) * 0.2;

  // Bouton pulse continu
  const buttonPulse = 1 + Math.sin((frame / fps) * 2 * Math.PI * 0.85) * 0.045;
  const buttonOpacity = interpolate(frame, [56, 72], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "30 minutes offertes" : reveal wipe (clip-path)
  const wipeProgress = interpolate(frame, [40, 56], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Rayons de lumière qui tournent lentement
  const rayRotation = (frame / fps) * 12;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${outroScale})`,
        opacity: outroOpacity,
        transformOrigin: 'center center',
      }}
    >
      {/* Fond navy avec gradient animé */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${brand.colors.navy} 0%, ${brand.colors.navyDeep} 60%, ${brand.colors.neutralDark} 100%)`,
        }}
      />

      {/* Rayons de lumière qui tournent */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 2600,
          height: 2600,
          transform: `translate(-50%, -50%) rotate(${rayRotation}deg)`,
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      >
        {Array.from({length: 8}, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 4,
              height: 1800,
              background: `linear-gradient(180deg, transparent 0%, ${brand.colors.cream}80 50%, transparent 100%)`,
              transformOrigin: 'top center',
              transform: `translate(-50%, 0%) rotate(${i * 45}deg)`,
            }}
          />
        ))}
      </div>

      {/* Micro-particules de fond */}
      <ParticleField
        count={55}
        seed="cta-back"
        color={brand.colors.cream}
        minSize={2}
        maxSize={6}
        driftY={-20}
        driftX={6}
        wobble={16}
        maxOpacity={0.6}
        glow={4}
        delay={0}
        fadeIn={12}
      />

      {/* Confettis */}
      <ConfettiField
        count={50}
        seed="cta-confetti"
        width={1080}
        height={1920}
        colors={[brand.colors.cream, brand.colors.navy, '#A0B4FF']}
        delay={10}
        duration={100}
        gravity={180}
      />

      {/* Halo pulsant derrière le logo */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 560,
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${brand.colors.cream} 0%, ${brand.colors.cream}00 60%)`,
          filter: `blur(${haloBlur}px)`,
          opacity: haloOpacity * 0.35,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo LTC AI en bloom */}
      <div
        style={{
          position: 'absolute',
          top: 380,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 46px ${brand.colors.cream}) drop-shadow(0 0 20px ${brand.colors.cream})`,
          }}
        >
          <div style={{backgroundColor: brand.colors.cream, borderRadius: 40, padding: 32}}>
            <Logo size={240} />
          </div>
        </div>
      </div>

      {/* "Diagnostic gratuit" — kinetic lettre-par-lettre */}
      <div
        style={{
          position: 'absolute',
          top: 920,
          left: 0,
          width: '100%',
          padding: '0 70px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <KineticText
          text="Diagnostic gratuit"
          delay={16}
          wordStagger={10}
          letterStagger={1.6}
          size={112}
          weight="heavy"
          color={brand.colors.cream}
          align="center"
          maxWidth={700}
          slideDistance={26}
          startScale={0.7}
          startRotation={-4}
        />
      </div>

      {/* "30 minutes offertes" — reveal wipe */}
      <div
        style={{
          position: 'absolute',
          top: 1180,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            clipPath: `inset(0 ${100 - wipeProgress}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - wipeProgress}% 0 0)`,
            fontFamily: brand.fonts.family,
            fontWeight: brand.fonts.weights.semibold,
            fontSize: 70,
            color: brand.colors.cream,
            letterSpacing: 0.5,
          }}
        >
          30 minutes offertes
        </div>
      </div>

      {/* Bouton ltcai.be */}
      <div
        style={{
          position: 'absolute',
          top: 1330,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            opacity: buttonOpacity,
            transform: `scale(${buttonPulse})`,
            padding: '34px 90px',
            backgroundColor: brand.colors.cream,
            borderRadius: 999,
            fontFamily: brand.fonts.family,
            fontWeight: brand.fonts.weights.heavy,
            fontSize: 70,
            color: brand.colors.navyDeep,
            letterSpacing: 1.8,
            boxShadow: `0 24px 56px rgba(0,0,0,0.4), 0 0 40px ${brand.colors.cream}55`,
            overflow: 'hidden',
          }}
        >
          {brand.website}
          {/* Shine sweep quand le bouton est en place */}
          <ShineSweep delay={80} duration={28} thickness={16} borderRadius={999} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
