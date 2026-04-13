import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useCurrency } from '../contexts/CurrencyContext';
import { Car, Wallet, ArrowDownCircle, Calendar, Percent } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';

export default function CarLoanCalculator() {
  const { currency, formatCurrency } = useCurrency();
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <CalculatorInput
          label="Car Price"
          value={price}
          onChange={setPrice}
          icon={Car}
          prefix={currency.symbol}
          min={0}
        />
        
        <div className="grid grid-cols-2 gap-6">
          <CalculatorInput
            label="Down Payment"
            value={downPayment}
            onChange={setDownPayment}
            icon={Wallet}
            prefix={currency.symbol}
            min={0}
          />
          <CalculatorInput
            label="Trade-in Value"
            value={tradeIn}
            onChange={setTradeIn}
            icon={ArrowDownCircle}
            prefix={currency.symbol}
            min={0}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              Loan Term
            </label>
            <select 
              value={term} 
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full bg-white border-2 border-gray-100 rounded-xl py-3 px-4 transition-all outline-none hover:border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 text-gray-900 font-medium"
            >
              <option value={36}>36 Months (3 Years)</option>
              <option value={48}>48 Months (4 Years)</option>
              <option value={60}>60 Months (5 Years)</option>
              <option value={72}>72 Months (6 Years)</option>
              <option value={84}>84 Months (7 Years)</option>
            </select>
          </div>
          <CalculatorInput
            label="Interest Rate"
            value={rate}
            onChange={setRate}
            icon={Percent}
            suffix="%"
            step={0.1}
            min={0}
          />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <CalculatorResult
          label="Estimated Monthly Payment"
          value={formatCurrency(results.payment)}
          color="blue"
        />

        <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8 text-center">Loan Breakdown</h3>
          
          {results.chartData && results.chartData.length > 0 && (
            <div className="h-64 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={results.chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {results.chartData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => formatCurrency(value)} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-sm font-bold text-gray-600">Loan Amount (Principal)</span>
              <span className="font-bold text-gray-900">{formatCurrency(results.principal)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-sm font-bold text-gray-600">Total Interest Paid</span>
              <span className="font-bold text-red-600">{formatCurrency(results.totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-blue-50 transition-colors">
              <span className="text-sm font-bold text-blue-700">Total Cost of Car</span>
              <span className="font-bold text-blue-900">{formatCurrency(results.totalCost)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
