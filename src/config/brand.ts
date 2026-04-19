/**
 * LTC AI — Brand configuration.
 * Palette signature LTC AI : bleu nuit, blanc cassé, accent chaleureux, gris neutre.
 * Toute couleur utilisée dans le projet DOIT provenir de ce fichier.
 */

export const brand = {
  colors: {
    // Bleu nuit LTC — primaire (fonds sombres, titres, éléments forts)
    navy: '#0A1F3D',
    navyDeep: '#071630',
    navySoft: '#1B325A',

    // Blanc cassé — fond principal clair
    cream: '#F5F1EA',
    creamSoft: '#FBF8F2',

    // Accent chaleureux — CTA, highlights, points d'intérêt
    accent: '#E8A94E',
    accentSoft: '#F0C079',

    // Gris neutre — texte secondaire, bordures discrètes (pas de noir pur)
    neutral: '#6B7380',
    neutralLight: '#AEB4BE',
    neutralDark: '#3E4656',
  },

  fonts: {
    // Typo LTC AI : sans-serif moderne, humaine, lisible
    family:
      "'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', system-ui, sans-serif",
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 800,
    },
  },

  sizes: {
    // Tailles pensées pour un canvas 1080x1350
    display: 88,
    title: 64,
    subtitle: 52,
    body: 38,
    caption: 28,
  },

  tagline: "L'IA, simplement.",
  website: 'ltcai.be',

  // Switch pour activer/désactiver la musique de fond (public/bg-music.mp3)
  enableBackgroundMusic: false,
  backgroundMusicVolume: 0.15,
} as const;

export type BrandColors = keyof typeof brand.colors;
