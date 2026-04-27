export const blogPosts = [
  {
    slug: 'best-starting-words-for-wordle',
    title: 'Best Starting Words for Wordle: A Strategic Guide',
    description: 'The top 5 Wordle starting words backed by information theory — CRANE, SLATE, AUDIO, RAISE, and STARE — plus second-guess strategy and tips.',
    excerpt: 'The right opener narrows the puzzle from thousands of possibilities to just a handful in one move. Here are the top 5 starters that information theory and millions of player results agree on.',
    date: '2026-04-27',
  },
];

export function getPost(slug) {
  return blogPosts.find(post => post.slug === slug);
}
