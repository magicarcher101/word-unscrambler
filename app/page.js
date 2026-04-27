import UnscrambleForm from '@/components/UnscrambleForm';
import Link from 'next/link';

export const metadata = {
  title: 'Word Unscrambler - Unscramble Letters for Scrabble, Words with Friends',
  description: 'Instantly unscramble letters to find all possible words. Supports TWL, SOWPODS, and ENABLE dictionaries for Scrabble and Words with Friends.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm font-medium mb-5 border border-white/20">
            ✨ Supports Scrabble, Words with Friends & Wordle
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
            Word Unscrambler
          </h1>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
            Enter your letters and instantly find every possible word — with Scrabble scores.
          </p>

          {/* Tool card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-left">
            <UnscrambleForm />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-8 text-center">
          {[
            { number: '178,691', label: 'TWL Words' },
            { number: '267,751', label: 'SOWPODS Words' },
            { number: '168,551', label: 'ENABLE Words' },
            { number: '3', label: 'Dictionaries' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-xl font-bold text-blue-600">{stat.number}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse Words */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">Browse Words A–Z</h2>
          <Link href="/words-ending-with/a" className="text-sm text-blue-600 hover:underline">
            Words Ending With →
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'].map(letter => (
            <Link
              key={letter}
              href={`/words-starting-with/${letter}`}
              className="block bg-white border-2 border-gray-200 rounded-xl py-3 text-center text-sm font-bold text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
            >
              {letter.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      {/* Dictionary info */}
      <section className="bg-white border-t border-gray-200 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Official Dictionaries</h2>
          <p className="text-gray-500 text-sm text-center mb-6">Always get the right answer for your game</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'ENABLE', desc: 'Default dictionary for Words with Friends', badge: 'WWF', color: 'green' },
              { name: 'TWL / OCTWL', desc: 'Official Scrabble dictionary for US, Canada & Thailand', badge: 'Scrabble US', color: 'blue' },
              { name: 'SOWPODS / CSW', desc: 'Official Scrabble dictionary for UK & rest of world', badge: 'Scrabble UK', color: 'purple' },
            ].map(dict => (
              <div key={dict.name} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${
                  dict.color === 'green' ? 'bg-green-100 text-green-700' :
                  dict.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                  'bg-blue-100 text-blue-700'
                }`}>{dict.badge}</span>
                <h3 className="font-bold text-gray-800 mb-1">{dict.name}</h3>
                <p className="text-sm text-gray-500">{dict.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-4 text-center text-sm text-gray-400 bg-white">
        <p className="font-medium text-gray-500 mb-1">WordUnscrambler.gg</p>
        <p>© {new Date().getFullYear()} WordUnscrambler. All rights reserved.</p>
      </footer>
    </main>
  );
}
