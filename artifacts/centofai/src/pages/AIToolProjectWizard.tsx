import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Bot, Bookmark, Check, CheckCircle2, Database, FileText, Moon, PlugZap, Sparkles, Sun, Workflow } from "lucide-react";
import "./project.css";

type Lang = "de" | "en";
type Step = 1 | 2 | 3 | 4 | 5;
type Draft = {
  projectType: "ai";
  company: string;
  projectTitle: string;
  goal: string;
  targetUsers: string;
  timeline: string;
  budget: string;
  contactName: string;
  email: string;
  useCases: string[];
  dataSources: string[];
  integrations: string[];
  automations: string[];
  aiCapabilities: string[];
  security: string[];
  specialRequirements: string;
};

const initialDraft: Draft = {
  projectType: "ai", company: "", projectTitle: "", goal: "", targetUsers: "", timeline: "", budget: "", contactName: "", email: "",
  useCases: ["KI-Assistent"], dataSources: ["Dokumente / PDFs"], integrations: ["E-Mail"], automations: ["Trigger → Aktion"],
  aiCapabilities: ["Text verstehen & generieren"], security: ["Rollen & Rechte"], specialRequirements: "",
};

const copy = {
  de: {
    labels:["Projektinfo","KI-Anwendungsfall","Daten & Integrationen","Automatisierung","Abschluss"],
    titles:[
      ["Beschreibe dein KI-Projekt","Ziel, Nutzer und Rahmenbedingungen bilden die Grundlage."],
      ["Wähle den KI-Anwendungsfall","Definiere, welche Aufgaben die KI für dich übernehmen soll."],
      ["Verbinde Daten & Systeme","Lege fest, welche Datenquellen und Integrationen genutzt werden."],
      ["Plane deine Automatisierungen","Kombiniere Trigger, KI-Verarbeitung und Aktionen zu einem Workflow."],
      ["Prüfe deine KI-Projektanfrage","Alle Angaben werden zusammengefasst und für die Backend-Übermittlung vorbereitet."],
    ],
    save:"Projekt speichern", back:"Zurück", next:"Weiter", finish:"Projektanfrage vorbereiten", project:"Projektart: KI-Tool / Automatisierung",
    ready:"Die Anfrage ist vollständig vorbereitet. E-Mail, Datei-Upload und serverseitige Verarbeitung werden in der Backend-Phase aktiviert.",
  },
  en: {
    labels:["Project info","AI use case","Data & integrations","Automation","Review"],
    titles:[
      ["Describe your AI project","Goals, users and constraints form the foundation."],
      ["Choose the AI use case","Define which tasks AI should handle for you."],
      ["Connect data & systems","Choose the data sources and integrations the solution should use."],
      ["Plan your automations","Combine triggers, AI processing and actions into a workflow."],
      ["Review your AI project request","All details are summarized and prepared for backend delivery."],
    ],
    save:"Save project", back:"Back", next:"Continue", finish:"Prepare project request", project:"Project type: AI Tool / Automation",
    ready:"Your request is fully prepared. Email, file upload and server-side processing will be activated in the backend phase.",
  }
} as const;

const useCases = ["KI-Assistent","Chatbot","Dokumentenanalyse","Wissensdatenbank / RAG","E-Mail-Verarbeitung","Datenextraktion","Reporting","Content-Erstellung","Bilderkennung","Individuelle KI-Anwendung"];
const capabilities = ["Text verstehen & generieren","Dokumente zusammenfassen","Fragen zu eigenen Daten beantworten","Klassifizieren & priorisieren","Informationen extrahieren","Bilder analysieren","Sprache / Audio verarbeiten","Entscheidungsvorschläge erzeugen"];
const dataSources = ["Dokumente / PDFs","Website / CMS","Datenbank","Excel / CSV","CRM-Daten","E-Mail-Postfach","Cloud-Speicher","Interne Wissensbasis","Externe APIs"];
const integrations = ["E-Mail","Google Workspace","Microsoft 365","Slack","WhatsApp","CRM","Kalender","Notion","Supabase","Firebase","Stripe","Eigene API"];
const automations = ["Trigger → Aktion","E-Mail automatisch auswerten","Dokumente automatisch verarbeiten","Leads qualifizieren","CRM aktualisieren","Termine / Kalender steuern","Benachrichtigungen senden","Berichte automatisch erstellen","Freigabe-Workflow","Human-in-the-loop Prüfung"];
const security = ["Rollen & Rechte","Audit-Log","DSGVO / Datenschutz","EU-Datenhaltung","Verschlüsselung","Freigaben durch Menschen","Keine Trainingsnutzung eigener Daten","Protokollierung kritischer Aktionen"];

