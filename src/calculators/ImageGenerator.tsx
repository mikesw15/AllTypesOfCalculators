import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Loader2, Image as ImageIcon, Download } from 'lucide-react';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Map sizes to dimensions (approximate for the requested aspect ratio)
      // Gemini Image API supports specific aspect ratios.
      // We will just pass the aspect ratio and let the model handle it.
      // The prompt can include the size hint if needed, but the API handles resolution.
      
      const response = await ai.models.generateImages({
        model: 'gemini-3-pro-image-preview',
        prompt: `${prompt}. High quality, ${size} resolution.`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64Image = response.generatedImages[0].image.imageBytes;
        setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
      } else {
        setError('No image was generated. Please try a different prompt.');
      }
    } catch (err: any) {
      console.error('Image generation failed:', err);
      setError(err.message || 'Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image Prompt</label>
          <textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
            <select 
              value={size} 
              onChange={(e) => setSize(e.target.value as any)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1K">1K (Standard)</option>
              <option value="2K">2K (High)</option>
              <option value="4K">4K (Ultra High)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aspect Ratio</label>
            <select 
              value={aspectRatio} 
              onChange={(e) => setAspectRatio(e.target.value as any)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1:1">Square (1:1)</option>
              <option value="16:9">Landscape (16:9)</option>
              <option value="9:16">Portrait (9:16)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5" />
              Generate Image
            </>
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="lg:col-span-7 bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
        {generatedImage ? (
          <div className="w-full flex flex-col items-center gap-4">
            <img 
              src={generatedImage} 
              alt="Generated" 
              className="w-full max-w-lg rounded-lg shadow-md object-contain"
            />
            <a 
              href={generatedImage} 
              download={`generated-image-${Date.now()}.jpg`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Image
            </a>
          </div>
        ) : (
          <div className="text-center text-gray-400 flex flex-col items-center">
            <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
            <p>Your generated image will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
