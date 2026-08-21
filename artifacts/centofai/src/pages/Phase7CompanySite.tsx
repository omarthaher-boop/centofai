import { Link, useLocation } from "wouter";
import { ArrowRight, Bot, CheckCircle2, Globe2, Moon, Smartphone, Sparkles, Sun, Workflow, ShieldCheck, Layers3, Gauge, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import "./phase7-company.css";

type Lang = "de" | "en";
type PageKind = "home" | "services" | "websites" | "apps" | "tools" | "process" | "products";

type Copy = {
  nav: { services:string; products:string; about:string; projects:string; contact:string; start:string };
  eyebrow:string; title:string; accent:string; lead:string;
};

const copy: Record<Lang, Record<PageKind, Copy>> = {
  de: {
    home:{nav:{services:"Leistungen",products:"Produkte",about:"Über uns",projects:"Projekte",contact:"Kontakt",start:"Projekt starten"},eyebrow:"CENTOFAI",title:"Websites, Apps & KI-Tools.",accent:"Mit KI gebaut. Von Menschen perfektioniert.",lead:"Wir entwickeln moderne digitale Produkte für Unternehmen und Personen – klar geplant, hochwertig gestaltet und mit menschlicher Qualitätskontrolle."},
    services:{nav:{services:"Leistungen",products:"Produkte",about:"Über uns",projects:"Projekte",contact:"Kontakt",start:"Projekt starten"},eyebrow:"UNSERE LEISTUNGEN",title:"Digitale Lösungen für echte Anforderungen.",accent:"Strategisch. Modern. Skalierbar.",lead:"Von individuellen Websites über mobile Apps bis zu KI-gestützten Tools und Automatisierungen – aus einer konsistenten technischen Grundlage."},
    websites:{nav:{services:"Leistungen",products:"Produkte",about:"Über uns",projects:"Projekte",contact:"Kontakt",start:"Projekt starten"},eyebrow:"WEBSITE-ENTWICKLUNG",title:"Websites, die professionell aussehen und funktionieren.",accent:"Design trifft klare Nutzerführung.",lead:"Individuelles Design, responsive Entwicklung, Mehrsprachigkeit, SEO-Grundlage und Funktionen, die mit deinem Projekt wachsen können."},
    apps:{nav:{services:"Leistungen",products:"Produkte",about:"Über uns",projects:"Projekte",contact:"Kontakt",start:"Projekt starten"},eyebrow:"MOBILE APPS",title:"Apps für iOS und Android.",accent:"Von der Idee bis zur Veröffentlichung.",lead:"Moderne mobile Produkte mit klarer UX, skalierbarer Architektur und einer technischen Basis für zukünftige Funktionen."},
    tools:{nav:{services:"Leistungen",products:"Produkte",about:"Über uns",projects:"Projekte",contact:"Kontakt",start:"Projekt starten"},eyebrow:"KI-TOOLS & AUTOMATISIERUNG",title:"Automatisiere Abläufe, nicht Verantwortung.",accent:"KI unterstützt. Menschen kontrollieren.",lead:"Wir verbinden Daten, Trigger, Integrationen und Aktionen zu sinnvollen digitalen Prozessen – transparent, modular und kontrollierbar."},
    process:{nav:{services:"Leistungen",products:"Produkte",about:"Über uns",projects:"Projekte",contact:"Kontakt",start:"Projekt starten"},eyebrow:"UNSERE ARBEITSWEISE",title:"Vom Problem zur funktionierenden",accent:"digitalen Lösung.",lead:"Wir verbinden eine klare Produktstrategie, professionelle Gestaltung, KI-gestützte Entwicklung und menschliche Qualitätskontrolle zu einem nachvollziehbaren Projektablauf."},
    products:{nav:{services:"Leistungen",products:"Produkte",about:"Über uns",projects:"Projekte",contact:"Kontakt",start:"Projekt starten"},eyebrow:"CENTOFAI PRODUKTE",title:"Digitale Produkte.",accent:"Einfach nützlich.",lead:"Eigene Produkte von CentofAi – für konkrete Probleme im Alltag und in Unternehmen, intuitiv gestaltet und zuverlässig umgesetzt."}
  },
  en: {
    home:{nav:{services:"Services",products:"Products",about:"About us",projects:"Projects",contact:"Contact",start:"Start a project"},eyebrow:"CENTOFAI",title:"Websites, Apps & AI Tools.",accent:"Built with AI. Perfected by people.",lead:"We build modern digital products for businesses and individuals – clearly planned, beautifully designed and human quality controlled."},
    services:{nav:{services:"Services",products:"Products",about:"About us",projects:"Projects",contact:"Contact",start:"Start a project"},eyebrow:"OUR SERVICES",title:"Digital solutions for real requirements.",accent:"Strategic. Modern. Scalable.",lead:"From custom websites and mobile apps to AI-powered tools and automation – built on one consistent technical foundation."},
    websites:{nav:{services:"Services",products:"Products",about:"About us",projects:"Projects",contact:"Contact",start:"Start a project"},eyebrow:"WEBSITE DEVELOPMENT",title:"Websites that look professional and work.",accent:"Design meets clear user journeys.",lead:"Custom design, responsive development, multilingual support, SEO foundations and features that can grow with your project."},
    apps:{nav:{services:"Services",products:"Products",about:"About us",projects:"Projects",contact:"Contact",start:"Start a project"},eyebrow:"MOBILE APPS",title:"Apps for iOS and Android.",accent:"From idea to publication.",lead:"Modern mobile products with clear UX, scalable architecture and a technical foundation for future features."},
    tools:{nav:{services:"Services",products:"Products",about:"About us",projects:"Projects",contact:"Contact",start:"Start a project"},eyebrow:"AI TOOLS & AUTOMATION",title:"Automate workflows, not responsibility.",accent:"AI supports. People stay in control.",lead:"We connect data, triggers, integrations and actions into useful digital processes – transparent, modular and controllable."},
    process:{nav:{services:"Services",products:"Products",about:"About us",projects:"Projects",contact:"Contact",start:"Start a project"},eyebrow:"HOW WE WORK",title:"From problem to a working",accent:"digital solution.",lead:"We combine clear product strategy, professional design, AI-assisted development and human quality control into a transparent project workflow."},
    products:{nav:{services:"Services",products:"Products",about:"About us",projects:"Projects",contact:"Contact",start:"Start a project"},eyebrow:"CENTOFAI PRODUCTS",title:"Digital products.",accent:"Simply useful.",lead:"Products by CentofAi – built for concrete everyday and business problems, intuitive to use and reliable in practice."}
  }
};

function themeState(){
  const initial=useMemo(()=>{ const s=localStorage.getItem("centofai-theme"); if(s==="dark"||s==="light") return s; return matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";},[]);
  const [theme,setTheme]=useState<"light"|"dark">(initial);
  const toggle=()=>setTheme(v=>{const n=v==="dark"?"light":"dark"; localStorage.setItem("centofai-theme",n); return n;});
  return {theme,toggle};
}

function Header({lang,theme,toggle,startHref}:{lang:Lang;theme:"light"|"dark";toggle:()=>void;startHref:string}){
  const t=copy[lang].home.nav; const base=lang==="de"?"/de":"/en";
  return <header className="p7-header">
    <Link href={base} className="p7-logo"><span>centof</span><b>.ai</b></Link>
    <nav className="p7-nav">
      <Link href={`${base}/${lang==="de"?"leistungen":"services"}`}>{t.services}</Link>
      <Link href={`${base}/${lang==="de"?"produkte":"products"}`}>{t.products}</Link>
      <a href="#about">{t.about}</a><a href="#projects">{t.projects}</a><a href="#contact">{t.contact}</a>
    </nav>
    <div className="p7-tools"><button onClick={toggle} aria-label="Theme">{theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}</button><Link href={lang==="de"?"/en":"/de"}>{lang==="de"?"EN":"DE"}</Link><Link href={startHref} className="p7-primary small">{t.start}</Link></div>
  </header>
}

function HeroArt({kind,theme}:{kind:PageKind;theme:"light"|"dark"}){
  if(kind==="process") return <img className="p7-art-image" src={theme==="dark"?"/process-hero-dark.svg":"/process-hero-light.svg"} alt=""/>;
  if(kind==="products") return <img className="p7-art-image" src={theme==="dark"?"/products-hero-dark.svg":"/products-hero-light.svg"} alt=""/>;
  if(kind==="home") return <div className="p7-home-art"><img src="/centofai-hero.png" alt=""/></div>;
  const Icon=kind==="apps"?Smartphone:kind==="tools"?Bot:kind==="websites"?Globe2:Workflow;
  return <div className="p7-system-art"><div className="p7-core"><Icon size={56}/></div><div className="p7-float one"><Sparkles size={25}/><span>Design</span></div><div className="p7-float two"><Workflow size={25}/><span>Build</span></div><div className="p7-float three"><CheckCircle2 size={25}/><span>Quality</span></div><i className="p7-line l1"/><i className="p7-line l2"/><i className="p7-line l3"/></div>;
}

function Cards({lang,kind}:{lang:Lang;kind:PageKind}){
  const de=lang==="de";
  if(kind==="process"){
    const steps=de?[["01","Verstehen","Ziel, Nutzer und Problem sauber definieren."],["02","Konzipieren","Struktur, Funktionen und Design gemeinsam planen."],["03","Bauen","Schnelle Entwicklung mit KI-Unterstützung und klaren Standards."],["04","Prüfen","Menschliche Qualitätskontrolle, Tests und Feinschliff."],["05","Veröffentlichen","Sauberes Deployment und kontrollierte Übergabe."]]:[["01","Understand","Define goals, users and the problem clearly."],["02","Design","Plan structure, features and visual direction."],["03","Build","Fast development with AI assistance and clear standards."],["04","Review","Human quality control, testing and refinement."],["05","Launch","Clean deployment and controlled handover."]];
    return <section className="p7-section"><div className="p7-section-head"><span>{de?"DER PROZESS":"THE PROCESS"}</span><h2>{de?"Ein klarer Weg von der Idee bis zum Produkt.":"A clear path from idea to product."}</h2></div><div className="p7-steps">{steps.map(([n,h,p])=><article key={n}><b>{n}</b><h3>{h}</h3><p>{p}</p></article>)}</div></section>;
  }
  if(kind==="products"){
    return <section className="p7-section" id="projects"><div className="p7-section-head"><span>{de?"UNSERE PRODUKTE":"OUR PRODUCTS"}</span><h2>{de?"Produkte, die konkrete Aufgaben einfacher machen.":"Products that make concrete tasks easier."}</h2></div><Link href={de?"/de/produkte/fahrtdoc":"/en/products/fahrtdoc"} className="p7-product"><div><small>{de?"VERFÜGBAR":"AVAILABLE"}</small><h3>FahrtDoc</h3><p>{de?"Fahrten automatisch erfassen, strukturiert dokumentieren und professionell exportieren.":"Track trips automatically, document them cleanly and export them professionally."}</p><div className="p7-pills"><span>iOS</span><span>Android</span><span>GPS</span><span>PDF</span></div><strong>{de?"FahrtDoc ansehen":"Explore FahrtDoc"}<ArrowRight size={18}/></strong></div><div className="p7-phone"><div>FD</div><b>FahrtDoc</b><span>42,8 km</span></div></Link></section>;
  }
  const cards=de?[[Globe2,"Websites","Individuelles Design, responsive und zweisprachig."],[Smartphone,"Mobile Apps","iOS & Android mit klarer UX und stabiler Architektur."],[Bot,"KI-Tools","Automatisierungen und Assistenten für echte Abläufe."]]:[[Globe2,"Websites","Custom design, responsive and multilingual."],[Smartphone,"Mobile Apps","iOS & Android with clear UX and stable architecture."],[Bot,"AI Tools","Automation and assistants for real workflows."]];
  return <section className="p7-section"><div className="p7-section-head"><span>{de?"WAS WIR BAUEN":"WHAT WE BUILD"}</span><h2>{de?"Professionelle digitale Produkte aus einer Hand.":"Professional digital products from one team."}</h2></div><div className="p7-card-grid">{cards.map(([Icon,h,p])=>{const C=Icon as typeof Globe2;return <article key={String(h)}><div><C size={27}/></div><h3>{String(h)}</h3><p>{String(p)}</p></article>})}</div></section>;
}

export default function Phase7CompanySite({kind}:{kind:PageKind}){
  const [location]=useLocation(); const lang:Lang=location.startsWith("/en")?"en":"de"; const {theme,toggle}=themeState(); const de=lang==="de"; const base=de?"/de":"/en"; const startHref=`${base}/${de?"projekt-starten":"start-a-project"}`; const t=copy[lang][kind];
  return <div className={`p7-site ${theme}`}>
    <section className="p7-hero"><Header lang={lang} theme={theme} toggle={toggle} startHref={startHref}/><div className="p7-hero-grid"><div className="p7-copy"><div className="p7-eyebrow"><WandSparkles size={16}/>{t.eyebrow}</div><h1>{t.title}<br/><span>{t.accent}</span></h1><p>{t.lead}</p><div className="p7-actions"><Link href={startHref} className="p7-primary">{t.nav.start}<ArrowRight size={18}/></Link><a href="#details" className="p7-secondary">{de?"Mehr erfahren":"Learn more"}</a></div>{kind==="process"&&<div className="p7-trust"><span><CheckCircle2 size={17}/>{de?"Klare Projektphasen":"Clear project phases"}</span><span><CheckCircle2 size={17}/>{de?"Regelmäßige Zwischenstände":"Regular checkpoints"}</span><span><CheckCircle2 size={17}/>{de?"Menschlich geprüft":"Human reviewed"}</span></div>}</div><div className="p7-art"><HeroArt kind={kind} theme={theme}/></div></div></section>
    <div id="details"><Cards lang={lang} kind={kind}/></div>
    <section className="p7-value" id="about"><div><span>{de?"AI + HUMAN":"AI + HUMAN"}</span><h2>{de?"KI beschleunigt. Menschen entscheiden.":"AI accelerates. People decide."}</h2><p>{de?"Wir nutzen KI dort, wo sie Geschwindigkeit und Präzision verbessert. Produktstrategie, Designentscheidungen und Qualitätskontrolle bleiben bewusst menschlich.":"We use AI where it improves speed and precision. Product strategy, design decisions and quality control remain intentionally human."}</p></div><div className="p7-value-grid"><article><ShieldCheck/><b>{de?"Kontrolliert":"Controlled"}</b></article><article><Gauge/><b>{de?"Effizient":"Efficient"}</b></article><article><Layers3/><b>{de?"Erweiterbar":"Extensible"}</b></article></div></section>
    <section className="p7-cta" id="contact"><div><span>{de?"DEIN PROJEKT":"YOUR PROJECT"}</span><h2>{de?"Aus einer Idee kann ein funktionierendes digitales Produkt werden.":"An idea can become a working digital product."}</h2></div><Link href={startHref} className="p7-primary">{t.nav.start}<ArrowRight size={18}/></Link></section>
    <footer className="p7-footer"><div className="p7-logo"><span>centof</span><b>.ai</b></div><p>© 2026 CentofAi</p></footer>
  </div>
}
