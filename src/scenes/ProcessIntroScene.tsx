import React from 'react';
import {AbsoluteFill} from 'remotion';
import {brand} from '../config/brand';
import {AnimatedText} from '../components/AnimatedText';
import {StepCard} from '../components/StepCard';

/**
 * [4-10s] LE PROCESSUS LTC — 4 étapes
 */
export const ProcessIntroScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.cream,
        padding: '110px 60px 380px 60px',
        gap: 22,
      }}
    >
      <AnimatedText
        delay={4}
        duration={16}
        size={56}
        weight="heavy"
        color={brand.colors.navy}
        align="center"
      >
        Notre méthode
      </AnimatedText>

      <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        <StepCard
          index={1}
          icon="loupe"
          title="AUDIT"
          description="On analyse votre entreprise"
          delay={22}
        />
        <StepCard
          index={2}
          icon="bulb"
          title="RECOMMANDATIONS"
          description="On identifie vos priorités"
          delay={40}
        />
        <StepCard
          index={3}
          icon="gear"
          title="IMPLÉMENTATION"
          description="On met en place les outils"
          delay={58}
        />
        <StepCard
          index={4}
          icon="growth"
          title="SUIVI"
          description="On vous accompagne"
          delay={76}
        />
      </div>
    </AbsoluteFill>
  );
};
