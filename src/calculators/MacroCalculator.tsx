import React, { useMemo } from 'react';
import { Apple, Scale, Ruler } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import { useCalculatorState } from '../hooks/useCalculatorState';
import { useUnit } from '../contexts/UnitContext';

export default function MacroCalculator() {
  const { unit } = useUnit();
  const isMetric = unit === 'metric';

  const [gender, setGender] = useCalculatorState<'male' | 'female'>('gender', 'male');
  const [age, setAge] = useCalculatorState('age', 30);
  
  const [weightKg, setWeightKg] = useCalculatorState('weightKg', 70);
  const [weightLbs, setWeightLbs] = useCalculatorState('weightLbs', 154);

  const [heightCm, setHeightCm] = useCalculatorState('heightCm', 175);
  const [heightFt, setHeightFt] = useCalculatorState('heightFt', 5);
  const [heightIn, setHeightIn] = useCalculatorState('heightIn', 9);

  const [activity, setActivity] = useCalculatorState('activity', 1.55);
  const [goal, setGoal] = useCalculatorState('goal', 0); // 0 = maintain, -500 = cut, +500 = bulk
  const [diet, setDiet] = useCalculatorState('diet', 'balanced'); // balanced, low-carb, high-protein

  const results = useMemo(() => {
    let weight = isMetric ? weightKg : weightLbs / 2.20462;
    let height = isMetric ? heightCm : (heightFt * 30.48) + (heightIn * 2.54);

    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activity;
    const targetCalories = tdee + goal;

    let proteinPercent = 0.3;
    let fatPercent = 0.3;
    let carbPercent = 0.4;

    if (diet === 'low-carb') {
      proteinPercent = 0.4;
      fatPercent = 0.4;
      carbPercent = 0.2;
    } else if (diet === 'high-protein') {
      proteinPercent = 0.4;
      fatPercent = 0.3;
      carbPercent = 0.3;
    }

    const proteinGrams = (targetCalories * proteinPercent) / 4;
    const fatGrams = (targetCalories * fatPercent) / 9;
    const carbGrams = (targetCalories * carbPercent) / 4;

    return {
      calories: Math.round(targetCalories),
      protein: Math.round(proteinGrams),
      fat: Math.round(fatGrams),
      carbs: Math.round(carbGrams)
    };
  }, [gender, age, weightKg, weightLbs, heightCm, heightFt, heightIn, activity, goal, diet, isMetric]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Your Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
              <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${gender === 'male' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${gender === 'female' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  Female
                </button>
              </div>
            </div>
            <CalculatorInput label="Age" value={age} onChange={setAge} min={15} max={100} step={1} suffix=" years" />
            
            {isMetric ? (
              <>
                <CalculatorInput label="Weight" value={weightKg} onChange={setWeightKg} min={30} max={300} step={1} suffix=" kg" icon={Scale} />
                <CalculatorInput label="Height" value={heightCm} onChange={setHeightCm} min={100} max={250} step={1} suffix=" cm" icon={Ruler} />
              </>
            ) : (
              <>
                <CalculatorInput label="Weight" value={weightLbs} onChange={setWeightLbs} min={60} max={600} step={1} suffix=" lbs" icon={Scale} />
                <div className="grid grid-cols-2 gap-2">
                  <CalculatorInput label="Height (ft)" value={heightFt} onChange={setHeightFt} min={4} max={7} step={1} suffix=" ft" />
                  <CalculatorInput label="Height (in)" value={heightIn} onChange={setHeightIn} min={0} max={11} step={1} suffix=" in" />
                </div>
              </>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white outline-none"
              >
                <option value={1.2}>Sedentary (Little to no exercise)</option>
                <option value={1.375}>Lightly Active (Light exercise 1-3 days/week)</option>
                <option value={1.55}>Moderately Active (Moderate exercise 3-5 days/week)</option>
                <option value={1.725}>Very Active (Hard exercise 6-7 days/week)</option>
                <option value={1.9}>Extra Active (Very hard exercise & physical job)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white outline-none"
              >
                <option value={-500}>Lose Weight (~0.5 kg/week)</option>
                <option value={-250}>Mild Weight Loss (~0.25 kg/week)</option>
                <option value={0}>Maintain Weight</option>
                <option value={250}>Mild Weight Gain (~0.25 kg/week)</option>
                <option value={500}>Gain Weight (~0.5 kg/week)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Diet Preference</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'balanced', label: 'Balanced' },
                  { id: 'low-carb', label: 'Low Carb' },
                  { id: 'high-protein', label: 'High Protein' }
                ].map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDiet(d.id)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border text-center transition-all ${
                      diet === d.id 
                        ? 'border-green-600 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white h-full relative overflow-hidden">
            <Apple className="absolute top-4 right-4 w-24 h-24 text-white opacity-10" />
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-6">Daily Macros</h2>
              
              <div className="text-center mb-8">
                <div className="text-sm text-green-100 uppercase tracking-wider mb-1">Calories</div>
                <div className="text-5xl font-bold">{results.calories}</div>
                <div className="text-green-100 text-sm mt-1">kcal / day</div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-green-50">Protein</span>
                    <span className="font-bold text-lg">{results.protein}g</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: `${(results.protein * 4 / results.calories) * 100}%` }}></div>
                  </div>
                </div>

                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-green-50">Carbs</span>
                    <span className="font-bold text-lg">{results.carbs}g</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: `${(results.carbs * 4 / results.calories) * 100}%` }}></div>
                  </div>
                </div>

                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-green-50">Fat</span>
                    <span className="font-bold text-lg">{results.fat}g</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: `${(results.fat * 9 / results.calories) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
