import React, { useState } from 'react';
import { Activity, Ruler, User, Info, Percent } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import CalculatorToggle from '../components/calculator/CalculatorToggle';

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number>(180);
  const [height, setHeight] = useState<number>(70);
  const [neck, setNeck] = useState<number>(15);
  const [waist, setWaist] = useState<number>(34);
  const [hips, setHips] = useState<number>(40); // Only for females

  // US Navy Method Formula
  // Male: 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
  // Female: 163.205 * log10(waist + hips - neck) - 97.684 * log10(height) - 78.387
  
  let bodyFat = 0;
  if (gender === 'male') {
    bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else {
    bodyFat = 163.205 * Math.log10(waist + hips - neck) - 97.684 * Math.log10(height) - 78.387;
  }

  // Ensure body fat is not negative or unrealistically high
  bodyFat = Math.max(2, Math.min(60, bodyFat));

  const getCategory = (bf: number) => {
    if (gender === 'male') {
      if (bf < 6) return { label: 'Essential Fat', color: 'blue' };
      if (bf < 14) return { label: 'Athletes', color: 'green' };
      if (bf < 18) return { label: 'Fitness', color: 'green' };
      if (bf < 25) return { label: 'Average', color: 'yellow' };
      return { label: 'Obese', color: 'red' };
    } else {
      if (bf < 14) return { label: 'Essential Fat', color: 'blue' };
      if (bf < 21) return { label: 'Athletes', color: 'green' };
      if (bf < 25) return { label: 'Fitness', color: 'green' };
      if (bf < 32) return { label: 'Average', color: 'yellow' };
      return { label: 'Obese', color: 'red' };
    }
  };

  const category = getCategory(bodyFat);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              Basic Info
            </h3>
            <div className="space-y-6">
              <CalculatorToggle
                label="Gender"
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' }
                ]}
                value={gender}
                onChange={setGender}
              />
              <div className="grid grid-cols-2 gap-4">
                <CalculatorInput
                  label="Weight"
                  value={weight}
                  onChange={setWeight}
                  suffix="lbs"
                  min={0}
                />
                <CalculatorInput
                  label="Height"
                  value={height}
                  onChange={setHeight}
                  suffix="in"
                  min={0}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-blue-500" />
              Measurements
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Neck"
                value={neck}
                onChange={setNeck}
                suffix="in"
                min={0}
              />
              <CalculatorInput
                label="Waist"
                value={waist}
                onChange={setWaist}
                suffix="in"
                min={0}
              />
              {gender === 'female' && (
                <div className="col-span-2">
                  <CalculatorInput
                    label="Hips"
                    value={hips}
                    onChange={setHips}
                    suffix="in"
                    min={0}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <CalculatorResult
            label="Estimated Body Fat"
            value={`${bodyFat.toFixed(1)}%`}
            description={`Category: ${category.label}`}
            color={category.color as any}
            icon={<Percent className="w-8 h-8" />}
          />

          <div className="bg-white p-8 rounded-3xl border-2 border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4">Body Fat Categories</h4>
            <div className="space-y-3">
              {[
                { label: 'Essential Fat', male: '2-5%', female: '10-13%' },
                { label: 'Athletes', male: '6-13%', female: '14-20%' },
                { label: 'Fitness', male: '14-17%', female: '21-24%' },
                { label: 'Average', male: '18-24%', female: '25-31%' },
                { label: 'Obese', male: '25%+', female: '32%+' }
              ].map((row) => (
                <div key={row.label} className={`flex justify-between p-3 rounded-xl text-sm ${category.label === row.label ? 'bg-blue-50 font-bold text-blue-700' : 'text-gray-600'}`}>
                  <span>{row.label}</span>
                  <span>{gender === 'male' ? row.male : row.female}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 flex gap-4">
            <Info className="w-6 h-6 text-blue-500 shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-bold mb-1">About the Navy Method:</p>
              <p className="opacity-80">
                This method is a common and accessible way to estimate body fat, but it has a margin of error of about 3-4%. For more precise results, consider DEXA scans or hydrostatic weighing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
