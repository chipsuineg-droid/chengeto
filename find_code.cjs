const fs = require('fs');

const lines = fs.readFileSync('transcript.jsonl', 'utf8').split('\n').filter(Boolean);

let foundStep = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("Tertiary Institution")) {
    console.log("Found Tertiary Institution at index:", i);
    const parsed = JSON.parse(lines[i]);
    foundStep = parsed.step_index;
    console.log("Step index:", foundStep);
    break;
  }
}

let overlayStep = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("Update the card interaction so that when a user clicks any card, it opens into a full-page expanding overlay")) {
    console.log("Found overlay request at index:", i);
    const parsed = JSON.parse(lines[i]);
    overlayStep = parsed.step_index;
    console.log("Step index:", overlayStep);
    break;
  }
}

console.log("Done checking.");
