import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";

type Lang = "de" | "en";

const LEGAL_NOTICES = [
  {
    titleDe: `Hinweis zur steuerlichen Nutzung`,
    titleEn: `Note on tax use`,
    textDe: `FahrtDoc unterstützt dich dabei, Fahrten, Kosten und Belege strukturiert zu dokumentieren. Die App ersetzt keine steuerliche oder rechtliche Beratung. Ob die erfassten Daten im Einzelfall den Anforderungen deiner zuständigen Steuerbehörde genügen (z. B. Vollständigkeit, Form, Aufbewahrungsfristen), liegt in der Verantwortung der nutzenden Person. Bei Unsicherheiten wende dich an deinen Steuerberater bzw. deine Steuerberaterin oder direkt an die zuständige Behörde.`,
    textEn: `FahrtDoc helps you document trips, costs, and receipts in a structured way. The app does not replace tax or legal advice. Whether the recorded data meets the requirements of your relevant tax authority in a given case (e.g. completeness, form, retention periods) is the responsibility of the user. If in doubt, consult your tax advisor or the relevant authority directly.`,
  },
  {
    titleDe: `Hinweis zur Datenverarbeitung`,
    titleEn: `Note on data processing`,
    textDe: `Welche Daten FahrtDoc erhebt, wie sie verarbeitet und wie lange sie gespeichert werden, ist ausschließlich in unserer Datenschutzerklärung verbindlich geregelt. Bei Widersprüchen zwischen dieser Support-Seite und der Datenschutzerklärung gilt die Datenschutzerklärung.`,
    textEn: `What data FahrtDoc collects, how it is processed, and how long it is retained is governed exclusively and bindingly by our Privacy Policy. In case of any conflict between this support page and the Privacy Policy, the Privacy Policy applies.`,
  },
  {
    titleDe: `Genauigkeit der automatischen Fahrterkennung`,
    titleEn: `Accuracy of automatic trip detection`,
    textDe: `Die automatische Fahrterkennung basiert auf GPS- und Bewegungsdaten des Geräts und kann durch äußere Faktoren (z. B. Gebäude, Tunnel, Geräteeinstellungen) beeinträchtigt werden. FahrtDoc prüft erfasste Fahrten automatisch auf Plausibilität; wir empfehlen dennoch, Fahrten vor der Verwendung als Beleg kurz zu kontrollieren.`,
    textEn: `Automatic trip detection relies on the device's GPS and motion data and can be affected by external factors (e.g. buildings, tunnels, device settings). FahrtDoc automatically checks recorded trips for plausibility; we still recommend briefly reviewing trips before using them as documentation.`,
  },
];

