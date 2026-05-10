import React, { useState, useMemo, useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { Ruler, Home, PlusSquare } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';

export default function RoofingCalculator() {
  const { saveToHistory } = useHistory();
  const [length, setLength] = useState<number>(40); // Base length in feet
  const [width, setWidth] = useState<number>(30); // Base width in feet
  const [pitch, setPitch] = useState<number>(6); // Pitch (x/12)
  const [overhang, setOverhang] = useState<number>(1.5); // Overhang in feet
  const [waste, setWaste] = useState<number>(10); // Waste factor %

  const result = useMemo(() => {
    // Total footprint including overhang
    const totalLength = length + (overhang * 2);
    const totalWidth = width + (overhang * 2);
    const footprintArea = totalLength * totalWidth;

    // Calculate pitch multiplier: sqrt( (pitch/12)^2 + 1 )
    const pitchMultiplier = Math.sqrt(Math.pow(pitch / 12, 2) + 1);

    // Total area
    const roofAreaSqFt = footprintArea * pitchMultiplier;

    // Add waste factor
    const areaWithWaste = roofAreaSqFt * (1 + (waste / 100));

    // Roofing squares (1 square = 100 sq ft)
    const squares = areaWithWaste / 100;
    
    // Bundles (typically 3 bundles per square)
    const bundles = Math.ceil(squares * 3);

    return {
      footprintArea,
      roofAreaSqFt,
      areaWithWaste,
      squares,
      bundles
    };
  }, [length, width, pitch, overhang, waste]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToHistory(
        'roofing-calculator',
        'Roofing',
        { length, width, pitch, overhang, waste },
        { 
          squares: result.squares.toFixed(2), 
          bundles: result.bundles 
        }
      );
    }, 3000);
    return () => clearTimeout(timer);
  }, [length, width, pitch, overhang, waste, result, saveToHistory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <CalculatorInput
          label="House Base Length (feet)"
          value={length}
          onChange={setLength}
          icon={Ruler}
          min={0}
        />
        <CalculatorInput
          label="House Base Width (feet)"
          value={width}
          onChange={setWidth}
          icon={Home}
          min={0}
        />
        <CalculatorInput
          label="Roof Pitch (e.g., 6 for 6/12)"
          value={pitch}
          onChange={setPitch}
          icon={PlusSquare}
          min={0}
          max={24}
        />
        <CalculatorInput
          label="Eave/Overhang (feet)"
          value={overhang}
          onChange={setOverhang}
          icon={Ruler}
          min={0}
          step={0.5}
        />
        <CalculatorInput
          label="Waste Factor (%)"
          value={waste}
          onChange={setWaste}
          icon={PlusSquare}
          min={0}
          max={50}
        />
      </div>

      <div className="flex flex-col gap-6">
        <CalculatorResult
          label="Total Roofing Squares"
          value={result.squares.toFixed(1)}
          subValue="squares"
          description={`Including ${waste}% waste factor. One square equals 100 sq ft.`}
          color="blue"
        />

        <CalculatorResult
          label="Shingle Bundles Needed"
          value={result.bundles.toString()}
          subValue="bundles"
          description={`Based on 3 bundles per square (standard 3-tab or architectural shingles).`}
          color="green"
        />

        <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
          <h3 className="font-bold text-gray-900 mb-4">Calculation Details</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Footprint Area (incl. overhangs): <span className="font-medium text-gray-900">{result.footprintArea.toFixed(1)} sq ft</span></li>
            <li>• Actual Roof Area (adjusted for pitch): <span className="font-medium text-gray-900">{result.roofAreaSqFt.toFixed(1)} sq ft</span></li>
            <li>• Area with {waste}% Waste: <span className="font-medium text-gray-900">{result.areaWithWaste.toFixed(1)} sq ft</span></li>
            <li className="pt-2 text-xs italic opacity-80 mt-2 border-t border-gray-200">
              Note: Complex roofs with valleys, dormers, and hips may require higher waste factors (15-20%). Simple gable roofs typically need 10%.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
