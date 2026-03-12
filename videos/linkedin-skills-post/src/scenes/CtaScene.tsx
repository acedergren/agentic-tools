import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { theme } from "../theme";

// Scene 6: CTA
// Duration: 150 frames (5s)
export const CtaScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const countSpring = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const line1Spring = spring({ frame: frame - 15, fps, config: { damping: 200 } });
  const line2Spring = spring({ frame: frame - 35, fps, config: { damping: 200 } });
  const linkSpring = spring({ frame: frame - 60, fps, config: { damping: 200 } });
  const questionSpring = spring({ frame: frame - 90, fps, config: { damping: 200 } });

  const countValue = Math.round(interpolate(countSpring, [0, 1], [0, 44]));

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
        gap: 24,
      }}
    >
      <div
        style={{
          opacity: interpolate(line1Spring, [0, 1], [0, 1]),
          fontSize: 26,
          color: theme.muted,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
        }}
      >
        Available now
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          opacity: interpolate(line1Spring, [0, 1], [0, 1]),
        }}
      >
        <span style={{ fontSize: 120, fontWeight: 900, color: theme.accent, lineHeight: 1 }}>
          {countValue}
        </span>
        <span style={{ fontSize: 36, color: theme.muted }}>skills</span>
      </div>

      <div
        style={{
          opacity: interpolate(line2Spring, [0, 1], [0, 1]),
          fontSize: 26,
          color: theme.text,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        OCI · Orchestration · TDD · Svelte · Stitch
        <br />
        <span style={{ color: theme.muted }}>All evaluated. All useful.</span>
      </div>

      <div
        style={{
          opacity: interpolate(linkSpring, [0, 1], [0, 1]),
          background: theme.surface,
          border: `1px solid ${theme.border}`,
          borderRadius: 12,
          padding: "16px 32px",
          fontFamily: theme.font.mono,
          fontSize: 22,
          color: theme.accent,
        }}
      >
        github.com/acedergren/agentic-tools
      </div>

      <div
        style={{
          opacity: interpolate(questionSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(questionSpring, [0, 1], [15, 0])}px)`,
          fontSize: 26,
          color: theme.text,
          textAlign: "center",
          marginTop: 16,
        }}
      >
        What domains are you missing skills for?
      </div>
    </div>
  );
};
