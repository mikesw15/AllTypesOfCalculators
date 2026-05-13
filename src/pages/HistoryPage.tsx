import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Trash2, ArrowRight } from 'lucide-react';
import { useRecentCalculators } from '../hooks/useRecentCalculators';
import { getCalculatorById } from '../calculators';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

export default function HistoryPage() {
  const { recentItems, clearHistory } = useRecentCalculators();

  const formattedHistory = recentItems
    .map(item => ({
      ...item,
      calculator: getCalculatorById(item.id)
    }))
    .filter(item => item.calculator);

  return (
    <>
      <SEO 
        title="Calculation History – AllTypesOfCalculators"
        description="View your recently used calculators and tools. Keep track of your calculations."
        noindex={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <Clock className="w-10 h-10 text-blue-600" />
              Calculation History
            </h1>
            <p className="text-xl text-gray-600">
              Your recently used tools and calculators, stored locally for your privacy.
            </p>
          </div>
          {formattedHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Clear All History
            </button>
          )}
        </div>

        {formattedHistory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formattedHistory.map((item, index) => (
              <Link 
                key={`${item.id}-${index}`}
                to={`/${item.id}-calculator`}
                className="group bg-white rounded-3xl p-6 border-2 border-gray-50 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg uppercase tracking-wider">
                      {item.calculator?.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.calculator?.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                    {item.calculator?.description}
                  </p>
                </div>
                <div className="flex items-center text-blue-600 font-bold text-sm gap-2">
                  Open Calculator
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No history found</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              You haven't used any calculators yet. Start browsing to see your history here!
            </p>
            <Link 
              to="/categories"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors"
            >
              Browse Calculators
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}

        <section className="mt-20 pt-20 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Why track history?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-blue-50 rounded-3xl">
              <div className="text-2xl mb-4">🚀</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Speed</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Jump back into your most used tools without searching. Your favorite calculators are always just a click away.
              </p>
            </div>
            <div className="p-8 bg-green-50 rounded-3xl">
              <div className="text-2xl mb-4">🔒</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Privacy</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Your history is stored locally in your browser. We don't track your specific calculations on our servers.
              </p>
            </div>
            <div className="p-8 bg-purple-50 rounded-3xl">
              <div className="text-2xl mb-4">📈</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Consistency</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Keep track of your fitness or financial progress by easily revisiting the same tools over time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
