import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Heart, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useFavorites, useToggleFavorite } from "../hooks/useFavorites";
import { tools } from "@workspace/data";

export default function FavoritesPage() {
  const { data, isLoading, error } = useFavorites();
  const toggle = useToggleFavorite();

  const items = useMemo(() => {
    if (!data) return [];
    return data.map((fav) => {
      const tool = tools.find((t: { name: string }) => t.name === fav.toolName);
      return { fav, tool };
    });
  }, [data]);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-caption)] hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <Heart className="w-7 h-7 text-pink-500" /> Meine Favoriten
        </h1>
        <p className="text-[var(--text-caption)] text-sm mb-8">
          Deine gespeicherten KI-Tools an einem Ort.
        </p>

        {isLoading && (
          <p className="text-[var(--text-caption)]">Wird geladen…</p>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
            {(error as Error).message}
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[var(--border-color)] rounded-2xl">
            <Heart className="w-10 h-10 mx-auto mb-3 text-[var(--text-label)]" />
            <p className="text-[var(--text-caption)] mb-4">
              Du hast noch keine Tools als Favorit gespeichert.
            </p>
            <Link
              to="/"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
            >
              Tools entdecken
            </Link>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ fav, tool }) => (
            <div
              key={fav.id}
              className="bg-[var(--bg-card)]/40 border border-[var(--border-color)] p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm"
                    style={{
                      backgroundColor: (tool?.color ?? "#9333EA") + "15",
                      color: tool?.color ?? "#9333EA",
                    }}
                  >
                    {fav.toolName.charAt(0)}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      toggle.mutate({ toolName: fav.toolName, isFav: true })
                    }
                    aria-label="Aus Favoriten entfernen"
                    className="text-[var(--text-label)] hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-bold text-lg mb-1">{fav.toolName}</h3>
                <p className="text-[var(--text-caption)] text-xs line-clamp-2 mb-4">
                  {tool?.description ?? "Tool nicht mehr im Verzeichnis."}
                </p>
              </div>
              <div className="text-xs text-[var(--text-label)] font-medium pt-2 border-t border-[var(--border-color)] flex items-center justify-between">
                <span>{tool?.category ?? "Unbekannt"}</span>
                {tool && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition inline-flex items-center gap-1"
                  >
                    Öffnen <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
