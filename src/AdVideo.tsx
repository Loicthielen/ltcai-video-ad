import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { Solution } from "./scenes/Solution";
import { CTA } from "./scenes/CTA";
import { AdCopy, DEFAULT_COPY, TIMING, toFrames } from "./config/brand";

// Charge la typo côté Remotion (studio + render)
loadInter();

export type AdVideoProps = {
  copy: AdCopy;
  url: string;
};

export const adVideoSchemaDefault: AdVideoProps = {
  copy: DEFAULT_COPY,
  url: "ltcai.be",
};

/**
 * Composition 15s assemblant les 4 scènes.
 * Textes entièrement pilotables par props pour A/B testing
 * directement dans Remotion Studio ou via --props en CLI.
 */
export const AdVideo: React.FC<AdVideoProps> = ({ copy, url }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F6F1E7" }}>
      <Sequence
        from={toFrames(TIMING.hook.start)}
        durationInFrames={toFrames(TIMING.hook.duration)}
        name="Hook"
      >
        <Hook text={copy.hook} />
      </Sequence>

      <Sequence
        from={toFrames(TIMING.problem.start)}
        durationInFrames={toFrames(TIMING.problem.duration)}
        name="Problem"
      >
        <Problem text={copy.problem} />
      </Sequence>

      <Sequence
        from={toFrames(TIMING.solution.start)}
        durationInFrames={toFrames(TIMING.solution.duration)}
        name="Solution"
      >
        <Solution
          mainText={copy.solutionMain}
          subText={copy.solutionSub}
        />
      </Sequence>

      <Sequence
        from={toFrames(TIMING.cta.start)}
        durationInFrames={toFrames(TIMING.cta.duration)}
        name="CTA"
      >
        <CTA
          buttonText={copy.ctaButton}
          secondaryText={copy.ctaSecondary}
          url={url}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
