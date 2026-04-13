import React from 'react';
import { Link } from 'react-router-dom';
import { getCalculatorsByCategory } from '../calculators';
import { Home as HomeIcon, Activity, Image as ImageIcon, Flame, Droplets, HeartPulse, Car, TrendingUp, Briefcase, Bitcoin, PieChart, Calculator, Scale, Calendar, BarChart, Dices, Fuel, GraduationCap, Key, ChefHat, Heart, Moon, Leaf, BookOpen, Syringe, Dumbbell, PaintRoller, Grid, HardHat, ThermometerSun } from 'lucide-react';
import SEO from '../components/SEO';

export default function Categories() {
  const groupedCalculators = getCalculatorsByCategory();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="Calculator Categories | Browse All Tools"
        description="Explore our wide range of free online calculators organized by category: Finance, Health, Math, Science, and more."
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">All Categories</h1>
      <p className="text-xl text-gray-600 mb-12">Browse our complete collection of calculators.</p>

      <div className="space-y-16">
        {Object.entries(groupedCalculators).map(([category, calcs]) => (
          <div key={category} id={category.toLowerCase().split(' ')[0]}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calcs.map(calc => (
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
        ))}
      </div>
    </div>
  );
}
