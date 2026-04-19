import React from 'react';
import {brand} from '../config/brand';

type Props = {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  title?: string;
  style?: React.CSSProperties;
};

/**
 * Cadre écran stylisé façon "fenêtre applicative" minimaliste,
 * aux couleurs LTC.
 */
export const MockupFrame: React.FC<Props> = ({
  children,
  width = 720,
  height = 460,
  title,
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: brand.colors.creamSoft,
        borderRadius: 20,
        border: `2px solid ${brand.colors.neutralLight}`,
        boxShadow: '0 20px 60px rgba(7, 22, 48, 0.18)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Barre de titre façon macOS sobre */}
      <div
        style={{
          height: 36,
          backgroundColor: brand.colors.navy,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 8,
        }}
      >
        <Dot />
        <Dot />
        <Dot />
        {title ? (
          <div
            style={{
              marginLeft: 16,
              color: brand.colors.cream,
              fontFamily: brand.fonts.family,
              fontWeight: brand.fonts.weights.medium,
              fontSize: 18,
              letterSpacing: 0.3,
            }}
          >
            {title}
          </div>
        ) : null}
      </div>

      <div style={{flex: 1, padding: 28, position: 'relative'}}>
        {children}
      </div>
    </div>
  );
};

const Dot: React.FC = () => (
  <div
    style={{
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: brand.colors.neutralLight,
      opacity: 0.5,
    }}
  />
);
