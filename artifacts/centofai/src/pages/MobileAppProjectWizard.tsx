import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, ArrowRight, Bell, Bookmark, Camera, Check, CheckCircle2,
  CreditCard, FileText, Fingerprint, Info, LayoutTemplate, MapPin, Moon,
  Palette, Pencil, Save, Smartphone, Sparkles, Sun, Upload, UserRound,
  WifiOff, Workflow,
} from "lucide-react";
import "./project.css";

type Lang = "de" | "en";
type Step = 1 | 2 | 3 | 4 | 5;

type Draft = {
  projectType: "app";
  company: string;
  projectTitle: string;
  description: string;
  targetAudience: string;
  timeline: string;
  budget: string;
  contactName: string;
  email: string;
  phone: string;
  platforms: string[];
  appType: string;
  designStyle: string[];
  brandColors: string;
  screens: string[];
  contentNotes: string;
  functions: string[];
  integrations: string[];
  specialRequirements: string;
  files: string[];
};

const initialDraft: Draft = {
  projectType: "app",
  company: "",
  projectTitle: "",
  description: "",
  targetAudience: "",
  timeline: "",
  budget: "",
  contactName: "",
  email: "",
  phone: "",
  platforms: ["iOS", "Android"],
  appType: "Native-feeling Cross-Platform",
  designStyle: ["Modern", "Professionell"],
  brandColors: "",
  screens: ["Onboarding", "Login / Registrierung", "Start / Dashboard", "Profil", "Einstellungen"],
  contentNotes: "",
  functions: ["Login / Registrierung", "Push-Benachrichtigungen", "Analytics"],
  integrations: [],
  specialRequirements: "",
  files: [],
};

const copy = {
  de: {
    labels: ["Projektinfo", "Plattform & Design", "Screens & Inhalte", "Funktionen", "Abschluss"],
    back: "Zurück", save: "Projekt speichern", project: "Projektart: Mobile App", step: "Schritt", of: "von 5",
    titles: [
      ["Erzähl uns von deiner App-Idee", "Definiere Ziel, Zielgruppe und die wichtigsten Rahmenbedingungen."],
      ["Wähle Plattform & Design", "Lege fest, wo die App laufen soll und welchen visuellen Charakter sie bekommen soll."],
      ["Plane Screens & Inhalte", "Wähle die wichtigsten Ansichten deiner App und ergänze Inhalte oder vorhandene Materialien."],
      ["Wähle deine App-Funktionen", "Aktiviere die Funktionen, Gerätefeatures und Integrationen, die dein Produkt benötigt."],
      ["Prüfe deine App-Anfrage", "Kontrolliere alle Angaben. Der Versand an CentofAi wird in der Backend-Phase aktiviert."],
    ],
    next: "Weiter", finish: "Projektanfrage vorbereiten", selection: "Deine Auswahl",
    recommend: "Ich bin mir nicht sicher – bitte sinnvoll empfehlen",
    recommendSub: "Wir stellen eine sinnvolle MVP-Auswahl für Plattform, Screens und Funktionen zusammen.",
    saved: "Entwurf gespeichert",
    ready: "Die App-Anfrage ist lokal vollständig vorbereitet. E-Mail, Dateiupload und serverseitige Speicherung folgen in der Backend-Phase.",
  },
  en: {
    labels: ["Project info", "Platform & design", "Screens & content", "Functions", "Review"],
    back: "Back", save: "Save project", project: "Project type: Mobile App", step: "Step", of: "of 5",
    titles: [
      ["Tell us about your app idea", "Define the goal, audience and most important project constraints."],
      ["Choose platform & design", "Decide where the app should run and what visual character it should have."],
      ["Plan screens & content", "Choose the most important app views and add content or existing materials."],
      ["Choose your app functions", "Enable the features, device capabilities and integrations your product needs."],
      ["Review your app request", "Check all details. Delivery to CentofAi will be activated in the backend phase."],
    ],
    next: "Continue", finish: "Prepare project request", selection: "Your selection",
    recommend: "I’m not sure – recommend a sensible setup",
    recommendSub: "We create a sensible MVP selection for platform, screens and functions.",
    saved: "Draft saved",
    ready: "Your app request is fully prepared locally. Email, file upload and server-side storage follow in the backend phase.",
  },
} as const;

const screenOptions = [
  "Onboarding", "Login / Registrierung", "Start / Dashboard", "Suche", "Profil", "Einstellungen",
  "Listen / Übersicht", "Detailansicht", "Karte / Standort", "Chat / Nachrichten", "Kalender / Termine",
  "Zahlung / Checkout", "Statistiken", "Dateien / Dokumente", "Admin-Bereich",
];

