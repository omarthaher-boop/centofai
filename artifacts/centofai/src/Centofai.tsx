import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, GraduationCap, Wrench, Mail,
  ArrowRight, ExternalLink, Zap, Brain, Sparkles, TrendingUp,
  CheckCircle2, Bot, BookOpen, Tag, Languages, ArrowUpRight,
  Users, Lightbulb, Send, ChevronDown, Package, Heart,
  MapPin, Code2,
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

function NodeGraph() {
  return (
    <svg
      width="340"
      height="280"
      viewBox="0 0 340 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: 0, right: 0, opacity: 0.4, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <line x1="60" y1="60" x2="170" y2="40" stroke="#534AB7" strokeWidth="1" />
      <line x1="170" y1="40" x2="280" y2="100" stroke="#534AB7" strokeWidth="1" />
      <line x1="280" y1="100" x2="220" y2="200" stroke="#3C3489" strokeWidth="1" />
      <line x1="220" y1="200" x2="100" y2="180" stroke="#3C3489" strokeWidth="1" />
      <line x1="100" y1="180" x2="60" y2="60" stroke="#26215C" strokeWidth="1" />
      <line x1="170" y1="40" x2="220" y2="200" stroke="#26215C" strokeWidth="0.5" />
      <line x1="60" y1="60" x2="280" y2="100" stroke="#534AB7" strokeWidth="0.5" />
      <circle cx="60" cy="60" r="6" fill="#534AB7" />
      <circle cx="170" cy="40" r="5" fill="#7F77DD" />
      <circle cx="280" cy="100" r="7" fill="#534AB7" />
      <circle cx="220" cy="200" r="5" fill="#3C3489" />
      <circle cx="100" cy="180" r="6" fill="#7F77DD" />
    </svg>
  );
}

