import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "../components/Navbar";

function setMeta() {
  document.title = "centof.ai — Gesundheit";
  const desc =
    "Wir kennen die Probleme im Gesundheitswesen, weil wir sie selbst erlebt haben. centof.ai entwickelt digitale Lösungen aus echten klinischen Alltagsproblemen.";
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
            el.classList.add("gh-in");
          }
        });
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`gh-reveal ${className}`}>
      {children}
    </div>
  );
}

const PROBLEMS: { tag: string; title: string; text: string; ch?: boolean }[] = [
  {
    tag: "01",
    title: "Dokumentations- und Bürokratielast bei Ärzten",
    text: "Der am besten belegte Schmerzpunkt im Alltag: Ärztinnen und Ärzte wenden bis zu vier Stunden täglich für Dokumentation und Verwaltung auf. 76 Prozent sagen, das schränkt ihre medizinische Arbeit spürbar ein – und mehr als 60 Prozent der Bevölkerung spüren es direkt: zu wenig Zeit für persönliche Gespräche.",
  },
  {
    tag: "02",
    title: "Pflege: Personalmangel trifft auf Dokumentationsdruck",
    text: "Pflegekräfte verbringen rund 52 Minuten pro Schicht mit Dokumentation – bei gleichzeitig über 500.000 fehlenden Fachkräften bis 2030. Digitale Entlastung ist längst keine Kür mehr, sondern Teil der Arbeitsbedingungen, die über Personalbindung entscheidet.",
  },
  {
    tag: "03",
    title: "Fragmentierte Systeme und die Fax-Kultur",
    text: "Krankenhaus-IT ist meist eine Insellandschaft statt ein System: 85 Prozent des Klinikpersonals bewerten ihre KIS-Lösungen als mittelmäßig bis schlecht. Selbst digital finanzierte Übergabeplattformen ersetzen den Fax nicht, weil die eigentliche klinische Information – Wundverlauf, Verhaltensmuster, Medikamentenanpassungen – als Freitext nirgendwo strukturiert hineinpasst.",
  },
  {
    tag: "04",
    title: "Fallbeispiel Schweiz: das elektronische Patientendossier",
    text: "Nach fast 20 Jahren gilt das EPD als gescheitert: Ein mittelgrosses Spital zahlt 80'000 Franken Anschlussgebühr pro Jahr – genutzt von einem Dutzend Patient:innen. Die Lehre daraus: Top-down verordnete, wenig nutzerzentrierte Lösungen scheitern auch mit grossem Budget. Genau das ist die Chance für schlanke, alltagstaugliche Tools.",
    ch: true,
  },
  {
    tag: "05",
    title: "Regulatorische Zersplitterung",
    text: "Technisch wäre der Datenaustausch oft problemlos möglich – rechtlich ist er es nicht. Fehlende einheitliche Architekturen bei digitalen Identitäten und uneinheitliche Datenschutz-Auslegungen zwischen Kantonen und Bundesländern bremsen die Digitalisierung zusätzlich aus.",
  },
  {
    tag: "06",
    title: "IT-Sicherheit",
    text: "Ein BSI-Befund vom März 2026 fand in Praxisverwaltungssystemen, Kliniksoftware und Pflegedokumentation durchgehend Sicherheitslücken – mit vergleichbaren Befunden auch in der Schweiz. Ein oft übersehener, aber alltagsrelevanter Risikofaktor.",
  },
  {
    tag: "07",
    title: "Ungleiche Versorgung",
    text: "Ältere Menschen und ländliche Regionen profitieren bislang am wenigsten von der Digitalisierung, gerade bei Telemedizin – obwohl der Versorgungsbedarf dort oft am höchsten ist.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Problem schildern",
    text: "Sie beschreiben uns eine konkrete Herausforderung aus Ihrem Arbeitsalltag – administrativ, organisatorisch oder klinisch.",
  },
  {
    n: "02",
    title: "Gemeinsam prüfen",
    text: "Wir besprechen das Problem direkt mit den Betroffenen und suchen gemeinsam nach einer passenden Lösung.",
  },
  {
    n: "03",
    title: "Digital umsetzen",
    text: "Unser Team setzt die Lösung auf unserer Plattform um – gebaut von Menschen, die den klinischen Alltag selbst kennen.",
  },
];

