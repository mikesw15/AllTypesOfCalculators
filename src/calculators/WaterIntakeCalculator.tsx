import React, { useState, useMemo } from 'react';
import { Droplets, Sun, Cloud, Wind } from 'lucide-react';

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState<number>(70);
  const [activity, setActivity] = useState<number>(30); // minutes
  const [climate, setClimate] = useState<'cool' | 'temperate' | 'hot'>('temperate');

  const results = useMemo(() => {
    // Base: 35ml per kg of body weight
    let base = weight * 35;
    
    // Activity: Add 350ml for every 30 mins of exercise
    let activityBonus = (activity / 30) * 350;
    
    // Climate adjustment
    let climateMultiplier = 1;
    if (climate === 'cool') climateMultiplier = 0.9;
    if (climate === 'hot') climateMultiplier = 1.2;

    const totalMl = (base + activityBonus) * climateMultiplier;
    const totalOz = totalMl / 29.574;
    const glasses = totalMl / 250; // 250ml glass

    return {
      ml: totalMl,
      oz: totalOz,
      glasses: glasses
    };
  }, [weight, activity, climate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Daily Exercise (minutes)</label>
          <input 
            type="number" 
            value={activity} 
            onChange={(e) => setActivity(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Climate</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setClimate('cool')}
              className={`flex flex-col items-center p-3 rounded-xl border transition-all ${climate === 'cool' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-200'}`}
            >
              <Wind className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Cool</span>
            </button>
            <button
              onClick={() => setClimate('temperate')}
              className={`flex flex-col items-center p-3 rounded-xl border transition-all ${climate === 'temperate' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-200'}`}
            >
              <Cloud className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Average</span>
            </button>
            <button
              onClick={() => setClimate('hot')}
              className={`flex flex-col items-center p-3 rounded-xl border transition-all ${climate === 'hot' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-200'}`}
            >
              <Sun className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Hot</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
          <Droplets className="w-10 h-10 text-white" />
        </div>
        
        <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">Recommended Daily Intake</p>
        <div className="text-5xl font-extrabold text-blue-900 mb-2">
          {(results.ml / 1000).toFixed(1)} <span className="text-2xl font-bold">Liters</span>
        </div>
        <p className="text-blue-600/80 font-medium">or {results.oz.toFixed(0)} fl oz</p>

        <div className="mt-8 grid grid-cols-4 gap-2">
          {Array.from({ length: Math.min(12, Math.round(results.glasses)) }).map((_, i) => (
            <div key={i} className="w-8 h-10 bg-blue-200 rounded-b-lg rounded-t-sm relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500 h-4/5"></div>
            </div>
          ))}
          {results.glasses > 12 && <div className="flex items-end text-blue-600 font-bold ml-1">...</div>}
        </div>
        <p className="text-xs text-blue-500 mt-4 font-medium">Approximately {results.glasses.toFixed(1)} glasses (250ml each)</p>
      </div>
    </div>
  );
}
