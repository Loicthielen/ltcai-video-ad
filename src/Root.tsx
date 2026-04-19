import React from 'react';
import {Composition} from 'remotion';
import {Explainer45s} from './compositions/Explainer45s';

const WIDTH = 1080;
const HEIGHT = 1350; // 4:5 Meta Ads Facebook Feed
const FPS = 30;
const DURATION_SECONDS = 45;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Explainer45s"
        component={Explainer45s}
        durationInFrames={FPS * DURATION_SECONDS}
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
        durationInFrames={FPS * DURATION_SECONDS}
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
