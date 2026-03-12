import { Composition } from "remotion";
import { SkillsVideo } from "./SkillsVideo";

// LinkedIn square format: 1080x1080, 30fps, ~40s = 1200 frames
export const Root = () => {
  return (
    <Composition
      id="SkillsVideo"
      component={SkillsVideo}
      durationInFrames={1200}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
