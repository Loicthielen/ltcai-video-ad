import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useVideoConfig,
} from 'remotion';
import {brand} from '../config/brand';
import {Language} from '../config/subtitles';
import {Subtitle} from '../components/Subtitle';

import {HookScene} from '../scenes/HookScene';
import {ProcessIntroScene} from '../scenes/ProcessIntroScene';
import {AuditScene} from '../scenes/AuditScene';
import {RecommendationsScene} from '../scenes/RecommendationsScene';
import {UseCasesFlashScene} from '../scenes/UseCasesFlashScene';
import {FollowUpScene} from '../scenes/FollowUpScene';
import {CTAScene} from '../scenes/CTAScene';

export type Explainer45sProps = {
  language: Language;
};

// Timings en secondes "storyboard" (à vitesse 1x) → frames réels,
// en appliquant le facteur de vitesse global (brand.speedFactor).
// speedFactor = 0.75 → chaque seconde de storyboard occupe 1/0.75 ≈ 1.333 s réels.
const FPS = 30;
const s = (n: number) => Math.round((n / brand.speedFactor) * FPS);

/**
 * Composition principale — 1080x1350 (4:5 Facebook Feed), 30 fps.
 * Durée réelle = 45 s / speedFactor (0.75 → 60 s).
 *
 * Séquençage (en secondes "storyboard" à vitesse 1x) :
 *  0-4s    Hook
 *  4-10s   Process Intro (4 étapes)
 *  10-16s  Audit (zoom étape 1)
 *  16-22s  Recommandations + Implémentation (étapes 2+3)
 *  22-33s  Flash 6 cas d'usage
 *  33-39s  Suivi + tagline "L'IA, simplement."
 *  39-45s  CTA final
 */
export const Explainer45s: React.FC<Explainer45sProps> = ({language}) => {
  const {durationInFrames} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: brand.colors.cream}}>
      {/* Musique de fond optionnelle (volume très bas). */}
      {brand.enableBackgroundMusic ? (
        <Audio
          src={staticFile('bg-music.mp3')}
          volume={brand.backgroundMusicVolume}
        />
      ) : null}

      <Sequence from={s(0)} durationInFrames={s(4)} layout="none">
        <HookScene />
      </Sequence>

      <Sequence from={s(4)} durationInFrames={s(6)} layout="none">
        <ProcessIntroScene />
      </Sequence>

      <Sequence from={s(10)} durationInFrames={s(6)} layout="none">
        <AuditScene />
      </Sequence>

      <Sequence from={s(16)} durationInFrames={s(6)} layout="none">
        <RecommendationsScene />
      </Sequence>

      <Sequence from={s(22)} durationInFrames={s(11)} layout="none">
        <UseCasesFlashScene />
      </Sequence>

      <Sequence from={s(33)} durationInFrames={s(6)} layout="none">
        <FollowUpScene />
      </Sequence>

      <Sequence from={s(39)} durationInFrames={s(6)} layout="none">
        <CTAScene />
      </Sequence>

      {/* Sous-titres permanents, couche au-dessus de tout */}
      <Sequence from={0} durationInFrames={durationInFrames} layout="none">
        <Subtitle language={language} variant="auto" />
      </Sequence>
    </AbsoluteFill>
  );
};
