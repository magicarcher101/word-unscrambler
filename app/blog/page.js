import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

export const metadata = {
  title: 'Blog — Word Game Tips, Strategy & Guides',
  description: 'Strategy guides, tips, and word lists for Scrabble, Words with Friends, and Wordle from the WordUnscrambler.gg team.',
  alternates: { canonical: 'https://wordunscrambler.gg/blog' },
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric',
});

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Blog</h1>
          <p className="text-lg text-gray-600">
            Strategy guides, word lists, and tips to up your game in Scrabble, Words with Friends, and Wordle.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <ul className="space-y-6">
          {posts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <p className="text-xs font-medium text-gray-500 mb-2">
                  {dateFormatter.format(new Date(post.date))}
                </p>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
                <span className="inline-block mt-3 text-sm font-medium text-blue-600">Read article →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-400">
        <nav className="flex justify-center gap-6 mb-3">
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
        </nav>
        <p>© {new Date().getFullYear()} WordUnscrambler. All rights reserved.</p>
      </footer>
    </main>
  );
}
