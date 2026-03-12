import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { theme } from "../theme";

const dimensions = [
  { id: "D1", label: "Knowledge Delta", max: 20, key: "Most important" },
  { id: "D2", label: "Mindset + Procedures", max: 15, key: null },
  { id: "D3", label: "Anti-patterns", max: 15, key: "NEVER list" },
  { id: "D4", label: "Spec Compliance", max: 15, key: "Description!" },
  { id: "D5", label: "Progressive Disclosure", max: 15, key: null },
  { id: "D6", label: "Freedom Calibration", max: 15, key: null },
  { id: "D7", label: "Pattern Recognition", max: 10, key: null },
  { id: "D8", label: "Practical Usability", max: 15, key: null },
];

// Scene 4: skill-judge rubric
// Duration: 270 frames (9s)
export const JudgeScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 200 } });

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
        padding: "48px 60px",
        fontFamily: theme.font.sans,
        gap: 24,
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: interpolate(headerSpring, [0, 1], [0, 1]),
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <div style={{ fontSize: 20, color: theme.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
          /skill-judge
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, color: theme.text }}>
          120-point rubric. Run it before you push.
        </div>
      </div>

      {/* Score rows */}
      {dimensions.map((dim, i) => {
        const rowSpring = spring({
          frame: frame - (i * 18 + 15),
          fps,
          config: { damping: 200 },
        });
        const barSpring = spring({
          frame: frame - (i * 18 + 30),
          fps,
          config: { damping: 200 },
        });

        const barWidth = interpolate(barSpring, [0, 1], [0, dim.max / 20]);

        return (
          <div
            key={dim.id}
            style={{
              width: "100%",
              opacity: interpolate(rowSpring, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(rowSpring, [0, 1], [-20, 0])}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6 }}>
              <span
                style={{
                  fontFamily: theme.font.mono,
                  fontSize: 16,
                  color: theme.accent,
                  width: 32,
                  flexShrink: 0,
                }}
              >
                {dim.id}
              </span>
              <span style={{ fontSize: 18, color: theme.text, flex: 1 }}>
                {dim.label}
              </span>
              {dim.key && (
                <span
                  style={{
                    fontSize: 13,
                    color: dim.id === "D4" ? theme.highlight : theme.accent,
                    border: `1px solid ${dim.id === "D4" ? theme.highlight : theme.accent}`,
                    padding: "2px 10px",
                    borderRadius: 100,
                    flexShrink: 0,
                  }}
                >
                  {dim.key}
                </span>
              )}
              <span style={{ fontSize: 16, color: theme.muted, width: 40, textAlign: "right", flexShrink: 0 }}>
                {dim.max}pts
              </span>
            </div>
            {/* Bar */}
            <div
              style={{
                height: 4,
                background: theme.border,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${barWidth * 100}%`,
                  background: dim.id === "D1" ? theme.highlight : theme.accent,
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Threshold */}
      <div
        style={{
          opacity: interpolate(
            spring({ frame: frame - 160, fps, config: { damping: 200 } }),
            [0, 1],
            [0, 1]
          ),
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "#1a1500",
          border: "1px solid #3a3000",
          borderRadius: 12,
          padding: "16px 24px",
          width: "100%",
          marginTop: 4,
        }}
      >
        <span style={{ fontSize: 22 }}>📏</span>
        <span style={{ fontSize: 20, color: "#ffd700" }}>
          Below <strong>84/120</strong> — don't publish. Fix D1 and D4 first.
        </span>
      </div>
    </div>
  );
};
