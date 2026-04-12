import React, { useState, useMemo } from 'react';
import { HeartPulse } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function HeartRateCalculator() {
  const [age, setAge] = useState<number>(30);
  const [restingHR, setRestingHR] = useState<number>(70);

  const zones = useMemo(() => {
    const maxHR = 220 - age;
    const hrReserve = maxHR - restingHR;

    const calculateZone = (minPercent: number, maxPercent: number) => ({
      min: Math.round(restingHR + (hrReserve * minPercent)),
      max: Math.round(restingHR + (hrReserve * maxPercent))
    });

    return [
      { name: 'Zone 1: Recovery', range: calculateZone(0.5, 0.6), color: 'bg-gray-100', text: 'text-gray-700', desc: 'Very light intensity, good for warm-up and recovery.', hex: '#9ca3af' },
      { name: 'Zone 2: Aerobic', range: calculateZone(0.6, 0.7), color: 'bg-blue-100', text: 'text-blue-700', desc: 'Light intensity, improves basic endurance and fat burning.', hex: '#3b82f6' },
      { name: 'Zone 3: Anaerobic', range: calculateZone(0.7, 0.8), color: 'bg-green-100', text: 'text-green-700', desc: 'Moderate intensity, improves aerobic capacity and efficiency.', hex: '#22c55e' },
      { name: 'Zone 4: Threshold', range: calculateZone(0.8, 0.9), color: 'bg-orange-100', text: 'text-orange-700', desc: 'Hard intensity, improves speed endurance and anaerobic capacity.', hex: '#f97316' },
      { name: 'Zone 5: Redline', range: calculateZone(0.9, 1.0), color: 'bg-red-100', text: 'text-red-700', desc: 'Maximum intensity, improves sprint speed and power.', hex: '#ef4444' },
    ];
  }, [age, restingHR]);

  const chartData = useMemo(() => {
    return zones.map(z => ({
      name: z.name.split(':')[0],
      min: z.range.min,
      max: z.range.max,
      avg: Math.round((z.range.min + z.range.max) / 2),
      hex: z.hex
    }));
  }, [zones]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Resting Heart Rate (BPM)</label>
          <input 
            type="number" 
            value={restingHR} 
            onChange={(e) => setRestingHR(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <HeartPulse className="w-5 h-5 text-red-500" />
            <span className="font-bold text-gray-900">Max Heart Rate</span>
          </div>
          <div className="text-3xl font-black text-gray-900">{220 - age} <span className="text-sm font-medium text-gray-400">BPM</span></div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-4">
        <h3 className="font-bold text-gray-900 mb-4">Target Heart Rate Zones (Karvonen Formula)</h3>
        
        <div className="h-48 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} tick={{fontSize: 12}} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                formatter={(value: number, name: string, props: any) => [
                  `${props.payload.min} - ${props.payload.max} BPM`, 
                  'Target Range'
                ]} 
              />
              <Bar dataKey="avg" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.hex} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {zones.map((zone) => (
          <div key={zone.name} className={`p-4 rounded-xl border border-transparent ${zone.color} transition-all`}>
            <div className="flex justify-between items-center mb-1">
              <span className={`font-bold ${zone.text}`}>{zone.name}</span>
              <span className={`font-bold text-lg ${zone.text}`}>{zone.range.min} - {zone.range.max} <span className="text-xs">BPM</span></span>
            </div>
            <p className="text-xs opacity-80">{zone.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
