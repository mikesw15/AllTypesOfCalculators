import React, { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

export default function FuelCostCalculator() {
  const { currency, formatCurrency } = useCurrency();
  const [distance, setDistance] = useState<number>(100);
  const [mpg, setMpg] = useState<number>(25);
  const [gasPrice, setGasPrice] = useState<number>(3.50);

  const cost = (distance / mpg) * gasPrice;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Trip Distance (Miles)</label>
        <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Efficiency (MPG)</label>
        <input type="number" value={mpg} onChange={(e) => setMpg(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gas Price ({currency.symbol} per gallon)</label>
        <input type="number" step="0.01" value={gasPrice} onChange={(e) => setGasPrice(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center mt-8">
        <p className="text-sm font-medium text-blue-600 uppercase mb-1">Estimated Fuel Cost</p>
        <div className="text-5xl font-extrabold text-blue-900">{formatCurrency(cost)}</div>
        <p className="text-sm text-blue-600 mt-2">You will need {(distance / mpg).toFixed(2)} gallons of fuel.</p>
      </div>
    </div>
  );
}
