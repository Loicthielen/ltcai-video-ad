import React from 'react';
import {AbsoluteFill} from 'remotion';
import {brand} from '../config/brand';
import {AnimatedText} from '../components/AnimatedText';
import {BrandLogo} from '../components/BrandLogo';

/**
 * [0-4s] HOOK — Problème nommé
 * Fond blanc cassé. Titre centré, puis sous-titre d'appui.
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
      {/* Logo discret en haut */}
      <div
        style={{
          position: 'absolute',
          top: 70,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <BrandLogo size={48} delay={0} />
      </div>

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

        <AnimatedText
          delay={48}
          duration={18}
          size={40}
          weight="medium"
          color={brand.colors.neutralDark}
          lineHeight={1.3}
        >
          L'IA peut s'en occuper.
          <br />
          Voici comment.
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};
