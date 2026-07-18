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
            Stand: 18.07.2026
          </p>

          <div className="prose-custom space-y-8">

            <Section number="1" title="Verantwortliche Stelle">
              <p>
                Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten im Sinne des Schweizer
                Bundesgesetzes über den Datenschutz (nDSG), der EU-Datenschutz-Grundverordnung (DSGVO)
                sowie des deutschen Bundesdatenschutzgesetzes (BDSG) ist:
              </p>
              <div className="mt-3 p-4 rounded-xl bg-card-theme border border-theme text-sm space-y-1">
                <p className="font-semibold text-heading">CentofAI / PD. Dr. Omar Thaher</p>
                <p>Arbon, Schweiz</p>
                <p>E-Mail: <a href="mailto:info@centof.ai" className="text-[#0066CC] hover:underline">info@centof.ai</a></p>
                <p>Website: <a href="https://centof.ai" className="text-[#0066CC] hover:underline">centof.ai</a></p>
              </div>
            </Section>

            <Section number="2" title="Allgemeines">
              <p>
                Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Verarbeitung
                personenbezogener Daten bei der Nutzung der mobilen Applikation FahrtDoc (nachfolgend «App»).
                Die App steht für iOS über den Apple App Store zur Verfügung. Eine Version für Android
                (Google Play Store) befindet sich in Vorbereitung und ist noch nicht öffentlich verfügbar;
                sobald sie veröffentlicht wird, gilt diese Datenschutzerklärung in gleicher Weise für die
                Android-Version.
              </p>
              <p className="mt-3">
                Diese Erklärung richtet sich an Nutzer aus der Schweiz, der Europäischen Union (insbesondere
                Deutschland, Österreich) sowie weiteren Ländern. Es gilt jeweils das anwendbare nationale
                Datenschutzrecht in Verbindung mit den europäischen Mindeststandards der DSGVO.
              </p>
            </Section>

            <Section number="3" title="Erhobene und verarbeitete Daten">
              <SubSection title="3.1 Profildaten (Konto- und Registrierungsdaten)">
                <p>Bei der Registrierung und Nutzung Ihres Kontos erheben wir:</p>
                <ul>
                  <li>E-Mail-Adresse (zur Anmeldung und Kommunikation)</li>
                  <li>Name</li>
                  <li>Land und Kanton/Region (für die länderspezifische Steuerberechnung)</li>
                  <li>Geburtsdatum (optional)</li>
                  <li>
                    Passwort (verschlüsselt als bcrypt-Hash gespeichert; wir haben zu keinem Zeitpunkt
                    Zugriff auf das Passwort im Klartext)
                  </li>
                </ul>
              </SubSection>

              <SubSection title="3.2 Standort- und GPS-Daten">
                <p>
                  Die App erhebt Standortdaten ausschliesslich während aktiver Fahrten, um die
                  zurückgelegte Strecke, Kilometer, Fahrtdauer sowie Start- und Zielorte zu
                  dokumentieren. Standortdaten werden nicht im Hintergrund erfasst, wenn keine
                  Fahrt aktiv ist. Gespeichert werden:
                </p>
                <ul>
                  <li>GPS-Koordinaten (Start, Zwischenpunkte, Ziel)</li>
                  <li>Fahrtdauer und -distanz in Kilometern</li>
                  <li>Zeitstempel der Fahrt</li>
                  <li>Automatisch ermittelte Ortsnamen (via Reverse Geocoding, siehe Abschnitt 7.5)</li>
                  <li>Fahrtkategorie (Geschäftlich / Privat / Arbeitsweg)</li>
                </ul>
              </SubSection>

              <SubSection title="3.3 Biometrische Authentifizierungsdaten">
                <p>
                  FahrtDoc unterstützt Face ID und Fingerabdruck-Authentifizierung zur Sicherung
                  des App-Zugangs. Diese biometrischen Daten werden ausschliesslich auf Ihrem Gerät
                  verarbeitet und niemals an externe Server übermittelt. Die Verarbeitung erfolgt
                  vollständig durch das Betriebssystem (iOS) ohne Zugriff durch unsere App.
                </p>
              </SubSection>

              <SubSection title="3.4 Bluetooth-Daten">
                <p>
                  Falls Sie die automatische Fahrterfassung via Bluetooth aktivieren, erkennt die App
                  die Verbindung zu Ihrer Fahrzeug-Freisprecheinrichtung (HFP-Profil), unter anderem
                  zur automatischen Fahrterinnerung beim Verbinden bzw. Trennen der Verbindung. Es
                  werden keine Bluetooth-Gerätenamen oder -Adressen dauerhaft gespeichert. Die
                  Verbindungserkennung erfolgt ausschliesslich lokal auf Ihrem Gerät.
                </p>
              </SubSection>

              <SubSection title="3.5 Fahrtdaten und Fahrtenbuch">
                <p>
                  Alle erfassten Fahrten werden serverseitig in einer Datenbank auf Railway gespeichert
                  (siehe Abschnitt 7.2). Zur Speicherdauer siehe Abschnitt 6.1.
                </p>
              </SubSection>

              <SubSection title="3.6 Fahrzeugkosten und Belege">
                <p>
                  Sie können in der App manuell Fahrzeugkosten erfassen (z. B. Tankkosten, Wartung,
                  Parkgebühren, Sonstiges) und dazu Betrag, Datum, Kategorie sowie optional eine Notiz
                  und ein Beleg-Foto hinzufügen. Diese Kostendaten werden ausschliesslich lokal auf
                  Ihrem Gerät gespeichert und nicht an unseren Server übermittelt (Ausnahme: siehe
                  Abschnitt 3.7 zum optionalen Kassenbeleg-Scan). Bei einer Neuinstallation der App
                  oder einem Gerätewechsel gehen lokal gespeicherte Kostendaten verloren, sofern Sie
                  sie nicht zuvor exportiert haben.
                </p>
              </SubSection>

              <SubSection title="3.7 Kassenbeleg-Scan (KI-gestützte Belegerkennung)">
                <p>
                  FahrtDoc bietet optional die Möglichkeit, ein fotografiertes Beleg mittels künstlicher
                  Intelligenz automatisch auslesen zu lassen (Betrag, Datum, Kategorie). Nutzen Sie
                  diese Funktion aktiv, wird das Foto an unseren Server übermittelt und von dort zur
                  Analyse an Anthropic PBC (San Francisco, USA) weitergeleitet. Das Foto wird
                  ausschliesslich im Arbeitsspeicher verarbeitet, nicht dauerhaft bei uns oder bei
                  Anthropic gespeichert, und nach Abschluss der Analyse verworfen. Die Übermittlung
                  erfolgt auf Grundlage von EU-Standardvertragsklauseln (Art. 46 DSGVO) einschliesslich
                  eines Anhangs für Übermittlungen aus der Schweiz. Die KI-gestützte Texterkennung
                  dient ausschliesslich dazu, Ihnen das manuelle Ausfüllen zu erleichtern; sie trifft
                  keine automatisierte Entscheidung mit rechtlicher Wirkung oder vergleichbar erheblicher
                  Beeinträchtigung im Sinne von Art. 22 DSGVO. Alle erkannten Werte können von Ihnen
                  vor dem Speichern jederzeit geprüft und manuell angepasst werden.
                </p>
              </SubSection>

              <SubSection title="3.8 Fahrzeugdaten">
                <p>
                  Sie können in der App bis zu drei Fahrzeuge anlegen und verwalten. Dabei werden folgende
                  Angaben verarbeitet: Marke, Modell, Baujahr, Farbe und Kennzeichen. Diese Angaben dienen
                  der Zuordnung von Fahrten und Kosten zum jeweiligen Fahrzeug sowie der
                  fahrzeugspezifischen Steuerberechnung. Das Kennzeichen ist über das Fahrzeugregister
                  grundsätzlich einer Person zuordenbar und wird daher wie die übrigen personenbezogenen
                  Daten in dieser Datenschutzerklärung behandelt und geschützt.
                </p>
              </SubSection>

              <SubSection title="3.9 Exportierte Daten">
                <p>
                  Fahrtenprotokolle können als PDF- oder CSV-Dateien exportiert werden. Diese Dateien
                  verlassen die App erst, wenn Sie den Export aktiv auslösen. Die Speicherung und
                  Weitergabe dieser Exporte liegt in Ihrer Verantwortung.
                </p>
              </SubSection>

              <SubSection title="3.10 Zahlungs- und Abonnementdaten">
                <p>
                  Zahlungsabwicklung und Abonnementverwaltung erfolgen durch RevenueCat Inc. (USA) über
                  Apple In-App-Purchase. FahrtDoc hat keinen direkten Zugriff auf Ihre Zahlungsmitteldetails.
                </p>
              </SubSection>

              <SubSection title="3.11 E-Mail-Kommunikation">
                <p>
                  Für den Versand von Bestätigungscodes, Systembenachrichtigungen und, sofern Sie
                  eingewilligt haben, Marketing-Mitteilungen nutzen wir Resend Inc. (USA).
                  Absenderadresse: info@centof.ai. Resend speichert E-Mail-Logs für 30 Tage.
                </p>
              </SubSection>

              <SubSection title="3.12 Technische Daten / Backend">
                <p>
                  Zur Bereitstellung der App-Funktionen wird ein Backend-Server auf Railway Corp. (USA)
                  betrieben. Dort fallen technische Verbindungsdaten und Fehlerprotokolle an, die nach
                  90 Tagen automatisch gelöscht werden. Details zu Datensicherungen (Backups) finden
                  Sie in Abschnitt 7.2.
                </p>
              </SubSection>

              <SubSection title="3.13 Kartendaten (Fahrtroute)">
                <p>
                  Wenn Sie die optionale Funktion «Kartensicht speichern» aktivieren, speichert die App
                  den gefahrenen Streckenverlauf zusätzlich zu den in Abschnitt 3.2 genannten Fahrtdaten
                  als Kartenansicht ausschliesslich lokal auf Ihrem Gerät. Diese Kartenansicht wird nicht
                  an unseren Server oder in eine Cloud übertragen. Sie können gespeicherte Kartenansichten
                  jederzeit einzeln oder gesammelt in den Einstellungen löschen. Standardmässig ist diese
                  Funktion deaktiviert.
                </p>
              </SubSection>
            </Section>

            <Section number="4" title="Rechtsgrundlagen der Verarbeitung">
              <p>Die Verarbeitung Ihrer Daten erfolgt auf folgenden Rechtsgrundlagen:</p>
              <ul>
                <li>
                  <strong>Vertragserfüllung</strong> (Art. 6 Abs. 1 lit. b DSGVO / Art. 31 Abs. 2 lit. a nDSG / § 25 BDSG):
                  für die Kernfunktionen der App (Fahrterfassung, Fahrtenbuch, Kostenverwaltung) sowie für
                  optionale, von Ihnen aktiv ausgelöste Funktionen wie den Kassenbeleg-Scan
                </li>
                <li>
                  <strong>Einwilligung</strong> (Art. 6 Abs. 1 lit. a DSGVO / Art. 31 Abs. 1 nDSG):
                  für die Standortnutzung sowie für den optionalen Erhalt von Marketing-Mitteilungen;
                  jederzeit mit Wirkung für die Zukunft widerrufbar
                </li>
                <li>
                  <strong>Berechtigte Interessen</strong> (Art. 6 Abs. 1 lit. f DSGVO / Art. 31 Abs. 2 lit. b nDSG):
                  für technische Optimierung, Fehlerbehebung und Sicherheit
                </li>
                <li>
                  <strong>Gesetzliche Verpflichtung</strong> (Art. 6 Abs. 1 lit. c DSGVO):
                  soweit gesetzliche Aufbewahrungspflichten bestehen
                </li>
              </ul>
            </Section>

            <Section number="5" title="Zwecke der Datenverarbeitung">
              <p>Ihre Daten werden für folgende Zwecke verwendet:</p>
              <ul>
                <li>Automatische Erfassung und Dokumentation von Fahrten</li>
                <li>Erstellung und Verwaltung des persönlichen Fahrtenbuchs</li>
                <li>Bluetooth-basierte Fahrterinnerung</li>
                <li>Erfassung und Verwaltung von Fahrzeugkosten und Belegen</li>
                <li>Optionale KI-gestützte Kassenbeleg-Erkennung</li>
                <li>Export der Fahrtendaten als PDF oder CSV</li>
                <li>Registrierung und Verwaltung Ihres Nutzerkontos</li>
                <li>Verwaltung mehrerer Fahrzeuge und Zuordnung von Fahrten/Kosten</li>
                <li>Bereitstellung der Abonnement-Funktionen über RevenueCat</li>
                <li>Versand von Bestätigungscodes und Systembenachrichtigungen per E-Mail</li>
                <li>Versand von Marketing-Mitteilungen, sofern Sie hierzu eingewilligt haben</li>
                <li>Technischer Betrieb, Sicherheit und Fehlerdiagnose</li>
              </ul>
            </Section>

            <Section number="6" title="Speicherdauer">
              <SubSection title="6.1 Fahrtdaten">
                <p>
                  Wir streben eine maximale Speicherdauer von 5 Jahren zuzüglich des laufenden
                  Kalenderjahres an, gerechnet ab dem 1. Januar, in Anlehnung an die üblichen
                  steuerlichen Aufbewahrungs- und Prüffristen in der Schweiz, Deutschland und
                  Österreich. Eine automatisierte Löschung nach Ablauf dieser Frist befindet sich
                  aktuell im Testbetrieb und wird nach Abschluss der Testphase aktiv geschaltet;
                  bis dahin werden Fahrtdaten nicht automatisiert gelöscht. Unabhängig davon können
                  Sie einzelne Fahrten sowie Ihr gesamtes Konto jederzeit selbst löschen (siehe
                  Abschnitt 10).
                </p>
                <p className="mt-2">
                  Für den Fall einer längeren behördlichen Prüfung (in Ausnahmefällen können
                  abweichende, längere Fristen gelten) empfehlen wir zusätzlich, wichtige
                  Fahrtenbuch-Exporte in eigener Verantwortung aufzubewahren.
                </p>
              </SubSection>

              <SubSection title="6.2 Kontodaten">
                <p>
                  Nach Auflösung Ihres Kontos werden alle personenbezogenen Daten (Fahrten,
                  Sitzungsdaten, Kontodaten) unverzüglich und dauerhaft aus unseren produktiv
                  genutzten Systemen entfernt. Es findet keine Karenzzeit statt. Zur Ausfallsicherheit
                  vorgehaltene Datensicherungen (siehe Abschnitt 7.2) können gelöschte Daten für die
                  Dauer der jeweiligen Aufbewahrungsfrist dieser Sicherungen noch enthalten, bevor sie
                  im Rahmen der regulären Rotation ebenfalls entfernt werden.
                </p>
              </SubSection>

              <SubSection title="6.3 Technische Protokolldaten">
                <p>
                  Backend-seitige technische Protokolldaten werden nach spätestens 90 Tagen automatisch
                  gelöscht.
                </p>
              </SubSection>
            </Section>

            <Section number="7" title="Drittanbieter und Datenweitergabe">
              <SubSection title="7.1 RevenueCat Inc.">
                <p>
                  333 Bradford Street, Suite 220, Redwood City, CA 94063, USA. Verwaltung von
                  In-App-Abonnements und Zahlungen über Apple In-App-Purchase. RevenueCat und wir
                  sind durch eine Datenverarbeitungsvereinbarung auf Grundlage der EU-Standardvertragsklauseln
                  (Art. 46 DSGVO) verbunden. Datenschutz:{" "}
                  <a href="https://www.revenuecat.com/privacy" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">
                    revenuecat.com/privacy
                  </a>
                </p>
              </SubSection>

              <SubSection title="7.2 Railway Corp.">
                <p>
                  San Francisco, CA, USA. Betrieb unseres Backend-Servers und unserer Datenbank. Die
                  Datenverarbeitung erfolgt auf Basis von Standardvertragsklauseln der EU-Kommission
                  gemäss Art. 46 DSGVO bzw. eines Schweizer Anhangs gemäss Art. 16 nDSG. Zur
                  Ausfallsicherheit betreiben wir zusätzlich automatisierte Datensicherungen: eine
                  kontinuierliche Point-in-Time-Recovery über einen rollierenden Zeitraum von aktuell
                  rund vier Wochen sowie wöchentliche Sicherungen des Datenbank-Volumes. Diese
                  Sicherungen dienen ausschliesslich der Wiederherstellung im Störungsfall und werden
                  nicht anderweitig genutzt. Datenschutz:{" "}
                  <a href="https://railway.app/legal/privacy" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">
                    railway.app/legal/privacy
                  </a>
                </p>
              </SubSection>

              <SubSection title="7.3 Resend Inc.">
                <p>
                  USA. Transaktionaler E-Mail-Versand (Bestätigungscodes, Systembenachrichtigungen,
                  ggf. Marketing-Mitteilungen bei entsprechender Einwilligung). Log-Speicherung: 30 Tage.
                  Datenschutz:{" "}
                  <a href="https://resend.com/legal/privacy-policy" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">
                    resend.com/legal/privacy-policy
                  </a>
                </p>
              </SubSection>

              <SubSection title="7.4 Anthropic PBC">
                <p>
                  San Francisco, CA, USA. Analyse von Kassenbelegen im Rahmen der optionalen
                  KI-Belegerkennung (siehe Abschnitt 3.7). Übermittelte Fotos werden ausschliesslich
                  im Arbeitsspeicher verarbeitet und nicht dauerhaft gespeichert. Die Übermittlung
                  erfolgt auf Grundlage von EU-Standardvertragsklauseln (Art. 46 DSGVO) einschliesslich
                  eines Anhangs für Übermittlungen aus der Schweiz. Datenschutz:{" "}
                  <a href="https://www.anthropic.com/privacy" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">
                    anthropic.com/privacy
                  </a>
                </p>
              </SubSection>

              <SubSection title="7.5 OpenStreetMap Nominatim">
                <p>
                  Automatische Ermittlung von Ortsnamen aus GPS-Koordinaten (Reverse Geocoding). Es
                  werden ausschliesslich GPS-Koordinaten übermittelt, keine weiteren personenbezogenen
                  Daten. Weitere Informationen:{" "}
                  <a href="https://osmfoundation.org/wiki/Privacy_Policy" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">
                    osmfoundation.org/wiki/Privacy_Policy
                  </a>
                </p>
              </SubSection>

              <SubSection title="7.6 Apple Inc. / Google LLC">
                <p>
                  Die App wird über den Apple App Store (Apple Inc., Cupertino, CA, USA) vertrieben;
                  hierbei gelten die Datenschutzrichtlinien von Apple. Eine Veröffentlichung über den
                  Google Play Store (Google LLC, USA) ist in Vorbereitung; sobald sie erfolgt, gelten
                  zusätzlich die Datenschutzrichtlinien von Google.{" "}
                  <a href="https://www.apple.com/privacy/" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">Apple</a>
                  {" "}—{" "}
                  <a href="https://policies.google.com/privacy" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">Google</a>
                </p>
              </SubSection>

              <SubSection title="7.7 Keine anderweitige Datenweitergabe">
                <p>
                  Wir verkaufen Ihre Daten nicht und geben diese nicht zu Werbezwecken an Dritte weiter.
                  Eine Weitergabe erfolgt nur, soweit dies gesetzlich vorgeschrieben ist oder Sie
                  ausdrücklich eingewilligt haben.
                </p>
              </SubSection>
            </Section>

            <Section number="8" title="Datensicherheit">
              <p>Wir setzen technische und organisatorische Massnahmen ein, um Ihre Daten zu schützen:</p>
              <ul>
                <li>Verschlüsselte Datenübertragung via TLS 1.3</li>
                <li>Passwörter als bcrypt-Hash gespeichert, niemals im Klartext</li>
                <li>
                  Automatisierte Datensicherungen: kontinuierliche Point-in-Time-Recovery sowie
                  wöchentliche Volume-Backups (siehe Abschnitt 7.2)
                </li>
                <li>
                  Biometrische Absicherung des App-Zugangs (Face ID / Fingerabdruck), vollständig
                  lokal auf Ihrem Gerät
                </li>
                <li>
                  Beim Löschen einzelner Fahrten wird zunächst ein Löschvermerk gesetzt, um die
                  Synchronisation zwischen Ihren Geräten zu ermöglichen; die Fahrt ist für Sie sofort
                  nicht mehr sichtbar. Bei einer vollständigen Kontolöschung erfolgt hingegen eine
                  sofortige, endgültige Löschung aller Daten (siehe Abschnitt 6.2 und 10)
                </li>
                <li>Session-Token mit 30-tägiger Gültigkeitsdauer</li>
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
                  <li>
                    Recht auf Unterrichtung (Art. 19 DSGVO): Haben Sie eine Berichtigung, Löschung
                    oder Einschränkung der Verarbeitung Ihrer Daten verlangt, informieren wir alle
                    Empfänger, denen Ihre Daten offengelegt wurden, über diese Änderung, sofern dies
                    nicht unmöglich ist oder einen unverhältnismässigen Aufwand bedeutet. Auf Wunsch
                    teilen wir Ihnen mit, wer diese Empfänger sind.
                  </li>
                </ul>
                <p className="mt-2">
                  Aufsichtsbehörden: Deutschland —{" "}
                  <a href="https://www.bfdi.bund.de" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">BfDI, bfdi.bund.de</a>;
                  Österreich —{" "}
                  <a href="https://www.dsb.gv.at" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">Datenschutzbehörde, dsb.gv.at</a>
                </p>
              </SubSection>

              <SubSection title="9.2 Rechte nach nDSG (Schweizer Nutzer)">
                <ul>
                  <li>Auskunftsrecht (Art. 25 nDSG)</li>
                  <li>Recht auf Berichtigung und Löschung (Art. 32 nDSG)</li>
                  <li>Recht auf Einschränkung der Verarbeitung</li>
                  <li>Recht auf Datenherausgabe und -übertragung</li>
                  <li>
                    Beschwerderecht beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten
                    (EDÖB),{" "}
                    <a href="https://www.edoeb.admin.ch" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">edoeb.admin.ch</a>
                  </li>
                </ul>
              </SubSection>

              <SubSection title="9.3 Rechte nach BDSG (deutsche Nutzer)">
                <ul>
                  <li>Auskunftsrecht (§ 34 BDSG)</li>
                  <li>Widerspruchsrecht (§ 36 BDSG)</li>
                  <li>Beschwerderecht beim BfDI oder der zuständigen Landesbehörde</li>
                </ul>
              </SubSection>

              <p className="mt-3">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
                <a href="mailto:info@centof.ai" className="text-[#0066CC] hover:underline">info@centof.ai</a>
              </p>
            </Section>

            <Section number="10" title="Datenlöschung in der App">
              <p>
                Sie können einzelne Fahrten sowie Ihr gesamtes Konto jederzeit direkt in der App
                löschen (Profil → Konto löschen). Bei der Kontolöschung werden alle Ihre
                personenbezogenen Daten (Fahrten, Sitzungsdaten, Kontodaten) unverzüglich und dauerhaft
                aus unseren produktiv genutzten Systemen entfernt; es findet keine Karenzzeit statt.
                Eine Wiederherstellung ist danach nicht mehr möglich.
              </p>
              <p className="mt-3">
                Da wir zusätzlich automatisierte Datensicherungen vornehmen (siehe Abschnitt 7.2),
                können gelöschte Daten für die Dauer der jeweiligen Aufbewahrungsfrist dieser
                Sicherungen noch enthalten sein, bevor sie im Rahmen der regulären Rotation ebenfalls
                entfernt werden. Eine gezielte, sofortige Entfernung einzelner Datensätze aus laufenden
                Sicherungen ist technisch nicht möglich.
              </p>
            </Section>

            <Section number="11" title="Cookies und Tracking">
              <p>
                Die App verwendet keine Cookies und kein Tracking zu Werbezwecken. Technisch notwendige
                Session-Token dienen ausschliesslich der Authentifizierung.
              </p>
            </Section>

            <Section number="12" title="Minderjährige">
              <p>
                FahrtDoc richtet sich ausschliesslich an Personen ab 18 Jahren, da die sinnvolle Nutzung
                der App einen gültigen Führerausweis voraussetzt. Wir erheben wissentlich keine
                personenbezogenen Daten von Personen unter 18 Jahren. Sollten uns bekannt werden, dass
                dennoch Daten Minderjähriger erhoben wurden, löschen wir diese umgehend.
              </p>
            </Section>

            <Section number="13" title="Internationale Datenübermittlung">
              <p>
                Mehrere unserer Dienstleister (RevenueCat, Railway, Resend, Anthropic, Apple) haben
                ihren Sitz in den USA. Die Datenübermittlung in die USA als Drittland erfolgt auf
                Basis von EU-Standardvertragsklauseln gemäss Art. 46 DSGVO, ergänzt um einen Anhang
                für Übermittlungen aus der Schweiz gemäss Art. 16 nDSG. Details zu den einzelnen
                Dienstleistern finden Sie in Abschnitt 7.
              </p>
              <p className="mt-3">
                Weitere Informationen erhalten Sie auf Anfrage unter{" "}
                <a href="mailto:info@centof.ai" className="text-[#0066CC] hover:underline">info@centof.ai</a>.
              </p>
            </Section>

            <Section number="14" title="Änderungen dieser Datenschutzerklärung">
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um technischen
                Änderungen oder gesetzlichen Anforderungen Rechnung zu tragen. Die aktuell gültige
                Version ist stets in der App (Profil → Datenschutz) sowie auf unserer Website (centof.ai)
                abrufbar und inhaltlich identisch. Bei wesentlichen Änderungen werden Sie innerhalb der
                App informiert.
              </p>
            </Section>

            <Section number="15" title="Kontakt und Beschwerden">
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
                  <strong>Schweiz:</strong> Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter
                  (EDÖB),{" "}
                  <a href="https://www.edoeb.admin.ch" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">
                    edoeb.admin.ch
                  </a>
                </li>
                <li>
                  <strong>Deutschland:</strong> Bundesbeauftragter für den Datenschutz und die
                  Informationsfreiheit (BfDI),{" "}
                  <a href="https://www.bfdi.bund.de" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">
                    bfdi.bund.de
                  </a>
                </li>
                <li>
                  <strong>Österreich:</strong> Datenschutzbehörde,{" "}
                  <a href="https://www.dsb.gv.at" className="text-[#0066CC] hover:underline" target="_blank" rel="noopener noreferrer">
                    dsb.gv.at
                  </a>
                </li>
                <li>
                  <strong>Weitere EU-/EWR-Staaten:</strong> die jeweils zuständige nationale
                  Datenschutzbehörde
                </li>
              </ul>
            </Section>

          </div>

          <div className="mt-12 pt-6 border-t border-theme text-caption text-xs">
            Zuletzt aktualisiert: 18.07.2026 | CentofAI / FahrtDoc
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
