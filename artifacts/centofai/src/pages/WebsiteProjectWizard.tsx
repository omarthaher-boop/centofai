import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  FileText,
  Globe2,
  Info,
  LayoutTemplate,
  ListChecks,
  Moon,
  Palette,
  Pencil,
  Save,
  Sparkles,
  Sun,
  Upload,
  UserRound,
  WandSparkles,
} from "lucide-react";
import "./project.css";

type Lang = "de" | "en";
type Step = 1 | 2 | 3 | 4 | 5;

type Draft = {
  projectType: "website";
  company: string;
  projectTitle: string;
  description: string;
  targetAudience: string;
  usp: string;
  timeline: string;
  budget: string;
  contactName: string;
  email: string;
  phone: string;
  themeCategory: string;
  theme: string;
  tone: string[];
  language: string;
  content: string[];
  inspirations: string;
  functions: string[];
  specialRequirements: string;
  files: string[];
};

const initialDraft: Draft = {
  projectType: "website",
  company: "",
  projectTitle: "",
  description: "",
  targetAudience: "",
  usp: "",
  timeline: "",
  budget: "",
  contactName: "",
  email: "",
  phone: "",
  themeCategory: "Business",
  theme: "Corporate Clean",
  tone: ["Professionell", "Modern"],
  language: "DE / EN",
  content: ["Hero", "Leistungen", "Team", "Portfolio / Referenzen", "Testimonials", "Kontakt"],
  inspirations: "",
  functions: ["Kontaktformular", "Mehrsprachigkeit", "Cookie-Banner", "SEO-Grundlage", "Analytics / Tracking"],
  specialRequirements: "",
  files: [],
};

const c = {
  de: {
    labels: ["Projektinfo", "Theme", "Inhalte", "Funktionen", "Abschluss"],
    back: "Zurück", save: "Projekt speichern", project: "Projektart: Website", step: "Schritt", of: "von 5",
    step1: ["Erzähl uns von deinem Website-Projekt", "Die wichtigsten Eckdaten bilden die Grundlage für alle nächsten Schritte."],
    step2: ["Wähle dein Website-Theme", "Wähle ein Design, das zu deinem Unternehmen, deiner Marke oder deinem persönlichen Auftritt passt."],
    step3: ["Plane deine Inhalte", "Wähle aus, welche Inhalte deine Website enthalten soll, und ergänze Details, Texte oder Dateien."],
    step4: ["Wähle deine Website-Funktionen", "Aktiviere die Funktionen, die deine Website heute oder später benötigen könnte."],
    step5: ["Prüfe deine Projektanfrage", "Kontrolliere alle Angaben. Im nächsten Backend-Schritt wird diese Zusammenfassung direkt an CentofAi gesendet."],
    next: "Weiter", finish: "Projektanfrage vorbereiten", selection: "Deine Auswahl", recommendation: "Ich bin mir nicht sicher – bitte sinnvoll empfehlen",
    recommendationSub: "Wir wählen die wichtigsten Optionen passend zu Projektart, Ziel und Zielgruppe vor.",
    saved: "Entwurf gespeichert", frontendReady: "Die Anfrage ist lokal vollständig vorbereitet. Der tatsächliche E-Mail-/Upload-Versand wird in der Backend-Phase aktiviert.",
  },
  en: {
    labels: ["Project info", "Theme", "Content", "Functions", "Review"],
    back: "Back", save: "Save project", project: "Project type: Website", step: "Step", of: "of 5",
    step1: ["Tell us about your website project", "The key project details form the basis for all following steps."],
    step2: ["Choose your website theme", "Choose a design that fits your company, brand or personal presence."],
    step3: ["Plan your content", "Choose which sections your website should include and add details, copy or files."],
    step4: ["Choose your website functions", "Enable the features your website may need today or later."],
    step5: ["Review your project request", "Check all details. In the next backend phase, this summary will be sent directly to CentofAi."],
    next: "Continue", finish: "Prepare project request", selection: "Your selection", recommendation: "I’m not sure – recommend sensible options",
    recommendationSub: "We preselect the most important options based on project type, goals and target audience.",
    saved: "Draft saved", frontendReady: "Your request is fully prepared locally. Actual email/file delivery will be activated in the backend phase.",
  },
} as const;

