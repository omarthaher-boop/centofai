import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import Navbar from '../components/Navbar';

export default function Kontakt() {
  const [, navigate] = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [nachricht, setNachricht] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name ist erforderlich.';
    if (!email.trim() || !email.includes('@'))
      e.email = 'Gültige E-Mail ist erforderlich.';
    if (!nachricht.trim()) e.nachricht = 'Nachricht ist erforderlich.';
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    const subject = encodeURIComponent(`Kontaktanfrage von ${name}`);
    const body = encodeURIComponent(
      `KONTAKTANFRAGE — CENTOF.AI\n` +
      `${'═'.repeat(40)}\n\n` +
      `NAME\n${name}\n\n` +
      `E-MAIL\n${email}\n\n` +
      `TELEFON\n${telefon || '— nicht angegeben —'}\n\n` +
      `NACHRICHT\n${nachricht}\n\n` +
      `${'═'.repeat(40)}\n` +
      `Gesendet über centof.ai/kontakt`
    );
    window.location.href =
      `mailto:info@centof.ai?subject=${subject}&body=${body}`;
    setTimeout(() => setSubmitted(true), 300);
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '14px 18px',
    borderRadius: '10px',
    background: 'rgba(13,13,43,0.8)',
    border: '0.5px solid rgba(127,119,221,0.3)',
    color: '#EEEDFE', fontSize: '15px', outline: 'none',
    fontFamily: 'inherit',
  };
  const errStyle: React.CSSProperties = {
    color: '#f87171', fontSize: '12px', marginTop: '4px',
  };

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: '#07071a' }}>
      <Navbar />
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', background: '#07071a',
               display: 'flex', flexDirection: 'column',
               alignItems: 'center', justifyContent: 'center',
               padding: '80px 24px', textAlign: 'center' }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        style={{ width: '80px', height: '80px', borderRadius: '50%',
                 background: 'rgba(83,74,183,0.2)',
                 border: '0.5px solid #534AB7',
                 display: 'flex', alignItems: 'center',
                 justifyContent: 'center', marginBottom: '32px' }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <motion.path
            d="M8 18 L15 25 L28 11"
            stroke="#7F77DD" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </svg>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ fontSize: '28px', fontWeight: '500',
                 color: '#EEEDFE', marginBottom: '14px' }}
      >
        Nachricht gesendet!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        style={{ fontSize: '15px', color: '#AFA9EC',
                 lineHeight: '1.7', maxWidth: '420px',
                 marginBottom: '40px' }}
      >
        Vielen Dank. Wir melden uns innerhalb von{' '}
        <span style={{ color: '#CECBF6', fontWeight: '500' }}>
          24 Stunden
        </span>{' '}
        bei Ihnen unter{' '}
        <span style={{ color: '#7F77DD' }}>{email}</span>.
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '48px' }}
        transition={{ delay: 0.9 }}
        style={{ height: '2px', background: '#534AB7',
                 borderRadius: '2px', marginBottom: '32px' }}
      />
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        onClick={() => navigate('/')}
        style={{ padding: '12px 28px', borderRadius: '8px',
                 border: '0.5px solid rgba(127,119,221,0.4)',
                 background: 'transparent', color: '#AFA9EC',
                 fontSize: '14px', cursor: 'pointer' }}
      >
        ← Zurück zur Startseite
      </motion.button>
    </motion.div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#07071a' }}>
      <Navbar />
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: '100vh', background: '#07071a',
               display: 'flex', flexDirection: 'column',
               alignItems: 'center', justifyContent: 'center',
               padding: '80px 24px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px',
                    maxWidth: '560px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(38,33,92,0.7)',
          border: '0.5px solid #534AB7', borderRadius: '20px',
          padding: '5px 14px', fontSize: '11px', color: '#CECBF6',
          letterSpacing: '0.06em', marginBottom: '20px',
        }}>
          <span style={{ width: '6px', height: '6px',
                         borderRadius: '50%', background: '#7F77DD',
                         display: 'inline-block' }} />
          Kostenloses Erstgespräch
        </span>
        <h1 style={{ fontSize: '36px', fontWeight: '500',
                     color: '#EEEDFE', lineHeight: '1.2',
                     marginBottom: '14px' }}>
          Nehmen Sie{' '}
          <span style={{ color: '#7F77DD' }}>Kontakt</span> auf
        </h1>
        <p style={{ fontSize: '15px', color: '#AFA9EC', lineHeight: '1.7' }}>
          Schildern Sie uns Ihr Anliegen. Wir antworten innerhalb
          von 24 Stunden und das erste Gespräch ist kostenlos.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        width: '100%', maxWidth: '580px',
        background: 'rgba(10,10,30,0.6)',
        border: '0.5px solid rgba(127,119,221,0.2)',
        borderRadius: '16px', padding: '40px',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        <div>
          <input type="text" placeholder="Ihr Name *"
            value={name} onChange={e => setName(e.target.value)}
            style={inp} />
          {errors.name && <p style={errStyle}>{errors.name}</p>}
        </div>
        <div>
          <input type="email" placeholder="Ihre E-Mail *"
            value={email} onChange={e => setEmail(e.target.value)}
            style={inp} />
          {errors.email && <p style={errStyle}>{errors.email}</p>}
        </div>
        <div>
          <input type="tel" placeholder="Telefonnummer (optional)"
            value={telefon} onChange={e => setTelefon(e.target.value)}
            style={inp} />
        </div>
        <div>
          <textarea placeholder="Ihre Nachricht *"
            value={nachricht}
            onChange={e => setNachricht(e.target.value)}
            rows={6}
            style={{ ...inp, resize: 'vertical' }} />
          {errors.nachricht && <p style={errStyle}>{errors.nachricht}</p>}
        </div>
        <button type="submit" style={{
          width: '100%', padding: '14px',
          background: '#534AB7', border: 'none',
          borderRadius: '10px', color: '#EEEDFE',
          fontSize: '15px', fontWeight: '500', cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
          Nachricht senden →
        </button>
        <p style={{ textAlign: 'center', fontSize: '12px',
                    color: '#7F77DD', marginTop: '-8px' }}>
          Ihre Daten werden ausschließlich zur Bearbeitung
          Ihrer Anfrage verwendet.
        </p>
      </form>
    </motion.div>
    </div>
  );
}
