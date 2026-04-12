import React, { useState } from 'react';

export default function ProbabilityCalculator() {
  const [probA, setProbA] = useState<number>(0.5);
  const [probB, setProbB] = useState<number>(0.5);

  const pA = Math.max(0, Math.min(1, probA));
  const pB = Math.max(0, Math.min(1, probB));

  const pAandB = pA * pB; // Assuming independent
  const pAorB = pA + pB - pAandB;
  const pNotA = 1 - pA;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Probability of A P(A)</label>
          <input type="number" step="0.01" min="0" max="1" value={probA} onChange={(e) => setProbA(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Probability of B P(B)</label>
          <input type="number" step="0.01" min="0" max="1" value={probB} onChange={(e) => setProbB(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Results (Assuming Independent Events)</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">P(A and B) - Both occur</span>
            <span className="font-semibold text-blue-600">{(pAandB * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">P(A or B) - At least one occurs</span>
            <span className="font-semibold text-green-600">{(pAorB * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">P(Not A) - A does not occur</span>
            <span className="font-semibold text-red-600">{(pNotA * 100).toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
