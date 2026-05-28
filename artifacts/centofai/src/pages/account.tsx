import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, AlertTriangle, Loader2, UserCog } from "lucide-react";
import { useClerk, useUser } from "@clerk/react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

const CONFIRM_PHRASE = "LÖSCHEN";

export default function AccountPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const qc = useQueryClient();
  const [, setLocation] = useLocation();
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  const [confirmText, setConfirmText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canDelete = confirmText.trim() === CONFIRM_PHRASE && !submitting;

  async function handleDelete() {
    if (!canDelete) return;
    setSubmitting(true);
    setError(null);
    try {
      await api.deleteAccount();
      qc.clear();
      await signOut({ redirectUrl: basePath || "/" });
      setLocation("/");
    } catch (err) {
      setError((err as Error).message || "Löschen fehlgeschlagen");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-caption)] hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <UserCog className="w-7 h-7 text-purple-400" /> Konto-Einstellungen
        </h1>
        <p className="text-[var(--text-caption)] text-sm mb-8">
          Verwalte dein Centofai-Konto.
        </p>

        <div className="bg-[var(--bg-card)]/40 border border-[var(--border-color)] p-6 rounded-2xl mb-8">
          <h2 className="font-semibold mb-2">Angemeldet als</h2>
          <p className="text-[var(--text-caption)] text-sm">
            {user?.primaryEmailAddress?.emailAddress ?? user?.firstName ?? "—"}
          </p>
        </div>

        <div className="bg-red-500/5 border border-red-500/30 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold text-red-300 flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5" /> Konto löschen
          </h2>
          <p className="text-[var(--text-caption)] text-sm mb-4">
            Dein Konto sowie alle gespeicherten Favoriten und eingereichten
            Tools werden dauerhaft gelöscht. Diese Aktion kann nicht rückgängig
            gemacht werden.
          </p>
          <label className="block text-xs font-medium text-[var(--text-label)] mb-1.5">
            Tippe <span className="font-mono text-red-300">{CONFIRM_PHRASE}</span> zum Bestätigen
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            disabled={submitting}
            className="w-full bg-[var(--bg-page)] border border-[var(--border-color)] rounded-xl px-3 py-2 text-sm text-[var(--text-body)] focus:outline-none focus:border-red-500/50 mb-4"
            placeholder={CONFIRM_PHRASE}
          />
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={!canDelete}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-600/40 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Konto endgültig löschen
          </button>
        </div>
      </div>
    </div>
  );
}
