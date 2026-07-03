import { useEffect, useRef, useState } from "react";

// Reveal-on-scroll: returns [ref, inView]. Uses IntersectionObserver with a
// scroll/resize/interval fallback so it still fires in edge cases.
export function useInView(threshold) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => setInView(true);
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.96 && r.bottom > 0) {
        show();
        return true;
      }
      return false;
    };
    if (check()) return;

    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && show()),
        { threshold: threshold ?? 0.12 }
      );
      io.observe(el);
    }
    const onScroll = () => check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const iv = setInterval(check, 700);
    return () => {
      if (io) io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearInterval(iv);
    };
  }, [threshold]);

  return [ref, inView];
}
