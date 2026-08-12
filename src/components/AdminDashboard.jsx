import { useState } from "react";

// ── ADMIN CREDENTIALS (replaced by Firebase Auth in backend phase) ──
const ADMIN_CREDENTIALS = { username: "admin", password: "PodMyth@Admin2025" };

const getAdminSession = () => { try { return JSON.parse(localStorage.getItem("chengeto_admin_session") || "null"); } catch { return null; } };
const saveAdminSession = () => localStorage.setItem("chengeto_admin_session", JSON.stringify({ loggedIn: true, loginTime: Date.now() }));
const clearAdminSession = () => localStorage.removeItem("chengeto_admin_session");
const getAdminData = (key, fallback) => { try { return JSON.parse(localStorage.getItem("chengeto_admin_" + key) || JSON.stringify(fallback)); } catch { return fallback; } };
const saveAdminData = (key, data) => localStorage.setItem("chengeto_admin_" + key, JSON.stringify(data));

const DEFAULT_CLINICS = [
  { id: 1, name: "UZ Health Centre", city: "Harare", contact: "+263 242 303211", hours: "Mon-Fri 8am-4pm", services: ["HIVST", "PrEP", "Condoms", "Contraception"], active: true },
  { id: 2, name: "NUST Clinic", city: "Bulawayo", contact: "+263 292 282842", hours: "Mon-Fri 8am-4:30pm", services: ["HIVST", "Condoms", "Contraception"], active: true },
  { id: 3, name: "Parirenyatwa Hospitals", city: "Harare", contact: "+263 242 701000", hours: "24/7 Emergency", services: ["HIVST", "PrEP", "PEP", "VMMC"], active: true },
];
const DEFAULT_ALERTS = [
  { id: 1, title: "Free HIV Testing Day", body: "Free testing available at all government clinics this Saturday. No appointment needed.", type: "info", active: true, date: "2025-08-05" },
  { id: 2, title: "PrEP Now Available", body: "PrEP is freely available at MSU Health Centre. Visit during working hours.", type: "success", active: true, date: "2025-08-10" },
];
const DEFAULT_BOT = [
  { id: 1, trigger: "headache, migraine, head pain", category: "general", response: "For headaches: stay hydrated, rest in a dark room, and take paracetamol if needed. If severe or recurring, please visit a clinic.", active: true },
  { id: 2, trigger: "malaria, fever, chills, mosquito", category: "chronic", response: "Malaria symptoms include fever, chills, and sweating. Seek immediate medical attention. RDT tests are available at all government clinics.", active: true },
];
const DEFAULT_CONTENT = [
  { id: 1, title: "Understanding HIV Prevention", category: "HIV", status: "published", views: 1240, lastEdited: "2025-07-20" },
  { id: 2, title: "Pregnancy and Contraception Guide", category: "Pregnancy", status: "published", views: 980, lastEdited: "2025-07-18" },
  { id: 3, title: "Mental Health Resources", category: "Mental Health", status: "draft", views: 0, lastEdited: "2025-07-25" },
];

// ── SHARED STYLES ──
const C = {
  page: { minHeight: "100vh", background: "#0A0F1A", display: "flex", fontFamily: "'Inter','Segoe UI',sans-serif" },
  sidebar: { width: 240, background: "linear-gradient(180deg,#0D1321 0%,#111827 100%)", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100 },
  main: { marginLeft: 240, flex: 1, padding: 32, minHeight: "100vh", background: "#0A0F1A" },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" },
  cardHeader: { padding: "18px 22px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { fontSize: 15, fontWeight: 700, color: "#fff" },
  cardBody: { padding: "20px 22px" },
  h1: { fontSize: 26, fontWeight: 800, color: "#fff", margin: 0 },
  sub: { fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4, marginBottom: 0 },
  lbl: { fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: 6 },
  input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 13.5, outline: "none", boxSizing: "border-box" },
  textarea: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 13.5, outline: "none", boxSizing: "border-box", resize: "vertical", minHeight: 90 },
  btnPrimary: { display: "flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#10B981,#059669)", color: "#fff", border: "none", borderRadius: 9, padding: "10px 18px", fontSize: 13.5, fontWeight: 700, cursor: "pointer" },
  btnDanger: { display: "flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 9, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" },
  btnGhost: { display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" },
  th: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.8px", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" },
  td: { padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.8)", fontSize: 13.5 },
  navItem: (a) => ({ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, marginBottom: 2, cursor: "pointer", background: a ? "rgba(16,185,129,0.15)" : "transparent", color: a ? "#10B981" : "rgba(255,255,255,0.5)", fontWeight: a ? 700 : 500, fontSize: 13.5, border: a ? "1px solid rgba(16,185,129,0.2)" : "1px solid transparent", width: "100%", textAlign: "left" }),
};

