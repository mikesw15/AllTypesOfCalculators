import React, { useState } from 'react';
import { Users, DollarSign, Calculator, Info, Wallet } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { useCurrency } from '../contexts/CurrencyContext';

export default function TipCalculator() {
  const { currency, formatCurrency } = useCurrency();
  const [billAmount, setBillAmount] = useState<number>(50);
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);

  const totalTip = billAmount * (tipPercentage / 100);
  const totalBill = billAmount + totalTip;
  const perPerson = totalBill / numberOfPeople;
  const tipPerPerson = totalTip / numberOfPeople;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-blue-500" />
              Bill Details
            </h3>
            <div className="space-y-6">
              <CalculatorInput
                label="Bill Amount"
                value={billAmount}
                onChange={setBillAmount}
                prefix={currency.symbol}
                min={0}
                step={0.01}
              />
              <CalculatorInput
                label="Tip Percentage"
                value={tipPercentage}
                onChange={setTipPercentage}
                suffix="%"
                min={0}
                max={100}
              />
              <div className="flex flex-wrap gap-2">
                {[10, 15, 18, 20, 25].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setTipPercentage(pct)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      tipPercentage === pct 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Split
            </h3>
            <CalculatorInput
              label="Number of People"
              value={numberOfPeople}
              onChange={setNumberOfPeople}
              min={1}
              step={1}
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <CalculatorResult
            label="Total Per Person"
            value={formatCurrency(perPerson)}
            description={`Including ${formatCurrency(tipPerPerson)} tip per person.`}
            color="blue"
            icon={<DollarSign className="w-8 h-8 text-blue-600" />}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-100">
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">Total Tip</p>
              <p className="text-3xl font-black text-green-700">{formatCurrency(totalTip)}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-100">
              <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">Total Bill</p>
              <p className="text-3xl font-black text-purple-700">{formatCurrency(totalBill)}</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border-2 border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4">Summary</h4>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">{formatCurrency(billAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tip ({tipPercentage}%)</span>
                <span className="font-bold text-gray-900">{formatCurrency(totalTip)}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between text-lg font-black">
                <span className="text-gray-900">Total</span>
                <span className="text-blue-600">{formatCurrency(totalBill)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
