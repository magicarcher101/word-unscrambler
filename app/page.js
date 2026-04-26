import UnscrambleForm from '@/components/UnscrambleForm';
import Link from 'next/link';

export const metadata = {
  title: 'Word Unscrambler - Unscramble Letters for Scrabble, Words with Friends',
  description: 'Instantly unscramble letters to find all possible words. Supports TWL, SOWPODS, and ENABLE dictionaries for Scrabble and Words with Friends.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">WordUnscrambler</Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/words-starting-with/a" className="hover:text-blue-200 transition-colors">Words Starting With</Link>
            <Link href="/words-ending-with/a" className="hover:text-blue-200 transition-colors">Words Ending With</Link>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Word Unscrambler</h1>
          <p className="text-lg text-gray-600 mb-8">Enter your letters and instantly find every possible word. Perfect for Scrabble, Words with Friends, and Wordle.</p>
          <UnscrambleForm />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Browse Words</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'].map(letter => (
            <Link key={letter} href={`/words-starting-with/${letter}`} className="block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors">
              Words starting with {letter.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

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
