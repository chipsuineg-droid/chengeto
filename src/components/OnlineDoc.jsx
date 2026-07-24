import React, { useState } from 'react';

const SPECIALTIES = [
  { id: 'general', icon: '🩺', name: 'General Practitioner', desc: 'Common illnesses, checkups, referrals', color: '#22C55E' },
  { id: 'mental', icon: '🧠', name: 'Mental Health Counsellor', desc: 'Stress, anxiety, depression, trauma', color: '#A855F7' },
  { id: 'sexual', icon: '🛡️', name: 'Reproductive Health Advisor', desc: 'HIV, STIs, contraception, reproductive care', color: '#06B6D4' },
  { id: 'maternal', icon: '🤰', name: 'Maternal Health Specialist', desc: 'Pregnancy, antenatal, postnatal care', color: '#EC4899' },
  { id: 'nutrition', icon: '🥗', name: 'Nutrition Counsellor', desc: 'Diet, weight, diabetes, lifestyle', color: '#F59E0B' },
];

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

export default function OnlineDoc({ lang, currentUser, setPage }) {

  const [step, setStep] = useState('select');  // select | book | confirm
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [concern, setConcern] = useState('');
  const [bookingCode, setBookingCode] = useState('');

  const handleBook = () => {
    const code = `DOC-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;
    setBookingCode(code);
    setStep('confirm');
  };

  const titleText = lang === 'sn' ? 'Chiremba Online' : lang === 'nd' ? 'Udokotela Ku-Inthanethi' : 'Online Doctor';

  return (
    <div className="animate-fade-in" style={{ padding: '32px 24px', maxWidth: '700px', margin: '0 auto', paddingBottom: '100px' }}>

      <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '4px', fontWeight: 800 }}>
        👨‍⚕️ {titleText}
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '8px', lineHeight: 1.6 }}>
        {lang === 'sn'
          ? 'Taura nechiremba achiri muZimbabwe — zvakachengeteka, zvakavanzika, uye kubva kumba kwako.'
          : lang === 'nd'
          ? 'Khuluma lodokotela oseZimbabwe — ngokuphepha, ngasese, langekhaya lakho.'
          : 'Consult a trained health professional in Zimbabwe — privately, safely, and from wherever you are.'}
      </p>
      <div style={{ display: 'inline-block', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '20px', padding: '4px 14px', fontSize: '11px', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '32px' }}>
        🔒 All consultations are confidential · No personal data retained
      </div>

      {/* ── STEP 1: SELECT SPECIALTY ─────────────────────────────────────── */}
      {step === 'select' && (
        <div className="animate-fade-in">
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '16px' }}>
            1. Choose a specialty
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {SPECIALTIES.map(spec => (
              <div
                key={spec.id}
                className="glass-card"
                onClick={() => { setSelectedSpecialty(spec); setStep('book'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ cursor: 'pointer', display: 'flex', gap: '16px', alignItems: 'center', borderLeft: `4px solid ${spec.color}`, transition: 'transform 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <span style={{ fontSize: '32px', flexShrink: 0 }}>{spec.icon}</span>
                <div>
                  <h4 style={{ fontWeight: 700, color: spec.color, fontSize: '15px', margin: 0 }}>{spec.name}</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>{spec.desc}</p>
                </div>
                <span style={{ marginLeft: 'auto', color: spec.color, fontWeight: 700, fontSize: '18px', flexShrink: 0 }}>›</span>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: '28px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '10px', padding: '14px 18px' }}>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
              ⚠️ <strong>Prototype Notice:</strong> The Online Doctor feature is a demonstration of the planned telemedicine integration. Real bookings with verified Zimbabwean health professionals will be enabled in the full platform launch. For urgent concerns, visit your nearest clinic.
            </p>
          </div>
        </div>
      )}

      {/* ── STEP 2: BOOK APPOINTMENT ─────────────────────────────────────── */}
      {step === 'book' && selectedSpecialty && (
        <div className="animate-fade-in">
          <button
            onClick={() => setStep('select')}
            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ← Change Specialty
          </button>

          {/* Selected specialty badge */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', padding: '14px 18px', background: `${selectedSpecialty.color}15`, borderRadius: '12px', border: `1px solid ${selectedSpecialty.color}40` }}>
            <span style={{ fontSize: '28px' }}>{selectedSpecialty.icon}</span>
            <div>
              <h4 style={{ fontWeight: 700, color: selectedSpecialty.color, margin: 0, fontSize: '15px' }}>{selectedSpecialty.name}</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>{selectedSpecialty.desc}</p>
            </div>
          </div>

          {/* Time slot selection */}
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '14px' }}>
            2. Select a time slot (Today)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
            {TIME_SLOTS.map(slot => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: `2px solid ${selectedTime === slot ? selectedSpecialty.color : 'var(--color-border)'}`,
                  background: selectedTime === slot ? `${selectedSpecialty.color}20` : 'transparent',
                  color: selectedTime === slot ? selectedSpecialty.color : 'var(--color-text-main)',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {slot}
              </button>
            ))}
          </div>

          {/* Concern */}
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '10px' }}>
            3. Briefly describe your concern
          </h3>
          <textarea
            value={concern}
            onChange={e => setConcern(e.target.value)}
            placeholder="Describe what you'd like to discuss (this will not be stored — for the consultation only)"
            rows={4}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--color-border)',
              background: 'var(--color-bg-surface)', color: 'var(--color-text-main)', fontSize: '13.5px',
              resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit', lineHeight: 1.6,
              marginBottom: '20px',
            }}
          />

          <button
            onClick={handleBook}
            disabled={!selectedTime || !concern.trim()}
            style={{
              width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
              background: selectedTime && concern.trim() ? selectedSpecialty.color : 'var(--color-border)',
              color: '#fff', fontWeight: 800, fontSize: '15px', cursor: selectedTime && concern.trim() ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            }}
          >
            📅 Confirm Appointment
          </button>
        </div>
      )}

      {/* ── STEP 3: CONFIRMATION ─────────────────────────────────────────── */}
      {step === 'confirm' && (
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
          <h3 style={{ fontSize: '22px', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '8px' }}>
            Appointment Booked!
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6 }}>
            Your confidential consultation with a <strong>{selectedSpecialty?.name}</strong> is confirmed for <strong>{selectedTime} today</strong>.
          </p>

          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '24px', marginBottom: '24px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Booking Reference</span>
                <p style={{ fontSize: '20px', fontWeight: 900, color: 'var(--color-primary)', margin: '4px 0 0 0', letterSpacing: '2px' }}>{bookingCode}</p>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Specialty</span>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', margin: '4px 0 0 0' }}>{selectedSpecialty?.icon} {selectedSpecialty?.name}</p>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Time</span>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)', margin: '4px 0 0 0' }}>🕐 {selectedTime} Today</p>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '24px' }}>
            A health worker will contact you via the Chengeto secure message channel at your selected time. Save your booking reference above.
          </p>

          <button
            onClick={() => { setStep('select'); setSelectedSpecialty(null); setSelectedTime(null); setConcern(''); }}
            style={{ padding: '12px 28px', borderRadius: '12px', background: 'var(--color-primary)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
          >
            Book Another Consultation
          </button>
        </div>
      )}
    </div>
  );
}
