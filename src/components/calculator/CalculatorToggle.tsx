import React from 'react';

interface CalculatorToggleProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: any) => void;
  label?: string;
}

export default function CalculatorToggle({
  options,
  value,
  onChange,
  label
}: CalculatorToggleProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
      <div className="flex p-1.5 bg-gray-100 rounded-xl">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              value === option.value
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
