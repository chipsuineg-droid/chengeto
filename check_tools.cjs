const fs = require('fs');
const lines = fs.readFileSync('transcript.jsonl', 'utf8').split('\n').filter(Boolean);

for (let i = 0; i < 50; i++) {
  const line = lines[i];
  const parsed = JSON.parse(line);
  if (parsed.type === 'ACTION' || parsed.type === 'PLANNER_RESPONSE' || parsed.type === 'TOOL_CALL') {
    if (parsed.tool_calls && parsed.tool_calls.length > 0) {
      console.log("Step:", parsed.step_index, "Type:", parsed.type);
      console.log(JSON.stringify(parsed.tool_calls[0].function.name));
    }
  }
}
