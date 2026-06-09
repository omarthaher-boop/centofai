import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";

export default function FahrtDocDatenschutzPage() {
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
              <Shield className="w-5 h-5 text-[#0066CC]" />
            </div>
            <span className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider">
              FahrtDoc
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-heading mb-1">
            Datenschutzerklärung
          </h1>
          <p className="text-caption text-sm mb-10">
            Stand: 08.06.2026
          </p>

          <div className="prose-custom space-y-8">

            <Section number="1" title="Verantwortliche Stelle">
              <p>
                Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten im Sinne des Schweizer
                Bundesgesetzes über den Datenschutz (nDSG) sowie der EU-Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <div className="mt-3 p-4 rounded-xl bg-card-theme border border-theme text-sm space-y-1">
                <p className="font-semibold text-heading">CentofAI / Dr. Omar Thaher</p>
                <p>Arbon, Schweiz</p>
                <p>E-Mail: <a href="mailto:info@centof.ai" className="text-[#0066CC] hover:underline">info@centof.ai</a></p>
                <p>Website: <a href="https://centof.ai" className="text-[#0066CC] hover:underline">centof.ai</a></p>
              </div>
            </Section>

            <Section number="2" title="Allgemeines">
              <p>
                Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Verarbeitung
                personenbezogener Daten bei der Nutzung der mobilen Applikation FahrtDoc (nachfolgend «App»).
                Die App steht für iOS (Apple App Store) und Android (Google Play Store) zur Verfügung.
              </p>
              <p className="mt-3">
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
            </Section>

            <Section number="3" title="Erhobene und verarbeitete Daten">
              <SubSection title="3.1 Standort- und GPS-Daten">
                <p>
                  Die App erhebt Standortdaten ausschliesslich während aktiver Fahrten, um die
                  zurückgelegte Strecke, Kilometer, Fahrtdauer sowie Start- und Zielorte zu
                  dokumentieren. Standortdaten werden nicht im Hintergrund erfasst, wenn keine
                  Fahrt aktiv ist.
                </p>
                <p className="mt-2 font-medium text-heading">Gespeichert werden:</p>
                <ul>
                  <li>GPS-Koordinaten (Start, Zwischenpunkte, Ziel)</li>
                  <li>Fahrtdauer und -distanz</li>
                  <li>Zeitstempel der Fahrt</li>
                  <li>Automatisch ermittelte Ortsnamen (Start und Ziel)</li>
                </ul>
              </SubSection>

              <SubSection title="3.2 Biometrische Authentifizierungsdaten">
                <p>
                  FahrtDoc unterstützt Face ID und Fingerabdruck-Authentifizierung zur Sicherung
                  des App-Zugangs. Diese biometrischen Daten werden ausschliesslich auf Ihrem Gerät
                  verarbeitet und niemals an externe Server übermittelt. Die Verarbeitung erfolgt
                  vollständig durch das Betriebssystem (iOS/Android) ohne Zugriff durch unsere App.
                </p>
              </SubSection>

              <SubSection title="3.3 Exportierte Daten">
                <p>
                  Fahrtenprotokolle können als PDF- oder CSV-Dateien exportiert werden. Diese Dateien
                  verlassen die App erst, wenn Sie den Export aktiv auslösen. Die Speicherung und
                  Weitergabe dieser Exporte liegt in Ihrer Verantwortung.
                </p>
              </SubSection>

              <SubSection title="3.4 Zahlungs- und Abonnementdaten">
                <p>
                  Bei der Nutzung kostenpflichtiger Funktionen werden Zahlungsabwicklung und
                  Abonnementverwaltung durch RevenueCat Inc. (USA) vorgenommen. FahrtDoc hat keinen
                  direkten Zugriff auf Ihre Zahlungsmitteldetails. Es werden lediglich
                  Abonnementstatus, Transaktions-IDs und anonymisierte Nutzer-IDs verarbeitet.
                </p>
              </SubSection>

              <SubSection title="3.5 Technische Daten / Backend">
                <p>
                  Zur Bereitstellung der App-Funktionen wird ein Backend-Server auf der Plattform
                  Railway (Railway Corp., USA) betrieben. Dort können folgende Daten anfallen:
                </p>
                <ul>
                  <li>Anonymisierte Gerätekennungen</li>
                  <li>Technische Verbindungsdaten (IP-Adresse, Zeitstempel)</li>
                  <li>Fehlerprotokolle zur Qualitätssicherung</li>
                </ul>
              </SubSection>
            </Section>

            <Section number="4" title="Rechtsgrundlagen der Verarbeitung">
              <p>Die Verarbeitung Ihrer Daten erfolgt auf folgenden Rechtsgrundlagen:</p>
              <ul>
                <li>
                  <strong>Vertragserfüllung</strong> (Art. 6 Abs. 1 lit. b DSGVO / Art. 31 Abs. 2 lit. a nDSG):
                  Für die Kernfunktionen der App (Fahrterfassung, Fahrtenbuch)
                </li>
                <li>
                  <strong>Einwilligung</strong> (Art. 6 Abs. 1 lit. a DSGVO / Art. 31 Abs. 1 nDSG):
                  Für die Standortnutzung, soweit Sie diese beim ersten App-Start erteilen
                </li>
                <li>
                  <strong>Berechtigte Interessen</strong> (Art. 6 Abs. 1 lit. f DSGVO):
                  Für technische Optimierung, Fehlerbehebung und Sicherheit
                </li>
              </ul>
            </Section>

            <Section number="5" title="Zwecke der Datenverarbeitung">
              <p>Ihre Daten werden ausschliesslich für folgende Zwecke verwendet:</p>
              <ul>
                <li>Automatische Erfassung und Dokumentation von Fahrten</li>
                <li>Erstellung und Verwaltung des persönlichen Fahrtenbuchs</li>
                <li>Export der Fahrtendaten als PDF oder CSV</li>
                <li>Bereitstellung der Abonnement-Funktionen über RevenueCat</li>
                <li>Technischer Betrieb, Sicherheit und Fehlerdiagnose</li>
              </ul>
            </Section>

            <Section number="6" title="Speicherdauer">
              <p>
                Fahrtendaten werden lokal auf Ihrem Gerät gespeichert und verbleiben dort, bis Sie
                diese aktiv löschen. Für steuerrechtlich relevante Fahrtenprotokolle empfehlen wir
                eine Aufbewahrungsdauer von mindestens 10 Jahren gemäss schweizerischem und
                europäischem Steuerrecht.
              </p>
              <p className="mt-3">
                Backend-seitige technische Protokolldaten werden nach spätestens 90 Tagen
                automatisch gelöscht.
              </p>
            </Section>

            <Section number="7" title="Drittanbieter und Datenweitergabe">
              <SubSection title="7.1 RevenueCat Inc.">
                <p>
                  RevenueCat, 633 Tasman Drive, San Jose, CA 95134, USA, verwaltet Abonnements und
                  In-App-Käufe. RevenueCat ist nach dem EU-US Data Privacy Framework zertifiziert.
                  Weitere Informationen:{" "}
                  <a href="https://www.revenuecat.com/privacy" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">
                    revenuecat.com/privacy
                  </a>
                </p>
              </SubSection>

              <SubSection title="7.2 Railway Corp.">
                <p>
                  Der Backend-Server wird auf der Infrastruktur von Railway Corp., USA, betrieben.
                  Die Datenverarbeitung erfolgt auf Basis von Standardvertragsklauseln der
                  EU-Kommission gemäss Art. 46 DSGVO.
                </p>
              </SubSection>

              <SubSection title="7.3 Apple Inc. / Google LLC">
                <p>
                  Die App wird über den Apple App Store (Apple Inc., USA) und den Google Play Store
                  (Google LLC, USA) vertrieben. Dabei gelten die Datenschutzrichtlinien von{" "}
                  <a href="https://www.apple.com/privacy/" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">Apple</a>
                  {" "}bzw.{" "}
                  <a href="https://policies.google.com/privacy" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">Google</a>.
                  Diese Anbieter erheben im Rahmen des App-Downloads und -betriebs eigene Daten.
                </p>
              </SubSection>

              <SubSection title="7.4 Keine anderweitige Datenweitergabe">
                <p>
                  Wir verkaufen Ihre Daten nicht und geben diese nicht zu Werbezwecken an Dritte
                  weiter. Eine Weitergabe erfolgt nur, soweit dies gesetzlich vorgeschrieben ist
                  oder Sie ausdrücklich eingewilligt haben.
                </p>
              </SubSection>
            </Section>

            <Section number="8" title="Datensicherheit">
              <p>Wir setzen technische und organisatorische Massnahmen ein, um Ihre Daten zu schützen:</p>
              <ul>
                <li>Verschlüsselte Datenübertragung via TLS 1.3</li>
                <li>AES-256-Verschlüsselung für gespeicherte Daten</li>
                <li>Biometrische Absicherung des App-Zugangs (Face ID / Fingerabdruck)</li>
                <li>Kein Verkauf oder Sharing Ihrer Fahrtdaten</li>
                <li>Minimale Datenerhebung nach dem Grundsatz «Privacy by Design»</li>
              </ul>
            </Section>

            <Section number="9" title="Ihre Rechte als betroffene Person">
              <SubSection title="9.1 Rechte nach DSGVO (EU-Nutzer)">
                <ul>
                  <li>Auskunftsrecht (Art. 15 DSGVO)</li>
                  <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                  <li>Recht auf Löschung («Recht auf Vergessenwerden», Art. 17 DSGVO)</li>
                  <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                  <li>Recht auf Beschwerde bei einer Datenschutzbehörde (Art. 77 DSGVO)</li>
                </ul>
              </SubSection>

              <SubSection title="9.2 Rechte nach nDSG (Schweizer Nutzer)">
                <ul>
                  <li>Auskunftsrecht (Art. 25 nDSG)</li>
                  <li>Recht auf Berichtigung und Löschung (Art. 32 nDSG)</li>
                  <li>Recht auf Einschränkung der Verarbeitung</li>
                  <li>Recht auf Datenherausgabe und -übertragung</li>
                  <li>Beschwerderecht beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB)</li>
                </ul>
              </SubSection>
              <p className="mt-3">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
                <a href="mailto:info@centof.ai" className="text-[#0066CC] hover:underline">info@centof.ai</a>
              </p>
            </Section>

            <Section number="10" title="Datenlöschung in der App">
              <p>
                Sie können Ihre Fahrtdaten jederzeit direkt in der App löschen. Die Löschfunktion
                ist in den App-Einstellungen zugänglich. Nach der Löschung sind die Daten
                unwiderruflich entfernt. Eine Wiederherstellung ist nicht möglich.
              </p>
            </Section>

            <Section number="11" title="Minderjährige">
              <p>
                FahrtDoc richtet sich nicht an Kinder unter 16 Jahren. Wir erheben wissentlich
                keine personenbezogenen Daten von Minderjährigen. Sollten uns bekannt werden, dass
                Daten von Minderjährigen erhoben wurden, löschen wir diese umgehend.
              </p>
            </Section>

            <Section number="12" title="Internationale Datenübermittlung">
              <p>
                Einige unserer Dienstleister haben ihren Sitz in den USA. Die Datenübermittlung in
                Drittländer erfolgt auf Basis geeigneter Garantien gemäss Art. 46 DSGVO
                (Standardvertragsklauseln) bzw. Art. 16 nDSG (angemessenes Schutzniveau oder
                geeignete Garantien). Weitere Informationen erhalten Sie auf Anfrage.
              </p>
            </Section>

            <Section number="13" title="Änderungen dieser Datenschutzerklärung">
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um
                technischen Änderungen oder gesetzlichen Anforderungen Rechnung zu tragen. Die
                aktuell gültige Version ist stets in der App und auf unserer Website abrufbar.
                Bei wesentlichen Änderungen werden Sie innerhalb der App informiert.
              </p>
            </Section>

            <Section number="14" title="Kontakt und Beschwerden">
              <div className="space-y-2">
                <p>Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte:</p>
                <p>
                  E-Mail:{" "}
                  <a href="mailto:info@centof.ai" className="text-[#0066CC] hover:underline">
                    info@centof.ai
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a href="https://centof.ai" className="text-[#0066CC] hover:underline">
                    centof.ai
                  </a>
                </p>
              </div>
              <p className="mt-4">Beschwerden können Sie auch bei der zuständigen Datenschutzbehörde einreichen:</p>
              <ul>
                <li>
                  <strong>Schweiz:</strong> Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB),{" "}
                  <a href="https://www.edoeb.admin.ch" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">
                    edoeb.admin.ch
                  </a>
                </li>
                <li>
                  <strong>EU:</strong> Zuständige Datenschutzbehörde Ihres EU-Mitgliedstaats
                </li>
              </ul>
            </Section>

          </div>

          <div className="mt-12 pt-6 border-t border-theme text-caption text-xs">
            Zuletzt aktualisiert: 08.06.2026 | CentofAI / FahrtDoc
          </div>
        </motion.div>
      </div>

      <style>{`
        .prose-custom p { color: var(--text-body); line-height: 1.7; }
        .prose-custom ul { margin-top: 0.5rem; padding-left: 1.25rem; list-style: disc; space-y: 0.25rem; }
        .prose-custom ul li { color: var(--text-body); margin-bottom: 0.25rem; line-height: 1.6; }
        .prose-custom strong { color: var(--text-heading); }
        .prose-custom a { transition: color 0.2s; }
      `}</style>
    </div>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-card-theme border border-theme p-6 md:p-8 space-y-3"
    >
      <h2 className="text-lg font-bold text-heading flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-[#0066CC]/10 text-[#0066CC] text-xs font-bold flex items-center justify-center shrink-0">
          {number}
        </span>
        {title}
      </h2>
      <div className="prose-custom space-y-2">{children}</div>
    </motion.div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 space-y-2">
      <h3 className="font-semibold text-heading text-sm">{title}</h3>
      {children}
    </div>
  );
}
