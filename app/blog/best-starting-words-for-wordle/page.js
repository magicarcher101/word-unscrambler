import Link from 'next/link';
import { getPost } from '@/lib/blog-posts';

const post = getPost('best-starting-words-for-wordle');

export const metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `https://wordunscrambler.gg/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.description,
    type: 'article',
    publishedTime: post.date,
    url: `https://wordunscrambler.gg/blog/${post.slug}`,
  },
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric',
});

export default function BestStartingWordsForWordlePage() {
  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <nav className="mb-6 text-sm">
          <Link href="/blog" className="text-blue-600 hover:underline">← All articles</Link>
        </nav>

        <header className="mb-8">
          <p className="text-sm font-medium text-gray-500 mb-2">
            {dateFormatter.format(new Date(post.date))}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
        </header>

        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            If you&apos;re looking for an edge in your daily Wordle, picking the right opening word is the single
            biggest decision you&apos;ll make. The right starter narrows the puzzle from thousands of possibilities to
            just a handful in one move. Here&apos;s what makes a starting word great, plus the top 5 starters
            according to information theory and millions of player results.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">What Makes a Good Starting Word?</h2>
          <p>A great Wordle opener does three things at once:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Uses common letters.</strong> The five most frequent letters in English five-letter words are E,
              A, R, O, and T. The most common consonants overall are S, T, R, N, and L. A word loaded with these gives
              you the best odds of yellow or green tiles.
            </li>
            <li>
              <strong>Includes multiple vowels.</strong> Every Wordle answer contains at least one vowel, and most
              contain two. Hitting two vowels on turn one cuts the search space dramatically.
            </li>
            <li>
              <strong>Avoids repeated letters.</strong> &quot;FLUFF&quot; tests only three unique letters.
              &quot;SLATE&quot; tests five. Every duplicate is a wasted slot.
            </li>
          </ol>
          <p>
            A subtler factor is <strong>letter position frequency</strong>. The letter S is rarely the last letter of a
            Wordle answer (the official list excludes simple plurals), so a word like &quot;SOARE&quot; can score worse
            than its letter pool suggests. Good starters put common letters in plausible positions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">The Top 5 Starting Words</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6">1. CRANE</h3>
          <p>
            CRANE consistently ranks at the top in MIT-style information theory analyses. It tests two of the most
            common consonants (R, N), the most common vowels (A, E), and a strong opening letter (C). Best of all,
            every letter sits in a position where it commonly appears in Wordle answers.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6">2. SLATE</h3>
          <p>
            SLATE tests S, L, T — three of the top consonants — plus two top vowels. It&apos;s especially strong
            because A and E in the second and fifth positions are extremely common patterns. If you prefer a starter
            that frequently produces multiple greens, SLATE is the one.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6">3. AUDIO</h3>
          <p>
            AUDIO is the vowel-hunter&apos;s pick: four out of five letters are vowels (A, U, I, O), and the fifth is
            D. It rarely produces greens, but it almost always tells you exactly which vowels are in the answer —
            often eliminating thousands of candidates in a single turn. Pair it with a consonant-heavy second guess.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6">4. RAISE</h3>
          <p>
            RAISE balances vowels (A, I, E) with two of the most useful consonants (R, S). It&apos;s a favorite of
            speedrunners because it often produces three or more yellow tiles, which is more useful than two greens
            for narrowing the answer down.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6">5. STARE</h3>
          <p>
            STARE shares letters with SLATE and CRANE but offers a slightly different position test. The S in front
            and the E at the end help confirm or rule out two of the most common Wordle patterns at once.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Choosing Your Second Guess</h2>
          <p>
            After your opener, your second guess should test five <em>new</em> letters whenever possible. If you
            opened with CRANE and got nothing, try a word like POUTY or DOILY to cover O, U, T, P, Y, D, I, and L. This
            two-word strategy can rule out ten unique letters in two turns, leaving the answer almost solved.
          </p>
          <p>
            If your opener produced yellows or greens, use the second guess to test new common letters that fit around
            what you&apos;ve learned. Don&apos;t waste a turn just rearranging known letters unless you&apos;re on
            turn five or six.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Practical Tips</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Pick one starter and stick with it.</strong> Switching openers every day prevents you from
              learning their strengths and weaknesses.
            </li>
            <li>
              <strong>Don&apos;t chase clever words.</strong> A &quot;fun&quot; starter you saw online is rarely better
              than CRANE or SLATE.
            </li>
            <li>
              <strong>Save exotic words for hard mode.</strong> In normal mode, every guess should test new letters,
              not flex your vocabulary.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Stuck Mid-Game? Use Our Word Unscrambler</h2>
          <p>
            Once you have a few greens and yellows locked in, finding every valid five-letter word that fits your
            constraints is exactly what our <Link href="/" className="text-blue-600 hover:underline">Word Unscrambler</Link> was
            built for. Type in your known letters, filter by length and by starting or ending letter, and instantly
            see every possibility — sorted by Scrabble score so you&apos;ll learn new high-value words for your next
            game.
          </p>
          <p>
            You can also browse our curated A–Z lists of <Link href="/5-letter-words-starting-with/a" className="text-blue-600 hover:underline">5-letter words by starting letter</Link> and
            <Link href="/5-letter-words-ending-with/a" className="text-blue-600 hover:underline"> 5-letter words by ending letter</Link> when
            you want to study patterns ahead of your next puzzle.
          </p>
          <p className="font-medium">Happy Wordling.</p>
        </div>
      </article>

      <footer className="border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-400">
        <nav className="flex justify-center gap-6 mb-3">
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
          <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
        </nav>
        <p>© {new Date().getFullYear()} WordUnscrambler. All rights reserved.</p>
      </footer>
    </main>
  );
}
