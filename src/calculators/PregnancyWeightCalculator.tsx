import React, { useMemo, useState } from 'react';
import { Baby, Scale, Ruler } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import { useCalculatorState } from '../hooks/useCalculatorState';
import { useUnit } from '../contexts/UnitContext';

export default function PregnancyWeightCalculator() {
  const { unit } = useUnit();
  const isMetric = unit === 'metric';

  // State
  const [weightKg, setWeightKg] = useCalculatorState('weightKg', 65);
  const [weightLbs, setWeightLbs] = useCalculatorState('weightLbs', 143);
  
  const [heightCm, setHeightCm] = useCalculatorState('heightCm', 165);
  const [heightFt, setHeightFt] = useCalculatorState('heightFt', 5);
  const [heightIn, setHeightIn] = useCalculatorState('heightIn', 5);

  const [twins, setTwins] = useCalculatorState('twins', false);

  const results = useMemo(() => {
    let weight = isMetric ? weightKg : weightLbs / 2.20462;
    let height = isMetric ? heightCm : (heightFt * 30.48) + (heightIn * 2.54);

    if (!weight || !height || height === 0) return null;
    
    // Calculate Pre-pregnancy BMI
    const bmi = weight / Math.pow(height / 100, 2);
    let category = '';
    let minGainKg = 0;
    let maxGainKg = 0;
    
    // IOM Guidelines for weight gain in kg
    if (twins) {
      if (bmi < 18.5) {
        category = 'Underweight (BMI < 18.5)';
        minGainKg = 22.7; maxGainKg = 28.1;
      } else if (bmi < 25) {
        category = 'Normal Weight (BMI 18.5 - 24.9)';
        minGainKg = 16.8; maxGainKg = 24.5;
      } else if (bmi < 30) {
        category = 'Overweight (BMI 25.0 - 29.9)';
        minGainKg = 14.1; maxGainKg = 22.7;
      } else {
        category = 'Obese (BMI ≥ 30)';
        minGainKg = 11.3; maxGainKg = 19.1;
      }
    } else {
      if (bmi < 18.5) {
        category = 'Underweight (BMI < 18.5)';
        minGainKg = 12.5; maxGainKg = 18;
      } else if (bmi < 25) {
        category = 'Normal Weight (BMI 18.5 - 24.9)';
        minGainKg = 11.5; maxGainKg = 16;
      } else if (bmi < 30) {
        category = 'Overweight (BMI 25.0 - 29.9)';
        minGainKg = 7; maxGainKg = 11.5;
      } else {
        category = 'Obese (BMI ≥ 30)';
        minGainKg = 5; maxGainKg = 9;
      }
    }
    
    const displayMultiplier = isMetric ? 1 : 2.20462;
    const unitSuffix = isMetric ? 'kg' : 'lbs';

    const minGain = minGainKg * displayMultiplier;
    const maxGain = maxGainKg * displayMultiplier;
    const displayWeight = isMetric ? weightKg : weightLbs;

    return {
      bmi: bmi.toFixed(1),
      category,
      minGain: minGain.toFixed(1),
      maxGain: maxGain.toFixed(1),
      targetMin: (displayWeight + minGain).toFixed(1),
      targetMax: (displayWeight + maxGain).toFixed(1),
      unitSuffix
    };
  }, [weightKg, weightLbs, heightCm, heightFt, heightIn, twins, isMetric]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 mb-6 dark:text-gray-100">Pre-Pregnancy Details</h2>
          
          <div className="space-y-6">
            {isMetric ? (
              <CalculatorInput
                label="Pre-pregnancy Weight"
                value={weightKg}
                onChange={setWeightKg}
                min={30}
                max={250}
                step={0.5}
                suffix=" kg"
                icon={Scale}
              />
            ) : (
              <CalculatorInput
                label="Pre-pregnancy Weight"
                value={weightLbs}
                onChange={setWeightLbs}
                min={60}
                max={500}
                step={1}
                suffix=" lbs"
                icon={Scale}
              />
            )}

            {isMetric ? (
              <CalculatorInput
                label="Height"
                value={heightCm}
                onChange={setHeightCm}
                min={120}
                max={220}
                step={1}
                suffix=" cm"
                icon={Ruler}
              />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <CalculatorInput
                  label="Height (ft)"
                  value={heightFt}
                  onChange={setHeightFt}
                  min={4}
                  max={7}
                  step={1}
                  suffix=" ft"
                  icon={Ruler}
                />
                <CalculatorInput
                  label="Height (in)"
                  value={heightIn}
                  onChange={setHeightIn}
                  min={0}
                  max={11}
                  step={1}
                  suffix=" in"
                />
              </div>
            )}
            
            <div className="pt-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={twins}
                  onChange={(e) => setTwins(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expecting Twins?</span>
              </label>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 mt-6 dark:bg-blue-900/40">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                These recommendations are based on guidelines from the Institute of Medicine (IOM) and are for educational purposes. Always consult your healthcare provider about your specific weight gain goals.
              </p>
            </div>
          </div>
        </div>

        <div>
          {results && (
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-xl p-6 text-white h-full relative overflow-hidden">
              <Baby className="absolute top-4 right-4 w-24 h-24 text-white opacity-10" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6">Recommended Weight Gain</h2>
                
                <div className="space-y-6">
                  <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="text-pink-100 text-sm mb-1">Pre-pregnancy BMI Category</div>
                    <div className="text-xl font-semibold mb-2">{results.category}</div>
                    <div className="text-sm text-pink-100">BMI: {results.bmi}</div>
                  </div>
                  
                  <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="text-pink-100 text-sm mb-1">Recommended Total Gain</div>
                    <div className="text-3xl font-bold tracking-tight">
                      {results.minGain} – {results.maxGain} {results.unitSuffix}
                    </div>
                  </div>
                  
                  <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="text-pink-100 text-sm mb-1">Estimated Target Weight</div>
                    <div className="text-2xl font-bold">
                      {results.targetMin} – {results.targetMax} {results.unitSuffix}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
