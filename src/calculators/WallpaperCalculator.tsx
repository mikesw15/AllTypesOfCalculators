import React, { useState } from 'react';
import { Layers, Ruler, Box, Info, AlertTriangle } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';

export default function WallpaperCalculator() {
  const [roomLength, setRoomLength] = useState<number>(12);
  const [roomWidth, setRoomWidth] = useState<number>(10);
  const [roomHeight, setRoomHeight] = useState<number>(8);
  const [rollWidth, setRollWidth] = useState<number>(20.5); // inches
  const [rollLength, setRollLength] = useState<number>(33); // feet
  const [patternRepeat, setPatternRepeat] = useState<number>(21); // inches
  const [wasteFactor, setWasteFactor] = useState<number>(10);

  // Calculations
  const perimeter = (roomLength * 2) + (roomWidth * 2);
  const wallArea = perimeter * roomHeight;
  
  // Number of strips needed
  const stripsNeeded = Math.ceil((perimeter * 12) / rollWidth);
  
  // Length of each strip including pattern repeat
  // We need to add one pattern repeat per strip to ensure alignment
  const stripLengthNeeded = roomHeight + (patternRepeat / 12);
  
  // Strips per roll
  const stripsPerRoll = Math.floor(rollLength / stripLengthNeeded);
  
  // Total rolls
  const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
  const rollsWithWaste = Math.ceil(rollsNeeded * (1 + wasteFactor / 100));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-blue-500" />
              Room Dimensions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Length"
                value={roomLength}
                onChange={setRoomLength}
                suffix="ft"
                min={0}
              />
              <CalculatorInput
                label="Width"
                value={roomWidth}
                onChange={setRoomWidth}
                suffix="ft"
                min={0}
              />
              <div className="col-span-2">
                <CalculatorInput
                  label="Wall Height"
                  value={roomHeight}
                  onChange={setRoomHeight}
                  suffix="ft"
                  min={0}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              Wallpaper Details
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <CalculatorInput
                label="Roll Width"
                value={rollWidth}
                onChange={setRollWidth}
                suffix="in"
                min={0}
              />
              <CalculatorInput
                label="Roll Length"
                value={rollLength}
                onChange={setRollLength}
                suffix="ft"
                min={0}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Pattern Repeat"
                value={patternRepeat}
                onChange={setPatternRepeat}
                suffix="in"
                min={0}
                helpText="Enter 0 for no pattern"
              />
              <CalculatorInput
                label="Waste Factor"
                value={wasteFactor}
                onChange={setWasteFactor}
                suffix="%"
                min={0}
                max={100}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <CalculatorResult
            label="Total Rolls Needed"
            value={rollsWithWaste}
            subValue="Rolls"
            description={`Including ${wasteFactor}% waste. Base amount: ${rollsNeeded} rolls.`}
            color="blue"
            icon={<Box className="w-8 h-8 text-blue-600" />}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-100">
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">Total Strips</p>
              <p className="text-3xl font-black text-green-700">{stripsNeeded}</p>
              <p className="text-xs text-green-600/70 mt-1">Strips to cover perimeter</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-100">
              <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">Strips per Roll</p>
              <p className="text-3xl font-black text-purple-700">{stripsPerRoll}</p>
              <p className="text-xs text-purple-600/70 mt-1">Based on wall height</p>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-100 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-bold mb-1">Important Tip:</p>
              <p className="opacity-80">
                This calculation assumes a standard rectangular room. Subtract area for large windows or doors if necessary. Always buy rolls from the same "dye lot" to ensure color consistency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
