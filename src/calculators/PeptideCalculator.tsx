import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Syringe, Info, RefreshCw, Save, Check, User, Loader2 } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorToggle from '../components/calculator/CalculatorToggle';
import { useHistory } from '../contexts/HistoryContext';
import { useAuth } from '../contexts/AuthContext';
import { db, auth, OperationType, handleFirestoreError } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
  
  // Protocol Saving States
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [protocolName, setProtocolName] = useState('');
  const [isSavingProtocol, setIsSavingProtocol] = useState(false);
  const [protocolSaveSuccess, setProtocolSaveSuccess] = useState(false);

  // Load protocol from navigation state if present
  useEffect(() => {
    if (location.state?.protocol) {
      const p = location.state.protocol;
      setMode(p.mode || 'units');
      setSelectedPeptide(p.peptideName);
      setPeptideAmount(p.peptideAmount);
      setWaterAdded(p.waterAdded);
      setDesiredDose(p.desiredDose);
      setSyringeType(p.syringeType || 'U100-1');
      if (p.results?.units && p.mode === 'water') {
        setDesiredUnits(p.results.units);
      }
      setProtocolName(p.name);
    }
  }, [location.state]);

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

  useEffect(() => {
    if (results && protocolName === '') {
      setProtocolName(`${selectedPeptide === 'Custom / Not Listed' ? 'My' : selectedPeptide} Protocol`);
    }
  }, [results, selectedPeptide]);

  const handleSave = async () => {
    if (!results) return;
    
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    setIsSaving(true);
    try {
      await saveToHistory(
        'peptide-calculator', 
        'Peptide Calculator', 
        { mode, selectedPeptide, peptideAmount, desiredDose, syringeType, waterAdded, desiredUnits }, 
        { units: results.units.toFixed(2), waterRequired: results.waterRequired.toFixed(2) }
      );
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to save history:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProtocol = async () => {
    if (!user || !results) return;
    
    setIsSavingProtocol(true);
    try {
      const path = `users/${user.uid}/peptide_protocols`;
      await addDoc(collection(db, path), {
        userId: user.uid,
        name: protocolName || 'Unnamed Protocol',
        peptideName: selectedPeptide,
        peptideAmount,
        waterAdded: results.waterRequired,
        desiredDose,
        syringeType,
        mode,
        results: {
          units: results.units,
          concentration: results.concentration,
          totalDoses: results.totalDoses,
          volume: results.volume
        },
        createdAt: serverTimestamp()
      });
      
      setProtocolSaveSuccess(true);
      setTimeout(() => {
        setProtocolSaveSuccess(false);
        setShowSaveModal(false);
      }, 2000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}/peptide_protocols`);
    } finally {
      setIsSavingProtocol(false);
    }
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

        <div className="flex flex-col gap-4">
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
                  : 'bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {saveSuccess ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              {saveSuccess ? 'History Saved' : 'Save to History'}
            </button>
          </div>
          
          <button 
            onClick={() => user ? setShowSaveModal(true) : navigate('/login', { state: { from: location } })}
            disabled={!results}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-200"
          >
            <User className="w-6 h-6" />
            Save Protocol to My Profile
          </button>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-black text-gray-900 mb-2">Save Protocol</h3>
            <p className="text-gray-500 mb-6 font-medium">Give this protocol a name so you can easily identify it in your profile.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Protocol Name</label>
                <input 
                  type="text" 
                  value={protocolName}
                  onChange={(e) => setProtocolName(e.target.value)}
                  placeholder="e.g., Morning BPC-157 cycle"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-4 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-gray-900"
                  autoFocus
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Summary</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-700">{selectedPeptide} ({peptideAmount}mg)</p>
                  <p className="text-sm font-medium text-gray-500">Dose: {desiredDose}mcg → {results?.units.toFixed(1)} Units</p>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProtocol}
                  disabled={isSavingProtocol || protocolSaveSuccess}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    protocolSaveSuccess 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
                  }`}
                >
                  {isSavingProtocol ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : protocolSaveSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      Saved!
                    </>
                  ) : (
                    'Confirm Save'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <div className="w-full bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 overflow-hidden flex flex-col items-center">
            <div className="text-center mb-10 w-full relative z-20">
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

            <div className="w-full max-w-[240px] md:max-w-[280px] relative mb-8 ml-[-60px] md:ml-[-100px] mr-auto lg:mx-auto lg:ml-[-80px] xl:ml-[-120px]">
              {/* Syringe Graphic Container */}
              <div className="relative w-full h-24 flex items-center">
                {/* Needle */}
                <div className="w-10 h-1 bg-gray-400 rounded-l-full z-10 relative flex-shrink-0">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-5 bg-gray-300 border border-gray-400 rounded-sm"></div>
                </div>
                
                {/* Syringe Body */}
                <div className="flex-1 h-20 relative bg-white shadow-inner flex items-center z-10 rounded-l-lg rounded-r-md border-2 border-gray-400">
                  {/* Drawable Area - represents the calibrated volume of the syringe */}
                  <div className="absolute inset-y-0 left-[2%] right-[10%] flex items-center z-10">
                    {/* Liquid Fill */}
                    <div 
                      className="absolute top-0 left-0 bottom-0 bg-blue-400/30 transition-all duration-700 ease-in-out border-r-[3px] border-blue-500/80 shadow-[inset_0_0_10px_rgba(59,130,246,0.3)] flex items-center justify-center overflow-hidden"
                      style={{ width: `${fillPercentage}%` }}
                    >
                      {fillPercentage > 20 && (
                        <span className="text-xs font-bold text-blue-900 pointer-events-none drop-shadow-sm whitespace-nowrap opacity-80">
                          {Math.round(fillPercentage)}% Fill
                        </span>
                      )}
                    </div>
                    
                    {/* Tick Marks Layout (10 main segments) */}
                    <div className="absolute inset-0 flex flex-col justify-between py-[2px] pointer-events-none z-20">
                      <div className="flex justify-between w-full">
                        {Array.from({ length: 11 }).map((_, i) => (
                          <div key={`top-${i}`} className={`w-[2px] bg-gray-800 ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`} />
                        ))}
                      </div>
                      <div className="flex justify-between w-full">
                        {Array.from({ length: 11 }).map((_, i) => (
                          <div key={`bottom-${i}`} className={`w-[2px] bg-gray-600 ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`} />
                        ))}
                      </div>
                    </div>
                    
                    {/* Numbers */}
                    <div className="absolute inset-0 flex justify-between items-center z-20 pointer-events-none">
                      {Array.from({ length: 11 }).filter((_, i) => i % 2 === 0).map((_, i) => (
                        <span key={`num-${i}`} className="text-[10px] font-bold text-gray-700 text-center w-6 -ml-3 first:ml-0 first:text-left last:-mr-3 last:text-right">
                           {i === 0 ? '' : Math.round((maxUnits / 5) * i)}
                        </span>
                      ))}
                    </div>

                    {/* Plunger - Absolute positioned to move entirely left/right based on fillPercentage */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-[72px] flex items-center transition-all duration-700 ease-in-out z-0 pointer-events-none"
                      style={{ left: `${fillPercentage}%`, width: '200px' }}
                    >
                       {/* Rubber Tip */}
                       <div className="w-3 h-full bg-gray-800 rounded-sm shadow-[inset_-2px_0_4px_rgba(255,255,255,0.2)] relative z-10 flex-shrink-0 -ml-[2px]"></div>
                       {/* Stem */}
                       <div className="flex-1 h-[56px] bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200 border-y-2 border-gray-400 opacity-95 shadow-inner relative z-0 flex items-center justify-center">
                          {/* Stem structural line */}
                          <div className="w-full h-1 bg-gray-300/50"></div>
                       </div>
                       {/* Thumb Rest */}
                       <div className="w-5 h-[90px] bg-gray-200 rounded-r-xl rounded-l-sm border-2 border-gray-400 relative z-10 flex-shrink-0 -ml-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs font-bold text-gray-400 mt-6 uppercase tracking-wider relative z-20 whitespace-nowrap lg:ml-10">Visual Syringe Guide ({maxUnits} U Max)</p>
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

