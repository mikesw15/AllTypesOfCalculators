import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function RentVsBuyCalculator() {
  const [rent, setRent] = useState<number>(2000);
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [years, setYears] = useState<number>(10);

  const results = useMemo(() => {
    // Buy logic (assume 20% down, 6% interest, 1.2% tax, 1% maint, 3% appreciation)
    const downPayment = homePrice * 0.2;
    const loan = homePrice - downPayment;
    const rate = 0.06 / 12;
    const monthlyMortgage = (loan * rate * Math.pow(1 + rate, 360)) / (Math.pow(1 + rate, 360) - 1);
    const taxAndMaint = (homePrice * 0.022) / 12; // 2.2% annual
    
    const totalBuyMonthly = monthlyMortgage + taxAndMaint;
    
    const chartData = [];
    for (let i = 1; i <= years; i++) {
      const rentCost = rent * 12 * i;
      
      const buyCost = (totalBuyMonthly * 12 * i) + downPayment;
      const homeValue = homePrice * Math.pow(1.03, i);
      // Rough amortization for remaining loan
      const months = i * 12;
      const remainingLoan = loan * (Math.pow(1 + rate, 360) - Math.pow(1 + rate, months)) / (Math.pow(1 + rate, 360) - 1);
      const equity = homeValue - remainingLoan;
      const netBuyCost = buyCost - equity;

      chartData.push({
        year: i,
        rentCost: rentCost,
        buyCost: netBuyCost
      });
    }

    const totalRent = rent * 12 * years;
    const totalBuyCost = (totalBuyMonthly * 12 * years) + downPayment;
    const homeValueAfterYears = homePrice * Math.pow(1.03, years);
    const remainingLoanFinal = loan * (Math.pow(1 + rate, 360) - Math.pow(1 + rate, years * 12)) / (Math.pow(1 + rate, 360) - 1);
    const equity = homeValueAfterYears - remainingLoanFinal;
    const netBuyCost = totalBuyCost - equity;

    return { totalRent, netBuyCost, chartData };
  }, [rent, homePrice, years]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent ($)</label>
          <input type="number" value={rent} onChange={(e) => setRent(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Home Price to Buy ($)</label>
          <input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Horizon (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <div className="text-center mb-6">
          <p className="text-lg font-bold text-gray-900 mb-2">After {years} Years</p>
          {results.totalRent < results.netBuyCost ? (
            <div className="text-2xl font-bold text-green-600">Renting is better</div>
          ) : (
            <div className="text-2xl font-bold text-blue-600">Buying is better</div>
          )}
        </div>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={results.chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} tick={{fontSize: 12}} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: number) => `$${value.toFixed(0)}`} labelFormatter={(label) => `Year ${label}`} />
              <Legend />
              <Line type="monotone" dataKey="rentCost" name="Net Cost of Renting" stroke="#ef4444" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="buyCost" name="Net Cost of Buying" stroke="#3b82f6" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Total Cost of Renting</div>
            <div className="text-xl font-bold text-gray-900">${results.totalRent.toFixed(0)}</div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Net Cost of Buying (Cost - Equity)</div>
            <div className="text-xl font-bold text-gray-900">${results.netBuyCost.toFixed(0)}</div>
            <div className="text-xs text-gray-400 mt-1">Assumes 3% appreciation, 20% down, 6% rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
