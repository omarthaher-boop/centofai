import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, ArrowRight, Bot, Bookmark, Check, CheckCircle2, Database,
  FileText, Globe2, Info, LayoutTemplate, Moon, Palette, Pencil, PlugZap,
  Smartphone, Sparkles, Sun, Upload, UserRound, Workflow,
} from "lucide-react";
import { projectSubmitErrorMessage, submitProjectRequest, type ProjectKind } from "../lib/projectSubmit";
import "./project.css";

type Lang = "de" | "en";
type Step = 1 | 2 | 3 | 4 | 5;

type Draft = {
  company: string;
  projectTitle: string;
  description: string;
  targetAudience: string;
  timeline: string;
  budget: string;
  contactName: string;
  email: string;
  phone: string;
  primary: string;
  secondary: string[];
  content: string[];
  features: string[];
  integrations: string[];
  security: string[];
  notes: string;
  inspirations: string;
  fileNames: string[];
};

const defaults: Record<ProjectKind, Draft> = {
  website: {
    company: "", projectTitle: "", description: "", targetAudience: "", timeline: "", budget: "", contactName: "", email: "", phone: "",
    primary: "Corporate Clean", secondary: ["Modern", "Professionell"],
    content: ["Hero", "Leistungen", "Über uns", "Kontakt"],
    features: ["Kontaktformular", "Mehrsprachigkeit", "SEO-Grundlage", "Cookie-Banner"], integrations: [], security: [], notes: "", inspirations: "", fileNames: [],
  },
  app: {
    company: "", projectTitle: "", description: "", targetAudience: "", timeline: "", budget: "", contactName: "", email: "", phone: "",
    primary: "iOS + Android", secondary: ["Native-feeling Cross-Platform", "Modern", "Professionell"],
    content: ["Onboarding", "Login / Registrierung", "Start / Dashboard", "Profil", "Einstellungen"],
    features: ["Login / Registrierung", "Push-Benachrichtigungen", "Analytics"], integrations: [], security: [], notes: "", inspirations: "", fileNames: [],
  },
  ai: {
    company: "", projectTitle: "", description: "", targetAudience: "", timeline: "", budget: "", contactName: "", email: "", phone: "",
    primary: "KI-Assistent", secondary: ["Text verstehen & generieren"],
    content: ["Dokumente / PDFs"], features: ["Trigger → Aktion"], integrations: ["E-Mail"], security: ["Rollen & Rechte"], notes: "", inspirations: "", fileNames: [],
  },
};

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

const bilingual = (lang: Lang, de: string, en: string) => lang === "de" ? de : en;