const themes = [
  ["Corporate Clean", "Business", "Modern, professionell und klar für Unternehmen", ""],
  ["Personal Expert", "Personal Brand", "Für persönliche Marken und Expertenprofile", "darkpreview"],
  ["Medical Premium", "Arztpraxis", "Vertrauensvoll, hochwertig und medizinisch modern", "medical"],
  ["Startup Vision", "Startup", "Innovativ, dynamisch und technologieorientiert", "darkpreview"],
  ["Shop Flow", "E-Commerce", "Strukturiert und verkaufsstark für E-Commerce", "shop"],
  ["Creative Portfolio", "Portfolio", "Visuell stark für Designer, Kreative und Projekte", "creative darkpreview"],
] as const;

const contents = [
  ["Hero", "Starker erster Eindruck"], ["Über uns", "Deine Geschichte"], ["Leistungen", "Deine Angebote"], ["Team", "Deine Experten"],
  ["Portfolio / Referenzen", "Projekte & Arbeiten"], ["Testimonials", "Kundenstimmen"], ["Preise", "Pakete & Kosten"], ["FAQ", "Häufige Fragen"],
  ["Blog / News", "Artikel & Neuigkeiten"], ["Galerie", "Bilder & Impressionen"], ["Kontakt", "Kontaktformular & Infos"], ["Footer CTA", "Call-to-Action unten"],
] as const;

const featureGroups: Record<string, string[]> = {
  Basis: ["Kontaktformular", "Rückruf / Anfrageformular", "Terminbuchung", "Google Maps", "Mehrsprachigkeit", "Cookie-Banner", "Social Media Links"],
  Marketing: ["Newsletter", "SEO-Grundlage", "Live-Chat / WhatsApp", "Pop-up / Lead Magnet", "Bewertungen / Testimonials", "FAQ-Akkordeon", "Analytics / Tracking", "Suchfunktion"],
  Verkauf: ["Lead-Formular", "Online-Shop", "Warenkorb / Checkout", "Zahlungsintegration", "Dateiupload", "CRM-Anbindung"],
  Inhalte: ["Blog / CMS", "Mediengalerie", "Downloads", "Dynamische Inhalte", "Mehrsprachige Inhalte", "Redaktionsrollen"],
  Automatisierung: ["E-Mail-Automationen", "CRM-Workflows", "Kalender-Automation", "API-Verbindungen", "Zapier / Make / n8n"],
  Erweitert: ["Benutzerkonten", "Kundenportal", "Mitgliederbereich", "Rollen & Rechte", "Dashboard", "Datenbank", "Externe APIs", "Individuelle Rechner / Tools"],
};

