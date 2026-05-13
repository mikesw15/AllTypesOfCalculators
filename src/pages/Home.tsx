import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home as HomeIcon, Activity, Calculator, Zap, DollarSign, Heart, FlaskConical, Coffee, ArrowRight, Image as ImageIcon, Flame, Droplets, HeartPulse, Car, TrendingUp, Briefcase, Bitcoin, PieChart, Scale, Calendar, BarChart, Dices, Fuel, GraduationCap, Key, ChefHat, Moon, Leaf, BookOpen, Syringe, Dumbbell, PaintRoller, Grid, HardHat, ThermometerSun, Hammer, Clock, Baby } from 'lucide-react';
import { calculators } from '../calculators';
import SEO from '../components/SEO';
import CalculatorCard from '../components/CalculatorCard';
import { useRecentCalculators } from '../hooks/useRecentCalculators';

const categories = [
  { name: 'Finance & Money', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
  { name: 'Health & Fitness', icon: Heart, color: 'text-red-600', bg: 'bg-red-100' },
  { name: 'Math & Science', icon: FlaskConical, color: 'text-purple-600', bg: 'bg-purple-100' },
  { name: 'Everyday Life', icon: Coffee, color: 'text-orange-600', bg: 'bg-orange-100' },
  { name: 'Home Improvement & DIY', icon: Hammer, color: 'text-amber-600', bg: 'bg-amber-100' },
  { name: 'Fun & Niche', icon: Flame, color: 'text-pink-600', bg: 'bg-pink-100' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { recentIds } = useRecentCalculators();

  const filteredCalculators = searchQuery 
    ? calculators.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const recentCalculators = recentIds
    .map(id => calculators.find(c => c.id === id))
    .filter(Boolean);

  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "All Types of Calculators",
      "url": "https://alltypesofcalculators.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://alltypesofcalculators.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AllTypesOfCalculators?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AllTypesOfCalculators is a free online platform offering over 50 specialized calculators for finance, health, math, daily life, and home improvement."
          }
        },
        {
          "@type": "Question",
          "name": "Are the calculators free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all our calculators are 100% free and do not require registration or personal data to provide accurate estimates."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate are the results?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our calculators use standard industry formulas and real-time data where applicable (like currency exchange rates) to provide highly accurate estimations for your specific needs."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data stored or shared?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. We prioritize user privacy and do not store any information you input into our calculators. All calculations are performed on-the-fly for your immediate use."
          }
        }
      ]
    }
  ];

  const faqs = [
    {
      question: "What is AllTypesOfCalculators?",
      answer: "AllTypesOfCalculators is a free online platform offering over 50 specialized calculators for finance, health, math, daily life, and home improvement. Our mission is to provide accurate, easy-to-use tools that help you make informed decisions."
    },
    {
      question: "Are the calculators free to use?",
      answer: "Yes, all our calculators are 100% free and do not require registration or personal data to provide accurate estimates."
    },
    {
      question: "How accurate are the results?",
      answer: "Our calculators use standard industry formulas and real-time data where applicable (like currency exchange rates) to provide highly accurate estimations. However, results should be used for informational purposes only."
    },
    {
      question: "Is my data stored or shared?",
      answer: "No. We prioritize user privacy and do not store any information you input into our calculators. All calculations are performed for your immediate use without data retention."
    }
  ];

  return (
    <div>
      <SEO 
        title="All Types of Calculators | Fast, Accurate & Free Online Tools"
        description="Free online calculators for finance, health, math, and everyday life. Get instant results for Mortgage, BMI, Currency, and more with our 50+ free online tools."
        keywords={['all types of calculators', 'free calculators', 'online calculator', 'finance calculator', 'math calculator', 'health calculator', 'tools', 'conversion']}
        canonical="https://alltypesofcalculators.com"
        structuredData={schemaData}
      />
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            All Types of Calculators <br className="hidden md:block" />
            <span className="text-blue-600">in One Place</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Fast, accurate, and easy-to-use tools for finance, health, math, and everyday life.
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input 
                type="text" 
                placeholder="Search for a calculator (e.g., Mortgage, BMI)..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-lg shadow-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-10 text-left">
                {filteredCalculators.length > 0 ? (
                  <ul className="max-h-96 overflow-y-auto">
                    {filteredCalculators.map(calc => (
                      <li key={calc.id}>
                        <Link 
                          to={`/calculators/${calc.id}`}
                          className="block px-6 py-4 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                        >
                          <div className="font-semibold text-gray-900">{calc.title}</div>
                          <div className="text-sm text-gray-500 truncate">{calc.description}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No calculators found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => {
                const random = calculators[Math.floor(Math.random() * calculators.length)];
                navigate(`/calculators/${random.id}`);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors"
            >
              <Zap className="w-5 h-5 text-yellow-500" />
              Random Calculator
            </button>
          </div>
        </div>
      </section>

      {/* Recently Used Section */}
      {recentCalculators.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-bold text-gray-900">Recently Used</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {recentCalculators.map(calc => calc && (
                <Link
                  key={`recent-${calc.id}`}
                  to={`/calculators/${calc.id}`}
                  className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 px-4 py-2.5 rounded-xl transition-colors"
                >
                  <span className="font-medium text-gray-900">{calc.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16 bg-white border-b border-gray-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <div key={cat.name} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-900">{cat.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Explore tools &rarr;</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Trending Calculators</h2>
              <p className="text-gray-600 mt-1">Our most popular tools right now.</p>
            </div>
            <Link to="/categories" className="hidden sm:flex items-center text-blue-600 font-medium hover:text-blue-700">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map(calc => (
              <CalculatorCard key={calc.id} calc={calc} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
