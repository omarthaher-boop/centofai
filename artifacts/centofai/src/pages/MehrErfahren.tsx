import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function MehrErfahren() {
  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          padding: '100px 0 80px',
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

        <div style={{ maxWidth: '760px', width: '100%', padding: '0 24px' }}>

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

        </div> {/* end text content */}

          {/* ═══ WORKFLOW SECTION ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            style={{ width: '100%', maxWidth: '100%', padding: '0', marginTop: '64px' }}
          >
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(38,33,92,0.7)',
                border: '0.5px solid #534AB7', borderRadius: '20px',
                padding: '5px 16px', fontSize: '11px', color: '#CECBF6',
                letterSpacing: '0.08em', marginBottom: '16px',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%',
                               background: '#5DCAA5', display: 'inline-block' }} />
                So arbeiten wir
              </span>
              <h2 style={{
                fontSize: '28px', fontWeight: '500',
                color: 'var(--color-text-primary, #EEEDFE)',
                lineHeight: '1.3', marginBottom: '12px',
              }}>
                Unser <span style={{ color: '#7F77DD' }}>Workflow</span>
              </h2>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary, #AFA9EC)',
                lineHeight: '1.7', maxWidth: '480px', margin: '0 auto',
              }}>
                Von Ihrer Idee bis zum fertigen digitalen Produkt —
                transparent, strukturiert und mit Ihnen gemeinsam.
              </p>
            </div>

            {/* Flowchart Container */}
            <div style={{
              width: '100%',
              maxWidth: '100%',
              background: 'rgba(10,10,30,0.5)',
              borderTop: '0.5px solid rgba(127,119,221,0.2)',
              borderBottom: '0.5px solid rgba(127,119,221,0.2)',
              border: 'none',
              borderRadius: '0',
              padding: '40px 32px',
              overflowX: 'auto',
            }}>
              <svg
                width="100%"
                viewBox="0 0 860 560"
                xmlns="http://www.w3.org/2000/svg"
                style={{ minWidth: '600px', width: '100%', maxWidth: '1400px', display: 'block', margin: '0 auto' }}
              >
                <defs>
                  <marker id="wf-arr" viewBox="0 0 10 10" refX="8" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="#7F77DD"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                  <marker id="wf-teal" viewBox="0 0 10 10" refX="8" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="#1D9E75"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                  <marker id="wf-coral" viewBox="0 0 10 10" refX="8" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="#D85A30"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                  <marker id="wf-gray" viewBox="0 0 10 10" refX="8" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="#888780"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                </defs>

                {/* SWIM LANE RAHMEN */}
                <rect x="20" y="20" width="820" height="300" rx="8"
                  fill="none" stroke="#3C3489" strokeWidth="0.5"/>
                <rect x="20" y="20" width="110" height="300"
                  fill="rgba(38,33,92,0.35)" rx="0"/>
                <line x1="130" y1="20" x2="130" y2="320"
                  stroke="#3C3489" strokeWidth="0.5"/>

                {/* LANE TRENNLINIEN */}
                <line x1="130" y1="80" x2="840" y2="80"
                  stroke="#3C3489" strokeWidth="0.5" strokeDasharray="4 3"/>
                <line x1="130" y1="140" x2="840" y2="140"
                  stroke="#3C3489" strokeWidth="0.5" strokeDasharray="4 3"/>
                <line x1="130" y1="200" x2="840" y2="200"
                  stroke="#3C3489" strokeWidth="0.5" strokeDasharray="4 3"/>
                <line x1="130" y1="260" x2="840" y2="260"
                  stroke="#3C3489" strokeWidth="0.5" strokeDasharray="4 3"/>

                {/* LANE FARBHINTERGRÜNDE */}
                <rect x="130" y="21" width="710" height="59" fill="rgba(83,74,183,0.07)"/>
                <rect x="130" y="80" width="710" height="60" fill="rgba(83,74,183,0.04)"/>
                <rect x="130" y="140" width="710" height="60" fill="rgba(29,158,117,0.05)"/>
                <rect x="130" y="200" width="710" height="60" fill="rgba(29,158,117,0.04)"/>
                <rect x="130" y="260" width="710" height="59" fill="rgba(216,90,48,0.05)"/>

                {/* LANE LABELS */}
                {[
                  { y: 53, label: 'Nutzer' },
                  { y: 113, label: 'Centofai Team' },
                  { y: 173, label: 'Experten' },
                  { y: 233, label: 'Team + Nutzer' },
                  { y: 293, label: 'Alle Beteiligten' },
                ].map((lane) => (
                  <text key={lane.y} x="75" y={lane.y} textAnchor="middle"
                    fontSize="10" fill="#AFA9EC" fontFamily="system-ui,sans-serif">
                    {lane.label}
                  </text>
                ))}

                {/* NODE 1: Idee einreichen */}
                <rect x="145" y="28" width="130" height="44" rx="8"
                  fill="rgba(83,74,183,0.2)" stroke="#534AB7" strokeWidth="0.5"/>
                <text x="210" y="46" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#CECBF6" fontFamily="system-ui,sans-serif">Idee einreichen</text>
                <text x="210" y="62" textAnchor="middle" fontSize="9"
                  fill="#AFA9EC" fontFamily="system-ui,sans-serif">Nutzer</text>

                <line x1="210" y1="72" x2="210" y2="88"
                  stroke="#7F77DD" strokeWidth="1.5" markerEnd="url(#wf-arr)"/>

                {/* NODE 2: Interne Analyse */}
                <rect x="145" y="88" width="130" height="44" rx="8"
                  fill="rgba(83,74,183,0.2)" stroke="#534AB7" strokeWidth="0.5"/>
                <text x="210" y="106" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#CECBF6" fontFamily="system-ui,sans-serif">Interne Analyse</text>
                <text x="210" y="122" textAnchor="middle" fontSize="9"
                  fill="#AFA9EC" fontFamily="system-ui,sans-serif">Centofai-Team</text>

                <line x1="275" y1="110" x2="325" y2="110"
                  stroke="#7F77DD" strokeWidth="1.5" markerEnd="url(#wf-arr)"/>

                {/* NODE 3: Machbarkeitsprüfung */}
                <rect x="325" y="88" width="140" height="44" rx="8"
                  fill="rgba(83,74,183,0.2)" stroke="#534AB7" strokeWidth="0.5"/>
                <text x="395" y="104" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#CECBF6" fontFamily="system-ui,sans-serif">Machbarkeits-</text>
                <text x="395" y="120" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#CECBF6" fontFamily="system-ui,sans-serif">prüfung</text>

                <line x1="395" y1="132" x2="395" y2="148"
                  stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#wf-teal)"/>

                {/* NODE 4: Expertenkonsultation */}
                <rect x="325" y="148" width="140" height="44" rx="8"
                  fill="rgba(29,158,117,0.15)" stroke="#1D9E75" strokeWidth="0.5"/>
                <text x="395" y="164" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#9FE1CB" fontFamily="system-ui,sans-serif">Experten-</text>
                <text x="395" y="180" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#9FE1CB" fontFamily="system-ui,sans-serif">konsultation</text>

                <line x1="465" y1="170" x2="520" y2="170"
                  stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#wf-teal)"/>

                {/* NODE 5: Lösungsansätze */}
                <rect x="520" y="148" width="140" height="44" rx="8"
                  fill="rgba(29,158,117,0.15)" stroke="#1D9E75" strokeWidth="0.5"/>
                <text x="590" y="164" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#9FE1CB" fontFamily="system-ui,sans-serif">Lösungsansätze</text>
                <text x="590" y="180" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#9FE1CB" fontFamily="system-ui,sans-serif">entwickeln</text>

                <line x1="590" y1="192" x2="590" y2="208"
                  stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#wf-teal)"/>

                {/* NODE 6: Feedback an Nutzer */}
                <rect x="520" y="208" width="140" height="44" rx="8"
                  fill="rgba(29,158,117,0.15)" stroke="#1D9E75" strokeWidth="0.5"/>
                <text x="590" y="224" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#9FE1CB" fontFamily="system-ui,sans-serif">Feedback an</text>
                <text x="590" y="240" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#9FE1CB" fontFamily="system-ui,sans-serif">Nutzer</text>

                <line x1="520" y1="230" x2="470" y2="230"
                  stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#wf-teal)"/>

                {/* RAUTE: Vereinbarung? */}
                <polygon points="395,208 440,230 395,252 350,230"
                  fill="rgba(29,158,117,0.1)" stroke="#1D9E75" strokeWidth="0.5"/>
                <text x="395" y="226" textAnchor="middle" fontSize="9"
                  fill="#5DCAA5" fontFamily="system-ui,sans-serif">Vereinba-</text>
                <text x="395" y="239" textAnchor="middle" fontSize="9"
                  fill="#5DCAA5" fontFamily="system-ui,sans-serif">rung?</text>

                {/* Nein Rückschleife */}
                <path d="M350 230 L290 230 L290 110 L325 110"
                  fill="none" stroke="#888780" strokeWidth="1.5"
                  strokeDasharray="5 3" markerEnd="url(#wf-gray)"/>
                <text x="302" y="222" fontSize="9" fill="#888780"
                  fontFamily="system-ui,sans-serif">Nein</text>

                {/* Ja Pfeil runter */}
                <line x1="395" y1="252" x2="395" y2="268"
                  stroke="#D85A30" strokeWidth="1.5" markerEnd="url(#wf-coral)"/>
                <text x="410" y="264" fontSize="9" fill="#D85A30"
                  fontFamily="system-ui,sans-serif">Ja</text>

                {/* NODE 7: KI-gestützte Entwicklung */}
                <rect x="325" y="268" width="140" height="44" rx="8"
                  fill="rgba(216,90,48,0.15)" stroke="#D85A30" strokeWidth="0.5"/>
                <text x="395" y="284" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#F0997B" fontFamily="system-ui,sans-serif">KI-gestützte</text>
                <text x="395" y="300" textAnchor="middle" fontSize="11"
                  fontWeight="500" fill="#F0997B" fontFamily="system-ui,sans-serif">Entwicklung</text>

                <line x1="325" y1="290" x2="285" y2="290"
                  stroke="#D85A30" strokeWidth="1" markerEnd="url(#wf-coral)"/>
                <rect x="145" y="268" width="140" height="44" rx="8"
                  fill="rgba(100,100,100,0.12)" stroke="#888780" strokeWidth="0.5"/>
                <text x="215" y="284" textAnchor="middle" fontSize="10"
                  fontWeight="500" fill="#D3D1C7" fontFamily="system-ui,sans-serif">Softwareingenieure</text>
                <text x="215" y="300" textAnchor="middle" fontSize="10"
                  fill="#B4B2A9" fontFamily="system-ui,sans-serif">+ KI-Tools</text>

                <line x1="465" y1="290" x2="505" y2="290"
                  stroke="#D85A30" strokeWidth="1" markerEnd="url(#wf-coral)"/>
                <rect x="505" y="268" width="155" height="44" rx="8"
                  fill="rgba(100,100,100,0.12)" stroke="#888780" strokeWidth="0.5"/>
                <text x="582" y="284" textAnchor="middle" fontSize="10"
                  fontWeight="500" fill="#D3D1C7" fontFamily="system-ui,sans-serif">Branchenexpertin</text>
                <text x="582" y="300" textAnchor="middle" fontSize="10"
                  fill="#B4B2A9" fontFamily="system-ui,sans-serif">+ Nutzer-Feedback</text>

                {/* Pfeil zum Launch-Freigabe */}
                <line x1="395" y1="312" x2="395" y2="350"
                  stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#wf-arr)"/>

                {/* RAUTE: Freigabe? */}
                <polygon points="395,350 435,370 395,390 355,370"
                  fill="rgba(216,90,48,0.1)" stroke="#D85A30" strokeWidth="0.5"/>
                <text x="395" y="374" textAnchor="middle" fontSize="9"
                  fill="#F0997B" fontFamily="system-ui,sans-serif">Freigabe?</text>

                {/* Überarbeiten Rückschleife */}
                <path d="M355 370 L290 370 L290 290 L325 290"
                  fill="none" stroke="#888780" strokeWidth="1.5"
                  strokeDasharray="5 3" markerEnd="url(#wf-gray)"/>
                <text x="276" y="362" fontSize="9" fill="#888780"
                  fontFamily="system-ui,sans-serif">Überarbeiten</text>

                {/* Freigabe Pfeil */}
                <line x1="395" y1="390" x2="395" y2="418"
                  stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#wf-arr)"/>
                <text x="412" y="408" fontSize="9" fill="#7F77DD"
                  fontFamily="system-ui,sans-serif">Freigabe</text>

                {/* LAUNCH NODE */}
                <rect x="280" y="418" width="230" height="52" rx="12"
                  fill="rgba(83,74,183,0.2)" stroke="#7F77DD" strokeWidth="1"/>
                <text x="395" y="438" textAnchor="middle" fontSize="13"
                  fontWeight="600" fill="#EEEDFE" fontFamily="system-ui,sans-serif">Digitales Produkt</text>
                <text x="395" y="457" textAnchor="middle" fontSize="10"
                  fill="#AFA9EC" fontFamily="system-ui,sans-serif">Launch &amp; Übergabe an Nutzer</text>

                {/* Output links */}
                <line x1="280" y1="444" x2="235" y2="444"
                  stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#wf-arr)"/>
                <rect x="145" y="422" width="90" height="44" rx="8"
                  fill="rgba(83,74,183,0.12)" stroke="#534AB7" strokeWidth="0.5"/>
                <text x="190" y="440" textAnchor="middle" fontSize="10"
                  fontWeight="500" fill="#CECBF6" fontFamily="system-ui,sans-serif">Web-App</text>
                <text x="190" y="456" textAnchor="middle" fontSize="9"
                  fill="#AFA9EC" fontFamily="system-ui,sans-serif">/ SaaS</text>

                {/* Output rechts */}
                <line x1="510" y1="444" x2="555" y2="444"
                  stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#wf-arr)"/>
                <rect x="555" y="422" width="105" height="44" rx="8"
                  fill="rgba(83,74,183,0.12)" stroke="#534AB7" strokeWidth="0.5"/>
                <text x="607" y="440" textAnchor="middle" fontSize="10"
                  fontWeight="500" fill="#CECBF6" fontFamily="system-ui,sans-serif">Mobile-App</text>
                <text x="607" y="456" textAnchor="middle" fontSize="9"
                  fill="#AFA9EC" fontFamily="system-ui,sans-serif">/ KI-Tool</text>

                {/* LEGENDE */}
                <rect x="20" y="490" width="820" height="60" rx="8"
                  fill="rgba(10,10,30,0.4)" stroke="#3C3489" strokeWidth="0.5"/>
                <text x="40" y="512" fontSize="10" fill="#7F77DD"
                  fontFamily="system-ui,sans-serif" fontWeight="500">Legende</text>
                <rect x="40" y="522" width="10" height="10" rx="2"
                  fill="rgba(83,74,183,0.3)" stroke="#534AB7" strokeWidth="0.5"/>
                <text x="56" y="531" fontSize="9" fill="#AFA9EC"
                  fontFamily="system-ui,sans-serif">Nutzer / Team</text>
                <rect x="180" y="522" width="10" height="10" rx="2"
                  fill="rgba(29,158,117,0.2)" stroke="#1D9E75" strokeWidth="0.5"/>
                <text x="196" y="531" fontSize="9" fill="#AFA9EC"
                  fontFamily="system-ui,sans-serif">Experten &amp; Abstimmung</text>
                <rect x="360" y="522" width="10" height="10" rx="2"
                  fill="rgba(216,90,48,0.2)" stroke="#D85A30" strokeWidth="0.5"/>
                <text x="376" y="531" fontSize="9" fill="#AFA9EC"
                  fontFamily="system-ui,sans-serif">Entwicklung &amp; Prüfung</text>
                <line x1="530" y1="527" x2="560" y2="527"
                  stroke="#888780" strokeWidth="1.5" strokeDasharray="4 3"
                  markerEnd="url(#wf-gray)"/>
                <text x="568" y="531" fontSize="9" fill="#AFA9EC"
                  fontFamily="system-ui,sans-serif">Rückschleife</text>
              </svg>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            style={{ textAlign: 'center', marginTop: '40px', padding: '0 24px' }}
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

      </motion.div>
    </div>
  );
}
