import React, { useState, useMemo } from 'react';
import { Ruler, Scale, ArrowRightLeft } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import CalculatorToggle from '../components/calculator/CalculatorToggle';

const conversions = {
  Length: {
    Meters: 1,
    Kilometers: 0.001,
    Centimeters: 100,
    Miles: 0.000621371,
    Yards: 1.09361,
    Feet: 3.28084,
    Inches: 39.3701
  },
  Weight: {
    Kilograms: 1,
    Grams: 1000,
    Pounds: 2.20462,
    Ounces: 35.274
  }
};

export default function UnitConverter() {
  const [category, setCategory] = useState<'Length' | 'Weight'>('Length');
  const [fromUnit, setFromUnit] = useState('Meters');
  const [toUnit, setToUnit] = useState('Feet');
  const [value, setValue] = useState<number>(1);

  const units = Object.keys(conversions[category]);

  // Handle category change
  const handleCategoryChange = (cat: 'Length' | 'Weight') => {
    setCategory(cat);
    const newUnits = Object.keys(conversions[cat]);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1]);
  };

  const result = useMemo(() => {
    const catData = conversions[category] as Record<string, number>;
    const fromVal = catData[fromUnit] || 1;
    const toVal = catData[toUnit] || 1;
    const baseValue = value / fromVal;
    return baseValue * toVal;
  }, [category, fromUnit, toUnit, value]);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex justify-center">
        <CalculatorToggle
          label="Conversion Category"
          value={category}
          onChange={(val) => handleCategoryChange(val as 'Length' | 'Weight')}
          options={[
            { label: 'Length', value: 'Length' },
            { label: 'Weight', value: 'Weight' }
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="flex flex-col gap-4">
            <CalculatorInput
              label="From"
              value={value}
              onChange={setValue}
              icon={category === 'Length' ? Ruler : Scale}
              min={0}
            />
            <select 
              value={fromUnit} 
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-white border-2 border-gray-100 rounded-xl py-3 px-4 transition-all outline-none hover:border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 text-gray-900 font-medium"
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="lg:col-span-2 flex justify-center">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full border-2 border-blue-100">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="flex flex-col gap-4">
            <CalculatorResult
              label="Result"
              value={result.toPrecision(6)}
              color="blue"
            />
            <select 
              value={toUnit} 
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-white border-2 border-gray-100 rounded-xl py-3 px-4 transition-all outline-none hover:border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 text-gray-900 font-medium"
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
