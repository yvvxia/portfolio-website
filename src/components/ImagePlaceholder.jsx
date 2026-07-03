import { metaStyle } from "../lib/motion.js";

// Styled placeholder standing in for a real image. Drop an <img> in its place
// (or pass `src`) once you have artwork — keep the same wrapper aspect ratio.
export function ImagePlaceholder({ label, src, alt = "", aspectRatio, style }) {
  const box = {
    width: "100%",
    height: "100%",
    display: "block",
    background: "#e2e1dd",
    ...(aspectRatio ? { aspectRatio } : {}),
    ...style,
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ ...box, objectFit: "cover" }}
      />
    );
  }

  return (
    <span style={{ ...box, position: "relative", overflow: "hidden" }} aria-hidden="true">
      {label ? (
        <span
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            ...metaStyle,
            color: "#8a8985",
          }}
        >
          {label}
        </span>
      ) : null}
      {/* faint diagonal to read clearly as a placeholder, not a broken image */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 22px, rgba(17,17,16,0.03) 22px 23px)",
        }}
      />
    </span>
  );
}
