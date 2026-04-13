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
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
  };

  const valueColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
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
