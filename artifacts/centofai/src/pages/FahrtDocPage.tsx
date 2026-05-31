import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
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
import Navbar from "../components/Navbar";

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

function ScreenFahrtenliste() {
  const trips = [
    { date: "Mo, 27. Mai", from: "München HBF", to: "Unterföhring", km: "14,2 km", type: "Geschäftlich", color: "#0066CC" },
    { date: "Di, 28. Mai", from: "Büro Schwabing", to: "Flughafen MUC", km: "37,8 km", type: "Geschäftlich", color: "#0066CC" },
    { date: "Mi, 29. Mai", from: "Zuhause", to: "Supermarkt", km: "3,4 km", type: "Privat", color: "#64748b" },
    { date: "Do, 30. Mai", from: "Werkstatt GmbH", to: "Kunde Giesing", km: "8,9 km", type: "Geschäftlich", color: "#0066CC" },
  ];
  return (
    <div className="w-full h-full bg-[#0A1628] flex flex-col text-white overflow-hidden">
      <div className="px-4 pt-4 pb-3 bg-[#0A1628]">
        <p className="text-[10px] text-slate-400 mb-1">Mai 2026</p>
        <h3 className="text-sm font-bold">Meine Fahrten</h3>
        <div className="mt-2 flex gap-2">
          <span className="text-[9px] bg-[#0066CC] text-white px-2 py-0.5 rounded-full font-semibold">Alle</span>
          <span className="text-[9px] bg-white/10 text-slate-300 px-2 py-0.5 rounded-full">Geschäftlich</span>
          <span className="text-[9px] bg-white/10 text-slate-300 px-2 py-0.5 rounded-full">Privat</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-3 pb-3 flex flex-col gap-2">
        {trips.map((t, i) => (
          <div key={i} className="flex items-center gap-2 bg-white/5 rounded-xl p-2.5 border border-white/8">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: t.color + "22" }}>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke={t.color} strokeWidth="2.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-slate-400 leading-none mb-0.5">{t.date}</p>
              <p className="text-[10px] font-semibold leading-tight truncate">{t.from} → {t.to}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] font-bold text-[#4DA6FF]">{t.km}</p>
              <p className="text-[9px]" style={{ color: t.color }}>{t.type}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-2 flex justify-between items-center">
        <div>
          <p className="text-[9px] text-slate-400">Gesamt Mai</p>
          <p className="text-xs font-bold text-[#4DA6FF]">64,3 km</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#0066CC] flex items-center justify-center shadow-lg shadow-[#0066CC]/30">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
            <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ScreenGPSKarte() {
  return (
    <div className="w-full h-full bg-[#0A1628] flex flex-col text-white overflow-hidden">
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
          <ChevronLeft className="w-3.5 h-3.5 text-slate-300" />
        </div>
        <div>
          <h3 className="text-xs font-bold leading-none">Fahrt Details</h3>
          <p className="text-[9px] text-slate-400">Do, 30. Mai 2026</p>
        </div>
      </div>
      <div className="relative mx-3 rounded-xl overflow-hidden flex-1" style={{ maxHeight: "52%" }}>
        <svg viewBox="0 0 220 130" className="w-full h-full" style={{ background: "linear-gradient(135deg, #0d2240 0%, #0a1a35 100%)" }}>
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0066CC" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0066CC" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 18} x2="220" y2={i * 18} stroke="#ffffff08" strokeWidth="0.5" />
          ))}
          {[...Array(12)].map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="130" stroke="#ffffff08" strokeWidth="0.5" />
          ))}
          <path d="M 30 100 Q 50 80 80 70 Q 110 60 140 50 Q 165 42 190 30" stroke="#0066CC" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="none" />
          <path d="M 30 100 Q 50 80 80 70 Q 110 60 140 50 Q 165 42 190 30" stroke="#4DA6FF" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
          <circle cx="30" cy="100" r="5" fill="#22c55e" />
          <circle cx="30" cy="100" r="9" fill="#22c55e" fillOpacity="0.25" />
          <circle cx="190" cy="30" r="5" fill="#ef4444" />
          <circle cx="190" cy="30" r="9" fill="#ef4444" fillOpacity="0.25" />
          <rect x="8" y="89" rx="3" ry="3" width="40" height="13" fill="#0A2040" stroke="#22c55e" strokeWidth="0.8" />
          <text x="28" y="98.5" textAnchor="middle" fill="#22c55e" fontSize="5.5" fontFamily="system-ui">Start</text>
          <rect x="168" y="18" rx="3" ry="3" width="44" height="13" fill="#0A2040" stroke="#ef4444" strokeWidth="0.8" />
          <text x="190" y="27.5" textAnchor="middle" fill="#ef4444" fontSize="5.5" fontFamily="system-ui">Kunde Giesing</text>
        </svg>
      </div>
      <div className="px-3 py-2 flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Strecke", value: "8,9 km", color: "#4DA6FF" },
            { label: "Dauer", value: "22 Min", color: "#BFFF00" },
            { label: "Typ", value: "Geschäftl.", color: "#0066CC" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 rounded-lg p-2 text-center border border-white/8">
              <p className="text-[8px] text-slate-400 mb-0.5">{s.label}</p>
              <p className="text-[10px] font-bold" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/5 rounded-lg p-2.5 border border-white/8 flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-[#0066CC] shrink-0" />
          <div className="flex-1">
            <p className="text-[9px] text-slate-300 font-medium">Werkstatt GmbH → Kunde Giesing</p>
            <p className="text-[8px] text-slate-500">Zweck: Kundenbesuch</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenPDFExport() {
  return (
    <div className="w-full h-full bg-[#0A1628] flex flex-col text-white overflow-hidden">
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-xs font-bold">PDF-Export</h3>
        <p className="text-[9px] text-slate-400">Fahrtenbuch Mai 2026</p>
      </div>
      <div className="flex-1 mx-3 mb-3 rounded-xl overflow-hidden border border-white/10 bg-white flex flex-col">
        <div className="bg-[#0066CC] px-3 py-2 flex items-center justify-between">
          <div>
            <p className="text-[8px] text-blue-200 leading-none">Fahrtenbuch</p>
            <p className="text-[10px] font-bold text-white leading-none mt-0.5">Max Mustermann</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-blue-200 leading-none">Mai 2026</p>
            <p className="text-[9px] font-semibold text-white leading-none mt-0.5">64,3 km</p>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-4 bg-slate-100 px-2 py-1 border-b border-slate-200">
            {["Datum", "Start", "Ziel", "km"].map((h) => (
              <p key={h} className="text-[7px] font-bold text-slate-500 uppercase">{h}</p>
            ))}
          </div>
          {[
            ["27.05.", "München HBF", "Unterföhring", "14,2"],
            ["28.05.", "Büro Schwabing", "Flughafen MUC", "37,8"],
            ["29.05.", "Zuhause", "Supermarkt", "3,4"],
            ["30.05.", "Werkstatt", "Giesing", "8,9"],
          ].map(([d, f, t, k], i) => (
            <div key={i} className={`grid grid-cols-4 px-2 py-1.5 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} border-b border-slate-100`}>
              <p className="text-[7.5px] text-slate-700 font-medium">{d}</p>
              <p className="text-[7.5px] text-slate-600 truncate">{f}</p>
              <p className="text-[7.5px] text-slate-600 truncate">{t}</p>
              <p className="text-[7.5px] font-bold text-[#0066CC]">{k}</p>
            </div>
          ))}
          <div className="flex items-center justify-between px-2 py-1.5 bg-[#0066CC]/8 border-t border-[#0066CC]/20">
            <p className="text-[7.5px] font-bold text-[#0066CC]">Gesamt</p>
            <p className="text-[7.5px] font-bold text-[#0066CC]">64,3 km</p>
          </div>
        </div>
        <div className="px-3 py-2 border-t border-slate-100 flex justify-center">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0066CC] rounded-full">
            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="white">
              <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
            </svg>
            <p className="text-[7px] font-bold text-white">Als PDF teilen</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const SCREENSHOTS = [
  {
    id: "fahrtenliste",
    label: "Fahrtenliste",
    desc: "Alle Fahrten auf einen Blick – sortiert und kategorisiert.",
    Screen: ScreenFahrtenliste,
  },
  {
    id: "gps",
    label: "GPS-Karte",
    desc: "Routen-Visualisierung mit Start, Ziel und Streckendetails.",
    Screen: ScreenGPSKarte,
  },
  {
    id: "pdf",
    label: "PDF-Export",
    desc: "Professionelles Fahrtenbuch als PDF – bereit für Ihr Finanzamt.",
    Screen: ScreenPDFExport,
  },
];

function PhoneMockup({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div
      className={`relative shrink-0 transition-all duration-300 ${active ? "scale-100 opacity-100" : "scale-95 opacity-60"}`}
      style={{ width: 200, height: 400 }}
    >
      <div
        className="absolute inset-0 rounded-[2.5rem] border-[6px] border-[#1a2a42] bg-[#0a1628] shadow-2xl overflow-hidden"
        style={{ boxShadow: active ? "0 0 50px rgba(0,102,204,0.25), 0 20px 60px rgba(0,0,0,0.6)" : "0 10px 40px rgba(0,0,0,0.4)" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a2a42] rounded-b-2xl z-10 flex items-center justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0a1628]" />
          <div className="w-8 h-1 rounded-full bg-[#0a1628]" />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/20 z-10" />
        <div className="absolute inset-0 pt-5 pb-4 overflow-hidden">
          <div className="w-full h-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      <div className="absolute right-[-8px] top-24 w-[3px] h-10 bg-[#1a2a42] rounded-r-md" />
      <div className="absolute left-[-8px] top-20 w-[3px] h-6 bg-[#1a2a42] rounded-l-md" />
      <div className="absolute left-[-8px] top-30 w-[3px] h-10 bg-[#1a2a42] rounded-l-md" />
    </div>
  );
}

function ScreenshotsSection() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    setActive(index);
    if (scrollRef.current) {
      const child = scrollRef.current.children[index] as HTMLElement;
      if (child) {
        scrollRef.current.scrollTo({ left: child.offsetLeft - (scrollRef.current.offsetWidth / 2) + (child.offsetWidth / 2), behavior: "smooth" });
      }
    }
  };

  const prev = () => scrollTo(Math.max(0, active - 1));
  const next = () => scrollTo(Math.min(SCREENSHOTS.length - 1, active + 1));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const center = el.scrollLeft + el.offsetWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      Array.from(el.children).forEach((child, i) => {
        const c = child as HTMLElement;
        const childCenter = c.offsetLeft + c.offsetWidth / 2;
        if (Math.abs(childCenter - center) < minDist) {
          minDist = Math.abs(childCenter - center);
          closest = i;
        }
      });
      setActive(closest);
    };
    el.addEventListener("scrollend", handler);
    el.addEventListener("scroll", handler);
    return () => { el.removeEventListener("scrollend", handler); el.removeEventListener("scroll", handler); };
  }, []);

  const current = SCREENSHOTS[active];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
