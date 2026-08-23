import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";

type ChatRole = "user" | "assistant";
type ChatMessage = { id: string; role: ChatRole; content: string };

function apiBase(): string {
  const explicit = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  if (explicit) return explicit.endsWith("/api") ? explicit : `${explicit}/api`;
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/api`;
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function IntelligentChatbot() {
  const lang = window.location.pathname.startsWith("/en") ? "en" : "de";
  const copy = useMemo(() => lang === "de" ? {
    title: "Centof.ai Assistent",
    status: "KI-gestützte Projektberatung",
    welcome: "Hallo! Ich bin der KI-Assistent von Centof.ai. Ich helfe bei Websites, Apps und KI-Automatisierungen. Was möchten Sie umsetzen?",
    placeholder: "Wie kann ich Ihnen helfen?",
    thinking: "Denke nach",
    note: "KI kann Fehler machen. Keine sensiblen Daten eingeben.",
    project: "Projekt starten →",
    projectHref: "/de/projekt-starten",
    quick: ["Ich möchte eine Website erstellen", "Ich möchte eine App entwickeln", "Ich brauche eine KI-Automatisierung"],
    unavailable: "Der KI-Assistent ist momentan nicht erreichbar. Bitte versuchen Sie es erneut.",
  } : {
    title: "Centof.ai Assistant",
    status: "AI-powered project guidance",
    welcome: "Hi! I’m the Centof.ai AI assistant. I can help with websites, apps and AI automations. What would you like to build?",
    placeholder: "How can I help?",
    thinking: "Thinking",
    note: "AI can make mistakes. Do not enter sensitive data.",
    project: "Start a project →",
    projectHref: "/en/start-a-project",
    quick: ["I want to build a website", "I want to develop an app", "I need an AI automation"],
    unavailable: "The AI assistant is currently unavailable. Please try again.",
  }, [lang]);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", content: copy.welcome },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([{ id: "welcome", role: "assistant", content: copy.welcome }]);
  }, [copy.welcome]);

  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const sendMessage = async (text: string) => {
    const clean = text.trim();
    if (!clean || loading) return;

    const userMessage: ChatMessage = { id: makeId(), role: "user", content: clean };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${apiBase()}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          messages: nextMessages.slice(-12).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) throw new Error(data.error || copy.unavailable);
      setMessages((current) => [...current, { id: makeId(), role: "assistant", content: data.reply as string }]);
    } catch (error) {
      setMessages((current) => [...current, {
        id: makeId(),
        role: "assistant",
        content: error instanceof Error ? error.message : copy.unavailable,
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", right: "max(18px, env(safe-area-inset-right))", bottom: "max(18px, env(safe-area-inset-bottom))", zIndex: 1200, fontFamily: "Inter, sans-serif" }}>
      {open && (
        <section role="dialog" aria-label={copy.title} style={{
          position: "absolute", right: 0, bottom: "72px", width: "min(390px, calc(100vw - 36px))", height: "min(610px, calc(100dvh - 112px))",
          display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: "22px",
          border: "1px solid rgba(127,119,221,.28)", background: "rgba(10,10,26,.97)",
          boxShadow: "0 24px 80px rgba(0,0,0,.48), 0 0 45px rgba(83,74,183,.18)", backdropFilter: "blur(22px)"
        }}>
          <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 16px 14px", borderBottom: "1px solid rgba(127,119,221,.18)", background: "linear-gradient(135deg, rgba(83,74,183,.2), rgba(29,158,117,.08))" }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, display: "grid", placeItems: "center", color: "#fff", background: "linear-gradient(135deg,#7F77DD,#534AB7)" }}><Bot size={22} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#F3F1FF", fontSize: 14, fontWeight: 700 }}>{copy.title}<Sparkles size={14} color="#9C94FF" /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3, color: "#B8B2E8", fontSize: 11 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#5DCAA5", boxShadow: "0 0 10px rgba(93,202,165,.7)" }} />{copy.status}</div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" style={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 10, border: "1px solid rgba(127,119,221,.2)", color: "#B8B2E8", background: "rgba(255,255,255,.03)", cursor: "pointer" }}><X size={18} /></button>
          </header>

          <div aria-live="polite" style={{ flex: 1, overflowY: "auto", padding: "18px 14px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((message) => (
              <div key={message.id} style={{ display: "flex", justifyContent: message.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "86%", padding: "11px 13px", borderRadius: message.role === "user" ? "16px 16px 5px 16px" : "16px 16px 16px 5px", background: message.role === "user" ? "linear-gradient(135deg,#534AB7,#3C3489)" : "rgba(20,20,52,.94)", border: "1px solid rgba(127,119,221,.2)", color: "#F3F1FF", fontSize: 13, lineHeight: 1.55, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{message.content}</div>
              </div>
            ))}

            {messages.length === 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {copy.quick.map((prompt) => <button key={prompt} type="button" onClick={() => void sendMessage(prompt)} style={{ padding: "8px 10px", borderRadius: 999, border: "1px solid rgba(127,119,221,.28)", background: "rgba(83,74,183,.10)", color: "#D8D4FF", fontSize: 11, cursor: "pointer" }}>{prompt}</button>)}
              </div>
            )}

            {loading && <div style={{ display: "flex", justifyContent: "flex-start" }}><div style={{ padding: "11px 13px", borderRadius: "16px 16px 16px 5px", background: "rgba(20,20,52,.94)", color: "#B8B2E8", fontSize: 12 }}>{copy.thinking} •••</div></div>}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: "10px 12px 12px", borderTop: "1px solid rgba(127,119,221,.18)", background: "rgba(10,10,26,.98)" }}>
            <form onSubmit={(event) => { event.preventDefault(); void sendMessage(input); }} style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 14, border: "1px solid rgba(127,119,221,.28)", background: "rgba(20,20,52,.88)", padding: "5px 5px 5px 12px" }}>
              <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value.slice(0, 2000))} placeholder={copy.placeholder} disabled={loading} style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: "transparent", color: "#F3F1FF", fontSize: 13, fontFamily: "inherit" }} />
              <button type="submit" disabled={loading || !input.trim()} aria-label="Send" style={{ width: 38, height: 38, display: "grid", placeItems: "center", border: 0, borderRadius: 11, color: "#fff", background: loading || !input.trim() ? "#3C3489" : "linear-gradient(135deg,#7F77DD,#534AB7)", opacity: loading || !input.trim() ? .55 : 1, cursor: loading || !input.trim() ? "default" : "pointer" }}><Send size={17} /></button>
            </form>
            <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", gap: 8, color: "#8179C8", fontSize: 9.5, lineHeight: 1.35 }}>
              <span>{copy.note}</span><a href={copy.projectHref} style={{ flexShrink: 0, color: "#C9C4F8", textDecoration: "none", fontWeight: 600 }}>{copy.project}</a>
            </div>
          </div>
        </section>
      )}

      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close AI assistant" : "Open AI assistant"} aria-expanded={open} style={{ marginLeft: "auto", width: 58, height: 58, display: "grid", placeItems: "center", borderRadius: 18, border: "1px solid rgba(127,119,221,.4)", color: "#fff", background: open ? "linear-gradient(135deg,#3C3489,#26215C)" : "linear-gradient(135deg,#7F77DD,#534AB7)", boxShadow: "0 14px 32px rgba(83,74,183,.35),0 0 0 6px rgba(83,74,183,.08)", cursor: "pointer" }}>
        {open ? <X size={24} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
}