function Hero() {
  const [ctaHovered, setCtaHovered] = useState(false);
  const [moreHovered, setMoreHovered] = useState(false);
  return (
    <header id="home" className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative overflow-hidden">
      <NodeGraph />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: '540px' }}
      >
        {/* Eyebrow Badge */}
        <div
          className="inline-flex items-center gap-2 mb-6"
          style={{
            background: "rgba(4,44,83,0.9)",
            border: "0.5px solid #185FA5",
            borderRadius: 20,
            padding: "5px 14px",
            fontSize: 11,
            color: "#B5D4F4",
            letterSpacing: "0.06em",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#378ADD", display: "inline-block", flexShrink: 0 }} />
          KI-gestützte digitale Lösungen
        </div>

        {/* H1 */}
        <h1 style={{ fontSize: 42, fontWeight: 500, lineHeight: 1.2, color: "#E6F1FB", marginBottom: 20 }}>
          Ihr Alltag. Ihr Problem.{" "}
          <span style={{ color: "#378ADD" }}>Unsere Lösung.</span>
        </h1>

        {/* Subtext */}
        <p style={{ fontSize: 15, color: "#85B7EB", lineHeight: 1.7, marginBottom: 0 }}>
          Ob Studierende, Unternehmerinnen und Unternehmer oder Akademikerinnen — wir analysieren Ihr Anliegen mit modernsten KI-Tools und entwickeln eine maßgeschneiderte digitale Lösung. Das erste Gespräch ist kostenlos.
        </p>

        {/* Tricolor-Trennlinie */}
        <div style={{
          display: 'flex',
          width: '100%',
          maxWidth: '460px',
          height: '2px',
          borderRadius: '1px',
          overflow: 'hidden',
          margin: '20px 0',
        }}>
          <div style={{ flex: 1, background: '#185FA5' }} />
          <div style={{ flex: 1, background: '#0C7C5A' }} />
          <div style={{ flex: 1, background: '#1D9E75' }} />
        </div>

        {/* Buttons — nebeneinander */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px' }}>

          {/* Mehr erfahren — Sekundär */}
          <a
            href="/mehr-erfahren"
            onMouseEnter={() => setMoreHovered(true)}
            onMouseLeave={() => setMoreHovered(false)}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{
              padding: '4px',
              borderRadius: '50px',
              border: `1.5px solid rgba(56,138,221,0.4)`,
              background: moreHovered ? 'rgba(24,95,165,0.1)' : 'transparent',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
            }}>
              <div style={{
                padding: '13px 28px',
                borderRadius: '50px',
                background: 'transparent',
                color: moreHovered ? '#E6F1FB' : '#85B7EB',
                fontFamily: 'inherit',
                fontSize: '15px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s ease',
              }}>
                Mehr erfahren
                <span style={{
                  background: 'rgba(56,138,221,0.2)',
                  color: moreHovered ? '#E6F1FB' : '#85B7EB',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '600',
                  flexShrink: 0,
                  transition: 'color 0.2s ease',
                }}>→</span>
              </div>
            </div>
          </a>

          {/* CTA: Jetzt kostenlos starten — Primär */}
          <a
            href="/kontakt"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '10px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{
              padding: '4px',
              borderRadius: '50px',
              border: 'none',
              background: 'transparent',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
            }}>
              <div style={{
                padding: '14px 32px',
                borderRadius: '50px',
                background: ctaHovered ? '#0C447C' : '#185FA5',
                color: '#E6F1FB',
                fontFamily: 'inherit',
                fontSize: '16px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s ease',
              }}>
                Jetzt kostenlos starten
                <span style={{
                  background: ctaHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.15)',
                  color: '#E6F1FB',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  flexShrink: 0,
                  transition: 'background 0.2s ease',
                }}>→</span>
              </div>
            </div>
          </a>

        </div>
      </motion.div>

      {/* Stats Bar */}
      <div
        style={{
          marginTop: "40px",
          border: "0.5px solid rgba(24,95,165,0.2)",
          borderRadius: 12,
          background: "rgba(4,8,15,0.6)",
          maxWidth: 520,
          display: "flex",
        }}
      >
        <div style={{ flex: 1, padding: "16px 20px", borderRight: "0.5px solid rgba(24,95,165,0.2)", textAlign: "center" }}>
          <p style={{ fontSize: 20, color: "#E6F1FB", fontWeight: 600, marginBottom: 2 }}>100%</p>
          <p style={{ fontSize: 11, color: "#378ADD" }}>Erstgespräch kostenlos</p>
        </div>
        <div style={{ flex: 1, padding: "16px 20px", borderRight: "0.5px solid rgba(29,158,117,0.2)", textAlign: "center" }}>
          <p style={{ fontSize: 20, color: "#9FE1CB", fontWeight: 600, marginBottom: 2 }}>KI</p>
          <p style={{ fontSize: 11, color: "#5DCAA5" }}>gestützte Analyse</p>
        </div>
        <div style={{ flex: 1, padding: "16px 20px", textAlign: "center" }}>
          <p style={{ fontSize: 20, color: "#9FE1CB", fontWeight: 600, marginBottom: 2 }}>Individuell</p>
          <p style={{ fontSize: 11, color: "#5DCAA5" }}>Individuelle Preismodelle</p>
        </div>
      </div>

      {/* Drei Karten */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px',
        width: '100%',
        maxWidth: '760px',
        marginTop: '28px',
      }}>
        {/* Karte 1 */}
        <div style={{
          background: 'rgba(4,44,83,0.4)',
          border: '0.5px solid rgba(24,95,165,0.35)',
          borderRadius: '10px',
          borderTop: '3px solid #185FA5',
          padding: '20px 16px',
        }}>
          <p style={{ fontSize: '9px', color: '#85B7EB', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>
            Erstgespräch
          </p>
          <p style={{ fontSize: '20px', fontWeight: '700', color: '#E6F1FB', marginBottom: '8px' }}>
            Kostenlos
          </p>
          <p style={{ fontSize: '11px', color: '#378ADD' }}>
            Immer &amp; garantiert
          </p>
        </div>

        {/* Karte 2 */}
        <div style={{
          background: 'rgba(12,124,90,0.12)',
          border: '0.5px solid rgba(12,124,90,0.35)',
          borderRadius: '10px',
          borderTop: '3px solid #0C7C5A',
          padding: '20px 16px',
        }}>
          <p style={{ fontSize: '9px', color: '#5DCAA5', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>
            KI-Analyse
          </p>
          <p style={{ fontSize: '16px', fontWeight: '700', color: '#9FE1CB', marginBottom: '4px' }}>
            Präzise &amp; schnell
          </p>
          <p style={{ fontSize: '11px', color: '#5DCAA5' }}>
            Modernste KI-Tools
          </p>
        </div>

        {/* Karte 3 */}
        <div style={{
          background: 'rgba(29,158,117,0.1)',
          border: '0.5px solid rgba(29,158,117,0.3)',
          borderRadius: '10px',
          borderTop: '3px solid #1D9E75',
          padding: '20px 16px',
        }}>
          <p style={{ fontSize: '9px', color: '#5DCAA5', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>
            Preismodelle
          </p>
          <p style={{ fontSize: '16px', fontWeight: '700', color: '#9FE1CB', marginBottom: '4px' }}>
            Nach Auftrag
          </p>
          <p style={{ fontSize: '16px', fontWeight: '700', color: '#9FE1CB', marginBottom: '10px' }}>
            individuell
          </p>
          <span style={{ fontSize: '10px', color: '#1D9E75', padding: '4px 10px', background: 'rgba(29,158,117,0.1)', borderRadius: '6px' }}>
            Ab Auftragsfreigabe
          </span>
        </div>
      </div>
    </header>
  );
}

/* ─── Strategy Section ─────────────────────────────────────────── */
function StrategySection() {
  const steps = [
    { n: "1", title: "Problem einsenden", desc: "Senden Sie uns Ihr Anliegen — egal wie groß oder klein. Kein Problem ist zu unbedeutend." },
    { n: "2", title: "KI-gestützte Analyse", desc: "Mithilfe modernster KI-Tools analysieren wir Ihr Problem präzise und effizient." },
    { n: "3", title: "Expertenberatung", desc: "Wir ziehen gezielt Fachexpertinnen und -experten aus dem relevanten Bereich hinzu." },
    { n: "4", title: "Digitale Umsetzung", desc: "Vollständige Programmierung und technische Realisierung Ihrer maßgeschneiderten Lösung." },
  ];

  return (
    <section id="strategie" style={{ padding: '80px 0', width: '100%' }}>
      <div style={{ maxWidth: '780px', width: '100%', margin: '0 auto', padding: '0 24px', marginBottom: '64px' }}>
      {/* Button */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 36, marginBottom: 36 }}>
        <button
          style={{
            background: "rgba(38,33,92,0.5)",
            border: "0.5px solid #534AB7",
            color: "#CECBF6",
            fontSize: 15,
            fontWeight: 500,
            borderRadius: 10,
            padding: "14px 32px",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            cursor: "default",
          }}
        >
          <MapPin className="w-4 h-4" style={{ color: "#7F77DD" }} />
          Unsere Strategie
        </button>
      </div>

      {/* Slogan */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <p style={{ fontSize: 28, fontWeight: 500, color: "#EEEDFE", letterSpacing: "0.04em", lineHeight: 1.6 }}>
          <span style={{ color: "#AFA9EC" }}>Weniger Stress.</span>
          {" "}
          <span style={{ color: "#7F77DD" }}>Mehr Klarheit.</span>
          {" "}
          <span style={{ color: "#CECBF6" }}>Jeden Tag.</span>
        </p>
        <div style={{ width: 48, height: 2, background: "#534AB7", margin: "16px auto 0", borderRadius: 2 }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ fontSize: 28, color: "#EEEDFE", fontWeight: 500, marginBottom: 20, textAlign: "center" }}>
          Wir entwickeln unsere Projekte aus Ihrer Realität heraus.
        </h2>

        <p style={{ fontSize: 15, color: "#AFA9EC", lineHeight: 1.75, marginBottom: 32, textAlign: "center" }}>
          Wir glauben daran, dass Technologie das Leben einfacher machen kann — für alle. Manchmal sind es keine großen Krisen, die uns belasten, sondern die kleinen, alltäglichen Probleme, die sich still anhäufen: komplexe Prozesse, zeitintensive Bürokratie, stundenlange Recherchen ohne klare Antwort. Was klein klingt, kann auf Dauer zu einer echten Belastung werden — für Ihre Zeit, Ihre Nerven und nicht zuletzt für Ihre Gesundheit.
        </p>

        {/* 4-Steps Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {steps.map((s) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{
                background: "rgba(10,10,30,0.5)",
                border: "0.5px solid rgba(127,119,221,0.2)",
                borderRadius: 10,
                padding: "20px 24px",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#534AB7",
                  color: "#EEEDFE",
                  fontSize: 12,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {s.n}
              </span>
              <div>
                <p style={{ fontSize: 14, color: "#EEEDFE", fontWeight: 600, marginBottom: 4 }}>{s.title}</p>
                <p style={{ fontSize: 13, color: "#AFA9EC", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Quote */}
        <div style={{ borderLeft: "2px solid #534AB7", paddingLeft: 18 }}>
          <p style={{ fontSize: 14, color: "#AFA9EC", lineHeight: 1.8 }}>
            Auch wenn die finanziellen Mittel begrenzt sind: Durch unsere flexiblen Vergütungsmodelle und Kooperationsmodelle können Sie Ihre Idee nahezu kostenfrei verwirklichen. Alle Erstgespräche sind kostenlos. Denn eine gute Idee sollte niemals an finanziellen Hürden scheitern.
          </p>
        </div>

      </motion.div>
      </div>
    </section>
  );
}

/* ─── Workflow Section ──────────────────────────────────────────── */
function WorkflowSection() {
  return (
    <section style={{
      width: '100%',
      padding: '80px 0 60px',
      background: 'rgba(7,7,26,0.8)',
      borderTop: '0.5px solid rgba(83,74,183,0.15)',
      borderBottom: '0.5px solid rgba(83,74,183,0.15)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Dot-Raster */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(175,169,236,0.18) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      {/* Abschnitts-Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '48px',
        position: 'relative', zIndex: 1,
        padding: '0 24px',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(38,33,92,0.7)',
          border: '0.5px solid #534AB7', borderRadius: '20px',
          padding: '5px 16px', fontSize: '11px', color: '#CECBF6',
          letterSpacing: '0.08em', marginBottom: '16px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%',
                         background: '#5DCAA5', display: 'inline-block' }} />
          Transparenz & Vertrauen
        </span>
        <h2 style={{
          fontSize: '30px', fontWeight: '500',
          color: '#EEEDFE', marginBottom: '10px', lineHeight: '1.3',
        }}>
          Unser{' '}
          <span style={{ color: '#7F77DD' }}>Workflow</span>
        </h2>
        <p style={{
          fontSize: '15px', color: '#AFA9EC',
          lineHeight: '1.7', maxWidth: '480px', margin: '0 auto',
        }}>
          Von der ersten Idee bis zum fertigen digitalen Produkt —
          kollaborativ, KI-gestützt und vollständig transparent.
        </p>
      </div>

      {/* SVG Workflow — volle Breite */}
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 16px',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          background: 'rgba(13,13,43,0.5)',
          border: '0.5px solid rgba(83,74,183,0.2)',
          borderRadius: '16px',
          padding: '28px 16px',
          overflow: 'hidden',
        }}>
          <svg
            width="100%"
            viewBox="0 0 680 860"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker id="wf-arr" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>

            {/* SWIMLANE HINTERGRÜNDE */}
            <rect x="0" y="0" width="680" height="110"
              fill="rgba(83,74,183,0.06)"/>
            <rect x="0" y="0" width="3" height="110"
              fill="#534AB7" opacity="0.7"/>
            <text x="16" y="30" fontFamily="system-ui,sans-serif"
              fontSize="10" fontWeight="500"
              fill="rgba(175,169,236,0.5)" letterSpacing="1.5">NUTZER</text>

            <rect x="0" y="110" width="680" height="120"
              fill="rgba(83,74,183,0.1)"/>
            <rect x="0" y="110" width="3" height="120"
              fill="#7F77DD" opacity="0.7"/>
            <text x="16" y="138" fontFamily="system-ui,sans-serif"
              fontSize="10" fontWeight="500"
              fill="rgba(175,169,236,0.5)" letterSpacing="1.5">
              CENTOFAI TEAM
            </text>

            <rect x="0" y="230" width="680" height="110"
              fill="rgba(29,158,117,0.06)"/>
            <rect x="0" y="230" width="3" height="110"
              fill="#1D9E75" opacity="0.7"/>
            <text x="16" y="258" fontFamily="system-ui,sans-serif"
              fontSize="10" fontWeight="500"
              fill="rgba(93,202,165,0.5)" letterSpacing="1.5">EXPERTEN</text>

            <rect x="0" y="340" width="680" height="120"
              fill="rgba(83,74,183,0.07)"/>
            <rect x="0" y="340" width="3" height="120"
              fill="#AFA9EC" opacity="0.7"/>
            <text x="16" y="368" fontFamily="system-ui,sans-serif"
              fontSize="10" fontWeight="500"
              fill="rgba(175,169,236,0.4)" letterSpacing="1.5">
              TEAM + NUTZER
            </text>

            <rect x="0" y="460" width="680" height="160"
              fill="rgba(186,117,23,0.06)"/>
            <rect x="0" y="460" width="3" height="160"
              fill="#EF9F27" opacity="0.7"/>
            <text x="16" y="488" fontFamily="system-ui,sans-serif"
              fontSize="10" fontWeight="500"
              fill="rgba(239,159,39,0.5)" letterSpacing="1.5">
              ALLE BETEILIGTEN
            </text>

            <rect x="0" y="620" width="680" height="100"
              fill="rgba(83,74,183,0.08)"/>
            <rect x="0" y="620" width="3" height="100"
              fill="#5DCAA5" opacity="0.7"/>
            <text x="16" y="648" fontFamily="system-ui,sans-serif"
              fontSize="10" fontWeight="500"
              fill="rgba(93,202,165,0.5)" letterSpacing="1.5">ERGEBNIS</text>

            {/* Trennlinien */}
            <line x1="0" y1="110" x2="680" y2="110"
              stroke="rgba(83,74,183,0.2)" strokeWidth="0.5"/>
            <line x1="0" y1="230" x2="680" y2="230"
              stroke="rgba(83,74,183,0.2)" strokeWidth="0.5"/>
            <line x1="0" y1="340" x2="680" y2="340"
              stroke="rgba(83,74,183,0.2)" strokeWidth="0.5"/>
            <line x1="0" y1="460" x2="680" y2="460"
              stroke="rgba(83,74,183,0.2)" strokeWidth="0.5"/>
            <line x1="0" y1="620" x2="680" y2="620"
              stroke="rgba(93,202,165,0.2)" strokeWidth="0.5"/>
            <line x1="0" y1="720" x2="680" y2="720"
              stroke="rgba(93,202,165,0.2)" strokeWidth="0.5"/>

            {/* LANE 1: NUTZER */}
            <rect x="250" y="30" width="180" height="52" rx="8"
              fill="rgba(83,74,183,0.08)" stroke="#7F77DD" strokeWidth="1.2"/>
            <text x="340" y="52" fontFamily="system-ui,sans-serif"
              fontSize="13" fontWeight="600" fill="#CECBF6"
              textAnchor="middle" dominantBaseline="central">
              Idee einreichen
            </text>
            <text x="340" y="70" fontFamily="system-ui,sans-serif"
              fontSize="10" fill="#7F77DD"
              textAnchor="middle" dominantBaseline="central">Nutzer</text>
            <line x1="340" y1="82" x2="340" y2="126"
              stroke="#7F77DD" strokeWidth="1.2"
              markerEnd="url(#wf-arr)"/>

            {/* LANE 2: TEAM */}
            <rect x="130" y="128" width="160" height="52" rx="8"
              fill="rgba(83,74,183,0.08)" stroke="#534AB7" strokeWidth="1.2"/>
            <text x="210" y="150" fontFamily="system-ui,sans-serif"
              fontSize="12" fontWeight="600" fill="#CECBF6"
              textAnchor="middle" dominantBaseline="central">
              Interne Analyse
            </text>
            <text x="210" y="168" fontFamily="system-ui,sans-serif"
              fontSize="10" fill="#7F77DD"
              textAnchor="middle" dominantBaseline="central">
              Centofai-Team
            </text>
            <line x1="290" y1="154" x2="358" y2="154"
              stroke="#534AB7" strokeWidth="1.2"
              markerEnd="url(#wf-arr)"/>
            <rect x="360" y="128" width="180" height="52" rx="8"
              fill="rgba(83,74,183,0.08)" stroke="#534AB7" strokeWidth="1.2"/>
            <text x="450" y="148" fontFamily="system-ui,sans-serif"
              fontSize="12" fontWeight="600" fill="#CECBF6"
              textAnchor="middle" dominantBaseline="central">
              Machbarkeits-
            </text>
            <text x="450" y="166" fontFamily="system-ui,sans-serif"
              fontSize="12" fontWeight="600" fill="#CECBF6"
              textAnchor="middle" dominantBaseline="central">
              prüfung
            </text>
            <line x1="450" y1="180" x2="450" y2="246"
              stroke="#1D9E75" strokeWidth="1.2"
              markerEnd="url(#wf-arr)"/>

            {/* LANE 3: EXPERTEN */}
            <rect x="320" y="248" width="180" height="52" rx="8"
              fill="rgba(29,158,117,0.08)" stroke="#1D9E75" strokeWidth="1.2"/>
            <text x="410" y="268" fontFamily="system-ui,sans-serif"
              fontSize="12" fontWeight="600" fill="#5DCAA5"
              textAnchor="middle" dominantBaseline="central">
              Experten-
            </text>
            <text x="410" y="286" fontFamily="system-ui,sans-serif"
              fontSize="12" fontWeight="600" fill="#5DCAA5"
              textAnchor="middle" dominantBaseline="central">
              konsultation
            </text>
            <line x1="320" y1="274" x2="248" y2="274"
              stroke="#1D9E75" strokeWidth="1.2"
              markerEnd="url(#wf-arr)"/>
            <rect x="100" y="248" width="146" height="52" rx="8"
              fill="rgba(29,158,117,0.08)" stroke="#1D9E75" strokeWidth="1.2"/>
            <text x="173" y="268" fontFamily="system-ui,sans-serif"
              fontSize="12" fontWeight="600" fill="#5DCAA5"
              textAnchor="middle" dominantBaseline="central">
              Lösungsansätze
            </text>
            <text x="173" y="286" fontFamily="system-ui,sans-serif"
              fontSize="12" fontWeight="600" fill="#5DCAA5"
              textAnchor="middle" dominantBaseline="central">
              entwickeln
            </text>
            <line x1="173" y1="300" x2="173" y2="356"
              stroke="#AFA9EC" strokeWidth="1.2"
              markerEnd="url(#wf-arr)"/>

            {/* LANE 4: TEAM + NUTZER */}
            <rect x="90" y="358" width="166" height="52" rx="8"
              fill="rgba(83,74,183,0.08)" stroke="#AFA9EC" strokeWidth="1.2"/>
            <text x="173" y="378" fontFamily="system-ui,sans-serif"
              fontSize="12" fontWeight="600" fill="#CECBF6"
              textAnchor="middle" dominantBaseline="central">
              Feedback an
            </text>
            <text x="173" y="396" fontFamily="system-ui,sans-serif"
              fontSize="12" fontWeight="600" fill="#CECBF6"
              textAnchor="middle" dominantBaseline="central">
              Nutzer
            </text>
            <line x1="256" y1="384" x2="294" y2="384"
              stroke="#AFA9EC" strokeWidth="1.2"
              markerEnd="url(#wf-arr)"/>
            <polygon points="360,358 424,384 360,410 296,384"
              fill="rgba(83,74,183,0.08)" stroke="#AFA9EC" strokeWidth="1.2"/>
            <text x="360" y="382" fontFamily="system-ui,sans-serif"
              fontSize="10" fontWeight="600" fill="#CECBF6"
              textAnchor="middle" dominantBaseline="central">
              Vereinba-
            </text>
            <text x="360" y="396" fontFamily="system-ui,sans-serif"
              fontSize="10" fontWeight="600" fill="#CECBF6"
              textAnchor="middle" dominantBaseline="central">
              rung?
            </text>
            <text x="432" y="372" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#AFA9EC">Nein</text>
            <path d="M424 384 L510 384 L510 274 L502 274"
              fill="none" stroke="#AFA9EC" strokeWidth="1"
              strokeDasharray="4 3" markerEnd="url(#wf-arr)"/>
            <text x="368" y="430" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#EF9F27">Ja</text>
            <line x1="360" y1="410" x2="360" y2="476"
              stroke="#EF9F27" strokeWidth="1.2"
              markerEnd="url(#wf-arr)"/>

            {/* LANE 5: ALLE BETEILIGTEN */}
            <rect x="60" y="478" width="160" height="64" rx="8"
              fill="rgba(186,117,23,0.06)" stroke="#BA7517" strokeWidth="1.2"/>
            <text x="140" y="500" fontFamily="system-ui,sans-serif"
              fontSize="11" fontWeight="600" fill="#FAC775"
              textAnchor="middle" dominantBaseline="central">
              Software-
            </text>
            <text x="140" y="516" fontFamily="system-ui,sans-serif"
              fontSize="11" fontWeight="600" fill="#FAC775"
              textAnchor="middle" dominantBaseline="central">
              ingenieure
            </text>
            <text x="140" y="532" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#BA7517"
              textAnchor="middle" dominantBaseline="central">
              + KI-Tools
            </text>
            <rect x="256" y="470" width="208" height="78" rx="8"
              fill="rgba(186,117,23,0.1)" stroke="#EF9F27" strokeWidth="1.5"/>
            <text x="360" y="498" fontFamily="system-ui,sans-serif"
              fontSize="13" fontWeight="600" fill="#FAC775"
              textAnchor="middle" dominantBaseline="central">
              KI-gestützte
            </text>
            <text x="360" y="518" fontFamily="system-ui,sans-serif"
              fontSize="13" fontWeight="600" fill="#FAC775"
              textAnchor="middle" dominantBaseline="central">
              Entwicklung
            </text>
            <text x="360" y="536" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#BA7517"
              textAnchor="middle" dominantBaseline="central">
              Agiles Team
            </text>
            <rect x="500" y="478" width="150" height="64" rx="8"
              fill="rgba(186,117,23,0.06)" stroke="#BA7517" strokeWidth="1.2"/>
            <text x="575" y="500" fontFamily="system-ui,sans-serif"
              fontSize="11" fontWeight="600" fill="#FAC775"
              textAnchor="middle" dominantBaseline="central">
              Branchen-
            </text>
            <text x="575" y="516" fontFamily="system-ui,sans-serif"
              fontSize="11" fontWeight="600" fill="#FAC775"
              textAnchor="middle" dominantBaseline="central">
              experten
            </text>
            <text x="575" y="532" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#BA7517"
              textAnchor="middle" dominantBaseline="central">
              + Nutzer-Feedback
            </text>
            <line x1="220" y1="510" x2="254" y2="510"
              stroke="#EF9F27" strokeWidth="1"
              markerEnd="url(#wf-arr)"/>
            <line x1="256" y1="520" x2="222" y2="520"
              stroke="#EF9F27" strokeWidth="1"
              markerEnd="url(#wf-arr)"/>
            <line x1="464" y1="510" x2="498" y2="510"
              stroke="#EF9F27" strokeWidth="1"
              markerEnd="url(#wf-arr)"/>
            <line x1="500" y1="520" x2="466" y2="520"
              stroke="#EF9F27" strokeWidth="1"
              markerEnd="url(#wf-arr)"/>
            <line x1="360" y1="548" x2="360" y2="578"
              stroke="#7F77DD" strokeWidth="1.2"
              markerEnd="url(#wf-arr)"/>
            <polygon points="360,578 408,600 360,622 312,600"
              fill="rgba(83,74,183,0.08)" stroke="#7F77DD" strokeWidth="1.2"/>
            <text x="360" y="600" fontFamily="system-ui,sans-serif"
              fontSize="10" fontWeight="600" fill="#CECBF6"
              textAnchor="middle" dominantBaseline="central">
              Freigabe?
            </text>
            <text x="416" y="590" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#AFA9EC">Nein</text>
            <path d="M408 600 L560 600 L560 509 L502 509"
              fill="none" stroke="#AFA9EC" strokeWidth="1"
              strokeDasharray="4 3" markerEnd="url(#wf-arr)"/>
            <text x="370" y="638" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#5DCAA5">Freigabe</text>
            <line x1="360" y1="622" x2="360" y2="648"
              stroke="#5DCAA5" strokeWidth="1.2"
              markerEnd="url(#wf-arr)"/>

            {/* LANE 6: ERGEBNIS */}
            <rect x="220" y="650" width="280" height="56" rx="8"
              fill="rgba(29,158,117,0.08)" stroke="#5DCAA5" strokeWidth="1.5"/>
            <text x="360" y="672" fontFamily="system-ui,sans-serif"
              fontSize="15" fontWeight="600" fill="#9FE1CB"
              textAnchor="middle" dominantBaseline="central">
              Digitales Produkt
            </text>
            <text x="360" y="692" fontFamily="system-ui,sans-serif"
              fontSize="10" fill="#1D9E75"
              textAnchor="middle" dominantBaseline="central">
              Launch &amp; Übergabe an Nutzer
            </text>
            <line x1="220" y1="678" x2="170" y2="678"
              stroke="#5DCAA5" strokeWidth="1"
              markerEnd="url(#wf-arr)"/>
            <line x1="500" y1="678" x2="550" y2="678"
              stroke="#5DCAA5" strokeWidth="1"
              markerEnd="url(#wf-arr)"/>
            <rect x="70" y="658" width="98" height="38" rx="6"
              fill="rgba(29,158,117,0.06)" stroke="#1D9E75" strokeWidth="1"/>
            <text x="119" y="672" fontFamily="system-ui,sans-serif"
              fontSize="11" fontWeight="500" fill="#5DCAA5"
              textAnchor="middle" dominantBaseline="central">
              Web-App
            </text>
            <text x="119" y="688" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#0F6E56"
              textAnchor="middle" dominantBaseline="central">/ SaaS</text>
            <rect x="550" y="658" width="98" height="38" rx="6"
              fill="rgba(29,158,117,0.06)" stroke="#1D9E75" strokeWidth="1"/>
            <text x="599" y="672" fontFamily="system-ui,sans-serif"
              fontSize="11" fontWeight="500" fill="#5DCAA5"
              textAnchor="middle" dominantBaseline="central">
              Mobile-App
            </text>
            <text x="599" y="688" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#0F6E56"
              textAnchor="middle" dominantBaseline="central">/ KI-Tool</text>

            {/* LEGENDE */}
            <rect x="20" y="740" width="640" height="54" rx="8"
              fill="rgba(83,74,183,0.06)"
              stroke="rgba(83,74,183,0.2)" strokeWidth="0.5"/>
            <text x="40" y="760" fontFamily="system-ui,sans-serif"
              fontSize="9" fontWeight="600" fill="#AFA9EC"
              letterSpacing="1">LEGENDE</text>
            <rect x="40" y="772" width="10" height="10" rx="2"
              fill="none" stroke="#7F77DD" strokeWidth="1.2"/>
            <text x="56" y="781" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#AFA9EC">Nutzer / Team</text>
            <rect x="180" y="772" width="10" height="10" rx="2"
              fill="none" stroke="#1D9E75" strokeWidth="1.2"/>
            <text x="196" y="781" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#AFA9EC">Experten &amp; Abstimmung</text>
            <rect x="360" y="772" width="10" height="10" rx="2"
              fill="none" stroke="#EF9F27" strokeWidth="1.2"/>
            <text x="376" y="781" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#AFA9EC">Entwicklung &amp; Prüfung</text>
            <line x1="496" y1="777" x2="520" y2="777"
              stroke="#AFA9EC" strokeWidth="1" strokeDasharray="4 3"/>
            <text x="526" y="781" fontFamily="system-ui,sans-serif"
              fontSize="9" fill="#AFA9EC">Rückschleife</text>
          </svg>
        </div>
      </div>

      {/* Link zur vollständigen Workflow-Seite */}
      <div style={{
        textAlign: 'center', marginTop: '36px',
        position: 'relative', zIndex: 1,
      }}>
        <a href="/mehr-erfahren" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '11px 24px', borderRadius: '8px',
          border: '0.5px solid rgba(127,119,221,0.4)',
          background: 'transparent', color: '#AFA9EC',
          fontSize: '13px', textDecoration: 'none',
        }}>
          Vollständigen Workflow ansehen →
        </a>
      </div>

    </section>
  );
}

