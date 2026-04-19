import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {brand} from '../config/brand';
import {useCases} from '../config/useCases';
import {UseCaseCard} from '../components/UseCaseCard';

/**
 * [22-33s] FLASH DES 6 CAS D'USAGE
 * 11 secondes / 6 cas = ~1.833s chacun = 55 frames @ 30fps.
 */

const FRAMES_PER_CASE = 55;

export const UseCasesFlashScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.cream,
        padding: '70px 60px 380px 60px',
        alignItems: 'center',
      }}
    >
      {/* Titre de scène */}
      <div
        style={{
          fontFamily: brand.fonts.family,
          fontWeight: brand.fonts.weights.bold,
          fontSize: 26,
          color: brand.colors.accent,
          letterSpacing: 3,
          marginBottom: 16,
        }}
      >
        CE QUE L'IA AUTOMATISE
      </div>

      <div style={{flex: 1, width: '100%', position: 'relative'}}>
        {useCases.map((uc, i) => (
          <Sequence
            key={uc.id}
            from={i * FRAMES_PER_CASE}
            durationInFrames={FRAMES_PER_CASE}
            layout="none"
          >
            <AbsoluteFill
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 20,
              }}
            >
              <UseCaseCard
                useCase={uc}
                durationInFrames={FRAMES_PER_CASE}
              />
            </AbsoluteFill>
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};
