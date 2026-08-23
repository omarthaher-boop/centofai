import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hallo! Ich bin der KI-Assistent von Centof.ai. Ich helfe Ihnen bei Websites, Apps und KI-Automatisierungen. Was möchten Sie umsetzen?",
};

const quickPrompts = [
  "Ich möchte eine Website erstellen",
  "Ich möchte eine App entwickeln",
  "Ich brauche eine KI-Automatisierung",
];

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function IntelligentChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  const sendMessage = async (text: string) => {
    const clean = text.trim();
    if (!clean || loading) return;

    const userMessage: ChatMessage = {
      id: makeId(),
      role: "user",
      content: clean,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-12).map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Der KI-Assistent ist momentan nicht erreichbar.");
      }

      setMessages((current) => [
        ...current,
        { id: makeId(), role: "assistant", content: data.reply as string },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: makeId(),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Der KI-Assistent ist momentan nicht erreichbar. Bitte versuchen Sie es erneut.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        right: "max(18px, env(safe-area-inset-right))",
        bottom: "max(18px, env(safe-area-inset-bottom))",
        zIndex: 1000,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {open && (
        <section
          role="dialog"
          aria-label="Centof.ai KI-Assistent"
          style={{
            position: "absolute",
            right: 0,
            bottom: "72px",
            width: "min(390px, calc(100vw - 36px))",
            height: "min(610px, calc(100dvh - 112px))",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "22px",
            border: "1px solid var(--border-color)",
            background: "rgba(7, 7, 26, 0.97)",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.48), 0 0 45px rgba(83, 74, 183, 0.18)",
            backdropFilter: "blur(22px)",
          }}
        >
          <header
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 16px 14px",
              borderBottom: "1px solid var(--border-color)",
              background:
                "linear-gradient(135deg, rgba(83,74,183,0.20), rgba(29,158,117,0.08))",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                flex: "0 0 42px",
                borderRadius: "14px",
                display: "grid",
                placeItems: "center",
                color: "#EEEDFE",
                background: "linear-gradient(135deg, #7F77DD, #534AB7)",
                boxShadow: "0 8px 22px rgba(83,74,183,0.30)",
              }}
            >
              <Bot size={22} />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  color: "var(--text-heading)",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                Centof.ai Assistent
                <Sparkles size={14} color="#7F77DD" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "3px",
                  color: "var(--text-caption)",
                  fontSize: "11px",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#5DCAA5",
                    boxShadow: "0 0 10px rgba(93,202,165,.7)",
                  }}
                />
                KI-gestützte Projektberatung
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chat schließen"
              style={{
                width: "36px",
                height: "36px",
                display: "grid",
                placeItems: "center",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                color: "var(--text-caption)",
                background: "rgba(255,255,255,0.03)",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </header>

          <div
            aria-live="polite"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "18px 14px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              scrollbarWidth: "thin",
              scrollbarColor: "#3C3489 transparent",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "86%",
                    padding: "11px 13px",
                    borderRadius:
                      message.role === "user"
                        ? "16px 16px 5px 16px"
                        : "16px 16px 16px 5px",
                    background:
                      message.role === "user"
                        ? "linear-gradient(135deg, #534AB7, #3C3489)"
                        : "rgba(13,13,43,0.92)",
                    border:
                      message.role === "assistant"
                        ? "1px solid rgba(127,119,221,0.18)"
                        : "1px solid rgba(127,119,221,0.35)",
                    color: "#EEEDFE",
                    fontSize: "13px",
                    lineHeight: 1.55,
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "7px",
                  paddingTop: "2px",
                }}
              >
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "999px",
                      border: "1px solid rgba(127,119,221,0.28)",
                      background: "rgba(83,74,183,0.10)",
                      color: "#CECBF6",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "11px 13px",
                    borderRadius: "16px 16px 16px 5px",
                    border: "1px solid rgba(127,119,221,0.18)",
                    background: "rgba(13,13,43,0.92)",
                    color: "#AFA9EC",
                    fontSize: "12px",
                  }}
                >
                  <span>Denke nach</span>
                  <span aria-hidden="true">•••</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              padding: "10px 12px 12px",
              borderTop: "1px solid var(--border-color)",
              background: "rgba(7,7,26,0.96)",
            }}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(input);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                borderRadius: "14px",
                border: "1px solid rgba(127,119,221,0.28)",
                background: "rgba(13,13,43,0.82)",
                padding: "5px 5px 5px 12px",
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, 2000))}
                placeholder="Wie kann ich Ihnen helfen?"
                aria-label="Nachricht an den KI-Assistenten"
                disabled={loading}
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: 0,
                  outline: 0,
                  background: "transparent",
                  color: "#EEEDFE",
                  fontSize: "13px",
                  fontFamily: "inherit",
                }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Nachricht senden"
                style={{
                  width: "38px",
                  height: "38px",
                  display: "grid",
                  placeItems: "center",
                  border: 0,
                  borderRadius: "11px",
                  color: "#fff",
                  background:
                    loading || !input.trim()
                      ? "#3C3489"
                      : "linear-gradient(135deg, #7F77DD, #534AB7)",
                  opacity: loading || !input.trim() ? 0.55 : 1,
                  cursor: loading || !input.trim() ? "default" : "pointer",
                }}
              >
                <Send size={17} />
              </button>
            </form>

            <div
              style={{
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                color: "#7F77DD",
                fontSize: "9.5px",
                lineHeight: 1.35,
              }}
            >
              <span>KI kann Fehler machen. Keine sensiblen Daten eingeben.</span>
              <a
                href="/kontakt"
                style={{
                  flexShrink: 0,
                  color: "#AFA9EC",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Kontakt →
              </a>
            </div>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "KI-Assistent schließen" : "KI-Assistent öffnen"}
        aria-expanded={open}
        style={{
          marginLeft: "auto",
          width: "58px",
          height: "58px",
          display: "grid",
          placeItems: "center",
          borderRadius: "18px",
          border: "1px solid rgba(127,119,221,0.40)",
          color: "#fff",
          background: open
            ? "linear-gradient(135deg, #3C3489, #26215C)"
            : "linear-gradient(135deg, #7F77DD, #534AB7)",
          boxShadow:
            "0 14px 32px rgba(83,74,183,0.35), 0 0 0 6px rgba(83,74,183,0.08)",
          cursor: "pointer",
          transition: "transform .18s ease, box-shadow .18s ease",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {open ? <X size={24} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
}
