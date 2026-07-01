import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, GraduationCap, Wrench, Mail,
  ArrowRight, ExternalLink, Zap, Brain, Sparkles, TrendingUp,
  CheckCircle2, Bot, BookOpen, Tag, Languages, ArrowUpRight,
  Users, Lightbulb, Send, ChevronDown, Package, Heart,
  MapPin, Code2, Globe, Settings, Smartphone,
  HeartPulse, Briefcase,
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

function HumanAISketch() {
  return (
    <svg
      width="100%"
      viewBox="0 0 520 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      {/* ═══ HINTERGRUND RINGE ═══ */}
      <circle cx="130" cy="200" r="120" fill="none" stroke="rgba(83,74,183,0.08)" strokeWidth="1"/>
      <circle cx="130" cy="200" r="82" fill="none" stroke="rgba(83,74,183,0.06)" strokeWidth="0.8"/>
      <circle cx="390" cy="200" r="120" fill="none" stroke="rgba(29,158,117,0.08)" strokeWidth="1"/>
      <circle cx="390" cy="200" r="82" fill="none" stroke="rgba(29,158,117,0.06)" strokeWidth="0.8"/>

      {/* Drehende Ringe Mensch */}
      <circle cx="130" cy="200" r="100" fill="none" stroke="#534AB7" strokeWidth="0.8"
        strokeDasharray="12 20" opacity="0.4"
        style={{ transformOrigin:'130px 200px', animation:'hai-orbit-cw 12s linear infinite' }}/>
      <circle cx="130" cy="200" r="68" fill="none" stroke="#7F77DD" strokeWidth="0.5"
        strokeDasharray="6 16" opacity="0.3"
        style={{ transformOrigin:'130px 200px', animation:'hai-orbit-ccw 8s linear infinite' }}/>

      {/* Drehende Ringe KI */}
      <circle cx="390" cy="200" r="100" fill="none" stroke="#1D9E75" strokeWidth="0.8"
        strokeDasharray="12 20" opacity="0.4"
        style={{ transformOrigin:'390px 200px', animation:'hai-orbit-ccw 10s linear infinite' }}/>
      <circle cx="390" cy="200" r="68" fill="none" stroke="#5DCAA5" strokeWidth="0.5"
        strokeDasharray="6 16" opacity="0.3"
        style={{ transformOrigin:'390px 200px', animation:'hai-orbit-cw 9s linear infinite' }}/>

      {/* ═══ VERBINDUNGSLINIEN BASIS ═══ */}
      <line x1="196" y1="158" x2="260" y2="200" stroke="rgba(127,119,221,0.15)" strokeWidth="1"/>
      <line x1="196" y1="200" x2="260" y2="200" stroke="rgba(127,119,221,0.15)" strokeWidth="1"/>
      <line x1="196" y1="242" x2="260" y2="200" stroke="rgba(127,119,221,0.15)" strokeWidth="1"/>
      <line x1="324" y1="158" x2="260" y2="200" stroke="rgba(29,158,117,0.15)" strokeWidth="1"/>
      <line x1="324" y1="200" x2="260" y2="200" stroke="rgba(29,158,117,0.15)" strokeWidth="1"/>
      <line x1="324" y1="242" x2="260" y2="200" stroke="rgba(29,158,117,0.15)" strokeWidth="1"/>

      {/* Animierte Ströme Mensch→Zentrum */}
      <line x1="196" y1="158" x2="260" y2="200" stroke="#7F77DD" strokeWidth="1.5"
        strokeDasharray="6 10" style={{ animation:'hai-flow-right .9s linear infinite' }}/>
      <line x1="196" y1="200" x2="260" y2="200" stroke="#534AB7" strokeWidth="2"
        strokeDasharray="8 10" style={{ animation:'hai-flow-right .7s linear infinite .2s' }}/>
      <line x1="196" y1="242" x2="260" y2="200" stroke="#AFA9EC" strokeWidth="1.5"
        strokeDasharray="6 10" style={{ animation:'hai-flow-right 1.1s linear infinite .4s' }}/>

      {/* Animierte Ströme Zentrum→KI */}
      <line x1="260" y1="200" x2="324" y2="158" stroke="#5DCAA5" strokeWidth="1.5"
        strokeDasharray="6 10" style={{ animation:'hai-flow-right 1s linear infinite .3s' }}/>
      <line x1="260" y1="200" x2="324" y2="200" stroke="#1D9E75" strokeWidth="2"
        strokeDasharray="8 10" style={{ animation:'hai-flow-right .8s linear infinite' }}/>
      <line x1="260" y1="200" x2="324" y2="242" stroke="#9FE1CB" strokeWidth="1.5"
        strokeDasharray="6 10" style={{ animation:'hai-flow-right .95s linear infinite .5s' }}/>

      {/* Rückfluss Amber */}
      <line x1="324" y1="200" x2="196" y2="200" stroke="#EF9F27" strokeWidth="1"
        strokeDasharray="4 16" opacity="0.6" style={{ animation:'hai-flow-left 1.4s linear infinite' }}/>

      {/* ═══ BEWEGLICHE DATENPAKETE ═══ */}
      <defs>
        <path id="hai-p1" d="M196,158 L260,200"/>
        <path id="hai-p2" d="M196,200 L260,200"/>
        <path id="hai-p3" d="M196,242 L260,200"/>
        <path id="hai-p4" d="M260,200 L324,158"/>
        <path id="hai-p5" d="M260,200 L324,200"/>
        <path id="hai-p6" d="M260,200 L324,242"/>
        <path id="hai-p7" d="M324,200 L196,200"/>
      </defs>

      <circle r="4" fill="#CECBF6" opacity="0.9">
        <animateMotion dur="1.2s" repeatCount="indefinite" begin="0s"><mpath href="#hai-p1"/></animateMotion>
      </circle>
      <circle r="5" fill="#7F77DD" opacity="0.8">
        <animateMotion dur="0.9s" repeatCount="indefinite" begin="0.3s"><mpath href="#hai-p2"/></animateMotion>
      </circle>
      <circle r="3" fill="#AFA9EC" opacity="0.7">
        <animateMotion dur="1.4s" repeatCount="indefinite" begin="0.6s"><mpath href="#hai-p3"/></animateMotion>
      </circle>
      <circle r="4" fill="#9FE1CB" opacity="0.9">
        <animateMotion dur="1.1s" repeatCount="indefinite" begin="0.2s"><mpath href="#hai-p4"/></animateMotion>
      </circle>
      <circle r="5" fill="#5DCAA5" opacity="0.85">
        <animateMotion dur="0.85s" repeatCount="indefinite" begin="0.5s"><mpath href="#hai-p5"/></animateMotion>
      </circle>
      <circle r="3" fill="#1D9E75" opacity="0.7">
        <animateMotion dur="1.3s" repeatCount="indefinite" begin="0.8s"><mpath href="#hai-p6"/></animateMotion>
      </circle>
      <circle r="3" fill="#EF9F27" opacity="0.6">
        <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.4s"><mpath href="#hai-p7"/></animateMotion>
      </circle>

      {/* ═══ MENSCH ═══ */}
      <circle cx="130" cy="200" fill="#534AB7" r="34"
        style={{ animation:'hai-pulse-human 3s ease-in-out infinite' }}/>
      <circle cx="130" cy="188" r="15" fill="#3C3489" stroke="#7F77DD" strokeWidth="1.2"/>
      <circle cx="130" cy="188" r="9" fill="#534AB7"/>
      <path d="M122 186 Q126 181 130 186 Q134 181 138 186"
        fill="none" stroke="#AFA9EC" strokeWidth="1" strokeLinecap="round"/>
      <path d="M123 190 Q127 188 130 190 Q133 188 137 190"
        fill="none" stroke="#AFA9EC" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M112 200 Q112 193 130 191 Q148 193 148 200"
        fill="#3C3489" stroke="#7F77DD" strokeWidth="1"/>
      <polyline points="116,203 120,203 123,197 126,209 129,199 132,204 135,203 148,203"
        fill="none" stroke="#7F77DD" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
        style={{ animation:'hai-label-glow 2s ease-in-out infinite' }}/>
      <rect x="90" y="222" width="80" height="18" rx="5" fill="rgba(38,33,92,0.8)" stroke="#534AB7" strokeWidth="0.5"/>
      <text x="130" y="234" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600"
        fill="#CECBF6" textAnchor="middle">Mensch</text>

      {/* Mensch Satelliten — orbitierend */}
      <g style={{ transformOrigin:'130px 200px', animation:'hai-orbit-cw 6s linear infinite' }}>
        <circle cx="130" cy="115" r="5" fill="#7F77DD"
          style={{ animation:'hai-blink-purple 1.5s ease-in-out infinite' }}/>
        <circle cx="130" cy="115" r="2" fill="#EEEDFE"/>
      </g>
      {/* Mensch feste Satelliten */}
      <circle cx="60" cy="148" r="9" fill="rgba(38,33,92,0.6)" stroke="#534AB7" strokeWidth="0.8"/>
      <circle cx="60" cy="148" r="3.5" fill="#534AB7"
        style={{ animation:'hai-blink-purple 2s ease-in-out infinite' }}/>
      <circle cx="52" cy="200" r="7" fill="rgba(38,33,92,0.5)" stroke="#AFA9EC" strokeWidth="0.8"/>
      <circle cx="52" cy="200" r="2.5" fill="#AFA9EC"
        style={{ animation:'hai-blink-purple 1.8s ease-in-out infinite .8s' }}/>
      <circle cx="60" cy="254" r="9" fill="rgba(38,33,92,0.6)" stroke="#7F77DD" strokeWidth="0.8"/>
      <circle cx="60" cy="254" r="3.5" fill="#7F77DD"
        style={{ animation:'hai-blink-purple 2.4s ease-in-out infinite .4s' }}/>
      <line x1="69" y1="153" x2="110" y2="182" stroke="rgba(83,74,183,0.3)" strokeWidth="0.8"
        strokeDasharray="3 6" style={{ animation:'hai-flow-right 1.2s linear infinite' }}/>
      <line x1="59" y1="200" x2="100" y2="200" stroke="rgba(127,119,221,0.3)" strokeWidth="0.8"
        strokeDasharray="3 6" style={{ animation:'hai-flow-right 1s linear infinite .4s' }}/>
      <line x1="69" y1="249" x2="110" y2="218" stroke="rgba(83,74,183,0.3)" strokeWidth="0.8"
        strokeDasharray="3 6" style={{ animation:'hai-flow-right 1.5s linear infinite .2s' }}/>

      {/* ═══ KI ═══ */}
      <circle cx="390" cy="200" fill="#1D9E75" r="30"
        style={{ animation:'hai-pulse-ai 2.5s ease-in-out infinite .5s' }}/>
      <circle cx="390" cy="188" r="36" fill="rgba(4,52,44,0.7)" stroke="#1D9E75" strokeWidth="1.5"/>
      <polygon points="390,158 408,168 408,188 390,198 372,188 372,168"
        fill="rgba(15,110,86,0.3)" stroke="#5DCAA5" strokeWidth="1"/>
      <polygon points="390,166 404,174 404,188 390,196 376,188 376,174"
        fill="rgba(29,158,117,0.2)" stroke="#1D9E75" strokeWidth="0.8"/>
      <circle cx="390" cy="180" r="9" fill="#0F6E56" stroke="#5DCAA5" strokeWidth="1"/>
      <circle cx="390" cy="180" r="4.5" fill="#5DCAA5"/>
      <circle cx="390" cy="180" r="2" fill="#E1F5EE"/>
      <line x1="390" y1="171" x2="390" y2="158" stroke="#5DCAA5" strokeWidth="0.8" opacity="0.6"/>
      <line x1="398" y1="175" x2="408" y2="168" stroke="#5DCAA5" strokeWidth="0.8" opacity="0.6"/>
      <line x1="398" y1="185" x2="408" y2="188" stroke="#5DCAA5" strokeWidth="0.8" opacity="0.6"/>
      <line x1="390" y1="189" x2="390" y2="198" stroke="#1D9E75" strokeWidth="0.8" opacity="0.6"/>
      <line x1="382" y1="185" x2="372" y2="188" stroke="#1D9E75" strokeWidth="0.8" opacity="0.6"/>
      <line x1="382" y1="175" x2="372" y2="168" stroke="#1D9E75" strokeWidth="0.8" opacity="0.6"/>
      <circle cx="390" cy="158" r="2.5" fill="#5DCAA5"
        style={{ animation:'hai-blink-teal 1.2s ease-in-out infinite' }}/>
      <circle cx="408" cy="168" r="2" fill="#1D9E75"
        style={{ animation:'hai-blink-teal 1.5s ease-in-out infinite .3s' }}/>
      <circle cx="408" cy="188" r="2" fill="#5DCAA5"
        style={{ animation:'hai-blink-teal 1.8s ease-in-out infinite .6s' }}/>
      <circle cx="390" cy="198" r="2.5" fill="#1D9E75"
        style={{ animation:'hai-blink-teal 1.3s ease-in-out infinite .9s' }}/>
      <circle cx="372" cy="188" r="2" fill="#5DCAA5"
        style={{ animation:'hai-blink-teal 1.6s ease-in-out infinite .4s' }}/>
      <circle cx="372" cy="168" r="2" fill="#1D9E75"
        style={{ animation:'hai-blink-teal 1.4s ease-in-out infinite .7s' }}/>
      <rect x="350" y="212" width="80" height="18" rx="5" fill="rgba(4,52,44,0.8)" stroke="#1D9E75" strokeWidth="0.5"/>
      <text x="390" y="224" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600"
        fill="#9FE1CB" textAnchor="middle">KI-System</text>

      {/* KI Satelliten — orbitierend */}
      <g style={{ transformOrigin:'390px 200px', animation:'hai-orbit-ccw 5s linear infinite' }}>
        <circle cx="390" cy="115" r="5" fill="#1D9E75"
          style={{ animation:'hai-blink-teal 1.3s ease-in-out infinite' }}/>
        <circle cx="390" cy="115" r="2" fill="#E1F5EE"/>
      </g>
      {/* KI feste Satelliten */}
      <circle cx="460" cy="148" r="9" fill="rgba(4,52,44,0.6)" stroke="#1D9E75" strokeWidth="0.8"/>
      <circle cx="460" cy="148" r="3.5" fill="#1D9E75"
        style={{ animation:'hai-blink-teal 1.6s ease-in-out infinite' }}/>
      <circle cx="468" cy="200" r="7" fill="rgba(4,52,44,0.5)" stroke="#9FE1CB" strokeWidth="0.8"/>
      <circle cx="468" cy="200" r="2.5" fill="#9FE1CB"
        style={{ animation:'hai-blink-teal 1.9s ease-in-out infinite 1s' }}/>
      <circle cx="460" cy="254" r="9" fill="rgba(4,52,44,0.6)" stroke="#5DCAA5" strokeWidth="0.8"/>
      <circle cx="460" cy="254" r="3.5" fill="#5DCAA5"
        style={{ animation:'hai-blink-teal 2.1s ease-in-out infinite .5s' }}/>
      <line x1="451" y1="153" x2="418" y2="175" stroke="rgba(29,158,117,0.3)" strokeWidth="0.8"
        strokeDasharray="3 6" style={{ animation:'hai-flow-left 1.2s linear infinite' }}/>
      <line x1="461" y1="200" x2="426" y2="200" stroke="rgba(93,202,165,0.3)" strokeWidth="0.8"
        strokeDasharray="3 6" style={{ animation:'hai-flow-left 1s linear infinite .4s' }}/>
      <line x1="451" y1="249" x2="418" y2="225" stroke="rgba(29,158,117,0.3)" strokeWidth="0.8"
        strokeDasharray="3 6" style={{ animation:'hai-flow-left 1.5s linear infinite .2s' }}/>

      {/* ═══ ZENTRUM ═══ */}
      <circle cx="260" cy="200" r="38" fill="rgba(186,117,23,0.06)"
        style={{ animation:'hai-pulse-ai 2s ease-in-out infinite .3s' }}/>
      <circle cx="260" cy="200" r="32" fill="none" stroke="#EF9F27" strokeWidth="1"
        strokeDasharray="8 12" opacity="0.5"
        style={{ transformOrigin:'260px 200px', animation:'hai-orbit-cw 4s linear infinite' }}/>
      <circle cx="260" cy="200" r="23" fill="rgba(65,36,2,0.5)" stroke="#EF9F27" strokeWidth="1.5"/>
      <circle cx="260" cy="200" r="16" fill="rgba(133,79,11,0.4)" stroke="#FAC775" strokeWidth="0.8"/>
      <circle cx="260" cy="200" r="9" fill="#BA7517"/>
      <circle cx="260" cy="200" r="4.5" fill="#FAC775"/>
      <circle cx="260" cy="200" r="2" fill="#FAEEDA"/>
      <rect x="210" y="240" width="100" height="18" rx="5" fill="rgba(65,36,2,0.8)" stroke="#EF9F27" strokeWidth="0.5"/>
      <text x="260" y="252" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600"
        fill="#FAC775" textAnchor="middle">Kollaboration</text>

      {/* ═══ LABELS OBEN ═══ */}
      <text x="130" y="48" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="500"
        fill="rgba(175,169,236,0.5)" textAnchor="middle" letterSpacing="1.5"
        style={{ animation:'hai-label-glow 3s ease-in-out infinite' }}>MENSCH</text>
      <text x="390" y="48" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="500"
        fill="rgba(93,202,165,0.5)" textAnchor="middle" letterSpacing="1.5"
        style={{ animation:'hai-label-glow 3s ease-in-out infinite .5s' }}>KI-SYSTEM</text>
      <text x="260" y="48" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="500"
        fill="rgba(239,159,39,0.5)" textAnchor="middle" letterSpacing="1.5"
        style={{ animation:'hai-label-glow 3s ease-in-out infinite 1s' }}>DATENAUSTAUSCH</text>

      {/* Dezente Trennlinien */}
      <line x1="196" y1="60" x2="196" y2="370" stroke="rgba(83,74,183,0.07)" strokeWidth="0.5" strokeDasharray="4 8"/>
      <line x1="324" y1="60" x2="324" y2="370" stroke="rgba(29,158,117,0.07)" strokeWidth="0.5" strokeDasharray="4 8"/>
    </svg>
  );
}

