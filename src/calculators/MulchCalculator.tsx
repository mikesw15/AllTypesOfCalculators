import React, { useState, useMemo, useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { Ruler, Maximize, Layers } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';

export default function MulchCalculator() {
  const { saveToHistory } = useHistory();
  const [length, setLength] = useState<number>(20); // feet
  const [width, setWidth] = useState<number>(10); // feet
  const [depth, setDepth] = useState<number>(3); // inches
  const [bagSize, setBagSize] = useState<number>(2); // cubic feet

  const result = useMemo(() => {
    // Area in square feet
    const areaSqFt = length * width;
    
    // Depth in feet
    const depthFt = depth / 12;
    
    // Volume in cubic feet
    const cubicFeet = areaSqFt * depthFt;
    
    // Volume in cubic yards (1 cubic yard = 27 cubic feet)
    const cubicYards = cubicFeet / 27;
    
    // Number of bags
    const bagsNeeded = Math.ceil(cubicFeet / bagSize);

    return {
      areaSqFt,
      cubicFeet,
      cubicYards,
      bagsNeeded
    };
  }, [length, width, depth, bagSize]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToHistory(
        'mulch-calculator',
        'Mulch / Landscaping',
        { length, width, depth, bagSize },
        { 
          cubicYards: result.cubicYards.toFixed(2), 
          bagsNeeded: result.bagsNeeded 
        }
      );
    }, 3000);
    return () => clearTimeout(timer);
  }, [length, width, depth, bagSize, result, saveToHistory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <CalculatorInput
          label="Area Length (feet)"
          value={length}
          onChange={setLength}
          icon={Ruler}
          min={0}
        />
        <CalculatorInput
          label="Area Width (feet)"
          value={width}
          onChange={setWidth}
          icon={Maximize}
          min={0}
        />
        <CalculatorInput
          label="Depth to Fill (inches)"
          value={depth}
          onChange={setDepth}
          icon={Layers}
          min={0}
          step={0.5}
        />
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-2">Bag Size (Cubic Feet)</label>
          <select
            value={bagSize}
            onChange={(e) => setBagSize(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium"
          >
            <option value={1}>1 Cubic Foot</option>
            <option value={1.5}>1.5 Cubic Feet</option>
            <option value={2}>2 Cubic Feet (Standard)</option>
            <option value={3}>3 Cubic Feet</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <CalculatorResult
          label="Total Cubic Yards"
          value={result.cubicYards.toFixed(2)}
          subValue="yd³"
          description={`Volume needed in cubic yards for a ${result.areaSqFt.toFixed(0)} sq ft area at ${depth}" depth.`}
          color="blue"
        />

        <CalculatorResult
          label={`Bags Needed (${bagSize} cu ft)`}
          value={result.bagsNeeded.toString()}
          subValue="bags"
          description={`Number of ${bagSize} cu ft bags you'll need to purchase (rounded up).`}
          color="green"
        />

        <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
          <h3 className="font-bold text-gray-900 mb-4">Coverage Facts</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Area size: <span className="font-medium text-gray-900">{result.areaSqFt.toFixed(2)} sq ft</span></li>
            <li>• Total volume: <span className="font-medium text-gray-900">{result.cubicFeet.toFixed(2)} cu ft</span></li>
            <li>• 1 cubic yard = 27 cubic feet</li>
            <li>• 1 cubic yard covers approx. 108 sq ft at 3" depth</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
