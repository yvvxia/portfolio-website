import { useState } from "react";

// Underlined text link that dims on hover; optional up-right arrow that nudges.
export function TextLink({ children, href = "#", arrow, style, ...rest }) {
  const [hov, setHov] = useState(false);
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        font: "var(--text-body-sm)",
        color: "#111110",
        textDecoration: "underline",
        textUnderlineOffset: 3,
        opacity: hov ? "var(--hover-opacity)" : 1,
        transition: "opacity var(--dur-fast) var(--ease-out)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
      {arrow === "up-right" ? (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            marginLeft: 6,
            transform: hov ? "translate(var(--hover-shift), calc(var(--hover-shift) * -1))" : "none",
            transition: "transform var(--dur-fast) var(--ease-out)",
          }}
        >
          ↗
        </span>
      ) : null}
    </a>
  );
}
