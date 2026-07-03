import { useCallback, useState } from "react";
import { PORTFOLIO_CONTENT, EMAIL, RESUME_URL } from "./content.js";
import { PTF_MOTION, PAD, hairline, metaStyle, eyebrowStyle } from "./lib/motion.js";
import { Reveal, RuleDraw, HeroLine } from "./components/Reveal.jsx";
import { FeaturedRow } from "./components/FeaturedRow.jsx";
import { OtherRow } from "./components/OtherRow.jsx";
import { Marquee } from "./components/Marquee.jsx";
import { CaseStudy } from "./components/CaseStudy.jsx";
import { TextLink } from "./components/TextLink.jsx";
import { CustomCursor } from "./components/CustomCursor.jsx";

function NavLink({ children, target, underline, onNav }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={"#" + target}
      onClick={(e) => {
        e.preventDefault();
        onNav(target);
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        font: "var(--text-body-sm)",
        color: "#111110",
        textDecoration: underline ? "underline" : "none",
        textUnderlineOffset: 3,
        opacity: hov ? "var(--hover-opacity)" : 1,
        transition: "opacity var(--dur-fast) var(--ease-out)",
      }}
    >
      {children}
    </a>
  );
}

// Motion intensity is fixed for the shipped site; change to "subtle" or "bold" to taste.
const MOTION = "medium";
const ACCENT_MARQUEE = true;

