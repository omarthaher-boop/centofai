import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Sun, Moon, Heart, LogOut, Settings, Home,
} from "lucide-react";
import { Link, useLocation } from "wouter";
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

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const scrollNavItems = [
  { name: "Home", id: "home", icon: true },
  { name: "Ideen", id: "ideen" },
  { name: "KI-Tools", id: "ki-tools" },
  { name: "Kurse", id: "kurse" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [, navigate] = useLocation();
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  const btnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#AFA9EC",
    fontSize: "14px",
    padding: "6px 12px",
    fontFamily: "inherit",
    transition: "color 0.15s",
  };

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: "rgba(7,7,26,0.85)",
        borderBottom: "0.5px solid rgba(127,119,221,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-medium tracking-wide" style={{ color: "#EEEDFE" }}>
            centof<span style={{ color: "#7F77DD" }}>.ai</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 text-sm font-medium">
            {scrollNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.id)}
                style={btnStyle}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#EEEDFE")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#AFA9EC")}
              >
                {item.icon
                  ? <span className="inline-flex items-center gap-1.5"><Home className="w-3.5 h-3.5" /><span>Home</span></span>
                  : item.name}
              </button>
            ))}
            <button
              onClick={() => navigate("/products")}
              style={btnStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#EEEDFE")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#AFA9EC")}
            >
              Produkte
            </button>
            <button
              onClick={() => navigate("/kontakt")}
              style={btnStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#EEEDFE")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#AFA9EC")}
            >
              Kontakt
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggle} className="transition" style={{ color: "#7F77DD" }} aria-label="Theme">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => scrollTo("ideen")}
            className="text-xs font-medium px-4 py-2 rounded-md transition-all"
            style={{
              border: "0.5px solid #534AB7",
              background: "rgba(83,74,183,0.15)",
              color: "#CECBF6",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(83,74,183,0.3)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(83,74,183,0.15)")}
          >
            + Idee einreichen
          </button>
          <Show when="signed-in">
            <Link
              to="/submit-tool"
              className="text-xs font-medium px-4 py-2 rounded-md transition-all"
              style={{ border: "0.5px solid rgba(127,119,221,0.3)", color: "#AFA9EC" }}
            >
              + Tool einreichen
            </Link>
            <Link
              to="/favorites"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-md transition-all"
              style={{ border: "0.5px solid rgba(127,119,221,0.3)", color: "#AFA9EC" }}
            >
              <Heart className="w-3.5 h-3.5" /> Favoriten
            </Link>
            <div className="flex items-center gap-2 pl-2" style={{ borderLeft: "0.5px solid rgba(127,119,221,0.2)" }}>
              <Link
                to="/account"
                title="Konto-Einstellungen"
                className="inline-flex items-center gap-1.5 text-xs transition"
                style={{ color: "#AFA9EC" }}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden lg:inline">
                  {user?.firstName || user?.primaryEmailAddress?.emailAddress}
                </span>
              </Link>
              <button
                onClick={() => signOut({ redirectUrl: basePath || "/" })}
                title="Abmelden"
                className="transition"
                style={{ color: "#7F77DD" }}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </Show>
          <Show when="signed-out">
            <Link
              to="/sign-in"
              className="text-xs font-medium px-4 py-2 rounded-md transition-all"
              style={{ border: "0.5px solid rgba(127,119,221,0.3)", color: "#AFA9EC" }}
            >
              Anmelden
            </Link>
            <Link
              to="/sign-up"
              className="text-xs font-semibold px-5 py-2 rounded-md transition-all"
              style={{ background: "#534AB7", color: "#EEEDFE" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#3C3489")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#534AB7")}
            >
              Registrieren
            </Link>
          </Show>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggle} className="transition" style={{ color: "#7F77DD" }} aria-label="Theme">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setOpen(!open)} className="transition" style={{ color: "#AFA9EC" }}>
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
            style={{ background: "rgba(7,7,26,0.97)", borderBottom: "0.5px solid rgba(127,119,221,0.15)" }}
            className="md:hidden"
          >
            <div className="px-6 py-4 space-y-2">
              {scrollNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => { scrollTo(item.id); setOpen(false); }}
                  className="block py-2 text-sm font-medium transition text-left w-full"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#AFA9EC", fontFamily: "inherit" }}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => { navigate("/products"); setOpen(false); }}
                className="block py-2 text-sm font-medium transition text-left w-full"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#AFA9EC", fontFamily: "inherit" }}
              >
                Produkte
              </button>
              <button
                onClick={() => { navigate("/kontakt"); setOpen(false); }}
                className="block py-2 text-sm font-medium transition text-left w-full"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#AFA9EC", fontFamily: "inherit" }}
              >
                Kontakt
              </button>
              <button
                onClick={() => { scrollTo("ideen"); setOpen(false); }}
                className="block py-2 text-sm font-semibold transition text-left w-full"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#7F77DD", fontFamily: "inherit" }}
              >
                + Idee einreichen
              </button>
              <Show when="signed-in">
                <Link to="/submit-tool" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold transition" style={{ color: "#7F77DD" }}>
                  + Tool einreichen
                </Link>
                <Link to="/favorites" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold transition" style={{ color: "#AFA9EC" }}>
                  Meine Favoriten
                </Link>
                <Link to="/account" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold transition" style={{ color: "#AFA9EC" }}>
                  Konto-Einstellungen
                </Link>
                <button onClick={() => { setOpen(false); signOut({ redirectUrl: basePath || "/" }); }} className="block py-2 text-sm font-semibold transition" style={{ color: "#AFA9EC" }}>
                  Abmelden
                </button>
              </Show>
              <Show when="signed-out">
                <Link to="/sign-in" onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold transition" style={{ color: "#AFA9EC" }}>
                  Anmelden
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-semibold rounded-md px-4 text-center mt-2"
                  style={{ background: "#534AB7", color: "#EEEDFE" }}
                >
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
