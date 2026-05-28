const fs = require('fs');
const lines = fs.readFileSync('transcript.jsonl', 'utf8').split('\n').filter(Boolean);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('write_to_file') && line.includes('App.jsx')) {
    const parsed = JSON.parse(line);
    console.log("Found write_to_file at line", i, "step:", parsed.step_index);
  }
}
