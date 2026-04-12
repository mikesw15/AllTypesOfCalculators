import React, { useState, useMemo } from 'react';
import { Syringe } from 'lucide-react';

export default function PeptideCalculator() {
  const [syringeVolume, setSyringeVolume] = useState<number>(1); // 1ml (100U), 0.5ml (50U), 0.3ml (30U)
  const [peptideAmount, setPeptideAmount] = useState<number>(5); // mg
  const [waterAdded, setWaterAdded] = useState<number>(2); // ml
  const [desiredDose, setDesiredDose] = useState<number>(250); // mcg

  const results = useMemo(() => {
    if (peptideAmount <= 0 || waterAdded <= 0 || desiredDose <= 0) {
      return { units: 0, volume: 0, concentration: 0 };
    }

    // 1 mg = 1000 mcg
    const totalPeptideMcg = peptideAmount * 1000;
    
    // Concentration = mcg per ml
    const concentration = totalPeptideMcg / waterAdded;
    
    // Volume needed for desired dose
    const volumeNeeded = desiredDose / concentration;
    
    // Units on a standard U-100 syringe (1ml = 100 Units)
    const units = volumeNeeded * 100;

    return {
      units,
      volume: volumeNeeded,
      concentration
    };
  }, [syringeVolume, peptideAmount, waterAdded, desiredDose]);

  const maxUnits = syringeVolume * 100;
  const fillPercentage = Math.min(100, Math.max(0, (results.units / maxUnits) * 100));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Syringe Volume</label>
          <select 
            value={syringeVolume} 
            onChange={(e) => setSyringeVolume(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1 ml (100 Units)</option>
            <option value={0.5}>0.5 ml (50 Units)</option>
            <option value={0.3}>0.3 ml (30 Units)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Peptide Amount (mg)</label>
          <div className="relative">
            <input 
              type="number" 
              value={peptideAmount} 
              onChange={(e) => setPeptideAmount(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              min="0.1"
              step="0.1"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">mg</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Amount of lyophilized powder in the vial.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bacteriostatic Water Added (ml)</label>
          <div className="relative">
            <input 
              type="number" 
              value={waterAdded} 
              onChange={(e) => setWaterAdded(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              min="0.1"
              step="0.1"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">ml</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Amount of water used to reconstitute.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Desired Dose (mcg)</label>
          <div className="relative">
            <input 
              type="number" 
              value={desiredDose} 
              onChange={(e) => setDesiredDose(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              min="1"
              step="10"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">mcg</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">1 mg = 1000 mcg.</p>
        </div>
      </div>

      <div className="lg:col-span-7 bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Pull Syringe To</p>
          <div className="text-6xl font-extrabold text-blue-600 mb-2">
            {results.units.toFixed(1)} <span className="text-2xl font-bold text-blue-400">Units</span>
          </div>
          <p className="text-gray-600 font-medium">({results.units === 1 ? 'tick mark' : 'tick marks'} on a U-100 syringe)</p>
          
          {results.units > maxUnits && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm font-medium">
              Warning: The required dose ({results.units.toFixed(1)} units) exceeds your selected syringe volume ({maxUnits} units). You will need a larger syringe or multiple injections.
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Visual Syringe */}
          <div className="relative w-full max-w-sm h-24 flex items-center">
            {/* Needle */}
            <div className="w-8 h-1 bg-gray-300 rounded-l-full"></div>
            
            {/* Syringe Body */}
            <div className="flex-1 h-16 border-2 border-gray-400 rounded-l-md rounded-r-sm relative bg-white/80 overflow-hidden shadow-inner">
              {/* Liquid Fill */}
              <div 
                className="absolute top-0 left-0 bottom-0 bg-blue-200/80 transition-all duration-500 ease-in-out border-r-2 border-blue-400"
                style={{ width: `${fillPercentage}%` }}
              ></div>
              
              {/* Tick Marks */}
              <div className="absolute top-0 left-0 right-0 h-full flex flex-col justify-between py-1 pointer-events-none">
                <div className="flex justify-between px-2">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div key={`top-${i}`} className={`w-0.5 bg-gray-400 ${i % 2 === 0 ? 'h-3' : 'h-1.5'}`}></div>
                  ))}
                </div>
                <div className="flex justify-between px-2">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div key={`bottom-${i}`} className={`w-0.5 bg-gray-400 ${i % 2 === 0 ? 'h-3' : 'h-1.5'}`}></div>
                  ))}
                </div>
              </div>
              
              {/* Numbers */}
              <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={`num-${i}`} className="text-[10px] font-bold text-gray-500">
                    {i === 0 ? '' : Math.round((maxUnits / 5) * i)}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Plunger */}
            <div className="w-12 h-14 border-2 border-gray-400 border-l-0 bg-gray-100 relative">
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-16 bg-gray-400 rounded-sm"></div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 font-medium uppercase tracking-wider">Visual Representation</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 uppercase mb-1">Concentration</p>
            <p className="font-bold text-gray-900">{results.concentration.toFixed(0)} mcg/ml</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 uppercase mb-1">Injection Volume</p>
            <p className="font-bold text-gray-900">{results.volume.toFixed(3)} ml</p>
          </div>
        </div>
      </div>
    </div>
  );
}
