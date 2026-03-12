import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { theme } from "../theme";

const commands = [
  { prompt: "$ ", cmd: "npx skills find oracle cloud" },
  { prompt: "$ ", cmd: "npx skills add acedergren/agentic-tools@oci-events -g -y" },
  { prompt: "$ ", cmd: "npx skills add acedergren/agentic-tools -l" },
];

// Scene 5: Install commands
// Duration: 210 frames (7s)
export const InstallScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 200 } });
  const terminalSpring = spring({ frame: frame - 20, fps, config: { damping: 200 } });

  // Stagger typewriter per command
  const getTypedCommand = (index: number) => {
    const startFrame = 35 + index * 50;
    const progress = interpolate(
      frame,
      [startFrame, startFrame + 40],
      [0, commands[index].cmd.length],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    );
    return commands[index].cmd.slice(0, Math.floor(progress));
  };

  const noteSpring = spring({ frame: frame - 160, fps, config: { damping: 200 } });

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
          GitHub IS the registry.
        </div>
        <div style={{ fontSize: 22, color: theme.muted }}>
          Push = publish. No npm account. No deploy command.
        </div>
      </div>

      {/* Terminal */}
      <div
        style={{
          width: "100%",
          background: "#0a0e1a",
          border: `1px solid ${theme.border}`,
          borderRadius: 16,
          overflow: "hidden",
          opacity: interpolate(terminalSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(terminalSpring, [0, 1], [0.95, 1])})`,
        }}
      >
        {/* Terminal header */}
        <div
          style={{
            background: "#1a1a2a",
            padding: "12px 20px",
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
          ))}
          <span style={{ marginLeft: 8, fontSize: 14, color: theme.muted }}>bash</span>
        </div>

        {/* Commands */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          {commands.map((cmd, i) => {
            const lineVisible = frame > 35 + i * 50 - 5;
            return (
              <div
                key={i}
                style={{
                  fontFamily: theme.font.mono,
                  fontSize: 20,
                  opacity: lineVisible ? 1 : 0,
                }}
              >
                <span style={{ color: theme.accent }}>{cmd.prompt}</span>
                <span style={{ color: theme.code.fg }}>{getTypedCommand(i)}</span>
                {/* cursor only on active line */}
                {frame > 35 + i * 50 &&
                  frame < 35 + (i + 1) * 50 && (
                    <span
                      style={{
                        opacity: Math.floor(frame / 10) % 2 === 0 ? 1 : 0,
                        color: theme.accent,
                      }}
                    >
                      ▋
                    </span>
                  )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Note */}
      <div
        style={{
          opacity: interpolate(noteSpring, [0, 1], [0, 1]),
          fontSize: 20,
          color: theme.muted,
          textAlign: "center",
        }}
      >
        Use{" "}
        <span style={{ color: theme.accent, fontFamily: theme.font.mono }}>-g</span>
        {" "}to install globally.{" "}
        Without it, the skill goes into{" "}
        <span style={{ color: theme.highlight }}>node_modules</span>
        {" "}and stays invisible.
      </div>
    </div>
  );
};
