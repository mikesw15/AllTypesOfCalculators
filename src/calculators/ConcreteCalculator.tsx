import React, { useState } from 'react';
import { HardHat, Info } from 'lucide-react';

export default function ConcreteCalculator() {
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(10);
  const [depth, setDepth] = useState<number>(4); // inches

  // Calculate
  // Volume in cubic feet = L(ft) * W(ft) * (D(in) / 12)
  const cubicFeet = length * width * (depth / 12);
  
  // 1 cubic yard = 27 cubic feet
  const cubicYards = cubicFeet / 27;
  
  // Add 10% for waste/spillage
  const cubicYardsWithWaste = cubicYards * 1.1;

  // Bags calculation
  // 80lb bag yields approx 0.60 cubic feet
  // 60lb bag yields approx 0.45 cubic feet
  const bags80lb = Math.ceil(cubicFeet / 0.60);
  const bags60lb = Math.ceil(cubicFeet / 0.45);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Length (Feet)</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-gray-500 focus:ring-0 transition-colors"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Width (Feet)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-gray-500 focus:ring-0 transition-colors"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Depth (Inches)</label>
            <input
              type="number"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-gray-500 focus:ring-0 transition-colors"
              min="0"
            />
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gray-200 rounded-full">
              <HardHat className="w-8 h-8 text-gray-700" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">You will need</h3>
          <div className="text-5xl font-extrabold text-gray-800 mb-2">
            {cubicYardsWithWaste.toFixed(2)} <span className="text-2xl text-gray-500">Cubic Yards</span>
          </div>
          <p className="text-gray-500 font-medium">
            (Includes 10% extra for waste and uneven subgrade)
          </p>
          
          <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="block text-gray-500">Exact Volume</span>
              <span className="font-bold text-gray-900">{cubicYards.toFixed(2)} yd³</span>
            </div>
            <div>
              <span className="block text-gray-500">80 lb Bags</span>
              <span className="font-bold text-gray-900">{bags80lb} bags</span>
            </div>
            <div>
              <span className="block text-gray-500">60 lb Bags</span>
              <span className="font-bold text-gray-900">{bags60lb} bags</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
          <Info className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
          <p>
            Ordering ready-mix concrete by the truckload is measured in cubic yards. If you are mixing it yourself, the bag counts are provided above. It's standard practice to order 10% extra to account for spills, uneven ground, and settling.
          </p>
        </div>
      </div>
    </div>
  );
}
