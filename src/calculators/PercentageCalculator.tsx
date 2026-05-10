import React, { useState, useMemo, useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { Percent, Hash } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';

export default function PercentageCalculator() {
  const { saveToHistory } = useHistory();
  const [calcType, setCalcType] = useState<'percentOf' | 'isWhatPercent' | 'change'>('percentOf');
  
  // States for "percentOf" (What is X% of Y?)
  const [percentOfX, setPercentOfX] = useState<number>(20);
  const [percentOfY, setPercentOfY] = useState<number>(150);
  
  // States for "isWhatPercent" (X is what % of Y?)
  const [isWhatPercentX, setIsWhatPercentX] = useState<number>(30);
  const [isWhatPercentY, setIsWhatPercentY] = useState<number>(150);
  
  // States for "change" (Percentage increase/decrease from X to Y)
  const [changeX, setChangeX] = useState<number>(100);
  const [changeY, setChangeY] = useState<number>(120);

  const result1 = useMemo(() => {
    return (percentOfX / 100) * percentOfY;
  }, [percentOfX, percentOfY]);

  const result2 = useMemo(() => {
    if (isWhatPercentY === 0) return 0;
    return (isWhatPercentX / isWhatPercentY) * 100;
  }, [isWhatPercentX, isWhatPercentY]);

  const result3 = useMemo(() => {
    if (changeX === 0) return 0;
    return ((changeY - changeX) / changeX) * 100;
  }, [changeX, changeY]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let inputs = {};
      let result = {};
      
      if (calcType === 'percentOf') {
        inputs = { type: 'What is X% of Y?', x: percentOfX, y: percentOfY };
        result = { value: result1.toFixed(2) };
      } else if (calcType === 'isWhatPercent') {
        inputs = { type: 'X is what % of Y?', x: isWhatPercentX, y: isWhatPercentY };
        result = { value: result2.toFixed(2) + '%' };
      } else {
        inputs = { type: 'Percentage Change', x: changeX, y: changeY };
        result = { value: Math.abs(result3).toFixed(2) + '% ' + (result3 >= 0 ? 'Increase' : 'Decrease') };
      }
      
      saveToHistory('percentage', 'Percentage', inputs, result);
    }, 3000);
    return () => clearTimeout(timer);
  }, [calcType, percentOfX, percentOfY, isWhatPercentX, isWhatPercentY, changeX, changeY, result1, result2, result3, saveToHistory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Inputs */}
      <div className="space-y-8">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setCalcType('percentOf')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${calcType === 'percentOf' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            X% of Y
          </button>
          <button
            onClick={() => setCalcType('isWhatPercent')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${calcType === 'isWhatPercent' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            X is % of Y
          </button>
          <button
            onClick={() => setCalcType('change')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${calcType === 'change' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            % Change
          </button>
        </div>

        {calcType === 'percentOf' && (
          <div className="space-y-6">
            <CalculatorInput
              label="What is X% (Percentage)"
              value={percentOfX}
              onChange={setPercentOfX}
              icon={Percent}
            />
            <CalculatorInput
              label="of Y (Amount)"
              value={percentOfY}
              onChange={setPercentOfY}
              icon={Hash}
            />
          </div>
        )}

        {calcType === 'isWhatPercent' && (
          <div className="space-y-6">
            <CalculatorInput
              label="X (Amount)"
              value={isWhatPercentX}
              onChange={setIsWhatPercentX}
              icon={Hash}
            />
            <CalculatorInput
              label="is what % of Y (Amount)"
              value={isWhatPercentY}
              onChange={setIsWhatPercentY}
              icon={Hash}
            />
          </div>
        )}

        {calcType === 'change' && (
          <div className="space-y-6">
            <CalculatorInput
              label="Original Value (X)"
              value={changeX}
              onChange={setChangeX}
              icon={Hash}
            />
            <CalculatorInput
              label="New Value (Y)"
              value={changeY}
              onChange={setChangeY}
              icon={Hash}
            />
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex flex-col gap-8">
        {calcType === 'percentOf' && (
          <CalculatorResult
            label="Result"
            value={result1 % 1 === 0 ? result1.toString() : result1.toFixed(2)}
            description={`${percentOfX}% of ${percentOfY}`}
            color="blue"
          />
        )}

        {calcType === 'isWhatPercent' && (
          <CalculatorResult
            label="Percentage"
            value={(result2 % 1 === 0 ? result2.toString() : result2.toFixed(2)) + '%'}
            description={`${isWhatPercentX} is ${result2 % 1 === 0 ? result2 : result2.toFixed(2)}% of ${isWhatPercentY}`}
            color="green"
          />
        )}

        {calcType === 'change' && (
          <CalculatorResult
            label="Percentage Change"
            value={(Math.abs(result3) % 1 === 0 ? Math.abs(result3).toString() : Math.abs(result3).toFixed(2)) + '%'}
            description={`${result3 >= 0 ? 'Increase' : 'Decrease'} from ${changeX} to ${changeY}`}
            color={result3 >= 0 ? "green" : "red"}
          />
        )}
      </div>
    </div>
  );
}
