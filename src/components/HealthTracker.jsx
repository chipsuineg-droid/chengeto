import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { bpStore, sugarStore, weightStore, symptomStore, artStore, saveHealthData, getHealthData, deleteHealthData, updateHealthData } from '../utils/indexedDB';

// --- INTERPRETATION HELPERS ---
const interpretBP = (systolic, diastolic) => {
  if (systolic < 120 && diastolic < 80) return { label: "Normal", color: "#10B981", bg: "rgba(16, 185, 129, 0.15)", warning: false };
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) return { label: "Elevated", color: "#EAB308", bg: "rgba(234, 179, 8, 0.15)", warning: false };
  if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) return { label: "High BP (Stage 1)", color: "#F97316", bg: "rgba(249, 115, 22, 0.15)", warning: true };
  if (systolic >= 140 || diastolic >= 90) return { label: "High BP (Stage 2)", color: "#EF4444", bg: "rgba(239, 68, 68, 0.15)", warning: true };
  return { label: "Unknown", color: "#6B7280", bg: "rgba(107, 114, 128, 0.15)", warning: false };
};

const interpretSugar = (level, type) => {
  if (type === 'Fasting') {
    if (level < 5.6) return { label: "Normal", color: "#10B981", bg: "rgba(16, 185, 129, 0.15)", warning: false };
    if (level >= 5.6 && level <= 6.9) return { label: "Prediabetes", color: "#F97316", bg: "rgba(249, 115, 22, 0.15)", warning: true };
    return { label: "Diabetes", color: "#EF4444", bg: "rgba(239, 68, 68, 0.15)", warning: true };
  } else {
    // Random / Post-meal
    if (level < 7.8) return { label: "Normal", color: "#10B981", bg: "rgba(16, 185, 129, 0.15)", warning: false };
    if (level >= 7.8 && level <= 11.0) return { label: "Prediabetes", color: "#F97316", bg: "rgba(249, 115, 22, 0.15)", warning: true };
    return { label: "Diabetes", color: "#EF4444", bg: "rgba(239, 68, 68, 0.15)", warning: true };
  }
};

const interpretBMI = (bmi) => {
  if (bmi < 18.5) return { label: "Underweight", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.15)", warning: true };
  if (bmi >= 18.5 && bmi < 25) return { label: "Normal", color: "#10B981", bg: "rgba(16, 185, 129, 0.15)", warning: false };
  if (bmi >= 25 && bmi < 30) return { label: "Overweight", color: "#F97316", bg: "rgba(249, 115, 22, 0.15)", warning: true };
  return { label: "Obese", color: "#EF4444", bg: "rgba(239, 68, 68, 0.15)", warning: true };
};

