import { Series, useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";
import { HookScene } from "./scenes/HookScene";
import { FormulaScene } from "./scenes/FormulaScene";
import { DescriptionScene } from "./scenes/DescriptionScene";
import { JudgeScene } from "./scenes/JudgeScene";
import { InstallScene } from "./scenes/InstallScene";
import { CtaScene } from "./scenes/CtaScene";
import { theme } from "./theme";

// Scene durations in frames @ 30fps
const SCENES = {
  hook: 150,        // 5s
  formula: 240,     // 8s
  description: 240, // 8s
  judge: 270,       // 9s
  install: 210,     // 7s
  cta: 150,         // 5s
  // Total: 1260 frames / 42s
};

// Slide counter overlay
const SlideCounter = ({ current, total }: { current: number; total: number }) => (
  <div
    style={{
      position: "absolute",
      bottom: 32,
      right: 40,
      fontFamily: theme.font.mono,
      fontSize: 16,
      color: theme.muted,
      opacity: 0.6,
    }}
  >
    {current}/{total}
  </div>
);

// Fade transition wrapper
const FadeSlide = ({ children, slideNum }: { children: React.ReactNode; slideNum: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(
    spring({ frame, fps, config: { damping: 200 } }),
    [0, 1],
    [0, 1]
  );

  return (
    <AbsoluteFill>
      <div style={{ width: "100%", height: "100%", opacity: fadeIn }}>
        {children}
      </div>
      <SlideCounter current={slideNum} total={6} />
    </AbsoluteFill>
  );
};

export const SkillsVideo = () => {
  return (
    <AbsoluteFill style={{ background: theme.bg }}>
      <Series>
        <Series.Sequence durationInFrames={SCENES.hook} offset={0}>
          <FadeSlide slideNum={1}>
            <HookScene />
          </FadeSlide>
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENES.formula} offset={-10}>
          <FadeSlide slideNum={2}>
            <FormulaScene />
          </FadeSlide>
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENES.description} offset={-10}>
          <FadeSlide slideNum={3}>
            <DescriptionScene />
          </FadeSlide>
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENES.judge} offset={-10}>
          <FadeSlide slideNum={4}>
            <JudgeScene />
          </FadeSlide>
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENES.install} offset={-10}>
          <FadeSlide slideNum={5}>
            <InstallScene />
          </FadeSlide>
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENES.cta} offset={-10}>
          <FadeSlide slideNum={6}>
            <CtaScene />
          </FadeSlide>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
