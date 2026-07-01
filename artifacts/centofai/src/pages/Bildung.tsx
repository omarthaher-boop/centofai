import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "../components/Navbar";

function setMeta() {
  document.title = "centof.ai — Bildung";
  const desc =
    "Wir kennen die Probleme im Studienalltag, weil wir sie selbst erlebt haben. centof.ai entwickelt digitale Lösungen aus echten Digitalisierungslücken im Hochschulalltag.";
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
            el.classList.add("bl-in");
          }
        });
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`bl-reveal ${className}`}>
      {children}
    </div>
  );
}

const PROBLEMS: { tag: string; title: string; text: string; ch?: boolean }[] = [
  {
    tag: "01",
    title: "Fragmentierte Studierendenverwaltung",
    text: "Von der Bewerbung bis zur Exmatrikulation läuft der studentische Lebenszyklus an den wenigsten Hochschulen durchgängig digital: Nur 41,9 Prozent bieten eine vollständig digitale Immatrikulation, und die Kommunikation zwischen Hochschulen, Krankenkassen und Finanzämtern bleibt lückenhaft.",
  },
  {
    tag: "02",
    title: "Der Zeitverlust hinter der Bürokratie — wirtschaftliche Folge",
    text: "Wo Prozesse nicht digital verzahnt sind, müssen Studierende dieselben Nachweise mehrfach einreichen und enge Sprechzeiten der Ämter wahrnehmen. Diese Zeit fehlt dort, wo sie eigentlich hingehört: beim Nebenjob, von dem 70 bis 72 Prozent der Studierenden abhängig sind, um ihr Budget zu decken.",
  },
  {
    tag: "03",
    title: "Unsicherheit ohne Statusübersicht — psychische Folge",
    text: "Fehlende digitale Übersicht bei Anträgen – etwa für Finanzierungshilfen oder Prüfungsanmeldungen – erzeugt zusätzliche Unsicherheit. Für eine Gruppe, die bereits mit historischen Höchstwerten bei Erschöpfung kämpft, ist das ein Stressfaktor, der sich vermeiden ließe.",
  },
  {
    tag: "04",
    title: "Fallbeispiel Schweiz: der Maturitäts-Umweg",
    text: "Bei der Immatrikulation müssen Schweizer Hochschulen Maturitätszeugnisse weiterhin durch manuelle Kontrolle der Originaldiplome prüfen – kostspielig und ineffizient. Eine digitale Lösung auf Basis der neuen E-ID existiert bislang nur als Pilotprojekt in einem einzelnen Kanton.",
    ch: true,
  },
  {
    tag: "05",
    title: "Die Generationenkluft in der Verwaltung",
    text: "Während 99 Prozent der 16- bis 24-Jährigen in der Schweiz regelmässig online sind, bleibt die Verwaltung selbst analog geprägt: Die staatliche E-ID wurde 2021 an der Urne abgelehnt und kommt frühestens Ende 2026. Wer digital sozialisiert ist, trifft auf Prozesse, die es nicht sind.",
  },
  {
    tag: "06",
    title: "Im internationalen Vergleich zurück",
    text: "Während einzelne US-Hochschulen fragmentierte Studierendenportale längst durch einheitliche digitale Plattformen ersetzt und Registrierung sowie Förderanträge automatisiert haben, bewegen sich deutsche und Schweizer Hochschulen noch in der Pilotphase. Selbst das für seine Bürokratie bekannte Deutschland ist bei manchen E-Government-Projekten inzwischen weiter als die Schweiz.",
  },
];

