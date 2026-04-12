import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function MacroCalculator() {
  const [tdee, setTdee] = useState<number>(2500);
  const [goal, setGoal] = useState<'cut' | 'maintain' | 'bulk'>('maintain');
  const [dietType, setDietType] = useState<'balanced' | 'lowcarb' | 'highprotein'>('balanced');

  const results = useMemo(() => {
    let targetCalories = tdee;
    if (goal === 'cut') targetCalories -= 500;
    if (goal === 'bulk') targetCalories += 300;

    let pRatio = 0.3, cRatio = 0.4, fRatio = 0.3;
    if (dietType === 'lowcarb') { pRatio = 0.4; cRatio = 0.2; fRatio = 0.4; }
    if (dietType === 'highprotein') { pRatio = 0.4; cRatio = 0.35; fRatio = 0.25; }

    const protein = (targetCalories * pRatio) / 4;
    const carbs = (targetCalories * cRatio) / 4;
    const fats = (targetCalories * fRatio) / 9;

    const chartData = [
      { name: 'Protein', value: targetCalories * pRatio, grams: protein, color: '#3b82f6' },
      { name: 'Carbs', value: targetCalories * cRatio, grams: carbs, color: '#22c55e' },
      { name: 'Fats', value: targetCalories * fRatio, grams: fats, color: '#eab308' }
    ];

    return { targetCalories, protein, carbs, fats, chartData };
  }, [tdee, goal, dietType]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your TDEE (Calories)</label>
          <input type="number" value={tdee} onChange={(e) => setTdee(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value as any)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500">
            <option value="cut">Lose Weight (-500 kcal)</option>
            <option value="maintain">Maintain Weight</option>
            <option value="bulk">Gain Muscle (+300 kcal)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diet Preference</label>
          <select value={dietType} onChange={(e) => setDietType(e.target.value as any)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500">
            <option value="balanced">Balanced (30% P / 40% C / 30% F)</option>
            <option value="lowcarb">Low Carb (40% P / 20% C / 40% F)</option>
            <option value="highprotein">High Protein (40% P / 35% C / 25% F)</option>
          </select>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col justify-center text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Target Daily Calories</p>
        <div className="text-5xl font-extrabold text-gray-900 mb-6">{results.targetCalories.toFixed(0)}</div>
        
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={results.chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {results.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string, props: any) => [
                  `${props.payload.grams.toFixed(0)}g (${value.toFixed(0)} kcal)`, 
                  name
                ]} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800 font-bold text-xl">{results.protein.toFixed(0)}g</p>
            <p className="text-xs text-blue-600 uppercase mt-1">Protein</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-green-800 font-bold text-xl">{results.carbs.toFixed(0)}g</p>
            <p className="text-xs text-green-600 uppercase mt-1">Carbs</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-yellow-800 font-bold text-xl">{results.fats.toFixed(0)}g</p>
            <p className="text-xs text-yellow-600 uppercase mt-1">Fats</p>
          </div>
        </div>
      </div>
    </div>
  );
}
