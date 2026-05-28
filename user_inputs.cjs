const fs = require('fs');
const lines = fs.readFileSync('transcript.jsonl', 'utf8').split('\n').filter(Boolean);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('"type":"USER_INPUT"')) {
    try {
      const parsed = JSON.parse(line);
      console.log(`Step ${parsed.step_index}: ${parsed.content.substring(0, 200)}`);
    } catch(e) {}
  }
}
