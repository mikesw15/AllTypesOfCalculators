import React, { useMemo } from 'react';
import { Clock, Moon } from 'lucide-react';
import { useCalculatorState } from '../hooks/useCalculatorState';

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

export default function SleepCycleCalculator() {
  const [mode, setMode] = useCalculatorState<'wake' | 'sleep'>('mode', 'wake');
  const [timeStr, setTimeStr] = useCalculatorState<string>('time', '07:00'); // HH:mm format

  const results = useMemo(() => {
    if (!timeStr) return null;
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    const targetDate = new Date();
    targetDate.setHours(hours, minutes, 0, 0);

    const cycles = [];
    
    if (mode === 'wake') {
      // Calculate times to go to sleep
      for (let i = 6; i >= 3; i--) {
        const sleepTime = new Date(targetDate.getTime());
        // 90 mins * i + 15 mins to fall asleep
        sleepTime.setMinutes(sleepTime.getMinutes() - (90 * i) - 15);
        cycles.push({
          cycles: i,
          duration: `${(i * 90) / 60} hours`,
          time: formatTime(sleepTime)
        });
      }
    } else {
      // Calculate times to wake up
      for (let i = 3; i <= 6; i++) {
        const wakeTime = new Date(targetDate.getTime());
        // 90 mins * i + 15 mins to fall asleep
        wakeTime.setMinutes(wakeTime.getMinutes() + (90 * i) + 15);
        cycles.push({
          cycles: i,
          duration: `${(i * 90) / 60} hours`,
          time: formatTime(wakeTime)
        });
      }
    }
    
    return cycles;
  }, [mode, timeStr]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sleep Schedule</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I want to:
              </label>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setMode('wake')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                    mode === 'wake' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Wake up at
                </button>
                <button
                  onClick={() => setMode('sleep')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                    mode === 'sleep' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Go to sleep at
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={timeStr}
                  onChange={(e) => setTimeStr(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-4 mt-6">
              <div className="flex gap-3">
                <Moon className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <p className="text-sm text-indigo-900">
                  Calculations factor in the average <strong>15 minutes</strong> it takes to fall asleep. Normal sleep cycles last roughly 90 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {results && (
            <div className="bg-indigo-600 rounded-2xl shadow-xl p-6 text-white h-full relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">
                  {mode === 'wake' ? 'You should head to bed at:' : 'You should wake up at:'}
                </h2>
                <div className="space-y-3">
                  {results.map((r, i) => (
                    <div 
                      key={i} 
                      className={`rounded-xl p-4 backdrop-blur-sm border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between ${
                        r.cycles === 5 || r.cycles === 6 ? 'bg-white/20 font-bold' : 'bg-white/5 opacity-80'
                      }`}
                    >
                      <div className="text-2xl mb-1 sm:flex-none">{r.time}</div>
                      <div className="sm:text-right flex flex-col">
                        <span className="text-indigo-100 text-sm">{r.cycles} Cycles</span>
                        <span className="text-indigo-200 text-xs">{r.duration} of sleep</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-indigo-200 mt-6 text-center">
                  Waking up between sleep cycles leaves you feeling refreshed, rather than groggy. 5-6 cycles (7.5-9 hours) is optimal for adults.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
