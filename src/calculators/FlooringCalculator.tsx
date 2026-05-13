import React, { useState } from 'react';
import { Grid, Info } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

export default function FlooringCalculator() {
  const { currency, formatCurrency } = useCurrency();
  const [length, setLength] = useState<number>(15);
  const [width, setWidth] = useState<number>(12);
  const [wasteFactor, setWasteFactor] = useState<number>(10);
  const [boxCoverage, setBoxCoverage] = useState<number>(20);
  const [pricePerSqFt, setPricePerSqFt] = useState<number>(2.50);

  // Calculate
  const area = length * width;
  const areaWithWaste = area * (1 + (wasteFactor / 100));
  const boxesNeeded = Math.ceil(areaWithWaste / boxCoverage);
  const totalCost = areaWithWaste * pricePerSqFt;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 border-b pb-2">Room Dimensions (Feet)</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 border-b pb-2">Material Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Waste Factor (%)</label>
              <select
                value={wasteFactor}
                onChange={(e) => setWasteFactor(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors bg-white"
              >
                <option value={5}>5% (Simple rooms)</option>
                <option value={10}>10% (Standard rooms)</option>
                <option value={15}>15% (Complex rooms/patterns)</option>
                <option value={20}>20% (Diagonal patterns)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Box Coverage (sq ft)</label>
              <input
                type="number"
                value={boxCoverage}
                onChange={(e) => setBoxCoverage(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per sq ft ({currency.symbol})</label>
              <input
                type="number"
                value={pricePerSqFt}
                onChange={(e) => setPricePerSqFt(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-amber-50 rounded-2xl border-2 border-amber-100 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <Grid className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">You will need</h3>
          <div className="text-5xl font-extrabold text-amber-600 mb-2">
            {boxesNeeded} <span className="text-2xl text-amber-500">Boxes</span>
          </div>
          
          <div className="mt-6 pt-6 border-t border-amber-200 grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="block text-gray-500">Room Area</span>
              <span className="font-bold text-gray-900">{area.toFixed(1)} sq ft</span>
            </div>
            <div>
              <span className="block text-gray-500">With Waste</span>
              <span className="font-bold text-gray-900">{areaWithWaste.toFixed(1)} sq ft</span>
            </div>
            <div>
              <span className="block text-gray-500">Est. Cost</span>
              <span className="font-bold text-gray-900">{formatCurrency(totalCost)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
          <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p>
            Always round up to the nearest full box. The 10% waste factor accounts for cuts, mistakes, and future repairs. If you are installing tile diagonally, a 15-20% waste factor is recommended.
          </p>
        </div>
      </div>
    </div>
  );
}
