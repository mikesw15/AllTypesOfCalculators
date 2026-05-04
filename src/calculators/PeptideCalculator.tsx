import React, { useState, useMemo, useEffect } from 'react';
import { Syringe, Info, RefreshCw, Save, Check } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorToggle from '../components/calculator/CalculatorToggle';
import { useHistory } from '../contexts/HistoryContext';

const PEPTIDE_PRESETS = [
  { name: 'Custom / Not Listed', vialMg: 5, doseMcg: 250 },
  { name: 'AOD-9604', vialMg: 2, doseMcg: 300 },
  { name: 'BPC-157', vialMg: 5, doseMcg: 250 },
  { name: 'CJC-1295 (DAC)', vialMg: 2, doseMcg: 2000 },
  { name: 'CJC-1295 (No DAC)', vialMg: 2, doseMcg: 100 },
  { name: 'DSIP', vialMg: 5, doseMcg: 100 },
  { name: 'Epitalon', vialMg: 10, doseMcg: 1000 },
  { name: 'GHK-Cu', vialMg: 50, doseMcg: 2000 },
  { name: 'IGF-1 LR3', vialMg: 1, doseMcg: 50 },
  { name: 'Ipamorelin', vialMg: 5, doseMcg: 200 },
  { name: 'Melanotan II (MT2)', vialMg: 10, doseMcg: 250 },
  { name: 'MOTS-c', vialMg: 5, doseMcg: 5000 },
  { name: 'PEG-MGF', vialMg: 2, doseMcg: 200 },
  { name: 'PT-141 (Bremelanotide)', vialMg: 10, doseMcg: 1500 },
  { name: 'Retatrutide', vialMg: 10, doseMcg: 2000 },
  { name: 'Selank', vialMg: 5, doseMcg: 250 },
  { name: 'Semaglutide', vialMg: 5, doseMcg: 250 },
  { name: 'Semax', vialMg: 30, doseMcg: 300 },
  { name: 'TB-500 (Thymosin Beta 4)', vialMg: 5, doseMcg: 2500 },
  { name: 'Tesamorelin', vialMg: 2, doseMcg: 1000 },
  { name: 'Tirzepatide', vialMg: 10, doseMcg: 2500 },
];

