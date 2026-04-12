import React from 'react';
import { useCurrency, currencies } from '../contexts/CurrencyContext';
import { Globe } from 'lucide-react';

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer group">
        <Globe className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
        <select
          value={currency.code}
          onChange={(e) => {
            const selected = currencies.find(c => c.code === e.target.value);
            if (selected) setCurrency(selected);
          }}
          className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer pr-1"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} ({c.symbol})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
