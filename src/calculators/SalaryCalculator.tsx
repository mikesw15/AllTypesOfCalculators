import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useCurrency } from '../contexts/CurrencyContext';
import { Banknote, Clock, Calendar, Wallet } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import CalculatorToggle from '../components/calculator/CalculatorToggle';
import SaveProfile from '../components/calculator/SaveProfile';

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <CalculatorInput
          label="Salary Amount"
          value={amount}
          onChange={setAmount}
          icon={Banknote}
          prefix={currency.symbol}
          min={0}
          max={frequency === 'hourly' ? 500 : 500000}
          step={frequency === 'hourly' ? 1 : 1000}
        />
        
        <div className="grid grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              Frequency
            </label>
            <select 
              value={frequency} 
              onChange={(e) => setFrequency(e.target.value as any)}
              className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl py-3 px-4 transition-all outline-none hover:border-gray-200 dark:hover:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 text-gray-900 dark:text-white font-medium"
            >
              <option value="hourly">Hourly</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <CalculatorInput
            label="Hours per Week"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
            icon={Clock}
            suffix="hrs"
            min={1}
            max={80}
          />
        </div>

        <SaveProfile 
          calculatorId="salary"
          calculatorTitle="Salary Calculator"
          inputs={{ amount, frequency, hoursPerWeek }}
          results={{ yearly: results.yearly, takeHome: results.takeHome }}
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border-2 border-blue-100 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-xl">
              <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Take-Home Estimate</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">Rough estimation based on standard tax brackets.</p>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                <div>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">Yearly Take-Home</p>
                  <p className="text-xl font-bold text-blue-900 dark:text-white">{formatCurrency(results.takeHome)}</p>
                </div>
                <div>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">Estimated Taxes</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">{formatCurrency(results.estimatedTaxes)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <CalculatorResult
          label="Yearly Gross Salary"
          value={formatCurrency(results.yearly)}
          color="blue"
        />

        <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8 text-center">Pay Breakdown</h3>
          
          <div className="h-48 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={results.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {results.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => formatCurrency(value)} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Hourly', value: results.hourly },
              { label: 'Daily (8h)', value: results.daily },
              { label: 'Weekly', value: results.weekly },
              { label: 'Monthly', value: results.monthly },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-sm font-bold text-gray-600">{item.label}</span>
                <span className="font-bold text-gray-900">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
