/**
 * Identité visuelle LTC AI — constantes centralisées.
 * Toute modif visuelle passe par ici pour garder la cohérence.
 */

export const COLORS = {
  // Bleu nuit profond — sérieux, professionnel
  deepBlue: "#0E1B3A",
  deepBlueSoft: "#1B2A4E",
  // Blanc cassé — aéré, lisible
  offWhite: "#F6F1E7",
  offWhiteBright: "#FBF7EE",
  // Accent chaleureux — humain, invitant
  warmAccent: "#E8A87C",
  warmAccentDeep: "#D98B5F",
  // Neutres
  ink: "#0B0F1A",
  muted: "#6B7280",
  // Problem / solution ambiances
  problemBg: "#ECE6DA",
  solutionBg: "#F6F1E7",
} as const;

export const FONTS = {
  // Inter chargé via @remotion/google-fonts dans AnimatedText / scènes
  family: "Inter, 'DM Sans', system-ui, -apple-system, sans-serif",
  weightRegular: 400,
  weightMedium: 500,
  weightSemibold: 600,
  weightBold: 700,
} as const;

export const TAGLINE = "L'IA, simplement.";
export const BRAND_NAME = "LTC AI";
export const BRAND_URL = "ltcai.be";

/** Durée totale et découpage des scènes (en secondes). */
export const TIMING = {
  fps: 30,
  totalSeconds: 15,
  hook: { start: 0, duration: 3 },
  problem: { start: 3, duration: 4 },
  solution: { start: 7, duration: 4 },
  cta: { start: 11, duration: 4 },
} as const;

export const toFrames = (seconds: number) =>
  Math.round(seconds * TIMING.fps);

/** Dimensions par format — préparées pour ajouter 9:16 plus tard sans toucher aux scènes. */
export const DIMENSIONS = {
  feed4x5: { width: 1080, height: 1350 },
  reels9x16: { width: 1080, height: 1920 },
} as const;

/** Textes éditables par défaut (pour variantes A/B). */
export const DEFAULT_COPY = {
  hook: "Vos emails, devis, relances… vous épuisent ?",
  problem: "Vous passez vos soirées à rattraper le retard.",
  solutionMain: "Et si l'IA s'en occupait à votre place ?",
  solutionSub: "Simple, accessible, fait pour les PME.",
  ctaButton: "Réservez votre audit gratuit",
  ctaSecondary: "30 minutes. Sans engagement.",
} as const;

export type AdCopy = typeof DEFAULT_COPY;
