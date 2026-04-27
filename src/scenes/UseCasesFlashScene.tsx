import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {brand} from '../config/brand';
import {useCases} from '../config/useCases';
import {UseCaseCard} from '../components/UseCaseCard';

/**
 * FLASH DES 6 CAS D'USAGE (équivalent 22-33s en storyboard 1x).
 * Durée effective scalée par brand.speedFactor. Chaque cas occupe 1/N de la scène.
 */

export const UseCasesFlashScene: React.FC = () => {
  const {durationInFrames} = useVideoConfig();
  const framesPerCase = Math.floor(durationInFrames / useCases.length);

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
            from={i * framesPerCase}
            durationInFrames={framesPerCase}
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
                durationInFrames={framesPerCase}
              />
            </AbsoluteFill>
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};
