import React, { useState } from 'react';

export default function ReadingTimeCalculator() {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(250); // Average adult reading speed

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minutes = wordCount / wpm;
  const readTime = Math.ceil(minutes);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="text-sm text-blue-600 mb-1">Word Count</div>
          <div className="text-3xl font-bold text-blue-900">{wordCount}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
          <div className="text-sm text-purple-600 mb-1">Estimated Reading Time</div>
          <div className="text-3xl font-bold text-purple-900">{readTime} <span className="text-lg font-medium">min</span></div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Reading Speed (Words per Minute)</label>
        <input 
          type="number" 
          value={wpm} 
          onChange={(e) => setWpm(Number(e.target.value))} 
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" 
        />
        <p className="text-xs text-gray-500 mt-1">Average is ~250 WPM.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Paste your text here</label>
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 h-64"
          placeholder="Paste article or book excerpt..."
        />
      </div>
    </div>
  );
}
