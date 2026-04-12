import React, { useState } from 'react';

export default function RecipeScaler() {
  const [originalServings, setOriginalServings] = useState(4);
  const [desiredServings, setDesiredServings] = useState(6);
  const [ingredients, setIngredients] = useState("2 cups flour\n1 cup sugar\n0.5 tsp salt");

  const scaleRatio = desiredServings / originalServings;

  const scaledIngredients = ingredients.split('\n').map(line => {
    // Basic regex to find leading numbers/decimals
    const match = line.match(/^(\d*\.?\d+)\s*(.*)/);
    if (match) {
      const qty = parseFloat(match[1]);
      const rest = match[2];
      return `${+(qty * scaleRatio).toFixed(2)} ${rest}`;
    }
    return line;
  }).join('\n');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Servings</label>
            <input type="number" value={originalServings} onChange={(e) => setOriginalServings(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desired Servings</label>
            <input type="number" value={desiredServings} onChange={(e) => setDesiredServings(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Original Ingredients (one per line)</label>
          <textarea 
            value={ingredients} 
            onChange={(e) => setIngredients(e.target.value)} 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 h-48"
          />
        </div>
      </div>
      <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
        <h3 className="font-bold text-orange-900 mb-4">Scaled Ingredients (x{scaleRatio.toFixed(2)})</h3>
        <div className="bg-white p-4 rounded-lg border border-orange-200 whitespace-pre-wrap font-medium text-gray-800 min-h-[12rem]">
          {scaledIngredients}
        </div>
      </div>
    </div>
  );
}
