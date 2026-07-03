import { useState } from "react";
import { useInView } from "../hooks/useInView.js";
import { hairline, metaStyle } from "../lib/motion.js";

// A compact "other works" list row that fades in and dims on hover.
export function OtherRow({ o, m, i }) {
  const [hov, setHov] = useState(false);
  const [ref, inView] = useInView(0.05);
  const hasHref = Boolean(o.href);
  const Tag = hasHref ? "a" : "div";

  return (
    <Tag
      ref={ref}
      {...(hasHref ? { href: o.href, target: "_blank", rel: "noreferrer" } : {})}
      className="ptf-other-row interactive"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "60px 1fr 220px 100px auto",
        gap: 24,
        padding: "14px 0",
        borderTop: hairline,
        alignItems: "baseline",
        textDecoration: "none",
        color: "#111110",
        opacity: inView ? (hov ? 0.55 : 1) : 0,
        transform: inView ? "none" : `translateY(${Math.round(m.dist * 0.6)}px)`,
        transition: `opacity ${480 * m.mult}ms var(--ease-out) ${i * Math.round(m.stagger * 0.6)}ms, transform ${480 * m.mult}ms var(--ease-out) ${i * Math.round(m.stagger * 0.6)}ms`,
        cursor: hasHref ? "pointer" : "default",
      }}
    >
      <span style={metaStyle}>{o.n}</span>
      <span style={{ font: "var(--text-body-sm)", fontWeight: 500 }}>{o.title}</span>
      <span className="ptf-other-hide" style={{ font: "var(--text-body-sm)", color: "#4a4a48" }}>
        {o.kind}
      </span>
      <span className="ptf-other-hide" style={metaStyle}>
        {o.year}
      </span>
      {hasHref ? (
        <span
          aria-hidden="true"
          style={{
            font: "var(--text-body-sm)",
            display: "inline-block",
            transform: hov ? "translate(var(--hover-shift), 0)" : "none",
            transition: "transform var(--dur-fast) var(--ease-out)",
          }}
        >
          ↗
        </span>
      ) : null}
    </Tag>
  );
}
