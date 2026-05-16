import React from 'react';
import { Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ComparisonMeta } from '../types';
import { calculators } from '../calculators';

interface ComparisonSectionProps {
  comparison: ComparisonMeta;
  currentCalculatorId: string;
}

export default function ComparisonSection({ comparison, currentCalculatorId }: ComparisonSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-gray-700 mb-12 shadow-xl shadow-blue-600/5">
      <div className="p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
            <Scale className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              {comparison.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium">{comparison.description}</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-[2rem] border border-gray-100 dark:border-gray-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                <th className="px-6 py-6 text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                  Feature
                </th>
                {comparison.calculatorIds.map(id => {
                  const calc = calculators.find(c => c.id === id);
                  const isCurrent = id === currentCalculatorId;
                  return (
                    <th 
                      key={id} 
                      className={`px-6 py-6 text-sm font-black uppercase tracking-widest border-b border-gray-100 dark:border-gray-700 ${
                        isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {calc?.title}
                        {isCurrent && (
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-[10px] px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {comparison.highlights.differences.map((diff, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-6 font-bold text-gray-900 dark:text-gray-100 bg-gray-50/20 dark:bg-gray-900/10 min-w-[160px]">
                    {diff.label}
                  </td>
                  {comparison.calculatorIds.map(id => (
                    <td key={id} className="px-6 py-6 text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                      {diff.values[id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {comparison.calculatorIds.filter(id => id !== currentCalculatorId).map(id => {
            const calc = calculators.find(c => c.id === id);
            return calc ? (
              <Link 
                key={id}
                to={`/${id}-calculator`}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
              >
                Switch to {calc.title}
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
