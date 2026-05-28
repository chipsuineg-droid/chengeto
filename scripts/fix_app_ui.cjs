const fs = require('fs');

const path = 'C:/Users/MY Laptop/.gemini/antigravity/scratch/chengeto/src/App.jsx';
let code = fs.readFileSync(path, 'utf8');

// Replace all usages of HIV_OPTIONS, HIV_CATEGORIES, PREG_OPTIONS, PREG_CATEGORIES
code = code.replace(/HIV_CATEGORIES\.map/g, 'HIV_PREVENTION_CATEGORIES.map');
code = code.replace(/HIV_OPTIONS\.filter/g, 'HIV_PREVENTION_METHODS.filter');
code = code.replace(/HIV_OPTIONS\.map/g, 'HIV_PREVENTION_METHODS.map');
code = code.replace(/HIV_OPTIONS\.some/g, 'HIV_PREVENTION_METHODS.some');
code = code.replace(/HIV_OPTIONS/g, 'HIV_PREVENTION_METHODS');

code = code.replace(/PREG_CATEGORIES\.map/g, 'PREG_PREVENTION_CATEGORIES.map');
code = code.replace(/PREG_OPTIONS\.filter/g, 'PREG_PREVENTION_METHODS.filter');
code = code.replace(/PREG_OPTIONS\.map/g, 'PREG_PREVENTION_METHODS.map');
code = code.replace(/PREG_OPTIONS\.some/g, 'PREG_PREVENTION_METHODS.some');
code = code.replace(/PREG_OPTIONS/g, 'PREG_PREVENTION_METHODS');

code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "ec"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "ec-pill")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "iud-copper"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "copper-iud")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "pill"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "pop")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "injectable"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "depo-provera")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "condom-preg"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "female-condom")');

// Replace the UI block for HIV Prevention
const oldHivBlock = `              {/* ── PREVENTION METHODS TAB ── */}
              {preventionSubTab === 'methods' && (
                <div className="animate-fade-in">
                  <div className="tabs-container" style={{ marginBottom: '20px' }}>
                    {HIV_PREVENTION_CATEGORIES.map(c => (
                      <button key={c} className={\`tab-btn \${hivCat === c ? 'active-hiv' : ''}\`} onClick={() => setHivCat(c)}>{c}</button>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {HIV_PREVENTION_METHODS.filter(o => hivCat === 'All' || o.cat === hivCat).map(o => (
                      <ExpandableCard key={o.id} option={o} onCompareSelect={handleAddCompare1} isCompareBtnVisible={true} lang={lang} />
                    ))}
                  </div>
                </div>
              )}`;

const newHivBlock = `              {/* ── PREVENTION METHODS TAB ── */}
              {preventionSubTab === 'methods' && (
                <div className="animate-fade-in">
                  {activeHivMethod ? (
                    <div className="animate-fade-in">
                      <button onClick={() => setActiveHivMethod(null)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        ⬅ Back to Prevention Methods
                      </button>

                      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: '0 8px 30px rgba(8, 145, 178, 0.12)' }}>
                        <div style={{ background: 'linear-gradient(135deg, var(--color-primary), #0369a1)', padding: '32px 24px', color: '#fff' }}>
                          <div style={{ fontSize: '48px', marginBottom: '16px' }}>{activeHivMethod.icon}</div>
                          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                            {activeHivMethod.categoryLabel}
                          </div>
                          <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px', lineHeight: 1.2 }}>{activeHivMethod.name}</h2>
                          <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: 1.5, fontWeight: 500 }}>{activeHivMethod.tagline}</p>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Effectiveness</span>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-primary)' }}>{activeHivMethod.effectiveness}%</span>
                            </div>
                            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: \`\${activeHivMethod.effectiveness}%\`, height: '100%', background: 'var(--color-primary)', borderRadius: '4px' }}></div>
                            </div>
                          </div>
                        </div>

                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div className="glass-card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>📝 Description</h4>
                            <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7 }}>{activeHivMethod.detail.description}</p>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #F59E0B' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#F59E0B', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💊 Form of Use</h4>
                            <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7 }}>{activeHivMethod.detail.formOfUse}</p>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #3B82F6' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⚙️ How It Works</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.howItWorks.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #10B981' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#10B981', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>🛠️ How To Use</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.howToUse.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8B5CF6', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⏱️ Frequency</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.frequency.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #EF4444' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#EF4444', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⚠️ Side Effects</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.sideEffects.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #0EA5E9' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#0EA5E9', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>📍 Where & How to Access</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.access.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #059669' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#059669', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💰 Cost</h4>
                            <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7, fontWeight: 600 }}>{activeHivMethod.detail.cost}</p>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #6366F1' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6366F1', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>🛡️ STI Protection</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.stiProtection.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          {activeHivMethod.detail.misunderstandings.length > 0 && (
                            <div className="glass-card" style={{ borderLeft: '4px solid #D97706' }}>
                              <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#D97706', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💡 Correcting Misunderstandings</h4>
                              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                {activeHivMethod.detail.misunderstandings.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>✅ {item}</li>)}
                              </ul>
                            </div>
                          )}

                          <button onClick={() => { setActiveHivMethod(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-secondary" style={{ width: '100%', marginTop: '8px' }}>
                            ⬅ Back to All Prevention Methods
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="tabs-container" style={{ marginBottom: '20px' }}>
                        {HIV_PREVENTION_CATEGORIES.map(c => (
                          <button key={c.id} className={\`tab-btn \${hivPreventionCat === c.id ? 'active-hiv' : ''}\`} onClick={() => setHivPreventionCat(c.id)}>{c.label}</button>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {HIV_PREVENTION_METHODS.filter(o => hivPreventionCat === 'All' || o.category === hivPreventionCat).map(o => (
                          <div key={o.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '24px', borderTop: o.urgent ? '4px solid var(--color-primary)' : 'none', position: 'relative' }}>
                            {o.urgent && <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--color-primary)', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Time Sensitive</div>}
                            <div style={{ fontSize: '42px', marginBottom: '16px' }}>{o.icon}</div>
                            <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '8px', fontWeight: 800, lineHeight: 1.3 }}>{o.name}</h3>
                            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>{o.tagline}</p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                              <span style={{ fontSize: '11px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>{o.effectiveness}% Effective</span>
                              {o.dual && <span style={{ fontSize: '11px', background: '#e0e7ff', color: '#4338ca', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>+ STI Protection</span>}
                            </div>
                            <button onClick={() => { setActiveHivMethod(o); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-secondary" style={{ marginTop: 'auto', width: '100%', padding: '10px', borderRadius: '8px', fontWeight: 600 }}>Learn More →</button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}`;

