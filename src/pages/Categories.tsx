import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCalculatorsByCategory } from '../calculators';
import { PoundSterling, Heart, FlaskConical, Coffee, Hammer, Flame, Calculator } from 'lucide-react';
import SEO from '../components/SEO';
import CalculatorCard from '../components/CalculatorCard';

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName) {
    case 'Finance': return <PoundSterling className="w-8 h-8 text-green-600 mr-3" />;
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
  const { category: categorySlug } = useParams();
  const groupedCalculators = getCalculatorsByCategory();
  
  // If we have a category slug, filter the groups
  const filteredGroups = categorySlug 
    ? Object.entries(groupedCalculators).filter(([name]) => 
        name.toLowerCase().replace(/\s+/g, '-') === categorySlug
      )
    : Object.entries(groupedCalculators);

  const activeCategory = categorySlug ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : null;
  const baseUrl = 'https://alltypesofcalculators.com';
  const canonical = categorySlug 
    ? `${baseUrl}/categories/${categorySlug}`
    : `${baseUrl}/categories`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": activeCategory ? `${activeCategory} Calculators` : "Calculator Categories",
    "description": activeCategory 
      ? `Explore our collection of free ${activeCategory} calculators and tools.`
      : "Explore our wide range of free online calculators organized by category.",
    "url": canonical
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title={activeCategory ? `${activeCategory} Calculators | Free Online Tools` : "Calculator Categories | Browse All Tools"}
        description={activeCategory 
          ? `Free online ${activeCategory} calculators. Get accurate results for ${filteredGroups[0]?.[1].slice(0, 3).map(c => c.title).join(', ')} and more.`
          : "Explore our wide range of free online calculators organized by category: Finance, Health, Math, Science, and more."
        }
        keywords={activeCategory 
          ? [activeCategory.toLowerCase(), 'calculators', 'free tools', 'online calculation'] 
          : ['calculator categories', 'list of calculators', 'finance calculators', 'health calculators', 'math calculators', 'online tools', 'free calculators']
        }
        canonical={canonical}
        structuredData={schemaData}
      />
      
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {activeCategory ? `${activeCategory} Calculators` : 'All Categories'}
          </h1>
          <p className="text-xl text-gray-600">
            {activeCategory 
              ? `Specialized tools for your ${activeCategory.toLowerCase()} calculations.` 
              : 'Browse our complete collection of calculators.'
            }
          </p>
        </div>
        {categorySlug && (
          <Link to="/categories" className="text-blue-600 font-medium hover:underline">
            &larr; Back to all categories
          </Link>
        )}
      </div>

      <div className="space-y-16">
        {filteredGroups.length > 0 ? (
          filteredGroups.map(([category, calcs]) => (
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
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Category not found</h3>
            <Link to="/categories" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
              Return to All Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
