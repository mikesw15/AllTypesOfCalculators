import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Copy, Check } from 'lucide-react';
import ShareModal from '../ShareModal';

interface CalculatorResultProps {
  label: string;
  value: string | number;
  subValue?: string;
  description?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  icon?: React.ReactNode;
}

export default function CalculatorResult({
  label,
  value,
  subValue,
  description,
  color = 'blue',
  icon
}: CalculatorResultProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-500/20',
    green: 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 border-green-100 dark:border-green-500/20',
    red: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-100 dark:border-red-500/20',
    yellow: 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-100 dark:border-yellow-500/20',
    purple: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-500/20',
  };

  const valueColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    purple: 'text-purple-600 dark:text-purple-400',
  };

  const btnColorClasses = {
    blue: 'bg-blue-100/50 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 dark:text-blue-300',
    green: 'bg-green-100/50 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-800/40 dark:text-green-300',
    red: 'bg-red-100/50 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-800/40 dark:text-red-300',
    yellow: 'bg-yellow-100/50 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:hover:bg-yellow-800/40 dark:text-yellow-300',
    purple: 'bg-purple-100/50 hover:bg-purple-200 text-purple-700 dark:bg-purple-900/30 dark:hover:bg-purple-800/40 dark:text-purple-300',
  };

  const resultText = `I calculated my ${label}: ${value} ${subValue || ''}${description ? `\n\n${description}` : ''}`;
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${value}${subValue ? ` ${subValue}` : ''}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Use document.title or fallback
  const pageTitle = document.title.split(' | ')[0] || 'Calculator Result';

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-8 rounded-2xl border flex flex-col items-center justify-center text-center relative max-w-full ${colorClasses[color]}`}
      >
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={handleCopy}
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${btnColorClasses[color]}`}
            title="Copy Result"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${btnColorClasses[color]}`}
            title="Share Result"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">{label}</p>
        
        <div className="flex items-baseline gap-2 mb-2 max-w-full">
          {icon && <div className="mb-2 shrink-0">{icon}</div>}
          <span className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight break-all ${valueColorClasses[color]}`}>
            {value}
          </span>
          {subValue && <span className="text-lg sm:text-xl font-bold opacity-60 shrink-0">{subValue}</span>}
        </div>

        {description && (
          <p className="mt-4 text-sm font-medium leading-relaxed max-w-xs mx-auto opacity-80">
            {description}
          </p>
        )}
      </motion.div>

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        title={pageTitle}
        url={window.location.href}
        resultText={resultText}
      />
    </>
  );
}
