import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function FahrtDocKontoLoeschenPage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/products/fahrtdoc"
            className="inline-flex items-center gap-2 text-sm text-[#0066CC] hover:text-[#0044AA] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zu FahrtDoc
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#0066CC]/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-[#0066CC]" />
            </div>
            <span className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider">
              FahrtDoc
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-heading mb-10">
            Konto und Daten löschen
          </h1>

          <div className="prose-custom space-y-6">

            <p className="text-body leading-relaxed">
              Du kannst dein FahrtDoc-Konto und alle damit verbundenen Daten jederzeit löschen lassen.
            </p>

            <Section title="Option 1: Direkt in der App">
              <p>
                Öffne FahrtDoc → Profil → «Konto löschen». Bestätige die Löschung – dein Konto und
                alle zugehörigen Daten werden umgehend entfernt.
              </p>
            </Section>

            <Section title="Option 2: Ohne die App">
              <p className="text-caption text-xs mb-3">(z. B. wenn du sie bereits deinstalliert hast)</p>
              <p>
                Schick eine E-Mail an{" "}
                <a href="mailto:info@centof.ai?subject=Konto%20löschen" className="text-[#0066CC] hover:underline">
                  info@centof.ai
                </a>{" "}
                mit Betreff <strong>«Konto löschen»</strong> von der E-Mail-Adresse, mit der du dich
                in FahrtDoc registriert hast. Wir bestätigen den Eingang und löschen dein Konto
                innerhalb von 7 Werktagen.
              </p>
            </Section>

            <Section title="Was auf unseren Servern gelöscht wird">
              <ul>
                <li>Dein Profil (Name, E-Mail-Adresse, Kontoeinstellungen)</li>
                <li>Alle erfassten Fahrten und GPS-Streckendaten</li>
                <li>Deine Fahrzeugdaten (inkl. Kennzeichen)</li>
              </ul>
            </Section>

            <Section title="Was gar nicht erst auf unseren Servern liegt">
              <p>
                Belege/Quittungen, Kartenansichten und erfasste Kosten speichert FahrtDoc
                ausschliesslich lokal auf deinem Gerät – niemals auf unseren Servern oder in einer
                Cloud. Diese Daten werden automatisch entfernt, sobald du die App deinstallierst
                oder deine Gerätedaten löschst.
              </p>
            </Section>

            <Section title="Keine gesetzliche Aufbewahrungspflicht">
              <p>
                FahrtDoc ist keine offizielle App zur Steuererklärung oder zur Erfüllung von
                Aufbewahrungspflichten gegenüber dem Finanzamt – sie dient dir ausschliesslich als
                persönliche Übersicht deiner Fahrten und Kosten. Es besteht daher keine rechtliche
                Verpflichtung, deine Daten über die Kontolöschung hinaus aufzubewahren: Nach der
                Löschung werden alle bei uns gespeicherten Daten vollständig entfernt.
              </p>
            </Section>

            <Section title="Abo- und Zahlungsinformationen">
              <p>
                FahrtDoc speichert selbst keine Zahlungsdaten. Käufe und Abonnements werden
                vollständig über den Apple App Store bzw. Google Play verwaltet. Ein bestehendes Abo
                wird durch die Kontolöschung nicht automatisch gekündigt – das musst du zusätzlich
                direkt im App Store bzw. bei Google Play tun.
              </p>
            </Section>

            <Section title="Bearbeitungszeit">
              <p>
                Löschanfragen werden innerhalb von 7 Werktagen bearbeitet.
              </p>
            </Section>

          </div>

          <div className="mt-12 pt-6 border-t border-theme text-caption text-xs">
            CentofAI / FahrtDoc
          </div>
        </motion.div>
      </div>

      <style>{`
        .prose-custom p { color: var(--text-body); line-height: 1.7; }
        .prose-custom ul { margin-top: 0.5rem; padding-left: 1.25rem; list-style: disc; }
        .prose-custom ul li { color: var(--text-body); margin-bottom: 0.25rem; line-height: 1.6; }
        .prose-custom strong { color: var(--text-heading); }
        .prose-custom a { transition: color 0.2s; }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-card-theme border border-theme p-6 md:p-8 space-y-3"
    >
      <h2 className="text-base font-bold text-heading">{title}</h2>
      <div className="prose-custom space-y-2">{children}</div>
    </motion.div>
  );
}
