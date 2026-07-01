import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { bpStore, sugarStore, weightStore, symptomStore, saveHealthData, getHealthData } from '../utils/indexedDB';

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
  
  // Form states
  const [bpForm, setBpForm] = useState({ systolic: '', diastolic: '' });
  const [sugarForm, setSugarForm] = useState({ level: '', type: 'Random' });
  const [weightForm, setWeightForm] = useState({ weight: '', height: '' }); 

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    if (activeTab === 'bp') setBpData(await getHealthData(bpStore));
    if (activeTab === 'sugar') setSugarData(await getHealthData(sugarStore));
    if (activeTab === 'weight') setWeightData(await getHealthData(weightStore));
  };

  const handleBpSubmit = async (e) => {
    e.preventDefault();
    if (!bpForm.systolic || !bpForm.diastolic) return;
    await saveHealthData(bpStore, { systolic: Number(bpForm.systolic), diastolic: Number(bpForm.diastolic) });
    setBpForm({ systolic: '', diastolic: '' });
    loadData();
  };

  const handleSugarSubmit = async (e) => {
    e.preventDefault();
    if (!sugarForm.level) return;
    await saveHealthData(sugarStore, { level: Number(sugarForm.level), type: sugarForm.type });
    setSugarForm({ level: '', type: 'Random' });
    loadData();
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

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return `${d.getDate()}/${d.getMonth()+1} ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="page-container" style={{ paddingBottom: '100px', background: 'var(--color-bg-base)', minHeight: '100vh' }}>
      <header className="page-header" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '20px' }}>
        <button className="nav-button" onClick={() => setPage('home')} style={{ marginBottom: '16px' }}>&larr; Back</button>
        <h1 className="page-title" style={{ fontSize: '32px' }}>Health Vitals Dashboard</h1>
        <p className="page-subtitle" style={{ color: 'var(--color-text-muted)' }}>Securely track and understand your body's most important metrics.</p>
      </header>

      <div className="tabs-container" style={{ margin: '20px 24px', display: 'flex', gap: '12px' }}>
        <button className={`tab-btn ${activeTab === 'bp' ? 'active' : ''}`} onClick={() => setActiveTab('bp')}>Blood Pressure</button>
        <button className={`tab-btn ${activeTab === 'sugar' ? 'active' : ''}`} onClick={() => setActiveTab('sugar')}>Blood Sugar</button>
        <button className={`tab-btn ${activeTab === 'weight' ? 'active' : ''}`} onClick={() => setActiveTab('weight')}>Weight & BMI</button>
      </div>

      <div style={{ margin: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* ================= BLOOD PRESSURE TAB ================= */}
        {activeTab === 'bp' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="responsive-grid">
              {/* Input Card */}
              <div className="glass-card" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Log Reading</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '20px' }}>Record your latest systolic (upper) and diastolic (lower) numbers.</p>
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

              {/* Guide Card */}
              <div className="glass-card" style={{ padding: '30px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#3B82F6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🩺</span> How to measure BP accurately
                </h3>
                <ul style={{ paddingLeft: '20px', color: 'var(--color-text-main)', fontSize: '14px', lineHeight: 1.8 }}>
                  <li><strong>Rest first:</strong> Sit quietly for 5 minutes before measuring.</li>
                  <li><strong>Posture matters:</strong> Sit with your back supported, feet flat on the floor, and legs uncrossed.</li>
                  <li><strong>Arm position:</strong> Rest your arm on a table so the cuff is level with your heart.</li>
                  <li><strong>Stay silent:</strong> Do not talk or check your phone while the machine is running.</li>
                  <li><strong>Cuff size:</strong> Ensure you are using the correct cuff size for your arm; a tight cuff will artificially raise the reading.</li>
                </ul>
              </div>
            </div>

            {bpData.length > 0 && (
              <div className="glass-card" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Recent History & Trends</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Latest readings list */}
                  <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }} className="hide-scrollbar">
                    {([...bpData].reverse().slice(0, 5).map(log => {
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
                  
                  {/* Chart */}
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
                <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '20px' }}>Record your blood glucose levels. Make sure to specify if you are fasting.</p>
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
                  <li><strong>Clean hands:</strong> Wash your hands with warm, soapy water and dry them completely. Warmth helps blood flow.</li>
                  <li><strong>Avoid alcohol wipes:</strong> If possible, avoid alcohol wipes as they can alter the reading or dry the skin. If you use one, wait until it is 100% dry.</li>
                  <li><strong>Prick the side:</strong> Prick the side of your fingertip, not the center pad, to avoid pain.</li>
                  <li><strong>First drop:</strong> Wipe away the first drop of blood with a clean tissue, and test the second drop.</li>
                </ul>
              </div>
            </div>

            {sugarData.length > 0 && (
              <div className="glass-card" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Recent History & Trends</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }} className="hide-scrollbar">
                    {([...sugarData].reverse().slice(0, 5).map(log => {
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
                <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '20px' }}>Record your weight and height to automatically track your BMI.</p>
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
                  <li><strong>Time of day:</strong> Always weigh yourself first thing in the morning, right after using the restroom and before eating or drinking.</li>
                  <li><strong>Consistency:</strong> Wear as little clothing as possible and measure without shoes.</li>
                  <li><strong>Scale placement:</strong> Place your scale on a hard, completely flat surface. Avoid carpets or uneven tiles.</li>
                  <li><strong>Body Mass Index (BMI):</strong> A simple calculation using your height and weight. While useful, it doesn't account for muscle mass vs fat.</li>
                </ul>
              </div>
            </div>

            {weightData.length > 0 && (
              <div className="glass-card" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Recent History & Trends</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }} className="hide-scrollbar">
                    {([...weightData].reverse().slice(0, 5).map(log => {
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
                  
                  <div style={{ height: '250px', marginTop: '10px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[...weightData].reverse()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                        <XAxis dataKey="timestamp" tickFormatter={formatDate} fontSize={10} stroke="var(--color-text-muted)" />
                        <YAxis yAxisId="left" domain={['auto', 'auto']} fontSize={10} stroke="var(--color-text-muted)" />
                        <YAxis yAxisId="right" orientation="right" domain={['auto', 'auto']} fontSize={10} stroke="var(--color-text-muted)" />
                        <Tooltip labelFormatter={formatDate} contentStyle={{ background: 'var(--color-bg-surface)', border: 'none', borderRadius: '8px' }} />
                        <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#10B981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Weight (kg)" />
                        <Line yAxisId="right" type="monotone" dataKey="bmi" stroke="#8B5CF6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="BMI" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
