import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Navigation,
  FileText,
  Mail,
  Table,
  MapPin,
  Flag,
  Smartphone,
  Calculator,
  DollarSign,
  List,
  Bluetooth,
  UserCheck,
  Receipt,
  Briefcase,
  Car,
  Shield,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "wouter";
import Navbar from "../components/Navbar";

function setMeta() {
  document.title = "FahrtDoc – Automatische Fahrtendokumentation";
  const desc =
    "FahrtDoc ist die intelligente Lösung zur einfachen Fahrtendokumentation. Automatische GPS-Erfassung, PDF-Export und Steuersparnisse berechnen.";
  let el = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "description");
    document.head.appendChild(el);
  }
  el.setAttribute("content", desc);
}

const FEATURES = [
  { icon: Navigation, label: "Automatische Fahrterfassung" },
  { icon: FileText, label: "PDF-Export" },
  { icon: Mail, label: "Liste per Mail teilen" },
  { icon: Table, label: "Excel-Liste erstellen" },
  { icon: MapPin, label: "GPS-Tracking" },
  { icon: Flag, label: "Stopps speichern" },
  { icon: Calculator, label: "Steuersparnisse berechnen" },
  { icon: DollarSign, label: "Kostenübersicht" },
  { icon: List, label: "Fahrtenliste nach Wunsch" },
  { icon: Bluetooth, label: "Bluetooth-Verbindung" },
  { icon: Smartphone, label: "Einfache Bedienung" },
];

const TARGETS = [
  { icon: Briefcase, label: "Selbstständige & Unternehmer" },
  { icon: Receipt, label: "Steuererklärung & Finanzamt" },
  { icon: UserCheck, label: "Arbeitgeber & Mitarbeiter" },
  { icon: Car, label: "Private Fahrten" },
];

const SCREENSHOTS = [
  {
    id: "login",
    src: "/fahrtdoc-screen-1.png",
    label: "Anmeldung & Face ID",
    desc: "Schneller und sicherer Einstieg per E-Mail oder Face ID – unkompliziert und datenschutzkonform.",
  },
  {
    id: "dashboard",
    src: "/fahrtdoc-screen-2.png",
    label: "Dashboard & Statistiken",
    desc: "Alle Kennzahlen auf einen Blick: Kilometer, Fahrten, Kategorien und Zeitraumauswertung.",
  },
  {
    id: "starten",
    src: "/fahrtdoc-screen-3.png",
    label: "Fahrt starten",
    desc: "Mit einem Tipp Arbeitsweg, Geschäftsreise oder private Fahrt starten – GPS läuft automatisch.",
  },
  {
    id: "aktiv",
    src: "/fahrtdoc-screen-4.png",
    label: "Fahrt läuft",
    desc: "Echtzeit-Erfassung von Strecke, Fahrtzeit und Tempo direkt auf der Karte.",
  },
  {
    id: "zwischenstopp",
    src: "/fahrtdoc-screen-5.png",
    label: "Zwischenstopp erfassen",
    desc: "Halte einfach an und speichere den aktuellen Standort als Zwischenstopp mit optionaler Notiz.",
  },
  {
    id: "beenden",
    src: "/fahrtdoc-screen-6.png",
    label: "Fahrt beenden & speichern",
    desc: "Kilometerstand wählen, Route auf der Karte prüfen und Fahrt mit einem Tipp speichern.",
  },
  {
    id: "aktiv-banner",
    src: "/fahrtdoc-screen-7.png",
    label: "Aktive Fahrt im Überblick",
    desc: "Laufende Fahrt wird prominent angezeigt – pausieren oder stoppen jederzeit möglich.",
  },
  {
    id: "fahrtenliste",
    src: "/fahrtdoc-screen-8.png",
    label: "Fahrtenliste & Export",
    desc: "Alle Fahrten gefiltert nach Zeitraum und Zweck – inkl. PDF, CSV & E-Mail-Export.",
  },
  {
    id: "kosten",
    src: "/fahrtdoc-screen-9.png",
    label: "Fahrzeugkosten",
    desc: "Übersichtliche Kostenauswertung: Kraftstoff, Wartung und Sonstiges – aufgeteilt nach Fahrtkategorie.",
  },
  {
    id: "kosten-hinzufuegen",
    src: "/fahrtdoc-screen-10.png",
    label: "Kosten hinzufügen",
    desc: "Kosten manuell erfassen und direkt einer Fahrt zuordnen – schnell und ohne Umwege.",
  },
];


function ScreenshotsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(SCREENSHOTS.length - 1, i + 1));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const current = SCREENSHOTS[active];

  return (
    <section className="py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 px-6"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          Die App im{" "}
          <span style={{ color: "#BFFF00" }}>Einsatz</span>
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Schauen Sie sich an, wie FahrtDoc Ihre Fahrten erfasst, visualisiert und exportiert.
        </p>
      </motion.div>

      {/* Cover-Flow Stage */}
      <div className="relative flex items-center justify-center" style={{ height: 620 }}>
        {SCREENSHOTS.map((s, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          if (abs > 2) return null;

          const SCALE  = [1,    0.78, 0.60][abs];
          const OPA    = [1,    0.55, 0.25][abs];
          const TX     = offset * 248;
          const Z      = 20 - abs * 6;
          const isActive = abs === 0;

          return (
            <div
              key={s.id}
              onClick={isActive ? undefined : () => setActive(i)}
              className={isActive ? "absolute" : "absolute cursor-pointer"}
              style={{
                transform: `translateX(${TX}px) scale(${SCALE})`,
                opacity: OPA,
                zIndex: Z,
                transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease",
              }}
            >
              {/* Blue radial glow behind active */}
              {isActive && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 65%, rgba(0,102,204,0.5) 0%, transparent 70%)",
                    transform: "scale(1.15)",
                    filter: "blur(28px)",
                    zIndex: -1,
                  }}
                />
              )}

              {/* Clip container: keeps phone shape */}
              <div style={{
                width: 252,
                height: 530,
                borderRadius: 44,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <img
                  src={s.src}
                  alt={s.label}
                  style={{
                    width: "128%",
                    height: "auto",
                    display: "block",
                    flexShrink: 0,
                  }}
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-4 mt-6 px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            disabled={active === 0}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/40 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {SCREENSHOTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${active === i ? "w-6 h-2.5 bg-[#0066CC]" : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            disabled={active === SCREENSHOTS.length - 1}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/40 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <p className="text-sm font-bold text-white mb-1">{current.label}</p>
          <p className="text-xs text-slate-400 max-w-xs">{current.desc}</p>
        </motion.div>
      </div>
    </section>
  );
}

export default function FahrtDocPage() {
  useEffect(() => {
    setMeta();
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-[#020B18] text-white font-sans antialiased">
      <Navbar />

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-4 border border-[#0066CC]/40 bg-[#0066CC]/10 text-[#4DA6FF] px-3 py-1 rounded-full">
              App für iOS & Android
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Ihre Fahrten.{" "}
              <span className="text-[#0066CC]">Automatisch.</span>{" "}
              <span style={{ color: "#BFFF00" }}>Dokumentiert.</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Die smarte App für die automatische Fahrterfassung – einfach,
              sicher und zuverlässig.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-2 bg-[#0066CC] hover:bg-[#0055AA] text-white px-7 py-3 rounded-xl font-semibold transition shadow-[0_0_30px_rgba(0,102,204,0.35)]"
              >
                Jetzt herunterladen
              </a>
              <a
                href="#screenshots"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-slate-300 hover:text-white px-7 py-3 rounded-xl font-semibold transition"
              >
                Screenshots ansehen
              </a>
            </div>

            <div className="mt-8 text-slate-400 text-sm leading-relaxed space-y-3 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <p>
                FahrtDoc ist die moderne All-in-One-Lösung für intelligente Fahrtendokumentation, professionelle Kostenverwaltung und übersichtliche Steuerdokumentation – entwickelt für Privatpersonen, Selbstständige und Unternehmen in der Schweiz, Deutschland und Österreich.
              </p>
              <p>
                Vergessen Sie manuelle Aufzeichnungen und unübersichtliche Tabellen. FahrtDoc erfasst Ihre Fahrten vollautomatisch per GPS – präzise, übersichtlich und jederzeit abrufbar. Von der ersten Umdrehung bis zur letzten Kilometerangabe dokumentiert FahrtDoc alles, was Sie für eine rechtssichere und professionelle Fahrtenbuchführung benötigen. Dank der intelligenten Bluetooth-Erkennung erhalten Sie beim Einsteigen sofort eine Erinnerung zur Fahrtaufzeichnung – so geht Ihnen keine einzige Fahrt mehr verloren.
              </p>
              <p>
                Klassifizieren Sie jede Fahrt bequem als Geschäftlich, Arbeitsweg oder Privat. Die farblich differenzierte Übersicht sorgt für sofortige Klarheit und eine strukturierte Fahrthistorie, die jederzeit filterbar und durchsuchbar ist. Start- und Zielort, Strecke, Fahrtdauer sowie genaue Uhrzeiten werden präzise erfasst und übersichtlich in Ihrem persönlichen Fahrtenbuch gespeichert.
              </p>
              <p>
                Neben der Fahrterfassung bietet FahrtDoc eine vollständige Kostenverwaltung für Ihr Fahrzeug. Erfassen Sie Tankkosten, Wartungsausgaben, Versicherungsbeiträge und weitere Fahrzeugkosten direkt in der App – kategorisiert, übersichtlich und immer griffbereit. Die integrierte Kostenübersicht zeigt auf einen Blick, wie sich Ihre Ausgaben zusammensetzen, und hilft Ihnen, Ihr Budget gezielt im Griff zu behalten.
              </p>
              <p>
                FahrtDoc hilft Ihnen, den steuerlich relevanten Teil jeder geschäftlichen Fahrt und jedes Arbeitswegs übersichtlich zu dokumentieren – orientiert an den gängigen Kilometerpauschalen. So erhalten Sie eine strukturierte Übersicht Ihrer absetzbaren Fahrten und Kosten, die Sie direkt an Ihren Steuerberater weitergeben oder für Ihre eigene Steuererklärung nutzen können.
              </p>
              <p>
                Alle Fahrten und Kosten lassen sich jederzeit als professionelle PDF-Berichte oder CSV-Dateien exportieren – inklusive Kostenzusammenfassung, Kategorieverteilung und ausgewiesenen Steuerabzügen. Der Zugriff auf die App erfolgt wahlweise per Face ID, Fingerabdruck oder klassisch mit Benutzername und Passwort – ganz nach Ihren persönlichen Vorlieben. Ihre Standortdaten werden nur während aktiver Fahrten verwendet, und Ihre Daten gehören Ihnen – jederzeit einsehbar, exportierbar und auf Wunsch vollständig löschbar.
              </p>
              <p>
                Mit einem klaren, modernen Design, farblich codierten Fahrkategorien und einer intuitiven Benutzeroberfläche macht FahrtDoc die Fahrtendokumentation so einfach wie nie zuvor. Keine komplizierten Menüs, keine unnötigen Funktionen – nur das, was Sie wirklich brauchen, um Ihre Fahrten effizient zu verwalten, Kilometer lückenlos nachzuweisen und Kosten professionell zu dokumentieren.
              </p>
              <p>
                <span style={{ color: "#BFFF00" }} className="font-semibold">FahrtDoc – Smarter dokumentieren. Klarer nachweisen. Zeit sparen.</span>
              </p>
            </div>
          </motion.div>

          {/* Logo / Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="shrink-0"
          >
            <div className="relative flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-[#0066CC]/20 blur-2xl" />
                <img
                  src="/fahrtdoc-logo.jpeg"
                  alt="FahrtDoc App – Automatische Fahrterfassung"
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] object-cover shadow-2xl border border-white/10"
                />
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-white tracking-tight">FahrtDoc</p>
                <p className="text-sm text-slate-400 mt-0.5">Einfach fahren, clever erfassen</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Screenshots Carousel */}
      <div id="screenshots">
        <ScreenshotsSection />
      </div>

      {/* Features Grid */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Alle Funktionen im{" "}
            <span className="text-[#0066CC]">Überblick</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Alles, was Sie für eine lückenlose Fahrtendokumentation brauchen.
          </p>
        </motion.div>

        <style>{`
          .fd-feature-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
          @media (max-width: 480px) { .fd-feature-grid { grid-template-columns: 1fr; } }
          .fd-feature-card { transition: border-color 0.2s ease; }
          .fd-feature-card:hover { border-color: rgba(127,119,221,0.35) !important; }
        `}</style>
        <div className="fd-feature-grid">
          {[
            { icon: Navigation,    iconBg: "rgba(83,74,183,0.18)",  iconColor: "#7F77DD", title: "Automatische Fahrterfassung", desc: "GPS-basiert, im Hintergrund" },
            { icon: FileText,      iconBg: "rgba(29,158,117,0.18)", iconColor: "#5DCAA5", title: "PDF-Export",                   desc: "Steuerkonformer Bericht" },
            { icon: Mail,          iconBg: "rgba(55,138,221,0.18)", iconColor: "#85B7EB", title: "Liste per Mail teilen",        desc: "Direkt aus der App" },
            { icon: Table,         iconBg: "rgba(239,159,39,0.18)", iconColor: "#FAC775", title: "Excel-Liste erstellen",        desc: "Kompatibel mit Numbers" },
            { icon: MapPin,        iconBg: "rgba(83,74,183,0.18)",  iconColor: "#7F77DD", title: "GPS-Tracking",                 desc: "Präzise Routenaufzeichnung" },
            { icon: Flag,          iconBg: "rgba(29,158,117,0.18)", iconColor: "#5DCAA5", title: "Stopps speichern",             desc: "Mehrere Zwischenstopps" },
            { icon: Calculator,    iconBg: "rgba(216,90,48,0.18)",  iconColor: "#F0997B", title: "Steuersparnisse berechnen",    desc: "CHF 0.70/km Pauschale" },
            { icon: DollarSign,    iconBg: "rgba(239,159,39,0.18)", iconColor: "#FAC775", title: "Kostenübersicht",              desc: "Alle Fahrten auf einen Blick" },
            { icon: List,          iconBg: "rgba(83,74,183,0.18)",  iconColor: "#7F77DD", title: "Fahrtenliste nach Wunsch",     desc: "Filter & Kategorien" },
            { icon: Bluetooth,     iconBg: "rgba(55,138,221,0.18)", iconColor: "#85B7EB", title: "Bluetooth-Verbindung",         desc: "Auto-Start beim Einsteigen" },
            { icon: Smartphone,    iconBg: "rgba(29,158,117,0.18)", iconColor: "#5DCAA5", title: "Einfache Bedienung",           desc: "Intuitiv & schnell" },
            { icon: null,          iconBg: "rgba(127,119,221,0.08)", iconColor: "#534AB7", title: "Weitere Features",            desc: "Bald verfügbar", dimmed: true },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="fd-feature-card"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: f.dimmed ? "0.5px solid rgba(127,119,221,0.15)" : "0.5px solid rgba(255,255,255,0.07)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: f.dimmed ? 0.5 : 1,
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 8, background: f.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {Icon
                    ? <Icon style={{ width: 20, height: 20, color: f.iconColor }} />
                    : <span style={{ fontSize: 18, color: f.iconColor, fontWeight: 700, letterSpacing: 2 }}>···</span>
                  }
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: f.dimmed ? "#5F5E8A" : "#EEEDFE", lineHeight: 1.3, margin: 0 }}>{f.title}</p>
                  <p style={{ fontSize: 11, color: "#5F5E8A", lineHeight: 1.4, marginTop: 3, marginBottom: 0 }}>{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Ideal für */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Ideal{" "}
            <span style={{ color: "#BFFF00" }}>für</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            FahrtDoc passt sich Ihren Bedürfnissen an – egal ob privat oder
            geschäftlich.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TARGETS.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#BFFF00]/30 transition text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "#BFFF0015" }}
                >
                  <Icon className="w-7 h-7" style={{ color: "#BFFF00" }} />
                </div>
                <p className="font-semibold text-slate-200 text-sm leading-snug">
                  {t.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Datenschutz-Banner */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-gradient-to-r from-[#0066CC] to-[#0044AA] p-8 md:p-10 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-white mb-1">
              Ihre Daten. Ihre Kontrolle.
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xl">
              FahrtDoc speichert Ihre Fahrtdaten sicher und verschlüsselt in
              der Cloud. Keine Datenweitergabe an Dritte. Vollständig
              DSGVO-konform.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3 items-stretch">
            <Link
              to="/products/fahrtdoc/datenschutz"
              className="px-4 py-2 rounded-lg bg-white text-[#0066CC] text-xs font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              📄 Datenschutzerklärung
            </Link>
            <Link
              to="/products/fahrtdoc/support"
              className="px-4 py-2 rounded-lg bg-white text-[#0066CC] text-xs font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              🆘 Support
            </Link>
            <span className="px-4 py-2 rounded-lg bg-white/20 text-white text-xs font-semibold text-center">
              🔒 DSGVO-konform
            </span>
          </div>
        </motion.div>
      </section>

      {/* Download */}
      <section id="download" className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Jetzt{" "}
            <span className="text-[#0066CC]">herunterladen</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Verfügbar für iPhone und Android. Starten Sie noch heute mit der
            automatischen Fahrterfassung.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-black border border-white/20 hover:border-white/40 transition group"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <p className="text-[10px] text-slate-400 leading-none mb-0.5">
                  Download im
                </p>
                <p className="text-sm font-bold text-white leading-none">
                  App Store
                </p>
              </div>
            </a>
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 opacity-50 cursor-not-allowed select-none">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M3.18 23.76a1.97 1.97 0 0 1-.69-.57L13.06 12.5 3.2.87a1.97 1.97 0 0 1 .66-.55l10.52 6.08L3.18 23.76z" fill="#EA4335" />
                <path d="M20.3 10.46l-2.98-1.72-3.26 3 3.26 3 3.01-1.74a1.98 1.98 0 0 0 0-3.44z" fill="#FBBC04" />
                <path d="M2.49.32C2.9.11 3.41.17 3.8.5l10.52 6.08-3.26 2.99L2.49.32z" fill="#4285F4" />
                <path d="M2.49 23.68l8.57-9.25 3.26 3L3.8 23.51c-.39.33-.9.39-1.31.17z" fill="#34A853" />
              </svg>
              <div>
                <p className="text-[10px] text-slate-400 leading-none mb-0.5">
                  Demnächst bei
                </p>
                <p className="text-sm font-bold text-white leading-none">
                  Google Play
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-28 h-28 rounded-xl border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center">
              <QrCode className="w-10 h-10 text-slate-500" />
            </div>
            <p className="text-xs text-slate-500 text-center max-w-[7rem] leading-tight">
              QR-Code zum Scannen
            </p>
          </div>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6">
          <p>
            &copy; {new Date().getFullYear()} FahrtDoc · Ein Produkt von{" "}
            <Link to="/" className="text-[#4DA6FF] hover:text-[#0066CC] transition">
              Centof.Ai
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
