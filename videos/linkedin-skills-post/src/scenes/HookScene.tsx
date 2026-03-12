import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { theme } from "../theme";

// Scene 1: "I spent 3 days cleaning up 42 agent skills."
// Duration: 150 frames (5s)
export const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Spring = spring({ frame, fps, config: { damping: 200 } });
  const line2Spring = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const countSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 100 } });

  const countValue = Math.round(interpolate(countSpring, [0, 1], [0, 42]));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: theme.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
        fontFamily: theme.font.sans,
      }}
    >
      {/* Counter badge */}
      <div
        style={{
          opacity: interpolate(line1Spring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line1Spring, [0, 1], [30, 0])}px)`,
          fontSize: 140,
          fontWeight: 900,
          color: theme.accent,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {countValue}
      </div>

      <div
        style={{
          opacity: interpolate(line1Spring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line1Spring, [0, 1], [20, 0])}px)`,
          fontSize: 28,
          color: theme.muted,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 48,
        }}
      >
        agent skills
      </div>

      <div
        style={{
          opacity: interpolate(line2Spring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line2Spring, [0, 1], [20, 0])}px)`,
          fontSize: 36,
          color: theme.text,
          textAlign: "center",
          lineHeight: 1.5,
          maxWidth: 700,
        }}
      >
        I spent 3 days cleaning them up.
        <br />
        <span style={{ color: theme.muted, fontSize: 28 }}>
          Here's what actually matters.
        </span>
      </div>
    </div>
  );
};