const STATS_DE = [
  {
    n: "42 Mrd. €",
    l: "jährliches Einsparpotenzial durch konsequente Digitalisierung im Gesundheitswesen",
    s: "Quelle: McKinsey & Company",
  },
  {
    n: "3–4 Std.",
    l: "pro Tag Dokumentation statt Patientenversorgung",
    s: "Quelle: Marburger Bund / Nuance Healthcare",
  },
  {
    n: "76 %",
    l: "der Ärzteschaft: Verwaltungsaufgaben schränken die medizinische Arbeit spürbar ein",
    s: "Quelle: Civey / arzt-wirtschaft.de, 2026",
  },
  {
    n: "36 % / 34 %",
    l: "der ärztlichen bzw. pflegerischen Vollkräfte sind rechnerisch ausschließlich mit Dokumentation befasst",
    s: "Quelle: Deutsches Krankenhausinstitut (DKI)",
  },
  {
    n: "bis 2 %",
    l: "Erlösabschlag pro Abrechnungsfall ab 2026, wenn Pflicht-Digitalangebote fehlen",
    s: "Quelle: KHZG-Digitalisierungsabschlag",
  },
  {
    n: "6,2 %",
    l: "Krankenstand in Kliniken und Pflegeheimen – höchste Fehlzeitenquote aller Branchen",
    s: "Quelle: DAK-Gesundheitsreport 2026",
  },
];

const STATS_CH = [
  {
    n: "CHF 80'000",
    l: "jährliche EPD-Anschlussgebühr eines mittelgrossen Spitals – genutzt von rund einem Dutzend Patient:innen",
    s: "Quelle: NZZ, Beispiel Spital Uster",
  },
  {
    n: "~CHF 40'000",
    l: "rechnerische Kosten pro nutzendem Patienten in diesem konkreten Beispiel",
    s: "Quelle: NZZ, 2026",
  },
  {
    n: "125'000",
    l: "Personen mit elektronischem Patientendossier – bei rund 8,9 Mio. Einwohner:innen",
    s: "Quelle: SWI swissinfo.ch, 2026",
  },
  {
    n: "33–44 Min.",
    l: "pro Tag für Behördenvorgaben – von der Mehrheit der befragten Ärzteschaft als überflüssig empfunden",
    s: "Quelle: praktischArzt.ch-Befragung",
  },
  {
    n: "+9,6 %",
    l: "Anstieg der Verwaltungskosten im Schweizer Gesundheitswesen allein im Jahr 2023",
    s: "Quelle: Bundesamt für Statistik (BFS)",
  },
  {
    n: "CHF 94 Mrd.",
    l: "Gesamtkosten des Schweizer Gesundheitswesens 2023 – Spitäler allein 36,3 % davon",
    s: "Quelle: Bundesamt für Statistik (BFS)",
  },
];

