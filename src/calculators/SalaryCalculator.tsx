import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useCurrency } from '../contexts/CurrencyContext';

export default function SalaryCalculator() {
  const { currency, formatCurrency } = useCurrency();
  const [amount, setAmount] = useState<number>(75000);
  const [frequency, setFrequency] = useState<'hourly' | 'weekly' | 'monthly' | 'yearly'>('yearly');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);

  const results = useMemo(() => {
    let yearly = 0;
    const weeksPerYear = 52;
    const monthsPerYear = 12;
    const daysPerWeek = 5;

    if (frequency === 'hourly') yearly = amount * hoursPerWeek * weeksPerYear;
    if (frequency === 'weekly') yearly = amount * weeksPerYear;
    if (frequency === 'monthly') yearly = amount * monthsPerYear;
    if (frequency === 'yearly') yearly = amount;

    // Rough tax estimation (simplified)
    let taxRate = 0;
    if (yearly <= 11000) taxRate = 0.10;
    else if (yearly <= 44725) taxRate = 0.12;
    else if (yearly <= 95375) taxRate = 0.22;
    else if (yearly <= 182100) taxRate = 0.24;
    else if (yearly <= 231250) taxRate = 0.32;
    else if (yearly <= 578125) taxRate = 0.35;
    else taxRate = 0.37;

    const estimatedTaxes = yearly * taxRate;
    const takeHome = yearly - estimatedTaxes;

    const chartData = [
      { name: 'Take Home', value: takeHome, color: '#22c55e' },
      { name: 'Estimated Taxes', value: estimatedTaxes, color: '#ef4444' }
    ];

    return {
      hourly: yearly / weeksPerYear / hoursPerWeek,
      daily: yearly / weeksPerYear / daysPerWeek,
      weekly: yearly / weeksPerYear,
      monthly: yearly / monthsPerYear,
      yearly: yearly,
      takeHome,
      estimatedTaxes,
      chartData
    };
  }, [amount, frequency, hoursPerWeek]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Salary Amount ({currency.symbol})</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value as any)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500">
              <option value="hourly">Hourly</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hours per Week</label>
            <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Salary Breakdown</h3>
        
        <div className="h-48 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={results.chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {results.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Hourly</span>
            <span className="font-semibold">{formatCurrency(results.hourly)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Daily (8h)</span>
            <span className="font-semibold">{formatCurrency(results.daily)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Weekly</span>
            <span className="font-semibold">{formatCurrency(results.weekly)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Monthly</span>
            <span className="font-semibold">{formatCurrency(results.monthly)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-900 font-bold">Yearly</span>
            <span className="font-bold text-blue-600">{formatCurrency(results.yearly)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
