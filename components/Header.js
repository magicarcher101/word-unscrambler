'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          WordUnscrambler
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/words-starting-with/a" className="hover:text-blue-200 transition-colors">Words Starting With</Link>
          <Link href="/words-ending-with/a" className="hover:text-blue-200 transition-colors">Words Ending With</Link>
          <Link href="/5-letter-words-starting-with/a" className="hover:text-blue-200 transition-colors">5 Letter Words</Link>
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">🏠 Home</Link>
          <Link href="/words-starting-with/a" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">📖 Words Starting With</Link>
          <Link href="/words-ending-with/a" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">📖 Words Ending With</Link>
          <Link href="/5-letter-words-starting-with/a" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">🟩 5 Letter Words (Wordle)</Link>
          <Link href="/5-letter-words-ending-with/a" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">🟩 5 Letter Words Ending With</Link>
        </div>
      )}
    </header>
  );
}