export default function Gesundheit() {
  setMeta();

  return (
    <div style={{ minHeight: "100vh", background: "#07071a", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .gh-page { position: relative; z-index: 1; }
        .gh-space-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(127,119,221,0.18) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .gh-orb { position: fixed; border-radius: 50%; filter: blur(42px); pointer-events: none; z-index: 0; }
        .gh-orb-1 { width: 260px; height: 260px; background: #534AB7; opacity: 0.08; top: 8%; right: 6%; animation: gh-drift1 24s ease-in-out infinite; }
        .gh-orb-2 { width: 160px; height: 160px; background: #5DCAA5; opacity: 0.06; bottom: 8%; left: 4%; animation: gh-drift2 28s ease-in-out infinite; }
        @keyframes gh-drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-18px,26px); } }
        @keyframes gh-drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(22px,-18px); } }
        @media (prefers-reduced-motion: reduce) { .gh-orb { animation: none; } }

        .gh-section { max-width: 1160px; margin: 0 auto; padding: 100px 32px; }
        .gh-eyebrow {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.14em;
          text-transform: uppercase; color: #5DCAA5; margin-bottom: 22px; display: flex; align-items: center; gap: 10px;
        }
        .gh-eyebrow::before { content: ''; width: 16px; height: 1px; background: #5DCAA5; display: inline-block; }
        .gh-page h1, .gh-page h2, .gh-page h3 { font-family: 'Space Grotesk', sans-serif; font-weight: 600; letter-spacing: -0.01em; color: #EEEDFE; }

        .gh-hero { padding-top: 60px; }
        .gh-hero-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 64px; align-items: start; }
        .gh-hero h1 { font-size: clamp(30px,4.3vw,48px); line-height: 1.22; margin-bottom: 26px; }
        .gh-hero h1 .gh-hl { color: #CECBF6; }
        .gh-hero .gh-lead { font-size: 18px; color: #AFA9EC; max-width: 520px; }
        .gh-hero .gh-slogan-line { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 500; color: #5DCAA5; margin-bottom: 16px; max-width: 520px; }

        .gh-ticker-box { border-top: 1px solid rgba(127,119,221,0.18); padding-top: 18px; margin-top: 6px; }
        .gh-ticker-title { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; color: #AFA9EC; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
        .gh-pulse { width: 6px; height: 6px; border-radius: 50%; background: #5DCAA5; display: inline-block; margin-right: 8px; animation: gh-pulse 2s ease-in-out infinite; }
        @keyframes gh-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media (prefers-reduced-motion: reduce) { .gh-pulse { animation: none; } }
        .gh-tick-row { display: flex; justify-content: space-between; gap: 16px; padding: 13px 0; border-bottom: 1px solid rgba(127,119,221,0.18); }
        .gh-tick-row:last-child { border-bottom: none; }
        .gh-tick-row .gh-n { font-family: 'IBM Plex Mono', monospace; font-size: 16px; color: #EEEDFE; white-space: nowrap; }
        .gh-tick-row .gh-l { font-size: 12px; color: #AFA9EC; text-align: right; max-width: 150px; }
        .gh-ticker-note { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #AFA9EC; opacity: 0.7; margin-top: 16px; }

        .gh-process-row { display: grid; grid-template-columns: 120px 1fr; gap: 32px; padding: 34px 0; border-bottom: 1px solid rgba(127,119,221,0.18); align-items: start; }
        .gh-process-row:first-of-type { border-top: 1px solid rgba(127,119,221,0.18); }
        .gh-process-num { font-family: 'IBM Plex Mono', monospace; font-size: 44px; color: #7F77DD; opacity: 0.35; line-height: 1; }
        .gh-process-row:nth-child(3) .gh-process-num { color: #5DCAA5; }
        .gh-process-body h3 { font-size: 20px; margin-bottom: 10px; }
        .gh-process-body p { font-size: 15px; color: #AFA9EC; max-width: 560px; }

        .gh-problems-intro { max-width: 640px; margin-bottom: 8px; }
        .gh-problems-intro h2 { font-size: clamp(28px,3.6vw,38px); line-height: 1.25; margin-top: 16px; }
        .gh-problems-intro p { color: #AFA9EC; font-size: 16px; margin-top: 14px; }
        .gh-problem-row { display: grid; grid-template-columns: 90px 1fr; gap: 28px; padding: 28px 0; border-bottom: 1px solid rgba(127,119,221,0.18); align-items: start; }
        .gh-problem-row.gh-first { border-top: 1px solid rgba(127,119,221,0.18); margin-top: 36px; }
        .gh-problem-tag { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #CECBF6; padding-top: 3px; }
        .gh-problem-row.gh-ch-spot .gh-problem-tag { color: #5DCAA5; }
        .gh-problem-row h3 { font-size: 17px; margin-bottom: 8px; }
        .gh-problem-row.gh-ch-spot h3 { color: #5DCAA5; }
        .gh-problem-row p { font-size: 14.5px; color: #AFA9EC; max-width: 640px; }
        .gh-problems-close { margin-top: 44px; }

        .gh-pull-quote { border-left: 2px solid #5DCAA5; padding-left: 22px; margin-bottom: 32px; }
        .gh-pull-quote p { font-family: 'Space Grotesk', sans-serif; font-size: 22px; line-height: 1.4; color: #EEEDFE; max-width: none; font-weight: 500; }

        .gh-origin-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: start; }
        .gh-origin-grid p { font-size: 16px; color: #AFA9EC; max-width: 520px; margin-bottom: 18px; }
        .gh-badge-list { display: flex; flex-direction: column; gap: 14px; }
        .gh-badge-item { display: flex; align-items: baseline; gap: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #AFA9EC; border-bottom: 1px solid rgba(127,119,221,0.18); padding-bottom: 14px; }
        .gh-badge-item b { color: #EEEDFE; font-family: 'Inter', sans-serif; font-size: 14.5px; font-weight: 600; }

        .gh-stats-head { max-width: 680px; margin-bottom: 64px; }
        .gh-stats-head h2 { font-size: clamp(28px,3.6vw,38px); line-height: 1.25; margin-bottom: 18px; }
        .gh-stats-head p { color: #AFA9EC; font-size: 16px; }

        .gh-country-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
        .gh-country-label { font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.12em; padding-bottom: 14px; border-bottom: 1px solid rgba(127,119,221,0.18); margin-bottom: 4px; display: flex; justify-content: space-between; }
        .gh-country-label.gh-de { color: #CECBF6; }
        .gh-country-label.gh-ch { color: #5DCAA5; }
        .gh-country-label span.gh-count { color: #AFA9EC; }

        .gh-full-tick { display: flex; justify-content: space-between; gap: 20px; padding: 20px 0; border-bottom: 1px solid rgba(127,119,221,0.18); }
        .gh-full-tick .gh-n { font-family: 'IBM Plex Mono', monospace; font-size: 22px; font-weight: 600; color: #EEEDFE; white-space: nowrap; flex-shrink: 0; }
        .gh-country-grid > div:first-child .gh-full-tick .gh-n { color: #CECBF6; }
        .gh-country-grid > div:last-child .gh-full-tick .gh-n { color: #5DCAA5; }
        .gh-full-tick .gh-meta { text-align: right; }
        .gh-full-tick .gh-l { font-size: 13.5px; color: #EEEDFE; margin-bottom: 4px; }
        .gh-full-tick .gh-s { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: #AFA9EC; opacity: 0.7; }

        .gh-cta { text-align: center; padding-top: 80px; padding-bottom: 140px; }
        .gh-cta h2 { font-size: clamp(28px,3.6vw,38px); margin-bottom: 16px; }
        .gh-cta p { color: #AFA9EC; font-size: 16px; max-width: 480px; margin: 0 auto 40px; }

        .gh-btn-b2 {
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 15px; color: #EEEDFE; background: #534AB7;
          border: none; border-radius: 100px; padding: 8px 8px 8px 26px; display: inline-flex; align-items: center;
          gap: 16px; cursor: pointer; transition: transform 0.2s ease, background 0.2s ease; text-decoration: none;
        }
        .gh-btn-b2:hover { background: #645ac9; transform: translateY(-1px); }
        .gh-btn-b2 .gh-arrow-circle { width: 34px; height: 34px; border-radius: 50%; background: #185FA5; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .gh-btn-b2 .gh-arrow-circle svg { stroke: #B5D4F4; }

        .gh-reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .gh-reveal.gh-in { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .gh-reveal { opacity: 1; transform: none; transition: none; } }

        @media (max-width: 860px) {
          .gh-section { padding: 64px 22px; }
          .gh-hero { padding-top: 40px; }
          .gh-hero-grid, .gh-origin-grid, .gh-country-grid { grid-template-columns: 1fr; gap: 36px; }
          .gh-process-row { grid-template-columns: 60px 1fr; gap: 20px; }
          .gh-process-num { font-size: 30px; }
        }
      `}</style>

      <div className="gh-space-bg" />
      <div className="gh-orb gh-orb-1" />
      <div className="gh-orb gh-orb-2" />

      <div className="gh-page">
        <Navbar />

        <main>
          {/* HERO */}
          <section className="gh-section gh-hero">
            <div className="gh-eyebrow">CENTOF.AI · GESUNDHEIT</div>
            <div className="gh-hero-grid">
              <div>
                <p className="gh-slogan-line">
                  Wir kennen die Probleme, weil wir sie selbst erlebt haben.
                </p>
                <h1>
                  Deshalb entwickeln sich unsere Projekte aus{" "}
                  <span className="gh-hl">echten klinischen Alltagsproblemen</span> – und aus
                  Ihren Ideen.
                </h1>
                <p className="gh-lead">
                  Sie schildern uns eine Herausforderung aus Ihrer Praxis, Klinik oder Pflege.
                  Wir prüfen gemeinsam mit Ihnen, ob sie sich über unsere Plattform lösen lässt –
                  und entwickeln daraus eine echte digitale Lösung.
                </p>
              </div>
              <Reveal className="gh-ticker-box">
                <div className="gh-ticker-title">
                  <span>
                    <span className="gh-pulse" />
                    LIVE · DIE LAGE
                  </span>
                </div>
                <div className="gh-tick-row">
                  <span className="gh-n">42 Mrd. €</span>
                  <span className="gh-l">Einsparpotenzial, Deutschland</span>
                </div>
                <div className="gh-tick-row">
                  <span className="gh-n">CHF 80'000</span>
                  <span className="gh-l">EPD-Kosten pro Spital / Jahr, Schweiz</span>
                </div>
                <div className="gh-tick-row">
                  <span className="gh-n">76 %</span>
                  <span className="gh-l">Ärzte: Bürokratie bremst, Deutschland</span>
                </div>
                <div className="gh-tick-row">
                  <span className="gh-n">+9,6 %</span>
                  <span className="gh-l">Verwaltungskosten 2023, Schweiz</span>
                </div>
                <div className="gh-ticker-note">Alle Zahlen im Detail weiter unten ↓</div>
              </Reveal>
            </div>
          </section>

          {/* PROBLEMFELDER */}
          <section className="gh-section">
            <Reveal className="gh-problems-intro">
              <div className="gh-eyebrow">WAS WIR IM ALLTAG SEHEN</div>
              <h2>Sieben Problemfelder, die uns immer wieder begegnen</h2>
              <p>
                Aus Gesprächen mit Kliniken, Praxen und Pflege – und aus aktuellen Studien aus
                Deutschland und der Schweiz – ergibt sich ein klares Muster. Es geht selten um
                fehlende Technik.
              </p>
            </Reveal>

            {PROBLEMS.map((p, i) => (
              <Reveal
                key={p.tag}
                className={`gh-problem-row ${i === 0 ? "gh-first" : ""} ${p.ch ? "gh-ch-spot" : ""}`}
              >
                <div className="gh-problem-tag">{p.tag}</div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}

            <div className="gh-problems-close">
              <Reveal className="gh-pull-quote">
                <p>
                  Das Problem ist selten fehlende Technik. Es ist fehlende Integration in den
                  echten Arbeitsalltag.
                </p>
              </Reveal>
            </div>
          </section>

          {/* PROCESS */}
          <section className="gh-section">
            <Reveal className="gh-eyebrow">SO ARBEITEN WIR</Reveal>
            {PROCESS.map((step) => (
              <Reveal key={step.n} className="gh-process-row">
                <div className="gh-process-num">{step.n}</div>
                <div className="gh-process-body">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </section>

          {/* ORIGIN */}
          <section className="gh-section gh-origin-grid">
            <Reveal>
              <div className="gh-eyebrow">WARUM CENTOF.AI</div>
              <p>
                Unser Team kommt ursprünglich aus der Medizin und der Wirtschaft. Wir haben im
                OP, in der Praxis und in der Verwaltung selbst erlebt, wie viel Zeit durch
                veraltete Prozesse verloren geht – Zeit, die eigentlich der Patientenversorgung
                gehört.
              </p>
              <p>
                Genau das war der Anlass, centof.ai zu gründen: eine Plattform, die die
                alltäglichen Probleme in Kliniken und Praxen wirklich löst, statt sie nur zu
                verwalten.
              </p>
            </Reveal>
            <Reveal>
              <div className="gh-pull-quote">
                <p>Wir kennen die Probleme, weil wir sie selbst erlebt haben.</p>
              </div>
              <div className="gh-badge-list">
                <div className="gh-badge-item">
                  <b>Medizinischer Hintergrund</b>
                  <br />
                  Klinik- und Praxiserfahrung im Team
                </div>
                <div className="gh-badge-item">
                  <b>Wirtschaftlicher Hintergrund</b>
                  <br />
                  Prozess- und Produktverständnis im Team
                </div>
                <div className="gh-badge-item">
                  <b>DACH-Fokus</b>
                  <br />
                  Entwickelt für Deutschland, Schweiz, Österreich
                </div>
              </div>
            </Reveal>
          </section>

          {/* STATS */}
          <section className="gh-section">
            <Reveal className="gh-stats-head">
              <div className="gh-eyebrow">DIE REALITÄT IN ZAHLEN</div>
              <h2>Was fehlende Digitalisierung Kliniken, Praxen und Personal tatsächlich kostet</h2>
              <p>
                Das Problem ist selten fehlendes Geld oder fehlender Wille. Zahlen aus
                Deutschland und der Schweiz zeigen: Es fehlt an Prozessen, die wirklich im
                Alltag ankommen.
              </p>
            </Reveal>

            <div className="gh-country-grid">
              <Reveal>
                <div className="gh-country-label gh-de">
                  <span>DEUTSCHLAND</span>
                  <span className="gh-count">6 Kennzahlen</span>
                </div>
                {STATS_DE.map((stat) => (
                  <div className="gh-full-tick" key={stat.n + stat.l}>
                    <div className="gh-n">{stat.n}</div>
                    <div className="gh-meta">
                      <div className="gh-l">{stat.l}</div>
                      <div className="gh-s">{stat.s}</div>
                    </div>
                  </div>
                ))}
              </Reveal>

              <Reveal>
                <div className="gh-country-label gh-ch">
                  <span>SCHWEIZ</span>
                  <span className="gh-count">6 Kennzahlen</span>
                </div>
                {STATS_CH.map((stat) => (
                  <div className="gh-full-tick" key={stat.n + stat.l}>
                    <div className="gh-n">{stat.n}</div>
                    <div className="gh-meta">
                      <div className="gh-l">{stat.l}</div>
                      <div className="gh-s">{stat.s}</div>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* CTA */}
          <section className="gh-section gh-cta">
            <Reveal>
              <h2>Haben Sie ein Problem, das gelöst werden sollte?</h2>
            </Reveal>
            <Reveal>
              <p>
                Schildern Sie uns Ihre Herausforderung aus Praxis, Klinik oder Pflege – wir
                prüfen gemeinsam, ob und wie wir sie lösen können.
              </p>
            </Reveal>
            <Reveal>
              <Link href="/kontakt" className="gh-btn-b2">
                Problem schildern
                <span className="gh-arrow-circle">
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
