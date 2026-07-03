// Motion presets and shared inline-style helpers.

export const PTF_MOTION = {
  subtle: { mult: 0.6, dist: 12, stagger: 60 },
  medium: { mult: 1, dist: 28, stagger: 110 },
  bold: { mult: 1.5, dist: 48, stagger: 170 },
};

export const PAD = "clamp(20px,4vw,64px)";
export const hairline = "1px solid #d8d7d3";

export const metaStyle = {
  font: "var(--text-meta)",
  letterSpacing: "var(--tracking-meta)",
  color: "#8a8985",
};

export const eyebrowStyle = {
  font: "var(--text-eyebrow)",
  letterSpacing: "var(--tracking-eyebrow)",
  textTransform: "uppercase",
  color: "#4a4a48",
};
