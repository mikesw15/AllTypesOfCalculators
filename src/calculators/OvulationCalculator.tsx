import React, { useMemo } from 'react';
import { Activity, Calendar } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import { useCalculatorState } from '../hooks/useCalculatorState';

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export default function OvulationCalculator() {
  const [lmpStr, setLmpStr] = useCalculatorState<string>('lmp', new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useCalculatorState<number>('cycle', 28);

  const results = useMemo(() => {
    if (!lmpStr) return null;
    const lmpDate = new Date(lmpStr);
    const months = [];
    
    let currentLmp = lmpDate;
    for (let i = 0; i < 6; i++) {
      const ovulation = addDays(currentLmp, cycleLength - 14);
      const fertileStart = addDays(ovulation, -5);
      const fertileEnd = addDays(ovulation, 1);
      const nextPeriod = addDays(currentLmp, cycleLength);
      
      months.push({
        month: currentLmp.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        fertileWindow: `${fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric'})}`,
        ovulation: formatDate(ovulation),
        nextPeriod: formatDate(nextPeriod)
      });
      
      currentLmp = nextPeriod;
    }
    return months;
  }, [lmpStr, cycleLength]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Day of Last Period
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={lmpStr}
                  onChange={(e) => setLmpStr(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>
            <CalculatorInput
              label="Average Cycle Length"
              value={cycleLength}
              onChange={setCycleLength}
              min={20}
              max={45}
              step={1}
              suffix=" days"
              icon={Activity}
            />
          </div>
        </div>
        <div>
          {results && (
            <div className="bg-blue-600 rounded-2xl shadow-xl p-6 text-white h-full relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <h2 className="text-2xl font-bold mb-4">Upcoming Fertile Windows</h2>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {results.map((r, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                      <h3 className="font-semibold text-lg mb-2">{r.month}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-100">Fertile Window:</span>
                          <span className="font-medium text-right">{r.fertileWindow}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-100">Estimated Ovulation:</span>
                          <span className="font-medium text-right">{r.ovulation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-100">Next Period:</span>
                          <span className="font-medium text-right">{r.nextPeriod}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
