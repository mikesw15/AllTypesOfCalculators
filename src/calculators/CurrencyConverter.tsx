import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRightLeft, RefreshCw, DollarSign, Info, TrendingUp, Globe, Coins } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';
import { currencyDetails } from '../data/currencyInfo';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CurrencyDropdown from '../components/CurrencyDropdown';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';

interface ExchangeRates {
  [key: string]: number;
}

interface HistoricalPoint {
  date: string;
  rate: number;
}

export default function CurrencyConverter() {
  const { currency: globalCurrency } = useCurrency();
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>(globalCurrency.code);
  const [toCurrency, setToCurrency] = useState<string>(globalCurrency.code === 'USD' ? 'EUR' : 'USD');
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [historicalData, setHistoricalData] = useState<HistoricalPoint[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);

  // Update fromCurrency when global currency changes
  useEffect(() => {
    setFromCurrency(globalCurrency.code);
  }, [globalCurrency.code]);

  // Fetch exchange rates
  const fetchRates = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchRates();

    // Set up automatic refresh every 24 hours
    const interval = setInterval(fetchRates, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const fetchHistoricalData = async () => {
    if (fromCurrency === toCurrency) {
      setHistoricalData([]);
      return;
    }

    setHistoryLoading(true);
    try {
      // Frankfurter API for historical data (last 30 days)
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 30);
      
      const startStr = start.toISOString().split('T')[0];
      const endStr = end.toISOString().split('T')[0];
      
      const response = await fetch(`https://api.frankfurter.app/${startStr}..${endStr}?from=${fromCurrency}&to=${toCurrency}`);
      
      if (!response.ok) throw new Error('Historical data not available for this pair');
      
      const data = await response.json();
      const points: HistoricalPoint[] = Object.entries(data.rates).map(([date, rate]: [string, any]) => ({
        date: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        rate: rate[toCurrency]
      }));
      
      setHistoricalData(points);
    } catch (err) {
      console.error('Error fetching historical data:', err);
      setHistoricalData([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [fromCurrency, toCurrency]);

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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-100">
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 text-sm border-2 border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Amount Input */}
          <div className="lg:col-span-4">
            <CalculatorInput
              label="Amount"
              value={amount}
              onChange={setAmount}
              icon={Coins}
              prefix={currencyDetails[fromCurrency]?.symbol || globalCurrency.symbol}
              min={0}
            />
          </div>

          {/* Currency Selection */}
          <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-4">
            <div className="w-full">
              <CurrencyDropdown
                label="From"
                value={fromCurrency}
                onChange={setFromCurrency}
                options={allCurrencies}
                commonOptions={commonCurrencies.filter(c => rates[c])}
                disabled={loading}
              />
            </div>

            <button 
              onClick={handleSwap}
              className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-all hover:scale-110 active:scale-95 shrink-0 border-2 border-blue-100"
              title="Swap currencies"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>

            <div className="w-full">
              <CurrencyDropdown
                label="To"
                value={toCurrency}
                onChange={setToCurrency}
                options={allCurrencies}
                commonOptions={commonCurrencies.filter(c => rates[c])}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Result Display */}
        <div className="mt-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
              <span className="text-gray-500 font-medium">Fetching latest rates...</span>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CalculatorResult
                  label={`${amount} ${fromCurrency} =`}
                  value={`${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} ${toCurrency}`}
                  color="blue"
                />
                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-100 flex flex-col justify-center">
                  <div className="flex items-center justify-between text-sm text-blue-700 font-medium mb-4">
                    <span>Exchange Rate</span>
                    <div className="flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" />
                      <span>Updated: {lastUpdated}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-blue-900 font-bold">
                      1 {fromCurrency} = {((1 / rates[fromCurrency]) * rates[toCurrency]).toLocaleString(undefined, { maximumFractionDigits: 6 })} {toCurrency}
                    </p>
                    <p className="text-blue-900 font-bold">
                      1 {toCurrency} = {((1 / rates[toCurrency]) * rates[fromCurrency]).toLocaleString(undefined, { maximumFractionDigits: 6 })} {fromCurrency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Historical Chart */}
      {historicalData.length > 0 && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Historical Exchange Rate (Last 30 Days)</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  axisLine={false} 
                  tickLine={false}
                  minTickGap={20}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  axisLine={false} 
                  tickLine={false}
                  domain={['auto', 'auto']}
                  tickFormatter={(val) => val.toFixed(4)}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: number) => [val.toFixed(4), `1 ${fromCurrency} to ${toCurrency}`]}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-400 mt-4">
            Data provided by Frankfurter (European Central Bank)
          </p>
        </div>
      )}

      {/* Currency Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[fromCurrency, toCurrency].map((code, index) => {
          const detail = currencyDetails[code];
          if (!detail) return null;
          return (
            <div key={`${code}-${index}`} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{detail.name} ({detail.code})</h4>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{detail.country}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {detail.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
