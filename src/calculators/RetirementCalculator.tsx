import React, { useState } from 'react';
import { PiggyBank, TrendingUp, Calendar, DollarSign, Info, Banknote } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useCurrency } from '../contexts/CurrencyContext';

export default function RetirementCalculator() {
  const { currency, formatCurrency } = useCurrency();
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(2.5);

  const yearsToRetire = retirementAge - currentAge;
  const monthsToRetire = yearsToRetire * 12;
  
  const chartData = [];
  let balance = currentSavings;
  const monthlyReturn = (annualReturn / 100) / 12;

  for (let year = 0; year <= yearsToRetire; year++) {
    chartData.push({
      year: currentAge + year,
      balance: Math.round(balance),
      // Future value adjusted for inflation
      inflationAdjusted: Math.round(balance / Math.pow(1 + inflationRate / 100, year))
    });

    for (let month = 0; month < 12; month++) {
      balance = (balance + monthlyContribution) * (1 + monthlyReturn);
    }
  }

  const finalBalance = chartData[chartData.length - 1].balance;
  const finalAdjusted = chartData[chartData.length - 1].inflationAdjusted;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Timeline
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Current Age"
                value={currentAge}
                onChange={setCurrentAge}
                min={0}
                max={retirementAge - 1}
              />
              <CalculatorInput
                label="Retirement Age"
                value={retirementAge}
                onChange={setRetirementAge}
                min={currentAge + 1}
                max={100}
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-blue-500" />
              Savings & Contributions
            </h3>
            <div className="space-y-4">
              <CalculatorInput
                label="Current Savings"
                value={currentSavings}
                onChange={setCurrentSavings}
                prefix={currency.symbol}
                min={0}
              />
              <CalculatorInput
                label="Monthly Contribution"
                value={monthlyContribution}
                onChange={setMonthlyContribution}
                prefix={currency.symbol}
                min={0}
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Market Assumptions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Annual Return"
                value={annualReturn}
                onChange={setAnnualReturn}
                suffix="%"
                step={0.1}
              />
              <CalculatorInput
                label="Inflation Rate"
                value={inflationRate}
                onChange={setInflationRate}
                suffix="%"
                step={0.1}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <CalculatorResult
            label="Estimated Nest Egg"
            value={formatCurrency(finalBalance)}
            description={`In ${yearsToRetire} years at age ${retirementAge}.`}
            color="blue"
            icon={<PiggyBank className="w-8 h-8 text-blue-600" />}
          />

          <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-100">
            <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">Inflation Adjusted Value</p>
            <p className="text-3xl font-black text-green-700">{formatCurrency(finalAdjusted)}</p>
            <p className="text-xs text-green-600/70 mt-1">What this amount is worth in today's money.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 h-64">
            <h4 className="text-sm font-bold text-gray-900 mb-4">Growth Projection</h4>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="year" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Balance']}
                  labelFormatter={(label) => `Age ${label}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="balance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 flex gap-4">
            <Info className="w-6 h-6 text-blue-500 shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-bold mb-1">Note:</p>
              <p className="opacity-80">
                This is a simplified projection. Real-world returns vary, and taxes or fees are not included. Consider consulting a financial advisor for a comprehensive plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