function Hero() {
  const [ctaHovered, setCtaHovered] = useState(false);
  const [moreHovered, setMoreHovered] = useState(false);
  const [produkteHovered, setProdukteHovered] = useState(false);
  return (
    <header id="home" className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative overflow-hidden">
      {/* ── Zweispaltiges Layout ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '40px',
        width: '100%',
        flexWrap: 'wrap',
      }}>

        {/* LINKS: Netzwerk-Skizze */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={{ flex: '0 0 480px', minWidth: '280px', maxWidth: '520px' }}
        >
          <HumanAISketch />

          <Link
            href="/products"
            onMouseEnter={() => setProdukteHovered(true)}
            onMouseLeave={() => setProdukteHovered(false)}
            style={{
              width: 'fit-content',
              flex: '0 0 auto',
              padding: '10px 10px 10px 32px',
              borderRadius: 60,
              border: 'none',
              fontSize: 17,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              background: '#534AB7',
              color: '#EEEDFE',
              filter: produkteHovered ? 'brightness(1.1)' : 'brightness(1)',
              transition: 'filter 0.15s ease',
              textDecoration: 'none',
              marginTop: 24,
              boxSizing: 'border-box',
            }}
          >
            Unsere Produkte
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#185FA5',
              color: '#B5D4F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              flexShrink: 0,
            }}>
              →
            </div>
          </Link>
        </motion.div>

        {/* RECHTS: Hero-Inhalt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ flex: '1', minWidth: '300px' }}
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
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>

            {/* Mehr erfahren — Sekundär */}
            <a
              href="/mehr-erfahren"
              onMouseEnter={() => setMoreHovered(true)}
              onMouseLeave={() => setMoreHovered(false)}
              style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', textDecoration: 'none', cursor: 'pointer' }}
            >
              <div style={{
                padding: '4px', borderRadius: '50px',
                border: `1.5px solid rgba(56,138,221,0.4)`,
                background: moreHovered ? 'rgba(24,95,165,0.1)' : 'transparent',
                transition: 'all 0.2s ease', display: 'inline-flex',
              }}>
                <div style={{
                  padding: '13px 28px', borderRadius: '50px', background: 'transparent',
                  color: moreHovered ? '#E6F1FB' : '#85B7EB', fontFamily: 'inherit',
                  fontSize: '15px', fontWeight: '500', display: 'flex', alignItems: 'center',
                  gap: '10px', letterSpacing: '0.02em', whiteSpace: 'nowrap', transition: 'color 0.2s ease',
                }}>
                  Mehr erfahren
                  <span style={{
                    background: 'rgba(56,138,221,0.2)', color: moreHovered ? '#E6F1FB' : '#85B7EB',
                    borderRadius: '50%', width: '26px', height: '26px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '13px',
                    fontWeight: '600', flexShrink: 0, transition: 'color 0.2s ease',
                  }}>→</span>
                </div>
              </div>
            </a>

            {/* CTA: Jetzt kostenlos starten — Primär */}
            <a
              href="/kontakt"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', textDecoration: 'none', cursor: 'pointer' }}
            >
              <div style={{ padding: '4px', borderRadius: '50px', border: 'none', background: 'transparent', transition: 'all 0.2s ease', display: 'inline-flex' }}>
                <div style={{
                  padding: '14px 32px', borderRadius: '50px',
                  background: ctaHovered ? '#0C447C' : '#185FA5',
                  color: '#E6F1FB', fontFamily: 'inherit', fontSize: '16px', fontWeight: '500',
                  display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '0.02em',
                  whiteSpace: 'nowrap', transition: 'background 0.2s ease',
                }}>
                  Jetzt kostenlos starten
                  <span style={{
                    background: ctaHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.15)',
                    color: '#E6F1FB', borderRadius: '50%', width: '28px', height: '28px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: '600', flexShrink: 0, transition: 'background 0.2s ease',
                  }}>→</span>
                </div>
              </div>
            </a>
          </div>

          {/* Stats Bar */}
          <div style={{
            marginTop: "40px",
            border: "0.5px solid rgba(24,95,165,0.2)",
            borderRadius: 12,
            background: "rgba(4,8,15,0.6)",
            maxWidth: 520,
            display: "flex",
          }}>
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
            maxWidth: '520px',
            marginTop: '28px',
          }}>
            <div style={{
              background: 'rgba(4,44,83,0.4)', border: '0.5px solid rgba(24,95,165,0.35)',
              borderRadius: '10px', borderTop: '3px solid #185FA5', padding: '20px 16px',
            }}>
              <p style={{ fontSize: '9px', color: '#85B7EB', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>Erstgespräch</p>
              <p style={{ fontSize: '20px', fontWeight: '700', color: '#E6F1FB', marginBottom: '8px' }}>Kostenlos</p>
              <p style={{ fontSize: '11px', color: '#378ADD' }}>Immer &amp; garantiert</p>
            </div>
            <div style={{
              background: 'rgba(12,124,90,0.12)', border: '0.5px solid rgba(12,124,90,0.35)',
              borderRadius: '10px', borderTop: '3px solid #0C7C5A', padding: '20px 16px',
            }}>
              <p style={{ fontSize: '9px', color: '#5DCAA5', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>KI-Analyse</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#9FE1CB', marginBottom: '4px' }}>Präzise &amp; schnell</p>
              <p style={{ fontSize: '11px', color: '#5DCAA5' }}>Modernste KI-Tools</p>
            </div>
            <div style={{
              background: 'rgba(29,158,117,0.1)', border: '0.5px solid rgba(29,158,117,0.3)',
              borderRadius: '10px', borderTop: '3px solid #1D9E75', padding: '20px 16px',
            }}>
              <p style={{ fontSize: '9px', color: '#5DCAA5', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>Preismodelle</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#9FE1CB', marginBottom: '4px' }}>Nach Auftrag</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#9FE1CB', marginBottom: '10px' }}>individuell</p>
              <span style={{ fontSize: '10px', color: '#1D9E75', padding: '4px 10px', background: 'rgba(29,158,117,0.1)', borderRadius: '6px' }}>
                Ab Auftragsfreigabe
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </header>
  );
}

/* ─── Zielgruppen Section ──────────────────────────────────────── */
function ZielgruppenRow({
  reverse,
  badgeText,
  badgeBg,
  badgeBorder,
  badgeColor,
  headline,
  subtext,
  buttonBg,
  buttonColor,
  iconBg,
  iconBorder,
  iconColor,
  Icon,
}: {
  reverse: boolean;
  badgeText: string;
  badgeBg: string;
  badgeBorder: string;
  badgeColor: string;
  headline: string;
  subtext: string;
  buttonBg: string;
  buttonColor: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  Icon: React.ComponentType<{ style?: React.CSSProperties }>;
}) {
  return (
    <div
      className="zielgruppen-row"
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
        padding: "48px 0",
        borderBottom: "0.5px solid #1a1a2e",
      }}
    >
      <div className="zielgruppen-text">
        <div
          className="inline-flex items-center"
          style={{
            background: badgeBg,
            border: `1px solid ${badgeBorder}`,
            color: badgeColor,
            borderRadius: 14,
            padding: "5px 12px",
            fontSize: 10,
            marginBottom: 16,
            letterSpacing: "0.03em",
          }}
        >
          {badgeText}
        </div>
        <h3
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: "#EEEDFE",
            lineHeight: 1.3,
            marginBottom: 14,
            maxWidth: 480,
          }}
        >
          {headline}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "#AFA9EC",
            lineHeight: 1.7,
            marginBottom: 20,
            maxWidth: 480,
          }}
        >
          {subtext}
        </p>
        <button
          type="button"
          style={{
            background: buttonBg,
            color: buttonColor,
            border: "none",
            borderRadius: 20,
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "default",
          }}
        >
          Mehr Informationen
        </button>
      </div>

      <div className="zielgruppen-icon-col">
        <div
          className="zielgruppen-icon-box"
          style={{
            background: iconBg,
            border: `1px solid ${iconBorder}`,
          }}
        >
          <Icon style={{ width: 64, height: 64, color: iconColor }} />
        </div>
      </div>
    </div>
  );
}

