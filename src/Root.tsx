import React from 'react';
import {Composition} from 'remotion';
import {Explainer45s} from './compositions/Explainer45s';
import {brand} from './config/brand';

const WIDTH = 1080;
const HEIGHT = 1350; // 4:5 Meta Ads Facebook Feed
const FPS = 30;

// Durée "storyboard" en secondes (à vitesse 1x). La durée réelle est
// étendue via brand.speedFactor (0.75 → 60 s).
const STORYBOARD_SECONDS = 45;
const DURATION_IN_FRAMES = Math.round(
  (STORYBOARD_SECONDS / brand.speedFactor) * FPS,
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Explainer45s"
        component={Explainer45s}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          language: 'fr' as const,
        }}
      />

      {/* Variante NL prête à l'emploi (même composition, prop différente) */}
      <Composition
        id="Explainer45s-NL"
        component={Explainer45s}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          language: 'nl' as const,
        }}
      />
    </>
  );
};
