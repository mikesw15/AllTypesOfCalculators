import React, { useState } from 'react';

export default function SleepCycleCalculator() {
  const [wakeTime, setWakeTime] = useState('07:00');

  const calculateBedtimes = () => {
    const [hours, minutes] = wakeTime.split(':').map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(hours, minutes, 0, 0);

    // 90 minute cycles = 5400000 ms
    // Average time to fall asleep = 15 mins = 900000 ms
    const cycles = [6, 5, 4, 3]; // 9h, 7.5h, 6h, 4.5h
    
    return cycles.map(c => {
      const sleepTime = new Date(wakeDate.getTime() - (c * 5400000) - 900000);
      return {
        cycles: c,
        time: sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    });
  };

  const bedtimes = calculateBedtimes();

  return (
    <div className="max-w-md mx-auto space-y-8 text-center">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">I want to wake up at:</label>
        <input 
          type="time" 
          value={wakeTime} 
          onChange={(e) => setWakeTime(e.target.value)} 
          className="w-full px-4 py-4 text-2xl text-center rounded-xl border-2 border-indigo-200 focus:ring-0 focus:border-indigo-500"
        />
      </div>

      <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl">
        <h3 className="font-medium text-indigo-200 mb-6">You should try to fall asleep at one of these times:</h3>
        <div className="grid grid-cols-2 gap-4">
          {bedtimes.map((b, i) => (
            <div key={i} className="bg-indigo-800 p-4 rounded-xl border border-indigo-700">
              <div className="text-2xl font-bold text-indigo-100">{b.time}</div>
              <div className="text-xs text-indigo-300 mt-1">{b.cycles} cycles ({b.cycles * 1.5}h)</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-indigo-300 mt-6">
          *Includes 15 minutes to fall asleep. A good night's sleep consists of 5-6 complete sleep cycles.
        </p>
      </div>
    </div>
  );
}
