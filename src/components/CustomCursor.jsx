import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Custom blend-mode cursor — no external libraries.
// A white circle follows the mouse and inverts what's underneath via
// mix-blend-mode: difference. Over interactive elements it smoothly expands and
// snaps to fill them; on leave it returns to a 56px circle and resumes following.
// Disabled on touch devices and when prefers-reduced-motion is enabled.

const SIZE = 56; // free-roam diameter
const EASE_FREE = 0.16; // lerp factor while following the mouse
const EASE_SNAP = 0.2; // lerp factor while snapping to an element
const MAX_SNAP_H = 120; // don't fill elements taller than this (e.g. big project rows)
const INTERACTIVE = 'button, a, [role="button"], .interactive';

const lerp = (a, b, t) => a + (b - a) * t;

function detectEnabled() {
  if (typeof window === "undefined") return false;
  const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return !isTouch && !reduced;
}

export function CustomCursor() {
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(detectEnabled);

  // Re-evaluate if the user toggles reduced-motion mid-session.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setEnabled(detectEnabled());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add("ptf-no-cursor");

    const cur = { x: innerWidth / 2, y: innerHeight / 2, w: SIZE, h: SIZE, r: SIZE / 2 };
    const mouse = { x: cur.x, y: cur.y };
    let snapEl = null;
    let visible = false;
    let raf = 0;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };
    // Delegate hover detection: the nearest interactive ancestor becomes the target.
    const onOver = (e) => {
      snapEl = e.target && e.target.closest ? e.target.closest(INTERACTIVE) : null;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver, { passive: true });

    // Resolve where the cursor wants to be this frame.
    const targetState = () => {
      if (snapEl && document.contains(snapEl)) {
        const rect = snapEl.getBoundingClientRect();
        // Fill only reasonably sized targets; skip oversized blocks so the
        // cursor never balloons across a whole section.
        if (rect.width > 0 && rect.height > 0 && rect.height <= MAX_SNAP_H) {
          const br = parseFloat(getComputedStyle(snapEl).borderRadius) || 0;
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            w: rect.width,
            h: rect.height,
            r: br,
            snapped: true,
          };
        }
      }
      // If the snapped element left the DOM (e.g. overlay closed), release it.
      snapEl = snapEl && document.contains(snapEl) ? snapEl : null;
      return { x: mouse.x, y: mouse.y, w: SIZE, h: SIZE, r: SIZE / 2, snapped: false };
    };

    const frame = () => {
      const t = targetState();
      const ease = t.snapped ? EASE_SNAP : EASE_FREE;
      cur.x = lerp(cur.x, t.x, ease);
      cur.y = lerp(cur.y, t.y, ease);
      cur.w = lerp(cur.w, t.w, ease);
      cur.h = lerp(cur.h, t.h, ease);
      cur.r = lerp(cur.r, t.r, ease);
      dot.style.width = cur.w + "px";
      dot.style.height = cur.h + "px";
      dot.style.borderRadius = Math.min(cur.r, Math.min(cur.w, cur.h) / 2) + "px";
      dot.style.transform =
        "translate(" + (cur.x - cur.w / 2) + "px," + (cur.y - cur.h / 2) + "px)";
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("ptf-no-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;
  return createPortal(<div id="ptf-cursor" ref={dotRef} aria-hidden="true" />, document.body);
}
