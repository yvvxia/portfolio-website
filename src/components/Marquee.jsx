import { hairline } from "../lib/motion.js";

// Infinite horizontal marquee. Two identical tracks translate -50% for a seamless loop.
export function Marquee({ text, accent, m }) {
  const run = text.repeat(4);
  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        background: accent ? "var(--accent, #6c7bff)" : "transparent",
        borderTop: hairline,
        borderBottom: hairline,
        color: "#111110",
        padding: "18px 0",
      }}
    >
      <div
        className="ptf-marquee-track"
        style={{
          display: "inline-block",
          animation: `ptf-marquee ${Math.round(28 / m.mult)}s linear infinite`,
        }}
      >
        <span style={{ font: "var(--text-h2)", letterSpacing: "var(--tracking-h2)" }}>{run}</span>
        <span style={{ font: "var(--text-h2)", letterSpacing: "var(--tracking-h2)" }}>{run}</span>
      </div>
    </div>
  );
}
