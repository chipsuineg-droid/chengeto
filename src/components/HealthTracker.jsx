import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { bpStore, sugarStore, weightStore, symptomStore, saveHealthData, getHealthData } from '../utils/indexedDB';

export default function HealthTracker({ setPage }) {
  const [activeTab, setActiveTab] = useState('bp');
  
  // Data states
  const [bpData, setBpData] = useState([]);
  const [sugarData, setSugarData] = useState([]);
  const [weightData, setWeightData] = useState([]);
  
  // Form states
  const [bpForm, setBpForm] = useState({ systolic: '', diastolic: '' });
  const [sugarForm, setSugarForm] = useState({ level: '', type: 'Random' });
  const [weightForm, setWeightForm] = useState({ weight: '', height: '' }); // For BMI calculation

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
    <div className="page-container" style={{ paddingBottom: '100px' }}>
      <header className="page-header">
        <button className="back-btn" onClick={() => setPage('home')}>← Back</button>
        <h1 className="page-title">Personal Health Tracker</h1>
        <p className="page-subtitle">Your data stays on your device. Secure & Private.</p>
      </header>

      <div className="tabs-container" style={{ margin: '20px' }}>
        <button className={`tab-btn ${activeTab === 'bp' ? 'active' : ''}`} onClick={() => setActiveTab('bp')}>BP</button>
        <button className={`tab-btn ${activeTab === 'sugar' ? 'active' : ''}`} onClick={() => setActiveTab('sugar')}>Sugar</button>
        <button className={`tab-btn ${activeTab === 'weight' ? 'active' : ''}`} onClick={() => setActiveTab('weight')}>Weight & BMI</button>
      </div>

      <div style={{ margin: '0 20px' }}>
        {/* Blood Pressure Section */}
        {activeTab === 'bp' && (
          <div className="glass-card">
            <h3>Log Blood Pressure</h3>
            <form onSubmit={handleBpSubmit} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <input type="number" placeholder="Systolic (e.g. 120)" value={bpForm.systolic} onChange={e => setBpForm({...bpForm, systolic: e.target.value})} className="chat-input" style={{ width: '45%' }}/>
              <span style={{ alignSelf: 'center', fontSize: '20px' }}>/</span>
              <input type="number" placeholder="Diastolic (e.g. 80)" value={bpForm.diastolic} onChange={e => setBpForm({...bpForm, diastolic: e.target.value})} className="chat-input" style={{ width: '45%' }}/>
              <button type="submit" className="action-button primary" style={{ padding: '0 20px' }}>+</button>
            </form>

            {bpData.length > 0 && (
              <div style={{ marginTop: '30px', height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[...bpData].reverse()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={formatDate} fontSize={10} />
                    <YAxis domain={['auto', 'auto']} fontSize={10} />
                    <Tooltip labelFormatter={formatDate} />
                    <Line type="monotone" dataKey="systolic" stroke="#E11D48" strokeWidth={2} name="Systolic" />
                    <Line type="monotone" dataKey="diastolic" stroke="#2563EB" strokeWidth={2} name="Diastolic" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* Blood Sugar Section */}
        {activeTab === 'sugar' && (
          <div className="glass-card">
            <h3>Log Blood Sugar</h3>
            <form onSubmit={handleSugarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="number" step="0.1" placeholder="Level (mmol/L)" value={sugarForm.level} onChange={e => setSugarForm({...sugarForm, level: e.target.value})} className="chat-input" style={{ flex: 1 }}/>
                <select value={sugarForm.type} onChange={e => setSugarForm({...sugarForm, type: e.target.value})} className="chat-input" style={{ flex: 1 }}>
                  <option value="Random">Random</option>
                  <option value="Fasting">Fasting</option>
                </select>
                <button type="submit" className="action-button primary" style={{ padding: '0 20px' }}>+</button>
              </div>
            </form>

            {sugarData.length > 0 && (
              <div style={{ marginTop: '30px', height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[...sugarData].reverse()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={formatDate} fontSize={10} />
                    <YAxis domain={['auto', 'auto']} fontSize={10} />
                    <Tooltip labelFormatter={formatDate} />
                    <Line type="monotone" dataKey="level" stroke="#059669" strokeWidth={2} name="Sugar Level" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* Weight Section */}
        {activeTab === 'weight' && (
          <div className="glass-card">
            <h3>Log Weight & BMI</h3>
            <form onSubmit={handleWeightSubmit} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <input type="number" step="0.1" placeholder="Weight (kg)" value={weightForm.weight} onChange={e => setWeightForm({...weightForm, weight: e.target.value})} className="chat-input" style={{ width: '45%' }}/>
              <input type="number" placeholder="Height (cm)" value={weightForm.height} onChange={e => setWeightForm({...weightForm, height: e.target.value})} className="chat-input" style={{ width: '45%' }}/>
              <button type="submit" className="action-button primary" style={{ padding: '0 20px' }}>+</button>
            </form>

            {weightData.length > 0 && (
              <div style={{ marginTop: '30px', height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[...weightData].reverse()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={formatDate} fontSize={10} />
                    <YAxis yAxisId="left" domain={['auto', 'auto']} fontSize={10} />
                    <YAxis yAxisId="right" orientation="right" domain={['auto', 'auto']} fontSize={10} />
                    <Tooltip labelFormatter={formatDate} />
                    <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#D97706" strokeWidth={2} name="Weight (kg)" />
                    <Line yAxisId="right" type="monotone" dataKey="bmi" stroke="#7C3AED" strokeWidth={2} name="BMI" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
