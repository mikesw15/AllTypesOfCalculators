import React, { useState } from 'react';
import { PaintRoller, Info } from 'lucide-react';

export default function PaintCalculator() {
  const [length, setLength] = useState<number>(12);
  const [width, setWidth] = useState<number>(12);
  const [height, setHeight] = useState<number>(8);
  const [doors, setDoors] = useState<number>(1);
  const [windows, setWindows] = useState<number>(2);
  const [coats, setCoats] = useState<number>(2);

  // Constants
  const DOOR_AREA = 21; // sq ft
  const WINDOW_AREA = 15; // sq ft
  const COVERAGE_PER_GALLON = 350; // sq ft per gallon

  // Calculate
  const wallArea1 = length * height * 2;
  const wallArea2 = width * height * 2;
  const totalWallArea = wallArea1 + wallArea2;
  
  const exclusionsArea = (doors * DOOR_AREA) + (windows * WINDOW_AREA);
  const paintableArea = Math.max(0, totalWallArea - exclusionsArea);
  
  const totalAreaWithCoats = paintableArea * coats;
  const gallonsNeeded = Math.ceil((totalAreaWithCoats / COVERAGE_PER_GALLON) * 10) / 10; // Round to 1 decimal place
  const recommendedGallons = Math.ceil(gallonsNeeded);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 border-b pb-2">Room Dimensions (Feet)</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 border-b pb-2">Doors, Windows & Coats</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Doors</label>
              <input
                type="number"
                value={doors}
                onChange={(e) => setDoors(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Windows</label>
              <input
                type="number"
                value={windows}
                onChange={(e) => setWindows(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coats of Paint</label>
              <select
                value={coats}
                onChange={(e) => setCoats(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors bg-white"
              >
                <option value={1}>1 Coat</option>
                <option value={2}>2 Coats</option>
                <option value={3}>3 Coats</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border-2 border-blue-100 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <PaintRoller className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">You will need approximately</h3>
          <div className="text-5xl font-extrabold text-blue-600 mb-2">
            {recommendedGallons} <span className="text-2xl text-blue-400">Gallons</span>
          </div>
          <p className="text-gray-500 font-medium">
            ({gallonsNeeded} gallons exact calculation)
          </p>
          
          <div className="mt-6 pt-6 border-t border-blue-200 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-gray-500">Paintable Area</span>
              <span className="font-bold text-gray-900">{paintableArea} sq ft</span>
            </div>
            <div>
              <span className="block text-gray-500">Total Coverage Needed</span>
              <span className="font-bold text-gray-900">{totalAreaWithCoats} sq ft</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p>
            This calculation assumes standard door sizes (21 sq ft) and window sizes (15 sq ft). 
            A typical gallon of paint covers about 350 square feet. Rough or textured surfaces may require more paint.
          </p>
        </div>
      </div>
    </div>
  );
}
