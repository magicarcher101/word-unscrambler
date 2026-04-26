import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Word Unscrambler - Find Words for Scrabble & Words with Friends',
    template: '%s | WordUnscrambler',
  },
  description: 'Free word unscrambler tool. Enter your letters and instantly find all possible words for Scrabble, Words with Friends, and Wordle.',
  keywords: ['word unscrambler', 'unscramble letters', 'scrabble word finder', 'words with friends cheat', 'anagram solver'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
