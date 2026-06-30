import React, { useState, useEffect, useRef } from 'react';
import { bpStore, sugarStore, weightStore, getHealthData, saveHealthData } from '../utils/indexedDB';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ── Constants ──────────────────────────────────────────────────────────────
const COMORBIDITIES = [
  'Diabetes (Type 1)', 'Diabetes (Type 2)', 'Hypertension', 'Asthma',
  'Tuberculosis (TB)', 'HIV / AIDS', 'Heart Disease', 'Kidney Disease',
  'Epilepsy', 'Sickle Cell Disease', 'Arthritis', 'Depression / Anxiety',
  'Cancer', 'Stroke', 'Obesity', 'Malaria (recurrent)', 'Other',
];

const HEALTH_LITERACY = [
  { value: 'basic',        label: 'Beginner — I find health topics confusing', emoji: '🌱' },
  { value: 'intermediate', label: 'Intermediate — I understand basic health concepts', emoji: '📗' },
  { value: 'advanced',     label: 'Advanced — I can read and interpret medical information', emoji: '🎓' },
];

const AVATAR_COLORS = [
  '#059669','#7C3AED','#DC2626','#D97706','#0891B2','#DB2777','#1D4ED8','#374151'
];

// ── AI Interpretation ──────────────────────────────────────────────────────
function interpretBP(systolic, diastolic) {
  if (systolic < 120 && diastolic < 80)  return { status: 'Normal',           color: '#22C55E', advice: 'Excellent! Keep maintaining a healthy lifestyle with regular exercise and a low-salt diet.' };
  if (systolic < 130 && diastolic < 80)  return { status: 'Elevated',          color: '#F59E0B', advice: 'Slightly elevated. Reduce salt, increase potassium-rich foods (bananas, spinach), and exercise regularly.' };
  if (systolic < 140 || diastolic < 90)  return { status: 'High (Stage 1)',     color: '#EF4444', advice: 'Stage 1 hypertension. Consider consulting a doctor. Lifestyle changes are critical: reduce stress, alcohol, and salt.' };
  return                                         { status: 'High (Stage 2)',     color: '#991B1B', advice: '⚠️ Stage 2 hypertension. Please see a doctor soon. Medication may be needed alongside lifestyle changes.' };
}

function interpretSugar(level, type) {
  if (type === 'Fasting') {
    if (level < 5.6)  return { status: 'Normal Fasting', color: '#22C55E', advice: 'Healthy fasting blood glucose. Maintain your diet and exercise habits.' };
    if (level < 7.0)  return { status: 'Pre-Diabetes',   color: '#F59E0B', advice: 'Pre-diabetic range. Increase physical activity, reduce refined sugars and processed foods. Consult a doctor.' };
    return                   { status: 'Diabetic Range',  color: '#EF4444', advice: '⚠️ This is in the diabetic range. Please consult a doctor for proper diagnosis and management.' };
  } else {
    if (level < 7.8)  return { status: 'Normal',          color: '#22C55E', advice: 'Normal random blood glucose. Continue healthy eating habits.' };
    if (level < 11.1) return { status: 'Impaired',         color: '#F59E0B', advice: 'Impaired glucose tolerance. Monitor your sugar intake and consult a healthcare provider.' };
    return                   { status: 'High',             color: '#EF4444', advice: '⚠️ High random blood glucose. Please see a doctor for evaluation.' };
  }
}

function interpretBMI(bmi) {
  if (bmi < 18.5) return { status: 'Underweight', color: '#3B82F6', advice: 'Below healthy weight. Focus on nutrient-dense foods and consult a nutritionist.' };
  if (bmi < 25.0) return { status: 'Healthy',     color: '#22C55E', advice: 'Healthy BMI range. Maintain your current lifestyle.' };
  if (bmi < 30.0) return { status: 'Overweight',  color: '#F59E0B', advice: 'Slightly overweight. Gradual changes — more vegetables, less refined carbs, and regular walking can help.' };
  return                 { status: 'Obese',        color: '#EF4444', advice: '⚠️ BMI indicates obesity. This increases risk for diabetes, hypertension, and heart disease. Please see a doctor.' };
}

