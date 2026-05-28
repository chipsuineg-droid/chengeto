const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Rename "University" -> "Tertiary Institution"
content = content.replace(/University/g, 'Tertiary Institution');
content = content.replace(/university/g, 'institution');
content = content.replace(/UNIVERSITIES/g, 'INSTITUTIONS');

// 2. Auth schema updates
content = content.replace(
  `const validateLogin = (studentId, password) => {`,
  `const validateLogin = (nickname, password) => {`
);
content = content.replace(
  `const id = studentId.trim().toUpperCase();`,
  `const nick = nickname.trim().toLowerCase();`
);
content = content.replace(
  `const demo = AUTH_DEMO_ACCOUNTS.find(a => a.studentId === id && a.password === password);`,
  `const demo = AUTH_DEMO_ACCOUNTS.find(a => (a.nickname || "").toLowerCase() === nick && a.password === password);`
);
content = content.replace(
  `if (demo) return { ...demo, studentId: id };`,
  `if (demo) return { ...demo, nickname: demo.nickname };`
);
content = content.replace(
  `const all = [...AUTH_DEMO_ACCOUNTS, ...getStoredUsers()];`,
  `const all = [...AUTH_DEMO_ACCOUNTS, ...getStoredUsers()];`
);
content = content.replace(
  `if (all.find(u => u.studentId === id)) return { error: "This Student ID is already registered." };`,
  `if (all.find(u => (u.nickname || "").toLowerCase() === nick)) return { error: "This nickname is already taken." };`
);

content = content.replace(
  `const registerUser = (studentId, password, name, institution, year, programme) => {`,
  `const registerUser = (nickname, password, institution, level) => {`
);
content = content.replace(
  `const id = studentId.trim().toUpperCase();`,
  `const nick = nickname.trim().toLowerCase();`
);
content = content.replace(
  `if (id.length < 5) return { error: "Student ID seems too short. Please check it." };`,
  `if (nick.length < 3) return { error: "Nickname must be at least 3 characters." };`
);
content = content.replace(
  `if (!name.trim()) return { error: "Please enter your full name." };`,
  ``
);
content = content.replace(
  `const newUser = { studentId: id, password, name: name.trim(), institution, year: parseInt(year), programme: programme.trim(), nickname: name.trim().split(' ')[0], avatarColor: '#059669', bio: '' };`,
  `const newUser = { nickname: nickname.trim(), password, institution, level, avatarColor: '#059669', bio: '' };`
);

// 3. State hooks for Auth
content = content.replace(
  `const [loginId, setLoginId] = useState("");`,
  `const [loginNick, setLoginNick] = useState("");`
);
content = content.replace(
  `const [regId, setRegId] = useState("");`,
  `const [regNick, setRegNick] = useState("");`
);
content = content.replace(`const [regName, setRegName] = useState("");`, ``);
content = content.replace(`const [regProgramme, setRegProgramme] = useState("");`, ``);
content = content.replace(`const [regYear, setRegYear] = useState("1");`, `const [regLevel, setRegLevel] = useState("1");`);

content = content.replace(
  `const user = validateLogin(loginId, loginPw);`,
  `const user = validateLogin(loginNick, loginPw);`
);
content = content.replace(
  `setLoginError("Incorrect Student ID or password. Please try again.");`,
  `setLoginError("Incorrect nickname or password. Please try again.");`
);

content = content.replace(
  `const result = registerUser(regId, regPw, regName, regUni, regYear, regProgramme);`,
  `const result = registerUser(regNick, regPw, regUni, regLevel);`
);

content = content.replace(
  `setLoginId(""); setLoginPw(""); setLoginError("");`,
  `setLoginNick(""); setLoginPw(""); setLoginError("");`
);

// Form Fields replacements
content = content.replace(
  `type="text" value={loginId} onChange={e => setLoginId(e.target.value)}`,
  `type="text" value={loginNick} onChange={e => setLoginNick(e.target.value)}`
);
content = content.replace(
  `placeholder={\`e.g. \${INSTITUTIONS.find(u=>u.id===loginUni)?.idFormat || 'R######X'}\`}`,
  `placeholder="e.g. Genius"`
);
content = content.replace(
  `setLoginId(a.studentId); setLoginPw(a.password); setLoginUni(a.institution);`,
  `setLoginNick(a.nickname); setLoginPw(a.password); setLoginUni(a.institution);`
);

// Remove the name input
content = content.replace(
  `<div>\n                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '5px' }}>Full Name</label>\n                      <input type="text" value={regName} onChange={e => setRegName(e.target.value)} placeholder="Your full name" required\n                        style={{ width: '100%', padding: '11px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />\n                    </div>`,
  ``
);

// Replace Student ID with Nickname in register
content = content.replace(
  `value={regId} onChange={e => setRegId(e.target.value)} placeholder={\`\${INSTITUTIONS.find(u=>u.id===regUni)?.idFormat || 'Student ID'}\`}`,
  `value={regNick} onChange={e => setRegNick(e.target.value)} placeholder="e.g. Genius"`
);

// Replace Year/Level
content = content.replace(
  `Year of Study`,
  `Level of Study`
);
content = content.replace(
  `value={regYear} onChange={e => setRegYear(e.target.value)}`,
  `value={regLevel} onChange={e => setRegLevel(e.target.value)}`
);

// Remove programme from register
content = content.replace(
  `<div>\n                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '5px' }}>Programme</label>\n                      <input type="text" value={regProgramme} onChange={e => setRegProgramme(e.target.value)} placeholder="e.g. BSc Computer Science" required\n                        style={{ width: '100%', padding: '11px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />\n                    </div>`,
  ``
);

// Update Auth Profile schema
content = content.replace(
  `const updateUserProfile = (studentId, updates) => {`,
  `const updateUserProfile = (nickname, updates) => {`
);
content = content.replace(
  `if (u.studentId === studentId) return { ...u, ...updates };`,
  `if ((u.nickname || "").toLowerCase() === nickname.toLowerCase()) return { ...u, ...updates };`
);
content = content.replace(
  `const updated = users.map(u => u.studentId === studentId ? { ...u, ...updates } : u);`,
  `const updated = users.map(u => (u.nickname || "").toLowerCase() === nickname.toLowerCase() ? { ...u, ...updates } : u);`
);

// In profile view:
content = content.replace(
  `const valid = validateLogin(currentUser.studentId, profPwCurrent);`,
  `const valid = validateLogin(currentUser.nickname, profPwCurrent);`
);
content = content.replace(
  `const updated = updateUserProfile(currentUser.studentId, updates);`,
  `const updated = updateUserProfile(currentUser.nickname, updates);`
);

// In demo accounts, add nickname since we removed studentId as login
content = content.replace(
  `{ studentId: 'R123456X', password: 'password123', name: 'Demo User', institution: 'uz', year: 2, programme: 'BSc Computer Science', avatarColor: '#2563eb', bio: 'Health advocate.' }`,
  `{ nickname: 'DemoUser', password: 'password123', institution: 'uz', level: '2', avatarColor: '#2563eb', bio: 'Health advocate.' }`
);

fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log("Replaced successfully!");
