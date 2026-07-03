import { useEffect, useState } from "react";
import { hairline, metaStyle, eyebrowStyle, PAD } from "../lib/motion.js";
import { ImagePlaceholder } from "./ImagePlaceholder.jsx";

// Full-screen case-study overlay. Fades/lifts in, closes on Escape or the close
// link, and locks body scroll while open.
export function CaseStudy({ p, s, m, onClose }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShown(true));
    const close = () => {
      setShown(false);
      setTimeout(onClose, 380 * m.mult);
    };
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [m.mult, onClose]);

  const close = () => {
    setShown(false);
    setTimeout(onClose, 380 * m.mult);
  };

  if (!p) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "#f1f0ee",
        overflowY: "auto",
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(6vh)",
        transition: `opacity ${420 * m.mult}ms var(--ease-out), transform ${420 * m.mult}ms var(--ease-out)`,
      }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: `0 ${PAD} 96px` }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "20px 0",
            borderBottom: hairline,
            position: "sticky",
            top: 0,
            background: "#f1f0ee",
            zIndex: 2,
          }}
        >
          <span style={metaStyle}>{p.index}</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
            style={{
              font: "var(--text-body-sm)",
              color: "#111110",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            {s.csClose} ✕
          </a>
        </div>

        <h1
          style={{
            font: "var(--text-display)",
            letterSpacing: "var(--tracking-display)",
            margin: "48px 0 0",
          }}
        >
          {p.title}
        </h1>

        <div style={{ display: "flex", gap: 40, marginTop: 24, flexWrap: "wrap" }}>
          <span style={metaStyle}>
            {s.lblType}: <span style={{ color: "#4a4a48" }}>{p.kind}</span>
          </span>
          <span style={metaStyle}>
            {s.lblRole}: <span style={{ color: "#4a4a48" }}>{p.role}</span>
          </span>
          <span style={metaStyle}>
            {s.lblYear}: <span style={{ color: "#4a4a48" }}>{p.year}</span>
          </span>
        </div>

        <div style={{ marginTop: 48, border: hairline }}>
          <ImagePlaceholder label="Case study hero — 21:9" aspectRatio="21/9" />
        </div>

        {[
          ["csOverview", "overview"],
          ["csProcess", "process"],
          ["csOutcome", "outcome"],
        ].map(([lbl, key], idx) => (
          <div
            key={key}
            className="ptf-cs-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: 24,
              marginTop: 64,
              borderTop: hairline,
              paddingTop: 24,
            }}
          >
            <span style={eyebrowStyle}>
              ({String(idx + 1).padStart(2, "0")}) {s[lbl]}
            </span>
            <p style={{ font: "var(--text-body-md)", color: "#4a4a48", margin: 0, maxWidth: 620 }}>
              {p[key]}
            </p>
          </div>
        ))}

        <div
          className="ptf-cs-2col"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 64 }}
        >
          <div style={{ border: hairline }}>
            <ImagePlaceholder label="Detail image — 4:3" aspectRatio="4/3" />
          </div>
          <div style={{ border: hairline }}>
            <ImagePlaceholder label="Detail image — 4:3" aspectRatio="4/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
