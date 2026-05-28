const fs = require('fs');
const lines = fs.readFileSync('transcript.jsonl', 'utf8').split('\n').filter(Boolean);

let foundStep = -1;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes("Update the card interaction so that when a user clicks any card")) {
    const parsed = JSON.parse(line);
    foundStep = parsed.step_index;
    console.log("Found overlay request at step index:", foundStep);
    break;
  }
}

for (let i = 0; i < lines.length; i++) {
  try {
    const parsed = JSON.parse(lines[i]);
    if (parsed.step_index >= foundStep && parsed.tool_calls) {
      for (const call of parsed.tool_calls) {
        const name = call.function.name;
        if (name === 'replace_file_content' || name === 'multi_replace_file_content') {
           const argsStr = call.function.arguments;
           const args = typeof argsStr === 'string' ? JSON.parse(argsStr) : argsStr;
           
           if (args && args.TargetFile && args.TargetFile.endsWith('App.jsx')) {
              console.log("---- STEP", parsed.step_index, name, "----");
              if (name === 'replace_file_content') {
                console.log("TARGET:", args.TargetContent);
                console.log("REPLACEMENT:", args.ReplacementContent);
              } else {
                args.ReplacementChunks.forEach((c, idx) => {
                   console.log(`CHUNK ${idx} TARGET:`, c.TargetContent);
                   console.log(`CHUNK ${idx} REPLACEMENT:`, c.ReplacementContent);
                });
              }
           }
        }
      }
    }
  } catch(e) {}
}
