import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { theme } from "../theme";

const BAD_DESC = 'description: "Helps with document tasks"';
const GOOD_DESC = `description: "Use when editing .docx files,
  working with tracked changes,
  or extracting Word document text.
  Keywords: .docx, Word, redlining."`;

// Scene 3: Description field is everything
// Duration: 240 frames (8s)
export const DescriptionScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 200 } });
  const badBoxSpring = spring({ frame: frame - 15, fps, config: { damping: 200 } });
  const badLabelSpring = spring({ frame: frame - 25, fps, config: { damping: 200 } });
  const goodBoxSpring = spring({ frame: frame - 55, fps, config: { damping: 200 } });
  const goodLabelSpring = spring({ frame: frame - 65, fps, config: { damping: 200 } });
  const captionSpring = spring({ frame: frame - 100, fps, config: { damping: 200 } });

  // Typewriter for good description
  const typewriterProgress = interpolate(
    frame,
    [65, 140],
    [0, GOOD_DESC.length],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const visibleGoodDesc = GOOD_DESC.slice(0, Math.floor(typewriterProgress));

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
        gap: 32,
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: interpolate(headerSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 800, color: theme.text, marginBottom: 8 }}>
          The description field is your only pitch.
        </div>
        <div style={{ fontSize: 22, color: theme.muted }}>
          The agent reads nothing else before deciding to load.
        </div>
      </div>

      {/* Bad example */}
      <div
        style={{
          width: "100%",
          opacity: interpolate(badBoxSpring, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(badBoxSpring, [0, 1], [-30, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
            opacity: interpolate(badLabelSpring, [0, 1], [0, 1]),
          }}
        >
          <span style={{ fontSize: 22, color: "#ff4444" }}>✗</span>
          <span style={{ fontSize: 18, color: "#ff4444", fontWeight: 600 }}>Never triggers</span>
        </div>
        <div
          style={{
            background: "#1a0a0a",
            border: "1px solid #3a1a1a",
            borderRadius: 12,
            padding: "20px 24px",
            fontFamily: theme.font.mono,
            fontSize: 20,
            color: "#ff8888",
          }}
        >
          {BAD_DESC}
        </div>
      </div>

      {/* Good example */}
      <div
        style={{
          width: "100%",
          opacity: interpolate(goodBoxSpring, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(goodBoxSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
            opacity: interpolate(goodLabelSpring, [0, 1], [0, 1]),
          }}
        >
          <span style={{ fontSize: 22, color: theme.accent }}>✓</span>
          <span style={{ fontSize: 18, color: theme.accent, fontWeight: 600 }}>Triggers correctly</span>
        </div>
        <div
          style={{
            background: theme.code.bg,
            border: `1px solid ${theme.border}`,
            borderRadius: 12,
            padding: "20px 24px",
            fontFamily: theme.font.mono,
            fontSize: 19,
            color: theme.code.string,
            whiteSpace: "pre",
            lineHeight: 1.6,
          }}
        >
          {visibleGoodDesc}
          {/* blinking cursor */}
          <span
            style={{
              opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0,
              color: theme.accent,
            }}
          >
            |
          </span>
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          opacity: interpolate(captionSpring, [0, 1], [0, 1]),
          fontSize: 20,
          color: theme.muted,
          textAlign: "center",
        }}
      >
        Body content is{" "}
        <span style={{ color: theme.highlight, fontWeight: 700 }}>invisible</span>{" "}
        at trigger time. Everything goes in the description.
      </div>
    </div>
  );
};