const CATEGORIES = [
  {
    id: `trips`,
    labelDe: `Fahrten & Tracking`,
    labelEn: `Trips & Tracking`,
    items: [
      {
        qDe: `Wie starte ich eine neue Fahrt manuell?`,
        aDe: `Öffne den Tab \u201eHome\u201c und tippe auf die Schaltfläche \u201eFahrt starten\u201c. Du kannst Startort und Fahrtart auswählen, bevor die Aufzeichnung beginnt.`,
        qEn: `How do I start a new trip manually?`,
        aEn: `Open the \u201cHome\u201d tab and tap \u201cStart Trip\u201d. You can select the starting location and trip type before recording begins.`,
      },
      {
        qDe: `Wie aktiviere ich das automatische Tracking?`,
        aDe: `Gehe zu Profil \u2192 Tracking & Fahrterkennung und aktiviere \u201eAutomatisches Tracking\u201c. Die App erkennt dann Fahrten selbstständig anhand von Bewegungsmustern und GPS-Daten.`,
        qEn: `How do I enable automatic tracking?`,
        aEn: `Go to Profile \u2192 Tracking & Trip Detection and enable \u201cAutomatic Tracking\u201d. The app will then detect trips independently based on movement patterns and GPS data.`,
      },
      {
        qDe: `Was ist der Unterschied zwischen automatischem und manuellem Tracking?`,
        aDe: `Beim manuellen Tracking startest und beendest du Fahrten selbst. Das automatische Tracking erkennt Fahrten selbstständig \u2014 entweder über die direkte Bluetooth-Verbindung zu deinem Auto oder über die automatische GPS-Erfassung. Beide Funktionen lassen sich in den Einstellungen einzeln ein- und ausschalten.`,
        qEn: `What's the difference between automatic and manual tracking?`,
        aEn: `With manual tracking, you start and end trips yourself. Automatic tracking detects trips independently \u2014 either via a direct Bluetooth connection to your car or via automatic GPS detection. Both functions can be toggled on and off separately in Settings.`,
      },
      {
        qDe: `Kann ich eine abgeschlossene Fahrt bearbeiten?`,
        aDe: `Ja. Öffne die Fahrtenliste im Tab \u201eFahrten\u201c, tippe auf die gewünschte Fahrt und wähle \u201eBearbeiten\u201c. Du kannst Start- und Zielort, Datum, Uhrzeit, Zweck sowie die Fahrtklassifikation ändern. Änderungen werden sofort gespeichert und bei bestehender Verbindung synchronisiert.`,
        qEn: `Can I edit a completed trip?`,
        aEn: `Yes. Open the trip list in the \u201cTrips\u201d tab, tap the desired trip, and select \u201cEdit\u201d. You can change the start and end location, date, time, purpose, and trip classification. Changes are saved immediately and synced when a connection is available.`,
      },
      {
        qDe: `Wie lösche ich eine Fahrt?`,
        aDe: `In der Fahrtenliste tippst du auf die Fahrt und wählst \u201eLöschen\u201c. Du wirst zur Bestätigung aufgefordert. Gelöschte Fahrten können nicht wiederhergestellt werden.`,
        qEn: `How do I delete a trip?`,
        aEn: `In the trip list, tap the trip and select \u201cDelete\u201d. You'll be asked to confirm. Deleted trips cannot be restored.`,
      },
      {
        qDe: `Warum werden manche Fahrten nicht automatisch erkannt?`,
        aDe: `Das automatische Tracking benötigt ausreichende GPS-Signalstärke oder eine Bluetooth-Verbindung zu deinem Auto. Prüfe, ob GPS- und Hintergrund-Tracking aktiviert sind und ob die App Standortberechtigungen hat. Falls die Fahrterkennung länger als 10 Minuten pausiert war, erhältst du eine Erinnerung, sie neu zu starten.`,
        qEn: `Why aren't some trips detected automatically?`,
        aEn: `Automatic tracking requires sufficient GPS signal strength or a Bluetooth connection to your car. Check that GPS and background tracking are enabled and that the app has location permissions. If trip detection has been paused for more than 10 minutes, you'll receive a reminder to restart it.`,
      },
      {
        qDe: `Wie funktioniert die GPS-Aufzeichnung? Was bedeutet der Status \u201eGPS schwach\u201c?`,
        aDe: `Die App zeichnet in regelmäßigen Abständen GPS-Koordinaten auf und berechnet daraus Strecke, Dauer und Verlauf der Fahrt. Der Status \u201eGPS schwach\u201c erscheint, wenn das Signal zu schwach ist \u2014 das kann in Gebäuden, Tunneln oder dicht bebautem Stadtgebiet vorkommen.`,
        qEn: `How does GPS recording work? What does \u201cWeak GPS\u201d mean?`,
        aEn: `The app records GPS coordinates at regular intervals and calculates distance, duration, and route from them. The \u201cWeak GPS\u201d status appears when the signal is too weak \u2014 this can happen in buildings, tunnels, or densely built-up urban areas.`,
      },
      {
        qDe: `Was bedeutet die Kategorie \u201eArbeitsweg\u201c?`,
        aDe: `Zusätzlich zu \u201eGeschäftlich\u201c und \u201ePrivat\u201c gibt es \u201eArbeitsweg\u201c für Fahrten zwischen Wohnort und erster Tätigkeitsstätte. Diese Kategorie hat eigene steuerliche Regeln (z.B. nur Hinweg ODER Rückweg pro Arbeitstag absetzbar) und wird bei der Steuerberechnung entsprechend berücksichtigt.`,
        qEn: `What does the \u201cCommute\u201d category mean?`,
        aEn: `In addition to \u201cBusiness\u201d and \u201cPrivate\u201d, there's \u201cCommute\u201d for trips between your home and primary workplace. This category has its own tax rules (e.g. only outbound OR return trip per workday is deductible) and is factored into the tax calculation accordingly.`,
      },
      {
        qDe: `Wie klassifiziere ich Fahrten als geschäftlich, privat oder Arbeitsweg?`,
        aDe: `Beim manuellen Start einer Fahrt kannst du die Fahrtart direkt auswählen. Bei automatisch erkannten Fahrten wird der Standardwert aus deinen Einstellungen übernommen; du kannst ihn nachträglich beim Bearbeiten ändern.`,
        qEn: `How do I classify trips as business, private, or commute?`,
        aEn: `When starting a trip manually, you can select the trip type directly. For automatically detected trips, the default from your settings is used; you can change it afterward when editing.`,
      },
      {
        qDe: `Was bedeutet die Warnung bei unrealistischen Fahrtdaten?`,
        aDe: `FahrtDoc prüft Fahrten beim Speichern auf Plausibilität \u2014 etwa eine unrealistische Durchschnittsgeschwindigkeit oder eine zeitliche Überschneidung mit einer anderen Fahrt desselben Fahrzeugs. Bei Auffälligkeiten erscheint ein Hinweis; du kannst die Angaben korrigieren oder die Fahrt trotzdem speichern.`,
        qEn: `What does the warning about unrealistic trip data mean?`,
        aEn: `FahrtDoc checks trips for plausibility when saving \u2014 for example, an unrealistic average speed or a time overlap with another trip of the same vehicle. If something looks off, a warning appears; you can correct the details or save the trip anyway.`,
      },
      {
        qDe: `Kann ich FahrtDoc über CarPlay nutzen?`,
        aDe: `Ja. Verbindest du dein iPhone mit CarPlay, erscheint das FahrtDoc-Icon auf dem CarPlay-Bildschirm. Du kannst Fahrten direkt dort starten und beenden, ohne dein Handy in die Hand zu nehmen. Wichtig: Die App muss vor der Fahrt bereits geöffnet bzw. im Hintergrund aktiv sein \u2014 CarPlay startet FahrtDoc nicht automatisch.`,
        qEn: `Can I use FahrtDoc via CarPlay?`,
        aEn: `Yes. When you connect your iPhone to CarPlay, the FahrtDoc icon appears on the CarPlay screen. You can start and end trips directly there without picking up your phone. Important: The app must already be open or running in the background before you drive \u2014 CarPlay does not launch FahrtDoc automatically.`,
      },
      {
        qDe: `Warum braucht die App Hintergrund-Zugriff?`,
        aDe: `Für das automatische Tracking muss die App auch im Hintergrund auf den Standort zugreifen können. Ohne diese Berechtigung können Fahrten nur erkannt werden, wenn die App im Vordergrund ist.`,
        qEn: `Why does the app need background access?`,
        aEn: `For automatic tracking, the app needs background location access. Without this permission, trips can only be detected while the app is in the foreground.`,
      },
    ],
  },
  {
    id: `costs`,
    labelDe: `Kosten & Belege`,
    labelEn: `Costs & Receipts`,
    items: [
      {
        qDe: `Wie erfasse ich einen neuen Kosteneintrag?`,
        aDe: `Öffne den Tab \u201eKosten\u201c und tippe auf die Schaltfläche zum Hinzufügen. Du kannst Betrag, Datum, Kategorie und optional eine Notiz eingeben und den Eintrag speichern.`,
        qEn: `How do I add a new cost entry?`,
        aEn: `Open the \u201cCosts\u201d tab and tap the add button. You can enter the amount, date, category, and optionally a note, then save the entry.`,
      },
      {
        qDe: `Welche Kostenkategorien gibt es?`,
        aDe: `FahrtDoc unterscheidet zwischen Tanken, Wartung, Parkgebühr und Sonstiges. Wähle beim Erfassen die passende Kategorie, damit deine Auswertung übersichtlich bleibt.`,
        qEn: `What cost categories are available?`,
        aEn: `FahrtDoc distinguishes between Fuel, Maintenance, Parking, and Other. Select the appropriate category when entering a cost to keep your overview organized.`,
      },
      {
        qDe: `Kann ich einen Kosteneintrag bearbeiten oder löschen?`,
        aDe: `Ja, öffne den Eintrag in der Kostenliste und wähle \u201eBearbeiten\u201c oder \u201eLöschen\u201c. Gelöschte Einträge können nicht wiederhergestellt werden.`,
        qEn: `Can I edit or delete a cost entry?`,
        aEn: `Yes, open the entry in the cost list and select \u201cEdit\u201d or \u201cDelete\u201d. Deleted entries cannot be restored.`,
      },
      {
        qDe: `Wo werden meine Kosteneinträge gespeichert?`,
        aDe: `Kosteneinträge werden ausschließlich lokal auf deinem Gerät gespeichert, nicht auf unserem Server. Das bedeutet: Bei einer Neuinstallation oder einem Gerätewechsel gehen diese Daten verloren, im Gegensatz zu deinen Fahrten, die serverseitig gesichert werden. Jeder Kosteneintrag ist dabei einem bestimmten Fahrzeug zugeordnet.`,
        qEn: `Where are my cost entries stored?`,
        aEn: `Cost entries are stored exclusively on your device, not on our server. This means they'll be lost if you reinstall the app or switch devices \u2014 unlike your trips, which are backed up server-side. Each cost entry is linked to a specific vehicle.`,
      },
      {
        qDe: `Kann ich meine Kosten auswerten?`,
        aDe: `Ja, im Tab \u201eKosten\u201c siehst du eine Übersicht mit Gesamtsumme, Kosten pro Kilometer sowie einer Aufschlüsselung nach Kategorie, jeweils bezogen auf das ausgewählte Fahrzeug. Du kannst den Zeitraum (1, 3, 6 oder 12 Monate) frei wählen.`,
        qEn: `Can I analyze my costs?`,
        aEn: `Yes, the \u201cCosts\u201d tab shows an overview with total amount, cost per kilometer, and a breakdown by category, based on the selected vehicle. You can select the time period freely (1, 3, 6, or 12 months).`,
      },
      {
        qDe: `Kann ich meine Kosten exportieren?`,
        aDe: `Ja, du kannst deine Kosteneintr\u00e4ge als PDF exportieren. Ein CSV-Export ist aktuell nur f\u00fcr Fahrten verf\u00fcgbar, nicht f\u00fcr Kosten.`,
        qEn: `Can I export my costs?`,
        aEn: `Yes, you can export your cost entries as a PDF. CSV export is currently only available for trips, not for costs.`,
      },
      {
        qDe: `Was passiert mit meinem Beleg-Foto beim KI-Scan?`,
        aDe: `Wenn du die automatische Belegerkennung nutzt, wird das Foto einmalig zur Analyse an unseren KI-Anbieter Anthropic \u00fcbermittelt. Es wird dort nicht dauerhaft gespeichert und nach der Analyse verworfen. Das Foto selbst bleibt zus\u00e4tzlich lokal auf deinem Ger\u00e4t gespeichert.`,
        qEn: `What happens to my receipt photo during the AI scan?`,
        aEn: `If you use automatic receipt recognition, the photo is sent once to our AI provider Anthropic for analysis. It is not stored there permanently and is discarded after analysis. The photo itself also remains stored locally on your device.`,
      },
    ],
  },
  {
    id: `export_tax`,
    labelDe: `Export & Steuer`,
    labelEn: `Export & Tax`,
    items: [
      {
        qDe: `Wie exportiere ich mein Fahrtenbuch? In welchen Formaten kann ich exportieren?`,
        aDe: `Im Tab \u201eFahrten\u201c findest du oben rechts eine Export-Schaltfläche. Du kannst einen Zeitraum wählen und die Daten als PDF, als CSV-Datei (für Tabellenkalkulationen wie Excel oder Google Sheets) exportieren oder dir direkt per E-Mail zusenden lassen.`,
        qEn: `How do I export my logbook? What formats are available?`,
        aEn: `In the \u201cTrips\u201d tab, you'll find an export button in the top right. You can select a time period and export your data as PDF, as a CSV file (for spreadsheets like Excel or Google Sheets), or have it sent directly to you by email.`,
      },
      {
        qDe: `Wonach richtet sich die Steuerberechnung meiner Fahrten?`,
        aDe: `Die Steuerberechnung basiert auf dem Land, das du in deinem Profil hinterlegt hast (Deutschland, Österreich oder Schweiz) \u2014 nicht auf deinem aktuellen Standort. Jedes Land hat eigene Sätze für Arbeitsweg- und Geschäftsfahrten. Diese Berechnung dient als Orientierung und ersetzt keine Steuerberatung \u2014 sie muss nicht zwingend mit der Einschätzung oder Berechnung deines zuständigen Finanzamts übereinstimmen.`,
        qEn: `What determines the tax calculation for my trips?`,
        aEn: `Tax calculation is based on the country set in your profile (Germany, Austria, or Switzerland) \u2014 not your current location. Each country has its own rates for commute and business trips. This calculation serves as guidance only and does not replace professional tax advice \u2014 it may not necessarily match the assessment or calculation of your local tax authority.`,
      },
      {
        qDe: `Welche Distanz wird für die Steuerberechnung verwendet?`,
        aDe: `Standardmäßig wird die GPS-gemessene Distanz für die Steuerberechnung genutzt. Beim Speichern einer Fahrt kannst du stattdessen eine kürzere, berechnete Route auswählen \u2014 in diesem Fall wird diese Routendistanz statt der GPS-Distanz für die Steuerberechnung verwendet. Im PDF-Export siehst du beide Werte (GPS und kürzeste Route) sowie die tatsächlich verwendete Distanz nebeneinander.`,
        qEn: `Which distance is used for tax calculation?`,
        aEn: `By default, the GPS-measured distance is used for tax calculation. When saving a trip, you can instead select a shorter calculated route \u2014 in this case, that route's distance is used for tax calculation instead of the GPS distance. The PDF export shows both values (GPS and shortest route) alongside the distance actually used.`,
      },
      {
        qDe: `Unterscheidet sich der CSV-Export je nach Land?`,
        aDe: `Die Spaltenstruktur des CSV-Exports ist für alle Länder identisch. Unterschiedlich sind lediglich die Steuerinhalte innerhalb der Datei \u2014 je nach hinterlegtem Land (Deutschland, Österreich, Schweiz) werden die passende Berechnungsmethode, der jeweilige Satz und die Währung angezeigt.`,
        qEn: `Does the CSV export differ by country?`,
        aEn: `The CSV export's column structure is the same for all countries. Only the tax content within the file differs \u2014 depending on your country setting (Germany, Austria, Switzerland), the appropriate calculation method, rate, and currency are shown.`,
      },
    ],
  },
  {
    id: `account_vehicle`,
    labelDe: `Konto & Fahrzeug`,
    labelEn: `Account & Vehicle`,
    items: [
      {
        qDe: `Wie ändere ich mein Passwort?`,
        aDe: `Gehe zu Profil \u2192 Sicherheit & Datenschutz \u2192 Passwort ändern. Du erhältst einen Bestätigungscode per E-Mail. Gib den Code zusammen mit deinem neuen Passwort ein.`,
        qEn: `How do I change my password?`,
        aEn: `Go to Profile \u2192 Security & Privacy \u2192 Change Password. You'll receive a confirmation code by email. Enter the code together with your new password.`,
      },
      {
        qDe: `Was passiert, wenn ich mein Passwort vergesse?`,
        aDe: `Auf dem Anmeldebildschirm gibt es die Option \u201ePasswort vergessen\u201c. Gib deine E-Mail-Adresse ein \u2014 du erhältst einen Bestätigungscode per E-Mail. Nach Eingabe des Codes kannst du dein neues Passwort festlegen.`,
        qEn: `What happens if I forget my password?`,
        aEn: `On the login screen, there's a \u201cForgot Password\u201d option. Enter your email address \u2014 you'll receive a confirmation code by email. After entering the code, you can set your new password.`,
      },
      {
        qDe: `Wie ändere ich meine Fahrzeugdaten?`,
        aDe: `Gehe zu Profil \u2192 Konto \u2192 Fahrprofil & Fahrzeugdaten. Dort kannst du Marke, Modell, Baujahr, Farbe und Kennzeichen deines Fahrzeugs hinterlegen.`,
        qEn: `How do I change my vehicle data?`,
        aEn: `Go to Profile \u2192 Account \u2192 Driving Profile & Vehicle Data. There you can enter your vehicle's make, model, year, color, and license plate.`,
      },
      {
        qDe: `Kann ich mehrere Fahrzeuge hinzufügen?`,
        aDe: `Ja, du kannst bis zu 3 Fahrzeuge in deinem Konto anlegen. Gehe zu Profil \u2192 Fahrzeug hinzufügen, um ein neues Fahrzeug zu ergänzen. In der Fahrzeugliste im Profil kannst du bei jedem Fahrzeug auf den Stern tippen, um es als Standard festzulegen \u2014 dieses Fahrzeug wird dann automatisch in der gesamten App verwendet. Falls du ausnahmsweise eine Fahrt einem anderen Fahrzeug zuordnen möchtest, kannst du beim Speichern der Fahrt das gewünschte Fahrzeug aus einer Dropdown-Liste auswählen.`,
        qEn: `Can I add multiple vehicles?`,
        aEn: `Yes, you can add up to 3 vehicles to your account. Go to Profile \u2192 Add Vehicle to add a new one. In the vehicle list in your profile, tap the star next to any vehicle to set it as default \u2014 this vehicle will then be used automatically throughout the app. If you occasionally want to assign a trip to a different vehicle, you can select it from a dropdown list when saving the trip.`,
      },
      {
        qDe: `Wie ändere ich die App-Sprache?`,
        aDe: `Gehe zu Profil \u2192 Einstellungen \u2192 Sprache und wähle zwischen Deutsch und Englisch. Die Änderung wird sofort auf die gesamte App angewendet.`,
        qEn: `How do I change the app language?`,
        aEn: `Go to Profile \u2192 Settings \u2192 Language and choose between German and English. The change is applied to the entire app immediately.`,
      },
      {
        qDe: `Kann ich das Design der App anpassen?`,
        aDe: `Ja. Unter Profil \u2192 Einstellungen \u2192 Design kannst du zwischen Hell, Dunkel und Systemeinstellung wählen. Im Systemeinstellung-Modus passt sich die App an das Systemdesign an.`,
        qEn: `Can I customize the app's appearance?`,
        aEn: `Yes. Under Profile \u2192 Settings \u2192 Design, you can choose between Light, Dark, and System. In System mode, the app adapts to your device's system theme.`,
      },
    ],
  },
  {
    id: `privacy_security`,
    labelDe: `Datenschutz & Sicherheit`,
    labelEn: `Privacy & Security`,
    items: [
      {
        qDe: `Welche Daten speichert die App?`,
        aDe: `FahrtDoc speichert Fahrten (Start/Ziel, Datum, Uhrzeit, Strecke, Fahrtart, Notizen), GPS-Koordinaten sowie Profildaten (Name, E-Mail, Fahrzeugdaten). Kosteneinträge und zugehörige Belegfotos werden ausschließlich lokal auf deinem Gerät gespeichert, nicht auf unserem Server. Alle serverseitig gespeicherten Daten werden verschlüsselt abgelegt.`,
        qEn: `What data does the app store?`,
        aEn: `FahrtDoc stores trips (start/end location, date, time, distance, trip type, notes), GPS coordinates, and profile data (name, email, vehicle data). Cost entries and any associated receipt photos are stored exclusively on your device, not on our server. All server-side data is encrypted.`,
      },
      {
        qDe: `Werden meine Daten an Dritte weitergegeben?`,
        aDe: `Nein, nicht zu Werbezwecken. F\u00fcr die Adressaufl\u00f6sung nutzen wir OpenStreetMap Nominatim (nur GPS-Koordinaten werden \u00fcbertragen). Nutzt du den optionalen KI-Kassenbeleg-Scan, wird das Foto einmalig zur Analyse an unseren KI-Anbieter Anthropic \u00fcbermittelt und danach nicht gespeichert.`,
        qEn: `Is my data shared with third parties?`,
        aEn: `No, not for advertising purposes. For address resolution we use OpenStreetMap Nominatim (only GPS coordinates are transmitted). If you use the optional AI receipt scan, the photo is sent once to our AI provider Anthropic for analysis and is not stored afterward.`,
      },
      {
        qDe: `Wie lösche ich mein Konto?`,
        aDe: `Gehe zu Profil \u2192 unten auf \u201eKonto löschen\u201c. Alle deine Daten (Fahrten, Profil, Kontodaten) werden sofort und dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.`,
        qEn: `How do I delete my account?`,
        aEn: `Go to Profile \u2192 tap \u201cDelete Account\u201d at the bottom. All your data (trips, profile, account data) will be deleted immediately and permanently. This action cannot be undone.`,
      },
      {
        qDe: `Wie lange werden meine Daten gespeichert?`,
        aDe: `Wir streben eine Speicherdauer von maximal 5 Jahren zuz\u00fcglich des laufenden Kalenderjahres an, in Anlehnung an g\u00e4ngige steuerliche Aufbewahrungsfristen. Eine automatisierte L\u00f6schung nach Ablauf dieser Frist befindet sich aktuell im Testbetrieb.`,
        qEn: `How long is my data retained?`,
        aEn: `We aim for a maximum retention period of 5 years plus the current calendar year, in line with standard tax retention periods. Automated deletion after this period is currently being tested.`,
      },
    ],
  },
  {
    id: `support`,
    labelDe: `Support`,
    labelEn: `Support`,
    items: [
      {
        qDe: `Welche Version der App habe ich?`,
        aDe: `Die aktuelle Versionsnummer findest du unter Profil \u2192 Support \u2192 App-Version.`,
        qEn: `What version of the app do I have?`,
        aEn: `You can find the current version number under Profile \u2192 Support \u2192 App Version.`,
      },
      {
        qDe: `Wie kontaktiere ich den Support?`,
        aDe: `Du erreichst unseren Support unter info@centof.ai oder über das Kontaktformular in der App. Wir antworten in der Regel innerhalb von 1\u20132 Werktagen.`,
        qEn: `How do I contact support?`,
        aEn: `You can reach our support at info@centof.ai or via the contact form in the app. We typically respond within 1\u20132 business days.`,
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-theme last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-heading leading-snug group-hover:text-[#0066CC] transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#0066CC] shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="text-sm text-caption leading-relaxed pb-4 pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FahrtDocSupportPage() {
  const [lang, setLang] = useState<Lang>("de");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) => setOpenItem(openItem === key ? null : key);

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Back link */}
          <Link
            to="/products/fahrtdoc"
            className="inline-flex items-center gap-2 text-sm text-[#0066CC] hover:text-[#0044AA] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zu FahrtDoc
          </Link>

          {/* Header row */}
          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0066CC]/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[#0066CC]" />
              </div>
              <span className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider">
                FahrtDoc
              </span>
            </div>
            {/* DE/EN toggle */}
            <div className="flex items-center gap-1 bg-card-theme border border-theme rounded-lg p-1">
              <button
                onClick={() => setLang("de")}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  lang === "de"
                    ? "bg-[#0066CC] text-white"
                    : "text-caption hover:text-heading"
                }`}
              >
                DE
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  lang === "en"
                    ? "bg-[#0066CC] text-white"
                    : "text-caption hover:text-heading"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-heading mb-1">
            {lang === "de" ? "Support & Hilfe" : "Support & Help"}
          </h1>
          <p className="text-caption text-sm mb-10">
            {lang === "de"
              ? "für FahrtDoc \u2014 automatische Fahrtenerfassung für iOS"
              : "for FahrtDoc \u2014 automatic trip tracking for iOS"}
          </p>

          {/* CONTACT BLOCK — always visible, not behind click */}
          <div className="rounded-2xl bg-gradient-to-r from-[#0066CC] to-[#0044AA] p-6 md:p-8 mb-10">
            <p className="text-blue-100 text-sm mb-3">
              {lang === "de"
                ? "Fragen oder Probleme? Schreib uns direkt:"
                : "Questions or issues? Reach us directly:"}
            </p>
            <a
              href="mailto:info@centof.ai"
              className="inline-flex items-center gap-2 text-white font-bold text-lg hover:underline break-all"
            >
              info@centof.ai
            </a>
            <p className="text-blue-200 text-xs mt-3">
              {lang === "de"
                ? "Antwortzeit in der Regel 1\u20132 Werktage."
                : "We typically respond within 1\u20132 business days."}
            </p>
          </div>

          {/* LEGAL NOTICES */}
          <div className="mb-10 space-y-4">
            <h2 className="text-lg font-bold text-heading mb-4">
              {lang === "de" ? "Rechtliche Hinweise" : "Legal Notices"}
            </h2>
            {LEGAL_NOTICES.map((notice, i) => (
              <div key={i} className="rounded-xl bg-card-theme border border-theme p-5">
                <h3 className="text-sm font-semibold text-heading mb-2">
                  {lang === "de" ? notice.titleDe : notice.titleEn}
                </h3>
                <p className="text-sm text-caption leading-relaxed">
                  {lang === "de" ? notice.textDe : notice.textEn}
                </p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-lg font-bold text-heading mb-6">
              {lang === "de" ? "Häufige Fragen" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-6">
              {CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <h3 className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider mb-2">
                    {lang === "de" ? cat.labelDe : cat.labelEn}
                  </h3>
                  <div className="rounded-xl bg-card-theme border border-theme px-5">
                    {cat.items.map((item, idx) => {
                      const key = `${cat.id}-${idx}`;
                      return (
                        <AccordionItem
                          key={key}
                          question={lang === "de" ? item.qDe : item.qEn}
                          answer={lang === "de" ? item.aDe : item.aEn}
                          isOpen={openItem === key}
                          onToggle={() => toggle(key)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-theme pt-6 flex flex-wrap gap-4 text-sm text-caption">
            <Link
              to="/products/fahrtdoc/datenschutz"
              className="hover:text-[#0066CC] transition-colors"
            >
              {lang === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
            </Link>
            <Link to="/impressum" className="hover:text-[#0066CC] transition-colors">
              Impressum
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