function config(type: ProjectKind, lang: Lang) {
  if (type === "website") return {
    icon: Globe2,
    project: bilingual(lang, "Website", "Website"),
    labels: [bilingual(lang,"Projektinfo","Project info"), bilingual(lang,"Theme","Theme"), bilingual(lang,"Inhalte","Content"), bilingual(lang,"Funktionen","Functions"), bilingual(lang,"Abschluss","Review")],
    titles: [
      [bilingual(lang,"Erzähl uns von deinem Website-Projekt","Tell us about your website project"), bilingual(lang,"Die wichtigsten Eckdaten bilden die Grundlage für Design und technische Umsetzung.","The key details form the basis for design and technical implementation.")],
      [bilingual(lang,"Wähle dein Website-Theme","Choose your website theme"), bilingual(lang,"Wähle einen visuellen Ausgangspunkt. Das Design wird später individuell angepasst.","Choose a visual starting point. The design will later be customized.")],
      [bilingual(lang,"Plane Inhalte und Materialien","Plan content and materials"), bilingual(lang,"Wähle Bereiche, ergänze Inspirationen und lade vorhandene Unterlagen hoch.","Choose sections, add inspiration and upload existing material.")],
      [bilingual(lang,"Wähle deine Website-Funktionen","Choose your website functions"), bilingual(lang,"Aktiviere Funktionen und Integrationen, die dein Projekt benötigt.","Enable functions and integrations your project needs.")],
      [bilingual(lang,"Prüfe und sende deine Anfrage","Review and send your request"), bilingual(lang,"Kontrolliere die Zusammenfassung und sende sie direkt an CentofAi.","Review the summary and send it directly to CentofAi.")],
    ],
    primaryOptions: ["Corporate Clean", "Personal Expert", "Medical Premium", "Startup Vision", "Shop Flow", "Creative Portfolio"],
    secondaryOptions: lang === "de" ? ["Modern","Professionell","Elegant","Minimalistisch","Premium","Vertrauensvoll"] : ["Modern","Professional","Elegant","Minimal","Premium","Trustworthy"],
    contentOptions: lang === "de" ? ["Hero","Über uns","Leistungen","Team","Portfolio / Referenzen","Testimonials","Preise","FAQ","Blog / News","Galerie","Kontakt","Footer CTA"] : ["Hero","About","Services","Team","Portfolio / Work","Testimonials","Pricing","FAQ","Blog / News","Gallery","Contact","Footer CTA"],
    featureOptions: lang === "de" ? ["Kontaktformular","Terminbuchung","Mehrsprachigkeit","Cookie-Banner","SEO-Grundlage","Analytics","Newsletter","Live-Chat / WhatsApp","Online-Shop","Zahlungen","CMS / Blog","Benutzerkonten","Kundenportal","Admin-Dashboard"] : ["Contact form","Appointment booking","Multilingual","Cookie banner","SEO foundation","Analytics","Newsletter","Live chat / WhatsApp","Online shop","Payments","CMS / Blog","User accounts","Customer portal","Admin dashboard"],
    integrations: ["CRM", "Google Maps", "Calendly / Calendar", "Stripe", "PayPal", "Supabase", "Firebase", "REST / GraphQL API", "Zapier / Make / n8n"],
    security: [],
  };

  if (type === "app") return {
    icon: Smartphone,
    project: bilingual(lang,"Mobile App","Mobile App"),
    labels: [bilingual(lang,"Projektinfo","Project info"), bilingual(lang,"Plattform & Design","Platform & design"), bilingual(lang,"Screens & Inhalte","Screens & content"), bilingual(lang,"Funktionen","Functions"), bilingual(lang,"Abschluss","Review")],
    titles: [
      [bilingual(lang,"Erzähl uns von deiner App-Idee","Tell us about your app idea"), bilingual(lang,"Definiere Ziel, Zielgruppe und Rahmenbedingungen.","Define the goal, audience and project constraints.")],
      [bilingual(lang,"Wähle Plattform & Design","Choose platform & design"), bilingual(lang,"Lege Zielplattform, technischen Ansatz und visuellen Stil fest.","Choose target platform, technical approach and visual style.")],
      [bilingual(lang,"Plane Screens & Materialien","Plan screens & materials"), bilingual(lang,"Wähle wichtige Ansichten und lade vorhandene Skizzen oder Briefings hoch.","Choose key views and upload sketches or briefings.")],
      [bilingual(lang,"Wähle App-Funktionen","Choose app functions"), bilingual(lang,"Aktiviere Gerätefunktionen, Business-Features und Integrationen.","Enable device capabilities, business features and integrations.")],
      [bilingual(lang,"Prüfe und sende deine App-Anfrage","Review and send your app request"), bilingual(lang,"Kontrolliere alle Angaben und sende sie direkt an CentofAi.","Review all details and send them directly to CentofAi.")],
    ],
    primaryOptions: ["iOS + Android", "iOS", "Android", "Web-App / PWA", "Tablet / iPad"],
    secondaryOptions: lang === "de" ? ["Native-feeling Cross-Platform","Native iOS / Android","PWA / Web-App","Modern","Professionell","Minimalistisch","Premium","Intuitiv"] : ["Native-feeling Cross-Platform","Native iOS / Android","PWA / Web App","Modern","Professional","Minimal","Premium","Intuitive"],
    contentOptions: lang === "de" ? ["Onboarding","Login / Registrierung","Start / Dashboard","Suche","Profil","Einstellungen","Listen / Übersicht","Detailansicht","Karte / Standort","Chat / Nachrichten","Kalender / Termine","Zahlung / Checkout","Statistiken","Dateien / Dokumente","Admin-Bereich"] : ["Onboarding","Login / registration","Home / dashboard","Search","Profile","Settings","Lists / overview","Detail view","Map / location","Chat / messages","Calendar / appointments","Payment / checkout","Statistics","Files / documents","Admin area"],
    featureOptions: lang === "de" ? ["Login / Registrierung","Benutzerprofile","Push-Benachrichtigungen","Mehrsprachigkeit","Dark Mode","GPS / Standort","Kamera","Foto-Upload","Datei-Upload","Biometrie / Face ID","QR- / Barcode-Scanner","Offline-Modus","In-App Chat","Zahlungen","Abonnements","Buchungen / Termine","Cloud-Synchronisierung","PDF / CSV Export","Hintergrundprozesse","Rollen & Rechte","Apple / Google Sign-In","KI-Assistent"] : ["Login / registration","User profiles","Push notifications","Multilingual","Dark mode","GPS / location","Camera","Photo upload","File upload","Biometrics / Face ID","QR / barcode scanner","Offline mode","In-app chat","Payments","Subscriptions","Bookings / appointments","Cloud sync","PDF / CSV export","Background processes","Roles & permissions","Apple / Google sign-in","AI assistant"],
    integrations: ["Stripe","Apple Pay","Google Pay","Supabase","Firebase","REST / GraphQL API","Google Maps","Apple Maps","Calendar","CRM","E-Mail / SMTP","AI / LLM API"],
    security: [],
  };

  return {
    icon: Bot,
    project: bilingual(lang,"KI-Tool / Automatisierung","AI Tool / Automation"),
    labels: [bilingual(lang,"Projektinfo","Project info"), bilingual(lang,"KI-Anwendungsfall","AI use case"), bilingual(lang,"Daten & Integrationen","Data & integrations"), bilingual(lang,"Automatisierung","Automation"), bilingual(lang,"Abschluss","Review")],
    titles: [
      [bilingual(lang,"Beschreibe dein KI-Projekt","Describe your AI project"), bilingual(lang,"Ziel, Nutzer und Rahmenbedingungen bilden die Grundlage.","Goals, users and constraints form the foundation.")],
      [bilingual(lang,"Wähle den KI-Anwendungsfall","Choose the AI use case"), bilingual(lang,"Definiere, welche Aufgaben die KI übernehmen soll.","Define which tasks AI should handle.")],
      [bilingual(lang,"Verbinde Daten und Systeme","Connect data and systems"), bilingual(lang,"Wähle Datenquellen, Integrationen und vorhandene Materialien.","Choose data sources, integrations and existing materials.")],
      [bilingual(lang,"Plane Automatisierung & Kontrolle","Plan automation & control"), bilingual(lang,"Kombiniere Trigger, Aktionen, Sicherheit und menschliche Freigaben.","Combine triggers, actions, security and human approvals.")],
      [bilingual(lang,"Prüfe und sende deine KI-Anfrage","Review and send your AI request"), bilingual(lang,"Kontrolliere alle Angaben und sende sie direkt an CentofAi.","Review all details and send them directly to CentofAi.")],
    ],
    primaryOptions: lang === "de" ? ["KI-Assistent","Chatbot","Dokumentenanalyse","Wissensdatenbank / RAG","E-Mail-Verarbeitung","Datenextraktion","Reporting","Content-Erstellung","Bilderkennung","Individuelle KI-Anwendung"] : ["AI assistant","Chatbot","Document analysis","Knowledge base / RAG","Email processing","Data extraction","Reporting","Content creation","Image recognition","Custom AI application"],
    secondaryOptions: lang === "de" ? ["Text verstehen & generieren","Dokumente zusammenfassen","Fragen zu eigenen Daten beantworten","Klassifizieren & priorisieren","Informationen extrahieren","Bilder analysieren","Sprache / Audio verarbeiten","Entscheidungsvorschläge erzeugen"] : ["Understand & generate text","Summarize documents","Answer questions about own data","Classify & prioritize","Extract information","Analyze images","Process speech / audio","Generate decision suggestions"],
    contentOptions: lang === "de" ? ["Dokumente / PDFs","Website / CMS","Datenbank","Excel / CSV","CRM-Daten","E-Mail-Postfach","Cloud-Speicher","Interne Wissensbasis","Externe APIs"] : ["Documents / PDFs","Website / CMS","Database","Excel / CSV","CRM data","Email inbox","Cloud storage","Internal knowledge base","External APIs"],
    featureOptions: lang === "de" ? ["Trigger → Aktion","E-Mail automatisch auswerten","Dokumente automatisch verarbeiten","Leads qualifizieren","CRM aktualisieren","Termine / Kalender steuern","Benachrichtigungen senden","Berichte automatisch erstellen","Freigabe-Workflow","Human-in-the-loop Prüfung"] : ["Trigger → action","Automatically evaluate email","Automatically process documents","Qualify leads","Update CRM","Manage appointments / calendar","Send notifications","Create reports automatically","Approval workflow","Human-in-the-loop review"],
    integrations: ["E-Mail","Google Workspace","Microsoft 365","Slack","WhatsApp","CRM","Calendar","Notion","Supabase","Firebase","Stripe","Custom API"],
    security: lang === "de" ? ["Rollen & Rechte","Audit-Log","DSGVO / Datenschutz","EU-Datenhaltung","Verschlüsselung","Freigaben durch Menschen","Keine Trainingsnutzung eigener Daten","Protokollierung kritischer Aktionen"] : ["Roles & permissions","Audit log","GDPR / privacy","EU data residency","Encryption","Human approvals","No training on own data","Logging of critical actions"],
  };
}

