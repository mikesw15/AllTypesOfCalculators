import React, { useState, useMemo, useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import { Hash, Calculator } from 'lucide-react';
import { useHistory } from '../contexts/HistoryContext';

export default function ZScoreCalculator() {
  const { saveToHistory } = useHistory();
  const [calcMode, setCalcMode] = useState<'basic' | 'dataset'>('basic');
  
  // Basic Mode
  const [xValue, setXValue] = useState<number>(85);
  const [mean, setMean] = useState<number>(70);
  const [stdDev, setStdDev] = useState<number>(10);
  
  // Dataset Mode
  const [dataset, setDataset] = useState<string>('50, 60, 70, 80, 90');
  const [datasetX, setDatasetX] = useState<number>(85);

  const datasetStats = useMemo(() => {
    const nums = dataset.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) return { mean: 0, stdDev: 0, count: 0 };
    
    const sum = nums.reduce((a, b) => a + b, 0);
    const m = sum / nums.length;
    const variance = nums.reduce((a, b) => a + Math.pow(b - m, 2), 0) / (nums.length > 1 ? nums.length - 1 : 1); // sample std dev
    const sd = Math.sqrt(variance);
    return { mean: m, stdDev: sd, count: nums.length };
  }, [dataset]);

  const zScoreBasic = useMemo(() => {
    if (stdDev === 0) return 0;
    return (xValue - mean) / stdDev;
  }, [xValue, mean, stdDev]);

  const zScoreDataset = useMemo(() => {
    if (datasetStats.stdDev === 0) return 0;
    return (datasetX - datasetStats.mean) / datasetStats.stdDev;
  }, [datasetX, datasetStats]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let inputs = {};
      let result = {};
      
      if (calcMode === 'basic') {
        inputs = { type: 'Z-Score', x: xValue, mean, stdDev };
        result = { zScore: zScoreBasic.toFixed(4) };
      } else {
        inputs = { type: 'Dataset Z-Score', dataset, x: datasetX };
        result = { zScore: zScoreDataset.toFixed(4), mean: datasetStats.mean.toFixed(2), stdDev: datasetStats.stdDev.toFixed(2) };
      }
      
      saveToHistory('z-score', 'Z-Score & Std Dev', inputs, result);
    }, 3000);
    return () => clearTimeout(timer);
  }, [calcMode, xValue, mean, stdDev, dataset, datasetX, zScoreBasic, zScoreDataset, datasetStats, saveToHistory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setCalcMode('basic')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${calcMode === 'basic' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            From Mean & StdDev
          </button>
          <button
            onClick={() => setCalcMode('dataset')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${calcMode === 'dataset' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            From Dataset
          </button>
        </div>

        {calcMode === 'basic' && (
          <div className="space-y-6">
            <CalculatorInput
              label="Raw Value (X)"
              value={xValue}
              onChange={setXValue}
              icon={Hash}
            />
            <CalculatorInput
              label="Population Mean (μ)"
              value={mean}
              onChange={setMean}
              icon={Calculator}
            />
            <CalculatorInput
              label="Standard Deviation (σ)"
              value={stdDev}
              onChange={setStdDev}
              icon={Calculator}
              min={0.0001}
            />
          </div>
        )}

        {calcMode === 'dataset' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Raw Dataset (comma separated)</label>
              <textarea 
                value={dataset} 
                onChange={(e) => setDataset(e.target.value)} 
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors h-32"
                placeholder="e.g. 50, 60, 70, 80, 90"
              />
            </div>
            
            <CalculatorInput
              label="Raw Value (X) to find Z-Score"
              value={datasetX}
              onChange={setDatasetX}
              icon={Hash}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8">
        {calcMode === 'basic' && (
          <CalculatorResult
            label="Z-Score"
            value={zScoreBasic.toFixed(4)}
            description={`A Z-score of ${zScoreBasic.toFixed(4)} indicates the value is ${Math.abs(zScoreBasic).toFixed(2)} standard deviations ${zScoreBasic > 0 ? 'above' : 'below'} the mean.`}
            color="blue"
          />
        )}

        {calcMode === 'dataset' && (
          <>
            <CalculatorResult
              label="Z-Score"
              value={zScoreDataset.toFixed(4)}
              description={`For X = ${datasetX} based on the input dataset.`}
              color="purple"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Sample Mean</div>
                <div className="text-xl font-bold text-gray-900">{datasetStats.mean.toFixed(4)}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Sample Std Dev (s)</div>
                <div className="text-xl font-bold text-gray-900">{datasetStats.stdDev.toFixed(4)}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Data Points (n)</div>
                <div className="text-xl font-bold text-gray-900">{datasetStats.count}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
