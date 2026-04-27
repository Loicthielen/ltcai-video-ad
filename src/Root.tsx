import React from 'react';
import {Composition} from 'remotion';
import {Explainer45s} from './compositions/Explainer45s';
import {LTCAIAdAudit15s} from './compositions/LTCAIAdAudit15s';
import {brand} from './config/brand';

const FPS = 30;

// Explainer 45s (4:5 Facebook Feed) — existant
const EXPLAINER_WIDTH = 1080;
const EXPLAINER_HEIGHT = 1350;
const EXPLAINER_STORYBOARD_SECONDS = 45;
const EXPLAINER_DURATION = Math.round(
  (EXPLAINER_STORYBOARD_SECONDS / brand.speedFactor) * FPS,
);

// Pub Meta Ads 15s (9:16 Reels / Stories)
const AD_WIDTH = 1080;
const AD_HEIGHT = 1920;
const AD_DURATION = 15 * FPS; // 450 frames

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LTCAIAdAudit15s"
        component={LTCAIAdAudit15s}
        durationInFrames={AD_DURATION}
        fps={FPS}
        width={AD_WIDTH}
        height={AD_HEIGHT}
      />

      <Composition
        id="Explainer45s"
        component={Explainer45s}
        durationInFrames={EXPLAINER_DURATION}
        fps={FPS}
        width={EXPLAINER_WIDTH}
        height={EXPLAINER_HEIGHT}
        defaultProps={{
          language: 'fr' as const,
        }}
      />

      <Composition
        id="Explainer45s-NL"
        component={Explainer45s}
        durationInFrames={EXPLAINER_DURATION}
        fps={FPS}
        width={EXPLAINER_WIDTH}
        height={EXPLAINER_HEIGHT}
        defaultProps={{
          language: 'nl' as const,
        }}
      />
    </>
  );
};
