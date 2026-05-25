const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/App.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Dictionary of contractions
const replacements = {
  "don't": "do not",
  "Don't": "Do not",
  "it's": "it is",
  "It's": "It is",
  "you're": "you are",
  "You're": "You are",
  "I'm": "I am",
  "we're": "we are",
  "We're": "We are",
  "they're": "they are",
  "They're": "They are",
  "can't": "cannot",
  "Can't": "Cannot",
  "didn't": "did not",
  "Didn't": "Did not",
  "doesn't": "does not",
  "Doesn't": "Does not",
  "isn't": "is not",
  "Isn't": "Is not",
  "aren't": "are not",
  "Aren't": "Are not",
  "won't": "will not",
  "Won't": "Will not",
  " — ": " : ", // Replace em dashes surrounded by spaces
  "— ": ": ", // Replace em dashes at start
  " —": " :", // Replace em dashes at end
  "—": ":" // fallback
};

let changesCount = 0;

for (const [key, value] of Object.entries(replacements)) {
  // Use regex with word boundaries for contractions, but not for em-dashes
  let regex;
  if (key.includes('—')) {
    regex = new RegExp(key, 'g');
  } else {
    // Escape single quotes for regex
    const escapedKey = key.replace(/'/g, "\\'");
    regex = new RegExp(`\\b${escapedKey}\\b`, 'g');
  }
  
  const matches = content.match(regex);
  if (matches) {
    changesCount += matches.length;
    content = content.replace(regex, value);
  }
}

// Write back
fs.writeFileSync(targetFile, content, 'utf8');
console.log(`Successfully replaced ${changesCount} instances of contractions and em-dashes in App.jsx!`);
