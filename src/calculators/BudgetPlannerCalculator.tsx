import React, { useState, useMemo } from 'react';
import { Plus, Trash2, PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight, Wallet, Banknote, Coffee, Home, Car, Shield, Lightbulb } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { useCurrency } from '../contexts/CurrencyContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: 'Housing' | 'Transport' | 'Food' | 'Utilities' | 'Insurance' | 'Entertainment' | 'Other';
}

const CATEGORIES = [
  { name: 'Housing', icon: Home, color: '#3b82f6' },
  { name: 'Transport', icon: Car, color: '#eab308' },
  { name: 'Food', icon: Coffee, color: '#f97316' },
  { name: 'Utilities', icon: Lightbulb, color: '#8b5cf6' },
  { name: 'Insurance', icon: Shield, color: '#10b981' },
  { name: 'Entertainment', icon: PieChartIcon, color: '#ec4899' },
  { name: 'Other', icon: Wallet, color: '#6b7280' },
];

export default function BudgetPlannerCalculator() {
  const { currency, formatCurrency } = useCurrency();
  const [income, setIncome] = useState<number>(4000);
  const [expenses, setExpenses] = useState<BudgetItem[]>([
    { id: '1', name: 'Rent/Mortgage', amount: 1200, category: 'Housing' },
    { id: '2', name: 'Groceries', amount: 400, category: 'Food' },
    { id: '3', name: 'Car Payment', amount: 300, category: 'Transport' },
    { id: '4', name: 'Electricity/Water', amount: 150, category: 'Utilities' },
    { id: '5', name: 'Netflix/Gym', amount: 50, category: 'Entertainment' },
  ]);

  const results = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const savings = income - totalExpenses;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;

    const categoryData = CATEGORIES.map(cat => ({
      name: cat.name,
      value: expenses.filter(e => e.category === cat.name).reduce((sum, e) => sum + e.amount, 0),
      color: cat.color
    })).filter(d => d.value > 0);

    return { totalExpenses, savings, savingsRate, categoryData };
  }, [income, expenses]);

  const addExpense = () => {
    const newExpense: BudgetItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Expense',
      amount: 0,
      category: 'Other'
    };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (id: string, field: keyof BudgetItem, value: any) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Banknote className="w-5 h-5 text-green-500" />
            Monthly Income
          </h3>
          <CalculatorInput
            label="Total Monthly Income"
            value={income}
            onChange={setIncome}
            prefix={currency.symbol}
            min={0}
          />
        </div>

        <div className="bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ArrowDownRight className="w-5 h-5 text-red-500" />
              Monthly Expenses
            </h3>
            <button
              onClick={addExpense}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          <div className="space-y-3">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group transition-all hover:bg-white hover:border-blue-200">
                <input
                  type="text"
                  value={expense.name}
                  onChange={(e) => updateExpense(expense.id, 'name', e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 font-bold text-gray-900 p-0 outline-none placeholder:text-gray-300"
                  placeholder="Expense name"
                />
                
                <div className="flex items-center gap-3">
                  <select
                    value={expense.category}
                    onChange={(e) => updateExpense(expense.id, 'category', e.target.value as any)}
                    className="bg-white border text-sm rounded-lg px-2 py-1 outline-none focus:border-blue-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>

                  <div className="relative w-28">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{currency.symbol}</span>
                    <input
                      type="number"
                      value={expense.amount}
                      onChange={(e) => updateExpense(expense.id, 'amount', Number(e.target.value))}
                      className="w-full bg-white border rounded-lg pl-7 pr-3 py-1 text-sm font-bold text-gray-900 outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    onClick={() => removeExpense(expense.id)}
                    className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CalculatorResult
            label="Total Monthly Savings"
            value={formatCurrency(results.savings)}
            color={results.savings >= 0 ? 'green' : 'red'}
            icon={results.savings >= 0 ? <ArrowUpRight className="w-8 h-8 text-green-500" /> : <ArrowDownRight className="w-8 h-8 text-red-500" />}
          />
          <CalculatorResult
            label="Savings Rate"
            value={`${results.savingsRate.toFixed(1)}%`}
            color="blue"
            description={results.savingsRate > 20 ? "Excellent savings rate!" : results.savingsRate > 0 ? "Good start. Aim for 20%." : "Try to reduce expenses."}
          />
        </div>

        <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8 text-center">Expense Breakdown</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={results.categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {results.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {CATEGORIES.map(cat => {
                const amount = expenses.filter(e => e.category === cat.name).reduce((sum, e) => sum + e.amount, 0);
                if (amount === 0) return null;
                const percent = (amount / results.totalExpenses) * 100;
                
                return (
                  <div key={cat.name} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm font-medium text-gray-600">{cat.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(amount)}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{percent.toFixed(1)}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gray-900 text-white shadow-xl shadow-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bold">Budget Summary</h4>
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${results.savings >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {results.savings >= 0 ? 'Surplus' : 'Deficit'}
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm opacity-60">
              <span>Gross Income</span>
              <span>{formatCurrency(income)}</span>
            </div>
            <div className="flex justify-between text-sm opacity-60">
              <span>Total Expenses</span>
              <span>{formatCurrency(results.totalExpenses)}</span>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="font-bold text-xl">Monthly Net</span>
              <span className={`text-2xl font-black ${results.savings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(results.savings)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
