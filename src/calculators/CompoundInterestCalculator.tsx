import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useCurrency } from '../contexts/CurrencyContext';
import { useTheme } from '../contexts/ThemeContext';
import { TrendingUp, Wallet, PlusCircle, Calendar, Percent } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { useCalculatorState } from '../hooks/useCalculatorState';
import SaveProfile from '../components/calculator/SaveProfile';

export default function CompoundInterestCalculator() {
  const { currency, formatCurrency } = useCurrency();
  const { isDark } = useTheme();
  const [principal, setPrincipal] = useCalculatorState<number>('principal', 10000);
  const [monthlyContribution, setMonthlyContribution] = useCalculatorState<number>('monthly', 500);
  const [years, setYears] = useCalculatorState<number>('years', 10);
  const [rate, setRate] = useCalculatorState<number>('rate', 7);

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <CalculatorInput
          label="Initial Investment"
          value={principal}
          onChange={setPrincipal}
          icon={TrendingUp}
          prefix={currency.symbol}
          min={0}
          max={1000000}
          step={1000}
        />
        <CalculatorInput
          label="Monthly Contribution"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          icon={PlusCircle}
          prefix={currency.symbol}
          min={0}
          max={10000}
          step={50}
        />
        <div className="grid grid-cols-2 gap-6">
          <CalculatorInput
            label="Years to Grow"
            value={years}
            onChange={setYears}
            icon={Calendar}
            suffix="yrs"
            min={1}
            max={50}
          />
          <CalculatorInput
            label="Annual Interest Rate"
            value={rate}
            onChange={setRate}
            icon={Percent}
            suffix="%"
            step={0.1}
            min={0}
            max={20}
          />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <CalculatorResult
          label="Future Value"
          value={formatCurrency(futureValue)}
          color="green"
        />

        <SaveProfile 
          calculatorId="compound-interest"
          calculatorTitle="Compound Interest Calculator"
          inputs={{ principal, monthlyContribution, years, rate }}
          results={{ futureValue, totalInterest }}
        />
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-8 text-center">Growth Over Time</h3>
          
          <div className="h-64 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#f3f4f6'} />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  tickFormatter={(val) => `${currency.symbol}${(val/1000).toFixed(0)}k`} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: isDark ? '#1f2937' : '#ffffff', color: isDark ? '#f3f4f6' : '#111827' }}
                  formatter={(value: number) => formatCurrency(value)} 
                  labelFormatter={(label) => `Year ${label}`} 
                />
                <Legend wrapperStyle={{ color: isDark ? '#f3f4f6' : '#111827' }} />
                <Area 
                  type="monotone" 
                  dataKey="principal" 
                  stackId="1" 
                  stroke="#3b82f6" 
                  fill="#93c5fd" 
                  name="Total Contributions" 
                />
                <Area 
                  type="monotone" 
                  dataKey="interest" 
                  stackId="1" 
                  stroke="#22c55e" 
                  fill="#86efac" 
                  name="Interest Earned" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Total Contributions</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(totalContributions)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-green-50 dark:bg-green-500/10 transition-colors">
              <span className="text-sm font-bold text-green-700 dark:text-green-400">Total Interest Earned</span>
              <span className="font-bold text-green-900 dark:text-green-300">{formatCurrency(totalInterest)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
