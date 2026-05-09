import Link from 'next/link';
import { getPost } from '@/lib/blog-posts';

const post = getPost('5-letter-words-with-no-vowels');

export const metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
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

export default function FiveLetterWordsWithNoVowelsPage() {
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
            Few Wordle puzzles feel as cruel as the day the answer has no A, E, I, O, or U. You burn three guesses
            testing the usual suspects, watch every tile come back gray, and suddenly realize the answer is hiding
            behind a Y — or no vowel at all. Here&apos;s the complete cheat sheet of 5-letter words with no standard
            vowels, plus a strategy for finding them fast.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Why Vowel-Free Words Wreck Wordle Streaks</h2>
          <p>
            Most starter words are vowel-heavy by design — CRANE, SLATE, AUDIO, RAISE — because every common Wordle
            answer has at least one A, E, I, O, or U. Except when it doesn&apos;t. A handful of valid answers contain
            only consonants and Y, which functions as a vowel in words like GYPSY or NYMPH. When the answer is one of
            those, your usual openers can return five gray tiles and leave you flying blind on guess two.
          </p>
          <p>
            The good news: the list of 5-letter words with no A, E, I, O, or U is small enough to memorize in an
            afternoon. Once you know the pattern, a row of grays from CRANE or SLATE becomes a clue, not a disaster.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">The Complete List</h2>
          <p>
            These are the 5-letter words with no standard vowels that show up in major dictionaries and Wordle&apos;s
            answer or guess lists:
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-6 pl-2 font-mono text-gray-900">
            <li>CRWTH</li>
            <li>CRYPT</li>
            <li>DRYLY</li>
            <li>FLYBY</li>
            <li>GHYLL</li>
            <li>GLYPH</li>
            <li>GYPSY</li>
            <li>LYMPH</li>
            <li>LYNCH</li>
            <li>MYRRH</li>
            <li>MYTHS</li>
            <li>NYMPH</li>
            <li>PHPHT</li>
            <li>PSYCH</li>
            <li>PYGMY</li>
            <li>RYOTS</li>
            <li>SHYLY</li>
            <li>SIXTH</li>
            <li>SLYLY</li>
            <li>SPHYNX</li>
            <li>SYLPH</li>
            <li>SYNCH</li>
            <li>SYNTH</li>
            <li>THYMY</li>
            <li>TRYST</li>
            <li>WRYLY</li>
            <li>XYLYL</li>
          </ul>
          <p className="text-sm text-gray-500">
            Note: most of these use Y as a working vowel. A few — like SIXTH and PHPHT — get by with no vowel sound at
            all. SPHYNX is six letters but is included because it shows up in many no-vowel guides; the strict 5-letter
            entries are the ones that matter for Wordle.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Strategy When You Suspect a Vowel-Free Answer</h2>
          <p>
            If your first guess returns nothing on the vowels, don&apos;t waste a turn testing more vowels. Pivot
            immediately. Here&apos;s how to play it:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Test Y next.</strong> Almost every common vowel-free 5-letter word contains a Y. A guess like
              GYPSY or NYMPH covers Y plus three high-value consonants in one move.
            </li>
            <li>
              <strong>Cover the workhorse consonants.</strong> Words on this list lean heavily on L, M, N, P, R, S,
              T, and H. NYMPH and CRYPT together test ten distinct consonants — that&apos;s usually enough to lock
              the answer in.
            </li>
            <li>
              <strong>Watch for double letters.</strong> MYRRH, GHYLL, and PYGMY repeat letters. If your guesses
              account for every letter in the alphabet but one slot still won&apos;t resolve, suspect a duplicate.
            </li>
            <li>
              <strong>Don&apos;t panic on hard mode.</strong> If you&apos;re locked into known letters, work outward
              from Y. Y in position two (CRYPT, GLYPH, NYMPH, TRYST) is by far the most common.
            </li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">A Quick Two-Word Combo</h2>
          <p>
            If your opener tells you there are no vowels in the answer, the cleanest second guess is <strong>NYMPH</strong>
            followed by <strong>CRYPT</strong>. Together these cover C, R, Y, P, T, N, M, H — the eight most common
            letters in the no-vowel pool. After two guesses you&apos;ll usually have enough information to solve on
            turn three.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Find Every 5-Letter Word That Fits</h2>
          <p>
            When the puzzle gets weirder than a memorized list can handle, our tools take over. Browse our full
            <Link href="/5-letter-words-starting-with/a" className="text-blue-600 hover:underline"> 5-letter words by starting letter</Link>
            collection or jump straight to the <Link href="/" className="text-blue-600 hover:underline">Word Unscrambler</Link> to
            type in your known greens and yellows and see every legal answer that matches. Next time a vowel-free
            puzzle hits, you&apos;ll be ready before the third guess.
          </p>
          <p className="font-medium">Good luck out there.</p>
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
