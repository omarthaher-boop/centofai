import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Zap,
  Brain,
  Code,
  GraduationCap,
  Users,
  BarChart3,
  Globe,
  Search,
  Wrench,
  Newspaper,
  MessageSquare,
  ArrowUpRight,
  Lightbulb,
  Settings,
  Smartphone,
} from "lucide-react";
import Navbar from "../components/Navbar";

function setMeta() {
  document.title = "Produkte & Services – CentofAI";
  const desc = "KI-Consulting, maßgeschneiderte KI-Tools, API-Integrationen und Schulungen für Unternehmen.";
  let el = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "description");
    document.head.appendChild(el);
  }
  el.setAttribute("content", desc);
}

const FAHRTDOC = {
  title: "FahrtDoc",
  subtitle: "Fahrtendokumentation",
  description:
    "FahrtDoc ist die intelligente Lösung zur einfachen Fahrtendokumentation. Automatische GPS-Erfassung, PDF-Export und Steuersparnisse berechnen. Ideal für Privatpersonen und Unternehmen.",
  logo: "/fahrtdoc-logo.jpeg",
  href: "/products/fahrtdoc",
  features: ["GPS-Erfassung", "PDF-Export", "Excel-Export", "Steuersparnisse berechnen", "Kostenübersicht", "Fahrtenliste nach Wunsch", "Bluetooth-Verbindung"],
  cta: "Mehr erfahren",
};

const PRODUCTS = [
  {
    title: "KI-Tools Verzeichnis",
    subtitle: "Entdecke & vergleiche",
    description: "Unsere Kuratierte Datenbank mit über 100 KI-Tools. Kategorisiert, bewertet und mit Nutzerbewertungen. Der zentrale Anlaufpunkt für alle, die KI-Tools nutzen wollen.",
    icon: Search,
    color: "#9333EA",
    href: "/#tools",
    features: ["100+ Tools", "Filter & Kategorien", "Nutzerbewertungen", "Regelmäßige Updates"],
    cta: "Tools entdecken",
  },
  {
    title: "AI Consulting",
    subtitle: "Strategie & Beratung",
    description: "Wir analysieren deine Prozesse und entwickeln eine maßgeschneiderte KI-Strategie. Von der ersten Idee bis zur Implementierung begleiten wir dich.",
    icon: Brain,
    color: "#22D3EE",
    href: "mailto:hello@centofai.com?subject=KI%20Consulting",
    features: ["Prozessanalyse", "KI-Strategie", "Tool-Selektion", "ROI-Planung"],
    cta: "Beratung anfragen",
  },
  {
    title: "API-Integration",
    subtitle: "Technische Umsetzung",
    description: "Wir binden KI-APIs (OpenAI, Claude, Gemini, etc.) in deine bestehende Infrastruktur ein. Nahtlos, skalierbar und sicher.",
    icon: Code,
    color: "#10A37F",
    href: "mailto:hello@centofai.com?subject=API%20Integration",
    features: ["API-Design", "Backend-Integration", "Frontend-Widgets", "Monitoring"],
    cta: "Integration starten",
  },
  {
    title: "KI-Workshops",
    subtitle: "Lernen & Wachsen",
    description: "Praxisnahe Workshops für Teams, die KI effektiv nutzen wollen. Von Prompt Engineering bis zu fortgeschrittenen Workflows.",
    icon: GraduationCap,
    color: "#F59E0B",
    href: "/#academy",
    features: ["Prompt Engineering", "Tool-Workflows", "Prompt Libraries", "Zertifikate"],
    cta: "Kurse ansehen",
  },
  {
    title: "AI News Hub",
    subtitle: "Up-to-date bleiben",
    description: "Täglich kuratierte KI-News, Durchbrüche und Updates. Nie mehr wichtige Entwicklungen verpassen.",
    icon: Newspaper,
    color: "#EF4444",
    href: "/#news",
    features: ["Tägliche Updates", "Kategorisiert", "Deutsche Übersetzungen", "Deep Dives"],
    cta: "News lesen",
  },
  {
    title: "Custom KI-Lösungen",
    subtitle: "Maßgeschneidert",
    description: "Wir entwickeln individuelle KI-Lösungen für dein Unternehmen. Von Chatbots über automatisierte Content-Erstellung bis zu Datenanalyse.",
    icon: Wrench,
    color: "#8B5CF6",
    href: "mailto:hello@centofai.com?subject=Custom%20KI%20Lösung",
    features: ["Chatbots", "Automatisierung", "Content-Erstellung", "Datenanalyse"],
    cta: "Projekt starten",
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Schnellere Prozesse",
    description: "Automatisiere repetitive Aufgaben und beschleunige deine Workflows um 10x.",
  },
  {
    icon: BarChart3,
    title: "Messbare Ergebnisse",
    description: "KPI-basierte Implementierung mit klarem ROI-Tracking von Tag eins.",
  },
  {
    icon: Users,
    title: "Team-Enablement",
    description: "Dein Team lernt KI effektiv zu nutzen statt nur zu konsumieren.",
  },
  {
    icon: Globe,
    title: "Skalierbar",
    description: "Von Startup bis Enterprise – Lösungen, die mit deinem Unternehmen wachsen.",
  },
];

