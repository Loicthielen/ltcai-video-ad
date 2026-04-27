import React from 'react';

type Props = {
  /** Offset en px (appliqué en +/- sur les canaux R et B). */
  offset: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * Aberration chromatique : 3 copies du contenu, décalées horizontalement,
 * fondues via mix-blend-mode: screen. Simule un RGB split "impact".
 * À n'utiliser que sur de courtes fenêtres (cher en rendu).
 */
export const ChromaticAberration: React.FC<Props> = ({offset, children, style}) => {
  if (Math.abs(offset) < 0.3) {
    return <div style={style}>{children}</div>;
  }
  return (
    <div style={{position: 'relative', ...style}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${-offset}px)`,
          filter: 'url(#chroma-r)',
          mixBlendMode: 'screen',
        }}
      >
        <svg width={0} height={0} style={{position: 'absolute'}}>
          <filter id="chroma-r">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            />
          </filter>
        </svg>
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${offset}px)`,
          filter: 'url(#chroma-b)',
          mixBlendMode: 'screen',
        }}
      >
        <svg width={0} height={0} style={{position: 'absolute'}}>
          <filter id="chroma-b">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </svg>
        {children}
      </div>
      <div style={{position: 'relative'}}>{children}</div>
    </div>
  );
};
