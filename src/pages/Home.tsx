import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home as HomeIcon, Activity, Calculator, Zap, DollarSign, Heart, FlaskConical, Coffee, ArrowRight, Image as ImageIcon, Flame, Droplets, HeartPulse, Car, TrendingUp, Briefcase, Bitcoin, PieChart, Scale, Calendar, BarChart, Dices, Fuel, GraduationCap, Key, ChefHat, Moon, Leaf, BookOpen, Syringe, Dumbbell, PaintRoller, Grid, HardHat, ThermometerSun, Hammer } from 'lucide-react';
import { calculators } from '../calculators';
import SEO from '../components/SEO';

const categories = [
  { name: 'Finance & Money', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
  { name: 'Health & Fitness', icon: Heart, color: 'text-red-600', bg: 'bg-red-100' },
  { name: 'Math & Science', icon: FlaskConical, color: 'text-purple-600', bg: 'bg-purple-100' },
  { name: 'Everyday Life', icon: Coffee, color: 'text-orange-600', bg: 'bg-orange-100' },
  { name: 'Home Improvement & DIY', icon: Hammer, color: 'text-amber-600', bg: 'bg-amber-100' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredCalculators = searchQuery 
    ? calculators.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div>
      <SEO 
        title="All Types of Calculators | Fast, Accurate & Free Online Tools"
        description="Free online calculators for finance, health, math, and everyday life. Get instant results with our easy-to-use tools including Mortgage, BMI, and Currency Converter."
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
              <Link 
                key={calc.id} 
                to={`/calculators/${calc.id}`}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  {calc.icon === 'Home' && <HomeIcon className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Activity' && <Activity className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Image' && <ImageIcon className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Flame' && <Flame className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Droplets' && <Droplets className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'HeartPulse' && <HeartPulse className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Car' && <Car className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'TrendingUp' && <TrendingUp className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Briefcase' && <Briefcase className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Bitcoin' && <Bitcoin className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'PieChart' && <PieChart className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Calculator' && <Calculator className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Scale' && <Scale className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Calendar' && <Calendar className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'BarChart' && <BarChart className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Dices' && <Dices className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Fuel' && <Fuel className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'GraduationCap' && <GraduationCap className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Key' && <Key className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'ChefHat' && <ChefHat className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Heart' && <Heart className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Moon' && <Moon className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Leaf' && <Leaf className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'BookOpen' && <BookOpen className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Syringe' && <Syringe className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Dumbbell' && <Dumbbell className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'PaintRoller' && <PaintRoller className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'Grid' && <Grid className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'HardHat' && <HardHat className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                  {calc.icon === 'ThermometerSun' && <ThermometerSun className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{calc.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <div key={cat.name} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center mb-4`}>
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
    </div>
  );
}
