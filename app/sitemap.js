import { blogPosts } from '@/lib/blog-posts';

export default function sitemap() {
  const baseUrl = 'https://wordunscrambler.gg';
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const today = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, lastModified: today, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/blog`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const wordsStartingWith = letters.map(letter => ({
    url: `${baseUrl}/words-starting-with/${letter}`,
    lastModified: today, changeFrequency: 'monthly', priority: 0.8,
  }));

  const wordsEndingWith = letters.map(letter => ({
    url: `${baseUrl}/words-ending-with/${letter}`,
    lastModified: today, changeFrequency: 'monthly', priority: 0.8,
  }));

  const lengthPages = [4, 5, 6, 7].flatMap(n => [
    ...letters.map(letter => ({
      url: `${baseUrl}/${n}-letter-words-starting-with/${letter}`,
      lastModified: today, changeFrequency: 'monthly', priority: 0.9,
    })),
    ...letters.map(letter => ({
      url: `${baseUrl}/${n}-letter-words-ending-with/${letter}`,
      lastModified: today, changeFrequency: 'monthly', priority: 0.9,
    })),
  ]);

  return [
    ...staticPages,
    ...blogPages,
    ...wordsStartingWith,
    ...wordsEndingWith,
    ...lengthPages,
  ];
}
