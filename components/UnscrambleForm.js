'use client';

import { useState, useCallback } from 'react';

const DICTIONARIES = [
  { id: 'enable', label: 'ENABLE (Words with Friends)' },
  { id: 'twl', label: 'TWL (Scrabble US/Canada)' },
  { id: 'sowpods', label: 'SOWPODS (Scrabble UK/World)' },
];

export default function UnscrambleForm({ initialLetters = '' }) {
  const [letters, setLetters] = useState(initialLetters);
  const [dictionary, setDictionary] = useState('enable');
  const [startsWith, setStartsWith] = useState('');
  const [endsWith, setEndsWith] = useState('');
  const [mustInclude, setMustInclude] = useState('');
  const [minLength, setMinLength] = useState(2);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUnscramble = useCallback(async () => {
    const cleaned = letters.trim();
    if (!cleaned) { setError('Please enter some letters.'); return; }
    setError(''); setLoading(true); setResults(null);
    try {
      const params = new URLSearchParams({ letters: cleaned, dictionary, minLength, ...(startsWith && { startsWith }), ...(endsWith && { endsWith }), ...(mustInclude && { mustInclude }) });
      const res = await fetch(`/api/unscramble?${params}`);
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [letters, dictionary, startsWith, endsWith, mustInclude, minLength]);

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleUnscramble(); };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-3">
        <input type="text" value={letters} onChange={e => setLetters(e.target.value.toUpperCase())} onKeyDown={handleKeyDown} placeholder="Enter letters (e.g. TABLES)" maxLength={15} className="flex-1 text-xl font-mono tracking-widest border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 uppercase" autoComplete="off" spellCheck="false" />
        <button onClick={handleUnscramble} disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-lg">{loading ? '...' : 'Go'}</button>
      </div>
      <p className="text-xs text-gray-400 mb-4 text-left">Tip: Use ? or * as wildcard (blank tile)</p>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {DICTIONARIES.map(dict => (
          <button key={dict.id} onClick={() => setDictionary(dict.id)} className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${dictionary === dict.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}>{dict.label}</button>
        ))}
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>}
      {results && (
        <div className="text-left mt-2">
          <p className="text-sm text-gray-500 mb-4">Found <strong>{results.total.toLocaleString()}</strong> words from <strong>{letters.toUpperCase()}</strong></p>
          {results.total === 0 ? <div className="text-center py-8 text-gray-400">No words found. Try removing some filters.</div> : (
            Object.keys(results.grouped).map(Number).sort((a, b) => b - a).map(length => (
              <div key={length} className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{length} letters ({results.grouped[length].length})</h3>
                <div className="flex flex-wrap gap-2">
                  {results.grouped[length].map(word => (
                    <span key={word} className="inline-block bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 cursor-pointer">{word}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
