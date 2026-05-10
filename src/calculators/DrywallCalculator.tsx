import React, { useState, useMemo, useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { Ruler, Maximize, Layers, Square, XSquare, PlusSquare } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';

export default function DrywallCalculator() {
  const { saveToHistory } = useHistory();
  const [length, setLength] = useState<number>(12); // feet
  const [width, setWidth] = useState<number>(12); // feet
  const [height, setHeight] = useState<number>(8); // feet
  
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(true);
  const [sheetSize, setSheetSize] = useState<string>("32"); // defaults to 4x8 (32 sq ft)

  const [doors, setDoors] = useState<number>(1);
  const [windows, setWindows] = useState<number>(1);
  const [waste, setWaste] = useState<number>(10); // Waste %

  const result = useMemo(() => {
    // Walls Area Calculation
    const wallsPerimeter = (length + width) * 2;
    const wallsArea = wallsPerimeter * height;

    // Ceiling Area
    const ceilingArea = includeCeiling ? length * width : 0;

    // Gross Area
    const grossArea = wallsArea + ceilingArea;

    // Deductions
    // Average door = 21 sq ft, average window = 15 sq ft
    const deductions = (doors * 21) + (windows * 15);

    // Net Area
    const netArea = Math.max(0, grossArea - deductions);

    // Adding waste
    const areaWithWaste = netArea * (1 + (waste / 100));

    // Sheets computation
    const sqFtPerSheet = parseInt(sheetSize);
    const sheetsNeeded = Math.ceil(areaWithWaste / sqFtPerSheet);

    return {
      wallsArea,
      ceilingArea,
      grossArea,
      deductions,
      netArea,
      areaWithWaste,
      sheetsNeeded
    };
  }, [length, width, height, includeCeiling, doors, windows, waste, sheetSize]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToHistory(
        'drywall-calculator',
        'Drywall',
        { length, width, height, includeCeiling, doors, windows, waste, sheetSize },
        { 
          netArea: result.netArea.toFixed(1), 
          sheetsNeeded: result.sheetsNeeded 
        }
      );
    }, 3000);
    return () => clearTimeout(timer);
  }, [length, width, height, includeCeiling, doors, windows, waste, sheetSize, result, saveToHistory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <CalculatorInput
          label="Room Length (feet)"
          value={length}
          onChange={setLength}
          icon={Ruler}
          min={0}
        />
        <CalculatorInput
          label="Room Width (feet)"
          value={width}
          onChange={setWidth}
          icon={Maximize}
          min={0}
        />
        <CalculatorInput
          label="Ceiling Height (feet)"
          value={height}
          onChange={setHeight}
          icon={Layers}
          min={0}
        />

        <div className="flex gap-4 items-center bg-gray-50 border border-gray-200 p-4 rounded-xl">
          <input 
            type="checkbox" 
            id="includeCeiling"
            checked={includeCeiling}
            onChange={(e) => setIncludeCeiling(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="includeCeiling" className="font-medium text-gray-700">Include Ceiling in calculation</label>
        </div>

        <CalculatorInput
          label="Number of Doors (approx. 21 sq ft each)"
          value={doors}
          onChange={setDoors}
          icon={Square}
          min={0}
        />
        <CalculatorInput
          label="Number of Windows (approx. 15 sq ft each)"
          value={windows}
          onChange={setWindows}
          icon={XSquare}
          min={0}
        />
        <CalculatorInput
          label="Waste Margin (%)"
          value={waste}
          onChange={setWaste}
          icon={PlusSquare}
          min={0}
          max={40}
        />

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-2">Drywall Sheet Size</label>
          <select
            value={sheetSize}
            onChange={(e) => setSheetSize(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium"
          >
            <option value="32">4' x 8' (32 sq ft) - Standard</option>
            <option value="40">4' x 10' (40 sq ft)</option>
            <option value="48">4' x 12' (48 sq ft)</option>
            <option value="54">4.5' x 12' (54 sq ft)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <CalculatorResult
          label="Drywall Sheets Needed"
          value={result.sheetsNeeded.toString()}
          subValue={`sheets`}
          description={`Based on ${sheetSize === '32' ? "4x8" : sheetSize === '40' ? "4x10" : sheetSize === '48' ? "4x12" : "4.5x12"} boards and ${waste}% waste.`}
          color="blue"
        />

        <CalculatorResult
          label="Total Surface Area to Cover"
          value={result.netArea.toFixed(1)}
          subValue="sq ft"
          description="Net area after subtracting doors and windows."
          color="green"
        />

        <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
          <h3 className="font-bold text-gray-900 mb-4">Calculation Breakdown</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Wall Area: <span className="font-medium text-gray-900">{result.wallsArea.toFixed(1)} sq ft</span></li>
            {includeCeiling && <li>• Ceiling Area: <span className="font-medium text-gray-900">{result.ceilingArea.toFixed(1)} sq ft</span></li>}
            <li>• Gross Area: <span className="font-medium text-gray-900">{result.grossArea.toFixed(1)} sq ft</span></li>
            <li>• Deductions (Doors/Windows): <span className="font-medium text-gray-900">-{result.deductions.toFixed(1)} sq ft</span></li>
            <li className="pt-2 text-xs italic opacity-80 mt-2 border-t border-gray-200">
              Note: Screws missing! You typically need about 1.2 lbs of screws per 100 sq ft, and ~0.05 gallons of joint compound per sq ft.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
