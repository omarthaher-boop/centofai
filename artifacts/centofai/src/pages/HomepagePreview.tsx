import { Link, useLocation } from "wouter";
import { ArrowRight, Check, Command, Moon, Smartphone, Sparkles, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import "./homepage-preview.css";

type Lang = "de" | "en";

type Copy = {
  nav: { home: string; services: string; products: string; process: string; about: string; contact: string; start: string };
  eyebrow: string; headline: string; subheadline: string; lead: string; discover: string; badges: string[];
  services: { eyebrow: string; title: string; lead: string; cards: { title: string; body: string; cta: string; href: string; icon: "tools" | "web" | "app" }[] };
  why: { eyebrow: string; title: string; lead: string; cards: { n: string; title: string; body: string }[] };
  products: { eyebrow: string; title: string; lead: string; bullets: string[]; cta: string; orbit: { n: string; title: string; body: string }[] };
  progress: { eyebrow: string; title: string; lead: string; cards: { n: string; title: string; body: string }[] };
  cta: { eyebrow: string; title: string; lead: string };
  footerText: string;
};

const copy: Record<Lang, Copy> = {
  de: {
    nav: { home: "Home", services: "Leistungen", products: "Produkte", process: "Arbeitsweise", about: "Über uns", contact: "Kontakt", start: "Projekt starten" },
    eyebrow: "KI-GESTÜTZTE DIGITALE PRODUKTENTWICKLUNG",
    headline: "Websites, Apps & KI-Tools.",
    subheadline: "Mit KI gebaut. Von Menschen perfektioniert.",
    lead: "Centof.ai verbindet die Geschwindigkeit moderner KI mit menschlicher Kreativität, Erfahrung und konsequenter Qualitätskontrolle – für digitale Lösungen, die professionell funktionieren.",
    discover: "Leistungen entdecken",
    badges: ["KI-beschleunigt", "Menschlich geführt", "Für Web & Mobile"],
    services: {
      eyebrow: "UNSERE LEISTUNGEN",
      title: "Was wir für Sie entwickeln",
      lead: "Wir übersetzen Probleme und Ideen in klare, nutzerfreundliche digitale Produkte – individuell geplant und professionell umgesetzt.",
      cards: [
        { title: "Digitale Tools", body: "Individuelle Web-Tools, Automatisierungen und KI-gestützte Lösungen für konkrete Aufgaben und Arbeitsabläufe.", cta: "Digitale Tools ansehen", href: "/de/leistungen/digitale-tools", icon: "tools" },
        { title: "Professionelle Websites", body: "Moderne, schnelle und responsive Websites mit klarer Nutzerführung, starker Marke und durchdachter Funktion.", cta: "Websites ansehen", href: "/de/leistungen/websites", icon: "web" },
        { title: "Mobile Apps", body: "Intuitive mobile Anwendungen für iOS und Android – von der ersten Idee bis zum einsatzfähigen Produkt.", cta: "Mobile Apps ansehen", href: "/de/leistungen/mobile-apps", icon: "app" },
      ],
    },
    why: {
      eyebrow: "WARUM CENTOF.AI",
      title: "KI liefert Geschwindigkeit. Menschen schaffen Qualität.",
      lead: "Wir setzen KI gezielt dort ein, wo sie Analyse, Gestaltung und Entwicklung beschleunigt. Entscheidungen, Qualität und Verantwortung bleiben dabei immer menschlich geführt.",
      cards: [
        { n: "01", title: "Klare Strategie", body: "Wir beginnen mit dem Problem, der Zielgruppe und einem realistischen Produktziel." },
        { n: "02", title: "Intelligente Umsetzung", body: "Moderne KI unterstützt Recherche, Konzeption, Entwicklung und Optimierung." },
        { n: "03", title: "Menschliche Kontrolle", body: "Jeder wichtige Schritt wird geprüft, verfeinert und nachvollziehbar entschieden." },
        { n: "04", title: "Nachhaltige Produkte", body: "Wir bauen Lösungen, die verständlich, erweiterbar und langfristig nutzbar sind." },
      ],
    },
    products: {
      eyebrow: "UNSERE PRODUKTE",
      title: "Digitale Produkte für konkrete Aufgaben.",
      lead: "Centof.ai entwickelt eigene Apps, Tools und Plattformen, die alltägliche und berufliche Abläufe einfacher, klarer und effizienter machen.",
      bullets: ["Praxisnah und nutzerfreundlich", "Mit KI entwickelt und menschlich geprüft", "Schrittweise erweiterbar"],
      cta: "Unsere Produkte entdecken",
      orbit: [
        { n: "01", title: "Apps", body: "Mobile Lösungen" },
        { n: "02", title: "Tools", body: "Intelligente Helfer" },
        { n: "03", title: "Plattformen", body: "Digitale Systeme" },
      ],
    },
    progress: {
      eyebrow: "SO ENTSTEHT FORTSCHRITT",
      title: "Von Ihrer Idee zu einer funktionierenden digitalen Lösung.",
      lead: "Auf der Startseite zeigen wir den Weg bewusst kompakt. Die vollständigen Arbeitsmodule erhalten später ihre eigene Unterseite.",
      cards: [
        { n: "01", title: "Ihr Problem", body: "Wir verstehen Ziel, Nutzer und die Aufgabe, die wirklich gelöst werden soll." },
        { n: "02", title: "Unsere Lösung", body: "Wir verbinden Produktstrategie, Design, KI und professionelle Entwicklung." },
        { n: "03", title: "Ihr Fortschritt", body: "Sie erhalten eine getestete Lösung, die genutzt und weiterentwickelt werden kann." },
      ],
    },
    cta: { eyebrow: "LASSEN SIE UNS BEGINNEN", title: "Aus Ihrer Idee kann das nächste hilfreiche digitale Produkt entstehen.", lead: "Beschreiben Sie uns kurz Ihr Vorhaben. Wir melden uns mit einer klaren ersten Einschätzung." },
    footerText: "Websites, Apps & KI-Tools. Mit KI gebaut. Von Menschen perfektioniert.",
  },
  en: {
    nav: { home: "Home", services: "Services", products: "Products", process: "How we work", about: "About us", contact: "Contact", start: "Start a project" },
    eyebrow: "AI-POWERED DIGITAL PRODUCT DEVELOPMENT",
    headline: "Websites, Apps & AI Tools.",
    subheadline: "Built with AI. Perfected by people.",
    lead: "Centof.ai combines the speed of modern AI with human creativity, experience and rigorous quality control – for digital solutions that work professionally.",
    discover: "Explore services",
    badges: ["AI accelerated", "Human guided", "For Web & Mobile"],
    services: {
      eyebrow: "OUR SERVICES",
      title: "What we build for you",
      lead: "We translate problems and ideas into clear, user-friendly digital products – individually planned and professionally delivered.",
      cards: [
        { title: "Digital Tools", body: "Custom web tools, automations and AI-powered solutions for concrete tasks and workflows.", cta: "Explore digital tools", href: "/en/services/digital-tools", icon: "tools" },
        { title: "Professional Websites", body: "Modern, fast and responsive websites with clear UX, strong branding and thoughtful functionality.", cta: "Explore websites", href: "/en/services/websites", icon: "web" },
        { title: "Mobile Apps", body: "Intuitive mobile applications for iOS and Android – from the first idea to a production-ready product.", cta: "Explore mobile apps", href: "/en/services/mobile-apps", icon: "app" },
      ],
    },
    why: {
      eyebrow: "WHY CENTOF.AI",
      title: "AI delivers speed. People create quality.",
      lead: "We use AI where it accelerates analysis, design and development. Decisions, quality and responsibility always remain human-led.",
      cards: [
        { n: "01", title: "Clear strategy", body: "We begin with the problem, the target audience and a realistic product goal." },
        { n: "02", title: "Intelligent execution", body: "Modern AI supports research, concept development, implementation and optimization." },
        { n: "03", title: "Human control", body: "Every important step is reviewed, refined and decided transparently." },
        { n: "04", title: "Sustainable products", body: "We build solutions that stay understandable, extensible and useful long-term." },
      ],
    },
    products: {
      eyebrow: "OUR PRODUCTS",
      title: "Digital products for concrete tasks.",
      lead: "Centof.ai develops its own apps, tools and platforms that make everyday and professional workflows simpler, clearer and more efficient.",
      bullets: ["Practical and user-friendly", "Built with AI and human reviewed", "Designed to expand step by step"],
      cta: "Explore our products",
      orbit: [
        { n: "01", title: "Apps", body: "Mobile solutions" },
        { n: "02", title: "Tools", body: "Intelligent helpers" },
        { n: "03", title: "Platforms", body: "Digital systems" },
      ],
    },
    progress: {
      eyebrow: "HOW PROGRESS HAPPENS",
      title: "From your idea to a working digital solution.",
      lead: "On the homepage we keep the journey intentionally compact. The full work modules will have their own dedicated page.",
      cards: [
        { n: "01", title: "Your problem", body: "We understand the goal, the users and the task that actually needs to be solved." },
        { n: "02", title: "Our solution", body: "We combine product strategy, design, AI and professional development." },
        { n: "03", title: "Your progress", body: "You receive a tested solution that can be used and continuously improved." },
      ],
    },
    cta: { eyebrow: "LET'S GET STARTED", title: "Your idea can become the next genuinely useful digital product.", lead: "Tell us briefly what you have in mind. We’ll respond with a clear initial assessment." },
    footerText: "Websites, Apps & AI Tools. Built with AI. Perfected by people.",
  },
};

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

function Brand() {
  return (
    <span className="hp-brand" aria-label="CentofAi">
      <span className="hp-brand-symbol"><i></i><b>Ai</b></span>
      <span className="hp-brand-word">Centof<span>Ai</span></span>
    </span>
  );
}

function ServiceIcon({ kind }: { kind: "tools" | "web" | "app" }) {
  if (kind === "tools") return <Sparkles size={28} />;
  if (kind === "web") return <Command size={28} />;
  return <Smartphone size={28} />;
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
          <a href="#why">{t.nav.about}</a>
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
            <div className="hp-trust-row">{t.badges.map((badge) => <span key={badge}><Check size={13}/>{badge}</span>)}</div>
          </div>
          <div className="hp-hero-visual"><img src="/centofai-hero.png" alt="CentofAi – Human Clarity · AI Power" /></div>
        </section>

        <section className="shot-services hp-shot-section" id="services">
          <div className="shot-heading centered">
            <div className="shot-kicker">{t.services.eyebrow}</div>
            <h2>{t.services.title}</h2>
            <p>{t.services.lead}</p>
          </div>
          <div className="shot-service-grid">
            {t.services.cards.map((card, index) => (
              <Link href={card.href} className="shot-service-card" key={card.title}>
                <div className={`shot-service-icon icon-${card.icon}`}><ServiceIcon kind={card.icon}/></div>
                <div className="shot-service-number">0{index + 1}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <div className="shot-card-link"><span>{card.cta}</span><i><ArrowRight size={16}/></i></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="shot-why-wrap hp-shot-section" id="why">
          <div className="shot-why-copy">
            <div className="shot-kicker">{t.why.eyebrow}</div>
            <h2>{t.why.title}</h2>
            <p>{t.why.lead}</p>
          </div>
          <div className="shot-why-grid">
            {t.why.cards.map((card) => <article key={card.n}><span>{card.n}</span><h3>{card.title}</h3><p>{card.body}</p></article>)}
          </div>
        </section>

        <section className="shot-products hp-shot-section">
          <div className="shot-products-copy">
            <div className="shot-kicker">{t.products.eyebrow}</div>
            <h2>{t.products.title}</h2>
            <p>{t.products.lead}</p>
            <ul>{t.products.bullets.map((item) => <li key={item}><Check size={15}/>{item}</li>)}</ul>
            <Link href={routes.products} className="shot-products-cta">{t.products.cta}<ArrowRight size={17}/></Link>
          </div>
          <div className="shot-products-visual">
            <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
            <div className="product-core"><span className="core-mark">CA<span>i</span></span><strong>CentofAi</strong><small>PRODUKTWELT</small></div>
            {t.products.orbit.map((card, i) => <div key={card.n} className={`orbit-card orbit-card-${i + 1}`}><span>{card.n}</span><h3>{card.title}</h3><p>{card.body}</p></div>)}
          </div>
        </section>

        <section className="shot-progress hp-shot-section">
          <div className="shot-heading centered progress-heading">
            <div className="shot-kicker">{t.progress.eyebrow}</div>
            <h2>{t.progress.title}</h2>
            <p>{t.progress.lead}</p>
          </div>
          <div className="shot-progress-grid">
            {t.progress.cards.map((card, i) => <div className="progress-wrap" key={card.n}><article><span>{card.n}</span><h3>{card.title}</h3><p>{card.body}</p></article>{i < t.progress.cards.length - 1 && <i className="progress-arrow"><ArrowRight size={20}/></i>}</div>)}
          </div>
        </section>

        <section className="shot-cta hp-shot-section" id="contact">
          <div><div className="shot-kicker light">{t.cta.eyebrow}</div><h2>{t.cta.title}</h2><p>{t.cta.lead}</p></div>
          <Link href={routes.start} className="shot-cta-button">{t.nav.start}<ArrowRight size={17}/></Link>
        </section>
      </main>

      <footer className="hp-footer">
        <div className="hp-footer-brand"><Brand/><p>{t.footerText}</p></div>
        <div><h4>{t.nav.services}</h4><Link href={lang === "de" ? "/de/leistungen/websites" : "/en/services/websites"}>Websites</Link><Link href={lang === "de" ? "/de/leistungen/mobile-apps" : "/en/services/mobile-apps"}>Mobile Apps</Link><Link href={lang === "de" ? "/de/leistungen/digitale-tools" : "/en/services/digital-tools"}>{lang === "de" ? "KI-Tools" : "AI Tools"}</Link></div>
        <div><h4>{t.nav.products}</h4><Link href={routes.products}>{lang === "de" ? "Alle Produkte" : "All products"}</Link><Link href={lang === "de" ? "/de/produkte/fahrtdoc" : "/en/products/fahrtdoc"}>FahrtDoc</Link></div>
        <div><h4>{t.nav.process}</h4><Link href={routes.process}>{lang === "de" ? "Unser Prozess" : "Our process"}</Link><Link href={routes.start}>{t.nav.start}</Link></div>
        <div><h4>{lang === "de" ? "Rechtliches" : "Legal"}</h4><Link href="/datenschutz">{lang === "de" ? "Datenschutz" : "Privacy"}</Link><Link href="/impressum">{lang === "de" ? "Impressum" : "Legal notice"}</Link></div>
      </footer>
    </div>
  );
}
