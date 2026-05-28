const fs = require('fs');
const lines = fs.readFileSync('transcript.jsonl', 'utf8').split('\n').filter(Boolean);

for (let i = 1220; i < 1227; i++) {
  const line = lines[i];
  if (line.includes('App.jsx')) {
    console.log(line.substring(0, 500));
  }
}
