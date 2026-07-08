import { useState, useRef, useEffect, useCallback } from "react";

// Floating AI chat widget — portfolio guide assistant.
// Talks to the serverless proxy at /api/chat so the API key stays server-side.
const API_URL = import.meta.env.VITE_CHAT_API_URL || "/api/chat";
const INK = "#111110";
const BG = "#f1f0ee";
const HAIR = "#d8d7d3";
const META = "#8a8985";
const SUBTLE = "#4a4a48";

const STR = {
  en: {
    open: "Ask AI",
    title: "Portfolio Assistant",
    subtitle: "Ask about my work, skills or availability",
    placeholder: "Type a message…",
    send: "Send",
    close: "Close",
    greeting:
      "Hi — I'm Chen Wu's portfolio assistant. Ask me about the work, skills, focus areas, or how to get in touch.",
    suggestions: ["What kind of work does Chen do?", "Is Chen open to internships?", "How can I get in touch?"],
    error: "Something went wrong. Please try again.",
    thinking: "Thinking…",
  },
  zh: {
    open: "问 AI",
    title: "作品集助手",
    subtitle: "关于作品、技能或档期，随便问",
    placeholder: "输入消息…",
    send: "发送",
    close: "关闭",
    greeting: "你好，我是吴宸的作品集助手。可以问我关于作品、技能、方向或联系方式的问题。",
    suggestions: ["吴宸做哪类设计？", "现在接受实习吗？", "怎么联系？"],
    error: "出错了，请重试。",
    thinking: "思考中…",
  },
};

function Bubble({ role, children }) {
  const isUser = role === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: "82%",
          padding: "10px 14px",
          border: `1px solid ${isUser ? INK : HAIR}`,
          background: isUser ? INK : "#fff",
          color: isUser ? BG : INK,
          font: "var(--text-body-sm)",
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function ChatWidget({ lang = "en" }) {
  const s = STR[lang] || STR.en;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const send = useCallback(
    async (text) => {
      const content = (text != null ? text : input).trim();
      if (!content || busy) return;
      setInput("");
      const next = [...messages, { role: "user", content }];
      setMessages(next);
      setBusy(true);
      try {
        const r = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next, lang }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.error || "request failed");
        setMessages((m) => [...m, { role: "assistant", content: data.reply || s.error }]);
      } catch {
        setMessages((m) => [...m, { role: "assistant", content: s.error }]);
      } finally {
        setBusy(false);
      }
    },
    [input, busy, messages, lang, s.error]
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", left: 16, bottom: 16, zIndex: 9000,
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "12px 20px", borderRadius: 999,
          border: `1px solid ${INK}`, background: INK, color: BG,
          font: "var(--text-body-sm)", cursor: "pointer",
          boxShadow: "0 6px 24px rgba(0,0,0,.16)",
        }}
      >
        <span aria-hidden="true">✦</span> {s.open}
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed", left: 16, bottom: 16, zIndex: 9000,
        width: "min(380px, calc(100vw - 32px))",
        height: "min(560px, calc(100vh - 32px))",
        display: "flex", flexDirection: "column",
        background: BG, border: `1px solid ${INK}`,
        boxShadow: "0 12px 48px rgba(0,0,0,.22)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          gap: 12, padding: "14px 16px", borderBottom: `1px solid ${HAIR}`,
        }}
      >
        <div>
          <div style={{ font: "var(--text-body-sm)", fontWeight: 600, color: INK }}>{s.title}</div>
          <div style={{ font: "var(--text-meta)", letterSpacing: "var(--tracking-meta)", color: META, marginTop: 2 }}>
            {s.subtitle}
          </div>
        </div>
        <button
          type="button" aria-label={s.close} onClick={() => setOpen(false)}
          style={{ border: 0, background: "transparent", cursor: "pointer", font: "var(--text-body-sm)", color: INK, lineHeight: 1, padding: 4 }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <Bubble role="assistant">{s.greeting}</Bubble>
        {messages.length === 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
            {s.suggestions.map((q) => (
              <button
                key={q} type="button" onClick={() => send(q)}
                style={{
                  padding: "6px 12px", border: `1px solid ${HAIR}`, background: "#fff", color: SUBTLE,
                  font: "var(--text-meta)", letterSpacing: "var(--tracking-meta)", cursor: "pointer", borderRadius: 999,
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role}>
            {m.content}
          </Bubble>
        ))}
        {busy && (
          <div style={{ font: "var(--text-meta)", letterSpacing: "var(--tracking-meta)", color: META, paddingLeft: 2 }}>
            {s.thinking}
          </div>
        )}
      </div>

      {/* Composer */}
      <div style={{ borderTop: `1px solid ${HAIR}`, padding: 12, display: "flex", gap: 8, alignItems: "flex-end" }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder={s.placeholder}
          style={{
            flex: 1, resize: "none", maxHeight: 120,
            padding: "10px 12px", border: `1px solid ${HAIR}`, background: "#fff",
            font: "var(--text-body-sm)", color: INK, outline: "none",
          }}
        />
        <button
          type="button" onClick={() => send()} disabled={busy || !input.trim()}
          style={{
            padding: "10px 16px", border: `1px solid ${INK}`,
            background: busy || !input.trim() ? "#fff" : INK,
            color: busy || !input.trim() ? META : BG,
            font: "var(--text-body-sm)", cursor: busy || !input.trim() ? "default" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {s.send}
        </button>
      </div>
    </div>
  );
}
