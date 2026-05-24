import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Rocket,
  Lightbulb,
  Building2,
  Briefcase,
  Globe,
  Smartphone,
  Code2,
  Brain,
  Compass,
  Bot,
  MessageSquare,
  BarChart3,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  TrendingUp,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Github,
  CheckCircle2,
  Workflow,
  Zap,
} from "lucide-react";

const navLinks = [
  { name: "Startseite", href: "#home" },
  { name: "Leistungen", href: "#leistungen" },
  { name: "Für Gründer", href: "#gruender" },
  { name: "KI-Lösungen", href: "#ki" },
  { name: "Projekte", href: "#projekte" },
  { name: "Über Centofai", href: "#ueber" },
  { name: "Kontakt", href: "#kontakt" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#070B14]/80 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#22D3EE] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] blur-md opacity-50 group-hover:opacity-80 transition" />
          </div>
          <span className="font-sora font-bold text-xl tracking-tight text-white">
            Centofai
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-slate-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#22D3EE] to-[#7C3AED] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#kontakt"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transition-all"
          >
            Idee besprechen <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white"
            aria-label="Menü"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#070B14]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-300 hover:text-white transition py-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-medium"
              >
                Idee besprechen <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full bg-[#2563EB]/20 blur-3xl" />
        <div className="absolute top-40 right-0 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] rounded-full bg-[#22D3EE]/10 blur-3xl" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur text-xs text-slate-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
            Digitales Studio mit KI im Kern
          </div>

          <h1 className="font-sora text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-white tracking-tight">
            Wir machen{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                Ideen digital.
              </span>
              <span className="absolute -inset-1 bg-gradient-to-r from-[#22D3EE]/20 to-[#7C3AED]/20 blur-2xl -z-10" />
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-xl leading-relaxed">
            Centofai hilft Startups, Gründern und kleinen Unternehmen dabei,
            ihre Ideen in professionelle Websites, Apps, Softwarelösungen und
            KI-gestützte Produkte zu verwandeln.
          </p>

          <p className="mt-4 text-base text-slate-400 max-w-xl">
            Von der ersten Idee über das Design bis zur fertigen Anwendung
            begleiten wir dich Schritt für Schritt – verständlich, persönlich
            und zukunftsorientiert.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-medium shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all"
            >
              Idee besprechen <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 bg-white/5 backdrop-blur text-white font-medium hover:bg-white/10 transition-all"
            >
              Leistungen ansehen
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
              Für Startups & kleine Unternehmen
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
              KI-gestützte Entwicklung
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
              Von der Idee bis zum Launch
            </div>
          </div>
        </motion.div>

        {/* Visual / Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#070B14] p-6 shadow-2xl shadow-blue-500/10 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#7C3AED]/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#2563EB]/30 blur-3xl" />

            <div className="relative flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
              <div className="ml-3 text-xs text-slate-500 font-mono">
                centofai.ai/dashboard
              </div>
            </div>

            <div className="relative grid grid-cols-3 gap-3">
              <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400">Projekt-Status</span>
                  <Sparkles className="w-4 h-4 text-[#22D3EE]" />
                </div>
                <div className="text-2xl font-sora font-semibold text-white">
                  +127%
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  KI-gestützte Conversion
                </div>
                <div className="mt-4 h-20 flex items-end gap-1.5">
                  {[40, 65, 30, 80, 55, 90, 75, 95, 60, 100, 85, 70].map(
                    (h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                        className="flex-1 rounded-t bg-gradient-to-t from-[#2563EB] to-[#22D3EE]"
                      />
                    ),
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between">
                <Bot className="w-6 h-6 text-[#7C3AED]" />
                <div>
                  <div className="text-lg font-sora font-semibold text-white">
                    AI
                  </div>
                  <div className="text-xs text-slate-500">Assistant aktiv</div>
                </div>
              </div>

              <div className="col-span-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-slate-400 mb-2 font-mono">
                  &gt; centofai build --idea
                </div>
                <div className="font-mono text-xs text-slate-300 space-y-1">
                  <div>
                    <span className="text-[#22D3EE]">✓</span> Idee analysiert
                  </div>
                  <div>
                    <span className="text-[#22D3EE]">✓</span> Konzept erstellt
                  </div>
                  <div>
                    <span className="text-[#22D3EE]">✓</span> Design generiert
                  </div>
                  <div>
                    <span className="text-[#7C3AED] animate-pulse">⟳</span>{" "}
                    Entwicklung läuft...
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute -left-6 top-1/2 hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-[#111827]/90 backdrop-blur-xl shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#2563EB] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Time-to-Launch</div>
              <div className="text-sm font-semibold text-white">
                4–8 Wochen
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const audience = [
  {
    icon: Lightbulb,
    title: "Gründer mit einer Idee",
    desc: "Du hast eine Vision, aber noch keinen technischen Plan? Wir geben deiner Idee Struktur, Design und ein digitales Zuhause.",
  },
  {
    icon: Rocket,
    title: "Startups in der Anfangsphase",
    desc: "Schneller MVP, sauberes Branding und eine Plattform, die mit deinem Wachstum mithält – von Tag eins an.",
  },
  {
    icon: Building2,
    title: "Kleine Unternehmen",
    desc: "Eine professionelle Website, smartere Prozesse und KI-Funktionen, die deinem Team echte Zeit sparen.",
  },
  {
    icon: Briefcase,
    title: "Selbstständige & lokale Anbieter",
    desc: "Mehr Sichtbarkeit, mehr Anfragen, weniger Aufwand – mit Tools, die zu deinem Alltag passen.",
  },
];

function AudienceSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="text-sm font-medium text-[#22D3EE] mb-4">
            Für wen ist Centofai?
          </div>
          <h2 className="font-sora text-4xl md:text-5xl font-bold text-white leading-tight">
            Digitale Unterstützung für{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
              Menschen mit Ideen
            </span>
          </h2>
          <p className="mt-5 text-lg text-slate-400 leading-relaxed">
            Viele gute Ideen scheitern nicht daran, dass sie schlecht sind,
            sondern daran, dass der technische Weg fehlt. Genau hier setzt
            Centofai an. Wir helfen dir, deine Idee zu strukturieren, zu
            gestalten und digital umzusetzen.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audience.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 to-white/[0.02] hover:from-[#2563EB]/50 hover:to-[#7C3AED]/50 transition-all"
            >
              <div className="h-full rounded-2xl bg-[#111827] p-6 hover:bg-[#111827]/80 transition">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-[#22D3EE]" />
                </div>
                <h3 className="font-sora text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: Globe,
    title: "Website-Entwicklung",
    desc: "Professionelle, schnelle und responsive Websites, die Vertrauen schaffen, deine Idee sichtbar machen und Kunden überzeugen.",
    features: [
      "Firmenwebsites",
      "Landingpages",
      "Portfolio-Websites",
      "SEO-Grundstruktur",
      "Performance-Optimierung",
    ],
  },
  {
    icon: Smartphone,
    title: "App-Entwicklung",
    desc: "Benutzerfreundliche mobile Apps für Startups, Dienstleistungen, interne Prozesse oder neue digitale Geschäftsmodelle.",
    features: [
      "iOS & Android",
      "Cross-Platform Apps",
      "MVP-Entwicklung",
      "App-Prototypen",
      "Nutzerfreundliches Design",
    ],
  },
  {
    icon: Code2,
    title: "Individuelle Software",
    desc: "Maßgeschneiderte Softwarelösungen, Dashboards und digitale Tools, die Abläufe vereinfachen und Unternehmen effizienter machen.",
    features: [
      "Dashboards",
      "Verwaltungssysteme",
      "Automatisierungstools",
      "API-Integrationen",
      "Interne Unternehmenssoftware",
    ],
  },
  {
    icon: Brain,
    title: "KI-gestützte Lösungen",
    desc: "Intelligente Funktionen, die Prozesse automatisieren, Daten nutzbar machen und digitale Produkte smarter gestalten.",
    features: [
      "KI-Chatbots",
      "Automatisierung",
      "Dokumentenanalyse",
      "Intelligente Suchfunktionen",
      "KI-Assistenten",
    ],
  },
  {
    icon: Compass,
    title: "Digitale Beratung",
    desc: "Wir helfen dir, deine Idee zu ordnen, Funktionen zu planen und den besten digitalen Weg für dein Projekt zu finden.",
    features: [
      "Ideenanalyse",
      "MVP-Konzept",
      "Technische Planung",
      "Digitale Strategie",
      "KI-Potenzialanalyse",
    ],
  },
];

function ServicesSection() {
  return (
    <section
      id="leistungen"
      className="relative py-24 lg:py-32 bg-[#F8FAFC] text-[#070B14]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className="text-sm font-medium text-[#2563EB] mb-4">
            Unsere Leistungen
          </div>
          <h2 className="font-sora text-4xl md:text-5xl font-bold leading-tight">
            Digitale Produkte, die zu{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
              deinem Unternehmen passen
            </span>
          </h2>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            Von der ersten digitalen Präsenz bis zur intelligenten
            Softwarelösung – Centofai entwickelt digitale Produkte, die zu
            deinem Unternehmen passen.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl bg-white border border-slate-200 p-7 hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563EB]/5 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-sora text-xl font-semibold mb-3">
                  {s.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const founderSteps = [
  "Idee",
  "Konzept",
  "Design",
  "Entwicklung",
  "Launch",
  "Wachstum",
];

function FounderSection() {
  return (
    <section id="gruender" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#2563EB]/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-sm font-medium text-[#7C3AED] mb-4">
              Für Gründer
            </div>
            <h2 className="font-sora text-4xl md:text-5xl font-bold text-white leading-tight">
              Du hast eine Idee? Wir helfen dir beim{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#7C3AED] bg-clip-text text-transparent">
                ersten digitalen Schritt
              </span>
              .
            </h2>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Du brauchst keine fertige technische Planung. Bring deine Idee
              mit – wir helfen dir, daraus ein klares Konzept, ein modernes
              Design und eine funktionierende digitale Lösung zu entwickeln.
            </p>
            <div className="mt-8 p-5 rounded-2xl border border-[#22D3EE]/20 bg-[#22D3EE]/5">
              <p className="text-slate-200 italic">
                „Auch mit kleinem Kapital kann der erste digitale Schritt
                möglich sein.“
              </p>
            </div>
            <a
              href="#kontakt"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-medium shadow-xl shadow-blue-500/30 hover:scale-105 transition-all"
            >
              Lass uns starten <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="space-y-3">
              {founderSteps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur hover:border-[#22D3EE]/30 hover:bg-white/[0.06] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center font-sora font-bold text-white shadow-lg shadow-blue-500/20">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-sora font-semibold text-white">
                      {step}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-[#22D3EE] group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const aiAreas = [
  {
    icon: Workflow,
    title: "Automatisierung",
    desc: "Wiederkehrende Aufgaben laufen im Hintergrund – dein Team konzentriert sich auf das, was wirklich zählt.",
  },
  {
    icon: MessageSquare,
    title: "Kundenkommunikation",
    desc: "Intelligente Chatbots und Assistenten beantworten Fragen rund um die Uhr und entlasten dein Support-Team.",
  },
  {
    icon: BarChart3,
    title: "Datenanalyse",
    desc: "Aus rohen Zahlen werden klare Erkenntnisse, die dir helfen, bessere Entscheidungen für dein Unternehmen zu treffen.",
  },
  {
    icon: Bot,
    title: "KI-Assistenten",
    desc: "Maßgeschneiderte Assistenten, die in deinen Tools leben und genau dort helfen, wo dein Team sie braucht.",
  },
];

function AISection() {
  return (
    <section id="ki" className="relative py-24 lg:py-32 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className="text-sm font-medium text-[#22D3EE] mb-4">
            KI verstehen und sinnvoll nutzen
          </div>
          <h2 className="font-sora text-4xl md:text-5xl font-bold text-white leading-tight">
            KI als Chance für{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#7C3AED] bg-clip-text text-transparent">
              kleine Unternehmen
            </span>
          </h2>
          <p className="mt-5 text-lg text-slate-300 leading-relaxed">
            Künstliche Intelligenz verändert, wie Unternehmen arbeiten,
            kommunizieren und wachsen. Centofai macht KI verständlich und
            zeigt, wie sie praktisch eingesetzt werden kann – zum Beispiel für
            Automatisierung, Kundenservice, Content-Erstellung, Datenanalyse
            oder interne Prozesse.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aiAreas.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl p-6 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#22D3EE]/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#7C3AED]/20 border border-white/10 flex items-center justify-center mb-5">
                <a.icon className="w-6 h-6 text-[#22D3EE]" />
              </div>
              <h3 className="font-sora text-lg font-semibold text-white mb-2">
                {a.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-6 lg:p-8 rounded-2xl border border-[#7C3AED]/20 bg-gradient-to-r from-[#7C3AED]/10 to-[#2563EB]/10 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-200 leading-relaxed">
            Centofai möchte Wissen über KI und aktuelle Entwicklungen
            zugänglich machen, damit Startups und kleine Unternehmen neue
            Technologien besser verstehen und nutzen können.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const advantages = [
  {
    icon: HeartHandshake,
    title: "Für kleine Unternehmen gemacht",
    desc: "Wir verstehen, dass nicht jedes Unternehmen mit großem Budget startet. Deshalb entwickeln wir Lösungen, die realistisch, sinnvoll und wachstumsfähig sind.",
  },
  {
    icon: Rocket,
    title: "Von der Idee bis zur Umsetzung",
    desc: "Du brauchst keine fertige technische Planung. Wir begleiten dich Schritt für Schritt – verständlich und transparent.",
  },
  {
    icon: Brain,
    title: "KI verständlich nutzen",
    desc: "Wir integrieren KI dort, wo sie echten Mehrwert bringt – praktisch, verständlich und zielgerichtet.",
  },
  {
    icon: ShieldCheck,
    title: "Persönliche Begleitung",
    desc: "Wir arbeiten nah an deiner Idee und erklären technische Entscheidungen klar und verständlich.",
  },
  {
    icon: TrendingUp,
    title: "Zukunftsfähige Lösungen",
    desc: "Unsere digitalen Produkte sind so aufgebaut, dass sie mit deinem Unternehmen wachsen können.",
  },
];

function WhyCentofai() {
  return (
    <section id="ueber" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-sm font-medium text-[#22D3EE] mb-4">
            Warum Centofai?
          </div>
          <h2 className="font-sora text-4xl md:text-5xl font-bold text-white leading-tight">
            Ein Partner, der{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
              deine Welt versteht
            </span>
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative rounded-2xl p-7 border border-white/10 bg-[#111827] hover:border-[#2563EB]/40 transition-all hover:-translate-y-1 ${
                i === 4 ? "lg:col-start-2" : ""
              }`}
            >
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#22D3EE]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20">
                <a.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-sora text-lg font-semibold text-white mb-2">
                {a.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  {
    title: "Idee verstehen",
    desc: "Wir hören zu, analysieren deine Ziele und verstehen, welches Problem deine Idee lösen soll.",
  },
  {
    title: "Konzept entwickeln",
    desc: "Wir erstellen eine klare digitale Struktur mit Funktionen, Designrichtung und technischer Lösung.",
  },
  {
    title: "Design gestalten",
    desc: "Wir entwerfen ein modernes, nutzerfreundliches Design, das zu deinem Unternehmen passt.",
  },
  {
    title: "Lösung entwickeln",
    desc: "Wir setzen Website, App oder Software professionell um und integrieren bei Bedarf KI-gestützte Funktionen.",
  },
  {
    title: "Veröffentlichen & begleiten",
    desc: "Nach dem Launch unterstützen wir dich bei Optimierung, Erweiterung und Weiterentwicklung.",
  },
];

function ProcessSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#F8FAFC] text-[#070B14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className="text-sm font-medium text-[#2563EB] mb-4">
            Unser Prozess
          </div>
          <h2 className="font-sora text-4xl md:text-5xl font-bold leading-tight">
            Von der Idee zur{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
              digitalen Lösung
            </span>
          </h2>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block mt-20 relative">
          <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#22D3EE]" />
          <div className="grid grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white flex items-center justify-center font-sora font-bold shadow-xl shadow-blue-500/30 mb-5 mx-auto">
                  {i + 1}
                </div>
                <h3 className="font-sora font-semibold text-lg mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed text-center">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden mt-12 space-y-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white flex items-center justify-center font-sora font-bold shadow-lg shadow-blue-500/30 flex-shrink-0">
                  {i + 1}
                </div>
                {i < processSteps.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-[#7C3AED] to-transparent my-2" />
                )}
              </div>
              <div className="pb-6">
                <h3 className="font-sora font-semibold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    category: "Website",
    title: "Startup Landingpage",
    desc: "Conversion-fokussierte Landingpage mit klarer Story, schnellem Pageload und integriertem Lead-Formular.",
    gradient: "from-[#2563EB] to-[#22D3EE]",
  },
  {
    category: "Mobile App",
    title: "Mobile Buchungs-App",
    desc: "Plattformübergreifende App mit intuitivem Buchungsflow, Push-Benachrichtigungen und Kalender-Integration.",
    gradient: "from-[#7C3AED] to-[#2563EB]",
  },
  {
    category: "KI-Lösung",
    title: "KI-Chatbot für Kundenservice",
    desc: "Intelligenter Assistent, der häufige Fragen automatisch beantwortet und nur komplexe Fälle an das Team übergibt.",
    gradient: "from-[#22D3EE] to-[#7C3AED]",
  },
  {
    category: "Software",
    title: "Dashboard für kleine Unternehmen",
    desc: "Zentrales Cockpit mit Echtzeit-Daten, Auswertungen und Automatisierungen für den Geschäftsalltag.",
    gradient: "from-[#7C3AED] to-[#22D3EE]",
  },
];

function ProjectsSection() {
  return (
    <section id="projekte" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="text-sm font-medium text-[#22D3EE] mb-4">
              Projekte & Beispiele
            </div>
            <h2 className="font-sora text-4xl md:text-5xl font-bold text-white leading-tight">
              Ein Einblick in das, was{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#7C3AED] bg-clip-text text-transparent">
                möglich ist
              </span>
            </h2>
          </div>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-3xl overflow-hidden border border-white/10 bg-[#111827] hover:border-[#2563EB]/40 transition-all"
            >
              <div
                className={`relative h-56 bg-gradient-to-br ${p.gradient} overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-30">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id={`p${i}`}
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#p${i})`} />
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-20 rounded-xl bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-7">
                <div className="text-xs font-medium text-[#22D3EE] uppercase tracking-wider mb-3">
                  {p.category}
                </div>
                <h3 className="font-sora text-2xl font-semibold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-5">{p.desc}</p>
                <button className="inline-flex items-center gap-2 text-white font-medium group/btn">
                  Projekt ansehen
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setForm({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        message: "",
      });
      setSent(false);
    }, 4000);
  };

  return (
    <section id="kontakt" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111827] to-[#070B14]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#2563EB]/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-sora text-4xl md:text-6xl font-bold text-white leading-tight">
            Bereit, deine Idee{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
              digital zu machen?
            </span>
          </h2>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Erzähl uns von deiner Idee. Gemeinsam finden wir heraus, welche
            digitale Lösung zu deinem Ziel, deinem Budget und deinem
            Unternehmen passt.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
              <Mail className="w-6 h-6 text-[#22D3EE] mb-3" />
              <div className="text-sm text-slate-400 mb-1">E-Mail</div>
              <a
                href="mailto:hallo@centofai.de"
                className="text-white font-medium hover:text-[#22D3EE] transition"
              >
                hallo@centofai.de
              </a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
              <Phone className="w-6 h-6 text-[#22D3EE] mb-3" />
              <div className="text-sm text-slate-400 mb-1">Telefon</div>
              <a
                href="tel:+491234567890"
                className="text-white font-medium hover:text-[#22D3EE] transition"
              >
                +49 123 456 7890
              </a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
              <MapPin className="w-6 h-6 text-[#22D3EE] mb-3" />
              <div className="text-sm text-slate-400 mb-1">Standort</div>
              <div className="text-white font-medium">Deutschland</div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="lg:col-span-3 rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl p-8 lg:p-10"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#7C3AED] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-sora text-2xl font-bold text-white mb-3">
                    Vielen Dank!
                  </h3>
                  <p className="text-slate-300">
                    Deine Anfrage ist bei uns angekommen. Wir melden uns
                    innerhalb von 24 Stunden bei dir.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      required
                    />
                    <Field
                      label="E-Mail"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      required
                    />
                  </div>
                  <Field
                    label="Unternehmen (optional)"
                    value={form.company}
                    onChange={(v) => setForm({ ...form, company: v })}
                  />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Select
                      label="Projektart"
                      value={form.projectType}
                      onChange={(v) => setForm({ ...form, projectType: v })}
                      options={[
                        "Website",
                        "App",
                        "Software",
                        "KI-Lösung",
                        "Beratung",
                        "Noch unsicher",
                      ]}
                    />
                    <Select
                      label="Budget"
                      value={form.budget}
                      onChange={(v) => setForm({ ...form, budget: v })}
                      options={[
                        "Kleines Startbudget",
                        "Mittel",
                        "Größeres Projekt",
                        "Noch offen",
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      Nachricht
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Erzähl uns von deiner Idee..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/10 transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all"
                  >
                    Anfrage senden <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-2">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/10 transition"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-2">{label}</label>
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50 focus:ring-2 focus:ring-[#22D3EE]/10 transition appearance-none"
      >
        <option value="" className="bg-[#111827]">
          Bitte wählen
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#111827]">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#070B14] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#22D3EE] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-sora font-bold text-xl text-white">
                Centofai
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Centofai entwickelt digitale Lösungen für Startups, kleine
              Unternehmen und Menschen mit Ideen.
            </p>
            <div className="mt-5 flex gap-3">
              {[Linkedin, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#22D3EE]/40 hover:bg-white/10 transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-sora font-semibold text-white mb-4">
              Navigation
            </div>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-400 hover:text-white transition"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-sora font-semibold text-white mb-4">
              Leistungen
            </div>
            <ul className="space-y-2">
              {[
                "Website-Entwicklung",
                "App-Entwicklung",
                "Software",
                "KI-Lösungen",
                "Digitale Beratung",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#leistungen"
                    className="text-sm text-slate-400 hover:text-white transition"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-sora font-semibold text-white mb-4">
              Rechtliches
            </div>
            <ul className="space-y-2">
              {["Impressum", "Datenschutz", "AGB"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-white transition"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Centofai. Alle Rechte vorbehalten.
          </div>
          <div className="text-sm text-slate-500">Wir machen Ideen digital.</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#070B14] text-[#F8FAFC] font-inter antialiased selection:bg-[#2563EB]/40">
      <Navbar />
      <main>
        <Hero />
        <AudienceSection />
        <ServicesSection />
        <FounderSection />
        <AISection />
        <WhyCentofai />
        <ProcessSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
