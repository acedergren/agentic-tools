import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { theme } from "../theme";

// Scene 2: The Core Formula
// Duration: 240 frames (8s)
export const FormulaScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 200 } });
  const line1Spring = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const minusSpring = spring({ frame: frame - 25, fps, config: { damping: 20, stiffness: 200 } });
  const line2Spring = spring({ frame: frame - 35, fps, config: { damping: 200 } });
  const line3Spring = spring({ frame: frame - 60, fps, config: { damping: 200 } });
  const warningSpring = spring({ frame: frame - 90, fps, config: { damping: 200 } });

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
        padding: "60px",
        fontFamily: theme.font.sans,
      }}
    >
      {/* Card */}
      <div
        style={{
          background: theme.surface,
          border: `1px solid ${theme.border}`,
          borderRadius: 24,
          padding: "56px 64px",
          width: "100%",
          opacity: interpolate(cardSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(cardSpring, [0, 1], [0.9, 1])})`,
        }}
      >
        {/* Label */}
        <div
          style={{
            fontSize: 16,
            color: theme.accent,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 32,
            opacity: interpolate(line1Spring, [0, 1], [0, 1]),
          }}
        >
          The formula
        </div>

        {/* Formula */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: theme.highlight,
              opacity: interpolate(line1Spring, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(line1Spring, [0, 1], [-20, 0])}px)`,
            }}
          >
            Good skill
          </span>

          <span
            style={{
              fontSize: 34,
              color: theme.muted,
              opacity: interpolate(line1Spring, [0, 1], [0, 1]),
            }}
          >
            =
          </span>

          <span
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: theme.text,
              opacity: interpolate(line2Spring, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(line2Spring, [0, 1], [20, 0])}px)`,
            }}
          >
            Expert knowledge
          </span>

          <span
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: theme.accent,
              opacity: interpolate(minusSpring, [0, 1], [0, 1]),
              transform: `scale(${interpolate(minusSpring, [0, 1], [0.5, 1])})`,
            }}
          >
            −
          </span>

          <span
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: theme.muted,
              opacity: interpolate(line3Spring, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(line3Spring, [0, 1], [20, 0])}px)`,
            }}
          >
            What Claude already knows
          </span>
        </div>

        {/* Warning line */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            borderTop: `1px solid ${theme.border}`,
            paddingTop: 32,
            opacity: interpolate(warningSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(warningSpring, [0, 1], [10, 0])}px)`,
          }}
        >
          <span style={{ fontSize: 24, flexShrink: 0 }}>⚠️</span>
          <span style={{ fontSize: 24, color: theme.muted, lineHeight: 1.5 }}>
            Write about SQL injection?{" "}
            <span style={{ color: theme.highlight }}>Wasted context.</span>
            <br />
            Write about OCI Events silently failing when IAM policy is missing?{" "}
            <span style={{ color: theme.accent }}>That's a skill.</span>
          </span>
        </div>
      </div>
    </div>
  );
};
