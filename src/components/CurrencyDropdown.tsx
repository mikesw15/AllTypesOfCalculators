import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Info, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { currencyDetails } from '../data/currencyInfo';

const currencyNameFormatter = new Intl.DisplayNames(['en'], { type: 'currency' });

interface CurrencyDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  commonOptions: string[];
  label: string;
  disabled?: boolean;
}

export default function CurrencyDropdown({ 
  value, 
  onChange, 
  options, 
  commonOptions,
  label, 
  disabled 
}: CurrencyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrencyName = (code: string) => {
    return currencyDetails[code]?.name || currencyNameFormatter.of(code) || code;
  };

  const filteredOptions = useMemo(() => {
    return options.filter(opt => {
      const name = getCurrencyName(opt);
      return opt.toLowerCase().includes(search.toLowerCase()) ||
             name.toLowerCase().includes(search.toLowerCase());
    });
  }, [options, search]);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between p-4 text-lg font-medium rounded-xl border-2 transition-all bg-white ${
          isOpen ? 'border-blue-500 ring-4 ring-blue-50' : 'border-gray-200 hover:border-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-bold">
            {value.substring(0, 2)}
          </span>
          <span>{value}</span>
          <span className="text-sm text-gray-400 font-normal truncate max-w-[120px]">
            {getCurrencyName(value)}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="p-3 border-b border-gray-50 bg-gray-50/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search currency..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto p-2 custom-scrollbar">
              {search ? (
                <div>
                  <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Search Results</p>
                  {filteredOptions.map(code => (
                    <CurrencyOption 
                      key={`search-${code}`} 
                      code={code} 
                      isSelected={value === code} 
                      onSelect={handleSelect}
                      displayName={getCurrencyName(code)}
                    />
                  ))}
                  {filteredOptions.length === 0 && (
                    <p className="px-4 py-8 text-center text-sm text-gray-500">No currencies found for "{search}"</p>
                  )}
                </div>
              ) : (
                <>
                  {commonOptions.length > 0 && (
                    <div className="mb-2">
                      <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Common</p>
                      {commonOptions.map(code => (
                        <CurrencyOption 
                          key={`common-${code}`} 
                          code={code} 
                          isSelected={value === code} 
                          onSelect={handleSelect}
                          displayName={getCurrencyName(code)}
                        />
                      ))}
                    </div>
                  )}

                  <div>
                    <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">All Currencies</p>
                    {options.map(code => (
                      <CurrencyOption 
                        key={`all-${code}`} 
                        code={code} 
                        isSelected={value === code} 
                        onSelect={handleSelect}
                        displayName={getCurrencyName(code)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CurrencyOptionProps {
  key?: string;
  code: string;
  isSelected: boolean;
  onSelect: (code: string) => void;
  displayName: string;
}

function CurrencyOption({ code, isSelected, onSelect, displayName }: CurrencyOptionProps) {
  const detail = currencyDetails[code];
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setShowTooltip(true), 500);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowTooltip(false);
  };

  return (
    <div className="relative group">
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(code)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left ${
          isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
            isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}>
            {code.substring(0, 2)}
          </span>
          <div>
            <p className="font-bold text-sm">{code}</p>
            <p className="text-[10px] text-gray-400 truncate max-w-[140px]">{displayName}</p>
          </div>
        </div>
        {detail && <Info className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400 transition-colors" />}
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && detail && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute left-full top-0 ml-4 w-64 p-4 bg-gray-900 text-white rounded-2xl shadow-2xl z-[60] pointer-events-none"
          >
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">{detail.country}</span>
            </div>
            <p className="font-bold text-sm mb-1">{detail.name}</p>
            <p className="text-xs text-gray-400 leading-relaxed">{detail.description}</p>
            
            {/* Arrow */}
            <div className="absolute right-full top-5 -mr-1 border-8 border-transparent border-r-gray-900"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
