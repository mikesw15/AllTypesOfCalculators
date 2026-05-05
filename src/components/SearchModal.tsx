import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculators } from '../calculators';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filteredCalculators = query
    ? calculators.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!query) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredCalculators.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCalculators.length > 0) {
        navigate(`/calculators/${filteredCalculators[selectedIndex].id}`);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 bg-gray-900/50 backdrop-blur-sm px-4">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-gray-100 px-4 py-4">
          <Search className="w-6 h-6 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 text-lg outline-none bg-transparent placeholder:text-gray-400"
            placeholder="Search calculators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query ? (
            filteredCalculators.length > 0 ? (
              <ul className="py-2">
                {filteredCalculators.map((calc, index) => (
                  <li key={calc.id}>
                    <button
                      className={`w-full text-left px-6 py-3 flex items-center gap-4 ${
                        index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => {
                        navigate(`/calculators/${calc.id}`);
                        onClose();
                      }}
                    >
                      <div className={`p-2 rounded-lg ${index === selectedIndex ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <Zap className={`w-5 h-5 ${index === selectedIndex ? 'text-blue-600' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <div className={`font-semibold ${index === selectedIndex ? 'text-blue-900' : 'text-gray-900'}`}>
                          {calc.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">{calc.description}</div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-12 text-center text-gray-500">
                No calculators found for "{query}"
              </div>
            )
          ) : (
            <div className="px-6 py-12 text-center text-gray-500">
              Start typing to search across {calculators.length} tools...
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px]">↑</kbd>
              <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px]">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px]">Enter</kbd>
              to select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px]">ESC</kbd>
            to close
          </span>
        </div>
      </div>
    </div>
  );
}