export default function PeptideCalculator() {
  const { saveToHistory } = useHistory();
  const [mode, setMode] = useState<'units' | 'water' | 'dosage'>('units');
  
  // Inputs
  const [selectedPeptide, setSelectedPeptide] = useState<string>('Custom / Not Listed');
  const [peptideAmount, setPeptideAmount] = useState<number>(5); // mg
  const [waterAdded, setWaterAdded] = useState<number>(2); // ml (Used in 'units' mode)
  const [desiredDose, setDesiredDose] = useState<number>(250); // mcg
  const [desiredUnits, setDesiredUnits] = useState<number>(10); // units (Used in 'water' mode)
  
  // Syringe settings
  const [syringeType, setSyringeType] = useState<string>('U100-1');
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Parse syringe type
  const { maxVolume, unitsPerMl } = useMemo(() => {
    switch (syringeType) {
      case 'U100-0.5': return { maxVolume: 0.5, unitsPerMl: 100 };
      case 'U100-0.3': return { maxVolume: 0.3, unitsPerMl: 100 };
      case 'U40-1': return { maxVolume: 1, unitsPerMl: 40 };
      case 'U100-1': 
      default:
        return { maxVolume: 1, unitsPerMl: 100 };
    }
  }, [syringeType]);

  const maxUnits = maxVolume * unitsPerMl;

  const results = useMemo(() => {
    const totalPeptideMcg = peptideAmount * 1000;
    
    if (mode === 'units' || mode === 'dosage') {
      if (peptideAmount <= 0 || waterAdded <= 0 || desiredDose <= 0) return null;
      
      const concentration = totalPeptideMcg / waterAdded; // mcg per ml
      const volumeNeeded = desiredDose / concentration; // ml
      const units = volumeNeeded * unitsPerMl;
      const totalDoses = totalPeptideMcg / desiredDose;
      
      return { units, volume: volumeNeeded, concentration, waterRequired: waterAdded, totalDoses, totalPeptideMcg };
    } else {
      if (peptideAmount <= 0 || desiredUnits <= 0 || desiredDose <= 0) return null;
      
      const volumeForDesiredUnits = desiredUnits / unitsPerMl; // ml
      // concentration = desiredDose / volumeForDesiredUnits
      const concentration = desiredDose / volumeForDesiredUnits; // mcg per ml
      // waterNeeded = totalPeptideMcg / concentration
      const waterNeeded = totalPeptideMcg / concentration; // ml
      const totalDoses = totalPeptideMcg / desiredDose;
      
      return { units: desiredUnits, volume: volumeForDesiredUnits, concentration, waterRequired: waterNeeded, totalDoses, totalPeptideMcg };
    }
  }, [mode, peptideAmount, waterAdded, desiredDose, desiredUnits, unitsPerMl]);

  const fillPercentage = results ? Math.min(100, Math.max(0, (results.units / maxUnits) * 100)) : 0;

  const handleSave = async () => {
    if (!results) return;
    setIsSaving(true);
    await saveToHistory(
      'peptide-calculator', 
      'Peptide Calculator', 
      { mode, selectedPeptide, peptideAmount, desiredDose, syringeType, waterAdded, desiredUnits }, 
      { units: results.units.toFixed(2), waterRequired: results.waterRequired.toFixed(2) }
    );
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
    setIsSaving(false);
  };

  const handleReset = () => {
    setSelectedPeptide('Custom / Not Listed');
    setPeptideAmount(5);
    setWaterAdded(2);
    setDesiredDose(250);
    setDesiredUnits(10);
    setSyringeType('U100-1');
  };

  const handlePeptideChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const peptideName = e.target.value;
    setSelectedPeptide(peptideName);
    
    if (peptideName !== 'Custom / Not Listed') {
      const preset = PEPTIDE_PRESETS.find(p => p.name === peptideName);
      if (preset) {
        setPeptideAmount(preset.vialMg);
        setDesiredDose(preset.doseMcg);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div className="xl:col-span-5 space-y-6">
        <CalculatorToggle
          label="Calculation Goal"
          value={mode}
          onChange={(val: any) => setMode(val)}
          options={[
            { label: 'Calculate Dosage (Units)', value: 'units' },
            { label: 'Calculate Water to Add', value: 'water' },
            { label: 'Calculate Dosage (mL)', value: 'dosage' }
          ]}
        />

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Select Peptide Setup (Optional)</label>
            <select 
              value={selectedPeptide} 
              onChange={handlePeptideChange}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-medium text-gray-900 mb-4"
            >
              {PEPTIDE_PRESETS.map(preset => (
                <option key={preset.name} value={preset.name}>
                  {preset.name} {preset.name !== 'Custom / Not Listed' ? `(${preset.vialMg}mg vial, ~${preset.doseMcg}mcg dose)` : ''}
                </option>
              ))}
            </select>
          </div>

          {mode !== 'dosage' && (
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Syringe Type</label>
              <select 
                value={syringeType} 
                onChange={(e) => setSyringeType(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-medium text-gray-900"
              >
                <option value="U100-1">U-100 Syringe (1 mL / 100 Units)</option>
                <option value="U100-0.5">U-100 Syringe (0.5 mL / 50 Units)</option>
                <option value="U100-0.3">U-100 Syringe (0.3 mL / 30 Units)</option>
                <option value="U40-1">U-40 Syringe (1 mL / 40 Units)</option>
              </select>
            </div>
          )}

          <CalculatorInput
            label="Total Peptide in Vial"
            value={peptideAmount}
            onChange={setPeptideAmount}
            suffix="mg"
            min={0.1}
            step={0.1}
            helpText={`Equals ${peptideAmount > 0 ? (peptideAmount * 1000).toLocaleString() : 0} mcg total`}
          />

          <CalculatorInput
            label={mode === 'units' || mode === 'dosage' ? "Desired Dose" : "Desired Dose per Injection"}
            value={desiredDose}
            onChange={setDesiredDose}
            suffix="mcg"
            min={1}
            step={10}
          />

          {mode === 'units' || mode === 'dosage' ? (
            <CalculatorInput
              label="Bacteriostatic Water Added"
              value={waterAdded}
              onChange={setWaterAdded}
              suffix="mL"
              min={0.1}
              step={0.1}
              helpText="Amount of water you added to the vial."
            />
          ) : (
            <CalculatorInput
              label="Desired units on syringe"
              value={desiredUnits}
              onChange={setDesiredUnits}
              suffix="Units"
              min={1}
              step={1}
              helpText={`Where you want the liquid to reach on a ${syringeType.split('-')[0]} syringe.`}
            />
          )}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleReset}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Reset
          </button>
          <button 
            onClick={handleSave}
            disabled={!results || isSaving || saveSuccess}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              saveSuccess 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {saveSuccess ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saveSuccess ? 'Saved!' : 'Save Protocol'}
          </button>
        </div>
      </div>

      <div className="xl:col-span-7 space-y-6">
        {mode === 'water' && results && (
          <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-blue-100 font-medium uppercase tracking-wider mb-2 text-sm flex items-center gap-2">
                <Info className="w-4 h-4" />
                Reconstitution Instructions
              </p>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                Add {results.waterRequired.toFixed(3)} mL Water
              </h3>
              <p className="text-blue-100 text-lg">
                To yield a dose of <strong className="text-white">{desiredDose} mcg</strong> when drawing <strong className="text-white">{desiredUnits} Units</strong> on your {syringeType.split('-')[0]} syringe, you must reconstitute the {peptideAmount}mg vial with <strong>{results.waterRequired.toFixed(3)} mL</strong> of bacteriostatic water.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <Syringe className="w-64 h-64" />
            </div>
          </div>
        )}

        {mode === 'dosage' && results ? (
          <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-blue-100 font-medium uppercase tracking-wider mb-2 text-sm flex items-center gap-2">
                <Info className="w-4 h-4" />
                Dosage Results
              </p>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                Draw {results.volume.toFixed(3)} mL
              </h3>
              <p className="text-blue-100 text-lg">
                To yield a dose of <strong className="text-white">{desiredDose} mcg</strong> from a {peptideAmount}mg vial reconstituted with {waterAdded}mL of water, you need to draw <strong>{results.volume.toFixed(3)} mL</strong>.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <Syringe className="w-64 h-64" />
            </div>
          </div>
        ) : null}

        {mode !== 'dosage' && (
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 flex flex-col items-center">
            <div className="text-center mb-10 w-full">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">
                {mode === 'units' ? 'Syringe Draw Line' : 'Target Draw Line'}
              </p>
              <div className="text-6xl md:text-7xl font-black text-gray-900 tracking-tight mb-2">
                {results ? results.units.toFixed(1) : '0'} <span className="text-2xl md:text-3xl font-bold text-gray-400">Units</span>
              </div>
              <p className="text-gray-500 font-medium">({results?.units === 1 ? 'tick mark' : 'tick marks'} on a {syringeType.split('-')[0]} syringe)</p>
              
              {results && results.units > maxUnits && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-medium flex items-start text-left gap-3 max-w-lg mx-auto">
                  <Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>Warning: The required dose ({results.units.toFixed(1)} units) exceeds your selected syringe volume ({maxUnits} units). You will need a larger syringe or multiple injections.</p>
                </div>
              )}
            </div>

            <div className="w-full max-w-md mx-auto relative mb-6">
              {/* Syringe Graphic */}
              <div className="relative w-full h-24 flex items-center">
                {/* Needle */}
                <div className="w-8 h-1 bg-gray-400 rounded-l-full z-10 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-gray-300 rounded-sm"></div>
                </div>
                
                {/* Syringe Body */}
                <div className="flex-1 h-20 border-y-2 border-l-2 border-gray-400 rounded-l-lg rounded-r-sm relative bg-white/90 overflow-hidden shadow-inner flex items-center">
                  {/* Liquid Fill */}
                  <div 
                    className="absolute top-0 left-0 bottom-0 bg-blue-400/30 transition-all duration-700 ease-in-out border-r-4 border-blue-500/80 shadow-[inset_0_0_10px_rgba(59,130,246,0.3)] flex items-center justify-center overflow-hidden"
                    style={{ width: `${fillPercentage}%` }}
                  >
                    {fillPercentage > 15 && (
                      <span className="text-xs font-bold text-blue-900 pointer-events-none drop-shadow-sm whitespace-nowrap">
                        {Math.round(fillPercentage)}%
                      </span>
                    )}
                  </div>
                  
                  {/* Tick Marks Layout (10 main segments) */}
                  <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none z-10 w-full pr-4">
                    <div className="flex justify-between w-full pl-2">
                      {Array.from({ length: 11 }).map((_, i) => (
                        <div key={`top-${i}`} className={`w-0.5 bg-gray-800 ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`} />
                      ))}
                    </div>
                    <div className="flex justify-between w-full pl-2">
                      {Array.from({ length: 11 }).map((_, i) => (
                        <div key={`bottom-${i}`} className={`w-0.5 bg-gray-600 ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Numbers */}
                  <div className="absolute inset-0 flex justify-between items-center z-10 pointer-events-none w-full pr-4 pl-2">
                    {Array.from({ length: 11 }).filter((_, i) => i % 2 === 0).map((_, i) => (
                      <span key={`num-${i}`} className="text-[10px] font-bold text-gray-700 text-center w-4 -ml-2 first:ml-0 first:text-transparent">
                         {Math.round((maxUnits / 5) * i)}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Plunger */}
                <div className="w-12 h-18 border-2 border-gray-400 border-l-0 bg-gray-200 relative rounded-r-md z-0 shadow-sm">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-24 bg-gray-300 rounded-r-xl border-y-2 border-r-2 border-gray-400"></div>
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-18 bg-gray-800 rounded-sm"></div>
                </div>
              </div>
              <p className="text-center text-xs font-bold text-gray-400 mt-6 uppercase tracking-wider">Visual Syringe Guide (Total: {maxUnits} U)</p>
            </div>
          </div>
        )}

        {results && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Doses</p>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
              <p className="text-2xl font-black text-gray-900">{Math.floor(results.totalDoses)} <span className="text-sm font-medium text-gray-500">doses</span></p>
              <p className="text-xs text-gray-400 mt-1">Remaining in vial at {desiredDose}mcg/dose</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Concentration</p>
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              </div>
              <p className="text-2xl font-black text-gray-900">{results.concentration.toFixed(0)} <span className="text-sm font-medium text-gray-500">mcg/mL</span></p>
              <p className="text-xs text-gray-400 mt-1">Based on {peptideAmount}mg / {results.waterRequired.toFixed(2)}mL</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

