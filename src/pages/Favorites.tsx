import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { getCalculatorById } from '../calculators';
import { CalculatorMeta } from '../types';
import { Home as HomeIcon, Activity, Image as ImageIcon, Star, Flame, Droplets, HeartPulse, Car, TrendingUp, Briefcase, Bitcoin, PieChart, Calculator, Scale, Calendar, BarChart, Dices, Fuel, GraduationCap, Key, ChefHat, Heart, Moon, Leaf, BookOpen, Syringe, Dumbbell, PaintRoller, Grid, HardHat, ThermometerSun } from 'lucide-react';
import SEO from '../components/SEO';

export default function Favorites() {
  const [favorites, setFavorites] = useState<CalculatorMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, `users/${user.uid}/favorites`));
        const querySnapshot = await getDocs(q);
        
        const favs: CalculatorMeta[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const calc = getCalculatorById(data.calculatorId);
          if (calc) {
            favs.push(calc);
          }
        });
        
        setFavorites(favs);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <SEO title="Your Favorites | AllTypesOfCalculators" description="View and manage your favorite calculators for quick access." />
        <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Favorites</h1>
        <p className="text-lg text-gray-600 mb-8">Please sign in to view and save your favorite calculators.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO title="Your Favorites | AllTypesOfCalculators" description="Quick access to your most used tools and calculators." />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Favorites</h1>
      <p className="text-xl text-gray-600 mb-12">Quick access to your most used tools.</p>

      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading favorites...</div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(calc => (
            <Link 
              key={calc.id} 
              to={`/calculators/${calc.id}`}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
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
                <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{calc.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{calc.description}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-500 mb-6">Start exploring calculators and save the ones you use most.</p>
          <Link to="/categories" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Browse Calculators
          </Link>
        </div>
      )}
    </div>
  );
}