const USA_ROWS = [
  {
    n: "MyBU",
    l: "Boston University ersetzte ein fragmentiertes, 35 Jahre altes Studierendenportal durch eine einheitliche digitale Plattform",
    s: "Quelle: PagerDuty, Digital Transformation in Higher Education",
  },
  {
    n: "+17 Pp.",
    l: "höhere Erfolgsquote in Grundkursen seit Einführung adaptiver Lernplattformen an der Arizona State University (EdPlus)",
    s: "Quelle: PagerDuty, ASU EdPlus",
  },
  {
    n: "RPA im Einsatz",
    l: "Automatisierte Prozesse für Einschreibung, Förderanträge und Aktenverwaltung an mehreren US-Hochschulen",
    s: "Quelle: Prosci / PagerDuty",
  },
  {
    n: "67 %",
    l: "der US-Studierenden erledigen Studienarbeiten bereits mobil – Verwaltung wird zunehmend mobil-first gedacht",
    s: "Quelle: Apporto / Prosci Higher-Ed Report",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Problem schildern",
    text: "Sie beschreiben uns eine konkrete Herausforderung aus Ihrem Studien- oder Hochschulalltag – administrativ, organisatorisch oder fachlich.",
  },
  {
    n: "02",
    title: "Gemeinsam prüfen",
    text: "Wir besprechen das Problem direkt mit den Betroffenen und suchen gemeinsam nach einer passenden Lösung.",
  },
  {
    n: "03",
    title: "Digital umsetzen",
    text: "Unser Team setzt die Lösung auf unserer Plattform um – gebaut von Menschen, die den Studien- und Wissenschaftsalltag selbst kennen.",
  },
];

const STATS_DE = [
  {
    n: "41,9 %",
    l: "der Hochschulen bieten eine vollständig digitale Immatrikulation",
    s: "Quelle: PwC, Digitalisierung an Universitäten",
  },
  {
    n: "66,3 %",
    l: "der Hochschulen stellen Prüfungs- und Notenbescheide digital aus",
    s: "Quelle: PwC, Digitalisierung an Universitäten",
  },
  {
    n: "55,8 %",
    l: "der Hochschulen haben ein komplett digitales Bewerbungsverfahren für Studienplätze",
    s: "Quelle: PwC, Digitalisierung an Universitäten",
  },
  {
    n: "46,5 %",
    l: "der Lehrenden kennen die Digitalisierungsstrategie ihrer eigenen Hochschule – trotz 93,5 % Abdeckung",
    s: "Quelle: Monitor Digitalisierung 360°, Hochschulforum Digitalisierung",
  },
  {
    n: "≤ 1 von 5",
    l: "Hochschulen hat Digitalisierung in den übrigen Verwaltungsbereichen konsequent umgesetzt",
    s: "Quelle: PwC, Digitalisierung an Universitäten",
  },
  {
    n: "72 %",
    l: "der Hochschulen bauten in 5 Jahren ihr WLAN aus – Kernprozesse der Verwaltung blieben davon oft unberührt",
    s: "Quelle: HIS-Institut für Hochschulentwicklung, 2026",
  },
];

const STATS_CH = [
  {
    n: "Platz 4 / 64",
    l: "im IMD World Digital Competitiveness Ranking – starke Wissensbasis, aber schwache Verwaltungsdigitalisierung",
    s: "Quelle: IMD World Digital Competitiveness Ranking, 2026",
  },
  {
    n: "Seit 2021 abgelehnt",
    l: "die staatliche E-ID; frühestens Ende 2026 in überarbeiteter Form, Fachleute zweifeln am Termin",
    s: "Quelle: NZZ, 2026",
  },
  {
    n: "65 %",
    l: "der Bevölkerung verfügen über grundlegende Software-Kenntnisse – solide, aber ausbaufähig",
    s: "Quelle: Digitalisierungsindex Schweiz, 2026",
  },
  {
    n: "38.000",
    l: "unbesetzte IT-Stellen in der Schweiz – akuter Fachkräftemangel bremst auch Hochschul-Digitalisierung",
    s: "Quelle: Digitalisierungsindex Schweiz, 2026",
  },
  {
    n: "Manuelle Prüfung",
    l: "Maturitätszeugnisse werden bei der Immatrikulation weiterhin durch Kontrolle der Originaldiplome geprüft",
    s: "Quelle: Digitale Verwaltung Schweiz",
  },
  {
    n: "99 % vs. 74 %",
    l: "Internetnutzung 16- bis 24-Jährige gegenüber über 65-Jährigen – deutliche Generationenkluft",
    s: "Quelle: Digitalisierungsindex Schweiz, 2026",
  },
];

