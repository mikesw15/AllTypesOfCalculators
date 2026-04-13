import React, { useState } from 'react';
import { Divide, Calculator, Info, ArrowRightLeft } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import CalculatorToggle from '../components/calculator/CalculatorToggle';

export default function FractionCalculator() {
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/'>('+');
  const [num1, setNum1] = useState<number>(1);
  const [den1, setDen1] = useState<number>(2);
  const [num2, setNum2] = useState<number>(1);
  const [den2, setDen2] = useState<number>(4);

  // Helper to find GCD
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  // Helper to simplify fraction
  const simplify = (n: number, d: number) => {
    const common = Math.abs(gcd(n, d));
    return { n: n / common, d: d / common };
  };

  let resNum = 0;
  let resDen = 1;

  switch (operation) {
    case '+':
      resNum = (num1 * den2) + (num2 * den1);
      resDen = den1 * den2;
      break;
    case '-':
      resNum = (num1 * den2) - (num2 * den1);
      resDen = den1 * den2;
      break;
    case '*':
      resNum = num1 * num2;
      resDen = den1 * den2;
      break;
    case '/':
      resNum = num1 * den2;
      resDen = den1 * num2;
      break;
  }

  const simplified = simplify(resNum, resDen);
  const wholeNumber = Math.floor(simplified.n / simplified.d);
  const remainingNum = simplified.n % simplified.d;
  const decimal = resNum / resDen;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-500" />
              Operation
            </h3>
            <CalculatorToggle
              label="Select Operation"
              options={[
                { label: '+', value: '+' },
                { label: '-', value: '-' },
                { label: '×', value: '*' },
                { label: '÷', value: '/' }
              ]}
              value={operation}
              onChange={setOperation}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100 space-y-4">
              <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Fraction 1</h4>
              <CalculatorInput
                label="Numerator"
                value={num1}
                onChange={setNum1}
              />
              <div className="h-px bg-gray-200 w-full" />
              <CalculatorInput
                label="Denominator"
                value={den1}
                onChange={setDen1}
                min={1}
              />
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100 space-y-4">
              <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Fraction 2</h4>
              <CalculatorInput
                label="Numerator"
                value={num2}
                onChange={setNum2}
              />
              <div className="h-px bg-gray-200 w-full" />
              <CalculatorInput
                label="Denominator"
                value={den2}
                onChange={setDen2}
                min={1}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <CalculatorResult
            label="Simplified Result"
            value={simplified.d === 1 ? simplified.n : `${simplified.n}/${simplified.d}`}
            description={simplified.d !== 1 && wholeNumber !== 0 ? `Mixed Number: ${wholeNumber} ${remainingNum}/${simplified.d}` : undefined}
            color="blue"
            icon={<Divide className="w-8 h-8 text-blue-600" />}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-100">
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">Decimal Value</p>
              <p className="text-3xl font-black text-green-700">{decimal.toFixed(4)}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-100">
              <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">Percentage</p>
              <p className="text-3xl font-black text-purple-700">{(decimal * 100).toFixed(2)}%</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 flex gap-4">
            <Info className="w-6 h-6 text-blue-500 shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-bold mb-1">Math Note:</p>
              <p className="opacity-80">
                The calculator automatically reduces the fraction to its simplest form using the Greatest Common Divisor (GCD).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