function useTheme() {
  const initial = useMemo(() => {
    const saved = localStorage.getItem("centofai-theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);
  const [theme, setTheme] = useState<"light" | "dark">(initial);
  const toggle = () => { const n = theme === "dark" ? "light" : "dark"; setTheme(n); localStorage.setItem("centofai-theme", n); };
  return { theme, toggle };
}

function ThemePreview({ variant }: { variant: string }) {
  return <div className={`ww-theme-preview ${variant}`}><div className="preview-nav"/><div className="preview-title"/><div className="preview-title small"/><div className="preview-btn"/><div className="preview-blocks"><i/><i/><i/><i/></div></div>;
}

export default function WebsiteProjectWizard() {
  const [location, setLocation] = useLocation();
  const lang: Lang = location.startsWith("/en") ? "en" : "de";
  const t = c[lang];
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
      const specific = JSON.parse(localStorage.getItem("centofai-website-draft") || "null");
      setDraft((d) => ({ ...d, ...(specific || {}), company: specific?.company || generic?.company || d.company, projectTitle: specific?.projectTitle || generic?.projectTitle || d.projectTitle, description: specific?.description || generic?.description || d.description, contactName: specific?.contactName || generic?.fullName || d.contactName, email: specific?.email || generic?.email || d.email, timeline: specific?.timeline || generic?.timeline || d.timeline, budget: specific?.budget || generic?.budget || d.budget }));
    } catch { /* ignore malformed local draft */ }
  }, []);

  const saveDraft = () => {
    localStorage.setItem("centofai-website-draft", JSON.stringify({ ...draft, updatedAt: new Date().toISOString(), lang }));
    setSaved(true); window.setTimeout(() => setSaved(false), 1800);
  };
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const toggleArray = (key: "tone" | "content" | "functions", value: string) => setDraft((d) => ({ ...d, [key]: d[key].includes(value) ? d[key].filter((x) => x !== value) : [...d[key], value] }));
  const recommend = () => setDraft((d) => ({ ...d, content: ["Hero", "Über uns", "Leistungen", "Portfolio / Referenzen", "Testimonials", "FAQ", "Kontakt", "Footer CTA"], functions: ["Kontaktformular", "Mehrsprachigkeit", "Cookie-Banner", "SEO-Grundlage", "Analytics / Tracking", "Bewertungen / Testimonials", "Lead-Formular"], tone: ["Professionell", "Modern", "Vertrauensvoll"] }));
  const title = t[`step${step}` as keyof typeof t] as readonly [string, string];

  const goNext = () => { saveDraft(); if (step < 5) setStep((step + 1) as Step); };
  const goBack = () => { if (step === 1) setLocation(base.replace(/\/website$/, "")); else setStep((step - 1) as Step); };

  const summaryRows = [
    [lang === "de" ? "Projektart" : "Project type", "Website", 1],
    [lang === "de" ? "Gewähltes Theme" : "Selected theme", draft.theme, 2],
    [lang === "de" ? "Inhalte" : "Content", draft.content, 3],
    [lang === "de" ? "Funktionen" : "Functions", draft.functions, 4],
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
          {t.labels.map((label, i) => <div key={label} style={{display:"contents"}}><button className={`ww-progress-item ${step === i+1 ? "active" : step > i+1 ? "done" : ""}`} onClick={() => setStep((i+1) as Step)}><span>{step > i+1 ? <Check size={14}/> : i+1}</span>{label}</button>{i<4&&<b className="ww-progress-sep">›</b>}</div>)}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><button className="ps-icon-btn" onClick={toggle}>{theme === "dark" ? <Sun size={17}/> : <Moon size={17}/>}</button><button className="ww-save" onClick={saveDraft}><Bookmark size={15}/><span>{saved ? t.saved : t.save}</span></button></div>
      </header>

      <div className="ww-shell ww-layout">
        <main className="ww-main">
          <div className="ww-topline"><button className="ww-back" onClick={goBack}><ArrowLeft size={16}/>{t.back}</button><span className="ww-step-pill">{t.step} {step} {t.of}</span><span className="ww-project-pill"><Globe2 size={14}/>{t.project}<CheckCircle2 size={14}/></span></div>
          <div className="ww-mobile-progress">{step}/5 · {t.labels[step-1]}</div>
          <h1 className="ww-title">{title[0]}</h1><p className="ww-subtitle">{title[1]}</p>

          {step === 1 && <div className="ww-grid2">
            <section className="ww-card"><h3 className="ww-section-title">{lang === "de" ? "Projekt & Unternehmen" : "Project & company"}</h3>
              <label className="ww-label"><span>{lang === "de" ? "Unternehmen / Projekt" : "Company / project"}</span><input className="ww-input" value={draft.company} onChange={e=>set("company",e.target.value)} placeholder={lang === "de" ? "Name des Unternehmens oder Projekts" : "Company or project name"}/></label>
              <label className="ww-label"><span>{lang === "de" ? "Projekttitel" : "Project title"}</span><input className="ww-input" value={draft.projectTitle} onChange={e=>set("projectTitle",e.target.value)} /></label>
              <label className="ww-label"><span>{lang === "de" ? "Beschreibe dein Unternehmen / Projekt" : "Describe your company / project"}</span><textarea className="ww-textarea" rows={5} value={draft.description} onChange={e=>set("description",e.target.value)} /></label>
              <label className="ww-label"><span>{lang === "de" ? "Wichtige Botschaften / USP" : "Key messages / USP"}</span><textarea className="ww-textarea" rows={3} value={draft.usp} onChange={e=>set("usp",e.target.value)} /></label>
            </section>
            <section className="ww-card"><h3 className="ww-section-title">{lang === "de" ? "Zielgruppe & Rahmen" : "Audience & scope"}</h3>
              <label className="ww-label"><span>{lang === "de" ? "Zielgruppe" : "Target audience"}</span><input className="ww-input" value={draft.targetAudience} onChange={e=>set("targetAudience",e.target.value)} /></label>
              <label className="ww-label"><span>{lang === "de" ? "Zeitrahmen" : "Timeline"}</span><input className="ww-input" value={draft.timeline} onChange={e=>set("timeline",e.target.value)} placeholder="4–8 Wochen / weeks"/></label>
              <label className="ww-label"><span>Budget</span><input className="ww-input" value={draft.budget} onChange={e=>set("budget",e.target.value)} placeholder="5.000–10.000"/></label>
              <label className="ww-label"><span>{lang === "de" ? "Kontaktperson" : "Contact person"}</span><input className="ww-input" value={draft.contactName} onChange={e=>set("contactName",e.target.value)} /></label>
              <label className="ww-label"><span>E-Mail</span><input className="ww-input" type="email" value={draft.email} onChange={e=>set("email",e.target.value)} /></label>
              <label className="ww-label"><span>{lang === "de" ? "Telefon (optional)" : "Phone (optional)"}</span><input className="ww-input" value={draft.phone} onChange={e=>set("phone",e.target.value)} /></label>
            </section>
          </div>}

          {step === 2 && <>
            <div className="ww-theme-tabs">{["Business","Personal Brand","Arztpraxis","Startup","E-Commerce","Portfolio"].map(x=><button key={x} className={`ww-chip ${draft.themeCategory===x?"selected":""}`} onClick={()=>set("themeCategory",x)}>{x}</button>)}</div>
            <div className="ww-theme-grid">{themes.map(([name,cat,desc,variant])=><article key={name} className={`ww-theme-card ${draft.theme===name?"selected":""}`} onClick={()=>{set("theme",name);set("themeCategory",cat)}}><ThemePreview variant={variant}/><div className="ww-theme-meta"><strong>{name}</strong><small>{desc}</small><button>{draft.theme===name ? (lang === "de" ? "Ausgewählt" : "Selected") : (lang === "de" ? "Theme auswählen" : "Choose theme")} →</button></div>{draft.theme===name&&<span className="ps-check"><Check size={13}/></span>}</article>)}</div>
          </>}

          {step === 3 && <>
            <h3 className="ww-section-title">1. {lang === "de" ? "Wähle die Inhalte deiner Website" : "Choose your website content"}</h3>
            <div className="ww-content-grid">{contents.map(([name,sub])=><button key={name} className={`ww-select-card ${draft.content.includes(name)?"selected":""}`} onClick={()=>toggleArray("content",name)}><LayoutTemplate size={18}/><span><strong>{name}</strong><small>{sub}</small></span>{draft.content.includes(name)&&<Check size={14} className="tick"/>}</button>)}</div>
            <button className="ww-card" style={{width:"100%",marginTop:12,textAlign:"left",display:"flex",alignItems:"center",gap:14,cursor:"pointer"}} onClick={recommend}><WandSparkles size={20}/><span><strong>{t.recommendation}</strong><small style={{display:"block",color:"var(--p-muted)",marginTop:4}}>{t.recommendationSub}</small></span><ArrowRight style={{marginLeft:"auto"}} size={18}/></button>
            <div className="ww-info-grid"><section className="ww-card"><h3 className="ww-section-title">2. {lang === "de" ? "Gib uns mehr Informationen" : "Tell us more"}</h3><label className="ww-label"><span>{lang === "de" ? "Zielgruppe" : "Target audience"}</span><input className="ww-input" value={draft.targetAudience} onChange={e=>set("targetAudience",e.target.value)}/></label><div className="ww-choice-row">{["Professionell","Modern","Elegant","Vertrauensvoll"].map(x=><button key={x} className={`ww-chip ${draft.tone.includes(x)?"selected":""}`} onClick={()=>toggleArray("tone",x)}>{x}</button>)}</div><label className="ww-label" style={{marginTop:14}}><span>{lang === "de" ? "Sprache" : "Language"}</span><input className="ww-input" value={draft.language} onChange={e=>set("language",e.target.value)}/></label></section>
              <section className="ww-card"><h3 className="ww-section-title">3. {lang === "de" ? "Inhalte & Materialien hochladen" : "Upload content & materials"}</h3><div className="ww-upload"><Upload size={26}/><strong style={{display:"block",marginTop:8}}>{lang === "de" ? "Texte, PDFs, Bilder oder Briefing hochladen" : "Upload copy, PDFs, images or briefing"}</strong><small>PDF, DOCX, PPTX, PNG, JPG · max. 20 MB</small><input type="file" multiple onChange={e=>set("files",Array.from(e.target.files||[]).map(f=>f.name))}/></div><label className="ww-label" style={{marginTop:14}}><span>4. {lang === "de" ? "Bestehende Websites & Inspiration" : "Existing websites & inspiration"}</span><textarea className="ww-textarea" rows={3} value={draft.inspirations} onChange={e=>set("inspirations",e.target.value)} placeholder="https://..."/></label></section></div>
          </>}

          {step === 4 && <>
            <button className="ww-card" style={{width:"100%",textAlign:"left",display:"flex",alignItems:"center",gap:14,cursor:"pointer"}} onClick={recommend}><Sparkles size={20}/><span><strong>{t.recommendation}</strong><small style={{display:"block",color:"var(--p-muted)",marginTop:4}}>{t.recommendationSub}</small></span><span className="ww-chip selected" style={{marginLeft:"auto"}}>{lang === "de" ? "Empfehlungen erhalten" : "Get recommendations"}</span></button>
            <div className="ww-feature-tabs">{Object.keys(featureGroups).map(x=><button key={x} className={`ww-feature-tab ${featureTab===x?"active":""}`} onClick={()=>setFeatureTab(x)}>{x}</button>)}</div>
            <div className="ww-feature-grid">{featureGroups[featureTab].map(name=><button key={name} className={`ww-select-card ${draft.functions.includes(name)?"selected":""}`} onClick={()=>toggleArray("functions",name)}><ListChecks size={17}/><span><strong>{name}</strong><small>{lang === "de" ? "Für dein Projekt aktivieren" : "Enable for your project"}</small></span>{draft.functions.includes(name)&&<Check size={14} className="tick"/>}</button>)}</div>
            <label className="ww-label ww-card" style={{marginTop:14}}><span>{lang === "de" ? "Besondere Anforderungen (optional)" : "Special requirements (optional)"}</span><textarea className="ww-textarea" rows={4} value={draft.specialRequirements} onChange={e=>set("specialRequirements",e.target.value)} placeholder={lang === "de" ? "z. B. Rollen, API-Anbindung, individuelle Berechnungen …" : "e.g. roles, API integration, custom calculations …"}/></label>
          </>}

          {step === 5 && <>
            <div className="ww-review-list">{summaryRows.map(([label,value,target])=><div className="ww-review-row" key={label}><strong><FileText size={16}/>{label}</strong><div className="value">{Array.isArray(value) ? value.map(x=><span className="tag" key={x}>{x}</span>) : <span>{value}</span>}</div><button className="ww-edit" onClick={()=>setStep(target as Step)}><Pencil size={13}/> {lang === "de" ? "Bearbeiten" : "Edit"}</button></div>)}</div>
            <label className="ww-consent-card"><input type="checkbox" required/><span>{lang === "de" ? "Ich habe die Angaben geprüft und bestätige, dass sie korrekt sind. Ich stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden." : "I have reviewed the information and confirm it is correct. I agree that my data may be used to process my request."}</span></label>
            {prepared&&<div className="ww-success">{t.frontendReady}</div>}
          </>}

          <div className="ww-footer-strip"><button className="ww-secondary" onClick={goBack}>{t.back}</button>{step<5?<button className="ww-primary" onClick={goNext}>{t.next}<ArrowRight size={16}/></button>:<button className="ww-primary" onClick={()=>{saveDraft();setPrepared(true)}}>{t.finish}<ArrowRight size={16}/></button>}</div>
        </main>

        <aside className="ww-aside">
          <h3><span className="ww-aside-icon"><Sparkles size={19}/></span>{t.selection}</h3>
          <div className="ww-aside-row"><span className="ww-aside-icon"><Globe2 size={17}/></span><div><small>{lang === "de" ? "Projektart" : "Project type"}</small><strong>Website</strong></div><CheckCircle2 size={16} color="#1fd0bd"/></div>
          <div className="ww-aside-row"><span className="ww-aside-icon"><Palette size={17}/></span><div><small>{lang === "de" ? "Gewähltes Theme" : "Selected theme"}</small><strong>{draft.theme}</strong></div>{step>1&&<CheckCircle2 size={16} color="#1fd0bd"/>}</div>
          <div className="ww-aside-row"><span className="ww-aside-icon"><LayoutTemplate size={17}/></span><div><small>{lang === "de" ? "Inhalte" : "Content"}</small><strong>{draft.content.length} {lang === "de" ? "ausgewählt" : "selected"}</strong></div>{step>2&&<CheckCircle2 size={16} color="#1fd0bd"/>}</div>
          <div className="ww-aside-row"><span className="ww-aside-icon"><ListChecks size={17}/></span><div><small>{lang === "de" ? "Funktionen" : "Functions"}</small><strong>{draft.functions.length} {lang === "de" ? "ausgewählt" : "selected"}</strong></div>{step>3&&<CheckCircle2 size={16} color="#1fd0bd"/>}</div>
          <div className="ww-aside-row"><span className="ww-aside-icon"><UserRound size={17}/></span><div><small>{lang === "de" ? "Sprache" : "Language"}</small><strong>{draft.language}</strong></div><CheckCircle2 size={16} color="#1fd0bd"/></div>
          {step<5&&<button className="ww-primary" onClick={goNext}>{t.next}<ArrowRight size={16}/></button>}
          <p className="ww-aside-note"><Info size={15}/>{lang === "de" ? "Alle Angaben werden als Entwurf lokal gespeichert und können jederzeit geändert werden." : "All information is saved locally as a draft and can be changed at any time."}</p>
        </aside>
      </div>
    </div>
  );
}