const featureGroups: Record<string, string[]> = {
  Basis: ["Login / Registrierung", "Benutzerprofile", "Push-Benachrichtigungen", "Mehrsprachigkeit", "Dark Mode", "Analytics"],
  Gerät: ["GPS / Standort", "Kamera", "Foto-Upload", "Datei-Upload", "Biometrie / Face ID", "QR- / Barcode-Scanner", "Offline-Modus"],
  Kommunikation: ["In-App Chat", "E-Mail-Benachrichtigungen", "SMS", "WhatsApp-Anbindung", "Video / Audio", "Support-Chat"],
  Geschäft: ["Zahlungen", "Abonnements", "In-App-Käufe", "Rechnungen", "Buchungen / Termine", "Gutscheine / Rabatte"],
  Daten: ["Cloud-Synchronisierung", "Admin-Dashboard", "Export PDF / CSV", "Externe APIs", "CRM-Anbindung", "Kalender-Anbindung"],
  Erweitert: ["KI-Assistent", "Maps / Navigation", "Hintergrundprozesse", "Rollen & Rechte", "Echtzeit-Daten", "Apple / Google Sign-In"],
};

const integrationOptions = ["Stripe", "Apple Pay", "Google Pay", "Supabase", "Firebase", "REST / GraphQL API", "Google Maps", "Apple Maps", "Calendar", "CRM", "E-Mail / SMTP", "KI / LLM API"];

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

