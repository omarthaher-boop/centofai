import { Link, useLocation } from "wouter";
import { ArrowRight, Check, Moon, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import "./approved-company.css";

type Kind = "home"|"services"|"websites"|"apps"|"tools"|"process"|"products";
type Lang = "de"|"en";

const copy = {
 de:{nav:{services:"Leistungen",products:"Produkte",about:"Über uns",projects:"Projekte",contact:"Kontakt",start:"Projekt starten"},
 home:{eyebrow:"CENTOFAI",title:["Websites, Apps & KI-Tools.","Mit KI gebaut.","Von Menschen perfektioniert."],lead:"Wir entwickeln professionelle Websites, mobile Apps und KI-gestützte Tools – klar geplant, modern umgesetzt und menschlich geprüft."},
 services:{eyebrow:"LEISTUNGEN",title:["Digitale Lösungen,","die wirklich funktionieren."],lead:"Von professionellen Websites und mobilen Apps bis zu KI-Tools und Automatisierungen für reale Arbeitsabläufe."},
 process:{eyebrow:"UNSERE ARBEITSWEISE",title:["Vom Problem zur","funktionierenden","digitalen Lösung."],lead:"Wir verbinden eine klare Produktstrategie, professionelle Gestaltung, KI-gestützte Entwicklung und menschliche Qualitätskontrolle zu einem nachvollziehbaren Projektablauf."},
 products:{eyebrow:"PRODUKTE VON CENTOFAI",title:["Digitale Produkte,","die Arbeit und Alltag","einfacher machen."],lead:"Wir entwickeln eigene digitale Produkte für konkrete Probleme – intuitiv, zuverlässig und mit einer erweiterbaren technischen Grundlage."},
 websites:{eyebrow:"WEBSITE-ENTWICKLUNG",title:["Professionelle Websites","für Unternehmen und Personen."],lead:"Individuelles Design, responsive Umsetzung, Mehrsprachigkeit, SEO-Grundlage und erweiterbare Funktionen."},
 apps:{eyebrow:"MOBILE APPS",title:["Apps für iOS und Android.","Vom Konzept bis zum Store."],lead:"Moderne mobile Produkte mit klarer Nutzerführung, stabiler Architektur und sauberem Publishing-Prozess."},
 tools:{eyebrow:"KI-TOOLS & AUTOMATISIERUNG",title:["KI dort einsetzen,","wo sie wirklich hilft."],lead:"Wir verbinden Daten, Trigger, Integrationen und Aktionen zu kontrollierten, verständlichen Automatisierungen."}},
 en:{nav:{services:"Services",products:"Products",about:"About us",projects:"Projects",contact:"Contact",start:"Start a project"},
 home:{eyebrow:"CENTOFAI",title:["Websites, Apps & AI Tools.","Built with AI.","Perfected by people."],lead:"We build professional websites, mobile apps and AI-powered tools – clearly planned, modern in execution and human reviewed."},
 services:{eyebrow:"SERVICES",title:["Digital solutions","that actually work."],lead:"From professional websites and mobile apps to AI tools and automation for real workflows."},
 process:{eyebrow:"HOW WE WORK",title:["From problem to a","working","digital solution."],lead:"We combine clear product strategy, professional design, AI-assisted development and human quality control in a transparent project process."},
 products:{eyebrow:"PRODUCTS BY CENTOFAI",title:["Digital products","that simplify work","and everyday life."],lead:"We build our own digital products for concrete problems – intuitive, reliable and designed on an extensible technical foundation."},
 websites:{eyebrow:"WEBSITE DEVELOPMENT",title:["Professional websites","for businesses and people."],lead:"Custom design, responsive implementation, multilingual support, SEO foundations and extensible features."},
 apps:{eyebrow:"MOBILE APPS",title:["Apps for iOS and Android.","From concept to store."],lead:"Modern mobile products with clear UX, stable architecture and a clean publishing process."},
 tools:{eyebrow:"AI TOOLS & AUTOMATION",title:["Use AI where","it genuinely helps."],lead:"We connect data, triggers, integrations and actions into controlled, understandable automation."}}
} as const;

function useTheme(){const initial=useMemo(()=>{const s=localStorage.getItem("centofai-theme");if(s==="light"||s==="dark")return s;return matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"},[]);const[theme,setTheme]=useState<"light"|"dark">(initial as any);return{theme,toggle:()=>setTheme(v=>{const n=v==="dark"?"light":"dark";localStorage.setItem("centofai-theme",n);return n})}}

function Visual({kind,theme}:{kind:Kind;theme:"light"|"dark"}){
 if(kind==="home") return <div className="ap-hero-image home"><img src="/centofai-hero.png" alt="CentofAi – Human Clarity and AI Power"/></div>;
 if(kind==="products") return <div className="ap-hero-image"><img src={theme==="dark"?"/products-hero-dark.svg":"/products-hero-light.svg"} alt="CentofAi products"/></div>;
 if(kind==="process") return <div className="ap-process-visual"><div className="ap-core">AI<br/><span>+</span><br/>Human</div><div className="ap-panel p1">&lt;/&gt;</div><div className="ap-panel p2">↗︎</div><div className="ap-panel p3">✓<br/>✓<br/>✓</div><div className="ap-panel p4">● ● ●</div><div className="ap-panel p5">◉</div></div>;
 if(kind==="services"||kind==="tools") return <div className="ap-flow"><div className="flow-card">Trigger</div><i>→</i><div className="flow-card">Daten</div><i>→</i><div className="flow-card active">KI</div><i>→</i><div className="flow-card">Integration</div><i>→</i><div className="flow-card">Aktion</div></div>;
 if(kind==="apps") return <div className="ap-devices"><div className="phone">iOS</div><div className="phone second">Android</div></div>;
 return <div className="ap-browser"><div className="browser-top"><b></b><b></b><b></b></div><div className="browser-line big"></div><div className="browser-line"></div><div className="browser-grid"><span></span><span></span><span></span></div></div>;
}

export default function ApprovedCompanySite({kind}:{kind:Kind}){
 const[location]=useLocation(); const lang:Lang=location.startsWith("/en")?"en":"de"; const c=(copy as any)[lang]; const page=c[kind]; const {theme,toggle}=useTheme(); const base=lang==="de"?"/de":"/en"; const start=lang==="de"?"/de/projekt-starten":"/en/start-a-project";
 const navProducts=lang==="de"?"/de/produkte":"/en/products"; const navServices=lang==="de"?"/de/leistungen":"/en/services"; const navProcess=lang==="de"?"/de/arbeitsweise":"/en/how-we-work";
 return <div className={`approved-site ${theme}`}>
  <header className="ap-header"><Link href={base} className="ap-logo">centof<span>.ai</span></Link><nav><Link href={navServices}>{c.nav.services}</Link><Link href={navProducts}>{c.nav.products}</Link><Link href={navProcess}>{c.nav.about}</Link><Link href={navProcess}>{c.nav.projects}</Link><Link href={start}>{c.nav.contact}</Link></nav><div className="ap-actions"><button onClick={toggle} aria-label="Theme">{theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}</button><Link className="ap-lang" href={lang==="de"?location.replace(/^\/de/,"/en").replace("leistungen","services").replace("arbeitsweise","how-we-work").replace("produkte","products"):location.replace(/^\/en/,"/de").replace("services","leistungen").replace("how-we-work","arbeitsweise").replace("products","produkte")}>{lang==="de"?"EN":"DE"}</Link><Link className="ap-start" href={start}>{c.nav.start}</Link></div></header>
  <main>
   <section className={`ap-hero ${kind}`}><div className="ap-copy"><div className="ap-eyebrow">{page.eyebrow}</div><h1>{page.title.map((x:string,i:number)=><span key={x} className={i===1?"gradient":""}>{x}</span>)}</h1><p>{page.lead}</p><div className="ap-cta"><Link href={start} className="ap-primary">{c.nav.start}<ArrowRight size={18}/></Link>{kind==="home"&&<Link href={navServices} className="ap-secondary">{c.nav.services}</Link>}</div>{kind==="process"&&<div className="ap-badges"><span><Check/> {lang==="de"?"Klare Projektphasen":"Clear project phases"}</span><span><Check/> {lang==="de"?"Regelmäßige Zwischenstände":"Regular progress updates"}</span><span><Check/> {lang==="de"?"Menschlich geprüft":"Human reviewed"}</span></div>}</div><Visual kind={kind} theme={theme}/></section>
   {(kind==="home"||kind==="services")&&<section className="ap-section"><div className="ap-section-head"><small>{lang==="de"?"WAS WIR ENTWICKELN":"WHAT WE BUILD"}</small><h2>{lang==="de"?"Drei Bereiche. Eine gemeinsame technische Grundlage.":"Three areas. One shared technical foundation."}</h2></div><div className="ap-cards"><Link href={lang==="de"?"/de/leistungen/websites":"/en/services/websites"}><b>01</b><h3>Websites</h3><p>{lang==="de"?"Professionelle, individuelle und erweiterbare Websites.":"Professional, custom and extensible websites."}</p></Link><Link href={lang==="de"?"/de/leistungen/mobile-apps":"/en/services/mobile-apps"}><b>02</b><h3>Mobile Apps</h3><p>{lang==="de"?"iOS- und Android-Produkte mit klarer UX.":"iOS and Android products with clear UX."}</p></Link><Link href={lang==="de"?"/de/leistungen/digitale-tools":"/en/services/digital-tools"}><b>03</b><h3>{lang==="de"?"KI-Tools":"AI Tools"}</h3><p>{lang==="de"?"Automatisierung, Assistenten und individuelle digitale Tools.":"Automation, assistants and custom digital tools."}</p></Link></div></section>}
   {kind==="products"&&<section className="ap-section"><div className="ap-section-head"><small>{lang==="de"?"UNSERE PRODUKTE":"OUR PRODUCTS"}</small><h2>{lang==="de"?"Für echte Probleme gebaut.":"Built for real problems."}</h2></div><Link className="ap-product" href={lang==="de"?"/de/produkte/fahrtdoc":"/en/products/fahrtdoc"}><div><small>CENTOF.AI PRODUCT</small><h2>FahrtDoc</h2><p>{lang==="de"?"Fahrten einfach erfassen, dokumentieren und professionell exportieren.":"Track, document and professionally export trips."}</p></div><ArrowRight/></Link></section>}
  </main>
  <footer className="ap-footer"><div className="ap-logo">centof<span>.ai</span></div><p>© 2026 CentofAi</p></footer>
 </div>
}