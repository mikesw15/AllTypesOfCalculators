import React, { useState, useMemo, useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import CalculatorToggle from '../components/calculator/CalculatorToggle';
import { Scale, Ruler } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';

export default function BMICalculator() {
  const { saveToHistory } = useHistory();
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

  useEffect(() => {
    if (bmi > 0) {
      const timer = setTimeout(() => {
        saveToHistory('bmi', 'BMI Calculator', { weight, system }, { bmi: bmi.toFixed(1), category: category.label });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [bmi, saveToHistory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Inputs */}
      <div className="space-y-8">
        <CalculatorToggle
          label="Measurement System"
          value={system}
          onChange={setSystem}
          options={[
            { label: 'Imperial (lbs, ft/in)', value: 'imperial' },
            { label: 'Metric (kg, cm)', value: 'metric' }
          ]}
        />

        <CalculatorInput
          label={`Weight (${system === 'imperial' ? 'lbs' : 'kg'})`}
          value={weight}
          onChange={setWeight}
          icon={Scale}
          suffix={system === 'imperial' ? 'lbs' : 'kg'}
          min={0}
        />

        {system === 'imperial' ? (
          <div className="grid grid-cols-2 gap-6">
            <CalculatorInput
              label="Height (ft)"
              value={heightFt}
              onChange={setHeightFt}
              icon={Ruler}
              suffix="ft"
              min={0}
            />
            <CalculatorInput
              label="Height (in)"
              value={heightIn}
              onChange={setHeightIn}
              suffix="in"
              min={0}
              max={11}
            />
          </div>
        ) : (
          <CalculatorInput
            label="Height (cm)"
            value={heightCm}
            onChange={setHeightCm}
            icon={Ruler}
            suffix="cm"
            min={0}
          />
        )}
      </div>

      {/* Results */}
      <div className="flex flex-col gap-8">
        <CalculatorResult
          label="Your Body Mass Index"
          value={bmi > 0 ? bmi.toFixed(1) : '0.0'}
          description={`You are in the ${category.label.toLowerCase()} category.`}
          color={
            category.label === 'Normal weight' ? 'green' :
            category.label === 'Underweight' ? 'blue' :
            category.label === 'Overweight' ? 'yellow' : 'red'
          }
        />

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">BMI Scale</p>
          <div className="space-y-4">
            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden flex">
              <div className="bg-blue-400 h-full" style={{ width: '24%' }} title="Underweight (<18.5)"></div>
              <div className="bg-green-400 h-full" style={{ width: '34%' }} title="Normal (18.5-24.9)"></div>
              <div className="bg-yellow-400 h-full" style={{ width: '21%' }} title="Overweight (25-29.9)"></div>
              <div className="bg-red-400 h-full" style={{ width: '21%' }} title="Obese (30+)"></div>
              
              {/* Indicator */}
              {bmi > 0 && (
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-gray-900 shadow-lg transition-all duration-500"
                  style={{ 
                    left: `${Math.min(Math.max((bmi / 40) * 100, 0), 100)}%`,
                    transform: 'translateX(-50%)'
                  }}
                />
              )}
            </div>
            <div className="flex justify-between text-[10px] font-bold text-gray-400 px-1">
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { label: 'Underweight', range: '< 18.5', color: 'bg-blue-400' },
              { label: 'Normal', range: '18.5 - 24.9', color: 'bg-green-400' },
              { label: 'Overweight', range: '25 - 29.9', color: 'bg-yellow-400' },
              { label: 'Obese', range: '30+', color: 'bg-red-400' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-[10px] font-bold text-gray-500 uppercase">{item.label}</span>
                <span className="text-[10px] text-gray-400 ml-auto">{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
