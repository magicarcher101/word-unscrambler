import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Word Unscrambler - Find Words for Scrabble & Words with Friends',
    template: '%s | WordUnscrambler',
  },
  description: 'Free word unscrambler tool. Enter your letters and instantly find all possible words for Scrabble, Words with Friends, and Wordle.',
  keywords: ['word unscrambler', 'unscramble letters', 'scrabble word finder', 'words with friends cheat', 'anagram solver'],
  metadataBase: new URL('https://wordunscrambler.gg'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="sitemap" type="application/xml" href="https://wordunscrambler.gg/sitemap.xml" />
        <Header />
        {children}
      </body>
      <GoogleAnalytics gaId="G-00PK9M8NFM" />
    </html>
  );
}
