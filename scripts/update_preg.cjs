const fs = require('fs');

const path = 'C:/Users/MY Laptop/.gemini/antigravity/scratch/chengeto/src/App.jsx';
let code = fs.readFileSync(path, 'utf8');

// Replace PREG_OPTIONS occurrences
code = code.replace(/PREG_OPTIONS/g, 'PREG_PREVENTION_METHODS');

// Fix the ID lookups in the bot logic (lines ~1009)
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "ec"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "ec-pill")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "iud-copper"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "copper-iud")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "pill"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "pop")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "injectable"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "depo-provera")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "condom-preg"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "female-condom")');

// Remove the old PREG_OPTIONS block which starts at `const PREG_OPTIONS = [` and ends at `];` before `const GAME_SCENARIOS`
const startIdx = code.indexOf('const PREG_PREVENTION_METHODS = [');
const endIdx = code.indexOf('const GAME_SCENARIOS = [');

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + code.substring(endIdx);
}

fs.writeFileSync(path, code);
console.log('App.jsx updated.');
