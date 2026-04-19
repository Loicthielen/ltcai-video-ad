import React from "react";
import { Composition } from "remotion";
import { AdVideo, adVideoSchemaDefault } from "./AdVideo";
import { DIMENSIONS, TIMING } from "./config/brand";

const durationInFrames = TIMING.totalSeconds * TIMING.fps; // 450

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Composition principale — Facebook Feed 4:5 */}
      <Composition
        id="LTCAi-Feed-4x5"
        component={AdVideo}
        durationInFrames={durationInFrames}
        fps={TIMING.fps}
        width={DIMENSIONS.feed4x5.width}
        height={DIMENSIONS.feed4x5.height}
        defaultProps={adVideoSchemaDefault}
      />

      {/* Variante préparée — Stories / Reels 9:16.
          Mêmes scènes, mêmes props, seule la dimension change. */}
      <Composition
        id="LTCAi-Reels-9x16"
        component={AdVideo}
        durationInFrames={durationInFrames}
        fps={TIMING.fps}
        width={DIMENSIONS.reels9x16.width}
        height={DIMENSIONS.reels9x16.height}
        defaultProps={adVideoSchemaDefault}
      />
    </>
  );
};
