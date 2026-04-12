import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function CarLoanCalculator() {
  const [price, setPrice] = useState<number>(25000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeIn, setTradeIn] = useState<number>(0);
  const [term, setTerm] = useState<number>(60);
  const [rate, setRate] = useState<number>(5.0);

  const results = useMemo(() => {
    const principal = price - downPayment - tradeIn;
    if (principal <= 0) return { principal: 0, payment: 0, totalInterest: 0, totalCost: price, chartData: [] };
    
    const monthlyRate = rate / 100 / 12;
    const payment = monthlyRate === 0 
      ? principal / term 
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
      
    const totalInterest = (payment * term) - principal;
    const totalCost = price + totalInterest;

    const chartData = [
      { name: 'Principal', value: principal, color: '#3b82f6' },
      { name: 'Total Interest', value: totalInterest, color: '#ef4444' }
    ];

    return { principal, payment, totalInterest, totalCost, chartData };
  }, [price, downPayment, tradeIn, term, rate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Car Price ($)</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment ($)</label>
            <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trade-in Value ($)</label>
            <input type="number" value={tradeIn} onChange={(e) => setTradeIn(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Months)</label>
            <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500">
              <option value={36}>36 Months (3 Years)</option>
              <option value={48}>48 Months (4 Years)</option>
              <option value={60}>60 Months (5 Years)</option>
              <option value={72}>72 Months (6 Years)</option>
              <option value={84}>84 Months (7 Years)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
            <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col justify-center">
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Estimated Monthly Payment</p>
          <div className="text-5xl font-extrabold text-gray-900">${results.payment.toFixed(2)}</div>
        </div>

        {results.chartData && results.chartData.length > 0 && (
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={results.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {results.chartData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Loan Amount (Principal)</span>
            <span className="font-semibold">${results.principal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Total Interest Paid</span>
            <span className="font-semibold text-red-600">${results.totalInterest.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Total Cost of Car</span>
            <span className="font-semibold text-blue-600">${results.totalCost.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
