export const blogPosts = [
  {
    slug: 'best-starting-words-for-wordle',
    title: 'Best Starting Words for Wordle: A Strategic Guide',
    description: 'The top 5 Wordle starting words backed by information theory — CRANE, SLATE, AUDIO, RAISE, and STARE — plus second-guess strategy and tips.',
    excerpt: 'The right opener narrows the puzzle from thousands of possibilities to just a handful in one move. Here are the top 5 starters that information theory and millions of player results agree on.',
    date: '2026-04-27',
  },
  {
    slug: 'high-scoring-scrabble-words-with-q-and-z',
    title: 'High Scoring Scrabble Words with Q and Z',
    description: 'The top Q and Z words for Scrabble — including QI, QOPH, QANAT, QIGONG, ZYZZYVA, PIZZAZZ, and BUZZING — plus how to play them on premium squares.',
    excerpt: 'Q and Z are worth 10 points each, but they panic most players. Memorize this short list and a single tile can swing an entire Scrabble game in your favor.',
    date: '2026-05-09',
  },
  {
    slug: '5-letter-words-with-no-vowels',
    title: '5 Letter Words with No Vowels — Wordle Cheat Sheet',
    description: 'The complete list of 5-letter words with no standard vowels — CRWTH, GLYPH, NYMPH, CRYPT, GYPSY, TRYST and more — plus a Wordle strategy for vowel-free answers.',
    excerpt: 'When Wordle picks an answer with no A, E, I, O, or U, your usual openers come back gray and you fly blind. Here is the full cheat sheet, plus the two-word combo that cracks every vowel-free puzzle.',
    date: '2026-05-09',
  },
];

export function getPost(slug) {
  return blogPosts.find(post => post.slug === slug);
}
