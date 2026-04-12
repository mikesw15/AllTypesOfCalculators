import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [propertyTax, setPropertyTax] = useState<number>(1.2);
  const [homeInsurance, setHomeInsurance] = useState<number>(1200);
  const [hoaFees, setHoaFees] = useState<number>(0);
  const [pmiRate, setPmiRate] = useState<number>(0.5);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  // ARM State
  const [isARM, setIsARM] = useState(false);
  const [armInitialPeriod, setArmInitialPeriod] = useState<number>(5);
  const [armExpectedRate, setArmExpectedRate] = useState<number>(8.5);

  const results = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPrincipalAndInterest = 
      principal > 0 ? (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1) : 0;

    const monthlyPropertyTax = (homePrice * (propertyTax / 100)) / 12;
    const monthlyHomeInsurance = homeInsurance / 12;
    
    // PMI calculation: usually required if down payment < 20%
    const downPaymentPercent = (downPayment / homePrice) * 100;
    const monthlyPMI = (downPaymentPercent < 20 && principal > 0) ? (principal * (pmiRate / 100)) / 12 : 0;

    const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyPMI + hoaFees;

    // ARM Adjustment calculation
    let armMonthlyAfterAdjustment = 0;
    if (isARM) {
      const armMonthlyRate = armExpectedRate / 100 / 12;
      const remainingTermMonths = (loanTerm - armInitialPeriod) * 12;
      
      // Rough estimate of remaining principal after initial period
      // (Simplified for this calculator)
      const monthlyRateInitial = interestRate / 100 / 12;
      const initialPayments = armInitialPeriod * 12;
      const remainingPrincipal = principal * 
        (Math.pow(1 + monthlyRateInitial, numberOfPayments) - Math.pow(1 + monthlyRateInitial, initialPayments)) / 
        (Math.pow(1 + monthlyRateInitial, numberOfPayments) - 1);

      armMonthlyAfterAdjustment = (remainingPrincipal * armMonthlyRate * Math.pow(1 + armMonthlyRate, remainingTermMonths)) / 
        (Math.pow(1 + armMonthlyRate, remainingTermMonths) - 1);
      
      // Add taxes/insurance/etc to ARM adjustment
      armMonthlyAfterAdjustment += monthlyPropertyTax + monthlyHomeInsurance + monthlyPMI + hoaFees;
    }

    return {
      principal,
      monthlyPrincipalAndInterest,
      monthlyPropertyTax,
      monthlyHomeInsurance,
      monthlyPMI,
      hoaFees,
      totalMonthlyPayment,
      armMonthlyAfterAdjustment,
      downPaymentPercent
    };
  }, [homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance, hoaFees, pmiRate, isARM, armInitialPeriod, armExpectedRate]);

  const chartData = [
    { name: 'Principal & Interest', value: results.monthlyPrincipalAndInterest, color: '#2563eb' },
    { name: 'Property Tax', value: results.monthlyPropertyTax, color: '#16a34a' },
    { name: 'Home Insurance', value: results.monthlyHomeInsurance, color: '#eab308' },
    { name: 'PMI', value: results.monthlyPMI, color: '#ef4444' },
    { name: 'HOA Fees', value: results.hoaFees, color: '#8b5cf6' },
  ].filter(item => item.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-5 space-y-6">
        <div className="flex p-1 bg-gray-100 rounded-lg mb-4">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${!isARM ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setIsARM(false)}
          >
            Fixed Rate
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${isARM ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setIsARM(true)}
          >
            ARM (Adjustable)
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Home Price ($)</label>
          <input 
            type="number" 
            value={homePrice} 
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment ($)</label>
            <input 
              type="number" 
              value={downPayment} 
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (%)</label>
            <div className="relative">
              <input 
                type="number" 
                value={results.downPaymentPercent.toFixed(1)} 
                readOnly
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label>
            <select 
              value={loanTerm} 
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={15}>15 Years</option>
              <option value={20}>20 Years</option>
              <option value={30}>30 Years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isARM ? 'Initial Rate (%)' : 'Interest Rate (%)'}
            </label>
            <input 
              type="number" 
              step="0.1"
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {isARM && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Initial Period</label>
              <select 
                value={armInitialPeriod} 
                onChange={(e) => setArmInitialPeriod(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={5}>5 Years</option>
                <option value={7}>7 Years</option>
                <option value={10}>10 Years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Expected Rate (%)</label>
              <input 
                type="number" 
                step="0.1"
                value={armExpectedRate} 
                onChange={(e) => setArmExpectedRate(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Advanced Options Accordion */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button 
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="w-full px-4 py-3 bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold text-gray-900">Advanced Options (Escrow, PMI, HOA)</span>
            {isAdvancedOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {isAdvancedOpen && (
            <div className="p-4 space-y-4 bg-white border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Tax (%)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={propertyTax} 
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Home Insurance ($/yr)</label>
                  <input 
                    type="number" 
                    value={homeInsurance} 
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">HOA Fees ($/mo)</label>
                  <input 
                    type="number" 
                    value={hoaFees} 
                    onChange={(e) => setHoaFees(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PMI Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={pmiRate} 
                    onChange={(e) => setPmiRate(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {results.downPaymentPercent >= 20 && (
                    <p className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
                      <Info className="w-3 h-3" /> PMI not required (20%+ down)
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-7 bg-gray-50 rounded-xl p-6 border border-gray-100">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
            {isARM ? 'Initial Monthly Payment' : 'Estimated Monthly Payment'}
          </p>
          <div className="text-5xl font-extrabold text-gray-900">
            ${results.totalMonthlyPayment.toFixed(0)}
          </div>
          
          {isARM && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg inline-block border border-blue-100">
              <p className="text-xs text-blue-700 font-medium uppercase tracking-wide">After {armInitialPeriod} Years (Est.)</p>
              <p className="text-2xl font-bold text-blue-900">${results.armMonthlyAfterAdjustment.toFixed(0)}</p>
            </div>
          )}
        </div>

        <div className="h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(0)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {chartData.map((item) => (
            <div key={item.name} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-700">{item.name}</span>
              </div>
              <span className="font-semibold text-gray-900">${item.value.toFixed(0)}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600" />
            Escrow Breakdown
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-600">Total Monthly Escrow:</div>
            <div className="text-right font-semibold text-gray-900">
              ${(results.monthlyPropertyTax + results.monthlyHomeInsurance + results.monthlyPMI).toFixed(0)}
            </div>
            <div className="text-gray-500 text-xs italic col-span-2">
              Includes Property Tax, Home Insurance, and PMI (if applicable).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
