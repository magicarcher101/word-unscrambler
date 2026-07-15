import path from 'path';
import fs from 'fs';

let cached = null;

export function getStaticUnscrambleWords() {
  if (cached) return cached;
  const filePath = path.join(process.cwd(), 'public', 'dictionaries', 'twl.json');
  const words = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  cached = words.filter(w => w.length >= 3 && w.length <= 5).map(w => w.toLowerCase());
  return cached;
}
