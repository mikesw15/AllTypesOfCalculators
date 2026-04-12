import React, { useState } from 'react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNum = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOp = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      // Safe eval equivalent for basic math
      const result = new Function('return ' + equation + display)();
      setDisplay(String(result));
      setEquation('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleFunc = (func: string) => {
    const val = parseFloat(display);
    let res = 0;
    switch(func) {
      case 'sin': res = Math.sin(val); break;
      case 'cos': res = Math.cos(val); break;
      case 'tan': res = Math.tan(val); break;
      case 'log': res = Math.log10(val); break;
      case 'ln': res = Math.log(val); break;
      case 'sqrt': res = Math.sqrt(val); break;
      case 'sq': res = val * val; break;
    }
    setDisplay(String(res));
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-3xl shadow-xl">
      <div className="bg-gray-800 p-4 rounded-xl mb-6 text-right">
        <div className="text-gray-400 text-sm h-5">{equation}</div>
        <div className="text-white text-4xl font-mono overflow-hidden">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <button onClick={() => handleFunc('sin')} className="bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600">sin</button>
        <button onClick={() => handleFunc('cos')} className="bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600">cos</button>
        <button onClick={() => handleFunc('tan')} className="bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600">tan</button>
        <button onClick={clear} className="bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-bold">AC</button>

        <button onClick={() => handleFunc('log')} className="bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600">log</button>
        <button onClick={() => handleFunc('ln')} className="bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600">ln</button>
        <button onClick={() => handleFunc('sqrt')} className="bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600">√</button>
        <button onClick={() => handleOp('/')} className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-bold">÷</button>

        <button onClick={() => handleNum('7')} className="bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-bold">7</button>
        <button onClick={() => handleNum('8')} className="bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-bold">8</button>
        <button onClick={() => handleNum('9')} className="bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-bold">9</button>
        <button onClick={() => handleOp('*')} className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-bold">×</button>

        <button onClick={() => handleNum('4')} className="bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-bold">4</button>
        <button onClick={() => handleNum('5')} className="bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-bold">5</button>
        <button onClick={() => handleNum('6')} className="bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-bold">6</button>
        <button onClick={() => handleOp('-')} className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-bold">-</button>

        <button onClick={() => handleNum('1')} className="bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-bold">1</button>
        <button onClick={() => handleNum('2')} className="bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-bold">2</button>
        <button onClick={() => handleNum('3')} className="bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-bold">3</button>
        <button onClick={() => handleOp('+')} className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-bold">+</button>

        <button onClick={() => handleNum('0')} className="bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-bold col-span-2">0</button>
        <button onClick={() => handleNum('.')} className="bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-bold">.</button>
        <button onClick={calculate} className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold">=</button>
      </div>
    </div>
  );
}
