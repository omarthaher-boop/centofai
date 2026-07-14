import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";

export default function FahrtDocNutzungsbedingungenPage() {
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
              <FileText className="w-5 h-5 text-[#0066CC]" />
            </div>
            <span className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider">
              FahrtDoc
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-heading mb-1">
            Nutzungsbedingungen
          </h1>
          <p className="text-caption text-sm mb-6">
            Stand: 14.07.2026
          </p>

          {/* Entwurfs-Hinweisbanner */}
          <div className="rounded-xl bg-amber-500/15 border border-amber-500/40 px-5 py-4 mb-10 flex items-start gap-3">
            <span className="text-amber-400 text-lg leading-none mt-0.5">⚠</span>
            <p className="text-amber-300 text-sm leading-relaxed">
              <strong className="text-amber-200">Entwurf</strong> — diese Nutzungsbedingungen werden derzeit rechtlich geprüft und können sich noch ändern.
            </p>
          </div>

          <div className="prose-custom space-y-8">

            <Section number="1" title="Geltungsbereich und Vertragspartner">
              <p>
                Diese Nutzungsbedingungen gelten für die Nutzung der mobilen Applikation FahrtDoc
                (nachfolgend «App» oder «Dienst») sowie aller damit verbundenen Funktionen.
                Vertragspartner ist:
              </p>
              <div className="mt-3 p-4 rounded-xl bg-card-theme border border-theme text-sm space-y-1">
                <p className="font-semibold text-heading">CentofAI / Dr. Omar Thaher</p>
                <p>Arbon, Schweiz</p>
                <p>E-Mail: <a href="mailto:info@centof.ai" className="text-[#0066CC] hover:underline">info@centof.ai</a></p>
              </div>
              <p className="mt-3">
                (nachfolgend «wir» oder «CentofAI»). Mit der Registrierung eines Nutzerkontos oder
                der Nutzung kostenpflichtiger Funktionen erkennen Sie diese Nutzungsbedingungen an.
                Für Verbraucher mit gewöhnlichem Aufenthalt in der Europäischen Union bleiben
                zwingende verbraucherschützende Vorschriften ihres Aufenthaltslandes von diesen
                Nutzungsbedingungen unberührt (siehe Abschnitt 14).
              </p>
            </Section>

            <Section number="2" title="Leistungsbeschreibung">
              <p>
                FahrtDoc ist eine mobile Anwendung zur automatischen und manuellen Erfassung von
                Fahrten, zur Führung eines digitalen Fahrtenbuchs, zur Verwaltung von
                Fahrzeugkosten sowie zum Export von Fahrtendaten als PDF oder CSV. Die App
                unterstützt unter anderem GPS-basiertes Tracking, Bluetooth-/CarPlay-Integration,
                die Verwaltung mehrerer Fahrzeuge sowie eine optionale KI-gestützte Erkennung von
                Kassenbelegen.
              </p>
              <p className="mt-3">
                FahrtDoc dient der Unterstützung bei der Dokumentation von Fahrten und Kosten. Die
                App stellt keine steuerliche oder rechtliche Beratung dar und ersetzt diese nicht.
                Ob die erfassten Daten im Einzelfall den formalen und inhaltlichen Anforderungen
                der zuständigen Steuerbehörde genügen, liegt in der Verantwortung der nutzenden
                Person; wir empfehlen bei Unsicherheiten die Konsultation eines Steuerberaters
                bzw. einer Steuerberaterin.
              </p>
            </Section>

            <Section number="3" title="Registrierung und Nutzerkonto">
              <p>
                Zur Nutzung der App ist die Erstellung eines Nutzerkontos erforderlich. Sie sind
                verpflichtet, bei der Registrierung wahrheitsgemässe Angaben zu machen und Ihre
                Zugangsdaten (insbesondere Ihr Passwort) geheim zu halten. Sie sind für sämtliche
                Aktivitäten verantwortlich, die unter Ihrem Konto stattfinden, soweit diese nicht
                auf einem von uns zu vertretenden Umstand beruhen.
              </p>
              <p className="mt-3">
                Die App richtet sich ausschliesslich an Personen ab 18 Jahren, die im Besitz eines
                gültigen Führerausweises sind.
              </p>
            </Section>

            <Section number="4" title="Abonnement, Preise und Zahlung">
              <p>
                Die Nutzung der Kernfunktionen von FahrtDoc setzt den Abschluss eines
                kostenpflichtigen Abonnements voraus. Die jeweils aktuellen Preise und
                Abonnementlaufzeiten werden vor Vertragsabschluss im jeweiligen App Store (Apple
                App Store bzw. künftig Google Play Store) angezeigt; diese Anzeige ist massgeblich.
              </p>
              <p className="mt-3">
                Zahlungsabwicklung und Abonnementverwaltung erfolgen ausschliesslich über die
                In-App-Kaufsysteme von Apple (bzw. künftig Google) sowie über unseren
                Zahlungsdienstleister RevenueCat Inc. Wir selbst erhalten weder Zugriff auf Ihre
                Zahlungsmitteldaten noch nehmen wir Zahlungen direkt entgegen.
              </p>
              <p className="mt-3">
                Das Abonnement verlängert sich automatisch um die jeweils gewählte Laufzeit,
                sofern Sie es nicht vor Ablauf der aktuellen Laufzeit über die
                Kontoeinstellungen Ihres Apple- bzw. Google-Kontos kündigen.
              </p>
            </Section>

            <Section number="5" title="Kostenlose Testphase">
              <p>
                Neuen Nutzern steht in der Regel eine kostenlose Testphase von 7 Tagen zur
                Verfügung. Nach Ablauf der Testphase wird das Abonnement automatisch
                kostenpflichtig verlängert, sofern Sie nicht vorher über die Kontoeinstellungen
                Ihres Apple- bzw. Google-Kontos kündigen. Die genaue Dauer und Verfügbarkeit der
                Testphase kann sich ändern und wird vor Beginn im jeweiligen App Store angezeigt.
              </p>
            </Section>

            <Section number="6" title="Vertragslaufzeit und Kündigung">
              <p>
                Das Abonnement kann jederzeit mit Wirkung zum Ende der laufenden
                Abonnementperiode gekündigt werden. Die Kündigung erfolgt ausschliesslich über
                die Kontoeinstellungen des jeweiligen App Stores (bei iOS: Einstellungen →
                [Ihr Name] → Abonnements), nicht direkt gegenüber uns, da wir auf die
                Abonnementverwaltung von Apple bzw. Google keinen direkten Zugriff haben.
              </p>
              <p className="mt-3">
                Unabhängig vom Abonnement können Sie Ihr Nutzerkonto und alle damit verbundenen
                Daten jederzeit direkt in der App löschen (siehe unsere Datenschutzerklärung);
                dies führt jedoch nicht automatisch zur Kündigung eines laufenden Abonnements
                beim jeweiligen App Store.
              </p>
            </Section>

            <Section number="7" title="Widerrufsrecht">
              <p>
                Verbrauchern innerhalb der Europäischen Union steht grundsätzlich ein 14-tägiges
                Widerrufsrecht ab Vertragsabschluss zu. Da es sich bei FahrtDoc um digitale
                Inhalte bzw. eine digitale Dienstleistung handelt, kann dieses Widerrufsrecht
                vorzeitig erlöschen, wenn Sie ausdrücklich zugestimmt haben, dass mit der
                Ausführung des Vertrags bereits vor Ablauf der Widerrufsfrist begonnen wird,
                und Sie zur Kenntnis genommen haben, dass Sie durch diese Zustimmung Ihr
                Widerrufsrecht verlieren.
              </p>
              <p className="mt-3">
                Da FahrtDoc grundsätzlich mit einer kostenlosen Testphase beginnt und eine
                Zahlung erst nach deren Ablauf erfolgt, empfehlen wir, das Abonnement bei
                Nichtgefallen bereits während der Testphase über die Kontoeinstellungen zu
                kündigen. Rückerstattungsanfragen zu bereits getätigten Zahlungen über den
                Apple App Store bzw. Google Play Store bearbeitet ausschliesslich der jeweilige
                Store-Betreiber gemäss dessen eigenen Rückerstattungsrichtlinien; wir selbst
                haben hierauf keinen direkten Einfluss.
              </p>
            </Section>

            <Section number="8" title="Pflichten der Nutzer">
              <p>Sie verpflichten sich, die App nicht missbräuchlich zu nutzen, insbesondere nicht:</p>
              <ul>
                <li>Sicherheitsmechanismen der App zu umgehen oder zu manipulieren</li>
                <li>die App für rechtswidrige Zwecke zu nutzen</li>
                <li>Zugangsdaten an Dritte weiterzugeben</li>
                <li>
                  automatisierte Systeme (Bots, Scraper) ausserhalb der von uns bereitgestellten
                  Schnittstellen zur Nutzung der App einzusetzen
                </li>
              </ul>
            </Section>

            <Section number="9" title="Geistiges Eigentum">
              <p>
                Alle Rechte an der App, ihrer Software, ihrem Design sowie den Marken «FahrtDoc»
                und «CentofAI» liegen bei uns bzw. unseren Lizenzgebern. Mit der Nutzung der App
                wird Ihnen ein einfaches, nicht übertragbares Nutzungsrecht für den privaten bzw.
                beruflichen Eigengebrauch eingeräumt. Eine Vervielfältigung, Bearbeitung oder
                Weiterverbreitung der App oder ihrer Inhalte ausserhalb der bestimmungsgemässen
                Nutzung ist nicht gestattet.
              </p>
              <p className="mt-3">
                Die von Ihnen erfassten Daten (Fahrten, Kosten, Fahrzeugdaten etc.) verbleiben
                in Ihrem Eigentum; wir nutzen diese ausschliesslich zur Erbringung des Dienstes
                gemäss unserer Datenschutzerklärung.
              </p>
            </Section>

            <Section number="10" title="Haftung und Gewährleistung">
              <p>
                Wir bemühen uns um eine hohe Verfügbarkeit und Genauigkeit der App, können
                jedoch keine Gewähr für eine ununterbrochene Verfügbarkeit oder für die absolute
                Genauigkeit automatisch erfasster Daten (insbesondere GPS-Standortdaten)
                übernehmen. Standortdaten können durch äussere Faktoren (z. B. Gebäude, Tunnel,
                Geräteeinstellungen) beeinträchtigt werden; wir empfehlen, automatisch erfasste
                Fahrten vor Verwendung als Beleg auf Plausibilität zu prüfen.
              </p>
              <p className="mt-3">
                Wir haften nach den gesetzlichen Bestimmungen für Schäden, die auf einer
                vorsätzlichen oder grob fahrlässigen Pflichtverletzung unsererseits beruhen. Bei
                leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist unsere Haftung
                auf den vertragstypisch vorhersehbaren Schaden begrenzt. Eine weitergehende
                Haftung, insbesondere für mittelbare Schäden oder entgangenen Gewinn, ist
                ausgeschlossen, soweit gesetzlich zulässig. Die Haftung für Schäden aus der
                Verletzung des Lebens, des Körpers oder der Gesundheit sowie nach zwingenden
                gesetzlichen Vorschriften bleibt unberührt.
              </p>
              <p className="mt-3">
                Für steuerliche oder rechtliche Nachteile, die aus der Verwendung der mit
                FahrtDoc erfassten Daten entstehen, übernehmen wir keine Haftung, insbesondere
                nicht für die Anerkennung der Daten durch Steuerbehörden.
              </p>
            </Section>

            <Section number="11" title="Verfügbarkeit und Änderungen des Dienstes">
              <p>
                Wir sind bemüht, die App kontinuierlich weiterzuentwickeln und zu verbessern.
                Wir behalten uns vor, Funktionen der App im Rahmen von Updates zu ändern, zu
                ergänzen oder einzustellen, sofern dies für Sie zumutbar ist und der Kernzweck
                der App (Fahrtenerfassung und -dokumentation) dadurch nicht wesentlich
                beeinträchtigt wird. Über wesentliche Änderungen informieren wir Sie in
                angemessener Weise.
              </p>
            </Section>

            <Section number="12" title="Datenschutz">
              <p>
                Informationen zur Verarbeitung Ihrer personenbezogenen Daten finden Sie in
                unserer separaten Datenschutzerklärung, abrufbar unter{" "}
                <Link
                  to="/products/fahrtdoc/datenschutz"
                  className="text-[#0066CC] hover:underline"
                >
                  centof.ai/products/fahrtdoc/datenschutz
                </Link>{" "}
                sowie in der App unter Profil → Datenschutz.
              </p>
            </Section>

            <Section number="13" title="Änderungen dieser Nutzungsbedingungen">
              <p>
                Wir behalten uns vor, diese Nutzungsbedingungen bei Bedarf anzupassen, etwa
                aufgrund geänderter rechtlicher Anforderungen oder neuer Funktionen. Über
                wesentliche Änderungen informieren wir Sie innerhalb der App rechtzeitig vor
                deren Inkrafttreten und weisen Sie dabei gesondert auf Ihr Recht hin, der
                Änderung innerhalb von 30 Tagen zu widersprechen. Widersprechen Sie nicht
                innerhalb dieser Frist und nutzen die App weiter, gilt die Änderung als
                akzeptiert.
              </p>
            </Section>

            <Section number="14" title="Anwendbares Recht und Gerichtsstand">
              <p>
                Diese Nutzungsbedingungen sowie sämtliche Streitigkeiten aus oder im
                Zusammenhang mit der Nutzung der App unterliegen materiellem schweizerischem
                Recht unter Ausschluss des UN-Kaufrechts (CISG). Sind Sie Verbraucher mit
                gewöhnlichem Aufenthalt in einem Mitgliedstaat der Europäischen Union, bleiben
                Ihnen die zwingenden verbraucherschützenden Bestimmungen des Rechts Ihres
                Aufenthaltslandes unabhängig von dieser Rechtswahl erhalten, soweit diese Ihnen
                einen weitergehenden Schutz gewähren.
              </p>
              <p className="mt-3">
                Gerichtsstand für Streitigkeiten mit Kaufleuten ist Arbon, Schweiz. Für
                Verbraucherstreitigkeiten gelten die gesetzlichen Gerichtsstände; insbesondere
                bleibt Verbrauchern aus der EU die Möglichkeit erhalten, an ihrem
                Wohnsitzgericht zu klagen, soweit dies nach zwingendem Recht vorgesehen ist.
              </p>
            </Section>

            <Section number="15" title="Schlussbestimmungen">
              <p>
                Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam sein oder
                werden, bleibt die Wirksamkeit der übrigen Bestimmungen hiervon unberührt. An
                die Stelle der unwirksamen Bestimmung tritt, soweit vorhanden, die gesetzliche
                Regelung.
              </p>
            </Section>

          </div>

          <div className="mt-12 pt-6 border-t border-theme text-caption text-xs">
            Zuletzt aktualisiert: 14.07.2026 | CentofAI / FahrtDoc
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
