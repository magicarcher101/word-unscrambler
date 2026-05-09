import Link from 'next/link';
import { getPost } from '@/lib/blog-posts';

const post = getPost('high-scoring-scrabble-words-with-q-and-z');

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

export default function HighScoringScrabbleWordsWithQAndZPage() {
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
            In Scrabble, two letters tower over the rest of the rack: Q and Z. Each is worth 10 points — more than any
            other tile in the bag — and a single well-placed Q or Z on a premium square can swing an entire game.
            But these tiles also panic players, because they feel hard to play. Here&apos;s how to turn them into
            point-machines instead of dead weight.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Why Q and Z Are So Valuable</h2>
          <p>
            Both Q and Z are worth <strong>10 points</strong> at face value. Drop one on a double-letter square and
            you&apos;ve got 20 points from a single tile. Land it on a triple-letter while it&apos;s also part of a
            word covering a double- or triple-word? You&apos;re looking at 60+ points before bonuses. The reason these
            tiles intimidate players isn&apos;t the score — it&apos;s the limited pool of valid plays. Memorize the
            short list below and that fear disappears overnight.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Top 10 Q Words Without a U</h2>
          <p>
            The classic Scrabble myth is that Q always needs U. It doesn&apos;t. The TWL and SOWPODS dictionaries both
            accept a healthy list of Q-without-U words, mostly from Arabic, Hebrew, and Chinese loanwords. These ten
            should be in every serious player&apos;s memory bank:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>QI</strong> — life force; the single most useful Q word in the game (11 points on its own).</li>
            <li><strong>QAT</strong> — a leafy plant chewed as a stimulant; variant of khat.</li>
            <li><strong>QOPH</strong> — a Hebrew letter; pairs nicely on the board with vowels you already have.</li>
            <li><strong>QADI</strong> — a Muslim judge; a four-letter lifesaver when the bag is thin.</li>
            <li><strong>QANAT</strong> — an underground irrigation channel; great for using up two A&apos;s.</li>
            <li><strong>QIGONG</strong> — a Chinese system of breathing exercises.</li>
            <li><strong>QINDAR</strong> — a monetary unit of Albania.</li>
            <li><strong>QABALA</strong> — a variant spelling of cabala; valid in SOWPODS.</li>
            <li><strong>FAQIR</strong> — a Muslim or Hindu mendicant; useful when you draw an F as well.</li>
            <li><strong>SHEQEL</strong> — the basic monetary unit of Israel.</li>
          </ol>
          <p>
            Memorize <strong>QI</strong> first. It&apos;s the highest-frequency Q word in expert play because it
            scores big and only needs an I — which you almost always have.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Top 10 Z Words for Big Scores</h2>
          <p>
            Z words are easier to play than Q words because they don&apos;t depend on a single companion vowel. The
            real prize is finding Z words with double Zs or triple Zs — they unlock huge multipliers:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>ZYZZYVA</strong> — a tropical weevil; the highest-scoring common bingo with three Zs.</li>
            <li><strong>PIZZAZZ</strong> — flair or flamboyance; four Zs on a triple-word is a board-ender.</li>
            <li><strong>BUZZING</strong> — the present participle of buzz; an easy 7-letter bingo.</li>
            <li><strong>QUIZZED</strong> — combines Q and two Zs for one of the highest bingos in the game.</li>
            <li><strong>JAZZ</strong> — short, common, and worth 29 points before any premium squares.</li>
            <li><strong>ZAX</strong> — a tool for trimming roofing slates; 19 points and uses an X too.</li>
            <li><strong>ZEK</strong> — a Soviet labor camp inmate; perfect for a tight three-letter slot.</li>
            <li><strong>ZA</strong> — slang for pizza; the shortest legal Z word and a frequent rack-saver.</li>
            <li><strong>ZIZZ</strong> — a short nap or buzzing sound; three Zs in four letters.</li>
            <li><strong>FIZZY</strong> — bubbly; combines a Z, two consonants, and a Y for big premiums.</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Playing Q and Z on Premium Squares</h2>
          <p>
            The single biggest leap in your Scrabble score comes from the moment you stop playing Q or Z just to get
            rid of them. A few rules of thumb:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Aim for the triple-letter square.</strong> A Q or Z on a triple-letter is 30 points before the
              rest of the word. If you can also clip a double-word at the same time, you&apos;ve made 60+ on a
              two-tile play.
            </li>
            <li>
              <strong>Hold the Q until you have a U or an I.</strong> Trading three tiles to get one of those is
              almost always worth it on the next turn.
            </li>
            <li>
              <strong>Don&apos;t hoard the Z.</strong> Z plays come up often (ZA, ZAX, ZEE, ZIN, ZIT, ZOA). If you sit
              on it waiting for ZYZZYVA, you&apos;ll watch the premium squares get covered.
            </li>
            <li>
              <strong>Block your opponent.</strong> If you can&apos;t play a Z for 40+ yourself, look for a Z play
              that closes off a triple-word lane your opponent could otherwise exploit.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Find Every Q and Z Word on Your Rack</h2>
          <p>
            Memorizing word lists is great, but mid-game you need answers in seconds. Type your rack into our
            <Link href="/" className="text-blue-600 hover:underline"> Word Unscrambler</Link> and it will show
            every legal play sorted by Scrabble score — Q and Z words float right to the top. Filter by length,
            starting letter, or ending letter to match the open spots on your board. Next time a Q or Z lands on
            your rack, you&apos;ll be hunting bonuses, not stalling for time.
          </p>
          <p className="font-medium">Now go bingo.</p>
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
