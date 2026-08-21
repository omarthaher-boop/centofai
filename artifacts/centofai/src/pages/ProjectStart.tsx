import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  FileUp,
  Globe2,
  Moon,
  Puzzle,
  Send,
  Smartphone,
  Sparkles,
  Sun,
} from "lucide-react";

type Lang = "de" | "en";
type ProjectType = "website" | "app" | "ai";

const copy = {
  de: {
    home: "Home",
    services: "Leistungen",
    products: "Produkte",
    process: "Arbeitsweise",
    start: "Projekt starten",
    eyebrow: "Projekt starten",
    titleA: "Lass uns etwas",
    titleB: "Außergewöhnliches bauen.",
    intro: "Erzähl uns von deiner Idee. Wir prüfen deine Anfrage sorgfältig und melden uns mit einer passenden ersten Einschätzung.",
    typeTitle: "Welche Art von Projekt brauchst du?",
    website: "Website-Entwicklung",
    websiteSub: "Für Unternehmen und Personen",
    app: "Mobile App",
    appSub: "iOS & Android Anwendungen",
    ai: "KI-Tool",
    aiSub: "Automatisierung & smarte Lösungen",
    formTitle: "Erzähl uns von deinem Projekt",
    fullName: "Vollständiger Name",
    email: "E-Mail-Adresse",
    company: "Unternehmen / Organisation",
    projectTitle: "Projekttitel",
    description: "Projektbeschreibung",
    timeline: "Gewünschter Zeitrahmen",
    budget: "Budgetrahmen (optional)",
    files: "Zusätzliche Dateien (optional)",
    fileHelp: "Dateien hier ablegen oder auswählen · PDF, DOCX, PPTX, PNG, JPG · max. 20 MB",
    consent: "Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung der Projektanfrage zu.",
    continue: "Projekt starten",
    nextTitle: "Was passiert danach?",
    next1: "Wir prüfen deine Anfrage",
    next1d: "Unser Team schaut sich deine Angaben und Anforderungen sorgfältig an.",
    next2: "Du erhältst eine erste Einschätzung",
    next2d: "Wir melden uns mit den nächsten sinnvollen Schritten und möglichen Optionen.",
    next3: "Gemeinsam planen wir die Umsetzung",
    next3d: "Nach deiner Freigabe planen wir Struktur, Design und technische Umsetzung.",
    why: "Warum CentofAi?",
    whyItems: ["Individuelle Lösungen statt Baukasten", "Modernes Design & aktuelle Technologien", "Transparente Kommunikation", "KI-gestützt, von Menschen perfektioniert"],
    footer: "Websites, Apps & KI-Tools. Mit KI gebaut. Von Menschen perfektioniert.",
    placeholderName: "Dein Name",
    placeholderMail: "du@beispiel.ch",
    placeholderCompany: "Unternehmen (optional)",
    placeholderTitle: "z. B. Firmenwebsite, Buchungs-App, KI-Assistent",
    placeholderDescription: "Beschreibe deine Idee, Ziele, Zielgruppe und wichtige Funktionen …",
    select: "Bitte auswählen",
  },
  en: {
    home: "Home",
    services: "Services",
    products: "Products",
    process: "How we work",
    start: "Start a project",
    eyebrow: "Start a project",
    titleA: "Let’s build something",
    titleB: "remarkable together.",
    intro: "Tell us about your idea. We’ll review your request carefully and come back with a useful first assessment.",
    typeTitle: "What type of project do you need?",
    website: "Website Development",
    websiteSub: "For businesses and individuals",
    app: "Mobile App",
    appSub: "iOS & Android applications",
    ai: "AI Tool",
    aiSub: "Automation & smart solutions",
    formTitle: "Tell us about your project",
    fullName: "Full name",
    email: "Email address",
    company: "Company / Organization",
    projectTitle: "Project title",
    description: "Project description",
    timeline: "Preferred timeline",
    budget: "Budget range (optional)",
    files: "Additional files (optional)",
    fileHelp: "Drop files here or choose files · PDF, DOCX, PPTX, PNG, JPG · max. 20 MB",
    consent: "I agree that my information may be processed to handle this project request.",
    continue: "Start a project",
    nextTitle: "What happens next?",
    next1: "We review your request",
    next1d: "Our team carefully reviews your information and requirements.",
    next2: "You receive a first assessment",
    next2d: "We get back to you with sensible next steps and possible options.",
    next3: "We plan the implementation together",
    next3d: "After your approval, we plan structure, design and technical implementation.",
    why: "Why CentofAi?",
    whyItems: ["Custom solutions instead of templates", "Modern design & current technologies", "Transparent communication", "AI-built, perfected by people"],
    footer: "Websites, Apps & AI Tools. Built with AI. Perfected by people.",
    placeholderName: "Your name",
    placeholderMail: "you@example.com",
    placeholderCompany: "Company (optional)",
    placeholderTitle: "e.g. Company website, booking app, AI assistant",
    placeholderDescription: "Describe your idea, goals, target audience and key features …",
    select: "Please select",
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

function VisualContactCard() {
  return (
    <div className="ps-visual" aria-hidden="true">
      <div className="ps-orb ps-orb-a" />
      <div className="ps-orb ps-orb-b" />
      <div className="ps-float-cube c1" />
      <div className="ps-float-cube c2" />
      <div className="ps-float-cube c3" />
      <div className="ps-contact-card">
        <span>Get in touch</span>
        <div className="ps-line lg" />
        <div className="ps-line md" />
        <div className="ps-line sm" />
        <div className="ps-send"><Send size={26} /></div>
      </div>
      <svg className="ps-path" viewBox="0 0 300 160"><path d="M20 120 C85 120 120 150 178 94 C212 61 238 69 280 35" /></svg>
    </div>
  );
}

export default function ProjectStart() {
  const [location, setLocation] = useLocation();
  const lang: Lang = location.startsWith("/en") ? "en" : "de";
  const t = copy[lang];
  const { theme, toggle } = useTheme();
  const [type, setType] = useState<ProjectType>("website");
  const [consent, setConsent] = useState(false);

  const base = lang === "de" ? "/de" : "/en";
  const target = type === "website"
    ? `${base}/${lang === "de" ? "projekt-starten/website" : "start-a-project/website"}`
    : type === "app"
      ? `${base}/${lang === "de" ? "projekt-starten/app" : "start-a-project/app"}`
      : `${base}/${lang === "de" ? "projekt-starten/ki-tool" : "start-a-project/ai-tool"}`;

  const cards = [
    { key: "website" as const, icon: Globe2, title: t.website, sub: t.websiteSub },
    { key: "app" as const, icon: Smartphone, title: t.app, sub: t.appSub },
    { key: "ai" as const, icon: Bot, title: t.ai, sub: t.aiSub },
  ];

  const persistAndContinue = () => {
    const data = Object.fromEntries(new FormData(document.querySelector("#project-start-form") as HTMLFormElement).entries());
    localStorage.setItem("centofai-project-draft", JSON.stringify({ ...data, projectType: type, lang, updatedAt: new Date().toISOString() }));
    setLocation(target);
  };

  return (
    <div className={`project-start ${theme}`}>
      <header className="ps-header">
        <Link href={`${base}`} className="ps-logo" aria-label="CentofAi Home"><span className="ps-monogram">C</span><strong>centof.ai</strong></Link>
        <nav>
          <Link href={`${base}`}>{t.home}</Link>
          <Link href={`${base}/${lang === "de" ? "leistungen" : "services"}`}>{t.services}</Link>
          <Link href={`${base}/${lang === "de" ? "produkte" : "products"}`}>{t.products}</Link>
          <Link href={`${base}/${lang === "de" ? "arbeitsweise" : "how-we-work"}`}>{t.process}</Link>
        </nav>
        <div className="ps-actions">
          <button className="ps-icon-btn" onClick={toggle} aria-label="Toggle theme">{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <Link href={lang === "de" ? "/en/start-a-project" : "/de/projekt-starten"} className="ps-lang">{lang === "de" ? "EN" : "DE"}</Link>
          <button className="ps-gradient-btn" onClick={() => document.querySelector("#project-start-form")?.scrollIntoView({ behavior: "smooth" })}>{t.start}<ArrowRight size={17}/></button>
        </div>
      </header>

      <main>
        <section className="ps-hero">
          <div className="ps-hero-copy">
            <div className="ps-breadcrumb">{t.home} <span>/</span> {t.eyebrow}</div>
            <h1>{t.titleA}<br/><span>{t.titleB}</span></h1>
            <p>{t.intro}</p>
          </div>
          <VisualContactCard />
        </section>

        <section className="ps-shell ps-type-section">
          <h2>{t.typeTitle}</h2>
          <div className="ps-type-grid">
            {cards.map(({ key, icon: Icon, title, sub }) => (
              <button key={key} type="button" className={`ps-type-card ${type === key ? "selected" : ""}`} onClick={() => setType(key)}>
                <span className="ps-type-icon"><Icon size={28}/></span>
                <span><strong>{title}</strong><small>{sub}</small></span>
                {type === key && <span className="ps-check"><Check size={13}/></span>}
              </button>
            ))}
          </div>
        </section>

        <section className="ps-main-grid ps-shell">
          <form id="project-start-form" className="ps-panel ps-form" onSubmit={(e) => { e.preventDefault(); if (consent) persistAndContinue(); }}>
            <h2>{t.formTitle}</h2>
            <div className="ps-fields two">
              <label>{t.fullName} *<input name="fullName" required placeholder={t.placeholderName}/></label>
              <label>{t.email} *<input name="email" type="email" required placeholder={t.placeholderMail}/></label>
            </div>
            <label>{t.company}<input name="company" placeholder={t.placeholderCompany}/></label>
            <label>{t.projectTitle} *<input name="projectTitle" required placeholder={t.placeholderTitle}/></label>
            <label>{t.description} *<textarea name="description" required rows={5} placeholder={t.placeholderDescription}/></label>
            <div className="ps-fields two">
              <label>{t.timeline}<span className="ps-select-wrap"><select name="timeline" defaultValue=""><option value="" disabled>{t.select}</option><option>2–4 {lang === "de" ? "Wochen" : "weeks"}</option><option>4–8 {lang === "de" ? "Wochen" : "weeks"}</option><option>2–3 {lang === "de" ? "Monate" : "months"}</option><option>3+ {lang === "de" ? "Monate" : "months"}</option></select><ChevronDown size={16}/></span></label>
              <label>{t.budget}<span className="ps-select-wrap"><select name="budget" defaultValue=""><option value="">{t.select}</option><option>1.000–3.000</option><option>3.000–5.000</option><option>5.000–10.000</option><option>10.000–25.000</option><option>25.000+</option></select><ChevronDown size={16}/></span></label>
            </div>
            <label>{t.files}<span className="ps-upload"><FileUp size={26}/><span><strong>{t.fileHelp.split("·")[0]}</strong><small>{t.fileHelp.split("·").slice(1).join(" · ")}</small></span><input name="files" type="file" multiple /></span></label>
            <label className="ps-consent"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}/><span>{t.consent}</span></label>
            <button className="ps-submit" type="submit" disabled={!consent}>{t.continue}<ArrowRight size={18}/></button>
          </form>

          <aside className="ps-side">
            <div className="ps-panel ps-steps">
              <h2>{t.nextTitle}</h2>
              {[[t.next1,t.next1d],[t.next2,t.next2d],[t.next3,t.next3d]].map(([a,b], i) => (
                <div className="ps-step" key={a}><span>{i+1}</span><div><strong>{a}</strong><p>{b}</p></div></div>
              ))}
            </div>
            <div className="ps-panel ps-why">
              <h2>{t.why}</h2>
              {t.whyItems.map((item) => <p key={item}><Check size={15}/>{item}</p>)}
              <div className="ps-mini-art"><Sparkles/><Puzzle/><Clock3/></div>
            </div>
          </aside>
        </section>

        <section className="ps-cta ps-shell">
          <div><small>HUMAN CLARITY · AI POWER</small><h2>{lang === "de" ? "Deine Idee kann das nächste wirklich nützliche digitale Produkt werden." : "Your idea can become the next genuinely useful digital product."}</h2></div>
          <button onClick={() => document.querySelector("#project-start-form")?.scrollIntoView({ behavior: "smooth" })}>{t.start}<ArrowRight size={17}/></button>
        </section>
      </main>

      <footer className="ps-footer ps-shell"><div className="ps-logo"><span className="ps-monogram">C</span><strong>centof.ai</strong></div><p>{t.footer}</p><span>© 2026 CentofAi</span></footer>
    </div>
  );
}
