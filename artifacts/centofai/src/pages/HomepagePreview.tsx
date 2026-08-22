import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Bot,
  Check,
  Code2,
  Gauge,
  Globe2,
  Moon,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Users,
  WandSparkles,
  Workflow,
} from "lucide-react";
import { useMemo, useState } from "react";
import "./homepage-preview.css";

type Lang = "de" | "en";

const copy = {
  de: {
    nav: {
      home: "Home",
      services: "Leistungen",
      products: "Produkte",
      process: "Arbeitsweise",
      about: "Über uns",
      contact: "Kontakt",
      start: "Projekt starten",
    },
    eyebrow: "KI-GESTÜTZTE DIGITALE PRODUKTENTWICKLUNG",
    headline: "Websites, Apps & KI-Tools.",
    subheadline: "Mit KI gebaut. Von Menschen perfektioniert.",
    lead:
      "Centof.ai verbindet die Geschwindigkeit moderner KI mit menschlicher Kreativität, Erfahrung und konsequenter Qualitätskontrolle – für digitale Lösungen, die professionell funktionieren.",
    discover: "Leistungen entdecken",
    badges: ["KI-beschleunigt", "Menschlich geführt", "Für Web & Mobile"],
    servicesEyebrow: "WAS WIR ENTWICKELN",
    servicesTitle: "Digitale Lösungen, passend zu deinem tatsächlichen Bedarf.",
    servicesLead:
      "Wir entwickeln nicht nach Schema F. Struktur, Design und Technik werden auf Ziel, Nutzer und Geschäftsmodell abgestimmt.",
    whyEyebrow: "WARUM CENTOFAI",
    whyTitle: "KI beschleunigt. Menschen entscheiden.",
    processEyebrow: "UNSERE ARBEITSWEISE",
    processTitle: "Von der Idee zum funktionierenden digitalen Produkt.",
    processLead:
      "Jeder Schritt bleibt nachvollziehbar: erst verstehen, dann gestalten, entwickeln, prüfen und veröffentlichen.",
    productsEyebrow: "UNSERE PRODUKTE",
    productsTitle: "Eigene digitale Produkte von CentofAi.",
    fahrtdocLead:
      "FahrtDoc dokumentiert Fahrten klar und zuverlässig – für privat, beruflich und Unternehmen, mit GPS, Übersicht und professionellem Export.",
    ctaTitle: "Eine Idee im Kopf?",
    ctaLead: "Lass uns daraus ein funktionierendes digitales Produkt machen.",
    footerText:
      "Websites, Apps & KI-Tools. Mit KI gebaut. Von Menschen perfektioniert.",
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      products: "Products",
      process: "How we work",
      about: "About us",
      contact: "Contact",
      start: "Start a project",
    },
    eyebrow: "AI-POWERED DIGITAL PRODUCT DEVELOPMENT",
    headline: "Websites, Apps & AI Tools.",
    subheadline: "Built with AI. Perfected by people.",
    lead:
      "Centof.ai combines the speed of modern AI with human creativity, experience and rigorous quality control – for digital solutions that work professionally.",
    discover: "Explore services",
    badges: ["AI accelerated", "Human guided", "For Web & Mobile"],
    servicesEyebrow: "WHAT WE BUILD",
    servicesTitle: "Digital solutions shaped around the actual need.",
    servicesLead:
      "We do not build from a generic template. Structure, design and technology are aligned with goals, users and business model.",
    whyEyebrow: "WHY CENTOFAI",
    whyTitle: "AI accelerates. People decide.",
    processEyebrow: "HOW WE WORK",
    processTitle: "From idea to a working digital product.",
    processLead:
      "Every step remains transparent: understand first, then design, build, test and launch.",
    productsEyebrow: "OUR PRODUCTS",
    productsTitle: "Digital products by CentofAi.",
    fahrtdocLead:
      "FahrtDoc documents trips clearly and reliably – for private, professional and company use, with GPS, overview and professional export.",
    ctaTitle: "Have an idea?",
    ctaLead: "Let’s turn it into a digital product that actually works.",
    footerText: "Websites, Apps & AI Tools. Built with AI. Perfected by people.",
  },
} as const;

