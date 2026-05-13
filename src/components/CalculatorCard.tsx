import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { CalculatorMeta } from '../types';
import { useGlobalRatings } from '../contexts/RatingsContext';
import * as Icons from 'lucide-react';

interface CalculatorCardProps {
  calc: CalculatorMeta;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ calc }) => {
  const { ratings } = useGlobalRatings();
  
  const ratingData = ratings[calc.id];
  const average = ratingData?.average || 0;
  const count = ratingData?.count || 0;

  // Dynamically get the icon component
  const IconComponent = (Icons as any)[calc.icon === 'Bitcoin' ? 'Coins' : calc.icon === 'Image' ? 'ImageIcon' : calc.icon === 'Home' ? 'HomeIcon' : calc.icon] || Icons.Calculator;

  return (
    <Link 
      to={`/${calc.id}-calculator`}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500 transition-all group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-600 transition-colors">
          <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
        </div>
        
        {count > 0 && (
          <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 px-2.5 py-1 rounded-full text-sm font-medium">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{average.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {calc.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mt-auto">
        {calc.description}
      </p>
    </Link>
  );
}

export default CalculatorCard;
