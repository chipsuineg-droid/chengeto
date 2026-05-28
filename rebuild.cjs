const fs = require('fs');
const lines = fs.readFileSync('transcript.jsonl', 'utf8').split('\n').filter(Boolean);

let appJsx = "";

for (let i = 0; i <= 1227; i++) {
  const line = lines[i];
  try {
    const parsed = JSON.parse(line);
    if (!parsed.tool_calls || parsed.tool_calls.length === 0) continue;
    
    for (const call of parsed.tool_calls) {
      // The function arguments are directly in call.function.arguments string, we need to parse them
      const argsStr = call.function.arguments;
      const args = typeof argsStr === 'string' ? JSON.parse(argsStr) : argsStr;
      
      if (args && args.TargetFile && args.TargetFile.endsWith('App.jsx')) {
        if (call.function.name === 'write_to_file') {
          console.log("Writing App.jsx at step", parsed.step_index);
          appJsx = args.CodeContent;
        } else if (call.function.name === 'replace_file_content') {
          console.log("Replacing App.jsx at step", parsed.step_index);
          if (appJsx.includes(args.TargetContent)) {
            appJsx = appJsx.replace(args.TargetContent, args.ReplacementContent);
          } else {
            console.error("TargetContent NOT FOUND at step", parsed.step_index);
          }
        } else if (call.function.name === 'multi_replace_file_content') {
          console.log("Multi Replacing App.jsx at step", parsed.step_index);
          for (const chunk of args.ReplacementChunks) {
            if (appJsx.includes(chunk.TargetContent)) {
              appJsx = appJsx.replace(chunk.TargetContent, chunk.ReplacementContent);
            } else {
              console.error("Multi TargetContent NOT FOUND at step", parsed.step_index);
            }
          }
        }
      }
    }
  } catch (e) {
    // console.error(e);
  }
}

fs.writeFileSync('RESTORED_App.jsx', appJsx, 'utf8');
console.log("Done restoring App.jsx");
