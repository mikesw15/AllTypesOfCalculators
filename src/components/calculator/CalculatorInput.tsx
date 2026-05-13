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
  const showSlider = min !== undefined && max !== undefined && type === 'number';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-blue-500" />}
          {label}
        </label>
        {showSlider && (
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-lg">
            {value}{suffix}
          </span>
        )}
      </div>
      <div className="relative group mb-3">
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
      
      {showSlider && (
        <div className="px-1">
          <input
            type="range"
            min={min}
            max={max}
            step={step || 1}
            value={value as number}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
          />
          <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 font-bold mt-1 uppercase tracking-tighter">
            <span>{min}{suffix}</span>
            <span>{max}{suffix}</span>
          </div>
        </div>
      )}

      {helpText && <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 font-medium">{helpText}</p>}
    </div>
  );
}
