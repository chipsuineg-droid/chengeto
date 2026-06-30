import React, { useState } from 'react';
import { HEALTH_TUTOR_CATEGORIES, HEALTH_TUTOR_DATA } from '../data/healthTutorData';

// ── Mirrors the HIV/Pregnancy tab layout ─────────────────────────────────────
export default function HealthTutor({ lang, setPage }) {
  const [activeDisease, setActiveDisease] = useState(null);  // null = overview grid
  const [innerTab, setInnerTab] = useState('overview');      // overview | symptoms | prevention | myths

  const disease = activeDisease ? HEALTH_TUTOR_DATA[activeDisease] : null;

  // Tab labels per language
  const tabs = {
    overview:   { en: 'Overview',   sn: 'Tsanangudzo',  nd: 'Inhloko' },
    symptoms:   { en: 'Symptoms',   sn: 'Zviratidzo',   nd: 'Izimpawu' },
    prevention: { en: 'Prevention', sn: 'Kudzivirira',   nd: 'Ukuvikela' },
    myths:      { en: 'Myths & Facts', sn: 'Mashoko & Chokwadi', nd: 'Amanga & Iqiniso' },
  };

  const t = (obj) => (obj && (obj[lang] || obj.en)) || '';

  // ── DISEASE DETAIL VIEW ────────────────────────────────────────────────────
  if (disease) {
    return (
      <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '900px', margin: '0 auto', paddingBottom: '100px' }}>

        {/* Back button */}
        <button
          onClick={() => { setActiveDisease(null); setInnerTab('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ background: 'none', border: 'none', color: disease.accentColor, fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}
        >
          ← Health Tutor
        </button>

        {/* Disease header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>{disease.icon}</div>
          <h2 style={{ fontSize: '26px', color: disease.accentColor, marginBottom: '4px', fontWeight: 800 }}>{disease.title}</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{disease.subtitle}</p>
        </div>

        {/* Emergency banner if exists */}
        {disease.emergency && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', borderLeft: `4px solid ${disease.accentColor}`, borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '24px', marginTop: '2px' }}>{disease.emergency.icon}</span>
            <div>
              <h4 style={{ color: '#EF4444', fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>{disease.emergency.title}</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{disease.emergency.body}</p>
            </div>
          </div>
        )}

        {/* Inner tab navigation — same style as HIV tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', WebkitOverflowScrolling: 'touch', marginBottom: '28px' }} className="hide-scrollbar">
          {Object.keys(tabs).map(tabKey => (
            <button
              key={tabKey}
              onClick={() => setInnerTab(tabKey)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: innerTab === tabKey ? disease.accentColor : 'var(--color-border)',
                background: innerTab === tabKey ? disease.accentColor : 'transparent',
                color: innerTab === tabKey ? '#fff' : 'var(--color-text-main)',
                fontSize: '13px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t(tabs[tabKey])}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ──────────────────────────────────────────────────── */}
        {innerTab === 'overview' && (
          <div className="animate-fade-in">
            <div className="glass-card" style={{ borderLeft: `4px solid ${disease.accentColor}`, marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', color: disease.accentColor, marginBottom: '12px', fontWeight: 700 }}>{disease.what.heading}</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.75, color: 'var(--color-text-main)', whiteSpace: 'pre-line' }}>{disease.what.body}</p>
            </div>

            {disease.what.types && disease.what.types.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '15px', color: 'var(--color-text-main)', fontWeight: 700 }}>Types / Classification</h4>
                {disease.what.types.map((type, i) => (
                  <div key={i} className="glass-card" style={{ borderLeft: `3px solid ${disease.accentColor}` }}>
                    <h5 style={{ fontWeight: 700, color: disease.accentColor, fontSize: '14px', marginBottom: '6px' }}>{type.name}</h5>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{type.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Local Info box */}
            {disease.localInfo && (
              <div style={{ marginTop: '24px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '12px', padding: '16px 20px' }}>
                <h4 style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '14px', marginBottom: '6px' }}>📍 Zimbabwe — Where to Get Help</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{disease.localInfo}</p>
              </div>
            )}
          </div>
        )}

        {/* ── SYMPTOMS TAB ──────────────────────────────────────────────────── */}
        {innerTab === 'symptoms' && (
          <div className="animate-fade-in">
            {disease.symptoms.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>No specific symptom list for this module.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {disease.symptoms.map((s, i) => (
                  <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '14px 18px' }}>
                    <span style={{ fontSize: '22px', flexShrink: 0 }}>{s.icon}</span>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-main)', lineHeight: 1.6, margin: 0 }}>{s.text}</p>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: '20px', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '14px 18px' }}>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                ⚠️ <strong>Disclaimer:</strong> These symptoms are for educational purposes only. If you experience these signs, please consult a healthcare professional. Do not self-diagnose.
              </p>
            </div>
          </div>
        )}

        {/* ── PREVENTION TAB ────────────────────────────────────────────────── */}
        {innerTab === 'prevention' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {disease.prevention.map((p, i) => (
              <div key={i} className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', borderLeft: `3px solid ${disease.accentColor}` }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '15px', marginBottom: '6px' }}>{p.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MYTHS & FACTS TAB ─────────────────────────────────────────────── */}
        {innerTab === 'myths' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {disease.myths.map((m, i) => (
              <div key={i} className="glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>❌</span>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#EF4444', letterSpacing: '0.5px' }}>MYTH</span>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-main)', fontStyle: 'italic', margin: '4px 0 0 0', lineHeight: 1.6 }}>"{m.myth}"</p>
                  </div>
                </div>
                <div style={{ height: '1px', background: 'var(--color-border)', marginBottom: '14px' }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>✅</span>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.5px' }}>FACT</span>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-main)', margin: '4px 0 0 0', lineHeight: 1.6 }}>{m.fact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── DISEASE OVERVIEW GRID (landing) ───────────────────────────────────────
  return (
    <div className="animate-fade-in" style={{ padding: '32px 24px', maxWidth: '1000px', margin: '0 auto', paddingBottom: '100px' }}>
      <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '4px', fontWeight: 800 }}>
        📚 Health Tutor
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '32px', lineHeight: 1.6 }}>
        Comprehensive, evidence-based health education. Select any topic below to explore an in-depth guide, symptoms, prevention steps, and myth-busting facts.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {HEALTH_TUTOR_CATEGORIES.map(cat => {
          const d = HEALTH_TUTOR_DATA[cat.id];
          if (!d) return null;
          return (
            <div
              key={cat.id}
              className="glass-card"
              onClick={() => { setActiveDisease(cat.id); setInnerTab('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ cursor: 'pointer', borderLeft: `4px solid ${cat.color}`, display: 'flex', flexDirection: 'column', gap: '10px', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '36px' }}>{d.icon}</div>
              <h3 style={{ fontSize: '17px', color: cat.color, fontWeight: 700, margin: 0 }}>{d.title}</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.55, margin: 0 }}>{d.subtitle}</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                {['Overview','Symptoms','Prevention','Myths'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '20px', border: `1px solid ${cat.color}40`, color: cat.color, fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
              <span style={{ fontWeight: 700, fontSize: '12px', color: cat.color, marginTop: 'auto' }}>Open Guide →</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
