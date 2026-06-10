import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Sun, Moon, Heart, LogOut, Settings, Home,
} from "lucide-react";
import { Link } from "wouter";
import { Show, useClerk, useUser } from "@clerk/react";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("centofai-theme") : null;
    return (saved as "dark" | "light" | null) ?? "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("centofai-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Ideen", href: "/#ideas" },
  { name: "KI-Tools", href: "/#tools" },
  { name: "Kurse", href: "/#academy" },
  { name: "Produkte", href: "/products" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { user } = useUser();
  const { signOut } = useClerk();
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <nav className="border-b border-slate-900 bg-[var(--nav-bg)] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-black tracking-wider gradient-text">
            Centof.<span className="text-white">Ai</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-caption)]">
            {navLinks.map((link) =>
              link.name === "Home" ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="inline-flex items-center gap-1.5 hover:text-purple-400 transition"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              ) : link.href.startsWith("/") ? (
                <Link key={link.name} to={link.href} className="hover:text-purple-400 transition">
                  {link.name}
                </Link>
              ) : (
                <a key={link.name} href={link.href} className="hover:text-purple-400 transition">
                  {link.name}
                </a>
              )
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggle} className="text-[var(--text-label)] hover:text-white transition" aria-label="Theme">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <a
            href="/#ideas"
            className="text-xs font-semibold text-[var(--text-label)] hover:text-white border border-[var(--border-color)] hover:border-slate-600 px-4 py-2 rounded-xl transition"
          >
            + Idee einreichen
          </a>
          <Show when="signed-in">
            <Link
              to="/submit-tool"
              className="text-xs font-semibold text-[var(--text-label)] hover:text-white border border-[var(--border-color)] hover:border-slate-600 px-4 py-2 rounded-xl transition"
            >
              + Tool einreichen
            </Link>
            <Link
              to="/favorites"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-label)] hover:text-white border border-[var(--border-color)] hover:border-slate-600 px-4 py-2 rounded-xl transition"
            >
              <Heart className="w-3.5 h-3.5" /> Favoriten
            </Link>
            <div className="flex items-center gap-2 pl-2 border-l border-[var(--border-color)]">
              <Link
                to="/account"
                title="Konto-Einstellungen"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--text-caption)] hover:text-white transition"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden lg:inline">
                  {user?.firstName || user?.primaryEmailAddress?.emailAddress}
                </span>
              </Link>
              <button
                onClick={() => signOut({ redirectUrl: basePath || "/" })}
                title="Abmelden"
                className="text-[var(--text-label)] hover:text-white transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </Show>
          <Show when="signed-out">
            <Link
              to="/sign-in"
              className="text-xs font-semibold text-[var(--text-label)] hover:text-white border border-[var(--border-color)] hover:border-slate-600 px-4 py-2 rounded-xl transition"
            >
              Anmelden
            </Link>
            <Link
              to="/sign-up"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition shadow-[0_0_25px_rgba(147,51,234,0.25)]"
            >
              Registrieren
            </Link>
          </Show>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggle} className="text-[var(--text-label)] hover:text-white transition" aria-label="Theme">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setOpen(!open)} className="text-[var(--text-label)] hover:text-white transition">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[var(--mobile-menu-bg)] border-b border-[var(--border-color)]"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm font-medium text-[var(--text-caption)] hover:text-purple-400 transition"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm font-medium text-[var(--text-caption)] hover:text-purple-400 transition"
                  >
                    {link.name}
                  </a>
                )
              )}
              <a href="/#ideas" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition">
                + Idee einreichen
              </a>
              <Show when="signed-in">
                <Link to="/submit-tool" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition">
                  + Tool einreichen
                </Link>
                <Link to="/favorites" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-[var(--text-caption)] hover:text-white transition">
                  Meine Favoriten
                </Link>
                <Link to="/account" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-[var(--text-caption)] hover:text-white transition">
                  Konto-Einstellungen
                </Link>
                <button onClick={() => { setOpen(false); signOut({ redirectUrl: basePath || "/" }); }} className="block py-2 text-sm font-semibold text-[var(--text-caption)] hover:text-white transition">
                  Abmelden
                </button>
              </Show>
              <Show when="signed-out">
                <Link to="/sign-in" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-[var(--text-caption)] hover:text-white transition">
                  Anmelden
                </Link>
                <Link to="/sign-up" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold bg-purple-600 text-white rounded-xl px-4 text-center mt-2">
                  Registrieren
                </Link>
              </Show>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
