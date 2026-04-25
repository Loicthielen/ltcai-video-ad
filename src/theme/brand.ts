// LTC AI brand theme.
// NOTE: branding-ltcgroup skill was not available in this environment.
// Palette below is a sensible default consistent with LTC Group's
// professional / IT-consulting positioning. Replace via the skill
// when this runs in an environment that ships it.

export const brand = {
  // Primary deep navy — "ground" color of LTC identity
  navy: "#0A1628",
  navyDeep: "#050B16",
  navySoft: "#13243F",

  // Primary blue — used for energy / activation
  blue: "#2563EB",
  blueLight: "#3B82F6",
  blueGlow: "#60A5FA",

  // Accent cyan — "AI" highlight color
  cyan: "#06B6D4",
  cyanLight: "#22D3EE",

  // Accent warm — for the "+15h" climax + CTA shine
  gold: "#F59E0B",
  goldLight: "#FCD34D",

  // Neutrals
  white: "#F8FAFC",
  whiteSoft: "#E2E8F0",
  gray: "#64748B",

  // Status (chaos red)
  alert: "#EF4444",
} as const;

export const fonts = {
  display:
    "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
  body: "'Inter', -apple-system, system-ui, sans-serif",
} as const;

// Safe zones for Meta Reels/Stories at 1080x1920
export const safeZone = {
  top: 250,
  bottom: 1920 - 450,
  left: 60,
  right: 1080 - 60,
  centerY: 960,
};

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 450,
} as const;
