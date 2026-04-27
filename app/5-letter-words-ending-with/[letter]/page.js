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
    title: `5 Letter Words Ending With ${letter.toUpperCase()} - Wordle & Scrabble Word List`,
    description: `Complete list of 5 letter words ending with ${letter.toUpperCase()}. Perfect for Wordle, Scrabble, and Words with Friends.`,
  };
}

function loadWords(letter) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'dictionaries', 'enable.json');
    if (!fs.existsSync(filePath)) return [];
    const words = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return words.filter(w => w.length === 5 && w.endsWith(letter.toLowerCase()));
  } catch { return []; }
}

export default async function FiveLetterWordsEndingWithPage({ params }) {
  const { letter } = await params;
  const words = loadWords(letter);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/5-letter-words-ending-with/a" className="hover:text-blue-600">5 Letter Words</Link>
          <span className="mx-2">›</span>
          <span>Ending With {letter.toUpperCase()}</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          5 Letter Words Ending With {letter.toUpperCase()}
        </h1>
        <p className="text-gray-600 mb-6">
          Found <strong>{words.length.toLocaleString()}</strong> five-letter words ending with <strong>{letter.toUpperCase()}</strong>. Perfect for Wordle, Scrabble, and Words with Friends.
        </p>

        {/* Letter navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {LETTERS.map(l => (
            <Link key={l} href={`/5-letter-words-ending-with/${l}`}
              className={`w-9 h-9 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${l === letter ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`}>
              {l.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Wordle tip */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <p className="text-sm text-blue-800">
            <strong>🟩 Wordle tip:</strong> If you know your word ends with <strong>{letter.toUpperCase()}</strong>, 
            use this list to narrow down your guesses and solve the puzzle faster.
          </p>
        </div>

        {/* Word grid */}
        {words.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No 5-letter words found ending with {letter.toUpperCase()}.</div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {words.map(word => (
              <div key={word}
                className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-center text-sm font-mono font-medium text-gray-800 hover:border-blue-400 hover:bg-blue-50 transition-colors uppercase tracking-wider">
                {word}
              </div>
            ))}
          </div>
        )}

        {/* Related links */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Related Word Lists</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={`/5-letter-words-starting-with/${letter}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors">
              5 letter words starting with {letter.toUpperCase()}
            </Link>
            <Link href={`/words-ending-with/${letter}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors">
              All words ending with {letter.toUpperCase()}
            </Link>
            <Link href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Unscramble letters →
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-400 mt-8">
        <p>© {new Date().getFullYear()} WordUnscrambler</p>
      </footer>
      <BackToTop />
    </main>
  );
}
