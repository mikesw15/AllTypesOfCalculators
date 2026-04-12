import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useCurrency } from '../contexts/CurrencyContext';

export default function CryptoROICalculator() {
  const { currency, formatCurrency } = useCurrency();
  const [investment, setInvestment] = useState<number>(1000);
  const [buyPrice, setBuyPrice] = useState<number>(50000);
  const [sellPrice, setSellPrice] = useState<number>(65000);
  const [feePercent, setFeePercent] = useState<number>(0.5);

  const results = useMemo(() => {
    if (buyPrice <= 0) return { coins: 0, revenue: 0, profit: 0, roi: 0 };
    
    const buyFee = investment * (feePercent / 100);
    const actualInvestment = investment - buyFee;
    const coins = actualInvestment / buyPrice;
    
    const grossRevenue = coins * sellPrice;
    const sellFee = grossRevenue * (feePercent / 100);
    const netRevenue = grossRevenue - sellFee;
    
    const profit = netRevenue - investment;
    const roi = (profit / investment) * 100;

    const chartData = [
      { name: 'Investment', value: investment, color: '#3b82f6' },
      { name: 'Net Revenue', value: netRevenue, color: netRevenue >= investment ? '#22c55e' : '#ef4444' }
    ];

    return { coins, revenue: netRevenue, profit, roi, chartData };
  }, [investment, buyPrice, sellPrice, feePercent]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount ({currency.symbol})</label>
          <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buy Price ({currency.symbol})</label>
            <input type="number" value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sell Price ({currency.symbol})</label>
            <input type="number" value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Fee (%)</label>
          <input type="number" step="0.1" value={feePercent} onChange={(e) => setFeePercent(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col justify-center">
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Return on Investment (ROI)</p>
          <div className={`text-5xl font-extrabold ${results.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {results.roi > 0 ? '+' : ''}{results.roi.toFixed(2)}%
          </div>
        </div>

        {results.chartData && (
          <div className="h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results.chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(val) => `${currency.symbol}${(val/1000).toFixed(0)}k`} tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {results.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Coins Acquired</span>
            <span className="font-semibold">{results.coins.toFixed(6)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Net Revenue</span>
            <span className="font-semibold">{formatCurrency(results.revenue)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Total Profit/Loss</span>
            <span className={`font-semibold ${results.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(results.profit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
