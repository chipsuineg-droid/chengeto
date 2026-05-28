const fs = require('fs');
const lines = fs.readFileSync('transcript.jsonl', 'utf8').split('\n').filter(Boolean);

for (let i = 1220; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('App.jsx') && (line.includes('replace_file_content') || line.includes('multi_replace_file_content'))) {
     try {
       const p = JSON.parse(line);
       console.log("Found edit at step", p.step_index);
     } catch(e) {
       console.log("Found edit at line", i, "but could not parse");
     }
  }
}
