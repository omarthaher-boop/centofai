import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function MehrErfahren() {
  return (
    <div style={{ minHeight: '100vh', background: '#07071a' }}>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          padding: '80px 24px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(38,33,92,0.7)',
            border: '0.5px solid #534AB7',
            borderRadius: '20px', padding: '5px 16px',
            fontSize: '11px', color: '#CECBF6',
            letterSpacing: '0.08em', marginBottom: '36px',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%',
                         background: '#5DCAA5', display: 'inline-block' }} />
          Unsere Leistungen im Überblick
        </motion.span>

        <div style={{ maxWidth: '760px', width: '100%' }}>

          {/* Titel */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: '38px', fontWeight: '500',
              color: 'var(--color-text-primary, #EEEDFE)',
              lineHeight: '1.25', marginBottom: '24px',
            }}
          >
            Ihr Alltag.{' '}
            <span style={{ color: '#7F77DD' }}>Ihr Problem.</span>{' '}
            Unsere Lösung.
          </motion.h1>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: '16px',
              color: 'var(--color-text-secondary, #AFA9EC)',
              lineHeight: '1.85', marginBottom: '40px',
            }}
          >
            Ob Studierende, Unternehmerinnen und Unternehmer,
            Akademikerinnen und Akademiker oder Geschäftsleute —
            eines verbindet alle: Der Alltag stellt täglich hohe
            Anforderungen. Deadlines, bürokratische Hürden, komplexe
            Prozesse und zeitintensive Recherchen gehören für viele
            zur täglichen Realität. Was klein klingt, kann auf Dauer
            zu einer echten Belastung werden — für Ihre Zeit, Ihre
            Nerven und nicht zuletzt für Ihre Gesundheit.
          </motion.p>

          {/* Trennlinie */}
          <div style={{ height: '0.5px', background: 'rgba(127,119,221,0.2)',
                        marginBottom: '40px' }} />

          {/* KI + Programmierung */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ marginBottom: '40px' }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: '500',
                         color: 'var(--color-text-primary, #EEEDFE)',
                         marginBottom: '14px' }}>
              Mithilfe modernster KI-Tools zu Ihrer Lösung
            </h2>
            <p style={{ fontSize: '15px',
                        color: 'var(--color-text-secondary, #AFA9EC)',
                        lineHeight: '1.85' }}>
              Bei Synthof setzen wir auf ein breites Spektrum
              modernster KI-Technologien, um Ihr Anliegen präzise
              zu analysieren und die optimale Lösung zu entwickeln.
              Unser Team begleitet Sie von der ersten Idee bis zur
              fertigen digitalen Anwendung — einschließlich der
              vollständigen Programmierung und technischen Umsetzung.
              So entsteht aus Ihrem Problem eine maßgeschneiderte
              digitale Lösung, die Ihren Alltag spürbar erleichtert.
            </p>
          </motion.div>

          {/* 4 Schritte */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px', marginBottom: '40px',
            }}
          >
            {[
              { n: '1', t: 'Problem einsenden',
                d: 'Senden Sie uns Ihr Anliegen — egal wie groß oder klein.' },
              { n: '2', t: 'KI-Analyse',
                d: 'Modernste KI-Tools analysieren Ihr Problem präzise.' },
              { n: '3', t: 'Expertenberatung',
                d: 'Fachexpertinnen aus dem jeweiligen Bereich begleiten Sie.' },
              { n: '4', t: 'Digitale Umsetzung',
                d: 'Vollständige Programmierung Ihrer maßgeschneiderten Lösung.' },
            ].map(s => (
              <div key={s.n} style={{
                background: 'rgba(10,10,30,0.5)',
                border: '0.5px solid rgba(127,119,221,0.2)',
                borderRadius: '10px', padding: '18px',
                display: 'flex', gap: '12px',
              }}>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: 'rgba(83,74,183,0.2)',
                  border: '0.5px solid #534AB7',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '11px',
                  fontWeight: '500', color: '#AFA9EC', flexShrink: 0,
                }}>
                  {s.n}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: '500',
                               color: 'var(--color-text-primary, #EEEDFE)',
                               marginBottom: '4px' }}>{s.t}</p>
                  <p style={{ fontSize: '12px',
                               color: 'var(--color-text-muted, #7F77DD)',
                               lineHeight: '1.6' }}>{s.d}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Finanzierung */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{
              borderLeft: '2px solid #534AB7',
              paddingLeft: '20px', marginBottom: '48px',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: '500',
                         color: 'var(--color-text-primary, #EEEDFE)',
                         marginBottom: '12px' }}>
              Transparent. Flexibel. Zugänglich.
            </h2>
            <p style={{ fontSize: '15px',
                        color: 'var(--color-text-secondary, #AFA9EC)',
                        lineHeight: '1.85' }}>
              Alle Erstgespräche bei Centofai sind vollständig
              kostenfrei. Unsere Vergütungsmodelle sind flexibel
              und richten sich nach Ihren individuellen Möglichkeiten
              und der Art Ihres Projekts. Und selbst wenn die
              finanziellen Mittel begrenzt sind: Durch unsere
              speziellen Kooperations- und Fördermodelle können Sie
              Ihre Idee nahezu kostenfrei verwirklichen. Denn eine
              gute Idee sollte niemals an finanziellen Hürden
              scheitern.
            </p>
          </motion.div>

          {/* Slogan */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            style={{ textAlign: 'center', padding: '32px 0' }}
          >
            <p style={{ fontSize: '26px', fontWeight: '500', lineHeight: '1.6' }}>
              <span style={{ color: '#AFA9EC' }}>Weniger Stress.</span>
              {' '}
              <span style={{ color: '#7F77DD' }}>Mehr Klarheit.</span>
              {' '}
              <span style={{ color: '#CECBF6' }}>Jeden Tag.</span>
            </p>
            <div style={{ width: '48px', height: '2px',
                          background: '#534AB7', borderRadius: '2px',
                          margin: '16px auto 0' }} />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            style={{ textAlign: 'center', marginTop: '40px' }}
          >
            <a href="/kontakt" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 36px', borderRadius: '12px',
              background: '#534AB7', color: '#EEEDFE',
              fontSize: '16px', fontWeight: '600',
              textDecoration: 'none',
            }}>
              Kostenloses Erstgespräch vereinbaren →
            </a>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
