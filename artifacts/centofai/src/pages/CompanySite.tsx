import { Link, useLocation } from "wouter";
import { ArrowRight, Bot, CheckCircle2, Gauge, Globe2, Layers3, Moon, ShieldCheck, Smartphone, Sparkles, Sun, Workflow } from "lucide-react";
import { useMemo, useState } from "react";
import "./project.css";

type Lang = "de" | "en";
type PageKind = "home" | "services" | "websites" | "apps" | "tools" | "process" | "products";

const pageCopy = {
  de: {
    nav: { home: "Home", services: "Leistungen", process: "Arbeitsweise", products: "Produkte", start: "Projekt starten" },
    slogan: "Websites, Apps & KI-Tools.\nMit KI gebaut. Von Menschen perfektioniert.",
    homeLead: "Wir entwickeln professionelle digitale Produkte für Unternehmen und Personen – klar geplant, modern umgesetzt und mit menschlicher Kontrolle.",
    servicesTitle: "Digitale Lösungen, die wirklich zu deinem Projekt passen.",
    servicesLead: "Von der Website über mobile Apps bis zu KI-gestützten Tools und Automatisierungen.",
    processTitle: "Von der Idee zum funktionierenden digitalen Produkt.",
    processLead: "Strukturierte Planung, schnelle Prototypen, transparente Entwicklung und kontrollierte Qualität.",
    productsTitle: "Digitale Produkte. Entwickelt für echte Probleme.",
    productsLead: "Eigene Produkte von CentofAi – klar gedacht, zuverlässig gebaut und so gestaltet, dass sie im Alltag wirklich helfen.",
    websitesTitle: "Professionelle Websites für Unternehmen und Personen.",
    websitesLead: "Individuelles Design, responsive Entwicklung, Mehrsprachigkeit, SEO-Grundlage und erweiterbare Funktionen.",
    appsTitle: "Mobile Apps für iOS und Android.",
    appsLead: "Von der Idee bis zur Veröffentlichung – mit moderner Architektur und Fokus auf eine klare Nutzererfahrung.",
    toolsTitle: "KI-Tools & Automatisierungen für echte Arbeitsabläufe.",
    toolsLead: "Wir verbinden Daten, Trigger, Integrationen und Aktionen zu sinnvollen digitalen Prozessen.",
    more: "Mehr erfahren",
  },
  en: {
    nav: { home: "Home", services: "Services", process: "How we work", products: "Products", start: "Start a project" },
    slogan: "Websites, Apps & AI Tools.\nBuilt with AI. Perfected by people.",
    homeLead: "We build professional digital products for businesses and individuals – clearly planned, modern in execution and with human oversight.",
    servicesTitle: "Digital solutions built around your actual project.",
    servicesLead: "From websites and mobile apps to AI-powered tools and automation.",
    processTitle: "From idea to a working digital product.",
    processLead: "Structured planning, fast prototypes, transparent development and controlled quality.",
    productsTitle: "Digital products. Built for real problems.",
    productsLead: "Products by CentofAi – clearly conceived, reliably built and designed to make everyday work genuinely easier.",
    websitesTitle: "Professional websites for businesses and individuals.",
    websitesLead: "Custom design, responsive development, multilingual support, SEO foundations and extensible features.",
    appsTitle: "Mobile apps for iOS and Android.",
    appsLead: "From concept to publishing – with modern architecture and a clear user experience.",
    toolsTitle: "AI tools & automation for real workflows.",
    toolsLead: "We connect data, triggers, integrations and actions into useful digital processes.",
    more: "Learn more",
  },
} as const;

