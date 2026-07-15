import UnscrambleForm from '@/components/UnscrambleForm';
import HomepageSections from '@/components/HomepageSections';

export const metadata = {
  title: 'Word Unscrambler - Unscramble Letters for Scrabble, Words with Friends',
  description: 'Instantly unscramble letters to find all possible words. Supports TWL, SOWPODS, and ENABLE dictionaries for Scrabble and Words with Friends.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Word Unscrambler</h1>
          <p className="text-lg text-gray-600 mb-8">Enter your letters and instantly find every possible word. Perfect for Scrabble, Words with Friends, and Wordle.</p>
          <UnscrambleForm navigateOnSubmit />
        </div>
      </section>

      <HomepageSections />
    </main>
  );
}