export default function ProductsPage() {
  useEffect(() => {
    setMeta();
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] font-sans antialiased">
      <Navbar />

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-4 border border-purple-500/20 bg-purple-500/10 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Unsere Angebote
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Alles was du für <span className="gradient-text">KI-Erfolg</span> brauchst
          </h1>
          <p className="text-[var(--text-caption)] text-base max-w-2xl mx-auto leading-relaxed">
            Von der Entdeckung der besten Tools über maßgeschneiderte Integration bis zu 
            praxisnahen Workshops – wir begleiten dich auf dem gesamten Weg.
          </p>
        </motion.div>
      </header>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-20">

        {/* ── FahrtDoc Featured Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href={FAHRTDOC.href}
            className="group block rounded-2xl border border-[#0066CC]/30 bg-gradient-to-r from-[#001833] to-[#001020] hover:border-[#0066CC]/60 transition-all overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
              {/* Logo */}
              <div className="shrink-0">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-2xl bg-[#0066CC]/20 blur-xl opacity-0 group-hover:opacity-100 transition" />
                  <img
                    src={FAHRTDOC.logo}
                    alt="FahrtDoc Logo"
                    className="relative w-24 h-24 rounded-2xl object-cover shadow-lg border border-white/10 group-hover:scale-105 transition"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4DA6FF] border border-[#0066CC]/40 bg-[#0066CC]/10 px-2 py-0.5 rounded-full">
                    {FAHRTDOC.subtitle}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#BFFF00] border border-[#BFFF00]/30 bg-[#BFFF00]/10 px-2 py-0.5 rounded-full">
                    Eigenes Produkt
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">{FAHRTDOC.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl mb-4">{FAHRTDOC.description}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  {FAHRTDOC.features.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1.5 text-xs text-slate-300 border border-white/10 bg-white/5 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-3 h-3 text-[#4DA6FF]" /> {f}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#4DA6FF] group-hover:text-white transition">
                  {FAHRTDOC.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-[var(--border-color)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-label)]">Weitere Angebote</span>
          <div className="h-px flex-1 bg-[var(--border-color)]" />
        </div>

        <style>{`
          .weiteres-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 80px;
          }
          @media (max-width: 768px) { .weiteres-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 480px) { .weiteres-grid { grid-template-columns: 1fr; } }
        `}</style>
        <div className="weiteres-grid">
          {[
            {
              icon: Lightbulb, iconBg: "rgba(83,74,183,0.18)", iconColor: "#7F77DD",
              border: "0.5px solid #534AB7", tag: "IDEE & KONZEPT",
              title: "Ideen in digitaler Form entwickeln",
              desc: "Aus Ihrer Vision wird ein konkretes digitales Produkt — strukturiert, umsetzbar und zukunftssicher.",
              bullets: ["Konzeptanalyse & Machbarkeit", "Digitale Roadmap", "Prototyp-Entwicklung"],
              bulletColor: "#534AB7", btnBg: "rgba(83,74,183,0.2)", btnColor: "#CECBF6",
            },
            {
              icon: Globe, iconBg: "rgba(29,158,117,0.18)", iconColor: "#5DCAA5",
              border: "0.5px solid #1D9E75", tag: "WEB & PRÄSENZ",
              title: "Webseiten erstellen",
              desc: "Moderne, schnelle und professionelle Webauftritte — massgeschneidert für Ihr Unternehmen.",
              bullets: ["Design & Branding", "SEO-optimiert", "Mobile-first"],
              bulletColor: "#1D9E75", btnBg: "rgba(29,158,117,0.2)", btnColor: "#9FE1CB",
            },
            {
              icon: Settings, iconBg: "rgba(55,138,221,0.18)", iconColor: "#85B7EB",
              border: "0.5px solid #378ADD", tag: "EFFIZIENZ",
              title: "Automation Ihres Unternehmens",
              desc: "Wiederkehrende Prozesse automatisieren — Zeit sparen, Fehler reduzieren, Ressourcen schonen.",
              bullets: ["Workflow-Analyse", "KI-gestützte Prozesse", "Integration bestehender Tools"],
              bulletColor: "#378ADD", btnBg: "rgba(55,138,221,0.2)", btnColor: "#B5D4F4",
            },
            {
              icon: Smartphone, iconBg: "rgba(216,90,48,0.18)", iconColor: "#F0997B",
              border: "0.5px solid #D85A30", tag: "APP-ENTWICKLUNG",
              title: "App entwickeln für Ihre Idee",
              desc: "Von der Idee zur fertigen iOS- oder Android-App — technisch solide, nutzerfreundlich und skalierbar.",
              bullets: ["iOS & Android", "UX/UI Design", "App Store Einreichung"],
              bulletColor: "#D85A30", btnBg: "rgba(216,90,48,0.2)", btnColor: "#F5C4B3",
            },
            {
              icon: GraduationCap, iconBg: "rgba(212,83,126,0.18)", iconColor: "#ED93B1",
              border: "0.5px solid #D4537E", tag: "WISSEN & WACHSTUM",
              title: "KI-Workshops",
              desc: "Praxisnahe Workshops für Teams und Einzelpersonen — von Prompt Engineering bis zu KI-Workflows.",
              bullets: ["Prompt Engineering", "Tool-Workshops", "Zertifikat auf Anfrage"],
              bulletColor: "#D4537E", btnBg: "rgba(212,83,126,0.2)", btnColor: "#F4C0D1",
            },
            {
              icon: Brain, iconBg: "rgba(239,159,39,0.18)", iconColor: "#FAC775",
              border: "0.5px solid #EF9F27", tag: "MASSGESCHNEIDERT",
              title: "Weitere KI-Lösungen",
              desc: "Individuelle KI-Lösungen angepasst an Ihre Bedürfnisse — von Chatbots bis zur Datenanalyse.",
              bullets: ["Chatbots & Assistenten", "Datenanalyse & Reports", "API-Integration"],
              bulletColor: "#EF9F27", btnBg: "rgba(239,159,39,0.2)", btnColor: "#FAC775",
            },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{
                  background: "rgba(255,255,255,0.03)", border: c.border,
                  borderRadius: 12, padding: "20px 18px",
                  display: "flex", flexDirection: "column", gap: 12,
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon style={{ width: 18, height: 18, color: c.iconColor }} />
                </div>
                <p style={{ fontSize: 10, letterSpacing: "0.07em", color: "#5F5E8A", margin: 0 }}>{c.tag}</p>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#EEEDFE", margin: 0, lineHeight: 1.3 }}>{c.title}</p>
                <p style={{ fontSize: 13, color: "#AFA9EC", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                  {c.bullets.map((b) => (
                    <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#AFA9EC" }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: c.bulletColor, flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link to="/kontakt" style={{ marginTop: "auto", display: "inline-block", padding: "8px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", border: "none", background: c.btnBg, color: c.btnColor, textDecoration: "none", textAlign: "center" }}>
                  Beratung anfragen →
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Warum CentofAI?</h2>
            <p className="text-[var(--text-caption)] text-sm max-w-xl mx-auto">
              Wir kombinieren technische Expertise mit praxisnahem Know-how.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="text-center p-6 bg-[var(--bg-card)]/40 border border-[var(--border-color)] rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-bold text-sm mb-2">{b.title}</h3>
                  <p className="text-xs text-[var(--text-caption)] leading-relaxed">{b.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16 border border-[var(--border-color)] rounded-2xl bg-[var(--bg-card)]/40">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Bereit für dein KI-Projekt?
          </h2>
          <p className="text-[var(--text-caption)] text-sm max-w-lg mx-auto mb-8">
            Schreib uns eine kurze Nachricht mit deiner Idee oder deinem Problem. 
            Wir melden uns innerhalb von 24 Stunden.
          </p>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition shadow-[0_0_25px_rgba(147,51,234,0.25)]"
          >
            Kontakt aufnehmen <ArrowUpRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      {/* Footer mini */}
      <footer className="border-t border-[var(--border-color)] py-8 text-center text-xs text-[var(--text-label)]">
        <div className="max-w-6xl mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} CentofAI. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
