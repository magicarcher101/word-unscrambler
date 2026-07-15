import path from 'path';
import fs from 'fs';

let cachedAll = null;

function loadTwl() {
  if (cachedAll) return cachedAll;
  const filePath = path.join(process.cwd(), 'public', 'dictionaries', 'twl.json');
  cachedAll = JSON.parse(fs.readFileSync(filePath, 'utf-8')).map(w => w.toLowerCase());
  return cachedAll;
}

// Small hot seed pre-built at deploy time (fast build, low route count).
// All 3-letter TWL words ≈ 1,015 pages.
export function getStaticUnscrambleWords() {
  return loadTwl().filter(w => w.length === 3);
}

// Full URL list for the sitemap. Google crawls these; each first crawl
// warms the ISR cache. 3–5 letter TWL words ≈ 14,084 URLs.
export function getSitemapUnscrambleWords() {
  return loadTwl().filter(w => w.length >= 3 && w.length <= 5);
}
