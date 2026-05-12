import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CalculatorInputProps {
  label: string;
  value: number | string;
  onChange: (value: any) => void;
  type?: 'number' | 'text';
  icon?: LucideIcon;
  suffix?: string;
  prefix?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  helpText?: string;
}

export default function CalculatorInput({
  label,
  value,
  onChange,
  type = 'number',
  icon: Icon,
  suffix,
  prefix,
  min,
  max,
  step,
  placeholder,
  helpText
}: CalculatorInputProps) {
  const inputId = React.useId();

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-500" />}
        {label}
      </label>
      <div className="relative group">
        {prefix && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-medium pointer-events-none group-focus-within:text-blue-500 transition-colors">
            {prefix}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          aria-label={label}
          className={`w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl py-3 px-4 transition-all outline-none
            hover:border-gray-200 dark:hover:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 dark:focus:ring-blue-900/50 text-gray-900 dark:text-white font-medium
            ${prefix ? 'pl-10' : ''} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-medium pointer-events-none group-focus-within:text-blue-500 transition-colors">
            {suffix}
          </div>
        )}
      </div>
      {helpText && <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 font-medium">{helpText}</p>}
    </div>
  );
}
