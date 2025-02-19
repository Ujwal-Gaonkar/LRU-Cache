import React, { useState, useRef } from 'react';
import { LRUCache } from './lib/LRUCache';
import { ArrowRight, Database, RefreshCw, Plus, Search } from 'lucide-react';

function App() {
  const [cache] = useState(() => new LRUCache(4));
  const [cacheState, setCacheState] = useState<{ key: number; value: number }[]>([]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [lastOperation, setLastOperation] = useState<string>('');
  const timeoutRef = useRef<number>();

  const updateCacheState = () => {
    setCacheState(cache.getState());
  };

  const handlePut = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key || !value) return;

    cache.put(Number(key), Number(value));
    setLastOperation(`PUT: Key=${key}, Value=${value}`);
    updateCacheState();
    setKey('');
    setValue('');

    // Highlight animation
    clearTimeout(timeoutRef.current);
    const element = document.getElementById(`cache-item-${key}`);
    if (element) {
      element.classList.add('animate-highlight');
      timeoutRef.current = window.setTimeout(() => {
        element.classList.remove('animate-highlight');
      }, 1000);
    }
  };

  const handleGet = (searchKey: string) => {
    if (!searchKey) return;
    const result = cache.get(Number(searchKey));
    setLastOperation(`GET: Key=${searchKey}, Result=${result === -1 ? 'Not Found' : result}`);
    updateCacheState();
    setKey('');

    // Highlight animation
    clearTimeout(timeoutRef.current);
    const element = document.getElementById(`cache-item-${searchKey}`);
    if (element) {
      element.classList.add('animate-highlight');
      timeoutRef.current = window.setTimeout(() => {
        element.classList.remove('animate-highlight');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Database className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold">LRU Cache Visualization</h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-xl mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-blue-400" />
            Cache Operations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Put Operation */}
            <form onSubmit={handlePut} className="space-y-4">
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Key</label>
                  <input
                    type="number"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="bg-gray-700 rounded px-3 py-2 w-24 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Key"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Value</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-gray-700 rounded px-3 py-2 w-24 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Value"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
                Put
              </button>
            </form>

            {/* Get Operation */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Search Key</label>
                <input
                  type="number"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="bg-gray-700 rounded px-3 py-2 w-24 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Key"
                />
              </div>
              <button
                onClick={() => handleGet(key)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
              >
                <Search className="w-4 h-4" />
                Get
              </button>
            </div>
          </div>
        </div>

        {/* Cache Visualization */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Cache State</h2>
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            {cacheState.map((item, index) => (
              <React.Fragment key={item.key}>
                {index > 0 && <ArrowRight className="w-5 h-5 text-gray-500 flex-shrink-0" />}
                <div
                  id={`cache-item-${item.key}`}
                  className="flex-shrink-0 bg-gray-700 rounded-lg p-4 min-w-[120px] transition-all duration-300"
                >
                  <div className="text-sm text-gray-400">Key</div>
                  <div className="text-xl font-bold">{item.key}</div>
                  <div className="text-sm text-gray-400 mt-2">Value</div>
                  <div className="text-xl font-bold">{item.value}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Last Operation */}
        {lastOperation && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm text-gray-400 mb-1">Last Operation</h3>
            <p className="font-mono">{lastOperation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;