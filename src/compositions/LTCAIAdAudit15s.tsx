import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {brand} from '../config/brand';
import {Scene1Avant} from '../scenes/Scene1Avant';
import {Scene2Transition} from '../scenes/Scene2Transition';
import {Scene3Apres} from '../scenes/Scene3Apres';
import {Scene4CTA} from '../scenes/Scene4CTA';

/**
 * LTC AI — Pub Meta Ads 15s 9:16 (1080x1920, 30fps → 450 frames).
 * Structure AVANT / TRANSITION / APRÈS / CTA.
 * Safe zones Meta Reels/Stories :
 *  - 250 px top (username overlay)
 *  - 450 px bottom (CTA + caption overlay)
 * Tout le contenu critique vit entre y=250 et y=1470.
 */
export const LTCAIAdAudit15s: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: brand.colors.cream}}>
      {/* [0-4s] AVANT — chaos */}
      <Sequence from={0} durationInFrames={120} layout="none">
        <Scene1Avant />
      </Sequence>

      {/* [4-6s] TRANSITION — onde IA */}
      <Sequence from={120} durationInFrames={60} layout="none">
        <Scene2Transition />
      </Sequence>

      {/* [6-11s] APRÈS — +15h + "Sans complexité. Sans jargon." */}
      <Sequence from={180} durationInFrames={150} layout="none">
        <Scene3Apres />
      </Sequence>

      {/* [11-15s] CTA — logo + diagnostic gratuit + réserver */}
      <Sequence from={330} durationInFrames={120} layout="none">
        <Scene4CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
