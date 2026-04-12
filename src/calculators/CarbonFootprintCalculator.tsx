import React, { useState } from 'react';

export default function CarbonFootprintCalculator() {
  const [miles, setMiles] = useState(10000);
  const [flights, setFlights] = useState(2);
  const [diet, setDiet] = useState<'meat' | 'average' | 'vegetarian' | 'vegan'>('average');

  // Rough estimates in tons of CO2 per year
  const carEmissions = (miles / 25) * 19.6 / 2204.6; // Assuming 25 MPG, 19.6 lbs CO2/gal
  const flightEmissions = flights * 0.5; // Rough 0.5 tons per short/medium flight
  
  let dietEmissions = 2.5;
  if (diet === 'meat') dietEmissions = 3.3;
  if (diet === 'vegetarian') dietEmissions = 1.7;
  if (diet === 'vegan') dietEmissions = 1.5;

  const total = carEmissions + flightEmissions + dietEmissions;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Miles Driven per Year</label>
          <input type="number" value={miles} onChange={(e) => setMiles(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Flights per Year</label>
          <input type="number" value={flights} onChange={(e) => setFlights(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diet Type</label>
          <select value={diet} onChange={(e) => setDiet(e.target.value as any)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500">
            <option value="meat">Heavy Meat Eater</option>
            <option value="average">Average</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>
      </div>
      <div className="bg-green-50 rounded-xl p-6 border border-green-100 flex flex-col justify-center text-center">
        <p className="text-sm font-medium text-green-700 uppercase tracking-wider mb-1">Estimated Annual Footprint</p>
        <div className="text-5xl font-extrabold text-green-900 mb-2">{total.toFixed(1)}</div>
        <p className="text-green-700 font-medium mb-6">Tons of CO2e</p>
        
        <div className="space-y-2 text-sm text-green-800 text-left bg-white p-4 rounded-lg border border-green-200">
          <div className="flex justify-between"><span>Car:</span> <span>{carEmissions.toFixed(1)} tons</span></div>
          <div className="flex justify-between"><span>Flights:</span> <span>{flightEmissions.toFixed(1)} tons</span></div>
          <div className="flex justify-between"><span>Diet:</span> <span>{dietEmissions.toFixed(1)} tons</span></div>
        </div>
      </div>
    </div>
  );
}
