import React, { useState, useMemo } from 'react';
import { Home, User, CreditCard, Info, MapPin } from 'lucide-react';
import CalculatorInput from '../components/calculator/CalculatorInput';
import CalculatorResult from '../components/calculator/CalculatorResult';
import CalculatorToggle from '../components/calculator/CalculatorToggle';
import { useCurrency } from '../contexts/CurrencyContext';

export default function StampDutyCalculator() {
  const { currency, formatCurrency } = useCurrency();
  const [propertyPrice, setPropertyPrice] = useState<number>(350000);
  const [buyerType, setBuyerType] = useState<'standard' | 'first-time' | 'additional'>('standard');
  const [location, setLocation] = useState<'england' | 'scotland' | 'wales'>('england');

  const results = useMemo(() => {
    let tax = 0;
    const brackets = [];

    // Note: This implementation focuses on England (SDLT)
    // Scotland (LBTT) and Wales (LTT) have different rates, but we'll focus on England for this UK calculator
    // as per common request, but add a note.
    
    const price = propertyPrice;
    
    if (buyerType === 'first-time' && price <= 625000) {
      // First-time buyer relief (England)
      // 0% on first £425,000
      // 5% on portion between £425,001 and £625,000
      if (price > 425000) {
        tax = (price - 425000) * 0.05;
        brackets.push({ range: `${currency.symbol}425k - ${currency.symbol}625k`, rate: '5%', amount: tax });
      }
    } else {
      const additionalSurcharge = buyerType === 'additional' ? 0.03 : 0;
      
      // Standard England SDLT Brackets (from Sept 2022)
      const thresholds = [
        { limit: 250000, rate: 0 },
        { limit: 925000, rate: 0.05 },
        { limit: 1500000, rate: 0.10 },
        { limit: Infinity, rate: 0.12 }
      ];

      let remainingPrice = price;
      let previousLimit = 0;

      for (const threshold of thresholds) {
        if (remainingPrice <= 0) break;
        
        const bracketRange = threshold.limit - previousLimit;
        const amountInBracket = Math.min(remainingPrice, bracketRange);
        
        const bracketTax = amountInBracket * (threshold.rate + additionalSurcharge);
        tax += bracketTax;
        
        if (bracketTax > 0 || threshold.rate > 0) {
          brackets.push({
            range: threshold.limit === Infinity ? `Over ${currency.symbol}${(previousLimit / 1000).toFixed(0)}k` : `${currency.symbol}${(previousLimit / 1000).toFixed(0)}k - ${currency.symbol}${(threshold.limit / 1000).toFixed(0)}k`,
            rate: `${((threshold.rate + additionalSurcharge) * 100).toFixed(0)}%`,
            amount: bracketTax
          });
        }

        remainingPrice -= amountInBracket;
        previousLimit = threshold.limit;
      }
    }

    const effectiveRate = price > 0 ? (tax / price) * 100 : 0;

    return { tax, effectiveRate, brackets };
  }, [propertyPrice, buyerType]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <CalculatorInput
          label="Property Purchase Price"
          value={propertyPrice}
          onChange={setPropertyPrice}
          icon={Home}
          prefix={currency.symbol}
          min={0}
        />

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-500" />
            Buyer Situation
          </label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'first-time', label: 'First-time Buyer', desc: 'Buying your very first home to live in.' },
              { id: 'standard', label: 'Home Mover', desc: 'Selling your main home and buying another.' },
              { id: 'additional', label: 'Additional Property', desc: 'Buy-to-let or second home (includes 3% surcharge).' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setBuyerType(type.id as any)}
                className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  buyerType === type.id 
                    ? 'border-blue-600 bg-blue-50 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 bg-white'
                }`}
              >
                <div className={`mt-1 p-2 rounded-lg ${buyerType === type.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className={`font-bold ${buyerType === type.id ? 'text-blue-900' : 'text-gray-900'}`}>{type.label}</p>
                  <p className={`text-xs ${buyerType === type.id ? 'text-blue-700' : 'text-gray-500'}`}>{type.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-100 flex gap-4">
          <Info className="w-6 h-6 text-blue-500 shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-bold mb-1">UK/England SDLT Rates</p>
            <p className="opacity-80 leading-relaxed">
              These rates apply to residential properties in England and Northern Ireland. Scotland and Wales have their own land tax systems (LBTT and LTT) with different rates.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <CalculatorResult
          label="Stamp Duty To Pay"
          value={formatCurrency(results.tax)}
          color="blue"
          description={`Effective Tax Rate: ${results.effectiveRate.toFixed(2)}%`}
        />

        <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Tax Breakdown</h3>
          <div className="space-y-4">
            {results.brackets.length > 0 ? (
              results.brackets.map((bracket, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div>
                    <p className="text-sm font-bold text-gray-700">{bracket.range}</p>
                    <p className="text-xs text-gray-400">Rate: {bracket.rate}</p>
                  </div>
                  <span className="font-bold text-gray-900">{formatCurrency(bracket.amount)}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No tax due in this price bracket.</p>
              </div>
            )}
          </div>
          
          <div className="mt-8 pt-6 border-t-2 border-gray-100">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-600">Total Property Cost</span>
              <span className="text-xl font-black text-gray-900">{formatCurrency(propertyPrice + results.tax)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            Quick Reference
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <p className="text-gray-500 uppercase font-bold tracking-wider">Up to £250k</p>
              <p className="font-bold text-gray-900">0%</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 uppercase font-bold tracking-wider">£250k - £925k</p>
              <p className="font-bold text-gray-900">5%</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 uppercase font-bold tracking-wider">£925k - £1.5m</p>
              <p className="font-bold text-gray-900">10%</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 uppercase font-bold tracking-wider">Over £1.5m</p>
              <p className="font-bold text-gray-900">12%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
