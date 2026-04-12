import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, RefreshCw, DollarSign } from 'lucide-react';

interface ExchangeRates {
  [key: string]: number;
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fetch exchange rates
  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using a free, no-key-required API for exchange rates
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!response.ok) throw new Error('Failed to fetch exchange rates');
      
      const data = await response.json();
      setRates(data.rates);
      
      // Format the last updated date
      const date = new Date(data.time_last_update_unix * 1000);
      setLastUpdated(date.toLocaleString());
    } catch (err) {
      setError('Could not load exchange rates. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Calculate result
  let result = 0;
  if (rates[fromCurrency] && rates[toCurrency]) {
    // Convert from 'fromCurrency' to USD, then from USD to 'toCurrency'
    const amountInUSD = amount / rates[fromCurrency];
    result = amountInUSD * rates[toCurrency];
  }

  // Common currencies to show at the top of the list
  const commonCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];
  
  // All available currencies sorted alphabetically
  const allCurrencies = Object.keys(rates).sort();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-11 pr-4 py-4 text-2xl font-bold rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                min="0"
                step="any"
              />
            </div>
          </div>

          {/* Currency Selection */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-4 text-lg font-medium rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white"
                disabled={loading}
              >
                <optgroup label="Common Currencies">
                  {commonCurrencies.map(currency => (
                    rates[currency] && <option key={`common-from-${currency}`} value={currency}>{currency}</option>
                  ))}
                </optgroup>
                <optgroup label="All Currencies">
                  {allCurrencies.map(currency => (
                    <option key={`all-from-${currency}`} value={currency}>{currency}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <button 
              onClick={handleSwap}
              className="mt-6 p-4 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors shrink-0"
              title="Swap currencies"
            >
              <ArrowRightLeft className="w-6 h-6" />
            </button>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-4 text-lg font-medium rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white"
                disabled={loading}
              >
                <optgroup label="Common Currencies">
                  {commonCurrencies.map(currency => (
                    rates[currency] && <option key={`common-to-${currency}`} value={currency}>{currency}</option>
                  ))}
                </optgroup>
                <optgroup label="All Currencies">
                  {allCurrencies.map(currency => (
                    <option key={`all-to-${currency}`} value={currency}>{currency}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        {/* Result Display */}
        <div className="mt-8 p-6 bg-gray-50 border-2 border-gray-100 rounded-2xl text-center">
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-gray-500 py-4">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Loading exchange rates...</span>
            </div>
          ) : (
            <>
              <div className="text-gray-500 font-medium mb-2">
                {amount} {fromCurrency} =
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-blue-600 break-all">
                {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} <span className="text-2xl text-blue-400">{toCurrency}</span>
              </div>
              
              {/* Exchange Rate Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
                <div>
                  1 {fromCurrency} = {((1 / rates[fromCurrency]) * rates[toCurrency]).toLocaleString(undefined, { maximumFractionDigits: 6 })} {toCurrency}
                </div>
                <div className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Updated: {lastUpdated}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
