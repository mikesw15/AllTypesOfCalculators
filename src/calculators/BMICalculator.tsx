import React, { useState, useMemo } from 'react';

export default function BMICalculator() {
  const [system, setSystem] = useState<'metric' | 'imperial'>('imperial');
  const [weight, setWeight] = useState<number>(160); // lbs or kg
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [heightCm, setHeightCm] = useState<number>(175);

  const bmi = useMemo(() => {
    if (system === 'imperial') {
      const totalInches = (heightFt * 12) + heightIn;
      if (totalInches === 0) return 0;
      return (weight / (totalInches * totalInches)) * 703;
    } else {
      const heightM = heightCm / 100;
      if (heightM === 0) return 0;
      return weight / (heightM * heightM);
    }
  }, [system, weight, heightFt, heightIn, heightCm]);

  const getCategory = (bmiValue: number) => {
    if (bmiValue === 0) return { label: '-', color: 'text-gray-500', bg: 'bg-gray-100' };
    if (bmiValue < 18.5) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (bmiValue < 25) return { label: 'Normal weight', color: 'text-green-600', bg: 'bg-green-100' };
    if (bmiValue < 30) return { label: 'Overweight', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const category = getCategory(bmi);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${system === 'imperial' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSystem('imperial')}
          >
            Imperial (lbs, ft/in)
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${system === 'metric' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSystem('metric')}
          >
            Metric (kg, cm)
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight ({system === 'imperial' ? 'lbs' : 'kg'})
          </label>
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {system === 'imperial' ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (ft)</label>
              <input 
                type="number" 
                value={heightFt} 
                onChange={(e) => setHeightFt(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (in)</label>
              <input 
                type="number" 
                value={heightIn} 
                onChange={(e) => setHeightIn(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
            <input 
              type="number" 
              value={heightCm} 
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
      </div>

      {/* Results */}
      <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 flex flex-col items-center justify-center text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Your BMI</p>
        <div className="text-6xl font-extrabold text-gray-900 mb-4">
          {bmi > 0 ? bmi.toFixed(1) : '0.0'}
        </div>
        
        {bmi > 0 && (
          <div className={`px-4 py-2 rounded-full font-semibold ${category.bg} ${category.color}`}>
            {category.label}
          </div>
        )}

        <div className="mt-8 w-full max-w-xs">
          <div className="flex h-4 rounded-full overflow-hidden">
            <div className="bg-blue-400 w-[24%]" title="Underweight (<18.5)"></div>
            <div className="bg-green-400 w-[34%]" title="Normal (18.5-24.9)"></div>
            <div className="bg-yellow-400 w-[21%]" title="Overweight (25-29.9)"></div>
            <div className="bg-red-400 w-[21%]" title="Obese (30+)"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
          </div>
        </div>
      </div>
    </div>
  );
}
