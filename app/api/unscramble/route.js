import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

function letterFreq(word) {
  const freq = {};
  for (const c of word) freq[c] = (freq[c] || 0) + 1;
  return freq;
}

function canMakeWord(wordFreq, inputFreq, wildcards) {
  let wildcardsNeeded = 0;
  for (const [c, n] of Object.entries(wordFreq)) {
    const available = inputFreq[c] || 0;
    if (available < n) wildcardsNeeded += n - available;
  }
  return wildcardsNeeded <= wildcards;
}

function loadDictionary(dictId) {
  const validDicts = ['enable', 'twl', 'sowpods'];
  if (!validDicts.includes(dictId)) dictId = 'enable';
  const filePath = path.join(process.cwd(), 'public', 'dictionaries', `${dictId}.json`);
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const letters = searchParams.get('letters') || '';
  const dictId = searchParams.get('dictionary') || 'enable';
  const minLength = parseInt(searchParams.get('minLength') || '2');
  const startsWith = (searchParams.get('startsWith') || '').toLowerCase();
  const endsWith = (searchParams.get('endsWith') || '').toLowerCase();
  const mustInclude = (searchParams.get('mustInclude') || '').toLowerCase();

  const cleanLetters = letters.toLowerCase().replace(/[^a-z?*]/g, '');
  if (cleanLetters.length < 2 || cleanLetters.length > 20) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const wildcards = (cleanLetters.match(/[?*]/g) || []).length;
  const pureLetters = cleanLetters.replace(/[?*]/g, '');
  const inputFreq = letterFreq(pureLetters);
  const maxLen = cleanLetters.length;

  const dictionary = loadDictionary(dictId);

  const matches = dictionary.filter(word => {
    if (word.length < minLength || word.length > maxLen) return false;
    if (startsWith && !word.startsWith(startsWith)) return false;
    if (endsWith && !word.endsWith(endsWith)) return false;
    if (mustInclude) {
      for (const ch of mustInclude) {
        if (!word.includes(ch)) return false;
      }
    }
    return canMakeWord(letterFreq(word), inputFreq, wildcards);
  });

  matches.sort((a, b) => b.length - a.length || a.localeCompare(b));

  const grouped = {};
  for (const word of matches) {
    const len = word.length;
    if (!grouped[len]) grouped[len] = [];
    grouped[len].push(word);
  }

  return NextResponse.json({ words: matches, grouped, total: matches.length });
}
