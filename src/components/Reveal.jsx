import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView.js";

// Fades + lifts children into place when scrolled into view.
export function Reveal({ children, delay = 0, m, as = "div", style, threshold }) {
  const [ref, inView] = useInView(threshold);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className="ptf-reveal"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${m.dist}px)`,
        transition: `opacity ${560 * m.mult}ms var(--ease-out) ${delay}ms, transform ${560 * m.mult}ms var(--ease-out) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// Hairline that draws itself in from the left.
export function RuleDraw({ m }) {
  const [ref, inView] = useInView(0.01);
  return (
    <div
      ref={ref}
      style={{
        height: 1,
        background: "#d8d7d3",
        transformOrigin: "left",
        transform: inView ? "scaleX(1)" : "scaleX(0)",
        transition: `transform ${900 * m.mult}ms var(--ease-out)`,
      }}
    />
  );
}

// Masked line for the hero headline stagger — text slides up from a clip.
export function HeroLine({ children, delay, m, align }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, []);
  return (
    <span style={{ display: "block", overflow: "hidden", textAlign: align }}>
      <span
        className="ptf-line"
        style={{
          display: "block",
          transform: shown ? "none" : "translateY(110%)",
          transition: `transform ${820 * m.mult}ms var(--ease-out) ${delay}ms`,
        }}
      >
        {children}
      </span>
    </span>
  );
}
