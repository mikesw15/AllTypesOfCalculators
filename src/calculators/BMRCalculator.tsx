import React, { useState, useMemo } from 'react';
import { User, Scale, Ruler, Activity, Flame, Zap } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import CalculatorToggle from '../components/calculator/CalculatorToggle';

export default function BMRCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [age, setAge] = useState<number>(25);
  const [activity, setActivity] = useState<number>(1.2);

  const results = useMemo(() => {
    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * activity;

    return {
      bmr,
      tdee,
      maintain: tdee,
      mildLoss: tdee - 250,
      weightLoss: tdee - 500,
      extremeLoss: tdee - 1000,
      mildGain: tdee + 250,
      weightGain: tdee + 500,
    };
  }, [gender, weight, height, age, activity]);

  const activityLevels = [
    { label: 'Sedentary (office job)', value: 1.2 },
    { label: 'Lightly active (1-3 days/week)', value: 1.375 },
    { label: 'Moderately active (3-5 days/week)', value: 1.55 },
    { label: 'Very active (6-7 days/week)', value: 1.725 },
    { label: 'Extra active (physical job)', value: 1.9 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-8">
        <CalculatorToggle
          label="Gender"
          value={gender}
          onChange={setGender}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' }
          ]}
        />

        <div className="grid grid-cols-2 gap-6">
          <CalculatorInput
            label="Age"
            value={age}
            onChange={setAge}
            icon={User}
            suffix="yrs"
            min={0}
            max={120}
          />
          <CalculatorInput
            label="Weight"
            value={weight}
            onChange={setWeight}
            icon={Scale}
            suffix="kg"
            min={0}
          />
        </div>

        <CalculatorInput
          label="Height"
          value={height}
          onChange={setHeight}
          icon={Ruler}
          suffix="cm"
          min={0}
        />

        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            Activity Level
          </label>
          <select 
            value={activity} 
            onChange={(e) => setActivity(Number(e.target.value))}
            className="w-full bg-white border-2 border-gray-100 rounded-xl py-3 px-4 transition-all outline-none hover:border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 text-gray-900 font-medium"
          >
            {activityLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CalculatorResult
            label="Basal Metabolic Rate"
            value={results.bmr.toFixed(0)}
            subValue="kcal"
            color="blue"
            icon={<Flame className="w-6 h-6 text-blue-600" />}
            description="Calories burned at complete rest."
          />
          <CalculatorResult
            label="Daily Energy Expenditure"
            value={results.tdee.toFixed(0)}
            subValue="kcal"
            color="purple"
            icon={<Zap className="w-6 h-6 text-purple-600" />}
            description="Total calories burned with activity."
          />
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8">Daily Calories for Weight Goals</h3>
          <div className="space-y-4">
            {[
              { label: 'Maintain weight', value: results.maintain, color: 'bg-blue-50 text-blue-700 border-blue-100' },
              { label: 'Mild weight loss (0.25kg/week)', value: results.mildLoss, color: 'bg-green-50 text-green-700 border-green-100' },
              { label: 'Weight loss (0.5kg/week)', value: results.weightLoss, color: 'bg-green-100 text-green-800 border-green-200' },
              { label: 'Weight gain (0.5kg/week)', value: results.weightGain, color: 'bg-orange-50 text-orange-700 border-orange-100' },
            ].map((item) => (
              <div key={item.label} className={`flex justify-between items-center p-4 rounded-xl border-2 transition-colors ${item.color}`}>
                <span className="text-sm font-bold">{item.label}</span>
                <span className="text-xl font-black">{item.value.toFixed(0)} <span className="text-xs font-bold opacity-60 uppercase">kcal</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