export default function Bildung() {
  setMeta();

  return (
    <div style={{ minHeight: "100vh", background: "#07071a", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .bl-page { position: relative; z-index: 1; }
        .bl-space-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(127,119,221,0.18) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .bl-orb { position: fixed; border-radius: 50%; filter: blur(42px); pointer-events: none; z-index: 0; }
        .bl-orb-1 { width: 260px; height: 260px; background: #534AB7; opacity: 0.08; top: 8%; right: 6%; animation: bl-drift1 24s ease-in-out infinite; }
        .bl-orb-2 { width: 160px; height: 160px; background: #5DCAA5; opacity: 0.06; bottom: 8%; left: 4%; animation: bl-drift2 28s ease-in-out infinite; }
        @keyframes bl-drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-18px,26px); } }
        @keyframes bl-drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(22px,-18px); } }
        @media (prefers-reduced-motion: reduce) { .bl-orb { animation: none; } }

        .bl-section { max-width: 1160px; margin: 0 auto; padding: 100px 32px; }
        .bl-eyebrow {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.14em;
          text-transform: uppercase; color: #5DCAA5; margin-bottom: 22px; display: flex; align-items: center; gap: 10px;
        }
        .bl-eyebrow::before { content: ''; width: 16px; height: 1px; background: #5DCAA5; display: inline-block; }
        .bl-page h1, .bl-page h2, .bl-page h3 { font-family: 'Space Grotesk', sans-serif; font-weight: 600; letter-spacing: -0.01em; color: #EEEDFE; }

        .bl-hero { padding-top: 60px; }
        .bl-hero-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 64px; align-items: start; }
        .bl-hero h1 { font-size: clamp(30px,4.3vw,48px); line-height: 1.22; margin-bottom: 26px; }
        .bl-hero h1 .bl-hl { color: #CECBF6; }
        .bl-hero .bl-lead { font-size: 18px; color: #AFA9EC; max-width: 520px; }
        .bl-hero .bl-slogan-line { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 500; color: #5DCAA5; margin-bottom: 16px; max-width: 520px; }

        .bl-ticker-box { border-top: 1px solid rgba(127,119,221,0.18); padding-top: 18px; margin-top: 6px; }
        .bl-ticker-title { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; color: #AFA9EC; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
        .bl-pulse { width: 6px; height: 6px; border-radius: 50%; background: #5DCAA5; display: inline-block; margin-right: 8px; animation: bl-pulse 2s ease-in-out infinite; }
        @keyframes bl-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media (prefers-reduced-motion: reduce) { .bl-pulse { animation: none; } }
        .bl-tick-row { display: flex; justify-content: space-between; gap: 16px; padding: 13px 0; border-bottom: 1px solid rgba(127,119,221,0.18); }
        .bl-tick-row:last-child { border-bottom: none; }
        .bl-tick-row .bl-n { font-family: 'IBM Plex Mono', monospace; font-size: 15px; color: #EEEDFE; white-space: nowrap; }
        .bl-tick-row .bl-l { font-size: 12px; color: #AFA9EC; text-align: right; max-width: 150px; }
        .bl-ticker-note { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #AFA9EC; opacity: 0.7; margin-top: 16px; }

        .bl-problems-intro { max-width: 640px; margin-bottom: 8px; }
        .bl-problems-intro h2 { font-size: clamp(28px,3.6vw,38px); line-height: 1.25; margin-top: 16px; }
        .bl-problems-intro p { color: #AFA9EC; font-size: 16px; margin-top: 14px; }
        .bl-problem-row { display: grid; grid-template-columns: 90px 1fr; gap: 28px; padding: 28px 0; border-bottom: 1px solid rgba(127,119,221,0.18); align-items: start; }
        .bl-problem-row.bl-first { border-top: 1px solid rgba(127,119,221,0.18); margin-top: 36px; }
        .bl-problem-tag { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #CECBF6; padding-top: 3px; }
        .bl-problem-row.bl-ch-spot .bl-problem-tag { color: #5DCAA5; }
        .bl-problem-row h3 { font-size: 17px; margin-bottom: 8px; }
        .bl-problem-row.bl-ch-spot h3 { color: #5DCAA5; }
        .bl-problem-row p { font-size: 14.5px; color: #AFA9EC; max-width: 640px; }
        .bl-problems-close { margin-top: 44px; }

        .bl-usa-panel { background: rgba(127,119,221,0.05); border: 1px solid rgba(127,119,221,0.18); border-radius: 16px; padding: 36px 40px; margin-top: 8px; }
        .bl-usa-row { display: flex; justify-content: space-between; gap: 24px; padding: 16px 0; border-bottom: 1px solid rgba(127,119,221,0.18); }
        .bl-usa-row:last-child { border-bottom: none; }
        .bl-usa-row .bl-n { font-family: 'IBM Plex Mono', monospace; font-size: 15px; font-weight: 600; color: #CECBF6; white-space: nowrap; flex-shrink: 0; }
        .bl-usa-row .bl-meta { text-align: right; }
        .bl-usa-row .bl-l { font-size: 13.5px; color: #EEEDFE; margin-bottom: 3px; }
        .bl-usa-row .bl-s { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: #AFA9EC; opacity: 0.7; }
        .bl-usa-caveat { font-size: 12.5px; color: #AFA9EC; opacity: 0.75; margin-top: 20px; max-width: 640px; }

        .bl-process-row { display: grid; grid-template-columns: 120px 1fr; gap: 32px; padding: 34px 0; border-bottom: 1px solid rgba(127,119,221,0.18); align-items: start; }
        .bl-process-row:first-of-type { border-top: 1px solid rgba(127,119,221,0.18); }
        .bl-process-num { font-family: 'IBM Plex Mono', monospace; font-size: 44px; color: #7F77DD; opacity: 0.35; line-height: 1; }
        .bl-process-row:nth-child(3) .bl-process-num { color: #5DCAA5; }
        .bl-process-body h3 { font-size: 20px; margin-bottom: 10px; }
        .bl-process-body p { font-size: 15px; color: #AFA9EC; max-width: 560px; }

        .bl-pull-quote { border-left: 2px solid #5DCAA5; padding-left: 22px; margin-bottom: 32px; }
        .bl-pull-quote p { font-family: 'Space Grotesk', sans-serif; font-size: 22px; line-height: 1.4; color: #EEEDFE; max-width: none; font-weight: 500; }

        .bl-origin-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: start; }
        .bl-origin-grid p { font-size: 16px; color: #AFA9EC; max-width: 520px; margin-bottom: 18px; }
        .bl-badge-list { display: flex; flex-direction: column; gap: 14px; }
        .bl-badge-item { display: flex; align-items: baseline; gap: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #AFA9EC; border-bottom: 1px solid rgba(127,119,221,0.18); padding-bottom: 14px; }
        .bl-badge-item b { color: #EEEDFE; font-family: 'Inter', sans-serif; font-size: 14.5px; font-weight: 600; }

        .bl-stats-head { max-width: 680px; margin-bottom: 64px; }
        .bl-stats-head h2 { font-size: clamp(28px,3.6vw,38px); line-height: 1.25; margin-bottom: 18px; }
        .bl-stats-head p { color: #AFA9EC; font-size: 16px; }

        .bl-country-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
        .bl-country-label { font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.12em; padding-bottom: 14px; border-bottom: 1px solid rgba(127,119,221,0.18); margin-bottom: 4px; display: flex; justify-content: space-between; }
        .bl-country-label.bl-de { color: #CECBF6; }
        .bl-country-label.bl-ch { color: #5DCAA5; }
        .bl-country-label span.bl-count { color: #AFA9EC; }

        .bl-full-tick { display: flex; justify-content: space-between; gap: 20px; padding: 20px 0; border-bottom: 1px solid rgba(127,119,221,0.18); }
        .bl-full-tick .bl-n { font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 600; color: #EEEDFE; white-space: nowrap; flex-shrink: 0; }
        .bl-country-grid > div:first-child .bl-full-tick .bl-n { color: #CECBF6; }
        .bl-country-grid > div:last-child .bl-full-tick .bl-n { color: #5DCAA5; }
        .bl-full-tick .bl-meta { text-align: right; }
        .bl-full-tick .bl-l { font-size: 13.5px; color: #EEEDFE; margin-bottom: 4px; }
        .bl-full-tick .bl-s { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: #AFA9EC; opacity: 0.7; }

        .bl-cta { text-align: center; padding-top: 80px; padding-bottom: 140px; }
        .bl-cta h2 { font-size: clamp(28px,3.6vw,38px); margin-bottom: 16px; }
        .bl-cta p { color: #AFA9EC; font-size: 16px; max-width: 480px; margin: 0 auto 40px; }

        .bl-btn-b2 {
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 15px; color: #EEEDFE; background: #534AB7;
          border: none; border-radius: 100px; padding: 8px 8px 8px 26px; display: inline-flex; align-items: center;
          gap: 16px; cursor: pointer; transition: transform 0.2s ease, background 0.2s ease; text-decoration: none;
        }
        .bl-btn-b2:hover { background: #645ac9; transform: translateY(-1px); }
        .bl-btn-b2 .bl-arrow-circle { width: 34px; height: 34px; border-radius: 50%; background: #185FA5; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bl-btn-b2 .bl-arrow-circle svg { stroke: #B5D4F4; }

        .bl-reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .bl-reveal.bl-in { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .bl-reveal { opacity: 1; transform: none; transition: none; } }

        @media (max-width: 860px) {
          .bl-section { padding: 64px 22px; }
          .bl-hero { padding-top: 40px; }
          .bl-hero-grid, .bl-origin-grid, .bl-country-grid { grid-template-columns: 1fr; gap: 36px; }
          .bl-process-row { grid-template-columns: 60px 1fr; gap: 20px; }
          .bl-process-num { font-size: 30px; }
          .bl-usa-panel { padding: 26px 22px; }
          .bl-usa-row { flex-direction: column; gap: 6px; }
          .bl-usa-row .bl-meta { text-align: left; }
        }
      `}</style>

      <div className="bl-space-bg" />
      <div className="bl-orb bl-orb-1" />
      <div className="bl-orb bl-orb-2" />

      <div className="bl-page">
        <Navbar />

        <main>
          {/* HERO */}
          <section className="bl-section bl-hero">
            <div className="bl-eyebrow">CENTOF.AI · BILDUNG</div>
            <div className="bl-hero-grid">
              <div>
                <p className="bl-slogan-line">
                  Wir kennen die Probleme, weil wir sie selbst erlebt haben.
                </p>
                <h1>
                  Deshalb entwickeln sich unsere Projekte aus{" "}
                  <span className="bl-hl">echten Digitalisierungslücken im Studienalltag</span> –
                  und aus Ihren Ideen.
                </h1>
                <p className="bl-lead">
                  Sie schildern uns eine Herausforderung aus Studium, Hochschule oder Forschung.
                  Wir prüfen gemeinsam mit Ihnen, ob sie sich über unsere Plattform lösen lässt –
                  und entwickeln daraus eine echte digitale Lösung.
                </p>
              </div>
              <Reveal className="bl-ticker-box">
                <div className="bl-ticker-title">
                  <span>
                    <span className="bl-pulse" />
                    LIVE · DIE LAGE
                  </span>
                </div>
                <div className="bl-tick-row">
                  <span className="bl-n">41,9 %</span>
                  <span className="bl-l">digitale Immatrikulation, Deutschland</span>
                </div>
                <div className="bl-tick-row">
                  <span className="bl-n">Seit 2021 abgelehnt</span>
                  <span className="bl-l">E-ID an der Urne, Schweiz</span>
                </div>
                <div className="bl-tick-row">
                  <span className="bl-n">68 %</span>
                  <span className="bl-l">Studierende ausgebrannt, Deutschland</span>
                </div>
                <div className="bl-tick-row">
                  <span className="bl-n">70–72 %</span>
                  <span className="bl-l">arbeiten neben dem Studium, DE/CH</span>
                </div>
                <div className="bl-ticker-note">Alle Zahlen im Detail weiter unten ↓</div>
              </Reveal>
            </div>
          </section>

          {/* PROBLEMFELDER */}
          <section className="bl-section">
            <Reveal className="bl-problems-intro">
              <div className="bl-eyebrow">WAS WIR IM ALLTAG SEHEN</div>
              <h2>
                Wo fehlende Digitalisierung Studierenden täglich Zeit, Geld und Nerven kostet
              </h2>
              <p>
                Aus Studien zur Hochschulverwaltung in Deutschland und der Schweiz ergibt sich ein
                klares Muster: Die Lücke ist selten technischer Natur – sie liegt in der
                fehlenden Verzahnung. Und diese Lücke hat wirtschaftliche, psychische und
                zeitliche Folgen.
              </p>
            </Reveal>

            {PROBLEMS.map((p, i) => (
              <Reveal
                key={p.tag}
                className={`bl-problem-row ${i === 0 ? "bl-first" : ""} ${p.ch ? "bl-ch-spot" : ""}`}
              >
                <div className="bl-problem-tag">{p.tag}</div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}

            <div className="bl-problems-close">
              <Reveal className="bl-pull-quote">
                <p>
                  Der Rückstand ist nicht technischer Natur. Es fehlt an integrierten Prozessen,
                  die Studierenden Zeit, Geld und Nerven sparen.
                </p>
              </Reveal>
            </div>
          </section>

          {/* USA VERGLEICH */}
          <section className="bl-section">
            <Reveal className="bl-eyebrow">IM VERGLEICH</Reveal>
            <Reveal>
              <h2 style={{ fontSize: "clamp(26px,3.4vw,36px)", lineHeight: 1.25, maxWidth: 680, marginBottom: 20 }}>
                Was einzelne US-Hochschulen zeigen
              </h2>
            </Reveal>
            <Reveal>
              <p style={{ color: "#AFA9EC", fontSize: 16, maxWidth: 680, marginBottom: 32 }}>
                Nicht als Massstab für alle US-Institutionen, aber als Beleg, wohin die Reise
                gehen kann, wenn Studierendenverwaltung konsequent digital gedacht wird.
              </p>
            </Reveal>

            <Reveal className="bl-usa-panel">
              {USA_ROWS.map((row) => (
                <div className="bl-usa-row" key={row.n + row.l}>
                  <div className="bl-n">{row.n}</div>
                  <div className="bl-meta">
                    <div className="bl-l">{row.l}</div>
                    <div className="bl-s">{row.s}</div>
                  </div>
                </div>
              ))}
              <div className="bl-usa-caveat">
                Auch in den USA gilt: Legacy-Systeme und Budgetzwänge bremsen viele Institutionen.
                Die genannten Beispiele sind Vorreiter, kein Durchschnitt.
              </div>
            </Reveal>
          </section>

          {/* PROCESS */}
          <section className="bl-section">
            <Reveal className="bl-eyebrow">SO ARBEITEN WIR</Reveal>
            {PROCESS.map((step) => (
              <Reveal key={step.n} className="bl-process-row">
                <div className="bl-process-num">{step.n}</div>
                <div className="bl-process-body">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </section>

          {/* ORIGIN */}
          <section className="bl-section bl-origin-grid">
            <Reveal>
              <div className="bl-eyebrow">WARUM CENTOF.AI</div>
              <p>
                Unser Team kommt ursprünglich aus der Wissenschaft und der Wirtschaft. Wir haben
                selbst studiert, promoviert und in akademischen Strukturen gearbeitet – und
                wissen daher, wie viel Zeit und Energie durch veraltete, unverzahnte Prozesse
                verloren geht.
              </p>
              <p>
                Genau das war der Anlass, centof.ai zu gründen: eine Plattform, die die
                alltäglichen Probleme von Studierenden und Hochschulen wirklich löst, statt sie
                nur zu verwalten.
              </p>
            </Reveal>
            <Reveal>
              <div className="bl-pull-quote">
                <p>Wir kennen die Probleme, weil wir sie selbst erlebt haben.</p>
              </div>
              <div className="bl-badge-list">
                <div className="bl-badge-item">
                  <b>Akademischer Hintergrund</b>
                  <br />
                  Eigene Studien- und Forschungserfahrung im Team
                </div>
                <div className="bl-badge-item">
                  <b>Wirtschaftlicher Hintergrund</b>
                  <br />
                  Prozess- und Produktverständnis im Team
                </div>
                <div className="bl-badge-item">
                  <b>DACH-Fokus</b>
                  <br />
                  Entwickelt für Deutschland, Schweiz, Österreich
                </div>
              </div>
            </Reveal>
          </section>

          {/* STATS */}
          <section className="bl-section">
            <Reveal className="bl-stats-head">
              <div className="bl-eyebrow">DIGITALISIERUNGSLÜCKEN IN ZAHLEN</div>
              <h2>Wie weit Deutschland und die Schweiz bei der Hochschul-Digitalisierung wirklich sind</h2>
              <p>
                Die Zahlen zeigen: Es geht nicht um fehlenden Willen, sondern um unvollständige
                Umsetzung – mit direkten wirtschaftlichen, psychischen und zeitlichen Folgen für
                Studierende.
              </p>
            </Reveal>

            <div className="bl-country-grid">
              <Reveal>
                <div className="bl-country-label bl-de">
                  <span>DEUTSCHLAND</span>
                  <span className="bl-count">6 Kennzahlen</span>
                </div>
                {STATS_DE.map((stat) => (
                  <div className="bl-full-tick" key={stat.n + stat.l}>
                    <div className="bl-n">{stat.n}</div>
                    <div className="bl-meta">
                      <div className="bl-l">{stat.l}</div>
                      <div className="bl-s">{stat.s}</div>
                    </div>
                  </div>
                ))}
              </Reveal>

              <Reveal>
                <div className="bl-country-label bl-ch">
                  <span>SCHWEIZ</span>
                  <span className="bl-count">6 Kennzahlen</span>
                </div>
                {STATS_CH.map((stat) => (
                  <div className="bl-full-tick" key={stat.n + stat.l}>
                    <div className="bl-n">{stat.n}</div>
                    <div className="bl-meta">
                      <div className="bl-l">{stat.l}</div>
                      <div className="bl-s">{stat.s}</div>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* CTA */}
          <section className="bl-section bl-cta">
            <Reveal>
              <h2>Haben Sie ein Problem, das gelöst werden sollte?</h2>
            </Reveal>
            <Reveal>
              <p>
                Schildern Sie uns Ihre Herausforderung aus Studium, Hochschule oder Forschung –
                wir prüfen gemeinsam, ob und wie wir sie lösen können.
              </p>
            </Reveal>
            <Reveal>
              <Link href="/kontakt" className="bl-btn-b2">
                Problem schildern
                <span className="bl-arrow-circle">
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
