export default function sitemap() {
  const baseUrl = 'https://wordunscrambler.gg';
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const today = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, lastModified: today, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const wordsStartingWith = letters.map(letter => ({
    url: `${baseUrl}/words-starting-with/${letter}`,
    lastModified: today, changeFrequency: 'monthly', priority: 0.8,
  }));

  const wordsEndingWith = letters.map(letter => ({
    url: `${baseUrl}/words-ending-with/${letter}`,
    lastModified: today, changeFrequency: 'monthly', priority: 0.8,
  }));

  const fiveLetterStarting = letters.map(letter => ({
    url: `${baseUrl}/5-letter-words-starting-with/${letter}`,
    lastModified: today, changeFrequency: 'monthly', priority: 0.9,
  }));

  const fiveLetterEnding = letters.map(letter => ({
    url: `${baseUrl}/5-letter-words-ending-with/${letter}`,
    lastModified: today, changeFrequency: 'monthly', priority: 0.9,
  }));

  return [
    ...staticPages,
    ...wordsStartingWith,
    ...wordsEndingWith,
    ...fiveLetterStarting,
    ...fiveLetterEnding,
  ];
}
