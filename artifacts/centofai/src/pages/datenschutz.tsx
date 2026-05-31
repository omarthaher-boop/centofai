import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";

export default function DatenschutzPage() {
  useEffect(() => {
    document.title = "Datenschutzerklärung – CentofAI";
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] font-sans antialiased">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-caption)] hover:text-white transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-extrabold mb-2">Datenschutzerklärung</h1>
        <p className="text-[var(--text-caption)] text-sm mb-10">Stand: {new Date().getFullYear()}</p>

        <div className="space-y-6 text-sm leading-relaxed">
          <Section title="1. Verantwortlicher">
            <p className="text-[var(--text-caption)] italic">
              [Firmenname oder vollständiger Name]<br />
              [Anschrift]<br />
              E-Mail:{" "}
              <a href="mailto:hello@centofai.com" className="text-purple-400 hover:text-purple-300 transition">
                hello@centofai.com
              </a>
            </p>
          </Section>

          <Section title="2. Erhobene Daten">
            <p className="text-[var(--text-caption)]">
              Wir erheben und verarbeiten folgende personenbezogene Daten:
            </p>
            <ul className="list-disc list-inside text-[var(--text-caption)] mt-2 space-y-1">
              <li>Kontodaten (E-Mail-Adresse) bei der Registrierung über Clerk</li>
              <li>Name und E-Mail bei der Einreichung von Ideen oder Projektvorschlägen</li>
              <li>E-Mail-Adresse bei der Newsletter-Anmeldung</li>
              <li>Namen und URLs eingereichter KI-Tools</li>
              <li>Serverlogs (IP-Adresse, Zeitstempel, aufgerufene Seiten)</li>
            </ul>
          </Section>

          <Section title="3. Zweck der Verarbeitung">
            <p className="text-[var(--text-caption)]">
              Die Daten werden ausschließlich für folgende Zwecke verarbeitet:
            </p>
            <ul className="list-disc list-inside text-[var(--text-caption)] mt-2 space-y-1">
              <li>Bereitstellung und Verbesserung des Dienstes</li>
              <li>Beantwortung von Anfragen und Projektvorschlägen</li>
              <li>Versand des Newsletters (nur nach expliziter Einwilligung)</li>
              <li>Sicherheit und Missbrauchsprävention</li>
            </ul>
          </Section>

          <Section title="4. Rechtsgrundlage">
            <p className="text-[var(--text-caption)]">
              Die Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) sowie
              Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), insbesondere für den Newsletter.
            </p>
          </Section>

          <Section title="5. Speicherdauer">
            <p className="text-[var(--text-caption)]">
              Personenbezogene Daten werden gelöscht, sobald der Zweck der Verarbeitung entfällt oder du eine
              Löschung anforderst. Konten können jederzeit im Bereich „Konto" gelöscht werden.
            </p>
          </Section>

          <Section title="6. Weitergabe an Dritte">
            <p className="text-[var(--text-caption)]">
              Daten werden nicht an Dritte verkauft. Für die Authentifizierung nutzen wir{" "}
              <a href="https://clerk.com" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 transition">
                Clerk
              </a>{" "}
              (USA). Die Datenübertragung erfolgt auf Basis der Standardvertragsklauseln der EU-Kommission.
            </p>
          </Section>

          <Section title="7. Deine Rechte">
            <p className="text-[var(--text-caption)]">
              Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Datenübertragbarkeit und Widerspruch. Wende dich dazu an:{" "}
              <a href="mailto:hello@centofai.com" className="text-purple-400 hover:text-purple-300 transition">
                hello@centofai.com
              </a>
            </p>
          </Section>

          <Section title="8. Cookies">
            <p className="text-[var(--text-caption)]">
              Wir setzen ausschließlich technisch notwendige Cookies ein (Session-Cookies für die Authentifizierung).
              Es werden keine Tracking- oder Marketing-Cookies verwendet.
            </p>
          </Section>

          <Section title="9. Beschwerderecht">
            <p className="text-[var(--text-caption)]">
              Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, z. B. beim
              Landesbeauftragten für Datenschutz und Informationsfreiheit deines Bundeslandes.
            </p>
          </Section>

          <p className="text-xs text-[var(--text-label)] border-t border-[var(--border-color)] pt-6">
            Bitte ergänze die mit <em>[...]</em> markierten Felder mit deinen tatsächlichen Angaben, bevor du diese Seite veröffentlichst.
          </p>
        </div>
      </main>

      <footer className="border-t border-[var(--border-color)] py-8 text-center text-xs text-[var(--text-label)] mt-12">
        <p>© {new Date().getFullYear()} CentofAI. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-[var(--border-color)] rounded-2xl p-6 bg-[var(--bg-card)]/40">
      <h2 className="text-base font-bold mb-3 text-white">{title}</h2>
      {children}
    </section>
  );
}