function useTheme() {
  const initial = useMemo(() => {
    const saved = localStorage.getItem("centofai-theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);
  const [theme, setTheme] = useState<"light" | "dark">(initial);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("centofai-theme", next);
  };
  return { theme, toggle };
}

function ServiceCards({ lang }: { lang: Lang }) {
  const items = lang === "de"
    ? [
        [Globe2, "Websites", "Individuelle Unternehmens- und Personenwebsites.", "/de/leistungen/websites"],
        [Smartphone, "Mobile Apps", "iOS- und Android-Apps mit moderner UX.", "/de/leistungen/mobile-apps"],
        [Bot, "KI-Tools", "Automatisierung, Assistenten und individuelle Tools.", "/de/leistungen/digitale-tools"],
      ]
    : [
        [Globe2, "Websites", "Custom websites for businesses and individuals.", "/en/services/websites"],
        [Smartphone, "Mobile Apps", "iOS and Android apps with modern UX.", "/en/services/mobile-apps"],
        [Bot, "AI Tools", "Automation, assistants and custom digital tools.", "/en/services/digital-tools"],
      ];
  return <div className="company-card-grid">{items.map(([Icon, title, text, href]) => {
    const Cmp = Icon as typeof Globe2;
    return <Link key={String(title)} href={String(href)} className="company-card"><span><Cmp size={24}/></span><h3>{String(title)}</h3><p>{String(text)}</p><ArrowRight size={18}/></Link>;
  })}</div>;
}

function ProductsPage({ lang, theme, base, startHref }: { lang: Lang; theme: "light" | "dark"; base: string; startHref: string }) {
  const de = lang === "de";
  const reasons = de
    ? [[ShieldCheck, "Verlässlich", "Stabile Funktionen, klare Datenflüsse und kontrollierte Qualität."], [Gauge, "Einfach", "Komplexe Aufgaben werden auf das Wesentliche reduziert."], [Layers3, "Erweiterbar", "Produkte werden modular gedacht und können mit ihren Anforderungen wachsen."]]
    : [[ShieldCheck, "Reliable", "Stable features, clear data flows and controlled quality."], [Gauge, "Simple", "Complex tasks are reduced to what actually matters."], [Layers3, "Extensible", "Products are designed modularly and can grow with their requirements."]];

  return <>
    <section className="products-hero" id="top">
      <div className="products-hero-art" aria-hidden="true">
        <img src={theme === "dark" ? "/products-hero-dark.svg" : "/products-hero-light.svg"} alt="" />
      </div>
      <div className="ps-shell products-hero-content">
        <div className="products-copy">
          <div className="company-eyebrow"><Sparkles size={16}/> {de ? "CENTOFAI PRODUKTE" : "CENTOFAI PRODUCTS"}</div>
          <h1>{de ? <>Digitale Produkte.<br/><span>Einfach nützlich.</span></> : <>Digital products.<br/><span>Simply useful.</span></>}</h1>
          <p>{de ? "Wir entwickeln eigene digitale Produkte für konkrete Probleme im Alltag und in Unternehmen – intuitiv, modern und mit klarem Nutzen." : "We build our own digital products for concrete everyday and business problems – intuitive, modern and focused on clear value."}</p>
          <div className="company-hero-actions">
            <a href="#produkte" className="ps-gradient-btn">{de ? "Produkte entdecken" : "Explore products"}<ArrowRight size={17}/></a>
            <Link href={startHref} className="company-secondary">{de ? "Eigenes Projekt starten" : "Start your own project"}</Link>
          </div>
          <div className="products-trust-row">
            <span><CheckCircle2 size={17}/>{de ? "Praxisnah entwickelt" : "Built for real use"}</span>
            <span><CheckCircle2 size={17}/>{de ? "Modern & intuitiv" : "Modern & intuitive"}</span>
            <span><CheckCircle2 size={17}/>{de ? "Menschlich geprüft" : "Human reviewed"}</span>
          </div>
        </div>
      </div>
    </section>

    <section className="ps-shell products-section" id="produkte">
      <div className="products-section-head">
        <div><small>{de ? "UNSERE PRODUKTE" : "OUR PRODUCTS"}</small><h2>{de ? "Werkzeuge, die Arbeit wirklich leichter machen." : "Tools that genuinely make work easier."}</h2></div>
        <p>{de ? "Jedes CentofAi-Produkt startet mit einem klaren Problem und wird so lange reduziert und verbessert, bis eine einfache, zuverlässige Lösung entsteht." : "Every CentofAi product starts with a clear problem and is refined until a simple, reliable solution remains."}</p>
      </div>

      <Link className="products-featured-card" href={`${base}/${de ? "produkte/fahrtdoc" : "products/fahrtdoc"}`}>
        <div className="products-featured-copy">
          <div className="products-badge">{de ? "VERFÜGBAR" : "AVAILABLE"}</div>
          <div className="products-app-icon"><Smartphone size={28}/></div>
          <small>CENTOF.AI PRODUCT</small>
          <h2>FahrtDoc</h2>
          <p>{de ? "Fahrten einfach erfassen, sauber dokumentieren und professionell exportieren – für privat, beruflich und Unternehmen." : "Track trips simply, document them cleanly and export them professionally – for private, business and company use."}</p>
          <div className="products-tags"><span>iOS</span><span>Android</span><span>GPS</span><span>PDF Export</span></div>
          <div className="products-card-link">{de ? "FahrtDoc ansehen" : "Explore FahrtDoc"}<ArrowRight size={18}/></div>
        </div>
        <div className="products-phone-mock" aria-hidden="true">
          <div className="phone-shell"><div className="phone-notch"/><div className="phone-screen"><div className="phone-mark">FD</div><strong>FahrtDoc</strong><div className="phone-stat"><span>Heute</span><b>42,8 km</b></div><div className="phone-route"/><div className="phone-button">Start</div></div></div>
        </div>
      </Link>

      <div className="products-coming-grid">
        <div className="products-coming-card"><div className="products-coming-icon">AI</div><small>{de ? "IN ENTWICKLUNG" : "IN DEVELOPMENT"}</small><h3>{de ? "KI-Tools für Arbeitsabläufe" : "AI tools for workflows"}</h3><p>{de ? "Spezialisierte Assistenten und Automatisierungen für wiederkehrende Aufgaben." : "Specialized assistants and automations for recurring tasks."}</p></div>
        <div className="products-coming-card"><div className="products-coming-icon">+</div><small>{de ? "NÄCHSTE PRODUKTE" : "NEXT PRODUCTS"}</small><h3>{de ? "Weitere Lösungen folgen" : "More solutions are coming"}</h3><p>{de ? "Unsere Produktfamilie wächst Schritt für Schritt – immer mit einem konkreten Nutzen." : "Our product family grows step by step – always around a concrete benefit."}</p></div>
      </div>
    </section>

    <section className="products-value-band" id="ueber-uns">
      <div className="ps-shell">
        <div className="products-section-head compact"><div><small>{de ? "UNSER ANSPRUCH" : "OUR STANDARD"}</small><h2>{de ? "Technologie soll helfen, nicht komplizierter werden." : "Technology should help, not add complexity."}</h2></div></div>
        <div className="products-reasons">{reasons.map(([Icon, title, text]) => { const C = Icon as typeof ShieldCheck; return <div className="products-reason" key={String(title)}><span><C size={23}/></span><h3>{String(title)}</h3><p>{String(text)}</p></div>; })}</div>
      </div>
    </section>

    <section className="ps-shell products-cta">
      <div><small>{de ? "EINE IDEE IM KOPF?" : "HAVE AN IDEA?"}</small><h2>{de ? "Dein digitales Produkt kann hier starten." : "Your digital product can start here."}</h2><p>{de ? "Beschreibe uns dein Projekt. Gemeinsam definieren wir den sinnvollsten Weg von der Idee bis zum funktionierenden Produkt." : "Tell us about your project. Together we define the most sensible path from idea to working product."}</p></div>
      <Link href={startHref} className="ps-gradient-btn">{de ? "Projekt starten" : "Start a project"}<ArrowRight size={17}/></Link>
    </section>
  </>;
}

export default function CompanySite({ kind }: { kind: PageKind }) {
  const [location] = useLocation();
  const lang: Lang = location.startsWith("/en") ? "en" : "de";
  const t = pageCopy[lang];
  const { theme, toggle } = useTheme();
  const base = lang === "de" ? "/de" : "/en";
  const startHref = `${base}/${lang === "de" ? "projekt-starten" : "start-a-project"}`;

  const title = kind === "home" ? t.slogan
    : kind === "services" ? t.servicesTitle
    : kind === "process" ? t.processTitle
    : kind === "products" ? t.productsTitle
    : kind === "websites" ? t.websitesTitle
    : kind === "apps" ? t.appsTitle
    : t.toolsTitle;
  const lead = kind === "home" ? t.homeLead
    : kind === "services" ? t.servicesLead
    : kind === "process" ? t.processLead
    : kind === "products" ? t.productsLead
    : kind === "websites" ? t.websitesLead
    : kind === "apps" ? t.appsLead
    : t.toolsLead;

  const isHome = kind === "home";
  const isServices = kind === "services";
  const isProducts = kind === "products";

  return <div className={`company-site ${theme} ${isProducts ? "products-page" : ""}`}>
    <header className={`company-header ${isProducts ? "company-header-zero" : ""}`}>
      <Link href={base} className="ps-logo"><span className="ps-monogram">CAi</span><strong>centof.ai</strong></Link>
      <nav>
        <Link href={base}>{t.nav.home}</Link>
        <Link href={`${base}/${lang === "de" ? "leistungen" : "services"}`}>{t.nav.services}</Link>
        <Link href={`${base}/${lang === "de" ? "arbeitsweise" : "how-we-work"}`}>{t.nav.process}</Link>
        <Link href={`${base}/${lang === "de" ? "produkte" : "products"}`}>{t.nav.products}</Link>
      </nav>
      <div className="ps-actions">
        <button className="ps-icon-btn" onClick={toggle} aria-label="Toggle theme">{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button>
        <Link className="ps-lang" href={lang === "de" ? location.replace(/^\/de/, "/en").replace("leistungen", "services").replace("arbeitsweise", "how-we-work").replace("produkte", "products") : location.replace(/^\/en/, "/de").replace("services", "leistungen").replace("how-we-work", "arbeitsweise").replace("products", "produkte")}>{lang === "de" ? "EN" : "DE"}</Link>
        <Link href={startHref} className="ps-gradient-btn">{t.nav.start}<ArrowRight size={17}/></Link>
      </div>
    </header>

    <main>
      {isProducts ? <ProductsPage lang={lang} theme={theme} base={base} startHref={startHref}/> : <>
        <section className="company-hero ps-shell">
          <div className="company-eyebrow"><Sparkles size={16}/> HUMAN CLARITY · AI POWER</div>
          <h1>{title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p>{lead}</p>
          <div className="company-hero-actions">
            <Link href={startHref} className="ps-gradient-btn">{t.nav.start}<ArrowRight size={17}/></Link>
            {!isHome && <Link href={base} className="company-secondary">{t.nav.home}</Link>}
          </div>
          <div className="company-visual" aria-hidden="true">
            {kind === "services" || kind === "tools" ? <Workflow size={92}/> : <Sparkles size={92}/>} 
            <div className="company-visual-ring one"/><div className="company-visual-ring two"/>
          </div>
        </section>

        {(isHome || isServices) && <section className="ps-shell company-section"><div className="company-section-head"><small>{lang === "de" ? "LEISTUNGEN" : "SERVICES"}</small><h2>{t.servicesTitle}</h2></div><ServiceCards lang={lang}/></section>}

        {kind === "process" && <section className="ps-shell company-section"><div className="company-process-grid">{(lang === "de" ? [["01","Verstehen","Ziele, Nutzer und Anforderungen klären."],["02","Planen","Struktur, Funktionen und Technik definieren."],["03","Bauen","Design und Entwicklung iterativ umsetzen."],["04","Perfektionieren","Testen, optimieren und gemeinsam freigeben."]] : [["01","Understand","Clarify goals, users and requirements."],["02","Plan","Define structure, features and technology."],["03","Build","Implement design and development iteratively."],["04","Perfect","Test, optimize and approve together."]]).map(([n,a,b]) => <div className="company-process" key={n}><strong>{n}</strong><h3>{a}</h3><p>{b}</p></div>)}</div></section>}

        {["websites","apps","tools"].includes(kind) && <section className="ps-shell company-section"><div className="company-feature-list">{(kind === "websites" ? ["Responsive Design","DE / EN","SEO & Performance","Individuelle Funktionen"] : kind === "apps" ? ["iOS & Android","Push & Login","APIs & Backend","App Store Publishing"] : ["Automatisierungen","KI-Assistenten","Daten & APIs","Workflows & Integrationen"]).map(x => <div key={x}><CheckMark/>{x}</div>)}</div><Link href={startHref} className="ps-gradient-btn">{t.nav.start}<ArrowRight size={17}/></Link></section>}
      </>}
    </main>

    <footer className="ps-footer ps-shell"><div className="ps-logo"><span className="ps-monogram">CAi</span><strong>centof.ai</strong></div><p>{t.slogan.replace("\n", " ")}</p><span>© 2026 CentofAi</span></footer>
  </div>;
}

function CheckMark() { return <span className="company-check">✓</span>; }
