import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCalculatorsByCategory } from '../calculators';
import { PoundSterling, Heart, FlaskConical, Coffee, Hammer, Flame, Calculator, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import CalculatorCard from '../components/CalculatorCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { CategorySEO } from '../data/categorySeo';
import { Category } from '../types';

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
      
      <Breadcrumbs />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            {activeCategory ? `${activeCategory} Calculators` : 'All Categories'}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {activeCategory && CategorySEO[activeCategory as Category] 
              ? CategorySEO[activeCategory as Category].description
              : "Discover our comprehensive range of free online tools. From high-level finance to daily wellness, we have the right calculator for every problem."}
          </p>
        </div>
        {categorySlug && (
          <Link to="/categories" className="text-blue-600 font-bold hover:text-blue-700 whitespace-nowrap flex items-center gap-1">
            &larr; All categories
          </Link>
        )}
      </div>

      <div className="space-y-20">
        {filteredGroups.length > 0 ? (
          filteredGroups.map(([category, calcs]) => (
            <section key={category} id={category.toLowerCase().split(' ')[0]} className="scroll-mt-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-gray-100">
                <div className="max-w-2xl">
                  <div className="flex items-center mb-3">
                    {getCategoryIcon(category)}
                    <h2 className="text-3xl font-extrabold text-gray-900">{category}</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {CategorySEO[category as Category]?.longDescription}
                  </p>
                </div>
                {!categorySlug && (
                  <Link 
                    to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1 group transition-colors"
                  >
                    View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calcs.map(calc => (
                  <CalculatorCard key={calc.id} calc={calc} />
                ))}
              </div>
            </section>
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
