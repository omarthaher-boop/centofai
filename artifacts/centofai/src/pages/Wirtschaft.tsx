import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "../components/Navbar";

function setMeta() {
  document.title = "centof.ai — Wirtschaft";
  const desc =
    "Wir kennen die Probleme, weil wir sie selbst erlebt haben. centof.ai entwickelt digitale Lösungen aus echten Digitalisierungslücken im Unternehmeralltag.";
  let el = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "description");
    document.head.appendChild(el);
  }
  el.setAttribute("content", desc);
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("wi-in");
          }
        });
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`wi-reveal ${className}`}>
      {children}
    </div>
  );
}

const PROBLEMS: { tag: string; title: string; text: string; ch?: boolean }[] = [
  {
    tag: "01",
    title: "Bürokratiekosten, die am Kerngeschäft vorbeigehen",
    text: "Kleine und mittlere Unternehmen in Deutschland wenden im Schnitt mehrere Wochen pro Jahr allein für Melde-, Berichts- und Formularpflichten auf. Das Geld dafür fehlt exakt dort, wo es eigentlich hingehören sollte: in Produkt, Kundschaft und Wachstum.",
  },
  {
    tag: "02",
    title: "Zeitverlust durch Medienbrüche",
    text: "Rechnungen per E-Mail-PDF, Verträge auf Papier, Buchhaltung in Excel-Listen: Wo Systeme nicht miteinander sprechen, tippen Unternehmerinnen und Unternehmer dieselben Daten mehrfach ab – manuell, fehleranfällig und ohne dass daraus ein digitaler Mehrwert entsteht.",
  },
  {
    tag: "03",
    title: "Psychische Erschöpfung der Selbstständigen",
    text: "Selbstständige berichten überdurchschnittlich häufig von Erschöpfung und Überlastung – nicht durch das eigentliche Geschäft, sondern durch die parallele Rolle als eigene Buchhaltung, IT-Abteilung und Behördenkontakt in einem.",
  },
  {
    tag: "04",
    title: "Fallbeispiel Schweiz: vermeidbare Milliarden",
    text: "Studien zur administrativen Belastung von Schweizer KMU beziffern das jährlich vermeidbare Einsparpotenzial durch konsequente Digitalisierung von Verwaltungsprozessen auf mehrere Milliarden Franken – Geld, das heute in Formularen und doppelter Datenerfassung gebunden bleibt.",
    ch: true,
  },
  {
    tag: "05",
    title: "Die E-Rechnungs-Falle",
    text: "Mit der E-Rechnungspflicht für B2B-Umsätze in Deutschland wächst der Druck, Rechnungsprozesse zu digitalisieren – doch viele kleine Betriebe verwalten Format, Archivierung und Übermittlung weiterhin manuell, weil eine einfache, alltagstaugliche Lösung fehlt.",
  },
  {
    tag: "06",
    title: "Im internationalen Vergleich zurück",
    text: "Während sich Unternehmen in den USA in wenigen Stunden bis Minuten gründen und digitale Buchhaltung längst Standard ist, dauert eine vergleichbare Gründung in Deutschland und der Schweiz weiterhin mehrere Wochen – mit Papierformularen, Notarterminen und Behördengängen, die sich kaum digital abbilden lassen.",
  },
];

