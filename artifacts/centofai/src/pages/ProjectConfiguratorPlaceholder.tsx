import { ArrowLeft, Bot, Smartphone, Sparkles } from "lucide-react";
import { Link, useLocation } from "wouter";
import "./project.css";

export default function ProjectConfiguratorPlaceholder() {
  const [location] = useLocation();
  const lang = location.startsWith("/en") ? "en" : "de";
  const ai = location.includes("ai-tool") || location.includes("ki-tool");
  const base = lang === "de" ? "/de/projekt-starten" : "/en/start-a-project";
  const title = ai ? (lang === "de" ? "KI-Tool-Konfigurator" : "AI Tool Configurator") : (lang === "de" ? "App-Konfigurator" : "App Configurator");
  const text = lang === "de" ? "Diese Projektstrecke wird als nächste Phase auf derselben technischen Grundlage aufgebaut. Deine bisherige Projektauswahl bleibt gespeichert." : "This project flow will be built in the next phase on the same technical foundation. Your previous project selection remains saved.";
  return <div className="website-wizard dark"><div className="ww-shell" style={{minHeight:"100vh",display:"grid",placeItems:"center"}}><section className="ww-aside" style={{position:"static",width:"min(620px,100%)",textAlign:"center"}}><div className="ww-aside-icon" style={{margin:"0 auto 18px",width:60,height:60}}>{ai?<Bot size={28}/>:<Smartphone size={28}/>}</div><h1 style={{fontSize:36,margin:"0 0 12px"}}>{title}</h1><p style={{color:"#a7afc8",lineHeight:1.7}}>{text}</p><div style={{display:"flex",justifyContent:"center",gap:10,marginTop:24}}><Link href={base} className="ww-secondary" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:8}}><ArrowLeft size={16}/>{lang === "de" ? "Projektart ändern" : "Change project type"}</Link><span className="ww-chip selected"><Sparkles size={14}/>{lang === "de" ? "Nächste Phase" : "Next phase"}</span></div></section></div></div>;
}