function ZielgruppenSection() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <style>{`
        .zielgruppen-row {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .zielgruppen-text {
          flex: 1.1;
          text-align: left;
        }
        .zielgruppen-icon-col {
          flex: 0.9;
        }
        .zielgruppen-icon-box {
          width: 100%;
          min-height: 240px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .zielgruppen-row {
            flex-direction: column !important;
          }
          .zielgruppen-icon-col {
            width: 100%;
          }
          .zielgruppen-icon-box {
            min-height: 180px;
          }
          .zielgruppen-text {
            text-align: center;
          }
          .zielgruppen-text h3,
          .zielgruppen-text p {
            max-width: 100% !important;
          }
        }
      `}</style>
      <ZielgruppenRow
        reverse={false}
        badgeText="Für Gesundheitswesen & Praxis"
        badgeBg="rgba(93,202,165,0.22)"
        badgeBorder="#5DCAA5"
        badgeColor="#9FE1CB"
        headline="Mit klinischer Erfahrung zur passenden digitalen Lösung."
        subtext="Aufgrund unserer klinischen Erfahrung kennen wir die Herausforderungen im Praxis- und Klinikalltag aus erster Hand. Dadurch können wir Ihren Bedarf präzise einschätzen und die passende digitale Lösung dafür entwickeln."
        buttonBg="#5DCAA5"
        buttonColor="#04342C"
        iconBg="rgba(93,202,165,0.14)"
        iconBorder="#5DCAA5"
        iconColor="#9FE1CB"
        Icon={HeartPulse}
      />

      <ZielgruppenRow
        reverse={true}
        badgeText="Für Studierende, Akademiker & Universitäten"
        badgeBg="rgba(127,119,221,0.22)"
        badgeBorder="#7F77DD"
        badgeColor="#CECBF6"
        headline="Weniger Chaos im Studium. Mehr Fokus aufs Wesentliche."
        subtext="Ob Organisation, Recherche, Lehrbetrieb oder Prüfungsvorbereitung – wir entwickeln digitale Lösungen für Studierende, Akademikerinnen und Akademiker sowie universitäre Einrichtungen, die den Alltag einfacher und effizienter gestalten."
        buttonBg="#7F77DD"
        buttonColor="#26215C"
        iconBg="rgba(127,119,221,0.14)"
        iconBorder="#7F77DD"
        iconColor="#CECBF6"
        Icon={GraduationCap}
      />

      <ZielgruppenRow
        reverse={false}
        badgeText="Für Unternehmer & Firmeninhaber"
        badgeBg="rgba(55,138,221,0.22)"
        badgeBorder="#378ADD"
        badgeColor="#85B7EB"
        headline="Mehr Wachstum. Weniger manueller Aufwand."
        subtext="Von der Prozessautomatisierung bis zur individuellen Softwarelösung – wir helfen Unternehmerinnen und Unternehmern, digitale Werkzeuge gezielt für ihr Geschäft einzusetzen."
        buttonBg="#378ADD"
        buttonColor="#042C53"
        iconBg="rgba(55,138,221,0.14)"
        iconBorder="#378ADD"
        iconColor="#85B7EB"
        Icon={Briefcase}
      />

      {/* Abschluss-CTA */}
      <div style={{ textAlign: "center", padding: "40px 0 64px" }}>
        <p style={{ fontSize: 12, color: "#AFA9EC", marginBottom: 20 }}>
          Egal in welchem Bereich Sie tätig sind – das erste Gespräch ist immer kostenlos.
        </p>
        {/* TODO: Ziel-Route für Kontaktbereich/-formular final festlegen, falls sich /kontakt ändert */}
        <a
          href="/kontakt"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 14px 14px 32px",
            borderRadius: 50,
            background: "#534AB7",
            color: "#EEEDFE",
            fontSize: 16,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Kostenlose Beratung sichern
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#185FA5",
              color: "#B5D4F4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              flexShrink: 0,
            }}
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}

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

        {/* Closing Quote — über dem Grid */}
        <div style={{
          background: "rgba(38,33,92,0.45)",
          border: "0.5px solid rgba(83,74,183,0.3)",
          borderLeft: "3px solid #EF9F27",
          borderRadius: "0 10px 10px 0",
          padding: "20px 24px",
          marginBottom: 32,
        }}>
          <p style={{ fontSize: 14, color: "#CECBF6", lineHeight: 1.8, fontStyle: "italic" }}>
            Auch wenn die finanziellen Mittel begrenzt sind: Durch unsere flexiblen Vergütungsmodelle und Kooperationsmodelle können Sie Ihre Idee nahezu kostenfrei verwirklichen. Alle Erstgespräche sind kostenlos. Denn eine gute Idee sollte niemals an finanziellen Hürden scheitern.
          </p>
        </div>

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
      position: 'relative',
    }}>

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
function ServicesSection() {
  const cards = [
    {
      icon: Lightbulb,
      iconBg: "rgba(83,74,183,0.18)",
      iconColor: "#7F77DD",
      border: "0.5px solid #534AB7",
      tag: "IDEE & KONZEPT",
      title: "Ideen in digitaler Form entwickeln",
      desc: "Aus Ihrer Vision wird ein konkretes digitales Produkt — strukturiert, umsetzbar und zukunftssicher.",
      bullets: ["Konzeptanalyse & Machbarkeit", "Digitale Roadmap", "Prototyp-Entwicklung"],
      bulletColor: "#534AB7",
      btnBg: "rgba(83,74,183,0.2)",
      btnColor: "#CECBF6",
    },
    {
      icon: Globe,
      iconBg: "rgba(29,158,117,0.18)",
      iconColor: "#5DCAA5",
      border: "0.5px solid #1D9E75",
      tag: "WEB & PRÄSENZ",
      title: "Webseiten erstellen",
      desc: "Moderne, schnelle und professionelle Webauftritte — massgeschneidert für Ihr Unternehmen.",
      bullets: ["Design & Branding", "SEO-optimiert", "Mobile-first"],
      bulletColor: "#1D9E75",
      btnBg: "rgba(29,158,117,0.2)",
      btnColor: "#9FE1CB",
    },
    {
      icon: Settings,
      iconBg: "rgba(55,138,221,0.18)",
      iconColor: "#85B7EB",
      border: "0.5px solid #378ADD",
      tag: "EFFIZIENZ",
      title: "Automation Ihres Unternehmens",
      desc: "Wiederkehrende Prozesse automatisieren — Zeit sparen, Fehler reduzieren, Ressourcen schonen.",
      bullets: ["Workflow-Analyse", "KI-gestützte Prozesse", "Integration bestehender Tools"],
      bulletColor: "#378ADD",
      btnBg: "rgba(55,138,221,0.2)",
      btnColor: "#B5D4F4",
    },
    {
      icon: Smartphone,
      iconBg: "rgba(216,90,48,0.18)",
      iconColor: "#F0997B",
      border: "0.5px solid #D85A30",
      tag: "APP-ENTWICKLUNG",
      title: "App entwickeln für Ihre Idee",
      desc: "Von der Idee zur fertigen iOS- oder Android-App — technisch solide, nutzerfreundlich und skalierbar.",
      bullets: ["iOS & Android", "UX/UI Design", "App Store Einreichung"],
      bulletColor: "#D85A30",
      btnBg: "rgba(216,90,48,0.2)",
      btnColor: "#F5C4B3",
    },
    {
      icon: GraduationCap,
      iconBg: "rgba(212,83,126,0.18)",
      iconColor: "#ED93B1",
      border: "0.5px solid #D4537E",
      tag: "WISSEN & WACHSTUM",
      title: "KI-Workshops",
      desc: "Praxisnahe Workshops für Teams und Einzelpersonen — von Prompt Engineering bis zu KI-Workflows.",
      bullets: ["Prompt Engineering", "Tool-Workshops", "Zertifikat auf Anfrage"],
      bulletColor: "#D4537E",
      btnBg: "rgba(212,83,126,0.2)",
      btnColor: "#F4C0D1",
    },
    {
      icon: Brain,
      iconBg: "rgba(239,159,39,0.18)",
      iconColor: "#FAC775",
      border: "0.5px solid #EF9F27",
      tag: "MASSGESCHNEIDERT",
      title: "Weitere KI-Lösungen",
      desc: "Individuelle KI-Lösungen angepasst an Ihre Bedürfnisse — von Chatbots bis zur Datenanalyse.",
      bullets: ["Chatbots & Assistenten", "Datenanalyse & Reports", "API-Integration"],
      bulletColor: "#EF9F27",
      btnBg: "rgba(239,159,39,0.2)",
      btnColor: "#FAC775",
    },
  ];

  return (
    <section style={{
      background: "#07071a",
      backgroundImage: "radial-gradient(circle, rgba(127,119,221,0.18) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
      padding: "60px 32px",
    }}>
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="services-grid">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: c.border,
                borderRadius: 12,
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {/* Icon */}
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: c.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon style={{ width: 18, height: 18, color: c.iconColor }} />
              </div>

              {/* Tag */}
              <p style={{ fontSize: 10, letterSpacing: "0.07em", color: "#5F5E8A", margin: 0 }}>
                {c.tag}
              </p>

              {/* Title */}
              <p style={{ fontSize: 16, fontWeight: 500, color: "#EEEDFE", margin: 0, lineHeight: 1.3 }}>
                {c.title}
              </p>

              {/* Desc */}
              <p style={{ fontSize: 13, color: "#AFA9EC", lineHeight: 1.6, margin: 0 }}>
                {c.desc}
              </p>

              {/* Bullets */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                {c.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#AFA9EC" }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: c.bulletColor, flexShrink: 0 }} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Link
                to="/kontakt"
                style={{
                  marginTop: "auto",
                  display: "inline-block",
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 12,
                  cursor: "pointer",
                  border: "none",
                  background: c.btnBg,
                  color: c.btnColor,
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Beratung anfragen →
              </Link>
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
      <ZielgruppenSection />
      <StrategySection />
      <WorkflowSection />
      <ServicesSection />
      <IdeasSection />
      <ToolsSection />
      <CoursesSection />
      <Footer />
    </div>
  );
}
