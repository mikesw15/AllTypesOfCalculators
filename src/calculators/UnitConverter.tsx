import React, { useState, useMemo } from 'react';

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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-center gap-4 mb-8">
        <button onClick={() => handleCategoryChange('Length')} className={`px-6 py-2 rounded-full font-medium ${category === 'Length' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Length</button>
        <button onClick={() => handleCategoryChange('Weight')} className={`px-6 py-2 rounded-full font-medium ${category === 'Weight' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Weight</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="flex gap-2">
            <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="flex gap-2">
            <div className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 font-semibold flex items-center overflow-hidden">
              {result.toPrecision(6)}
            </div>
            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}