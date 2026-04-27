import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {brand} from '../config/brand';
import {Scene1Chaos} from '../scenes/Scene1Chaos';
import {Scene2Bascule} from '../scenes/Scene2Bascule';
import {Scene3Liberation} from '../scenes/Scene3Liberation';
import {Scene4CTAMax} from '../scenes/Scene4CTAMax';
import {GrainOverlay} from '../components/GrainOverlay';

/**
 * LTC AI — Pub Meta Ads 15s 9:16 (1080x1920, 30fps → 450 frames).
 * Structure AVANT / BASCULE / LIBÉRATION / CTA avec motion design dense.
 * Safe zones Meta Reels/Stories :
 *  - 250 px top (username overlay)
 *  - 450 px bottom (CTA + caption overlay)
 * Tout le contenu critique vit entre y=250 et y=1470.
 */
export const LTCAIAdAudit15s: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: brand.colors.cream}}>
      <Sequence from={0} durationInFrames={120} layout="none">
        <Scene1Chaos />
      </Sequence>

      <Sequence from={120} durationInFrames={60} layout="none">
        <Scene2Bascule />
      </Sequence>

      <Sequence from={180} durationInFrames={150} layout="none">
        <Scene3Liberation />
      </Sequence>

      <Sequence from={330} durationInFrames={120} layout="none">
        <Scene4CTAMax />
      </Sequence>

      {/* Grain permanent au-dessus de tout (feeling cinéma) */}
      <GrainOverlay opacity={0.05} />
    </AbsoluteFill>
  );
};
