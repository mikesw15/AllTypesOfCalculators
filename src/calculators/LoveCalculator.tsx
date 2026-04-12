import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export default function LoveCalculator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (!name1 || !name2) return;
    const combined = (name1 + name2).toLowerCase().replace(/\s/g, '');
    let sum = 0;
    for (let i = 0; i < combined.length; i++) {
      sum += combined.charCodeAt(i);
    }
    // Pseudo-random but consistent for the same names
    setResult((sum % 101));
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <Heart className="w-16 h-16 text-pink-500 mx-auto animate-pulse" fill="currentColor" />
      
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name1} 
          onChange={(e) => setName1(e.target.value)} 
          className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:ring-0 focus:border-pink-500 text-center text-lg"
        />
        <div className="text-pink-400 font-bold text-xl">+</div>
        <input 
          type="text" 
          placeholder="Their Name" 
          value={name2} 
          onChange={(e) => setName2(e.target.value)} 
          className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:ring-0 focus:border-pink-500 text-center text-lg"
        />
        <button onClick={calculate} className="w-full py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 text-lg shadow-lg shadow-pink-200">
          Calculate Love
        </button>
      </div>

      {result !== null && (
        <div className="mt-8 p-6 bg-pink-50 rounded-2xl border border-pink-100">
          <div className="text-6xl font-black text-pink-600 mb-2">{result}%</div>
          <p className="text-pink-800 font-medium">
            {result > 80 ? "A match made in heaven! 💘" : 
             result > 50 ? "There's definitely a spark! ✨" : 
             "Maybe just friends? 🤝"}
          </p>
        </div>
      )}
    </div>
  );
}
