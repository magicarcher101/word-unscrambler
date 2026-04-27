import UnscrambleForm from '@/components/UnscrambleForm';
import Link from 'next/link';

export const metadata = {
  title: 'Word Unscrambler - Unscramble Letters for Scrabble, Words with Friends',
  description: 'Instantly unscramble letters to find all possible words. Supports TWL, SOWPODS, and ENABLE dictionaries for Scrabble and Words with Friends.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Word Unscrambler</h1>
          <p className="text-lg text-gray-600 mb-8">Enter your letters and instantly find every possible word. Perfect for Scrabble, Words with Friends, and Wordle.</p>
          <UnscrambleForm />
        </div>
      </section>

      {/* 5 Letter Words Section */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-b border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">🟩 5 Letter Words</h2>
            <p className="text-sm text-gray-500 mt-1">Perfect for Wordle — browse by starting or ending letter</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Starting With</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5">
              {['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'].map(letter => (
                <Link key={letter} href={`/5-letter-words-starting-with/${letter}`}
                  className="block bg-green-50 border border-green-200 rounded-lg py-2 text-center text-sm font-bold text-green-700 hover:bg-green-100 hover:border-green-400 transition-all">
                  {letter.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Ending With</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5">
              {['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'].map(letter => (
                <Link key={letter} href={`/5-letter-words-ending-with/${letter}`}
                  className="block bg-yellow-50 border border-yellow-200 rounded-lg py-2 text-center text-sm font-bold text-yellow-700 hover:bg-yellow-100 hover:border-yellow-400 transition-all">
                  {letter.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse All Words Section */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-b border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Browse All Words A–Z</h2>
            <p className="text-sm text-gray-500 mt-1">Full word lists for Scrabble and Words with Friends</p>
          </div>
          <Link href="/words-ending-with/a" className="text-sm text-blue-600 hover:underline">Words Ending With →</Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'].map(letter => (
            <Link key={letter} href={`/words-starting-with/${letter}`}
              className="block bg-gray-50 border-2 border-gray-200 rounded-xl py-3 text-center text-sm font-bold text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
              {letter.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      {/* Dictionary info */}
      <section className="bg-gray-50 border-t border-gray-100 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Supported Dictionaries</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              { name: 'ENABLE', desc: 'Default dictionary for Words with Friends', badge: 'WWF' },
              { name: 'TWL / OCTWL', desc: 'Official Scrabble dictionary for US, Canada & Thailand', badge: 'Scrabble US' },
              { name: 'SOWPODS / CSW', desc: 'Official Scrabble dictionary for UK & rest of world', badge: 'Scrabble UK' },
            ].map(dict => (
              <div key={dict.name} className="bg-white border border-gray-200 rounded-lg p-4">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded mb-2">{dict.badge}</span>
                <h3 className="font-semibold text-gray-800">{dict.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{dict.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} WordUnscrambler. All rights reserved.</p>
      </footer>
    </main>
  );
}
