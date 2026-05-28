const fs = require('fs');

const path = 'C:/Users/MY Laptop/.gemini/antigravity/scratch/chengeto/src/App.jsx';
let code = fs.readFileSync(path, 'utf8');

// Replace PREG_OPTIONS occurrences
code = code.replace(/PREG_OPTIONS/g, 'PREG_PREVENTION_METHODS');
code = code.replace(/PREG_CATEGORIES\.map/g, 'PREG_PREVENTION_CATEGORIES.map');

// Fix the ID lookups in the bot logic
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "ec"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "ec-pill")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "iud-copper"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "copper-iud")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "pill"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "pop")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "injectable"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "depo-provera")');
code = code.replace(/PREG_PREVENTION_METHODS\.find\(o => o\.id === "condom-preg"\)/g, 'PREG_PREVENTION_METHODS.find(o => o.id === "female-condom")');

// To avoid duplicate declaration error, we remove the declaration of `const PREG_PREVENTION_METHODS = [` if it's currently hardcoded in App.jsx (since it was PREG_OPTIONS previously)
// The old PREG_OPTIONS block was defined near const PREG_CATEGORIES
// Let's replace the block containing PREG_CATEGORIES and PREG_OPTIONS with empty string if they still exist.
// A safe way is to just delete the lines that define PREG_CATEGORIES and PREG_OPTIONS up to their closing brackets.
let lines = code.split('\n');
let inPregCat = false;
let inPregOpt = false;
let outLines = [];

for(let line of lines) {
    if (line.includes('const PREG_CATEGORIES = [')) {
        inPregCat = true;
    }
    if (line.includes('const PREG_PREVENTION_METHODS = [') && line.includes('Emergency Contraception') === false && line.includes('Short-Acting') === false) {
        // Wait, if we already replaced PREG_OPTIONS with PREG_PREVENTION_METHODS, the old block now looks like `const PREG_PREVENTION_METHODS = [`
        // We only want to delete the one with the old data (e.g. desc: { en: "..." }). Let's just use a heuristic:
        if (line.trim().startsWith('const PREG_PREVENTION_METHODS = [')) {
            inPregOpt = true;
        }
    }
    
    if (!inPregCat && !inPregOpt) {
        outLines.push(line);
    }
    
    if (inPregCat && line.includes('];')) {
        inPregCat = false;
        continue;
    }
    if (inPregOpt && line.includes('];') && !line.includes('GAME_SCENARIOS')) {
        inPregOpt = false;
        continue;
    }
}

fs.writeFileSync(path, outLines.join('\n'));
console.log('App.jsx updated.');
