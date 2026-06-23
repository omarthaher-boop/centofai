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
          <Link to="/" style={{ display: "inline-flex", alignItems: "center" }}>
            <svg width="180" height="32" viewBox="0 0 180 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 36 C13 36 7 30 7 22 C7 14 13 8 19 8 C19 6 21 5 22 5 C24 5 26 6 26 8 C33 8 38 14 38 22 C38 30 32 36 22 36Z"
                fill="rgba(83,74,183,0.12)" stroke="#534AB7" strokeWidth="1.5"/>
              <line x1="22" y1="6" x2="22" y2="36" stroke="#3C3489" strokeWidth="0.8" strokeDasharray="2 3"/>
              <path d="M10 17 Q15 14 17 19" fill="none" stroke="#7F77DD" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M9 27 Q15 24 17 29" fill="none" stroke="#7F77DD" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M34 17 Q29 14 27 19" fill="none" stroke="#7F77DD" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M35 27 Q29 24 27 29" fill="none" stroke="#7F77DD" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="11" cy="16" r="2.5" fill="#5DCAA5"/>
              <circle cx="33" cy="16" r="2.5" fill="#5DCAA5"/>
              <circle cx="10" cy="27" r="2" fill="#CECBF6"/>
              <circle cx="34" cy="27" r="2" fill="#CECBF6"/>
              <circle cx="18" cy="33" r="2" fill="#7F77DD"/>
              <circle cx="26" cy="33" r="2" fill="#7F77DD"/>
              <circle cx="22" cy="21" r="5" fill="#534AB7"/>
              <circle cx="22" cy="21" r="2" fill="#CECBF6"/>
              <line x1="11" y1="16" x2="22" y2="21" stroke="#5DCAA5" strokeWidth="0.9" opacity="0.7"/>
              <line x1="33" y1="16" x2="22" y2="21" stroke="#5DCAA5" strokeWidth="0.9" opacity="0.7"/>
              <line x1="10" y1="27" x2="22" y2="21" stroke="#AFA9EC" strokeWidth="0.8" opacity="0.5"/>
              <line x1="34" y1="27" x2="22" y2="21" stroke="#AFA9EC" strokeWidth="0.8" opacity="0.5"/>
              <line x1="18" y1="33" x2="22" y2="21" stroke="#534AB7" strokeWidth="0.8" opacity="0.5"/>
              <line x1="26" y1="33" x2="22" y2="21" stroke="#534AB7" strokeWidth="0.8" opacity="0.5"/>
              <text x="46" y="26" fontFamily="system-ui,sans-serif" fontSize="15" fontWeight="600">
                <tspan style={{ fill: "var(--logo-text, #EEEDFE)" }}>centof</tspan>
                <tspan fill="#5DCAA5">.ai</tspan>
              </text>
            </svg>
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
