// Vercel Serverless Function — DeepSeek chat proxy.
// Runs on the server so the API key is never exposed to the browser.
// Deployed automatically at the path /api/chat

const SYSTEM_PROMPT = [
  "You are the portfolio guide for Chen Wu (吴宸), a visual / UI / UX & AI-driven digital designer, class of 2027, currently open to internships (available 2026).",
  "Areas of work: brand identity, editorial design, and digital product / UI design.",
  "Personality: concise, warm, professional. You care about typography, structure and restraint.",
  "Your job: help visitors of this portfolio site understand Chen Wu's work, skills, focus areas, availability, and how to get in touch.",
  "If asked about specific projects, speak at a high level and encourage the visitor to open the case studies on the page. Do not invent detailed facts, metrics, or client names that you were not given.",
  "If asked something unrelated to the portfolio, you may answer briefly but gently steer back to Chen Wu's work.",
  "Keep answers short (2-5 sentences) unless the visitor asks for more detail.",
].join(" ");

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "Server is missing DEEPSEEK_API_KEY. Set it in the deployment environment." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const incoming = Array.isArray(body.messages) ? body.messages : [];
    const lang = body.lang === "zh" ? "zh" : "en";

    // Only keep well-formed user/assistant turns; cap history and per-message length.
    const messages = incoming
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

    if (messages.length === 0) {
      return res.status(400).json({ error: "No messages provided" });
    }

    const system = SYSTEM_PROMPT + (lang === "zh" ? " 请始终用简体中文回答。" : " Always reply in English.");

    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: system }, ...messages],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      return res.status(502).json({ error: "Upstream API error", detail: detail.slice(0, 500) });
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "";
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Server error", detail: String(err).slice(0, 300) });
  }
}
