import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${gender === 'male' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setGender('male')}
          >
            Male
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${gender === 'female' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setGender('female')}
          >
            Female
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input 
              type="number" 
              value={age} 
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
          <input 
            type="number" 
            value={height} 
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
          <select 
            value={activity} 
            onChange={(e) => setActivity(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {activityLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="lg:col-span-7 bg-gray-50 rounded-xl p-6 border border-gray-100">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">BMR</p>
            <p className="text-2xl font-bold text-gray-900">{results.bmr.toFixed(0)}</p>
            <p className="text-[10px] text-gray-400">Calories/day</p>
          </div>
          <div className="bg-blue-600 p-4 rounded-lg shadow-sm text-center text-white">
            <p className="text-xs font-medium text-white/80 uppercase mb-1">TDEE</p>
            <p className="text-2xl font-bold">{results.tdee.toFixed(0)}</p>
            <p className="text-[10px] text-white/60">Calories/day</p>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-4">Daily Calories for Weight Goals</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-sm text-gray-600">Maintain weight</span>
            <span className="font-bold text-gray-900">{results.maintain.toFixed(0)} kcal</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
            <span className="text-sm text-green-700">Mild weight loss (0.25kg/week)</span>
            <span className="font-bold text-green-900">{results.mildLoss.toFixed(0)} kcal</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg border border-green-200">
            <span className="text-sm text-green-800">Weight loss (0.5kg/week)</span>
            <span className="font-bold text-green-900">{results.weightLoss.toFixed(0)} kcal</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
            <span className="text-sm text-orange-700">Weight gain (0.5kg/week)</span>
            <span className="font-bold text-orange-900">{results.weightGain.toFixed(0)} kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