const badge = (color, text) => (
  <span key={text} style={{ display: "inline-flex", alignItems: "center", background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{text}</span>
);

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{ width: 38, height: 20, background: on ? "#10B981" : "rgba(255,255,255,0.12)", borderRadius: 20, position: "relative", cursor: "pointer", border: "none", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
    </button>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#141C2B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, width: "100%", maxWidth: 520, maxHeight: "88vh", overflow: "auto" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

// ── OVERVIEW PANEL ──
function Overview() {
  const stats = [
    { label: "Total Users", value: "1,284", sub: "All-time registered", accent: "#10B981", icon: "👥" },
    { label: "Active This Week", value: "312", sub: "Unique sessions", accent: "#8B5CF6", icon: "📈" },
    { label: "Bot Conversations", value: "5,640", sub: "Total queries handled", accent: "#F59E0B", icon: "🤖" },
    { label: "Clinic Views", value: "2,190", sub: "Clinic locator visits", accent: "#06B6D4", icon: "🏥" },
    { label: "Top Module", value: "HIV Ed.", sub: "Most visited section", accent: "#EC4899", icon: "🔥" },
  ];
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={C.h1}>Welcome, Admin 👋</h1>
        <p style={C.sub}>Here's what's happening on the PodMyth platform today.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ ...C.card, borderTop: `3px solid ${s.accent}`, padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.label}</span>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={C.card}>
          <div style={C.cardHeader}><span style={C.cardTitle}>📋 Recent Activity</span></div>
          <div style={C.cardBody}>
            {[
              { time: "2m ago", text: "New clinic added: Parirenyatwa", color: "#06B6D4" },
              { time: "18m ago", text: "Bot response updated for Malaria", color: "#F59E0B" },
              { time: "1h ago", text: "Health alert published: Free Testing Day", color: "#10B981" },
              { time: "3h ago", text: "Content updated: HIV Prevention Guide", color: "#8B5CF6" },
              { time: "Yesterday", text: "Admin login from new device", color: "#EF4444" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={C.card}>
          <div style={C.cardHeader}><span style={C.cardTitle}>⚡ Quick Actions</span></div>
          <div style={C.cardBody}>
            {[["🏥 Add New Clinic", "#06B6D4"], ["🔔 Publish Health Alert", "#10B981"], ["🤖 Add Bot Response", "#F59E0B"], ["📄 Create Content", "#8B5CF6"]].map(([lbl]) => (
              <button key={lbl} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px", marginBottom: 10, cursor: "pointer", color: "rgba(255,255,255,0.8)", fontSize: 13.5, fontWeight: 600 }}>
                {lbl}<span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.2)" }}>→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CLINICS PANEL ──
function Clinics() {
  const [list, setList] = useState(() => getAdminData("clinics", DEFAULT_CLINICS));
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", city: "", contact: "", hours: "", services: "", active: true });
  const save = d => { saveAdminData("clinics", d); setList(d); };
  const submit = () => {
    const item = { ...form, id: editing ? editing.id : Date.now(), services: form.services.split(",").map(s => s.trim()).filter(Boolean) };
    save(editing ? list.map(c => c.id === editing.id ? item : c) : [...list, item]);
    setModal(false); setEditing(null);
    setForm({ name: "", city: "", contact: "", hours: "", services: "", active: true });
  };
  const openEdit = c => { setEditing(c); setForm({ ...c, services: c.services.join(", ") }); setModal(true); };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div><h1 style={C.h1}>🏥 Clinics Manager</h1><p style={C.sub}>Add, edit, or remove clinic locations visible to users.</p></div>
        <button style={C.btnPrimary} onClick={() => { setEditing(null); setForm({ name: "", city: "", contact: "", hours: "", services: "", active: true }); setModal(true); }}>+ Add Clinic</button>
      </div>
      <div style={C.card}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Name", "City", "Contact", "Hours", "Services", "Active", "Actions"].map(h => <th key={h} style={C.th}>{h}</th>)}</tr></thead>
          <tbody>
            {list.map(c => (
              <tr key={c.id}>
                <td style={{ ...C.td, fontWeight: 600, color: "#fff" }}>{c.name}</td>
                <td style={C.td}>{c.city}</td>
                <td style={C.td}><code style={{ color: "#10B981", fontSize: 12 }}>{c.contact}</code></td>
                <td style={{ ...C.td, fontSize: 12 }}>{c.hours}</td>
                <td style={C.td}><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{c.services.map(sv => badge("#06B6D4", sv))}</div></td>
                <td style={C.td}><Toggle on={c.active} onChange={() => save(list.map(x => x.id === c.id ? { ...x, active: !x.active } : x))} /></td>
                <td style={C.td}><div style={{ display: "flex", gap: 6 }}><button style={C.btnGhost} onClick={() => openEdit(c)}>✏️ Edit</button><button style={C.btnDanger} onClick={() => save(list.filter(x => x.id !== c.id))}>🗑️</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={editing ? "Edit Clinic" : "Add New Clinic"} onClose={() => setModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[["Clinic Name", "name", "e.g. Parirenyatwa Hospital"], ["City", "city", "e.g. Harare"], ["Contact", "contact", "e.g. +263 242 701000"], ["Hours", "hours", "e.g. Mon-Fri 8am-4pm"]].map(([l, k, p]) => (
              <div key={k}><label style={C.lbl}>{l}</label><input style={C.input} placeholder={p} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} /></div>
            ))}
            <div><label style={C.lbl}>Services (comma separated)</label><input style={C.input} placeholder="e.g. HIVST, PrEP, Condoms" value={form.services} onChange={e => setForm(f => ({ ...f, services: e.target.value }))} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Toggle on={form.active} onChange={v => setForm(f => ({ ...f, active: v }))} /><span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)" }}>Active (visible to users)</span></div>
            <div style={{ display: "flex", gap: 10 }}><button style={{ ...C.btnGhost, flex: 1, justifyContent: "center" }} onClick={() => setModal(false)}>Cancel</button><button style={{ ...C.btnPrimary, flex: 1, justifyContent: "center" }} onClick={submit}>💾 Save Clinic</button></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── BOT BRAIN PANEL ──
function BotBrain() {
  const [list, setList] = useState(() => getAdminData("bot", DEFAULT_BOT));
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ trigger: "", category: "general", response: "", active: true });
  const catColor = { general: "#10B981", first_aid: "#F59E0B", emergency: "#EF4444", chronic: "#8B5CF6" };
  const save = d => { saveAdminData("bot", d); setList(d); };
  const submit = () => {
    const item = { ...form, id: editing ? editing.id : Date.now() };
    save(editing ? list.map(r => r.id === editing.id ? item : r) : [...list, item]);
    setModal(false); setEditing(null);
    setForm({ trigger: "", category: "general", response: "", active: true });
  };
  const openEdit = r => { setEditing(r); setForm(r); setModal(true); };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div><h1 style={C.h1}>🤖 Bot Brain Editor</h1><p style={C.sub}>Manage triggers and responses for the Chengeto AI assistant.</p></div>
        <button style={C.btnPrimary} onClick={() => { setEditing(null); setForm({ trigger: "", category: "general", response: "", active: true }); setModal(true); }}>+ Add Response</button>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {list.map(r => (
          <div key={r.id} style={{ ...C.card, opacity: r.active ? 1 : 0.55 }}>
            <div style={{ padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>{badge(catColor[r.category] || "#10B981", r.category)}{!r.active && badge("#6B7280", "Inactive")}</div>
                <div style={{ marginBottom: 6 }}><span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Triggers: </span><code style={{ fontSize: 12, color: "#F59E0B" }}>{r.trigger}</code></div>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{r.response}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                <Toggle on={r.active} onChange={() => save(list.map(x => x.id === r.id ? { ...x, active: !x.active } : x))} />
                <div style={{ display: "flex", gap: 6 }}><button style={C.btnGhost} onClick={() => openEdit(r)}>✏️</button><button style={C.btnDanger} onClick={() => save(list.filter(x => x.id !== r.id))}>🗑️</button></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={editing ? "Edit Bot Response" : "Add Bot Response"} onClose={() => setModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={C.lbl}>Trigger Keywords (comma separated)</label><input style={C.input} placeholder="e.g. headache, head pain" value={form.trigger} onChange={e => setForm(f => ({ ...f, trigger: e.target.value }))} /><p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.3)", marginTop: 5 }}>When a user types any of these, this response fires.</p></div>
            <div><label style={C.lbl}>Mode Category</label><select style={C.input} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>{["general", "first_aid", "emergency", "chronic"].map(c => <option key={c} value={c} style={{ background: "#1a2332" }}>{c}</option>)}</select></div>
            <div><label style={C.lbl}>Response Text</label><textarea style={C.textarea} placeholder="Type the bot response here..." value={form.response} onChange={e => setForm(f => ({ ...f, response: e.target.value }))} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Toggle on={form.active} onChange={v => setForm(f => ({ ...f, active: v }))} /><span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)" }}>Active</span></div>
            <div style={{ display: "flex", gap: 10 }}><button style={{ ...C.btnGhost, flex: 1, justifyContent: "center" }} onClick={() => setModal(false)}>Cancel</button><button style={{ ...C.btnPrimary, flex: 1, justifyContent: "center" }} onClick={submit}>💾 Save</button></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── ALERTS PANEL ──
function Alerts() {
  const [list, setList] = useState(() => getAdminData("alerts", DEFAULT_ALERTS));
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", body: "", type: "info", active: true, date: "" });
  const typeColor = { info: "#06B6D4", success: "#10B981", warning: "#F59E0B", danger: "#EF4444" };
  const save = d => { saveAdminData("alerts", d); setList(d); };
  const submit = () => {
    const item = { ...form, id: editing ? editing.id : Date.now() };
    save(editing ? list.map(a => a.id === editing.id ? item : a) : [...list, item]);
    setModal(false); setEditing(null);
    setForm({ title: "", body: "", type: "info", active: true, date: "" });
  };
  const openEdit = a => { setEditing(a); setForm(a); setModal(true); };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div><h1 style={C.h1}>🔔 Health Alerts</h1><p style={C.sub}>Publish announcements shown to all users on the home screen.</p></div>
        <button style={C.btnPrimary} onClick={() => { setEditing(null); setForm({ title: "", body: "", type: "info", active: true, date: "" }); setModal(true); }}>+ New Alert</button>
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {list.map(a => (
          <div key={a.id} style={{ ...C.card, borderLeft: "4px solid " + (typeColor[a.type] || "#06B6D4"), opacity: a.active ? 1 : 0.55 }}>
            <div style={{ padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                  {badge(typeColor[a.type] || "#06B6D4", a.type)}{!a.active && badge("#6B7280", "Inactive")}
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: "auto" }}>📅 {a.date}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{a.body}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                <Toggle on={a.active} onChange={() => save(list.map(x => x.id === a.id ? { ...x, active: !x.active } : x))} />
                <div style={{ display: "flex", gap: 6 }}><button style={C.btnGhost} onClick={() => openEdit(a)}>✏️ Edit</button><button style={C.btnDanger} onClick={() => save(list.filter(x => x.id !== a.id))}>🗑️</button></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={editing ? "Edit Alert" : "New Health Alert"} onClose={() => setModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={C.lbl}>Alert Title</label><input style={C.input} placeholder="e.g. Free HIV Testing Day" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div><label style={C.lbl}>Message Body</label><textarea style={C.textarea} placeholder="Type the alert message..." value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label style={C.lbl}>Type</label><select style={C.input} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>{["info", "success", "warning", "danger"].map(t => <option key={t} value={t} style={{ background: "#1a2332" }}>{t}</option>)}</select></div>
              <div><label style={C.lbl}>Date</label><input type="date" style={C.input} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Toggle on={form.active} onChange={v => setForm(f => ({ ...f, active: v }))} /><span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)" }}>Publish immediately</span></div>
            <div style={{ display: "flex", gap: 10 }}><button style={{ ...C.btnGhost, flex: 1, justifyContent: "center" }} onClick={() => setModal(false)}>Cancel</button><button style={{ ...C.btnPrimary, flex: 1, justifyContent: "center" }} onClick={submit}>🚀 Publish Alert</button></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── CONTENT PANEL ──
function ContentMgr() {
  const [list, setList] = useState(() => getAdminData("content", DEFAULT_CONTENT));
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", category: "HIV", status: "draft" });
  const cats = ["HIV", "Pregnancy", "Mental Health", "Chronic Conditions", "First Aid", "Nutrition"];
  const stColor = { published: "#10B981", draft: "#F59E0B", archived: "#6B7280" };
  const save = d => { saveAdminData("content", d); setList(d); };
  const submit = () => {
    const item = { ...form, id: editing ? editing.id : Date.now(), views: editing ? editing.views : 0, lastEdited: new Date().toISOString().slice(0, 10) };
    save(editing ? list.map(c => c.id === editing.id ? item : c) : [...list, item]);
    setModal(false); setEditing(null);
    setForm({ title: "", category: "HIV", status: "draft" });
  };
  const openEdit = c => { setEditing(c); setForm(c); setModal(true); };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div><h1 style={C.h1}>📄 Content Manager</h1><p style={C.sub}>Manage health education articles and modules on the platform.</p></div>
        <button style={C.btnPrimary} onClick={() => { setEditing(null); setForm({ title: "", category: "HIV", status: "draft" }); setModal(true); }}>+ New Article</button>
      </div>
      <div style={C.card}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Title", "Category", "Status", "Views", "Last Edited", "Actions"].map(h => <th key={h} style={C.th}>{h}</th>)}</tr></thead>
          <tbody>
            {list.map(c => (
              <tr key={c.id}>
                <td style={{ ...C.td, fontWeight: 600, color: "#fff" }}>{c.title}</td>
                <td style={C.td}>{badge("#8B5CF6", c.category)}</td>
                <td style={C.td}>{badge(stColor[c.status] || "#6B7280", c.status)}</td>
                <td style={{ ...C.td, color: "#10B981", fontWeight: 700 }}>{c.views.toLocaleString()}</td>
                <td style={{ ...C.td, fontSize: 12 }}>{c.lastEdited}</td>
                <td style={C.td}><div style={{ display: "flex", gap: 6 }}><button style={C.btnGhost} onClick={() => openEdit(c)}>✏️ Edit</button><button style={C.btnDanger} onClick={() => save(list.filter(x => x.id !== c.id))}>🗑️</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={editing ? "Edit Article" : "New Article"} onClose={() => setModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={C.lbl}>Article Title</label><input style={C.input} placeholder="e.g. Understanding HIV Prevention" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label style={C.lbl}>Category</label><select style={C.input} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>{cats.map(ct => <option key={ct} value={ct} style={{ background: "#1a2332" }}>{ct}</option>)}</select></div>
              <div><label style={C.lbl}>Status</label><select style={C.input} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>{["draft", "published", "archived"].map(st => <option key={st} value={st} style={{ background: "#1a2332" }}>{st}</option>)}</select></div>
            </div>
            <div style={{ display: "flex", gap: 10 }}><button style={{ ...C.btnGhost, flex: 1, justifyContent: "center" }} onClick={() => setModal(false)}>Cancel</button><button style={{ ...C.btnPrimary, flex: 1, justifyContent: "center" }} onClick={submit}>💾 Save</button></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── ANALYTICS PANEL ──
function Analytics() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const ud = [80, 120, 180, 240, 280, 310, 342];
  const bd = [200, 450, 600, 820, 950, 1100, 1284];
  const maxU = Math.max(...ud), maxB = Math.max(...bd);
  const sections = [
    { name: "HIV Education", pct: 92, color: "#EF4444" },
    { name: "Pregnancy / Contraception", pct: 78, color: "#EC4899" },
    { name: "Clinic Locator", pct: 65, color: "#06B6D4" },
    { name: "AI Bot (Chengeto)", pct: 58, color: "#F59E0B" },
    { name: "Mental Health", pct: 42, color: "#8B5CF6" },
  ];
  return (
    <div>
      <div style={{ marginBottom: 24 }}><h1 style={C.h1}>📊 Analytics</h1><p style={C.sub}>Platform usage trends. (Live data requires backend connection — showing mock data.)</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {[["👥 User Growth", ud, maxU, "#10B981", "#059669"], ["🤖 Bot Conversations", bd, maxB, "#F59E0B", "#D97706"]].map(([title, data, mx, c1, c2]) => (
          <div key={title} style={C.card}>
            <div style={C.cardHeader}><span style={C.cardTitle}>{title}</span></div>
            <div style={{ padding: "20px 22px 12px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
                {data.map((v, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: "100%", background: `linear-gradient(180deg,${c1},${c2})`, borderRadius: "4px 4px 0 0", height: `${(v / mx) * 110}px`, position: "relative" }}>
                      <span style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: c1, fontWeight: 700 }}>{v}</span>
                    </div>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={C.card}>
        <div style={C.cardHeader}><span style={C.cardTitle}>🔥 Most Visited Sections</span></div>
        <div style={{ padding: "12px 22px 20px" }}>
          {sections.map(s => (
            <div key={s.name} style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{s.name}</span>
                <span style={{ fontSize: 12, color: s.color, fontWeight: 700 }}>{s.pct}%</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 99 }}>
                <div style={{ height: "100%", width: s.pct + "%", background: s.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SETTINGS PANEL ──
function Settings({ onLogout }) {
  const [saved, setSaved] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [regEnabled, setRegEnabled] = useState(true);
  const [botEnabled, setBotEnabled] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  return (
    <div>
      <div style={{ marginBottom: 24 }}><h1 style={C.h1}>⚙️ Settings</h1><p style={C.sub}>Configure admin account and platform behaviour.</p></div>
      <div style={{ display: "grid", gap: 20, maxWidth: 600 }}>
        <div style={C.card}>
          <div style={C.cardHeader}><span style={C.cardTitle}>Admin Account</span></div>
          <div style={C.cardBody}>
            <div style={{ marginBottom: 14 }}><label style={C.lbl}>Username</label><input style={C.input} defaultValue="admin" /></div>
            <div style={{ marginBottom: 20 }}><label style={C.lbl}>New Password</label><input type="password" style={C.input} placeholder="Leave blank to keep current" /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button style={C.btnPrimary} onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>💾 Save Changes</button>
              {saved && <span style={{ fontSize: 13, color: "#10B981" }}>✓ Saved!</span>}
            </div>
          </div>
        </div>
        <div style={C.card}>
          <div style={C.cardHeader}><span style={C.cardTitle}>Platform Settings</span></div>
          <div style={C.cardBody}>
            {[["Enable Health Alerts on Homepage", alertsEnabled, setAlertsEnabled], ["Allow New User Registrations", regEnabled, setRegEnabled], ["Enable AI Bot", botEnabled, setBotEnabled], ["Maintenance Mode", maintenance, setMaintenance]].map(([label, val, setter]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)" }}>{label}</span>
                <Toggle on={val} onChange={setter} />
              </div>
            ))}
          </div>
        </div>
        <div style={C.card}>
          <div style={C.cardHeader}><span style={C.cardTitle}>Danger Zone</span></div>
          <div style={C.cardBody}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>These actions cannot be undone.</p>
            <button style={C.btnDanger} onClick={onLogout}>🚪 Sign Out of Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── LOGIN SCREEN ──
function Login({ onLogin }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  const submit = e => {
    e.preventDefault(); setLoading(true); setErr("");
    setTimeout(() => {
      if (u.trim() === ADMIN_CREDENTIALS.username && p.trim() === ADMIN_CREDENTIALS.password) { saveAdminSession(); onLogin(); }
      else setErr("Invalid username or password. Please try again.");
      setLoading(false);
    }, 700);
  };
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0A0F1A,#0D1B2E)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(16,185,129,0.08),transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.06),transparent 70%)" }} />
      </div>
      <div style={{ width: "100%", maxWidth: 380, position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 60, height: 60, background: "linear-gradient(135deg,#10B981,#059669)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 26 }}>🛡️</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Admin Portal</h1>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.4)" }}>Powered by PodMyth · Restricted Access</p>
        </div>
        <form onSubmit={submit} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 28 }}>
          <div style={{ marginBottom: 14 }}><label style={C.lbl}>Admin Username</label><input style={C.input} placeholder="Enter username" value={u} onChange={e => setU(e.target.value)} autoComplete="username" /></div>
          <div style={{ marginBottom: 20 }}><label style={C.lbl}>Password</label><input type="password" style={C.input} placeholder="Enter password" value={p} onChange={e => setP(e.target.value)} autoComplete="current-password" /></div>
          {err && <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}><p style={{ fontSize: 13, color: "#EF4444", margin: 0 }}>{err}</p></div>}
          <button type="submit" style={{ ...C.btnPrimary, width: "100%", justifyContent: "center", padding: 13, fontSize: 14, borderRadius: 10, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? "Authenticating..." : "🔐 Sign In to Dashboard"}
          </button>
          <p style={{ textAlign: "center", fontSize: 11.5, color: "rgba(255,255,255,0.2)", marginTop: 16 }}>Restricted to authorised PodMyth administrators only.</p>
        </form>
      </div>
    </div>
  );
}

// ── SIDEBAR NAV ──
const NAV = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "clinics", label: "Clinics", icon: "🏥" },
  { id: "bot", label: "Bot Brain", icon: "🤖" },
  { id: "alerts", label: "Health Alerts", icon: "🔔" },
  { id: "content", label: "Content", icon: "📄" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

// ── MAIN EXPORT ──
export default function AdminDashboard({ onExitAdmin }) {
  const [loggedIn, setLoggedIn] = useState(() => !!getAdminSession());
  const [panel, setPanel] = useState("overview");
  const logout = () => { clearAdminSession(); setLoggedIn(false); };
  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;
  const panels = {
    overview: <Overview />,
    clinics: <Clinics />,
    bot: <BotBrain />,
    alerts: <Alerts />,
    content: <ContentMgr />,
    analytics: <Analytics />,
    settings: <Settings onLogout={logout} />,
  };
  return (
    <div style={C.page}>
      <aside style={C.sidebar}>
        <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#10B981,#059669)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🛡️</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>PodMyth</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "1.5px" }}>Admin Dashboard</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "12px" }}>
          {NAV.map(n => (
            <button key={n.id} style={C.navItem(panel === n.id)} onClick={() => setPanel(n.id)}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.04)", borderRadius: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>Signed in as</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>admin@podmyth.app</div>
          </div>
          {onExitAdmin && <button style={{ ...C.navItem(false), marginBottom: 4 }} onClick={onExitAdmin}>👁️ View App</button>}
          <button style={{ ...C.navItem(false), color: "rgba(239,68,68,0.7)" }} onClick={logout}>🚪 Sign Out</button>
        </div>
      </aside>
      <main style={C.main}>{panels[panel]}</main>
    </div>
  );
}

