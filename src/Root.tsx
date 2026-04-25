import React from "react";
import { Composition } from "remotion";
import { LTCAIAdAudit15s } from "./compositions/LTCAIAdAudit15s";
import { VIDEO } from "./theme/brand";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="LTCAIAdAudit15s"
        component={LTCAIAdAudit15s}
        durationInFrames={VIDEO.durationInFrames}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
    </>
  );
};