const oldPregBlock = `          {/* ── PREVENTION METHODS TAB ── */}
          {pregTab === 'methods' && (
            <div className="animate-fade-in">
              <button onClick={() => setPregTab('main')} style={{ background: 'none', border: 'none', color: 'var(--color-rose)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⬅ Back to Pregnancy Dashboard
              </button>
              
              <div style={{ background: 'var(--color-rose-light)', border: '1px solid var(--color-rose)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: 'var(--color-rose)', fontWeight: 600 }}>
                {UI[lang].pregNote}
              </div>
              <div className="tabs-container" style={{ marginBottom: '20px' }}>
                {PREG_PREVENTION_CATEGORIES.map(c => (
                  <button key={c} className={\`tab-btn \${pregCat === c ? 'active-preg' : ''}\`} onClick={() => setPregCat(c)}>{c}</button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {PREG_PREVENTION_METHODS.filter(o => pregCat === 'All' || o.cat === pregCat).map(o => (
                  <ExpandableCard key={o.id} option={o} onCompareSelect={handleAddCompare2} isCompareBtnVisible={true} lang={lang} />
                ))}
              </div>
            </div>
          )}`;

const newPregBlock = `          {/* ── PREVENTION METHODS TAB ── */}
          {pregTab === 'methods' && (
            <div className="animate-fade-in">
              {activePregMethod ? (
                <div className="animate-fade-in">
                  <button onClick={() => setActivePregMethod(null)} style={{ background: 'none', border: 'none', color: 'var(--color-rose)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ⬅ Back to Prevention Methods
                  </button>

                  <div className="glass-card" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: '0 8px 30px rgba(225, 29, 72, 0.12)' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--color-rose), #be123c)', padding: '32px 24px', color: '#fff' }}>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{activePregMethod.icon}</div>
                      <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                        {activePregMethod.categoryLabel}
                      </div>
                      <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px', lineHeight: 1.2 }}>{activePregMethod.name}</h2>
                      <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: 1.5, fontWeight: 500 }}>{activePregMethod.tagline}</p>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Effectiveness</span>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-rose)' }}>{activePregMethod.effectiveness}%</span>
                        </div>
                        <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: \`\${activePregMethod.effectiveness}%\`, height: '100%', background: 'var(--color-rose)', borderRadius: '4px' }}></div>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div className="glass-card" style={{ borderLeft: '4px solid var(--color-rose)' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-rose)', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>📝 Description</h4>
                        <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7 }}>{activePregMethod.detail.description}</p>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #F59E0B' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#F59E0B', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💊 Form of Use</h4>
                        <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7 }}>{activePregMethod.detail.formOfUse}</p>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #3B82F6' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⚙️ How It Works</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          {activePregMethod.detail.howItWorks.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                        </ul>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #10B981' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#10B981', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>🛠️ How To Use</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          {activePregMethod.detail.howToUse.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                        </ul>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8B5CF6', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⏱️ Frequency</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          {activePregMethod.detail.frequency.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                        </ul>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #EC4899' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#EC4899', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>✅ Effectiveness Details</h4>
                        <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7 }}>{activePregMethod.detail.effectiveness}</p>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #EF4444' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#EF4444', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⚠️ Side Effects</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          {activePregMethod.detail.sideEffects.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                        </ul>
                      </div>

                      {activePregMethod.detail.access && activePregMethod.detail.access.length > 0 && (
                        <div className="glass-card" style={{ borderLeft: '4px solid #0EA5E9' }}>
                          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#0EA5E9', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>📍 Where & How to Access</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {activePregMethod.detail.access.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                          </ul>
                        </div>
                      )}

                      {activePregMethod.detail.cost && (
                        <div className="glass-card" style={{ borderLeft: '4px solid #059669' }}>
                          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#059669', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💰 Cost</h4>
                          <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7, fontWeight: 600 }}>{activePregMethod.detail.cost}</p>
                        </div>
                      )}

                      {activePregMethod.detail.returnToFertility && activePregMethod.detail.returnToFertility.length > 0 && (
                        <div className="glass-card" style={{ borderLeft: '4px solid #14B8A6' }}>
                          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#14B8A6', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>👶 Return To Fertility</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {activePregMethod.detail.returnToFertility.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                          </ul>
                        </div>
                      )}

                      {activePregMethod.detail.stiProtection && activePregMethod.detail.stiProtection.length > 0 && (
                        <div className="glass-card" style={{ borderLeft: '4px solid #6366F1' }}>
                          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6366F1', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>🛡️ STI Protection</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {activePregMethod.detail.stiProtection.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                          </ul>
                        </div>
                      )}

                      {activePregMethod.detail.misunderstandings && activePregMethod.detail.misunderstandings.length > 0 && (
                        <div className="glass-card" style={{ borderLeft: '4px solid #D97706' }}>
                          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#D97706', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💡 Correcting Misunderstandings</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {activePregMethod.detail.misunderstandings.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>✅ {item}</li>)}
                          </ul>
                        </div>
                      )}

                      <button onClick={() => { setActivePregMethod(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn" style={{ width: '100%', marginTop: '8px', background: 'var(--color-rose)', color: '#fff', border: 'none' }}>
                        ⬅ Back to All Prevention Methods
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <button onClick={() => setPregTab('main')} style={{ background: 'none', border: 'none', color: 'var(--color-rose)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ⬅ Back to Pregnancy Dashboard
                  </button>
                  
                  <div style={{ background: 'var(--color-rose-light)', border: '1px solid var(--color-rose)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: 'var(--color-rose)', fontWeight: 600 }}>
                    {UI[lang].pregNote}
                  </div>
                  
                  <div className="tabs-container" style={{ marginBottom: '20px' }}>
                    {PREG_PREVENTION_CATEGORIES.map(c => (
                      <button key={c.id} className={\`tab-btn \${pregCat === c.id ? 'active-preg' : ''}\`} onClick={() => setPregCat(c.id)}>{c.label}</button>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {PREG_PREVENTION_METHODS.filter(o => pregCat === 'All' || o.category === pregCat).map(o => (
                      <div key={o.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '24px', borderTop: o.urgent ? '4px solid var(--color-rose)' : 'none', position: 'relative' }}>
                        {o.urgent && <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--color-rose)', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Time Sensitive</div>}
                        <div style={{ fontSize: '42px', marginBottom: '16px' }}>{o.icon}</div>
                        <h3 style={{ fontSize: '18px', color: 'var(--color-rose)', marginBottom: '8px', fontWeight: 800, lineHeight: 1.3 }}>{o.name}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>{o.tagline}</p>
                        
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                          <span style={{ fontSize: '11px', background: 'var(--color-rose-light)', color: 'var(--color-rose)', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>
                            {o.effectiveness}% Effective
                          </span>
                          {o.dual && (
                            <span style={{ fontSize: '11px', background: '#e0e7ff', color: '#4338ca', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>
                              + STI Protection
                            </span>
                          )}
                        </div>
                        
                        <button 
                          onClick={() => { setActivePregMethod(o); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="btn" 
                          style={{ marginTop: 'auto', background: 'transparent', border: '1px solid var(--color-rose)', color: 'var(--color-rose)', width: '100%', padding: '10px', borderRadius: '8px', fontWeight: 600, transition: 'all 0.2s' }}
                          onMouseOver={(e) => { e.currentTarget.style.background = 'var(--color-rose)'; e.currentTarget.style.color = '#fff'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-rose)'; }}
                        >
                          Learn More →
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}`;

if (code.includes(oldHivBlock)) {
    code = code.replace(oldHivBlock, newHivBlock);
} else {
    console.error("Could not find old HIV block to replace");
}

if (code.includes(oldPregBlock)) {
    code = code.replace(oldPregBlock, newPregBlock);
} else {
    console.error("Could not find old Preg block to replace");
}

fs.writeFileSync(path, code);
console.log('App.jsx fixed successfully!');
