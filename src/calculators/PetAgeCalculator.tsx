import React, { useState, useMemo, useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { Settings, HelpCircle, History } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';

export default function PetAgeCalculator() {
  const { saveToHistory } = useHistory();
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [dogSize, setDogSize] = useState<'small' | 'medium' | 'large'>('small');
  const [years, setYears] = useState<number>(3);
  const [months, setMonths] = useState<number>(0);

  const humanAge = useMemo(() => {
    const totalYears = years + (months / 12);
    if (totalYears === 0) return 0;

    let age = 0;
    
    if (petType === 'cat') {
      if (totalYears <= 1) age = totalYears * 15;
      else if (totalYears <= 2) age = 15 + ((totalYears - 1) * 9);
      else age = 24 + ((totalYears - 2) * 4);
    } else {
      if (totalYears <= 1) age = totalYears * 15;
      else if (totalYears <= 2) age = 15 + ((totalYears - 1) * 9);
      else {
        age = 24;
        const extraYears = totalYears - 2;
        if (dogSize === 'small') age += extraYears * 4;
        else if (dogSize === 'medium') age += extraYears * 5;
        else age += extraYears * 6; // large/giant
      }
    }
    
    return age;
  }, [petType, dogSize, years, months]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToHistory(
        'pet-age-calculator',
        'Pet Age',
        { petType, dogSize: petType === 'dog' ? dogSize : undefined, years, months },
        { humanAge: humanAge.toFixed(1) }
      );
    }, 3000);
    return () => clearTimeout(timer);
  }, [petType, dogSize, years, months, humanAge, saveToHistory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setPetType('dog')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${petType === 'dog' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Dog
          </button>
          <button
            onClick={() => setPetType('cat')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${petType === 'cat' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Cat
          </button>
        </div>

        {petType === 'dog' && (
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-2">Dog Size</label>
            <select
              value={dogSize}
              onChange={(e) => setDogSize(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="small">Small (20 lbs or less)</option>
              <option value="medium">Medium (21-50 lbs)</option>
              <option value="large">Large/Giant (51+ lbs)</option>
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <CalculatorInput
            label="Years"
            value={years}
            onChange={setYears}
            icon={History}
            min={0}
            max={30}
          />
          <CalculatorInput
            label="Months"
            value={months}
            onChange={setMonths}
            icon={History}
            min={0}
            max={11}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <CalculatorResult
          label={`${petType === 'dog' ? 'Dog' : 'Cat'}'s Human Age`}
          value={humanAge.toFixed(1)}
          subValue="years old"
          description={`Your ${petType} is roughly ${humanAge.toFixed(1)} years old in human terms.`}
          color="blue"
        />

        <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
          <h3 className="font-bold text-gray-900 mb-4">How it works</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            The "1 dog year = 7 human years" myth is outdated. Pets age much faster in their first two years. 
            For both cats and dogs, the first year represents about 15 human years, and the second year adds about 9 human years. 
            After that, they age at different rates based on their species and size, with larger dogs aging faster than smaller dogs or cats.
          </p>
        </div>
      </div>
    </div>
  );
}