export default function MobileAppProjectWizard() {
  const [location, setLocation] = useLocation();
  const lang: Lang = location.startsWith("/en") ? "en" : "de";
  const t = copy[lang];
  const { theme, toggle } = useTheme();
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [featureTab, setFeatureTab] = useState("Basis");
  const [saved, setSaved] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const base = lang === "de" ? "/de/projekt-starten" : "/en/start-a-project";

  useEffect(() => {
    try {
      const generic = JSON.parse(localStorage.getItem("centofai-project-draft") || "null");
      const specific = JSON.parse(localStorage.getItem("centofai-app-draft") || "null");
      setDraft((d) => ({
        ...d,
        ...(specific || {}),
        company: specific?.company || generic?.company || d.company,
        projectTitle: specific?.projectTitle || generic?.projectTitle || d.projectTitle,
        description: specific?.description || generic?.description || d.description,
        contactName: specific?.contactName || generic?.fullName || d.contactName,
        email: specific?.email || generic?.email || d.email,
        timeline: specific?.timeline || generic?.timeline || d.timeline,
        budget: specific?.budget || generic?.budget || d.budget,
      }));
    } catch { /* ignore malformed local draft */ }
  }, []);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const toggleArray = (key: "platforms" | "designStyle" | "screens" | "functions" | "integrations", value: string) =>
    setDraft((d) => ({ ...d, [key]: d[key].includes(value) ? d[key].filter((x) => x !== value) : [...d[key], value] }));

  const saveDraft = () => {
    localStorage.setItem("centofai-app-draft", JSON.stringify({ ...draft, updatedAt: new Date().toISOString(), lang }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  const recommend = () => setDraft((d) => ({
    ...d,
    platforms: ["iOS", "Android"],
    appType: "Native-feeling Cross-Platform",
    designStyle: ["Modern", "Professionell", "Intuitiv"],
    screens: ["Onboarding", "Login / Registrierung", "Start / Dashboard", "Listen / Übersicht", "Detailansicht", "Profil", "Einstellungen"],
    functions: ["Login / Registrierung", "Benutzerprofile", "Push-Benachrichtigungen", "Mehrsprachigkeit", "Dark Mode", "Analytics", "Cloud-Synchronisierung", "Admin-Dashboard"],
  }));

  const title = t.titles[step - 1];
  const goNext = () => { saveDraft(); if (step < 5) setStep((step + 1) as Step); };
  const goBack = () => { if (step === 1) setLocation(base); else setStep((step - 1) as Step); };

  const summaryRows = [
    [lang === "de" ? "Projektart" : "Project type", lang === "de" ? "Mobile App" : "Mobile App", 1],
    [lang === "de" ? "Plattformen" : "Platforms", draft.platforms, 2],
    [lang === "de" ? "App-Technik" : "App approach", draft.appType || "—", 2],
    [lang === "de" ? "Designstil" : "Design style", draft.designStyle, 2],
    [lang === "de" ? "Screens" : "Screens", draft.screens, 3],
    [lang === "de" ? "Funktionen" : "Functions", draft.functions, 4],
    [lang === "de" ? "Integrationen" : "Integrations", draft.integrations.length ? draft.integrations : ["—"], 4],
    [lang === "de" ? "Ziel / Kurzbeschreibung" : "Goal / short description", draft.description || "—", 1],
    [lang === "de" ? "Besondere Anforderungen" : "Special requirements", draft.specialRequirements || "—", 4],
    ["Budget", draft.budget || "—", 1],
    [lang === "de" ? "Zeitrahmen" : "Timeline", draft.timeline || "—", 1],
    [lang === "de" ? "Kontaktperson" : "Contact", draft.contactName || "—", 1],
    ["E-Mail", draft.email || "—", 1],
    [lang === "de" ? "Dateien" : "Files", draft.files.length ? draft.files : ["—"], 3],
  ] as const;

  return (
    <div className={`website-wizard ${theme}`}>
      <header className="ww-header">
        <div className="ps-logo"><span className="ps-monogram">C</span><strong>centof.ai</strong></div>
        <div className="ww-progress">
          {t.labels.map((label, i) => <div key={label} style={{ display: "contents" }}>
            <button className={`ww-progress-item ${step === i + 1 ? "active" : step > i + 1 ? "done" : ""}`} onClick={() => setStep((i + 1) as Step)}>
              <span>{step > i + 1 ? <Check size={14}/> : i + 1}</span>{label}
            </button>{i < 4 && <b className="ww-progress-sep">›</b>}
          </div>)}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="ps-icon-btn" onClick={toggle}>{theme === "dark" ? <Sun size={17}/> : <Moon size={17}/>}</button>
          <button className="ww-save" onClick={saveDraft}><Bookmark size={15}/><span>{saved ? t.saved : t.save}</span></button>
        </div>
      </header>

      <div className="ww-shell ww-layout">
        <main className="ww-main">
          <div className="ww-topline">
            <button className="ww-back" onClick={goBack}><ArrowLeft size={16}/>{t.back}</button>
            <span className="ww-step-pill">{t.step} {step} {t.of}</span>
            <span className="ww-project-pill"><Smartphone size={14}/>{t.project}<CheckCircle2 size={14}/></span>
          </div>
          <div className="ww-mobile-progress">{step}/5 · {t.labels[step - 1]}</div>
          <h1 className="ww-title">{title[0]}</h1><p className="ww-subtitle">{title[1]}</p>

          {step === 1 && <div className="ww-grid2">
            <section className="ww-card">
              <h3 className="ww-section-title">{lang === "de" ? "Projekt & Ziel" : "Project & goal"}</h3>
              <label className="ww-label"><span>{lang === "de" ? "Unternehmen / Projekt" : "Company / project"}</span><input className="ww-input" value={draft.company} onChange={e => set("company", e.target.value)} /></label>
              <label className="ww-label"><span>{lang === "de" ? "Projekttitel" : "Project title"}</span><input className="ww-input" value={draft.projectTitle} onChange={e => set("projectTitle", e.target.value)} /></label>
              <label className="ww-label"><span>{lang === "de" ? "Beschreibe deine App-Idee" : "Describe your app idea"}</span><textarea className="ww-textarea" rows={6} value={draft.description} onChange={e => set("description", e.target.value)} placeholder={lang === "de" ? "Problem, Ziel, gewünschter Nutzen ..." : "Problem, goal, intended value ..."}/></label>
              <label className="ww-label"><span>{lang === "de" ? "Zielgruppe" : "Target audience"}</span><input className="ww-input" value={draft.targetAudience} onChange={e => set("targetAudience", e.target.value)} /></label>
            </section>
            <section className="ww-card">
              <h3 className="ww-section-title">{lang === "de" ? "Rahmen & Kontakt" : "Scope & contact"}</h3>
              <label className="ww-label"><span>{lang === "de" ? "Zeitrahmen" : "Timeline"}</span><input className="ww-input" value={draft.timeline} onChange={e => set("timeline", e.target.value)} placeholder="z. B. 8–12 Wochen" /></label>
              <label className="ww-label"><span>Budget</span><input className="ww-input" value={draft.budget} onChange={e => set("budget", e.target.value)} /></label>
              <label className="ww-label"><span>{lang === "de" ? "Kontaktperson" : "Contact person"}</span><input className="ww-input" value={draft.contactName} onChange={e => set("contactName", e.target.value)} /></label>
              <label className="ww-label"><span>E-Mail</span><input className="ww-input" type="email" value={draft.email} onChange={e => set("email", e.target.value)} /></label>
              <label className="ww-label"><span>{lang === "de" ? "Telefon (optional)" : "Phone (optional)"}</span><input className="ww-input" value={draft.phone} onChange={e => set("phone", e.target.value)} /></label>
            </section>
          </div>}

          {step === 2 && <>
            <button className="ww-recommend" onClick={recommend}><Sparkles size={18}/><span><strong>{t.recommend}</strong><small>{t.recommendSub}</small></span><ArrowRight size={18}/></button>
            <section className="ww-card" style={{ marginTop: 14 }}>
              <h3 className="ww-section-title">{lang === "de" ? "1. Zielplattformen" : "1. Target platforms"}</h3>
              <div className="ww-choice-row">{["iOS", "Android", "Web-App / PWA", "Tablet / iPad"].map(x => <button key={x} className={`ww-chip ${draft.platforms.includes(x) ? "selected" : ""}`} onClick={() => toggleArray("platforms", x)}><Smartphone size={14}/>{x}</button>)}</div>
            </section>
            <div className="ww-grid2" style={{ marginTop: 14 }}>
              <section className="ww-card">
                <h3 className="ww-section-title">{lang === "de" ? "2. Technischer Ansatz" : "2. Technical approach"}</h3>
                <div className="ww-choice-row">{["Native iOS / Android", "Native-feeling Cross-Platform", "PWA / Web-App", "Noch offen"].map(x => <button key={x} className={`ww-chip ${draft.appType === x ? "selected" : ""}`} onClick={() => set("appType", x)}>{x}</button>)}</div>
              </section>
              <section className="ww-card">
                <h3 className="ww-section-title">{lang === "de" ? "3. Designstil" : "3. Design style"}</h3>
                <div className="ww-choice-row">{["Modern", "Professionell", "Minimalistisch", "Premium", "Verspielt", "Intuitiv"].map(x => <button key={x} className={`ww-chip ${draft.designStyle.includes(x) ? "selected" : ""}`} onClick={() => toggleArray("designStyle", x)}><Palette size={14}/>{x}</button>)}</div>
                <label className="ww-label" style={{ marginTop: 14 }}><span>{lang === "de" ? "Markenfarben / CI (optional)" : "Brand colors / identity (optional)"}</span><input className="ww-input" value={draft.brandColors} onChange={e => set("brandColors", e.target.value)} placeholder="#6B3EFF, Türkis ..." /></label>
              </section>
            </div>
          </>}

          {step === 3 && <>
            <section className="ww-card">
              <h3 className="ww-section-title">{lang === "de" ? "1. Welche Screens braucht deine App?" : "1. Which screens does your app need?"}</h3>
              <div className="ww-choice-row">{screenOptions.map(x => <button key={x} className={`ww-chip ${draft.screens.includes(x) ? "selected" : ""}`} onClick={() => toggleArray("screens", x)}><LayoutTemplate size={14}/>{x}</button>)}</div>
            </section>
            <div className="ww-grid2" style={{ marginTop: 14 }}>
              <section className="ww-card">
                <h3 className="ww-section-title">{lang === "de" ? "2. Inhalte & Abläufe" : "2. Content & flows"}</h3>
                <textarea className="ww-textarea" rows={8} value={draft.contentNotes} onChange={e => set("contentNotes", e.target.value)} placeholder={lang === "de" ? "Beschreibe wichtige Nutzerabläufe, Inhalte oder Daten ..." : "Describe important user flows, content or data ..."}/>
              </section>
              <section className="ww-card">
                <h3 className="ww-section-title">{lang === "de" ? "3. Materialien hochladen" : "3. Upload materials"}</h3>
                <label className="ps-upload"><Upload size={26}/><span><strong>{lang === "de" ? "Briefing, Skizzen, Screenshots oder PDFs" : "Briefing, sketches, screenshots or PDFs"}</strong><small>PDF, DOCX, PPTX, PNG, JPG</small></span><input type="file" multiple onChange={e => set("files", Array.from(e.target.files || []).map(f => f.name))}/></label>
              </section>
            </div>
          </>}

          {step === 4 && <>
            <button className="ww-recommend" onClick={recommend}><Sparkles size={18}/><span><strong>{t.recommend}</strong><small>{t.recommendSub}</small></span><ArrowRight size={18}/></button>
            <div className="ww-tabs">{Object.keys(featureGroups).map(tab => <button key={tab} onClick={() => setFeatureTab(tab)} className={featureTab === tab ? "active" : ""}>{tab}</button>)}</div>
            <section className="ww-card">
              <h3 className="ww-section-title">{featureTab}</h3>
              <div className="ww-feature-grid">{featureGroups[featureTab].map(x => {
                const icons: Record<string, any> = { "Push-Benachrichtigungen": Bell, "GPS / Standort": MapPin, "Kamera": Camera, "Biometrie / Face ID": Fingerprint, "Offline-Modus": WifiOff, "Zahlungen": CreditCard, "Hintergrundprozesse": Workflow };
                const Icon = icons[x] || Smartphone;
                return <button key={x} className={`ww-feature ${draft.functions.includes(x) ? "selected" : ""}`} onClick={() => toggleArray("functions", x)}><Icon size={18}/><span>{x}</span><i>{draft.functions.includes(x) ? <Check size={12}/> : null}</i></button>;
              })}</div>
            </section>
            <section className="ww-card" style={{ marginTop: 14 }}>
              <h3 className="ww-section-title">{lang === "de" ? "Integrationen" : "Integrations"}</h3>
              <div className="ww-choice-row">{integrationOptions.map(x => <button key={x} className={`ww-chip ${draft.integrations.includes(x) ? "selected" : ""}`} onClick={() => toggleArray("integrations", x)}>{x}</button>)}</div>
              <label className="ww-label" style={{ marginTop: 16 }}><span>{lang === "de" ? "Besondere Anforderungen" : "Special requirements"}</span><textarea className="ww-textarea" rows={5} value={draft.specialRequirements} onChange={e => set("specialRequirements", e.target.value)} /></label>
            </section>
          </>}

          {step === 5 && <>
            <div className="ww-summary">{summaryRows.map(([label, value, editStep]) => <div className="ww-summary-row" key={String(label)}><div className="ww-summary-label">{label}</div><div className="ww-summary-value">{Array.isArray(value) ? <div className="ww-summary-tags">{value.map(v => <span key={v}>{v}</span>)}</div> : String(value)}</div><button onClick={() => setStep(editStep as Step)}><Pencil size={14}/>{lang === "de" ? "Bearbeiten" : "Edit"}</button></div>)}</div>
            {prepared && <div className="ww-ready"><Info size={18}/><span>{t.ready}</span></div>}
          </>}

          <div className="ww-footer-strip">
            {step > 1 && <button className="ww-secondary" onClick={goBack}><ArrowLeft size={16}/>{t.back}</button>}
            {step < 5 ? <button className="ww-primary" onClick={goNext}>{t.next}<ArrowRight size={16}/></button> : <button className="ww-primary" onClick={() => { saveDraft(); setPrepared(true); }}>{t.finish}<ArrowRight size={16}/></button>}
          </div>
        </main>

        <aside className="ww-aside">
          <h3><Sparkles size={19}/>{t.selection}</h3>
          <div className="ww-aside-row"><span className="ww-aside-icon"><Smartphone size={16}/></span><div><small>{lang === "de" ? "Projektart" : "Project type"}</small><strong>Mobile App</strong></div><CheckCircle2 size={15}/></div>
          <div className="ww-aside-row"><span className="ww-aside-icon"><Smartphone size={16}/></span><div><small>{lang === "de" ? "Plattformen" : "Platforms"}</small><strong>{draft.platforms.join(" · ") || "—"}</strong></div><CheckCircle2 size={15}/></div>
          <div className="ww-aside-row"><span className="ww-aside-icon"><Palette size={16}/></span><div><small>{lang === "de" ? "Stil" : "Style"}</small><strong>{draft.designStyle.join(" · ") || "—"}</strong></div><CheckCircle2 size={15}/></div>
          <div className="ww-aside-row"><span className="ww-aside-icon"><LayoutTemplate size={16}/></span><div><small>Screens</small><strong>{draft.screens.length} {lang === "de" ? "ausgewählt" : "selected"}</strong></div><CheckCircle2 size={15}/></div>
          <div className="ww-aside-row"><span className="ww-aside-icon"><Workflow size={16}/></span><div><small>{lang === "de" ? "Funktionen" : "Functions"}</small><strong>{draft.functions.length} {lang === "de" ? "ausgewählt" : "selected"}</strong></div><CheckCircle2 size={15}/></div>
          <button className="ww-aside-cta" onClick={() => step < 5 ? goNext() : setPrepared(true)}>{step < 5 ? t.next : t.finish}<ArrowRight size={16}/></button>
          <p className="ww-aside-note"><Info size={15}/>{lang === "de" ? "Alle Angaben können vor dem Versand jederzeit angepasst werden." : "All details can be changed before submission."}</p>
        </aside>
      </div>
    </div>
  );
}
