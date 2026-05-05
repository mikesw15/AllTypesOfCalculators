import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChevronDown, ChevronUp, Info, Home, Wallet, Percent, Calendar, Shield, Landmark } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';
import { useHistory } from '../contexts/HistoryContext';
import { useEffect } from 'react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import CalculatorToggle from '../components/calculator/CalculatorToggle';
import { useCalculatorState } from '../hooks/useCalculatorState';

export default function MortgageCalculator() {
  const { saveToHistory } = useHistory();
  const { currency, formatCurrency } = useCurrency();
  const [homePrice, setHomePrice] = useCalculatorState<number>('price', 300000);
  const [downPayment, setDownPayment] = useCalculatorState<number>('dp', 60000);
  const [loanTerm, setLoanTerm] = useCalculatorState<number>('term', 30);
  const [interestRate, setInterestRate] = useCalculatorState<number>('rate', 6.5);
  const [propertyTax, setPropertyTax] = useCalculatorState<number>('tax', 1.2);
  const [homeInsurance, setHomeInsurance] = useCalculatorState<number>('ins', 1200);
  const [hoaFees, setHoaFees] = useCalculatorState<number>('hoa', 0);
  const [pmiRate, setPmiRate] = useCalculatorState<number>('pmi', 0.5);
  const [isAdvancedOpen, setIsAdvancedOpen] = useCalculatorState<boolean>('adv', false);
  
  // ARM State
  const [isARM, setIsARM] = useCalculatorState<boolean>('arm', false);
  const [armInitialPeriod, setArmInitialPeriod] = useCalculatorState<number>('armPeriod', 5);
  const [armExpectedRate, setArmExpectedRate] = useCalculatorState<number>('armRate', 8.5);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToHistory('mortgage', 'Mortgage Calculator', { homePrice, downPayment, loanTerm, interestRate }, { monthlyPayment: results.totalMonthlyPayment });
    }, 3000); // 3 second debounce
    return () => clearTimeout(timer);
  }, [results.totalMonthlyPayment, saveToHistory]);

  const chartData = useMemo(() => [
    { name: 'Principal & Interest', value: results.monthlyPrincipalAndInterest, color: '#2563eb' },
    { name: 'Property Tax', value: results.monthlyPropertyTax, color: '#16a34a' },
    { name: 'Home Insurance', value: results.monthlyHomeInsurance, color: '#eab308' },
    { name: 'PMI', value: results.monthlyPMI, color: '#ef4444' },
    { name: 'HOA Fees', value: results.hoaFees, color: '#8b5cf6' },
  ], [results]);

  const visibleChartData = chartData.filter(item => item.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Inputs */}
      <div className="lg:col-span-5 space-y-8">
        <CalculatorToggle
          label="Loan Type"
          value={isARM ? 'arm' : 'fixed'}
          onChange={(val) => setIsARM(val === 'arm')}
          options={[
            { label: 'Fixed Rate', value: 'fixed' },
            { label: 'ARM (Adjustable)', value: 'arm' }
          ]}
        />

        <CalculatorInput
          label="Home Price"
          value={homePrice}
          onChange={setHomePrice}
          icon={Home}
          prefix={currency.symbol}
          min={0}
        />
        
        <div className="grid grid-cols-2 gap-6">
          <CalculatorInput
            label="Down Payment"
            value={downPayment}
            onChange={setDownPayment}
            icon={Wallet}
            prefix={currency.symbol}
            min={0}
            max={homePrice}
          />
          <CalculatorInput
            label="Down Payment (%)"
            value={results.downPaymentPercent.toFixed(1)}
            onChange={() => {}}
            suffix="%"
            type="text"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              Loan Term
            </label>
            <select 
              value={loanTerm} 
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full bg-white border-2 border-gray-100 rounded-xl py-3 px-4 transition-all outline-none hover:border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 text-gray-900 font-medium"
            >
              <option value={15}>15 Years</option>
              <option value={20}>20 Years</option>
              <option value={30}>30 Years</option>
            </select>
          </div>
          <CalculatorInput
            label={isARM ? 'Initial Rate' : 'Interest Rate'}
            value={interestRate}
            onChange={setInterestRate}
            icon={Percent}
            suffix="%"
            step={0.1}
            min={0}
          />
        </div>

        {isARM && (
          <div className="grid grid-cols-2 gap-6 p-6 bg-blue-50 rounded-2xl border-2 border-blue-100">
            <div className="w-full">
              <label className="block text-sm font-semibold text-blue-900 mb-2">Initial Period</label>
              <select 
                value={armInitialPeriod} 
                onChange={(e) => setArmInitialPeriod(Number(e.target.value))}
                className="w-full bg-white border-2 border-blue-200 rounded-xl py-3 px-4 transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 text-gray-900 font-medium"
              >
                <option value={5}>5 Years</option>
                <option value={7}>7 Years</option>
                <option value={10}>10 Years</option>
              </select>
            </div>
            <CalculatorInput
              label="Expected Rate"
              value={armExpectedRate}
              onChange={setArmExpectedRate}
              suffix="%"
              step={0.1}
              min={0}
            />
          </div>
        )}

        {/* Advanced Options Accordion */}
        <div className="border-2 border-gray-100 rounded-2xl overflow-hidden">
          <button 
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="w-full px-6 py-4 bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition-colors"
          >
            <span className="font-bold text-gray-900">Advanced Options (Escrow, PMI, HOA)</span>
            {isAdvancedOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          
          {isAdvancedOpen && (
            <div className="p-6 space-y-6 bg-white border-t-2 border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                <CalculatorInput
                  label="Property Tax"
                  value={propertyTax}
                  onChange={setPropertyTax}
                  suffix="%"
                  step={0.1}
                  min={0}
                />
                <CalculatorInput
                  label="Home Insurance"
                  value={homeInsurance}
                  onChange={setHomeInsurance}
                  prefix={currency.symbol}
                  suffix="/yr"
                  min={0}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <CalculatorInput
                  label="HOA Fees"
                  value={hoaFees}
                  onChange={setHoaFees}
                  prefix={currency.symbol}
                  suffix="/mo"
                  min={0}
                />
                <CalculatorInput
                  label="PMI Rate"
                  value={pmiRate}
                  onChange={setPmiRate}
                  suffix="%"
                  step={0.01}
                  min={0}
                  helpText={results.downPaymentPercent >= 20 ? "PMI not required (20%+ down)" : ""}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-7 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CalculatorResult
            label={isARM ? 'Initial Monthly' : 'Monthly Payment'}
            value={formatCurrency(results.totalMonthlyPayment)}
            color="blue"
          />
          {isARM && (
            <CalculatorResult
              label={`After ${armInitialPeriod} Years`}
              value={formatCurrency(results.armMonthlyAfterAdjustment)}
              color="purple"
              description="Estimated payment after initial rate period ends."
            />
          )}
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Payment Breakdown</h3>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Shield className="w-4 h-4 text-green-500" />
              Escrow: {formatCurrency(results.monthlyPropertyTax + results.monthlyHomeInsurance + results.monthlyPMI)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={chartData.filter(d => d.value > 0).length > 1 ? 8 : 0}
                    dataKey="value"
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={600}
                    animationEasing="ease-out"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => formatCurrency(value)} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {visibleChartData.map((item) => (
                <div key={item.name} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-bold text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-100">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Landmark className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 mb-2">Loan Summary</h4>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                <div>
                  <p className="text-blue-600 font-medium mb-1">Total Loan Amount</p>
                  <p className="text-xl font-bold text-blue-900">{formatCurrency(results.principal)}</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium mb-1">Down Payment</p>
                  <p className="text-xl font-bold text-blue-900">{formatCurrency(downPayment)} ({results.downPaymentPercent.toFixed(1)}%)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