>>>>>>> 90bce0e (feat(fahrtdoc): Add app screenshots carousel with iPhone mockup frames)
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          Die App im{" "}
          <span style={{ color: "#BFFF00" }}>Einsatz</span>
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Schauen Sie sich an, wie FahrtDoc Ihre Fahrten erfasst, visualisiert und exportiert.
        </p>
      </motion.div>

      <div className="flex flex-col items-center gap-8">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-4 w-full justify-start md:justify-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SCREENSHOTS.map((s, i) => (
            <div
              key={s.id}
              className="snap-center shrink-0 cursor-pointer"
              onClick={() => scrollTo(i)}
            >
              <PhoneMockup active={active === i}>
                <s.Screen />
              </PhoneMockup>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
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
                  onClick={() => scrollTo(i)}
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
                FahrtDoc ist die moderne und intelligente Lösung zur einfachen Dokumentation von Fahrten. Die App wurde entwickelt, um Fahrten automatisch, übersichtlich und professionell zu erfassen – ideal für Privatpersonen, Selbstständige und Unternehmen.
              </p>
              <p>
                Mit einem klaren Design ermöglicht FahrtDoc die schnelle Erfassung von Strecken, Kilometern, Fahrtdauer sowie Start- und Zielorten direkt über GPS. Alle Fahrten können jederzeit gefiltert und als PDF- oder CSV-Datei exportiert werden.
              </p>
              <p>
                Dank Face ID oder Fingerabdruck ist der Zugriff schnell und sicher. Standortdaten werden ausschließlich während aktiver Fahrten verwendet und können jederzeit exportiert oder gelöscht werden.{" "}
                <span style={{ color: "#BFFF00" }} className="font-semibold">FahrtDoc macht Fahrtendokumentation smarter, schneller und einfacher.</span>
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
