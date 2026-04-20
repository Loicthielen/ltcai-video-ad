import React from 'react';
import {AbsoluteFill} from 'remotion';
import {brand} from '../config/brand';
import {AnimatedText} from '../components/AnimatedText';

/**
 * [0-4s] HOOK — Problème nommé
 * Fond blanc cassé. Titre centré, puis sous-titre d'appui.
 * Le logo permanent est affiché en coin sup. droit par Explainer45s.
 */
export const HookScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.cream,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 36,
          maxWidth: 900,
        }}
      >
        <AnimatedText
          delay={18}
          duration={20}
          size={80}
          weight="heavy"
          color={brand.colors.navy}
          lineHeight={1.15}
        >
          Vos tâches répétitives
          <br />
          vous épuisent&nbsp;?
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};
