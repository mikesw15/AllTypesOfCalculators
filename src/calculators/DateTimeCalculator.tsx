import React, { useState } from 'react';

export default function DateTimeCalculator() {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]);

  const diff = React.useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return {
      days: diffDays,
      weeks: Math.floor(diffDays / 7),
      months: Math.floor(diffDays / 30.44)
    };
  }, [startDate, endDate]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 text-center">
        <h3 className="text-lg font-medium text-blue-900 mb-4">Time Difference</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{diff.days}</div>
            <div className="text-sm text-gray-500 uppercase">Days</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{diff.weeks}</div>
            <div className="text-sm text-gray-500 uppercase">Weeks</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{diff.months}</div>
            <div className="text-sm text-gray-500 uppercase">Months</div>
          </div>
        </div>
      </div>
    </div>
  );
}