// ── Medication Reminder via Notifications ──────────────────────────────────
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function scheduleReminder(med, timeStr) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const [h, m] = timeStr.split(':').map(Number);
  const now = new Date();
  const next = new Date();
  next.setHours(h, m, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  const delay = next - now;
  setTimeout(() => {
    new Notification(`💊 Medication Reminder — ${med.name}`, {
      body: `Time to take ${med.dose} of ${med.name}. Stay consistent!`,
      icon: '/icon.svg',
    });
  }, delay);
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function UserProfile({ currentUser, setCurrentUser, updateUserProfile, setPage }) {
  // ── Profile edit state
  const [nick, setNick] = useState(currentUser?.nickname || '');
  const [age, setAge] = useState(currentUser?.age || '');
  const [gender, setGender] = useState(currentUser?.gender || 'prefer-not-say');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [healthLiteracy, setHealthLiteracy] = useState(currentUser?.healthLiteracy || 'basic');
  const [comorbidities, setComorbidities] = useState(() => {
    const raw = currentUser?.comorbidities || [];
    // Normalize to array of objects { name, status }
    return raw.map(c => typeof c === 'string' ? { name: c, status: 'Long term' } : c);
  });
  const [profColor, setProfColor] = useState(currentUser?.avatarColor || '#059669');
  const [pwCurrent, setPwCurrent] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwErr, setPwErr] = useState('');
  const [saved, setSaved] = useState(false);

  // ── Medications state
  const [medications, setMedications] = useState(currentUser?.medications || []);
  const [medName, setMedName] = useState('');
  const [medDose, setMedDose] = useState('');
  const [medTimes, setMedTimes] = useState(['08:00']);
  const [medCondition, setMedCondition] = useState('');

  // ── Health data state
  const [bpData, setBpData] = useState([]);
  const [sugarData, setSugarData] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [activeTab, setActiveTab] = useState('profile'); // profile | health | meds

  // Inline Logging state
  const [logSys, setLogSys] = useState('');
  const [logDia, setLogDia] = useState('');
  const [logSugar, setLogSugar] = useState('');
  const [logSugarType, setLogSugarType] = useState('Fasting');
  const [logWt, setLogWt] = useState('');
  const [logHt, setLogHt] = useState('');

  useEffect(() => {
    loadHealthData();
    requestNotificationPermission();
  }, []);

  const loadHealthData = async () => {
    setBpData(await getHealthData(bpStore));
    setSugarData(await getHealthData(sugarStore));
    setWeightData(await getHealthData(weightStore));
  };

  const handleLogBP = async (e) => {
    e.preventDefault();
    if (!logSys || !logDia) return;
    await saveHealthData(bpStore, { systolic: Number(logSys), diastolic: Number(logDia) });
    setLogSys(''); setLogDia('');
    loadHealthData();
  };

  const handleLogSugar = async (e) => {
    e.preventDefault();
    if (!logSugar) return;
    await saveHealthData(sugarStore, { level: Number(logSugar), type: logSugarType });
    setLogSugar('');
    loadHealthData();
  };

  const handleLogWeight = async (e) => {
    e.preventDefault();
    if (!logWt || !logHt) return;
    const bmi = (Number(logWt) / Math.pow(Number(logHt) / 100, 2)).toFixed(1);
    await saveHealthData(weightStore, { weight: Number(logWt), height: Number(logHt), bmi: Number(bmi) });
    setLogWt(''); setLogHt('');
    loadHealthData();
  };

  const toggleComorbidity = (c) => {
    setComorbidities(prev =>
      prev.some(x => x.name === c) 
        ? prev.filter(x => x.name !== c) 
        : [...prev, { name: c, status: 'Newly Diagnosed' }]
    );
  };

  const updateComorbidityStatus = (c, status) => {
    setComorbidities(prev => prev.map(x => x.name === c ? { ...x, status } : x));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setPwErr(''); setSaved(false);
    const updates = {
      nickname: nick.trim() || currentUser.nickname,
      age: age ? Number(age) : undefined,
      gender,
      phone: phone.trim(),
      healthLiteracy,
      comorbidities,
      avatarColor: profColor,
      medications,
    };
    if (pwNew) {
      if (!pwCurrent) { setPwErr('Enter current password to change it.'); return; }
      if (pwCurrent !== currentUser.password) { setPwErr('Current password incorrect.'); return; }
      if (pwNew.length < 6) { setPwErr('New password must be at least 6 characters.'); return; }
      updates.password = pwNew;
    }
    const updated = updateUserProfile(currentUser.key, updates);
    setCurrentUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addMedication = () => {
    if (!medName.trim()) return;
    const newMed = {
      id: Date.now(),
      name: medName.trim(),
      dose: medDose.trim() || '1 tablet',
      times: medTimes.filter(t => t),
      condition: medCondition.trim(),
      takenToday: [],
    };
    const updated = [...medications, newMed];
    setMedications(updated);
    // Schedule reminders
    newMed.times.forEach(t => scheduleReminder(newMed, t));
    setMedName(''); setMedDose(''); setMedTimes(['08:00']); setMedCondition('');
    // Auto-save meds
    const u = updateUserProfile(currentUser.key, { medications: updated });
    setCurrentUser(u);
  };

  const removeMedication = (id) => {
    const updated = medications.filter(m => m.id !== id);
    setMedications(updated);
    const u = updateUserProfile(currentUser.key, { medications: updated });
    setCurrentUser(u);
  };

  const markTaken = (medId, time) => {
    const updated = medications.map(m => {
      if (m.id !== medId) return m;
      const takenToday = m.takenToday || [];
      const key = `${new Date().toDateString()}_${time}`;
      if (takenToday.includes(key)) return m;
      return { ...m, takenToday: [...takenToday, key] };
    });
    setMedications(updated);
    const u = updateUserProfile(currentUser.key, { medications: updated });
    setCurrentUser(u);
  };

  const isMarkedTaken = (med, time) => {
    const key = `${new Date().toDateString()}_${time}`;
    return (med.takenToday || []).includes(key);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' };

  return (
    <div className="animate-fade-in" style={{ padding: '28px 20px', maxWidth: '700px', margin: '0 auto', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: profColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '34px', margin: '0 auto 12px', boxShadow: `0 8px 24px ${profColor}50` }}>
          {(nick || currentUser?.nickname || '?').charAt(0).toUpperCase()}
        </div>
        <h2 style={{ fontSize: '24px', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '2px' }}>
          {currentUser?.nickname}
        </h2>
        {currentUser?.comorbidities?.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
            {comorbidities.map(c => (
              <span key={c.name} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(239,68,68,0.12)', color: '#EF4444', fontWeight: 600 }}>{c.name} ({c.status})</span>
            ))}
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '0' }}>
        {['profile', 'health', 'meds'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ padding: '10px 18px', border: 'none', background: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', color: activeTab === t ? 'var(--color-primary)' : 'var(--color-text-muted)', borderBottom: activeTab === t ? '2px solid var(--color-primary)' : '2px solid transparent', transition: 'all 0.2s' }}>
            {t === 'profile' ? '👤 Profile' : t === 'health' ? '📊 Health Data' : '💊 Medications'}
          </button>
        ))}
      </div>

      {/* ── PROFILE TAB ─────────────────────────────────────────────────── */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Avatar color */}
          <div className="glass-card">
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '14px' }}>Avatar Colour</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {AVATAR_COLORS.map(c => (
                <button key={c} type="button" onClick={() => setProfColor(c)}
                  style={{ width: '34px', height: '34px', borderRadius: '50%', background: c, border: profColor === c ? '3px solid #fff' : '3px solid transparent', cursor: 'pointer', outline: profColor === c ? `2px solid ${c}` : 'none', transition: 'all 0.15s' }} />
              ))}
            </div>
          </div>

          {/* Basic info */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Personal Information</h3>
            <div>
              <label style={labelStyle}>Nickname *</label>
              <input value={nick} onChange={e => setNick(e.target.value)} placeholder="e.g. Taps" style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Age</label>
                <input type="number" min="10" max="120" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 24" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Gender</label>
                <select value={gender} onChange={e => setGender(e.target.value)} style={inputStyle}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-say">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Phone Number (optional)</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+263 77 123 4567" style={inputStyle} />
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Used only for appointment reminders. Never shared.</p>
            </div>
          </div>

          {/* Health literacy */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Health Literacy Level</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>This helps the AI explain health information at the right level for you.</p>
            {HEALTH_LITERACY.map(opt => (
              <label key={opt.value} style={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', padding: '12px 14px', borderRadius: '10px', border: `1px solid ${healthLiteracy === opt.value ? 'var(--color-primary)' : 'var(--color-border)'}`, background: healthLiteracy === opt.value ? 'rgba(34,197,94,0.08)' : 'transparent', transition: 'all 0.15s' }}>
                <input type="radio" name="literacy" value={opt.value} checked={healthLiteracy === opt.value} onChange={() => setHealthLiteracy(opt.value)} style={{ accentColor: 'var(--color-primary)' }} />
                <span style={{ fontSize: '18px' }}>{opt.emoji}</span>
                <span style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Comorbidities */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Conditions I Live With</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>Tick any conditions you have. This helps tailor health guidance to you.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '8px' }}>
              {COMORBIDITIES.map(c => {
                const isActive = comorbidities.some(x => x.name === c);
                const obj = comorbidities.find(x => x.name === c);
                return (
                  <div key={c} style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '9px 12px', borderRadius: '8px', border: `1px solid ${isActive ? '#EF4444' : 'var(--color-border)'}`, background: isActive ? 'rgba(239,68,68,0.08)' : 'transparent', transition: 'all 0.15s' }}>
                    <label style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontSize: '12.5px', color: 'var(--color-text-main)' }}>
                      <input type="checkbox" checked={isActive} onChange={() => toggleComorbidity(c)} style={{ accentColor: '#EF4444', flexShrink: 0 }} />
                      {c}
                    </label>
                    {isActive && (
                      <select value={obj?.status || 'Newly Diagnosed'} onChange={e => updateComorbidityStatus(c, e.target.value)} style={{ padding: '4px', fontSize: '11px', borderRadius: '6px', border: '1px solid #EF444450', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', marginTop: '2px', outline: 'none' }}>
                        <option value="Newly Diagnosed">Newly Diagnosed</option>
                        <option value="1-5 Years">1-5 Years</option>
                        <option value="Long term">Long term (&gt;5 Years)</option>
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Change password */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Change Password</h3>
            <input type="password" value={pwCurrent} onChange={e => setPwCurrent(e.target.value)} placeholder="Current password" style={inputStyle} />
            <input type="password" value={pwNew} onChange={e => setPwNew(e.target.value)} placeholder="New password (min 6 chars)" style={inputStyle} />
          </div>

          {pwErr && <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', fontSize: '13px', color: '#DC2626' }}>⚠️ {pwErr}</div>}
          {saved  && <div className="animate-fade-in" style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', fontSize: '13px', color: '#15803d', fontWeight: 700, textAlign: 'center' }}>✅ Profile saved successfully!</div>}

          <button type="submit" style={{ padding: '14px', borderRadius: '12px', border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 800, fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(34,197,94,0.3)' }}>
            💾 Save Profile
          </button>
        </form>
      )}

      {/* ── HEALTH DATA TAB ─────────────────────────────────────────────── */}
      {activeTab === 'health' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Blood Pressure */}
          <div className="glass-card">
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#EF4444', marginBottom: '14px' }}>🫀 Blood Pressure</h3>
            {bpData.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>No blood pressure readings yet. Use the Health Tracker to log.</p>
            ) : (
              <>
                {/* Latest reading with AI interpretation */}
                {(() => {
                  const latest = bpData[0];
                  const interp = interpretBP(latest.systolic, latest.diastolic);
                  return (
                    <div style={{ marginBottom: '16px', padding: '14px', borderRadius: '10px', background: `${interp.color}15`, border: `1px solid ${interp.color}40` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '24px', fontWeight: 900, color: interp.color }}>{latest.systolic}/{latest.diastolic}</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: interp.color, color: '#fff' }}>{interp.status}</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>🤖 <strong>AI Insight:</strong> {interp.advice}</p>
                    </div>
                  );
                })()}
                <div style={{ height: '160px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[...bpData].reverse()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" tickFormatter={formatDate} fontSize={10} />
                      <YAxis domain={['auto', 'auto']} fontSize={10} />
                      <Tooltip labelFormatter={v => new Date(v).toLocaleDateString()} />
                      <Line type="monotone" dataKey="systolic" stroke="#E11D48" strokeWidth={2} name="Systolic" dot={false} />
                      <Line type="monotone" dataKey="diastolic" stroke="#2563EB" strokeWidth={2} name="Diastolic" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>

          {/* Blood Sugar */}
          <div className="glass-card">
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#3B82F6', marginBottom: '14px' }}>🩸 Blood Sugar</h3>
            {sugarData.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>No blood sugar readings yet.</p>
            ) : (
              <>
                {(() => {
                  const latest = sugarData[0];
                  const interp = interpretSugar(latest.level, latest.type);
                  return (
                    <div style={{ marginBottom: '16px', padding: '14px', borderRadius: '10px', background: `${interp.color}15`, border: `1px solid ${interp.color}40` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '24px', fontWeight: 900, color: interp.color }}>{latest.level} mmol/L</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: interp.color, color: '#fff' }}>{interp.status}</span>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{latest.type}</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>🤖 <strong>AI Insight:</strong> {interp.advice}</p>
                    </div>
                  );
                })()}
                <div style={{ height: '140px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[...sugarData].reverse()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" tickFormatter={formatDate} fontSize={10} />
                      <YAxis domain={['auto', 'auto']} fontSize={10} />
                      <Tooltip labelFormatter={v => new Date(v).toLocaleDateString()} />
                      <Line type="monotone" dataKey="level" stroke="#059669" strokeWidth={2} name="Sugar" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>

          {/* Weight / BMI */}
          <div className="glass-card">
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#D97706', marginBottom: '14px' }}>⚖️ Weight & BMI</h3>
            {weightData.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>No weight readings yet.</p>
            ) : (
              <>
                {(() => {
                  const latest = weightData[0];
                  const interp = interpretBMI(latest.bmi);
                  return (
                    <div style={{ marginBottom: '16px', padding: '14px', borderRadius: '10px', background: `${interp.color}15`, border: `1px solid ${interp.color}40` }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '20px', fontWeight: 900, color: interp.color }}>BMI {latest.bmi}</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: interp.color, color: '#fff' }}>{interp.status}</span>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{latest.weight}kg · {latest.height}cm</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>🤖 <strong>AI Insight:</strong> {interp.advice}</p>
                    </div>
                  );
                })()}
              </>
            )}
            
            {/* Quick Log Forms */}
            <div style={{ marginTop: '24px', borderTop: '1px dashed var(--color-border)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 700, marginBottom: '12px' }}>✏️ Quick Log Record</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <form onSubmit={handleLogBP} style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Systolic (SYS)</label>
                    <input type="number" value={logSys} onChange={e => setLogSys(e.target.value)} placeholder="120" required style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '13px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Diastolic (DIA)</label>
                    <input type="number" value={logDia} onChange={e => setLogDia(e.target.value)} placeholder="80" required style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '13px' }} />
                  </div>
                  <button type="submit" style={{ padding: '9px 12px', borderRadius: '8px', background: '#EF4444', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}>Log BP</button>
                </form>

                <form onSubmit={handleLogSugar} style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Blood Sugar (mmol/L)</label>
                    <input type="number" step="0.1" value={logSugar} onChange={e => setLogSugar(e.target.value)} placeholder="5.6" required style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '13px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Type</label>
                    <select value={logSugarType} onChange={e => setLogSugarType(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '13px' }}>
                      <option>Fasting</option>
                      <option>Random</option>
                    </select>
                  </div>
                  <button type="submit" style={{ padding: '9px 12px', borderRadius: '8px', background: '#3B82F6', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}>Log Sugar</button>
                </form>

                <form onSubmit={handleLogWeight} style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Weight (kg)</label>
                    <input type="number" step="0.1" value={logWt} onChange={e => setLogWt(e.target.value)} placeholder="70" required style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '13px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Height (cm)</label>
                    <input type="number" value={logHt} onChange={e => setLogHt(e.target.value)} placeholder="170" required style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '13px' }} />
                  </div>
                  <button type="submit" style={{ padding: '9px 12px', borderRadius: '8px', background: '#D97706', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}>Log BMI</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MEDICATIONS TAB ─────────────────────────────────────────────── */}
      {activeTab === 'meds' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '10px', padding: '12px 16px', fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            💊 Add your medications below. Tick them when taken each day. You'll receive a browser reminder at your chosen times — no internet needed once the app is loaded.
          </div>

          {/* Add medication form */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>Add a Medication</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input value={medName} onChange={e => setMedName(e.target.value)} placeholder="Medication name (e.g. Metformin)" style={inputStyle} />
              <input value={medDose} onChange={e => setMedDose(e.target.value)} placeholder="Dose (e.g. 500mg, 1 tablet)" style={inputStyle} />
            </div>
            <input value={medCondition} onChange={e => setMedCondition(e.target.value)} placeholder="For which condition? (e.g. Diabetes)" style={inputStyle} />
            <div>
              <label style={labelStyle}>Reminder Times</label>
              {medTimes.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input type="time" value={t} onChange={e => setMedTimes(prev => prev.map((v, j) => j === i ? e.target.value : v))} style={{ ...inputStyle, width: 'auto', flex: 1 }} />
                  {medTimes.length > 1 && (
                    <button type="button" onClick={() => setMedTimes(prev => prev.filter((_, j) => j !== i))} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setMedTimes(prev => [...prev, '12:00'])} style={{ fontSize: '12px', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: 0 }}>
                + Add another time
              </button>
            </div>
            <button type="button" onClick={addMedication} style={{ padding: '12px', borderRadius: '10px', border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>
              💊 Add Medication & Set Reminder
            </button>
          </div>

          {/* Medication list */}
          {medications.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', textAlign: 'center' }}>No medications added yet.</p>
          ) : (
            medications.map(med => (
              <div key={med.id} className="glass-card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h4 style={{ fontWeight: 800, color: 'var(--color-text-main)', fontSize: '15px', margin: 0 }}>💊 {med.name}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>{med.dose}{med.condition ? ` · for ${med.condition}` : ''}</p>
                  </div>
                  <button onClick={() => removeMedication(med.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '16px', fontWeight: 700 }}>🗑</button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {med.times.map(time => {
                    const taken = isMarkedTaken(med, time);
                    return (
                      <button key={time} onClick={() => markTaken(med.id, time)} style={{ padding: '8px 14px', borderRadius: '8px', border: `1px solid ${taken ? '#22C55E' : 'var(--color-border)'}`, background: taken ? 'rgba(34,197,94,0.12)' : 'transparent', color: taken ? '#22C55E' : 'var(--color-text-main)', fontWeight: 700, fontSize: '13px', cursor: taken ? 'default' : 'pointer', display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {taken ? '✅' : '⏰'} {time}
                        {taken && <span style={{ fontSize: '11px' }}>Taken</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
