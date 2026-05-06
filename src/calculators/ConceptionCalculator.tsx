import React, { useMemo } from 'react';
import { Calendar, Baby, Activity, Info, Heart } from 'lucide-react';
import { useCalculatorState } from '../hooks/useCalculatorState';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';

export default function ConceptionCalculator() {
  const [method, setMethod] = useCalculatorState<'dueDate' | 'lmp'>('method', 'dueDate');
  const [dateStr, setDateStr] = useCalculatorState<string>('date', new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useCalculatorState<number>('cycle', 28);
  const [lutealPhase, setLutealPhase] = useCalculatorState<number>('luteal', 14);
  const [isAdvanced, setIsAdvanced] = useCalculatorState<boolean>('adv', false);

  const follicularPhase = cycleLength - lutealPhase;

  const handleCycleChange = (val: number) => {
    setCycleLength(val);
  };

  const handleLutealChange = (val: number) => {
    setLutealPhase(val);
    setCycleLength(follicularPhase + val);
  };

  const handleFollicularChange = (val: number) => {
    setCycleLength(val + lutealPhase);
  };

  const results = useMemo(() => {
    if (!dateStr) return null;
    const baseDate = new Date(dateStr);
    // Parse strictly to avoid timezone issues with midnight offsets
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return null;
    
    baseDate.setFullYear(year, month - 1, day);
    baseDate.setHours(12, 0, 0, 0);

    const addDays = (d: Date, days: number) => {
      const newD = new Date(d.getTime());
      newD.setDate(newD.getDate() + days);
      return newD;
    };

    const formatDate = (d: Date) => {
      return d.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    let conceptionDate: Date;
    let dueDate: Date;
    let lmpDate: Date | null = null;
    let windowStart: Date;
    let windowEnd: Date;

    if (method === 'dueDate') {
      dueDate = baseDate;
      // Conception is typically 38 weeks (266 days) before due date
      conceptionDate = addDays(dueDate, -266);
      windowStart = addDays(conceptionDate, -5); // Sperm can live up to 5 days
      windowEnd = addDays(conceptionDate, 0); // Day of ovulation/conception
      lmpDate = addDays(dueDate, -280); // Based on standard 28-day cycle 
    } else {
      lmpDate = baseDate;
      // Ovulation/Conception happens after the follicular phase
      const daysToOvulation = follicularPhase;
      conceptionDate = addDays(lmpDate, daysToOvulation);
      dueDate = addDays(conceptionDate, 266);
      windowStart = addDays(conceptionDate, -5);
      windowEnd = addDays(conceptionDate, 0);
    }

    return {
      conceptionDateStr: formatDate(conceptionDate),
      dueDateStr: formatDate(dueDate),
      windowStartStr: formatDate(windowStart),
      windowEndStr: formatDate(windowEnd),
      lmpDateStr: formatDate(lmpDate),
      milestones: [
        { label: 'First Heartbeat (Week 6-7)', date: formatDate(addDays(lmpDate, 45)) },
        { label: 'End of First Trimester (Week 13)', date: formatDate(addDays(lmpDate, 91)) },
        { label: 'Anatomy Scan (Week 18-20)', date: formatDate(addDays(lmpDate, 133)) },
        { label: 'Viability (Week 24)', date: formatDate(addDays(lmpDate, 168)) },
        { label: 'End of Second Trimester (Week 27)', date: formatDate(addDays(lmpDate, 189)) },
      ]
    };
  }, [method, dateStr, follicularPhase]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-100 pb-4">
              Calculation Settings
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Calculate Based On</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMethod('dueDate')}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors border-2 ${
                      method === 'dueDate'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Expected Due Date
                  </button>
                  <button
                    onClick={() => setMethod('lmp')}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors border-2 ${
                      method === 'lmp'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    First Day of Last Period
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {method === 'dueDate' ? 'Expected Due Date' : 'First Day of Last Period'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
                  />
                </div>
              </div>

              {method === 'lmp' && (
                <div className="space-y-4">
                  <CalculatorInput
                    label="Average Cycle Length"
                    value={cycleLength}
                    onChange={handleCycleChange}
                    min={20}
                    max={45}
                    step={1}
                    suffix=" days"
                    icon={Activity}
                  />

                  <div className="pt-2">
                    <button
                      onClick={() => setIsAdvanced(!isAdvanced)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {isAdvanced ? '- Hide' : '+ Show'} Advanced Cycle Options
                    </button>
                  </div>

                  {isAdvanced && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <CalculatorInput
                        label="Follicular Phase"
                        value={follicularPhase}
                        onChange={handleFollicularChange}
                        min={5}
                        max={30}
                        step={1}
                        suffix=" days"
                      />
                      <CalculatorInput
                        label="Luteal Phase"
                        value={lutealPhase}
                        onChange={handleLutealChange}
                        min={5}
                        max={20}
                        step={1}
                        suffix=" days"
                      />
                      <p className="text-xs text-gray-500 md:col-span-2 mt-1">
                        The follicular phase is from the first day of your period until ovulation. 
                        The luteal phase is from ovulation until your next period (typically 14 days).
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">How is this calculated?</p>
                <p>
                  Conception usually occurs about 14 days before the next expected period. 
                  A typical pregnancy lasts about 266 days (38 weeks) from the date of conception, 
                  or 280 days (40 weeks) from the first day of the last menstrual period (LMP).
                  These dates are biological estimates and can vary by individual.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {results && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                Conception Results
              </h3>
              
              <div className="space-y-6">
                 <div className="bg-pink-50 rounded-xl p-6 border border-pink-100 text-center">
                    <p className="text-pink-600 font-medium mb-2 uppercase tracking-wide text-sm">Probable Conception Date</p>
                    <div className="text-2xl sm:text-3xl font-bold text-pink-700">
                      {results.conceptionDateStr}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Baby className="w-5 h-5 text-blue-500" />
                      <p className="text-blue-800 font-medium text-sm">Estimated Due Date</p>
                    </div>
                    <p className="text-lg font-bold text-blue-900">{results.dueDateStr}</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      <p className="text-purple-800 font-medium text-sm">Last Menstrual Period</p>
                    </div>
                    <p className="text-lg font-bold text-purple-900">{results.lmpDateStr}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <p className="text-gray-600 font-medium text-sm mb-3">Possible dates of intercourse that led to conception:</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {results.windowStartStr}  –  {results.windowEndStr}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Sperm can survive in the female reproductive tract for up to 5 days, so intercourse up to 5 days before ovulation can lead to conception.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <p className="text-gray-600 font-medium text-sm mb-3">Key Pregnancy Milestones (Estimates):</p>
                  <ul className="space-y-3">
                    {results.milestones.map((m, idx) => (
                      <li key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <span className="text-sm font-medium text-gray-700">{m.label}</span>
                        <span className="text-sm font-bold text-gray-900 text-right ml-4">{m.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
