import { useEffect, useMemo } from "react";
import { Link, useRoute, useSearch } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Tag,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Image as ImageIcon,
} from "lucide-react";
import {
  findToolBySlug,
  relatedTools,
  toolSlug,
  type Tool,
} from "@workspace/data";
import NotFound from "./not-found";

const PRICING_BADGE: Record<Tool["pricing"], string> = {
  Kostenlos: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Freemium: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Kostenpflichtig: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

function setMeta(tool: Tool) {
  const title = `${tool.name} – KI-Tool für ${tool.category} | CentofAI`;
  const description = `${tool.description} – Preismodell: ${tool.pricing}. Zielgruppe: ${tool.audience}. Im CentofAI Tool-Verzeichnis entdecken.`;
  document.title = title;

  const setTag = (selector: string, attr: string, value: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(selector);
    if (!el) {
      el = document.createElement("meta");
      const [name, val] = selector.replace(/[\[\]"]/g, "").split("=");
      el.setAttribute(name, val);
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  setTag('meta[name="description"]', "content", description);
  setTag('meta[property="og:title"]', "content", title);
  setTag('meta[property="og:description"]', "content", description);
  setTag('meta[property="og:type"]', "content", "article");
  setTag('meta[name="twitter:title"]', "content", title);
  setTag('meta[name="twitter:description"]', "content", description);

  let canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute(
    "href",
    `https://www.centofai.com/tools/${toolSlug(tool)}`,
  );
}

function ScreenshotMosaic({ tool }: { tool: Tool }) {
  const tiles = [
    { label: "Dashboard", h: "h-56" },
    { label: "Editor", h: "h-40" },
    { label: "Ergebnis", h: "h-40" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tiles.map((t, i) => (
        <div
          key={t.label}
          className={`${t.h} ${i === 0 ? "md:col-span-2 md:h-56" : ""} rounded-2xl border border-[var(--border-color)] overflow-hidden relative bg-[var(--bg-card)]`}
        >
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: `linear-gradient(135deg, ${tool.color}22 0%, ${tool.color}05 60%, transparent 100%)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-label)] text-xs font-medium uppercase tracking-wider gap-2">
            <ImageIcon className="w-4 h-4" /> {tool.name} · {t.label}
          </div>
          <div
            className="absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: tool.color + "20", color: tool.color }}
          >
            {tool.name.charAt(0)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ToolDetail() {
  const [, params] = useRoute<{ slug: string }>("/tools/:slug");
  const rawSearch = useSearch();
  const slug = params?.slug ?? "";
  const tool = useMemo(() => findToolBySlug(slug), [slug]);

  const backHref = useMemo(() => {
    const sp = new URLSearchParams(rawSearch);
    const carry = new URLSearchParams();
    const search = sp.get("search");
    const category = sp.get("category");
    if (search) carry.set("search", search);
    if (category) carry.set("category", category);
    const qs = carry.toString();
    return `/${qs ? `?${qs}` : ""}#tools`;
  }, [rawSearch]);

  useEffect(() => {
    if (tool) setMeta(tool);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [tool]);

  if (!tool) return <NotFound />;

  const related = relatedTools(tool);
  const highlights = [
    `Kategorie: ${tool.category}`,
    `Preismodell: ${tool.pricing}`,
    `Zielgruppe: ${tool.audience}`,
    `Web-basiert – kein Download notwendig`,
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] font-sans antialiased">
      {/* Top bar with back link */}
      <div className="border-b border-[var(--border-color)] bg-[var(--nav-bg)] backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-caption)] hover:text-purple-400 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zum Tool-Verzeichnis
          </Link>
          <Link
            href="/"
            className="text-lg font-black tracking-wider gradient-text"
          >
            CENTOF<span className="text-white">AI</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center gap-6"
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl shadow-lg shrink-0"
            style={{
              backgroundColor: tool.color + "20",
              color: tool.color,
              boxShadow: `0 0 60px ${tool.color}25`,
            }}
          >
            {tool.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                {tool.category}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-md font-semibold border ${PRICING_BADGE[tool.pricing]}`}
              >
                {tool.pricing}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {tool.name}
            </h1>
            <p className="text-[var(--text-caption)] mt-2 text-base max-w-2xl">
              {tool.description}
            </p>
          </div>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition shadow-[0_0_25px_rgba(147,51,234,0.25)] inline-flex items-center gap-2 whitespace-nowrap"
          >
            Website öffnen <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20 grid lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Screenshots */}
          <section>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> Eindrücke
            </h2>
            <ScreenshotMosaic tool={tool} />
            <p className="text-xs text-[var(--text-label)] mt-3">
              Vorschau-Mockups · Original-Screenshots folgen.
            </p>
          </section>

          {/* Description / Review */}
          <section>
            <h2 className="text-lg font-bold mb-3">Über {tool.name}</h2>
            <div className="prose prose-invert max-w-none text-[var(--text-body)] text-sm leading-relaxed space-y-4">
              <p>{tool.description}</p>
              <p>
                {tool.name} richtet sich vor allem an{" "}
                <strong>{tool.audience}</strong> und ist in der Kategorie{" "}
                <strong>{tool.category}</strong> eines der relevantesten Tools
                am Markt. Das Preismodell ist <strong>{tool.pricing}</strong>,
                sodass du es{" "}
                {tool.pricing === "Kostenlos"
                  ? "ohne Kosten ausprobieren"
                  : tool.pricing === "Freemium"
                    ? "zunächst in einer kostenlosen Version testen"
                    : "im Rahmen eines bezahlten Plans nutzen"}{" "}
                kannst.
              </p>
              <p>
                Wir haben {tool.name} auf Bedienbarkeit, Output-Qualität und
                Integration mit gängigen Workflows geprüft. Eine ausführliche
                Review folgt in Kürze – bis dahin findest du oben den direkten
                Link, um das Tool selbst zu testen.
              </p>
            </div>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="text-lg font-bold mb-3">Highlights</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm bg-[var(--bg-card)]/40 border border-[var(--border-color)] rounded-xl px-3 py-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right column */}
        <aside className="space-y-6">
          <div className="bg-[var(--bg-card)]/40 border border-[var(--border-color)] rounded-2xl p-5">
            <h3 className="font-bold mb-4">Fakten</h3>
            <dl className="text-sm space-y-3">
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-purple-400" />
                <dt className="text-[var(--text-label)] w-24">Kategorie</dt>
                <dd className="font-medium">{tool.category}</dd>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-purple-400" />
                <dt className="text-[var(--text-label)] w-24">Zielgruppe</dt>
                <dd className="font-medium">{tool.audience}</dd>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <dt className="text-[var(--text-label)] w-24">Preis</dt>
                <dd>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-semibold border ${PRICING_BADGE[tool.pricing]}`}
                  >
                    {tool.pricing}
                  </span>
                </dd>
              </div>
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-purple-400" />
                <dt className="text-[var(--text-label)] w-24">Website</dt>
                <dd>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition break-all"
                  >
                    {tool.url.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {related.length > 0 && (
            <div className="bg-[var(--bg-card)]/40 border border-[var(--border-color)] rounded-2xl p-5">
              <h3 className="font-bold mb-4">Ähnliche Tools</h3>
              <ul className="space-y-2">
                {related.map((r: any) => (
                  <li key={r.name}>
                    <Link
                      href={`/tools/${toolSlug(r)}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--bg-section-alt)]/40 transition group"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
                        style={{
                          backgroundColor: r.color + "20",
                          color: r.color,
                        }}
                      >
                        {r.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">
                          {r.name}
                        </div>
                        <div className="text-xs text-[var(--text-label)] truncate">
                          {r.description}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[var(--text-label)] group-hover:text-purple-400 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
