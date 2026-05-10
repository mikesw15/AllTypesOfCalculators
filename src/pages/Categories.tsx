import React from 'react';
import { Link } from 'react-router-dom';
import { getCalculatorsByCategory } from '../calculators';
import { DollarSign, Heart, FlaskConical, Coffee, Hammer, Flame, Calculator } from 'lucide-react';
import SEO from '../components/SEO';
import CalculatorCard from '../components/CalculatorCard';

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName) {
    case 'Finance': return <DollarSign className="w-8 h-8 text-green-600 mr-3" />;
    case 'Health': return <Heart className="w-8 h-8 text-red-600 mr-3" />;
    case 'Math': return <FlaskConical className="w-8 h-8 text-purple-600 mr-3" />;
    case 'Everyday Life': return <Coffee className="w-8 h-8 text-orange-600 mr-3" />;
    case 'Home Improvement': return <Hammer className="w-8 h-8 text-amber-600 mr-3" />;
    case 'Fun':
      return <Flame className="w-8 h-8 text-pink-600 mr-3" />;
    default: return <Calculator className="w-8 h-8 text-blue-600 mr-3" />;
  }
};

export default function Categories() {
  const groupedCalculators = getCalculatorsByCategory();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Calculator Categories",
    "description": "Explore our wide range of free online calculators organized by category.",
    "url": "https://alltypesofcalculators.com/categories"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="Calculator Categories | Browse All Tools"
        description="Explore our wide range of free online calculators organized by category: Finance, Health, Math, Science, and more."
        keywords={['calculator categories', 'list of calculators', 'finance calculators', 'health calculators', 'math calculators', 'online tools', 'free calculators']}
        canonical="https://alltypesofcalculators.com/categories"
        structuredData={schemaData}
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">All Categories</h1>
      <p className="text-xl text-gray-600 mb-12">Browse our complete collection of calculators.</p>

      <div className="space-y-16">
        {Object.entries(groupedCalculators).map(([category, calcs]) => (
          <div key={category} id={category.toLowerCase().split(' ')[0]}>
            <div className="flex items-center mb-6 pb-2 border-b border-gray-200">
              {getCategoryIcon(category)}
              <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calcs.map(calc => (
                <CalculatorCard key={calc.id} calc={calc} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