/* ─── Feature Strip ────────────────────────────────────────────── */
function FeatureStrip() {
  const features = [
    { icon: Brain, title: "KI-Analyse", desc: "Ihr Problem wird mithilfe modernster KI-Tools analysiert." },
    { icon: Users, title: "Expertenberatung", desc: "Fachexpertinnen und -experten begleiten Sie von Anfang bis Ende." },
    { icon: Code2, title: "Digitale Umsetzung", desc: "Vollständige Programmierung und technische Realisierung Ihrer Lösung." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 border-t" style={{ borderColor: "rgba(127,119,221,0.12)" }}>
      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 px-6 py-6"
              style={i > 0 ? { borderLeft: "0.5px solid rgba(127,119,221,0.15)" } : undefined}
            >
              <div
                style={{
                  background: "rgba(83,74,183,0.2)",
                  border: "0.5px solid rgba(127,119,221,0.3)",
                  borderRadius: 8,
                  padding: 10,
                  flexShrink: 0,
                }}
              >
                <Icon className="w-5 h-5" style={{ color: "#7F77DD" }} />
              </div>
              <div>
                <p style={{ fontSize: 14, color: "#EEEDFE", fontWeight: 600, marginBottom: 4 }}>{f.title}</p>
                <p style={{ fontSize: 13, color: "#AFA9EC", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
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
    <section id="ki-tools" className="max-w-7xl mx-auto px-6 py-16 border-t border-[var(--border-color)]">
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
    <section id="kurse" className="max-w-7xl mx-auto px-6 py-20">
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
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [errors, setErrors] = useState({ name: false, email: false, idea: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = !formData.name.trim();
    const emailErr = !formData.email.trim() || !formData.email.includes("@");
    const ideaErr = !formData.idea.trim();

    if (nameErr || emailErr || ideaErr) {
      setErrors({ name: nameErr, email: emailErr, idea: ideaErr });
      return;
    }
    setErrors({ name: false, email: false, idea: false });

    const subject = encodeURIComponent(`Neue Idee von ${formData.name}`);
    const body = encodeURIComponent(
      `NEUE IDEE — CENTOF.AI\n` +
      `${"═".repeat(40)}\n\n` +
      `NAME\n${formData.name}\n\n` +
      `E-MAIL\n${formData.email}\n\n` +
      `IDEE / PROBLEM\n${formData.idea}\n\n` +
      `BUDGET\n${formData.budget || "— nicht angegeben —"}\n\n` +
      `ZEITRAHMEN\n${formData.timeline || "— nicht angegeben —"}\n\n` +
      `${"═".repeat(40)}\n` +
      `Gesendet über centof.ai`
    );

    window.location.href = `mailto:info@centof.ai?subject=${subject}&body=${body}`;
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setFormData({ name: "", email: "", idea: "", budget: "", timeline: "" });
    }, 4000);
  };

  return (
    <section id="ideen" className="max-w-7xl mx-auto px-6 py-20">
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
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Dein Name *"
                  value={formData.name}
                  onChange={(e) => { setFormData((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: false })); }}
                  className="w-full px-4 py-3 text-sm text-white bg-white/10 border border-white/20 rounded-xl placeholder:text-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition"
                />
                {errors.name && <p style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>Dieses Feld ist erforderlich.</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Deine E-Mail *"
                  value={formData.email}
                  onChange={(e) => { setFormData((p) => ({ ...p, email: e.target.value })); setErrors((p) => ({ ...p, email: false })); }}
                  className="w-full px-4 py-3 text-sm text-white bg-white/10 border border-white/20 rounded-xl placeholder:text-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition"
                />
                {errors.email && <p style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>Bitte gib eine gültige E-Mail-Adresse ein.</p>}
              </div>
              <div>
                <textarea
                  placeholder="Beschreibe deine Idee... *"
                  value={formData.idea}
                  onChange={(e) => { setFormData((p) => ({ ...p, idea: e.target.value })); setErrors((p) => ({ ...p, idea: false })); }}
                  className="w-full px-4 py-3 text-sm text-white bg-white/10 border border-white/20 rounded-xl resize-none placeholder:text-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition"
                  rows={4}
                />
                {errors.idea && <p style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>Dieses Feld ist erforderlich.</p>}
              </div>
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
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />Idee einreichen
              </button>
            </form>
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
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] font-sans antialiased scroll-smooth relative">
      <Navbar />
      <Hero />
      <StrategySection />
      <WorkflowSection />
      <FeatureStrip />
      <IdeasSection />
      <ToolsSection />
      <CoursesSection />
      <Footer />
    </div>
  );
}
