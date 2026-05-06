import Link from 'next/link';

export const metadata = {
  title: 'About',
  description: 'About WordUnscrambler.gg — a fast, free word unscrambler for Scrabble, Words with Friends, and Wordle.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">About WordUnscrambler</h1>
        <p className="text-lg text-gray-600 mb-8">
          A fast, free word unscrambler built for Scrabble, Words with Friends, and Wordle players.
        </p>

        <div className="space-y-6 text-gray-700">
          <p>
            WordUnscrambler.gg helps you turn a jumble of letters into every valid word you can play. Type in your
            tiles — including up to two blanks — and instantly see the full list of matches, sorted by length and
            Scrabble point score.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Dictionaries</h2>
          <p>
            We support the three dictionaries serious word-game players actually use:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>TWL / OCTWL</strong> — the official Scrabble dictionary for the US, Canada, and Thailand. This is
              our default.
            </li>
            <li>
              <strong>SOWPODS / CSW</strong> — the official Scrabble dictionary for the UK and the rest of the world.
            </li>
            <li>
              <strong>ENABLE</strong> — the default word list used by Words with Friends.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Unscramble up to 15 letters at once, with support for blank tiles.</li>
            <li>Filter by length, starting letter, ending letter, or letters that must be included.</li>
            <li>See Scrabble point scores for every word and sort by score or alphabetically.</li>
            <li>Browse curated A–Z lists of words by starting letter, ending letter, and 5-letter words for Wordle.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Contact</h2>
          <p>
            Found a bug, missing word, or have a feature request? Email us at
            <a href="mailto:support@elurashop.co" className="text-blue-600 hover:underline"> support@elurashop.co</a>.
          </p>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100">
          <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to home</Link>
        </div>
      </section>
    </main>
  );
}
