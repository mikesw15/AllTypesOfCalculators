import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, X, Loader2 } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface AIHelperProps {
  calculatorTitle: string;
  calculatorDescription: string;
}

export default function AIHelper({ calculatorTitle, calculatorDescription }: AIHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setResponse('');
    
    try {
      const prompt = `You are a helpful assistant on a calculator website. 
      The user is currently using the "${calculatorTitle}" calculator, which does: ${calculatorDescription}.
      
      User's question: ${query}
      
      Provide a concise, helpful, and accurate response.`;

      const result = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: prompt,
      });

      setResponse(result.text || 'Sorry, I could not generate a response.');
    } catch (error) {
      console.error('AI Error:', error);
      setResponse('An error occurred while fetching the response.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 overflow-hidden flex flex-col h-[400px]">
          <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {response ? (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-sm text-gray-700 whitespace-pre-wrap">
                {response}
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-10 text-sm">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-blue-300" />
                <p>Ask me anything about {calculatorTitle} or how to interpret your results!</p>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center mt-4">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleAsk}
                disabled={isLoading || !query.trim()}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
