// LTC AI brand theme — v2 sober palette.
// NOTE: branding-ltcgroup skill not available in this environment.
// Palette restricted to LTC-typical blues + neutrals only.
// No gold, no orange, no red, no green.
// Single source of truth for every color used in the ad.

export const brand = {
  // Primary deep tones (backgrounds)
  navyDeep: "#050B16",
  navy: "#0A1628",
  navySoft: "#13243F",
  navyMid: "#1A2F52",

  // Primary blues (energy / activation)
  blue: "#2563EB",
  blueLight: "#3B82F6",
  blueGlow: "#60A5FA",

  // Accent cyan (highlight only — used sparingly)
  cyan: "#06B6D4",
  cyanLight: "#22D3EE",
  cyanSoft: "#67E8F9",

  // Neutrals
  white: "#F8FAFC",
  whiteSoft: "#E2E8F0",
  whiteMute: "#CBD5E1",
  gray: "#94A3B8",
  graySoft: "#64748B",
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
