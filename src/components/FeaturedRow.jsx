import { useState } from "react";
import { useInView } from "../hooks/useInView.js";
import { hairline, metaStyle } from "../lib/motion.js";
import { ImagePlaceholder } from "./ImagePlaceholder.jsx";

// A featured project row: image wipes open from its outer edge, a ghost numeral
// drifts behind it, and the text cascades in after. Alternates side per `reverse`.
export function FeaturedRow({ p, s, m, onOpen, i }) {
  const [hov, setHov] = useState(false);
  const [ref, inView] = useInView(0.08);
  const base = i * m.stagger;
  const wipeFrom = p.reverse ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
  const ghostSide = p.reverse ? "left" : "right";
  const ghostShift = p.reverse ? "-1.05em" : "1.05em";

  const img = (
    <span style={{ display: "block", aspectRatio: "16/10", position: "relative" }}>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          [ghostSide]: "0.04em",
          transform: hov ? `translateY(-50%) translateX(${ghostShift})` : "translateY(-50%) translateX(0)",
          font: "var(--text-index)",
          fontSize: "9vw",
          letterSpacing: "-0.03em",
          color: "#e2e1dd",
          transition: `transform ${760 * m.mult}ms var(--ease-out)`,
          zIndex: 0,
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "block",
          width: "100%",
          height: "100%",
          border: hairline,
          overflow: "hidden",
          clipPath: inView ? "inset(0 0 0 0)" : wipeFrom,
          transition: `clip-path ${880 * m.mult}ms var(--ease-out) ${base + 120}ms`,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            transform: hov ? "scale(1.05)" : inView ? "scale(1)" : "scale(1.08)",
            transition: `transform ${hov ? 640 : 1100 * m.mult}ms var(--ease-out) ${hov ? 0 : base + 120}ms`,
          }}
        >
          <ImagePlaceholder
            src={p.cover}
            alt={p.title}
            label={s.imgType + ": " + p.kind + " — 16:10"}
            style={{ height: "100%" }}
          />
        </span>
      </span>
    </span>
  );

  const cascade = (order) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : `translateY(${Math.round(m.dist * 0.7)}px)`,
    transition: `opacity ${520 * m.mult}ms var(--ease-out) ${base + 200 + order * Math.round(m.stagger * 0.7)}ms, transform ${520 * m.mult}ms var(--ease-out) ${base + 200 + order * Math.round(m.stagger * 0.7)}ms`,
  });

  const text = (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minWidth: 0,
        textAlign: "left",
        position: "relative",
        zIndex: 1,
      }}
    >
      <span
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
          ...cascade(0),
        }}
      >
        <span style={metaStyle}>{p.index}</span>
        <span
          aria-hidden="true"
          style={{
            font: "var(--text-h2)",
            display: "inline-block",
            transform: hov ? "translate(var(--hover-shift), calc(var(--hover-shift) * -1))" : "none",
            transition: "transform var(--dur-fast) var(--ease-out)",
          }}
        >
          ↗
        </span>
      </span>
      <span style={{ display: "block", overflow: "visible", ...cascade(1) }}>
        <span
          style={{
            display: "inline-block",
            font: "var(--text-h1)",
            letterSpacing: "var(--tracking-h1)",
            color: "#111110",
            transition: `color ${Math.round(360 * m.mult)}ms var(--ease-out)`,
          }}
        >
          {p.title}
        </span>
      </span>
      <span style={{ font: "var(--text-body-md)", color: "#4a4a48", ...cascade(2) }}>{p.blurb}</span>
      <span style={{ ...cascade(2), display: "block" }}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(p);
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            borderRadius: 999,
            border: "1px solid #111110",
            background: "transparent",
            font: "var(--text-body-sm)",
            color: "#111110",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {s.csOpen} →
        </button>
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: "auto", ...cascade(3) }}>
        <span style={metaStyle}>
          {s.lblType}: <span style={{ color: "#4a4a48" }}>{p.kind}</span>
        </span>
        <span style={metaStyle}>
          {s.lblRole}: <span style={{ color: "#4a4a48" }}>{p.role}</span>
        </span>
        <span style={metaStyle}>
          {s.lblYear}: <span style={{ color: "#4a4a48" }}>{p.year}</span>
        </span>
      </span>
    </span>
  );

  return (
    <div
      ref={ref}
      className="ptf-featured-row"
      onClick={() => onOpen(p)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(p);
        }
      }}
      style={{
        display: "grid",
        gridTemplateColumns: p.reverse ? "1fr 2fr" : "2fr 1fr",
        gap: 24,
        alignItems: "stretch",
        padding: "32px 0",
        borderTop: hairline,
        textDecoration: "none",
        color: "#111110",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {p.reverse ? text : img}
      {p.reverse ? img : text}
    </div>
  );
}
