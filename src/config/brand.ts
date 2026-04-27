/**
 * LTC AI — Brand configuration.
 * Palette stricte : bleu principal, bleu foncé, noir, gris foncé, blanc.
 * Toute couleur utilisée dans le projet DOIT provenir de ce fichier.
 */

export const brand = {
  colors: {
    // Bleu principal (primaire)
    navy: '#2020CC',
    // Bleu foncé (éléments sombres, accents profonds)
    navyDeep: '#1515AA',
    navySoft: '#1515AA',

    // Blanc (fond principal)
    cream: '#FFFFFF',
    creamSoft: '#FFFFFF',

    // Accent = bleu foncé (CTA, highlights)
    accent: '#1515AA',
    accentSoft: '#2020CC',

    // Gris foncé / noir (textes secondaires, contrastes)
    neutral: '#1A1A1A',
    // Dérivé semi-transparent pour bordures & placeholders doux
    neutralLight: 'rgba(26, 26, 26, 0.18)',
    neutralDark: '#000000',
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

  // Facteur de vitesse de la vidéo (1 = 100%, 0.75 = 25% plus lent)
  speedFactor: 0.75,

  // Switch pour activer/désactiver la musique de fond (public/bg-music.mp3)
  enableBackgroundMusic: false,
  backgroundMusicVolume: 0.15,
} as const;

export type BrandColors = keyof typeof brand.colors;
