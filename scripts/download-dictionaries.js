const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/dictionaries');

const SOURCES = {
  enable: {
    url: 'https://raw.githubusercontent.com/dolph/dictionary/master/enable1.txt',
    outputFile: 'enable.json',
    description: 'ENABLE (Words with Friends)',
  },
  twl: {
    url: 'https://raw.githubusercontent.com/elasticdog/dawg-tmp/master/twl06.txt',
    outputFile: 'twl.json',
    description: 'TWL06 (US/Canada Scrabble)',
  },
  sowpods: {
    url: 'https://raw.githubusercontent.com/jesstess/Scrabble/master/scrabble/sowpods.txt',
    outputFile: 'sowpods.json',
    description: 'SOWPODS (UK/International Scrabble)',
  },
};

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchText(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function parseWordList(text) {
  return text
    .split('\n')
    .map(w => w.trim().toLowerCase())
    .filter(w => w.length >= 2 && w.length <= 15 && /^[a-z]+$/.test(w));
}

async function downloadAll() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const [key, source] of Object.entries(SOURCES)) {
    console.log(`\nDownloading ${source.description}...`);
    try {
      const text = await fetchText(source.url);
      const words = parseWordList(text);
      const outputPath = path.join(OUTPUT_DIR, source.outputFile);
      fs.writeFileSync(outputPath, JSON.stringify(words));
      const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
      console.log(`✅ ${key}: ${words.length.toLocaleString()} words saved (${sizeKB}KB)`);
    } catch (err) {
      console.error(`❌ Failed to download ${key}:`, err.message);
    }
  }
  console.log('\n✅ Done! Run: npm run dev');
}

downloadAll();