export default function App() {
  const [lang, setLang] = useState("zh");
  const s = PORTFOLIO_CONTENT[lang];
  const m = PTF_MOTION[MOTION];
  const [openProject, setOpenProject] = useState(null);

  const onNav = useCallback((id) => {
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 24,
        behavior: "smooth",
      });
  }, []);

  return (
    <div
      id="top"
      lang={lang}
      style={{
        maxWidth: 1360,
        margin: "0 auto",
        background: "#f1f0ee",
        color: "#111110",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Nav */}
      <header
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 24,
          padding: `20px ${PAD}`,
          flexWrap: "wrap",
        }}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{ font: "var(--text-body-sm)", fontWeight: 600, color: "#111110", textDecoration: "none" }}
        >
          {s.name}
        </a>
        <div style={{ display: "flex", gap: 48 }} className="ptf-other-hide">
          <span style={metaStyle}>{s.metaLeft}</span>
          <span style={metaStyle}>{s.metaRight}</span>
        </div>
        <nav style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
          <NavLink target="work" onNav={onNav}>
            {s.navWork}
          </NavLink>
          <NavLink target="other" onNav={onNav}>
            {s.navOther}
          </NavLink>
          <NavLink target="contact" onNav={onNav} underline>
            {s.navContact} →
          </NavLink>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            style={{
              ...metaStyle,
              textDecoration: "none",
              border: hairline,
              background: "transparent",
              padding: "4px 8px",
              cursor: "pointer",
            }}
          >
            {s.langToggle}
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ padding: `96px ${PAD} 64px` }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <h1 style={{ font: "var(--text-display-xl)", letterSpacing: "var(--tracking-display-xl)", margin: 0 }}>
            <HeroLine m={m} delay={0}>
              {s.h1a1}
            </HeroLine>
            <HeroLine m={m} delay={m.stagger}>
              {s.h1a2}
            </HeroLine>
          </h1>
          <h1 style={{ font: "var(--text-display-xl)", letterSpacing: "var(--tracking-display-xl)", margin: 0 }}>
            <HeroLine m={m} delay={m.stagger * 2} align="right">
              {s.h1b1}
            </HeroLine>
            <HeroLine m={m} delay={m.stagger * 3} align="right">
              {s.h1b2}
            </HeroLine>
          </h1>
        </div>
        <div
          className="ptf-hero-grid"
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 24, marginTop: 96, alignItems: "start" }}
        >
          <Reveal m={m} delay={m.stagger * 2}>
            <span style={eyebrowStyle}>{s.aboutTag}</span>
            <p style={{ font: "var(--text-h2)", letterSpacing: "var(--tracking-h2)", margin: "16px 0 0", maxWidth: 560 }}>
              {s.aboutLead}
            </p>
            <p style={{ font: "var(--text-body-md)", color: "#4a4a48", margin: "16px 0 0", maxWidth: 480 }}>
              {s.aboutBody}
            </p>
          </Reveal>
          <Reveal m={m} delay={m.stagger * 3} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={eyebrowStyle}>{s.profilesTag}</span>
            {s.profiles.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                style={{ ...metaStyle, color: "#4a4a48", textDecoration: "none" }}
              >
                ↗ {p.label}
              </a>
            ))}
          </Reveal>
          <Reveal m={m} delay={m.stagger * 4} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={eyebrowStyle}>{s.currentlyTag}</span>
            {s.currently.map((c, i) => (
              <span key={i} style={metaStyle}>
                {c.label}: <span style={{ color: "#4a4a48" }}>{c.value}</span>
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Featured works */}
      <section id="work" style={{ padding: `0 ${PAD} 128px` }}>
        <RuleDraw m={m} />
        <Reveal
          m={m}
          style={{ paddingTop: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}
        >
          <span style={{ font: "var(--text-index)", letterSpacing: "-0.03em" }}>1</span>
          <span style={{ ...eyebrowStyle, color: "#8a8985" }}>{s.workEyebrow}</span>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 32 }}>
          {s.featured.map((p, i) => (
            <FeaturedRow key={p.id} p={p} s={s} m={m} i={i} onOpen={setOpenProject} />
          ))}
        </div>
      </section>

      {/* Other works */}
      <section id="other" style={{ padding: `0 ${PAD} 128px` }}>
        <RuleDraw m={m} />
        <Reveal
          m={m}
          style={{ paddingTop: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}
        >
          <span style={{ font: "var(--text-index)", letterSpacing: "-0.03em" }}>2</span>
          <span style={{ ...eyebrowStyle, color: "#8a8985" }}>{s.otherEyebrow}</span>
        </Reveal>
        <div style={{ marginTop: 32 }}>
          {s.other.map((o, i) => (
            <OtherRow key={o.n} o={o} m={m} i={i} />
          ))}
        </div>
      </section>

      {/* Marquee */}
      <Marquee text={s.marquee} accent={ACCENT_MARQUEE} m={m} />

      {/* Contact + footer */}
      <section id="contact">
        <div style={{ padding: `96px ${PAD} 96px` }}>
          <Reveal m={m} style={{ borderTop: hairline, paddingTop: 24 }}>
            <span style={{ ...eyebrowStyle, color: "#8a8985" }}>{s.contactEyebrow}</span>
            <h2 style={{ font: "var(--text-display)", letterSpacing: "var(--tracking-display)", margin: "16px 0 0" }}>
              {s.contactTitle}
            </h2>
          </Reveal>
          <div
            className="ptf-contact-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 48, alignItems: "end" }}
          >
            <Reveal m={m} delay={m.stagger}>
              <p style={{ font: "var(--text-body-md)", color: "#4a4a48", margin: 0, maxWidth: 420 }}>
                {s.contactBody}
              </p>
            </Reveal>
            <Reveal
              m={m}
              delay={m.stagger * 2}
              style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "baseline" }}
            >
              <TextLink href={`mailto:${EMAIL}`}>{s.footerEmail}</TextLink>
              {RESUME_URL ? (
                <TextLink href={RESUME_URL} arrow="up-right">
                  {s.footerResume}
                </TextLink>
              ) : (
                <span style={{ ...metaStyle, color: "#8a8985" }}>{s.footerResume}</span>
              )}
            </Reveal>
          </div>
        </div>
        <footer style={{ padding: `64px ${PAD} 0`, overflow: "hidden" }}>
          <div
            className="ptf-footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: 24,
              padding: "20px 0",
              borderTop: hairline,
              alignItems: "baseline",
            }}
          >
            <h3 style={{ font: "var(--text-h1)", letterSpacing: "var(--tracking-h1)", margin: 0 }}>{s.profilesTag}</h3>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {s.profiles.map((p) => (
                <TextLink key={p.label} href={p.href}>
                  {p.label}
                </TextLink>
              ))}
            </div>
          </div>
          <p style={{ ...metaStyle, padding: "16px 0", borderTop: hairline, margin: 0 }}>{s.copyright}</p>
          <Reveal m={m} threshold={0.01} style={{ overflow: "hidden" }}>
            <div
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "22vw",
                lineHeight: 0.72,
                letterSpacing: "-0.05em",
                marginBottom: "-0.1em",
                whiteSpace: "nowrap",
              }}
            >
              {s.wordmark}
            </div>
          </Reveal>
        </footer>
      </section>

      {openProject ? (
        <CaseStudy p={openProject} s={s} m={m} onClose={() => setOpenProject(null)} />
      ) : null}

      <CustomCursor />
    </div>
  );
}
