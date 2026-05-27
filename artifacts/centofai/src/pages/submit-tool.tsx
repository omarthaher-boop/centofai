import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { api } from "../lib/api";
import { toolCategories } from "../data/tools";

export default function SubmitToolPage() {
  const [form, setForm] = useState({
    name: "",
    category: toolCategories[0],
    description: "",
    pricing: "Freemium",
    audience: "",
    url: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errMsg, setErrMsg] = useState("");

  const update = <K extends keyof typeof form>(k: K, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.url.trim()
    ) {
      setStatus("error");
      setErrMsg("Bitte fülle Name, Beschreibung und URL aus.");
      return;
    }
    setStatus("sending");
    setErrMsg("");
    try {
      await api.submitTool({
        name: form.name,
        category: form.category,
        description: form.description,
        pricing: form.pricing,
        audience: form.audience || undefined,
        url: form.url,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrMsg((err as Error).message || "Fehler beim Senden.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-caption)] hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Zurück
        </Link>
        <h1 className="text-3xl font-bold mb-2">KI-Tool einreichen</h1>
        <p className="text-[var(--text-caption)] text-sm mb-8">
          Schlage ein neues Tool für das Verzeichnis vor. Wir prüfen und
          veröffentlichen geeignete Einreichungen.
        </p>

        {status === "success" ? (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            <p className="text-lg font-semibold mb-2">Danke für die Einreichung!</p>
            <p className="text-sm text-[var(--text-caption)] mb-4">
              Wir prüfen dein Tool und melden uns bei Fragen.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setForm({
                  name: "",
                  category: toolCategories[0],
                  description: "",
                  pricing: "Freemium",
                  audience: "",
                  url: "",
                });
              }}
              className="px-4 py-2 text-sm font-medium text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition"
            >
              Weiteres Tool einreichen
            </button>
          </div>
        ) : (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-3">
            {status === "error" && (
              <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                {errMsg}
              </div>
            )}
            <input
              type="text"
              placeholder="Tool-Name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[var(--bg-page)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-purple-500/40"
            />
            <input
              type="url"
              placeholder="https://..."
              value={form.url}
              onChange={(e) => update("url", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[var(--bg-page)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-purple-500/40"
            />
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[var(--bg-page)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-purple-500/40"
            >
              {toolCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={form.pricing}
              onChange={(e) => update("pricing", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[var(--bg-page)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-purple-500/40"
            >
              <option>Kostenlos</option>
              <option>Freemium</option>
              <option>Kostenpflichtig</option>
            </select>
            <input
              type="text"
              placeholder="Zielgruppe (optional)"
              value={form.audience}
              onChange={(e) => update("audience", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[var(--bg-page)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-purple-500/40"
            />
            <textarea
              placeholder="Kurzbeschreibung"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-[var(--bg-page)] border border-[var(--border-color)] rounded-lg resize-none focus:outline-none focus:border-purple-500/40"
            />
            <button
              onClick={submit}
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition disabled:opacity-50"
            >
              {status === "sending" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Tool einreichen
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
