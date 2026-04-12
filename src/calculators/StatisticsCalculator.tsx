import React, { useState, useMemo } from 'react';

export default function StatisticsCalculator() {
  const [input, setInput] = useState('10, 20, 30, 40, 50');

  const results = useMemo(() => {
    const nums = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) return null;

    nums.sort((a, b) => a - b);
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    
    const mid = Math.floor(nums.length / 2);
    const median = nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    
    const range = nums[nums.length - 1] - nums[0];
    
    const variance = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / nums.length;
    const stdDev = Math.sqrt(variance);

    return { count: nums.length, sum, mean, median, range, stdDev };
  }, [input]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Enter numbers (comma separated)</label>
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 h-32"
          placeholder="e.g. 1, 2, 3, 4, 5"
        />
      </div>

      {results && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Count</div>
            <div className="text-2xl font-bold text-gray-900">{results.count}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Sum</div>
            <div className="text-2xl font-bold text-gray-900">{results.sum.toFixed(2)}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="text-sm text-blue-600 mb-1">Mean (Average)</div>
            <div className="text-2xl font-bold text-blue-900">{results.mean.toFixed(4)}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <div className="text-sm text-green-600 mb-1">Median</div>
            <div className="text-2xl font-bold text-green-900">{results.median.toFixed(4)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Range</div>
            <div className="text-2xl font-bold text-gray-900">{results.range.toFixed(4)}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
            <div className="text-sm text-purple-600 mb-1">Standard Deviation</div>
            <div className="text-2xl font-bold text-purple-900">{results.stdDev.toFixed(4)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