const USA_ROWS = [
  {
    n: "5 Minuten",
    l: "Online-Gründung einer LLC in Kalifornien – vollständig digital, ohne Notartermin",
    s: "Quelle: California Secretary of State, bizfile Online",
  },
  {
    n: "24–72 Std.",
    l: "Bearbeitungszeit für eine Delaware-Corporation bei beschleunigter Online-Einreichung",
    s: "Quelle: Delaware Division of Corporations",
  },
  {
    n: "82–89 %",
    l: "der US-Kleinunternehmen setzen bereits KI-Tools im Tagesgeschäft ein",
    s: "Quelle: U.S. Chamber of Commerce, Small Business Index",
  },
  {
    n: "5,6 Std./Woche",
    l: "durchschnittliche Zeitersparnis durch KI-gestützte Automatisierung von Verwaltungsaufgaben",
    s: "Quelle: U.S. Chamber of Commerce, Small Business Index",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Problem schildern",
    text: "Sie beschreiben uns eine konkrete Herausforderung aus Ihrem Unternehmensalltag – administrativ, organisatorisch oder wirtschaftlich.",
  },
  {
    n: "02",
    title: "Gemeinsam prüfen",
    text: "Wir besprechen das Problem direkt mit den Betroffenen und suchen gemeinsam nach einer passenden Lösung.",
  },
  {
    n: "03",
    title: "Digital umsetzen",
    text: "Unser Team setzt die Lösung auf unserer Plattform um – gebaut von Menschen, die den Unternehmens- und Gründungsalltag selbst kennen.",
  },
];

const STATS_DE = [
  {
    n: "~57 Mrd. €",
    l: "jährliche Bürokratiekosten für Unternehmen in Deutschland",
    s: "Quelle: Statistisches Bundesamt, Erfüllungsaufwand",
  },
  {
    n: "≈ 4 Wochen/Jahr",
    l: "durchschnittlicher Zeitaufwand von KMU für Melde- und Berichtspflichten",
    s: "Quelle: DIHK-Umfrage zur Bürokratiebelastung",
  },
  {
    n: "72 %",
    l: "der Mittelständler sehen Bürokratie als größtes Hindernis für Digitalisierungsprojekte",
    s: "Quelle: KfW-Mittelstandspanel",
  },
  {
    n: "Pflicht seit 2025",
    l: "E-Rechnung im B2B-Bereich – viele Kleinbetriebe verwalten den Prozess weiterhin manuell",
    s: "Quelle: Bundesministerium der Finanzen",
  },
  {
    n: "~8 Werktage",
    l: "durchschnittliche Dauer einer Unternehmensgründung inklusive Behördengängen",
    s: "Quelle: Weltbank, Doing Business Deutschland",
  },
  {
    n: "43 %",
    l: "der Selbstständigen berichten von hoher bis sehr hoher Erschöpfung im Arbeitsalltag",
    s: "Quelle: DAK-Gesundheitsreport, Selbstständige",
  },
];

const STATS_CH = [
  {
    n: "CHF 10 Mrd.",
    l: "jährlich vermeidbare administrative Kosten für Schweizer KMU laut Digitalisierungsstudien",
    s: "Quelle: seco, Regulierungskostenbericht",
  },
  {
    n: "≈ 3 Wochen/Jahr",
    l: "Zeitaufwand kleiner Betriebe für Steuer-, Sozial- und Meldeverfahren",
    s: "Quelle: Schweizerischer Gewerbeverband (sgv)",
  },
  {
    n: "Platz 4 / 64",
    l: "im IMD World Digital Competitiveness Ranking – starke Wissensbasis, schwache Verwaltungsdigitalisierung",
    s: "Quelle: IMD World Digital Competitiveness Ranking, 2026",
  },
  {
    n: "38.000",
    l: "unbesetzte IT-Stellen in der Schweiz – akuter Fachkräftemangel bremst auch KMU-Digitalisierung",
    s: "Quelle: Digitalisierungsindex Schweiz, 2026",
  },
  {
    n: "Seit 2021 abgelehnt",
    l: "die staatliche E-ID; frühestens Ende 2026 in überarbeiteter Form, Fachleute zweifeln am Termin",
    s: "Quelle: NZZ, 2026",
  },
  {
    n: "2–3 Wochen",
    l: "durchschnittliche Dauer einer GmbH-Gründung inklusive Handelsregistereintrag",
    s: "Quelle: Staatssekretariat für Wirtschaft (SECO)",
  },
];

