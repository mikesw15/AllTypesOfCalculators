import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useCurrency } from '../contexts/CurrencyContext';

export default function CompoundInterestCalculator() {
  const { currency, formatCurrency } = useCurrency();
  const [principal, setPrincipal] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [years, setYears] = useState<number>(10);
  const [rate, setRate] = useState<number>(7);

  const { futureValue, totalContributions, totalInterest, chartData } = useMemo(() => {
    let futureValue = principal;
    let totalContributions = principal;
    
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    
    const chartData = [];
    chartData.push({
      year: 0,
      principal: principal,
      interest: 0,
      total: principal
    });

    for (let i = 1; i <= months; i++) {
      futureValue += monthlyContribution;
      futureValue *= (1 + monthlyRate);
      totalContributions += monthlyContribution;
      
      if (i % 12 === 0) {
        chartData.push({
          year: i / 12,
          principal: totalContributions,
          interest: futureValue - totalContributions,
          total: futureValue
        });
      }
    }

    const totalInterest = futureValue - totalContributions;

    return { futureValue, totalContributions, totalInterest, chartData };
  }, [principal, monthlyContribution, years, rate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Initial Investment ({currency.symbol})</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Contribution ({currency.symbol})</label>
          <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years to Grow</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
            <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col justify-center">
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Future Value</p>
          <div className="text-5xl font-extrabold text-green-600">{formatCurrency(futureValue)}</div>
        </div>
        
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(val) => `${currency.symbol}${(val/1000).toFixed(0)}k`} tick={{fontSize: 12}} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} labelFormatter={(label) => `Year ${label}`} />
              <Legend />
              <Area type="monotone" dataKey="principal" stackId="1" stroke="#3b82f6" fill="#93c5fd" name="Total Contributions" />
              <Area type="monotone" dataKey="interest" stackId="1" stroke="#22c55e" fill="#86efac" name="Interest Earned" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Total Contributions</span>
            <span className="font-semibold">{formatCurrency(totalContributions)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Total Interest Earned</span>
            <span className="font-semibold text-green-600">{formatCurrency(totalInterest)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
