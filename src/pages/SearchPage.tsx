import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Zap, ArrowRight, Filter } from 'lucide-react';
import { calculators } from '../calculators';
import SEO from '../components/SEO';
import CalculatorCard from '../components/CalculatorCard';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [localQuery, setLocalQuery] = useState(query);

  const filteredCalculators = query
    ? calculators.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };

  return (
    <>
      <SEO 
        title={`Search results for "${query || 'Calculators'}" – AllTypesOfCalculators`}
        description={`Find the best online calculators for ${query || 'your needs'}. Browse our collection of ${calculators.length} free tools.`}
        noindex={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />

        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-8">
            {query ? `Results for "${query}"` : "Search Our Calculators"}
          </h1>

          <form onSubmit={handleSubmit} className="relative max-w-2xl">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="What would you like to calculate?"
              className="w-full pl-14 pr-4 py-5 bg-white border-2 border-gray-100 rounded-3xl text-xl shadow-xl shadow-blue-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-400"
            />
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2.5 rounded-2xl font-bold hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {query ? (
          filteredCalculators.length > 0 ? (
            <div className="space-y-12">
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <Filter className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-600 font-medium">Found {filteredCalculators.length} calculators</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCalculators.map(calc => (
                  <CalculatorCard key={calc.id} calc={calc} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchIcon className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No calculators found</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                We couldn't find any tools matching "{query}". Try checking your spelling or using more general terms.
              </p>
              <button 
                onClick={() => setLocalQuery('')}
                className="text-blue-600 font-bold hover:underline"
              >
                Clear search and try again
              </button>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Popular Searches
              </h2>
              <div className="flex flex-wrap gap-3">
                {['Mortgage', 'BMI', 'Loan', 'Tax', 'Salary', 'Investment', 'Calories', 'Interest'].map(term => (
                  <button
                    key={term}
                    onClick={() => setSearchParams({ q: term.toLowerCase() })}
                    className="px-6 py-3 bg-white border border-gray-100 rounded-2xl font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ArrowRight className="w-6 h-6 text-blue-600" />
                Browse Categories
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {['Finance', 'Health', 'Maths', 'Business', 'Construction', 'Everyday life'].map(cat => (
                  <Link
                    key={cat}
                    to={`/categories/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className="p-4 bg-gray-50 rounded-2xl font-bold text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