export default function HealthTracker({ setPage }) {
  const [activeTab, setActiveTab] = useState('bp');
  
  // Data states
  const [bpData, setBpData] = useState([]);
  const [sugarData, setSugarData] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [artData, setArtData] = useState([]);
  const [symptomData, setSymptomData] = useState([]);
  
  // Form states
  const [bpForm, setBpForm] = useState({ systolic: '', diastolic: '' });
  const [sugarForm, setSugarForm] = useState({ level: '', type: 'Random' });
  const [weightForm, setWeightForm] = useState({ weight: '', height: '' }); 
  const [artForm, setArtForm] = useState({ taken: 'Yes', time: '' });
  const [symptomForm, setSymptomForm] = useState({ urine: 'Normal', stool: 'Normal', vision: 'Normal', feeling: 'Good' });

  // Modal states
  const [showHistory, setShowHistory] = useState(false);
  const [abnormalFlag, setAbnormalFlag] = useState({ show: false, recordId: null, store: null, question: '', note: '' });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setBpData(await getHealthData(bpStore));
    setSugarData(await getHealthData(sugarStore));
    setWeightData(await getHealthData(weightStore));
    setArtData(await getHealthData(artStore));
    setSymptomData(await getHealthData(symptomStore));
  };

  const checkAbnormalAndSave = async (store, data, status) => {
    const record = await saveHealthData(store, data);
    loadData();
    // Only flag critical warnings (Stage 2 High BP, Diabetes) to avoid annoying the user on slightly elevated readings
    let triggerFlag = false;
    let question = "";
    
    if (status.label === "High BP (Stage 2)") {
      triggerFlag = true;
      question = "Your Blood Pressure reading is quite high today. Have you taken your BP medication?";
    } else if (status.label === "Diabetes") {
      triggerFlag = true;
      question = "Your blood sugar is currently in the diabetes range. Have you taken your insulin or medication?";
    }

    if (triggerFlag) {
      setAbnormalFlag({ show: true, recordId: record.id, store: store, question: question, note: '' });
    }
  };

  const handleBpSubmit = async (e) => {
    e.preventDefault();
    if (!bpForm.systolic || !bpForm.diastolic) return;
    const status = interpretBP(Number(bpForm.systolic), Number(bpForm.diastolic));
    await checkAbnormalAndSave(bpStore, { systolic: Number(bpForm.systolic), diastolic: Number(bpForm.diastolic) }, status);
    setBpForm({ systolic: '', diastolic: '' });
  };

  const handleSugarSubmit = async (e) => {
    e.preventDefault();
    if (!sugarForm.level) return;
    const status = interpretSugar(Number(sugarForm.level), sugarForm.type);
    await checkAbnormalAndSave(sugarStore, { level: Number(sugarForm.level), type: sugarForm.type }, status);
    setSugarForm({ level: '', type: 'Random' });
  };

  const handleWeightSubmit = async (e) => {
    e.preventDefault();
    if (!weightForm.weight || !weightForm.height) return;
    const w = Number(weightForm.weight);
    const h = Number(weightForm.height) / 100; // cm to m
    const bmi = (w / (h * h)).toFixed(1);
    await saveHealthData(weightStore, { weight: w, height: Number(weightForm.height), bmi: Number(bmi) });
    setWeightForm({ weight: '', height: '' });
    loadData();
  };

  const handleArtSubmit = async (e) => {
    e.preventDefault();
    await saveHealthData(artStore, { taken: artForm.taken, time: artForm.time || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) });
    setArtForm({ taken: 'Yes', time: '' });
    loadData();
  };

  const handleSymptomSubmit = async (e) => {
    e.preventDefault();
    await saveHealthData(symptomStore, { ...symptomForm });
    setSymptomForm({ urine: 'Normal', stool: 'Normal', vision: 'Normal', feeling: 'Good' });
    loadData();
  };

  const handleSaveNote = async () => {
    if (abnormalFlag.recordId && abnormalFlag.store) {
      await updateHealthData(abnormalFlag.store, abnormalFlag.recordId, { note: abnormalFlag.note });
      loadData();
    }
    setAbnormalFlag({ show: false, recordId: null, store: null, question: '', note: '' });
  };

  const handleDelete = async (store, id) => {
    if(window.confirm("Are you sure you want to delete this reading?")) {
      await deleteHealthData(store, id);
      loadData();
    }
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return `${d.getDate()}/${d.getMonth()+1} ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="page-container" style={{ paddingBottom: '100px', background: 'var(--color-bg-base)', minHeight: '100vh' }}>
      
      {/* Abnormal Flag Modal */}
      {abnormalFlag.show && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div className="glass-card" style={{ background: '#1F2937', padding: '30px', maxWidth: '500px', width: '100%', border: '1px solid #EF4444' }}>
            <h2 style={{ color: '#EF4444', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span> Action Required
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>{abnormalFlag.question}</p>
            <textarea 
              value={abnormalFlag.note} 
              onChange={(e) => setAbnormalFlag({...abnormalFlag, note: e.target.value})} 
              placeholder="e.g., 'Yes, I took it an hour ago' or 'I forgot today'"
              className="chat-input"
              style={{ width: '100%', minHeight: '100px', padding: '16px', marginBottom: '20px' }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setAbnormalFlag({ show: false, recordId: null, store: null, question: '', note: '' })} className="nav-button" style={{ border: 'none', background: 'transparent' }}>Skip</button>
              <button onClick={handleSaveNote} className="primary-button" style={{ background: '#EF4444' }}>Save Context</button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998, padding: '20px' }}>
          <div className="glass-card" style={{ background: '#1F2937', padding: '30px', maxWidth: '800px', width: '100%', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px' }}>Full History Log</h2>
              <button onClick={() => setShowHistory(false)} className="nav-button" style={{ border: 'none', background: 'rgba(255,255,255,0.1)' }}>Close</button>
            </div>
            
            {activeTab === 'bp' && bpData.map(log => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{log.systolic}/{log.diastolic} <span style={{fontSize: '12px', fontWeight: 'normal', color: interpretBP(log.systolic, log.diastolic).color}}>({interpretBP(log.systolic, log.diastolic).label})</span></div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{formatDate(log.timestamp)}</div>
                  {log.note && <div style={{ fontSize: '12px', color: '#EAB308', marginTop: '4px' }}>Note: {log.note}</div>}
                </div>
                <button onClick={() => handleDelete(bpStore, log.id)} style={{ background: '#EF4444', border: 'none', borderRadius: '4px', padding: '6px 12px', color: 'white', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}

            {activeTab === 'sugar' && sugarData.map(log => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{log.level} mmol/L <span style={{fontSize: '12px', fontWeight: 'normal', color: interpretSugar(log.level, log.type).color}}>({interpretSugar(log.level, log.type).label})</span></div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{formatDate(log.timestamp)} | {log.type}</div>
                  {log.note && <div style={{ fontSize: '12px', color: '#EAB308', marginTop: '4px' }}>Note: {log.note}</div>}
                </div>
                <button onClick={() => handleDelete(sugarStore, log.id)} style={{ background: '#EF4444', border: 'none', borderRadius: '4px', padding: '6px 12px', color: 'white', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}

            {activeTab === 'weight' && weightData.map(log => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{log.weight} kg <span style={{fontSize: '12px', fontWeight: 'normal', color: interpretBMI(log.bmi).color}}>(BMI: {log.bmi} - {interpretBMI(log.bmi).label})</span></div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{formatDate(log.timestamp)}</div>
                </div>
                <button onClick={() => handleDelete(weightStore, log.id)} style={{ background: '#EF4444', border: 'none', borderRadius: '4px', padding: '6px 12px', color: 'white', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}

            {activeTab === 'art' && artData.map(log => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Medication Taken: {log.taken}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{formatDate(log.timestamp)} | Time specified: {log.time}</div>
                </div>
                <button onClick={() => handleDelete(artStore, log.id)} style={{ background: '#EF4444', border: 'none', borderRadius: '4px', padding: '6px 12px', color: 'white', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}

            {activeTab === 'symptoms' && symptomData.map(log => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Urine: {log.urine} | Stool: {log.stool}</div>
                  <div style={{ fontSize: '14px' }}>Vision: {log.vision} | Feeling: {log.feeling}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{formatDate(log.timestamp)}</div>
                </div>
                <button onClick={() => handleDelete(symptomStore, log.id)} style={{ background: '#EF4444', border: 'none', borderRadius: '4px', padding: '6px 12px', color: 'white', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}

          </div>
        </div>
      )}

      {/* Main Content Wrapper */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <header className="page-header" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '20px', paddingTop: '20px' }}>
          <button className="nav-button" onClick={() => setPage('home')} style={{ marginBottom: '16px', marginLeft: '24px' }}>&larr; Back</button>
          <h1 className="page-title" style={{ fontSize: '32px', marginLeft: '24px' }}>Health Vitals Dashboard</h1>
          <p className="page-subtitle" style={{ color: 'var(--color-text-muted)', marginLeft: '24px' }}>Securely track and understand your body's most important metrics.</p>
        </header>

        <div className="tabs-container" style={{ margin: '20px 24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className={`tab-btn ${activeTab === 'bp' ? 'active' : ''}`} onClick={() => setActiveTab('bp')}>Blood Pressure</button>
          <button className={`tab-btn ${activeTab === 'sugar' ? 'active' : ''}`} onClick={() => setActiveTab('sugar')}>Blood Sugar</button>
          <button className={`tab-btn ${activeTab === 'weight' ? 'active' : ''}`} onClick={() => setActiveTab('weight')}>Weight</button>
          <button className={`tab-btn ${activeTab === 'art' ? 'active' : ''}`} onClick={() => setActiveTab('art')}>ART Tracker</button>
          <button className={`tab-btn ${activeTab === 'symptoms' ? 'active' : ''}`} onClick={() => setActiveTab('symptoms')}>Symptoms</button>
        </div>

        <div style={{ margin: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* ================= BLOOD PRESSURE TAB ================= */}
          {activeTab === 'bp' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="responsive-grid">
                <div className="glass-card" style={{ padding: '30px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Log Reading</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '20px' }}>Record your latest systolic and diastolic numbers.</p>
                  <form onSubmit={handleBpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Systolic (mmHg)</label>
                        <input type="number" placeholder="120" value={bpForm.systolic} onChange={e => setBpForm({...bpForm, systolic: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '18px', padding: '12px' }}/>
                      </div>
                      <span style={{ fontSize: '24px', color: 'var(--color-border)', marginTop: '20px' }}>/</span>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Diastolic (mmHg)</label>
                        <input type="number" placeholder="80" value={bpForm.diastolic} onChange={e => setBpForm({...bpForm, diastolic: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '18px', padding: '12px' }}/>
                      </div>
                    </div>
                    <button type="submit" className="primary-button" style={{ padding: '14px', fontSize: '16px', marginTop: '8px' }}>Save Reading</button>
                  </form>
                </div>

                <div className="glass-card" style={{ padding: '30px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#3B82F6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🩺</span> How to measure BP accurately
                  </h3>
                  <ul style={{ paddingLeft: '20px', color: 'var(--color-text-main)', fontSize: '14px', lineHeight: 1.8 }}>
                    <li><strong>Rest first:</strong> Sit quietly for 5 minutes before measuring.</li>
                    <li><strong>Posture matters:</strong> Sit with your back supported, feet flat on the floor, and legs uncrossed.</li>
                    <li><strong>Arm position:</strong> Rest your arm on a table so the cuff is level with your heart.</li>
                    <li><strong>Stay silent:</strong> Do not talk or check your phone while the machine is running.</li>
                  </ul>
                </div>
              </div>

              {bpData.length > 0 && (
                <div className="glass-card" style={{ padding: '30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '20px' }}>Recent History & Trends</h3>
                    <button onClick={() => setShowHistory(true)} className="nav-button" style={{ fontSize: '14px', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', background: 'transparent' }}>View All History</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }} className="hide-scrollbar">
                      {(bpData.slice(0, 5).map(log => {
                        const status = interpretBP(log.systolic, log.diastolic);
                        return (
                          <div key={log.id} style={{ minWidth: '160px', padding: '16px', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: `1px solid ${status.color}40` }}>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>{formatDate(log.timestamp)}</div>
                            <div style={{ fontSize: '24px', fontWeight: 800 }}>{log.systolic}/{log.diastolic}</div>
                            <div style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '12px', background: status.bg, color: status.color, display: 'inline-block', marginTop: '8px' }}>
                              {status.label}
                            </div>
                          </div>
                        );
                      }))}
                    </div>
                    
                    <div style={{ height: '250px', marginTop: '10px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[...bpData].reverse()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                          <XAxis dataKey="timestamp" tickFormatter={formatDate} fontSize={10} stroke="var(--color-text-muted)" />
                          <YAxis domain={['auto', 'auto']} fontSize={10} stroke="var(--color-text-muted)" />
                          <Tooltip labelFormatter={formatDate} contentStyle={{ background: 'var(--color-bg-surface)', border: 'none', borderRadius: '8px' }} />
                          <ReferenceLine y={120} stroke="#10B981" strokeDasharray="3 3" opacity={0.5} />
                          <ReferenceLine y={140} stroke="#EF4444" strokeDasharray="3 3" opacity={0.5} />
                          <Line type="monotone" dataKey="systolic" stroke="#E11D48" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Systolic" />
                          <Line type="monotone" dataKey="diastolic" stroke="#3B82F6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Diastolic" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================= BLOOD SUGAR TAB ================= */}
          {activeTab === 'sugar' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="responsive-grid">
                <div className="glass-card" style={{ padding: '30px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Log Reading</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '20px' }}>Record your blood glucose levels.</p>
                  <form onSubmit={handleSugarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Level (mmol/L)</label>
                        <input type="number" step="0.1" placeholder="5.5" value={sugarForm.level} onChange={e => setSugarForm({...sugarForm, level: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '18px', padding: '12px' }}/>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Test Type</label>
                        <select value={sugarForm.type} onChange={e => setSugarForm({...sugarForm, type: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '16px', padding: '12px', height: '50px' }}>
                          <option value="Random">Random / Post-meal</option>
                          <option value="Fasting">Fasting (Woke up)</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="primary-button" style={{ padding: '14px', fontSize: '16px', marginTop: '8px' }}>Save Reading</button>
                  </form>
                </div>

                <div className="glass-card" style={{ padding: '30px', background: 'rgba(234, 179, 8, 0.05)', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#EAB308', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🩸</span> How to measure Sugar
                  </h3>
                  <ul style={{ paddingLeft: '20px', color: 'var(--color-text-main)', fontSize: '14px', lineHeight: 1.8 }}>
                    <li><strong>Clean hands:</strong> Wash hands with warm, soapy water and dry them completely.</li>
                    <li><strong>Prick the side:</strong> Prick the side of your fingertip, not the center pad, to avoid pain.</li>
                    <li><strong>First drop:</strong> Wipe away the first drop of blood with a clean tissue, and test the second drop.</li>
                  </ul>
                </div>
              </div>

              {sugarData.length > 0 && (
                <div className="glass-card" style={{ padding: '30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '20px' }}>Recent History & Trends</h3>
                    <button onClick={() => setShowHistory(true)} className="nav-button" style={{ fontSize: '14px', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', background: 'transparent' }}>View All History</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }} className="hide-scrollbar">
                      {(sugarData.slice(0, 5).map(log => {
                        const status = interpretSugar(log.level, log.type);
                        return (
                          <div key={log.id} style={{ minWidth: '160px', padding: '16px', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: `1px solid ${status.color}40` }}>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>{formatDate(log.timestamp)}</div>
                            <div style={{ fontSize: '24px', fontWeight: 800 }}>{log.level} <span style={{fontSize:'12px', fontWeight:400}}>mmol/L</span></div>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{log.type}</div>
                            <div style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '12px', background: status.bg, color: status.color, display: 'inline-block', marginTop: '8px' }}>
                              {status.label}
                            </div>
                          </div>
                        );
                      }))}
                    </div>
                    
                    <div style={{ height: '250px', marginTop: '10px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[...sugarData].reverse()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                          <XAxis dataKey="timestamp" tickFormatter={formatDate} fontSize={10} stroke="var(--color-text-muted)" />
                          <YAxis domain={['auto', 'auto']} fontSize={10} stroke="var(--color-text-muted)" />
                          <Tooltip labelFormatter={formatDate} contentStyle={{ background: 'var(--color-bg-surface)', border: 'none', borderRadius: '8px' }} />
                          <ReferenceLine y={5.5} stroke="#10B981" strokeDasharray="3 3" opacity={0.5} />
                          <ReferenceLine y={7.0} stroke="#EF4444" strokeDasharray="3 3" opacity={0.5} />
                          <Line type="monotone" dataKey="level" stroke="#EAB308" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Sugar Level" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================= WEIGHT & BMI TAB ================= */}
          {activeTab === 'weight' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="responsive-grid">
                <div className="glass-card" style={{ padding: '30px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Log Weight</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '20px' }}>Record weight and height for BMI.</p>
                  <form onSubmit={handleWeightSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Weight (kg)</label>
                        <input type="number" step="0.1" placeholder="70" value={weightForm.weight} onChange={e => setWeightForm({...weightForm, weight: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '18px', padding: '12px' }}/>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Height (cm)</label>
                        <input type="number" placeholder="170" value={weightForm.height} onChange={e => setWeightForm({...weightForm, height: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '18px', padding: '12px' }}/>
                      </div>
                    </div>
                    <button type="submit" className="primary-button" style={{ padding: '14px', fontSize: '16px', marginTop: '8px' }}>Save Reading</button>
                  </form>
                </div>
                <div className="glass-card" style={{ padding: '30px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>⚖️</span> How to measure accurately
                  </h3>
                  <ul style={{ paddingLeft: '20px', color: 'var(--color-text-main)', fontSize: '14px', lineHeight: 1.8 }}>
                    <li><strong>Time of day:</strong> Weigh yourself first thing in the morning, right after using the restroom.</li>
                    <li><strong>Consistency:</strong> Wear light clothing and measure without shoes.</li>
                    <li><strong>Scale placement:</strong> Place your scale on a hard, completely flat surface.</li>
                  </ul>
                </div>
              </div>

              {weightData.length > 0 && (
                <div className="glass-card" style={{ padding: '30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '20px' }}>Recent History & Trends</h3>
                    <button onClick={() => setShowHistory(true)} className="nav-button" style={{ fontSize: '14px', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', background: 'transparent' }}>View All History</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }} className="hide-scrollbar">
                      {(weightData.slice(0, 5).map(log => {
                        const status = interpretBMI(log.bmi);
                        return (
                          <div key={log.id} style={{ minWidth: '160px', padding: '16px', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: `1px solid ${status.color}40` }}>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>{formatDate(log.timestamp)}</div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                              <div style={{ fontSize: '24px', fontWeight: 800 }}>{log.weight}</div>
                              <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>kg</div>
                            </div>
                            <div style={{ fontSize: '12px', marginTop: '4px' }}>BMI: <span style={{fontWeight: 700}}>{log.bmi}</span></div>
                            <div style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '12px', background: status.bg, color: status.color, display: 'inline-block', marginTop: '8px' }}>
                              {status.label}
                            </div>
                          </div>
                        );
                      }))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================= ART TRACKER TAB ================= */}
          {activeTab === 'art' && (
            <>
              <div className="glass-card" style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#8B5CF6' }}>ART Adherence Tracker</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '24px' }}>Consistency is key. Log your daily medication here.</p>
                <form onSubmit={handleArtSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>Did you take your medication today?</label>
                      <select value={artForm.taken} onChange={e => setArtForm({...artForm, taken: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '16px', padding: '12px', height: '50px' }}>
                        <option value="Yes">Yes, I took it</option>
                        <option value="No">No, I missed it</option>
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>Time (Optional)</label>
                      <input type="time" value={artForm.time} onChange={e => setArtForm({...artForm, time: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '16px', padding: '12px', height: '50px' }}/>
                    </div>
                  </div>
                  <button type="submit" className="primary-button" style={{ padding: '14px', fontSize: '16px', marginTop: '16px', background: '#8B5CF6' }}>Log Adherence</button>
                </form>

                {artData.length > 0 && (
                  <div style={{ marginTop: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '16px' }}>Recent Logs</h4>
                      <button onClick={() => setShowHistory(true)} className="nav-button" style={{ fontSize: '12px', padding: '4px 8px' }}>View All</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {artData.slice(0, 5).map(log => (
                        <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                          <div>
                            <strong style={{ color: log.taken === 'Yes' ? '#10B981' : '#EF4444' }}>{log.taken}</strong>
                            <span style={{ marginLeft: '12px', fontSize: '12px', color: 'var(--color-text-muted)' }}>{log.time}</span>
                          </div>
                          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{formatDate(log.timestamp)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ================= SYMPTOMS TAB ================= */}
          {activeTab === 'symptoms' && (
            <>
              <div className="glass-card" style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#14B8A6' }}>Symptom & Wellness Tracker</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '24px' }}>Track qualitative health markers to share with your doctor.</p>
                <form onSubmit={handleSymptomSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>Urine Color</label>
                      <select value={symptomForm.urine} onChange={e => setSymptomForm({...symptomForm, urine: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '14px', padding: '12px', height: '46px' }}>
                        <option value="Normal">Normal (Clear/Light Yellow)</option>
                        <option value="Dark Yellow">Dark Yellow (Dehydrated)</option>
                        <option value="Brown/Red">Brown or Red (Alert)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>Stool Consistency</label>
                      <select value={symptomForm.stool} onChange={e => setSymptomForm({...symptomForm, stool: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '14px', padding: '12px', height: '46px' }}>
                        <option value="Normal">Normal</option>
                        <option value="Hard">Hard / Constipated</option>
                        <option value="Loose">Loose / Diarrhea</option>
                        <option value="Bloody">Bloody (Alert)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>Vision</label>
                      <select value={symptomForm.vision} onChange={e => setSymptomForm({...symptomForm, vision: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '14px', padding: '12px', height: '46px' }}>
                        <option value="Normal">Normal</option>
                        <option value="Blurred">Blurred Vision</option>
                        <option value="Double Vision">Double Vision</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>General Feeling</label>
                      <select value={symptomForm.feeling} onChange={e => setSymptomForm({...symptomForm, feeling: e.target.value})} className="chat-input" style={{ width: '100%', fontSize: '14px', padding: '12px', height: '46px' }}>
                        <option value="Good">Good / Energetic</option>
                        <option value="Tired">Tired / Fatigued</option>
                        <option value="Pain">In Pain</option>
                        <option value="Nauseous">Nauseous</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="primary-button" style={{ padding: '14px', fontSize: '16px', marginTop: '8px', background: '#14B8A6' }}>Log Symptoms</button>
                </form>

                {symptomData.length > 0 && (
                  <div style={{ marginTop: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '16px' }}>Recent Logs</h4>
                      <button onClick={() => setShowHistory(true)} className="nav-button" style={{ fontSize: '12px', padding: '4px 8px' }}>View All</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {symptomData.slice(0, 5).map(log => (
                        <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '13px' }}>
                            <span style={{ marginRight: '8px' }}>💧 {log.urine}</span>
                            <span style={{ marginRight: '8px' }}>🚽 {log.stool}</span>
                            <span style={{ marginRight: '8px' }}>👁️ {log.vision}</span>
                            <span>❤️ {log.feeling}</span>
                          </div>
                          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{formatDate(log.timestamp)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
