import React, { useState, useMemo, useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { Percent, Clock } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';
import { useCurrency } from '../contexts/CurrencyContext';
import SaveProfile from '../components/calculator/SaveProfile';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RuleOf72Calculator() {
  const { saveToHistory } = useHistory();
  const { formatCurrency } = useCurrency();
  const [calcMode, setCalcMode] = useState<'years' | 'rate'>('years');
  
  // Calculate Years Mode
  const [interestRate, setInterestRate] = useState<number>(8); // 8%
  
  // Calculate Rate Mode
  const [targetYears, setTargetYears] = useState<number>(10); // 10 years

  const yearsToDouble = useMemo(() => {
    if (interestRate === 0) return 0;
    return 72 / interestRate;
  }, [interestRate]);

  const requiredRate = useMemo(() => {
    if (targetYears === 0) return 0;
    return 72 / targetYears;
  }, [targetYears]);

  const chartData = useMemo(() => {
    const rate = calcMode === 'years' ? interestRate : requiredRate;
    const years = calcMode === 'years' ? Math.ceil(yearsToDouble) : targetYears;
    
    // Fallback if numbers are wild
    if (years > 100 || isNaN(years)) return [];

    let data = [];
    let currentAmount = 10000; // Starting assumption $10k
    
    for (let yr = 0; yr <= years + Math.max(2, Math.ceil(years * 0.2)); yr++) {
      data.push({
        year: `Year ${yr}`,
        value: Math.round(currentAmount),
      });
      currentAmount *= (1 + rate / 100);
    }
    
    return data;
  }, [calcMode, interestRate, requiredRate, yearsToDouble, targetYears]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let inputs = {};
      let result = {};
      
      if (calcMode === 'years') {
        inputs = { type: 'Years to Double', interestRate };
        result = { yearsToDouble: yearsToDouble.toFixed(1) };
      } else {
        inputs = { type: 'Required Rate', targetYears };
        result = { requiredRate: requiredRate.toFixed(2) };
      }
      
      saveToHistory('rule-of-72', 'Rule of 72', inputs, result);
    }, 3000);
    return () => clearTimeout(timer);
  }, [calcMode, interestRate, targetYears, yearsToDouble, requiredRate, saveToHistory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setCalcMode('years')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${calcMode === 'years' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Find Years to Double
          </button>
          <button
            onClick={() => setCalcMode('rate')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${calcMode === 'rate' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Find Required Rate
          </button>
        </div>

        {calcMode === 'years' && (
          <div className="space-y-6">
            <CalculatorInput
              label="Annual Interest Rate / Return (%)"
              value={interestRate}
              onChange={setInterestRate}
              icon={Percent}
              min={0.1}
            />
          </div>
        )}

        {calcMode === 'rate' && (
          <div className="space-y-6">
            <CalculatorInput
              label="Years to Double Investment"
              value={targetYears}
              onChange={setTargetYears}
              icon={Clock}
              min={1}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8">
        {calcMode === 'years' && (
          <CalculatorResult
            label="Years to Double"
            value={yearsToDouble.toFixed(2)}
            subValue="Years"
            description={`At an annual rate of ${interestRate}%, it will take approximately ${yearsToDouble.toFixed(2)} years for your investment to double.`}
            color="green"
          />
        )}

        {calcMode === 'rate' && (
          <CalculatorResult
            label="Required Rate of Return"
            value={requiredRate.toFixed(2)}
            subValue="%"
            description={`To double your investment in ${targetYears} years, you need an annual return of approximately ${requiredRate.toFixed(2)}%.`}
            color="blue"
          />
        )}

        {chartData.length > 0 && (
          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm h-72">
            <h3 className="font-bold text-gray-900 mb-4 text-center">Growth Visualization</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={20}
                />
                <YAxis 
                  tickFormatter={(val) => formatCurrency(val).replace(/\.00$/, '')}
                  tick={{ fontSize: 10, fill: '#6B7280' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Balance']}
                  labelStyle={{ color: '#111827', fontWeight: 'bold', marginBottom: '4px' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        
        <SaveProfile 
          calculatorId="rule-of-72"
          calculatorTitle="Rule of 72"
          inputs={calcMode === 'years' ? { mode: 'years', interestRate } : { mode: 'rate', targetYears }}
          results={calcMode === 'years' ? { yearsToDouble } : { requiredRate }}
        />

        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mt-4">
          <h4 className="font-bold text-blue-900 mb-2">What is the Rule of 72?</h4>
          <p className="text-sm text-blue-800 leading-relaxed">
            The Rule of 72 is a quick, useful formula that is popularly used to estimate the number of years required to double the invested money at a given annual rate of return. While it is an estimation, it is incredibly accurate for average interest rates (between 6% and 10%).
          </p>
        </div>
      </div>
    </div>
  );
}
