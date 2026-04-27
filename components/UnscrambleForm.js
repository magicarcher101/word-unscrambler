'use client';

import { useState, useCallback } from 'react';

const DICTIONARIES = [
  { id: 'enable', label: 'ENABLE (Words with Friends)' },
  { id: 'twl', label: 'TWL (Scrabble US/Canada)' },
  { id: 'sowpods', label: 'SOWPODS (Scrabble UK/World)' },
];

const SCRABBLE_SCORES = {
  a:1,b:3,c:3,d:2,e:1,f:4,g:2,h:4,i:1,j:8,
  k:5,l:1,m:3,n:1,o:1,p:3,q:10,r:1,s:1,t:1,
  u:1,v:4,w:4,x:8,y:4,z:10
};

function getWordScore(word) {
  return word.toLowerCase().split('').reduce((sum, c) => sum + (SCRABBLE_SCORES[c] || 0), 0);
}

function ScoreBadge({ score }) {
  const color = score >= 15 ? 'bg-red-100 text-red-700' :
                score >= 10 ? 'bg-orange-100 text-orange-700' :
                score >= 6  ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-500';
  return (
    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${color}`}>
      {score}
    </span>
  );
}

export default function UnscrambleForm({ initialLetters = '' }) {
  const [letters, setLetters] = useState(initialLetters);
  const [dictionary, setDictionary] = useState('enable');
  const [startsWith, setStartsWith] = useState('');
  const [endsWith, setEndsWith] = useState('');
  const [mustInclude, setMustInclude] = useState('');
  const [minLength, setMinLength] = useState(2);
  const [sortBy, setSortBy] = useState('length');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUnscramble = useCallback(async () => {
    const cleaned = letters.trim();
    if (!cleaned) { setError('Please enter some letters.'); return; }
    setError(''); setLoading(true); setResults(null);
    try {
      const params = new URLSearchParams({
        letters: cleaned, dictionary, minLength,
        ...(startsWith && { startsWith }),
        ...(endsWith && { endsWith }),
        ...(mustInclude && { mustInclude }),
      });
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

  const getSortedGroups = (grouped) => {
    if (sortBy === 'score') {
      const allWords = Object.values(grouped).flat();
      allWords.sort((a, b) => getWordScore(b) - getWordScore(a));
      return { 'By Score': allWords };
    }
    return grouped;
  };

  return (
    <div className="w-full">
      {/* Main input */}
      <div className="flex gap-2 mb-3">
        <input type="text" value={letters} onChange={e => setLetters(e.target.value.toUpperCase())} onKeyDown={handleKeyDown} placeholder="Enter letters (e.g. TABLES)" maxLength={15}
          className="flex-1 text-xl font-mono tracking-widest border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 uppercase" autoComplete="off" spellCheck="false" />
        <button onClick={handleUnscramble} disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-lg">
          {loading ? '...' : 'Go'}
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-4 text-left">Tip: Use ? or * as wildcard (blank tile)</p>

      {/* Advanced filters — ABOVE dictionary */}
      <details className="mb-4 text-left">
        <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-700 font-medium mb-2">
          ▶ Advanced filters
        </summary>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Starts with</label>
            <input type="text" value={startsWith} onChange={e => setStartsWith(e.target.value.toLowerCase())} onKeyDown={handleKeyDown} placeholder="e.g. re" maxLength={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Ends with</label>
            <input type="text" value={endsWith} onChange={e => setEndsWith(e.target.value.toLowerCase())} onKeyDown={handleKeyDown} placeholder="e.g. ing" maxLength={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Must include</label>
            <input type="text" value={mustInclude} onChange={e => setMustInclude(e.target.value.toLowerCase())} onKeyDown={handleKeyDown} placeholder="e.g. at" maxLength={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Min length</label>
            <select value={minLength} onChange={e => setMinLength(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
              {[2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}+ letters</option>)}
            </select>
          </div>
        </div>
      </details>

      {/* Dictionary selector — BELOW advanced filters */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {DICTIONARIES.map(dict => (
          <button key={dict.id} onClick={() => setDictionary(dict.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${dictionary === dict.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}>
            {dict.label}
          </button>
        ))}
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>}

      {/* Results */}
      {results && (
        <div className="text-left mt-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Found <strong>{results.total.toLocaleString()}</strong> words from <strong>{letters.toUpperCase()}</strong>
            </p>
            <div className="flex gap-2">
              <button onClick={() => setSortBy('length')}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${sortBy === 'length' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}>
                By Length
              </button>
              <button onClick={() => setSortBy('score')}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${sortBy === 'score' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}>
                By Score
              </button>
            </div>
          </div>

          {results.total === 0 ? (
            <div className="text-center py-8 text-gray-400">No words found. Try removing some filters.</div>
          ) : (
            Object.entries(getSortedGroups(results.grouped))
              .sort(([a], [b]) => sortBy === 'length' ? Number(b) - Number(a) : 0)
              .map(([groupKey, words]) => (
                <div key={groupKey} className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {sortBy === 'length' ? `${groupKey} letters (${words.length})` : `Top scoring words (${words.length})`}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {words.map(word => (
                      <span key={word} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 cursor-pointer transition-colors">
                        {word}
                        <ScoreBadge score={getWordScore(word)} />
                      </span>
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
