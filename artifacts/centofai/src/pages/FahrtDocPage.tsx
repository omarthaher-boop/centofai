import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Navigation,
  FileText,
  Mail,
  Table,
  MapPin,
  Flag,
  Cloud,
  Smartphone,
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

function setMeta() {
  document.title = "FahrtDoc – Automatische Fahrtendokumentation";
  const desc =
    "FahrtDoc ist die intelligente Lösung zur einfachen Fahrtendokumentation. Automatische GPS-Erfassung, sichere Cloud-Speicherung und PDF-Export.";
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
  { icon: Cloud, label: "Cloud-Speicherung" },
  { icon: Smartphone, label: "Einfache Bedienung" },
];

const TARGETS = [
  { icon: Briefcase, label: "Selbstständige & Unternehmer" },
  { icon: Receipt, label: "Steuererklärung & Finanzamt" },
  { icon: UserCheck, label: "Arbeitgeber & Mitarbeiter" },
  { icon: Car, label: "Private Fahrten" },
];

const SCREENS = [
  { src: "/fahrtdoc-screen-1.png", caption: "Anmelden" },
  { src: "/fahrtdoc-screen-2.png", caption: "Registrieren" },
  { src: "/fahrtdoc-screen-3.png", caption: "Dashboard & Statistiken" },
  { src: "/fahrtdoc-screen-4.png", caption: "Fahrt starten" },
  { src: "/fahrtdoc-screen-5.png", caption: "Fahrt läuft – Live-Tracking" },
  { src: "/fahrtdoc-screen-6.png", caption: "Fahrtenliste & Export" },
  { src: "/fahrtdoc-screen-7.png", caption: "Fahrt bearbeiten mit Karte" },
];

function ScreenshotCarousel() {
  const [active, setActive] = useState(2);
  const trackRef = useRef<HTMLDivElement>(null);

  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(SCREENS.length - 1, a + 1));

  return (
    <section className="py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14 px-6"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          Die App in{" "}
          <span className="text-[#0066CC]">Aktion</span>
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Sieben echte Screens – so sieht FahrtDoc auf Ihrem iPhone aus.
        </p>
      </motion.div>

      {/* Carousel track */}
      <div className="relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#020B18] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#020B18] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex items-end justify-center gap-4 md:gap-6 px-8 transition-all duration-500"
          style={{ minHeight: 520 }}
        >
          {SCREENS.map((screen, i) => {
            const offset = i - active;
            const isActive = i === active;
            const isAdjacent = Math.abs(offset) === 1;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            return (
              <motion.button
                key={screen.src}
                onClick={() => setActive(i)}
                aria-label={screen.caption}
                animate={{
                  scale: isActive ? 1 : isAdjacent ? 0.82 : 0.68,
                  opacity: isActive ? 1 : isAdjacent ? 0.6 : 0.3,
                  y: isActive ? 0 : isAdjacent ? 20 : 40,
                  zIndex: isActive ? 20 : isAdjacent ? 10 : 5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative shrink-0 focus:outline-none"
                style={{ width: isActive ? 220 : isAdjacent ? 180 : 150 }}
              >
                {/* iPhone frame */}
                <div className="relative">
                  {/* Outer shell */}
                  <div
                    className="relative rounded-[2.8rem] overflow-hidden shadow-2xl border-[3px]"
                    style={{
                      borderColor: isActive ? "#0066CC" : "rgba(255,255,255,0.12)",
                      aspectRatio: "9/19.5",
                    }}
                  >
                    {/* Dynamic island notch */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[38%] h-[3.5%] bg-black rounded-full z-10" />
                    <img
                      src={screen.src}
                      alt={screen.caption}
                      className="w-full h-full object-cover object-top"
                      draggable={false}
                    />
                  </div>
                  {/* Glow for active */}
                  {isActive && (
                    <div className="absolute -inset-3 rounded-[3.5rem] bg-[#0066CC]/25 blur-2xl -z-10" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Caption */}
        <div className="text-center mt-6 h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium text-slate-300"
            >
              {SCREENS[active].caption}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            disabled={active === 0}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {SCREENS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  backgroundColor: i === active ? "#0066CC" : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={active === SCREENS.length - 1}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
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
      {/* Sticky Nav */}
      <nav className="border-b border-white/10 bg-[#020B18]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Unsere Produkte
          </Link>
          <div className="flex items-center gap-2">
            <img
              src="/fahrtdoc-logo.jpeg"
              alt="FahrtDoc"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="text-sm font-bold text-white">FahrtDoc</span>
          </div>
        </div>
      </nav>

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
                href="#features"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-slate-300 hover:text-white px-7 py-3 rounded-xl font-semibold transition"
              >
                Funktionen entdecken
              </a>
            </div>
          </motion.div>

          {/* Logo / Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="shrink-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-[#0066CC]/20 blur-2xl" />
              <img
                src="/fahrtdoc-logo.jpeg"
                alt="FahrtDoc App – Automatische Fahrterfassung"
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] object-cover shadow-2xl border border-white/10"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Screenshot Carousel ── */}
      <ScreenshotCarousel />

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066CC]/50 hover:bg-[#0066CC]/10 transition text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0066CC]/15 flex items-center justify-center group-hover:scale-110 transition">
                  <Icon className="w-6 h-6 text-[#4DA6FF]" />
                </div>
                <p className="text-sm font-semibold text-slate-200 leading-tight">
                  {f.label}
                </p>
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
          <div className="shrink-0 flex flex-wrap gap-3 justify-center">
            <span className="px-4 py-2 rounded-lg bg-white/20 text-white text-xs font-semibold">
              🔒 DSGVO-konform
            </span>
            <span className="px-4 py-2 rounded-lg bg-white/20 text-white text-xs font-semibold">
              🇩🇪 Server in Deutschland
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
            Jetzt kostenlos{" "}
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
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-black border border-white/20 hover:border-white/40 transition group"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M3.18 23.76a1.97 1.97 0 0 1-.69-.57L13.06 12.5 3.2.87a1.97 1.97 0 0 1 .66-.55l10.52 6.08L3.18 23.76z" fill="#EA4335" />
                <path d="M20.3 10.46l-2.98-1.72-3.26 3 3.26 3 3.01-1.74a1.98 1.98 0 0 0 0-3.44z" fill="#FBBC04" />
                <path d="M2.49.32C2.9.11 3.41.17 3.8.5l10.52 6.08-3.26 2.99L2.49.32z" fill="#4285F4" />
                <path d="M2.49 23.68l8.57-9.25 3.26 3L3.8 23.51c-.39.33-.9.39-1.31.17z" fill="#34A853" />
              </svg>
              <div>
                <p className="text-[10px] text-slate-400 leading-none mb-0.5">
                  Jetzt bei
                </p>
                <p className="text-sm font-bold text-white leading-none">
                  Google Play
                </p>
              </div>
            </a>
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
