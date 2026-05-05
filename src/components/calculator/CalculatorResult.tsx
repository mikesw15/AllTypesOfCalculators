import React from 'react';
import { motion } from 'motion/react';

interface CalculatorResultProps {
  label: string;
  value: string | number;
  subValue?: string;
  description?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  icon?: React.ReactNode;
}

export default function CalculatorResult({
  label,
  value,
  subValue,
  description,
  color = 'blue',
  icon
}: CalculatorResultProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-500/20',
    green: 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 border-green-100 dark:border-green-500/20',
    red: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-100 dark:border-red-500/20',
    yellow: 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-100 dark:border-yellow-500/20',
    purple: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-500/20',
  };

  const valueColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    purple: 'text-purple-600 dark:text-purple-400',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-8 rounded-2xl border-2 flex flex-col items-center justify-center text-center ${colorClasses[color]}`}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">{label}</p>
      
      <div className="flex items-baseline gap-2 mb-2">
        {icon && <div className="mb-2">{icon}</div>}
        <span className={`text-5xl md:text-6xl font-black tracking-tight ${valueColorClasses[color]}`}>
          {value}
        </span>
        {subValue && <span className="text-xl font-bold opacity-60">{subValue}</span>}
      </div>

      {description && (
        <p className="mt-4 text-sm font-medium leading-relaxed max-w-xs mx-auto opacity-80">
          {description}
        </p>
      )}
    </motion.div>
  );
}