function useTheme(){
  const initial=useMemo(()=>{const s=localStorage.getItem("centofai-theme");if(s==="light"||s==="dark")return s;return window.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light"},[]);
  const [theme,setTheme]=useState<"light"|"dark">(initial); const toggle=()=>{const n=theme==="dark"?"light":"dark";setTheme(n);localStorage.setItem("centofai-theme",n)}; return {theme,toggle};
}

export default function AIToolProjectWizard(){
  const [location,setLocation]=useLocation(); const lang:Lang=location.startsWith("/en")?"en":"de"; const t=copy[lang]; const {theme,toggle}=useTheme();
  const [step,setStep]=useState<Step>(1); const [draft,setDraft]=useState<Draft>(initialDraft); const [prepared,setPrepared]=useState(false); const [saved,setSaved]=useState(false);
  const base=lang==="de"?"/de/projekt-starten":"/en/start-a-project";
  useEffect(()=>{try{const generic=JSON.parse(localStorage.getItem("centofai-project-draft")||"null");const specific=JSON.parse(localStorage.getItem("centofai-ai-draft")||"null");setDraft(d=>({...d,...(specific||{}),company:specific?.company||generic?.company||d.company,projectTitle:specific?.projectTitle||generic?.projectTitle||d.projectTitle,goal:specific?.goal||generic?.description||d.goal,contactName:specific?.contactName||generic?.fullName||d.contactName,email:specific?.email||generic?.email||d.email,timeline:specific?.timeline||generic?.timeline||d.timeline,budget:specific?.budget||generic?.budget||d.budget}))}catch{}},[]);
  const set=<K extends keyof Draft>(k:K,v:Draft[K])=>setDraft(d=>({...d,[k]:v}));
  const toggleArray=(k:"useCases"|"dataSources"|"integrations"|"automations"|"aiCapabilities"|"security",v:string)=>setDraft(d=>({...d,[k]:d[k].includes(v)?d[k].filter(x=>x!==v):[...d[k],v]}));
  const save=()=>{localStorage.setItem("centofai-ai-draft",JSON.stringify({...draft,lang,updatedAt:new Date().toISOString()}));setSaved(true);setTimeout(()=>setSaved(false),1500)};
  const next=()=>{save(); if(step<5)setStep((step+1) as Step)};
  const back=()=>{if(step===1)setLocation(base);else setStep((step-1) as Step)};
  const title=t.titles[step-1];
  const summary=[
    [lang==="de"?"Projektart":"Project type","AI Tool / Automation",1],
    [lang==="de"?"Anwendungsfälle":"Use cases",draft.useCases,2],
    [lang==="de"?"KI-Fähigkeiten":"AI capabilities",draft.aiCapabilities,2],
    [lang==="de"?"Datenquellen":"Data sources",draft.dataSources,3],
    [lang==="de"?"Integrationen":"Integrations",draft.integrations,3],
    [lang==="de"?"Automatisierungen":"Automations",draft.automations,4],
    [lang==="de"?"Sicherheit":"Security",draft.security,4],
    [lang==="de"?"Ziel / Beschreibung":"Goal / description",draft.goal||"—",1],
    ["Budget",draft.budget||"—",1],[lang==="de"?"Zeitrahmen":"Timeline",draft.timeline||"—",1],["E-Mail",draft.email||"—",1]
  ] as const;

  return <div className={`website-wizard ${theme}`}>
    <header className="ww-header"><div className="ps-logo"><span className="ps-monogram">C</span><strong>centof.ai</strong></div><div className="ww-progress">{t.labels.map((l,i)=><div key={l} style={{display:"contents"}}><button className={`ww-progress-item ${step===i+1?"active":step>i+1?"done":""}`} onClick={()=>setStep((i+1) as Step)}><span>{step>i+1?<Check size={14}/>:i+1}</span>{l}</button>{i<4&&<b className="ww-progress-sep">›</b>}</div>)}</div><div style={{display:"flex",gap:8}}><button className="ps-icon-btn" onClick={toggle}>{theme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button><button className="ww-save" onClick={save}><Bookmark size={15}/>{saved?(lang==="de"?"Gespeichert":"Saved"):t.save}</button></div></header>
    <div className="ww-shell ww-layout"><main className="ww-main">
      <div className="ww-topline"><button className="ww-back" onClick={back}><ArrowLeft size={16}/>{t.back}</button><span className="ww-step-pill">{step}/5</span><span className="ww-project-pill"><Bot size={14}/>{t.project}<CheckCircle2 size={14}/></span></div>
      <h1 className="ww-title">{title[0]}</h1><p className="ww-subtitle">{title[1]}</p>
      {step===1&&<div className="ww-grid2"><section className="ww-card"><h3 className="ww-section-title">{lang==="de"?"Projekt & Ziel":"Project & goal"}</h3><label className="ww-label"><span>{lang==="de"?"Unternehmen / Projekt":"Company / project"}</span><input className="ww-input" value={draft.company} onChange={e=>set("company",e.target.value)}/></label><label className="ww-label"><span>{lang==="de"?"Projekttitel":"Project title"}</span><input className="ww-input" value={draft.projectTitle} onChange={e=>set("projectTitle",e.target.value)}/></label><label className="ww-label"><span>{lang==="de"?"Was soll die Lösung verbessern oder automatisieren?":"What should the solution improve or automate?"}</span><textarea className="ww-textarea" rows={5} value={draft.goal} onChange={e=>set("goal",e.target.value)}/></label><label className="ww-label"><span>{lang==="de"?"Zielgruppe / Nutzer":"Target users"}</span><input className="ww-input" value={draft.targetUsers} onChange={e=>set("targetUsers",e.target.value)}/></label></section><section className="ww-card"><h3 className="ww-section-title">{lang==="de"?"Rahmen & Kontakt":"Scope & contact"}</h3><label className="ww-label"><span>{lang==="de"?"Zeitrahmen":"Timeline"}</span><input className="ww-input" value={draft.timeline} onChange={e=>set("timeline",e.target.value)}/></label><label className="ww-label"><span>Budget</span><input className="ww-input" value={draft.budget} onChange={e=>set("budget",e.target.value)}/></label><label className="ww-label"><span>{lang==="de"?"Kontaktperson":"Contact"}</span><input className="ww-input" value={draft.contactName} onChange={e=>set("contactName",e.target.value)}/></label><label className="ww-label"><span>E-Mail</span><input className="ww-input" type="email" value={draft.email} onChange={e=>set("email",e.target.value)}/></label></section></div>}
      {step===2&&<><section className="ww-card"><h3 className="ww-section-title">{lang==="de"?"Anwendungsfälle":"Use cases"}</h3><div className="ww-choice-row">{useCases.map(x=><button key={x} className={`ww-chip ${draft.useCases.includes(x)?"selected":""}`} onClick={()=>toggleArray("useCases",x)}>{x}</button>)}</div></section><section className="ww-card" style={{marginTop:14}}><h3 className="ww-section-title">{lang==="de"?"Was soll die KI können?":"What should the AI do?"}</h3><div className="ww-choice-row">{capabilities.map(x=><button key={x} className={`ww-chip ${draft.aiCapabilities.includes(x)?"selected":""}`} onClick={()=>toggleArray("aiCapabilities",x)}>{x}</button>)}</div></section></>}
      {step===3&&<div className="ww-grid2"><section className="ww-card"><h3 className="ww-section-title"><Database size={16}/> {lang==="de"?"Datenquellen":"Data sources"}</h3><div className="ww-choice-row">{dataSources.map(x=><button key={x} className={`ww-chip ${draft.dataSources.includes(x)?"selected":""}`} onClick={()=>toggleArray("dataSources",x)}>{x}</button>)}</div></section><section className="ww-card"><h3 className="ww-section-title"><PlugZap size={16}/> {lang==="de"?"Integrationen":"Integrations"}</h3><div className="ww-choice-row">{integrations.map(x=><button key={x} className={`ww-chip ${draft.integrations.includes(x)?"selected":""}`} onClick={()=>toggleArray("integrations",x)}>{x}</button>)}</div></section></div>}
      {step===4&&<><section className="ww-card"><h3 className="ww-section-title"><Workflow size={16}/> {lang==="de"?"Automatisierungs-Workflows":"Automation workflows"}</h3><div className="ww-choice-row">{automations.map(x=><button key={x} className={`ww-chip ${draft.automations.includes(x)?"selected":""}`} onClick={()=>toggleArray("automations",x)}>{x}</button>)}</div></section><section className="ww-card" style={{marginTop:14}}><h3 className="ww-section-title">{lang==="de"?"Sicherheit & Kontrolle":"Security & control"}</h3><div className="ww-choice-row">{security.map(x=><button key={x} className={`ww-chip ${draft.security.includes(x)?"selected":""}`} onClick={()=>toggleArray("security",x)}>{x}</button>)}</div><label className="ww-label" style={{marginTop:18}}><span>{lang==="de"?"Besondere Anforderungen":"Special requirements"}</span><textarea className="ww-textarea" rows={4} value={draft.specialRequirements} onChange={e=>set("specialRequirements",e.target.value)}/></label></section></>}
      {step===5&&<><div className="ww-summary">{summary.map(([label,value,target])=><div className="ww-summary-row" key={String(label)}><div className="ww-summary-label"><FileText size={16}/>{label}</div><div className="ww-summary-value">{Array.isArray(value)?value.map(v=><span className="ww-tag" key={v}>{v}</span>):value}</div><button className="ww-edit" onClick={()=>setStep(target as Step)}>{lang==="de"?"Bearbeiten":"Edit"}</button></div>)}</div>{prepared&&<div className="ww-ready"><Sparkles size={18}/><span>{t.ready}</span></div>}</>}
      <div className="ww-footer-strip">{step<5?<button className="ww-primary" onClick={next}>{t.next}<ArrowRight size={17}/></button>:<button className="ww-primary" onClick={()=>{save();setPrepared(true)}}>{t.finish}<ArrowRight size={17}/></button>}</div>
    </main><aside className="ww-aside"><h3><Sparkles size={18}/>{lang==="de"?"Deine Auswahl":"Your selection"}</h3><div className="ww-aside-row"><span className="ww-aside-icon"><Bot size={16}/></span><div><small>{lang==="de"?"Projektart":"Project type"}</small><strong>KI-Tool / Automation</strong></div><CheckCircle2 size={16}/></div><div className="ww-aside-row"><span className="ww-aside-icon"><Workflow size={16}/></span><div><small>{lang==="de"?"Workflows":"Workflows"}</small><strong>{draft.automations.length}</strong></div><CheckCircle2 size={16}/></div><div className="ww-aside-row"><span className="ww-aside-icon"><Database size={16}/></span><div><small>{lang==="de"?"Datenquellen":"Data sources"}</small><strong>{draft.dataSources.length}</strong></div><CheckCircle2 size={16}/></div><div className="ww-aside-row"><span className="ww-aside-icon"><PlugZap size={16}/></span><div><small>{lang==="de"?"Integrationen":"Integrations"}</small><strong>{draft.integrations.length}</strong></div><CheckCircle2 size={16}/></div></aside></div>
  </div>;
}