function useTheme() {
  const initial = useMemo(() => {
    const saved = localStorage.getItem("centofai-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);
  const [theme, setTheme] = useState<"light" | "dark">(initial);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    localStorage.setItem("centofai-theme", next);
    setTheme(next);
  };
  return { theme, toggle };
}

const serviceCards = {
  de: [
    [Globe2, "Websites", "Professionelle Websites für Unternehmen, Personen und digitale Produkte.", "/de/leistungen/websites"],
    [Smartphone, "Mobile Apps", "iOS- und Android-Apps mit klarer Nutzerführung und stabiler technischer Basis.", "/de/leistungen/mobile-apps"],
    [Bot, "KI-Tools & Automatisierung", "Assistenten, Automatisierungen und individuelle Tools für reale Arbeitsabläufe.", "/de/leistungen/digitale-tools"],
  ],
  en: [
    [Globe2, "Websites", "Professional websites for businesses, people and digital products.", "/en/services/websites"],
    [Smartphone, "Mobile Apps", "iOS and Android apps with clear UX and a stable technical foundation.", "/en/services/mobile-apps"],
    [Bot, "AI Tools & Automation", "Assistants, automations and custom tools for real workflows.", "/en/services/digital-tools"],
  ],
} as const;

const whyItems = {
  de: [
    [Sparkles, "Klare Strategie", "Ziele, Nutzer und Anforderungen werden vor der Umsetzung sauber definiert."],
    [WandSparkles, "Professionelles Design", "Modernes Design mit klarer Informationsarchitektur und starker Nutzerführung."],
    [Code2, "KI-gestützte Entwicklung", "KI beschleunigt Entwicklung und Iteration, ohne die Qualitätskontrolle zu ersetzen."],
    [Users, "Menschliche Qualitätskontrolle", "Entscheidungen, Prüfung und Freigabe bleiben bewusst in menschlicher Hand."],
  ],
  en: [
    [Sparkles, "Clear strategy", "Goals, users and requirements are defined clearly before implementation."],
    [WandSparkles, "Professional design", "Modern design with clear information architecture and strong user guidance."],
    [Code2, "AI-assisted development", "AI accelerates development and iteration without replacing quality control."],
    [Users, "Human quality control", "Decisions, review and approval remain deliberately human."],
  ],
} as const;

const processItems = {
  de: [
    ["01", Sparkles, "Idee & Analyse", "Problem, Zielgruppe und gewünschtes Ergebnis verstehen."],
    ["02", Workflow, "Konzept", "Seiten, Funktionen und technische Struktur festlegen."],
    ["03", WandSparkles, "Design", "Visuelle Sprache und Nutzerführung ausarbeiten."],
    ["04", Code2, "Entwicklung", "Frontend, Backend und Integrationen kontrolliert umsetzen."],
    ["05", ShieldCheck, "Prüfung", "Funktion, Sicherheit, Responsivität und Qualität testen."],
    ["06", Rocket, "Launch", "Veröffentlichen, überwachen und gezielt weiterentwickeln."],
  ],
  en: [
    ["01", Sparkles, "Idea & analysis", "Understand the problem, audience and desired outcome."],
    ["02", Workflow, "Concept", "Define pages, features and technical structure."],
    ["03", WandSparkles, "Design", "Develop visual language and user guidance."],
    ["04", Code2, "Development", "Build frontend, backend and integrations in a controlled way."],
    ["05", ShieldCheck, "Review", "Test functionality, security, responsiveness and quality."],
    ["06", Rocket, "Launch", "Publish, monitor and continue improving deliberately."],
  ],
} as const;

function Brand() {
  return (
    <span className="hp-brand" aria-label="CentofAi">
      <span className="hp-brand-symbol"><i></i><b>Ai</b></span>
      <span className="hp-brand-word">Centof<span>Ai</span></span>
    </span>
  );
}

export default function HomepagePreview() {
  const [location] = useLocation();
  const lang: Lang = location.startsWith("/en") ? "en" : "de";
  const t = copy[lang];
  const { theme, toggle } = useTheme();
  const base = lang === "de" ? "/de" : "/en";
  const routes = {
    services: lang === "de" ? "/de/leistungen" : "/en/services",
    products: lang === "de" ? "/de/produkte" : "/en/products",
    process: lang === "de" ? "/de/arbeitsweise" : "/en/how-we-work",
    start: lang === "de" ? "/de/projekt-starten" : "/en/start-a-project",
  };
  const langHref = lang === "de" ? "/en" : "/de";

  return (
    <div className={`hp-page ${theme}`}>
      <header className="hp-header">
        <Link href={base} className="hp-logo"><Brand /></Link>
        <nav className="hp-nav" aria-label="Primary">
          <Link href={base} className="active">{t.nav.home}</Link>
          <Link href={routes.services}>{t.nav.services}</Link>
          <Link href={routes.products}>{t.nav.products}</Link>
          <Link href={routes.process}>{t.nav.process}</Link>
          <a href="#about">{t.nav.about}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <div className="hp-actions">
          <div className="hp-lang"><span className={lang === "de" ? "active" : ""}>DE</span><span>/</span><Link href={langHref} className={lang === "en" ? "active" : ""}>EN</Link></div>
          <button className="hp-theme" onClick={toggle} aria-label="Theme wechseln">{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <Link href={routes.start} className="hp-start">{t.nav.start}</Link>
        </div>
      </header>

      <main>
        <section className="hp-hero">
          <div className="hp-hero-copy">
            <div className="hp-eyebrow"><span></span>{t.eyebrow}</div>
            <h1>{t.headline}</h1>
            <h2>{t.subheadline}</h2>
            <p>{t.lead}</p>
            <div className="hp-hero-buttons">
              <Link href={routes.start} className="hp-primary">{t.nav.start}<ArrowRight size={17}/></Link>
              <Link href={routes.services} className="hp-secondary">{t.discover}<ArrowRight size={17}/></Link>
            </div>
            <div className="hp-trust-row">
              {t.badges.map((badge) => <span key={badge}><Check size={13}/>{badge}</span>)}
            </div>
          </div>
          <div className="hp-hero-visual">
            <img src="/centofai-hero.png" alt="CentofAi – Human Clarity · AI Power" />
          </div>
        </section>

        <section className="hp-section hp-services" id="services">
          <div className="hp-section-heading">
            <div className="hp-kicker">{t.servicesEyebrow}</div>
            <h2>{t.servicesTitle}</h2>
            <p>{t.servicesLead}</p>
          </div>
          <div className="hp-service-grid">
            {serviceCards[lang].map(([Icon, title, text, href]) => {
              const C = Icon;
              return <Link href={href} className="hp-service-card" key={title}><span className="hp-icon"><C size={25}/></span><h3>{title}</h3><p>{text}</p><span className="hp-more">{lang === "de" ? "Mehr erfahren" : "Learn more"}<ArrowRight size={15}/></span></Link>;
            })}
          </div>
        </section>

        <section className="hp-section hp-why" id="about">
          <div className="hp-section-heading centered compact">
            <div className="hp-kicker">{t.whyEyebrow}</div>
            <h2>{t.whyTitle}</h2>
          </div>
          <div className="hp-why-grid">
            {whyItems[lang].map(([Icon, title, text]) => {
              const C = Icon;
              return <article key={title}><span className="hp-icon plain"><C size={27}/></span><h3>{title}</h3><p>{text}</p></article>;
            })}
          </div>
        </section>

        <section className="hp-section hp-process">
          <div className="hp-section-heading centered">
            <div className="hp-kicker">{t.processEyebrow}</div>
            <h2>{t.processTitle}</h2>
            <p>{t.processLead}</p>
          </div>
          <div className="hp-process-line">
            {processItems[lang].map(([number, Icon, title, text]) => {
              const C = Icon;
              return <article key={number}><span className="hp-step-icon"><C size={21}/></span><strong>{number}</strong><h3>{title}</h3><p>{text}</p></article>;
            })}
          </div>
          <div className="hp-center-action"><Link href={routes.process} className="hp-secondary">{lang === "de" ? "Arbeitsweise ansehen" : "See how we work"}<ArrowRight size={16}/></Link></div>
        </section>

        <section className="hp-section hp-products">
          <div className="hp-section-heading centered compact">
            <div className="hp-kicker">{t.productsEyebrow}</div>
            <h2>{t.productsTitle}</h2>
          </div>
          <Link href={lang === "de" ? "/de/produkte/fahrtdoc" : "/en/products/fahrtdoc"} className="hp-product-card">
            <div className="hp-product-shot"><img src="/fahrtdoc-screen-1.png" alt="FahrtDoc" /></div>
            <div className="hp-product-copy"><small>CENTOF.AI PRODUCT</small><div className="hp-fd-mark">F</div><h3>FahrtDoc</h3><p>{t.fahrtdocLead}</p><div className="hp-product-tags"><span>iOS</span><span>Android</span><span>GPS</span><span>PDF</span></div><span className="hp-more">{lang === "de" ? "FahrtDoc entdecken" : "Explore FahrtDoc"}<ArrowRight size={16}/></span></div>
            <div className="hp-product-metric"><Gauge size={32}/><strong>{lang === "de" ? "Einfach fahren." : "Just drive."}</strong><span>{lang === "de" ? "Clever erfassen." : "Track smart."}</span></div>
          </Link>
        </section>

        <section className="hp-cta" id="contact">
          <div><span className="hp-cta-icon"><Rocket size={26}/></span><div><h2>{t.ctaTitle}</h2><p>{t.ctaLead}</p></div></div>
          <Link href={routes.start} className="hp-cta-button">{t.nav.start}<ArrowRight size={17}/></Link>
        </section>
      </main>

      <footer className="hp-footer">
        <div className="hp-footer-brand"><Brand/><p>{t.footerText}</p></div>
        <div><h4>{t.nav.services}</h4><Link href={lang === "de" ? "/de/leistungen/websites" : "/en/services/websites"}>Websites</Link><Link href={lang === "de" ? "/de/leistungen/mobile-apps" : "/en/services/mobile-apps"}>Mobile Apps</Link><Link href={lang === "de" ? "/de/leistungen/digitale-tools" : "/en/services/digital-tools"}>{lang === "de" ? "KI-Tools" : "AI Tools"}</Link></div>
        <div><h4>{t.nav.products}</h4><Link href={lang === "de" ? "/de/produkte/fahrtdoc" : "/en/products/fahrtdoc"}>FahrtDoc</Link><Link href={routes.products}>{lang === "de" ? "Alle Produkte" : "All products"}</Link></div>
        <div><h4>{t.nav.process}</h4><Link href={routes.process}>{lang === "de" ? "Unser Prozess" : "Our process"}</Link><Link href={routes.start}>{t.nav.start}</Link></div>
        <div><h4>{lang === "de" ? "Rechtliches" : "Legal"}</h4><Link href="/datenschutz">{lang === "de" ? "Datenschutz" : "Privacy"}</Link><Link href="/impressum">{lang === "de" ? "Impressum" : "Legal notice"}</Link></div>
      </footer>
    </div>
  );
}