function ThemePreview({ name }: { name: string }) {
  const variant = name.includes("Medical") ? "medical" : name.includes("Shop") ? "shop" : name.includes("Creative") || name.includes("Personal") || name.includes("Startup") ? "darkpreview" : "";
  return <div className={`ww-theme-preview ${variant}`}><div className="preview-nav"/><div className="preview-title"/><div className="preview-title small"/><div className="preview-btn"/><div className="preview-blocks"><i/><i/><i/><i/></div></div>;
}

export default function UnifiedProjectConfigurator({ type }: { type: ProjectKind }) {
  const [location, setLocation] = useLocation();
  const lang: Lang = location.startsWith("/en") ? "en" : "de";
  const ui = config(type, lang);
  const Icon = ui.icon;
  const { theme, toggle } = useTheme();
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<Draft>(defaults[type]);
  const [files, setFiles] = useState<File[]>([]);
  const [saved, setSaved] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ requestId: string; mailDelivered: boolean } | null>(null);
  const storageKey = `centofai-${type}-project-draft-v2`;
  const base = lang === "de" ? "/de/projekt-starten" : "/en/start-a-project";

  useEffect(() => {
    try {
      const generic = JSON.parse(localStorage.getItem("centofai-project-draft") || "null");
      const current = JSON.parse(localStorage.getItem(storageKey) || "null");
      const legacyKey = type === "website" ? "centofai-website-draft" : type === "app" ? "centofai-app-draft" : "centofai-ai-draft";
      const legacy = JSON.parse(localStorage.getItem(legacyKey) || "null");
      setDraft((d) => ({
        ...d,
        ...(legacy || {}),
        ...(current || {}),
        company: current?.company || legacy?.company || generic?.company || d.company,
        projectTitle: current?.projectTitle || legacy?.projectTitle || generic?.projectTitle || d.projectTitle,
        description: current?.description || legacy?.description || legacy?.goal || generic?.description || d.description,
        contactName: current?.contactName || legacy?.contactName || generic?.fullName || d.contactName,
        email: current?.email || legacy?.email || generic?.email || d.email,
        timeline: current?.timeline || legacy?.timeline || generic?.timeline || d.timeline,
        budget: current?.budget || legacy?.budget || generic?.budget || d.budget,
      }));
    } catch { /* ignore malformed local drafts */ }
  }, [storageKey, type]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const toggleArray = (key: "secondary" | "content" | "features" | "integrations" | "security", value: string) =>
    setDraft((d) => ({ ...d, [key]: d[key].includes(value) ? d[key].filter((x) => x !== value) : [...d[key], value] }));

  const save = () => {
    localStorage.setItem(storageKey, JSON.stringify({ ...draft, projectType: type, lang, updatedAt: new Date().toISOString() }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };
  const next = () => { save(); if (step < 5) setStep((step + 1) as Step); };
  const back = () => { if (step === 1) setLocation(base); else setStep((step - 1) as Step); };

  const onFiles = (selected: FileList | null) => {
    const nextFiles = Array.from(selected || []).slice(0, 8);
    setFiles(nextFiles);
    set("fileNames", nextFiles.map((f) => f.name));
    setError("");
  };

  const submit = async () => {
    setError("");
    setResult(null);
    if (!consent || !draft.contactName.trim() || !draft.email.trim()) {
      setError(projectSubmitErrorMessage(new Error("missing_required_fields"), lang));
      return;
    }
    setSubmitting(true);
    save();
    try {
      const response = await submitProjectRequest({
        projectType: type,
        lang,
        contactName: draft.contactName,
        email: draft.email,
        company: draft.company,
        projectTitle: draft.projectTitle,
        description: draft.description,
        timeline: draft.timeline,
        budget: draft.budget,
        consent,
        files,
        summary: {
          targetAudience: draft.targetAudience,
          primarySelection: draft.primary,
          secondarySelections: draft.secondary,
          contentOrData: draft.content,
          functionsOrAutomations: draft.features,
          integrations: draft.integrations,
          security: draft.security,
          specialRequirements: draft.notes,
          inspirations: draft.inspirations,
          phone: draft.phone,
          files: draft.fileNames,
        },
      });
      setResult({ requestId: response.requestId, mailDelivered: response.mailDelivered });
      localStorage.setItem(`${storageKey}-submitted`, JSON.stringify({ requestId: response.requestId, submittedAt: new Date().toISOString() }));
    } catch (submissionError) {
      setError(projectSubmitErrorMessage(submissionError, lang));
    } finally {
      setSubmitting(false);
    }
  };

  const summaryRows: [string, string | string[], Step][] = [
    [bilingual(lang,"Projektart","Project type"), ui.project, 1],
    [bilingual(lang,"Hauptauswahl","Primary selection"), draft.primary || "—", 2],
    [bilingual(lang,"Stil / Fähigkeiten","Style / capabilities"), draft.secondary, 2],
    [type === "ai" ? bilingual(lang,"Datenquellen","Data sources") : type === "app" ? bilingual(lang,"Screens","Screens") : bilingual(lang,"Inhalte","Content"), draft.content, 3],
    [type === "ai" ? bilingual(lang,"Automatisierungen","Automations") : bilingual(lang,"Funktionen","Functions"), draft.features, 4],
    [bilingual(lang,"Integrationen","Integrations"), draft.integrations.length ? draft.integrations : ["—"], 4],
    [bilingual(lang,"Beschreibung / Ziel","Description / goal"), draft.description || "—", 1],
    ["Budget", draft.budget || "—", 1],
    [bilingual(lang,"Zeitrahmen","Timeline"), draft.timeline || "—", 1],
    [bilingual(lang,"Kontakt","Contact"), draft.contactName || "—", 1],
    ["E-Mail", draft.email || "—", 1],
    [bilingual(lang,"Dateien","Files"), draft.fileNames.length ? draft.fileNames : ["—"], 3],
  ];

  return <div className={`website-wizard ${theme}`}>
    <header className="ww-header">
      <div className="ps-logo"><span className="ps-monogram">C</span><strong>centof.ai</strong></div>
      <div className="ww-progress">{ui.labels.map((label, i) => <div key={label} style={{display:"contents"}}><button className={`ww-progress-item ${step===i+1?"active":step>i+1?"done":""}`} onClick={()=>setStep((i+1) as Step)}><span>{step>i+1?<Check size={14}/>:i+1}</span>{label}</button>{i<4&&<b className="ww-progress-sep">›</b>}</div>)}</div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}><button className="ps-icon-btn" onClick={toggle}>{theme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button><button className="ww-save" onClick={save}><Bookmark size={15}/>{saved?bilingual(lang,"Gespeichert","Saved"):bilingual(lang,"Projekt speichern","Save project")}</button></div>
    </header>

    <div className="ww-shell ww-layout">
      <main className="ww-main">
        <div className="ww-topline"><button className="ww-back" onClick={back}><ArrowLeft size={16}/>{bilingual(lang,"Zurück","Back")}</button><span className="ww-step-pill">{step}/5</span><span className="ww-project-pill"><Icon size={14}/>{ui.project}<CheckCircle2 size={14}/></span></div>
        <div className="ww-mobile-progress">{step}/5 · {ui.labels[step-1]}</div>
        <h1 className="ww-title">{ui.titles[step-1][0]}</h1><p className="ww-subtitle">{ui.titles[step-1][1]}</p>

        {step===1&&<div className="ww-grid2">
          <section className="ww-card"><h3 className="ww-section-title">{bilingual(lang,"Projekt & Ziel","Project & goal")}</h3>
            <label className="ww-label"><span>{bilingual(lang,"Unternehmen / Projekt","Company / project")}</span><input className="ww-input" value={draft.company} onChange={e=>set("company",e.target.value)}/></label>
            <label className="ww-label"><span>{bilingual(lang,"Projekttitel","Project title")}</span><input className="ww-input" value={draft.projectTitle} onChange={e=>set("projectTitle",e.target.value)}/></label>
            <label className="ww-label"><span>{bilingual(lang,"Projektbeschreibung / Ziel","Project description / goal")}</span><textarea className="ww-textarea" rows={6} value={draft.description} onChange={e=>set("description",e.target.value)}/></label>
            <label className="ww-label"><span>{bilingual(lang,"Zielgruppe / Nutzer","Target audience / users")}</span><input className="ww-input" value={draft.targetAudience} onChange={e=>set("targetAudience",e.target.value)}/></label>
          </section>
          <section className="ww-card"><h3 className="ww-section-title">{bilingual(lang,"Rahmen & Kontakt","Scope & contact")}</h3>
            <label className="ww-label"><span>{bilingual(lang,"Zeitrahmen","Timeline")}</span><input className="ww-input" value={draft.timeline} onChange={e=>set("timeline",e.target.value)} placeholder="4–8 weeks"/></label>
            <label className="ww-label"><span>Budget</span><input className="ww-input" value={draft.budget} onChange={e=>set("budget",e.target.value)}/></label>
            <label className="ww-label"><span>{bilingual(lang,"Kontaktperson","Contact person")} *</span><input className="ww-input" value={draft.contactName} onChange={e=>set("contactName",e.target.value)}/></label>
            <label className="ww-label"><span>E-Mail *</span><input className="ww-input" type="email" value={draft.email} onChange={e=>set("email",e.target.value)}/></label>
            <label className="ww-label"><span>{bilingual(lang,"Telefon (optional)","Phone (optional)")}</span><input className="ww-input" value={draft.phone} onChange={e=>set("phone",e.target.value)}/></label>
          </section>
        </div>}

        {step===2&&<>
          {type==="website" ? <div className="ww-theme-grid">{ui.primaryOptions.map(name=><article key={name} className={`ww-theme-card ${draft.primary===name?"selected":""}`} onClick={()=>set("primary",name)}><ThemePreview name={name}/><div className="ww-theme-meta"><strong>{name}</strong><small>{bilingual(lang,"Visueller Ausgangspunkt für deine Website","Visual starting point for your website")}</small><button>{draft.primary===name?bilingual(lang,"Ausgewählt","Selected"):bilingual(lang,"Theme auswählen","Choose theme")} →</button></div>{draft.primary===name&&<span className="ps-check"><Check size={13}/></span>}</article>)}</div> : <section className="ww-card"><h3 className="ww-section-title">{type==="app"?bilingual(lang,"Zielplattform","Target platform"):bilingual(lang,"KI-Anwendungsfall","AI use case")}</h3><div className="ww-choice-row">{ui.primaryOptions.map(x=><button key={x} className={`ww-chip ${draft.primary===x?"selected":""}`} onClick={()=>set("primary",x)}>{x}</button>)}</div></section>}
          <section className="ww-card" style={{marginTop:14}}><h3 className="ww-section-title">{type==="ai"?bilingual(lang,"KI-Fähigkeiten","AI capabilities"):bilingual(lang,"Stil & technischer Ansatz","Style & technical approach")}</h3><div className="ww-choice-row">{ui.secondaryOptions.map(x=><button key={x} className={`ww-chip ${draft.secondary.includes(x)?"selected":""}`} onClick={()=>toggleArray("secondary",x)}><Palette size={14}/>{x}</button>)}</div></section>
        </>}

        {step===3&&<>
          <section className="ww-card"><h3 className="ww-section-title"><LayoutTemplate size={16}/> {type==="ai"?bilingual(lang,"Datenquellen","Data sources"):type==="app"?bilingual(lang,"Screens & Ansichten","Screens & views"):bilingual(lang,"Website-Inhalte","Website content")}</h3><div className="ww-choice-row">{ui.contentOptions.map(x=><button key={x} className={`ww-chip ${draft.content.includes(x)?"selected":""}`} onClick={()=>toggleArray("content",x)}>{x}</button>)}</div></section>
          <div className="ww-grid2" style={{marginTop:14}}>
            <section className="ww-card"><h3 className="ww-section-title">{bilingual(lang,"Zusätzliche Informationen","Additional information")}</h3><textarea className="ww-textarea" rows={6} value={draft.inspirations} onChange={e=>set("inspirations",e.target.value)} placeholder={bilingual(lang,"Links, Abläufe, Inspirationen oder Hinweise …","Links, flows, inspiration or notes …")}/></section>
            <section className="ww-card"><h3 className="ww-section-title">{bilingual(lang,"Materialien hochladen","Upload materials")}</h3><label className="ps-upload"><Upload size={26}/><span><strong>{bilingual(lang,"PDFs, Dokumente, Screenshots oder Briefings","PDFs, documents, screenshots or briefings")}</strong><small>PDF, DOCX, PPTX, XLSX, CSV, PNG, JPG, WEBP · max. 10 MB/file · 20 MB total</small></span><input type="file" multiple accept=".pdf,.docx,.pptx,.xlsx,.csv,.txt,.png,.jpg,.jpeg,.webp" onChange={e=>onFiles(e.target.files)}/></label>{draft.fileNames.length>0&&<div className="ww-choice-row" style={{marginTop:12}}>{draft.fileNames.map(x=><span className="ww-chip selected" key={x}><FileText size={13}/>{x}</span>)}</div>}</section>
          </div>
        </>}

        {step===4&&<>
          <section className="ww-card"><h3 className="ww-section-title"><Workflow size={16}/> {type==="ai"?bilingual(lang,"Automatisierungen","Automations"):bilingual(lang,"Funktionen","Functions")}</h3><div className="ww-choice-row">{ui.featureOptions.map(x=><button key={x} className={`ww-chip ${draft.features.includes(x)?"selected":""}`} onClick={()=>toggleArray("features",x)}>{x}</button>)}</div></section>
          <div className="ww-grid2" style={{marginTop:14}}>
            <section className="ww-card"><h3 className="ww-section-title"><PlugZap size={16}/> {bilingual(lang,"Integrationen","Integrations")}</h3><div className="ww-choice-row">{ui.integrations.map(x=><button key={x} className={`ww-chip ${draft.integrations.includes(x)?"selected":""}`} onClick={()=>toggleArray("integrations",x)}>{x}</button>)}</div></section>
            <section className="ww-card"><h3 className="ww-section-title">{type==="ai"?bilingual(lang,"Sicherheit & Kontrolle","Security & control"):bilingual(lang,"Besondere Anforderungen","Special requirements")}</h3>{type==="ai"&&<div className="ww-choice-row" style={{marginBottom:14}}>{ui.security.map(x=><button key={x} className={`ww-chip ${draft.security.includes(x)?"selected":""}`} onClick={()=>toggleArray("security",x)}>{x}</button>)}</div>}<textarea className="ww-textarea" rows={5} value={draft.notes} onChange={e=>set("notes",e.target.value)} placeholder={bilingual(lang,"Weitere technische oder organisatorische Anforderungen …","Additional technical or organizational requirements …")}/></section>
          </div>
        </>}

        {step===5&&<>
          <div className="ww-summary">{summaryRows.map(([label,value,target])=><div className="ww-summary-row" key={label}><div className="ww-summary-label">{label}</div><div className="ww-summary-value">{Array.isArray(value)?<div className="ww-summary-tags">{value.map(v=><span key={v}>{v}</span>)}</div>:String(value)}</div><button onClick={()=>setStep(target)}><Pencil size={14}/>{bilingual(lang,"Bearbeiten","Edit")}</button></div>)}</div>
          <label className="ww-consent-card"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>{bilingual(lang,"Ich habe die Angaben geprüft und stimme zu, dass meine Daten und hochgeladenen Dateien zur Bearbeitung meiner Projektanfrage verarbeitet werden.","I have reviewed the information and agree that my data and uploaded files may be processed to handle my project request.")}</span></label>
          {error&&<div className="ww-ready" style={{borderColor:"#ef4444",color:"#ef4444"}}><Info size={18}/><span>{error}</span></div>}
          {result&&<div className="ww-ready"><CheckCircle2 size={20}/><div><strong>{bilingual(lang,"Projektanfrage erfolgreich gesendet","Project request sent successfully")}</strong><span style={{display:"block",marginTop:4}}>{bilingual(lang,"Referenznummer","Reference")}: {result.requestId}</span><span style={{display:"block",marginTop:4}}>{result.mailDelivered?bilingual(lang,"Bestätigungs-E-Mail wurde versendet.","Confirmation email was sent."):bilingual(lang,"Die Anfrage wurde gespeichert. Der E-Mail-Versand muss noch geprüft werden.","The request was saved. Email delivery still needs to be checked.")}</span></div></div>}
        </>}

        <div className="ww-footer-strip"><button className="ww-secondary" onClick={back}><ArrowLeft size={16}/>{bilingual(lang,"Zurück","Back")}</button>{step<5?<button className="ww-primary" onClick={next}>{bilingual(lang,"Weiter","Continue")}<ArrowRight size={16}/></button>:<button className="ww-primary" onClick={submit} disabled={submitting||!!result}>{submitting?bilingual(lang,"Wird gesendet …","Sending …"):result?bilingual(lang,"Gesendet","Sent"):bilingual(lang,"Projektanfrage senden","Send project request")}<ArrowRight size={16}/></button>}</div>
      </main>

      <aside className="ww-aside"><h3><Sparkles size={19}/>{bilingual(lang,"Deine Auswahl","Your selection")}</h3>
        <div className="ww-aside-row"><span className="ww-aside-icon"><Icon size={16}/></span><div><small>{bilingual(lang,"Projektart","Project type")}</small><strong>{ui.project}</strong></div><CheckCircle2 size={15}/></div>
        <div className="ww-aside-row"><span className="ww-aside-icon"><Palette size={16}/></span><div><small>{bilingual(lang,"Hauptauswahl","Primary selection")}</small><strong>{draft.primary}</strong></div><CheckCircle2 size={15}/></div>
        <div className="ww-aside-row"><span className="ww-aside-icon">{type==="ai"?<Database size={16}/>:<LayoutTemplate size={16}/>}</span><div><small>{type==="ai"?bilingual(lang,"Daten","Data"):bilingual(lang,"Inhalte","Content")}</small><strong>{draft.content.length} {bilingual(lang,"ausgewählt","selected")}</strong></div><CheckCircle2 size={15}/></div>
        <div className="ww-aside-row"><span className="ww-aside-icon"><Workflow size={16}/></span><div><small>{type==="ai"?bilingual(lang,"Automatisierungen","Automations"):bilingual(lang,"Funktionen","Functions")}</small><strong>{draft.features.length} {bilingual(lang,"ausgewählt","selected")}</strong></div><CheckCircle2 size={15}/></div>
        <div className="ww-aside-row"><span className="ww-aside-icon"><UserRound size={16}/></span><div><small>{bilingual(lang,"Kontakt","Contact")}</small><strong>{draft.contactName||"—"}</strong></div>{draft.contactName&&draft.email?<CheckCircle2 size={15}/>:null}</div>
        {step<5&&<button className="ww-aside-cta" onClick={next}>{bilingual(lang,"Weiter","Continue")}<ArrowRight size={16}/></button>}
        <p className="ww-aside-note"><Info size={15}/>{bilingual(lang,"Entwürfe werden lokal gespeichert. Erst mit „Projektanfrage senden“ werden die Daten an CentofAi übertragen.","Drafts are stored locally. Data is only sent to CentofAi when you choose “Send project request”.")}</p>
      </aside>
    </div>
  </div>;
}
