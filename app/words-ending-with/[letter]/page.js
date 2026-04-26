import path from 'path';
import fs from 'fs';
import Link from 'next/link';
import BackToTop from '@/components/BackToTop';

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

export async function generateStaticParams() {
  return LETTERS.map(letter => ({ letter }));
}

export async function generateMetadata({ params }) {
  const { letter } = await params;
  return {
    title: `Words Ending With ${letter.toUpperCase()} - Word List for Scrabble & WWF`,
    description: `Complete list of words ending with ${letter.toUpperCase()}. Valid for Scrabble, Words with Friends, and other word games.`,
  };
}

function loadWords(letter) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'dictionaries', 'enable.json');
    if (!fs.existsSync(filePath)) return [];
    const words = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return words.filter(w => w.endsWith(letter.toLowerCase()));
  } catch { return []; }
}

export default async function WordsEndingWithPage({ params }) {
  const { letter } = await params;
  const allWords = loadWords(letter);

  const grouped = {};
  for (const word of allWords) {
    const len = word.length;
    if (!grouped[len]) grouped[len] = [];
    grouped[len].push(word);
  }
  const lengths = Object.keys(grouped).map(Number).sort((a, b) => a - b);

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">WordUnscrambler</Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/words-starting-with/a" className="hover:text-blue-200">Words Starting With</Link>
            <Link href="/words-ending-with/a" className="hover:text-blue-200">Words Ending With</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <span>Words Ending With {letter.toUpperCase()}</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Words Ending With {letter.toUpperCase()}
        </h1>
        <p className="text-gray-600 mb-6">
          Found <strong>{allWords.length.toLocaleString()}</strong> words ending with <strong>{letter.toUpperCase()}</strong>. Valid for Scrabble and Words with Friends.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {LETTERS.map(l => (
            <Link key={l} href={`/words-ending-with/${l}`}
              className={`w-9 h-9 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${l === letter ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`}>
              {l.toUpperCase()}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {lengths.map(len => (
            <a key={len} href={`#length-${len}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors">
              {len} letters ({grouped[len].length})
            </a>
          ))}
        </div>

        {lengths.map(len => (
          <div key={len} id={`length-${len}`} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
              {len}-letter words ending with {letter.toUpperCase()} ({grouped[len].length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {grouped[len].map(word => (
                <span key={word} className="inline-block bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-800">
                  {word}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-400 mt-8">
        <p>© {new Date().getFullYear()} WordUnscrambler</p>
      </footer>
      <BackToTop />
    </main>
  );
}
