import path from 'path';
import fs from 'fs';
import { blogPosts } from '@/lib/blog-posts';

function getUnscrambleSampleWords() {
  const filePath = path.join(process.cwd(), 'public', 'dictionaries', 'twl.json');
  const words = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const sampleKeys = ['abelst', 'achhiimnopps', 'abceghilnoprtuy'];
  const index = new Map();
  for (const w of words) {
    const key = w.toLowerCase().split('').sort().join('');
    if (!index.has(key)) index.set(key, []);
    index.get(key).push(w);
  }
  const result = new Set();
  for (const key of sampleKeys) {
    for (const w of (index.get(key) || [])) result.add(w.toLowerCase());
  }
  return Array.from(result);
}

export default function sitemap() {
  const baseUrl = 'https://wordunscrambler.gg';
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const today = new Date().toISOString();

  const unscramblePages = getUnscrambleSampleWords().map(word => ({
    url: `${baseUrl}/unscramble/${word}`,
    lastModified: today, changeFrequency: 'monthly', priority: 0.85,
  }));

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
    ...unscramblePages,
  ];
}
