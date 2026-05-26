import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Newspaper,
  GraduationCap,
  Wrench,
  Mail,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Zap,
  Brain,
  Rocket,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Filter,
  Globe,
  Bot,
  MessageSquare,
  BookOpen,
  Star,
  Tag,
  User,
  Building2,
  Clock,
  Languages,
  ArrowUpRight,
} from "lucide-react";
import { tools, toolCategories, type Tool } from "./data/tools";
import { newsItems, newsCategories, type NewsItem } from "./data/news";
import { courses, courseCategories, type Course } from "./data/courses";

/* ─── Navbar ───────────────────────────────────────────────────────── */
const navLinks = [
  { name: "News", href: "#news" },
  { name: "Kurse", href: "#kurse" },
  { name: "KI-Tools", href: "#tools" },
  { name: "Über uns", href: "#about" },
  { name: "Newsletter", href: "#newsletter" },
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070B14]/90 backdrop-blur-xl border-b border-[#1E293B]/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#2563EB]/20 group-hover:shadow-[#2563EB]/30 transition-shadow">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              Cent of <span className="text-[#22D3EE]">AI</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[#94A3B8] hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#newsletter"
              className="ml-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#2563EB]/20"
            >
              Newsletter
            </a>
          </div>

          <button
            className="md:hidden p-2 text-[#94A3B8] hover:text-white"
            onClick={() => setOpen(!open)}
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
            className="md:hidden bg-[#070B14]/95 backdrop-blur-xl border-b border-[#1E293B]"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-[#94A3B8] hover:text-white rounded-lg hover:bg-white/5"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#newsletter"
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white rounded-lg mt-2 text-center"
              >
                Newsletter abonnieren
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#070B14] via-[#0a1628] to-[#070B14]" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#7C3AED]/10 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B]/60 border border-[#22D3EE]/20 mb-6">
              <Zap className="w-4 h-4 text-[#22D3EE]" />
              <span className="text-sm text-[#22D3EE] font-medium">Deine KI-Plattform</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Entdecke die Welt der{" "}
              <span className="gradient-text">Künstlichen Intelligenz</span>
            </h1>

            <p className="text-lg text-[#94A3B8] leading-relaxed mb-8 max-w-xl">
              News, Tools, Kurse und Workshops – alles an einem Ort, um KI besser zu verstehen und produktiv einzusetzen.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#tools"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#2563EB]/25"
              >
                <Wrench className="w-5 h-5" />
                KI-Tools entdecken
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#news"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1E293B] border border-[#1E293B] text-white font-semibold rounded-xl hover:border-[#22D3EE]/30 transition-all"
              >
                <Newspaper className="w-5 h-5 text-[#22D3EE]" />
                Aktuelle KI-News
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 text-sm text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0" />
                100+ KI-Tools
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0" />
                Tägliche News
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0" />
                Kuratierte Kurse
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-[#0F172A]/80 border border-[#1E293B] rounded-2xl p-6 backdrop-blur-sm glow-cyan">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-[#64748B] ml-2">centofai.com/dashboard</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#1E293B]/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bot className="w-8 h-8 text-[#22D3EE]" />
                    <div>
                      <p className="text-sm font-semibold text-white">KI-News Heute</p>
                      <p className="text-xs text-[#64748B]">12 neue Artikel</p>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#1E293B]/50 rounded-lg">
                    <p className="text-xs text-[#64748B]">KI-Tools im Verzeichnis</p>
                    <p className="text-2xl font-bold text-white mt-1">100+</p>
                  </div>
                  <div className="p-3 bg-[#1E293B]/50 rounded-lg">
                    <p className="text-xs text-[#64748B]">Kurse verfügbar</p>
                    <p className="text-2xl font-bold text-white mt-1">15+</p>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 rounded-lg border border-[#2563EB]/20">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#22D3EE]" />
                    <span className="text-sm text-[#22D3EE] font-medium">Tipp des Tages</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Perplexity + Claude = Perfekte Recherche-Combo für wissenschaftliche Arbeiten
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── News Section ──────────────────────────────────────────────────── */
function NewsSection() {
  const [activeFilter, setActiveFilter] = useState("Alle");

  const filtered = useMemo(() => {
    if (activeFilter === "Alle") return newsItems.slice(0, 6);
    return newsItems.filter((n) => n.category === activeFilter).slice(0, 6);
  }, [activeFilter]);

  return (
    <section id="news" className="py-24 relative">
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#2563EB]/5 rounded-full blur-[100px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E293B]/60 border border-[#22D3EE]/20 mb-4">
            <Newspaper className="w-4 h-4 text-[#22D3EE]" />
            <span className="text-xs text-[#22D3EE] font-medium">Aktuell</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Top News aus der <span className="gradient-text">KI-Welt</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Die wichtigsten Nachrichten aus der Welt der Künstlichen Intelligenz – kuratiert und zusammengefasst.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {newsCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-lg shadow-[#2563EB]/20"
                  : "bg-[#1E293B]/60 text-[#94A3B8] hover:text-white hover:bg-[#1E293B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((news, i) => (
              <motion.article
                key={news.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#0F172A] border border-[#1E293B] rounded-xl p-5 card-hover"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-md bg-[#2563EB]/15 text-[#22D3EE] text-xs font-medium">
                    {news.category}
                  </span>
                  <span className="text-xs text-[#64748B]">{news.date}</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#22D3EE] transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-[#94A3B8] mb-4 line-clamp-3">{news.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[#1E293B]">
                  <span className="text-xs text-[#64748B]">{news.source}</span>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#22D3EE] hover:text-white transition-colors"
                  >
                    Mehr lesen
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─── Courses Section ──────────────────────────────────────────────── */
function CoursesSection() {
  const [activeFilter, setActiveFilter] = useState("Alle");

  const filtered = useMemo(() => {
    if (activeFilter === "Alle") return courses;
    if (activeFilter === "Kostenlos")
      return courses.filter((c) => c.pricing === "Kostenlos");
    if (activeFilter === "Deutsch")
      return courses.filter((c) => c.language === "Deutsch");
    if (activeFilter === "Englisch")
      return courses.filter((c) => c.language === "Englisch");
    if (activeFilter === "Anfänger")
      return courses.filter((c) => c.level === "Anfänger");
    return courses.filter((c) => c.category === activeFilter);
  }, [activeFilter]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Anfänger":
        return "bg-emerald-500/15 text-emerald-400";
      case "Fortgeschritten":
        return "bg-[#2563EB]/15 text-[#22D3EE]";
      case "Experte":
        return "bg-[#7C3AED]/15 text-[#A78BFA]";
      default:
        return "bg-[#1E293B] text-[#94A3B8]";
    }
  };

  return (
    <section id="kurse" className="py-24 relative bg-[#0a0f1c]">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#7C3AED]/5 rounded-full blur-[100px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E293B]/60 border border-[#22D3EE]/20 mb-4">
            <GraduationCap className="w-4 h-4 text-[#22D3EE]" />
            <span className="text-xs text-[#22D3EE] font-medium">Lernen</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            KI lernen: <span className="gradient-text">Kurse & Workshops</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Die besten Kurse und Lernressourcen rund um Künstliche Intelligenz – von Anfänger bis Experte.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {courseCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-lg shadow-[#2563EB]/20"
                  : "bg-[#1E293B]/60 text-[#94A3B8] hover:text-white hover:bg-[#1E293B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <motion.div
                key={course.name + course.provider}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-[#0F172A] border border-[#1E293B] rounded-xl p-5 card-hover flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#22D3EE]" />
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                      course.pricing === "Kostenlos"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-[#F59E0B]/15 text-[#F59E0B]"
                    }`}
                  >
                    {course.pricing}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[#22D3EE] transition-colors">
                  {course.name}
                </h3>
                <p className="text-xs text-[#64748B] mb-3">{course.provider}</p>
                <p className="text-sm text-[#94A3B8] mb-4 flex-grow">{course.description}</p>

                <div className="flex items-center gap-4 text-xs text-[#64748B] mb-4">
                  <span className="flex items-center gap-1">
                    <Languages className="w-3.5 h-3.5" />
                    {course.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {course.category}
                  </span>
                </div>

                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#1E293B] border border-[#1E293B] text-white text-sm font-medium rounded-lg hover:border-[#22D3EE]/30 hover:bg-[#1E293B]/80 transition-all"
                >
                  Zum Kurs
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─── Tools Directory ──────────────────────────────────────────────── */
function ToolsSection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Alle");

  const filtered = useMemo(() => {
    let result = tools;
    if (activeCategory !== "Alle") {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case "Kostenlos":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
      case "Freemium":
        return "bg-[#2563EB]/15 text-[#22D3EE] border-[#2563EB]/20";
      case "Kostenpflichtig":
        return "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/20";
      default:
        return "bg-[#1E293B] text-[#94A3B8]";
    }
  };

  return (
    <section id="tools" className="py-24 relative">
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#22D3EE]/5 rounded-full blur-[100px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E293B]/60 border border-[#22D3EE]/20 mb-4">
            <Wrench className="w-4 h-4 text-[#22D3EE]" />
            <span className="text-xs text-[#22D3EE] font-medium">Verzeichnis</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            KI-Tools <span className="gradient-text">entdecken</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Das umfangreichste Verzeichnis aktueller KI-Tools – durchsuchbar, filterbar und immer aktuell.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Suche nach KI-Tools, Kategorien oder Anwendungsfällen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-[#0F172A] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#22D3EE]/50 focus:ring-1 focus:ring-[#22D3EE]/20 transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-h-48 overflow-y-auto scrollbar-thin">
          <button
            onClick={() => setActiveCategory("Alle")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeCategory === "Alle"
                ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white"
                : "bg-[#1E293B]/60 text-[#94A3B8] hover:text-white hover:bg-[#1E293B]"
            }`}
          >
            Alle
          </button>
          {toolCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white"
                  : "bg-[#1E293B]/60 text-[#94A3B8] hover:text-white hover:bg-[#1E293B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (i % 12) * 0.03 }}
                className="group bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 card-hover"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white group-hover:text-[#22D3EE] transition-colors">
                    {tool.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium border ${getPricingColor(
                      tool.pricing
                    )}`}
                  >
                    {tool.pricing}
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mb-1">{tool.category}</p>
                <p className="text-sm text-[#94A3B8] mb-3 line-clamp-2">{tool.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-[#1E293B]">
                  <span className="text-xs text-[#64748B]">{tool.audience}</span>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#22D3EE] hover:text-white transition-colors"
                  >
                    Tool öffnen
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
            <p className="text-[#94A3B8]">Keine Tools gefunden. Versuche einen anderen Suchbegriff.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Newsletter ───────────────────────────────────────────────────── */
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="newsletter" className="py-24 relative bg-[#0a0f1c]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB]/8 rounded-full blur-[150px]" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] mb-6 shadow-lg shadow-[#2563EB]/20">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Bleib auf dem <span className="gradient-text">Laufenden</span>
          </h2>
          <p className="text-[#94A3B8] mb-8 max-w-lg mx-auto">
            Erhalte die wichtigsten KI-News, neue Tools und spannende Lernangebote direkt in dein Postfach.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-500/15 border border-emerald-500/30 rounded-xl"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Danke! Du erhältst bald die ersten Updates.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Deine E-Mail-Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-[#0F172A] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#22D3EE]/50 focus:ring-1 focus:ring-[#22D3EE]/20 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#2563EB]/25 whitespace-nowrap"
              >
                Abonnieren
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── About ────────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E293B]/60 border border-[#22D3EE]/20 mb-4">
            <Sparkles className="w-4 h-4 text-[#22D3EE]" />
            <span className="text-xs text-[#22D3EE] font-medium">Mission</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
            Über <span className="gradient-text">Cent of AI</span>
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
            Cent of AI ist eine Plattform, die Menschen hilft, Künstliche Intelligenz besser zu verstehen,
            passende Tools zu finden und KI sinnvoll im Alltag, Beruf und Business einzusetzen.
            Wir kuratieren die besten Ressourcen, damit du den Überblick behältst.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Newspaper, label: "Tägliche KI-News", value: "Aktuell & kuratiert" },
              { icon: Wrench, label: "Tool-Verzeichnis", value: "100+ KI-Tools" },
              { icon: GraduationCap, label: "Lernangebote", value: "Kurse & Workshops" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-5 bg-[#0F172A] border border-[#1E293B] rounded-xl"
              >
                <stat.icon className="w-6 h-6 text-[#22D3EE] mx-auto mb-3" />
                <p className="text-white font-semibold mb-1">{stat.label}</p>
                <p className="text-sm text-[#64748B]">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────────────────────── */
function Footer() {
  const footerLinks = [
    { label: "KI-News", href: "#news" },
    { label: "KI-Tools", href: "#tools" },
    { label: "Kurse & Workshops", href: "#kurse" },
    { label: "Über uns", href: "#about" },
    { label: "Newsletter", href: "#newsletter" },
  ];

  return (
    <footer className="border-t border-[#1E293B] bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-white">
                Cent of <span className="text-[#22D3EE]">AI</span>
              </span>
            </a>
            <p className="text-sm text-[#64748B] max-w-sm">
              Die zentrale Plattform für Künstliche Intelligenz. News, Tools, Kurse und Workshops – alles an einem Ort.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Rechtliches</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors">
                  Impressum
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748B]">
            © {new Date().getFullYear()} Cent of AI. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-[#64748B]">
            Alle Links zu externen Tools und Kursen sind Affiliate-freie Empfehlungen.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main App ─────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-[#070B14]">
      <Navbar />
      <Hero />
      <NewsSection />
      <CoursesSection />
      <ToolsSection />
      <NewsletterSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
