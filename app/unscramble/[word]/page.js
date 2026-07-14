import path from 'path';
import fs from 'fs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackToTop from '@/components/BackToTop';
import UnscrambleForm from '@/components/UnscrambleForm';
import HomepageSections from '@/components/HomepageSections';

export const dynamicParams = false;

const SCRABBLE_SCORES = {
  a:1,e:1,i:1,l:1,n:1,o:1,r:1,s:1,t:1,u:1,
  d:2,g:2,
  b:3,c:3,m:3,p:3,
  f:4,h:4,v:4,w:4,y:4,
  k:5,
  j:8,x:8,
  q:10,z:10,
};

function scoreOf(word) {
  let s = 0;
  for (const ch of word.toLowerCase()) s += SCRABBLE_SCORES[ch] || 0;
  return s;
}

function badgeClass(score) {
  if (score >= 15) return 'bg-red-100 text-red-700';
  if (score >= 10) return 'bg-orange-100 text-orange-700';
  if (score >= 6)  return 'bg-yellow-100 text-yellow-700';
  return 'bg-gray-100 text-gray-500';
}

let cachedIndex = null;
function getIndex() {
  if (cachedIndex) return cachedIndex;
  const filePath = path.join(process.cwd(), 'public', 'dictionaries', 'twl.json');
  const words = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const index = new Map();
  for (const w of words) {
    const key = w.toLowerCase().split('').sort().join('');
    if (!index.has(key)) index.set(key, []);
    index.get(key).push(w);
  }
  cachedIndex = index;
  return index;
}

function keyOf(letters) {
  return letters.toLowerCase().split('').sort().join('');
}

function findAllWords(letters) {
  const index = getIndex();
  const n = letters.length;
  const results = new Set();
  const seenSubsetKeys = new Set();
  for (let mask = 1; mask < (1 << n); mask++) {
    let sub = '';
    for (let i = 0; i < n; i++) if (mask & (1 << i)) sub += letters[i];
    const k = keyOf(sub);
    if (seenSubsetKeys.has(k)) continue;
    seenSubsetKeys.add(k);
    const hits = index.get(k);
    if (hits) for (const w of hits) results.add(w);
  }
  return Array.from(results);
}

export async function generateStaticParams() {
  const index = getIndex();
  const sampleKeys = ['abelst', 'achhiimnopps', 'abceghilnoprtuy'];
  const words = new Set();
  for (const key of sampleKeys) {
    const anagrams = index.get(key) || [];
    for (const w of anagrams) words.add(w.toLowerCase());
  }
  if (words.size === 0) words.add('tables');
  return Array.from(words).map(word => ({ word }));
}

export async function generateMetadata({ params }) {
  const { word } = await params;
  const upper = word.toUpperCase();
  return {
    title: `Unscramble ${upper} — Words Made From ${upper}`,
    description: `All valid Scrabble and Words with Friends words you can make from the letters ${upper.split('').join(' ')}. Sorted by length and Scrabble score.`,
    alternates: {
      canonical: `/unscramble/${word.toLowerCase()}`,
    },
  };
}

export default async function UnscramblePage({ params }) {
  const { word } = await params;
  const letters = word.toLowerCase();
  if (!/^[a-z]{2,15}$/.test(letters)) notFound();

  const results = findAllWords(letters);
  const grouped = {};
  for (const w of results) {
    (grouped[w.length] ||= []).push({ word: w, score: scoreOf(w) });
  }
  const lengths = Object.keys(grouped).map(Number).sort((a, b) => b - a);
  for (const L of lengths) {
    grouped[L].sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));
  }
  const upper = letters.toUpperCase();

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-blue-50 to-white pt-12 pb-6 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Unscramble {upper}</h1>
          <p className="text-lg text-gray-600 mb-6">
            Found <strong>{results.length.toLocaleString()}</strong> valid words made from the letters of <strong>{upper}</strong>. Uses the TWL (North American Scrabble) dictionary.
          </p>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {letters.split('').map((ch, i) => (
              <span key={i} className="w-11 h-11 flex flex-col items-center justify-center bg-yellow-100 border-2 border-yellow-400 rounded-lg font-bold text-lg text-gray-900 relative">
                {ch.toUpperCase()}
                <span className="absolute bottom-0.5 right-1 text-[10px] text-gray-600 font-normal">
                  {SCRABBLE_SCORES[ch] || 0}
                </span>
              </span>
            ))}
          </div>

          <UnscrambleForm initialLetters={upper} />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pt-4 pb-8 border-b border-gray-100">
        <p className="text-sm text-gray-700 mb-6">
          <strong>{upper}</strong> unscrambles into <strong>{results.length.toLocaleString()}</strong> valid words. Top-scoring plays:{' '}
          {(() => {
            const top = Object.values(grouped).flat().sort((a, b) => b.score - a.score).slice(0, 3);
            return top.map((t, i) => (
              <span key={t.word}>
                <strong>{t.word.toUpperCase()}</strong> ({t.score}){i < top.length - 1 ? ', ' : ''}
              </span>
            ));
          })()}
          . Valid in Scrabble (TWL) and Words with Friends.
        </p>

        {(() => {
          const anagrams = (grouped[letters.length] || []).map(x => x.word).filter(w => w.toLowerCase() !== letters);
          if (anagrams.length === 0) return null;
          return (
            <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm">
              <span className="font-semibold text-gray-700">Related anagrams: </span>
              {anagrams.slice(0, 8).map((w, i) => (
                <span key={w}>
                  <Link href={`/unscramble/${w.toLowerCase()}`} className="text-blue-600 hover:underline font-medium">{w.toUpperCase()}</Link>
                  {i < Math.min(anagrams.length, 8) - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          );
        })()}

        <div className="flex flex-wrap gap-2 mb-6">
          {lengths.map(L => (
            <a key={L} href={`#length-${L}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors">
              {L} letters ({grouped[L].length})
            </a>
          ))}
        </div>

        {lengths.map(L => (
          <div key={L} id={`length-${L}`} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
              {L}-letter words from {upper} ({grouped[L].length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {grouped[L].map(({ word: w, score }) => (
                <span key={w} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 transition-colors">
                  {w}
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${badgeClass(score)}`}>{score}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <HomepageSections />
      <BackToTop />
    </main>
  );
}
