import React, { useState, useMemo, useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { DollarSign, FileText, Percent, Trash2 } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';
import SaveProfile from '../components/calculator/SaveProfile';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TaxBracket {
  id: string;
  limit: number | null;
  rate: number;
}

export default function TaxCalculator() {
  const { saveToHistory } = useHistory();
  const [income, setIncome] = useState<number>(75000);
  const [deductions, setDeductions] = useState<number>(14600);
  
  const [brackets, setBrackets] = useState<TaxBracket[]>([
    { id: '1', limit: 11600, rate: 10 },
    { id: '2', limit: 47150, rate: 12 },
    { id: '3', limit: 100525, rate: 22 },
    { id: '4', limit: 191950, rate: 24 },
    { id: '5', limit: 243725, rate: 32 },
    { id: '6', limit: 609350, rate: 35 },
    { id: '7', limit: null, rate: 37 }
  ]);

  const addBracket = () => {
    const newBrackets = [...brackets];
    const nullBracket = newBrackets.find(b => b.limit === null);
    const regularBrackets = newBrackets.filter(b => b.limit !== null);
    
    // Default inserting a new bracket 10k higher than the highest regular one
    let newLimit = 10000;
    if (regularBrackets.length > 0) {
      const limits = regularBrackets.map(b => b.limit || 0);
      newLimit = Math.max(...limits) + 10000;
    }
    
    regularBrackets.push({ id: Math.random().toString(), limit: newLimit, rate: 10 });
    if (nullBracket) regularBrackets.push(nullBracket);
    
    setBrackets(regularBrackets);
  };

  const removeBracket = (id: string) => {
    setBrackets(brackets.filter(b => b.id !== id));
  };

  const updateBracket = (id: string, field: 'limit' | 'rate', value: number | null) => {
    setBrackets(brackets.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const results = useMemo(() => {
    const taxableIncome = Math.max(0, income - deductions);
    let totalTax = 0;
    let marginalRate = 0;
    let bracketBreakdown: { rate: number; taxedAmount: number; tax: number; rangeStr: string }[] = [];

    // Sort brackets by limit (null is Infinity)
    const sortedBrackets = [...brackets].sort((a, b) => {
      const limitA = a.limit === null ? Infinity : a.limit;
      const limitB = b.limit === null ? Infinity : b.limit;
      return limitA - limitB;
    });

    let previousLimit = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of sortedBrackets) {
      const currentLimit = bracket.limit !== null ? bracket.limit : Infinity;
      const limitDiff = currentLimit - previousLimit;
      const amountInBracket = Math.max(0, Math.min(remainingIncome, limitDiff));
      
      if (amountInBracket > 0) {
        const taxInBracket = amountInBracket * (bracket.rate / 100);
        totalTax += taxInBracket;
        marginalRate = bracket.rate;
        bracketBreakdown.push({
          rate: bracket.rate,
          taxedAmount: amountInBracket,
          tax: taxInBracket,
          rangeStr: currentLimit === Infinity 
            ? `$${previousLimit.toLocaleString()} +`
            : `$${previousLimit.toLocaleString()} - $${currentLimit.toLocaleString()}`
        });
      }

      previousLimit = currentLimit === Infinity ? previousLimit : currentLimit;
      remainingIncome -= amountInBracket;
      if (remainingIncome <= 0) break; // Finished taxing all income
    }

    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;
    const netIncome = income - totalTax;

    return {
      taxableIncome,
      totalTax,
      effectiveRate,
      marginalRate,
      netIncome,
      bracketBreakdown,
      chartData: [
        { name: 'Net Income', value: netIncome },
        { name: 'Total Tax', value: totalTax }
      ]
    };
  }, [income, deductions, brackets]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToHistory(
        'tax-calculator',
        'Tax Liability',
        { income, deductions },
        { totalTax: results.totalTax.toFixed(2), effectiveRate: results.effectiveRate.toFixed(1) + '%' }
      );
    }, 3000);
    return () => clearTimeout(timer);
  }, [income, deductions, results, saveToHistory]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalculatorInput label="Gross Income ($)" value={income} onChange={setIncome} icon={DollarSign} min={0} />
          <CalculatorInput label="Total Deductions ($)" value={deductions} onChange={setDeductions} icon={DollarSign} min={0} />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Tax Brackets
            </h3>
            <button onClick={addBracket} className="text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
              + Add Bracket
            </button>
          </div>
          
          <div className="space-y-3">
            {brackets.map((bracket, index) => (
              <div key={bracket.id} className="flex gap-3 items-center">
                <span className="text-sm font-medium text-gray-500 w-6">{index + 1}.</span>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">Up to $</span>
                  </div>
                  <input
                    type="number"
                    value={bracket.limit === null ? '' : bracket.limit}
                    onChange={(e) => updateBracket(bracket.id, 'limit', e.target.value ? parseFloat(e.target.value) : 0)}
                    className="w-full pl-16 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder={bracket.limit === null ? "Infinity (Remaining)" : "Max Amount"}
                    disabled={bracket.limit === null}
                  />
                </div>
                <div className="relative w-28">
                   <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">%</span>
                  </div>
                  <input
                    type="number"
                    value={bracket.rate}
                    onChange={(e) => updateBracket(bracket.id, 'rate', parseFloat(e.target.value) || 0)}
                    className="w-full pr-8 pl-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium text-sm text-right"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                {brackets.length > 1 && bracket.limit !== null ? (
                  <button 
                    onClick={() => removeBracket(bracket.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="w-8"></div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            Note: Brackets are automatically sorted from lowest to highest limit during calculation.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorResult
            label="Total Tax Liability"
            value={`$${results.totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            color="red"
          />
          <CalculatorResult
            label="Net Income"
            value={`$${results.netIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">Taxable Income</div>
            <div className="text-lg font-black text-gray-900">${results.taxableIncome.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">Marginal Rate</div>
            <div className="text-lg font-black text-gray-900">{results.marginalRate.toFixed(1)}%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">Effective Rate</div>
            <div className="text-lg font-black text-gray-900">{results.effectiveRate.toFixed(1)}%</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm h-64">
          <h3 className="font-bold text-gray-900 mb-2">Income vs Tax</h3>
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
                <Cell fill="#10b981" /> {/* green for Net Income */}
                <Cell fill="#ef4444" /> {/* red for Tax */}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {results.bracketBreakdown.length > 0 && (
          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Tax Breakdown</h3>
            <div className="space-y-3">
              {results.bracketBreakdown.map((b, i) => (
                <div key={i} className="flex flex-col border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-medium text-gray-700">{b.rangeStr} <span className="text-gray-400">({b.rate}%)</span></span>
                    <span className="font-bold text-gray-900">${b.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Tax on ${b.taxedAmount.toLocaleString()} at {b.rate}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <SaveProfile 
          calculatorId="tax-calculator"
          calculatorTitle="Tax Liability"
          inputs={{ income, deductions }}
          results={{ totalTax: results.totalTax, netIncome: results.netIncome }}
        />
      </div>
    </div>
  );
}
