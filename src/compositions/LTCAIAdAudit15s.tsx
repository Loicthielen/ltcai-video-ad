import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Scene1Chaos } from "../scenes/Scene1Chaos";
import { Scene2Bascule } from "../scenes/Scene2Bascule";
import { Scene3Liberation } from "../scenes/Scene3Liberation";
import { Scene4CTA } from "../scenes/Scene4CTA";
import { GrainOverlay } from "../components/GrainOverlay";
import { brand } from "../theme/brand";

// Sequence layout
//   Scene 1 (Chaos)          : 0   – 132   (overlap with bascule)
//   Scene 2 (Bascule)        : 120 – 192   (overlap with liberation)
//   Scene 3 (Libération)     : 180 – 336   (overlap with CTA)
//   Scene 4 (CTA)            : 330 – 450
// Cross-fades on overlaps for smooth match-cuts.

const FADE = 12; // frames overlap

export const LTCAIAdAudit15s: React.FC = () => {
  const frame = useCurrentFrame();

  // Compute alpha for each scene based on current frame for cross-fade
  const a1 = fadeAlpha(frame, 0, 132, FADE);
  const a2 = fadeAlpha(frame, 120, 192, FADE);
  const a3 = fadeAlpha(frame, 180, 336, FADE);
  const a4 = fadeAlpha(frame, 330, 450, FADE);

  return (
    <AbsoluteFill style={{ backgroundColor: brand.navyDeep }}>
      {a1 > 0 && (
        <Sequence from={0} durationInFrames={132}>
          <AbsoluteFill style={{ opacity: a1 }}>
            <Scene1Chaos />
          </AbsoluteFill>
        </Sequence>
      )}
      {a2 > 0 && (
        <Sequence from={120} durationInFrames={72}>
          <AbsoluteFill style={{ opacity: a2 }}>
            <Scene2Bascule />
          </AbsoluteFill>
        </Sequence>
      )}
      {a3 > 0 && (
        <Sequence from={180} durationInFrames={156}>
          <AbsoluteFill style={{ opacity: a3 }}>
            <Scene3Liberation />
          </AbsoluteFill>
        </Sequence>
      )}
      {a4 > 0 && (
        <Sequence from={330} durationInFrames={120}>
          <AbsoluteFill style={{ opacity: a4 }}>
            <Scene4CTA />
          </AbsoluteFill>
        </Sequence>
      )}

      {/* Grain overlay - persistent across all scenes */}
      <GrainOverlay intensity={0.04} />

      {/*
        Voiceover (currently a 15s silent placeholder - production VO TBD).
        Background music intentionally omitted (asset not available).
      */}
      <Audio src={staticFile("voiceover.mp3")} volume={1} />
    </AbsoluteFill>
  );
};

function fadeAlpha(
  frame: number,
  start: number,
  end: number,
  fade: number,
): number {
  if (frame < start - 1) return 0;
  if (frame > end) return 0;
  const inA = interpolate(frame, [start, start + fade], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outA = interpolate(frame, [end - fade, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(inA, outA);
}
