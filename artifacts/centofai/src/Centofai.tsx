import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, GraduationCap, Wrench, Mail,
  ArrowRight, ExternalLink, Zap, Brain, Sparkles, TrendingUp,
  CheckCircle2, Bot, BookOpen, Tag, Languages, ArrowUpRight,
  Users, Lightbulb, Send, ChevronDown, Package, Heart,
} from "lucide-react";
import { Link } from "wouter";
import { Show, useUser } from "@clerk/react";
import Navbar from "./components/Navbar";
import { tools, toolCategories, toolSlug } from "@workspace/data";
import { courses, courseCategories } from "@workspace/data";
import {
  useFavoriteToolNames,
  useToggleFavorite,
} from "./hooks/useFavorites";
import { api } from "./lib/api";

/* ─── Image helpers ─────────────────────────────────────────────────── */
function getFaviconUrl(url: string): string | null {
  try {
    const host = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=128`;
  } catch {
    return null;
  }
}

function resolveLogoSrc(logoUrl: string | undefined): string | null {
  if (!logoUrl) return null;
  if (/^(https?:)?\/\//.test(logoUrl) || logoUrl.startsWith("data:")) return logoUrl;
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}${logoUrl.replace(/^\/+/, "")}`;
}

function ToolLogo({ name, color, url, logoUrl }: { name: string; color: string; url: string; logoUrl?: string }) {
  const [primaryFailed, setPrimaryFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);
  const primary = resolveLogoSrc(logoUrl);
  const favicon = getFaviconUrl(url);
  const src = !primaryFailed && primary ? primary : !fallbackFailed ? favicon : null;
  if (!src) {
    return (
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm shadow-lg"
        style={{ backgroundColor: color + "15", color }}
      >
        {name.charAt(0)}
      </div>
    );
  }
  const isPrimary = !primaryFailed && primary !== null;
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg overflow-hidden p-1.5"
      style={{ backgroundColor: color + "15" }}
    >
      <img
        src={src}
        alt={`${name} logo`}
        loading="lazy"
        decoding="async"
        onError={() => (isPrimary ? setPrimaryFailed(true) : setFallbackFailed(true))}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────── */
const heroCategories = [
  { name: "Ideen", href: "#ideas", icon: Lightbulb, desc: "Projekte einreichen", color: "#F59E0B", bg: "bg-amber-500/10", hoverBg: "group-hover:bg-amber-500/20", text: "text-amber-400", hoverText: "group-hover:text-amber-300" },
  { name: "Unsere Produkte", href: "/products", icon: Package, desc: "KI-Lösungen entdecken", color: "#06B6D4", bg: "bg-cyan-500/10", hoverBg: "group-hover:bg-cyan-500/20", text: "text-cyan-400", hoverText: "group-hover:text-cyan-300" },
  { name: "KI-Tools", href: "#tools", icon: Wrench, desc: "102+ Tools entdecken", color: "#8B5CF6", bg: "bg-purple-500/10", hoverBg: "group-hover:bg-purple-500/20", text: "text-purple-400", hoverText: "group-hover:text-purple-300" },
  { name: "Kurse", href: "#academy", icon: GraduationCap, desc: "Lernen & wachsen", color: "#10B981", bg: "bg-emerald-500/10", hoverBg: "group-hover:bg-emerald-500/20", text: "text-emerald-400", hoverText: "group-hover:text-emerald-300" },
  { name: "Community", href: "#newsletter", icon: Users, desc: "Mitglieder & Netzwerk", color: "#EC4899", bg: "bg-pink-500/10", hoverBg: "group-hover:bg-pink-500/20", text: "text-pink-400", hoverText: "group-hover:text-pink-300" },
];

function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ tools: any[]; news: any[]; courses: any[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults(null);
      setOpen(false);
      return;
    }
    setLoading(true);
    const id = setTimeout(() => {
      api.search(q).then((r) => {
        setResults(r);
        setOpen(true);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }, 250);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <div ref={wrapRef} className="relative w-full max-w-[520px] mx-auto lg:mx-0">
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-2 rounded-2xl flex items-center shadow-2xl focus-within:border-purple-500/50 transition">
        <Search className="ml-3 w-5 h-5 text-[var(--text-label)]" />
        <input
          type="text"
          placeholder="Suche nach Tools, News, Kursen..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) {
              window.location.href = `#tools?search=${encodeURIComponent(query)}`;
              setOpen(false);
            }
          }}
          className="bg-transparent px-3 py-3 w-full text-[var(--text-body)] focus:outline-none placeholder-[var(--text-label)] text-base"
        />
        <button
          onClick={() => {
            if (query.trim()) {
              window.location.href = `#tools?search=${encodeURIComponent(query)}`;
              setOpen(false);
            }
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl transition whitespace-nowrap text-sm"
        >
          Suchen
        </button>
      </div>

      {open && (results || loading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl z-50 max-h-[420px] overflow-y-auto">
          {loading && (
            <div className="p-6 text-center text-[var(--text-label)] text-sm">Suche läuft...</div>
          )}
          {results && !loading && (
            <div className="p-3">
              {results.tools.length === 0 && results.news.length === 0 && results.courses.length === 0 && (
                <div className="p-4 text-center text-[var(--text-label)] text-sm">Keine Ergebnisse für „{query}“</div>
              )}
              {results.tools.length > 0 && (
                <div className="mb-3">
                  <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider px-2 mb-1">KI-Tools</p>
                  {results.tools.slice(0, 4).map((t: any) => (
                    <a key={t.slug} href={`#tools?search=${encodeURIComponent(t.name)}`} onClick={() => setOpen(false)} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-purple-500/10 transition">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: t.color + "15", color: t.color }}>
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-body)]">{t.name}</p>
                        <p className="text-xs text-[var(--text-label)] truncate max-w-[260px]">{t.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
              {results.courses.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider px-2 mb-1">Kurse</p>
                  {results.courses.slice(0, 3).map((c: any) => (
                    <a key={c.name} href={c.url} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-emerald-500/10 transition">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-body)]">{c.name}</p>
                        <p className="text-xs text-[var(--text-label)]">{c.provider}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Hero() {
  return (
    <header className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ─── Left Sidebar ─── */}
        <div className="lg:col-span-3 hidden lg:flex flex-col gap-3">
          <p className="text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider mb-2">
            Kategorien
          </p>
          {heroCategories.map((cat) => {
            const Icon = cat.icon;
            const inner = (
              <>
                <div className={`w-9 h-9 rounded-lg ${cat.bg} flex items-center justify-center shrink-0 ${cat.hoverBg} transition`}>
                  <Icon className={`w-4.5 h-4.5 ${cat.text}`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${cat.hoverText} transition`}>{cat.name}</p>
                  <p className="text-xs text-[var(--text-label)]">{cat.desc}</p>
                </div>
              </>
            );
            const cls = "group flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-purple-500/30 hover:bg-purple-500/5 transition-all";
            return cat.href.startsWith("/") ? (
              <Link key={cat.name} to={cat.href} className={cls}>{inner}</Link>
            ) : (
              <a key={cat.name} href={cat.href} className={cls}>{inner}</a>
            );
          })}
        </div>

        {/* ─── Center Text ─── */}
        <div className="lg:col-span-4 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 tracking-wide uppercase">
            Zentraler KI-Hub & Verzeichnis
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-5 mb-5 leading-tight">
            Alles über Künstliche Intelligenz an{" "}
            <span className="gradient-text">einem einzigen Ort</span>
          </h1>

          <p className="text-lg text-[var(--text-caption)] max-w-lg mx-auto lg:mx-0 mb-6">
            Entdecke die besten KI-Tools, bleibe mit täglichen News up-to-date und lerne in praxisnahen Workshops von den Experten.
          </p>
        </div>

        {/* ─── Right: Image + Search ─── */}
        <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
          <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">
            <div className="absolute -inset-2 bg-purple-500/10 rounded-2xl blur-2xl pointer-events-none" />
            <img
              src="centofai-hero.png"
              alt="Centof.Ai - Center of Artificial Intelligence"
              className="relative w-full h-auto rounded-xl border border-[var(--border-color)] shadow-2xl"
              loading="eager"
            />
          </div>
          <GlobalSearch />
        </div>
      </div>
    </header>
  );
}

/* ─── Favorite Button ───────────────────────────────────────────────── */
function FavoriteButton({ toolName }: { toolName: string }) {
  const favs = useFavoriteToolNames();
  const toggle = useToggleFavorite();
  const isFav = favs.has(toolName);

  return (
    <>
      <Show when="signed-in">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle.mutate({ toolName, isFav });
          }}
          aria-label={isFav ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
          className={`p-1 rounded-md transition ${
            isFav
              ? "text-pink-500 hover:text-pink-400"
              : "text-[var(--text-label)] hover:text-pink-400"
          }`}
        >
          <Heart className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
        </button>
      </Show>
      <Show when="signed-out">
        <Link
          to="/sign-in"
          aria-label="Anmelden, um zu favorisieren"
          className="p-1 rounded-md text-[var(--text-label)] hover:text-pink-400 transition"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-4 h-4" />
        </Link>
      </Show>
    </>
  );
}

/* ─── Tools Section ───────────────────────────────────────────────── */
function readToolFilterFromUrl(): { search: string; category: string } {
  if (typeof window === "undefined") return { search: "", category: "Alle" };
  const sp = new URLSearchParams(window.location.search);
  let search = sp.get("search") ?? "";
  const category = sp.get("category") ?? "Alle";
  if (!sp.has("search")) {
    const hashMatch = window.location.hash.match(/[?&]search=([^&]*)/);
    if (hashMatch) search = decodeURIComponent(hashMatch[1]);
  }
  return { search, category };
}

function ToolsSection() {
  const initial = readToolFilterFromUrl();
  const [search, setSearch] = useState(initial.search);
  const [activeCategory, setActiveCategory] = useState(initial.category);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    if (search.trim()) sp.set("search", search);
    else sp.delete("search");
    if (activeCategory && activeCategory !== "Alle")
      sp.set("category", activeCategory);
    else sp.delete("category");
    const qs = sp.toString();
    const newUrl =
      window.location.pathname +
      (qs ? `?${qs}` : "") +
      window.location.hash;
    window.history.replaceState(null, "", newUrl);
  }, [search, activeCategory]);

  const detailQuery = useMemo(() => {
    const sp = new URLSearchParams();
    if (search.trim()) sp.set("search", search);
    if (activeCategory && activeCategory !== "Alle")
      sp.set("category", activeCategory);
    const qs = sp.toString();
    return qs ? `?${qs}` : "";
  }, [search, activeCategory]);

  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    let result = tools;
    if (activeCategory !== "Alle") result = result.filter((t) => t.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    return expanded ? result : result.slice(0, 8);
  }, [search, activeCategory, expanded]);

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case "Kostenlos": return "bg-emerald-500/10 text-emerald-400";
      case "Freemium": return "bg-blue-500/10 text-blue-400";
      case "Kostenpflichtig": return "bg-amber-500/10 text-amber-400";
      default: return "bg-[var(--bg-section-alt)] text-[var(--text-caption)]";
    }
  };

  const getContrastColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 160 ? "#0F172A" : "#FFFFFF";
  };

  return (
    <section id="tools" className="max-w-7xl mx-auto px-6 py-16 border-t border-[var(--border-color)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Wrench className="w-6 h-6 text-purple-400" /> KI-Tool Verzeichnis
          </h2>
          <p className="text-[var(--text-caption)] text-sm mt-1">Die weltweit besten KI-Tools, von uns getestet und kategorisiert.</p>
        </div>
        <span className="text-sm font-semibold text-purple-400">{tools.length}+ Tools</span>
      </div>

      {/* Search */}
      <div className="max-w-xl mb-6 bg-[var(--bg-card)] border border-[var(--border-color)] p-2 rounded-2xl flex items-center focus-within:border-purple-500/50 transition">
        <Search className="ml-2 w-4 h-4 text-[var(--text-label)]" />
        <input
          type="text"
          placeholder="Suche Tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent px-3 py-2 w-full text-[var(--text-body)] focus:outline-none placeholder-[var(--text-label)] text-sm"
        />
      </div>

      {/* Filter-Tags */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 text-sm no-scrollbar">
        {["Alle", ...toolCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl font-medium cursor-pointer shrink-0 transition ${
              activeCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-[var(--bg-card)] hover:bg-slate-800 text-[var(--text-caption)] border border-[var(--border-color)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tool Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((tool, i) => (
            <motion.div
              key={`${tool.name}|${tool.category}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: (i % 12) * 0.03 }}
              className="bg-[var(--bg-card)]/40 border border-[var(--border-color)] p-6 rounded-2xl hover:border-purple-500/40 transition card-glow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <ToolLogo name={tool.name} color={tool.color} url={tool.url} logoUrl={tool.logoUrl} />
                  <div className="flex items-center gap-1">
                    <FavoriteButton toolName={tool.name} />
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${getPricingColor(tool.pricing)}`}>
                      {tool.pricing}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                <p className="text-[var(--text-caption)] text-xs line-clamp-2 mb-4">{tool.description}</p>
              </div>
              <div className="text-xs text-[var(--text-label)] font-medium pt-2 border-t border-[var(--border-color)] flex items-center justify-between">
                <span>{tool.category}</span>
                <div className="flex items-center gap-3">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-label)] hover:text-purple-300 transition inline-flex items-center gap-1"
                    aria-label={`${tool.name} Website öffnen`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link
                    href={`/tools/${toolSlug(tool)}${detailQuery}`}
                    className="text-purple-400 hover:text-purple-300 transition inline-flex items-center gap-1"
                  >
                    Details <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-10 h-10 text-[var(--text-label)] mx-auto mb-3" />
          <p className="text-[var(--text-caption)]">Keine Tools gefunden. Versuche einen anderen Suchbegriff.</p>
        </div>
      )}
    </section>
  );
}

/* ─── Courses Section (Academy) ───────────────────────────────────────────── */
function CoursesSection() {
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    let result = courses;
    if (activeFilter === "Kostenlos") result = courses.filter((c) => c.pricing === "Kostenlos");
    else if (activeFilter === "Deutsch") result = courses.filter((c) => c.language === "Deutsch");
    else if (activeFilter === "Englisch") result = courses.filter((c) => c.language === "Englisch");
    else if (activeFilter === "Anfänger") result = courses.filter((c) => c.level === "Anfänger");
    else if (activeFilter !== "Alle") result = courses.filter((c) => c.category === activeFilter);
    return expanded ? result : result.slice(0, 4);
  }, [activeFilter, expanded]);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "Anfänger": return { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" };
      case "Fortgeschritten": return { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" };
      case "Experte": return { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" };
      default: return { bg: "bg-[var(--bg-section-alt)]", text: "text-[var(--text-caption)]", border: "border-[var(--border-color)]" };
    }
  };

  return (
    <section id="academy" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <GraduationCap className="w-7 h-7 text-purple-400" /> CentofAI Academy
        </h2>
        <p className="text-[var(--text-caption)] mt-2">
          Vom Einsteiger zum Prompt-Engineer. Erweitere deine Skills in unseren Videokursen und exklusiven Live-Workshops.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {courseCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === cat
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                : "bg-[var(--bg-card)] text-[var(--text-caption)] hover:text-white hover:bg-slate-800 border border-[var(--border-color)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2-Spalten Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((course: any, i: number) => {
            const badge = getLevelBadge(course.level);
            return (
              <motion.div
                key={course.name + course.provider}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[var(--bg-card)]/50 border border-[var(--border-color)] p-8 rounded-2xl flex flex-col justify-between hover:border-purple-500/30 transition card-glow"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${badge.bg} ${badge.text} border ${badge.border}`}>
                      {course.level}
                    </span>
                    <span className="text-[var(--text-label)] text-xs font-medium">{course.language} • {course.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{course.name}</h3>
                  <p className="text-[var(--text-caption)] text-sm mb-6 leading-relaxed">{course.description}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]/60">
                  <span className="text-xl font-bold text-white">{course.pricing === "Kostenlos" ? "Kostenlos" : "Paid"}</span>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
                  >
                    Jetzt starten
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Mehr/Weniger Toggle */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-purple-400 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 transition cursor-pointer"
          >
            {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
    </section>
  );
}

/* ─── Ideas Section ─────────────────────────────────────────────────── */
function IdeasSection() {
  const [formData, setFormData] = useState({ name: "", email: "", idea: "", budget: "", timeline: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.idea.trim()) return;
    setStatus("sending");
    setErrMsg("");
    try {
      await api.submitProposal({
        name: formData.name,
        email: formData.email,
        idea: formData.idea,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
      });
      setStatus("success");
      setTimeout(() => { setStatus("idle"); setFormData({ name: "", email: "", idea: "", budget: "", timeline: "" }); }, 4000);
    } catch (err) {
      setStatus("error");
      setErrMsg((err as Error).message || "Fehler beim Senden. Bitte versuche es erneut.");
    }
  };

  return (
    <section id="ideas" className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-purple-400" /> Hast du eine Idee?
          </h2>
          <p className="text-[var(--text-caption)] text-lg mb-8">
            Du hast ein KI-Tool entdeckt, das unbedingt in unser Verzeichnis gehört?
            Oder eine Projektidee, die wir als Website oder Mobile App umsetzen sollten?
            Teile sie uns mit — wir prüfen sie und entwickeln sie für dich.
          </p>
          <div className="space-y-4">
            {[
              "Tool-Vorschläge für das Verzeichnis",
              "Projektideen für digitale Umsetzung",
              "Feedback zur Plattform",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                <span className="text-[var(--text-body)]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-card)]/50 border border-[var(--border-color)] p-8 rounded-2xl">
          {status === "success" ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Danke für deine Idee!</h3>
              <p className="text-[var(--text-caption)]">Wir prüfen sie und melden uns bei dir.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Dein Name *"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 text-sm text-white bg-white/10 border border-white/20 rounded-xl placeholder:text-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition"
              />
              <input
                type="email"
                placeholder="Deine E-Mail *"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3 text-sm text-white bg-white/10 border border-white/20 rounded-xl placeholder:text-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition"
              />
              <textarea
                placeholder="Beschreibe deine Idee... *"
                value={formData.idea}
                onChange={(e) => setFormData((p) => ({ ...p, idea: e.target.value }))}
                className="w-full px-4 py-3 text-sm text-white bg-white/10 border border-white/20 rounded-xl resize-none placeholder:text-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition"
                rows={4}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Budget (optional)"
                  value={formData.budget}
                  onChange={(e) => setFormData((p) => ({ ...p, budget: e.target.value }))}
                  className="w-full px-4 py-3 text-sm text-white bg-white/10 border border-white/20 rounded-xl placeholder:text-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition"
                />
                <input
                  type="text"
                  placeholder="Zeitrahmen (optional)"
                  value={formData.timeline}
                  onChange={(e) => setFormData((p) => ({ ...p, timeline: e.target.value }))}
                  className="w-full px-4 py-3 text-sm text-white bg-white/10 border border-white/20 rounded-xl placeholder:text-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition"
                />
              </div>
              {status === "error" && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{errMsg}</p>
              )}
              <button
                onClick={handleSubmit}
                disabled={status === "sending" || !formData.name.trim() || !formData.email.trim() || !formData.idea.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl text-sm transition flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Wird gesendet...</>
                ) : (
                  <><Send className="w-4 h-4" />Idee einreichen</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer + Newsletter ───────────────────────────────────────────── */
function Footer() {
  const [email, setEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNlStatus("sending");
    try {
      await api.subscribeNewsletter(email.trim());
      setNlStatus("success");
      setEmail("");
    } catch {
      setNlStatus("error");
    }
  };

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-page)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Newsletter Box */}
        <div id="newsletter" className="bg-gradient-to-r from-purple-950/40 to-[var(--bg-card)] border border-[var(--border-color)] p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold">Nichts mehr verpassen</h4>
            <p className="text-[var(--text-caption)] text-xs mt-1">Erhalte 1x pro Woche die wichtigsten KI-Tools & News direkt in dein Postfach.</p>
          </div>
          {nlStatus === "success" ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" /> Danke für dein Abo!
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input type="email" required placeholder="Deine E-Mail"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  disabled={nlStatus === "sending"}
                  className="bg-[var(--bg-page)] border border-[var(--border-color)] px-4 py-2.5 rounded-xl text-sm text-[var(--text-body)] focus:outline-none focus:border-purple-500 w-full md:w-64 disabled:opacity-50" />
                <button type="submit" disabled={nlStatus === "sending"} className="bg-white text-slate-950 hover:bg-slate-200 disabled:opacity-50 font-bold px-5 py-2.5 rounded-xl text-sm transition whitespace-nowrap">
                  {nlStatus === "sending" ? "…" : "Abonnieren"}
                </button>
              </form>
              {nlStatus === "error" && (
                <p className="text-xs text-red-400">Fehler beim Anmelden. Bitte versuche es erneut.</p>
              )}
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--text-label)] pt-8 border-t border-[var(--border-color)]">
          <p>© {new Date().getFullYear()} CentofAI. Alle Rechte vorbehalten.</p>
          <div className="space-x-6">
            <Link to="/impressum" className="hover:text-[var(--text-caption)] transition">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-[var(--text-caption)] transition">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main App ────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] font-sans antialiased scroll-smooth">
      <Navbar />
      <Hero />
      <IdeasSection />
      <ToolsSection />
      <CoursesSection />
      <Footer />
    </div>
  );
}