export default function Wirtschaft() {
  setMeta();

  return (
    <div style={{ minHeight: "100vh", background: "#07071a", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .wi-page { position: relative; z-index: 1; }
        .wi-space-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(127,119,221,0.18) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .wi-orb { position: fixed; border-radius: 50%; filter: blur(42px); pointer-events: none; z-index: 0; }
        .wi-orb-1 { width: 260px; height: 260px; background: #534AB7; opacity: 0.08; top: 8%; right: 6%; animation: wi-drift1 24s ease-in-out infinite; }
        .wi-orb-2 { width: 160px; height: 160px; background: #5DCAA5; opacity: 0.06; bottom: 8%; left: 4%; animation: wi-drift2 28s ease-in-out infinite; }
        @keyframes wi-drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-18px,26px); } }
        @keyframes wi-drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(22px,-18px); } }
        @media (prefers-reduced-motion: reduce) { .wi-orb { animation: none; } }

        .wi-section { max-width: 1160px; margin: 0 auto; padding: 100px 32px; }
        .wi-eyebrow {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.14em;
          text-transform: uppercase; color: #5DCAA5; margin-bottom: 22px; display: flex; align-items: center; gap: 10px;
        }
        .wi-eyebrow::before { content: ''; width: 16px; height: 1px; background: #5DCAA5; display: inline-block; }
        .wi-page h1, .wi-page h2, .wi-page h3 { font-family: 'Space Grotesk', sans-serif; font-weight: 600; letter-spacing: -0.01em; color: #EEEDFE; }

        .wi-hero { padding-top: 60px; }
        .wi-hero-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 64px; align-items: start; }
        .wi-hero h1 { font-size: clamp(30px,4.3vw,48px); line-height: 1.22; margin-bottom: 26px; }
        .wi-hero h1 .wi-hl { color: #CECBF6; }
        .wi-hero .wi-lead { font-size: 18px; color: #AFA9EC; max-width: 520px; }
        .wi-hero .wi-slogan-line { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 500; color: #5DCAA5; margin-bottom: 16px; max-width: 520px; }

        .wi-ticker-box { border-top: 1px solid rgba(127,119,221,0.18); padding-top: 18px; margin-top: 6px; }
        .wi-ticker-title { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; color: #AFA9EC; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
        .wi-pulse { width: 6px; height: 6px; border-radius: 50%; background: #5DCAA5; display: inline-block; margin-right: 8px; animation: wi-pulse 2s ease-in-out infinite; }
        @keyframes wi-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media (prefers-reduced-motion: reduce) { .wi-pulse { animation: none; } }
        .wi-tick-row { display: flex; justify-content: space-between; gap: 16px; padding: 13px 0; border-bottom: 1px solid rgba(127,119,221,0.18); }
        .wi-tick-row:last-child { border-bottom: none; }
        .wi-tick-row .wi-n { font-family: 'IBM Plex Mono', monospace; font-size: 15px; color: #EEEDFE; white-space: nowrap; }
        .wi-tick-row .wi-l { font-size: 12px; color: #AFA9EC; text-align: right; max-width: 150px; }
        .wi-ticker-note { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #AFA9EC; opacity: 0.7; margin-top: 16px; }

        .wi-problems-intro { max-width: 640px; margin-bottom: 8px; }
        .wi-problems-intro h2 { font-size: clamp(28px,3.6vw,38px); line-height: 1.25; margin-top: 16px; }
        .wi-problems-intro p { color: #AFA9EC; font-size: 16px; margin-top: 14px; }
        .wi-problem-row { display: grid; grid-template-columns: 90px 1fr; gap: 28px; padding: 28px 0; border-bottom: 1px solid rgba(127,119,221,0.18); align-items: start; }
        .wi-problem-row.wi-first { border-top: 1px solid rgba(127,119,221,0.18); margin-top: 36px; }
        .wi-problem-tag { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #CECBF6; padding-top: 3px; }
        .wi-problem-row.wi-ch-spot .wi-problem-tag { color: #5DCAA5; }
        .wi-problem-row h3 { font-size: 17px; margin-bottom: 8px; }
        .wi-problem-row.wi-ch-spot h3 { color: #5DCAA5; }
        .wi-problem-row p { font-size: 14.5px; color: #AFA9EC; max-width: 640px; }
        .wi-problems-close { margin-top: 44px; }

        .wi-usa-panel { background: rgba(127,119,221,0.05); border: 1px solid rgba(127,119,221,0.18); border-radius: 16px; padding: 36px 40px; margin-top: 8px; }
        .wi-usa-row { display: flex; justify-content: space-between; gap: 24px; padding: 16px 0; border-bottom: 1px solid rgba(127,119,221,0.18); }
        .wi-usa-row:last-child { border-bottom: none; }
        .wi-usa-row .wi-n { font-family: 'IBM Plex Mono', monospace; font-size: 15px; font-weight: 600; color: #CECBF6; white-space: nowrap; flex-shrink: 0; }
        .wi-usa-row .wi-meta { text-align: right; }
        .wi-usa-row .wi-l { font-size: 13.5px; color: #EEEDFE; margin-bottom: 3px; }
        .wi-usa-row .wi-s { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: #AFA9EC; opacity: 0.7; }
        .wi-usa-caveat { font-size: 12.5px; color: #AFA9EC; opacity: 0.75; margin-top: 20px; max-width: 640px; }

        .wi-process-row { display: grid; grid-template-columns: 120px 1fr; gap: 32px; padding: 34px 0; border-bottom: 1px solid rgba(127,119,221,0.18); align-items: start; }
        .wi-process-row:first-of-type { border-top: 1px solid rgba(127,119,221,0.18); }
        .wi-process-num { font-family: 'IBM Plex Mono', monospace; font-size: 44px; color: #7F77DD; opacity: 0.35; line-height: 1; }
        .wi-process-row:nth-child(3) .wi-process-num { color: #5DCAA5; }
        .wi-process-body h3 { font-size: 20px; margin-bottom: 10px; }
        .wi-process-body p { font-size: 15px; color: #AFA9EC; max-width: 560px; }

        .wi-pull-quote { border-left: 2px solid #5DCAA5; padding-left: 22px; margin-bottom: 32px; }
        .wi-pull-quote p { font-family: 'Space Grotesk', sans-serif; font-size: 22px; line-height: 1.4; color: #EEEDFE; max-width: none; font-weight: 500; }

        .wi-origin-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: start; }
        .wi-origin-grid p { font-size: 16px; color: #AFA9EC; max-width: 520px; margin-bottom: 18px; }
        .wi-badge-list { display: flex; flex-direction: column; gap: 14px; }
        .wi-badge-item { display: flex; align-items: baseline; gap: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #AFA9EC; border-bottom: 1px solid rgba(127,119,221,0.18); padding-bottom: 14px; }
        .wi-badge-item b { color: #EEEDFE; font-family: 'Inter', sans-serif; font-size: 14.5px; font-weight: 600; }

        .wi-stats-head { max-width: 680px; margin-bottom: 64px; }
        .wi-stats-head h2 { font-size: clamp(28px,3.6vw,38px); line-height: 1.25; margin-bottom: 18px; }
        .wi-stats-head p { color: #AFA9EC; font-size: 16px; }

        .wi-country-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
        .wi-country-label { font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.12em; padding-bottom: 14px; border-bottom: 1px solid rgba(127,119,221,0.18); margin-bottom: 4px; display: flex; justify-content: space-between; }
        .wi-country-label.wi-de { color: #CECBF6; }
        .wi-country-label.wi-ch { color: #5DCAA5; }
        .wi-country-label span.wi-count { color: #AFA9EC; }

        .wi-full-tick { display: flex; justify-content: space-between; gap: 20px; padding: 20px 0; border-bottom: 1px solid rgba(127,119,221,0.18); }
        .wi-full-tick .wi-n { font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 600; color: #EEEDFE; white-space: nowrap; flex-shrink: 0; }
        .wi-country-grid > div:first-child .wi-full-tick .wi-n { color: #CECBF6; }
        .wi-country-grid > div:last-child .wi-full-tick .wi-n { color: #5DCAA5; }
        .wi-full-tick .wi-meta { text-align: right; }
        .wi-full-tick .wi-l { font-size: 13.5px; color: #EEEDFE; margin-bottom: 4px; }
        .wi-full-tick .wi-s { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: #AFA9EC; opacity: 0.7; }

        .wi-cta { text-align: center; padding-top: 80px; padding-bottom: 140px; }
        .wi-cta h2 { font-size: clamp(28px,3.6vw,38px); margin-bottom: 16px; }
        .wi-cta p { color: #AFA9EC; font-size: 16px; max-width: 480px; margin: 0 auto 40px; }

        .wi-btn-b2 {
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 15px; color: #EEEDFE; background: #534AB7;
          border: none; border-radius: 100px; padding: 8px 8px 8px 26px; display: inline-flex; align-items: center;
          gap: 16px; cursor: pointer; transition: transform 0.2s ease, background 0.2s ease; text-decoration: none;
        }
        .wi-btn-b2:hover { background: #645ac9; transform: translateY(-1px); }
        .wi-btn-b2 .wi-arrow-circle { width: 34px; height: 34px; border-radius: 50%; background: #185FA5; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .wi-btn-b2 .wi-arrow-circle svg { stroke: #B5D4F4; }

        .wi-reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .wi-reveal.wi-in { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .wi-reveal { opacity: 1; transform: none; transition: none; } }

        @media (max-width: 860px) {
          .wi-section { padding: 64px 22px; }
          .wi-hero { padding-top: 40px; }
          .wi-hero-grid, .wi-origin-grid, .wi-country-grid { grid-template-columns: 1fr; gap: 36px; }
          .wi-process-row { grid-template-columns: 60px 1fr; gap: 20px; }
          .wi-process-num { font-size: 30px; }
          .wi-usa-panel { padding: 26px 22px; }
          .wi-usa-row { flex-direction: column; gap: 6px; }
          .wi-usa-row .wi-meta { text-align: left; }
        }
      `}</style>

      <div className="wi-space-bg" />
      <div className="wi-orb wi-orb-1" />
      <div className="wi-orb wi-orb-2" />

      <div className="wi-page">
        <Navbar />

        <main>
          {/* HERO */}
          <section className="wi-section wi-hero">
            <div className="wi-eyebrow">CENTOF.AI · WIRTSCHAFT</div>
            <div className="wi-hero-grid">
              <div>
                <p className="wi-slogan-line">
                  Wir kennen die Probleme, weil wir sie selbst erlebt haben.
                </p>
                <h1>
                  Deshalb entwickeln sich unsere Projekte aus{" "}
                  <span className="wi-hl">echten Digitalisierungslücken im Unternehmeralltag</span> –
                  und aus Ihren Ideen.
                </h1>
                <p className="wi-lead">
                  Sie schildern uns eine Herausforderung aus Gründung, Selbstständigkeit oder
                  Unternehmensführung. Wir prüfen gemeinsam mit Ihnen, ob sie sich über unsere
                  Plattform lösen lässt – und entwickeln daraus eine echte digitale Lösung.
                </p>
              </div>
              <Reveal className="wi-ticker-box">
                <div className="wi-ticker-title">
                  <span>
                    <span className="wi-pulse" />
                    LIVE · DIE LAGE
                  </span>
                </div>
                <div className="wi-tick-row">
                  <span className="wi-n">~57 Mrd. €</span>
                  <span className="wi-l">jährliche Bürokratiekosten, Deutschland</span>
                </div>
                <div className="wi-tick-row">
                  <span className="wi-n">CHF 10 Mrd.</span>
                  <span className="wi-l">vermeidbare Verwaltungskosten, Schweiz</span>
                </div>
                <div className="wi-tick-row">
                  <span className="wi-n">5 Minuten</span>
                  <span className="wi-l">Online-Firmengründung, Kalifornien</span>
                </div>
                <div className="wi-tick-row">
                  <span className="wi-n">43 %</span>
                  <span className="wi-l">Selbstständige stark erschöpft, DE</span>
                </div>
                <div className="wi-ticker-note">Alle Zahlen im Detail weiter unten ↓</div>
              </Reveal>
            </div>
          </section>

          {/* PROBLEMFELDER */}
          <section className="wi-section">
            <Reveal className="wi-problems-intro">
              <div className="wi-eyebrow">WAS WIR IM ALLTAG SEHEN</div>
              <h2>
                Wo fehlende Digitalisierung Unternehmer und Selbstständige täglich Zeit, Geld und
                Nerven kostet
              </h2>
              <p>
                Aus Studien zur Verwaltungslast von Unternehmen in Deutschland und der Schweiz
                ergibt sich ein klares Muster: Die Lücke ist selten technischer Natur – sie liegt
                in der fehlenden Verzahnung. Und diese Lücke hat wirtschaftliche, psychische und
                zeitliche Folgen.
              </p>
            </Reveal>

            {PROBLEMS.map((p, i) => (
              <Reveal
                key={p.tag}
                className={`wi-problem-row ${i === 0 ? "wi-first" : ""} ${p.ch ? "wi-ch-spot" : ""}`}
              >
                <div className="wi-problem-tag">{p.tag}</div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}

            <div className="wi-problems-close">
              <Reveal className="wi-pull-quote">
                <p>
                  Das Problem ist selten fehlender Unternehmergeist. Es ist ein System, das
                  Energie in Formulare statt in Innovation lenkt.
                </p>
              </Reveal>
            </div>
          </section>

          {/* USA VERGLEICH */}
          <section className="wi-section">
            <Reveal className="wi-eyebrow">IM VERGLEICH</Reveal>
            <Reveal>
              <h2 style={{ fontSize: "clamp(26px,3.4vw,36px)", lineHeight: 1.25, maxWidth: 680, marginBottom: 20 }}>
                Was der US-Markt zeigt
              </h2>
            </Reveal>
            <Reveal>
              <p style={{ color: "#AFA9EC", fontSize: 16, maxWidth: 680, marginBottom: 32 }}>
                Nicht als Massstab für alle US-Unternehmen, aber als Beleg, wohin die Reise gehen
                kann, wenn Unternehmensverwaltung konsequent digital gedacht wird.
              </p>
            </Reveal>

            <Reveal className="wi-usa-panel">
              {USA_ROWS.map((row) => (
                <div className="wi-usa-row" key={row.n + row.l}>
                  <div className="wi-n">{row.n}</div>
                  <div className="wi-meta">
                    <div className="wi-l">{row.l}</div>
                    <div className="wi-s">{row.s}</div>
                  </div>
                </div>
              ))}
              <div className="wi-usa-caveat">
                Auch in den USA gilt: Nicht jeder Bundesstaat und nicht jedes Unternehmen ist so
                schnell und digital wie die genannten Beispiele. Sie zeigen das Potenzial, keinen
                Durchschnitt.
              </div>
            </Reveal>
          </section>

          {/* PROCESS */}
          <section className="wi-section">
            <Reveal className="wi-eyebrow">SO ARBEITEN WIR</Reveal>
            {PROCESS.map((step) => (
              <Reveal key={step.n} className="wi-process-row">
                <div className="wi-process-num">{step.n}</div>
                <div className="wi-process-body">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </section>

          {/* ORIGIN */}
          <section className="wi-section wi-origin-grid">
            <Reveal>
              <div className="wi-eyebrow">WARUM CENTOF.AI</div>
              <p>
                Unser Team kommt ursprünglich aus der Medizin und der Wirtschaft. Wir haben selbst
                ein Unternehmen gegründet und wissen daher, wie viel Zeit und Energie durch
                veraltete, unverzahnte Verwaltungsprozesse verloren geht – Zeit, die eigentlich
                dem eigenen Geschäft gehört.
              </p>
              <p>
                Genau das war der Anlass, centof.ai zu gründen: eine Plattform, die die
                alltäglichen Probleme von Unternehmerinnen und Unternehmern wirklich löst, statt
                sie nur zu verwalten.
              </p>
            </Reveal>
            <Reveal>
              <div className="wi-pull-quote">
                <p>Wir kennen die Probleme, weil wir sie selbst erlebt haben.</p>
              </div>
              <div className="wi-badge-list">
                <div className="wi-badge-item">
                  <b>Unternehmerischer Hintergrund</b>
                  <br />
                  Eigene Unternehmensgründung im Team
                </div>
                <div className="wi-badge-item">
                  <b>Wirtschaftlicher Hintergrund</b>
                  <br />
                  Prozess- und Produktverständnis im Team
                </div>
                <div className="wi-badge-item">
                  <b>DACH-Fokus</b>
                  <br />
                  Entwickelt für Deutschland, Schweiz, Österreich
                </div>
              </div>
            </Reveal>
          </section>

          {/* STATS */}
          <section className="wi-section">
            <Reveal className="wi-stats-head">
              <div className="wi-eyebrow">DIGITALISIERUNGSLÜCKEN IN ZAHLEN</div>
              <h2>Wie weit Deutschland und die Schweiz bei der Wirtschafts-Digitalisierung wirklich sind</h2>
              <p>
                Die Zahlen zeigen: Es geht nicht um fehlenden Willen, sondern um unvollständige
                Umsetzung – mit direkten wirtschaftlichen, psychischen und zeitlichen Folgen für
                Unternehmerinnen und Unternehmer.
              </p>
            </Reveal>

            <div className="wi-country-grid">
              <Reveal>
                <div className="wi-country-label wi-de">
                  <span>DEUTSCHLAND</span>
                  <span className="wi-count">6 Kennzahlen</span>
                </div>
                {STATS_DE.map((stat) => (
                  <div className="wi-full-tick" key={stat.n + stat.l}>
                    <div className="wi-n">{stat.n}</div>
                    <div className="wi-meta">
                      <div className="wi-l">{stat.l}</div>
                      <div className="wi-s">{stat.s}</div>
                    </div>
                  </div>
                ))}
              </Reveal>

              <Reveal>
                <div className="wi-country-label wi-ch">
                  <span>SCHWEIZ</span>
                  <span className="wi-count">6 Kennzahlen</span>
                </div>
                {STATS_CH.map((stat) => (
                  <div className="wi-full-tick" key={stat.n + stat.l}>
                    <div className="wi-n">{stat.n}</div>
                    <div className="wi-meta">
                      <div className="wi-l">{stat.l}</div>
                      <div className="wi-s">{stat.s}</div>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* CTA */}
          <section className="wi-section wi-cta">
            <Reveal>
              <h2>Haben Sie ein Problem, das gelöst werden sollte?</h2>
            </Reveal>
            <Reveal>
              <p>
                Schildern Sie uns Ihre Herausforderung aus Gründung, Selbstständigkeit oder
                Unternehmensführung – wir prüfen gemeinsam, ob und wie wir sie lösen können.
              </p>
            </Reveal>
            <Reveal>
              <Link href="/kontakt" className="wi-btn-b2">
                Problem schildern
                <span className="wi-arrow-circle">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </Link>
            </Reveal>
          </section>
        </main>

        {/* Footer mini */}
        <footer
          style={{
            borderTop: "0.5px solid rgba(127,119,221,0.18)",
            padding: "32px 0",
            textAlign: "center",
            fontSize: 12,
            color: "#AFA9EC",
          }}
        >
          <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" style={{ color: "#CECBF6" }}>
                centof.ai
              </Link>
              . Alle Rechte vorbehalten.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
