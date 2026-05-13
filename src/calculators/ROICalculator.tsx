import React, { useState } from 'react';
import { TrendingUp, DollarSign, Percent, Calendar } from 'lucide-react';

export default function ROICalculator() {
  const [amountInvested, setAmountInvested] = useState<number>(10000);
  const [amountReturned, setAmountReturned] = useState<number>(12500);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(1);

  const totalProfit = amountReturned - amountInvested;
  const roi = (totalProfit / amountInvested) * 100;
  
  // Annualized ROI = ((Final Value / Initial Value)^(1/Years) - 1) * 100
  const annualizedRoi = ((Math.pow(amountReturned / amountInvested, 1 / investmentPeriod)) - 1) * 100;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount Invested (£)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={amountInvested}
                onChange={(e) => setAmountInvested(Number(e.target.value))}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount Returned (£)
            </label>
            <div className="relative">
              <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={amountReturned}
                onChange={(e) => setAmountReturned(Number(e.target.value))}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Investment Period (Years)
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-lg shadow-blue-200">
            <div className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-2">Total ROI</div>
            <div className="text-5xl font-black mb-2">{roi.toFixed(2)}%</div>
            <div className="text-blue-100 italic">
              Profit: £{totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <div className="text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">Annualized ROI</div>
              <div className="text-2xl font-bold text-emerald-900">{annualizedRoi.toFixed(2)}%</div>
            </div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <div className="text-amber-600 text-xs font-bold uppercase tracking-wider mb-1">Investment Multiple</div>
              <div className="text-2xl font-bold text-amber-900">{(amountReturned / amountInvested).toFixed(2)}x</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Percent className="w-5 h-5 text-blue-600" />
          Understanding ROI
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Return on Investment (ROI) is a popular profitability metric used to evaluate how well an investment has performed. It is expressed as a percentage and represents the net profit or loss relative to the initial cost.
        </p>
        <div className="bg-white p-4 rounded-xl border border-gray-200 font-mono text-sm">
          ROI = ((Final Value - Initial Value) / Initial Value) × 100
        </div>
      </div>
    </div>
  );
}
