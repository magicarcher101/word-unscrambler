'use client';

import { useState, useCallback } from 'react';

const DICTIONARIES = [
  { id: 'enable', label: 'ENABLE', sub: 'Words with Friends' },
  { id: 'twl', label: 'TWL', sub: 'Scrabble US/Canada' },
  { id: 'sowpods', label: 'SOWPODS', sub: 'Scrabble UK/World' },
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
  const color = score >= 15 ? 'bg-red-100 text-red-700 border-red-200' :
                score >= 10 ? 'bg-orange-100 text-orange-700 border-orange-200' :
                score >= 6  ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                              'bg-gray-100 text-gray-500 border-gray-200';
  return (
    <span className={`text-xs font-bold px-1.5 py-0.5 rounded border ${color}`}>
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
  const [showFilters, setShowFilters] = useState(false);
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

      {/* Main search input */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={letters}
          onChange={e => setLetters(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          placeholder="Enter letters e.g. TABLES"
          maxLength={15}
          className="flex-1 text-xl font-mono tracking-widest border-2 border-blue-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:shadow-lg uppercase bg-white shadow-sm transition-all"
          autoComplete="off"
          spellCheck="false"
        />
        <button
          onClick={handleUnscramble}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white font-bold px-8 py-4 rounded-xl transition-all text-lg shadow-sm hover:shadow-md"
        >
          {loading ? '...' : 'Go'}
        </button>
      </div>
      <p className="text-xs text-gray-400 mb-5 text-left pl-1">Use ? or * for blank/wildcard tiles</p>

      {/* Advanced filters — ABOVE dictionary */}
      <div className="mb-5">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <span className={`transition-transform duration-200 ${showFilters ? 'rotate-90' : ''}`}>▶</span>
          Advanced Filters
          {(startsWith || endsWith || mustInclude || minLength > 2) && (
            <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">Active</span>
          )}
        </button>

        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Starts with</label>
              <input type="text" value={startsWith} onChange={e => setStartsWith(e.target.value.toLowerCase())} onKeyDown={handleKeyDown} placeholder="e.g. re" maxLength={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ends with</label>
              <input type="text" value={endsWith} onChange={e => setEndsWith(e.target.value.toLowerCase())} onKeyDown={handleKeyDown} placeholder="e.g. ing" maxLength={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Must include</label>
              <input type="text" value={mustInclude} onChange={e => setMustInclude(e.target.value.toLowerCase())} onKeyDown={handleKeyDown} placeholder="e.g. at" maxLength={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Min length</label>
              <select value={minLength} onChange={e => setMinLength(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-white">
                {[2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}+ letters</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Dictionary selector — BELOW advanced filters */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {DICTIONARIES.map(dict => (
          <button
            key={dict.id}
            onClick={() => setDictionary(dict.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
              dictionary === dict.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            <span className="block">{dict.label}</span>
            <span className={`block text-xs font-normal ${dictionary === dict.id ? 'text-blue-100' : 'text-gray-400'}`}>{dict.sub}</span>
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="text-left mt-2">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <p className="text-sm text-gray-600">
              <strong className="text-blue-600 text-lg">{results.total.toLocaleString()}</strong>
              <span className="ml-1">words found from</span>
              <strong className="ml-1 font-mono">{letters.toUpperCase()}</strong>
            </p>
            <div className="flex gap-2">
              <button onClick={() => setSortBy('length')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${sortBy === 'length' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}>
                By Length
              </button>
              <button onClick={() => setSortBy('score')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${sortBy === 'score' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}>
                By Score
              </button>
            </div>
          </div>

          {results.total === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>No words found. Try removing some filters.</p>
            </div>
          ) : (
            Object.entries(getSortedGroups(results.grouped))
              .sort(([a], [b]) => sortBy === 'length' ? Number(b) - Number(a) : 0)
              .map(([groupKey, words]) => (
                <div key={groupKey} className="mb-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-white bg-blue-500 px-2 py-0.5 rounded-full">
                      {sortBy === 'length' ? `${groupKey} letters` : 'Top scores'}
                    </span>
                    <span className="text-xs text-gray-400">{words.length} words</span>
                    <div className="flex-1 h-px bg-gray-100"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {words.map(word => (
                      <span key={word}
                        className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-800 cursor-pointer transition-all">
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
