import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";

export default function ImpressumPage() {
  useEffect(() => {
    document.title = "Impressum – CentofAI";
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

        <h1 className="text-3xl font-extrabold mb-2">Impressum</h1>
        <p className="text-[var(--text-caption)] text-sm mb-10">Angaben gemäß § 5 TMG</p>

        <div className="space-y-8 text-[var(--text-body)] text-sm leading-relaxed">
          <section className="border border-[var(--border-color)] rounded-2xl p-6 bg-[var(--bg-card)]/40">
            <h2 className="text-base font-bold mb-3 text-white">Anbieter</h2>
            <p className="text-[var(--text-caption)] italic">
              [Firmenname oder vollständiger Name des Inhabers]<br />
              [Straße und Hausnummer]<br />
              [PLZ und Ort]<br />
              Deutschland
            </p>
          </section>

          <section className="border border-[var(--border-color)] rounded-2xl p-6 bg-[var(--bg-card)]/40">
            <h2 className="text-base font-bold mb-3 text-white">Kontakt</h2>
            <p className="text-[var(--text-caption)] italic">
              E-Mail:{" "}
              <a href="mailto:hello@centofai.com" className="text-purple-400 hover:text-purple-300 transition">
                hello@centofai.com
              </a>
            </p>
          </section>

          <section className="border border-[var(--border-color)] rounded-2xl p-6 bg-[var(--bg-card)]/40">
            <h2 className="text-base font-bold mb-3 text-white">Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
            <p className="text-[var(--text-caption)] italic">
              [Vollständiger Name]<br />
              [Anschrift wie oben]
            </p>
          </section>

          <section className="border border-[var(--border-color)] rounded-2xl p-6 bg-[var(--bg-card)]/40">
            <h2 className="text-base font-bold mb-3 text-white">Haftungsausschluss</h2>
            <p className="text-[var(--text-caption)]">
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
              und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß
              § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </section>

          <section className="border border-[var(--border-color)] rounded-2xl p-6 bg-[var(--bg-card)]/40">
            <h2 className="text-base font-bold mb-3 text-white">Links zu externen Websites</h2>
            <p className="text-[var(--text-caption)]">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

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
