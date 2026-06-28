export function HeroNeu() {
  return (
    <div style={{ minHeight: '100vh', background: '#07071a', fontFamily: 'system-ui, sans-serif', color: '#E6F1FB', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes hai-pulse-human { 0%,100%{opacity:.15} 50%{opacity:.35} }
        @keyframes hai-pulse-ai { 0%,100%{opacity:.12} 50%{opacity:.3} }
        @keyframes hai-orbit-cw { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes hai-orbit-ccw { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes hai-blink-purple { 0%,100%{fill:#534AB7} 50%{fill:#CECBF6} }
        @keyframes hai-blink-teal { 0%,100%{fill:#1D9E75} 50%{fill:#9FE1CB} }
        @keyframes hai-label-glow { 0%,100%{opacity:.5} 50%{opacity:.9} }
        @keyframes hai-flow-right { to{stroke-dashoffset:-48} }
        @keyframes hai-flow-left { to{stroke-dashoffset:48} }
      `}</style>

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(127,119,221,0.18) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div style={{ position: 'fixed', top: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: '#534AB7', opacity: 0.08, filter: 'blur(72px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -60, left: -60, width: 160, height: 160, borderRadius: '50%', background: '#5DCAA5', opacity: 0.06, filter: 'blur(52px)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Navbar stub */}
      <nav style={{ position: 'relative', zIndex: 10, borderBottom: '0.5px solid rgba(127,119,221,0.15)', background: 'rgba(7,7,26,0.85)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 700, fontSize: 17, color: '#EEEDFE' }}>centof.<span style={{ color: '#5DCAA5' }}>ai</span></span>
        <div style={{ display: 'flex', gap: 28, fontSize: 13, color: '#AFA9EC' }}>
          {['Home','Unsere Strategie','Ideen','KI-Tools','Kurse','Produkte','Kontakt'].map(l => <span key={l}>{l}</span>)}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ padding: '7px 18px', border: '1px solid rgba(127,119,221,0.3)', borderRadius: 8, fontSize: 13 }}>Anmelden</span>
          <span style={{ padding: '7px 18px', background: '#534AB7', borderRadius: 8, fontSize: 13 }}>Registrieren</span>
        </div>
      </nav>

      {/* Hero — two columns, both stretch to same height */}
      <header style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '72px 32px 64px', display: 'flex', flexDirection: 'row', alignItems: 'stretch', gap: 32 }}>

        {/* ── LINKS: Animation oben, Stats Bar vertikal mittig ── */}
        <div style={{ flex: '0 0 480px', minWidth: 280, maxWidth: 520, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Animation */}
          <div>
            <svg width="100%" viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }} aria-hidden="true">
              <circle cx="130" cy="200" r="120" fill="none" stroke="rgba(83,74,183,0.08)" strokeWidth="1"/>
              <circle cx="130" cy="200" r="82" fill="none" stroke="rgba(83,74,183,0.06)" strokeWidth="0.8"/>
              <circle cx="390" cy="200" r="120" fill="none" stroke="rgba(29,158,117,0.08)" strokeWidth="1"/>
              <circle cx="390" cy="200" r="82" fill="none" stroke="rgba(29,158,117,0.06)" strokeWidth="0.8"/>
              <circle cx="130" cy="200" r="100" fill="none" stroke="#534AB7" strokeWidth="0.8" strokeDasharray="12 20" opacity="0.4" style={{ transformOrigin:'130px 200px', animation:'hai-orbit-cw 12s linear infinite' }}/>
              <circle cx="130" cy="200" r="68" fill="none" stroke="#7F77DD" strokeWidth="0.5" strokeDasharray="6 16" opacity="0.3" style={{ transformOrigin:'130px 200px', animation:'hai-orbit-ccw 8s linear infinite' }}/>
              <circle cx="390" cy="200" r="100" fill="none" stroke="#1D9E75" strokeWidth="0.8" strokeDasharray="12 20" opacity="0.4" style={{ transformOrigin:'390px 200px', animation:'hai-orbit-ccw 10s linear infinite' }}/>
              <circle cx="390" cy="200" r="68" fill="none" stroke="#5DCAA5" strokeWidth="0.5" strokeDasharray="6 16" opacity="0.3" style={{ transformOrigin:'390px 200px', animation:'hai-orbit-cw 9s linear infinite' }}/>
              <line x1="196" y1="158" x2="260" y2="200" stroke="rgba(127,119,221,0.15)" strokeWidth="1"/>
              <line x1="196" y1="200" x2="260" y2="200" stroke="rgba(127,119,221,0.15)" strokeWidth="1"/>
              <line x1="196" y1="242" x2="260" y2="200" stroke="rgba(127,119,221,0.15)" strokeWidth="1"/>
              <line x1="324" y1="158" x2="260" y2="200" stroke="rgba(29,158,117,0.15)" strokeWidth="1"/>
              <line x1="324" y1="200" x2="260" y2="200" stroke="rgba(29,158,117,0.15)" strokeWidth="1"/>
              <line x1="324" y1="242" x2="260" y2="200" stroke="rgba(29,158,117,0.15)" strokeWidth="1"/>
              <line x1="196" y1="158" x2="260" y2="200" stroke="#7F77DD" strokeWidth="1.5" strokeDasharray="6 10" style={{ animation:'hai-flow-right .9s linear infinite' }}/>
              <line x1="196" y1="200" x2="260" y2="200" stroke="#534AB7" strokeWidth="2" strokeDasharray="8 10" style={{ animation:'hai-flow-right .7s linear infinite .2s' }}/>
              <line x1="196" y1="242" x2="260" y2="200" stroke="#AFA9EC" strokeWidth="1.5" strokeDasharray="6 10" style={{ animation:'hai-flow-right 1.1s linear infinite .4s' }}/>
              <line x1="260" y1="200" x2="324" y2="158" stroke="#5DCAA5" strokeWidth="1.5" strokeDasharray="6 10" style={{ animation:'hai-flow-right 1s linear infinite .3s' }}/>
              <line x1="260" y1="200" x2="324" y2="200" stroke="#1D9E75" strokeWidth="2" strokeDasharray="8 10" style={{ animation:'hai-flow-right .8s linear infinite' }}/>
              <line x1="260" y1="200" x2="324" y2="242" stroke="#9FE1CB" strokeWidth="1.5" strokeDasharray="6 10" style={{ animation:'hai-flow-right .95s linear infinite .5s' }}/>
              <line x1="324" y1="200" x2="196" y2="200" stroke="#EF9F27" strokeWidth="1" strokeDasharray="4 16" opacity="0.6" style={{ animation:'hai-flow-left 1.4s linear infinite' }}/>
              <circle cx="130" cy="200" fill="#534AB7" r="34" style={{ animation:'hai-pulse-human 3s ease-in-out infinite' }}/>
              <circle cx="130" cy="188" r="15" fill="#3C3489" stroke="#7F77DD" strokeWidth="1.2"/>
              <circle cx="130" cy="188" r="9" fill="#534AB7"/>
              <path d="M122 186 Q126 181 130 186 Q134 181 138 186" fill="none" stroke="#AFA9EC" strokeWidth="1" strokeLinecap="round"/>
              <path d="M123 190 Q127 188 130 190 Q133 188 137 190" fill="none" stroke="#AFA9EC" strokeWidth="0.8" strokeLinecap="round"/>
              <path d="M112 200 Q112 193 130 191 Q148 193 148 200" fill="#3C3489" stroke="#7F77DD" strokeWidth="1"/>
              <rect x="90" y="222" width="80" height="18" rx="5" fill="rgba(38,33,92,0.8)" stroke="#534AB7" strokeWidth="0.5"/>
              <text x="130" y="234" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="#CECBF6" textAnchor="middle">Mensch</text>
              <circle cx="60" cy="148" r="9" fill="rgba(38,33,92,0.6)" stroke="#534AB7" strokeWidth="0.8"/>
              <circle cx="52" cy="200" r="7" fill="rgba(38,33,92,0.5)" stroke="#AFA9EC" strokeWidth="0.8"/>
              <circle cx="60" cy="254" r="9" fill="rgba(38,33,92,0.6)" stroke="#7F77DD" strokeWidth="0.8"/>
              <circle cx="390" cy="200" fill="#1D9E75" r="30" style={{ animation:'hai-pulse-ai 2.5s ease-in-out infinite .5s' }}/>
              <circle cx="390" cy="188" r="36" fill="rgba(4,52,44,0.7)" stroke="#1D9E75" strokeWidth="1.5"/>
              <polygon points="390,158 408,168 408,188 390,198 372,188 372,168" fill="rgba(15,110,86,0.3)" stroke="#5DCAA5" strokeWidth="1"/>
              <circle cx="390" cy="180" r="9" fill="#0F6E56" stroke="#5DCAA5" strokeWidth="1"/>
              <circle cx="390" cy="180" r="4.5" fill="#5DCAA5"/>
              <rect x="350" y="212" width="80" height="18" rx="5" fill="rgba(4,52,44,0.8)" stroke="#1D9E75" strokeWidth="0.5"/>
              <text x="390" y="224" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="#9FE1CB" textAnchor="middle">KI-System</text>
              <circle cx="460" cy="148" r="9" fill="rgba(4,52,44,0.6)" stroke="#1D9E75" strokeWidth="0.8"/>
              <circle cx="468" cy="200" r="7" fill="rgba(4,52,44,0.5)" stroke="#9FE1CB" strokeWidth="0.8"/>
              <circle cx="460" cy="254" r="9" fill="rgba(4,52,44,0.6)" stroke="#5DCAA5" strokeWidth="0.8"/>
              <circle cx="260" cy="200" r="38" fill="rgba(186,117,23,0.06)" style={{ animation:'hai-pulse-ai 2s ease-in-out infinite .3s' }}/>
              <circle cx="260" cy="200" r="32" fill="none" stroke="#EF9F27" strokeWidth="1" strokeDasharray="8 12" opacity="0.5" style={{ transformOrigin:'260px 200px', animation:'hai-orbit-cw 4s linear infinite' }}/>
              <circle cx="260" cy="200" r="23" fill="rgba(65,36,2,0.5)" stroke="#EF9F27" strokeWidth="1.5"/>
              <circle cx="260" cy="200" r="9" fill="#BA7517"/>
              <circle cx="260" cy="200" r="4.5" fill="#FAC775"/>
              <rect x="210" y="240" width="100" height="18" rx="5" fill="rgba(65,36,2,0.8)" stroke="#EF9F27" strokeWidth="0.5"/>
              <text x="260" y="252" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="#FAC775" textAnchor="middle">Kollaboration</text>
              <text x="130" y="48" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="500" fill="rgba(175,169,236,0.5)" textAnchor="middle" letterSpacing="1.5" style={{ animation:'hai-label-glow 3s ease-in-out infinite' }}>MENSCH</text>
              <text x="390" y="48" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="500" fill="rgba(93,202,165,0.5)" textAnchor="middle" letterSpacing="1.5" style={{ animation:'hai-label-glow 3s ease-in-out infinite .5s' }}>KI-SYSTEM</text>
              <text x="260" y="48" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="500" fill="rgba(239,159,39,0.5)" textAnchor="middle" letterSpacing="1.5" style={{ animation:'hai-label-glow 3s ease-in-out infinite 1s' }}>DATENAUSTAUSCH</text>
            </svg>
          </div>

          {/* Stats Bar (Bild 1) — tiefer gesetzt, vertikal mittig gegenüber rechtem Inhalt */}
          <div style={{
            border: '0.5px solid rgba(24,95,165,0.2)',
            borderRadius: 12,
            background: 'rgba(4,8,15,0.6)',
            display: 'flex',
          }}>
            <div style={{ flex: 1, padding: '16px 20px', borderRight: '0.5px solid rgba(24,95,165,0.2)', textAlign: 'center' }}>
              <p style={{ fontSize: 20, color: '#E6F1FB', fontWeight: 600, marginBottom: 2 }}>100%</p>
              <p style={{ fontSize: 11, color: '#378ADD' }}>Erstgespräch kostenlos</p>
            </div>
            <div style={{ flex: 1, padding: '16px 20px', borderRight: '0.5px solid rgba(29,158,117,0.2)', textAlign: 'center' }}>
              <p style={{ fontSize: 20, color: '#9FE1CB', fontWeight: 600, marginBottom: 2 }}>KI</p>
              <p style={{ fontSize: 11, color: '#5DCAA5' }}>gestützte Analyse</p>
            </div>
            <div style={{ flex: 1, padding: '16px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: 20, color: '#9FE1CB', fontWeight: 600, marginBottom: 2 }}>Individuell</p>
              <p style={{ fontSize: 11, color: '#5DCAA5' }}>Individuelle Preismodelle</p>
            </div>
          </div>
        </div>

        {/* ── RECHTS: Badge, H1, Text, Buttons, Feature Cards ── */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, background: 'rgba(4,44,83,0.9)', border: '0.5px solid #185FA5', borderRadius: 20, padding: '5px 14px', fontSize: 11, color: '#B5D4F4', letterSpacing: '0.06em' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#378ADD', display: 'inline-block' }} />
            KI-gestützte digitale Lösungen
          </div>

          <h1 style={{ fontSize: 42, fontWeight: 500, lineHeight: 1.2, color: '#E6F1FB', marginBottom: 20 }}>
            Ihr Alltag. Ihr Problem.{' '}
            <span style={{ color: '#378ADD' }}>Unsere Lösung.</span>
          </h1>

          <p style={{ fontSize: 15, color: '#85B7EB', lineHeight: 1.7, marginBottom: 0 }}>
            Ob Studierende, Unternehmerinnen und Unternehmer oder Akademikerinnen — wir analysieren Ihr Anliegen mit modernsten KI-Tools und entwickeln eine maßgeschneiderte digitale Lösung. Das erste Gespräch ist kostenlos.
          </p>

          <div style={{ display: 'flex', width: '100%', maxWidth: 460, height: 2, borderRadius: 1, overflow: 'hidden', margin: '20px 0' }}>
            <div style={{ flex: 1, background: '#185FA5' }} />
            <div style={{ flex: 1, background: '#0C7C5A' }} />
            <div style={{ flex: 1, background: '#1D9E75' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ padding: '4px', borderRadius: 50, border: '1.5px solid rgba(56,138,221,0.4)', display: 'inline-flex' }}>
              <div style={{ padding: '13px 28px', borderRadius: 50, color: '#85B7EB', fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10 }}>
                Mehr erfahren <span style={{ background: 'rgba(56,138,221,0.2)', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>→</span>
              </div>
            </div>
            <div style={{ display: 'inline-flex' }}>
              <div style={{ padding: '14px 32px', borderRadius: 50, background: '#185FA5', color: '#E6F1FB', fontSize: 16, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 12 }}>
                Jetzt kostenlos starten <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>→</span>
              </div>
            </div>
          </div>

          {/* Feature Cards (Bild 2) bleiben rechts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, maxWidth: 520, marginTop: 28 }}>
            <div style={{ background: 'rgba(4,44,83,0.4)', border: '0.5px solid rgba(24,95,165,0.35)', borderRadius: 10, borderTop: '3px solid #185FA5', padding: '20px 16px' }}>
              <p style={{ fontSize: 9, color: '#85B7EB', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>Erstgespräch</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#E6F1FB', marginBottom: 8 }}>Kostenlos</p>
              <p style={{ fontSize: 11, color: '#378ADD' }}>Immer &amp; garantiert</p>
            </div>
            <div style={{ background: 'rgba(12,124,90,0.12)', border: '0.5px solid rgba(12,124,90,0.35)', borderRadius: 10, borderTop: '3px solid #0C7C5A', padding: '20px 16px' }}>
              <p style={{ fontSize: 9, color: '#5DCAA5', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>KI-Analyse</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#9FE1CB', marginBottom: 4 }}>Präzise &amp; schnell</p>
              <p style={{ fontSize: 11, color: '#5DCAA5' }}>Modernste KI-Tools</p>
            </div>
            <div style={{ background: 'rgba(29,158,117,0.1)', border: '0.5px solid rgba(29,158,117,0.3)', borderRadius: 10, borderTop: '3px solid #1D9E75', padding: '20px 16px' }}>
              <p style={{ fontSize: 9, color: '#5DCAA5', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>Preismodelle</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#9FE1CB', marginBottom: 10 }}>Nach Auftrag individuell</p>
              <span style={{ fontSize: 10, color: '#1D9E75', padding: '4px 10px', background: 'rgba(29,158,117,0.1)', borderRadius: 6 }}>Ab Auftragsfreigabe</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
