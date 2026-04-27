export default function sitemap() {
  const baseUrl = 'https://wordunscrambler.gg';
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const today = new Date().toISOString();

  const staticPages = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  const wordsStartingWith = letters.map(letter => ({
    url: `${baseUrl}/words-starting-with/${letter}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const wordsEndingWith = letters.map(letter => ({
    url: `${baseUrl}/words-ending-with/${letter}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...wordsStartingWith,
    ...wordsEndingWith,
  ];
}
