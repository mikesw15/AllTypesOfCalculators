import React, { useState } from 'react';
import { ThermometerSun, Info } from 'lucide-react';

export default function HVACCalculator() {
  const [length, setLength] = useState<number>(15);
  const [width, setWidth] = useState<number>(15);
  const [height, setHeight] = useState<number>(8);
  const [insulation, setInsulation] = useState<string>('average');
  const [sunExposure, setSunExposure] = useState<string>('normal');

  // Calculate
  const area = length * width;
  
  // Base BTU calculation (approx 20 BTUs per sq ft for standard 8ft ceiling)
  // Adjust for ceiling height (add 10% for every foot over 8ft)
  let baseBTU = area * 20;
  if (height > 8) {
    baseBTU = baseBTU * (1 + ((height - 8) * 0.10));
  }

  // Insulation Multiplier
  let insulationMultiplier = 1;
  if (insulation === 'poor') insulationMultiplier = 1.2;
  if (insulation === 'good') insulationMultiplier = 0.9;

  // Sun Exposure Multiplier
  let sunMultiplier = 1;
  if (sunExposure === 'shaded') sunMultiplier = 0.9;
  if (sunExposure === 'sunny') sunMultiplier = 1.1;

  const totalBTU = Math.round(baseBTU * insulationMultiplier * sunMultiplier);
  
  // 1 Ton of AC = 12,000 BTUs
  const tons = (totalBTU / 12000).toFixed(1);

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
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-0 transition-colors"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-0 transition-colors"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ceiling Height</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-0 transition-colors"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 border-b pb-2">Room Conditions</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Insulation Level</label>
              <select
                value={insulation}
                onChange={(e) => setInsulation(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-0 transition-colors bg-white"
              >
                <option value="poor">Poor (Drafty, old windows)</option>
                <option value="average">Average (Standard)</option>
                <option value="good">Good (Well insulated, new windows)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sun Exposure</label>
              <select
                value={sunExposure}
                onChange={(e) => setSunExposure(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-0 transition-colors bg-white"
              >
                <option value="shaded">Heavily Shaded</option>
                <option value="normal">Normal</option>
                <option value="sunny">Very Sunny (Direct sunlight)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-red-50 rounded-2xl border-2 border-red-100 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <ThermometerSun className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Estimated Cooling/Heating Need</h3>
          <div className="text-5xl font-extrabold text-red-600 mb-2">
            {totalBTU.toLocaleString()} <span className="text-2xl text-red-400">BTUs</span>
          </div>
          
          <div className="mt-6 pt-6 border-t border-red-200 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-gray-500">Room Area</span>
              <span className="font-bold text-gray-900">{area} sq ft</span>
            </div>
            <div>
              <span className="block text-gray-500">AC Unit Size</span>
              <span className="font-bold text-gray-900">{tons} Tons</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
          <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p>
            This is a simplified estimate. For a precise calculation (Manual J calculation), consult a licensed HVAC professional. Factors like the number of occupants, heat-generating appliances, and specific climate zones can significantly affect the required BTUs.
          </p>
        </div>
      </div>
    </div>
  );
}
